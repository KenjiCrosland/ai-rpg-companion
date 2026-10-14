/**
 * THE RESKIN PILOT PATH (owner spec v0, 2026-08-17). Parallel to the slot
 * path; touches nothing outside reskin/. Donor -> scale -> ONE reskin call
 * (identity + renames + damage types + the wildcard replacing the
 * Signature Slot) -> verify -> lint. A rename that fails to apply FAILS
 * THE BLOCK LOUDLY (owner spec: no silent fallback names).
 */
import { verbHits, verbLines } from './route.mjs';
import { readPhrases, headNoun, piAliasesIn, piGuard, removalClauses } from './lexicon.mjs';
import { pickDonor, scaleDonor } from './scale.mjs';
import { honestSpeed, honestLanguages, honestAttackNames, honestFireDefenses, materialVulnerability, ANATOMY } from './header.mjs';
import { renderStatblock2024 } from '../format-2024/render.mjs';
import printBlocks from '@/data/srd52-monsters.json';
import { NOVA_CAP, templatesFor, renderTemplate, coveredBySheet, fallbackMenu, rankByVerb, conceptVerbs, valueCheck, SEAT_DEFAULT_TRAIT, MECHANIC_OWED_TRAIT, TEMPLATE_BY_ID, buildIdeaPrompt, validateIdeaResponse, parseIdeas, buildFitPrompt, validateFitResponse, parseFit, TEMPLATES, blindDealable, UTILITY } from './templates.mjs';
import { drawLibraryRow, nameHash } from './library.mjs';
import { cardBudget } from './card-budgets.mjs';
import { lintStatblock } from '../format-2024/lint.mjs';
import { logger } from '@/util/logger.mjs';
import challengeRatings from '@/data/challengeRatings.json';

// the table keys fractional CRs as '1/2', not '0.5' (Thornback shipped XP 0)
const crKey = (cr) => (cr === 0.125 ? '1/8' : cr === 0.25 ? '1/4' : cr === 0.5 ? '1/2' : String(cr));
import { hpFormulaFor as hpFormulaForSize, saveDamageDiceFor as engineDiceFor, attackDamageDiceFor } from '../format-2024/dice.mjs';
import { auditEligible, buildAuditPrompt, validateAuditResponse, verifyAuditFindings } from '../format-2024/audit.mjs';
import { KNOWN_SPELLS } from '../skeleton/flavor-prompt.mjs';
import { buildRepairPrompt, parseAuthorResponse, validateAuthorResponse } from './author.mjs';
import { featureRows } from './features.mjs';
import { speciesFor, speciesRows, speciesFlavorRow, rowCap } from './species.mjs';
import { classFor, classRows } from './classes.mjs';
import { renderForm, resolutionOf } from './forms.mjs';

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
// a row's noun names its damage type when nothing else does (repair exhaustion; the energy withhold)
export const TYPE_BY_NOUN = { ...Object.fromEntries(Object.entries(ANATOMY).map(([k, v]) => [k, v[1]])), spine: 'Piercing', spines: 'Piercing', quill: 'Piercing', quills: 'Piercing', needle: 'Piercing', needles: 'Piercing', thorn: 'Piercing', thorns: 'Piercing', barb: 'Piercing', barbs: 'Piercing', spike: 'Piercing', spikes: 'Piercing', blade: 'Slashing', sword: 'Slashing', axe: 'Slashing', club: 'Bludgeoning', hammer: 'Bludgeoning', mace: 'Bludgeoning', staff: 'Bludgeoning', dust: 'Poison', pollen: 'Poison', spore: 'Poison', spores: 'Poison', gas: 'Poison', vapor: 'Poison', vapors: 'Poison', miasma: 'Poison', fumes: 'Poison', smoke: 'Poison', hex: 'Necrotic', curse: 'Necrotic', wither: 'Necrotic', withering: 'Necrotic', blight: 'Necrotic', decay: 'Necrotic', grave: 'Necrotic', holy: 'Radiant', sacred: 'Radiant', blessed: 'Radiant', radiant: 'Radiant' /* a hex withers ("Withering Hex" dealt Bludgeoning under the withhold, form-ten 2026-10-01); a cloud is breathed, not cut ("Choking Dust" dealt Slashing, critic form-ten 2026-10-01) */ };
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
// THE DEFENDER MENU (owner design, 2026-09-08: "isn't warding bond a
// spell?"): print delivers ally-healing exclusively through spell lists
// (the Priest; 0 ally-healing rows in the corpus) — the checkbox IS the
// healing channel, and Warding Bond the SPELL carries the bodyguard
// link wherever a concept wants it off the Shield Guardian seat.
// THE DRAGON MENU (tier table 2026-09-11): every 2024 adult+ dragon
// casts — utility and control only, damage stays in claws and breath
export const DRAGON_SPELL_MENU = ['Detect Magic', 'Command', 'Fear', 'Suggestion', 'Dispel Magic', 'Counterspell', 'Scrying', 'Telekinesis', 'Charm Person', 'Darkness'];
export const DEFENDER_SPELL_MENU = ['Cure Wounds', 'Healing Word', 'Aid', 'Bless', 'Sanctuary', 'Shield of Faith', 'Warding Bond', 'Protection from Evil and Good', 'Lesser Restoration', 'Death Ward', 'Freedom of Movement', 'Beacon of Hope'];
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
// leveled CONTROL at will is a high-CR print shape alone (corpus sweep
// 2026-10-01: Fear at-will sits on the CR 13 Nalfeshnee, Hold Monster on
// the CR 20 Pit Fiend, Command on the Red Dragons; nothing under 13 holds
// a level-2+ control spell at will — the CR 2 hedge-witch's at-will Bestow
// Curse was the form-ten miss). Hard level-1 control (Charm Person,
// Sleep, Command) sits under the same gate — Command at will is the Red
// Dragons' alone; Hold Person is 1/Day on the CR 2 Cultist Fanatic and
// 2/Day on the CR 8 Spirit Naga. Soft utility (Faerie Fire, Darkness,
// Entangle, Silence) stays free.
export const CONTROL_SPELL_LEVEL = { 'Charm Person': 1, Sleep: 1, Command: 1, 'Hold Person': 2, Web: 2, 'Blindness/Deafness': 2, Suggestion: 2, Silence: 2, Slow: 3, Fear: 3, 'Bestow Curse': 3, 'Hypnotic Pattern': 3, Confusion: 4, Banishment: 4, 'Hold Monster': 5, 'Dominate Person': 5, Geas: 5 };
export const CONTROL_AT_WILL_CR = 13;
export const NEVER_AT_WILL = new Set(['Scrying', 'Stoneskin', 'Death Ward', 'Fire Shield', 'Freedom of Movement', 'Mirror Image', 'Blur', 'False Life', 'Barkskin', 'Shield of Faith', 'Protection from Evil and Good', 'Heroism', 'Magic Weapon', 'Divine Favor', 'Enhance Ability', 'Enlarge/Reduce', 'Web', 'Wall of Fire', 'Cloudkill', 'Sleep', 'Hypnotic Pattern', 'Vampiric Touch',
  // THE HEALING CLAUSE (Looming Mercy, 2026-09-09: "At Will: Cure
  // Wounds, Bless, Aid, Beacon of Hope" — an infinite healing battery
  // that deletes the attrition game between fights). Print tiers
  // healing DAILY, always (0/329 at-will healing; the Priest's Divine
  // Aid is a limited action) — healing and party-buffs never at-will.
  'Cure Wounds', 'Healing Word', 'Aid', 'Bless', 'Beacon of Hope', 'Sanctuary', 'Warding Bond', 'Lesser Restoration']);

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

// NO CALL IS AN ISLAND (owner 2026-09-28: "we should always be passing the full
// statblock, or at least what has been generated"): every call after the route
// sees the statblock so far, rendered by the same renderer the audit reads —
// the chassis before the main call names it, the sheet with its rows after.
// Never-fail: a chassis the renderer cannot print degrades to nothing, never
// to a thrown generation.
// Measured A/B on fresh-five (2026-09-28, 20 blocks per arm): no regression on any
// count, every gap inside run-to-run spread — kept on doctrine, not on evidence.
// PRINT CANON FOR PLAIN PROMPTS (critic, four sightings 2026-09-28: "a bear" twice,
// "a wolf", "an archer" — "a concept that is a print creature's name should route
// to that donor"). A plain prompt (four words or fewer) whose head noun names a
// print creature borrows that block's composition: its non-boilerplate traits
// verbatim and its melee attack names, in order. Richer concepts keep their
// own reading. Exact name first, else the print block whose name ends in the
// head and whose CR is nearest.
const PRINT_BOILER = /^(?:Magic Resistance|Legendary Resistance|Amphibious|Water Breathing|Hold Breath|Illumination|\w+ Restoration|Spellcasting|Swarm)\b/;
// the NPC half by alias: the SRD has Scout, Bandit, Guard, Knight, Mage, Priest,
// Spy… but no "Archer" — users type the job, print names the block
export const hagFor = (text) => (/\b(?:sea|coast|coastal|tide|tidal|salt|shore|ocean|reef|harbou?r)\b/i.test(String(text ?? '')) ? 'Sea Hag' : /\b(?:night|dreams?|nightmares?|ethereal|sleep|sleeping)\b/i.test(String(text ?? '')) ? 'Night Hag' : 'Green Hag'); // a hag is a print hag by context: forest and bog are the Green Hag's (critic's step-8 read)
const printExprWithSheetMod = (expr, rowText, pb) => { const m = /^(\d+) \((\d+)d(\d+)(?: ([+-]) (\d+))?\)$/.exec(String(expr)); const atk = Number(/Attack Roll:\*? \+(\d+)/.exec(String(rowText))?.[1]); if (!m || !Number.isFinite(atk)) return expr; const flat = atk - Number(pb); const n = Number(m[2]); const d = Number(m[3]); const avg = Math.floor(n * (d + 1) / 2) + flat; return `${avg} (${n}d${d}${flat ? ` ${flat < 0 ? '-' : '+'} ${Math.abs(flat)}` : ''})`; }; // print's dice, the sheet's modifier
const aliasOf = (w, text) => (/^(?:hag|hags|crone)$/.test(String(w ?? '')) ? hagFor(text) : PRINT_ALIAS[w]);
export const PRINT_ALIAS = { /* hag, hags, crone resolve by context through hagFor */ archlich: 'Lich', demilich: 'Lich', /* the Lich's own kin by prefix (critic's release audit 2026-10-03: an archlich routed as a ghost) */ kobold: 'Kobold Warrior', kobolds: 'Kobold Warrior', goblin: 'Goblin Warrior', goblins: 'Goblin Warrior', hobgoblin: 'Hobgoblin Warrior', hobgoblins: 'Hobgoblin Warrior', bugbear: 'Bugbear Warrior', bugbears: 'Bugbear Warrior', gnoll: 'Gnoll Warrior', gnolls: 'Gnoll Warrior', sahuagin: 'Sahuagin Warrior', /* the renamed 2024 commons (a kobold got no Pack Tactics, critic form-ten 2026-10-01) */ archer: 'Scout', archers: 'Scout', bowman: 'Scout', bowmen: 'Scout', huntsman: 'Scout', ranger: 'Scout', crossbowman: 'Bandit', brigand: 'Bandit', footpad: 'Bandit', outlaw: 'Bandit', highwayman: 'Bandit', soldier: 'Warrior Infantry', 'foot soldier': 'Warrior Infantry', infantryman: 'Warrior Infantry', veteran: 'Warrior Veteran', mercenary: 'Warrior Veteran', 'sellsword': 'Warrior Veteran', wizard: 'Mage', sorcerer: 'Mage', warlock: 'Mage', cleric: 'Priest', /* monk: no longer an alias — the class table owns the word, and print's Priest is a cleric-shaped NPC, not a martial artist (landing two, 2026-10-14) */ thief: 'Spy', rogue: 'Spy', burglar: 'Spy', guardsman: 'Guard', sentry: 'Guard', watchman: 'Guard', paladin: 'Knight', cavalier: 'Knight', peasant: 'Commoner', villager: 'Commoner', farmer: 'Commoner', zealot: 'Cultist', brawler: 'Tough', bruiser: 'Tough', thug: 'Tough', duelist: 'Gladiator', champion: 'Gladiator' };
// the CR a print name at the head of the words carries — for the form's blank-CR
// read alone (printCanonFor refuses a Beast head in a long concept on purpose:
// "a wolf that eats the stars" keeps its seats; "a swarm of rats that carries
// plague" still sits at the Swarm of Rats' CR 1/4, not the route's 10 — form-ten 2026-10-01)
export function printHeadCr(conceptText) {
  const wordsOf = (s) => String(s ?? '').toLowerCase().replace(/[^a-z' -]/g, ' ').trim().split(/\s+/).filter((w) => w && !['a', 'an', 'the'].includes(w));
  const head = wordsOf(String(conceptText ?? '').split(/\s(?:who|that|which|whose|gone|turned|driven|cursed|bound|sworn|doomed|condemned|left|lost|born|raised|made|sent|but|except|only|with|wearing|carrying|holding|riding)\s|,|\s[—–]\s/i)[0]);
  if (!head.length || head.length > 4) return null;
  const list = Array.isArray(printBlocks) ? printBlocks : [];
  const lower = (b) => String(b.name ?? '').toLowerCase();
  const phrases = [head.join(' '), head.join(' ').replace(/s$/, ''), (aliasOf(head.at(-1), conceptText) ?? '').toLowerCase()].filter(Boolean);
  const b = list.find((x) => phrases.includes(lower(x)));
  return b && Number.isFinite(Number(b.cr)) ? Number(b.cr) : null;
}
// THE PRINT WINDOW: print's own numbers ride when the sheet sits within a CR of print — and for fractional print CRs within one step (1/8 ↔ 1/4), never four steps (checker sweep 2026-10-02)
export const nearPrintCr = (cr, pcCr) => Number.isFinite(cr) && Number.isFinite(pcCr) && Math.abs(cr - pcCr) <= 1 && (pcCr >= 1 || Math.max(cr, pcCr) / Math.min(cr, pcCr) <= 2);
export function printCanonFor(conceptText, cr) {
  { const dashed = String(conceptText ?? '').split(/\s[—–]\s/); if (dashed.length > 1 && !printCanonFor(dashed[0], cr)) return printCanonFor(dashed.slice(1).join(' — '), cr); } // a Name that is no print creature: the description carries the head noun; a print Name with an addition takes the normal read below (the Goblin Boss riding a worg keeps its mounted seat) // "Grandmother Ash — An old hag …": the Name prefix hid the head noun (step 8)
  const wordsOf = (s) => String(s ?? '').toLowerCase().replace(/[^a-z' -]/g, ' ').trim().split(/\s+/).filter((w) => w && !['a', 'an', 'the'].includes(w));
  let words = wordsOf(String(conceptText ?? '').split(/\s(?:but|except|only|with|wearing|carrying|holding|riding)\s|,/i)[0]); let headOnly = wordsOf(conceptText).length > 4; // a LONG concept is a head match whatever clause the split kept: "a six-legged panther with two tentacles whose image…" is not the Panther (the displacer stood its seats down, 2026-10-01) // "big ogre with a club" looks up the big ogre // "a dire wolf but undead" looks up the Dire Wolf; the override clause is read after
  // a print name as the HEAD NOUN of a longer concept is still that print block
  // ("a doppelganger who wears the faces of the dead" is the Doppelganger — it
  // routed to the shifter seat and grew a beast form, critic, new lines 2026-09-28):
  // the phrase before the relative clause, matched EXACTLY, no alias, no nearest-CR
  if (words.length > 4) {
    const hw = wordsOf(String(conceptText ?? '').split(/\s(?:who|that|which|whose|gone|turned|driven|cursed|bound|sworn|doomed|condemned|left|lost|born|raised|made|sent|but|except|only|of)\s|,|\s[—–]\s/i)[0]); // "a kraken of the black trench" heads on the Kraken (critic's release audit 2026-10-03) // "a unicorn gone mad from grief" heads on the Unicorn (day-one two, 2026-10-01)
    if (!hw.length || hw.length > 4 || hw.length >= words.length) return null;
    words = hw; headOnly = true;
  }
  if (!words.length) return null;
  // the NPC half by alias: the SRD has Scout, Bandit, Guard, Knight, Mage, Priest,
  // Spy… but no "Archer" — users type the job, print names the block
  const list = Array.isArray(printBlocks) ? printBlocks : [];
  const lower = (b) => String(b.name ?? '').toLowerCase();
  const GENERIC_HEAD = new Set(['lord', 'lady', 'king', 'queen', 'prince', 'princess', 'child', 'elder', 'master', 'mistress', 'boss', 'chief', 'spawn', 'familiar', 'warrior', 'infantry', 'veteran', 'general', 'captain']); // a rank word alone borrows nothing ("a vampire lord" borrowed the Mummy Lord, checker 2026-10-02)
  // A PRINT NAME WITH A TRAILING MODIFIER is that print block (critic's release audit 2026-10-03 — "a vampire lord who…",
  // "a pit fiend general", "an archlich enthroned…" all missed print): a rank word after the name is a title, a participle
  // after a print name opens the clause. A rank word that is the whole head still borrows nothing.
  const isPrint = (ws) => ws.length > 0 && list.some((b) => lower(b) === ws.join(' ') || (ws.length === 1 && lower(b) === String(aliasOf(ws[0], conceptText) ?? ws[0]).toLowerCase()));
  if (!isPrint(words)) {
    const ofAt = words.indexOf('of'); if (ofAt > 0 && isPrint(words.slice(0, ofAt))) words = words.slice(0, ofAt); // "a kraken of the black trench" is the Kraken; "the lord of the barrow" is nobody's
    const ws = words.slice(); while (ws.length > 1 && GENERIC_HEAD.has(ws.at(-1))) ws.pop();
    if (ws.length < words.length && isPrint(ws)) words = ws;
    else for (let i = 1; i < words.length; i++) if (/^[a-z]{4,}ed$/.test(words[i]) && isPrint(words.slice(0, i))) { words = words.slice(0, i); headOnly = true; break; }
  }
  const head0 = words.at(-1); const head = (aliasOf(head0, conceptText) ?? head0).toLowerCase(); const headSeg = head.includes('-') ? head.split('-').at(-1) : null; // "barrow-wight" heads on the Wight (critic 2026-09-29)
  const heads = [head, head.replace(/ies$/, 'y').replace(/ves$/, 'f').replace(/s$/, ''), ...(headSeg ? [headSeg, headSeg.replace(/s$/, '')] : [])];
  // the WHOLE phrase first ("a giant spider" is the Giant Spider, not the Spider), then the head noun
  const phrase = words.join(' ');
  const exactPhrase = list.find((b) => lower(b) === phrase || lower(b) === phrase.replace(/s$/, '') || (words.length === 1 && lower(b) === head)); // a bare job alias is the block ("Kobold" alone is the Kobold Warrior — no stamps fired on the one-word form, checker 2026-10-02)
  // a print name as the PREFIX of a short phrase ("fire giant blacksmith", "goblin boss archer"): the rest is a job — a borrow
  const prefixName = !exactPhrase && !headOnly && words.length >= 3 ? [...Array(words.length - 2).keys()].map((i) => words.slice(0, words.length - 1 - i).join(' ')).filter((p) => p.includes(' ')).map((p) => list.find((b) => lower(b) === p)).find(Boolean) ?? null : null; // two-word prefixes only: "shadow fey" is not the Shadow
  const hyphenHead = headOnly && words.length === 1 && headSeg ? list.find((b) => lower(b) === headSeg) : null; // "a barrow-wight that…" borrows the Wight's rows (not a whole-name match: the seat stays) // the WHOLE phrase is the name ("a wolf", "a doppelganger who…") — "a canal ghost" borrows the Ghost's rows but keeps its claimed seat
  // a HEAD-WORD borrow stays near print's own CR: "a death knight" at CR 17 borrowed the CR 3 Knight — Humanoid, Greatsword, 30 ft., and the legendary kit left with the chassis rows (high-cr batch 2026-10-02); a whole print name still matches at any CR
  if (!aliasOf(head0, conceptText) && GENERIC_HEAD.has(head) && !exactPhrase) return null;
  const nearCr = (b) => !!aliasOf(head0, conceptText) /* a job alias (archer → Scout) names the block outright, at any CR */ || !Number.isFinite(Number(cr)) || !Number.isFinite(Number(b.cr)) || Math.abs(Number(cr) - Number(b.cr)) <= Math.max(4, Number(cr) / 2);
  const exact = headOnly ? (exactPhrase ?? hyphenHead ?? (words.length <= 2 ? list.find((b) => heads.includes(lower(b)) && nearCr(b)) : null)) : (exactPhrase ?? prefixName ?? list.find((b) => heads.includes(lower(b)) && nearCr(b))); // a ≤2-word head may match on its head word ("big ogre" → the Ogre)
  // a short head may end-match a print FAMILY ("a hag who trades in teeth" → the nearest-CR Hag) — a borrow, like every head match
  const ending = headOnly && words.length > 2 ? [] : list.filter((b) => heads.some((h) => lower(b).endsWith(` ${h}`)));
  const pick = exact ?? (ending.length ? ending.sort((a, b) => Math.abs(Number(a.cr) - cr) - Math.abs(Number(b.cr) - cr))[0] : null);
  if (!pick) return null;
  if (headOnly && /^Beast\b/i.test(String(pick.type ?? ''))) return null;
  // an NPC CLASS as the head of a longer concept ("a knight who has sworn never to sleep…") lends its rows and array and keeps the seat — the clause is the creature; a print MONSTER head (the Doppelganger) is its block (day-one 2026-09-30)
  // every HEAD match is a borrow (rows + array ride, the seat stays, no blind fallback): a print monster as the head of a longer concept keeps the clause's seat too — the Doppelganger's block came out the same either way once print bodies stopped drawing the fallback (day-one two, 2026-10-01)
  const npcHead = headOnly || !!prefixName; // a prefix match is a borrow too // a rich concept on a print BEAST is reskin material ("a wolf that eats the stars" keeps its seats); a composed print character is its block
  const last = lower(pick).split(/\s+/).at(-1);
  const traits = (pick.sections?.Traits ?? []).filter((t) => t?.name && (!!exactPhrase || !PRINT_BOILER.test(t.name))).map( /* a whole print name carries every print trait — the Kraken's Amphibious (critic's release audit 2026-10-03); a borrow skips the boiler */(t) => ({ name: t.name.replace(/ \(.*\)$/, ''), text: String(t.text ?? '') }));
  const rowOf = (a) => { const t = String(a.text ?? ''); const m = /\d+ \(\d+d\d+(?: \+ \d+)?\) ([A-Z][a-z]+)(?: damage)?\.?\s*([^]*)$/.exec(t); /* any damage word: the Unicorn's Radiant Horn deals Radiant outright */ const note = /Attack Roll:\*? \+\d+ (\([^)]*\)),/.exec(t)?.[1] ?? null; const reach = /reach (\d+) ft/.exec(t)?.[1] ?? null; const dmg = /\d+ \(\d+d\d+(?: [+-] \d+)?\)/.exec(t)?.[0] ?? null; const hybrid = /Melee or Ranged Attack Roll/.test(t); const range = /range ([\d/]+) ft/.exec(t)?.[1] ?? null; /* print's own hybrid frame: the Gladiator's Spear is thrown (the critic's third species read) */ return { hybrid, range, dmg, name: a.name.replace(/ \(.*\)$/, ''), type: m?.[1] ?? null, rider: m ? m[2].trim().replace(/^,\s*/, '') : '', note, reach }; }; // a rider that print writes ", plus 2 (1d4)…" is a plus-clause, not a sentence (the goblin's "damage. , plus", critic's audit 2026-10-02) // note: print's roll parenthetical (the Doppelganger's "(with Advantage during the first round of each combat)" is its 2024 Surprise Attack)
  const meleeRows = (pick.sections?.Actions ?? []).filter((a) => /Melee Attack Roll|Melee or Ranged Attack Roll/.test(a.text ?? '')).map(rowOf); // a Melee-or-Ranged print row (the Guard's Spear) names the melee row too
  const melee = meleeRows.map((r) => r.name);
  const rangedRows = (pick.sections?.Actions ?? []).filter((a) => /Ranged Attack Roll/.test(a.text ?? '') && !/Melee or Ranged/.test(a.text ?? '')).map((a) => ({ name: a.name.replace(/ \(.*\)$/, ''), range: (/range (\d+(?:\/\d+)?) ft\./.exec(a.text ?? '') ?? [])[1] ?? null, type: (/\) ([A-Z][a-z]+) damage/.exec(a.text ?? '') ?? [])[1] ?? null, bonus: Number((/Attack Roll:\*? \+(\d+)/.exec(a.text ?? '') ?? [])[1] ?? NaN), dmg: /\d+ \(\d+d\d+(?: [+-] \d+)?\)/.exec(a.text ?? '')?.[0] ?? null })); // print's bonus, dice and a single range ride too: an exact body at print's CR takes the row verbatim (the Stone Golem's Force Bolt is +9, 22 (4d10) at 120 ft. — canaries 2026-10-12) // pure ranged rows only (the Giant Spider's Web); the type rides (the Stone Golem's Force Bolt shipped as "Bludgeoning Bolt", critic form-ten 2026-10-01)
  const ranged = rangedRows.map((r) => r.name);
  const modes = [...String(pick.speed ?? '').matchAll(/\b(Fly|Swim|Climb|Burrow)\b/gi)].map((m) => m[1].toLowerCase());
  const senses = String(pick.senses ?? '').replace(/;?\s*Passive Perception \d+/i, '').trim();
  // print's RULES rows outside Traits: no attack roll, no damage dice, not the routine
  // or the spell list — the Doppelganger's Shape-Shift (Bonus Action) and Read Thoughts
  // (Action) are the block as much as a trait is (critic, new lines 2026-09-28)
  const rulesRows = ['Actions', 'Bonus Actions', 'Reactions'].flatMap((sec) => (pick.sections?.[sec] ?? [])
    .filter((a) => a?.name && !/^Multiattack$/i.test(a.name) && !/Attack Roll/.test(a.text ?? '') && (!PRINT_BOILER.test(a.name) || /^Spellcasting$/i.test(a.name))) // print's own Spellcasting rides too (it is boiler for the TRAIT stamp, not here) (deduped at the stamp against a caster chassis's row); dice rows ride too (the Wight's Life Drain is its signature, critic 2026-09-29) — re-priced to the sheet by the value check at the stamp
    .map((a) => ({ section: sec, name: a.name, text: String(a.text ?? '') })));
  // the user's ADDITION outranks print's stand-down the way it outranks an alias: a print name plus a seat verb ("Goblin Boss — riding a worg") keeps the seat — print's rows ride along (the worg left with the seat, critic form-ten 2026-10-01)
  const addsSeat = !!pick && verbLines(String(conceptText ?? '').toLowerCase().replace(lower(pick), ' ')).length > 0; // any print pick: "an ancient treant … crushes" names the grappler seat on a head-word borrow too (checker 2026-10-02)
  const multiattack = (pick.sections?.Actions ?? []).find((a) => /^Multiattack$/i.test(a?.name ?? ''))?.text ?? null; // print's own Multiattack: on an exact body its count and names stand (the Pit Fiend made two, print makes four — critic's step-8 read)
  return { multiattack, name: pick.name, last, traits, immunities: pick.immunities ?? null, resistances: pick.resistances ?? null, vulnerabilities: pick.vulnerabilities ?? null, melee, meleeRows, ranged, rangedRows, modes, senses, rulesRows, legendaryRows: (pick.sections?.['Legendary Actions'] ?? []).map((a) => ({ name: a.name, text: String(a.text ?? '') })), stats: pick.stats ?? null, exact: !!exactPhrase && !npcHead && !addsSeat, addsSeat, headIsPrint: !!exactPhrase, /* a whole print name heads the concept ("a swarm of rats that carries plague" is the Swarm of Rats at CR 1/4, not the route's 10) */ borrowOnly: (!!exactPhrase && !npcHead && addsSeat) || (headOnly && !exactPhrase) || npcHead, speedBase: /^(\d+) ft/.exec(String(pick.speed ?? ''))?.[1] ?? null, modeSpeeds: [...String(pick.speed ?? '').matchAll(/\b(Fly|Swim|Climb|Burrow) (\d+) ft\./g)].map((m) => [m[1], Number(m[2])]), type: String(pick.type ?? ''), languages: String(pick.languages ?? 'None').replace(/, And /g, ', and '), /* the corpus parser dropped "Languages None" lines — an absent field IS print's None (the Owlbear spoke Common, critic form-ten 2026-10-01) */ nameIsPrint: !!exactPhrase && !headOnly, shootsAtRange: (pick.sections?.Actions ?? []).some((a) => /Ranged Attack Roll/.test(a?.text ?? '')), cr: Number(pick.cr), hp: Number(pick.hp), ac: Number(pick.ac), atk: Number(pick.derived?.max_attack_bonus ?? NaN), dc: Number(pick.derived?.max_dc ?? NaN), castsMagicOnly: ((!!pick.derived?.has_spellcasting || [...(pick.sections?.Actions ?? []), ...(pick.sections?.Traits ?? [])].some((a) => /^Spellcasting$/i.test(a?.name ?? ''))) && melee.length > 0 && meleeRows.every((r) => r.type && !['Bludgeoning', 'Piercing', 'Slashing'].includes(r.type))), /* print CASTS and strikes only with magic: the Lich's Eldritch Burst is Force and its Paralyzing Touch is Cold, so one stat must carry both the attack and the DC — `casts` says no because a melee row exists at all, which is the dragons' guard (critic's blockers audit 2026-10-03) */ casts: (!!pick.derived?.has_spellcasting || (pick.sections?.Actions ?? []).some((a) => /^Spellcasting$/i.test(a?.name ?? ''))) && !(pick.sections?.Actions ?? []).some((a) => /Melee Attack Roll/.test(a?.text ?? '') && !/Melee or Ranged/.test(a?.text ?? '')), size: String(pick.size ?? ''), gear: String(pick.gear ?? ''), pb: Number(pick.pb ?? NaN), alignment: String(pick.alignment ?? '') }; // print's Gear line names the armor the 2014 sheet prints (the Goblin Boss wore "splint" where print says chain shirt and shield — canaries 2026-10-12)
}
export function chassisSheet(scaled, { name = 'the chassis', type = '', size = '', headerOnly = false } = {}) {
  try {
    const mods = Object.fromEntries(Object.entries(scaled.stats ?? {}).map(([k, v]) => [k, Math.floor((Number(v) - 10) / 2)]));
    const saves = Object.fromEntries(Object.entries(mods).map(([k, v]) => [k, (scaled.saves ?? []).includes(k) ? v + (scaled.pb ?? 2) : v]));
    return renderStatblock2024({ name, type, size, ac: scaled.ac, hp: scaled.hp, cr: scaled.cr, pb: scaled.pb, speed: scaled.speed, stats: scaled.stats, saves, skills: scaled.skills, sections: headerOnly ? {} : scaled.sections });
  } catch { return ''; }
}
export function sheetSoFar(monster, { exclude = null } = {}) {
  try {
    const sections = Object.fromEntries(Object.entries(monster.sections ?? {}).map(([k, es]) => [k, es.filter((e) => e !== exclude)]));
    return renderStatblock2024({ ...monster, sections });
  } catch { return ''; }
}
export function buildReskinPrompt(scaled, { userTyped = null, concept = '', removed = [], takenNames = [], energy = null, mix = null, mind = null, resolvedType = null, fixedName = null, } = {}) {
  const needsProjectile = Object.values(scaled.sections).flat().some((e) => e.text.includes('{projectile}'));
  // the main call renames only — the signature is created and fitted in
  // two later calls (templates.mjs); nothing here asks for rules text
  const engineMenu = [...new Set(Object.values(scaled.sections).flat().filter((e) => e.engine).map((e) => e.engine))];
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
  // a shifter's ungated row is what it swings in EVERY form (print Werewolf: Scratch
  // or Longbow in any combination; only the Bite is the wolf's) — the miller Gored in
  // human form (critic, new lines 2026-09-28)
  const hintFor = (n) => (scaled.style === 'shifter' && /^Melee Attack$/.test(n) ? 'a weapon or unarmed strike it can use in ANY form (Scratch, Longknife, Club) — NEVER the beast\'s natural weapon; the Bite is the beast\'s'
    : /^caster/.test(String(scaled.id ?? '')) && /^Ranged Attack$/.test(n) ? 'a SPELL bolt the caster hurls (Arcane Burst, Radiant Flame, Hex Bolt, Withering Ray) — never a thrown object ("Spoon" on a hedge-witch, critic form-ten 2026-10-01)'
    : scaled.style === 'mounted' && /^Melee Attack$/.test(n) ? 'the RIDER\'s weapon (Saber, Lance, Scimitar) — NEVER the mount\'s hooves or bite; the mount carries the rider (a Headless Horseman made three Hooves attacks, critic form-ten 2026-10-01)'
    : RENAME_HINTS.find(([re]) => re.test(n))?.[1] ?? 'plain, 1-2 words like print');
  const renameSkeleton = renameKeysOf(scaled)
    .map((n) => `"${n}": "<${hintFor(n)}>"`).join(', ');
  return `You are reskinning a mechanical monster chassis to a concept. The mechanics are FIXED; you provide identity.

CONCEPT: ${concept}
${removed.length ? `REMOVED BY THE CONCEPT: ${removed.join(', ')} — the creature no longer has these; no row, trait, name or flavor may use them.\n` : ''}${scaled.style === 'mounted' ? 'MOUNT HANDLING: print never writes rules about a mount — the Centaur Trooper is just its Speed and its charge. Express the mount through names, lore, and attack flavor (a bite, hooves, a saddle-borne strike); never write rules ABOUT the mount (no separate actions or turns, no targeting it, no mounting or dismounting, no describing how rider and mount are joined, and never a rule keyed on being mounted). The chassis speed and charge mechanics already are the mount.\n' : ''}${takenNames.length ? `\nNAMES ALREADY TAKEN — never reuse or closely echo any: ${takenNames.slice(0, 40).join(', ')}\n` : ''}
THE CHASSIS (CR ${scaled.cr}, AC ${scaled.ac}, HP ${scaled.hp}) — its header, then the rows you are naming:
${chassisSheet(scaled, { type: resolvedType ?? '', headerOnly: true })}
${rows.join('\n')}

THE NAME MUST MATCH WHAT THE ROW DEALS. Every damage type above is the engine's and will not be changed to suit a name you pick: a row dealing Piercing is not a Stomp, a Glare or a Surge; a row dealing Bludgeoning is not a Fang, a Dart or a Blade; a row dealing Poison, Acid or Psychic is not a Bolt or a Spike. Name each attack row after the part or weapon that would deal exactly the type printed in it${typedRows.length ? ', and where you also choose a damage type below, make the name and that type agree' : ''}.

Return ONLY JSON:
{
 "name": ${fixedName ? `"<the user named it \"${fixedName}\" — keep this name, correcting ONLY an obvious misspelling or casing; never reword or replace it>",` : '"<the creature\'s proper name, 1-3 plain words>",'}
 "inline_kind": "<is this creature's NAME a person's name or a kind of thing? Answer exactly: person | kind. A person has a given name (Meshrin; Gormak Skullsunder; Ashvowed Brannor; Sir Reginald Pemberton-Hughes; Dame Oriel Vance). A kind is a noun phrase, however invented (knife ball; headless horseman; gutter king; thornback marauder; old road warden; snapping turtle elder)>",
 "inline": "<the exact phrase every row uses for this creature mid-sentence, built ONLY from words of the name. If inline_kind is person: the given name alone (Meshrin; Gormak Skullsunder -> Gormak; Ashvowed Brannor -> Brannor) or an honorific plus the name it titles (Sir Reginald Pemberton-Hughes -> Sir Reginald; Dame Oriel Vance -> Dame Oriel). If inline_kind is kind: 'the' plus the name's own last one or two words, lowercased (knife ball -> the knife ball; Headless Horseman -> the headless horseman; Thornback Marauder -> the marauder; Old Road Warden -> the warden; Snapping Turtle Elder -> the turtle elder). Never invent a word the name does not contain; never give a person's name an article; never lowercase a person's name>",
 "type": ${resolvedType ? `"${resolvedType}",   <- FIXED by the concept resolve — echo it exactly` : '"<one of: Aberration, Beast, Celestial, Construct, Dragon, Elemental, Fey, Fiend, Giant, Humanoid, Monstrosity, Ooze, Plant, Undead>",'}
 "size": "<Tiny|Small|Medium|Large|Huge|Gargantuan>",
 "alignment": "<a 2024 alignment — follow the concept's own moral read: tragic, driven, or feral is not Evil>",
 "senses": "<a senses line, e.g. 'darkvision 60 ft.'>",
 "languages": "<a languages line or 'None'>",
 "renames": { ${renameSkeleton} },   <- ALL of these keys, every one, none omitted. A name that claims an element must be PAID by that row's damage: "Burning X" needs Fire on the row (or the melee rider), "Rimefrost X" needs Cold. If the damage does not pay the word, drop the word, or qualify it with the true element the way print does (the Priest\'s "Radiant Flame" deals Radiant); folklore light-compounds (witchfire, foxfire, balefire) are always legal. NAME REGISTER — print's name BUDGET (measured from the corpus): standard rows stay terse — a plain-damage attack row is ONE weapon-noun or anatomy word (Bite, Talons, Greataxe); two words only when the row does more than plain damage (Flame Whip, Arcane Burst); utility rows take plain function names. ONLY the Signature Slot and the nova row earn a flavored name, and even there print compresses: two words, three at the absolute ceiling (Dreadful Glare, Curtain Call — never "Blade Scatter Finale"), a hyphenated compound counting as its parts. Legendary actions take the two-word flavored register, verb-forward (Pounce, Mind Jolt, Cold Gale) — never three words. One flourish on a sheet of terse names reads as a designer's touch; wall-to-wall kennings read as a generator.${mind === 'bestial' ? ' THIS creature is bestial: name its attack rows by anatomy alone (Bite, Talons, Slam, Gore) — its flavor lives in the trait and the lore, never in an attack name.' : ''} Never invent a compound word — print writes "Frost Axe", never "Frostaxe".
 "damage_types": { ${damageSkeleton} },   <- REQUIRED for every attack and the area action. PHYSICAL vs ENERGY follows the BODY (print: melee attacks deal the limb's physical type — a bite Piercing, a slam Bludgeoning, a claw Slashing — with energy reserved for the ranged attack and the area action; ONLY a creature whose body IS energy — incorporeal, elemental, formless — deals energy with its melee). A fully physical creature may answer physical for everything; never give every row the same energy — but also keep to ONE energy family across the block (print rarely fields two).${energy ? ` THIS creature's energy is ${energy} — every non-physical damage type you assign must be ${energy}.` : ''}${mix === 'physical' ? ' THIS creature deals PHYSICAL damage only — Bludgeoning, Piercing, or Slashing everywhere; no energy types anywhere on the block.' : ''}
${needsSpells ? ` "spells": { "at_will": ["<exactly 2 spells this concept would cast, from ONLY this list: ${(scaled.spell_menu ?? SPELL_MENU).join(', ')}>"], "daily": ["<exactly 2 MORE from the same list, no repeats — pick by THEME: the spells must feel like this creature\'s magic. A blaster picks its SIGNATURE damage spells (Fireball, Scorching Ray, Shatter...) — the engine prices the tiers>"] },\n` : ''}${needsProjectile ? ` "projectile": "<the thing it throws, 1-3 words WITH its article (a knucklebone / its barbed anchor) — it appears mid-sentence in attack text>",\n` : ''}${engineMenu.length ? ` "defense_engine": "<what this concept's defense IS — rampart (a punishing presence: a damaging emanation and a raised wall) | punisher (it answers every blow: a counter-strike reaction). Pick ONE from: ${engineMenu.join(', ')}>",\n` : ''}${needsEngulf ? ` "engulf_style": "<how this body takes a creature in: swallow (a mouth) | engulf (an amorphous mass, a slime, a swarm) | smother (fabric, wrappings, a collapsing bulk) | whelm (water or liquid) | cage (chains, bars, ribs) | entomb (stone, earth, ice) | cocoon (web, silk, strands) — the engine names and words the ability to match>",\n` : ''} "clauses": [<EVERY distinct thing the USER typed — quote from THE USER TYPED line here: "${String(userTyped ?? concept ?? '').replace(/"/g, "'")}" — never from the description above it — one object each — {"text": "<the user's words for it>", "kind": "header|descriptive|mechanical"}; header = size, speed, type, a number the user set; descriptive = looks, lore, voice, name; mechanical = anything that acts in combat (a weapon, a body part that attacks, a style, a curse, an aura, a resource). Purely descriptive words are still listed, as descriptive. This list is the record of what the user asked for>],
 "slot_save": "<the Saving Throw stat the Signature Slot should use — the stat the concept threatens: Strength|Dexterity|Constitution|Intelligence|Wisdom|Charisma>",
 "melee_rider": "<the ENERGY type the melee attack deals as a rider — or \"none\" if this creature's damage is purely physical (a fifth of printed monsters are)>",
 "speed_shape": "<\"climber\" keeps the Climb speed; \"runner\" trades it for +10 ft. walk (a charger, a rider, a sprinter has no business on walls)>",
 "lore": "<ONE sentence of world-lore: where it comes from and what it wants>",
 "vulnerability": "<a damage type this creature is VULNERABLE to — ONLY if the concept genuinely implies one (print is sparing: skeletons take extra Bludgeoning, mummies burn, a thing of ash fears Cold — the wound that made it). Most creatures have none: omit this field entirely.>",
 "conditions": { "condition_minor": "<one of: ${CONDITION_MENUS.condition_minor.join(', ')}>" },
}`;
}

/**
 * SPEED 0 IS PERMANENT ONLY WHEN ITS SENTENCE SETS NO DURATION. Returns the
 * offending sentences. Shell Defense states its duration first — "Until it
 * emerges, … its Speed is 0 and can't increase" — and the old rule looked only
 * 40 characters forward, so it reported the tortle three reads running.
 */
export function permanentSpeedZero(text) {
  const BOUNDED = /\b(?:until|while|for \d+ (?:minute|hour|round)s?|emerges?|ends?|this turn|its next turn)\b/i;
  return [...String(text ?? '').matchAll(/[^.!?]*\b(?:its|it's|'s) speed is 0\b[^.!?]*[.!?]?/gi)].map((m) => m[0]).filter((s) => !BOUNDED.test(s));
}

// ONE ROUTE TO AN ACTION (the critic's fifth read: "Cunning Action and Cat's
// Dash both grant Dash. Dedupe by effect"). A kit row whose whole grant a row on
// the sheet already covers is a second name for one mechanic. Both kits read it.
const grantsOf = (t) => new Set([...String(t ?? '').matchAll(/\btakes? the ([^.]*?) action/g)].flatMap((mm) => [...String(mm[1]).matchAll(/\b(Dash|Disengage|Hide)\b/g)].map((x) => x[1])));

const sweepDeadName = (sectionsMap, deadName, keepRow, traceFn) => {
  const bare = String(deadName ?? '').replace(/ \((?:Recharge [\d–-]+|\d\/Day)\)$/, '').trim();
  if (bare.length < 4) return;
  // A NAME TWO ROWS SHARE IS NOT DEAD (the orc pin, 2026-10-13: the model named
  // both the hybrid and the ranged chassis row "Hand Axe"; evicting the hybrid
  // swept the surviving row out of the Multiattack). Every citation still
  // resolves, so there is nothing to sweep.
  if (Object.values(sectionsMap).flat().some((r) => String(r?.name ?? '').replace(/ \((?:Recharge [\d–-]+|\d\/Day)\)$/, '').trim() === bare)) { traceFn('dead name still carried —', `"${bare}" names a row that is still on the sheet; no sweep`); return; }
  const esc = bare.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const hit = new RegExp(`\\b${esc}\\b`);
  const sentence = new RegExp(`[^.!?]*\\b${esc}\\b[^.!?]*[.!?]\\s*`, 'g');
  for (const esList of Object.values(sectionsMap)) {
    for (let j = esList.length - 1; j >= 0; j -= 1) {
      const row = esList[j];
      if (row === keepRow || !hit.test(row.text ?? '')) continue;
      // the keeper OWNS the throw: a citation of the dead attack row becomes a citation of the keeper (the Thunderhead lost its Multiattack and its Storm Volley kept only a recharge clause — critic's regressions brief 2026-10-04)
      const keepBare = keepRow && /Attack Roll/.test(keepRow.text ?? '') ? String(keepRow.name ?? '').replace(/ \((?:Recharge [\d–-]+|\d\/Day)\)$/, '').trim() : null;
      if (/^Multiattack/.test(row.name ?? '')) { // A MULTIATTACK IS NEVER SWEPT: it re-reads over the rows that remain (the Gladiator lost its Multiattack with the shed Crossbow and attacked once a turn — the critic's fourth read) — and it re-reads BEFORE a keeper's name is stamped anywhere, or it reads "using Greataxe or Greataxe"
        const re1 = new RegExp(`makes (\\w+) attacks, using (.+?) or ${esc} in any combination`); const re2 = new RegExp(`makes (\\w+) attacks, using ${esc} or (.+?) in any combination`);
        const t0 = row.text;
        // THE KEEPER ABSORBS THE COUNT (the critic's fifth read: "the budget sets
        // the count" — a named weapon that takes the chassis's slot must take its
        // swings too, or sustained damage falls with the row)
        const NUM = { one: 1, two: 2, three: 3, four: 4, five: 5, six: 6 }; const WORD = ['', 'one', 'two', 'three', 'four', 'five', 'six'];
        const merged = (() => {
          if (!keepBare || re1.test(t0) || re2.test(t0)) return null;
          const kEsc = keepBare.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
          const countRe = (n) => new RegExp(`\\b(one|two|three|four|five|six) ${n} attacks?`, 'i');
          const dm = countRe(esc).exec(t0); const km = countRe(kEsc).exec(t0);
          if (!dm || !km) return null;
          const n = Math.min(6, NUM[dm[1].toLowerCase()] + NUM[km[1].toLowerCase()]);
          const drop = new RegExp(`(?:,?\\s*and\\s+|,\\s*)?\\b(?:one|two|three|four|five|six) ${esc} attacks?(?:,?\\s*and\\s+(?=(?:one|two|three|four|five|six)\\b)|,\\s*)?`, 'i');
          return t0.replace(drop, '').replace(countRe(kEsc), `${WORD[n]} ${keepBare} attack${n > 1 ? 's' : ''}`)
            .replace(/\s{2,}/g, ' ').replace(/\s+\./g, '.')
            .replace(/attacks?,\s+(?=(?:one|two|three|four|five|six)\b[^,]*\.?$)/i, (m) => m.replace(/,\s+$/, ' and ')).trim();
        })();
        row.text = merged ?? (re1.test(t0) ? t0.replace(re1, 'makes $1 $2 attacks') : re2.test(t0) ? t0.replace(re2, 'makes $1 $2 attacks') : t0.replace(new RegExp(`,?\\s*(?:and |or )?(?:a use of )?\\b${esc}\\b`, 'g'), '').replace(/\s{2,}/g, ' ').replace(/,\s*\./g, '.').replace(/ ,/g, ','));
        if (row.text !== t0) traceFn('multiattack re-read —', `"${bare}" left; "${row.name}" now reads "${row.text.slice(0, 90)}"`);
        continue;
      }
      if (keepBare) { row.text = row.text.replace(new RegExp(`\\b${esc}\\b`, 'g'), keepBare); traceFn('dead wildcard name swept —', `"${bare}" cited in "${row.name}" now reads "${keepBare}" — the keeper owns the throw`); continue; }
      const next = row.text.replace(sentence, '').trim();
      const bareClause = /^(?:The \w+|It) can['’]t (?:take|use) this action again[^.]*\.?$/i.test(next);
      if (next && !bareClause) { row.text = next; traceFn('dead wildcard name swept —', `"${bare}" cited in "${row.name}"; the sentence drops`); }
      else { esList.splice(j, 1); traceFn('dead wildcard name swept —', `"${row.name}" was only about "${bare}"; the row drops`); }
    }
  }
};
// the numeric-jurisdiction trio (batch four, 2026-09-07 — the Vigil and
// the Drowner): the engine owns every number and every damage-type
// interaction. All three are 0/329 as self-grants — print bakes mods
// into the row, never offers stat-adds as a choice; the corpus's only
// "for the purpose of" is the mule's carrying capacity; its only AC
// buff is the Unicorn's, OTHER-target and duration-bounded.
const STAT_ADD_GRANT = /adds? its \w+ modifier to (?:the |its )?damage/i;
// the ANCHOR fantasy's legal forms (defender smoke two, 2026-09-09:
// "immovable" drafted six phrasings — AC stances and immunity suites
// died righteous, four evasions shipped; print immovability-trait
// grammar is 0/329, so the coaching names the two forms that survive
// derivation instead of leaving repair to mutate)
const ANCHOR_COACHING = '; an IMMOVABLE-anchor concept instead writes the conditional form ("cannot be moved against its will if it didn\'t move on its last turn") or auto-success saves against being moved (the Rakshasa\'s grammar) — never an AC or immunity grant';
const RESISTANCE_BYPASS = /overcom\w+ [^.]{0,40}(?:resistance|immunit)|for the purposes? of overcoming/i;
const SELF_AC_GRANT = /\b(?:[Ii]t|[Tt]he creature) (?:gains?|has) a ?\+\d+ (?:bonus )?to (?:its )?(?:AC|Armor Class)|\bits (?:AC|Armor Class) increases/;
// UNDEFINED STATES (Tier A 2026-09-13, 3 sightings in one batch: the
// Chapel's "while the reliquary is planted" with nothing planting it,
// the Chandelier's "while attached", the Revenant's "while inside a
// reflection"): a trait that keys on a participle state must have an
// entry verb somewhere on the sheet — print's own form is False
// Appearance's "while it remains motionless", a state the rules know.
const STATE_VOCAB = new Set(['bloodied', 'hidden', 'grappled', 'restrained', 'charmed', 'frightened', 'paralyzed', 'petrified', 'poisoned', 'stunned', 'blinded', 'deafened', 'prone', 'incapacitated', 'invisible', 'unconscious', 'engulfed', 'swallowed', 'caged', 'concealed', 'obscured', 'submerged', 'immersed', 'mounted', 'grounded', 'winged', 'damaged', 'reduced', 'wounded', 'seated']);
// name-claim bank for the Burning-Claw class (owner: "either have fire
// damage or just call it Claw") — validated, so the RETRY reconciles it:
// the model either supplies the energy or drops the claim word.
// word-boundaried: 'ice' must not match inside 'Dice' (the Gambler died
// 3x on "Cursed Dice Blast" claiming Cold, 2026-08-19)
// ENERGY WARRANTS beyond the name claims: a lantern, a lamp, a torch and oil warrant Fire in the user's words (the lamplighter's Oil Splash dealt Bludgeoning — critic's audit 2026-10-02) without making a row NAMED "Lantern Touch" owe Fire damage
const ENERGY_WARRANTS = [[/\b(?:lantern\w*|lamp\w*|torch\w*|oil|wick\w*)\b/i, 'Fire']];
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
// the type packages, shared by the header stamp and the vacuous-
// resilience guard (two constructs shipped Advantage-vs-Charmed/
// Frightened beside header immunity to both, 2026-09-10)
export const TYPE_FLOOR = {
  Construct: { damage: ['Poison'], conditions: ['Charmed', 'Exhaustion', 'Frightened', 'Paralyzed', 'Petrified', 'Poisoned'] },
  Undead: { damage: ['Poison'], conditions: ['Exhaustion', 'Poisoned'] },
  Ooze: { damage: ['Acid'], conditions: ['Charmed', 'Deafened', 'Exhaustion', 'Frightened', 'Grappled', 'Prone', 'Restrained'] }, // Acid: 4/4 print oozes (the tar pit lost it to seat-vs-type routing, critic 2026-09-28) // Grappled/Restrained joined 2026-09-11 (3/4 print oozes)
  Elemental: { damage: ['Poison'], conditions: ['Exhaustion', 'Poisoned'] }, // 12/17, 10-12/17
  Fiend: { damage: ['Poison'], conditions: ['Poisoned'], resist: ['Cold'] }, // 19/29 imm, 21/29 res
  Celestial: { damage: [], conditions: ['Charmed'], resist: ['Radiant'] }, // 7/13, 8/13
};
// THE DEAD NAME (the Pitbreaker's "marked with Shield Sunder",
// 2026-09-15): the model's trait may cite its PLANNED wildcard by name;
// when the wildcard dies and the library ships under another name (or
// the slot drops), the citation orphans. The dead name is known
// exactly, so the sweep has no false positives: sentences citing it
// drop, and a row left empty drops with them.
// drop every sentence of an entry that carries `token`; returns the
// remaining text ('' when nothing survives). Shared by the dead-name sweep
// and the invented-condition actuator.
export const stripSentencesWith = (text, token) => {
  const esc = String(token).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  // leave the neighbouring sentence's trailing space alone, then collapse
  return String(text ?? '').replace(new RegExp(`[^.!?]*\\b${esc}\\b[^.!?]*[.!?]`, 'gi'), '').replace(/\s{2,}/g, ' ').trim();
};
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
const SHELF_NAMES = new Set(TEMPLATES.map((t) => String(t.name).toLowerCase()));
export function reskinDefects(scaled, p, { energy = null, mix = null, resolvedType = null, concept = '', removed = [] } = {}) {
  if (!p || typeof p.name !== 'string' || !p.renames) {
    return ['unparseable, or name/renames missing'];
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
    // a SHELF template's own name is reserved: the model renamed the warden's
    // Bulwark to "Interpose", and the owed Interpose then read as already on
    // the sheet and never seated (golden 2026-09-28)
    else if (SHELF_NAMES.has(v.toLowerCase())) defects.push(`rename for "${k}" takes the shelf's own row name "${v}" — that name belongs to a template this sheet may still receive; choose another`);
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
      // THE REPLENISHING LAW (owner 2026-09-15: "multiattack ranged
      // needs to be replenishing — you can't even do returning
      // because a skull takes a turn to come back"): a ranged row in
      // the routine fires every turn; a thrown SINGULAR body part
      // can't be its fiction
      if (/\b(?:thrown|hurled|cast-?off) (?:skull|head|eye|heart|spine|bone|arm|hand|jaw|rib|horn)\b/i.test(rn) && /range \d+/.test(row.text ?? '')) {
        defects.push(`name "${rn}" throws a single body part from a row that fires EVERY turn — the ammunition must be endless by fiction: name it conjured or spectral ("Spectral Skull", "Skulls of Ash"), or pluralize the source`);
      }
      // LAUNCHER names never land on a row that swings in melee (critic
      // holds, 2026-09-09: "Light Crossbow" renamed onto a 100/400 row,
      // "Heavy Crossbow" onto the HYBRID row = a melee crossbow with
      // 5-foot reach)
      if (/\b(?:crossbow|longbow|shortbow|bow|bolts?|sling|musket|pistol|rifle)\b/i.test(rn) && /reach \d+ ft/.test(row.text) && !/range \d+\/\d+ ft/.test(row.text)) { // a hybrid row named a launcher is retabled into a ranged row by the weapon table (2026-09-28); a pure melee row stays a defect
        defects.push(`name "${rn}" is a launcher but the row swings in melee — a crossbow never has reach; use a thrown weapon or a blade`);
      }
      /* a row named for a SPELL on the creature's own list ("Mindspike" beside Mind Spike, critic 2026-10-01) */
      { const spells = [...(p.spells?.at_will ?? []), ...(p.spells?.daily ?? [])].map((x) => String(x).toLowerCase().replace(/[^a-z]/g, '')); if (spells.length && spells.includes(String(rn).toLowerCase().replace(/[^a-z]/g, ''))) defects.push(`name "${rn}" is a spell on this creature's own list — name the attack for the weapon or the bolt, not the spell`); }
      // a part the concept TOOK AWAY never names a row ("lost its tentacles" — PI alias spec 2026-10-01)
      for (const gone of removed) if (new RegExp(`\\b${gone.replace(/s$/, '')}s?\\b`, 'i').test(rn)) defects.push(`name "${rn}" uses ${gone}, which the concept says it lost — name the row for what it fights with instead`);
      // a RETIRED REACTION's name on an attack row ("Jagged Parry" as a melee damage
      // row, critic 2026-09-29): a parry, riposte or interposition is a response, not a swing
      if (/\b(?:parry|riposte|interpose|interposition|counter|deflect|deflection)\b/i.test(rn) && /Attack Roll/.test(row.text ?? '')) {
        defects.push(`name "${rn}" is a reaction's name on an attack row — a parry answers a blow, it does not swing one; name the attack for what it hits with`);
      }
      // a HUMANOID's melee default is a weapon (the goblin warchief's Claw, critic 2026-09-30):
      // a natural weapon on an ungated Humanoid row needs that word in the user's own
      const speciesNatural = (speciesFor([String(concept ?? '')])?.species?.naturalWeapons ?? []); // a kenku's talons, a lizardfolk's bite: the species' own (the critic's second species read)
      if (speciesNatural.some((w) => new RegExp(`\b${w}s?\b`, 'i').test(rn))) { /* the species owns it */ } else
      if (/^Humanoid\b/i.test(String(resolvedType ?? '')) && scaled.style !== 'shifter' && !row.gate && !/Form Only\)/.test(row.name ?? '') && /Attack Roll/.test(row.text ?? '') && /\b(?:claws?|bite|fangs?|talons?|tusks?|horns?|gore|sting|stinger|maw|jaws|hooves|hoof|antlers?)\b/i.test(rn) && !new RegExp(`\\b${String((/\b(claws?|bite|fangs?|talons?|tusks?|horns?|gore|sting|stinger|maw|jaws|hooves|hoof|antlers?)\b/i.exec(rn) ?? [])[1] ?? 'zzz').replace(/s$/i, '')}s?\\b`, 'i').test(readPhrases(String(concept ?? '')))) { // plural-tolerant: "iron claws" warrants a Claw
        defects.push(`name "${rn}" is a natural weapon on a Humanoid whose concept gives it none — a Humanoid swings a weapon (Scimitar, Club, Spear)`);
      }
      // a SHIFTER's ungated attack row is swung in every form, the human one
      // included: a beast's natural weapon there is a fiction error (print keeps
      // one all-forms row and gates only the Bite — the miller Gored as a man)
      if (scaled.style === 'shifter' && !row.gate && !/Form Only\)/.test(row.name ?? '') && /Attack Roll/.test(row.text ?? '') && /\b(?:gore|tusks?|claws?|talons?|fangs?|bite|horns?|sting|stinger|maw|jaws|hooves|hoof|antlers?)\b/i.test(rn)) {
        defects.push(`name "${rn}" is a beast's natural weapon on a row usable in EVERY form (the human one included) — the Bite is the beast's; name this a weapon or unarmed strike (Scratch, Longknife, Club)`);
      }
      // a DELEGATION row ("makes one X attack") never renames to a
      // different anatomy than the row it delegates to ("Crushing
      // Tail" made a Claw attack, 2026-09-13)
      {
        const del = /makes (?:one|two|three) (.+?) attacks?\b/.exec(row.text ?? '');
        if (del) {
          const targetFinal = String(p.renames?.[del[1]] ?? del[1]);
          const ANAT = /\b(claws?|bite|fangs?|slam|fists?|tail|gore|horns?|talons?|stingers?|tentacles?|hooves|hoof|maw|jaws|pincers?|tusks?)\b/i;
          const na = ANAT.exec(rn);
          if (na && !new RegExp(`\\b${na[1]}`, 'i').test(targetFinal)) {
            defects.push(`name "${rn}" promises a ${na[1].toLowerCase()} but the row makes a ${targetFinal} attack — name the delegation honestly, or without anatomy`);
          }
        }
      }
      // a row never repeats the creature's own head noun ("the unbroken
      // rampart raises a... rampart", 2026-09-10)
      const head = String(p.name ?? '').trim().split(/\s+/).pop()?.toLowerCase();
      if (head && head.length > 3 && rn.toLowerCase().split(/\s+/).includes(head)) {
        defects.push(`name "${rn}" repeats the creature's own name — the sheet already says who acts; give the row its own word`);
      }
    }
  }
  for (const k of typedNames) {
    const rn = String(p.renames?.[k] ?? '').trim();
    const t = p.damage_types?.[rn];
    if (!TYPES.includes(t)) { defects.push(`no damage type for "${rn || k}"`); continue; }
    if (energy && !PHYSICAL.includes(t) && t !== energy) defects.push(`"${rn}" deals ${t} but this creature's energy is ${energy} — use ${energy} or a physical type`);
    if (mix === 'physical' && !PHYSICAL.includes(t)) defects.push(`"${rn}" deals ${t} but this creature is declared fully physical — use Bludgeoning, Piercing, or Slashing`);
    // a HUMANOID's weapon deals what the concept says (Skarn's "Firebrand" at 2d8 + 3 Fire off a name the naming pass minted — critic 2026-09-29): an element on a Humanoid's row needs its family in the user's words
    if (!energy && /^Humanoid\b/i.test(String(resolvedType ?? '')) && !PHYSICAL.includes(t) && !NAME_CLAIMS.some(([re, ty]) => (ty === t || (ty === null && ['Lightning', 'Thunder'].includes(t))) && re.test(readPhrases(String(concept ?? ''))))) defects.push(`"${rn}" deals ${t} on a Humanoid whose concept names no ${t} — a name is not a warrant; use a physical type`);
    const dealt = [t, /Melee/.test(k) || k === 'Melee Attack' ? p.melee_rider : null].filter(Boolean);
    if (!nameClaimSatisfied(rn, dealt)) defects.push(`name "${rn}" claims an element its damage (${dealt.join('/')}) does not pay`);
    // mental strikers never put a bare anatomical name on physical
    // damage (critic 2026-09-13, verified: print's 18 mental-keyed
    // attack rows carry physical types only 4 times — Vine Staff, Vine
    // Lash, Thorn Burst, Cursed Touch — every one paying with an
    // implement or curse name; anatomical-name + mental-stat + B/P/S is
    // 0/329. The Sorrowfall's "Claw +11 Slashing" at Str 14 was the
    // routing bug's exhibit, but the pairing stays reachable on any
    // caster chassis)
    if (['INT', 'WIS', 'CHA'].includes(scaled.striker_stat) && PHYSICAL.includes(t) && /\b(?:claws?|bite|fangs?|slam|fists?|tail|gore|horns?|talons?|stingers?|tentacles?|hooves|hoof|maw|jaws|pincers?|tusks?)\b/i.test(rn)) {
      defects.push(`"${rn}" is an anatomical name dealing ${t} on a mind-driven attacker (the attack bonus keys to ${scaled.striker_stat}) — print pays physical damage on mental strikes with implement names (the Dryad's Vine Lash, the Rakshasa's Cursed Touch) or carries a magical type (the Mage's Arcane Burst deals Force); rename to a conjured implement or pick a magical type`);
    }
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
  {
    const menu = [...new Set(Object.values(scaled.sections).flat().filter((e) => e.engine).map((e) => e.engine))];
    if (menu.length) {
      const pick = String(p.defense_engine ?? '').trim().toLowerCase();
      if (!menu.includes(pick)) defects.push(`defense_engine missing or off the menu — pick one of: ${menu.join(', ')}`);
    }
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

// THE EXTRACTION IS GROUNDED IN THE USER'S OWN WORDS (fidelity pipeline step 4): the main call sees the identity prose and
// listed its inventions as clauses ("crashes out of the treeline" for a one-word "owlbear"). A clause survives only if one of
// its content words is in what the user typed; the rest leave with a trace. A bare print name keeps its one clause.
const CLAUSE_STOP = new Set(['the', 'and', 'with', 'that', 'who', 'its', 'has', 'for', 'from', 'into', 'this', 'very', 'any', 'all']);
const clauseWords = (t) => [...new Set(String(t ?? '').toLowerCase().split(/[^a-z]+/).filter((w) => w.length > 2 && !CLAUSE_STOP.has(w)).map((w) => w.replace(/ies$/, 'y').replace(/(?<=s|x|z|ch|sh)es$/, '').replace(/(?:ing|ed|s)$/, '')))]; // "bites" → "bite" (the checker stems the same way)
const NEG_CUE = /\b(?:cannot|can't|can not|never|no longer|without|doesn't|does not|don't|do not|unable to|isn't|is not|not|lacks?|has no|have no|no(?! one\b))\b/i; // "when no one is looking" is a trigger, not a lack
const SIZE_HEADER = /\b(?:tiny|small|medium|large|huge|gargantuan)\b(?!\s+(?:teeth|tooth|claws?|jaws?|fangs?|horns?|wings?|tail|eyes?|hands?|arms?|fists?|sword|axe|shield|hammer|mouth|maw))/i; // "large teeth" is a body part, not the size
const VULN_CUE = /\b(?:vulnerab\w*|weak(?:ness)? (?:to|against)|takes (?:extra|double|more|additional) damage|hurt (?:badly )?by)\b/i;
const IMM_CUE = /\b(?:immune|immunity|immunities|can't be|cannot be|unaffected by|impervious to)\b/i;
const RES_CUE = /\b(?:resists?|resistant|resistance|shrugs off)\b/i;
const SPEECH_CUE = /\b(?:speaks?|spoke|languages?|talks?)\b/i;
const DMG_TYPE_WORD = /\b(fire|cold|lightning|thunder|acid|poison|necrotic|radiant|psychic|force|bludgeoning|piercing|slashing)\b/i;
const COND_WORD = /\b(charmed|frightened|poisoned|paralyzed|stunned|blinded|deafened|grappled|restrained|prone|exhaustion|petrified|incapacitated)\b/i;
const MECH_OPEN = /^(?:wields?|throws?|hurls?|bites?|claws?|swipes?|breathes?|casts?|spits?|rakes?|charges?|smothers?|lures?|drags?|rides?|fires?|flings?|strikes?|stomps?|gores?|stings?|attacks?|swallows?|grapples?|crush(?:es)?|slams?|chokes?|curses?|summons?|commands?|flees?|speaks?|smells?|stinks?)\b/i; // combat and sense verbs open a clause; "carry rot" stays with the nails it describes
export function groundedClauses(list, userText, trace = () => {}) {
  // THE DENOMINATOR IS THE USER'S TEXT ITSELF, phrase by phrase, counted as a reader counts (critic's step-5 read: 38 automated
  // against 61 by hand): sentences, comma pieces and "but" halves are phrases; a relative clause splits only off the first
  // piece (the creature's own "that rides a giant frog"), " and " splits only between two clauses of three words or more (the
  // hag's "long and black and carry rot" is one clause about her nails). The first phrase is the creature itself — the HEAD —
  // and is not counted unless it is the only one. A phrase with a negation is a LACKS clause: it asks for an absence.
  const text = String(userText ?? '').replace(/\s+/g, ' ').trim();
  const pieces = text.split(/\s*[;!?]\s*|(?<!\b(?:ft|Mr|Mrs|Dr|St|vs))\.\s+|\s*,\s*/i).filter((x) => x.trim());
  const phrases = [];
  pieces.forEach((piece, i) => {
    const rel = i === 0 ? piece.split(/\s+(?:who|that|which)\s+(?=\S+\s+\S)/i) : [piece]; // a one-word relative ("flasks that burn") is the noun's own, not a clause (sprint run 2026-10-12)
    for (const r of rel) for (const b of r.split(/(?<!\b(?:anything|nothing|everything|all|none|anyone|no one|any|nobody|everyone))\s+but\s+/i)) { // "immune to anything but adamantine weapons": that "but" means except
      const out = [];
      for (const part of b.split(/\s+and\s+/i)) { if (out.length && !MECH_OPEN.test(part) && (part.split(/\s+/).length < 3 || out.at(-1).split(/\s+/).length < 3)) out[out.length - 1] = `${out.at(-1)} and ${part}`; else out.push(part); } // "rides a giant frog and throws nets": a verb opens a clause
      phrases.push(...out);
    }
  });
  const cleaned = phrases.map((p) => p.trim().replace(/^(?:and|or|then|which|who|that)\s+/i, '').replace(/[.!?,;]$/, '').trim()).filter((p) => p && (clauseWords(p).length || /\d/.test(p))); // a bare "CR 5" or "AC 22" is a phrase too
  const model = (Array.isArray(list) ? list : []).filter((c) => c && typeof c.text === 'string' && c.text.trim()).map((c) => ({ text: c.text.trim(), kind: /^(?:header|descriptive|mechanical)$/.test(c.kind) ? c.kind : null }));
  // a phrase is MECHANICAL when the model says so, or when it carries a combat verb, or a weapon/body-part noun in a phrase of
  // three words or more; otherwise descriptive — so "knife ball" extracts to no mechanical clause and the template composes
  // the whole sheet (the brief's continuum), while "wields a greatsword" and "a long tail" author rows
  const MECH = /\b(?:wield|wields|has|have|throw|throws|hurl|hurls|bite|bites|claw|claws|swipe|swipes|breathe|breathes|cast|casts|spit|spits|rake|rakes|charge|charges|smother|smothers|lure|lures|drag|drags|ride|rides|fires|fling|flings|strike|strikes|stomp|stomps|gore|gores|sting|stings|trained|fighting|attack|attacks|swallow|swallows|grapple|grapples|crush|crushes|slam|slams|choke|chokes|curse|curses|summon|summons|command|commands|flee|flees|warn|warns|alert|alerts)\b/i;
  const PART = /\b(?:sword|greatsword|axe|spear|lance|bow|crossbow|dagger|staff|mace|hammer|club|whip|net|tail|claws?|teeth|fangs?|jaws?|horns?|hooves|wings?|tentacles?|talons?|stinger|beak|breath|gaze|roar|song|lantern|shield)\b/i;
  const isHeader = (p) => SIZE_HEADER.test(p) || (/\b\d+\s*(?:feet|ft)\b/i.test(p) && !/\b(?:within|reach|range|radius|tall|long|wide)\b/i.test(p)) || /\b(?:CR|AC|HP)\s*\d+|\d+ hit points|armor class/i.test(p)
    || ((VULN_CUE.test(p) || IMM_CUE.test(p) || RES_CUE.test(p)) && (DMG_TYPE_WORD.test(p) || COND_WORD.test(p) || /\b(?:it|that|them|adamantine|silvered|magic\w*|weapons?)\b/i.test(p))) || SPEECH_CUE.test(p);
  const kindOf = (p) => {
    if (isHeader(p)) return 'header';
    if (NEG_CUE.test(p)) return 'mechanical'; // a lacks clause asks for an absence on the sheet
    if (MECH.test(p) || (PART.test(p) && p.split(/\s+/).length >= 3)) return 'mechanical'; // a combat verb or a body part is mechanical whatever the model filed it as ("smothers people" came back descriptive and nothing authored — step 6 baseline, run 2)
    const ws = new Set(clauseWords(p)); const hit = model.find((c) => c.kind && clauseWords(c.text).some((w) => ws.has(w)));
    if (hit?.kind && hit.kind !== 'header') return hit.kind; // the model's "header" needs a header cue: "large teeth for a vicious bite" is a body part (the Meshrin pin)
    return 'descriptive';
  };
  const kept = cleaned.map((p, i) => {
    const kind = kindOf(p); const lacks = kind !== 'header' && NEG_CUE.test(p);
    return { text: p.slice(0, 120), kind, ...(lacks ? { polarity: 'lacks' } : {}), ...(i === 0 && (kind === 'descriptive' || (!/\b(?:with|who|that|which|and|,)\b/i.test(p) && p.replace(/^(?:a|an|the)\s+/i, '').trim().split(/\s+/).length <= 3 && !!printCanonFor(p, undefined)?.nameIsPrint)) && !lacks ? { head: true } : {}) }; // "a goblin warrior" typed mechanical by the model is still the head when the clause is the bare print name: the sheet IS the creature (the critic's second species read); "an owlbear with razor sharp claws" keeps its claws mechanical
  });
  const orphan = model.filter((c) => !clauseWords(c.text).some((w) => new Set(clauseWords(text)).has(w)));
  if (orphan.length) trace('extraction:', `${orphan.length} of ${model.length} model clauses quote nothing the user typed and leave the record (${orphan.slice(0, 3).map((c) => `"${c.text}"`).join(', ')}${orphan.length > 3 ? ', …' : ''})`);
  return kept;
}
const PART_NOUN = /\b(greatswords?|longswords?|shortswords?|scimitars?|rapiers?|swords?|greataxes?|battleaxes?|handaxes?|axes?|spears?|lances?|pikes?|glaives?|halberds?|tridents?|longbows?|shortbows?|crossbows?|bows?|slings?|javelins?|darts?|daggers?|kni(?:fe|ves)|quarterstaffs?|staffs?|staves|warhammers?|hammers?|mauls?|greatclubs?|clubs?|maces?|flails?|whips?|chains?|nets?|kicks?|headbutts?|fingers?|tail|claws?|talons?|nails?|teeth|tooth|fangs?|jaws?|maw|bites?|horns?|antlers?|tusks?|hooves|hoof|tentacles?|stingers?|stings?|beak|pincers?|fists?|slams?|gores?)\b/gi; // no wings, shield or lantern: a part that does not strike, or one the thrown-weapon template owns
const PART_TYPE = { kick: 'Bludgeoning', headbutt: 'Bludgeoning', finger: 'Bludgeoning', /* a kick, a headbutt, strangling fingers: body parts the sprint run named (2026-10-12) */ nail: 'Slashing', bow: 'Piercing', longbow: 'Piercing', shortbow: 'Piercing', crossbow: 'Piercing', sling: 'Bludgeoning', javelin: 'Piercing', dart: 'Piercing', spear: 'Piercing', lance: 'Piercing', pike: 'Piercing', trident: 'Piercing', glaive: 'Slashing', halberd: 'Slashing', scimitar: 'Slashing', rapier: 'Piercing', dagger: 'Piercing', knife: 'Piercing', whip: 'Slashing', chain: 'Bludgeoning', net: 'Bludgeoning', flail: 'Bludgeoning', maul: 'Bludgeoning', fist: 'Bludgeoning', hoof: 'Bludgeoning', slam: 'Bludgeoning', gore: 'Piercing', bite: 'Piercing', tooth: 'Piercing', fang: 'Piercing', jaw: 'Piercing', maw: 'Piercing', horn: 'Piercing', antler: 'Piercing', tusk: 'Piercing', beak: 'Piercing', sting: 'Piercing', stinger: 'Piercing', pincer: 'Bludgeoning', tentacle: 'Bludgeoning', tail: 'Bludgeoning', claw: 'Slashing', talon: 'Slashing', sword: 'Slashing', axe: 'Slashing', club: 'Bludgeoning', hammer: 'Bludgeoning', mace: 'Bludgeoning', staff: 'Bludgeoning' };
const ROLE_NOUN = /^(?:marauder|raider|reaver|horseman|horsewoman|rider|pilgrim|knight|hunter|huntress|warden|keeper|slayer|witch|hermit|monk|priest|priestess|champion|captain|sentinel|guardian|butcher|reaper|wanderer|smith|assassin|archer|duelist|seer|prophet|bride|groom|ghost|golem|king|queen|prince|princess|baron|baroness|matron|widow|stranger|collector|gardener|ferryman|fisher|fisherman|piper|drummer|jester|fool|hangman|executioner|judge|magistrate|abbot|bishop|shepherd|harvester|tinker|tailor|weaver|miller|baker|butler|nurse|doctor|surgeon|scholar|librarian|alchemist|cartographer|navigator|admiral|general|marshal|sergeant|soldier|mercenary|bandit|thief|rogue|outlaw|pirate|corsair|sailor|miner|gravedigger|undertaker|mourner|dancer|singer|bard|poet|painter|sculptor|mason|carpenter|chandler|lamplighter|watchman|guard|jailer|sentry|scout|ranger|tracker|trapper|poacher|falconer|beekeeper|herder|drover|preacher|deacon|templar|crusader|paladin|squire|page|herald|envoy|ambassador|regent|steward|chancellor|vizier|warlord|chieftain|shaman|oracle|augur|necromancer|sorcerer|sorceress|wizard|warlock|conjurer|summoner|illusionist|enchanter|enchantress|druid|hag|crone|matriarch|patriarch)$/i;
const EPITHET_FIRST = /^(?:[A-Z][a-z]+(?:less|ful|ous|ish|some)|Old|Young|Great|Grand|Big|Little|Black|White|Red|Grey|Gray|Green|Blue|Pale|Dark|Dread|Iron|Stone|Bone|Blood|Night|Grim|Mad|Wild|Lost|Last|First|Dead|Silent|Hollow|Crimson|Golden|Silver|Burning|Weeping|Laughing|Wandering|Drowned|Hanged|Headless|Faceless)$/;
const PART_THROWN = /\b(?:hurls?|throws?|flings?|toss(?:es)?|launch(?:es)?|lobs?)\b/i; // a hurled part is the thrown-weapon template's (throw-retrieve), not a part row
const PART_RANGED = /^(?:longbow|shortbow|crossbow|bow|sling|javelin|dart|net)$/i;
const PART_RIDER = { kick: 'Prone', kicks: 'Prone', finger: 'Grappled', fingers: 'Grappled', tail: 'Prone', hooves: 'Prone', hoof: 'Prone', slam: 'Prone', slams: 'Prone', jaw: 'Grappled', jaws: 'Grappled', maw: 'Grappled', tentacle: 'Grappled', tentacles: 'Grappled', stinger: 'Poisoned', stingers: 'Poisoned', sting: 'Poisoned', stings: 'Poisoned', net: 'Restrained' };
const PART_STOP = new Set(['two-handed', 'one-handed', 'heavy', 'light', 'a', 'an', 'the', 'its', 'his', 'her', 'their', 'two', 'three', 'four', 'pair', 'of', 'with', 'and', 'or', 'for', 'to', 'that', 'which', 'who', 'it', 'he', 'she', 'they', 'has', 'have', 'wields', 'wield', 'wielding', 'carries', 'carry', 'carrying', 'swings', 'swing', 'uses', 'use', 'attacks', 'attack', 'is', 'are', 'armed', 'long', 'large', 'huge', 'big', 'great', 'massive', 'giant', 'enormous', 'small', 'tiny', 'own', 'also']);
const PART_SINGULAR = (n) => n.toLowerCase().replace(/^(bites|slams|gores|stings|kicks|headbutts|fingers)$/, (w) => w.slice(0, -1)).replace(/^(greatswords|longswords|shortswords|scimitars|rapiers|swords|greataxes|battleaxes|handaxes|axes|spears|lances|pikes|glaives|halberds|tridents|longbows|shortbows|crossbows|bows|slings|daggers|knives|quarterstaffs|staffs|staves|warhammers|hammers|mauls|greatclubs|clubs|maces|flails|whips|chains|nets)$/, (w) => (w === 'knives' ? 'knife' : w === 'staves' ? 'staff' : w.slice(0, -1))) /* "two longswords" is a longsword part (sprint run 2026-10-12) */.replace(/^(claws|talons|fangs|jaws|horns|antlers|tusks|wings|tentacles|stingers|pincers|fists)$/, (w) => w.slice(0, -1)).replace(/^hooves$/, 'hoof').replace(/^teeth$/, 'tooth');
/** The user's part phrases as attack-row forms: name from the phrase, type from the noun table, mode from the noun, rider from a small table. Deterministic. */
export function partRows(record, { cap = 4 } = {}) {
  const out = []; const seen = new Set();
  const WEAPON_CUE = /\b(?:wields?|wielding|armed with|with (?:a|an|two|three|its|her|his|their|the)\b|carr(?:ies|ying)|holding|swing(?:s|ing)?|bearing)\b/i; // a header or descriptive clause yields a part only past a wield cue ("A Large ogre champion wielding a greataxe" was a header clause for its size and the greataxe never landed; "a bugbear brute with a flail" was typed descriptive — sprint run 2026-10-12)
  for (const c of record) {
    if (c.polarity || PART_THROWN.test(c.text)) continue;
    const gated = c.kind !== 'mechanical' || c.head; const cueM = gated ? WEAPON_CUE.exec(c.text) : null;
    if (gated && !cueM) continue;
    const scope = cueM ? c.text.slice(cueM.index) : c.text;
    for (const seg of scope.split(/,|\s+(?:and|or)\s+/i)) { // "a silvered rapier and a crossbow" is two parts, not the last noun of one clause (sprint run 2026-10-12)
    const text = seg.trim(); if (!text) continue;
    const words = text.split(/\s+/); const hits = [...text.matchAll(PART_NOUN)];
    if (!hits.length) continue;
    const hit = hits.at(-1); const noun = hit[1]; const idx = words.findIndex((w) => w.toLowerCase().replace(/[^a-z]/g, '') === noun.toLowerCase());
    const before = []; for (let i = idx - 1; i >= 0 && before.length < 2; i -= 1) { const w = words[i].replace(/[^A-Za-z'-]/g, ''); if (!w || PART_STOP.has(w.toLowerCase()) || PART_NOUN.test(w) || /^(?:for|to|at|into|on|that|which|who)$/i.test(w)) break; before.unshift(w); }
    PART_NOUN.lastIndex = 0;
    const after = /\bfor (?:a |an )?([A-Za-z]+)(?: attacks?)?\b/i.exec(text.slice(hit.index + noun.length)); // "tail for swipe attacks" → Tail Swipe
    const headNoun = /^(?:bite|slam|gore|sting|kick|headbutt)s?$/i.test(noun) ? noun.replace(/s$/, '') : (PART_SINGULAR(noun) !== noun.toLowerCase() && !/^(?:claws|talons|nails|teeth|fangs|jaws|horns|antlers|tusks|hooves|tentacles|stingers|pincers|fists|fingers)$/i.test(noun) ? PART_SINGULAR(noun) : noun); // a weapon plural names its singular row ("two longswords" → Longsword); a body-part plural keeps its plural name (Claws)
    const nameWords = [...before, headNoun, ...(after && !PART_STOP.has(after[1].toLowerCase()) && !/^(?:attack|attacks|damage)$/i.test(after[1]) ? [after[1]] : [])];
    const name = nameWords.map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ').slice(0, 40);
    if (seen.has(name.toLowerCase())) continue; seen.add(name.toLowerCase());
    const single = PART_SINGULAR(noun); const base = single.replace(/^(?:great|long|short|hand|battle|war|quarter)/, '').replace(/s$/, '');
    const typeWord = /\b(fire|cold|lightning|thunder|acid|poison|necrotic|radiant|psychic)\b|\b(force)(?= damage\b)/i.exec(c.text)?.slice(1).find(Boolean); // "with crushing force" is English, not Force damage (Okhra's greataxe, sprint run 2026-10-12)
    const type = typeWord ? typeWord.charAt(0).toUpperCase() + typeWord.slice(1).toLowerCase() : TYPE_BY_NOUN[single] ?? TYPE_BY_NOUN[base] ?? PART_TYPE[single] ?? PART_TYPE[base] ?? null;
    if (!type) continue; // a part with no type never ships (the slot's {damage_type} would stay unfilled)
    const condWord = /\b(Blinded|Charmed|Deafened|Frightened|Grappled|Paralyzed|Poisoned|Prone|Restrained|Stunned)\b/i.exec(c.text)?.[1];
    const rider = condWord ? condWord.charAt(0).toUpperCase() + condWord.slice(1).toLowerCase() : PART_RIDER[single] ?? PART_RIDER[noun.toLowerCase()] ?? null;
    const THROWN_RANGE = { javelin: '30/120', spear: '20/60', dagger: '20/60', handaxe: '20/60', trident: '20/60', dart: '20/60', 'light hammer': '20/60' }[single] ?? null; // a thrown-capable weapon is the ranged row too, in print's hybrid grammar (Sarn's spear stayed melee beside an invented Hurled Scythe — the critic's third species read)
    out.push({ key: null, clause: c.text, name, mode: PART_RANGED.test(single) ? 'ranged' : THROWN_RANGE ? 'both' : 'melee', thrownRange: THROWN_RANGE, type, rider, flavor: null, part: true, weapon: /^(?:tail|claw|talon|nail|tooth|fang|jaw|maw|bite|horn|antler|tusk|hoof|tentacle|stinger|sting|beak|pincer|fist|slam|gore|wing|kick|headbutt|finger)$/.test(single) ? null : single }); // a weapon noun earns one feature (step 8)
    if (out.length >= cap) break;
    }
    if (out.length >= cap) break;
  }
  return out;
}
export function validateReskinResponse(jsonString) {
  try {
    const p = JSON.parse(String(jsonString).replace(/^```json\s*|```\s*$/g, '').trim());
    return !!p && typeof p.name === 'string' && !!p.renames;
  } catch { return false; }
}

export async function generateReskin(options, callLLM) {
  // ONE NETWORK-CLASS RETRY (2026-09-20; the never-fail asymmetry's real
  // face): ai-client retries malformed JSON but EXITS on providerError, so
  // a transient "TypeError: Failed to fetch" or a timeout on any call here
  // killed the whole generation with nothing saved (a duelist died that
  // way in the smoke). One retry, network errors only — validation
  // failures keep their existing paths.
  const rawCall = callLLM;
  callLLM = async (...a) => {
    try { return await rawCall(...a); } catch (e) {
      const net = e?.timedOut === true || (e?.name === 'TypeError' && /fetch/i.test(String(e?.message)))
        || /Failed to fetch|NetworkError|ECONN|ETIMEDOUT|socket hang up/i.test(String(e?.message));
      if (!net) throw e;
      trace('network retry:', `${String(e?.message).slice(0, 60)} — retrying the call once`);
      return rawCall(...a);
    }
  };
  const { concept: concept0 = '', cr, onProgress = null, fixedName = null } = options;
  // THE ONLY TEXT ANY PASS READS IS THE REWRITTEN CONCEPT (PI alias spec 2026-10-01):
  // Product Identity names become descriptions and fixed phrases their one sense
  // here, once; the raw words never reach routing, lookup, naming or flavor again
  const piHits = piAliasesIn(`${options.userConcept ?? ''} ${concept0}`);
  for (const h of piHits) trace('pi alias:', `"${h.matched}" → "${h.text}"`);
  const concept = readPhrases(concept0);
  options = { ...options, concept, userConcept: options.userConcept != null ? readPhrases(options.userConcept) : options.userConcept, signatureElements: (options.signatureElements ?? []).map((x) => (typeof x === 'string' ? readPhrases(x) : x && typeof x.text === 'string' ? { ...x, text: readPhrases(x.text) } : x)) };
  const removed = removalClauses(options.userConcept ?? concept);
  if (removed.length) trace('removal clauses:', `${removed.join(', ')} — the concept takes these away; no row, trait or flavor may use them`);
  // no silent archetype default (owner ruling, 2026-08-26, same law as
  // pickDonor): a mis-wired route fails loudly, never ships the wrong
  // chassis family
  let archetype = options.archetype;
  let energyWithheld = null; // a Humanoid's unwarranted energy: never back through the header (Skarn's Fire resistance off her name)
  // a HUMANOID's energy needs its family in the user's own words, fixed phrases
  // read first (Skarnna "screams fire at will" and drew Fire resistance and a Fire
  // burst — critic, library round 2026-09-29); a body that IS its element keeps the resolve's word
  if (options.energy && /^Humanoid\b/i.test(String(options.resolvedType ?? '')) && ![...NAME_CLAIMS, ...ENERGY_WARRANTS].some(([re, t]) => (t === options.energy || (t === null && ['Lightning', 'Thunder'].includes(options.energy))) && re.test(readPhrases(String(options.userConcept ?? options.concept ?? ''))))) {
    trace('energy withheld:', `${options.energy} on a Humanoid with no ${options.energy} in the concept's own words (fixed phrases read first)`);
    energyWithheld = options.energy;
    options = { ...options, energy: null };
  }
  // THE TEMPLATE SIGNATURE (owner 2026-09-21) is the only signature path;
  // the free-text wildcard, its vet chain, and its repair loop were retired
  // 2026-09-22 (goldens 19/19 on the template path; the kill switch never
  // shipped a different block to a user)
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
  // BODY OUTRANKS ROLE (owner design 2026-09-11): an ooze's body IS its
  // whole combat identity (AC 6-9 paid by Amorphous + Corrosive), a
  // dragon's kit already contains brute, artillery, and controller in
  // one chassis, and a swarm is its rules trait. The role still
  // resolves and records; it just doesn't pick the donor.
  const body = ['ooze', 'swarm', 'dragon'].includes(String(options.bodyType ?? '').toLowerCase()) ? String(options.bodyType).toLowerCase() : null;
  if (body) trace('body type:', `${body} — the body outranks the role (recorded: ${archetype})`);
  // a PLAIN PRINT-CREATURE prompt whose block shoots a BOW is not a thrower: the
  // route's "archer → hurler" gave the Scout a returning javelin (2026-09-28);
  // the plain line carries the Longbow row print names
  // A SPECIES WORD OUTRANKS A MONSTER ALIAS (species landing 2026-10-13): "a kenku mimic" is a kenku who mimics, not the Mimic; a print pick whose body is not a Humanoid stands down when the words name a species
  const speciesHead = speciesFor([String(options.userConcept ?? concept ?? ''), String(options.fixedName ?? '')], String(options.userConcept ?? concept ?? ''));
  const speciesOutranks = (pc) => !!(pc && speciesHead && pc.type && speciesHead.species.type && pc.type.toLowerCase() !== speciesHead.species.type.toLowerCase()); // the species' own type decides: a kenku (Humanoid) is not the Mimic (Monstrosity)
  const pcRoute0 = printCanonFor(options.userConcept ?? concept, cr);
  if (speciesOutranks(pcRoute0)) trace('species outranks the alias:', `the ${pcRoute0.name} (${pcRoute0.type}) stands down — the words name a ${speciesHead.species.key}, a Humanoid`);
  const pcRoute = speciesOutranks(pcRoute0) ? null : pcRoute0;
  const printCanonHere = (text, c) => { const pc = printCanonFor(text, c); return speciesOutranks(pc) ? null : pc; }; // every later print-canon read goes through the species guard (the Mimic's Adhesive and Shape-Shift rode in behind the kenku's back)
  const shootsABow = !!pcRoute && pcRoute.ranged.some((n) => /\b(?:long|short)?bow\b|crossbow/i.test(n));
  if (shootsABow && style === 'hurler') trace('print canon route:', `"${options.userConcept ?? concept}" is the ${pcRoute.name}, a bow-user — the hurler seat stands down for the plain line`);
  // A PRINT NAME AS THE HEAD NOUN OUTRANKS THE VERB ROUTER (critic, new lines
  // 2026-09-28: "a doppelganger who … reads what the living are thinking" went to
  // the caster line twice and shipped a spell list the Doppelganger has none of).
  // The block's own composition is the route: no seat style, and a caster family
  // only if print casts — otherwise the plain line of its body's size
  // a BORROWED print body (the Wight under "a barrow-wight that…") outranks a seat
  // that is itself a body — trap, phantom — when no line VERB in the words names
  // it: rows and array from the donor, the seat from the verb (critic 2026-09-29)
  // (2026-09-29, sixth roll: the seat flipped phantom → juggernaut on which clause the
  // model cited — with no seat verb the print body decides, deterministically: the plain line)
  if (pcRoute?.borrowOnly && !body && style && !verbHits(options.userConcept ?? concept ?? '').some((h) => h.id === `${archetype}-${style}` && h.cls === 'verb')) {
    trace('print canon route:', `the ${pcRoute.name}'s body outranks the ${style} seat — no verb in the words names it; the plain ${archetype} line`);
    style = null;
  }
  if (pcRoute && (pcRoute.exact || pcRoute.borrowOnly) && !body) { // a print name, whole or at the head ("a wolf", "a doppelganger who…") — the nearest-CR ending match ("a hungry ooze" → Gray Ooze) borrows rows but keeps the claimed seat
    if (style && pcRoute.exact && !(shootsABow && style === 'hurler')) {
      trace('print canon route:', `"${options.userConcept ?? concept}" is the ${pcRoute.name} — the ${style} seat stands down for the plain line`);
      // the seat's IMPLIED mechanic leaves with it unless print's own traits carry it (the Hydra regrows heads and does not regenerate; the Troll does — rerun 2026-10-03)
      if (style === 'regenerator' && (options.mechanics ?? []).includes('regeneration') && !pcRoute.traits.some((t) => /^Regeneration$/i.test(t.name))) { options = { ...options, mechanics: options.mechanics.filter((k) => k !== 'regeneration') }; trace('print canon route:', `the regenerator seat's organ leaves too — the ${pcRoute.name} has no Regeneration of its own`); }
      style = null;
    } // a BORROW with its seat verb in the words keeps the seat ("Goblin Boss — riding a worg", critic form-ten 2026-10-01); a verbless borrow already stood down above
    // print's own attack rows all deal NON-PHYSICAL damage: the body is a caster first, whatever the concept's verb routed
    // (the Lich's Eldritch Burst is Force and Paralyzing Touch is Cold; the Adult Green Dragon's Rend is Slashing and stays a brute)
    if (archetype !== 'caster' && pcRoute.castsMagicOnly) {
      trace('print canon route:', `the ${pcRoute.name} casts and strikes only with magic (${pcRoute.meleeRows.map((r) => r.type).join(', ')}) — the caster family takes the line from ${archetype}${style ? `-${style}` : ''}, so the attack bonus and the spell DC key to one stat`);
      archetype = 'caster'; style = null;
    }
    if (archetype === 'caster' && !pcRoute.casts && !pcRoute.castsMagicOnly) { // a print caster that also has a magical melee row (the Lich) keeps the caster line
      const plain = /^(?:Large|Huge|Gargantuan)/i.test(pcRoute.size) ? 'brute' : 'skirmisher';
      trace('print canon route:', `the ${pcRoute.name} is not a caster first${pcRoute.rulesRows?.some((r) => /^Spellcasting$/i.test(r.name)) ? ' (its own Spellcasting rides as print\'s row)' : ' — it casts no spells'} — the caster family stands down for the plain ${plain} line`);
      archetype = plain;
    }
  }
  const donor = pickDonor(cr, body ? null : (shootsABow && style === 'hurler' ? null : style), body ?? archetype);
  const statsAtScale = {}; // captured right after scaling — the final derivation pass measures skill surplus against it
  const scaled = scaleDonor(donor, cr, { movement: options.movement ?? [], mechanics: options.mechanics ?? null, dprScale: options.dprScale ?? 1, edition: options.edition ?? null });
  Object.assign(statsAtScale, scaled.stats);
  // THE FLOATING-ORB OVERLAY (PI follow-up 2026-10-01): floating, limbless, many-eyed
  // is a body no donor has. Keyed on the words the alias text carries (and any
  // floating thing a GM invents): speed 0 with Fly 20 (hover), Prone immunity, one
  // natural row (Bite) and no limb rows beyond it, darkvision 120. No numbers move;
  // the rays fire every turn, imposed below; at CR 13+ the legendary trio is one ray each.
  const floatingOrb = !body && /\b(?:floating orb|eyestalks?|levitat\w*|hovers? (?:above|over|in the air|in place)|limbless|a floating (?:eye|sphere|orb|head|skull))\b/i.test(readPhrases(String(options.userConcept ?? concept ?? '')));
  let imposedActionT = null;
  if (floatingOrb) {
    scaled.speed = '0 ft., Fly 20 ft. (hover)';
    { // a limbless floater is not a Str 20 wrestler: the array goes mental, the striker is INT, Athletics leaves (critic 2026-10-01)
      const st = scaled.stats; const formerStr = st.STR; st.STR = 10; st.CON = Math.max(st.CON, 16); st.INT = Math.max(st.INT, formerStr); st.CHA = Math.max(st.CHA, 14);
      scaled.striker_stat = 'STR'; scaled.atk = scaled.pb; /* the striker stays STR at 10: the coherence pass then derives the bite at proficiency alone, and no mental-anatomy stamp turns a bite magical; the ray DC is the card's */
      scaled.skills = String(scaled.skills ?? '').split(',').map((x) => x.trim()).filter((x) => x && !/^Athletics\b/.test(x)).join(', ');
    }
    /* the legendary trio first, before the limb filter would remove its attack rows */
    let legendaryRays = 0;
    if (cr >= 13) for (const esL of Object.values(scaled.sections)) for (const e of esL) if (/^Legendary/.test(e.name ?? '') && !/Resistance|Action Uses|Move/.test(e.name) && /makes one [\w' -]+ attack|Attack Roll|Saving Throw|damage/.test(e.text ?? '') && !/Dodge action/.test(e.text ?? '')) { e.name = 'Legendary Ray'; e.text = 'The creature fires one ray from its Eye Rays at a random creature it can see within 120 feet.'; e.rules = true; legendaryRays += 1; }
    let keptMelee = false;
    for (const [secO, esO] of Object.entries(scaled.sections)) {
      scaled.sections[secO] = esO.filter((e) => {
        const isAttack = /Attack Roll/.test(e.text ?? '');
        if (!isAttack) return true;
        if (/Melee Attack Roll/.test(e.text) && !/Melee or Ranged/.test(e.text) && !keptMelee) { keptMelee = true; e.overlay_bite = true; e.print = true; /* the orb's bite is print's Beholder shape: +PB damage off a STR 10 (checker 2026-10-02) */ return true; }
        return false; // the second melee row, the hybrid, the ranged row: limbs it has not
      });
    }
    { const bite = Object.values(scaled.sections).flat().find((e) => e.overlay_bite); if (bite) { bite.text = bite.text.replace(/(Attack Roll:\*? )\+\d+/, `$1+${scaled.pb}`); if (bite.text_noRider) bite.text_noRider = bite.text_noRider.replace(/(Attack Roll:\*? )\+\d+/, `$1+${scaled.pb}`); } } /* after the filter flags it: a natural bite rolls Str 10 → proficiency alone */
    const ma = Object.values(scaled.sections).flat().find((e) => e.name === 'Multiattack');
    if (ma) { const biteKey = Object.values(scaled.sections).flat().find((e) => e.overlay_bite)?.name ?? 'Melee Attack'; ma.text = `The creature makes one ${biteKey} attack and uses Eye Rays.`; } // the chassis key: the rename pass turns it into "Bite"
    trace('floating-orb overlay:', `speed 0 / Fly 20 (hover), Prone immunity, one Bite row, darkvision 120; the rays fire every turn${legendaryRays ? `; ${legendaryRays} legendary row${legendaryRays > 1 ? 's' : ''} fire one ray each` : ''}`);
  }
  // a CHASSIS nova obeys the cap a fitted nova obeys (the gong's Tremor printed 54
  // at CR 9 past the 49 line with no cap message — critic 2026-09-29)
  for (const es of Object.values(scaled.sections ?? {})) for (const e of es) {
    if (!/Recharge [\d–-]+|\d\/Day/.test(`${e.name ?? ''} ${e.gate ?? ''}`) || !/Saving Throw/.test(e.text ?? '')) continue; // the scaled row's gate is bare ("Recharge 5-6"), no parentheses yet
    const m = /(\d+) \((\d+d\d+(?:\s*\+\s*\d+)?)\)/.exec(e.text ?? ''); if (!m) continue;
    const cap = NOVA_CAP(cr);
    if (Number(m[1]) > cap) { const d = engineDiceFor(cap); e.text = e.text.replace(m[0], `${d.avg} (${d.dice})`); if (e.text_noRider) e.text_noRider = e.text_noRider.replace(m[0], `${d.avg} (${d.dice})`); trace('nova capped:', `"${e.name}" ${m[1]} → ${d.avg} (the chassis nova obeys the cap: ${cap} at CR ${cr})`); }
  }
  let arrayIsPrint = false; // set when print's array lands at print's CR — a later coherence pass must not move it
  // a print block's ARRAY rides with its rows (the Last Face read thoughts on a
  // Charisma of 8 — the skirmisher's array under the Doppelganger's rows, critic
  // 2026-09-29): print's scores, the striker re-fitted to the card's attack bonus
  if (pcRoute && (pcRoute.exact || pcRoute.borrowOnly) && pcRoute.stats && ['STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA'].every((k) => Number.isFinite(Number(pcRoute.stats[k])))) { // a body chassis (dragon) takes print's array too (the Ancient Blue at CR 22 kept the card's numbers, checker 2026-10-02)
    const statsBefore = { ...scaled.stats };
    scaled.stats = Object.fromEntries(['STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA'].map((k) => [k, Number(pcRoute.stats[k])]));
    const atPrintCr = nearPrintCr(cr, pcRoute.cr) && Number.isFinite(pcRoute.atk); // a fractional print CR within one step (1/8 ↔ 1/4, the kobold) — not four steps (a CR 1 goblin warrior wore the CR 1/4 block's 10 HP, checker sweep 2026-10-02)
    if (atPrintCr) {
      arrayIsPrint = true;
      // at print's own CR the numbers are print's: the Fire Giant is STR 25 at +11, not STR 18 fitted to a +8 card (critic-ten 2026-10-01)
      const pbDiff = Number.isFinite(pcRoute.pb) && pcRoute.pb !== scaled.pb ? scaled.pb - pcRoute.pb : 0; // within one step of print's CR the sheet keeps ITS OWN PB — the CR label is the user's and its PB follows the table; print's bonuses re-derive off it (+7 on PB +3 reads +6 on PB +2; the critic's species read: "PB +3 printed on a CR 4 sheet")
      if (pbDiff) trace('print canon pb:', `print's +${pcRoute.atk} on PB +${pcRoute.pb} reads +${pcRoute.atk + pbDiff} on this sheet's PB +${scaled.pb}; DCs follow`);
      const fromAtk = scaled.atk; scaled.atk = pcRoute.atk + pbDiff; if (Number.isFinite(pcRoute.dc)) scaled.dc = pcRoute.dc + pbDiff; else scaled.dc = 8 + scaled.pb + Math.max(...['STR', 'DEX', 'CON'].map((k) => Math.floor((Number(pcRoute.stats?.[k] ?? scaled.stats[k]) - 10) / 2))); // print with no DC of its own derives one from print's array (the Flesh Golem kept the card's 13, checker 2026-10-02)
      if (Number.isFinite(pcRoute.hp) && pcRoute.hp > 0) { trace('print canon defenses:', `HP ${scaled.hp} -> ${pcRoute.hp}, AC ${scaled.ac} -> ${pcRoute.ac} — the ${pcRoute.name}'s at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)`); scaled.hp = pcRoute.hp; if (Number.isFinite(pcRoute.ac) && pcRoute.ac > 0) scaled.ac = pcRoute.ac;
        const armor = /\b(Studded Leather|Padded|Leather|Hide|Chain Shirt|Scale Mail|Breastplate|Half Plate|Ring Mail|Chain Mail|Splint|Plate)(?: Armor)?\b/i.exec(pcRoute.gear ?? '')?.[1]; const shield = /\bShield\b/i.test(pcRoute.gear ?? '');
        if (armor || shield) { scaled.ac_gear = [armor?.toLowerCase(), shield ? 'shield' : null].filter(Boolean).join(', '); trace('print canon armor:', `${scaled.ac} (${scaled.ac_gear}) — print's Gear line; the 2014 sheet prints it (the Goblin Boss wore "splint", canaries 2026-10-12)`); }
      }
      for (const es of Object.values(scaled.sections)) for (const e of es) { e.text = String(e.text ?? '').replace(/(Attack Roll:\*? )\+\d+/g, `$1+${scaled.atk}`); if (e.text_noRider) e.text_noRider = e.text_noRider.replace(/(Attack Roll:\*? )\+\d+/g, `$1+${scaled.atk}`); }
      { // the damage bonus follows the attack bonus: print's Stone Golem is STR 22 at +10, so its Slam adds +6, not the card's +5 (critic form-ten 2026-10-01)
        const dMod = scaled.atk - scaled.pb; const fromMod = fromAtk - scaled.pb;
        for (const es of Object.values(scaled.sections)) for (const e of es) { // every attack row's bonus is the striker's mod (the Goblin Boss swung 1d6 + 1 on DEX 15, critic form-ten 2026-10-01)
          const fix = (t) => String(t ?? '').replace(/(\d+) \((\d+d\d+) \+ (\d+)\)/g, (m0, avg, dice, b) => (Number(b) !== dMod && dMod > 0 ? `${Number(avg) + (dMod - Number(b))} (${dice} + ${dMod})` : m0));
          if (/Attack Roll/.test(e.text ?? '')) { e.text = fix(e.text); if (e.text_noRider) e.text_noRider = fix(e.text_noRider); }
        }
      }
      trace('print canon array:', `${['STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA'].map((k) => `${k} ${scaled.stats[k]}`).join(', ')} — the ${pcRoute.name}'s at its own CR; attack +${fromAtk} -> +${scaled.atk}, DC ${scaled.dc} (print's${pbDiff ? `, on this sheet's PB` : ''})`);
    } else {
      const targetMod = scaled.atk - scaled.pb; const striker = scaled.striker_stat ?? 'DEX'; const printMod = Math.floor((scaled.stats[striker] - 10) / 2);
      if (printMod > targetMod) { // RAISE-ONLY: print's STR 19 stands over the card's +6, and the attack bonus and every flat follow it (the Ogre at CR 5 read STR 16 fitted down — canaries 2026-10-12)
        const fromAtk = scaled.atk; scaled.atk = scaled.pb + printMod;
        const fix = (t) => String(t ?? '').replace(/(Attack Roll:\*? )\+\d+/g, `$1+${scaled.atk}`).replace(/(\d+) \((\d+d\d+) \+ (\d+)\)/g, (m0, avg, dice, b) => (Number(b) === targetMod ? `${Number(avg) + (printMod - Number(b))} (${dice} + ${printMod})` : m0));
        for (const es of Object.values(scaled.sections)) for (const e of es) if (/Attack Roll/.test(e.text ?? '')) { e.text = fix(e.text); if (e.text_noRider) e.text_noRider = fix(e.text_noRider); }
        trace('print canon array:', `${['STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA'].map((k) => `${k} ${scaled.stats[k]}`).join(', ')} — the ${pcRoute.name}'s; ${striker} ${scaled.stats[striker]} outranks the card's +${fromAtk}, so the sheet rolls +${scaled.atk} (raise-only)`);
      } else {
        if (printMod !== targetMod) scaled.stats[striker] = 10 + targetMod * 2;
        trace('print canon array:', `${['STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA'].map((k) => `${k} ${scaled.stats[k]}`).join(', ')} — the ${pcRoute.name}'s, ${striker} fitted to +${scaled.atk}`);
      }
    }
  }
  // the print array moved the mods: skills keep their proficiency surplus over the
  // NEW mods and escape DCs re-derive (Perception +6 on WIS 16 / PB 6, escape DC 19
  // beside a derived 20 — the Treant, checker 2026-10-02)
  if (pcRoute && (pcRoute.exact || pcRoute.borrowOnly) && pcRoute.stats) {
    const SKILL_STAT2 = { Athletics: 'STR', Acrobatics: 'DEX', 'Sleight of Hand': 'DEX', Stealth: 'DEX', Arcana: 'INT', History: 'INT', Investigation: 'INT', Nature: 'INT', Religion: 'INT', 'Animal Handling': 'WIS', Insight: 'WIS', Medicine: 'WIS', Perception: 'WIS', Survival: 'WIS', Deception: 'CHA', Intimidation: 'CHA', Performance: 'CHA', Persuasion: 'CHA' };
    const modNow = (k) => Math.floor((scaled.stats[k] - 10) / 2); const modWas = (k) => Math.floor(((typeof statsBefore !== 'undefined' ? statsBefore : scaled.stats)[k] - 10) / 2);
    scaled.skills = String(scaled.skills ?? '').split(',').map((t) => t.trim().replace(/^([A-Za-z][A-Za-z' ]*?)\s*\+(\d+)$/, (m0, name, n) => { const st = SKILL_STAT2[name.trim()]; if (!st) return m0; const surplus = Number(n) - modWas(st); return `${name.trim()} +${modNow(st) + surplus}`; })).filter(Boolean).join(', ');
    const escDC2 = 8 + modNow('STR') + scaled.pb;
    for (const es of Object.values(scaled.sections)) for (const e of es) { if (/escape DC \d+/.test(e.text ?? '')) e.text = e.text.replace(/escape DC \d+/g, `escape DC ${escDC2}`); if (e.text_noRider && /escape DC \d+/.test(e.text_noRider)) e.text_noRider = e.text_noRider.replace(/escape DC \d+/g, `escape DC ${escDC2}`); }
  }
  // the caster family's Spellcasting row is CHASSIS — it ships template-
  // fed with its own menu whether or not the checkbox is set, and the
  // checkbox organ must never double it (donor row exists -> skip below)
  if (archetype === 'caster') scaled.spell_menu = CASTER_SPELL_MENU;
  if (body === 'dragon') scaled.spell_menu = DRAGON_SPELL_MENU;
  const hasChassisSpellRow = Object.values(scaled.sections).flat().some((e) => e.name === 'Spellcasting');
  if (options.caster && !hasChassisSpellRow) {
    // the menu follows the archetype: a skirmisher's magic is escape
    // tech, a brute's hardens its own hide and fists (owner, 2026-09-01)
    scaled.spell_menu = archetype === 'brute' ? BRUTE_SPELL_MENU : archetype === 'defender' ? DEFENDER_SPELL_MENU : SPELL_MENU;
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
    const typeKey = /undead/i.test(options.resolvedType ?? '') ? 'Radiant' : null;
    // a BODY's own weakness outranks the energy foil: a wax man regenerates
    // unless he is BURNED, and the foil derived Cold from his Fire vulnerability
    // (the wax abbot, fresh three 2026-09-28) — the same material read the
    // header uses to stamp the vulnerability
    const materialBane = materialVulnerability(options.userConcept ?? concept, options.material ?? null)?.vulnerability ?? null;
    const off = bane ?? materialBane ?? typeKey ?? REGEN_FOIL[options.energy ?? ''];
    const offWhy = bane ? 'the concept names its own undoing' : materialBane ? `its ${materialVulnerability(options.userConcept ?? concept, options.material ?? null).material} body is the weakness` : typeKey ? "the type names it: Undead regeneration dies to Radiant — the Vampire's key" : `foil of ${options.energy}`;
    if (regen && off) {
      if (regen.text.includes('Acid or Fire damage')) regen.text = regen.text.replace('Acid or Fire damage', `${off} damage`);
      // a keyless chassis Regeneration (the defender rows) gains the
      // Troll clause with the derived foil — the machinery derived the
      // key and then dropped it on the floor (critic, 2026-09-10:
      // "neither boss carries a key")
      else if (!/this trait doesn't function/.test(regen.text)) regen.text += ` If the creature takes ${off} damage, this trait doesn't function at the start of the creature's next turn.`;
      trace('regeneration off-switch:', `${off} (${offWhy})`);
    }
    regenBaneApplied = bane != null;
  }
  trace('donor:', `${donor.id} -> CR ${cr}${donor.invented ? ' (invented — no printed peer)' : ''}`);
  // a resolved style the chosen family has no line for used to vanish
  // SILENTLY (5/48 smoke blocks; 3 of 5 on the caster family, which
  // carries only plain/warpriest/binder) — pickDonor already falls back
  // to the plain line; the drop just needs to be visible
  const POSTURE = { lurker: ['skulker'] }; // the plain line already IS this style
  if (style && !body && donor.style !== style && !(POSTURE[donor.id.split('-')[0]] ?? []).includes(style)) {
    trace('style unserved:', `"${style}" has no ${donor.id.split('-')[0]} line — the plain line ships (resolve's style signal is noisy; not re-routed)`);
  }
  for (const g of scaled.gated_out ?? []) trace('row gated out:', `${g} — the concept did not claim this mechanic`);
  {
    const covered = [];
    if (Object.values(scaled.sections).flat().some((e) => e.engulf_engine)) covered.push(/wrap|crush|swallow|gulp|engulf|drown|entomb|seal|smother|constrict|cocoon|whelm|cage/i);
    // a throw-shaped element is the RANGED ROW's fiction (Balefire
    // Ignition, 2026-09-15: the wildcard wrote a second head-hurl
    // beside the renamed Ranged Attack that already was one)
    if (Object.values(scaled.sections).flat().some((e) => /Ranged Attack Roll/.test(e.text ?? ''))) covered.push(/\bhurl|throw|toss|lob|fling|\bdetach|\bsevered|as a weapon\b/i);
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
  // THE CLAIM GATE (owner go 2026-09-15): print's CR<=2 blocks carry a
  // non-attack action only 26% of the time — the wildcard ships down
  // there only when the concept CLAIMED a mechanic (the Harpy's song,
  // the wyrmling's breath); a plain low-CR beast is attacks, renames,
  // and the rider. The trait wildcard closes at CR<=2 outright (print
  // 0.68 traits/block — the chassis already carries them).
  // the user's own words can CLAIM a capability at CR <= 2 ("Can turn invisible
  // once per day" on a CR 1/4 kobold dropped the slot, form-ten 2026-10-01): a
  // can/casts/per-day clause is a claim, as a routed mechanic is
  const claimWords = /\b(?:can|able to|casts?|once (?:per|a) day|\d+\/day|per day|at will)\b/i.exec(String(options.userConcept ?? concept ?? ''));
  // a RIDER the user's own words name by key is a claim too ("a swarm of rats that carries plague" at the Swarm of Rats' CR 1/4 shipped a bare bite — the idea path never ran, form-ten 2026-10-01)
  const riderAsk = cr <= 2 && !!archetype && rankByVerb(templatesFor({ archetype, cr, sections: {}, section: 'rider' }), readPhrases(String(options.userConcept ?? concept ?? ''))).find((r) => r.concept.length)?.t.id;
  const wildcardAllowed = true; // was `cr > 2 || mechanics || claimWords || riderAsk` — the claim gate opened (fidelity pipeline step 2): at CR <= 2 it dropped the wildcard slot unless the words claimed a capability; print's 74% carries no non-attack action, but the user's typed clause outranks print's sparseness
  // WHO HAS TRAITS is the BODY's question, not the tier's (corpus 2026-09-28,
  // 329 blocks): a non-boilerplate trait rides Ooze 100% / Elemental 94% /
  // Undead 63% / Construct 60% / Aberration 56%, against Beast 33% / Humanoid
  // 27% / Giant 20% / Dragon 13%; presence-by-CR climbs from 53% to 100% only
  // because Legendary and Magic Resistance do — the non-boilerplate rate is
  // flat ~40% at every band. A material body's rules ARE its substance, so it
  // owes a trait at every CR (the bell-ringer's ghost "cannot leave the tower"
  // had nowhere to seat at CR 2, critic 2026-09-28).
  const materialBody = /^(?:Ooze|Elemental|Undead|Construct|Aberration)$/i.test(String(options.resolvedType ?? '').trim());
  const traitWildcardAllowed = true; // was `cr > 2 || materialBody` — opened (fidelity pipeline step 2): the closure encoded print's sparseness and deleted the user's trait at CR <= 2; the trait ceiling still bounds the count
  // a PLAIN PRINT-CREATURE prompt ("a wolf", "a bear") is the print block: no
  // invented signature action, no seed, no fitted trait — the print traits and
  // the owed traits are its composition (a bear took a Dread Visage seed, 2026-09-28)
  const pcPlain0 = printCanonFor(options.userConcept ?? concept, cr); const pcPlain = speciesOutranks(pcPlain0) ? null : pcPlain0;
  const printExact = !!pcPlain?.exact; // only a whole print name closes the row set; a borrow takes the user's parts, features and repair (step 8: the Night Hag with rotting nails, the Knight afraid of chickens)
  const printBody = !!pcPlain && (pcPlain.exact || pcPlain.borrowOnly); // a whole name or a hyphenated head IS the print body; a head-word borrow ("a canal ghost") only lends rows
  const printPlain = !!pcPlain && !pcPlain.borrowOnly; // a hyphenated head in a long concept BORROWS print's rows and keeps its seat ("a barrow-wight that erupts…" stood its seats down, 2026-09-29)
  if (pcPlain?.borrowOnly) trace('print canon:', `"${options.userConcept ?? concept}" heads on the ${pcPlain.name} — print's rows ride along; the seat stays`);
  if (printPlain) trace('print canon:', `"${options.userConcept ?? concept}" is a print creature — the seats stand down; print's own rows are the composition`);
  if (!wildcardAllowed) {
    for (const [secG, esG] of Object.entries(scaled.sections)) scaled.sections[secG] = esG.filter((eG) => !eG.wildcard_slot);
    trace('claim gate:', `CR ${cr} with no claimed mechanics — the wildcard slot drops (print: 74% of CR<=2 blocks carry no non-attack action)`);
  } else if (cr <= 2 && claimWords && !(Array.isArray(options.mechanics) && options.mechanics.length > 0)) trace('claim gate:', `CR ${cr} but the words claim a capability ("${claimWords[0]}") — the wildcard stays open`);
  else if (cr <= 2 && riderAsk && !(Array.isArray(options.mechanics) && options.mechanics.length > 0)) trace('claim gate:', `CR ${cr} but the words ask for a rider (${riderAsk}) — the idea path runs`);
  if (!traitWildcardAllowed) trace('claim gate:', 'the trait wildcard is closed at CR <= 2 — the chassis carries the traits');
  else if (cr <= 2) trace('claim gate:', `CR ${cr} but a ${options.resolvedType} body — the trait seat stays open (print: a material body carries a trait at every tier)`);
  // THE REACH FOLDS WITHOUT A TETHER (critic, three sightings: a gargoyle, a
  // stuffed bear, a bear-shaped stuffed bear — the trap chassis is the Roper,
  // tendrils at reach 50 and a Reel). A lurking object with no tether in its
  // fiction takes print's other shape for a grapple, the Giant Crab's: the
  // grapple lives as a rider on the primary attack, and there is no Reel.
  {
    const TETHER = /\b(?:tendrils?|tentacles?|tongues?|chains?|ropes?|vines?|nooses?|lash(?:es)?|whips?|hair|cables?|tethers?|lines?|cords?|strands?|silk|webs?|threads?|hooks?|harpoons?|reels?)\b/i;
    if (scaled.style === 'trap' && !TETHER.test(String(options.userConcept ?? concept ?? ''))) {
      const rows = scaled.sections.Actions ?? [];
      const limb = rows.find((e) => /reach (?:[2-9]\d|1[5-9]) ft\./.test(e.text ?? '') && /Grappled condition/.test(e.text ?? '') && !/\d+ \(\d+d\d+/.test(e.text ?? ''));
      if (limb) {
        const primary = rows.find((e) => e !== limb && /Melee Attack Roll/.test(e.text ?? '') && /\d+ \(\d+d\d+/.test(e.text ?? ''));
        const dc = (/escape DC (\d+)/.exec(limb.text) ?? [])[1] ?? scaled.dc;
        if (primary && !/Grappled condition/.test(primary.text)) {
          const rider = ` If the target is a ${cr >= 5 ? 'Large' : 'Medium'} or smaller creature, it has the Grappled condition (escape DC ${dc}).`;
          const cap = (t) => `${String(t).trim().replace(/[^.!?]$/, (c) => `${c}.`)}${rider}`;
          primary.text = cap(primary.text);
          if (primary.text_noRider) primary.text_noRider = cap(primary.text_noRider); // the rider weld rebuilds from this twin — the first cut lost the fold there
        }
        const esc = (x) => String(x).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const gone = [limb.name, ...rows.filter((e) => /pulls each creature Grappled by it/.test(e.text ?? '')).map((e) => e.name)];
        scaled.sections.Actions = rows.filter((e) => !gone.includes(e.name));
        for (const e of scaled.sections.Actions) if (/^Multiattack/.test(e.name)) e.text = e.text.replace(new RegExp(`, makes \\w+ ${esc(limb.name)} attacks, and uses \\w+\\.`), '.'); // the Roper line collapses to its bites
        for (const e of scaled.sections.Actions) if (/^Multiattack/.test(e.name)) for (const g of gone) e.text = e.text.replace(new RegExp(`(?:,? and uses ${esc(g)}| and uses ${esc(g)}|uses ${esc(g)} and |\\buses ${esc(g)}\\.?)`, 'g'), (m) => (m.endsWith('.') ? '.' : '')).replace(/\s+\./g, '.').replace(/\.\./g, '.');
        trace('reach folded:', `"${limb.name}" (reach 50) and ${gone.slice(1).join(', ') || 'no Reel'} leave — no tether in the concept; the grapple rides "${primary?.name ?? 'the attack'}" (the Giant Crab's shape)`);
      }
    }
  }
  // THE RANGED ROW DEFAULTS OFF BY BODY (critic, blind A/B 2026-09-28: seven of
  // twenty blocks carried a thrown attack that was a fiction error — a wolf's
  // Spines, a crab's 240-foot scythe, a courier's Shoulder). Corpus, 329 blocks,
  // share of each type with a pure ranged attack row: Humanoid 50% / Giant 60% /
  // Fey 47% — and Beast 1%, Dragon 0%, Celestial 0%, Aberration 0%, Ooze 0%,
  // Undead 16%, Monstrosity 16%, Fiend 17%, Elemental 18%, Construct 20%, Plant
  // 17%. A known body from the second group keeps its melee kit unless the
  // line throws by nature or the concept claims a ranged mode; the Multiattack
  // is re-keyed to the surviving row. An unknown type is left alone.
  {
    const typeR = String(options.resolvedType ?? '').trim();
    // a plain PRINT creature keeps a ranged row iff print gives it one (the Giant
    // Spider's Web stays; the Guard's javelin, which print never gave it, goes)
    const pcR = printBody ? pcPlain : null; // a borrowed print body too: the brute's Grief Bolt on a Unicorn (2026-10-01)
    const rangedByNature = pcR ? (pcR.rangedRows.length > 0 || pcR.shootsAtRange) : ( /* a hybrid print row (the Mage's Arcane Burst) shoots too — the hermit-mage lost her ranged row and bolt-mark's host (golden 2026-10-01) */scaled.style === 'hurler' || archetype === 'caster' || (scaled.archetypes ?? []).includes('artillery') || !typeR || /^(?:Humanoid|Giant|Fey)$/i.test(typeR));
    const claimed = !pcR && (['ranged', 'mixed'].includes(String(options.attackMode ?? '').toLowerCase()) || (Array.isArray(options.mechanics) && options.mechanics.some((m) => /thrown-weapon|breath/.test(String(m)))));
    if (!rangedByNature && !claimed) {
      const esc = (x) => String(x).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const dropped = [];
      for (const [secR, esR] of Object.entries(scaled.sections)) {
        scaled.sections[secR] = esR.filter((eR) => {
          const drop = /Ranged Attack Roll/.test(eR.text ?? '') && !/Melee or Ranged Attack Roll/.test(eR.text ?? '') && !eR.wildcard_slot;
          if (drop) dropped.push(eR.name);
          return !drop;
        });
      }
      for (const d of dropped) {
        for (const [secR, esR] of Object.entries(scaled.sections)) {
          for (let i = esR.length - 1; i >= 0; i -= 1) {
            const eR = esR[i]; const t = eR.text ?? '';
            if (!new RegExp(`\\b${esc(d)}\\b`).test(t)) continue;
            if (/^Multiattack/.test(eR.name)) {
              const re1 = new RegExp(`makes (\\w+) attacks, using (.+?) or ${esc(d)} in any combination`); const re2 = new RegExp(`makes (\\w+) attacks, using ${esc(d)} or (.+?) in any combination`);
              eR.text = re1.test(t) ? t.replace(re1, 'makes $1 $2 attacks') : re2.test(t) ? t.replace(re2, 'makes $1 $2 attacks') : t.replace(new RegExp(`[^.!?]*\\b${esc(d)}\\b[^.!?]*[.!?]\\s*`), '').trim();
            } else { esR.splice(i, 1); trace('ranged row off:', `"${eR.name}" leaves with it (it made a ${d} attack)`); } // the legendary ranged row
          }
        }
      }
      if (dropped.length) trace('ranged row off:', `${dropped.join(', ')} — this body is not a thrower, a caster, artillery, or a giant, and the concept claims no ranged mode (print: a claw-and-bite body has no ranged row)`);
      // a MELEE-OR-RANGED row keeps its melee half only (the angel's Hurled Debris
      // at 30/120 for 42 — print: Celestial 8%, Undead 5%, Elemental 12% carry one)
      for (const esR of Object.values(scaled.sections)) for (const eR of esR) if (/Melee or Ranged Attack Roll/.test(eR.text ?? '')) {
        eR.text = eR.text.replace('Melee or Ranged Attack Roll', 'Melee Attack Roll').replace(/ or range [\d/]+ ft\./, '');
        trace('ranged row off:', `"${eR.name}" keeps its melee half only`);
      }
    }
  }
  const reskinPrompt = buildReskinPrompt(scaled, { concept, userTyped: options.userConcept ?? concept, removed, takenNames: options.takenNames ?? [], signatureElements: (options.signatureElements ?? []).map((x) => (typeof x === 'string' ? readPhrases(x) : x && typeof x.text === 'string' ? { ...x, text: readPhrases(x.text) } : x)), /* the concept call's elements carry the raw "fire at will" — rewritten before the naming pass sees them (2026-10-01) */ energy: options.energy ?? null, mix: options.mix ?? null, mind: options.mind ?? null, resolvedType: options.resolvedType ?? null, fixedName });
  const raw = await callLLM(reskinPrompt, validateReskinResponse);
  let p = (() => { try { return normalizeTypeFields(JSON.parse(String(raw).replace(/^```json\s*|```\s*$/g, '').trim())); } catch { return null; } })();
  if (!p) throw new Error('reskin call failed — the pilot fails loudly, never silently');
  p.wildcard = ''; p.wildcard_economy = 'action'; delete p.trait_wildcard; // the defect checker and the weld read these; nothing free-text exists
  for (let round = 1; round <= 2; round += 1) {
    const defects = reskinDefects(scaled, p, { energy: options.energy ?? null, mix: options.mix ?? null, resolvedType: options.resolvedType ?? null, concept: options.userConcept ?? concept, removed });
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
        return !v || v.toLowerCase() === k.toLowerCase() || v.split(/\s+/).length > 4 || RESERVED_NAMES.test(v) || HINT_ECHO.test(v) || SHELF_NAMES.has(v.toLowerCase()); // a shelf name is re-asked like a reserved one
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
THE SHEET SO FAR (the chassis the answer names):
${chassisSheet(scaled, { type: options.resolvedType ?? '' })}
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
    // a repair that RENAMES a typed row must carry its existing damage
    // type to the new key — types are rename-keyed, and the orphaned
    // entry left {damage_type} unfilled after the round cap (the
    // Headless Horseman crash ×3, 2026-09-15: "Flaming Skull" repaired
    // to a fresh name, its Fire→Necrotic entry stranded under the old
    // one)
    const rekeyed = { ...p.damage_types };
    for (const [k, fresh] of Object.entries(fix.renames ?? {})) {
      const prev = String(p.renames?.[k] ?? '').trim();
      const next = String(fresh ?? '').trim();
      if (prev && next && prev !== next && rekeyed[prev] != null && rekeyed[next] == null) {
        rekeyed[next] = rekeyed[prev];
        delete rekeyed[prev];
      }
    }
    p = { ...p,
      renames: { ...p.renames, ...(fix.renames ?? {}) },
      // repair types may key on the DONOR name (we asked with it) or the new name
      damage_types: { ...rekeyed, ...Object.fromEntries(Object.entries(fix.damage_types ?? {}).map(([k, v]) => [String(fix.renames?.[k] ?? p.renames?.[k] ?? k).trim(), v])) },
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
  // a shelf name that survived repair falls back to the chassis's own name
  // (the warden's Bulwark stayed "Interpose" through a repair round and the
  // owed Interpose read as already seated, golden 2026-09-28)
  for (const [k, v] of Object.entries(p.renames ?? {})) {
    if (SHELF_NAMES.has(String(v ?? '').trim().toLowerCase())) { trace('rename reverted:', `"${v}" is the shelf's own row name — "${k}" keeps its chassis name`); p.renames[k] = k; }
  }
  if (floatingOrb) for (const [k] of Object.entries(p.renames ?? {})) { const row = Object.values(scaled.sections).flat().find((e) => e.name === k); if (row?.overlay_bite) { if (p.renames[k] !== 'Bite') { trace('rename reverted:', `"${p.renames[k]}" — the orb's one natural row is its Bite`); p.renames[k] = 'Bite'; } if (p.damage_types) p.damage_types.Bite = 'Piercing'; } } /* a bite deals Piercing whatever the model typed (45 Psychic, critic 2026-10-01) */
  // a shifter's all-forms row that survived repair as a beast's weapon takes print's
  // own unarmed word (the Werewolf's Scratch) — the miller shipped "Tusk" through a
  // repair round that answered the same name (full batch 2026-09-29)
  if (scaled.style === 'shifter') {
    const NATURAL = /\b(?:gore|tusks?|claws?|talons?|fangs?|bite|horns?|sting|stinger|maw|jaws|hooves|hoof|antlers?)\b/i;
    for (const [k, v] of Object.entries(p.renames ?? {})) {
      const row = Object.values(scaled.sections).flat().find((e) => e.name === k);
      if (!row || row.gate || /Form Only\)/.test(row.name ?? '') || !/Attack Roll/.test(row.text ?? '') || !NATURAL.test(String(v ?? ''))) continue;
      const taken = new Set(Object.values(p.renames).map((x) => String(x ?? '').toLowerCase()));
      const to = ['Scratch', 'Fist', 'Kick'].find((w) => !taken.has(w.toLowerCase())) ?? 'Scratch';
      trace('rename reverted:', `"${v}" is a beast's weapon on an every-form row — "${k}" takes print's ${to}`); p.renames[k] = to;
      if (p.damage_types && p.damage_types[v] != null && p.damage_types[to] == null) p.damage_types[to] = p.damage_types[v]; // the type map follows the name
    }
  }
  if (options.resolvedType && p.type !== options.resolvedType) {
    trace('type stamped:', `the resolve said ${options.resolvedType} — the model answered ${p.type ?? 'nothing'}`);
    p.type = options.resolvedType;
  }
  // SWARM TYPE STAMP (critic 2026-09-11; MOVED below the resolvedType stamp 2026-09-11 — the Sewer Choir was stamped and then reverted by it): print swarms are
  // "Swarm of Tiny X" — the Swarm trait references a designation the
  // header must carry
  if (body === 'swarm' && p.type && !/^Swarm of/.test(p.type)) {
    // Fey and Undead are uncountable — "Swarm of Tiny Undeads" is not
    // a word (latent in the pluralizer, caught 2026-09-13)
    const plural = ['Fey', 'Undead'].includes(p.type) ? p.type
      : p.type.endsWith('y') ? `${p.type.slice(0, -1)}ies` : `${p.type}s`;
    trace('swarm type stamped:', `${p.type} -> Swarm of Tiny ${plural}`);
    p.type = `Swarm of Tiny ${plural}`;
  }
  // SWARM SIZE CLAMP (2026-09-20; 1 of 7 smoke swarms shipped "Tiny Swarm
  // of Tiny Beasts" on 29d4): print swarms are Medium or Large — Tiny is
  // the COMPONENT creature's size and already sits in the type line. The
  // hit die follows size through hpFormulaForSize, so the d4 goes too.
  if (body === 'swarm') {
    const want = /\b(?:large|huge|vast|massive|enormous|great)\b/i.test(readPhrases(String(options.userConcept ?? concept ?? ''))) ? 'Large' : 'Medium'; // print: 6 of 7 SRD swarms are Medium (Bats alone is Large) — the user's words say large, the model's size pick does not (critic form-ten 2026-10-01)
    if (p.size !== want) { trace('swarm size clamped:', `${p.size ?? 'unset'} -> ${want} (print swarms are Medium or Large)`); p.size = want; }
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
  if (fixedName) {
    // the model may have CORRECTED an obvious misspelling ("chaple
    // knight" -> "Chapel Knight") — accept its version only when it is
    // the same name within a whisper (same word count, tiny per-word
    // edit distance); anything further is a rewording and the user's
    // name stands
    const dist = (a, b) => {
      const m = a.length; const n = b.length;
      if (Math.abs(m - n) > 2) return 3;
      let prev = Array.from({ length: n + 1 }, (_, j) => j);
      for (let i = 1; i <= m; i += 1) {
        const cur = [i];
        for (let j = 1; j <= n; j += 1) cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
        prev = cur;
      }
      return prev[n];
    };
    const uw = fixedName.trim().split(/\s+/);
    const mw = String(p.name ?? '').trim().split(/\s+/);
    const modelCorrected = uw.length === mw.length
      && uw.every((w, i) => dist(w.toLowerCase(), mw[i].toLowerCase()) <= 2)
      && uw.some((w, i) => w.toLowerCase() !== mw[i].toLowerCase());
    if (modelCorrected) trace('name spelling corrected:', `"${fixedName}" -> "${p.name}" (the model's fix is the same name within a whisper)`);
    else p.name = fixedName;
  }
  p.name = String(p.name).replace(/^the\s+/i, '').trim() || p.name;
  // title-case with lowercase connectives — the blanket capitalizer
  // POST-EXHAUSTION ACTUATOR (Tier A 2026-09-13: the Witch's Claw and
  // the Saint's Glass Claw both carried the anatomical/mental/physical
  // triple through two repair rounds — the model would not comply):
  // the engine stamps the damage type magical. Anatomy + magical type
  // breaks no print law; the numbers never move.
  if (['INT', 'WIS', 'CHA'].includes(scaled.striker_stat) && p?.damage_types) {
    const ANAT_STAMP = /\b(?:claws?|bite|fangs?|slam|fists?|tail|gore|horns?|talons?|stingers?|tentacles?|hooves|hoof|maw|jaws|pincers?|tusks?)\b/i;
    const natWarrant = speciesFor([String(options.userConcept ?? concept ?? '')])?.species?.naturalWeapons ?? [];
    const CASTER_WEAPON = /\b(staff|quarterstaff|dagger|scimitar|club|mace|spear|sickle|scythe|knife|cane|rod|sceptre|scepter)\b/i;
    for (const [rn, t] of Object.entries(p.damage_types)) {
      if (['Bludgeoning', 'Piercing', 'Slashing'].includes(t) && ANAT_STAMP.test(rn)) {
        const anat = (ANAT_STAMP.exec(rn) ?? [''])[0].toLowerCase();
        const warranted = natWarrant.some((w) => new RegExp(`\\b${w}s?\\b`, 'i').test(anat)) || new RegExp(`\\b${anat}\\b`, 'i').test(readPhrases(String(options.userConcept ?? concept ?? '')));
        if (!warranted && /^Humanoid\b/i.test(String(options.resolvedType ?? ''))) { // A HUMANOID's natural weapon needs a species or the GM's words: a mental striker swings a weapon rather than growing a magical claw (Mosu's Claw dealt Force — the critic's fourth read)
          const named = (CASTER_WEAPON.exec(readPhrases(String(options.userConcept ?? concept ?? ''))) ?? [])[1];
          const to = named ? named.charAt(0).toUpperCase() + named.slice(1).toLowerCase() : 'Staff';
          const slot = Object.entries(p.renames ?? {}).find(([, v]) => String(v).trim() === rn)?.[0];
          if (slot) { p.renames[slot] = to; delete p.damage_types[rn]; p.damage_types[to] = to === 'Staff' ? 'Bludgeoning' : t; trace('anatomy on a humanoid:', `"${rn}" -> "${to}" (${p.damage_types[to]}) — a Humanoid with no species claw swings a weapon; the magical stamp is for a body that has the part`); continue; }
        }
        p.damage_types[rn] = options.energy ?? 'Force';
        trace('mental-anatomy stamp:', `"${rn}" ${t} -> ${p.damage_types[rn]} (repair exhausted; the engine picks the magical type)`);
      }
    }
  }

  // POST-EXHAUSTION BACKSTOP for a MISSING damage type (critic-ten 2026-10-01: "no
  // damage type for Spine" survived two repair rounds and the block failed loudly):
  // the engine types the row by its anatomy, else by the physical default. A missing
  // type is a slot, not a law; failing the whole block over it served nobody.
  if (p?.renames) {
    p.damage_types = p.damage_types ?? {};
    for (const e of Object.values(scaled.sections).flat()) {
      if (!String(e.text ?? '').includes('{damage_type}')) continue;
      const rn = String(p.renames[e.name] ?? '').trim(); if (!rn || DAMAGE_TYPES.includes(p.damage_types[rn])) continue;
      const noun = String(rn).toLowerCase().split(/[^a-z]+/).reverse().find((w) => TYPE_BY_NOUN[w]);
      p.damage_types[rn] = noun ? TYPE_BY_NOUN[noun] : 'Bludgeoning';
      trace('damage type by anatomy:', `"${rn}" -> ${p.damage_types[rn]} (repair exhausted; the engine types the row by its noun)`);
    }
  }

  // minted "Grille Of The Hollow Confession" and "Vigil Of The Pass"
  // (2026-09-07); print writes "of the"
  { // user names included since 2026-09-14 (owner ruling: "convert
    // user names to the proper format if improper... if a user wants
    // to intentionally misspell they can edit the name" — supersedes
    // the verbatim pin). First letter per word only; interior caps
    // ("McTavish") stay the user's.
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
    && reskinDefects(scaled, p, { energy: options.energy ?? null, mix: options.mix ?? null, resolvedType: options.resolvedType ?? null, concept: options.userConcept ?? concept, removed })
      .some((d) => d.includes('must not re-implement'))) {
    engineIsSignature = true;
    trace('engine is the signature —', 'the wildcard insisted on re-implementing containment; the slot is dropped');
  }

  // the engulf engine wears the body's own verb (closed menu — the
  // Gaoler's "Chain-Cage... swallows one creature", 2026-08-27: a chain
  // bundle shouldn't swallow, and print names the mouth form Swallow x4
  // verbatim, so the row is rules-named per form, never model-named)
  {
    const row = Object.values(scaled.sections).flat().find((e) => e.engulf_engine || (e.rules && /^(?:Swallow|Engulf|Smother|Whelm|Cage|Entomb|Cocoon)$/.test(String(e.name ?? '')))); // the flag does not survive scaling on every donor; the engine row's name does
    const form = ENGULF_FORMS[String(p.engulf_style ?? '').trim().toLowerCase()];
    if (row) row.boundKeys = [...new Set([...(form ? [form.name.toLowerCase()] : []), 'swallow', 'swallows', 'engulf', 'engulfs', 'devour', 'devours', 'gulp', 'smother', 'entomb', 'cocoon', 'whelm'])]; // the engine's own row answers the user's verb whether or not the model picked a form ("swallows horses whole" read as dropped beside a Swallow row — sprint run 2026-10-12)
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
      // digestion is Acid (Toad, Worm) UNLESS the concept declares an
      // energy — a furnace gullet burns (the Crucible Hulk swallowed
      // with Acid inside a Fire body, 2026-09-10); every other
      // containment crushes — print's Rug and Whelm deal Bludgeoning
      // a COLD wyrm does not digest in acid (flagged three times). Where the
      // form declared no energy, the creature's own words name one: print's
      // interiors match the body they are inside, and only an undeclared,
      // unnamed gut falls back to Acid.
      const namedEnergy = (NAME_CLAIMS.find(([re, ty]) => ty && re.test(readPhrases(String(options.userConcept ?? concept ?? '')))) ?? [])[1] ?? null;
      const interior = options.energy ?? namedEnergy ?? (['Swallow', 'Engulf'].includes(row.name) ? 'Acid' : 'Bludgeoning');
      if (!options.energy && namedEnergy) trace('engulf interior:', `${namedEnergy} — the concept's own energy, not the default ${['Swallow', 'Engulf'].includes(row.name) ? 'Acid' : 'Bludgeoning'} (a cold wyrm's gut is not acid)`);
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
      // the ooze's corrode is Acid unless the concept declares an energy
      // (a molten slag ooze corrodes with Fire; body-type sweep 2026-09-11)
      if (e.rules && e.name === 'Corrosive Form') e.text = e.text.split('{damage_type}').join(options.energy ?? 'Acid');
    }
  }

  // DEFENSE ENGINE (owner design 2026-09-10): the boss seat carries
  // every engine's rows; the answer picks what the concept IS and the
  // other engine never ships. Never-fail: an absent or off-menu pick
  // defaults to rampart (the validator already asked the retry for it).
  {
    const menu = new Set(Object.values(scaled.sections).flat().filter((e) => e.engine).map((e) => e.engine));
    if (menu.size) {
      const pick = String(p.defense_engine ?? '').trim().toLowerCase();
      const chosen = menu.has(pick) ? pick : 'rampart';
      for (const [sec, es] of Object.entries(scaled.sections)) scaled.sections[sec] = es.filter((e) => !e.engine || e.engine === chosen);
      trace('defense engine:', chosen + (menu.has(pick) ? '' : ' (defaulted — the answer picked none)'));
    }
  }

  // NAMED PARTS ARE ENGINE ROWS (step 7, owner 2026-10-11: "why do we need authoring if someone names claw or greatsword"): a clause
  // that names a body part or weapon becomes an attack row — the user's phrase as the name, the noun's type and mode, a rider from a
  // small noun table, the chassis's priced slot taken or cloned. No call. The template path composes everything else exactly as it
  // did at the October 4 release; authoring survives only as the repair call, after the template path, for a clause nothing claimed.
  let authored = null; let inlineGuessUsed = null; // the short form the kit and feature rows were stamped with, before the rows' form is settled
  const clauseRecord = groundedClauses(p.clauses, options.userConcept ?? concept, () => {});
  const authorAttackKeys = Object.values(scaled.sections).flat().filter((e) => !e.rules && /Attack Roll/.test(e.text ?? '') && !e.wildcard_slot).map((e) => e.name);
  if (!printExact && authorAttackKeys.length) {
    const parts = partRows(clauseRecord, { cap: body === 'dragon' ? 5 : Math.max(4, authorAttackKeys.length + 2) }); // four parts fit a one-slot chassis (Meshrin's bite went to the repair call on a brute-5 with one slot, step 7 round five)
    if (parts.length) {
      authored = { attacks: parts, saves: [], traits: [], reactions: [], crossRef: null, unplaced: [], parts: true };
      const keyMode = (k) => { const t = Object.values(scaled.sections).flat().find((x) => x.name === k)?.text ?? ''; return /Melee or Ranged/.test(t) ? 'both' : /Ranged Attack Roll/.test(t) ? 'ranged' : 'melee'; };
      const free = authorAttackKeys.slice(); const placed = authored.attacks.map((a) => ({ ...a, key: null }));
      for (const a of placed) { const want = a.mode === 'ranged' ? ['ranged', 'both'] : a.mode === 'both' ? ['both', 'melee', 'ranged'] : ['melee', 'both']; const ix = free.findIndex((k) => want.includes(keyMode(k))); if (ix !== -1) a.key = free.splice(ix, 1)[0]; } // a part takes a slot of its OWN mode first: a crossbow on the melee slot turned the sheet's only melee row ranged and the Riposte pointed at nothing (Dame Oriel, sprint run 2026-10-12)
      for (const a of placed) { if (a.key || a.mode === 'ranged') continue; const ix = free.findIndex((k) => keyMode(k) !== 'melee'); if (ix !== -1) a.key = free.splice(ix, 1)[0]; } // a melee part may still take a leftover ranged or hybrid slot (Meshrin's tail on the brute's ranged slot, step 7); a ranged part never takes a melee slot — it clones
      p.renames = p.renames ?? {}; p.damage_types = p.damage_types ?? {};
      for (const a of placed) if (a.key) { p.renames[a.key] = a.name; if (a.type) p.damage_types[a.name] = a.type; }
      authored.placed = placed;
      trace('named parts:', `${placed.map((a) => `${a.name} (${a.key ? 'slot' : 'clone'}${a.rider ? `, ${a.rider}` : ''}${a.mode === 'ranged' ? ', ranged' : ''})`).join(', ')} — the user's words, the engine's numbers`);
    }
  }
  // apply renames; ANY unrenamed entry is a loud failure (owner spec)
  const sections = {};
  const renamed = new Map();
  for (const [sec, es] of Object.entries(scaled.sections)) {
    sections[sec] = es.map((e) => {
      // rules vocabulary keeps its printed name — the table recognizes it
      // at a glance (the skeleton path name-locks these for the same reason)
      if (e.rules || e.name === 'Multiattack' || /^Legendary Resistance/.test(e.name)) return { name: e.name, text: e.text, ...(e.rules ? { rules: true } : {}), ...(e.boundKeys ? { boundKeys: e.boundKeys } : {}) }; // the engine row's provenance rides into the working copy (the Swallow's keys were stamped and lost here — sprint run 2026-10-12)
      // damage_types keys arrive in the model's own casing of its own
      // names — normalize them through the same title-caser the names get
      const MINOR = new Set(['of', 'the', 'a', 'an', 'and', 'or', 'to', 'in', 'into', 'with']);
      const titleCase = (n) => n.split(/\s+/).map((w, i) => (i > 0 && MINOR.has(w.toLowerCase()) ? w.toLowerCase() : w[0].toUpperCase() + w.slice(1))).join(' ');
      const raw = String(p.renames?.[e.name] ?? '').trim();
      if (!raw || raw.split(/\s+/).length > 4) throw new Error(`unrenamed entry: "${e.name}" — failing loudly per spec`);
      const fresh = titleCase(raw);
      renamed.set(e.name, fresh);
      return { name: e.wildcard_slot ? fresh : fresh + (e.gate ? ` (${e.gate})` : ''), text: e.text, text_noRider: e.text_noRider, was: e.name, wildcard: !!e.wildcard_slot, gate: e.gate, ...(e.print ? { print: true } : {}), ...(e.overlay_bite ? { overlay_bite: true } : {}) }; // the orb's bite keeps its print mark through the rename (checker 2026-10-02)
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
    // "N with/of/given a Y" heads the same way ("Kiln with a Mouth" -> kiln, not
    // "the mouth" — the furnace's short form was its mouth all sheet, critic 2026-09-28)
    if (/\s(?:with|given|bearing|wearing|holding|carrying)\s/i.test(s)) s = s.split(/\s(?:with|given|bearing|wearing|holding|carrying)\s/i)[0].trim();
    // "X of Y" heads on X (Sphinx of Lore -> sphinx; Rug of Smothering -> rug)
    if (/\sof\s/i.test(s)) s = s.split(/\sof\s/i)[0].trim();
    const words = s.split(/\s+/);
    // two words is print's own inline ceiling (the dire wolf, the bog
    // lurker ship whole); longer heads on the final noun
    if (words.length > 2) s = words.slice(-1)[0];
    return s.toLowerCase();
  };
  // a swarm's printed subject is "the swarm" (print: every 2024 swarm;
  // the plural name as subject minted "the cathedral gargoyles peels",
  // critic 2026-09-14)
  // a PERSONAL NAME is not a noun phrase ("Drumkalla the Red" spoke as "the red",
  // "Sergeant Haldrun Ironvolley" as "the ironvolley" — critic, new lines 2026-09-28):
  // a rank-titled name speaks by its rank, "Name the Epithet" by the given name
  const RANK = /^(?:[A-Z][a-z-]+\s+)?(Sergeant|Captain|Commander|Lieutenant|General|Admiral|Marshal|Warlord|Chieftain|Lord|Lady|Sir|Dame|Baron|Baroness|Count|Countess|Duke|Duchess|King|Queen|Prince|Princess|Abbot|Abbess|Bishop|Brother|Sister|Mother|Father|Constable|Sheriff|Grandmother|Grandfather|Granny|Grandma|Grandpa|Nan|Auntie|Aunt|Uncle|Old|Widow|Goodwife|Goodman|Elder|Mistress|Master)\s+[A-Z]/; // kinship titles are titles too ("the grandmother ashwick" on every line, critic form-ten 2026-10-01)
  const personalName = (full) => {
    const s = String(full).trim();
    const hon = /^(Sir|Dame|Lord|Lady|Saint)\s+([A-Z][\w'-]+)/.exec(s); if (hon) return `${hon[1]} ${hon[2]}`; // an honorific keeps its name on every path — a model-minted "Sir Lorn of the Briar Court" spoke as "the sir" (sprint run 2026-10-12)
    const rank = RANK.exec(s); if (rank) { if (!/^(?:old|young|great|grand|big|little)$/i.test(rank[1])) return `the ${rank[1].toLowerCase()}`; const last = s.split(/\s+/).pop(); if (ROLE_NOUN.test(last)) return `the ${last.toLowerCase()}`; /* a role noun left after a stripped rank is still a kind ("Old Road Warden" spoke as "Warden" — the critic's fourth read) */ if (/^[A-Z][\w'-]+$/.test(last)) return last; }
    const epi = /^([A-Z][a-z]+(?:ed|en|ous|ful|ish|less|some|born|sworn|vowed|clad|bound|touched|marked|scarred|eyed|hearted|tongued|maned|horned|crowned))\s+([A-Z][\w'-]+)$/.exec(s); // AN EPITHET-FIRST PERSON: "Ashvowed Brannor" is Brannor, not "the ashvowed brannor" (the critic's fourth read); a role noun second is still a kind
    if (epi) return ROLE_NOUN.test(epi[2]) ? null : epi[2]; // a role noun second is a kind and speaks whole ("the headless horseman"); only a given name is a person ("Ashvowed Brannor" → Brannor) // a weak rank word is not a rank: "Old Sargeant Rootback" spoke as "the old" (the critic's third species read, rerun)
    const given = /^([A-Z][a-z']+)\s+the\s+[A-Z][a-z-]+$/.exec(s); if (given) return given[1];
    // a COINED SURNAME ("Bramblewrack Ironmother", "Gormak Skullsunder"): a compound
    // ending in a role or deed word is a family name, and the first word is the person
    const coined = /^([A-Z][a-z']+)\s+[A-Z][a-z]{2,}(?:mother|father|lord|king|queen|master|keeper|caller|sunder|breaker|bane|slayer|singer|walker|render|reaper|splitter|crusher|volley|vow|wright|smith)$/.exec(s); if (coined) return coined[1];
    return null;
  };
  // the model DECLARES the inline form (it knows whether it minted a person or a
  // thing — "the gormak skullsplitter" read a warlord as a noun phrase, critic
  // 2026-09-29); accepted only as "the <lowercase noun>" or one capitalized word
  // that is a whole word of the name; the rules stand behind it
  // THE MODEL DECLARES THE INLINE (owner, 2026-10-13: "if we had a call return 'inline epithet' with a prompt change we wouldn't need the deterministic cruft, or at least it's a
  // light secondary layer"). The call answers the phrase and whether the name is a person or a kind; this validates that the phrase is built from the NAME's own words and takes its
  // kind's form. A valid answer wins; the rules below stand as the fallback. Print's own idiom and an article in the GM's words outrank both.
  const acceptDeclared = () => {
    const phrase = String(p.inline ?? '').trim(); const kind = String(p.inline_kind ?? '').trim().toLowerCase();
    const nm = String(p.name ?? '').trim(); if (!phrase || !nm) return null;
    const lower = nm.split(/\s+/).map((w) => w.toLowerCase());
    const ofName = (w) => lower.includes(w.toLowerCase());
    if (kind === 'person') {
      const hon = /^(Sir|Dame|Lord|Lady|Saint)\s+([A-Z][\w'-]+)$/.exec(phrase);
      if (hon && ofName(hon[1]) && ofName(hon[2])) return phrase;
      return /^[A-Z][\w'-]*$/.test(phrase) && ofName(phrase) ? phrase : null;
    }
    if (kind === 'kind') {
      if (lower.length === 1 && properNoun) return null; // a one-word Name field with no article in the GM's words is a person, whatever the call says (the owner's rule: "Meshrin", never "the meshrin")
      const m = /^the ([a-z][a-z'-]*(?: [a-z][a-z'-]*)?)$/.exec(phrase); if (!m) return null;
      const suffixes = lower.map((_, i) => lower.slice(i).join(' '));
      return suffixes.includes(m[1]) ? phrase : null;
    }
    return null;
  };
  const declaredInline = (() => {
    const s = String(p.inline ?? '').trim();
    if (/^the [a-z][a-z'-]*(?: [a-z][a-z'-]*)?$/.test(s) && s.replace(/^the /, '').split(' ').every((w) => new RegExp(`(?:^|[\\s-])${w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(?:[\\s-]|$)`, 'i').test(String(p.name ?? ''))) ) return s; // the declared form must be made of the NAME's own words: "the stalker" on "Silent Rooststalker" is not (the critic's fourth read, rerun) // two words at most — print's own inline ceiling ("the warden shell-of-stone" beside "the warden" — the critic's second species read)
    if (/^[A-Z][a-z']{1,20}$/.test(s) && new RegExp(`(?:^|\\s)${s}(?:\\s|$)`).test(String(p.name ?? ''))) return s;
    return null;
  })();
  const landAuthored = (authored, { repair = false } = {}) => { // fresh: a repair on a sheet that authored nothing — the signature path still runs and the slot stays // one landing for the main answer and the repair pass (step 6)
    const esA = sections.Actions ?? (sections.Actions = []);
    const rowByName = (n) => Object.values(sections).flat().find((e) => String(e.name ?? '').replace(/ \(.*\)$/, '') === n);
    const riderText = (c) => (c === 'Prone' ? ', and the target has the Prone condition.' : c === 'Grappled' ? `. If the target is a ${cr >= 5 ? 'Large' : 'Medium'} or smaller creature, it has the Grappled condition (escape DC ${8 + scaled.pb + (Number(scaled.stats?.STR) >= 0 ? Math.floor((Number(scaled.stats.STR) - 10) / 2) : 0)}).` : `, and the target has the ${c} condition until the end of its next turn.`); // print never applies Grappled without its escape DC (0 of 2 corpora; critic's step-5 read)
    for (const a of authored.placed) {
      let row = a.key ? rowByName(a.name) : null;
      if (!row && repair && rowByName(a.name)) { trace('repair:', `"${a.name}" is already a row — the repaired copy leaves`); continue; }
      if (!row) { // a NEW attack row: a clone of the first mapped chassis row's priced text, in the form's mode and type — the final price pass re-solves the round
        const base = authored.placed.map((b) => b.key && rowByName(b.name)).find(Boolean) ?? Object.values(sections).flat().find((e) => /Attack Roll/.test(e.text ?? '') && !e.wildcard); if (!base) continue; // the repair pass clones any priced attack row
        const dmg = /(\d+ \(\d+d\d+(?: [+-] \d+)?\)) (?:[A-Z][a-z]+|\{damage_type\}) damage/.exec(base.text); /* the type token is stamped later */ const atk = /Attack Roll:\*? \+(\d+)/.exec(base.text); if (!dmg || !atk) continue;
        const where = a.mode === 'ranged' ? `range 30/120 ft.` : a.mode === 'both' ? `reach 5 ft. or range 30/120 ft.` : `reach 5 ft.`;
        const label = a.mode === 'ranged' ? 'Ranged' : a.mode === 'both' ? 'Melee or Ranged' : 'Melee';
        const baseType = /\d+ \(\d+d\d+(?: [+-] \d+)?\) ([A-Z][a-z]+) damage/.exec(base.text)?.[1] ?? 'Bludgeoning';
        row = { name: a.name, text: `*${label} Attack Roll:* +${atk[1]}, ${where} ${dmg[1]} ${a.type ?? baseType} damage.`, authored: true, ...(a.part ? { part: true, ...(a.weapon ? { weapon: a.weapon } : {}) } : {}) }; esA.push(row);
      } else {
        if (a.part) { row.part = true; if (a.weapon) row.weapon = a.weapon; }
        if (a.mode === 'both' && a.thrownRange && !/Melee or Ranged/.test(row.text)) row.text = row.text.replace(/\*Melee Attack Roll:\*? (\+\d+(?: \([^)]*\))?), reach (\d+) ft\./, `*Melee or Ranged Attack Roll:* $1, reach $2 ft. or range ${a.thrownRange} ft.`); // print's hybrid grammar for a thrown weapon
        row.text = (a.type ? row.text.replace(/(\d+ \(\d+d\d+(?: [+-] \d+)?\)) ([A-Z][a-z]+) damage/, `$1 ${a.type} damage`) : row.text).replace(/,? and the target has the \{?[A-Za-z_]+\}? condition[^.]*\.?/, '.').replace(/\s*If the target [^.]*has the \{?[A-Za-z_]+\}? condition[^.]*\.?/, '').replace(/\s*While (?:Grappled|Restrained)[^.]*\.?/, '').replace(/\.\.$/, '.');
        let folded = 0; const strip = (re) => { row.text = row.text.replace(re, (m0, avg) => { folded += Number(avg); return ''; }); };
        if (/^(?:Bludgeoning|Piercing|Slashing)$/.test(a.type)) strip(/ plus (\d+) \(\d+d\d+\) (?:[A-Z][a-z]+|\{damage_type\}) damage/); // a weapon row the user named deals its weapon's damage; the chassis's energy rider belongs to the row the user gave that energy (Fire on the bull's gore)
        strip(/ plus (\d+) \(\d+d\d+\) \{damage_type_2\} damage/); delete row.text_noRider;
        if (folded) row.text = row.text.replace(/(\d+) \((\d+)d(\d+)(?: \+ (\d+))?\)/, (m0, avg, n0, d0, mod) => { const r = attackDamageDiceFor(Number(avg) + folded, Number(mod ?? 0)); return `${r.avg} (${r.dice})`; }); // the slot's WHOLE damage is the part's: the energy clause leaves and its share folds into the weapon's dice (the Ogre's Club dealt 12 of the brute's 19 a hit — canaries 2026-10-12) // the chassis's split clause is not the user's; and the stamp pass must not restore the pre-rider text over an authored row (the Wyrm's Grappled rider vanished that way)
        row.authored = true;
      }
      // the form's MODE owns the row's shape; the chassis slot's numbers stay (a melee tail landed on the hybrid slot and kept "or range 30/120 ft.")
      const headM = /\*(Melee or Ranged|Melee|Ranged) Attack Roll:\*? \+(\d+), (?:reach (\d+) ft\.)?(?: or )?(?:range ([\d/]+) ft\.)?/.exec(row.text);
      if (headM) { const [whole, , bonus, reach, range] = headM; const want = a.mode === 'melee' ? `*Melee Attack Roll:* +${bonus}, reach ${reach ?? 5} ft.` : a.mode === 'ranged' ? `*Ranged Attack Roll:* +${bonus}, range ${range ?? '30/120'} ft.` : `*Melee or Ranged Attack Roll:* +${bonus}, reach ${reach ?? 5} ft. or range ${range ?? '30/120'} ft.`; if (whole.trim() !== want) row.text = row.text.replace(whole, `${want} `).replace(/\s{2,}/g, ' '); }
      if (a.rider && !new RegExp(`has the ${a.rider} condition`).test(row.text)) row.text = row.text.replace(/\.\s*$/, '') + riderText(a.rider);
      if (a.flavor) row.flavor = a.flavor; row.clause = a.clause;
    }
    const ma = esA.find((e) => /^Multiattack/.test(e.name));
    // the Multiattack keeps every row it already cited and gains the new rows (a repair adds to the list; it never shrinks it — the step-5 Wyrm lost its chassis rows this way)
    const cited = Object.values(sections).flat().filter((e) => /Attack Roll/.test(e.text ?? '') && !e.authored && ma && new RegExp(`\\b${String(e.name).replace(/ \(.*\)$/, '').replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`).test(ma.text)).map((e) => String(e.name).replace(/ \(.*\)$/, ''));
    const attackNames = [...cited, ...Object.values(sections).flat().filter((e) => e.authored && /Attack Roll/.test(e.text ?? '')).map((e) => String(e.name).replace(/ \(.*\)$/, '')).filter((n) => !cited.includes(n))];
    if (ma && attackNames.length) { const count = (/makes (\w+)/.exec(ma.text) ?? [])[1] ?? 'two'; ma.text = `${ma.text.split(/\.\s*/)[0].replace(/makes (\w+) .*$/, attackNames.length === 1 ? `makes ${count} ${attackNames[0]} attacks` : `makes ${count} attacks, using ${attackNames.slice(0, -1).join(', ')} or ${attackNames.at(-1)} in any combination`)}.${(ma.text.match(/\. It can replace[^.]*\./) ?? [''])[0]}`; } // "in any combination" needs two rows (Wearwretch, Bog Hound — critic's step-5 read)
    for (const s of authored.saves) {
      const dice = engineDiceFor(Math.max(3, Math.round((scaled.per_hit ?? 6) * (s.target.startsWith('each') ? 1.4 : 1.1))));
      const saveType = s.type ?? (([, w] = []) => ({ fire: 'Fire', flame: 'Fire', scald: 'Fire', steam: 'Fire', burn: 'Fire', ember: 'Fire', frost: 'Cold', ice: 'Cold', cold: 'Cold', freez: 'Cold', lightning: 'Lightning', thunder: 'Thunder', sonic: 'Thunder', poison: 'Poison', venom: 'Poison', acid: 'Acid', rot: 'Necrotic', necrotic: 'Necrotic', decay: 'Necrotic', grave: 'Necrotic', radiant: 'Radiant', holy: 'Radiant', sun: 'Radiant', psychic: 'Psychic', mind: 'Psychic', force: 'Force' })[w])(/\b(fire|flame|scald|steam|burn|ember|frost|ice|cold|freez|lightning|thunder|sonic|poison|venom|acid|rot|necrotic|decay|grave|radiant|holy|sun|psychic|mind|force)/i.exec(`${s.clause} ${s.name}`.toLowerCase()) ?? []) ?? authored.placed[0]?.type ?? 'Bludgeoning'; // the save's own type, else a type its words warrant, else the first attack's
      const failure = [s.damage ? `${dice.avg} (${dice.dice}) ${saveType} damage` : '', s.movement ? `the target is ${s.movement} straight ${/pushed/.test(s.movement) ? 'away from' : 'toward'} ${inlineGuessRef()}` : '', s.condition ? `the target has the ${s.condition} condition until the end of its next turn` : ''].filter(Boolean);
      const text = renderForm({ kind: 'save', stat: s.stat, dc: scaled.dc, target: s.target, failure: `${failure[0]}${failure.length > 1 ? `, and ${failure.slice(1).join(', and ')}` : ''}.`, success: s.damage && s.success === 'half' ? 'Half damage only.' : null }, '2024');
      const saveRow = { name: `${s.name}${s.recharge ? ' (Recharge 5-6)' : ''}`, text, authored: true, clause: s.clause, gate: s.recharge ? 'Recharge 5-6' : undefined };
      esA.push(saveRow);
      if (s.recharge) slotYield(['nova'], saveRow);
    }
    const dmgTok = (eff) => String(eff).replace(/\s*\{dmg\}(?:\s+damage)?/g, (tok, off, whole) => (/\b(?:takes?|deals?|dealing|taking|extra|additional|plus|regains?|suffers?|an extra)\s*$/i.test(whole.slice(0, off)) ? tok : '')).replace(/\s{2,}/g, ' '); // "immune to anything {dmg}" — the token only stands where damage is dealt or taken (the Vault Bull, step 6 baseline)
    for (const t of authored.traits) { const text = renderForm({ kind: 'trait', trigger: t.trigger, effect: dmgTok(t.effect).replace(/(?:DC )?\{dc\}/g, `DC ${scaled.dc}`) /* "a 15 Charisma saving throw" — the token always carries its DC (step 7 defect 5) */.replace(/\{dmg\}/g, (() => { const d = engineDiceFor(Math.max(3, Math.round((scaled.per_hit ?? 6) * 0.5))); return `${d.avg} (${d.dice})`; })()) }, '2024'); (sections.Traits = sections.Traits ?? []).unshift({ name: t.name, text, authored: true, clause: t.clause, ...(t.flavor ? { flavor: t.flavor } : {}) }); }
    for (const r of authored.reactions) { const text = renderForm({ kind: 'reaction', trigger: r.trigger, response: r.response.replace(/(?:DC )?\{dc\}/g, `DC ${scaled.dc}`).replace(/\{dmg\}/g, (() => { const d = engineDiceFor(Math.max(3, Math.round((scaled.per_hit ?? 6) * 0.5))); return `${d.avg} (${d.dice})`; })()) }, '2024'); (sections.Reactions = sections.Reactions ?? []).push({ name: r.name, text, authored: true, clause: r.clause }); }
    if (authored.crossRef && authored.crossRef.payoffRow !== authored.crossRef.riderRow) { const pay = rowByName(authored.crossRef.payoffRow); const rid = rowByName(authored.crossRef.riderRow); if (pay && rid && new RegExp(`has the ${authored.crossRef.condition} condition`).test(rid.text) && /Attack Roll:\*? \+\d+/.test(pay.text) && !/with Advantage/.test(pay.text)) { pay.text = pay.text.replace(/(Attack Roll:\*? \+\d+)/, `$1 (with Advantage if the target has the ${authored.crossRef.condition} condition)`); trace('cross-row reference:', `"${rid.name}" applies ${authored.crossRef.condition}; "${pay.name}" exploits it`); } }
    trace(repair ? 'repaired sheet:' : 'named parts landed:', `${attackNames.length} attack row(s), ${authored.saves.length} save, ${authored.traits.length} trait(s), ${authored.reactions.length} reaction(s); ${authored.unplaced.length} clause(s) unplaced`);
  };
  if (authored) landAuthored(authored);
  if (Object.values(sections).flat().some((e) => e.part && /Melee or Ranged Attack Roll/.test(e.text ?? ''))) { // a thrown part IS the ranged row: the chassis's own pure ranged row leaves (no invented Hurled Scythe beside a spear)
    for (const [secR, esR] of Object.entries(sections)) for (let i = esR.length - 1; i >= 0; i -= 1) { const e = esR[i]; if (!e || e.part || e.print || e.rules || !/Ranged Attack Roll/.test(e.text ?? '') || /Melee or Ranged/.test(e.text ?? '')) continue; esR.splice(i, 1); trace('ranged row off:', `"${e.name}" leaves — the thrown part is the ranged row`); sweepDeadName(sections, e.name, Object.values(sections).flat().find((x) => x.part && /Melee or Ranged/.test(x.text ?? '')) ?? null, trace); }
  }
  for (const prow of Object.values(sections).flat().filter((e) => e.part)) { // the part IS the row: a chassis row the model renamed to the same name leaves (two Crossbows on Dame Oriel, two Shortbows on Gorum — sprint run 2026-10-12)
    const bareP = String(prow.name ?? '').replace(/ \(.*\)$/, '').toLowerCase();
    for (const [secD, esD] of Object.entries(sections)) for (let i = esD.length - 1; i >= 0; i -= 1) { const o = esD[i]; if (o === prow || o.part || String(o.name ?? '').replace(/ \(.*\)$/, '').toLowerCase() !== bareP) continue; esD.splice(i, 1); trace('part supersedes:', `${secD}/"${o.name}" leaves — the model named a chassis row for the user's ${prow.name}; the part is that row`); }
  }
  { // THE NAMED WEAPON TAKES THE CHASSIS'S SLOT IN ITS MODE (the critic's fifth
    // read, six sheets): "Haft Swing" beside the Greataxe, "Brine Surge" beside
    // the Trident, "Weapon of Command" repeating the Mace's dice. One weapon,
    // one rule set — and the keeper absorbs the evicted row's swings, so the
    // round's damage rides with the name the GM typed.
    const modeOf = (e) => (/Ranged Attack Roll/.test(e.text ?? '') && !/Melee or Ranged/.test(e.text ?? '') ? 'ranged' : 'melee');
    const chassisAttack = (e) => /Attack Roll/.test(e.text ?? '') && !e.part && !e.print && !e.rules && !e.kit && !e.feature && !e.template && !e.library && !e.authored;
    for (const wrow of Object.values(sections).flat().filter((e) => e.part && e.weapon && /Attack Roll/.test(e.text ?? ''))) {
      const mode = modeOf(wrow);
      for (const [secW, esW] of Object.entries(sections)) for (let i = esW.length - 1; i >= 0; i -= 1) {
        const o = esW[i]; if (!o || o === wrow || !chassisAttack(o) || modeOf(o) !== mode) continue;
        esW.splice(i, 1);
        trace('chassis row off:', `${secW}/"${o.name}" leaves — the GM named a ${mode} weapon (${wrow.name}); one weapon, one rule set`);
        sweepDeadName(sections, o.name, wrow, trace);
      }
    }
  }
  { // THE FEATURE TABLE (step 8): a named weapon earns one feature; a style clause earns Trip Attack and Riposte — closed forms, no call
    const partRowsOn = Object.values(sections).flat().filter((e) => e.part).map((e) => ({ part: true, name: String(e.name).replace(/ \(.*\)$/, ''), clause: e.clause, weapon: e.weapon ?? null, mode: /Ranged Attack Roll/.test(e.text) && !/Melee or Ranged/.test(e.text) ? 'ranged' : 'melee', rider: /has the Prone condition/.test(e.text) ? 'Prone' : null }));
    const meleeNames = Object.values(sections).flat().filter((e) => /Melee(?: or Ranged)? Attack Roll/.test(e.text ?? '') && !e.rules).map((e) => String(e.name).replace(/ \(.*\)$/, ''));
    const modSTR = Math.floor((Number(scaled.stats?.STR ?? 10) - 10) / 2);
    const feats = printExact ? [] : featureRows(clauseRecord, { parts: partRowsOn, meleeRows: meleeNames, inline: inlineGuessRef(), pb: scaled.pb, dc: scaled.dc, mod: modSTR });
    for (const f of feats) {
      if (f.kind === 'rider') { const row = Object.values(sections).flat().find((e) => String(e.name).replace(/ \(.*\)$/, '') === f.row); if (!row) continue; if (f.replacesProne) row.text = row.text.replace(/,? and the target has the Prone condition\.?$/, '.'); row.text = `${row.text.trim().replace(/\.$/, '')}${f.text}`; row.feature = f.name; row.clause = row.clause ?? f.clause; }
      else if (f.kind === 'trait') (sections.Traits = sections.Traits ?? []).unshift({ name: f.name, text: f.text.replace(/\{dmg\}/g, (() => { const d = engineDiceFor(Math.max(3, Math.round((scaled.per_hit ?? 6) * 0.5))); return `${d.avg} (${d.dice})`; })()), feature: f.name, clause: f.clause });
      else if (f.kind === 'reaction') (sections.Reactions = sections.Reactions ?? []).push({ name: f.name, text: f.text, feature: f.name, clause: f.clause });
    }
    { // the named weapon is the strongest part row (Meshrin's greatsword read 13 behind a 22 tail — critic's step-8 read)
      const partsOn = Object.values(sections).flat().filter((e) => e.part && /Attack Roll/.test(e.text ?? '')); const weaponRow = partsOn.find((e) => e.weapon);
      const exprOf = (e) => /\d+ \(\d+d\d+(?: [+-] \d+)?\)/.exec(e.text)?.[0] ?? null; const avgOf = (e) => Number((exprOf(e) ?? '0').split(' ')[0]);
      const top = partsOn.filter(exprOf).sort((a, b) => avgOf(b) - avgOf(a))[0];
      if (weaponRow && top && top !== weaponRow && avgOf(top) > avgOf(weaponRow)) { const a = exprOf(weaponRow); const b = exprOf(top); weaponRow.text = weaponRow.text.replace(a, b); top.text = top.text.replace(b, a); trace('named weapon leads:', `"${weaponRow.name}" takes ${b}; "${top.name}" takes ${a}`); }
    }
    if (feats.length) trace('features:', feats.map((f) => `${f.name}${f.kind === 'rider' ? ` on ${f.row}` : ` (${f.kind})`}`).join(', ') + ' — the feature table, no call');
  }
  { // THE SPECIES KIT (step 9a): a species word in the GM's words lands header lines and free traits — SRD rows renamed to the creature, flavor from catalog shapes under print's row cap; nothing on an exact print body (print wins)
    const sk = printExact ? null : speciesFor([...clauseRecord.map((c) => c.text), String(options.fixedName ?? '').trim()], String(options.userConcept ?? concept ?? ''));
    if (sk) {
      const inl = inlineGuessRef(); const names = () => new Set(Object.values(sections).flat().map((e) => String(e.name ?? '').replace(/ \(.*\)$/, '').toLowerCase()));
      scaled.species = { key: sk.species.key, type: sk.species.type ?? null, size: sk.species.size ?? 'Medium', languages: sk.species.languages ?? null, naturalWeapons: sk.species.naturalWeapons ?? null, ac_floor: sk.species.ac_floor ?? null, modes: sk.species.modes ?? {}, senses: sk.species.senses ?? null, resist: sk.resist ?? null, clause: sk.clause };
      const landed = [];
      // A KIT ROW THAT IMPLEMENTS A CLAUSE BINDS IT (the critic's fourth read): the tortle read 0/1 with Shell Defense on the sheet because the kit stamped "a tortle hermit", not "withdraws into his shell"
      const clauseForShape = (shapeId) => { const tpl = shapeId ? TEMPLATES.find((x) => x.id === shapeId) : null; if (!tpl) return null; let best = null; for (const c of clauseRecord) { if (c.head || c.polarity) continue; const hits = rankByVerb([tpl], readPhrases(c.text), '')[0]?.concept?.length ?? 0; if (hits && (!best || hits > best.hits)) best = { text: c.text, hits }; } return best?.text ?? null; };
      const clauseForKeys = (ks) => { if (!ks?.length) return null; for (const c of clauseRecord) { if (c.head || c.polarity) continue; const w = readPhrases(c.text).toLowerCase(); if (ks.some((k) => new RegExp(`\\b${k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`, 'i').test(w))) return c.text; } return null; }; // a LIFTED trait binds the GM's own verb when it names one (the harengon's Standing Leap answers "bounds over the hedgerows" — the critic's fourth read, rerun)
      for (const r of speciesRows(sk.species, { inline: inl, dc: scaled.dc })) { if (names().has(r.name.toLowerCase())) { trace('species kit:', `${r.name} — the sheet already carries it`); continue; }
        { const g = grantsOf(r.text); const covered = g.size && Object.values(sections).flat().find((e2) => { const h = grantsOf(e2.text); return h.size && [...g].every((x) => h.has(x)); });
          if (covered) { trace('species kit:', `${r.name} — "${covered.name}" already grants ${[...g].join(', ')}; one mechanic, one row`); continue; } } const ownC = clauseForKeys(r.keys) ?? sk.clause; const sec = sections[r.section] = sections[r.section] ?? []; const row = { name: r.name, text: r.text, kit: sk.species.key, clause: ownC, free: true }; if (r.section === 'Traits') sec.unshift(row); else sec.push(row); landed.push(`${r.name} (${r.source}${ownC !== sk.clause ? `, binds "${String(ownC).slice(0, 28)}"` : ''})`); }
      const rowCount = () => Object.values(sections).flat().filter((e) => !/^(?:Multiattack|Legendary Action Uses)/.test(e.name ?? '')).length;
      for (const f of sk.species.flavor ?? []) { // the implied tier lands only under print's density at this CR; the GM's own rows stand
        if (rowCount() >= rowCap(cr)) { trace('species kit yields:', `${f.name} — the sheet is full (${rowCount()} rows at CR ${cr}, print's cap ${rowCap(cr)}); the user's own rows stand`); (scaled.speciesYielded = scaled.speciesYielded ?? []).push({ shape: f.shape, name: f.name, kit: sk.species.key, clause: clauseForShape(f.shape) ?? sk.clause }); continue; }
        const row = speciesFlavorRow(f, { scaled, sections, archetype, style: scaled.style ?? null, cr, concept: String(options.userConcept ?? concept ?? ''), name: p.name, type: options.resolvedType ?? '' }, { inline: inl });
        if (!row || names().has(row.name.toLowerCase())) continue;
        const ownClause = clauseForShape(row.shape) ?? sk.clause;
        (sections[row.section] = sections[row.section] ?? []).push({ name: row.name, text: row.text, kit: sk.species.key, clause: ownClause, free: true, shape: row.shape }); landed.push(`${row.name} (${row.shape}, authored${ownClause !== sk.clause ? `, binds "${String(ownClause).slice(0, 30)}"` : ''})`);
      }
      trace('species kit:', `${sk.species.key} — "${sk.clause}": ${landed.join(', ') || 'header lines only'}${Object.keys(sk.species.modes ?? {}).length ? `; ${Object.entries(sk.species.modes).map(([m, n]) => `${m} ${n} ft.`).join(', ')}` : ''}${sk.species.senses ? `; ${sk.species.senses}` : ''}${sk.resist ? `; resistance ${sk.resist.join(', ')}` : ''}`);
    }
  }
  { // THE CLASS KIT (landing two): a class the GM NAMED owes its rows — the same
    // non-competitive landing the seat's owed trait gets. A class the words only
    // IMPLY lands nothing here: the catalog already offers every one of these
    // templates and ranks them by the GM's own verbs, so the implied tier is the
    // fit call's (owner: "trigger is not eligibility"). Nothing on a print body.
    const ck = printExact ? null : classFor([...clauseRecord.map((c) => c.text), String(options.userConcept ?? concept ?? '')], { mind: options.mind ?? null, int: Number(scaled.stats?.INT ?? NaN) });
    if (ck) {
      const inl = inlineGuessRef();
      const srcText = readPhrases(String(options.userConcept ?? concept ?? ''));
      const names = () => new Set(Object.values(sections).flat().map((e) => String(e.name ?? '').replace(/ \(.*\)$/, '').toLowerCase()));
      const rowCount = () => Object.values(sections).flat().filter((e) => !/^(?:Multiattack|Legendary Action Uses)/.test(e.name ?? '')).length;
      // the row names a frame needs come from the sheet, exactly as the signature's
      // own context builds them — a Riposte with no melee name made a "Slam" attack
      const meleeK = Object.values(sections).flat().find((e2) => /Melee(?: or Ranged)? Attack Roll/.test(e2.text ?? ''));
      const ctxK = {
        scaled, sections, archetype, style: scaled.style ?? null, cr, concept: srcText, name: p.name,
        type: options.resolvedType ?? '', movement: (options.movement ?? []).join(' '),
        energy: options.energy ?? null, mix: options.mix ?? null, imposed: [], mechanics: options.mechanics ?? null,
        meleeName: meleeK?.name?.replace(/ \(.*\)$/, '') ?? 'Slam',
        rangedName: Object.values(sections).flat().find((e2) => /Ranged Attack Roll/.test(e2.text ?? '') && !/Melee or Ranged/.test(e2.text ?? ''))?.name?.replace(/ \(.*\)$/, '') ?? null,
        meleeType: (/\) ([A-Z][a-z]+) damage/.exec(meleeK?.text ?? '') ?? [])[1] ?? null,
        conditionMinor: p.conditions?.condition_minor ?? null, projectile: p.projectile ?? null,
      };
      const landed = []; const yielded = [];
      for (const r of classRows(ck.cls, { text: srcText, inline: inl, dc: scaled.dc })) {
        // print's caster features refer to the Spellcasting row by name; without
        // it they refer to nothing (a dangling reference the gates would catch)
        if (r.requiresRow && !Object.values(sections).flat().some((e2) => r.requiresRow.test(String(e2.name ?? '').replace(/ \(.*\)$/, '')))) { trace('class kit:', `${r.kind === 'row' ? r.name : r.template} — the sheet carries no row it could refer to (${r.requiresRow})`); continue; }
        let row = null;
        if (r.kind === 'row') row = { name: r.name, text: r.text, section: r.section, gate: r.gate ?? null, why: r.source };
        else {
          const tpl = TEMPLATE_BY_ID.get(r.template);
          if (!tpl) continue;
          if (Object.values(sections).flat().some((e2) => e2.template === r.template)) { trace('class kit:', `${r.template} — the sheet already carries it`); continue; }
          if (!templatesFor({ ...ctxK, section: tpl.section, trigger: null }).some((x) => x.id === r.template)) { trace('class kit:', `${r.template} — the sheet cannot carry it here (role, CR band, movement or a denial)`); continue; }
          const rr = renderTemplate(tpl, ctxK, {}, { blind: true });
          if (!rr || /\{[a-z_]+\}/.test(rr.text)) { trace('class kit:', `${r.template} — it cannot render blind on this sheet`); continue; }
          // the TABLE names the row when it means something to the class: a
          // paladin's smite is not "Venomed Edge", whatever the seed is called
          row = { name: r.name ?? rr.name, text: String(rr.text).split('The creature').join(inl.charAt(0).toUpperCase() + inl.slice(1)).split('the creature').join(inl), section: rr.section ?? 'Traits', gate: rr.gate ?? null, template: r.template, why: r.name ? `${r.template} as ${r.name}` : r.template };
        }
        if (!row) continue;
        if (/\{[a-z_]+\}/.test(row.text)) { trace('class kit:', `${row.name} — a slot went unfilled (${/\{[a-z_]+\}/.exec(row.text)[0]}); the row does not ship`); continue; }
        // A RIDER RIDES ITS HOST ROW — it is a clause on an attack, never a row
        // of its own (the signature path's own rule; "Rider" is not a section a
        // GM reads). The host carries the provenance, as it does there.
        if (row.section === 'Rider') {
          // the host must be a row of OURS: print's own row is print's, and a
          // print swap would carry the rider away with the row it rode (the
          // monk-to-Priest alias did exactly that before it was removed)
          const host = Object.values(sections).flat().find((e2) => /Melee(?: or Ranged)? Attack Roll/.test(e2.text ?? '') && !e2.print);
          if (!host) { trace('class kit:', `${row.name} — a rider with no melee row to ride`); continue; }
          if (String(host.text).includes(row.text.trim())) { trace('class kit:', `${row.name} — "${host.name}" already carries it`); continue; }
          host.text = `${String(host.text).trim()} ${row.text.trim()}`;
          host.kitRider = row.text.trim(); // the row's own rebuild must not drop it (the restore at the rider weld)
          host.clause = host.clause ?? ck.clause;
          host.feature = host.feature ?? row.name;
          if (row.template) host.boundKeys = [...new Set([...(host.boundKeys ?? []), ...(row.keys ?? [])])].slice(0, 6);
          landed.push(`${row.name} (${row.why}, rides ${host.name})`);
          continue;
        }
        const bare = String(row.name).replace(/ \(.*\)$/, '');
        if (names().has(bare.toLowerCase())) { trace('class kit:', `${bare} — the sheet already carries a row of that name`); continue; }
        const g = grantsOf(row.text);
        const covered = g.size && Object.values(sections).flat().find((e2) => { const h = grantsOf(e2.text); return h.size && [...g].every((x) => h.has(x)); });
        if (covered) { trace('class kit:', `${bare} — "${covered.name}" already grants ${[...g].join(', ')}; one mechanic, one row`); continue; }
        // THE SAME TWO TIERS AS THE SPECIES TABLE: what the words OWE is free — a
        // print lift the named class carries, or a row the GM's own words asked for
        // by name ("loses control" asks for Berserk). What the class merely implies
        // waits for room under print's density at this CR.
        const owed = r.kind === 'row' || !!r.keys;
        if (!owed && rowCount() >= rowCap(cr)) { yielded.push(bare); continue; }
        const full = `${bare}${row.gate ? ` (${row.gate})` : ''}`;
        const sec = sections[row.section] = sections[row.section] ?? [];
        const entry = { name: full, text: row.text, kit: ck.cls.key, clause: ck.clause, free: true, ...(row.template ? { template: row.template } : {}) };
        if (row.section === 'Traits') sec.unshift(entry); else sec.push(entry);
        landed.push(`${full} (${row.why})`);
      }
      scaled.classKit = { key: ck.cls.key, clause: ck.clause, landed: landed.length };
      trace('class kit:', `${ck.cls.key} — "${ck.clause}": ${landed.join(', ') || (yielded.length ? 'nothing landed' : 'nothing to add — the sheet already answers it')}${yielded.length ? `; ${yielded.join(', ')} yielded to print's row cap ${rowCap(cr)}` : ''}`);
    }
  }
  function inlineGuessRef() { const g = String(options.fixedName ?? '').trim() && !printCanonFor(String(options.fixedName).trim(), cr) ? properInline(String(options.fixedName).trim()) : (personalName(p.name) ?? declaredInline ?? `the ${shortForm(p.name)}`); inlineGuessUsed = g; return g; } // the same chain the rows use, the model's declaration included ("the grestle vane" beside "Grestle" — the critic's species read) // the same short form the rows will use ("Dame Oriel", "the marauder"), not the Name's first word
  // THE NAME FIELD IS A PROPER NOUN unless it is a print creature or the user's own words give it an article ("a meshrin")
  // — "Meshrin" is a name, and the rows say Meshrin, never "the meshrin" (fidelity pipeline step 4; the user's complaint)
  const fixedNameRaw = String(options.fixedName ?? '').trim();
  const properNoun = !!fixedNameRaw && !printCanonFor(fixedNameRaw, cr) && !new RegExp(`\\b(?:a|an|the)\\s+${fixedNameRaw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i').test(String(options.userConcept ?? concept ?? ''));
  if (properNoun) trace('proper noun:', `"${fixedNameRaw}" — the Name field is a person, not a kind (no print match, no article in the words)`);
  // a Name-field PERSON speaks by the given name ("Meshrin"; "Gormak Skullsunder" -> Gormak); an honorific keeps its name ("Sir Reginald
  // Pemberton-Hughes" -> Sir Reginald, not "Sir"); an EPITHET name heads on its noun ("Headless Horseman" -> the horseman — the first
  // word alone minted "Headless makes two Saber attacks", canaries 2026-10-12)
  function properInline(full) { const s = String(full).trim(); const w = s.split(/\s+/); if (w.length === 1) return w[0]; // hoisted: the feature table's short form reads it before `inline` is set ("Dame has Advantage", sprint run 2026-10-12)
    // THE TWO-WORD CONVENTION (owner, 2026-10-12): a KIND in the Name field speaks whole with the article, as print does ("the dire wolf", "the goblin
    // boss" — never "the wolf", "the boss"); a PERSON speaks by the given name. The model's declared form settles a multi-word Name as a kind when it is
    // exactly the whole Name with "the" ("Knife Ball" spoke as "Knife"; "Gutter King" as "the king"); one-word Names never take it (Meshrin stays Meshrin).
    const whole = `the ${s.toLowerCase()}`;
    if (declaredInline && declaredInline.toLowerCase() === whole) return whole;
    const hon = /^(Sir|Dame|Lord|Lady|Saint)\s+([A-Z][\w'-]+)/.exec(s); if (hon) return `${hon[1]} ${hon[2]}`;
    const pn = personalName(s); if (pn) return pn;
    if (w.length === 2 && (EPITHET_FIRST.test(w[0]) || ROLE_NOUN.test(w[1]))) return whole; // an epithet or a role is a kind: the headless horseman, the gutter king, the thornback marauder
    return w[0]; }
  const oneWordPerson = /^[A-Z][a-z'-]+$/.test(String(p.name ?? '').trim()) && /^Humanoid/i.test(String(p.type ?? options.resolvedType ?? '')) && !printCanonFor(String(p.name ?? '').trim(), cr) && !new RegExp(`\\b(?:a|an|the)\\s+${String(p.name ?? '').trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i').test(String(options.userConcept ?? concept ?? '')) ? String(p.name).trim() : null; // a one-word Humanoid name the model minted is a person, whatever it declared ("the cinderbent" on every row — the critic's third species read)
  const userGaveArticle = new RegExp(`\\b(?:a|an|the)\\s+${String(p.name ?? '').trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i').test(String(options.userConcept ?? concept ?? ''));
  const declaredOk = (!printCanonFor(String(p.name ?? '').trim(), cr) && !userGaveArticle) ? acceptDeclared() : null;
  const byRule = body === 'swarm' ? 'the swarm' : properNoun ? properInline(p.name ?? fixedNameRaw) : (personalName(p.name) ?? oneWordPerson ?? (userGaveArticle ? null : declaredInline) ?? `the ${shortForm(p.name)}`); // the GM's own article makes a kind, whatever the call declared ("a meshrin" — the owner's rule)
  let inline = body === 'swarm' ? 'the swarm' : (declaredOk ?? byRule);
  if (declaredOk) trace('inline declared:', `"${declaredOk}" — the call's own answer (${String(p.inline_kind).toLowerCase()}), built from the name${declaredOk !== byRule ? `; the rules would have said "${byRule}"` : ''}`);
  else if (String(p.inline ?? '').trim()) trace('inline by rule:', `"${byRule}" — the call answered "${String(p.inline).trim()}"${p.inline_kind ? ` (${String(p.inline_kind).toLowerCase()})` : ''}, which the name does not support`);
  if (inlineGuessUsed && inlineGuessUsed !== inline) { // the kit and feature rows were stamped before the rows' form was settled: re-stamp them to it
    const reG = new RegExp(`\\b${inlineGuessUsed.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(?:'s)?\\b`, 'gi');
    for (const esG of Object.values(sections)) for (const eG of esG) if ((eG.kit || eG.feature) && eG.text) eG.text = eG.text.replace(reG, (m0) => (m0.endsWith("'s") ? `${inline}'s` : inline)).replace(/(^|[.!?*]\s+)the /g, '$1The ').replace(/^the /, 'The ');
    trace('inline on kit rows:', `"${inlineGuessUsed}" -> "${inline}"`);
  } // the rules (rank, epithet, coined surname) are exact; the model's declaration fills the rest ("the bramblewrack ironmother" was declared, critic 2026-09-29)
  // PRINT'S SELF-REFERENCE becomes this sheet's inline in ONE pass: the old chain ("the X's" then "the X" then a bare
  // "X's") re-entered its own output and minted "the vampire lord lord's" and "this pit the pit fiend general's aura"
  // (critic's blockers audit 2026-10-03). print's whole name wins over its last word, and a match without "the" keeps
  // the determiner it already has ("this pit fiend's aura" -> "this pit fiend general's aura").
  const escRx = (x) => String(x).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const asInline = (txt) => {
    if (!pcPlain) return String(txt ?? '');
    const bareIn = inline.replace(/^the\s+/i, '');
    const full = String(pcPlain.name ?? '').toLowerCase();
    const alts = [...new Set([full, pcPlain.last])].filter(Boolean).sort((a, b) => b.length - a.length).map(escRx).join('|');
    void bareIn; // the determiner phrase only: a bare "vampire" is print's common noun ("rises as a Vampire Spawn", "its vampire form" — critic's regressions brief 2026-10-04); "this pit fiend's aura" stays print's
    return String(txt ?? '').replace(new RegExp(`\\bthe\\s+(?:${alts})('s)?\\b`, 'gi'), (m0, poss) => `${inline}${poss ?? ''}`);
  };
  if (declaredInline) trace('inline form:', `"${declaredInline}" — the model's own reading of the name`);
  let pendingWildcard = null;
  // THE SLOT-YIELD RULE (fidelity pipeline step 2): a fitted template that lands in a slot evicts the chassis's row in that
      // slot — the missing half of supersede. A user's thrown lantern no longer ships beside the chassis's Hurled Debris. Only
      // chassis rows yield (never print's, a seed's, or another template's); the keeper owns the evicted row's citations.
  const userKeysFor = (tid) => { const tpl = tid ? TEMPLATES.find((t) => t.id === tid || t.key === tid) : null; return tpl ? (rankByVerb([tpl], readPhrases(String(options.userConcept ?? concept ?? '')), '')[0]?.concept ?? []) : []; }; // the keys the USER's words matched on the template — a row the idea call placed still answers the user's clause (the Gullet-Wyrm's Swallow, the scarecrow's flinch; sprint run 2026-10-12)
  const keysOf = (because) => [...String(because ?? '').matchAll(/([a-z][a-z' -]*?):(?:concept|idea)\b/g)].map((mm) => mm[1].trim()); // the keys a fit bound on, from its annotated reason
  const hasChassisNova = (secs) => (secs.Actions ?? []).some((e) => !e.library && !e.template && /\((?:Recharge [\d–-]+|\d\/Day)\)/.test(e.name ?? '') && /Saving Throw/.test(e.text ?? '') && /\d+ \(\d+d\d+/.test(e.text ?? '')); // one Recharge nova per sheet (0 of 2 corpora carry two): a fitted row on a dragon stays ungated at the ceiling
  function slotYield(templateId, keeper) { // hoisted: the authored landing above calls it before this line (step 6)
    const declared = Array.isArray(templateId) ? templateId[0] : TEMPLATE_BY_ID.get(templateId)?.replaces; // an array names the slot outright (an authored Recharge save is the nova slot — the Glacier Wyrm shipped two breaths, critic's step-5 read)
    // a template whose rendered row ROLLS a ranged attack claims the ranged slot whatever it declares (throw-retrieve declares `signature`)
    const slots = [...new Set([declared, /Ranged Attack Roll/.test(keeper?.text ?? '') && !/Melee or Ranged/.test(keeper?.text ?? '') ? 'ranged' : null].filter(Boolean))];
    const chassis = (e) => e !== keeper && !e.library && !e.print && !e.template && !e.rules && !e.part && !e.kit && !e.feature; // a row the user named — a part, a species row, a feature — is never evicted by a template (the orc's Relentless Rush left for a Rampage seed, species landing 2026-10-13)
    for (const slot of slots) {
    const occupant = ({
      ranged: () => (sections.Actions ?? []).find((e) => chassis(e) && /Ranged Attack Roll/.test(e.text ?? '') && !/Melee or Ranged/.test(e.text ?? '')),
      nova: () => (sections.Actions ?? []).find((e) => chassis(e) && /\((?:Recharge [\d–-]+|\d\/Day)\)/.test(e.name ?? '') && /Saving Throw/.test(e.text ?? '') && /\d+ \(\d+d\d+/.test(e.text ?? '')),
      reaction: () => (sections.Reactions ?? []).find(chassis),
      'bonus-alt': () => (sections['Bonus Actions'] ?? []).find(chassis),
    }[slot] ?? (() => null))();
    if (!occupant) continue;
    for (const es of Object.values(sections)) { const ix = es.indexOf(occupant); if (ix !== -1) es.splice(ix, 1); }
    trace('slot yields:', `${slot} — the chassis's "${occupant.name}" leaves; "${keeper.name}" holds the slot`);
    sweepDeadName(sections, occupant.name, keeper, trace);
    }
  }
  let atWillShipped = [];
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
      const rider0 = String(p.melee_rider ?? 'none').trim();
      // a HUMANOID's blade deals what the concept says it deals (a cutlass dealing
      // Poison, a Claw dealing Necrotic in human form — critic 2026-09-29): an
      // energy rider on a Humanoid needs its element family in the user's words
      const humanoidUnwarranted = /^Humanoid\b/i.test(String(options.resolvedType ?? '')) && DAMAGE_TYPES.includes(rider0) && !['Bludgeoning', 'Piercing', 'Slashing'].includes(rider0)
        && !NAME_CLAIMS.some(([re, t]) => (t === rider0 || (t === null && ['Lightning', 'Thunder'].includes(rider0))) && re.test(readPhrases(String(options.userConcept ?? concept ?? ''))));
      const rider = humanoidUnwarranted ? 'none' : rider0;
      if (humanoidUnwarranted && e.text.includes('{damage_type_2}')) trace('energy rider withheld:', `${rider0} on a Humanoid with no ${rider0} in the concept's own words`);
      const bare = e.name.replace(/ \(.*\)$/, '');
      let wanted = p.damage_types?.[bare]
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
          // THE KIT'S OWN CLAUSE SURVIVES THE REBUILD: the pristine capture
          // predates the class kit, so restoring it dropped a monk's Stunning
          // Strike off the row it rode (landing two, 2026-10-14)
          if (e.kitRider && !e.text.includes(e.kitRider)) e.text = `${e.text.trim()} ${e.kitRider}`;
        }
      }
      delete e.text_noRider;
      delete e.kitRider;
      // the withhold covers BASE types too, not riders alone (Choking Pollen dealt Poison on a hedge-witch whose words never said poison — fourth sighting, critic form-ten 2026-10-01): a weapon noun takes its own type, a cloud noun keeps the element it names, anything else takes the body's physical type
      if (energyWithheld && wanted === energyWithheld) {
        const nounT = Object.entries(TYPE_BY_NOUN).find(([n]) => new RegExp(`\\b${n}\\b`, 'i').test(String(e.name ?? '')))?.[1];
        const to = nounT ?? (/Ranged Attack Roll/.test(e.text ?? '') ? 'Piercing' : 'Bludgeoning');
        if (to !== wanted) trace('energy withheld on a base row:', `"${e.name}" ${wanted} -> ${to} (${nounT ? 'the row\'s own noun' : 'the body\'s physical type'}; a Humanoid deals no ${wanted} its concept never gave it)`);
        else trace('energy kept on a base row:', `"${e.name}" ${wanted} — the row's own noun pays for it`);
        wanted = to;
      }
      if (wanted && DAMAGE_TYPES.includes(wanted)) e.text = e.text.split('{damage_type}').join(wanted);
      for (const [slot, menu] of Object.entries(CONDITION_MENUS)) {
        const pick2 = String(p.conditions?.[slot] ?? '').trim();
        if (e.text.includes(`{${slot}}`) && menu.includes(pick2)) e.text = e.text.split(`{${slot}}`).join(pick2);
      }
      if (e.text.includes('{projectile}')) {
        const proj = String(p.projectile ?? '').trim();
        if (proj && proj.split(/\s+/).length <= 4) {
          e.text = e.text.split('{projectile}').join(proj);
          // ambient ammunition never boomerangs (critic 2026-09-15, the
          // Cliff Troll's returning slab): the return clause pays for a
          // SINGULAR signature projectile (its barbed anchor, a skull);
          // print giants throw rocks with no return — the supply is the
          // mountain
          if (/\b(?:slab|stone|rock|boulder|rubble|debris|chunk|shard|brick|ic(?:e|icle))s?\b/i.test(proj)) {
            e.text = e.text.replace(/\s*\*?Hit or Miss:\*?\s*Immediately after the attack, [^.]*returns to [^.]*\.\s*/, ' ').replace(/\s+$/, '');
          }
        }
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
        // AoE damage at will starts at CR 16 (the Blue Dragon's Shatter
        // — print's only at-will area damage below the Lich; corpus
        // sweep 2026-09-13 after the Saint shipped at-will Shatter at 8)
        const AOE_AT_WILL = new Set(['Fireball', 'Lightning Bolt', 'Shatter', 'Cone of Cold', 'Thunderwave', 'Burning Hands', 'Ice Storm']);
        const atWillOK = (x) => !NEVER_AT_WILL.has(x)
          && (!AOE_AT_WILL.has(x) || cr >= 16)
          && (!SPELL_DAMAGE_AVG[x] || ((SPELL_UPCAST[x]?.[0] ?? 0) <= atWillLvlCap && SPELL_DAMAGE_AVG[x] <= (scaled.per_hit ?? 6) + 2));
        const eligible = picks.filter(atWillOK);
        const atWill = [...eligible.filter((x) => SPELL_DAMAGE_AVG[x]), ...eligible.filter((x) => !SPELL_DAMAGE_AVG[x])];
        // at most ONE at-will damage spell below CR 21 (all 20 sub-Lich
        // print carriers hold exactly one; the Lich alone holds two)
        const dmgCap = cr >= 21 ? 2 : 1;
        for (const x of atWill.filter((y) => SPELL_DAMAGE_AVG[y]).slice(dmgCap)) atWill.splice(atWill.indexOf(x), 1);
        for (const x of atWill.filter((y) => (CONTROL_SPELL_LEVEL[y] ?? 0) >= 1 && cr < CONTROL_AT_WILL_CR)) {
          atWill.splice(atWill.indexOf(x), 1);
          trace('control spell gated to daily —', `${x} (level ${CONTROL_SPELL_LEVEL[x]} control at will is print's CR ${CONTROL_AT_WILL_CR}+ shape; at CR ${cr} it is 1/Day)`);
        }
        const daily = picks.filter((x) => !atWill.includes(x))
          .filter((x) => {
            const okDaily = !SPELL_DAMAGE_AVG[x] || SPELL_DAMAGE_AVG[x] <= (scaled.per_hit ?? 6) * 2;
            if (!okDaily) trace('daily spell dropped —', `${x} (${SPELL_DAMAGE_AVG[x]} avg vs ${scaled.per_hit ?? 6} per-hit; print's only daily damage spell is the Adult Red's Fireball at ~1.1x)`);
            return okDaily;
          });
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
        atWillShipped = atWill.slice();
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
      if (e.wildcard) pendingWildcard = e; // the slot row: the template signature replaces it (or the library seed does)
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
  // the SPELLCASTING ability supports its own save DC — raise-only, the attack-coherence idiom (the Hollow King cast at DC 21 off a Wisdom that derives 19, checker sweep 2026-10-02)
  for (const es of Object.values(sections)) for (const e of es) {
    const sm = /using (Strength|Dexterity|Constitution|Intelligence|Wisdom|Charisma) as the spellcasting ability \(spell save DC (\{dc\}|\d+)/.exec(e.text ?? ''); if (!sm) continue;
    const dcWanted = sm[2] === '{dc}' ? scaled.dc : Number(sm[2]); // the chassis row still carries the {dc} token here — it fills with the card DC later
    const key = { Strength: 'STR', Dexterity: 'DEX', Constitution: 'CON', Intelligence: 'INT', Wisdom: 'WIS', Charisma: 'CHA' }[sm[1]]; const need = dcWanted - 8 - scaled.pb;
    const modNow = Math.floor((scaled.stats[key] - 10) / 2); const dcNow = 8 + scaled.pb + modNow; if (dcNow === dcWanted) continue;
    // the stat that makes the ATTACK rolls (mod + PB = the row's bonus) and a print array are not moved — the DC comes down to what the stat derives instead (a raised CHA broke the seer's +7 claw and the green dragon's print array, checker sweep 2026-10-02)
    const atkBonuses = Object.values(sections).flat().map((x) => Number(/Attack Roll:\*?\s*\+(\d+)/.exec(x.text ?? '')?.[1] ?? NaN)).filter(Number.isFinite);
    const keyMakesAttacks = atkBonuses.some((b) => modNow + scaled.pb === b);
    if (arrayIsPrint || keyMakesAttacks || dcWanted < dcNow) { e.text = e.text.replace(/spell save DC (?:\{dc\}|\d+)/, `spell save DC ${dcNow}`).replace(/\+\d+ to hit with spell attacks/, `+${scaled.pb + modNow} to hit with spell attacks`); trace('spell DC coherence:', `DC ${dcWanted} -> ${dcNow} off ${sm[1]} ${scaled.stats[key]} (${arrayIsPrint ? "print's array stays" : keyMakesAttacks ? 'the stat makes the attack rolls' : 'the stat already derives higher'})`); continue; }
    trace('spell DC coherence:', `${sm[1]} ${scaled.stats[key]} -> ${10 + need * 2} so DC ${dcWanted} derives`); scaled.stats[key] = 10 + need * 2;
  }
  // THE FINAL DERIVATIONS (checker sweep 2026-10-02: 12 skill and 8 escape-DC softs, all stale after a stat moved): skills keep their proficiency surplus over the mods at scale time and re-derive from the final mods; escape DCs are 8 + PB + STR; passive Perception follows Perception
  {
    const modNow = (k) => Math.floor((scaled.stats[k] - 10) / 2); const modAt = (k) => Math.floor(((statsAtScale[k] ?? scaled.stats[k]) - 10) / 2);
    const SK = { Athletics: 'STR', Acrobatics: 'DEX', 'Sleight of Hand': 'DEX', Stealth: 'DEX', Arcana: 'INT', History: 'INT', Investigation: 'INT', Nature: 'INT', Religion: 'INT', 'Animal Handling': 'WIS', Insight: 'WIS', Medicine: 'WIS', Perception: 'WIS', Survival: 'WIS', Deception: 'CHA', Intimidation: 'CHA', Performance: 'CHA', Persuasion: 'CHA' };
    let perception = null;
    scaled.skills = String(scaled.skills ?? '').split(',').map((t) => t.trim()).filter(Boolean).map((t) => t.replace(/^([A-Za-z][A-Za-z' ]*?)\s*\+(\d+)$/, (m0, name, n) => {
      const st = SK[name.trim()]; if (!st) return m0;
      const surplus = Math.max(scaled.pb, Number(n) - modAt(st)); const prof = surplus >= 2 * scaled.pb ? 2 * scaled.pb : scaled.pb; // proficiency or expertise, never a bare mod and never slop
      const v = modNow(st) + prof; if (name.trim() === 'Perception') perception = v; return `${name.trim()} +${v}`;
    })).join(', ');
    // THE SHEET'S SAVE DC DERIVES FROM A STAT ON THE SHEET. The 2014 card's DC is the DMG table's and the array is the
    // chassis's, so a caster at CR 24 carried DC 21 on an INT 18 (no stat reaches it — sweep 2026-10-04). The owner's rule
    // stands: a stat that makes attack rolls is never moved, so the DC comes DOWN to the best stat the sheet already has.
    {
      const mods = Object.fromEntries(['STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA'].map((k) => [k, modNow(k)]));
      const derives = (dc) => Object.values(mods).some((v) => 8 + scaled.pb + v === dc);
      const named = /using (Strength|Dexterity|Constitution|Intelligence|Wisdom|Charisma) as the spellcasting ability/.exec(JSON.stringify(sections))?.[1];
      const KEYS = { Strength: 'STR', Dexterity: 'DEX', Constitution: 'CON', Intelligence: 'INT', Wisdom: 'WIS', Charisma: 'CHA' };
      const want = 8 + scaled.pb + (named ? mods[KEYS[named]] : Math.max(...Object.values(mods)));
      const stale = [...new Set([...JSON.stringify(sections).matchAll(/DC (\d+)/g)].map((x) => Number(x[1])))].filter((dc) => !derives(dc) && Math.abs(dc - want) <= 4);
      for (const dc of stale) { for (const es of Object.values(sections)) for (const e of es) if (e.text) e.text = e.text.replace(new RegExp(`\\bDC ${dc}\\b`, 'g'), `DC ${want}`); }
      if (stale.length) { trace('save dc derived:', `DC ${stale.join(', ')} -> ${want} (8 + PB ${scaled.pb} + ${named ? `${named}'s` : 'the sheet\'s best'} ${want - 8 - scaled.pb}) — no stat on the sheet reached it`); if (stale.includes(scaled.dc)) scaled.dc = want; }
    }
    // THE FINAL PRICE. The per-hit was solved for the donor's layout; a template that SUPERSEDES a row (the returning
    // sword owns both the melee and the ranged seat) leaves one row serving the Multiattack AND the legendary strike at
    // the old price — a death knight at CR 18 swung 52 twice and once more for free, reading CR 27 on offense against
    // print's hottest +7 (print-heads 2026-10-04). Re-solve the surviving attack rows when the round runs over the card.
    {
      const rowsP = Object.entries(sections).flatMap(([sec, es]) => es.map((e) => ({ sec, e })));
      const printCrNear = !!pcPlain && nearPrintCr(cr, pcPlain.cr);
      const atkRows = rowsP.filter(({ e }) => /Attack Roll/.test(e.text ?? '') && !e.print && !(e.printNamed && printCrNear) && !/\bBloodied\b/.test(e.text ?? '')); // print's name keeps print's numbers at print's CR; a borrow asked for above it re-solves with the round (the Night Hag at CR 7, step 8) // a swarm's row carries a half-clause keyed to the main one; re-dicing each expression on its own breaks the half (generate.spec's swarm pin)
      const avgOfRow = (t) => [...String(t).split(/\bIf\b|\bWhen\b/)[0].matchAll(/(\d+) \(\d+d\d+(?: [+-] \d+)?\)/g)].reduce((a, x) => a + Number(x[1]), 0);
      const multiP = rowsP.find(({ e }) => /^Multiattack/.test(e.name ?? ''))?.e;
      const nAtk = multiP ? ({ one: 1, two: 2, three: 3, four: 4 }[(/makes (\w+)/i.exec(multiP.text) ?? [])[1]?.toLowerCase()] ?? 1) : 1;
      const best = atkRows.length ? Math.max(...atkRows.map(({ e }) => avgOfRow(e.text))) : 0;
      const legStrike = rowsP.filter(({ sec, e }) => sec === 'Legendary Actions' && /makes one [A-Z][\w' -]*? attack/.test(e.text ?? '') && !/can['’]t (?:take|use) this action again|once per round/i.test(e.text ?? '')).length;
      const legHits = legStrike ? Math.max(1, Math.floor(Number(scaled.legendary_uses ?? 3) / 1)) : 0;
      const round = best * nAtk + best * legHits;
      const target = cardBudget(cr, { legendary: !!(sections['Legendary Actions'] ?? []).length, dragon: body === 'dragon', edition: options.edition === '2014' ? '2014' : null }).dpr;
      const underA = !!authored?.parts && best > 0 && round < target * 0.8; // an authored sheet whose rows replaced the chassis's composition can run UNDER the card too (the Drowned Ringer at 34 against 66, step 6 forty): the shared budget prices all rows, both ways
      if (best > 0 && (round > target * 1.2 || underA)) {
        const f = underA ? Math.min(2, target / round) : (target * 1.05) / round;
        for (const { e } of atkRows) {
          e.text = String(e.text).replace(/(\d+) \((\d+)d(\d+)(?: ([+-]) (\d+))?\)/g, (m0, avg, n0, d0, sign, mod) => {
            const flat = sign === '-' ? -Number(mod ?? 0) : Number(mod ?? 0);
            const wanted = Math.max(2 + flat, Math.round(Number(avg) * f));
            const r = attackDamageDiceFor(wanted, Math.min(flat, Math.max(0, wanted - 1)));
            return `${r.avg} (${r.dice})`;
          });
          if (e.text_noRider) e.text_noRider = e.text;
        }
        trace('final price:', `the round ran ${round} against the card's ${target} — the attack rows re-solve at ${Math.round(f * 100)}% (${nAtk} attacks${legHits ? ` + ${legHits} legendary strikes` : ''}${underA ? ' on an authored sheet, under the card' : ' off one row after a supersede'})`);
      }
    }
    const escDC = Math.max(8 + scaled.pb + modNow('STR'), modNow('STR') < 0 ? scaled.dc : 0); // a STR 6 hook-drag printed escape DC 9: a grapple no commoner slips keys off the save DC when the arm is weak (the critic's second species read)
    for (const es of Object.values(sections)) for (const e of es) if (/escape DC \d+/.test(e.text ?? '')) e.text = e.text.replace(/escape DC \d+/g, `escape DC ${escDC}`);
    if (typeof scaled.senses === 'string' && /Passive Perception \d+/i.test(scaled.senses)) scaled.senses = scaled.senses.replace(/Passive Perception \d+/i, `Passive Perception ${10 + (perception ?? modNow('WIS'))}`);
    // a row NAMED for a body part deals that part's damage (a Slam dealing Piercing — critic's audit 2026-10-02); the rider clause keeps its own type
    for (const es of Object.values(sections)) for (const e of es) {
      const nameKey = String(e.name ?? '').replace(/ \(.*\)$/, '').toLowerCase(); const partsKey = nameKey.split(/[\s-]+/);
      // a body part inside a multi-word name owns the type when the last word is a generic strike noun ("Stooping Talon Strike" dealt Piercing — the critic's fourth read, rerun)
      const innerKey = TYPE_BY_NOUN[nameKey] ? null : (/^(?:strike|swipe|slash|blow|rake|lash|smash|swing|snap|rend|chop|cut|attack)$/.test(partsKey.at(-1) ?? '') ? partsKey.find((w) => TYPE_BY_NOUN[w]) : null);
      const nounKey = TYPE_BY_NOUN[nameKey] ? nameKey : innerKey; const want = nounKey ? TYPE_BY_NOUN[nounKey] : null;
      if (!want || !/Attack Roll/.test(e.text ?? '') || e.print) continue;
      const cur = /\d+ \(\d+d\d+(?: [+-] \d+)?\) ([A-Z][a-z]+) damage/.exec(e.text)?.[1];
      if (cur && cur !== want && ['Bludgeoning', 'Piercing', 'Slashing'].includes(cur)) { e.text = e.text.replace(/(\d+ \(\d+d\d+(?: [+-] \d+)?\)) [A-Z][a-z]+ damage/, `$1 ${want} damage`); trace('damage type by the row\'s own noun:', `"${e.name}" ${cur} -> ${want}`); }
    }
  }
  const card = cardBudget(cr, { legendary: !!scaled.legendary, edition: options.edition ?? null });
  const mods = Object.fromEntries(Object.entries(scaled.stats).map(([k, v]) => [k, Math.floor((v - 10) / 2)]));
  const monster = {
    name: p.name, inline, /* the short form the rows use ("the marshal") — the classic card's legendary header reads it (critic's release audit 2026-10-03) */  format: '2024', cr, cr_str: ({ 0.125: '1/8', 0.25: '1/4', 0.5: '1/2' })[cr] ?? String(cr),
    xp: challengeRatings[crKey(cr)]?.XP ?? 0,
    challenge_rating: `${cr} (XP ${(challengeRatings[crKey(cr)]?.XP ?? 0).toLocaleString()}; PB +${scaled.pb})`,
    type: p.type ?? 'Monstrosity', size: p.size ?? 'Medium',
    // alignment is a CLOSED vocabulary (the Gaoler shipped "Unaligned
    // (Feral, Driven By Its Prison'S Grief)" — lore welded into the field,
    // and the old title-caser minted the 'S). Extract the alignment,
    // discard everything else.
    alignment: (() => {
      const am = /\b(?:(Lawful|Neutral|Chaotic)[\s-]+(Good|Neutral|Evil)|Neutral|Unaligned|Any Alignment)\b/i.exec(String(p.alignment ?? ''));
      // UNALIGNED is for a creature with no capacity for ethics: a beast, a mindless construct, an ooze, a plant (print: 0 of 329 Unaligned blocks speak a language). A
      // dragon with INT 18 who speaks and casts is not Unaligned (Voraglace — the critic's fourth read).
      const noEthics = /^(?:Beast|Ooze|Plant)\b/i.test(String(p.type ?? options.resolvedType ?? '')) || (/^Construct\b/i.test(String(p.type ?? options.resolvedType ?? '')) && options.mind !== 'sapient') || options.mind === 'mindless' || options.mind === 'bestial';
      if (am && /unaligned/i.test(am[0]) && !noEthics && Number(scaled.stats?.INT ?? 10) >= 6) { trace('alignment by mind:', `Unaligned -> Neutral — a ${p.type ?? 'creature'} with INT ${scaled.stats?.INT ?? '?'} can hold an ethic (print: 0 of 329 Unaligned blocks speak)`); return 'Neutral'; }
      const cap = (s) => s[0].toUpperCase() + s.slice(1).toLowerCase();
      if (!am) return 'Unaligned';
      const out = am[1] ? `${cap(am[1])} ${cap(am[2])}` : cap(am[0]).replace(/ alignment/i, ' Alignment');
      if (out !== String(p.alignment).trim()) trace('alignment sanitized:', `"${p.alignment}" -> "${out}"`);
      return out;
    })(),
    // scaled.ac/hp carry the donor's declared card spend (brute ac_offset,
    // hp_scale, flight tax) — card.ac here bypassed them (invisible on
    // skirmisher, where scaled.ac always equaled the card)
    ac: scaled.ac, hp: scaled.hp, ...(scaled.ac_gear ? { ac_gear: scaled.ac_gear } : {}), // print's armor from its Gear line — the 2014 sheet prints it; the 2024 card shows AC alone as print does
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
      const blind = tokens.some((t) => /blind beyond this radius/.test(t));
      const kept = blind ? tokens.filter((t) => !/^(?:darkvision|truesight)/.test(t)) : tokens; // "blind beyond this radius" is exclusive — print never pairs it with darkvision (the barrel, 2026-09-28)
      const sp = kept.length ? kept.join(', ') : 'darkvision 60 ft.';
      const pp = 10 + Number((/Perception \+(\d+)/.exec(scaled.skills) ?? [0, mods.WIS])[1]);
      return `${sp}; Passive Perception ${pp}`;
    })(),
    languages: String(p.languages ?? 'None').replace(/\bUnderstood\b/, 'Understands'), // the least-guarded field (critic 2026-09-15: six lore leaks and a tense error)
    initiative_bonus: mods.DEX, initiative_score: 10 + mods.DEX,
    sections,
    lore: typeof p.lore === 'string' && p.lore.trim().length > 15 ? p.lore.trim() : undefined,
    // provenance rides to the log: cited templates defend with a printed
    // rung, invented ones defend with "nothing prints here, by construction"
    generation: { path: 'reskin', donor: donor.id, archetype, creatureOnly: String(options.userConcept ?? concept ?? '').toLowerCase().split(/[^a-z']+/).filter((w) => w.length > 2 && !/^(?:the|a|an|and|or|but|with|who|that|which|its|his|her|their|into|onto|from|for|out|off|over|under|this|than|then|them|they|was|were|has|have|had|are|is|be|been|being|it|in|on|at|to|of|by|up|as|so|if|no|not|one|two|too|very|own|new|old)$/.test(w)).length <= 3, /* a creature-only prompt gives nothing to read: the catalog composes the sheet and the reader gate's engine-needs-key stands down (the critic's third species read) */ unplaced: authored?.unplaced ?? [], userConcept: String(options.userConcept ?? concept ?? '').slice(0, 600), clauses: groundedClauses(p.clauses, options.userConcept ?? concept, trace), /* the extraction (fidelity pipeline step 4): the record of what the user asked for, the coverage denominator */ ...(body ? { body } : {}), ...(options.menuRole ? { menu_role: options.menuRole } : {}), ...(donor.invented ? { invented: true } : donor.cite ? { cite: donor.cite } : {}) },
    archetype: options.menuRole ?? archetype, archetype_source: 'user',
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
  let wcDropped = false;
  let libraryDrawn = false;
  let libraryGenericName = null;
  // late-stage texts (informed + pivot) bypass the pre-assembly
  // prose-weld defect check — the weld holds by closed token swap
  // (Midnight Ride shipped Poison on a Necrotic block, 2026-09-15)
  const weldSwap = (t) => {
    const energy0 = options.energy ?? null;
    if (!energy0) return t;
    return String(t).replace(/\b(Acid|Cold|Fire|Force|Lightning|Necrotic|Poison|Psychic|Radiant|Thunder)(?= damage)/g, (m0, ty) => (ty === energy0 ? ty : energy0));
  };
  // THE INFORMED WILDCARD (owner design 2026-09-15: "we pass the near
  // completed statblock to the wildcard prompt and we're good"): the
  // signature action is written AGAINST the assembled sheet — renamed
  // rows, filled types, derived numbers — so the model designs the
  // most COMPLEMENTARY ability instead of juggling renames and rules
  // in one blind pass. The main call's wildcard survives as the
  // never-fail fallback when this call dies; vet, repair, pivot, and
  // the library are unchanged downstream.
  // a MATERIAL body at low CR has no wildcard slot either, and still owes a
  // trait (2026-09-28): the seat opens for it, the ACTION seat stays shut —
  // the claim gate's own finding (74% of CR<=2 blocks carry no non-attack action)
  if (pendingWildcard || body || traitWildcardAllowed) { // the template path composes on every sheet (step 7); part rows hold attack slots only // an authored sheet already holds its rows (fidelity pipeline step 5) // body lines have no slot row but still get a TRAIT seat (three seatless bodies, the wide run)
    // THE TEMPLATE SIGNATURE — create (plain words) → tag → fit (closed
    // menu) → render at the sheet's numbers → ship; a miss logs and the
    // library seed stands in. No vet, no repair: rules text is never free.
    const sheetLinesT = Object.entries(sections)
      .map(([sec2, es2]) => es2.filter((e2) => e2 !== pendingWildcard).map((e2) => `- [${sec2}] ${e2.name}: ${e2.text}`).join('\n')).filter(Boolean).join('\n');
    // THE WHOLE SHEET RIDES ALONG (owner 2026-09-28: "these calls should not be
    // islands"): the idea and fit calls see the statblock so far — header,
    // array, defenses, every row — not a row list and a one-line summary
    const sheetSoFarT = sheetSoFar(monster, { exclude: pendingWildcard }) || sheetLinesT;
    // the seat must not point at an element the ENGINE already implements
    // (the same demotion the free-text path applies): a seat on "folds
    // shut around" produced five clasp ideas beside Cage
    const coveredT = [];
    if (Object.values(sections).flat().some((e2) => e2.engulf_engine)) coveredT.push(/wrap|crush|swallow|gulp|engulf|drown|entomb|seal|smother|constrict|cocoon|whelm|cage|fold|clasp|clamp/i);
    if (Object.values(sections).flat().some((e2) => /Ranged Attack Roll/.test(e2.text ?? ''))) coveredT.push(/\bhurl|throw|toss|lob|fling|\bdetach|\bsevered|as a weapon\b/i);
    if (Object.values(sections).flat().some((e2) => e2.name === 'Regeneration')) coveredT.push(/rekni|regrow|regenerat|heal|reform|reassembl/i);
    const sheetCovered = coveredBySheet(Object.fromEntries(Object.entries(sections).map(([k, es]) => [k, es.filter((e2) => e2 !== pendingWildcard)])));
    if (sheetCovered.regex) coveredT.push(sheetCovered.regex);
    const seatsT = assignSeats(options.signatureElements ?? [], { style: scaled.style ?? null, covered: coveredT });
    const enginesT = [...new Set([
      ...Object.values(sections).flat().filter((e2) => e2 !== pendingWildcard && (e2.engulf_engine || e2.engine || /has the Grappled condition \(escape DC/.test(e2.text ?? ''))).map((e2) => e2.name),
      ...sheetCovered.names,
    ])];
    const CONDS_T = ['Blinded', 'Charmed', 'Deafened', 'Frightened', 'Grappled', 'Incapacitated', 'Paralyzed', 'Petrified', 'Poisoned', 'Prone', 'Restrained', 'Stunned'];
    const sheetText3 = Object.values(sections).flat().map((e2) => e2.text ?? '').join(' ');
    const imposedT = CONDS_T.filter((c) => new RegExp(`has the (?:\\w+ and )?${c} condition|is also ${c}\\b|be ${c}\\b`).test(sheetText3));
    const meleeRowT = Object.values(sections).flat().find((e2) => e2 !== pendingWildcard && /Melee Attack Roll/.test(e2.text ?? ''));
    // A TEMPLATE THE ENGINE BINDS ITSELF STILL NEEDS ITS FILL: the fit call answered none, so nobody filled its flavour slot and the sheet shipped the blind default
    // ("While Sir Reginald can see the thing it fears" where the GM typed chickens — the critic's fourth read). The fill is the GM's own noun, quoted back.
    const forcedFills = (tpl) => {
      if (!tpl?.frames) return {};
      const band = ['0-2', '3-5', '6-9', '10-12', '13-20', '21+'].find((b) => { const [lo, hi] = b.replace('+', '-99').split('-').map(Number); return cr >= lo && cr <= hi; }) ?? '3-5';
      const frame = String(tpl.frames[band] ?? Object.values(tpl.frames)[0] ?? ''); const src = readPhrases(String(options.userConcept ?? concept ?? '')); const out = {};
      if (frame.includes('{phobia}')) { const f = /\b(?:afraid of|terrified of|scared of|frightened of|fears?|dreads?)\s+(?:any\s+|all\s+|the\s+)?([a-z][a-z' -]{2,28}?)(?=[,.;]|\s+and\b|\s+but\b|$)/i.exec(src); if (f) out.phobia = f[1].trim().toLowerCase(); }
      return out;
    };
    const ctxT = {
      scaled, sections, archetype, style: scaled.style ?? null, cr, movement: (options.movement ?? []).join(' '),
      energy: options.energy ?? null, mix: options.mix ?? null, meleeName: meleeRowT?.name?.replace(/ \(.*\)$/, '') ?? 'Slam',
      rangedName: Object.values(sections).flat().find((e2) => e2 !== pendingWildcard && /Ranged Attack Roll/.test(e2.text ?? '') && !/Melee or Ranged/.test(e2.text ?? ''))?.name?.replace(/ \(.*\)$/, '') ?? null,
      conditionMinor: p.conditions?.condition_minor ?? null, projectile: p.projectile ?? null,
      meleeType: (/\) ([A-Z][a-z]+) damage/.exec(meleeRowT?.text ?? '') ?? [])[1] ?? null, /* the hit's own type, for an on-hit extra-damage rider (the critic's fourth read) */
      imposed: imposedT, mechanics: options.mechanics ?? null, name: p.name, concept: options.userConcept ?? concept, type: options.resolvedType ?? '',
    };
    const stampT = (t) => String(t).split('The creature').join(inline.charAt(0).toUpperCase() + inline.slice(1)).split('the creature').join(inline);
    const tagOf = (idea) => `[${idea.section}/${idea.trigger}/${idea.effect}]`;
    let ideasT = null;
    try {
      const rawIdea = await callLLM(buildIdeaPrompt({ name: p.name, cr, concept: readPhrases(concept), sheetLines: sheetSoFarT, seats: seatsT, energy: options.energy ?? null, wantTrait: traitWildcardAllowed, engines: enginesT, verbs: conceptVerbs(`${options.userConcept ?? concept} ${seatsT?.action ?? ''} ${seatsT?.trait ?? ''}`) }), validateIdeaResponse);
      ideasT = parseIdeas(rawIdea);
    } catch (e7) {
      trace('signature idea call failed —', `${e7?.message ?? e7}; the library stands in`);
    }
    // ONE VERB, ONE BIND (critic 2026-09-29: "erupts" bound a ground-burst action AND
    // a bloodied-burst trait): the concept keys the action bound are spent, and the
    // trait seat reads the concept with those words masked
    let consumedKeysT = [];
    const maskConsumed = (text) => consumedKeysT.reduce((t, k) => t.replace(new RegExp(`\\b${k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'gi'), '…'), String(text ?? ''));
    // a VERB is spent; the creature's head noun and its MATERIALS are not — they
    // describe the body and may inform more than one card (the hermit crab's shell
    // action spent "crab", "shell" and "bell" and starved its resonant trait, goldens 2026-10-01)
    const MATERIAL_NOUNS = new Set(['bell', 'bells', 'bronze', 'brass', 'iron', 'steel', 'copper', 'silver', 'gold', 'glass', 'crystal', 'stone', 'rock', 'shell', 'bone', 'bones', 'wax', 'salt', 'earth', 'soil', 'tar', 'oil', 'pitch', 'ice', 'wood', 'clay', 'mud', 'sand', 'brine', 'water', 'fire', 'ash', 'smoke', 'thorn', 'thorns', 'vine', 'vines', 'bark', 'hide', 'fur', 'scale', 'scales', 'horn', 'horns', 'tusk', 'tusks', 'claw', 'claws']);
    const spendKeys = (because) => { const m = /\[verb: ([^\]]*)\]/.exec(because ?? ''); const hn = headNoun(options.userConcept ?? concept ?? ''); consumedKeysT = m ? m[1].split(', ').filter((x) => /:concept$/.test(x)).map((x) => x.replace(/:concept$/, '')).filter((k) => !MATERIAL_NOUNS.has(k) && k !== hn && k !== `${hn}s`) : []; if (consumedKeysT.length) trace('keys spent by the action:', consumedKeysT.join(', ')); };
    // UNIQUE ROW NAMES (two "Tremor Toll (Recharge 5-6)" rows on the gong, critic
    // 2026-09-29): a shipped row that collides with a row already on the sheet takes
    // its template's own name, or a numbered form when it has none
    const uniqueRowName = (row, templateName) => {
      const bare = (n) => String(n ?? '').replace(/ \(.*\)$/, '').toLowerCase();
      const gate = / \((?:Recharge [\d–-]+|\d\/Day)\)$/.exec(row.name ?? '')?.[0] ?? '';
      const taken = new Set(Object.values(sections).flat().map((e) => bare(e.name)));
      if (!taken.has(bare(row.name))) return;
      const alt = templateName && !taken.has(bare(templateName)) ? `${templateName}${gate}` : `${String(row.name).replace(/ \(.*\)$/, '')} II${gate}`;
      trace('row renamed for uniqueness:', `"${row.name}" collides with a row on the sheet — "${alt}"`);
      row.name = alt;
    };
    // THE CALL'S JUDGEMENTS, KEPT FOR THE PATHS THAT BIND WITHOUT ASKING (owner,
    // 2026-10-13). The fit call answers two things beyond its pick: which word
    // matches are collisions ("blood-priest" is no blood sense) and what the
    // user's own words fill a template's flavour slot with. The deterministic
    // binders — the force-bind, the concept-first trait, the seat's owed row —
    // read those answers instead of guessing, and never call again for them.
    const wrongT = new Set(); const fillsT = new Map();
    const vetFills = (f, src) => { const hay = String(src ?? '').toLowerCase(); return Object.fromEntries(Object.entries(f ?? {}).map(([k, v]) => [k, String(v ?? '').trim()]).filter(([, v]) => v && v.length <= 40 && !/[{}]/.test(v) && v.toLowerCase().split(/[^a-z']+/).filter((w) => w.length > 2).some((w) => hay.includes(w)))); }; // a fill is the user's own noun quoted back, so one significant word of it must be in the words the call was shown
    const readFit = (fit, menuRead, srcText) => { for (const id of fit.wrong ?? []) wrongT.add(id); const vf = vetFills(fit.fills, srcText); if (Object.keys(vf).length) for (const m of menuRead) if (!fillsT.has(m.id)) fillsT.set(m.id, vf); if ((fit.wrong ?? []).length) trace('word match declined by the call:', `${(fit.wrong ?? []).join(', ')} — the key word does not mean the mechanic here`); return fit; };
    const bindFills = (tpl) => ({ ...forcedFills(tpl), ...(fillsT.get(tpl.id) ?? {}) }); // the call's fill first, the engine's own regex behind it
    const fitSeat = async (seat, idea) => {
      const rawIdeaText = String(idea?.idea ?? ''); const rawConceptText = readPhrases(`${options.userConcept ?? concept}`);
      if (seat === 'trait' && consumedKeysT.length) idea = { ...idea, idea: maskConsumed(idea.idea) }; // the idea's own repeat of a spent verb is spent too
      if (!idea) return null;
      // a template already on this sheet (by id, whatever it was named) is not offered again
      const shippedIds = new Set(Object.values(sections).flat().map((e2) => e2.template).filter(Boolean));
      // LEGAL MEANS RENDERS: a template the sheet cannot render (a seed's
      // dominance gate, a missing imposed condition) is never offered, so a
      // bind can never end in "not legal on this sheet" (the bull's push-prone)
      const pruned = [];
      const legalT = (t) => { if (shippedIds.has(t.id)) return false; if (renderTemplate(t, ctxT, {}, { blind: true }) !== null) return true; pruned.push(t.id); return false; };
      const menu = templatesFor({ ...ctxT, section: idea.section, trigger: idea.trigger, text: `${options.userConcept ?? concept} ${idea.idea}`, imposed: imposedT }).filter(legalT);
      // a CONCEPT verb must string-match the user's own words; the seat element is
      // the model's prose and counts as idea-level (the binder "rationalized"
      // wither/bloodied as concept verbs, critic run six)
      const verbText = seat === 'trait' ? maskConsumed(readPhrases(`${options.userConcept ?? concept}`)) : readPhrases(`${options.userConcept ?? concept}`); // every model-facing text is the rewritten concept // one verb, one bind: the action's keys are spent
      const seatText = `${seat === 'trait' ? (seatsT?.trait ?? '') : (seatsT?.action ?? '')}`;
      // THE WHOLE SHELF IS IN THE RACE (goldens 2026-09-22): the concept's verb
      // decides the SECTION (the bishop's "blesses" is a bonus-action mark) and
      // the TRIGGER (a trait idea tagged "always" must still see the on-being-hit
      // cards when the concept says "knits shut around the axes"); the idea's own
      // tag only orders the menu it is shown. Before this the section menu was
      // the whole race: the troll's Weapon Lodge and the keeper's Marking Bolt
      // (seven of her words) missed on a tag the model chose
      const wide = (seat === 'trait' ? ['trait'] : ['action', 'bonus_action', 'reaction', 'rider']).flatMap((sec) => templatesFor({ ...ctxT, section: sec, trigger: null, text: verbText, imposed: imposedT })).filter(legalT);
      let pool = [...menu, ...wide.filter((t) => !menu.some((m) => m.id === t.id))];
      if (seat === 'trait' && consumedKeysT.length) { // a card whose only match was the action's spent verb is off the trait race
        const spent = pool.filter((t) => rankByVerb([t], rawConceptText, rawIdeaText)[0].matched.length && !rankByVerb([t], verbText, idea.idea)[0].matched.length);
        if (spent.length) { trace('trait cards excluded — verb spent by the action:', spent.map((t) => t.id).join(', ')); pool = pool.filter((t) => !spent.includes(t)); }
      }
      if (pruned.length) trace('menu pruned:', `${seat} — ${[...new Set(pruned)].join(', ')} (the sheet cannot render them)`);
      trace(`signature idea (${seat}):`, `"${idea.idea}" ${tagOf(idea)} — menu: ${menu.map((t) => t.id).join(', ') || 'EMPTY'}${pool.length > menu.length ? ` (+ shelf: ${pool.filter((t) => !menu.includes(t)).map((t) => t.id).join(', ')})` : ''}`);
      if (!pool.length && idea.section === 'reaction') {
        // print's answer for "when something hits me, this happens" on a line
        // with no reaction seat is a TRAIT (Heated Body, Death Burst): re-seat
        // the idea rather than miss on a section the line never had
        const asTrait = { ...idea, section: 'trait' };
        trace('signature re-seated:', `${seat} — this line has no reaction seat; the idea "${idea.idea.slice(0, 60)}…" is a trait`);
        return fitSeat(seat, asTrait);
      }
      if (!pool.length) {
        trace('signature miss:', `${seat} — "${idea.idea}" ${tagOf(idea)} — no template exists for this seat on this line`);
        return null;
      }
      // no verb of this concept OR this idea is on the shelf → the fit would be
      // a shape fit by construction (v2 blind read: "template variety went up,
      // template fit went down"); an honest miss, no call spent
      const verbRanked = rankByVerb(pool, verbText, `${seatText} ${idea.idea}`);
      if (!verbRanked.some((r) => r.matched.length)) {
        if (idea.section === 'rider') {
          // the rider shelf is small: a rider idea with no verb there is re-seated
          // as a save action before it can miss (eight seeds for four fits, fresh ten)
          trace('signature re-seated:', `${seat} — no rider shares the verb; the idea "${idea.idea.slice(0, 60)}…" is tried as an action`);
          return fitSeat(seat, { ...idea, section: 'action', trigger: 'save' });
        }
        trace('signature miss:', `${seat} — "${idea.idea}" ${tagOf(idea)} — no template on the shelf shares a verb with the concept or the idea (offered: ${pool.map((t) => t.id).join(', ')})`);
        return null;
      }
      // BIND TO THE CONCEPT'S VERB (critic v3: "the lure goes to things that
      // beckon; the Bloodied burst to things with a bell"): when the user's
      // own words name a template's verb, the fit sees ONLY those templates —
      // the idea supplies the fiction and the name, never the choice
      let conceptBound = verbRanked.filter((r) => r.concept.length).map((r) => r.t);
      // the STRONGEST concept match decides — "seal, sermon, psalm, wither"
      // outranks "flock"; offering both let the model pick the weaker (rally)
      if (conceptBound.length > 1) {
        const scored = rankByVerb(conceptBound, verbText);
        const top = scored[0].concept.length;
        conceptBound = scored.filter((r) => r.concept.length === top).map((r) => r.t);
      }
      // no concept bind: the idea's own menu, plus any shelf row the IDEA's verbs name
      const ideaNamed = verbRanked.filter((r) => r.idea.length && !menu.includes(r.t)).map((r) => r.t);
      const offered = conceptBound.length ? conceptBound : [...menu, ...ideaNamed];
      if (conceptBound.length) trace('signature bound to the concept\'s verb:', `${seat} — ${conceptBound.map((t) => t.id).join(', ')} (${[...new Set(rankByVerb(conceptBound, verbText).flatMap((r) => r.concept))].join(', ')})`);
      try {
        const rawFit = await callLLM(buildFitPrompt({ name: p.name, sheet: sheetSoFarT, idea, menu: offered, cr, concept: verbText }), validateFitResponse);
        let fit = readFit(parseFit(rawFit, offered, p.name), offered, `${verbText} ${idea.idea}`);
        const hnF = headNoun(verbText); const topC = conceptBound.length ? rankByVerb([conceptBound[0]], verbText)[0].concept : [];
        if (!fit.template && conceptBound.length && wrongT.has(conceptBound[0].id)) trace('force-bind dropped:', `${seat} — the call read "${conceptBound[0].id}"'s match as a collision, not the mechanic (the word is a modifier, or the sheet already answers it)`);
        if (!fit.template && conceptBound.length && !wrongT.has(conceptBound[0].id) && (topC.length >= 2 || topC.some((k) => hnF && (k === hnF || k === `${hnF}s`)))) { // two of the user's verbs, or the creature's own head noun (the gong's resonant body, 2026-09-30)
          // an EXACT concept match (two or more of the user's own verbs) is the
          // engine's call, not the model's — the bell's resonant-body and the
          // goat's Bloodied burst were on the shelf and declined (critic run six)
          trace('signature bound by force:', `${seat} — "${conceptBound[0].id}" matches ${rankByVerb([conceptBound[0]], verbText)[0].concept.join('+')} in the user's words; the model's none is overruled`);
          fit = { template: conceptBound[0], because: 'exact concept match', name: null, fills: bindFills(conceptBound[0]), wrong: [] };
        }
        if (!fit.template && conceptBound.length && seat !== 'trait') { // a trait has no fallback: when the binder says none, none (critic run two)
          // the idea drifted off the concept's verb and the model honestly said
          // none — pour the CONCEPT itself (the user's words + the seat element)
          // into the verb's template instead; the idea only ever supplied fiction
          const conceptIdea = { ...idea, idea: `${verbText}. Build the concept's own verb (${[...new Set(verbRanked.flatMap((r) => r.concept))].join(', ')}) as this ability.` };
          trace('signature re-poured:', `${seat} — the idea left the concept's verb; the concept itself is poured into ${conceptBound.map((t) => t.id).join(', ')}`);
          fit = readFit(parseFit(await callLLM(buildFitPrompt({ name: p.name, sheet: sheetSoFarT, idea: conceptIdea, menu: offered, cr, concept: verbText }), validateFitResponse), offered, p.name), offered, `${verbText} ${conceptIdea.idea}`);
        }
        if (!fit.template) {
          trace('signature miss:', `${seat} — "${idea.idea}" ${tagOf(idea)} — the model found no template that holds it (offered: ${offered.map((t) => t.id).join(', ')})`);
          return null;
        }
        const rendered = renderTemplate(fit.template, ctxT, fit.fills);
        if (!rendered) {
          trace('signature miss:', `${seat} — "${idea.idea}" ${tagOf(idea)} — "${fit.template.id}" could not be filled (fills: ${JSON.stringify(fit.fills).slice(0, 80)})`);
          return null;
        }
        const bare = fit.name ?? rendered.name;
        // the tally distinguishes a VERB fit (the template's own verbs appear in
        // the concept/idea) from a SHAPE fit — the critic's split, made measurable
        const vr = rankByVerb([fit.template], verbText, idea.idea)[0];
        const verbs = [...(vr?.concept ?? []).map((k) => `${k}:concept`), ...(vr?.idea ?? []).map((k) => `${k}:idea`)];
        // a shape fit chosen while a CONCEPT-verb template was on the menu is a
        // miss (critic v2: "template variety went up, template fit went down")
        if (!verbs.length && verbRanked.some((r) => r.concept.length)) {
          trace('signature miss:', `${seat} — "${idea.idea}" ${tagOf(idea)} — the model picked "${fit.template.id}" (no verb) over a concept-verb template (${verbRanked.filter((r) => r.concept.length).map((r) => r.t.id).join(', ')})`);
          return null;
        }
        return { row: { name: `${bare}${rendered.gate ? ` (${rendered.gate})` : ''}`, text: stampT(rendered.text), library: true, template: fit.template.id, boundKeys: [...String(fit.because ?? '').matchAll(/([a-z][a-z' -]*?):concept\b/g)].map((mm) => mm[1].trim()) /* provenance: the user's words this row binds to (step 8) */ }, templateName: rendered.name, section: rendered.section, template: fit.template.id, host: fit.template.host ?? 'melee', supersedes: fit.template.supersedes ?? null, because: `${fit.because}${verbs.length ? ` [verb: ${verbs.join(', ')}]` : ' [shape fit, no verb match]'}` };
      } catch (e8) {
        trace('signature fit call failed —', `${seat}: ${e8?.message ?? e8}`);
        return null;
      }
    };
    if (pendingWildcard) {
    if (floatingOrb) {
      const rt = TEMPLATE_BY_ID.get('random-ray'); const rr = rt ? renderTemplate(rt, ctxT, {}, { blind: true }) : null;
      if (rr) { imposedActionT = { row: { name: rr.name /* at will: print's Beholder shoots three rays every turn; a recharge left the orb at 45 a round at CR 13 (rerun 2026-10-03) */, text: stampT(rr.text), library: true, template: 'random-ray', name_locked: true }, templateName: rr.name, section: rr.section, template: 'random-ray', because: 'the floating-orb overlay imposes its rays [verb: eyestalks:concept]' }; trace('imposed nova:', 'Eye Rays — the orb\'s rays are its nova, not a fit'); }
    }
    let actionT = imposedActionT ?? (wildcardAllowed && !printPlain ? await fitSeat('action', ideasT?.action) : null);
    // a NOVA is a whole-round ability: taken on shape alone, with no verb in the
    // concept or the idea, it is churn (the cauldron drew a Shockwave vent by
    // shape and lost its seat's own read, goldens 2026-09-29) — the fallback stands in
    if (actionT && printBody && (/\[shape fit, no verb match\]/.test(actionT.because ?? '') || (/\[verb: [^\]]*\]/.test(actionT.because ?? '') && !/:concept\b/.test(actionT.because ?? '')))) {
      trace('fit declined:', `"${actionT.row.name}" — a print body takes only what the user's words ask; this fit bound on shape or on the idea alone (the blacksmith's rally, critic-ten 2026-10-01)`);
      actionT = null;
    }
    if (actionT && actionT.section !== 'Rider' && TEMPLATE_BY_ID.get(actionT.template ?? actionT.row?.template)?.nova) {
      const because = actionT.because ?? '';
      if (/\[shape fit, no verb match\]/.test(because)) { trace('nova declined:', `"${actionT.row.name}" — a whole-round ability taken on shape alone (no verb in the concept or the idea); the fallback stands in`); actionT = null; }
      else if (/\[verb: [^\]]*\]/.test(because) && !/:concept\b/.test(because)) { trace('nova declined:', `"${actionT.row.name}" — a whole-round ability bound only on the idea's own words (${/\[verb: ([^\]]*)\]/.exec(because)?.[1]}), none in the user's; the fallback stands in (the cauldron's spill, 2026-09-29)`); actionT = null; }
    }
    // the slot row leaves either way — a proven row stands where it stood
    wcDropped = true;
    for (const es2 of Object.values(sections)) {
      const ix = es2.indexOf(pendingWildcard);
      if (ix !== -1) es2.splice(ix, 1);
    }
    const deadBareT = String(pendingWildcard?.name ?? '').replace(/ \((?:Recharge [\d–-]+|\d\/Day)\)$/, '');
    let riderShipped = false;
    if (actionT && actionT.section === 'Rider' && (/\[shape fit, no verb match\]/.test(actionT.because ?? '') || (/\[verb: [^\]]*\]/.test(actionT.because ?? '') && !/:concept\b/.test(actionT.because ?? '')))) {
      trace('rider declined:', `"${actionT.row.name}" — bound on shape or on the idea's own words alone; a rider on the user's attack needs the user's verb (the gong's bandaged concussion, 2026-10-01)`);
      actionT = null;
    }
    if (actionT && actionT.section === 'Rider') {
      // A RIDER rides the melee row: the clause is appended, no new row ships
      // an ARCHER's damage rider rides the bow: "picks off torch-bearers from the
      // ridge" is the crossbow's clause, not the pommel's (critic, new lines 2026-09-28)
      const RIDES_THE_BOW = new Set(['isolation', 'affliction']);
      const wantRanged = actionT.host === 'ranged' || (scaled.style === 'archer' && RIDES_THE_BOW.has(actionT.template) && Object.values(sections).flat().some((e2) => /Ranged Attack Roll/.test(e2.text ?? '') && !/Melee or Ranged/.test(e2.text ?? '')));
      const host = Object.values(sections).flat().find((e2) => (wantRanged ? /Ranged Attack Roll/ : /Melee Attack Roll/).test(e2.text ?? '')); // a hybrid "Melee or Ranged Attack Roll" row hosts either
      if (host) {
        // a rider that imposes a hold on every hit of a repeatable row needs a
        // gate (the astrologer's no-save Restrained x3 a turn, fresh ten):
        // print's idiom is "once per turn" when there is no save
        let riderText = actionT.row.text.trim();
        if (/\b(?:Restrained|Grappled|Paralyzed|Stunned|Incapacitated|Charmed)\b/.test(riderText) && !/Saving Throw/.test(riderText) && !/once per turn/i.test(riderText)) {
          riderText = `${riderText} This effect can be applied only once per turn.`;
          trace('rider gated:', `"${actionT.template}" imposes a hold with no save — once per turn`);
        }
        { const guard = /^If the target is a (\w+) or smaller creature, /i.exec(riderText); if (guard && new RegExp(`If the target is a ${guard[1]} or smaller creature, `, 'i').test(host.text)) { riderText = riderText.slice(guard[0].length); riderText = riderText.charAt(0).toUpperCase() + riderText.slice(1); } } // one size guard per row, as print writes it (the Bog Hound's Bite carried two — the critic's second species read)
        host.text = `${host.text.trim()} ${riderText}`;
        host.boundKeys = [...new Set([...(host.boundKeys ?? []), ...keysOf(actionT.because), ...userKeysFor(actionT.template ?? actionT.row?.template)])]; // the rider's provenance rides on the host (the Bog Hound read 0/1 with the drag on its Bite)
        libraryDrawn = true;
        riderShipped = true;
        trace('signature rider:', `${actionT.template} -> ${host.name} (appended; ${actionT.because})`);
        if (deadBareT) sweepDeadName(sections, deadBareT, host, trace);
      } else trace('signature miss:', `action — a rider fit (${actionT.template}) but the sheet has no ${wantRanged ? 'ranged' : 'melee'} row to ride`);
    }
    if (actionT && actionT.section !== 'Rider' && actionT.section !== 'Traits') { // a re-seated TRAIT never climbs the ladder (Wounded Tolling: 27 per hit, no save — fresh ten)
      // THE VALUE CHECK — the row must be worth the attack it replaces
      if (hasChassisNova(sections) && / \(Recharge [\d–-]+\)$/.test(actionT.row.name ?? '') && !TEMPLATE_BY_ID.get(actionT.template ?? actionT.row?.template)?.nova) { actionT.row.name = actionT.row.name.replace(/ \(Recharge [\d–-]+\)$/, ''); actionT.row.gate = undefined; trace('one nova:', `"${actionT.row.name}" arrived gated on a sheet whose chassis already carries a Recharge nova — the gate leaves and the row prices at the ceiling (the wyrm's Shattering Ice Snare, step 7)`); }
      const vc = valueCheck(actionT.row, { scaled, sections, cr, section: actionT.section, noGate: hasChassisNova(sections) });
      if (vc.steps.length) { actionT.row.text = vc.text; actionT.row.name = vc.name; }
      trace('value check:', `"${actionT.row.name}" EV ${vc.ev} vs floor ${vc.floor} (${vc.replaced})${vc.steps.length ? ` — ${vc.steps.join('; ')}` : ' — worth the trade'}`);
      // THE FLOOR BLOCKS (critic run two: a dead disarm shipped past the floor
      // "with a paper trail"): a row the ladder could not lift is a MISS
      if (vc.steps.some((st) => /still under|does nothing/.test(st))) {
        trace('signature dropped by the floor:', `"${actionT.row.name}" — the ladder could not lift it; the fallback stands in`);
        actionT = null;
      }
    }
    if (riderShipped) {
      // a rider that rode IS the signature — the fallback never deals a second
      // row beside it (every rider fit shipped plus a blind seed, goldens 2026-09-22)
    } else if (actionT && actionT.section !== 'Rider') {
      // a template that SUPERSEDES a chassis row removes it (one lance, one
      // physics — the lancer's returning throw beside the retrieve, v4 read)
      const sup = actionT.supersedes;
      if (sup) for (const [secS, esS] of Object.entries(sections)) {
        for (let i = esS.length - 1; i >= 0; i -= 1) if (sup.test(esS[i].text ?? '')) { trace('row superseded:', `${secS}/"${esS[i].name}" leaves — "${actionT.row.name}" owns the throw now`); sweepDeadName(sections, esS[i].name, actionT.row, trace); esS.splice(i, 1); }
      }
      slotYield(actionT.template ?? actionT.row?.template, actionT.row);
      uniqueRowName(actionT.row, actionT.templateName);
      actionT.row.boundKeys = [...new Set([...keysOf(actionT.because), ...(actionT.row.boundKeys ?? []), ...userKeysFor(actionT.template ?? actionT.row?.template)])]; // provenance (step 8): the user's words this row binds to, by the fit's reason and by the template's own keys
      { const yk = (scaled.speciesYielded ?? []).find((y) => y.shape === (actionT.template ?? actionT.row?.template)); if (yk) { const gateSuffix = (/ \(.*\)$/.exec(actionT.row.name) ?? [''])[0]; actionT.row.name = `${yk.name}${gateSuffix}`; actionT.row.kit = yk.kit; actionT.row.clause = yk.clause; actionT.row.free = true; trace('kit credited:', `the signature bound ${yk.shape}, the shape the ${yk.kit} kit yielded to the cap — the row is the kit's ("${yk.name}"), free tier`); } } // (the tortle's Bulwark Withdrawal was Shell Defense — the critic's second species read)
      (sections[actionT.section] = sections[actionT.section] ?? []).push(actionT.row);
      libraryDrawn = true;
      trace('signature template:', `${actionT.template} -> ${actionT.section}/"${actionT.row.name}" ("${actionT.because}")`);
      spendKeys(actionT.because);
      if (deadBareT && deadBareT !== actionT.row.name.replace(/ \(.*\)$/, '')) sweepDeadName(sections, deadBareT, actionT.row, trace);
    } else if (wildcardAllowed && !printPlain && !body) { // a BODY chassis (dragon, ooze, swarm) is a complete kit — no blind fallback; a print body reaches the fallback only through the concept's own verbs (the stand-down inside: a verbless print head asks for nothing — the hermit-mage's lantern does ask, 2026-10-01): its own rows are the composition, and only a verb-bound fit adds to them (day-one 2026-09-30) — the claim gate closes the ACTION seat at CR<=2 — the fallback is that seat's, and a material body's open TRAIT seat must not reopen it (review 2026-09-28)
      // the same filtered menu the fit saw (engine families, ownership); the
      // blind library hash is the last resort only when that menu is empty
      const fbVerbText = `${options.userConcept ?? concept}`; const fbSeatText = `${seatsT?.action ?? ''}`; // the user's words are the concept; the seat element is idea-level
      const shelfT = fallbackMenu({ ...ctxT, text: `${fbVerbText} ${fbSeatText}`, imposed: imposedT }, fbVerbText, fbSeatText);
      let verbFirst = rankByVerb(shelfT, fbVerbText, fbSeatText).filter((r) => r.matched.length).length; // the verb-ranked head is taken in order; only the rest rotates
      const userAsks = rankByVerb(shelfT, fbVerbText, '').filter((r) => r.concept.length).length; // a print head is served by the USER's words alone — the seat idea's "plunges… hauled… dive" drew the Owlbear a Rampage (form-ten 2026-10-01)
      if (pcPlain && userAsks === 0) { trace('fallback stands down:', `"${options.userConcept ?? concept}" heads on the ${pcPlain.name} and asks for nothing — print's rows, nothing invented (the big ogre, critic-ten 2026-10-01)`); shelfT.length = 0; }
      // a STYLE's default seed heads the fallback the way a seat's default trait
      // heads the trait shelf: a leader's command is the rally shape, and two of
      // three leaders drew a punisher by hash (critic, new lines 2026-09-28)
      const STYLE_DEFAULT_SEED = { leader: 'rally' };
      const dfltSeed = STYLE_DEFAULT_SEED[scaled.style ?? ''];
      const dfltIx = dfltSeed ? shelfT.findIndex((t) => t.id === dfltSeed) : -1;
      if (dfltIx > 0) { shelfT.unshift(...shelfT.splice(dfltIx, 1)); if (dfltIx >= verbFirst) verbFirst += 1; trace('style default seed:', `${dfltSeed} heads the fallback for the ${scaled.style}`); }
      let drawn = null;
      for (let i = 0; i < shelfT.length && !drawn; i += 1) {
        const t = i < verbFirst ? shelfT[i] : shelfT[verbFirst + ((nameHash(p.name) + i) % Math.max(1, shelfT.length - verbFirst))];
        const r = renderTemplate(t, ctxT, {}, { blind: true });
        if (!r) { trace('fallback skipped:', `${t.id} (the sheet cannot render it)`); continue; }
        const cand = { seed: t.id, section: r.section, row: { name: `${r.name}${r.gate ? ` (${r.gate})` : ''}`, text: r.text, library: true } };
        // a seed the floor cannot lift is skipped for the next one, never shipped
        const pre = valueCheck(cand.row, { scaled, sections, cr, section: cand.section });
        // the floor prices an attack's trade; a UTILITY self-buff the user's own
        // words asked for by key is its own worth (print: the Imp's Invisibility
        // — "Can turn invisible once per day" lost Vanish to EV 0, form-ten 2026-10-01)
        const askedUtility = UTILITY.has(t.id) && i < verbFirst && (rankByVerb([t], fbVerbText, '')[0]?.concept?.length ?? 0) > 0;
        if (pre.steps.some((st) => /still under|does nothing/.test(st))) {
          if (!askedUtility) { trace('fallback skipped by the floor:', `${t.id} (EV ${pre.ev} vs ${pre.floor})`); continue; }
          trace('fallback floor waived:', `${t.id} — a self-buff the user's words ask for is its own worth (print: the Imp's Invisibility)`);
          cand.floorWaived = true;
        }
        const seedKeys = rankByVerb([t], fbVerbText, '')[0]?.concept ?? []; if (seedKeys.length) cand.row.boundKeys = seedKeys; // the keys the USER's words matched are the row's provenance — the Kobold's Vanish covered nothing (canaries 2026-10-12)
        drawn = cand;
      }
      // the LAST RESORT obeys the same law as the shelf: only a blind-dealable
      // seed, in hash order (the siege ram drew "Shell Defense" from the bare
      // library hash after every shelf row failed to render, fresh two)
      if (!drawn) {
        const keys = TEMPLATES.filter((t) => t.kind === 'seed' && blindDealable(t, archetype) && !UTILITY.has(t.id)).map((t) => t.key);
        for (let i = 0; i < keys.length && !drawn; i += 1) {
          const key = keys[(nameHash(p.name) + i) % keys.length];
          drawn = drawLibraryRow(scaled, { archetype, energy: options.energy ?? null, mix: options.mix ?? null, name: p.name, shapeKey: key, imposed: imposedT, mechanics: options.mechanics ?? null, cr });
        }
      }
      if (drawn && Object.values(sections).flat().filter((e) => e.part || e.feature).length >= 3) { trace('fallback skipped:', `"${drawn.row.name}" — the user's own rows fill the sheet (three or more parts and features); no seed stands in (Meshrin's Chain Hook, critic's step-8 read)`); drawn = null; }
      if (drawn && /\{[a-z_]+\}/.test(drawn.row.text)) drawn = null; // a seed with an unfilled flavor blank never ships raw
      if (drawn) {
        if (hasChassisNova(sections) && / \(Recharge [\d–-]+\)$/.test(drawn.row.name ?? '')) { drawn.row.name = drawn.row.name.replace(/ \(Recharge [\d–-]+\)$/, ''); drawn.row.gate = undefined; trace('one nova:', `"${drawn.row.name}" — the seed's gate leaves; the chassis nova stands`); }
        const vc = valueCheck(drawn.row, { scaled, sections, cr, section: drawn.section, noGate: hasChassisNova(sections) });
        if (vc.steps.length) { drawn.row.text = vc.text; drawn.row.name = vc.name; }
        trace('value check:', `"${drawn.row.name}" EV ${vc.ev} vs floor ${vc.floor} (${vc.replaced})${vc.steps.length ? ` — ${vc.steps.join('; ')}` : ' — worth the trade'}`);
        if (!drawn.floorWaived && vc.steps.some((st) => /still under|does nothing/.test(st))) { trace('signature dropped by the floor:', `"${drawn.row.name}" — a seed that cannot be lifted does not ship`); drawn = null; }
      }
      if (drawn) {
        drawn.row.text = stampT(drawn.row.text);
        uniqueRowName(drawn.row, null);
        (sections[drawn.section] = sections[drawn.section] ?? []).push(drawn.row);
        slotYield(drawn.seed, drawn.row); // a seed drawn into a slot evicts the chassis's row there too (the fallback is a landing — "Hurled Debris" stood beside the seed's "Hurled Weapon", step 2 probe)
        libraryDrawn = true;
        libraryGenericName = drawn.row.name;
        trace('library seed drawn:', `${drawn.seed} -> ${drawn.section}/"${drawn.row.name}" (no template held the idea; a proven shape stands in)`);
        if (deadBareT) sweepDeadName(sections, deadBareT, drawn.row, trace);
      } else {
        trace('signature dropped —', 'no template held the idea and no seed is legal on this sheet');
        sweepDeadName(sections, deadBareT || null, null, trace);
      }
    }
    }
    if (traitWildcardAllowed) { // an OWED trait seats whether or not the idea call produced one (the claimed gaze owed Vile Appearance and the idea call returned nothing, 2026-09-28)
      let traitT = printPlain || !ideasT?.trait ? null : await fitSeat('trait', ideasT.trait);
      // a trait that SUPERSEDES a chassis row removes it, as an action does (one
      // body, one mending: Warded Mending replaces the warden's Regeneration) —
      // on BOTH ship paths, the plain one and the beside-the-owed-row one
      const supersedeByTrait = (tt) => {
        const supT = TEMPLATE_BY_ID.get(tt.template)?.supersedes;
        if (!(supT instanceof RegExp)) return;
        for (const [secS2, esS2] of Object.entries(sections)) for (let i2 = esS2.length - 1; i2 >= 0; i2 -= 1) if (esS2[i2] !== tt.row && supT.test(esS2[i2].text ?? '')) { trace('row superseded:', `${secS2}/"${esS2[i2].name}" leaves — "${tt.row.name}" owns it now`); esS2.splice(i2, 1); }
      };
      // THE TRAIT CEILING (corpus 2026-09-28): traits per block run 0/1/2/3/4/5
      // = 126/119/58/17/7/2, and a material body carries more of them (<=2 covers
      // 80% of material blocks and 92% reach 3; <=1 covers 80% of meat ones).
      // The whole sheet is counted, the chassis's own rules traits included —
      // the glacier shipped five, two from the shelf onto a juggernaut that
      // already had three (critic 2026-09-28).
      const ceiling = materialBody ? 4 : 3;
      const traitRows = () => (sections.Traits = sections.Traits ?? []);
      const shipTrait = (tt) => {
        const secT = tt.section === 'Reactions' ? 'Reactions' : 'Traits';
        const bound = tt.owed === true || /:concept\b/.test(tt.because ?? '');
        if (secT === 'Traits' && traitRows().length >= ceiling) {
          // a concept-bound trait is what the user asked for: it evicts a shelf
          // trait no verb of theirs named, rather than losing to a full sheet
          const weak = traitRows().find((e2) => e2.template && !e2.bound);
          if (!bound || !weak) { trace('trait ceiling:', `"${tt.row.name}" does not ship — ${traitRows().length} traits already, and print's ceiling for a ${materialBody ? 'material' : 'meat'} body is ${ceiling}`); return; }
          traitRows().splice(traitRows().indexOf(weak), 1);
          trace('trait ceiling:', `"${weak.name}" leaves for the concept-bound "${tt.row.name}" — ${ceiling} traits is print's ceiling for this body`);
        }
        // two rows never share a name (the Carillon's action and trait were both
        // "Funeral Peal"): on a collision the trait takes its template's own name
        const bareT = tt.row.name.replace(/ \(.*\)$/, '').toLowerCase();
        if (Object.values(sections).flat().some((e2) => String(e2.name ?? '').replace(/ \(.*\)$/, '').toLowerCase() === bareT)) {
          trace('trait renamed:', `"${tt.row.name}" already names a row — the trait ships as "${tt.templateName}"`);
          tt.row.name = tt.templateName;
        }
        tt.row.bound = bound; tt.row.boundKeys = [...new Set([...keysOf(tt.because), ...(tt.row.boundKeys ?? []), ...userKeysFor(tt.template?.id ?? tt.row?.template)])];
        supersedeByTrait(tt); slotYield(tt.template, tt.row);
        uniqueRowName(tt.row, tt.templateName);
        (sections[secT] = sections[secT] ?? []).unshift(tt.row);
        if (tt.template === 'assassinate') for (const es2 of Object.values(sections)) for (const e2 of es2) if (/\(with Advantage during the first round of each combat\)/.test(e2.text ?? '')) { e2.text = e2.text.replace(/ ?\(with Advantage during the first round of each combat\)/, ''); trace('inline rider retired:', `${e2.name} — Assassinate grants the first-round Advantage now`); }
        trace('signature template (trait):', `${tt.template} -> ${secT}/"${tt.row.name}" ("${tt.because}")`);
      };
      // OWED FIRST (critic, the fourteen): a trait the SEAT owes by print seats
      // non-competitively and the idea competes for what remains — four blocks
      // lost their defining clause to a proposal the shelf could not hold. The
      // list is print's composition for that seat, not one row.
      const owedList = [...(SEAT_DEFAULT_TRAIT[scaled.style ?? ''] ?? SEAT_DEFAULT_TRAIT[archetype] ?? []), ...(Array.isArray(options.mechanics) ? options.mechanics.flatMap((mk) => MECHANIC_OWED_TRAIT[String(mk)] ?? []) : [])]; // a claimed mechanic owes its trait too (gaze → Vile Appearance)
      const MADE_SEAT_TYPES = { warden: /^(?:Construct|Elemental|Undead|Plant|Ooze|Celestial|Fiend)\b/i, juggernaut: /^(?:Construct|Elemental|Undead|Plant|Ooze)\b/i }; // a made seat is earned by its type gate (a stone shrine-guardian is a warden by what it is)
      const seatEarned = !scaled.style || verbHits(readPhrases(String(options.userConcept ?? concept ?? ''))).some((h) => h.id === `${archetype}-${scaled.style}`) || !!(MADE_SEAT_TYPES[scaled.style]?.test(String(options.resolvedType ?? '')));
      if (!printBody && !seatEarned && owedList.length) trace('seat owes nothing:', `the ${scaled.style} line was the model's read of its quote, not a key in the words (a hermit was handed Assassinate, day-one 2026-09-30)`);
      for (const owed of (printBody || !seatEarned) ? [] : owedList) { // a print body's row set is closed against seat-owed rows (Assassinate on a Wight, critic 2026-09-29)
        if (traitT?.template === owed || Object.values(sections).flat().some((e2) => e2.template === owed)) continue;
        const ot = TEMPLATE_BY_ID.get(owed);
        if (!ot || !templatesFor({ ...ctxT, section: ot.section, trigger: null }).some((x) => x.id === owed)) continue;
        const r = renderTemplate(ot, ctxT, bindFills(ot), { blind: true });
        if (!r) continue;
        trace('seat default:', `${scaled.style ?? archetype} owes ${owed} by print — it seats before the idea`);
        shipTrait({ row: { name: r.name, text: stampT(r.text), library: true, template: owed }, templateName: r.name, section: r.section, template: owed, because: 'the seat owes it by print', owed: true });
      }
      // a MEAT body earns its trait by a verb (review 2026-09-28): "a bear" took a
      // barbed coat the shelf fit with no word of the concept or the idea behind
      // it. A material body's substance is a rule, so a shape fit stands there;
      // on meat, a pick that matched nothing is the model's decoration, not the
      // user's creature.
      if (traitT && !materialBody && /\[verb: [^\]]*\]/.test(traitT.because ?? '') && !/:concept\b/.test(traitT.because ?? '')) { trace('trait declined:', `"${traitT.row.name}" — bound only on the idea's own words (${/\[verb: ([^\]]*)\]/.exec(traitT.because)?.[1]}) with no key in the concept; a meat body earns its trait by the user's verb (the sniper's tracker, critic 2026-09-29)`); traitT = null; }
      if (traitT && !materialBody && /\[shape fit, no verb match\]/.test(traitT.because ?? '')) { trace('trait declined:', `"${traitT.row.name}" — a shape fit with no verb match on a ${options.resolvedType ?? 'meat'} body; a meat body earns its trait by a verb`); traitT = null; }
      // CONCEPT-KEY FIRST (critic, library round 2026-09-29: guarded-stance 2/5 rolls
      // on "holds the shield line", resonant-body 1/3 on "gong" — the idea missed and
      // the concept's own keys were never tried): when the idea path yields nothing,
      // the user's words rank the trait shelf directly; two concept keys, or one
      // fixed phrase, bind deterministically. The model's idea supplies fiction,
      // never the choice.
      if (!traitT && !printPlain && traitWildcardAllowed) {
        const conceptOnly = maskConsumed(readPhrases(String(options.userConcept ?? concept ?? '')));
        const shelfC = templatesFor({ ...ctxT, section: 'trait', trigger: null, text: conceptOnly });
        const head = headNoun(conceptOnly); // "a temple gong given legs…" → gong: the creature's own head noun is one key worth two
        const rankedC = rankByVerb(shelfC, conceptOnly).filter((r) => r.concept.length >= 2 || r.concept.some((k) => k.includes(' ') || (head && (k === head || k === `${head}s` || head.startsWith(k) && k.length >= 4))));
        for (const r of rankedC) {
          if (Object.values(sections).flat().some((e2) => e2.template === r.t.id)) continue;
          if (wrongT.has(r.t.id)) { trace('concept-first trait skipped:', `${r.t.id} — the call read its match as a collision (the word is a modifier, or the sheet already answers it)`); continue; }
          const rr = renderTemplate(r.t, ctxT, bindFills(r.t), { blind: true });
          if (!rr) { trace('concept-first trait skipped:', `${r.t.id} (the sheet cannot render it blind)`); continue; }
          trace('trait bound to the concept\'s verb (concept-first):', `${r.t.id} — ${r.concept.join('+')} in the user's words; the idea path had nothing`);
          shipTrait({ row: { name: rr.name, text: stampT(rr.text), library: true, template: r.t.id }, templateName: rr.name, section: rr.section, template: r.t.id, because: `exact concept match [verb: ${r.concept.map((k) => `${k}:concept`).join(', ')}]` });
          break;
        }
      }
      if (traitT) shipTrait(traitT);
    }
  }
  { // THE CARDS THAT ARE THESE FEATURES (step 8): an exploiter or payoff template on a weapon sheet is a Trip Attack; the riposte seed is Riposte; when the feature table already landed a Trip, the template's copy leaves
    const tripRow = Object.values(sections).flat().find((e) => e.feature === 'Trip Attack');
    const weaponSheet = Object.values(sections).flat().some((e) => e.part && e.weapon);
    for (const [secF, esF] of Object.entries(sections)) for (const e of esF.slice()) {
      const isPayoff = ['condition-payoff', 'exploiter'].includes(e.template) || (e.library && /^(?:Merciless Strike|Opportunist's Lash)/.test(e.name ?? ''));
      const isRiposte = e.template === 'riposte' || (e.library && /^Riposte\b/i.test(e.name ?? ''));
      if (isPayoff && tripRow) { esF.splice(esF.indexOf(e), 1); sweepDeadName(sections, e.name, tripRow, trace); trace('feature stands:', `${secF}/"${e.name}" leaves — the style's Trip Attack on ${tripRow.name} is the row (Merciless Strike never ships under a style clause)`); continue; }
      if (isPayoff && weaponSheet && !/^Trip Attack/.test(e.name)) { const was = e.name; e.name = `Trip Attack${(/ \(.*\)$/.exec(e.name) ?? [''])[0]}`; for (const es2 of Object.values(sections)) for (const e2 of es2) if (e2 !== e) e2.text = String(e2.text ?? '').split(was.replace(/ \(.*\)$/, '')).join('Trip Attack'); trace('feature name:', `"${was}" -> "${e.name}" — the card that is this feature takes its name`); }
      if (isRiposte && !/^Riposte/.test(e.name)) { const was = e.name; e.name = 'Riposte'; for (const es2 of Object.values(sections)) for (const e2 of es2) if (e2 !== e) e2.text = String(e2.text ?? '').split(was).join('Riposte'); trace('feature name:', `"${was}" -> "Riposte"`); }
    }
  }
  if (!printExact) { // AUTHORING IS THE REPAIR CALL (step 7): after the template path, one call for a mechanical clause that no part row, template row or seed claimed; never on an exact print body (a borrow takes it — step 8)
    const claimedWords = new Set([...Object.values(sections).flat().flatMap((e) => [...clauseWords(`${e.clause ?? ''} ${e.name ?? ''} ${e.flavor ?? ''} ${e.authored || e.template || e.library ? e.text : ''}`), ...(e.template ? clauseWords((TEMPLATE_BY_ID.get(e.template)?.keys ?? []).join(' ')) : [])]), ...clauseWords(String(donor.id).replace(/-\d+/, '').split('-').slice(1).join(' '))]); // a template row's keys and the donor's style word (charger, grappler, hurler) claim their clauses too — the bull's "It charges" is the charger chassis
    const claimedBy = (w) => [...claimedWords].some((k) => k === w || (k.length >= 4 && w.length >= 4 && (k.startsWith(w.slice(0, 4)) || w.startsWith(k.slice(0, 4))))); // a clause is claimed by a row's own attribution, name or authored text — never by a chassis row's prose
    const unplacedWords = new Set((authored?.unplaced ?? []).flatMap((u) => clauseWords(u.clause)));
    const unclaimed = clauseRecord.filter((c) => c.kind === 'mechanical' && !c.head && !c.polarity && !clauseWords(c.text).some((w) => claimedBy(w) || unplacedWords.has(w))).slice(0, 2); // at most two clauses — the repair adds a row or two, never a second sheet (Grandmother Ash took four) // descriptive asks too: the model may give "keeps a court of thralls" a row or file it as lore
    if (unclaimed.length) {
      trace('repair:', `${unclaimed.length} clause(s) with no row — ${unclaimed.map((c) => `"${c.text}"`).join(', ')}; one targeted call with the sheet as context`);
      try {
        const sheetText = Object.entries(sections).flatMap(([sec, es]) => es.map((e) => `${sec} / ${e.name}: ${e.text}`)).join('\n');
        const rawR = await callLLM(buildRepairPrompt({ name: p.name, inline: inlineGuessRef(), clauses: unclaimed, cr, sheet: sheetText, attackCap: unclaimed.length }), validateAuthorResponse);
        const rep = parseAuthorResponse(rawR, { attackKeys: [], attackCap: 1, traitSlots: 1 });
        if (rep && (rep.attacks.length + rep.saves.length + rep.traits.length + rep.reactions.length)) { rep.placed = rep.attacks.map((a) => ({ ...a, key: null })); rep.unplaced = rep.unplaced ?? []; landAuthored(rep, { repair: true }); if (authored) authored.unplaced = [...(authored.unplaced ?? []), ...rep.unplaced]; else authored = { attacks: [], saves: [], traits: [], reactions: [], crossRef: null, unplaced: rep.unplaced, placed: [], repairOnly: true }; }
        else trace('repair:', 'the answer held no rows — the clauses stay unplaced');
      } catch (eR) { trace('repair call failed —', `${eR?.message ?? eR}; the clauses stay unplaced`); }
    }
  }
  { // THE RECORD'S UNPLACED LIST IS FINAL HERE (step 8): the repair ran after the sheet was assembled; a descriptive clause nothing claimed is flavor and reaches the description
    const claimedAll = new Set(Object.values(sections).flat().flatMap((e) => [...clauseWords(`${e.clause ?? ''} ${e.name ?? ''}`), ...(Array.isArray(e.boundKeys) ? e.boundKeys.flatMap((k) => clauseWords(k)) : [])]));
    const unplacedNow = [...(authored?.unplaced ?? [])];
    for (const c of clauseRecord) if (c.kind === 'descriptive' && !c.head && !clauseWords(c.text).some((w) => claimedAll.has(w)) && !unplacedNow.some((u) => clauseWords(u.clause).some((w) => clauseWords(c.text).includes(w)))) unplacedNow.push({ clause: c.text, where: 'description', text: c.text });
    if (monster.generation) monster.generation.unplaced = unplacedNow;
  }
  for (const [sec, es] of Object.entries(sections)) {
    for (let i = es.length - 1; i >= 0; i -= 1) {
      const e = es[i];
      // optional organs DEGRADE (the dragon Spellcasting row crashed a
      // generation 2026-09-11 when an API hiccup left it unfilled —
      // the never-fail law): the row drops, the block ships
      if (/\{spell_(?:at_will|daily)\}/.test(e.text)) {
        // the DRAGON menu is engine-owned, so the organ never has to
        // drop there (Spellcasting went 0-for-2 live — both API
        // failures during repair; critic filed the second as
        // signature loss): deterministic utility picks stand in.
        // Casters keep the drop — their picks are concept identity.
        const menu = scaled.spell_menu ?? [];
        if (menu.length >= 4) {
          atWillShipped = menu.slice(0, 2);
          e.text = e.text
            .replace('{spell_at_will}', menu.slice(0, 2).map((x) => `*${x}*`).join(', '))
            .replace('{spell_daily}', menu.slice(2, 4).map((x) => `*${x}*`).join(', '));
          trace('optional organ filled from the menu —', `"${e.name}" (the model's picks failed; the engine's utility menu stands in)`);
          continue;
        }
        es.splice(i, 1);
        trace('optional organ unfilled after repair —', `"${e.name}" dropped (the block stands without it)`);
        continue;
      }
      {
        const tok = /\{damage_type(?:_2)?\}|\{condition_(?:minor|major)\}|\{save_stat\}|\{projectile\}/.exec(e.text);
        if (tok) throw new Error(`unfilled slot in "${e.name}" — token ${tok[0]} — failing loudly per spec`);
      }
      // an Actions row that calls itself "this bonus action" (the
      // Stitcher's Shadow Stitch, 2026-09-13): the section owns the
      // economy label, not the prose — closed token swap
      if (sec === 'Actions' && /this bonus action/i.test(e.text ?? '')) {
        e.text = e.text.replace(/this bonus action/gi, 'this action');
        trace('economy label scrubbed:', `"${e.name}" called itself a bonus action inside Actions`);
      }
      // the engine owns every flat average (the Surgeon's "18 (4d6)" —
      // 4d6 is 14; the one arithmetic miss in twelve Tier A blocks):
      // recompute N (XdY+Z) everywhere; donor numbers no-op
      if (e.text) {
        e.text = e.text.replace(/\b(\d+) \((\d+)d(\d+)(?:\s*([+-])\s*(\d+))?\)/g, (m0, flat, n, d, sign, mod) => {
          const avg = Math.floor(Number(n) * (Number(d) + 1) / 2) + (mod ? (sign === '-' ? -1 : 1) * Number(mod) : 0);
          if (avg !== Number(flat)) trace('flat average recomputed:', `"${e.name}" ${flat} (${n}d${d}${mod ? `${sign} ${mod}` : ''}) -> ${avg}`);
          return `${avg} (${n}d${d}${mod ? ` ${sign} ${mod}` : ''})`;
        });
      }
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
    const dm = /(\d+)d(\d+)(?:\s*([+-])\s*(\d+))?/.exec(monster.hp_formula ?? ''); // a NEGATIVE Constitution bonus counts too (the Kobold Warrior's 3d6 - 3 listed 10, critic form-ten 2026-10-01)
    if (dm) monster.hp = Math.floor(Number(dm[1]) * (Number(dm[2]) + 1) / 2) + (dm[3] === '-' ? -1 : 1) * Number(dm[4] ?? 0);
  }
  // HEADER HONESTY (owner + critic 2026-09-22): speed from the concept's
  // movement set, languages from the mind, attack names from anatomy, fire
  // defenses from the material — all derived, all closed sets (header.mjs)
  {
    // THE SHIFTER'S BEAST IS THE CONCEPT'S (2026-09-28): the were line ships
    // "beast-humanoid hybrid or a Medium beast" and "(Beast or Hybrid Form Only)";
    // print names the animal (Werewolf: "a Medium wolf", "(Wolf or Hybrid Form
    // Only)"). A concept that names one has it stamped in; one that doesn't keeps
    // the generic reading (the doppelganger).
    // THE WEAPON TABLE: name to range and thrown-or-not is a lookup (a heavy
    // crossbow printed at the longbow's 150/600, a thrown heavy crossbow at 30/120,
    // a handaxe at 30/120 — critic, new lines 2026-09-28). 2024 print: heavy
    // crossbow 100/400, light 80/320, hand 30/120, longbow 150/600, shortbow
    // 80/320, sling 30/120; javelin 30/120; handaxe/dagger/spear/trident/dart 20/60
    {
      const WEAPON_TABLE = [
        [/\bheavy crossbow\b/i, '100/400', false], [/\blight crossbow\b/i, '80/320', false], [/\bhand crossbow\b/i, '30/120', false], [/\bcrossbow\b/i, '80/320', false],
        [/\blongbow\b/i, '150/600', false], [/\bshortbow\b/i, '80/320', false], [/\bbow\b/i, '150/600', false], [/\bsling\b/i, '30/120', false], [/\barrows?\b/i, '150/600', false], [/\bbolts?\b/i, '80/320', false], // an arrow is the bow's, a bolt the crossbow's — never a javelin ("Falling Arrow. Melee or Ranged", critic 2026-09-29)
        [/\b(?:musket|rifle|arquebus|carbine|blunderbuss)s?\b/i, '40/120', false], [/\b(?:pistol|flintlock|firearm|gun|revolver)s?\b/i, '30/90', false], // 2024 firearms: Pistol 30/90, Musket 40/120 — a Flintlock fell into the thrown row (critic, new lines 2026-09-28)
        [/\bjavelins?\b/i, '30/120', true], [/\bnets?\b/i, '5/15', true], [/\bhandaxes?\b/i, '20/60', true], [/\b(?:great)?axes?\b/i, '20/60', true], [/\b(?:war)?hammers?\b|\bmauls?\b/i, '20/60', true], // a hurled axe or hammer flies as a thrown weapon does, 20/60 — not a greataxe at 120 ft. (the critic's species read) [/\bdaggers?\b/i, '20/60', true], [/\bspears?\b/i, '20/60', true], [/\btridents?\b/i, '20/60', true], [/\bdarts?\b/i, '20/60', true], [/\blight hammers?\b/i, '20/60', true],
      ];
      const retable = (t, range, thrown) => (!thrown && /Melee or Ranged Attack Roll/.test(t)
        ? t.replace('Melee or Ranged Attack Roll', 'Ranged Attack Roll').replace(/reach \d+ ft\. or range \d+(?:\/\d+)? ft\./, `range ${range} ft.`)
        : t.replace(/range \d+(?:\/\d+)? ft\./, `range ${range} ft.`));
      for (const es of Object.values(monster.sections ?? {})) for (const e of es) {
        const bare = String(e.name ?? '').replace(/ \(.*\)$/, '');
        const w = WEAPON_TABLE.find(([re]) => re.test(bare));
        if (!w && /range (?:30\/90|60\/180|90\/240) ft\./.test(e.text ?? '')) { const to = /30\/90/.test(e.text) ? '20/60' : '60/240'; const was = (/range [\d/]+ ft\./.exec(e.text) ?? [''])[0]; e.text = e.text.replace(/range (?:30\/90|60\/180|90\/240) ft\./, `range ${to} ft.`); if (e.text_noRider) e.text_noRider = e.text_noRider.replace(/range (?:30\/90|60\/180|90\/240) ft\./, `range ${to} ft.`); trace('weapon table:', `"${bare}" — ${was} is not a print range; an unlisted thrown thing is 20/60, a hurled mass 60/240 (the critic's third species read)`); continue; }
        if (!w || !/range \d+(?:\/\d+)? ft\./.test(e.text ?? '')) continue; /* a single-range chassis row ("range 60 ft.") takes the table too */
        const [, range, thrown] = w; const before = e.text;
        e.text = retable(e.text, range, thrown);
        if (e.text_noRider) e.text_noRider = retable(e.text_noRider, range, thrown);
        // a LAUNCHER rolls Dexterity (print: every bow, crossbow and firearm row) —
        // the sergeant's crossbow was +6 off Str 16 where Dex 14 gives +5
        const mentalKeyed = ['INT', 'WIS', 'CHA'].some((k) => Math.floor(((monster.stats?.[k] ?? 10) - 10) / 2) + (monster.pb ?? scaled.pb ?? 0) === Number((/Ranged Attack Roll:\*? \+(\d+)/.exec(e.text) ?? [])[1])) && !['STR', 'DEX'].some((k) => Math.floor(((monster.stats?.[k] ?? 10) - 10) / 2) + (monster.pb ?? scaled.pb ?? 0) === Number((/Ranged Attack Roll:\*? \+(\d+)/.exec(e.text) ?? [])[1]));
        if (!thrown && monster.stats && !/Melee or Ranged/.test(e.text) && !mentalKeyed) { // a bolt rolled off the casting stat is a spell, not a launcher (the archlich's Solar Bolt went to Dex — critic's audit 2026-10-02)
          const dexBonus = Math.floor(((monster.stats.DEX ?? 10) - 10) / 2) + (monster.pb ?? scaled.pb ?? 0);
          const reDex = /(Ranged Attack Roll:\*? )\+\d+/;
          const cur = Number((/Ranged Attack Roll:\*? \+(\d+)/.exec(e.text) ?? [])[1]);
          if (Number.isFinite(cur) && cur !== dexBonus) { e.text = e.text.replace(reDex, `$1+${dexBonus}`); if (e.text_noRider) e.text_noRider = e.text_noRider.replace(reDex, `$1+${dexBonus}`); trace('weapon table:', `"${bare}" rolls Dexterity — +${cur} → +${dexBonus}`); }
          // and the DAMAGE side takes the same modifier (the pistol was +5 to hit and 3d8 + 5 off Str, critic 2026-09-29)
          const dexMod = Math.floor(((monster.stats.DEX ?? 10) - 10) / 2);
          const redmg = /(\d+) \((\d+)d(\d+)(?: ([+-]) (\d+))?\)/;
          const dm = redmg.exec(e.text);
          if (dm) {
            const curMod = dm[4] ? (dm[4] === '-' ? -Number(dm[5]) : Number(dm[5])) : 0;
            if (curMod !== dexMod) {
              const n = Number(dm[2]); const d = Number(dm[3]); const avg = Math.max(1, Math.floor(n * (d + 1) / 2) + dexMod);
              const dice = `${n}d${d}${dexMod > 0 ? ` + ${dexMod}` : dexMod < 0 ? ` - ${-dexMod}` : ''}`;
              e.text = e.text.replace(redmg, `${avg} (${dice})`); if (e.text_noRider) e.text_noRider = e.text_noRider.replace(redmg, `${avg} (${dice})`);
              trace('weapon table:', `"${bare}" damage off Dexterity — ${dm[1]} (${dm[2]}d${dm[3]}${dm[4] ? ` ${dm[4]} ${dm[5]}` : ''}) → ${avg} (${dice})`);
            }
          }
        }
        if (/\bnets?\b/i.test(bare)) { /* the 2024 Net: no damage, a Restrain on a Large or smaller target, and it does not come back (the kuo-toa's three nets, critic 2026-10-01) */
          const net = (t0) => String(t0).replace(/\d+ \(\d+d\d+(?: \+ \d+)?\) \w+ damage(?: plus \d+ \(\d+d\d+\) \w+ damage)?\.?/, `If the target is Large or smaller, it has the Restrained condition until it escapes (escape DC ${scaled.dc}).`).replace(/\s*\*Hit or Miss:\*[^.]*\.\s*/, ' ').trim();
          e.text = net(e.text); if (e.text_noRider) e.text_noRider = net(e.text_noRider);
        }
        if (e.text !== before) trace('weapon table:', `"${bare}" — ${thrown ? 'thrown' : 'a launcher, never thrown'}, range ${range}`);
      }
    }
    // PROVENANCE: a chassis nova is the donor's own row under the model's name (the
    // gong's Tremor Toll appeared with no template line — critic 2026-09-29)
    for (const es of Object.values(monster.sections ?? {})) for (const e of es) {
      if (!/\(Recharge [\d–-]+\)|\d\/Day/.test(e.name ?? '') || !/Saving Throw/.test(e.text ?? '') || e.library) continue;
      const bare = String(e.name ?? '').replace(/ \(.*\)$/, '');
      const from = Object.entries(p.renames ?? {}).find(([, v]) => String(v ?? '').trim().toLowerCase() === bare.toLowerCase())?.[0];
      trace('chassis nova:', `"${e.name}" — the ${donor.id}'s own nova row${from ? ` (its "${from}", renamed by the model)` : ''}; geometry, cap and rider lines below are its edits`);
    }
    // a chassis nova that "sends a tremor in all directions" is an Emanation, not
    // a cone (the gong's Resonant Toll, critic 2026-09-29): print's cone length
    // halves into the emanation's radius (a 30-foot cone ≈ a 15-foot Emanation)
    if (/\b(?:in all directions|in every direction|all around it|around it|outward from it)\b/i.test(options.userConcept ?? concept ?? '')) {
      for (const es of Object.values(monster.sections ?? {})) for (const e of es) {
        const m = /each creature in a (\d+)-foot Cone/.exec(e.text ?? '');
        if (!m || !/\(Recharge [\d–-]+\)|\d\/Day/.test(e.name ?? '')) continue;
        const radius = Math.max(10, Math.round(Number(m[1]) / 2 / 5) * 5);
        e.text = e.text.replace(m[0], `each creature in a ${radius}-foot Emanation originating from ${inline}`);
        if (/\b(?:stomps?|stamps?|slams? the ground|quake|tremor)\b/i.test(options.userConcept ?? concept ?? '') && /has the (?!Prone)\w+ condition/.test(e.text)) { e.text = e.text.replace(/has the \w+ condition/, 'has the Prone condition'); trace('nova rider:', `"${e.name}" — a stomp knocks Prone (the model's minor condition stands down)`); }
        trace('nova geometry:', `"${e.name}" — ${m[1]}-foot Cone → ${radius}-foot Emanation (the concept says in all directions)`);
      }
    }
    // Immutable Form is a golem's (4/4 print golems, no other body): the juggernaut
    // chassis carries it, and an Undead ossuary printed it (critic 2026-09-29)
    if (!/^Construct\b/i.test(monster.type ?? '')) {
      for (const [secI, es] of Object.entries(monster.sections ?? {})) for (let i = es.length - 1; i >= 0; i -= 1) {
        if (/^Immutable Form$/i.test(es[i].name ?? '')) { es.splice(i, 1); trace('trait stripped:', `${secI}/Immutable Form — a golem's trait on a ${monster.type}`); }
      }
    }
    /* a creature OF THE DEEP breathes both (the Sea Hag's Amphibious; "fish-headed … of the deep" owed it — critic 2026-10-01) */
    if (/\b(?:fish-headed|fish-faced|fish-folk|of the deep|deep-dwell\w*|amphibious|gilled|frog-folk|aquatic|of the trench|from the trench)\b/i.test(readPhrases(String(options.userConcept ?? concept ?? ''))) && !Object.values(monster.sections ?? {}).flat().some((e) => /^Amphibious$/i.test(String(e.name ?? '')))) {
      (monster.sections.Traits = monster.sections.Traits ?? []).unshift({ name: 'Amphibious', text: `${inline.charAt(0).toUpperCase() + inline.slice(1)} can breathe air and water.`, print: true });
      trace('amphibious by concept:', 'a creature of the deep breathes both (print: the Sea Hag\'s)');
    }
    if (scaled.style === 'shifter') {
      const ANIMAL = /\b(wolf|wolves|boar|bear|tiger|rat|shark|raven|crow|bat|serpent|snake|spider|jackal|hyena|lion|panther|leopard|stag|fox|owl|eagle|hawk|crocodile|toad|frog|goat|horse|hound|dog|cat|ape|gorilla)\b/i;
      const m = ANIMAL.exec(options.userConcept ?? concept ?? '');
      if (m) {
        const animal = m[1].toLowerCase().replace(/^wolves$/, 'wolf'); const Animal = animal.charAt(0).toUpperCase() + animal.slice(1);
        for (const es of Object.values(monster.sections ?? {})) for (const e of es) {
          if (/beast-humanoid hybrid/.test(e.text ?? '')) e.text = e.text.replace('beast-humanoid hybrid', `${animal}-humanoid hybrid`).replace(/(Medium|Large|Small) beast\b/, `$1 ${animal}`);
          if (/\(Beast or Hybrid Form Only\)/.test(e.name ?? '')) e.name = e.name.replace('(Beast or Hybrid Form Only)', `(${Animal} or Hybrid Form Only)`);
        }
        trace('shifter beast:', `${animal} — the concept names the animal; the forms and the gate print it`);
        // a water beast's shifter breathes both (the Sea Hag's "can breathe air and
        // water" — the sea-hag's daughter who becomes a shark owed it, critic 2026-09-28)
        const AQUATIC = new Set(['shark', 'crocodile', 'toad', 'frog', 'seal', 'otter', 'eel', 'octopus', 'crab', 'turtle']);
        if (AQUATIC.has(animal) && !Object.values(monster.sections ?? {}).flat().some((e) => /^Amphibious$/i.test(String(e.name ?? '')))) {
          (monster.sections.Traits = monster.sections.Traits ?? []).unshift({ name: 'Amphibious', text: `${inline.charAt(0).toUpperCase() + inline.slice(1)} can breathe air and water.` });
          trace('shifter beast:', `${animal} swims — Amphibious stamped (print: the Sea Hag's)`);
        }
      }
    }
    // A NEGATIVE CLAUSE REMOVES THE CAPABILITY (critic, blind A/B 2026-09-28: the
    // angel "with its wings sewn shut" flew 70 feet in one arm) — by rule, not by
    // the model's mood: the concept's own words take Fly out of the movement set
    const NEGATED_FLIGHT = /\bwings?\s+(?:sewn|stitched|bound|clipped|broken|torn|pinned|nailed|shut|tied)\b|\b(?:can(?:'t|not)|cannot|never|no longer) (?:fly|flies)\b|\bflightless\b|\bwingless\b|\bgrounded\b/i;
    const negatedFly = NEGATED_FLIGHT.test(options.userConcept ?? concept ?? '');
    if (floatingOrb) { monster.speed = '0 ft., Fly 20 ft. (hover)'; const pp = (/Passive Perception \d+/.exec(monster.senses ?? '') ?? ['Passive Perception 10'])[0]; monster.senses = `darkvision 120 ft.; ${pp}`; }
    const pcSpeed = (() => { const c = printCanonHere(options.userConcept ?? concept, cr); return c && !c.borrowOnly ? c : null; })(); // a borrowed head keeps the concept's own movement and senses (the wight's Burrow was dropped for the Wight's walk, 2026-09-29)
    // a PRINT BODY moves the way print says; a mode beyond print's needs the user's own
    // words (a model-added Fly 40 ft. on a unicorn, 2026-10-01; the wight's Burrow was "roots up")
    const NAMED_MODE = { fly: /\b(?:fly|flies|flying|flight|wings?|winged|soars?|hovers?|airborne)\b/i, swim: /\b(?:swims?|swimming|aquatic|underwater|sea|river|lake|tide|marsh|bog|drowned)\b/i, burrow: /\b(?:burrows?|digs?|tunnels?|roots? up|underground|beneath the earth|barrow|barrows|buried|entombed|from beneath|rises? from the (?:earth|ground|grave)|under the earth)\b/i, climb: /\b(?:climbs?|climbing|scales? (?:the )?walls?|clings?|spider)\b/i };
    const pcBody = pcPlain ?? null; // on a print body — exact or borrowed — print's modes govern; the concept adds a mode only by naming it (the hag kept a Swim nobody typed — the critic's species read)
    const userNamed = (options.movement ?? []).filter((m) => NAMED_MODE[String(m).toLowerCase()]?.test(readPhrases(String(options.userConcept ?? concept ?? ''))));
    const movementBase = pcSpeed ? [...new Set([...pcSpeed.modes, ...userNamed])] /* print's modes plus the user's own ("Flying speed of 60ft" on an Owlbear, form-ten 2026-10-01) */
      : pcBody ? [...new Set([...pcBody.modes, ...(options.movement ?? []).filter((m) => NAMED_MODE[String(m).toLowerCase()]?.test(readPhrases(String(options.userConcept ?? concept ?? ''))))])]
      : (options.movement ?? []); // a print creature moves the way print says (a wolf climbed at 50 ft.)
    if (pcBody) { const dropped = (options.movement ?? []).filter((m) => !movementBase.includes(m)); if (dropped.length) trace('print canon modes:', `${dropped.join(', ')} off — the ${pcBody.name} has no such mode and the words name none`); }
    if (pcSpeed) trace('print canon speed:', `modes ${pcSpeed.modes.join(', ') || 'walk only'} — the ${pcSpeed.name}'s`);
    if (pcSpeed) { // and print's senses (a boar has none; ours printed darkvision 30 — critic, fresh six)
      const pp = (/Passive Perception \d+/.exec(monster.senses ?? '') ?? ['Passive Perception 10'])[0];
      monster.senses = pcSpeed.senses ? `${pcSpeed.senses}; ${pp}` : pp;
      trace('print canon senses:', `"${pcSpeed.senses || 'none'}" — the ${pcSpeed.name}'s`);
    }
    // DIGGING is a movement claim by rule, not by the model's mood: "roots up the
    // graves" earned Burrow on one roll of three (critic 2026-09-29)
    const DIGS = /\b(?:roots?|digs?|tunnels?|burrows?|claws?|churns?) (?:up|through|under|into|beneath) (?:the )?(?:graves?|earth|ground|soil|dirt|sand|rubble|barrows?|graveyard)\b/i;
    const digs = !pcSpeed && DIGS.test(options.userConcept ?? concept ?? '') && !movementBase.some((m) => /burrow/i.test(String(m)));
    if (digs) trace('burrow by concept:', 'the concept digs — Burrow joins the movement set');
    const movementT2 = (digs ? [...movementBase, 'burrow'] : movementBase).filter((m) => !(negatedFly && String(m).toLowerCase() === 'fly'));
    if (negatedFly && (options.movement ?? []).some((m) => String(m).toLowerCase() === 'fly')) trace('flight removed by the concept:', 'a negative clause names the wings — Fly leaves the movement set');
    const sp = honestSpeed(monster.speed, { movement: movementT2, style: scaled.style ?? null, bodyType: options.bodyType ?? null });
    if (/^Humanoid\b/i.test(monster.type ?? '') && scaled.style !== 'mounted') { /* a mount carries the walk */ const walkM = /^(\d+) ft\./.exec(sp.speed); const fast = /\b(?:fast|swift|fleet|quick|nimble|runner|sprint\w*|courier)\b/i.test(readPhrases(String(options.userConcept ?? concept ?? ''))); const cap = fast ? 40 : 30; if (walkM && Number(walkM[1]) > cap) { sp.speed = sp.speed.replace(/^\d+ ft\./, `${cap} ft.`); trace('speed by body:', `a Humanoid walks ${cap} ft. (print's people; a hermit ran 50 — critic's audit 2026-10-02)`); } }
    // written whenever the line CHANGED, not only on an add or a drop: a kept
    // crawl lifted beside a fly speed (the lamplighter's Swim 5, manual smoke
    // 2026-09-22) is a change too
    for (const e of monster.sections?.Traits ?? []) { // earth-glide owes Burrow (print's Earth Elemental carries both — the wight's Grave-Soil Body had none, critic 2026-09-29)
      const req = e.template ? TEMPLATE_BY_ID.get(e.template)?.requires_movement : null;
      if (req && !new RegExp(`\\b${req}\\b`, 'i').test(sp.speed)) { sp.speed = `${sp.speed}, ${req} 30 ft.`; trace('movement owed by trait:', `"${e.name}" requires ${req} — ${req} 30 ft. joins the header`); }
    }
    if (floatingOrb) sp.speed = '0 ft., Fly 20 ft. (hover)'; // the overlay's body, whatever the movement set says
    { /* an explicit number in the words sets that mode's speed ("Flying speed of 60ft") */
      const words = readPhrases(String(options.userConcept ?? concept ?? ''));
      for (const [mode, re] of [['Fly', /\bfl(?:y|ying|ight)(?:ing)? ?(?:speed)? ?(?:of)? ?(\d{1,3}) ?(?:ft|feet)\b/i], ['Swim', /\bswim(?:ming)? ?(?:speed)? ?(?:of)? ?(\d{1,3}) ?(?:ft|feet)\b/i], ['Burrow', /\bburrow(?:ing)? ?(?:speed)? ?(?:of)? ?(\d{1,3}) ?(?:ft|feet)\b/i], ['Climb', /\bclimb(?:ing)? ?(?:speed)? ?(?:of)? ?(\d{1,3}) ?(?:ft|feet)\b/i]]) {
        const m = re.exec(words); if (!m) continue;
        const n = Number(m[1]); if (!(n > 0 && n <= 200)) continue;
        const has = new RegExp(`${mode} \\d+ ft\\.`).test(sp.speed);
        sp.speed = has ? sp.speed.replace(new RegExp(`${mode} \\d+ ft\\.`), `${mode} ${n} ft.`) : `${sp.speed}, ${mode} ${n} ft.`;
        trace('speed by the words:', `${mode} ${n} ft. — the user wrote the number`);
        // the seat's hover tag is not the user's word: a winged Owlbear flies, it does not hover (critic form-ten 2026-10-01); bodies that hover by nature keep it
        if (mode === 'Fly' && / \(hover\)/.test(sp.speed) && !/\b(?:hover|hovers|hovering|levitat|float|floats|floating|incorporeal|ghost|spectral|wisp)\w*/i.test(words) && !/^(?:Undead|Elemental|Aberration|Ooze)\b/i.test(String(monster.type ?? ''))) { sp.speed = sp.speed.replace(/(Fly \d+ ft\.) \(hover\)/, '$1'); trace('hover dropped:', 'the seat hovers; the user\'s words only fly'); }
      }
    }
    if (sp.speed !== String(monster.speed ?? '')) { monster.speed = sp.speed; trace('speed by concept:', `${sp.dropped.length ? `dropped ${sp.dropped.join(', ')}` : ''}${sp.dropped.length && sp.added.length ? '; ' : ''}${sp.added.length ? `added ${sp.added.join(', ')}` : ''} — the concept's movement set decides`); }
    if (/^Construct\b/i.test(monster.type ?? '') && options.mind !== 'sapient' && /^(?:common|none|)$/i.test(String(monster.languages ?? '').trim()) && !/\b(?:speaks?|voices?|talks?|whispers?|sings?|says?|mimics?|chants?|prays?)\b/i.test(options.userConcept ?? concept ?? '')) { // a bare "Common" is the leak; a named tongue (Ignan, Dwarvish) is a claim and stands
      // a Construct on ANY line has no voice unless the concept gives it one or the resolve read a sapient mind (the barrow-warden got Common while the doll got its creator's — critic, fresh six)
      monster.languages = "Understands the languages of its creator but can't speak"; trace('languages by body:', 'a trap-line Construct with no voice in the concept');
    } else if (options.mind || /^Beast\b/i.test(monster.type ?? '')) { // a Beast never speaks even when the resolve read no mind (Common on a crab, a bird, 2026-09-28)
      const before = monster.languages; monster.languages = honestLanguages(monster.languages, { mind: options.mind, type: monster.type ?? '', int: Number(monster.stats?.INT ?? scaled.stats?.INT ?? 10), speaks: SPEECH_CUE.test(String(options.userConcept ?? concept ?? '')) });
      if (before !== monster.languages) trace('languages by mind:', `"${before}" -> "${monster.languages}" (${options.mind})`);
    }
    // a HUMANOID speaks its species' print language (every hobgoblin NPC: Common, Goblin;
    // the dwarf sergeant lost Dwarvish two rolls running — critic 2026-09-29)
    if (/^Humanoid\b/i.test(monster.type ?? '')) {
      const SPECIES_LANG = [[/\bdwar(?:f|ves|ven|vish)\b/i, 'Dwarvish'], [/\b(?:hob)?goblins?\b|\bbugbears?\b/i, 'Goblin'], [/\borcs?\b|\borcish\b/i, 'Orc'], [/\bel(?:f|ves|ven|vish)\b/i, 'Elvish'], [/\bgnomes?\b/i, 'Gnomish'], [/\bhalflings?\b/i, 'Halfling'], [/\bkobolds?\b|\blizardfolk\b/i, 'Draconic'], [/\bdrow\b/i, 'Undercommon']];
      const lang = SPECIES_LANG.find(([re]) => re.test(options.userConcept ?? concept ?? ''))?.[1];
      if (lang && !new RegExp(`\\b${lang}\\b`, 'i').test(monster.languages ?? '')) { monster.languages = /^(?:none|)$/i.test(String(monster.languages ?? '').trim()) ? `Common, ${lang}` : `${monster.languages}, ${lang}`; trace('languages by species:', `${lang} — the concept names the species; print's NPCs of it speak it`); }
    }
    // PRINT CANON, the attack names: a plain prompt's melee rows take the print
    // block's own names in order (Wolf: Bite; Brown Bear: Bite, Claw) — the
    // anatomy pass then only has to agree with them
    {
      const pc = printCanonHere(options.userConcept ?? concept, cr);
      if (pc && pc.melee.length) {
        const meleeRows = Object.values(monster.sections).flat().filter((e) => /Melee Attack Roll/.test(e.text ?? '') && !/Melee or Ranged/.test(e.text ?? ''));
        // the print BODY brings its size and base speed (a Medium Wight came out Large at 40 ft., critic 2026-09-30)
        if (printBody) {
          if (pc.size && /^(?:Tiny|Small|Medium|Large|Huge|Gargantuan)$/.test(pc.size) && !/^Humanoid\b/i.test(pc.type ?? '') && !/swarm/i.test(monster.size ?? '') && String(monster.size ?? '') !== pc.size) { /* a single print size, and never for a print Humanoid: the scrape clipped "Small or Medium" to "Small" on every NPC block (the Mage, 2026-10-01) */ trace('print canon size:', `${monster.size} -> ${pc.size} — the ${pc.name}'s`); monster.size = pc.size; { const conM = Math.floor(((monster.stats?.CON ?? 10) - 10) / 2); const fromHp = Number(scaled.hp ?? monster.hp); /* the intended HP — rebuilding from an already-rounded formula compounded two roundings (127 → 123 → 119, the brass gate-golem) */ monster.hp_formula = hpFormulaForSize(fromHp, pc.size, conM); const dmS = /(\d+)d(\d+)(?:\s*([+-])\s*(\d+))?/.exec(monster.hp_formula ?? ''); if (dmS) monster.hp = Math.floor(Number(dmS[1]) * (Number(dmS[2]) + 1) / 2) + (dmS[3] === '-' ? -1 : 1) * Number(dmS[4] ?? 0); } /* the hit die follows the size (15d20 on a Huge Treant, checker 2026-10-02) */ }
          const userType = (/\b(undead|construct|fiend|fey|celestial|elemental|aberration|plant|ooze|dragon|giant|humanoid|beast|monstrosity)\b/i.exec(readPhrases(String(options.userConcept ?? concept ?? ''))) ?? [])[1];
          const reclass2024 = options.edition === '2014' && /^Fey$/i.test(pc.type) && /^Humanoid/i.test(String(monster.type ?? '')); // goblins went Fey in 2024 alone; a 2014 sheet keeps the Humanoid
          if (reclass2024) trace('print canon type:', `${monster.type} stays — the ${pc.name} is Fey in 2024 only; this is a 2014 sheet (form-ten 2026-10-01)`);
          // print's alignment heads with print's name, exact or borrowed, unless the GM named one
          if (pc.alignment && String(monster.alignment ?? '') !== pc.alignment && !/\b(?:lawful|chaotic|neutral|good|evil|unaligned)\b/i.test(String(options.userConcept ?? concept ?? ''))) { trace('print canon alignment:', `${monster.alignment} -> ${pc.alignment} — the ${pc.name}'s (the Kobold printed Chaotic Neutral — the critic's second species read)`); monster.alignment = pc.alignment; }
          if (reclass2024) { /* traced above */ }
          else if (pc.type && String(monster.type ?? '') !== pc.type && !(userType && userType.toLowerCase() !== pc.type.toLowerCase())) { trace('print canon type:', `${monster.type} -> ${pc.type} — the ${pc.name}'s (a Unicorn printed Fey, 2026-10-01)`); monster.type = pc.type; }
          else if (userType && userType.toLowerCase() !== pc.type.toLowerCase()) trace('print canon type:', `${monster.type} stays — the words say ${userType} ("a dire wolf but undead", 2026-10-01)`);
          if (pc.nameIsPrint && String(monster.name ?? '') !== pc.name) { trace('print canon name:', `"${monster.name}" -> "${pc.name}" — a whole print name is the creature's name (the Goblin Boss shipped as Krag the Iron Standard, 2026-10-01)`); monster.name = pc.name;
            // the inline form follows the name: the model's minted "Skarn" stayed on every row of the Goblin Boss after the print name took over (critic form-ten 2026-10-01)
            const inlineNew = `the ${shortForm(pc.name)}`;
            if (inline !== inlineNew) { // a coined short form carries "the" too — the guard skipped "the blackroot wyrm" (critic's blockers audit 2026-10-03)
              // a /g regex's lastIndex carries between .test() calls and skipped every other row — replace outright
              const reI = new RegExp(`\\b${inline.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(?:'s)?\\b`, 'gi');
              for (const esI of Object.values(monster.sections ?? {})) for (const eI of esI) if (eI.text) eI.text = eI.text.replace(reI, (m0) => (m0.endsWith("'s") ? `${inlineNew}'s` : inlineNew)).replace(/(^|[.!?]\s+)the /g, '$1The ');
              trace('inline follows the print name:', `"${inline}" -> "${inlineNew}"`);
              inline = inlineNew; monster.inline = inlineNew; // print's own rows are stamped further down and read this; the card's legendary header reads monster.inline
            }
          }
          if (pc.languages && (!/^none$/i.test(pc.languages) || !/^(?:Humanoid|Fey|Giant|Celestial|Fiend)\b/i.test(pc.type ?? '')) && String(monster.languages ?? '') !== pc.languages) { /* print's "None" stands on a beast body (an Owlbear spoke Common, critic form-ten 2026-10-01) */
            const mine = !pc.exact ? String(monster.languages ?? '').split(/[,;]\s*|\s+plus\s+/i).map((t) => t.trim()).filter((t) => /^(?:Elvish|Dwarvish|Giant|Draconic|Infernal|Abyssal|Celestial|Sylvan|Undercommon|Deep Speech|Primordial|Aquan|Auran|Ignan|Terran|Goblin|Orc|Gnomish|Halfling|Druidic|Thieves' Cant)$/i.test(t) && !new RegExp(`\\b${t}\\b`, 'i').test(pc.languages)) : []; // a BORROW keeps the concept's named tongues beside print's (the Gladiator's generic Common stripped the tiefling's Infernal — the critic's species read)
            const merged = mine.length && !/can't speak/i.test(pc.languages) && !/^none$/i.test(pc.languages) ? `${pc.languages}, ${mine.join(', ')}` : pc.languages; // print's "None" on a beast body stays None
            trace('print canon languages:', `"${monster.languages}" -> "${merged}" — the ${pc.name}'s${mine.length ? ` plus the concept's ${mine.join(', ')}` : ''}`); monster.languages = merged; }
          if (pc.addsSeat && scaled.style === 'mounted' && pc.speedBase) trace('print canon speed:', `the mount carries the ${pc.name} — its ${pc.speedBase} ft. walk yields to the mount's (critic form-ten 2026-10-01)`);
          else if (pc.speedBase && /^\d+ ft\./.test(monster.speed ?? '') && !monster.speed.startsWith(`${pc.speedBase} ft.`)) { trace('print canon speed:', `${monster.speed.split(',')[0]} -> ${pc.speedBase} ft. — the ${pc.name}'s walk; the concept's other modes stay`); monster.speed = monster.speed.replace(/^\d+ ft\./, `${pc.speedBase} ft.`); }
          for (const [modeP, nP] of pc.modeSpeeds ?? []) { // print's own mode numbers too (Climb 30 on an Owlbear whose print climbs 40) — unless the user's words name that mode
            const reP = new RegExp(`${modeP} \\d+ ft\\.`);
            if (reP.test(monster.speed ?? '') && !new RegExp(`${modeP} ${nP} ft\\.`).test(monster.speed) && !new RegExp(`\\b${modeP.toLowerCase()}\\w*\\b`, 'i').test(readPhrases(String(options.userConcept ?? concept ?? '')))) { trace('print canon speed:', `${modeP} -> ${nP} ft. — the ${pc.name}'s own`); monster.speed = monster.speed.replace(reP, `${modeP} ${nP} ft.`); }
          }
          // a second print melee row rides beside the chassis's one (the Unicorn's Horn beside its Hooves)
          if (meleeRows.length === 1 && pc.meleeRows.length > 1) {
            const base = meleeRows[0];
            for (const pr of pc.meleeRows.slice(1)) {
              if (Object.values(monster.sections).flat().some((o) => String(o.name ?? '').replace(/ \(.*\)$/, '') === pr.name)) continue;
              const clone = { ...base, name: pr.name, text: (pr.reach ? base.text.replace(/reach \d+ ft\./, `reach ${pr.reach} ft.`) : base.text).replace(/(\d+ \(\d+d\d+(?: \+ \d+)?\)) ([A-Z][a-z]+) damage/, `$1 ${pr.type ?? '$2'} damage`).replace(/( plus \d+ \(\d+d\d+\) \w+ damage)/, ''), print: true };
              if (pc.exact && nearPrintCr(cr, pc.cr) && pr.dmg) clone.text = clone.text.replace(/\d+ \(\d+d\d+(?: [+-] \d+)?\)/, printExprWithSheetMod(pr.dmg, clone.text, scaled.pb)); // an exact body at print's CR: the added row deals print's own dice, not the chassis's (the Pit Fiend's Devilish Claw read 21 or 26 by the donor's roll — sprint run 2026-10-12)
              if (pr.rider && /^plus \d+ \(/.test(pr.rider)) clone.text = clone.text.replace(/(\d+ \(\d+d\d+(?: \+ \d+)?\) (?:[A-Z][a-z]+) damage)/, `$1 ${pr.rider.replace(/\.$/, '')}`); // print's own split pays the name (Radiant Horn: Piercing plus Radiant; the Pit Fiend's Fiery Mace: Force plus Fire)
              // the clone is print's row: the chassis's condition clause leaves before print's rider is applied (the Lich's Paralyzing Touch knocked Prone on the caster chassis — critic's regressions brief 2026-10-04)
              clone.text = clone.text.replace(/,? and (?:the target|it) has the \{?[A-Za-z_]+\}? condition[^.]*\.?/, '.').replace(/\s*If the target [^.]*has the \{?[A-Za-z_]+\}? condition[^.]*\.?/, '').replace(/\.\.$/, '.').replace(/\s+$/, '');
              if (pr.rider && !/^plus \d+ \(/.test(pr.rider)) clone.text = `${clone.text.trim().replace(/[.,]$/, '')}${/^(?:and|or|plus)\b/i.test(pr.rider) ? ',' : '.'} ${asInline(pr.rider)}`;
              const sec = Object.entries(monster.sections).find(([, es]) => es.includes(base))?.[0] ?? 'Actions';
              monster.sections[sec].splice(monster.sections[sec].indexOf(base) + 1, 0, clone);
              const ma = Object.values(monster.sections).flat().find((o) => o.name === 'Multiattack');
              if (ma && !new RegExp(`\\b${pr.name}\\b`).test(ma.text)) {
                if (/using ([^,]+?) or ([^,]+?) in any combination/.test(ma.text)) ma.text = ma.text.replace(/using ([^,]+?) or ([^,]+?) in any combination/, `using $1, $2, or ${pr.name} in any combination`); // print's three-row idiom
                else ma.text = ma.text.replace(/makes (\w+) [A-Z][A-Za-z' -]*? attacks/, `makes $1 attacks, using ${String(base.name).replace(/ \(.*\)$/, '')} or ${pr.name} in any combination`);
              }
              trace('print canon row:', `Actions/${pr.name} — the ${pc.name}'s second melee row, beside the chassis's`);
            }
          }
        }
        meleeRows.forEach((e, i) => {
          const pr = pc.meleeRows[Math.min(i, pc.meleeRows.length - 1)]; const to = pr?.name; const from = String(e.name ?? '').replace(/ \(.*\)$/, '');
          if (!to || e.part) return; // the user's part keeps its name on a borrow (the hag's Nails stayed Nails, not print's Claw — step 8)
          // the print row's TYPE and RIDER ride along (a wolf's Bite is Piercing and
          // knocks Prone; ours dealt Poison — critic 2026-09-28); the seat's energy
          // rider leaves a plain print creature
          if (pr.type) e.text = e.text.replace(/(\d+ \(\d+d\d+(?: \+ \d+)?\)) ([A-Z][a-z]+) damage/, `$1 ${pr.type} damage`);
          if (pc.exact && nearPrintCr(cr, pc.cr) && pr.dmg) e.text = e.text.replace(/\d+ \(\d+d\d+(?: [+-] \d+)?\)/, printExprWithSheetMod(pr.dmg, e.text, scaled.pb)); // an exact print body AT PRINT'S CR deals print's own dice — above it the chassis's solved dice stand (a CR 5 wolf kept the Wolf's 1d6, 12 a round against 40 — canaries 2026-10-12); the flat bonus is the sheet's (the 2014 goblin fits DEX to +1 where print carries +2 — the derivation gate reads the sheet) // print's own physical type, whatever the seat dealt (the Wight's sword is Slashing plus Necrotic)
          if (pr.hybrid && pr.range && !/Melee or Ranged/.test(e.text)) { e.text = e.text.replace(/\*?Melee Attack Roll:\*? (\+\d+(?: \([^)]*\))?), reach (\d+) ft\./, `*Melee or Ranged Attack Roll:* $1, reach $2 ft. or range ${pr.range} ft.`); trace('print canon attack:', `"${to}" keeps print's hybrid frame — reach ${pr.reach ?? 5} ft. or range ${pr.range} ft. (the ${pc.name}'s weapon is thrown)`); } // print's own thrown weapon is a hybrid row (the critic's third species read)
          if (pr.note && !e.text.includes(pr.note)) e.text = e.text.replace(/(Melee Attack Roll:\*? \+\d+)/, `$1 ${pr.note}`); // print's roll parenthetical rides along (the Doppelganger's first-round Advantage)
          if (printBody && pr.reach && !new RegExp(`reach ${pr.reach} ft`).test(e.text)) e.text = e.text.replace(/reach \d+ ft\./, `reach ${pr.reach} ft.`); // print's reach on a print body (the Wight's sword at reach 10)
          e.text = e.text.replace(/ plus \d+ \(\d+d\d+(?: \+ \d+)?\) [A-Z][a-z]+ damage/, '');
          // print's row carries print's rider and no other: the chassis's condition clause leaves (the Lich's Paralyzing Touch poisoned and its Eldritch Burst grew a rider on the caster chassis — critic's regressions brief 2026-10-04)
          e.text = e.text.replace(/,? and (?:the target|it) has the \{?[A-Za-z_]+\}? condition[^.]*\.?/, '.').replace(/\s*If the target [^.]*has the \{?[A-Za-z_]+\}? condition[^.]*\.?/, '').replace(/\.\.$/, '.').replace(/\s+$/, ''); // the chassis rider may still carry its {condition_minor} token here
          if (pr.rider && /^plus \d+ \(/.test(pr.rider) && !/ plus \d+ \(/.test(e.text)) e.text = e.text.replace(/(\d+ \(\d+d\d+(?: \+ \d+)?\) (?:Bludgeoning|Piercing|Slashing) damage)/, `$1 ${pr.rider.replace(/\.$/, '')}`); // a "plus N (XdY) T damage" clause is the damage line's own, no period before it (the Wight's Necrotic Sword)
          else if (pr.rider) e.text = `${e.text.trim().replace(/[.,]$/, '')}${/^(?:and|or|plus)\b/i.test(pr.rider) ? ',' : '.'} ${asInline(pr.rider)}`;
          if (from === to || meleeRows.some((o) => o !== e && String(o.name ?? '').replace(/ \(.*\)$/, '') === to)) return;
          const re = new RegExp(`(?<![A-Z][a-z]+ )\\b${from.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b(?! [A-Z][\\w'-]+)`, 'g'); // nor as the HEAD of a two-word name: "Scepter" -> "Eldritch Burst" turned the hybrid "Scepter Blast" into "Eldritch Burst Blast" (sweep 2026-10-04) // not inside a two-word ranged name: "Hurled Knife" is the ranged row's to rename (the Bandit's Multiattack read "Hurled Scimitar", day-one 2026-09-30)
          e.name = to; e.printNamed = true; // print's name, print's numbers from here: the final price pass leaves it (the Green Dragon's Rend ran 15 → 24, step 7 defect 4)
          for (const es3 of Object.values(monster.sections)) for (const e3 of es3) if (e3 !== e && re.test(e3.text ?? '')) e3.text = e3.text.replace(re, to);
          trace('print canon attack:', `"${from}" -> "${to}" — the ${pc.name}'s own row`);
        });
        // ONE PRINT MELEE ROW, ONE ROW: a chassis's second melee row on a print body with a single melee row
        // leaves (the Shield Guardian has Fist; the chassis's Shattering Blow stood beside it wearing the same
        // text — "Heavy Fist", goldens 2026-10-03); Multiattack reads print's "makes two Fist attacks"
        if (printBody && pc.meleeRows.length === 1 && meleeRows.length > 1) {
          const keep = meleeRows[0]; const extra = meleeRows.slice(1).filter((e) => !e.print && !e.rules && !e.engine && !e.part); // the user's own part stays beside print's one melee row (Grik's Nasty Bite left the Kobold Warrior, sprint run 2026-10-12)
          for (const e of extra) for (const es3 of Object.values(monster.sections)) { const ix = es3.indexOf(e); if (ix !== -1) es3.splice(ix, 1); }
          for (const e of extra) { const bare = String(e.name ?? '').replace(/ \(.*\)$/, ''); const re = new RegExp(`\\b${bare.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'g'); for (const es3 of Object.values(monster.sections)) for (const e3 of es3) if (re.test(e3.text ?? '')) e3.text = e3.text.replace(re, keep.name); }
          const ma = Object.values(monster.sections).flat().find((o) => o.name === 'Multiattack');
          if (ma) ma.text = ma.text.replace(/makes (\w+) attacks, using [^.]*? in any combination/, `makes $1 ${keep.name} attacks`);
          if (extra.length) trace('print canon rows:', `${extra.map((e) => e.name).join(', ')} leave — the ${pc.name} has one melee row (${keep.name}), and Multiattack reads print's`);
        }
        if (pc.exact && pc.multiattack) { // print's Multiattack, count and names, stands on an exact body; the creature's phrase becomes the sheet's inline
          const ma = Object.values(monster.sections).flat().find((o) => /^Multiattack/.test(o.name ?? ''));
          const lastRe = new RegExp(`\\b(?:the|The) (?:\\w+ )?${String(pc.last ?? '').replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'g');
          const printMa = String(pc.multiattack).replace(lastRe, (m0) => (/^The/.test(m0) ? inline.charAt(0).toUpperCase() + inline.slice(1) : inline));
          if (ma && pc.last) { const was = ma.text; ma.text = printMa; if (ma.text !== was) trace('print canon multiattack:', `"${ma.text}" — the ${pc.name}'s own`); }
          else if (!ma && pc.last) { (monster.sections.Actions = monster.sections.Actions ?? []).unshift({ name: 'Multiattack', text: printMa, print: true }); trace('print canon multiattack:', `"${printMa}" — the ${pc.name}'s own, added (the chassis carried none; the Owlbear makes two Rend attacks — canaries 2026-10-12)`); }
        }
        const rangedRows = Object.values(monster.sections).flat().filter((e) => /Ranged Attack Roll/.test(e.text ?? ''));
        const RANGED_WORD = /\b(?:bow|bows|longbow|shortbow|crossbow|crossbows|sling|slings|arrow|arrows|bolt|bolts|dart|darts|javelin|javelins|spear|spears|throw|throws|thrown|hurl|hurls|hurled|fling|flings|shoot|shoots|shot|ranged|pistol|musket|firearm|gun|guns|rifle|breath|spit|spits|spews?)\b/i;
        if (pc.meleeRows.length && !pc.rangedRows.length && !RANGED_WORD.test(readPhrases(String(options.userConcept ?? concept ?? '')))) { // print carries no pure ranged row and the GM named none: the chassis's leaves (the Gladiator body grew a Crossbow at 80/320 — the critic's third species read)
          for (const [secX, esX] of Object.entries(monster.sections)) for (let i = esX.length - 1; i >= 0; i -= 1) { const e = esX[i]; if (!e || e.part || e.print || e.rules || e.kit || !/Ranged Attack Roll/.test(e.text ?? '') || /Melee or Ranged/.test(e.text ?? '')) continue; esX.splice(i, 1); trace('ranged row off:', `"${e.name}" leaves — the ${pc.name} carries no ranged row and the words name none`); sweepDeadName(monster.sections, e.name, null, trace); }
        }
        const rangedRows2 = Object.values(monster.sections).flat().filter((e) => /Ranged Attack Roll/.test(e.text ?? ''));
        rangedRows2.forEach((e, i) => {
          if (e.part) return;
          const prr = pc.rangedRows[Math.min(i, pc.rangedRows.length - 1)]; const to = prr?.name; const from = String(e.name ?? '').replace(/ \(.*\)$/, '');
          if (prr?.range) e.text = e.text.replace(/range \d+\/\d+ ft\./, `range ${prr.range} ft.`); // print's range for print's weapon (a Longbow is 150/600, not 30/90)
          if (prr?.type && DAMAGE_TYPES.includes(prr.type)) e.text = e.text.replace(/(\d+ \(\d+d\d+(?: [+-] \d+)?\)) ([A-Z][a-z]+) damage/, `$1 ${prr.type} damage`);
          const printNear = nearPrintCr(cr, pc.cr);
          const pbDiffR = Number.isFinite(pc.pb) ? scaled.pb - pc.pb : 0; // print's bonus on this sheet's PB
          if (pc.exact && printNear && prr?.dmg && Number.isFinite(prr.bonus)) { // an EXACT body at print's CR carries print's own ranged row — bonus, dice and range verbatim (the Stone Golem's Force Bolt is +9, 22 (4d10) at 120 ft., not the chassis's +10, 7d6 + 6 at 60/240 — canaries 2026-10-12)
            e.text = e.text.replace(/(Attack Roll:\*? )\+\d+/, `$1+${prr.bonus + pbDiffR}`).replace(/\d+ \(\d+d\d+(?: [+-] \d+)?\)/, prr.dmg);
            trace('print canon attack:', `"${to}" is print's own row — +${prr.bonus}, ${prr.dmg}${prr.range ? `, range ${prr.range} ft.` : ''} (an exact body at print's CR)`);
          }
          // a print row is exempt from the gates that ran before it: the weapon table rolled the Stone Golem's Force Bolt off DEX 9 (+3, 7d6 - 1) — at print's CR the row carries print's attack bonus and the striker's damage bonus (critic form-ten 2026-10-01)
          else if (prr && to && Number.isFinite(pc.atk) && printNear) {
            const atkHere = pc.atk + pbDiffR; const modP = atkHere - scaled.pb;
            e.text = e.text.replace(/(Attack Roll:\*? )\+\d+/, `$1+${atkHere}`).replace(/(\d+) \((\d+d\d+) [+-] (\d+)\)/, (m0, avg, dice, b, off, str) => { const old = /- \d+\)/.test(m0) ? -Number(b) : Number(b); return `${Number(avg) - old + modP} (${dice}${modP >= 0 ? ` + ${modP}` : ` - ${-modP}`})`; });
            trace('print canon attack:', `"${to}" rolls print's +${atkHere} with ${modP >= 0 ? '+' : ''}${modP} damage — a print row stands outside the weapon table`);
          }
          if (prr && /Melee or Ranged Attack Roll/.test(e.text)) e.text = e.text.replace(/\*?Melee or Ranged Attack Roll:\*?/, '*Ranged Attack Roll:*').replace(/reach \d+ ft\. or range/, 'range'); // print's ranged row is ranged-only: the chassis's hybrid frame dressed the Knight's Heavy Crossbow with "reach 5 ft. or" (the critic's species read)
          e.print = true;
          if (!to || from === to) return;
          const re = new RegExp(`\\b${from.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'g');
          e.name = to; e.printNamed = true;
          for (const es3 of Object.values(monster.sections)) for (const e3 of es3) if (e3 !== e && re.test(e3.text ?? '')) e3.text = e3.text.replace(re, to);
          trace('print canon attack:', `"${from}" -> "${to}" — the ${pc.name}'s own ranged row`);
        });
      }
    }
    for (const c of honestAttackNames(monster.sections, { projectile: p.projectile ?? null })) {
      trace('attack name by anatomy:', `"${c.from}" -> "${c.to}" — ${c.why}`);
      // a RENAMED row is not a dead row: every row that cites the old name
      // (the Multiattack above all) now cites the new one. The sweep here
      // deleted the citing sentence instead — the bog troll's Multiattack was
      // "only about Fist" and dropped, halving a CR 7 brute (27 lifetime
      // drops in smoke-out, critic 2026-09-27)
      if (c.from !== c.to) {
        const fromBare = c.from.replace(/ \(.*\)$/, '');
        // a row name NESTED in another row's name does not propagate into it: renaming "Shard" to "Slam" rewrote the
        // Multiattack's "Mirror Shard" as "Mirror Slam" and named a row that does not exist (critic's blockers audit 2026-10-03)
        const namesN = Object.values(monster.sections).flat().map((e3) => String(e3.name ?? '').replace(/ \(.*\)$/, '')).filter((n3) => n3 !== fromBare); const escN = fromBare.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const nestedAfter = namesN.some((n3) => new RegExp(`\\s${escN}$`).test(n3)); const nestedBefore = namesN.some((n3) => new RegExp(`^${escN}\\s`).test(n3)); // "Mirror Shard" nests "Shard" after; "Scepter Blast" nests "Scepter" before (sweep 2026-10-04)
        const re = new RegExp(`${nestedAfter ? '(?<![A-Z][\\w\'-]+ )' : ''}\\b${escN}\\b${nestedBefore ? '(?! [A-Z][\\w\'-]+)' : ''}`, 'g');
        for (const es3 of Object.values(monster.sections)) for (const e3 of es3) if (re.test(e3.text ?? '')) { e3.text = e3.text.replace(re, c.to); trace('rename propagated:', `"${fromBare}" -> "${c.to}" in "${e3.name}"`); }
      }
    }
    const vulBefore = monster.vulnerabilities; const fd = honestFireDefenses(monster, { material: options.material ?? null, concept: options.userConcept ?? concept });
    if (fd && !VULN_CUE.test(String(options.userConcept ?? concept ?? ''))) { monster.vulnerabilities = vulBefore; trace('defenses by material:', `${fd} — the resistance is withheld; the vulnerability is the GM's to type (the Frostmaw carried a Fire vulnerability nobody typed — the critic's second species read)`); }
    else if (fd) trace('defenses by material:', fd);
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
    if (monster.languages) {
      monster.languages = String(monster.languages).replace(/\bbut (?:does not|cannot) speak\b/, "but can't speak")
        .replace(/\b[Uu]nderstands all but\b/, 'understands all languages but');
      // "Ignan, understands Dwarvish but can't speak" reads as mute in
      // Ignan — the branch needs its object (critic, 2026-09-10)
      if (/^\w[^;]*,\s*understands [^,]+ but can't speak$/.test(monster.languages)) monster.languages += ' it';
    }
  }
  // DEFENSE DERIVATION (owner + critic, 2026-08-19) — three measured
  // layers. Every rate below is the corpus sweep of 2026-08-19.
  {
    // Layer 1 — type packages, the floor (>=50% of the type in print);
    // hoisted to TYPE_FLOOR (2026-09-10) so the vacuous-resilience
    // guard reads the same header truths the stamp writes
    // a swarm's header is the UNION of the swarm suite and the base
    // type's package (critic 2026-09-13, structural: "Swarm of Tiny
    // Constructs" missed the Construct floor — Poison/Exhaustion/
    // Poisoned dropped; any Swarm of Tiny Undead would lose its
    // package the same way)
    const FLOOR = TYPE_FLOOR[monster.type]
      ?? (/^Swarm of Tiny /.test(monster.type ?? '') ? TYPE_FLOOR[Object.keys(TYPE_FLOOR).find((k) => (monster.type ?? '').includes(k))] : undefined);
    const resist = new Set(FLOOR?.resist ?? []);
    // Layer 1.5 — the donor's own suite (the phantom line, 2026-09-05):
    // print pairs the incorporeal discount WITH a header suite (Specter/
    // Wraith/Ghost all carry Grappled/Paralyzed/Petrified/Prone/
    // Restrained + physical resistances) — the tech that PAYS for the
    // 0.7x HP. Chassis data, unioned over the type floor; the batch-two
    // wildcards were reaching for this in the wrong place.
    const suite = scaled.defense_suite ?? null;
    for (const x of suite?.resist ?? []) resist.add(x);
    // element immunity MERGES INTO the Layer-1 sets below (2026-09-11
    // clobber: the Cistern's Acid immunity traced and then the FLOOR
    // write overwrote the line; dragons survived only because Dragon
    // has no FLOOR entry)
    // ABSORPTION RE-KEY (the Stormwalker, 2026-09-15: a lightning-eater
    // shipped the juggernaut's hard-typed Fire Absorption beside a
    // derived Lightning resistance): the donor's absorption organ obeys
    // the concept's energy like every other typed row. Print pairs
    // absorption with immunity (Iron Golem: Fire Absorption + immune
    // Fire), so the absorbed type joins the immunity write — and the
    // dealt-type resistance derivation already defers to immunities.
    let absorbedEnergy = null;
    for (const eAbs of sections.Traits ?? []) {
      const am = /^(\w+) Absorption$/.exec(eAbs.name ?? '');
      if (!am) continue;
      if (options.energy && DAMAGE_TYPES.includes(options.energy) && am[1] !== options.energy) {
        eAbs.name = `${options.energy} Absorption`;
        eAbs.text = eAbs.text.split(am[1]).join(options.energy);
        trace('absorption re-keyed:', `${am[1]} -> ${options.energy} (the donor organ obeys the concept energy)`);
      }
      absorbedEnergy = /^(\w+) Absorption$/.exec(eAbs.name)[1];
    }
    // a body's MATERIAL weakness outranks its element: a puddle of lamp-oil that
    // deals Fire is vulnerable to Fire, never immune (the header printed both,
    // critic fresh four 2026-09-28 — second sighting after the scarecrow)
    const materialWeak = materialVulnerability(options.userConcept ?? concept, options.material ?? null)?.vulnerability ?? null;
    const elementImmunity = ['dragon', 'ooze'].includes(options.bodyType) && options.energy && options.energy !== materialWeak ? options.energy : null;
    if (['dragon', 'ooze'].includes(options.bodyType) && options.energy && options.energy === materialWeak) trace('element immunity withheld:', `${options.energy} — the body's material is vulnerable to it`);
    // the breath save stat keys by ELEMENT (print: White Cold = Con,
    // Red Fire = Dex, Green Poison = Con; critic 2026-09-11 — nothing
    // mental uses Dex)
    if (options.bodyType === 'dragon' && options.energy) {
      const BREATH_STAT = { Fire: 'Dexterity', Lightning: 'Dexterity', Acid: 'Dexterity', Radiant: 'Dexterity', Force: 'Dexterity', Cold: 'Constitution', Poison: 'Constitution', Necrotic: 'Constitution', Thunder: 'Constitution', Psychic: 'Wisdom' };
      const st = BREATH_STAT[options.energy];
      if (st && st !== 'Dexterity') {
        for (const es of Object.values(monster.sections ?? {})) {
          for (const e of es) {
            if (/foot Cone/.test(e.text) && /Recharge/.test(e.name)) e.text = e.text.replace('*Dexterity Saving Throw*', `*${st} Saving Throw*`);
          }
        }
      }
    }
    // dragons are IMMUNE to their own element, not resistant (42/42
    // print true dragons; body-type sweep 2026-09-11) — and so are
    // oozes (Pudding and Cube are Acid-immune, 2/2 print dealers)
    if (elementImmunity) { resist.delete(elementImmunity); trace('element immunity:', `${elementImmunity} (merged into the header write)`); }
    // dragon SENSES are tiered like the cones (critic 2026-09-13: an
    // adult on the correct chassis shipped blindsight 30 — young-tier;
    // print: wyrmling 10/60, young 30/120, adult+ 60/120). Upgrade-only
    // — concept senses (the Geode's tremorsense) survive untouched.
    if (options.bodyType === 'dragon' && monster.senses) {
      const [bsF, dvF] = options.cr <= 4 ? [10, 60] : options.cr <= 12 ? [30, 120] : [60, 120];
      for (const [label, floorV] of [['blindsight', bsF], ['darkvision', dvF]]) {
        const sm = new RegExp(`${label} (\\d+)`, 'i').exec(monster.senses);
        if (sm && Number(sm[1]) < floorV) {
          monster.senses = monster.senses.replace(sm[0], `${label} ${floorV}`);
          trace('dragon senses raised to tier:', `${label} ${sm[1]} -> ${floorV}`);
        } else if (!sm) {
          monster.senses = `${label} ${floorV} ft., ${monster.senses}`;
          trace('dragon senses raised to tier:', `${label} ${floorV} added`);
        }
      }
    }
    // a dragon's SPELL save DC derives from Charisma, not the breath DC
    // (print: Adult White spell save DC 14 = 8 + PB + Cha mod, beside a
    // DC 22 breath; the spell-dc-ability lint caught the card-DC stamp
    // live, 2026-09-14)
    if (options.bodyType === 'dragon' && monster.stats) {
      const chaDc = 8 + (monster.pb ?? 0) + Math.floor(((monster.stats.CHA ?? 10) - 10) / 2);
      for (const es2 of Object.values(monster.sections ?? {})) {
        for (const e2 of es2) {
          if (e2.name?.startsWith('Spellcasting') && /spell save DC \d+/.test(e2.text ?? '')) {
            e2.text = e2.text.replace(/spell save DC \d+/, `spell save DC ${chaDc}`);
            trace('dragon spell DC derived:', `${chaDc} (8 + PB + Cha mod — the breath keeps the card DC)`);
          } else if (/(?:Frightened|Charmed|Incapacitated)\b/.test(e2.text ?? '') && /Saving Throw|saving throw/.test(e2.text ?? '') && !/\d+ \(\d+d\d+/.test(e2.text ?? '')) {
            // mental condition, no damage: the Frightful Presence class
            // — Cha-derived in print (critic 2026-09-14: DC 19 breath
            // DC on Congealing Glare and Winter's Grasp, 2 over)
            e2.text = e2.text.replace(/DC \d+/, `DC ${chaDc}`);
            trace('dragon mental save DC derived:', `"${e2.name}" -> ${chaDc} (the Frightful Presence class keys to Charisma)`);
          }
        }
      }
    }
    // a dragon speaks Draconic (42/42 print; the First Frost shipped
    // "Common" alone, 2026-09-13) — upgrade-only
    if (options.bodyType === 'dragon' && !/Draconic/i.test(monster.languages ?? '')) {
      monster.languages = monster.languages && !/^(?:None|—)$/i.test(monster.languages.trim()) ? `${monster.languages}, Draconic` : 'Draconic';
      trace('dragon languages:', 'Draconic added (42/42 print dragons speak it)');
    }
    // the Cube engulfs its OWN size or smaller (print: a Large cube
    // takes "Large or smaller"); the engine's authored rows say Medium
    // — stamp the block's real size (critic 2026-09-13)
    if (options.bodyType === 'ooze' && monster.size) {
      for (const es2 of Object.values(monster.sections ?? {})) {
        for (const e2 of es2) {
          if (e2.text?.includes('Medium or smaller creatures')) e2.text = e2.text.replace('Medium or smaller creatures', `${monster.size} or smaller creatures`);
        }
      }
    }
    {
      const d = [...new Set([...(FLOOR?.damage ?? []), ...(suite?.damage ?? []), ...(elementImmunity ? [elementImmunity] : []), ...(absorbedEnergy ? [absorbedEnergy] : [])])].sort();
      const c = [...new Set([...(FLOOR?.conditions ?? []), ...(suite?.conditions ?? []), ...(floatingOrb ? ['Prone'] : [])])].sort(); // a floating orb cannot be knocked Prone
      if (d.length || c.length) {
        monster.immunities = d.join(', ') + (c.length ? `${d.length ? '; ' : ''}${c.join(', ')}` : '');
        trace('immunities stamped for type:', `${monster.type}${suite ? ' + donor suite' : ''} -> ${monster.immunities}`);
      }
      // PRINT'S HEADER DEFENSES stand on a print body (the Pit Fiend is immune to Fire where the type stamp read Poison; the critic's release audit 2026-10-03)
      if (printBody && pcPlain) {
        const stamped = [];
        for (const k of ['immunities', 'resistances', 'vulnerabilities']) if (pcPlain[k]) { if (monster[k] !== pcPlain[k]) stamped.push(`${k} ${monster[k] || 'none'} -> ${pcPlain[k]}`); monster[k] = pcPlain[k]; }
        if (stamped.length) trace('print canon defenses:', `${stamped.join('; ')} — the ${pcPlain.name}'s own header lines`);
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
      // condition immunity is HEADER vocabulary (critic 2026-09-15, the
      // Sludgehold's "ignores the effects of Exhaustion"): a shipped
      // flavor immunity moves to the Immunities line and its clause
      // strips — print writes these in the header, never in prose
      const CONDS2 = 'Charmed|Frightened|Paralyzed|Petrified|Poisoned|Stunned|Blinded|Deafened|Exhaustion|Prone|Grappled|Restrained';
      const cm = new RegExp(`(?:is immune to|ignores?)(?: the effects of)? (?:the )?(${CONDS2})(?: condition)?`).exec(e.text ?? '');
      if (cm) {
        if (!(monster.immunities ?? '').includes(cm[1])) {
          monster.immunities = monster.immunities
            ? (monster.immunities.includes(';') ? `${monster.immunities}, ${cm[1]}` : `${monster.immunities}; ${cm[1]}`)
            : cm[1];
          trace('trait-granted condition immunity merged into header:', cm[1]);
        }
        const clause = new RegExp(`,? and (?:is immune to|ignores?)(?: the effects of)? (?:the )?${cm[1]}(?: condition)?`);
        const sentence = new RegExp(`[^.!?]*(?:is immune to|ignores?)(?: the effects of)? (?:the )?${cm[1]}(?: condition)?[^.!?]*[.!?]\\s*`);
        e.text = (clause.test(e.text) ? e.text.replace(clause, '') : e.text.replace(sentence, '')).trim();
      }
    }
    for (const [secC, esC] of Object.entries(monster.sections ?? {})) {
      for (let j = esC.length - 1; j >= 0; j -= 1) {
        if (secC === 'Traits' && !(esC[j].text ?? '').trim()) { esC.splice(j, 1); trace('emptied trait dropped —', 'its only clause moved to the header'); }
      }
    }
    for (const v of String(monster.vulnerabilities ?? '').split(/,\s*/).filter(Boolean)) resist.delete(v); // a material vulnerability is never also a resistance
    if (energyWithheld && resist.has(energyWithheld)) { resist.delete(energyWithheld); trace('resistance withheld:', `${energyWithheld} — the energy was withheld; a name is not a warrant`); }
    if (resist.size) {
      monster.resistances = [...resist].sort().join(', ');
      trace('resistances derived:', monster.resistances);
    }
    // NAME CANON (owner 2026-09-15, the regen-less Cliff Troll: "it is
    // a troll"): six name-words carry a print-universal trait promise
    // the table will miss (corpus: troll 2/2 Regeneration, zombie 2/2
    // Undead Fortitude, golem 4/4 Immutable Form + Magic Resistance,
    // devil 6/6 Magic Resistance, spider 4/4 Spider Climb, mephit 4/4
    // Death Burst). Deterministic print text — no call, never-fail,
    // engine numbers. Matching: the shipped NAME plus the concept's
    // HEAD (cut at the first relative marker, so "a knight who hunts
    // trolls" never fires).
    {
      const head = String(concept ?? '').split(/\s+(?:that|who|which)\s+|,/i)[0];
      const source = `${monster.name} ${head}`;
      const hasRow = (re) => Object.values(sections).flat().some((e) => re.test(String(e.name ?? '').replace(/ \(.*\)$/, ''))); // NAMES only — a trait's text that mentions "Shape-Shift" hid print's own Shape-Shift row (the Vampire, checker 2026-10-02)
      // a canon cue the resolve REJECTED on the sentence never re-applies off
      // the shipped name (the troll-HUNTING knight named "Troll-Tooth Knight"
      // was stamped Regeneration, 2026-09-21)
      const skip = new Set((options.rejectedCanon ?? []).map((x) => String(x).toLowerCase()));
      const Inline = inline.charAt(0).toUpperCase() + inline.slice(1);
      const canon = [];
      if (!skip.has('troll') && /\btrolls?\b/i.test(source) && !hasRow(/\bRegeneration\b|regains \d+ Hit Points at the start/i)) {
        // print pegs the rate: 5 at CR 1/2 (Troll Limb), 15 at CR 5 (Troll)
        const rate = cr <= 1 ? 5 : cr <= 4 ? 10 : cr <= 9 ? 15 : 20;
        const off = ['Acid', 'Fire'].filter((t) => !(monster.immunities ?? '').includes(t) && !(monster.resistances ?? '').includes(t));
        if (off.length < 2) off.push('Cold'); // the off-switch stays LIVE — a type the sheet shrugs at is no counterplay
        canon.push({ name: 'Regeneration', text: `${Inline} regains ${rate} Hit Points at the start of each of its turns. If ${inline} takes ${off.join(' or ')} damage, this trait doesn't function on ${inline}'s next turn. ${Inline} dies only if it starts its turn with 0 Hit Points and doesn't regenerate.` });
      }
      if (!skip.has('zombie') && /\bzombies?\b/i.test(source) && !hasRow(/Undead Fortitude|drops to 1 Hit Point instead/i)) {
        canon.push({ name: 'Undead Fortitude', text: `If damage reduces ${inline} to 0 Hit Points, it makes a Constitution saving throw (DC 5 plus the damage taken) unless the damage is Radiant or from a Critical Hit. On a successful save, ${inline} drops to 1 Hit Point instead.` });
      }
      if (!skip.has('golem') && /\bgolems?\b/i.test(source) && !hasRow(/Immutable Form|can't shape-shift/i)) {
        canon.push({ name: 'Immutable Form', text: `${Inline} can't shape-shift.` });
      }
      if (!(skip.has('golem') && !/\bdevils?\b/i.test(source)) && /\b(?:golems?|devils?)\b/i.test(source) && !hasRow(/Magic Resistance|Advantage on saving throws against spells/i)) {
        canon.push({ name: 'Magic Resistance', text: `${Inline} has Advantage on saving throws against spells and other magical effects.` });
      }
      if (!skip.has('spider') && /\bspiders?\b/i.test(source) && !hasRow(/Spider Climb|climb difficult surfaces/i)) {
        canon.push({ name: 'Spider Climb', text: `${Inline} can climb difficult surfaces, including along ceilings, without needing to make an ability check.` });
      }
      if (!skip.has('mephit') && /\bmephits?\b/i.test(source) && !hasRow(/Death Burst|explodes when it dies/i)) {
        const dice = cr < 1 ? '5 (2d4)' : cr <= 3 ? '7 (2d6)' : cr <= 8 ? '14 (4d6)' : '21 (6d6)';
        canon.push({ name: 'Death Burst', text: `${Inline} explodes when it dies. *Dexterity Saving Throw*: DC ${scaled.dc}, each creature in a 5-foot Emanation originating from ${inline}. *Failure:* ${dice} ${options.energy ?? 'Fire'} damage. *Success:* Half damage.` });
      }
      for (const row of canon) {
        (sections.Traits = sections.Traits ?? []).push(row);
        trace('name-canon trait stamped:', `${row.name} (the name says so; print says what it does)`);
      }
      // PRINT CANON: a plain prompt that names a print creature carries that
      // block's own traits — the wolf's Pack Tactics is the wolf
      const pc = printCanonHere(options.userConcept ?? concept, cr);
      if (pc && !skip.has(pc.last)) { // a rejected canon cue (the resolve said "not a troll") rejects the print block too
        for (const t of pc.traits) {
          const sameName = Object.values(sections).flat().find((e) => String(e.name ?? '').replace(/ \(.*\)$/, '').toLowerCase() === String(t.name).replace(/ \(.*\)$/, '').toLowerCase());
          if (sameName && sameName.rules && !/^Regeneration/i.test(t.name)) continue; // an ENGINE rules row (Corrosive Form, Trample) keeps the body's own text; Regeneration takes print's number
          if (sameName) { const tx = asInline(t.text); if (sameName.text !== tx) { trace('print canon trait:', `${t.name} — print's text replaces the chassis's (the Troll regenerates 15, not the chassis's 10 — critic's audit 2026-10-02)`); sameName.text = tx.charAt(0).toUpperCase() + tx.slice(1); sameName.print = true; } continue; }
          const text = asInline(t.text);
          (sections.Traits = sections.Traits ?? []).push({ name: t.name, text: text.charAt(0).toUpperCase() + text.slice(1), rules: true, print: true }); // print's trait is print (the Vampire's Weakness and Misty Escape tripped the gates, checker 2026-10-02)
          trace('print canon trait:', `${t.name} — "${options.userConcept ?? concept}" is the ${pc.name} (print's own row)`);
        }
        // the print body's row set is CLOSED: a chassis bonus action or reaction the
        // print block does not carry leaves (the skulker's Umbral Step on a Wight)
        if (printBody && !pc.addsSeat && !(pc.rulesRows ?? []).some((r) => / \((?:Recharge [\d–-]+|\d\/Day)\)$/.test(r.name) && /Saving Throw/.test(r.text ?? ''))) { // a print NOVA is a gated save row; a 3/Day blessing is not one; a seat the user's words named keeps its nova (the Worg's Charge left the Goblin Boss, critic form-ten 2026-10-01)
          const esA = sections.Actions ?? [];
          for (let i = esA.length - 1; i >= 0; i -= 1) {
            const row = esA[i];
            if (row.library || row.print || !/\(Recharge [\d–-]+\)|\d\/Day/.test(row.name ?? '') || !/Saving Throw/.test(row.text ?? '')) continue;
            trace('print canon: chassis row leaves —', `Actions/"${row.name}" is the seat's nova, not the ${pc.name}'s`);
            const bareN = String(row.name).replace(/ \(.*\)$/, '').replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            esA.splice(i, 1);
            for (const e2 of Object.values(sections).flat()) if (e2.name === 'Multiattack' && new RegExp(`\\b${bareN}\\b`).test(e2.text ?? '')) e2.text = e2.text.replace(new RegExp(`[^.!?]*\\b${bareN}\\b[^.!?]*[.!?]\\s*`), '').trim();
          }
        }
        // print's own LEGENDARY rows stand where the chassis's stood (the Adult Green has Mind Invasion, Noxious Miasma and Pounce — the critic's audit 2026-10-02); the melee row already carries print's name, so "makes one Rend attack" resolves
        if (printBody && (pc.legendaryRows ?? []).length && (sections['Legendary Actions'] ?? []).length) {
          const uses = sections['Legendary Actions'].filter((e) => /^Legendary Action Uses/.test(e.name ?? ''));
          sections['Legendary Actions'] = [...uses, ...pc.legendaryRows.map((r) => { const tx = asInline(r.text).replace(/\bDC \d+\b/g, `DC ${scaled.dc}`); return { name: r.name, text: tx.charAt(0).toUpperCase() + tx.slice(1), rules: true, print: true }; })];
          trace('print canon legendary:', `${pc.legendaryRows.map((r) => r.name).join(', ')} — the ${pc.name}'s own kit stands where the chassis's stood`);
        }
        for (const secC of printBody ? ['Bonus Actions', 'Reactions', ...(pc.addsSeat && scaled.style ? [] : ['Traits'])] : []) { // a named seat that stood down at the route is the plain chassis — its trait leaves too ("Winged Dive" on the Owlbear, third roll) // the seat's trait leaves with its bonus action ("Woodland Prowler" on the Owlbear, "Scuttle" on the kobold — critic form-ten 2026-10-01); a seat the user named keeps both
          if ((pc.rulesRows ?? []).some((r) => r.section === secC)) continue;
          const esC = sections[secC] ?? [];
          const seatTraitNames = ['Mobility Trait', 'Flyby Trait'].map((k) => renamed.get(k)).filter(Boolean); // `was` is gone by now (deleted after the rename pass); the rename map still knows the seat's trait
          for (let i = esC.length - 1; i >= 0; i -= 1) if (!esC[i].library && !esC[i].print && (secC !== 'Traits' || (seatTraitNames.includes(esC[i].name) && !esC[i].template))) { trace('print canon: chassis row leaves —', `${secC}/"${esC[i].name}" is the seat's, not the ${pc.name}'s`); esC.splice(i, 1); }
        }
        // and print's rules rows in the other sections, at the sheet's own DC
        for (const r of pc.rulesRows ?? []) {
          const sameRules = Object.values(sections).flat().find((e) => String(e.name ?? '').replace(/ \(.*\)$/, '').toLowerCase() === String(r.name).replace(/ \(.*\)$/, '').toLowerCase());
          if (sameRules && /^Spellcasting$/i.test(r.name)) { // print's spell list is print's identity: on the caster chassis the Lich carried Ray of Sickness and Blight, not Finger of Death and Power Word Kill (critic's regressions brief 2026-10-04)
            const named0 = /using (Strength|Dexterity|Constitution|Intelligence|Wisdom|Charisma) as the spellcasting ability/.exec(r.text)?.[1]; const K0 = { Strength: 'STR', Dexterity: 'DEX', Constitution: 'CON', Intelligence: 'INT', Wisdom: 'WIS', Charisma: 'CHA' };
            const dc0 = named0 && scaled.stats ? 8 + scaled.pb + Math.floor(((scaled.stats[K0[named0]] ?? 10) - 10) / 2) : scaled.dc;
            const tx0 = asInline(r.text).replace(/\bDC \d+\b/g, `DC ${dc0}`); sameRules.text = tx0.charAt(0).toUpperCase() + tx0.slice(1); sameRules.print = true; sameRules.rules = true;
            trace('print canon row:', `Actions/Spellcasting — print's own list replaces the chassis's`); continue;
          }
          if (hasRow(new RegExp(r.name.replace(/ \(.*\)$/, '').replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i'))) continue;
          const STAT_KEY = { Strength: 'STR', Dexterity: 'DEX', Constitution: 'CON', Intelligence: 'INT', Wisdom: 'WIS', Charisma: 'CHA' };
          const named = /using (Strength|Dexterity|Constitution|Intelligence|Wisdom|Charisma) as the spellcasting ability/.exec(r.text)?.[1];
          const rowDc = named && scaled.stats ? 8 + scaled.pb + Math.floor(((scaled.stats[STAT_KEY[named]] ?? 10) - 10) / 2) : scaled.dc; // a row that names its stat derives from it (Read Thoughts at DC 14 on Cha 8, critic 2026-09-29)
          const exactHere = !!(pc.exact && nearPrintCr(cr, pc.cr)); const pbDiffP = Number.isFinite(pc.pb) ? scaled.pb - pc.pb : 0; // an exact body at print's CR keeps print's own DC (shifted only by a PB step); the Kraken's Lightning Strike read DC 25 and 58 where print says 23 and 33 (the critic's species read)
          const text = exactHere ? asInline(r.text).replace(/\bDC (\d+)\b/g, (m0, d) => `DC ${Number(d) + pbDiffP}`) : asInline(r.text).replace(/\bDC \d+\b/g, `DC ${rowDc}`);
          const rowP = { name: r.name, text: text.charAt(0).toUpperCase() + text.slice(1), rules: true, print: true };
          // ONE BREATH: print's gated save row and the chassis nova fill the same slot — the chassis nova (priced at this sheet's CR) carries print's name and print's row stays out (Flame Breath beside Fire Breath, critic form-ten 2026-10-01)
          if (/ \((?:Recharge [\d–-]+|\d\/Day)\)$/.test(r.name) && /Saving Throw/.test(r.text ?? '') && /\d+ \(\d+d\d+/.test(r.text ?? '')) {
            const chassisNova = (sections.Actions ?? []).find((o) => !o.library && !o.print && /\(Recharge [\d–-]+\)|\d\/Day/.test(o.name ?? '') && /Saving Throw/.test(o.text ?? ''));
            if (chassisNova) {
              const fromN = chassisNova.name; const bareFrom = fromN.replace(/ \(.*\)$/, ''); const bareTo = r.name.replace(/ \(.*\)$/, '');
              chassisNova.name = r.name; chassisNova.print = true;
              const reN = new RegExp(`\\b${bareFrom.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'g');
              for (const esN of Object.values(sections)) for (const eN of esN) if (eN !== chassisNova && reN.test(eN.text ?? '')) eN.text = eN.text.replace(reN, bareTo);
              trace('print canon nova:', `"${fromN}" -> "${r.name}" — one breath: the chassis nova at this sheet's CR carries the ${pc.name}'s name; print's own row stays out`);
              continue;
            }
          }
          if (!exactHere && /\d+ \(\d+d\d+/.test(rowP.text)) { const vcP = valueCheck(rowP, { scaled, sections, cr, section: r.section }); if (vcP.steps.some((st) => /dice \d+ → \d+/.test(st))) { rowP.text = vcP.text; trace('print canon row priced:', `${r.name} — ${vcP.steps.filter((st) => /dice/.test(st)).join('; ')}`); } } // print's dice stand on an exact body at print's CR
          (sections[r.section] = sections[r.section] ?? []).push(rowP);
          trace('print canon row:', `${r.section}/${r.name} — the ${pc.name}'s own`);
          if (r.section === 'Bonus Actions') for (let bi = sections['Bonus Actions'].length - 1; bi >= 0; bi -= 1) { // the seat's generic bonus action yields to print's (Fleet Agility beside Nimble Escape, critic form-ten 2026-10-01)
            const o = sections['Bonus Actions'][bi];
            if (o !== rowP && !o.library && !o.template && !o.print && !o.wildcard_slot && !o.wildcard) { trace('print canon: chassis row leaves —', `Bonus Actions/"${o.name}" yields to the ${pc.name}'s ${r.name}`); sections['Bonus Actions'].splice(bi, 1); }
          }
        }
      }
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
    const warrantText = readPhrases(`${options.userConcept ?? concept}`).replace(/lightning-(?:fast|quick|swift)|quick as lightning/gi, ''); // fixed phrases first ("fire at will" is no flame) // the USER's words only — the model's lore warranted its own Fire on a shark-shifter (critic 2026-09-29)
    const famRow = NAME_CLAIMS.find(([, t]) => t === vul) ?? (['Lightning', 'Thunder'].includes(vul) ? NAME_CLAIMS.find(([, t]) => t === null) : null);
    const warranted = famRow ? famRow[0].test(warrantText) : new RegExp(`\\b${vul}\\b`, 'i').test(warrantText);
    // print's observed vulnerability set (measured 2026-09-08: Fire 7,
    // Bludgeoning 3, Cold 2, Thunder/Piercing/Radiant 1 each — never
    // Force, Acid, Poison, Necrotic, Psychic; the Gatekeeper shipped
    // Vulnerable Force, near-dead text on a stone gate)
    const PRINT_VULNERABILITY_TYPES = ['Fire', 'Cold', 'Thunder', 'Bludgeoning', 'Piercing', 'Radiant'];
    if (DAMAGE_TYPES.includes(vul) && PRINT_VULNERABILITY_TYPES.includes(vul) && warranted && !new RegExp(`${vul} damage`).test(allText)
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
  // DEAD CONTROL ROWS (critic 2026-09-16, both pipelines, ~1 per block):
  // an Action that deals no damage and delivers no KO-tier condition is
  // never worth the action beside a Multiattack. Print's shape for a
  // control option is the UNGATED (A)/(B) replacement — the dragons'
  // Sleep/Slowing/Weakening Breath carry no Recharge — so a save-framed
  // one sheds its gate and joins the menu built below; a frame-less one
  // (an obscuring zone) becomes a Bonus Action. Model/library rows only;
  // donor-authored control is the chassis's business.
  {
    const KO = /\b(?:Paralyzed|Stunned|Incapacitated|Unconscious|Petrified|Restrained|Grappled)\b/;
    const acts = sections.Actions ?? [];
    for (let i = acts.length - 1; i >= 0; i -= 1) {
      const e2 = acts[i];
      if (!(e2.library || e2.wildcard)) continue;
      const t = e2.text ?? '';
      if (/\d+ \(\d+d\d+/.test(t) || KO.test(t) || /Attack Roll:/.test(t)) continue;
      const framed = /Saving Throw[:*]|must (?:make|succeed on) a DC \d+/.test(t);
      if (framed) {
        const hasMa = Object.values(sections).flat().some((x) => /^Multiattack/.test(x.name ?? '')); // a row sheds its limit TO JOIN a Multiattack: with none to join, the limit stays (an at-will 30-foot Frightened pulse on a CR 3 hermit — the critic's fourth read)
        if (/ \((?:Recharge [\d–-]+|\d\/Day)\)$/.test(e2.name) && hasMa) {
          e2.name = e2.name.replace(/ \((?:Recharge [\d–-]+|\d\/Day)\)$/, ''); e2.gate = undefined;
          trace('dead control row:', `"${e2.name}" sheds its gate — no damage, no KO condition; it joins the Multiattack menu instead`);
        }
      } else {
        acts.splice(i, 1);
        (sections['Bonus Actions'] = sections['Bonus Actions'] ?? []).push(e2);
        trace('dead control row:', `"${e2.name}" moves to Bonus Actions — no damage, no save, no KO condition`);
      }
    }
  }
  {
    const multi = (sections.Actions ?? []).find((e2) => e2.name.startsWith('Multiattack'));
    const hasSpellcasting = (sections.Actions ?? []).some((e2) => e2.name.startsWith('Spellcasting'));
    let saveAction = (sections.Actions ?? []).find((e2) => !e2.name.startsWith('Multiattack') && !e2.name.startsWith('Spellcasting')
      // the or-form dialect counts too (the split tar-splash class,
      // 2026-09-15: "Saving Throw or have..." has no colon and the
      // finder skipped every wrapper sighting)
      && !/\((?:Recharge [\d–-]+|\d\/Day)\)/.test(e2.name) && /Saving Throw[:*]|must (?:make|succeed on) a DC \d+/.test(e2.text ?? '') && !/Attack Roll:/.test(e2.text ?? ''));
    const saveActionNamed = saveAction && new RegExp(`\\b${String(saveAction.name).replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`).test(multi?.text ?? ''); // Multiattack already uses it every turn (the orb's Eye Rays) — no trade to offer
    if (saveActionNamed) saveAction = null;
    if (multi && !/replace one attack/.test(multi.text)) {
      // the clause trades an attack for something done TO THE ENEMY —
      // print's 42 are damage spells (Acid Arrow, Shatter, Guiding
      // Bolt...) and its (A) options are control breaths, so control
      // saves qualify; self-utility never does (the any-non-ribbon
      // fallback traded an attack for Misty Step, 2026-09-16)
      const CLAUSE_CONTROL = new Set(['Hold Person', 'Web', 'Fear', 'Sleep', 'Slow', 'Charm Person', 'Suggestion', 'Blindness/Deafness', 'Bestow Curse', 'Hypnotic Pattern', 'Entangle', 'Faerie Fire']);
      const clauseSpell = atWillShipped.find((x) => SPELL_DAMAGE_AVG[x]) ?? atWillShipped.find((x) => CLAUSE_CONTROL.has(x));
      const spell = hasSpellcasting && clauseSpell ? `Spellcasting to cast *${clauseSpell}*` : null;
      const clause = spell && saveAction ? `It can replace one attack with a use of (A) ${saveAction.name} or (B) ${spell}.`
        : spell ? `It can replace one attack with a use of ${spell}.`
          : saveAction ? `It can replace one attack with a use of ${saveAction.name}.` : null;
      if (clause) {
        multi.text = `${multi.text.replace(/\s*$/, '')} ${clause}`;
        trace('multiattack replacement clause:', clause);
      }
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
  // caps findings self-apply (the Prelate, 2026-09-16: term-caps flagged
  // "speed", the audit rewrite came back a literal no-op — the finding
  // already names the exact span; deterministic fix, no model)
  for (const f of lint.findings.filter((x) => /^(?:term|condition|damage-type|area-term)-caps$/.test(x.rule) && x.loc)) {
    const entry = (sections[f.loc.section] ?? []).find((e) => e.name === f.loc.entry);
    const span = /[Ll]owercase [\w ]+ "([^"]+)"/.exec(f.message ?? f.msg ?? '');
    if (entry && span) {
      const fixed = span[1].split(/\s+/).map((w2) => w2.charAt(0).toUpperCase() + w2.slice(1)).join(' ');
      // hyphenated compounds stay lowercase ("collapse-prone" is not
      // the Prone condition) — the same carve-out capTerms honors
      const esc2 = span[1].replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      entry.text = entry.text.replace(new RegExp(`(?<![-\\w])${esc2}(?![-\\w])`, 'g'), fixed);
      trace('lint actuator:', `capitalized "${span[1]}" -> "${fixed}" in "${f.loc.entry}"`);
    }
  }
  lint.findings = lint.findings.filter((x) => !/^(?:term|condition|damage-type|area-term)-caps$/.test(x.rule));
  // INVENTED CONDITIONS actuate (2026-09-20; release-gate item B): the
  // reskin path has no reject loop, so "has the Surprised condition"
  // shipped twice in 48 smoke blocks — unadjudicable text the lint had
  // already named. The finding carries the token; the sentence goes
  // (an emptied entry goes with it). The vet is the primary guard; this
  // is the backstop for text that reaches lint by another road.
  for (const f of lint.findings.filter((x) => (x.rule === 'phrasing-surprised' || x.rule === 'condition-unknown') && x.loc)) {
    const list = sections[f.loc.section] ?? [];
    const idx = list.findIndex((e2) => e2.name === f.loc.entry);
    if (idx === -1) continue;
    const token = f.rule === 'phrasing-surprised' ? 'surprised' : (/"([^"]+)"/.exec(f.message ?? '') ?? [])[1];
    if (!token) continue;
    const next = stripSentencesWith(list[idx].text, token);
    if (next) { list[idx].text = next; trace('lint actuator:', `dropped the "${token}" sentence from "${f.loc.entry}" (not a 5e condition)`); }
    else { list.splice(idx, 1); trace('lint actuator:', `dropped "${f.loc.entry}" — its only sentence minted "${token}"`); }
  }
  lint.findings = lint.findings.filter((x) => !(x.rule === 'phrasing-surprised' || x.rule === 'condition-unknown'));
  // COMPUTABLE REJECT RULES actuate (2026-09-20; the reskin path has no
  // model-driven correct loop — adding one is a cost decision for the
  // owner — so the rules whose fix is deterministic apply it here):
  // "adjacent" is not 5e vocabulary; a can't-heal swarm loses its heal.
  for (const f of lint.findings.filter((x) => x.rule === 'vocab-adjacent' && x.loc)) {
    const entry = (sections[f.loc.section] ?? []).find((e2) => e2.name === f.loc.entry);
    if (!entry) continue;
    entry.text = entry.text.replace(/\badjacent to\b/g, 'within 5 feet of').replace(/\badjacent\b/g, 'within 5 feet');
    trace('lint actuator:', `"adjacent" -> "within 5 feet" in "${f.loc.entry}"`);
  }
  for (const f of lint.findings.filter((x) => x.rule === 'swarm-heal-contradiction' && x.loc)) {
    const list = sections[f.loc.section] ?? [];
    const idx = list.findIndex((e2) => e2.name === f.loc.entry);
    if (idx === -1) continue;
    const next = list[idx].text.replace(/[^.!?]*\bregains? \d+[^.!?]*Hit Points[^.!?]*[.!?]/gi, '').replace(/\s{2,}/g, ' ').trim();
    if (next) { list[idx].text = next; trace('lint actuator:', `stripped the heal from "${f.loc.entry}" — the Swarm trait says it can't regain Hit Points`); }
    else { list.splice(idx, 1); trace('lint actuator:', `dropped "${f.loc.entry}" — it was only a heal on a swarm that can't heal`); }
  }
  lint.findings = lint.findings.filter((x) => !(x.rule === 'vocab-adjacent' || x.rule === 'swarm-heal-contradiction'));
  // correctable name fixes actuate here too (2026-09-13: the lint
  // computed "Grave-Necrotic Toll" and the reskin path dropped it on
  // the floor — the slot path's correct loop was the only consumer).
  // Closed-vocabulary token swaps only, with cross-references followed.
  for (const f of lint.findings.filter((x) => x.severity === 'correctable' && typeof x.expected === 'string' && x.loc)) {
    const entry = (sections[f.loc.section] ?? []).find((e2) => e2.name === f.loc.entry);
    if (entry && !entry.name_locked) {
      const oldName = entry.name;
      entry.name = f.expected;
      for (const es2 of Object.values(sections)) {
        for (const e2 of es2) { if (e2.text) e2.text = e2.text.split(oldName).join(f.expected); }
      }
      trace('lint actuator rename:', `"${oldName}" -> "${f.expected}"`);
    }
  }
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
      // "(escape DC" joined 2026-09-09 (5th inflection: "is Grappled
      // (escape DC 12)" — the parenthesis dodged the until/for anchor)
      const applyRe = new RegExp(`ha(?:s|ve) the ${c} condition|ha(?:s|ve) the (?:\\w+ and )?${c} conditions?\\b|ha(?:s|ve) the ${c} and \\w+ conditions?\\b|becomes? ${c}\\b|is ${c} (?:until|for)|is (?:\\w+ and )?${c} (?:until|for|and)|is ${c} \\(escape|is (?:also )?${c} of (?:the |its )?\\w+[^.]{0,30}(?:until|for)|is also ${c}\\b|be ${c}\\b|imposes? the ${c} condition`, 'i');
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
    // speed discord (the Steadfast Mender, 2026-09-09: a trait declared
    // "its Speed is 0" beside a Speed 30 header — print puts immobility
    // in the HEADER and drops the clause)
    if (/\b(?:breath|soul|memor\w*|heart|oath|remains|spirit|echo|dead|the living)\b/i.test(monster.languages ?? '')) {
      lint.findings.push({ rule: 'languages-lore-leak', severity: 'audit', message: 'the Languages line is a closed field — move the lore into the description (print writes only languages, telepathy, and the understands-but-can\'t-speak form)' });
    }
    // two save-row grammars on one sheet (critic 2026-09-11: Stitched
    // Arc, Winter's Silence, Bone-Stripping Haze all 2014-form)
    for (const [sec2, es2] of Object.entries(sections)) {
      for (const e2 of es2) {
        if (/must (?:make|succeed on) a DC \d+ [A-Z]\w+ saving throw, (?:taking|or)/i.test(e2.text ?? '') || /\((?:\w+ )?Saving Throw DC \d+ negates\)|\(save negates\)/i.test(e2.text ?? '')) {
          lint.findings.push({ rule: 'phrasing-save-2014', severity: 'audit', message: `${sec2}/${e2.name}: 2014 save grammar — the skeleton is "*<Ability> Saving Throw:* DC n, <target>. *Failure:* <effect>"` });
        }
      }
    }
    // a trait granting a movement mode the header already prints (the
    // Cathedral Gargoyles' "gaining a flying speed" beside Fly 30,
    // 2026-09-14 — the senses class's sibling, header/trait class #5)
    for (const e2 of (sections.Traits ?? [])) {
      const mm = /gain(?:s|ing)? a (fly|climb|swim|burrow)(?:ing)? [Ss]peed/i.exec(e2.text ?? '');
      if (mm && new RegExp(mm[1], 'i').test(monster.speed ?? '')) {
        lint.findings.push({ rule: 'movement-grant-in-trait', severity: 'audit', message: `Traits/${e2.name}: grants a ${mm[1].toLowerCase()} speed the header already prints — movement is header jurisdiction; the day/night gate is fiction for the description` });
      }
    }
    // a trait re-granting a sense the header prints (critic 2026-09-13:
    // the Geode's trait granted conditional tremorsense under an
    // unconditional tremorsense 30 header — senses are header
    // jurisdiction, the fourth header/trait-disagreement class)
    for (const e2 of (sections.Traits ?? [])) {
      const sm = /\b(?:has|gains?|grant(?:s|ing)?(?: it)?) (tremorsense|darkvision|blindsight|truesight)\b/i.exec(e2.text ?? '') ?? (/can see (?:creatures (?:and objects )?that are )?invisible/i.test(e2.text ?? '') ? [null, 'truesight'] : null);
      if (sm && new RegExp(sm[1], 'i').test(monster.senses ?? '')) {
        lint.findings.push({ rule: 'senses-grant-in-trait', severity: 'audit', message: `Traits/${e2.name}: grants ${sm[1].toLowerCase()} the header already prints — senses are header jurisdiction; delete the grant sentence (or move the condition into the header parenthetical)` });
      } else if (sm) {
        // the INVERSE direction (the Dusk Wardens' Stone Shell granted
        // tremorsense the header never carried, 2026-09-14): senses are
        // header jurisdiction in both directions
        lint.findings.push({ rule: 'senses-grant-in-trait', severity: 'audit', message: `Traits/${e2.name}: grants ${sm[1].toLowerCase()} the header does not carry — senses are header jurisdiction; add it to the Senses line (with the condition as a parenthetical) or drop the grant` });
      }
    }
    if (/blind beyond this radius/.test(monster.senses ?? '') && /darkvision/.test(monster.senses ?? '')) {
      lint.findings.push({ rule: 'senses-contradiction', severity: 'audit', message: 'blindsight "(blind beyond this radius)" beside darkvision contradicts itself — drop one' });
    }
    {
      const permanent = permanentSpeedZero(allTexts);
      if (permanent.length && !/^0 ft\./.test(monster.speed ?? '')) {
        lint.findings.push({ rule: 'speed-discord', severity: 'audit', message: `a trait sets Speed 0 permanently while the header says "${monster.speed}" — print puts immobility in the header (Speed 0 ft. or 5 ft.) and deletes the trait clause` });
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
      const libraryBrief = libraryGenericName
        ? `\n\nLIBRARY NOTICE: the entry "${libraryGenericName}" is an engine stand-in wearing a GENERIC name — propose a rename that fits THIS creature's concept (keep its rules text unchanged).`
        : '';
      const rawAudit = await callLLM(buildAuditPrompt(monster, '2024', { reskin: true }) + libraryBrief, validateAuditResponse);
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
        if (Object.values(monster.sections ?? {}).flat().some((e) => (e.part || e.feature || e.print) && String(e.name ?? '').replace(/\s*\(.*\)$/, '') === bare)) { trace('audit rename blocked —', `"${old}" is the user's own part name, a feature's real name, or print's own row`); continue; } // the audit renamed the Pit Fiend's Hellfire Spellcasting to "Spellcasting" (step 8 fix round) // Great Weapon Master shipped as "Heavy Blow" once (step 8 twelve) // the user named it; the audit does not rename it (Razor Sharp Claws → Rending Claws, step 7 twelve)
        let fresh = `${f.rename}${gate}`;
        let applied = false;
        for (const es of Object.values(monster.sections ?? {})) {
          for (const e of es) {
            // match by BARE name and keep the ROW's own gate — the audit echoes
            // names without their gate and a ceiling gate was stripped on
            // rename ("Warden's Beckon." with no Recharge, critic run two)
            const rowBare = String(e.name ?? '').replace(/\s*\(.*\)$/, '');
            if (e.name === old || rowBare === bare) {
              const rowGate = (String(e.name ?? '').match(/\s*\(.*\)$/) ?? [''])[0];
              fresh = `${f.rename}${rowGate || gate}`; e.name = fresh; applied = true;
            }
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
  monster.generation.signature = engineIsSignature ? 'dropped' : libraryDrawn ? 'library' : wcDropped ? 'dropped' : 'none'; // 'none': no slot on this sheet (claim-gated low CR)
  // REMOVALS the concept names in the "no X" form act on the finished block (an Ancient
  // Red at CR 15 with "no legendary actions, no lair", form-ten 2026-10-01)
  for (const gone of removed) {
    if (/^legendary actions?$/.test(gone) && monster.sections?.['Legendary Actions']) { delete monster.sections['Legendary Actions']; trace('removed by the concept:', 'Legendary Actions — the words said no legendary actions'); }
    if (/^legendary actions?$/.test(gone) && scaled.legendary && card?.hp) { // the legendary card's HP trade leaves with the kit (a CR 15 dragon sat at 165 HP against a 240 card, critic form-ten 2026-10-01)
      const cardNL = cardBudget(cr, { legendary: false, edition: options.edition ?? null }); const hpNew = Math.round(cardNL.hp * ((scaled.hp || card.hp) / card.hp));
      if (hpNew > (monster.hp ?? 0)) {
        const was = monster.hp; monster.hp_formula = hpFormulaForSize(hpNew, monster.size ?? 'Medium', Math.floor(((scaled.stats?.CON ?? 10) - 10) / 2));
        const dmR = /(\d+)d(\d+)(?:\s*([+-])\s*(\d+))?/.exec(monster.hp_formula ?? ''); monster.hp = dmR ? Math.floor(Number(dmR[1]) * (Number(dmR[2]) + 1) / 2) + (dmR[3] === '-' ? -1 : 1) * Number(dmR[4] ?? 0) : hpNew;
        trace('hp restored:', `${was} -> ${monster.hp} — the legendary kit's HP trade leaves with the kit`);
      }
    }
    if (/^legendary resistance$/.test(gone) || /^legendary actions?$/.test(gone)) { const tr = monster.sections?.Traits ?? []; for (let i = tr.length - 1; i >= 0; i -= 1) if (/^Legendary Resistance/.test(tr[i].name ?? '')) { tr.splice(i, 1); trace('removed by the concept:', 'Legendary Resistance'); } }
    if (/^lairs?( actions?)?$/.test(gone) && monster.sections?.['Lair Actions']) { delete monster.sections['Lair Actions']; trace('removed by the concept:', 'Lair Actions — the words said no lair'); }
  }
  // ROW NAMES ARE UNIQUE ACROSS SECTIONS (checker sweep 2026-10-02: a legendary row named "Rend" beside the action "Rend" on the green dragon): a colliding legendary row takes a distinct verb, print's idiom (Pounce, Deathless Strike)
  { const seen = new Set(Object.entries(monster.sections ?? {}).filter(([k]) => k !== 'Legendary Actions').flatMap(([, es]) => es.map((e) => String(e.name ?? '').replace(/ \(.*\)$/, '').toLowerCase())));
    for (const e of monster.sections?.['Legendary Actions'] ?? []) { const bareL = String(e.name ?? '').replace(/ \(.*\)$/, ''); if (!seen.has(bareL.toLowerCase())) continue; const alt = seen.has(`${bareL} strike`.toLowerCase()) ? `Swift ${bareL}` : `${bareL} Strike`; trace('legendary row renamed for uniqueness:', `"${e.name}" collides with an action — "${alt}"`); e.name = String(e.name).replace(bareL, alt); seen.add(alt.toLowerCase()); } }
  // A CASTER SPEAKS: a block that casts with Verbal components cannot be mute (an archlich "understands Common but can't speak" — critic's audit 2026-10-02)
  if (Object.values(monster.sections ?? {}).flat().some((e) => /^Spellcasting/.test(e.name ?? '')) && /can['’]t speak/i.test(String(monster.languages ?? ''))) {
    const kept = String(monster.languages).replace(/^understands\s+/i, '').replace(/\s*but can['’]t speak.*$/i, '').trim();
    monster.languages = kept && !/^(the languages of its creator|its creator's languages)$/i.test(kept) ? kept.charAt(0).toUpperCase() + kept.slice(1) : 'Common'; trace('languages by voice:', `a caster speaks — "${monster.languages}"`);
  }
  // THE INLINE AT A SENTENCE START is capitalized ("…turn. the troll has 1 Exhaustion level" — critic's audit 2026-10-02)
  { const inl = String(inline ?? '').replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); if (inl) for (const es of Object.values(monster.sections ?? {})) for (const e of es) if (e.text) e.text = e.text.replace(new RegExp(`(^|[.!?]\\s+|\\*\\s+)${inl}\\b`, 'g'), (m0, pre) => `${pre}${inline.charAt(0).toUpperCase()}${inline.slice(1)}`); }
  // TWO ROWS, ONE TEXT: a drawn seed identical to a chassis row is the same ability twice (the Glass Widow's Reflect Step
  // and the library's Blink Step, both "teleports up to 120 feet" — the audit renamed the second instead of dropping it,
  // sweep 2026-10-04). The later non-print row leaves; a print row never does.
  { const seen = new Map(); for (const [secD, esD] of Object.entries(monster.sections ?? {})) for (let i = esD.length - 1; i >= 0; i -= 1) { const e = esD[i]; const key = String(e.text ?? '').replace(/\s+/g, ' ').trim().toLowerCase(); if (!key) continue; if (!seen.has(key)) { seen.set(key, e); continue; } const other = seen.get(key); if (e.authored && other.authored) continue; /* two body parts the user named with the same numbers are two rows (Greatsword and Claw, the Meshrin pin) */ const owned = (r) => !!(r.print || r.part || r.kit || r.feature); /* print's rows and the GM's own — a part, a species row, a feature — never leave; the chassis copy does (the orc's Greataxe left for a Hand Axe narrowed into its twin — the critic's second species read, rerun) */ const goner = owned(e) ? (owned(other) ? null : other) : owned(other) ? e : e.authored && !other.authored ? e : other.authored && !e.authored ? other : e; if (!goner) continue; sweepDeadName(monster.sections, goner.name, goner === e ? other : e, trace); for (const [secG, esG] of Object.entries(monster.sections)) { const ix = esG.indexOf(goner); if (ix !== -1) { esG.splice(ix, 1); trace('identical row leaves:', `${secG}/"${goner.name}" reads word for word as ${secD}/"${(goner === e ? other : e).name}" — one ability, one name`); } } if (goner === other) seen.set(key, e); } }
  // EVERY ESCAPE DC IS STR's (8 + PB + STR mod): rows that join after the final derivations — the slot
  // row's fitted template, the user's wildcard written by the model ("escape DC 11" copied from its
  // own save DC on the Peat Hound, sweep 2026-10-02) — are re-derived here, in the one place every row passes
  { const strModE = Math.floor(((monster.stats?.STR ?? scaled.stats.STR) - 10) / 2); const escDC = Math.max(8 + scaled.pb + strModE, strModE < 0 ? scaled.dc : 0); const fixed = [];
    for (const es of Object.values(monster.sections ?? {})) for (const e of es) if (/escape DC \d+/.test(e.text ?? '') && !e.text.includes(`escape DC ${escDC}`)) { fixed.push(e.name); e.text = e.text.replace(/escape DC \d+/g, `escape DC ${escDC}`); }
    if (fixed.length) trace('escape dc:', `${fixed.join(', ')} → DC ${escDC} (8 + PB + STR; a late row wore another number)`); }
  // OUTPUT GUARD (PI alias spec 2026-10-01): the finished block carries no Product
  // Identity token or lore word in its name, row names or text — scrubbed to the
  // alias's plain noun, never rendered
  { const guardHits = piGuard(monster); if (guardHits.length) trace('pi guard:', `scrubbed ${guardHits.join(', ')} from the finished block (the token is never rendered)`); if (piHits.length) monster.pi_alias = true; }
  { // header clauses set directly (fidelity pipeline step 5, the brief's §3): "30 feet of movement" is the walking speed; a size word is the size
    const rec = Array.isArray(monster.generation?.clauses) ? monster.generation.clauses : [];
    const sp = rec.map((c) => /(\d+)\s*(?:feet|ft)\b(?:\s*(?:of )?(?:movement|speed|walk(?:ing)?))?/i.exec(c.text)).find((x) => x && !/fly|swim|climb|burrow|reach|range|within|radius/i.test(x.input));
    if (sp && typeof monster.speed === 'string' && !new RegExp(`^${sp[1]} ft`).test(monster.speed)) { const was = monster.speed; monster.speed = monster.speed.replace(/^\d+ ft\./, `${sp[1]} ft.`); trace('header clause:', `speed ${was} -> ${monster.speed} — the user typed ${sp[1]} feet`); }
    const sz = rec.map((c) => (c.kind === 'header' && SIZE_HEADER.test(c.text) ? /\b(Tiny|Small|Medium|Large|Huge|Gargantuan)\b/i.exec(c.text) : null)).find(Boolean); // "large teeth" is not the size
    if (sz && String(monster.size ?? '').toLowerCase() !== sz[1].toLowerCase()) { trace('header clause:', `size ${monster.size} -> ${sz[1]} — the user typed it`); monster.size = sz[1].charAt(0).toUpperCase() + sz[1].slice(1).toLowerCase(); }
    // HEADER-VALUE CLAUSES ARE DIRECTIVES (the brief's §3; critic's step-5 read: the hag's "takes extra damage from fire" had no Vulnerabilities line)
    const cap1 = (w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase();
    const merge = (field, value, isCond) => { const cur = String(monster[field] ?? '').trim(); if (new RegExp(`\\b${value}\\b`, 'i').test(cur)) return false; let [d = '', c = ''] = cur.split(/\s*;\s*/); const add = (lst) => [...lst.split(/,\s*/).filter(Boolean), value].sort().join(', '); if (isCond) c = add(c); else d = add(d); monster[field] = [d, c].filter(Boolean).join('; '); return true; };
    rec.forEach((c, i) => {
      if (c.kind !== 'header') return;
      const t = c.text; const prev = rec[i - 1]?.text ?? '';
      const ty = DMG_TYPE_WORD.exec(t)?.[1] ?? (/\b(?:it|that|them)\b/i.test(t) ? DMG_TYPE_WORD.exec(prev)?.[1] : null); const cond = COND_WORD.exec(t)?.[1];
      if (VULN_CUE.test(t) && ty && merge('vulnerabilities', cap1(ty), false)) { trace('header clause:', `vulnerable to ${cap1(ty)} — "${t}"`); for (const fld of ['resistances', 'immunities']) { const cur = String(monster[fld] ?? ''); if (new RegExp(`\\b${cap1(ty)}\\b`).test(cur)) { monster[fld] = cur.replace(new RegExp(`\\b${cap1(ty)}\\b,?\\s*`), '').replace(/,\s*;/, ';').replace(/^\s*;\s*/, '').replace(/,\s*$/, '').trim(); trace('header clause:', `${fld} lose ${cap1(ty)} — the user's vulnerability outranks the borrowed line`); } } }
      else if (RES_CUE.test(t) && !IMM_CUE.test(t) && ty && merge('resistances', cap1(ty), false)) trace('header clause:', `resists ${cap1(ty)} — "${t}"`);
      else if (IMM_CUE.test(t) && /\badamantine\b/i.test(t) && !/adamantine/i.test(String(monster.immunities ?? ''))) { const cur = String(monster.immunities ?? '').trim(); const [d = '', cnd = ''] = cur.split(/\s*;\s*/); const dmgList = [...d.split(/,\s*/).filter(Boolean).filter((x) => !/^(?:Bludgeoning|Piercing|Slashing)$/.test(x)), 'Bludgeoning, Piercing, and Slashing from nonmagical attacks that aren\'t adamantine']; monster.immunities = [dmgList.join(', '), cnd].filter(Boolean).join('; '); trace('header clause:', `the Iron Golem's line — immune to nonmagical weapons that aren't adamantine — "${t}" (step 8)`); }
      else if (IMM_CUE.test(t) && (ty || cond) && merge('immunities', cap1(ty ?? cond), !ty)) trace('header clause:', `immune to ${cap1(ty ?? cond)} — "${t}"`);
    });
    const declared = {};
    if (/aren't adamantine/.test(String(monster.immunities ?? ''))) declared.immunities = 'adamantine'; // the user's immunity line drives the DMG read; the bands report it as user-set
    for (const c of rec) {
      if (c.kind !== 'header') continue;
      const ac = /\bAC\s*(\d+)|armor class (?:of )?(\d+)/i.exec(c.text); if (ac) { declared.ac = Number(ac[1] ?? ac[2]); if (monster.ac !== declared.ac) { trace('user-set:', `AC ${monster.ac} -> ${declared.ac} — a declared field, not a derivation (Resolution 3)`); monster.ac = declared.ac; } }
      const hp = /\bHP\s*(\d+)|(\d+) hit points/i.exec(c.text); if (hp) { declared.hp = Number(hp[1] ?? hp[2]); if (Number(monster.hp) !== declared.hp) { trace('user-set:', `HP ${monster.hp} -> ${declared.hp} — a declared field (Resolution 3)`); monster.hp = declared.hp; monster.hp_formula = hpFormulaForSize(declared.hp, monster.size ?? 'Medium', Math.floor((Number(monster.stats?.CON ?? 10) - 10) / 2)); } }
    }
    for (const c of rec) { // "bites for 50 damage": the row named for the part deals the user's number
      const dm = /\b([a-z]+?)(?:es|s)? for (\d+) damage\b/i.exec(c.text); if (!dm) continue;
      const stemU = dm[1].toLowerCase(); const row = Object.values(monster.sections ?? {}).flat().find((e) => /Attack Roll/.test(e.text ?? '') && clauseWords(e.name).some((w) => w.startsWith(stemU.slice(0, 4))));
      const cur = row && /(\d+) \((\d+d\d+)(?: \+ (\d+))?\) ([A-Z][a-z]+) damage/.exec(row.text); if (!row || !cur) continue;
      const want = Number(dm[2]); const flat = Number(cur[3] ?? 0); const r = attackDamageDiceFor(want, Math.min(flat, Math.max(0, want - 1)));
      row.text = row.text.replace(cur[0], `${r.avg} (${r.dice}) ${cur[4]} damage`); row.userSet = want; (declared.rows = declared.rows ?? {})[String(row.name).replace(/ \(.*\)$/, '')] = want;
      trace('user-set:', `"${row.name}" deals ${r.avg} (${r.dice}) — the user wrote ${want} damage (Resolution 3)`);
    }
    if (Object.keys(declared).length && monster.generation) monster.generation.declared = declared;
    { // A LISTED SPELL NEVER SHARES A NAME WITH AN ATTACK ROW (Ray of Sickness was a row and a spell, and the Multiattack named it twice — the critic's second species read)
      const rowNames = Object.values(monster.sections ?? {}).flat().filter((e) => /Attack Roll/.test(e.text ?? '')).map((e) => String(e.name ?? '').replace(/ \(.*\)$/, ''));
      for (const es of Object.values(monster.sections ?? {})) for (const e of es) if (/^Spellcasting/.test(e.name ?? '')) for (const rn of rowNames) { const re = new RegExp(`(?:, )?\\*${rn.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\*(?:, )?`, 'g'); if (re.test(e.text)) { e.text = e.text.replace(re, (m0) => (m0.startsWith(', ') && m0.endsWith(', ') ? ', ' : '')).replace(/:\s*,/g, ':').replace(/,\s*$/, '').replace(/\s{2,}/g, ' '); trace('spell list:', `*${rn}* leaves the list — it is an attack row on this sheet`); } }
      for (const es of Object.values(monster.sections ?? {})) for (const e of es) if (/^Multiattack/.test(e.name ?? '')) e.text = e.text.replace(/using ([A-Z][\w' -]*?) or \1 in any combination/, 'using $1 in any combination').replace(/\b([A-Z][\w' -]*?) or \1\b/, '$1');
    }
    { // EVERY ATTACK ROW IS IN THE MULTIATTACK (the critic's fifth read: the Saber
      // sat outside a Multiattack of two Longbow shots; Talons sat outside the
      // Windscout's). Print's grammar for two weapons in one turn is "using A or B
      // in any combination", so an Action attack row the Multiattack never names
      // joins the combination — the count does not change, only the choice.
      // Print's own card is left alone, as are gated rows (a nova is not a slot).
      const esM = monster.sections?.Actions ?? [];
      const ma = esM.find((e) => /^Multiattack/.test(e.name ?? ''));
      if (ma && !ma.print && !printExact) {
        const cited = () => String(ma.text ?? '').toLowerCase();
        for (const e of esM) {
          if (e === ma || !/Attack Roll/.test(e.text ?? '') || e.print || /\((?:Recharge [\d–-]+|\d\/Day)\)/.test(e.name ?? '')) continue;
          const n = String(e.name ?? '').replace(/ \(.*\)$/, ''); if (!n || cited().includes(n.toLowerCase())) continue;
          const combo = /makes (\w+) attacks, using ([^.]*?) in any combination/.exec(ma.text ?? '');
          const single = /makes (\w+) ([A-Z][\w' -]*?) attacks?/.exec(ma.text ?? '');
          if (combo) { if (combo[2].split(/,| or | and /).filter(Boolean).length >= 3) continue; ma.text = ma.text.replace(combo[0], `makes ${combo[1]} attacks, using ${combo[2]} or ${n} in any combination`); }
          else if (single) ma.text = ma.text.replace(single[0], `makes ${single[1]} attacks, using ${single[2]} or ${n} in any combination`);
          else continue;
          trace('multiattack re-read —', `"${n}" joins the combination; "${ma.text.slice(0, 90)}"`);
        }
      }
    }
    if (scaled.species) { // the species' header lines land after the directives and print's speed, so a user-set walk and print's own modes stand; a user's vulnerability outranks the species' resistance
      const sp = scaled.species;
      if (sp.type && String(monster.type ?? '') !== sp.type && !/\b(?:aberration|beast|celestial|construct|dragon|elemental|fey|fiend|giant|humanoid|monstrosity|ooze|plant|undead)\b/i.test(String(options.userConcept ?? concept ?? ''))) { trace('species kit:', `${monster.type} -> ${sp.type} — the ${sp.key}'s type (the words name no other)`); monster.type = sp.type; }
      // THE SPECIES CARRIES ITS SIZE (the critic's fifth read: "Mournhold Grieve
      // is a Huge Humanoid goliath, 16d12, reach 10"). A size word in the GM's
      // own text outranks it; a swarm's size line is its own. The hit die follows
      // the size, as it does for a print body, and so does the reach.
      if (sp.size && String(monster.size ?? '') !== sp.size && !SIZE_HEADER.test(readPhrases(String(options.userConcept ?? concept ?? ''))) && !/swarm/i.test(String(monster.size ?? ''))) {
        const was = String(monster.size ?? '');
        trace('species kit:', `${was || 'unset'} -> ${sp.size} — a ${sp.key} is ${sp.size} (the words name no other size)`);
        monster.size = sp.size;
        { const conM = Math.floor(((monster.stats?.CON ?? 10) - 10) / 2); const fromHp = Number(scaled.hp ?? monster.hp); monster.hp_formula = hpFormulaForSize(fromHp, sp.size, conM); const dmS = /(\d+)d(\d+)(?:\s*([+-])\s*(\d+))?/.exec(monster.hp_formula ?? ''); if (dmS) monster.hp = Math.floor(Number(dmS[1]) * (Number(dmS[2]) + 1) / 2) + (dmS[3] === '-' ? -1 : 1) * Number(dmS[4] ?? 0); }
        if (['Tiny', 'Small', 'Medium'].includes(sp.size) && ['Large', 'Huge', 'Gargantuan'].includes(was)) {
          const LONG = /\b(?:glaive|halberd|pike|lance|whip|tentacle|tendril|chain|flail|trunk|tail|lash|tongue|reach)\b/i;
          for (const es of Object.values(monster.sections ?? {})) for (const e of es) { if (!/Melee(?: or Ranged)? Attack Roll/.test(e.text ?? '') || LONG.test(`${e.name ?? ''}`)) continue; const r = /reach (\d+) ft/.exec(e.text); if (r && Number(r[1]) > 5) { e.text = e.text.replace(r[0], 'reach 5 ft'); trace('species kit:', `"${e.name}" reach ${r[1]} -> 5 ft. — reach follows the ${sp.key}'s size`); } }
        }
      }
      if (sp.ac_floor && Number(monster.ac) < sp.ac_floor && !monster.generation?.declared?.ac) { trace('species kit:', `AC ${monster.ac} -> ${sp.ac_floor} — the ${sp.key}'s shell is natural armor (no chassis hands a tortle AC 13 — the critic's third species read)`); monster.ac = sp.ac_floor; }
      for (const [mode, n] of Object.entries(sp.modes ?? {})) if (!new RegExp(`\\b${mode} \\d+ ft`, 'i').test(monster.speed ?? '')) { monster.speed = `${String(monster.speed ?? '30 ft.').replace(/,\s*$/, '')}, ${mode} ${n} ft.`; trace('species kit:', `${mode} ${n} ft. — the ${sp.key}'s`); }
      if (sp.senses) { const want = /(\w+) (\d+) ft/.exec(sp.senses); const have = want ? new RegExp(`${want[1]} (\\d+) ft`, 'i').exec(monster.senses ?? '') : null; if (want && !have) { monster.senses = `${sp.senses}${monster.senses ? `, ${monster.senses}` : ''}`.replace(/, (Passive Perception)/, '; $1'); trace('species kit:', `${sp.senses} — the ${sp.key}'s`); } else if (want && have && Number(have[1]) < Number(want[2])) { monster.senses = monster.senses.replace(have[0], `${want[1]} ${want[2]} ft`); trace('species kit:', `${want[1]} ${have[1]} -> ${want[2]} ft. — the ${sp.key}'s`); } }
      // THE SPECIES' OWN TONGUE (the critic's fifth read). The generator's
      // species-language list only ever fired on a Humanoid, so a satyr, a
      // centaur and a minotaur never got one, and a grung read "can't speak"
      // where grung speak. A language the GM typed still wins: the header
      // clause and the speech clause both land after this.
      if (sp.languages?.length) {
        const line = String(monster.languages ?? '').trim();
        const mute = /can'?t speak|cannot speak|does ?n[o']t speak/i.test(line);
        const gmMute = /\b(?:can'?t speak|cannot speak|mute|voiceless|speechless|wordless|silent)\b/i.test(readPhrases(String(options.userConcept ?? concept ?? '')));
        if (!line || /^(?:none|—|-)$/i.test(line) || (mute && !gmMute)) { trace('species kit:', `Languages "${line || 'unset'}" -> "${sp.languages.join(', ')}" — a ${sp.key} speaks${mute ? ' (the sheet said it could not, and the words never said so)' : ''}`); monster.languages = sp.languages.join(', '); }
        else if (!mute) for (const lg of sp.languages) { if (new RegExp(`\\b${lg}\\b`, 'i').test(monster.languages ?? '')) continue; monster.languages = `${monster.languages}, ${lg}`; trace('species kit:', `${lg} — the ${sp.key}'s own`); }
      }
      // THE SPECIES' OWN TEETH (the critic's fifth read: "minotaur Gore,
      // centaur Hooves and satyr Ram"). Only where the sheet's melee row is a
      // generic chassis strike and nothing already names one of them: a weapon
      // the GM typed, a part, print's row and a name the model chose all stand.
      if (sp.naturalWeapons?.length) {
        const rowsAll = Object.values(monster.sections ?? {}).flat();
        const named = (e) => sp.naturalWeapons.some((w) => new RegExp(`\\b${w}s?\\b`, 'i').test(String(e.name ?? '')));
        const GENERIC_STRIKE = /^(?:Slam|Fist|Fists|Strike|Blow|Smash|Hit|Punch|Unarmed Strike|Melee Attack)$/i;
        if (!rowsAll.some((e) => e.part || e.weapon) && !rowsAll.some(named)) {
          const target = rowsAll.find((e) => /Melee(?: or Ranged)? Attack Roll/.test(e.text ?? '') && !e.print && !e.rules && !e.kit && GENERIC_STRIKE.test(String(e.name ?? '').replace(/ \(.*\)$/, '')));
          if (target) {
            const was = String(target.name).replace(/ \(.*\)$/, '');
            const to = sp.naturalWeapons[0].replace(/\b\w/g, (c) => c.toUpperCase());
            target.name = String(target.name).replace(was, to);
            const want = ANATOMY[sp.naturalWeapons[0]]?.[1];
            const dm = want ? /\d+ \(\d+d\d+(?:\s*\+\s*\d+)?\) (Bludgeoning|Piercing|Slashing) damage/.exec(target.text ?? '') : null;
            if (dm && dm[1] !== want) target.text = target.text.replace(dm[0], dm[0].replace(dm[1], want));
            for (const es of Object.values(monster.sections ?? {})) for (const e of es) if (e !== target) e.text = String(e.text ?? '').split(was).join(to);
            trace('species kit:', `"${was}" -> "${to}"${dm && dm[1] !== want ? ` (${want}, not ${dm[1]})` : ''} — a ${sp.key} strikes with its own${was === 'Slam' ? ', not a chassis Slam' : ''}`);
          }
        }
      }
      for (const ty of sp.resist ?? []) { if (new RegExp(`\\b${ty}\\b`, 'i').test(monster.vulnerabilities ?? '') || new RegExp(`\\b${ty}\\b`, 'i').test(monster.immunities ?? '')) continue; if (!new RegExp(`\\b${ty}\\b`, 'i').test(monster.resistances ?? '')) { monster.resistances = [...String(monster.resistances ?? '').split(/,\s*/).filter(Boolean), ty].sort().join(', '); trace('species kit:', `resistance ${ty} — the ${sp.key}'s`); } }
    }
    { // THE GM's FEAR OUTRANKS PRINT's IMMUNITY (the critic's fourth read): "deathly afraid of chickens" beside "Immune to … Frightened" is a contradiction a GM reads in the header; the fear clause strips it, as a vulnerability strips a resistance
      const fears = /\b(?:afraid of|deathly afraid|terrified of|fears?|dreads?|phobia|frightened of|scared of|panics?)\b/i.test(readPhrases(String(options.userConcept ?? concept ?? '')));
      if (fears && /\bFrightened\b/.test(String(monster.immunities ?? ''))) {
        monster.immunities = String(monster.immunities).split(/,\s*/).filter((t) => !/^Frightened$/i.test(t.trim())).join(', ').replace(/;\s*$/, '').replace(/^\s*;\s*/, '').trim();
        trace('fear outranks immunity:', 'Frightened leaves the immunities — the words make this creature afraid');
      }
    }
    // A LACKS CLAUSE removes what it names (the step-2 removal item; critic's step-5 read: "cannot cast any spells" shipped the Mage's spell list)
    for (const c of rec) {
      if (c.polarity !== 'lacks') continue;
      const neg = NEG_CUE.exec(c.text); const lacked = clauseWords(neg ? c.text.slice(neg.index + neg[0].length) : c.text).filter((w) => !['any', 'all', 'ever', 'longer', 'able', 'just', 'anything', 'anyone', 'people', 'person', 'thing', 'other'].includes(w));
      if (!lacked.length) continue;
      const magic = lacked.some((w) => /^(?:spell|cast|magic|spellcast)/.test(w));
      const modeLack = lacked.includes('melee') ? 'melee' : lacked.includes('ranged') ? 'ranged' : null; // "has no melee attack at all": the lack of a whole mode drops that mode's rows (the hill giant archer kept a Bowstave, sprint run 2026-10-12)
      if (modeLack) {
        for (const [secL, esL] of Object.entries(monster.sections ?? {})) for (const e of esL.slice()) {
          const tL = e.text ?? ''; if (/Melee or Ranged/.test(tL) || !(modeLack === 'melee' ? /Melee Attack Roll/.test(tL) : /Ranged Attack Roll/.test(tL))) continue;
          esL.splice(esL.indexOf(e), 1); trace('lacks clause:', `${secL}/"${e.name}" leaves — "${c.text}" (no ${modeLack} attack)`);
          const bareE = String(e.name ?? '').replace(/ \(.*\)$/, ''); const escE = bareE.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
          for (const es2 of Object.values(monster.sections ?? {})) for (const ma of es2) if (/^Multiattack/.test(ma.name ?? '')) ma.text = ma.text.replace(new RegExp(`makes (\\w+) attacks, using ${escE} or ([A-Z][\\w' -]*?) in any combination`), 'makes $1 $2 attacks').replace(new RegExp(`makes (\\w+) attacks, using ([A-Z][\\w' -]*?) or ${escE} in any combination`), 'makes $1 $2 attacks'); // the surviving mode carries the count
          sweepDeadName(monster.sections, e.name, null, trace);
        }
        continue;
      }
      for (const [secL, esL] of Object.entries(monster.sections ?? {})) for (const e of esL.slice()) {
        if (/^(?:Multiattack|Legendary Action Uses)\b/.test(e.name ?? '')) continue;
        const nameHit = clauseWords(e.name).some((w) => lacked.includes(w));
        const magicHit = magic && !/Attack Roll/.test(e.text ?? '') && /\bcasts?\b|Spellcasting|\bspells?\b/i.test(`${e.name} ${e.text}`);
        if (!nameHit && !magicHit) continue;
        esL.splice(esL.indexOf(e), 1); trace('lacks clause:', `${secL}/"${e.name}" leaves — "${c.text}"`);
        sweepDeadName(monster.sections, e.name, null, trace);
      }
      if (magic) for (const es of Object.values(monster.sections ?? {})) for (const e of es) if (/^Multiattack/.test(e.name ?? '')) e.text = e.text.replace(/ or (?:its )?Spellcasting to cast \*[^*]+\*/, '').replace(/\s*It can replace one attack with a use of (?:its )?Spellcasting to cast \*[^*]+\*\./, '');
      if (magic && !Object.values(monster.sections ?? {}).flat().some((e) => /^Spellcasting\b|\bcasts?\b|spell attack/i.test(`${e.name} ${e.text}`))) { // NO CASTING LEFT: a weapon row rolls a weapon stat — the Mage's INT 17 had raised the staff to +5 and the lack then removed every casting row (a wizard who cannot cast swings his staff by hand; the baseline 2026-10-12)
        const modsL = Object.fromEntries(Object.entries(monster.stats ?? scaled.stats ?? {}).map(([k, v]) => [k, Math.floor((Number(v) - 10) / 2)])); const wMod = Math.max(modsL.STR ?? 0, modsL.DEX ?? 0); const atkNew = scaled.pb + wMod;
        for (const es of Object.values(monster.sections ?? {})) for (const e of es) {
          if (!/Attack Roll/.test(e.text ?? '') || !/\) (?:Bludgeoning|Piercing|Slashing) damage/.test(e.text)) continue; const was = Number(/Attack Roll:\*? \+(\d+)/.exec(e.text)?.[1]); if (!Number.isFinite(was) || was === atkNew) continue;
          e.text = e.text.replace(/(Attack Roll:\*? )\+\d+/, `$1+${atkNew}`).replace(/(\d+) \((\d+d\d+)(?: ([+-]) (\d+))?\)/, (m0, avg, dice, sign, b) => { const old = b ? (sign === '-' ? -Number(b) : Number(b)) : 0; return `${Number(avg) - old + wMod} (${dice}${wMod ? ` ${wMod < 0 ? '-' : '+'} ${Math.abs(wMod)}` : ''})`; });
          trace('lacks clause:', `"${e.name}" rolls +${atkNew} off ${(modsL.STR ?? 0) >= (modsL.DEX ?? 0) ? 'Strength' : 'Dexterity'} — no casting is left on the sheet (${c.text})`);
        }
      }
    }
    { // a melee weapon in a row's NAME narrows a hybrid print row to melee ("Iron-Shod Staff … or range 120 ft." — the Mage's Arcane Burst under a staff, critic's step-5 read)
      const MELEE_NAME = /\b(?:staff|quarterstaff|sword|greatsword|longsword|shortsword|axe|greataxe|battleaxe|mace|club|greatclub|hammer|warhammer|maul|flail|spear|pike|glaive|halberd|scythe|blade|fist|claw|bite|maw|tail|hoof|horn|gore|slam|punch|kick)\b/i;
      for (const es of Object.values(monster.sections ?? {})) for (const e of es) {
        const hyb = /\*Melee or Ranged Attack Roll:\*? (\+\d+(?: \([^)]*\))?), reach (\d+) ft\. or range [\d/]+ ft\./.exec(e.text ?? '');
        // a thrown weapon keeps its range ("Hand Axe" narrowed to a melee copy of the Greataxe and the duplicate drop took the part — the critic's second species read, rerun)
        if (hyb && MELEE_NAME.test(e.name ?? '') && !/\b(?:thrown|throw|hurl|hurled|javelin|dagger|hand ?axe|spear|trident|dart|light hammer|net)\b/i.test(e.name ?? '')) { e.text = e.text.replace(hyb[0], `*Melee Attack Roll:* ${hyb[1]}, reach ${hyb[2]} ft.`); trace('row narrowed:', `"${e.name}" is a melee weapon by name — the hybrid range leaves`); }
      }
      // AND NOTHING ELSE KEEPS IT (the critic's fifth read: "Thunder-Elk, melee or
      // ranged at 30/120, throws an elk 120 feet"; "Brine Surge" at 30/120). Print
      // dresses only a thrown weapon in "Melee or Ranged", so a row whose HEAD noun
      // names nothing that can fly loses the range. A launcher has been retabled by
      // the weapon table before this pass; print's own rows and the GM's parts stand.
      const THROWN_HEAD = /^(?:javelin|spear|trident|dagger|handaxe|hand ?axe|dart|hammer|net|knife|boulder|rock|stone|spike|spine|quill|shard|bolt|arrow|bomb|flask|jar|harpoon|chain|hook|volley|spit|spray|glob|gob|blast|bola|bolas|sling|stinger|needle|barb|thorn|pellet|shot)s?$/i;
      const LAUNCHER_NAME = /\b(?:bow|longbow|shortbow|crossbow|sling|musket|pistol|rifle|firearm|gun|blowgun|cannon)\b/i;
      for (const es of Object.values(monster.sections ?? {})) for (const e of es) {
        if (!e || e.part || e.print || e.rules) continue;
        const bareN = String(e.name ?? '').replace(/ \(.*\)$/, ''); const head = bareN.toLowerCase().split(/[\s-]+/).pop() ?? '';
        if (THROWN_HEAD.test(head) || LAUNCHER_NAME.test(bareN) || /\b(?:thrown|throws?|hurl|hurled|hurls|lob|lobs|lobbed|fling|flings|flung|tosse?s?|spit|spits|spat|launch(?:es|ed)?)\b/i.test(bareN)) continue;
        if (!/\) (?:Bludgeoning|Piercing|Slashing) damage/.test(e.text ?? '')) continue; // an energy row is print's Arcane Burst — a spell attack reaches both ways
        const hyb2 = /\*?Melee or Ranged Attack Roll:\*? (\+\d+(?: \([^)]*\))?), reach (\d+) ft\. or range [\d/]+ ft\./.exec(e.text ?? '');
        if (!hyb2) continue;
        e.text = e.text.replace(hyb2[0], `*Melee Attack Roll:* ${hyb2[1]}, reach ${hyb2[2]} ft.`);
        trace('row narrowed:', `"${bareN}" names nothing that can be thrown — the range leaves (print dresses only a thrown weapon in "Melee or Ranged")`);
      }
    }
    { // a SPEECH header clause with "only" is the Languages line when nothing else wrote it ("it speaks only in the language of socks" — Sock Rot kept Common, step 6 baseline run 2)
      const sp = rec.find((c) => c.kind === 'header' && SPEECH_CUE.test(c.text) && /\bonly\b/i.test(c.text));
      if (sp && !(authored?.unplaced ?? []).some((u) => u.where === 'languages' && u.text) && !clauseWords(sp.text).filter((w) => !['speak', 'language', 'only', 'talk'].includes(w)).some((w) => clauseWords(monster.languages).includes(w))) {
        const line = sp.text.replace(/^(?:it|she|he|they|the \w+)\s+/i, '').replace(/^./, (c) => c.toUpperCase());
        trace('header clause:', `Languages "${monster.languages}" -> "${line}" — the user typed it`); monster.languages = line;
      }
    }
    const speech = (authored?.unplaced ?? []).filter((u) => u.where === 'languages' && u.text); if (speech.length) { const only = speech.some((u) => /\bonly\b/i.test(`${u.clause} ${u.text}`)); monster.languages = [only ? '' : String(monster.languages ?? '').replace(/^None$/i, ''), ...speech.map((u) => u.text)].filter(Boolean).join('; '); /* "speaks only in the language of socks" is the whole line — Common leaves (critic's step-5 read) */ trace('unplaced to Languages:', speech.map((u) => `"${u.clause}"`).join(', ')); } }
  trace('done:', `"${monster.name}" — donor ${donor.id}, CR ${cr}`);
  return monster;
}
