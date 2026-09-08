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
import { hpFormulaFor as hpFormulaForSize, saveDamageDiceFor as engineDiceFor } from '../format-2024/dice.mjs';
import { auditEligible, buildAuditPrompt, validateAuditResponse, verifyAuditFindings } from '../format-2024/audit.mjs';
import { KNOWN_SPELLS } from '../skeleton/flavor-prompt.mjs';

const trace = (l, d) => logger.log(`[reskin] ${l}`, d ?? '');
const GAME_TERM = /Attack Roll|Saving Throw|DC \d+|\b(Frightened|Poisoned|Blinded|Deafened|Prone|Restrained|Grappled|Charmed|Stunned|Incapacitated) condition\b|Advantage|Disadvantage|Dash|Disengage|Hide action|Speed|teleports?|Opportunity Attacks?|Difficult Terrain|unoccupied space|without provoking|Hit Points|Resistan\w*|Immun\w*|\d+ feet/i;
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
// THE BRUTE MENU (owner design, 2026-09-01: "spells that enhance
// individual offense or defense... the golem is the precedent") — the
// brute caster is the runed golem, the war-shaman: magic turned inward
// on its own hide and fists, never escape tech and never damage spells.
// Self-buffs barely use save DCs, which suits a brute's basement mental
// stats; Shield is deliberately absent — it is a Reaction spell, and
// print brutes have no reactions (0/40).
// Widened to 16 (owner, 2026-09-01): the redundancy guard shrinks the
// effective pool for construct casters (Heroism and often Stoneskin go
// dead), so the menu grew where the frame allows — retaliation, anti-
// control, death-defiance, and the grappler's check-advantage. Haste
// stays out (sustained extra-attack pricing), Absorb Elements stays out
// (Reaction spell, same law as Shield), Mage Armor stays out
// (numerically dead on a low-DEX brute).
export const BRUTE_SPELL_MENU = ['Enlarge/Reduce', 'Magic Weapon', 'Divine Favor', 'Stoneskin', 'Barkskin', 'Heroism', 'False Life', 'Mirror Image', 'Blur', 'Shield of Faith', 'Protection from Evil and Good', 'Jump', 'Fire Shield', 'Freedom of Movement', 'Death Ward', 'Enhance Ability'];
// THE CASTER FAMILY'S MENU (corpus sweep 2026-09-02): utility + control
// tech, damage-spell-free — the family law is that caster damage lives
// in the attack rows (49/49 print blocks), so the menu never competes
// with them. At-will control has print precedent (the Silver Dragon's
// at-will Hold Monster); the tier engine still governs.
// DAMAGE SPELLS JOINED 2026-09-02 (owner: "where's fireball? where's
// shatter?... why aren't we using the flavorful spells?" — and print
// agrees: the Lich casts Fireball AT WILL, the dragons Scorching Ray/
// Shatter/Guiding Bolt/Mind Spike, the Night Hag Magic Missile). The
// measured pricing law makes them safe: an at-will damage spell never
// out-hits an attack row (Lich: 28 vs 31/burst) — bigger than a row
// means 1/Day (the Red Dragon's Fireball). The tier engine enforces it
// numerically via SPELL_DAMAGE_AVG below.
// Round two (owner: "I feel like there are more?" — right: Cold and
// Necrotic had NO spell, and the control shelf was as thin as the
// damage shelf had been): Ice Knife (Silver Dragon at-will cite),
// Ray of Sickness (Green Hag), Fear (Adult Black Dragon at-will),
// Sleep + Charm Person (Oni), plus the necromancer/ice/zone staples.
export const CASTER_SPELL_MENU = ['Detect Magic', 'Mage Hand', 'Minor Illusion', 'Prestidigitation', 'Light', 'Disguise Self', 'Invisibility', 'Misty Step', 'Fog Cloud', 'Darkness', 'Dispel Magic', 'Mirror Image', 'Blur', 'Hold Person', 'Web', 'Fly', 'Fireball', 'Lightning Bolt', 'Scorching Ray', 'Shatter', 'Magic Missile', 'Guiding Bolt', 'Mind Spike', 'Acid Arrow', 'Ice Knife', 'Cone of Cold', 'Blight', 'Vampiric Touch', 'Ray of Sickness', 'Thunderwave', 'Burning Hands', 'Ice Storm', 'Wall of Fire', 'Cloudkill', 'Fear', 'Sleep', 'Charm Person', 'Suggestion', 'Slow', 'Blindness/Deafness', 'Bestow Curse', 'Hypnotic Pattern'];
// per-cast averages (base slot level, 2024 text) — the tier engine's
// numbers for the at-will-vs-daily call; zone spells also sit in
// NEVER_AT_WILL regardless (the Web law: print never at-wills the zone)
export const SPELL_DAMAGE_AVG = { Fireball: 28, 'Lightning Bolt': 28, 'Scorching Ray': 21, Shatter: 13, 'Magic Missile': 10, 'Guiding Bolt': 14, 'Mind Spike': 13, 'Acid Arrow': 15, 'Ice Knife': 12, 'Cone of Cold': 36, Blight: 36, 'Vampiric Touch': 10, 'Ray of Sickness': 9, Thunderwave: 9, 'Burning Hands': 10, 'Ice Storm': 23, 'Wall of Fire': 22, Cloudkill: 22 };
// THE UPCAST LAW (owner: "wouldn't a CR 12 have a higher fireball?" —
// measured 2026-09-02, 33 print notations): at-will list spells stay
// BASE level always (Adult Brass at-will Scorching Ray unnoted at CR 13,
// Lich at-will Fireball base at CR 21); LIMITED casts upcast to ROW
// PARITY — the Pit Fiend's Recharge Fireball is "(level 5 version)" = 35
// avg beside ~36-per-hit rows. Daily tier level = base + floor((per_hit
// - baseAvg) / perLevel), clamped to 9, labeled print-style only when
// raised. [baseLevel, avgPerUpcastLevel]:
export const SPELL_UPCAST = { Fireball: [3, 3.5], 'Lightning Bolt': [3, 4.5], 'Scorching Ray': [2, 7], Shatter: [2, 4.5], 'Magic Missile': [1, 3.5], 'Guiding Bolt': [1, 3.5], 'Mind Spike': [2, 4.5], 'Acid Arrow': [2, 2.5], 'Ice Knife': [1, 3.5], 'Cone of Cold': [5, 4.5], Blight: [4, 4.5], 'Vampiric Touch': [3, 3.5], 'Ray of Sickness': [1, 4.5], Thunderwave: [1, 4.5], 'Burning Hands': [1, 3.5], 'Ice Storm': [4, 3.5], 'Wall of Fire': [4, 4.5], Cloudkill: [5, 4.5] };
// attack-roll spells need the "+N to hit with spell attacks" pairing in
// the header (owner catch 2026-09-02: Scorching Ray shipped with no
// spell attack bonus anywhere on the sheet). Print's own pairing; the
// bonus derives from the printed DC (attack = DC - 8, both being
// 8/nothing + PB + mod).
export const SPELL_ATTACK_SPELLS = new Set(['Scorching Ray', 'Guiding Bolt', 'Ice Knife', 'Acid Arrow', 'Ray of Sickness', 'Vampiric Touch']);
// SPELL TIERS ARE THE ORGAN'S, NOT THE MODEL'S (the First Word shipped
// "At Will: Stoneskin, Death Ward" — permanent weapon-resistance and a
// repeatable must-kill-me-twice loop beside Legendary Resistance,
// 2026-09-01). The model picks WHICH four spells fit the concept; the
// organ decides at-will vs 1/Day: anything that hardens the caster
// (defensive buffs, death-defiance) is 1/Day, print's golem shape.
// Escape and utility tech (Misty Step, Invisibility, Fog Cloud) may sit
// at-will — print does this on monsters.
// Web joined 2026-09-02 (the Hollow Salvo shipped it at-will): the one
// control spell that leaves a persistent AREA behind — print never
// at-wills it. The critic's categorical version ("concentration control
// never at-will") is OVERRULED by print and must not be re-proposed:
// the Silver Dragons cast Hold Monster at will, the Dryad Charm Monster
// at CR 1, the Glabrezu Darkness, the Cloud Giant Fog Cloud. Print
// at-wills hard control freely; it never at-wills the zone.
// Wall of Fire and Cloudkill joined Web 2026-09-02 (persistent zones —
// the same law); Sleep and Hypnotic Pattern joined for mass-KO control
// print only ever gates (the Oni's Sleep is 1/Day; nothing at-wills a
// mass incapacitate — Fear stays at-will-eligible per the Black Dragon).
// The categorical "control never at-will" has now been proposed and
// print-overruled THREE times (2026-09-02 x2, 2026-09-04) — the
// citations above (Silver Hold Monster, Dryad Charm Monster at CR 1,
// Black Dragon Fear, Glabrezu Darkness) must be met before a fourth.
// Vampiric Touch joined 2026-09-04 (the Gravewright shipped it at-will —
// no print at-will cite; the level-3-ceiling rule alone would admit it)
export const NEVER_AT_WILL = new Set(['Stoneskin', 'Death Ward', 'Fire Shield', 'Freedom of Movement', 'Mirror Image', 'Blur', 'False Life', 'Barkskin', 'Shield of Faith', 'Protection from Evil and Good', 'Heroism', 'Magic Weapon', 'Divine Favor', 'Enhance Ability', 'Enlarge/Reduce', 'Web', 'Wall of Fire', 'Cloudkill', 'Sleep', 'Hypnotic Pattern', 'Vampiric Touch']);

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
export function assignSeats(signatureElements = [], { style = null, covered = [] } = {}) {
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
  // an element the chassis ENGINE already implements makes the wildcard
  // duplicate the organ (Waxen Reknit beside Regeneration, Suffocating
  // Fold beside Smother — 2 sightings, 2026-08-27). Demote it, same rule
  // as the mount element: it did its work by routing the concept here.
  for (const re of covered) {
    const uncovered = els.filter((e) => !re.test(e.element));
    if (uncovered.length && uncovered.length < els.length) {
      demoted = [...demoted, ...els.filter((e) => !uncovered.includes(e)).map((e) => e.element)];
      els = uncovered;
    }
  }
  if (!els.length) return null;
  const action = els.find((e) => e.kind === 'behavior') ?? els[0];
  const trait = els.find((e) => ['body', 'object', 'aura'].includes(e.kind)) ?? els[0];
  return { action: action.element, trait: trait.element, packaged: action.element === trait.element, rest: [...els.map((e) => e.element).filter((x) => x !== action.element && x !== trait.element), ...demoted] };
}

export function buildReskinPrompt(scaled, { concept = '', takenNames = [], signatureElements = [], energy = null, mix = null, mind = null, resolvedType = null } = {}) {
  const seats = assignSeats(signatureElements, { style: scaled.style ?? null });
  const needsProjectile = Object.values(scaled.sections).flat().some((e) => e.text.includes('{projectile}'));
  const needsSpells = Object.values(scaled.sections).flat().some((e) => e.text.includes('{spell_at_will}'));
  const needsEngulf = Object.values(scaled.sections).flat().some((e) => e.engulf_engine);
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
 "type": ${resolvedType ? `"${resolvedType}",   <- FIXED by the concept resolve — echo it exactly` : '"<one of: Aberration, Beast, Celestial, Construct, Dragon, Elemental, Fey, Fiend, Giant, Humanoid, Monstrosity, Ooze, Plant, Undead>",'}
 "size": "<Tiny|Small|Medium|Large|Huge|Gargantuan>",
 "alignment": "<a 2024 alignment — follow the concept's own moral read: tragic, driven, or feral is not Evil>",
 "senses": "<a senses line, e.g. 'darkvision 60 ft.'>",
 "languages": "<a languages line or 'None'>",
 "renames": { ${renameSkeleton} },   <- ALL of these keys, every one, none omitted. A name that claims an element must be PAID by that row's damage: "Burning X" needs Fire on the row (or the melee rider), "Rimefrost X" needs Cold. If the damage does not pay the word, drop the word, or qualify it with the true element the way print does (the Priest\'s "Radiant Flame" deals Radiant); folklore light-compounds (witchfire, foxfire, balefire) are always legal. NAME REGISTER — print's name BUDGET (measured from the corpus): standard rows stay terse — a plain-damage attack row is ONE weapon-noun or anatomy word (Bite, Talons, Greataxe); two words only when the row does more than plain damage (Flame Whip, Arcane Burst); utility rows take plain function names. ONLY the Signature Slot and the nova row earn a flavored name, and even there print compresses: two words, three at the absolute ceiling (Dreadful Glare, Curtain Call — never "Blade Scatter Finale"), a hyphenated compound counting as its parts. Legendary actions take the two-word flavored register, verb-forward (Pounce, Mind Jolt, Cold Gale) — never three words. One flourish on a sheet of terse names reads as a designer's touch; wall-to-wall kennings read as a generator.${mind === 'bestial' ? ' THIS creature is bestial: name its attack rows by anatomy alone (Bite, Talons, Slam, Gore) — its flavor lives in the trait and the lore, never in an attack name.' : ''} Never invent a compound word — print writes "Frost Axe", never "Frostaxe".
 "damage_types": { ${damageSkeleton} },   <- REQUIRED for every attack and the area action. PHYSICAL vs ENERGY follows the BODY (print: melee attacks deal the limb's physical type — a bite Piercing, a slam Bludgeoning, a claw Slashing — with energy reserved for the ranged attack and the area action; ONLY a creature whose body IS energy — incorporeal, elemental, formless — deals energy with its melee). A fully physical creature may answer physical for everything; never give every row the same energy — but also keep to ONE energy family across the block (print rarely fields two).${energy ? ` THIS creature's energy is ${energy} — every non-physical damage type you assign must be ${energy}.` : ''}${mix === 'physical' ? ' THIS creature deals PHYSICAL damage only — Bludgeoning, Piercing, or Slashing everywhere; no energy types anywhere on the block.' : ''}
${needsSpells ? ` "spells": { "at_will": ["<exactly 2 spells this concept would cast, from ONLY this list: ${(scaled.spell_menu ?? SPELL_MENU).join(', ')}>"], "daily": ["<exactly 2 MORE from the same list, no repeats — pick by THEME: the spells must feel like this creature\'s magic. A blaster picks its SIGNATURE damage spells (Fireball, Scorching Ray, Shatter...) — the engine prices the tiers>"] },\n` : ''}${needsProjectile ? ` "projectile": "<the thing it throws, 1-3 words WITH its article (a knucklebone / its barbed anchor) — it appears mid-sentence in attack text>",\n` : ''}${needsEngulf ? ` "engulf_style": "<how this body takes a creature in: swallow (a mouth) | engulf (an amorphous mass, a slime, a swarm) | smother (fabric, wrappings, a collapsing bulk) | whelm (water or liquid) | cage (chains, bars, ribs) | entomb (stone, earth, ice) | cocoon (web, silk, strands) — the engine names and words the ability to match>",\n` : ''} "slot_save": "<the Saving Throw stat the Signature Slot should use if your wildcard is not used — the stat the concept threatens: Strength|Dexterity|Constitution|Intelligence|Wisdom|Charisma>",
 "melee_rider": "<the ENERGY type the melee attack deals as a rider — or \"none\" if this creature's damage is purely physical (a fifth of printed monsters are)>",
 "speed_shape": "<\"climber\" keeps the Climb speed; \"runner\" trades it for +10 ft. walk (a charger, a rider, a sprinter has no business on walls)>",
 "trait_wildcard": { "name": "<a passive trait the concept demands — its body's rule, not an attack: 4 words max>", "text": "<ONE passive rule, 2 sentences max, 2024 voice: an immunity, a sense, a movement rule, a condition interaction. No damage, no saves, no auras. State the flavor and stop — never explain that flavor is flavor ("purely cosmetic" is not rules text). Omit the object entirely if the chassis already says it.>" },
 "lore": "<ONE sentence of world-lore: where it comes from and what it wants>",
 "vulnerability": "<a damage type this creature is VULNERABLE to — ONLY if the concept genuinely implies one (print is sparing: skeletons take extra Bludgeoning, mummies burn, a thing of ash fears Cold — the wound that made it). Most creatures have none: omit this field entirely.>",
 "conditions": { "condition_minor": "<one of: ${CONDITION_MENUS.condition_minor.join(', ')}>" },
 "wildcard_economy": "<what the wildcard costs: action | bonus_action | reaction | trait | rider_on:<the exact new name you gave the attack it rides> — declare it; the assembler files the entry by THIS field, not by guessing from your prose. A rider is a clause appended to that attack (write it as \"When the creature hits with this attack, ...\").>",
 "wildcard": "<The monster is always 'the creature'; its victim is always 'the target' and NEVER 'the creature'. Rules text refers to the creature by epithet or 'it' — never gendered pronouns, whatever the lore says (print's register). REPLACES the 'Signature Slot' entry: the concept's single most distinctive behavior as rules text. 4 sentences max, 2024 house voice, no atmospheric prose. Must use a save DC of ${scaled.dc} if it has a save, standard conditions only, damage at most ${Math.round(scaled.per_hit * 1.2)} average — and damage is ALWAYS written as dice with the average, like "27 (5d8 + 5)", never a flat number. Never assert an effect without granting its rule. An ability that throws or detaches part of the creature's body must state what the creature loses while it is detached and when it returns. Acting or attacking from a distant point is RANGED attacks only. Use limits print as a real count after the entry name, like "(2/Day)" or "(Recharge 5-6)" — never the letter X, never as prose ("can use this three times"), never a stat or proficiency-bonus count, never tied to a rest. Never name or grant a NEW trait inside an ability — state temporary capabilities inline with a duration (\"until the start of its next turn, it can...\"). A strong rider may be PRICED BY THE HIT ITSELF — print's Rug of Smothering grapples 'instead of dealing damage'; write that exact trade (\"instead of dealing damage, the target...\") when the effect is worth a whole hit.>"
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
// spell-negation joined 2026-09-02 (Grandmother Hush's Hush Aura: a free
// permanent counterspell zone — "the spell is wasted" is action-negation
// by another vocabulary; the squeezed balloon after the Silence menu
// rejection. Print's Silence is a costed concentration SPELL; no print
// trait auto-wastes enemy casting.)
const NEGATION = /\b(?:attack|hit|damage)\b[^.]{0,30}\bis negated|\bnegat(?:es|ing)\b[^.]{0,40}\b(?:attack|damage|hit)|\battack misses\b|takes? no damage from (?:the|that|an?) (?:attack|hit)|\bignores? (?:any )?attacks? that deal|\bignores? damage (?:less than|under|below)|\bdamage threshold\b|\bspell (?:is )?(?:wasted|lost)\b|\bspell fails\b|\bcasting fails\b/i;

const ECONOMY_TO_SECTION = { action: undefined, bonus_action: 'Bonus Actions', reaction: 'Reactions', trait: 'Traits' };

function vetActionWildcard(raw, scaled, { name, inline, missingTraitName = null, economy = null, archetype = null }) {
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
    })
    // a TRAILING gate lifts too ("...knocked Prone. (2/Day)" — the
    // Grave-Hurler shipped it glued to the text end, 2026-08-26)
    .replace(/\s*\((\d+\/Day|Recharge [\d–-]+)\)\s*\.?\s*$/, (m, gate) => {
      liftedGate = liftedGate ?? gate;
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
  // containment prepositions joined 2026-08-27: engulf wildcards are
  // structurally forced to write "inside the creature" / "swallowed by
  // the creature" — the old lookbehind vocabulary predates any ability
  // that puts a victim INSIDE the monster (2 deadlocks, 6 burned calls:
  // Gravewater Host, Walking Cairn — both fell to chassis fallback)
  // perception-verb objects + 'on' joined 2026-09-02 (muddle round 2,
  // 3 deadlocks/~9 calls in one smoke): "that can hear the creature must
  // succeed" — 'the creature' is the OBJECT of hearing, the subject's
  // verb follows (the Riddle); "centered on the creature must make" —
  // 'on' was the one locative missing from the list (the Hoardheart).
  const victimPredicate = /(?<!\bof )(?<!\bfrom )(?<!\bto )(?<!\bnear )(?<!\bby )(?<!\binside )(?<!\bwithin )(?<!\binto )(?<!\bbeneath )(?<!\bunder )(?<!\bon )(?<!\bhear )(?<!\bhears )(?<!\bsee )(?<!\bsees )[Tt]he creature (?:must (?:make|succeed)|takes \d|has the [A-Z][a-z]+ condition|repeats the save|can(?:not|'t) (?:willingly )?(?:move|approach))/.test(w);
  // count only NON-ACTOR references: "the creature hits/can see" is the
  // monster acting (legal, Stormfall's taunt died 3x on it); a doubled
  // "the creature" in victim position is the muddle
  const doubledInVictimContext = w.split(/(?<=\.)\s+/).some((sent) => {
    const total = (sent.match(/the creature/gi) ?? []).length;
    const actor = (sent.match(/the creature (?:hits|makes|uses|moves|can see|targets)/gi) ?? []).length;
    const locative = (sent.match(/(?:of|from|to|near|by|inside|within|into|beneath|under|on|hear|hears|see|sees) the creature/gi) ?? []).length;
    return total - actor - locative >= 2
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
  // KO conditions never ride an UNPRICED bonus action (Muffled Toll,
  // first lurker smoke 2026-09-04: at-will BA Paralyzed at CR 5 feeding
  // advantage + within-5-ft crits). Print's KO severity floor is LOW
  // (Ghoul paralyzes at CR 1) — the ECONOMY is the law: 0 corpus
  // sightings of bonus-action KO except the Incubus's Nightmare, which
  // is Recharge 6 + HP-thresholded. Delivery must be an action, an
  // on-hit rider, or a priced bonus action.
  const koApplied = /(?:has|have|gains?) the (?:Paralyzed|Stunned|Unconscious) condition|\b(?:is|are|be|being|becomes?) (?:Paralyzed|Stunned|Unconscious)\b/.test(w);
  const bonusShaped = econDecl === 'bonus_action' || /^[Aa]s an? [Bb]onus [Aa]ction/.test(w);
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
  const meterDialect = /\btimes equal to\b/i.test(w) || /regain(?:s|ing|ed)? (?:all )?(?:expended )?uses/i.test(w)
    // dialect #7 (Iron Warden, 2026-08-26): prose rest-gating — print
    // meters with (Recharge 5-6) or X/Day, never this sentence (0/329)
    || /until (?:it|the \w+) finishes a (?:short|long) rest/i.test(w)
    // dialect #8 (Phantom's Call, 2026-08-27): a mid-text "1/Day" in
    // prose — the count belongs in the entry-name parenthetical
    // "can be used" joined 2026-09-02: passive voice walked past the
    // active forms (the Alms Saint's "This ability can be used 2/Day")
    || /(?:can happen|can do this|can use this|can be used|usable) \d+\/Day/i.test(w);
  // a rider rides the HIT — its own targeting frame contradicts the host
  // row (3 sightings: a reach-5 melee attack whose rider grappled a
  // creature 30 feet away, the Strangler's Coat)
  const riderFramed = econDecl.startsWith('rider_on:') && /\b(?:one|each|any) creature within \d+ feet/i.test(w);
  const why = selfRef ? ['pronoun muddle', 'mechanical']
    : dangling ? ['references a trait that did not ship', 'mechanical']
    : /starts its turn/i.test(w) ? ['recurring aura', 'mechanical']
    : /\byours?\b|\byou\b/i.test(w) ? ['second person', 'mechanical']
    : !GAME_TERM.test(w) ? ['no game term', 'mechanical']
    : (TELEPORT_MOVE.test(w) && !/teleport/i.test(blockCaps)) ? ['teleport beyond the chassis (a "reposition" or vanish-and-reappear IS a teleport — print says the word)', 'mechanical']
    // WHO flies is the question (Ironbristle deadlock, 2026-09-01: quills
    // "flying at the attacker" tripped the bare-word guard 4 times and
    // burned the slot to chassis) — the CREATURE flying is a movement
    // grant; its quills/spit/debris flying AT someone is projectile
    // fiction, print-legal. Flag only creature-as-subject flight, a fly
    // Speed, or flight with a distance ("flies up to 30 feet").
    : ((/\b(?:it|the creature|this creature) (?:can )?fl(?:y|ies)\b/i.test(w) || /\bfly(?:ing)? [Ss]peed\b/i.test(w) || /\bfl(?:y|ies|ying)\b[^.]{0,20}\b\d+ f(?:ee)?t\b/i.test(w)) && !/Fly/i.test(scaled.speed)) ? ['flight beyond the chassis', 'mechanical']
    : !dcs.every((d) => d === `DC ${scaled.dc}`) ? ['DC differs from the card', 'mechanical']
    : (dmg && Number(dmg[1]) > Math.round(scaled.per_hit * 1.5)) ? ['damage over the cap', 'mechanical']
    : meterPlaceholder ? ['an unfilled use-limit placeholder — write the real number, like "2/Day"', 'mechanical']
    : ENGINE_VOCAB.test(w) ? ['engine vocabulary in rules text — chassis, donor, and template are our words, never the creature\'s', 'mechanical']
    // PROMOTED judgment -> mechanical (owner 2026-09-01): 3/9 brute rolls
    // reached for reactions, repair never converted one, and on the Tide
    // King it cost the CR 21 boss its whole signature action AND shadowed
    // the embedded-economy flag that would have caught the impossible
    // shield-reload gate. Print: 0/40 brutes have a Reactions section.
    // the SHAPE is reaction grammar even without the word (Battle-Shriek:
    // "When the ragged howdah takes damage, it emits..." filed as an
    // Action — banning the word taught the model to drop the word,
    // 2026-09-01). Per SENTENCE, not text start: the Plague-Shrine hid
    // the shape behind a scene-setting preamble sentence and the ^-anchor
    // missed it (Weeping Rot, 2026-09-01)
    : (archetype === 'brute' && (econDecl === 'reaction' || reactionMention || w.split(/(?<=\.)\s+/).some((s) => /^When(?:ever)? [^.]{0,80}(?:takes damage|is hit by|is struck|hits (?:it|the creature)\b)/i.test(s.trim())))) ? ['print brutes have no reactions (0 of 40) — DROP THE TRIGGER entirely: relabeling it keeps the broken economy (a bonus action cannot fire on an enemy\'s turn). Write what the creature DOES on its own turn, never "when" something happens to it', 'mechanical']
    : MODEL_HEALING(w) ? ['healing is the Regeneration organ\'s job — turn-based recovery and heal-to-full never ship as custom text; drain ("regains Hit Points equal to the damage dealt") stays legal', 'mechanical']
    : HEAL_BACK(w) ? ['a drain heals off damage DEALT to others (print\'s Life Drain) — healing back damage TAKEN is immunity in disguise and never ships', 'mechanical']
    : DICELESS_DAMAGE.test(w) ? ['damage prints its dice — write "58 (13d8+3)" style, never a flat number; a diceless figure evades the damage caps', 'mechanical']
    : inventedCondition(w) ? [`"${inventedCondition(w)}" is not a rules condition — use a standard condition, or describe the state in lowercase prose ("the target is pacified: it can't...") — never mint capitalized condition vocabulary`, 'mechanical']
    // print never fields two Recharge entries (the Last Dawn Knight
    // shipped Solar Gut + Candle's Dying Breath both at 5-6, 2026-09-02);
    // a DAMAGING second nova duplicates the chassis's priced one — a
    // utility Recharge (a teleport) stays legal
    : (Object.values(scaled.sections).flat().some((e) => e.gate) && dmg && (/\(Recharge/.test(w) || /Recharge/.test(String(liftedGate ?? '')))) ? ['the chassis already carries its priced Recharge nova — print never fields two; use "2/Day", or make this modest and ungated', 'mechanical']
    : NO_SAVE_RESTRAINT(w) ? ['containment by contact always offers a save — print\'s Cube saves on entry; add a Saving Throw and an exit', 'mechanical']
    : UNENDING_RESTRAINT(w) ? ['Restrained must carry an exit — print restraint always ends somewhere: an escape DC, a repeated save at the end of the target\'s turns, or a duration like "until the start of the creature\'s next turn"', 'mechanical']
    : UNPRICED_DISARM(w) ? ['a stolen or stuck weapon is priced and recoverable — print\'s Mimic adheres with an escape DC; give the effect a save or a check, and state how the weapon comes back', 'mechanical']
    : UNBROKEN_DODGE(w) ? ['attack-Disadvantage defense needs a break condition — print\'s Displacement is disrupted until the end of its next turn when the beast takes damage; add a break, a use gate, or a real condition (Opportunity-Attack-only disadvantage is fine)', 'mechanical']
    // PROMOTED judgment -> mechanical (3rd shipping sighting, Burning
    // Gaze at-will 41x2 targets beating the multiattack, 2026-09-01):
    // an ungated AREA action prices per TARGET — the single-target cap
    // undercounts it by the area multiplier
    // "all/every" joined 2026-09-02: the Orbiting Mote's "all creatures
    // within 10 feet" walked past the each-anchored pattern (word-form
    // arms race, 4th sighting)
    // "each OTHER creature" joined 2026-09-02 (the Vestige — arms race #5)
    : (/(?:each|all|every)(?: other)? (?:creatures?|targets?) (?:in|within)/i.test(w) && !liftedGate && dmg && Number(dmg[1]) > Math.round(scaled.per_hit * 0.75)) ? ['an ungated area action prices per TARGET — halve the dice or add a use gate like "(Recharge 5-6)"', 'mechanical']
    // a creature dies only at 0 Hit Points (the Gallows Puppet: four
    // slashing hits destroyed 97 HP, 2026-09-01). Print's only
    // conditional destructions are 0-HP-anchored (Misty Escape) or
    // duration idioms ("until it is destroyed") — both exempted.
    // "dies (if|when)" joined 2026-09-05: the Gilded Maw's INVERTED
    // death-exit clause ("The altar dies if it ends its turn with a
    // swallowed creature") — print's clause is subject-first ("If the
    // creature dies, a swallowed creature exits"), which never matches
    // this shape; "creature dies if" is 0/329
    : w.split(/(?<=\.)\s+/).some((s) => /\b(?:[Ii]t|[Tt]he creature) (?:is destroyed|collapses|dies (?:if|when|unless))\b/.test(s) && !/0 Hit Point|until (?:it|the creature) is destroyed|or (?:it|the creature) is destroyed/.test(s)) ? ['a creature dies only at 0 Hit Points — never "dies if <condition>"; the legal death clause is subject-first ("If the creature dies, ...") and a destruction counter must be a cost an enemy CHOOSES', 'mechanical']
    // print grants blanket all-damage resistance only to OBJECTS and
    // shifted forms (Soul Bag, Vampire mist) — never as a self-trait
    // (the Glacierbear: ~2x effective HP unpriced, 2026-09-01)
    : /[Rr]esistance to all damage/.test(w) ? ['print grants TYPED resistances — blanket all-damage resistance doubles effective HP unpriced; name the one or two types the concept earns', 'mechanical']
    : (DEFENSE_GRANT.test(w) && !DEFENSE_DURATION.test(w)) ? ['an action may buy a TEMPORARY typed defense (add "until the start of the creature\'s next turn") — an unbounded resistance or immunity grant is the derivation engine\'s jurisdiction, never the model\'s', 'mechanical']
    : conditionImmunityGrant(w, name) ? ['condition-immunity SUITES are the header\'s jurisdiction (0 of 329 print traits self-grant one; the phantom chassis already carries print\'s incorporeal suite) — keep at most ONE flavor immunity the concept clearly earns, and cut control conditions (Grappled, Restrained, Prone...) entirely', 'mechanical']
    : STAT_ADD_GRANT.test(w) ? ['print bakes ability modifiers into the row\'s damage — never a stat-add as a choice (0 of 329); drop the clause, the numbers already include the mod', 'mechanical']
    : RESISTANCE_BYPASS.test(w) ? ['resistance and immunity interactions are the engine\'s — print has no overcoming-resistance grammar (0 of 329 in combat); drop the clause', 'mechanical']
    : SELF_AC_GRANT.test(w) ? ['AC is the card\'s — print\'s only AC buff is the Unicorn\'s, on ANOTHER creature, +2 and duration-bounded; a self AC grant never ships', 'mechanical']
    : SELF_DISCLAIMER.test(w) ? ['state the flavor and stop — print never explains that flavor is flavor; drop the disclaimer sentence', 'mechanical']
    : (NEGATION.test(w) && !liftedGate && econDecl !== 'reaction') ? ['negation defense must be priced — add a use gate like "(Recharge 5-6)" or convert it to a Reaction', 'mechanical']
    : (koApplied && bonusShaped && !/Recharge|\/Day/.test(w + String(liftedGate ?? ''))) ? ['Paralyzed, Stunned, and Unconscious never ride an unpriced bonus action — print prices bonus-action KO with a gate (the Incubus\'s Nightmare is Recharge 6); add "(Recharge 5-6)", or deliver it as an action or an on-hit rider', 'mechanical']
    // the sheet already owns the hide-cycle (Veil of Brambles re-invented
    // Umbral Step on the same sheet, first lurker smoke 2026-09-04) — a
    // wildcard granting the Hide action duplicates chassis economy
    : chassisOwned(w, Object.values(scaled.sections).flat()) ? [`the sheet already owns ${chassisOwned(w, Object.values(scaled.sections).flat())} — never restate a chassis rule; build the PAYOFF of what the concept adds instead`, 'mechanical']
    // THE TRAIT DOOR (batch three, 2026-09-05): a wildcard declaring
    // economy 'trait' was vetted HERE — where embedded reactions and
    // rest-metering are judgment-tier — then filed into Traits, dodging
    // the trait chain's mechanical active-mechanics guard (the Vault's
    // reaction-in-a-trait, the Cavernmouth's three-economy "trait").
    // A trait spends nothing: promote those to mechanical at this door.
    : (econDecl === 'trait' && (reactionMention || /[Bb]onus [Aa]ction/.test(w) || /until (?:it|the \w+) finishes a (?:short|long) rest/i.test(w))) ? ['a trait spends nothing — 0 of 329 print traits mention a reaction or bonus action, and rest-recovery is meter prose; move the economy to its own entry or drop it', 'mechanical']
    : roleCollapse ? ['role collapse', 'judgment']
    : riderFramed ? ['a rider rides the hit — address "the target"; no separate targeting frame', 'judgment']
    // a rider has no NAME, so it cannot carry a use gate (gates live in
    // entry names — the Warder's mid-rider "(2/Day)" with "this ability"
    // pointing at nothing, 2026-09-01)
    : (econDecl.startsWith('rider_on:') && /\(\d+\/Day\)|\(Recharge [\d–-]+\)/.test(w)) ? ['a rider has no name to carry a use gate — drop the gate (once per turn applies) or build a standalone action', 'judgment']
    : meterDialect ? ['use limits print as a count like "2/Day" — never a stat-modifier formula, never rest-recovery prose', 'judgment']
    : unrated ? ['no rate limit', 'judgment']
    : unreturned ? ['no return clause', 'judgment']
    : remoteMelee ? ['remote attacks must be ranged', 'judgment']
    // print embeds a bonus action mid-entry only as a TERMINATION clause
    // of an ongoing state (the Ghost "leaves as a Bonus Action") — the
    // coaching names the one legal shape so repair stops bolting on
    // fresh economies (Choke Hold's drag, Gutter Glare's move rider)
    : embeddedEconomy ? ['a second action economy embedded mid-entry — one entry, one economy; print\'s only embedded bonus action is a termination clause ending an ongoing state (the Ghost leaves possession as a Bonus Action) — anything that ACTS is a separate entry or gets dropped', 'judgment']
    // a trigger the rules cannot see (the Grille fired on "kneels", first
    // lurker smoke 2026-09-04 — the garden-plant class; 0/329 corpus)
    : /\bkneel(?:s|ing)?\b|\bpray(?:s|ing)?\b|\bbows? (?:down|before)\b/i.test(w) ? ['the game has no kneeling or praying state — gate on a real condition (Prone), on distance, or on a creature touching or willingly interacting with it', 'judgment']
    // print writes the action, never narrates the action system (the
    // Battlefield Chorus's "can use one action to target...", 2026-09-02)
    : /can use (?:one|an|its) action to/i.test(w) ? ['print writes the action, never narrates the action system — drop "can use one action to"; the entry IS the action', 'judgment']
    : successPenalty ? ['a success clause may grant half damage or nothing — never a penalty', 'judgment']
    // the visibility class (Mirror Lunge, 2026-09-05: "when a creature
    // looks at that surface" — 0/329 print triggers on looking)
    : /\blooks? at\b|\bglances? at\b|\bmeets? (?:its|the) (?:gaze|eyes)\b/i.test(w) ? ['looking is not a game state — no trigger can see gaze direction; use print\'s 2024 gaze grammar (the Sea Hag): a save forced on a creature that starts its turn within X feet and can see it', 'judgment']
    // the Hungerclock's backwards gate (2026-09-05): "If not in dim
    // light... only once per turn" reads as UNLIMITED when the
    // condition fails — a rate limiter binds always
    : w.split(/(?<=\.)\s+/).some((s) => /^If [^.]{0,90}\bonly once per turn/i.test(s.trim())) ? ['a once-per-turn limit binds ALWAYS — behind a condition it reads as unlimited whenever the condition fails; state the limit as its own unconditional sentence', 'judgment']
    : epithetDrift(w, name, inline) ? [`call the creature "the creature" — the assembler stamps the printed short form, and "the ${epithetDrift(w, name, inline)}" is a second nickname fracturing the sheet's voice`, 'judgment']
    // the scene-state family, third species (the Last Round fired on "a
    // target that is alone", 2026-09-05; 0/329)
    : /\balone\b/i.test(w) ? ['"alone" is not a game state — write the distance: "while no other creature is within 30 feet of the target"', 'judgment']
    // self-disabling geography (the Thronebound Shade: Incapacitated
    // outside a room the sheet never establishes, 2026-09-05)
    : /[Oo]utside (?:the|its|this) [^.]{0,40}\b(?:it|the creature) (?:is|has the) Incapacitated/.test(w) ? ['a location the sheet never establishes cannot disable the creature — add the establishing line ("the creature is bound to the chamber where it is encountered") or drop the outside clause', 'judgment']
    : w.split(/(?<=\.)\s+/).length > 4 ? ['over 4 sentences', 'judgment']
    : null;
  let text = capTerms(w.split('the creature').join(inline).split('The creature').join(inline.charAt(0).toUpperCase() + inline.slice(1)));
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

function vetTraitWildcard(tw, sections, { name, inline, archetype = null }) {
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
    // the informal imperative forms joined 2026-09-02: "must make a
    // Wisdom saving throw (DC 20)" and "As a bonus action" slipped a
    // skeleton-anchored check twice in one smoke (Grieving Weep — a
    // bonus action with a save living in Traits — and Rusting Grip)
    : /\d+ \(\d+d\d+|\*[A-Z][a-z]+ Saving Throw\*|Saving Throw:|Attack Roll:|\(Recharge|\/Day|\btimes equal to\b|regain(?:s|ing|ed)? (?:all )?(?:expended )?uses|must (?:make|succeed on) an? [A-Za-z]+ [Ss]aving [Tt]hrow|[Ss]aving [Tt]hrow \(DC|[Aa]s an? [Bb]onus [Aa]ction|use[sd]? an? [Bb]onus [Aa]ction/i.test(twText) ? ['active mechanics in a passive trait (a damage roll, a save FRAME, a bonus action, or a use limit — mentioning saves or attack rolls passively is fine)', 'mechanical']
    : reachContradiction ? [`claims reach ${reachClaim[1]} feet but no attack row prints that reach — reach belongs on the rows; align with them`, 'mechanical']
    : /starts its turn/i.test(twText) ? ['recurring aura', 'mechanical']
    : /\byours?\b|\byou\b/i.test(twText) ? ['second person', 'mechanical']
    // 0/329 print traits mention reactions (Ash-Body Step, 2026-08-26 —
    // the trait vet lacked the check the action vet has had for weeks)
    : /uses? (?:its|a|an) [Rr]eaction|as (?:a|its) [Rr]eaction/.test(twText) ? ['a Reaction belongs in the Reactions section with its cost declared — a trait cannot spend one', 'mechanical']
    : ENGINE_VOCAB.test(twText) ? ['engine vocabulary in rules text — chassis, donor, and template are our words, never the creature\'s', 'mechanical']
    : NEGATION.test(twText) ? ['negation defense must be a priced Reaction — a trait has no cost to pay for it', 'mechanical']
    : /\b(?:[Ii]t|[Tt]he creature) (?:is destroyed|collapses|dies (?:if|when|unless))\b(?![^.]{0,30}0 Hit Point)/.test(twText.replace(/until (?:it|the creature) is destroyed|or (?:it|the creature) is destroyed/g, '')) ? ['a creature dies only at 0 Hit Points — never a destruction counter in a trait', 'mechanical']
    : /[Rr]esistance to all damage/.test(twText) ? ['print grants TYPED resistances — blanket all-damage resistance doubles effective HP unpriced; name the one or two types the concept earns', 'mechanical']
    : MODEL_HEALING(twText) ? ['healing is the Regeneration organ\'s job — turn-based recovery and heal-to-full never ship as custom text', 'mechanical']
    : HEAL_BACK(twText) ? ['a drain heals off damage DEALT to others (print\'s Life Drain) — healing back damage TAKEN is immunity in disguise and never ships', 'mechanical']
    : DICELESS_DAMAGE.test(twText) ? ['damage prints its dice — write "58 (13d8+3)" style, never a flat number', 'mechanical']
    : inventedCondition(twText) ? [`"${inventedCondition(twText)}" is not a rules condition — use a standard condition, or describe the state in lowercase prose`, 'mechanical']
    // "the target" with nothing establishing one (Thick Silence's aura,
    // 3rd antecedent sighting, 2026-09-02): a trait names its subject —
    // "a creature in that area", never an orphan "the target"
    : (/\bthe target\b/i.test(twText) && !/(?:one|each|any|a|that) creature|hits?\b|is hit|attack roll/i.test(twText)) ? ['"the target" with nothing establishing one — a trait names its subject ("a creature in that area"), never an orphan target', 'mechanical']
    : NO_SAVE_RESTRAINT(twText) ? ['containment by contact always offers a save — print\'s Cube saves on entry; add a Saving Throw and an exit', 'mechanical']
    : UNENDING_RESTRAINT(twText) ? ['Restrained must carry an exit — print restraint always ends somewhere: an escape DC, a repeated save, or a duration', 'mechanical']
    : UNPRICED_DISARM(twText) ? ['a stolen or stuck weapon is priced and recoverable — print\'s Mimic adheres with an escape DC; give the effect a save or a check, and state how the weapon comes back', 'mechanical']
    : UNBROKEN_DODGE(twText) ? ['attack-Disadvantage defense needs a break condition — print\'s Displacement is disrupted until the end of its next turn when the beast takes damage; add a break, a use gate, or a real condition (Opportunity-Attack-only disadvantage is fine)', 'mechanical']
    : DEFENSE_GRANT.test(twText) ? ['typed damage defenses are the derivation engine\'s — the concept\'s energy earns its resistance deterministically; a trait never grants resistance or immunity to damage types', 'mechanical']
    : conditionImmunityGrant(twText, name) ? ['condition-immunity SUITES are the header\'s jurisdiction (0 of 329 print traits self-grant one; the phantom chassis already carries print\'s incorporeal suite) — keep at most ONE flavor immunity the concept clearly earns, and cut control conditions (Grappled, Restrained, Prone...) entirely', 'mechanical']
    : STAT_ADD_GRANT.test(twText) ? ['print bakes ability modifiers into the row\'s damage — never a stat-add as a choice (0 of 329); drop the clause, the numbers already include the mod', 'mechanical']
    : RESISTANCE_BYPASS.test(twText) ? ['resistance and immunity interactions are the engine\'s — print has no overcoming-resistance grammar (0 of 329 in combat); drop the clause', 'mechanical']
    : SELF_AC_GRANT.test(twText) ? ['AC is the card\'s — print\'s only AC buff is the Unicorn\'s, on ANOTHER creature, +2 and duration-bounded; a self AC grant never ships', 'mechanical']
    : SELF_DISCLAIMER.test(twText) ? ['state the flavor and stop — print never explains that flavor is flavor; drop the disclaimer sentence', 'mechanical']
    : (TELEPORT_MOVE.test(twText) && !Object.values(sections).flat().some((e) => /teleport/i.test(e.text ?? ''))) ? ['teleport beyond the chassis — a trait cannot grant movement the block does not carry (a "reposition" or vanish-and-reappear IS a teleport)', 'mechanical']
    : chassisOwned(twText, Object.values(sections).flat()) ? [`the sheet already owns ${chassisOwned(twText, Object.values(sections).flat())} — never restate a chassis rule; build the PAYOFF of what the concept adds instead`, 'mechanical']
    : (archetype === 'brute' && OA_FREEDOM(twText)) ? ['unconditional Opportunity-Attack immunity is the skirmisher\'s chassis-priced signature — a brute trait may not grant it free; scope it to a specific move (during its charge) or drop it', 'mechanical']
    // object-return grammar joined 2026-09-04: blade-return traits died
    // to no-game-term 3x across two seeds ("the blade returns to its
    // hand at the end of its turn" IS a rules statement — object-state
    // machinery, not flavor) and the blade fantasy kept losing its
    // anchor trait to the vocabulary gap
    : !/Immunity|Resistance|Advantage|Disadvantage|Speed|darkvision|blindsight|tremorsense|truesight|condition|can't be|cannot be|cover|teleport|Opportunity Attack|provok|Difficult Terrain|unoccupied space|move through|Hit Points|bright light|dim light|obscured|damage|Incapacitated|returns? to (?:its|the creature's) hand|reattach|regrows?/i.test(twText) ? ['no game term — flavor without a rule', 'mechanical']
    : names.some((n) => n === twName.toLowerCase() || (n.length >= 6 && twName.toLowerCase().length >= 6 && (n.startsWith(twName.toLowerCase()) || twName.toLowerCase().startsWith(n)))) ? ['name collides with an existing entry (exact or near-namesake)', 'mechanical']
    : /\blooks? at\b|\bglances? at\b|\bmeets? (?:its|the) (?:gaze|eyes)\b/i.test(twText) ? ['looking is not a game state — no rule can see gaze direction; use print\'s 2024 gaze grammar (the Sea Hag): a save forced on a creature that starts its turn within X feet and can see it', 'judgment']
    : epithetDrift(twText, name, inline) ? [`call the creature "the creature" — the assembler stamps the printed short form, and "the ${epithetDrift(twText, name, inline)}" is a second nickname fracturing the sheet's voice`, 'judgment']
    : /\balone\b/i.test(twText) ? ['"alone" is not a game state — write the distance: "while no other creature is within 30 feet of the target"', 'judgment']
    : /[Oo]utside (?:the|its|this) [^.]{0,40}\b(?:it|the creature) (?:is|has the) Incapacitated/.test(twText) ? ['a location the sheet never establishes cannot disable the creature — add the establishing line ("the creature is bound to the chamber where it is encountered") or drop the outside clause', 'judgment']
    : twText.split(/(?<=\.)\s+/).length > 2 ? ['over 2 sentences', 'judgment'] : null;
  // BOTH cases, ALL positions (the Rust-Thorn shipped a mid-text "The
  // creature is immune to the Grappled condition" verbatim — the old
  // ^-anchored replace only caught text-initial, and the raw sentence
  // read as the ATTACKER gaining the immunity, 2026-09-02). Mirrors the
  // main fill loop's split/join treatment.
  const text = capTerms(twText.split('The creature').join(inline.charAt(0).toUpperCase() + inline.slice(1)).split('the creature').join(inline));
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
  // holy/sacred/sunlight joined 2026-08-27: "only holy light scours it
  // clean" failed the Radiant warrant check with the warrant in hand
  [/\b(?:radiant|hallow\w*|holy|sacred|blessed|sunlight|consecrat\w*)\b/i, 'Radiant'],
  [/\b(?:necrotic|grave-?rot)\b/i, 'Necrotic'],
];
// icon-owned vocabulary may not enter a rename (the Vorpal Saber class)
const RESERVED_NAMES = /vorpal|phylactery|holy avenger|sphere of annihilation|tarrasque|beholder|mind flayer/i;
// OUR words may never ship in rules text (the Gaoler's "a climb speed
// (as per chassis)", 2026-08-27 — template metadata leaked raw)
const ENGINE_VOCAB = /\b(?:chassis|donor|template|placeholder|wildcard)\b/i;
// HEALING BELONGS TO THE ORGAN (owner's recipe-card doctrine applied to
// the defense hydra's 4th head, 2026-09-01: negation -> blanket resist
// -> damage threshold -> "HP become its HP maximum" full-heal, plus a
// hand-built duplicate Regeneration in the same batch). Model text may
// not grant turn-based recovery or set-to-max — the Regeneration organ
// is priced and claimable. DRAIN stays legal: "regains Hit Points equal
// to the damage dealt" is print's Life Drain grammar (no fixed amount,
// no turn timer). INGREDIENTS, not assembled phrases (the Plague-Shrine
// fronted the timing clause — "At the start of each of its turns, it
// regains 10" — and walked past the verb-first pattern, 2026-09-01;
// third word-order evasion after containment and reaction-shape): a
// heal verb with a fixed amount AND a turn timer in the SAME sentence,
// in any order, or any set-to-max phrasing.
const MODEL_HEALING = (t) => t.split(/(?<=\.)\s+/).some((s) =>
  (/regain(?:s|ing|ed)? (?:\d+|all(?: of)?(?: its)?) Hit Points/i.test(s) && /(?:start|end) of (?:each of )?(?:its|the creature's|this creature's|every|each) turn/i.test(s))
  || /Hit Points? (?:become|return to|are restored to)|restored to its Hit Point maximum/i.test(s));
// containment imposed by contact or space-sharing without a save is
// print-illegal (the Greedfall: walk onto you, Restrained, drowning, no
// roll, no exit — print's Cube saves on entry, always)
const NO_SAVE_RESTRAINT = (t) => t.split(/(?<=\.)\s+/).some((s) => (/(?:shar\w+|enters?|inside|in) (?:its|the creature's|this creature's) space[^.]{0,80}Restrained/i.test(s) || /Restrained[^.]{0,60}(?:shar\w+|enters?) (?:its|the creature's) space/i.test(s)) && !/[Ss]aving [Tt]hrow|must succeed/.test(s));
// a save gates the DOOR IN; print restraint always has a door OUT too —
// an escape DC, a repeated save, or a duration (the Gluttenwrought's
// Drowning Deluge: Strength save to avoid, then Restrained forever,
// 2026-09-01). Whole-text check: the exit legally lives in a later
// sentence than the application.
const UNENDING_RESTRAINT = (t) => /has the Restrained condition|is Restrained\b/i.test(t)
  && !/escape DC|While Grappled|until the grapple ends|repeat\w+ the sav|at the end of (?:each of )?(?:its|their) turns?|until the (?:start|end) of|until (?:it|the target|the creature) (?:escapes|is freed|pulls free|breaks free)/i.test(t);
// a stolen or stuck weapon is the restraint-exit rule's sibling (the
// Unburied Field's Embedded Arsenal: every weapon hit sticks, no save,
// no size limit, no retrieval mechanics — three rounds in, the party is
// disarmed without a roll, 2026-09-01). Print's sticky monsters always
// price the stick: the Mimic's Adhesive has an escape DC.
// embedded/lodged joined 2026-09-02 (the Battlefield Chorus: "cannot be
// removed until the battlefield chorus dies" — recovery-by-death-only is
// harsher than anything in print; dying is not an escape clause)
const UNPRICED_DISARM = (t) => /(?:weapons?|shields?|implements?)[^.]{0,60}(?:becomes? (?:stuck|embedded|lodged)|is (?:stuck|embedded|lodged)|stick(?:s|ing)? (?:in|to)|dissolv\w+|is (?:seized|absorbed)|is torn from|cannot be removed)/i.test(t)
  && !/escape DC|DC \d+|[Ss]aving [Tt]hrow|(?:action|check) to (?:retrieve|free|pull|recover)|until the (?:start|end) of/i.test(t);
// attack-Disadvantage defense is legal only WITH a break (the Quelldread:
// permanent "melee attacks against it have Disadvantage" bought back the
// armor the brute curve sold, ~+3-4 effective AC unpriced, 2026-09-01).
// Print's shape is the Displacer Beast: Displacement is disrupted until
// the end of its next turn when the beast takes damage. OA-only
// disadvantage stays legal (narrow, print-common).
const UNBROKEN_DODGE = (t) => t.split(/(?<=\.)\s+/).some((s) => /(?:[Aa]ttack [Rr]olls?|[Mm]elee attacks?|[Rr]anged attacks?)[^.]{0,40}against (?:it|the creature)[^.]{0,60}Disadvantage/i.test(s) && !/Opportunity Attack/i.test(s))
  && !/disrupt\w+|until the (?:start|end) of|while\b|(?:if|when)\b[^.]{0,80}(?:hits?\b|takes damage)|Recharge|\/Day/i.test(t);
// the drain exemption points OUTWARD only (the Battlefield-Thing,
// 2026-09-01: "When it takes Piercing or Slashing damage, it regains Hit
// Points equal to the damage taken" — effective immunity to the two most
// common martial types, wearing the exemption's own clothes). Print
// drains heal off damage DEALT to others (Life Drain); nothing in print
// heals off damage taken. Second tell: a when-hit trigger and a self-heal
// in the same sentence — retaliation TRAITS are legal (quills), but
// retaliation HEALING is not.
const HEAL_BACK = (t) => /regain(?:s|ing|ed)? Hit Points equal to [^.]{0,30}damage (?:taken|it takes|it took)/i.test(t)
  || t.split(/(?<=\.)\s+/).some((s) => /(?:[Ww]hen(?:ever)?|[Ii]f) [^.]{0,80}(?:takes [^.]{0,30}damage|is hit|is struck|hits (?:it|the creature))/.test(s) && /regain(?:s|ing|ed)? [^.]{0,40}Hit Points/i.test(s));
// DAMAGE PRINTS ITS DICE (the Vestige's "58 Radiant damage", 2026-09-02):
// a flat number with no die expression is invisible to BOTH damage caps —
// they key on the "N (XdY)" format — so diceless damage is a defect in
// itself, re-arming every downstream guard at once. Two digits = >=10;
// tiny flat retaliation ("takes 5 Piercing damage", the quill shape)
// stays legal — print itself flattens single-die chip damage.
// (the self-bane exemption mirrors print's one flat shape: the Vampire's
// "takes 20 Acid damage if it ends its turn in running water")
const DICELESS_DAMAGE = /\b\d{2,3} (?:Acid|Bludgeoning|Cold|Fire|Force|Lightning|Necrotic|Piercing|Poison|Psychic|Radiant|Slashing|Thunder) damage(?! if it (?:starts|ends) its turn)/;
// INVENTED CONDITIONS (the Unspoken's "becomes Placid for 1 minute",
// 2026-09-02 — the Entombed class outside the engine's scope: the writer
// minting capitalized condition vocabulary). The mechanic under it is
// often GOOD — the coaching says restructure, never delete: use a
// standard condition, or describe the state in lowercase prose.
const STANDARD_STATES = new Set(['Blinded', 'Charmed', 'Deafened', 'Frightened', 'Grappled', 'Incapacitated', 'Invisible', 'Paralyzed', 'Petrified', 'Poisoned', 'Prone', 'Restrained', 'Stunned', 'Unconscious', 'Exhaustion', 'Bloodied', 'Obscured', 'Hidden', 'Tiny', 'Small', 'Medium', 'Large', 'Huge', 'Gargantuan']);
const inventedCondition = (t) => {
  const m = /\b(?:becomes?|becoming|is|are) ([A-Z][a-z]+)(?= for | until |[.,;]| \()/.exec(t);
  return m && !STANDARD_STATES.has(m[1]) ? m[1] : null;
};
// TYPED DAMAGE DEFENSES ARE THE DERIVATION ENGINE'S (the hydra's general
// form, 4 sightings by 2026-09-02: Fused Monarchy P/S immunity, Wickman
// lit-gated B/P/S, First-Built flat B/P/S at CR 19 ~+60% eHP, Garden
// Saint's retroactive "resistance against that attack"). The engine
// derives resistances from the concept's energy — model text never
// grants them. A TRAIT grant is free and permanent: always mechanical.
// An ACTION may buy a TEMPORARY typed defense with its own action cost
// (print's defensive stances) — mechanical only when unbounded.
// "ignores Resistance" (resistance-piercing) and condition immunities
// (no "damage" in range) stay out of scope by construction.
// reduction grammar joined 2026-09-02 (the Gulletmaw's "Damage from
// bludgeoning, piercing, and slashing attacks is reduced by 5" — flat DR,
// a defense grammar 2024 print doesn't even use; resistance or nothing)
// "ignores damage from" joined 2026-09-04 (the Provost's cloak "ignores
// damage from nonmagical fire" — grant-verb evasion, sighting seven)
const DEFENSE_GRANT = /(?:gain(?:s|ing)?|ha(?:s|ve|ving)|grant(?:s|ing)?|is|becomes?) (?:[Rr]esistan(?:ce|t)|[Ii]mmun(?:e|ity)) to [^.]{0,60}damage|[Dd]amage [^.]{0,60}(?:is|are) reduced by \d+|takes? \d+ less damage|reduc(?:es?|ing) (?:all |any )?damage (?:it takes|taken|dealt to it) by \d+|ignor\w+ (?:all )?damage from/;
// condition immunity is the header's jurisdiction (batch two 2026-09-05:
// Ethereal Stillness + Preserved in Brine both self-granted condition
// immunities from wildcard traits). 0/329 print traits self-grant one —
// the three trait-text "immune to" sightings are 24-hour success
// clauses on OTHER creatures. Self-anchored, so counterplay clauses
// ("A creature immune to the Deafened condition is unaffected") pass.
// SCOPE: fires on a SUITE (2+ conditions in one grant) or any control
// condition — a single flavor immunity the concept earns stays legal
// (the Headless precedent, pinned: "Immunity to the Frightened
// condition" on a headless rider). Phantom chassis now carry print's
// incorporeal suite as donor data, so a phantom trait-grant is a pure
// duplicate of the header.
const CONTROL_CONDITIONS = /Grappled|Restrained|Prone|Paralyzed|Stunned|Incapacitated|Unconscious|Petrified/;
// the numeric-jurisdiction trio (batch four, 2026-09-07 — the Vigil and
// the Drowner): the engine owns every number and every damage-type
// interaction. All three are 0/329 as self-grants — print bakes mods
// into the row, never offers stat-adds as a choice; the corpus's only
// "for the purpose of" is the mule's carrying capacity; its only AC
// buff is the Unicorn's, OTHER-target and duration-bounded.
const STAT_ADD_GRANT = /adds? its \w+ modifier to (?:the |its )?damage/i;
const RESISTANCE_BYPASS = /overcom\w+ [^.]{0,40}(?:resistance|immunit)|for the purposes? of overcoming/i;
const SELF_AC_GRANT = /\b(?:[Ii]t|[Tt]he creature) (?:gains?|has) a ?\+\d+ (?:bonus )?to (?:its )?(?:AC|Armor Class)|\bits (?:AC|Armor Class) increases/;
const conditionImmunityGrant = (t, name = null) => {
  // the model sometimes writes the block's own NAME as subject ("the
  // gallows bed has immunity to..." — dodged the it/the-creature anchor,
  // 2026-09-08); normalize the name to "the creature" before testing
  let s = String(t);
  if (name) s = s.replace(new RegExp(`[Tt]he ${String(name).replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`, 'gi'), 'the creature');
  const m = /\b(?:[Ii]t|[Tt]he creature) (?:is|becomes?|has|gains?) [Ii]mmun(?:e|ity) to ((?:the )?[A-Z][^.]{0,80})/.exec(s);
  if (!m) return false;
  return (m[1].match(/[A-Z][a-z]+/g) ?? []).length >= 2 || CONTROL_CONDITIONS.test(m[1]);
};
// chassis-ownership map (3 specimens in 2 batches: Veil of Brambles and
// Sudden Drop both re-invented the hide-cycle — Sudden Drop dodging the
// day-old guard by inflection, "hide as a bonus action"; Ethereal
// Stillness restated Incorporeal Movement next to it on the same sheet)
// — a wildcard never restates an economy or trait the chassis carries
const CHASSIS_OWNED = [
  [/takes? the Hide action|can take the Hide action|\bhides? as a bonus action\b/i, /takes the Hide action/, 'the hide-cycle (its bonus action grants the Hide action)'],
  // "occupied spaces" joined 2026-09-05 (Regalia of the Rounds dodged
  // the key by synonym in its debut batch — the arms race, incorporeal
  // edition)
  [/move through (?:other creatures|occupied spaces)/i, /move through other creatures/, 'incorporeal movement (its rules trait)'],
  // the disguise key (batch three: False Loot Disguise and Hidden Among
  // Stone both restated False Form's job beside it)
  [/indistinguishable from/i, /indistinguishable from/, 'the disguise (its False Form bonus action)'],
];
const chassisOwned = (text, rows) => {
  for (const [grant, owns, label] of CHASSIS_OWNED) {
    if (grant.test(text) && rows.some((e) => e.rules && owns.test(e.text ?? ''))) return label;
  }
  return null;
};
// teleport grammar the guard must see through (arms race, teleport
// edition: the Toll's "vanishes into the water and repositions to a new
// hunting ground within 60 feet" — a teleport that never says teleport;
// "reposition" is 0/329 in print). The LICENSE side stays the bare word:
// chassis teleport rows say "teleports".
const TELEPORT_MOVE = /teleport|\breposition(?:s|ed|ing)?\b|vanish\w*[^.]{0,60}\b(?:appears?|reappears?|emerges?)\b/i;
// a second nickname fractures the sheet (the Still Choir Echo spoke as
// "the chorister" in one trait and "the echo" in the rest, 2026-09-05)
// — sentence-initial "The <word>" must be the creature's own short
// form, its name, or standard frame vocabulary
const EPITHET_FRAME = new Set(['creature', 'target', 'save', 'effect', 'damage', 'condition', 'conditions', 'area', 'attack', 'attacks', 'first', 'next', 'spell', 'spells', 'roll', 'trigger', 'use', 'uses', 'dc', 'dice', 'turn', 'action', 'grapple', 'hit', 'miss', 'same']);
// capitalized game vocabulary that legally follows "the" — the epithet
// scan must not flag "the Hide action" or "the Grappled condition"
const GAME_CAPS = new Set(['Hide', 'Dash', 'Disengage', 'Dodge', 'Attack', 'Help', 'Search', 'Ready', 'Utilize', 'Grapple', 'Shove', 'Magic',
  'Blinded', 'Charmed', 'Deafened', 'Frightened', 'Grappled', 'Incapacitated', 'Invisible', 'Paralyzed', 'Petrified', 'Poisoned', 'Prone', 'Restrained', 'Stunned', 'Unconscious', 'Exhaustion', 'Bloodied',
  'Acid', 'Bludgeoning', 'Cold', 'Fire', 'Force', 'Lightning', 'Necrotic', 'Piercing', 'Poison', 'Psychic', 'Radiant', 'Slashing', 'Thunder',
  'Strength', 'Dexterity', 'Constitution', 'Intelligence', 'Wisdom', 'Charisma',
  'Tiny', 'Small', 'Medium', 'Large', 'Huge', 'Gargantuan',
  'Speed', 'Ethereal', 'Material', 'Plane', 'Difficult', 'Terrain', 'Opportunity', 'Bright', 'Dim', 'Light', 'Darkness', 'Total', 'Cover', 'Hit', 'Saving', 'Recharge', 'Multiattack', 'Initiative', 'Legendary', 'Resistance', 'Immunity', 'Emanation', 'DC', 'AC']);
const epithetDrift = (text, name, inline) => {
  const ok = new Set(EPITHET_FRAME);
  for (const part of `${name ?? ''} ${inline ?? ''}`.toLowerCase().split(/\s+/)) if (part) ok.add(part);
  const seen = (word) => {
    // a word the text POSSESSES is a body part or belonging, not a
    // nickname ("The creature's quills scream... The quills re-form" —
    // the first live FP, an iron-quilled boar 2026-09-05)
    if (new RegExp(`(?:its|'s) ${word}\\b`, 'i').test(text)) return null;
    return ok.has(word.toLowerCase()) ? null : word.toLowerCase();
  };
  for (const m of String(text).matchAll(/(?:^|\.\s+)The ([a-z]+)\b/g)) {
    const hit = seen(m[1]);
    if (hit) return hit;
  }
  // capitalized epithets at ANY position ("the Silence can use its
  // reaction" — dodged the sentence-initial lowercase scan, 2026-09-08)
  for (const m of String(text).matchAll(/\b[Tt]he ([A-Z][a-z]+)\b/g)) {
    if (GAME_CAPS.has(m[1])) continue;
    const hit = seen(m[1]);
    if (hit) return hit;
  }
  return null;
};
const DEFENSE_DURATION = /until the (?:start|end) of|for 1 (?:minute|round)/i;
// pipeline self-commentary in output (the Living Battlefield: "This is
// purely cosmetic; it grants no mechanical benefit or trait" — the
// writer narrating guard-compliance; print states flavor and stops)
// bookkeeping vocabulary joined 2026-09-04 ("tracked as a pool of two
// spell slots" — NPC blocks never surface slot accounting; engine-vocab
// family wearing rules-speak)
const SELF_DISCLAIMER = /purely cosmetic|no mechanical (?:benefit|effect)|flavor only|cosmetic only|tracked as a|spell slots?\b/i;
// unconditional OA-immunity is the skirmisher's chassis-priced signature
// (Rust-Thorn's Rusting Grip carried it as a free clause-rider on a
// brute); a sentence carrying its own condition (during a charge) is fine
const OA_FREEDOM = (t) => t.split(/(?<=\.)\s+/).some((s) => /(?:doesn't|does not|never) provokes? Opportunity Attacks/i.test(s) && !/\b(?:when|while|during|if|as part of)\b/i.test(s));
// the engulf engine's fiction follows the body (critic's parameterization,
// implemented as a closed menu — owner widened it 2026-08-27: "not enough
// verbs"): one priced row, seven verbal skins. Four are print-verbatim
// names (Swallow x6, Engulf x2 — Cube and Shambling Mound, Smother — the
// Rug, Whelm — the Water Elemental); cage/entomb/cocoon are shaped
// inventions for chains, stone, and silk.
const ENGULF_FORMS = {
  swallow: null, // the authored form
  engulf: { name: 'Engulf', swaps: [['swallows', 'engulfs'], ['swallowed', 'engulfed'], ['regurgitate', 'expel'], ['exits the body', 'pulls free of the mass']] },
  smother: { name: 'Smother', swaps: [['swallows', 'smothers'], ['swallowed', 'smothered'], ['regurgitate', 'release'], ['exits the body', 'pulls free']] },
  // whelm's exit is liquid-neutral ("the waters" read wrong on a tar
  // elemental, 2026-09-01 — whelm covers any liquid, not just water)
  whelm: { name: 'Whelm', swaps: [['swallows', 'whelms'], ['swallowed', 'whelmed'], ['regurgitate', 'release'], ['exits the body', 'pulls free']] },
  cage: { name: 'Cage', swaps: [['swallows', 'cages'], ['swallowed', 'caged'], ['regurgitate', 'release'], ['exits the body', 'pulls free']] },
  entomb: { name: 'Entomb', swaps: [['swallows', 'entombs'], ['swallowed', 'entombed'], ['regurgitate', 'release'], ['exits the body', 'breaks free']] },
  cocoon: { name: 'Cocoon', swaps: [['swallows', 'cocoons'], ['swallowed', 'cocooned'], ['regurgitate', 'release'], ['exits the body', 'tears free']] },
};
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
    // rules rows (Swallow, Trample) fill their types deterministically —
    // print's interiors digest whatever the attack mix says
    .filter((e) => e.text.includes('{damage_type}') && !e.rules).map((e) => e.name);
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
  // CONDITION name-claims (promoted from advisory lint 2026-09-08 —
  // "Petrifying Patient" promised Petrified over a Frightened row twice
  // in two legendary draws): a rename claiming a condition must sit on a
  // row whose rule applies it. Validated, so the retry reconciles —
  // the model renames honestly or the row earns the word.
  {
    const CONDITION_CLAIMS = [[/\bparalyz\w*/i, 'Paralyzed'], [/\bpetrif\w*/i, 'Petrified'], [/\bstunn\w*/i, 'Stunned'], [/\bblinding\b/i, 'Blinded'], [/\bdeafen\w*/i, 'Deafened'], [/\bcharm\w*/i, 'Charmed'], [/\brestrain\w*/i, 'Restrained']];
    const rows = Object.entries(scaled.sections).flatMap(([, es]) => es);
    for (const k of keys) {
      const rn = String(p.renames?.[k] ?? '').trim();
      if (!rn) continue;
      const row = rows.find((e) => e.name === k);
      if (!row || row.wildcard_slot) continue; // the slot's rule is the wildcard's — checked elsewhere
      const ruleText = `${row.text} ${Object.values(p.conditions ?? {}).join(' ')}`;
      for (const [claim, cond] of CONDITION_CLAIMS) {
        if (claim.test(rn) && !new RegExp(`\\b${cond}\\b`).test(ruleText)) {
          defects.push(`name "${rn}" promises ${cond} but the row never applies it — name what the rule does, or drop the claim word`);
        }
      }
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
  // the ENERGY WELD applies to wildcard PROSE too (the Gullet's improvised
  // swallow dealt Acid on a mix=physical creature, 2026-08-26 — the weld
  // only checked the damage_types fields, so prose walked around it)
  {
    const proseTypes = new Set([...`${p.wildcard} ${p.trait_wildcard?.text ?? ''}`
      .matchAll(/\b(Acid|Cold|Fire|Force|Lightning|Necrotic|Poison|Psychic|Radiant|Thunder)\b(?= damage)/g)].map((m2) => m2[1]));
    for (const t of proseTypes) {
      if (mix === 'physical') defects.push(`the wildcard deals ${t} but this creature is declared fully physical — use Bludgeoning, Piercing, or Slashing`);
      else if (energy && t !== energy) defects.push(`the wildcard deals ${t} but this creature's energy is ${energy} — use ${energy} or a physical type`);
    }
  }
  if (Object.values(scaled.sections).flat().some((e) => (e.text ?? '').includes('{projectile}'))) {
    const proj = String(p.projectile ?? '').trim();
    if (!proj || proj.split(/\s+/).length > 4) defects.push('projectile missing (the thrown thing with its article, 4 words max)');
  }
  if (Object.values(scaled.sections).flat().some((e) => e.engulf_engine)) {
    const st = String(p.engulf_style ?? '').trim().toLowerCase();
    if (st && !['swallow', 'engulf', 'smother', 'whelm', 'cage', 'entomb', 'cocoon'].includes(st)) defects.push(`engulf_style "${st}" is not on the menu — swallow, engulf, smother, whelm, cage, entomb, or cocoon`);
    // the engine is PRICED; a wildcard re-implementing containment beside
    // it ships two contradicting systems (the Cairn: two entombs, two
    // caps, two escapes — 2026-09-01). The engine wins; the wildcard
    // builds the concept's other face. Detection is deliberately BROAD
    // (the Tavern's "pulled into the barroom and swallowed" beat the
    // old word-order pattern, 2026-09-01): with the engine aboard, ANY
    // containment vocabulary, interior cover, or an invented containment
    // condition ("becoming Entombed (escape DC...)") is the tell.
    const wcText = String(p.wildcard);
    if (/(?:swallow|entomb|engulf|whelm|smother|cocoon|encase|seal)\w*/i.test(wcText)
      || /pours? over|cover\w* (?:it|the target) in|drown\w*/i.test(wcText)
      || /Total Cover/i.test(wcText)
      || /becom\w+ [A-Z]\w+ \(escape DC/.test(wcText)) {
      defects.push('the chassis already carries the priced containment engine — the wildcard must not re-implement it; build a different ability for this concept');
    }
  }
  if (Object.values(scaled.sections).flat().some((e) => (e.text ?? '').includes('{spell_at_will}'))) {
    const aw = Array.isArray(p.spells?.at_will) ? p.spells.at_will : [];
    const dl = Array.isArray(p.spells?.daily) ? p.spells.daily : [];
    const all = [...aw, ...dl];
    if (aw.length !== 2 || dl.length !== 2) defects.push('spells missing — exactly 2 at_will and 2 daily picks from the menu');
    for (const sp of all) if (!(scaled.spell_menu ?? SPELL_MENU).includes(sp)) defects.push(`"${sp}" is not on the spell menu — pick from: ${(scaled.spell_menu ?? SPELL_MENU).join(', ')}`);
    if (new Set(all).size !== all.length) defects.push('spell picks must not repeat');
    // redundancy is no longer a repair conversation (2026-09-01: two
    // rounds failed a one-word Heroism swap on the First Word, then
    // shipped it anyway) — the fill site drops dead picks and backfills
    // from the menu deterministically. Tier assignment lives there too.
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
  // no silent archetype default (owner ruling, 2026-08-26, same law as
  // pickDonor): a mis-wired route fails loudly, never ships the wrong
  // chassis family
  const archetype = options.archetype;
  if (!archetype) throw new Error('generateReskin requires an explicit archetype — no silent default');
  const progress = (phase, data) => { try { onProgress?.({ phase, ...data }); } catch { /* display-only */ } };
  // mechanics-informed pick (3rd sighting — efreet teleport, the Gulper
  // pre-fix, the Walking Cairn): a claimed engulf on a brute pulls the
  // grappler line, which alone carries the engine; the style inference
  // routed "seals them inside its stones" to juggernaut and the concept's
  // whole promise fell to the fallback zap
  let style = options.style ?? null;
  if (archetype === 'brute' && (options.mechanics ?? []).includes('engulf') && style !== 'grappler') {
    trace('style overridden:', `engulf claimed — the grappler line carries the engine (was ${style ?? 'plain'})`);
    style = 'grappler';
  } else if (archetype === 'brute' && (options.mechanics ?? []).includes('regeneration') && style !== 'regenerator') {
    // same law as engulf->grappler (regenerator seat 0/3 draws,
    // 2026-09-01: scar-colossus seeds read as grapple/juggernaut and the
    // authored line sat unexercised): the claimed mechanic picks the line
    // that carries its organ. Engulf outranks — an engine beats an organ.
    trace('style overridden:', `regeneration claimed — the regenerator line carries the organ (was ${style ?? 'plain'})`);
    style = 'regenerator';
  }
  // THE MENU PRIOR (critic counter-offer, ratified 2026-09-02): the
  // Artillery/Controller menu entries pin a style prior over the one
  // caster pool. It fills style ONLY when the concept claimed none — a
  // claimed style outranks the menu label (the no-force ruling, same
  // precedence family as the engulf override).
  if (!style && options.stylePrior) {
    style = options.stylePrior;
    trace('style prior applied:', `the menu pins ${style} — the concept claimed no style`);
  }
  const donor = pickDonor(cr, style, archetype);
  const scaled = scaleDonor(donor, cr, { movement: options.movement ?? [], mechanics: options.mechanics ?? null });
  // the caster family's Spellcasting row is CHASSIS — it ships template-
  // fed with its own menu whether or not the checkbox is set, and the
  // checkbox organ must never double it (donor row exists -> skip below)
  if (archetype === 'caster') scaled.spell_menu = CASTER_SPELL_MENU;
  const hasChassisSpellRow = Object.values(scaled.sections).flat().some((e) => e.name === 'Spellcasting');
  if (options.caster && !hasChassisSpellRow) {
    // the menu follows the archetype: a skirmisher's magic is escape
    // tech, a brute's hardens its own hide and fists (owner, 2026-09-01)
    scaled.spell_menu = archetype === 'brute' ? BRUTE_SPELL_MENU : SPELL_MENU;
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
  // REGENERATION OFF-SWITCH follows the concept (owner, 2026-08-26:
  // "looks too much like a troll — needs generifying"). Print's own
  // pattern: the trait text is standard but the break element follows
  // the creature's nature — Troll breaks on Acid/Fire, Vampire on
  // Radiant. Derived as the FOIL of the creature's declared energy
  // (the element that unmakes it); no energy keeps print's default.
  // REGENERATION AS AN INJECTABLE ORGAN (owner, 2026-09-01): reknit
  // concepts kept routing to styles whose donors carry no Regeneration
  // row, and the model hand-built garbled versions three times (wax,
  // rust, marble). Now the concept CLAIMS it (mechanics menu) and the
  // rules-true trait injects onto whatever donor the style routing
  // picked — the same shape as the spellcasting organ.
  if (archetype === 'brute' && (options.mechanics ?? []).includes('regeneration')
    && !Object.values(scaled.sections).flat().some((e) => e.name === 'Regeneration')) {
    const amount = cr >= 17 ? 20 : cr >= 10 ? 15 : 10;
    (scaled.sections.Traits = scaled.sections.Traits ?? []).unshift({
      name: 'Regeneration', rules: true,
      text: `The creature regains ${amount} Hit Points at the start of each of its turns. If the creature takes Acid or Fire damage, this trait doesn't function on the creature's next turn. The creature dies only if it starts its turn with 0 Hit Points and doesn't regenerate.`,
    });
    trace('regeneration organ injected —', `${amount}/turn`);
  }
  let regenBaneApplied = false;
  {
    const regen = Object.values(scaled.sections).flat().find((e) => e.name === 'Regeneration');
    const REGEN_FOIL = { Necrotic: 'Radiant', Cold: 'Fire', Fire: 'Cold', Lightning: 'Thunder', Thunder: 'Lightning', Radiant: 'Necrotic', Poison: 'Fire', Acid: 'Fire' };
    // a CLAIMED bane outranks the energy foil (the wax colossus,
    // 2026-08-27: "only holy light scours it clean" — the concept names
    // its own undoing, and the machinery derived Cold from Fire instead).
    // Frame-anchored so a fire-thing's own fire never reads as its bane.
    let bane = null;
    const frame = /\bonly ([^.]{0,60}?)(?:scours|destroys|harms|undoes|unmakes|banishes|slays|stops|kills|shatters?|breaks?|fells?|parts?|severs?|sunders?|pierces?|ends?|wounds?|brings? (?:it|him|her|them) down|can (?:stop|kill|slay|harm|destroy|shatter|break|wound|end|fell|pierce|part|sever)|can truly)/i.exec(concept);
    if (frame) {
      for (const [re, type] of NAME_CLAIMS) {
        if (!re.test(frame[1])) continue;
        // the storm family's type is null (Lightning OR Thunder) — for a
        // bane, the claim word itself disambiguates
        bane = type ?? (/thunder/i.test(frame[1]) ? 'Thunder' : 'Lightning');
        break;
      }
    }
    const off = bane ?? REGEN_FOIL[options.energy ?? ''];
    if (regen && off) {
      regen.text = regen.text.replace('Acid or Fire damage', `${off} damage`);
      trace('regeneration off-switch:', bane ? `${off} (the concept names its own undoing)` : `${off} (foil of ${options.energy})`);
    }
    regenBaneApplied = bane != null;
  }
  trace('donor:', `${donor.id} -> CR ${cr}${donor.invented ? ' (invented — no printed peer)' : ''}`);
  for (const g of scaled.gated_out ?? []) trace('row gated out:', `${g} — the concept did not claim this mechanic`);
  {
    const covered = [];
    if (Object.values(scaled.sections).flat().some((e) => e.engulf_engine)) covered.push(/wrap|crush|swallow|gulp|engulf|drown|entomb|seal|smother|constrict|cocoon|whelm|cage/i);
    if (Object.values(scaled.sections).flat().some((e) => e.name === 'Regeneration')) covered.push(/rekni|regrow|regenerat|heal|reform|reassembl/i);
    const seats = assignSeats(options.signatureElements ?? [], { style: scaled.style ?? null, covered });
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
  const reskinPrompt = buildReskinPrompt(scaled, { concept, takenNames: options.takenNames ?? [], signatureElements: options.signatureElements ?? [], energy: options.energy ?? null, mix: options.mix ?? null, mind: options.mind ?? null, resolvedType: options.resolvedType ?? null });
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
      && [...p.spells.at_will, ...p.spells.daily].every((x) => (scaled.spell_menu ?? SPELL_MENU).includes(x)));
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
{${missingRenames.length ? ` "renames": { ${missingRenames.map((k) => `"${k}": "<new name for this mechanic in the concept's register: plain English, 4 words MAX, different from the original, never claiming an element the row's damage does not pay>"`).join(', ')} },` : ''}${missingTypes.length ? ` "damage_types": { ${missingTypes.map((k) => `"${k}": "<damage type${declaredEnergy ? ` — ${declaredEnergy} or a physical type; this creature's energy is ${declaredEnergy}` : ''}>"`).join(', ')} },` : ''}${askRider ? ` "melee_rider": "<${declaredEnergy ? `${declaredEnergy}, a physical type, or none` : 'energy type or none'}>",` : ''}${projMissing ? ` "projectile": "<the thrown thing with its article, 1-3 words>",` : ''}${spellsMissing ? ` "spells": { "at_will": ["<exactly 2 from: ${(scaled.spell_menu ?? SPELL_MENU).join(', ')}>"], "daily": ["<exactly 2 more, no repeats>"] },` : ''}${missingConds.length ? ` "conditions": { ${missingConds.map((sl) => `"${sl}": "<one of: ${CONDITION_MENUS[sl].join(', ')}>"`).join(', ')} }` : ''} }`;
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
  // the resolve's creature_type is the engine's, not the model's (first
  // lurker smoke 2026-09-04: 4 of 5 blocks drifted to the Monstrosity
  // default against the resolve — an Undead spirit shipped without its
  // immunity stamps). Prompt pins it; this stamp makes it deterministic.
  if (options.resolvedType && p.type !== options.resolvedType) {
    trace('type stamped:', `the resolve said ${options.resolvedType} — the model answered ${p.type ?? 'nothing'}`);
    p.type = options.resolvedType;
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
  // title-case with lowercase connectives — the blanket capitalizer
  // minted "Grille Of The Hollow Confession" and "Vigil Of The Pass"
  // (2026-09-07); print writes "of the"
  if (!fixedName) {
    const SMALL = new Set(['of', 'the', 'a', 'an', 'and', 'or', 'in', 'on', 'at', 'to', 'for', 'from', 'with', 'by']);
    p.name = p.name.split(/\s+/).map((w, i) => (i && SMALL.has(w.toLowerCase()) ? w.toLowerCase() : w[0].toUpperCase() + w.slice(1))).join(' ');
  }

  // ENGINE AS SIGNATURE (owner ruling 2026-09-01, "keep the recipe card,
  // I don't trust the llm" — 3rd dual-containment instance): when a
  // single-faced concept's wildcard insists on re-implementing the
  // engine through both repair rounds, the slot is DROPPED — no bespoke
  // twin, no fallback zap. Print's own shape: the T-Rex is bite,
  // swallow, tail, done; no print swallower carries a second swallow.
  let engineIsSignature = false;
  if (Object.values(scaled.sections).flat().some((e) => e.engulf_engine)
    && reskinDefects(scaled, p, { energy: options.energy ?? null, mix: options.mix ?? null })
      .some((d) => d.includes('must not re-implement'))) {
    engineIsSignature = true;
    trace('engine is the signature —', 'the wildcard insisted on re-implementing containment; the slot is dropped');
  }

  // the engulf engine wears the body's own verb (closed menu — the
  // Gaoler's "Chain-Cage... swallows one creature", 2026-08-27: a chain
  // bundle shouldn't swallow, and print names the mouth form Swallow x4
  // verbatim, so the row is rules-named per form, never model-named)
  {
    const row = Object.values(scaled.sections).flat().find((e) => e.engulf_engine);
    const form = ENGULF_FORMS[String(p.engulf_style ?? '').trim().toLowerCase()];
    if (row && form) {
      row.name = form.name;
      for (const [from, to] of form.swaps) row.text = row.text.split(from).join(to);
      // article agreement after vowel-initial swaps ("a entombed
      // creature" shipped twice, 2026-09-01)
      row.text = row.text.replace(/\ba ([aeiouAEIOU])/g, 'an $1');
      trace('engulf engine:', `${form.name} — the body's own verb`);
    }
    // engine rows fill their damage types deterministically — print's
    // interiors DIGEST regardless of the creature's attack mix (Giant
    // Toad and Purple Worm interiors deal Acid); cages and tombs crush
    if (row) {
      // digestion is Acid (Toad, Worm); every other containment crushes
      // or suffocates — print's Rug and Whelm both deal Bludgeoning
      const interior = { Swallow: 'Acid', Engulf: 'Acid' }[row.name] ?? 'Bludgeoning';
      row.text = row.text.split('{damage_type}').join(interior);
      // interiors scale BELOW the seat floor (the Murgor: a CR 1/2 ooze
      // carrying the brute-5 seat's 2d6 against an 8-DPR budget,
      // 2026-09-01 — print's CR 1/4 Frog swallows with smaller dice)
      if (cr < donor.cr) {
        const ratio = cr / donor.cr;
        const dm = /(\d+) \((\d+d\d+)\)/.exec(row.text);
        if (dm) {
          const t = engineDiceFor(Math.max(2, Math.round(Number(dm[1]) * ratio)));
          row.text = row.text.replace(dm[0], `${t.avg} (${t.dice})`);
        }
        row.text = row.text.replace(/takes (\d+) damage or more/, (m2, n) => `takes ${Math.max(5, Math.round(Number(n) * ratio))} damage or more`);
        trace('engine interior scaled —', `CR ${cr} sits below the ${donor.id} seat`);
      }
    }
    for (const e of Object.values(scaled.sections).flat()) {
      if (e.rules && e.name === 'Trample') e.text = e.text.split('{damage_type}').join('Bludgeoning');
    }
  }

  // apply renames; ANY unrenamed entry is a loud failure (owner spec)
  const sections = {};
  const renamed = new Map();
  for (const [sec, es] of Object.entries(scaled.sections)) {
    sections[sec] = es.map((e) => {
      // rules vocabulary keeps its printed name — the table recognizes it
      // at a glance (the skeleton path name-locks these for the same reason)
      if (e.rules || e.name === 'Multiattack' || /^Legendary Resistance/.test(e.name)) return { name: e.name, text: e.text, ...(e.rules ? { rules: true } : {}) };
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
  // THE SHORT FORM (owner + critic converged, 2026-08-27): print never
  // drops a long name into its own rules text — the Ancient Red Dragon
  // says "the dragon", the Animated Rug of Smothering "the rug", the
  // Sphinx of Lore "the sphinx" (57 print names of 3+ words, every one
  // shortened; 0/329 print names contain a comma). "The khazur-mul, the
  // tide king cannot be surprised" shipped 13 times in one block.
  const shortForm = (full) => {
    let s = String(full).trim();
    // "X, the Y" — the title half is what the table says out loud
    if (s.includes(',')) s = s.split(',').pop().trim();
    s = s.replace(/^the\s+/i, '');
    // "N that VP" heads on the noun BEFORE the relative ("Hush That
    // Endures" -> hush) — the last-word rule minted "the endures", a
    // verb wearing an article (2026-09-08)
    if (/\s(?:that|who|which)\s/i.test(s)) s = s.split(/\s(?:that|who|which)\s/i)[0].trim();
    // "X of Y" heads on X (Sphinx of Lore -> sphinx; Rug of Smothering -> rug)
    if (/\sof\s/i.test(s)) s = s.split(/\sof\s/i)[0].trim();
    const words = s.split(/\s+/);
    // two words is print's own inline ceiling (the dire wolf, the bog
    // lurker ship whole); longer heads on the final noun
    if (words.length > 2) s = words.slice(-1)[0];
    return s.toLowerCase();
  };
  const inline = `the ${shortForm(p.name)}`;
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
      e.text = e.text.split('The creature').join(inline.charAt(0).toUpperCase() + inline.slice(1)).split('the creature').join(inline);
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
          e.text = e.text.split('The creature').join(inline.charAt(0).toUpperCase() + inline.slice(1)).split('the creature').join(inline);
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
        const menu = scaled.spell_menu ?? SPELL_MENU;
        // the model picked WHICH spells; the organ owns the tiers and the
        // redundancy sweep (deterministic drop-and-backfill — two repair
        // rounds failed a one-word Heroism swap on the First Word,
        // 2026-09-01; this is not a model conversation)
        const sheetText = JSON.stringify(sections);
        const redundant = (sp) => (sp === 'Stoneskin' && /resistance to Bludgeoning, Piercing, and Slashing/i.test(sheetText))
          || (sp === 'Heroism' && p.type === 'Construct');
        let picks = [...new Set([...p.spells.at_will, ...(Array.isArray(p.spells.daily) ? p.spells.daily : [])])]
          .filter((x) => menu.includes(x));
        for (const dead of picks.filter(redundant)) {
          picks = picks.filter((x) => x !== dead);
          const fill = menu.find((x) => !picks.includes(x) && !redundant(x));
          if (fill) { picks.push(fill); trace('spell redundancy dropped —', `${dead} -> ${fill}`); }
        }
        // COUNT BACKFILL (Grandmother Hush, 2026-09-02: the menu filter
        // silently dropped a twice-rejected Silence and three spells
        // shipped — the 2+2 law bent at fill). Top up deterministically.
        while (picks.length < 4) {
          const fill = menu.find((x) => !picks.includes(x) && !redundant(x));
          if (!fill) break;
          picks.push(fill);
          trace('spell count backfilled —', fill);
        }
        // a damage spell sits at-will only when it doesn't out-hit an
        // attack row (the Lich law, measured 2026-09-02: Fireball 28 vs
        // 31/burst at-will at CR 21; the same Fireball is 1/Day on the
        // CR 17 Red Dragon whose rows it would rival)
        // THE TIER ALGORITHM, corrected (batch-four inversion, 2026-09-04:
        // blaster-first + a hard two-slot at-will cap displaced CANTRIPS
        // to 1/Day — "1/Day: Mage Hand" is rules-nonsense; and per_hit x
        // 1.2 admitted at-will Fireball at CR 12 on big-hit chassis).
        // Print's actual shape: at-will lists GROW (the Archmage holds 7);
        // at-will damage sits within a die of row parity; and the highest
        // at-will leveled spell in the whole corpus is LEVEL 3 (the
        // Lich's Fireball). So: at-will = everything eligible, daily =
        // only what must be gated — displacement is structurally
        // impossible and a cantrip can never be rationed.
        // damage spells carry a LEVEL ceiling by CR (print: sub-17
        // at-will damage tops at level 2 — the dragons' Scorching Ray;
        // level-3 at-will is the Lich's alone, at 21). Utility levels are
        // free — the Glabrezu at-wills Dispel Magic (level 3) at CR 9.
        const atWillLvlCap = cr >= 17 ? 3 : 2;
        const atWillOK = (x) => !NEVER_AT_WILL.has(x)
          && (!SPELL_DAMAGE_AVG[x] || ((SPELL_UPCAST[x]?.[0] ?? 0) <= atWillLvlCap && SPELL_DAMAGE_AVG[x] <= (scaled.per_hit ?? 6) + 2));
        const eligible = picks.filter(atWillOK);
        const atWill = [...eligible.filter((x) => SPELL_DAMAGE_AVG[x]), ...eligible.filter((x) => !SPELL_DAMAGE_AVG[x])];
        const daily = picks.filter((x) => !atWill.includes(x));
        // daily damage spells upcast to row parity, print's Pit Fiend
        // shape; at-will stays base (star renders the label)
        const upcastLabel = (x) => {
          const meta = SPELL_UPCAST[x]; const base = SPELL_DAMAGE_AVG[x];
          if (!meta || !base) return '';
          const lvl = Math.min(9, meta[0] + Math.max(0, Math.floor(((scaled.per_hit ?? 0) - base) / meta[1])));
          return lvl > meta[0] ? ` (level ${lvl} version)` : '';
        };
        const star = (list, limited = false) => list.map((x) => `*${x}*${limited ? upcastLabel(x) : ''}`).join(', ');
        // either line vanishes cleanly when empty: the golem ships daily
        // buffs with no At-Will line; a light all-eligible list ships
        // at-will with no 1/Day line
        e.text = e.text
          .replace(/- \*\*At Will:\*\* \{spell_at_will\}\n/, atWill.length ? `- **At Will:** ${star(atWill)}\n` : '')
          .replace(/- \*\*1\/Day Each:\*\* \{spell_daily\}/, daily.length ? `- **1/Day Each:** ${star(daily, true)}` : '')
          .replace(/\n+$/, '');
        // the spell-attack pairing (print's format: "spell save DC 17,
        // +9 to hit with spell attacks") whenever the list rolls attacks
        if (picks.some((x) => SPELL_ATTACK_SPELLS.has(x))) {
          e.text = e.text.replace(/\(spell save DC (\d+)\)/, (m0, dc) => `(spell save DC ${dc}, +${Number(dc) - 8} to hit with spell attacks)`);
        }
      }
      if (e.wildcard) pendingWildcard = e; // vetted after the trait lands (reference contract + repair)
      if (e.wildcard && engineIsSignature) { e.dropSlot = true; pendingWildcard = null; }
      delete e.was; delete e.wildcard; delete e.gate;
    }
  }
  // the dropped slot leaves no residue — no bespoke twin, no fallback zap
  if (engineIsSignature) {
    for (const es of Object.values(sections)) {
      const idx = es.findIndex((e) => e.dropSlot);
      if (idx !== -1) es.splice(idx, 1);
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
    // alignment is a CLOSED vocabulary (the Gaoler shipped "Unaligned
    // (Feral, Driven By Its Prison'S Grief)" — lore welded into the field,
    // and the old title-caser minted the 'S). Extract the alignment,
    // discard everything else.
    alignment: (() => {
      const am = /\b(?:(Lawful|Neutral|Chaotic)[\s-]+(Good|Neutral|Evil)|Neutral|Unaligned|Any Alignment)\b/i.exec(String(p.alignment ?? ''));
      const cap = (s) => s[0].toUpperCase() + s.slice(1).toLowerCase();
      if (!am) return 'Unaligned';
      const out = am[1] ? `${cap(am[1])} ${cap(am[2])}` : cap(am[0]).replace(/ alignment/i, ' Alignment');
      if (out !== String(p.alignment).trim()) trace('alignment sanitized:', `"${p.alignment}" -> "${out}"`);
      return out;
    })(),
    // scaled.ac/hp carry the donor's declared card spend (brute ac_offset,
    // hp_scale, flight tax) — card.ac here bypassed them (invisible on
    // skirmisher, where scaled.ac always equaled the card)
    ac: scaled.ac, hp: scaled.hp,
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
    generation: { path: 'reskin', donor: donor.id, archetype, ...(options.menuRole ? { menu_role: options.menuRole } : {}), ...(donor.invented ? { invented: true } : donor.cite ? { cite: donor.cite } : {}) },
    archetype, archetype_source: 'user',
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
    // "adjacent to" is not 5e vocabulary in either edition (Gutter Glare
    // shipped it past the advisory lint, 2026-09-04) — a closed
    // phrase-for-phrase swap; bare "adjacent" stays detect-and-repair
    .replace(/\badjacent to\b/gi, 'within 5 feet of')
    .replace(/\bhit point(s?)\b/g, 'Hit Point$1')
    // 2024 keyword swap (Tomb Warden, 2026-08-27): corpus writes
    // "Bloodied" x16, the 2014 half-HP phrase x0 — closed phrase, one
    // keyword, safely below the grammar line
    .replace(/\bha(s|ve) fewer than half (?:its|their) [Hh]it [Pp]oints(?: remaining)?\b/g,
      (m, v) => (v === 've' ? 'are Bloodied' : 'is Bloodied'))
    // the vacuous 1-HP clause (4 sightings: Tide King, Cairn, Molten
    // Crown, Slag Crown) — always true, does nothing; a fixed closed
    // phrase, stripped whole at both positions
    .replace(/(^|\. )[Ww]hile (?:it|the [\w' -]{1,30}?) has at least 1 Hit Point,\s*([a-z])/g, (m, pre, c) => pre + c.toUpperCase())
    .replace(/,? while (?:it|the [\w' -]{1,30}?) has at least 1 Hit Point/g, '');
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
        // a rider-hosting row carries MODEL text now — it must be
        // rewrite-eligible (the Emberward's Dawn-Throw, 2026-09-04:
        // five audit findings on rider garbles, every rewrite blocked
        // by chassis-immunity because the row was never marked)
        row.model = true;
        for (const es of Object.values(sections)) {
          const idx = es.indexOf(pendingWildcard);
          if (idx !== -1) es.splice(idx, 1);
        }
        trace(label2, `${flag ? v.text : v.text.slice(0, 80)}${flag ? ` — shipped over a judgment flag (${flag})` : ''}`);
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
    trace(label, `${flag ? v.text : v.text.slice(0, 100)}${flag ? ` — shipped over a judgment flag (${flag})` : ''}`);
  };
  {
    const v = vetTraitWildcard(p.trait_wildcard, sections, { name: p.name, inline, archetype });
    if (v.okay) shipTrait(v, 'trait wildcard:');
    else if (!v.silent) {
      traitRejected = v;
      trace('trait wildcard rejected —', `${v.why}: ${v.draft.slice(0, 120)}`);
    }
  }
  let wcRejected = null;
  let fallbackShipped = null;
  if (pendingWildcard) {
    const v = vetActionWildcard(p.wildcard, scaled, { name: p.name, inline, missingTraitName: traitRejected?.name ?? null, economy: p.wildcard_economy, archetype });
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
      // FROZEN-ECONOMY FIX (War-Rune Colossus, 2026-09-01): when the
      // rejection was economy-based, the repair's converted draft must
      // not be vetted against the model's ORIGINAL declaration — it is
      // frozen at 'reaction' and no conversion can ever pass. Clear it;
      // the draft's own prose routes its placement.
      const repairEconomy = /no reactions/.test(wcRejected?.why ?? '') ? null : p.wildcard_economy;
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
${wcRejected ? `ACTION draft rejected — ${wcRejected.why}. Draft: "${wcRejected.draft}"\nRewrite it: the monster is always 'the creature'; its victim is always 'the target' and NEVER 'the creature'; ${targeting}; max 4 sentences; any save is DC ${scaled.dc}; damage at most ${Math.round(scaled.per_hit * 1.2)} average, ALWAYS as dice with the average like "27 (5d8 + 5)", never a flat number; no effect on "starts its turn"; no second person; a per-attack trigger needs a rate limit; an ability that throws or detaches part of the body must state when and how it returns; acting from a distant point allows RANGED attacks only; reference nothing that is not on the sheet.${whyConstraint}\n` : ''}${traitRejected ? `TRAIT draft rejected — ${traitRejected.why}. Name: "${traitRejected.name}" Text: "${traitRejected.draft}"\nRewrite it: ONE passive rule, 2 sentences max, 2024 voice — an immunity, a sense, a movement rule, a condition interaction. No damage numbers, no saves, no Recharge, no auras, no second person.\n` : ''}Return ONLY JSON: {${wcRejected ? ' "wildcard": "<the rewritten action rule>"' : ''}${wcRejected && traitRejected ? ',' : ''}${traitRejected ? ' "trait_wildcard": { "name": "<4 words max>", "text": "<2 sentences max>" }' : ''} }`;
      // per-piece; a judgment-tier repair passes validation (it will ship
      // flagged anyway) — only mechanical failures burn a retry
      const fixValidator = (j) => {
        let parsed; try { parsed = JSON.parse(String(j).replace(/^```json\s*|```\s*$/g, '').trim()); } catch { return false; }
        let anyGood = false;
        if (wcRejected && typeof parsed.wildcard === 'string') {
          const v = vetActionWildcard(parsed.wildcard, scaled, { name: p.name, inline, economy: repairEconomy, archetype });
          if (v.okay || v.tier === 'judgment') anyGood = true;
          else trace('repair draft rejected —', `${v.why}: ${v.draft.slice(0, 100)}`);
        }
        if (traitRejected && parsed.trait_wildcard) {
          const v = vetTraitWildcard(parsed.trait_wildcard, sections, { name: p.name, inline, archetype });
          if (v.okay || v.tier === 'judgment') anyGood = true;
          else if (!v.silent) trace('repair trait draft rejected —', `${v.why}: ${(v.draft ?? '').slice(0, 100)}`);
        }
        return anyGood;
      };
      const fixRaw = await callLLM(fixPrompt, fixValidator);
      const fix = JSON.parse(String(fixRaw).replace(/^```json\s*|```\s*$/g, '').trim());
      if (traitRejected && fix.trait_wildcard) fixedTrait = vetTraitWildcard(fix.trait_wildcard, sections, { name: p.name, inline, archetype });
      if (wcRejected && typeof fix.wildcard === 'string') fixedWc = vetActionWildcard(fix.wildcard, scaled, { name: p.name, inline, missingTraitName: null, economy: repairEconomy, archetype });
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
      else {
        // FALLBACK HONESTY (critic's screenshot class, 2026-08-27): the
        // slot ships its generic zap under the model's concept-promising
        // rename ("Entomb" that entombs nothing) — the audit gets told
        fallbackShipped = pendingWildcard?.name ?? null;
        trace('wildcard repair failed —', `${fixedWc?.why ?? 'no repair'}; chassis text stands${fallbackShipped ? ` under the name "${fallbackShipped}"` : ''}`);
      }
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
    // register: print writes "can't speak (them)", never "does not speak"
    // (the Vigil, 2026-09-07) — a closed token swap
    if (monster.languages) monster.languages = String(monster.languages).replace(/\bbut does not speak\b/, "but can't speak");
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
    // Layer 1.5 — the donor's own suite (the phantom line, 2026-09-05):
    // print pairs the incorporeal discount WITH a header suite (Specter/
    // Wraith/Ghost all carry Grappled/Paralyzed/Petrified/Prone/
    // Restrained + physical resistances) — the tech that PAYS for the
    // 0.7x HP. Chassis data, unioned over the type floor; the batch-two
    // wildcards were reaching for this in the wrong place.
    const suite = scaled.defense_suite ?? null;
    for (const x of suite?.resist ?? []) resist.add(x);
    {
      const d = [...new Set([...(FLOOR?.damage ?? []), ...(suite?.damage ?? [])])].sort();
      const c = [...new Set([...(FLOOR?.conditions ?? []), ...(suite?.conditions ?? [])])].sort();
      if (d.length || c.length) {
        monster.immunities = d.join(', ') + (c.length ? `${d.length ? '; ' : ''}${c.join(', ')}` : '');
        trace('immunities stamped for type:', `${monster.type}${suite ? ' + donor suite' : ''} -> ${monster.immunities}`);
      }
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
      // the regen off-switch CONSULTS the shipped vulnerability (3rd
      // discord sighting, 2026-09-01: "only a blessed blade parts them"
      // missed the frame verbs, so the sheet said Vulnerable Radiant
      // beside an Acid-or-Fire off-switch — the vulnerability provenance
      // already answered "what is this thing's bane"; reuse the answer
      // instead of chasing frame verbs forever)
      const regenRow = (monster.sections.Traits ?? []).find((e) => e.name === 'Regeneration');
      if (regenRow && !regenBaneApplied && !regenRow.text.includes(`${vul} damage`)) {
        regenRow.text = regenRow.text.replace(/takes [A-Z]\w+(?: or [A-Z]\w+)? damage, this trait/, `takes ${vul} damage, this trait`);
        trace('regeneration off-switch re-keyed:', `${vul} (the shipped vulnerability is the bane)`);
      }
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
      // drop-to-0 triggers are TRAIT grammar in print even with a save —
      // Undead Fortitude is a trait with a CON save (Phantom's Call
      // misfire, 2026-08-27) — so they're exempt from the action-shape hold
      const dropToZero = /drops? to 0 [Hh]it [Pp]oints/.test(entry0.text);
      if (!dropToZero && (/\d+ \(\d+d\d+/.test(entry0.text) || /(?:one|each|that) (?:creature|target)[^.]{0,80}(?:must succeed|must make|saving throw)/i.test(entry0.text))) {
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
      // "imposes the X condition" is an APPLY (Colossus FP, 2026-08-26)
      // compound-apply joined 2026-09-05 (3rd FP: "is Frightened and
      // Paralyzed until" and "is Restrained and cannot" both dodged the
      // adjacency-anchored "is X until|for" — 2014-register applies)
      // compound-NOUN applies joined 2026-09-08 (4th inflection: "has
      // the Blinded and Restrained conditions" — the Span's two false
      // orphan flags)
      const applyRe = new RegExp(`ha(?:s|ve) the ${c} condition|ha(?:s|ve) the (?:\\w+ and )?${c} conditions?\\b|ha(?:s|ve) the ${c} and \\w+ conditions?\\b|becomes? ${c}\\b|is ${c} (?:until|for)|is (?:\\w+ and )?${c} (?:until|for|and)|be ${c}\\b|imposes? the ${c} condition`, 'i');
      // scrub defensive and application phrasings; a surviving mention is
      // a DEPENDENT reference ("against a Poisoned target") with no source
      // ("Advantage on saving throws against the X condition" is defensive
      // — second Colossus FP, same block)
      const scrubbed = allTexts
        .replace(new RegExp(`(?:immun\\w* to|resistan\\w* to|can't be|cannot be|isn't|is not|ends? the|ignores? the(?: effects of)?|saving throws against(?: the)?)[^.]{0,40}${c}`, 'gi'), '')
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
      const fallbackBrief = fallbackShipped
        ? `\n\nFALLBACK NOTICE: the signature action "${fallbackShipped}" is ENGINE FALLBACK text (the concept's custom ability failed to generate) — its name was written for a grander ability than the modest debuff it now carries. Judge the name against the actual payload; if the name promises more than a brief distraction, propose a rename that matches what the text does.`
        : '';
      const rawAudit = await callLLM(buildAuditPrompt(monster, '2024', { reskin: true }) + fallbackBrief, validateAuditResponse);
      const findings = verifyAuditFindings(monster, rawAudit);
      trace('audit:', findings.length ? findings.map((f) => `${f.loc?.entry ?? '-'}: ${f.message}`) : 'nothing flagged');
      // rewrite != null: an empty rewrite is a DELETION (the Huntwind
      // leak, 2026-09-01 — the judge's only way to remove a sentence)
      for (const f of findings.filter((x) => x.rewrite != null && x.span)) {
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
          entry.text = entry.text.split(span).join(f.rewrite).replace(/\.{2,}/g, '.').replace(/\s{2,}/g, ' ').trim();
          trace('audit rewrite:', `${f.loc.entry}: "${span.slice(0, 60)}" -> "${f.rewrite ? f.rewrite.slice(0, 60) : '(deleted)'}"`);
        }
      }
      for (const f of findings.filter((x) => x.rename)) {
        const old = f.loc.entry; const gate = (old.match(/\s*\(.*\)$/) ?? [''])[0];
        const bare = old.replace(/\s*\(.*\)$/, '');
        // audit renames pass the SAME name-claims vet the model's renames
        // do (the audit renamed neutral chassis stock toward scream
        // fiction — "Screaming Warning" -> "Shriek of Dismay" — and the
        // rename path had no claims check at all, 2026-09-01): a rename
        // claiming an element the entry's damage doesn't pay is blocked,
        // the standing name stays.
        {
          const src = (monster.sections?.[f.loc.section] ?? []).find((e) => e.name === old);
          const dealt = [...new Set([...(src?.text ?? '').matchAll(/\b(Bludgeoning|Piercing|Slashing|Fire|Cold|Lightning|Thunder|Poison|Acid|Necrotic|Radiant|Psychic|Force)(?= damage)/g)].map((m) => m[1]))];
          if (!nameClaimSatisfied(f.rename, dealt)) {
            trace('audit rename blocked —', `"${f.rename}" claims an element "${old}" does not pay (${dealt.join('/') || 'no damage'})`);
            continue;
          }
        }
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
  // signature provenance, machine-readable (critic + owner, 2026-09-02:
  // fallback honesty lived only in traces and the audit brief — this
  // makes the rate scorable from saved blocks alone)
  monster.generation.signature = engineIsSignature ? 'dropped' : fallbackShipped ? 'fallback' : 'custom';
  trace('done:', `"${monster.name}" — donor ${donor.id}, CR ${cr}`);
  return monster;
}
