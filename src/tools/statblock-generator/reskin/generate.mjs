/**
 * THE RESKIN PILOT PATH (owner spec v0, 2026-08-17). Parallel to the slot
 * path; touches nothing outside reskin/. Donor -> scale -> ONE reskin call
 * (identity + renames + damage types + the wildcard replacing the
 * Signature Slot) -> verify -> lint. A rename that fails to apply FAILS
 * THE BLOCK LOUDLY (owner spec: no silent fallback names).
 */
import { pickDonor, scaleDonor } from './scale.mjs';
import { honestSpeed, honestLanguages, honestAttackNames, honestFireDefenses, materialVulnerability } from './header.mjs';
import { renderStatblock2024 } from '../format-2024/render.mjs';
import printBlocks from '@/data/srd52-monsters.json';
import { templatesFor, renderTemplate, coveredBySheet, fallbackMenu, rankByVerb, conceptVerbs, valueCheck, SEAT_DEFAULT_TRAIT, MECHANIC_OWED_TRAIT, TEMPLATE_BY_ID, buildIdeaPrompt, validateIdeaResponse, parseIdeas, buildFitPrompt, validateFitResponse, parseFit, TEMPLATES, blindDealable, UTILITY } from './templates.mjs';
import { drawLibraryRow, nameHash } from './library.mjs';
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
export function printCanonFor(conceptText, cr) {
  const words = String(conceptText ?? '').toLowerCase().replace(/[^a-z' -]/g, ' ').trim().split(/\s+/).filter((w) => w && !['a', 'an', 'the'].includes(w));
  if (!words.length || words.length > 4) return null;
  // the NPC half by alias: the SRD has Scout, Bandit, Guard, Knight, Mage, Priest,
  // Spy… but no "Archer" — users type the job, print names the block
  const PRINT_ALIAS = { archer: 'Scout', archers: 'Scout', bowman: 'Scout', bowmen: 'Scout', huntsman: 'Scout', ranger: 'Scout', crossbowman: 'Bandit', brigand: 'Bandit', footpad: 'Bandit', outlaw: 'Bandit', highwayman: 'Bandit', soldier: 'Warrior Infantry', 'foot soldier': 'Warrior Infantry', infantryman: 'Warrior Infantry', veteran: 'Warrior Veteran', mercenary: 'Warrior Veteran', 'sellsword': 'Warrior Veteran', wizard: 'Mage', sorcerer: 'Mage', warlock: 'Mage', cleric: 'Priest', monk: 'Priest', thief: 'Spy', rogue: 'Spy', burglar: 'Spy', guardsman: 'Guard', sentry: 'Guard', watchman: 'Guard', paladin: 'Knight', cavalier: 'Knight', peasant: 'Commoner', villager: 'Commoner', farmer: 'Commoner', zealot: 'Cultist', brawler: 'Tough', bruiser: 'Tough', thug: 'Tough', duelist: 'Gladiator', champion: 'Gladiator' };
  const head0 = words.at(-1); const head = (PRINT_ALIAS[head0] ?? head0).toLowerCase(); const heads = [head, head.replace(/ies$/, 'y').replace(/ves$/, 'f').replace(/s$/, '')];
  const list = Array.isArray(printBlocks) ? printBlocks : [];
  const lower = (b) => String(b.name ?? '').toLowerCase();
  const exact = list.find((b) => heads.includes(lower(b))) ?? list.find((b) => lower(b) === words.join(' '));
  const ending = list.filter((b) => heads.some((h) => lower(b).endsWith(` ${h}`)));
  const pick = exact ?? (ending.length ? ending.sort((a, b) => Math.abs(Number(a.cr) - cr) - Math.abs(Number(b.cr) - cr))[0] : null);
  if (!pick) return null;
  const last = lower(pick).split(/\s+/).at(-1);
  const traits = (pick.sections?.Traits ?? []).filter((t) => t?.name && !PRINT_BOILER.test(t.name)).map((t) => ({ name: t.name.replace(/ \(.*\)$/, ''), text: String(t.text ?? '') }));
  const rowOf = (a) => { const t = String(a.text ?? ''); const m = /\d+ \(\d+d\d+(?: \+ \d+)?\) (Bludgeoning|Piercing|Slashing)(?: damage)?\.?\s*([^]*)$/.exec(t); return { name: a.name.replace(/ \(.*\)$/, ''), type: m?.[1] ?? null, rider: m ? m[2].trim() : '' }; };
  const meleeRows = (pick.sections?.Actions ?? []).filter((a) => /Melee Attack Roll/.test(a.text ?? '') && !/Melee or Ranged/.test(a.text ?? '')).map(rowOf);
  const melee = meleeRows.map((r) => r.name);
  const rangedRows = (pick.sections?.Actions ?? []).filter((a) => /Ranged Attack Roll/.test(a.text ?? '')).map((a) => ({ name: a.name.replace(/ \(.*\)$/, ''), range: (/range (\d+\/\d+) ft\./.exec(a.text ?? '') ?? [])[1] ?? null }));
  const ranged = rangedRows.map((r) => r.name);
  const modes = [...String(pick.speed ?? '').matchAll(/\b(Fly|Swim|Climb|Burrow)\b/gi)].map((m) => m[1].toLowerCase());
  return { name: pick.name, last, traits, melee, meleeRows, ranged, rangedRows, modes };
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
export function buildReskinPrompt(scaled, { concept = '', takenNames = [], energy = null, mix = null, mind = null, resolvedType = null, fixedName = null, } = {}) {
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
  const hintFor = (n) => RENAME_HINTS.find(([re]) => re.test(n))?.[1] ?? 'plain, 1-2 words like print';
  const renameSkeleton = renameKeysOf(scaled)
    .map((n) => `"${n}": "<${hintFor(n)}>"`).join(', ');
  return `You are reskinning a mechanical monster chassis to a concept. The mechanics are FIXED; you provide identity.

CONCEPT: ${concept}
${scaled.style === 'mounted' ? 'MOUNT HANDLING: print never writes rules about a mount — the Centaur Trooper is just its Speed and its charge. Express the mount through names, lore, and attack flavor (a bite, hooves, a saddle-borne strike); never write rules ABOUT the mount (no separate actions or turns, no targeting it, no mounting or dismounting, no describing how rider and mount are joined, and never a rule keyed on being mounted). The chassis speed and charge mechanics already are the mount.\n' : ''}${takenNames.length ? `\nNAMES ALREADY TAKEN — never reuse or closely echo any: ${takenNames.slice(0, 40).join(', ')}\n` : ''}
THE CHASSIS (CR ${scaled.cr}, AC ${scaled.ac}, HP ${scaled.hp}) — its header, then the rows you are naming:
${chassisSheet(scaled, { type: resolvedType ?? '', headerOnly: true })}
${rows.join('\n')}

Return ONLY JSON:
{
 "name": ${fixedName ? `"<the user named it \"${fixedName}\" — keep this name, correcting ONLY an obvious misspelling or casing; never reword or replace it>",` : '"<the creature\'s proper name, 1-3 plain words>",'}
 "type": ${resolvedType ? `"${resolvedType}",   <- FIXED by the concept resolve — echo it exactly` : '"<one of: Aberration, Beast, Celestial, Construct, Dragon, Elemental, Fey, Fiend, Giant, Humanoid, Monstrosity, Ooze, Plant, Undead>",'}
 "size": "<Tiny|Small|Medium|Large|Huge|Gargantuan>",
 "alignment": "<a 2024 alignment — follow the concept's own moral read: tragic, driven, or feral is not Evil>",
 "senses": "<a senses line, e.g. 'darkvision 60 ft.'>",
 "languages": "<a languages line or 'None'>",
 "renames": { ${renameSkeleton} },   <- ALL of these keys, every one, none omitted. A name that claims an element must be PAID by that row's damage: "Burning X" needs Fire on the row (or the melee rider), "Rimefrost X" needs Cold. If the damage does not pay the word, drop the word, or qualify it with the true element the way print does (the Priest\'s "Radiant Flame" deals Radiant); folklore light-compounds (witchfire, foxfire, balefire) are always legal. NAME REGISTER — print's name BUDGET (measured from the corpus): standard rows stay terse — a plain-damage attack row is ONE weapon-noun or anatomy word (Bite, Talons, Greataxe); two words only when the row does more than plain damage (Flame Whip, Arcane Burst); utility rows take plain function names. ONLY the Signature Slot and the nova row earn a flavored name, and even there print compresses: two words, three at the absolute ceiling (Dreadful Glare, Curtain Call — never "Blade Scatter Finale"), a hyphenated compound counting as its parts. Legendary actions take the two-word flavored register, verb-forward (Pounce, Mind Jolt, Cold Gale) — never three words. One flourish on a sheet of terse names reads as a designer's touch; wall-to-wall kennings read as a generator.${mind === 'bestial' ? ' THIS creature is bestial: name its attack rows by anatomy alone (Bite, Talons, Slam, Gore) — its flavor lives in the trait and the lore, never in an attack name.' : ''} Never invent a compound word — print writes "Frost Axe", never "Frostaxe".
 "damage_types": { ${damageSkeleton} },   <- REQUIRED for every attack and the area action. PHYSICAL vs ENERGY follows the BODY (print: melee attacks deal the limb's physical type — a bite Piercing, a slam Bludgeoning, a claw Slashing — with energy reserved for the ranged attack and the area action; ONLY a creature whose body IS energy — incorporeal, elemental, formless — deals energy with its melee). A fully physical creature may answer physical for everything; never give every row the same energy — but also keep to ONE energy family across the block (print rarely fields two).${energy ? ` THIS creature's energy is ${energy} — every non-physical damage type you assign must be ${energy}.` : ''}${mix === 'physical' ? ' THIS creature deals PHYSICAL damage only — Bludgeoning, Piercing, or Slashing everywhere; no energy types anywhere on the block.' : ''}
${needsSpells ? ` "spells": { "at_will": ["<exactly 2 spells this concept would cast, from ONLY this list: ${(scaled.spell_menu ?? SPELL_MENU).join(', ')}>"], "daily": ["<exactly 2 MORE from the same list, no repeats — pick by THEME: the spells must feel like this creature\'s magic. A blaster picks its SIGNATURE damage spells (Fireball, Scorching Ray, Shatter...) — the engine prices the tiers>"] },\n` : ''}${needsProjectile ? ` "projectile": "<the thing it throws, 1-3 words WITH its article (a knucklebone / its barbed anchor) — it appears mid-sentence in attack text>",\n` : ''}${engineMenu.length ? ` "defense_engine": "<what this concept's defense IS — rampart (a punishing presence: a damaging emanation and a raised wall) | punisher (it answers every blow: a counter-strike reaction). Pick ONE from: ${engineMenu.join(', ')}>",\n` : ''}${needsEngulf ? ` "engulf_style": "<how this body takes a creature in: swallow (a mouth) | engulf (an amorphous mass, a slime, a swarm) | smother (fabric, wrappings, a collapsing bulk) | whelm (water or liquid) | cage (chains, bars, ribs) | entomb (stone, earth, ice) | cocoon (web, silk, strands) — the engine names and words the ability to match>",\n` : ''} "slot_save": "<the Saving Throw stat the Signature Slot should use — the stat the concept threatens: Strength|Dexterity|Constitution|Intelligence|Wisdom|Charisma>",
 "melee_rider": "<the ENERGY type the melee attack deals as a rider — or \"none\" if this creature's damage is purely physical (a fifth of printed monsters are)>",
 "speed_shape": "<\"climber\" keeps the Climb speed; \"runner\" trades it for +10 ft. walk (a charger, a rider, a sprinter has no business on walls)>",
 "lore": "<ONE sentence of world-lore: where it comes from and what it wants>",
 "vulnerability": "<a damage type this creature is VULNERABLE to — ONLY if the concept genuinely implies one (print is sparing: skeletons take extra Bludgeoning, mummies burn, a thing of ash fears Cold — the wound that made it). Most creatures have none: omit this field entirely.>",
 "conditions": { "condition_minor": "<one of: ${CONDITION_MENUS.condition_minor.join(', ')}>" },
}`;
}

const sweepDeadName = (sectionsMap, deadName, keepRow, traceFn) => {
  const bare = String(deadName ?? '').replace(/ \((?:Recharge [\d–-]+|\d\/Day)\)$/, '').trim();
  if (bare.length < 4) return;
  const esc = bare.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const hit = new RegExp(`\\b${esc}\\b`);
  const sentence = new RegExp(`[^.!?]*\\b${esc}\\b[^.!?]*[.!?]\\s*`, 'g');
  for (const esList of Object.values(sectionsMap)) {
    for (let j = esList.length - 1; j >= 0; j -= 1) {
      const row = esList[j];
      if (row === keepRow || !hit.test(row.text ?? '')) continue;
      const next = row.text.replace(sentence, '').trim();
      if (next) { row.text = next; traceFn('dead wildcard name swept —', `"${bare}" cited in "${row.name}"; the sentence drops`); }
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
export function reskinDefects(scaled, p, { energy = null, mix = null } = {}) {
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
      if (/\b(?:crossbow|longbow|shortbow|bow|bolts?|sling|musket|pistol|rifle)\b/i.test(rn) && /reach \d+ ft/.test(row.text)) {
        defects.push(`name "${rn}" is a launcher but the row swings in melee — a crossbow never has reach; use a thrown weapon or a blade`);
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
  const { concept = '', cr, onProgress = null, fixedName = null } = options;
  // no silent archetype default (owner ruling, 2026-08-26, same law as
  // pickDonor): a mis-wired route fails loudly, never ships the wrong
  // chassis family
  const archetype = options.archetype;
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
  const pcRoute = printCanonFor(options.userConcept ?? concept, cr);
  const shootsABow = !!pcRoute && pcRoute.ranged.some((n) => /\b(?:long|short)?bow\b|crossbow/i.test(n));
  if (shootsABow && style === 'hurler') trace('print canon route:', `"${options.userConcept ?? concept}" is the ${pcRoute.name}, a bow-user — the hurler seat stands down for the plain line`);
  const donor = pickDonor(cr, body ? null : (shootsABow && style === 'hurler' ? null : style), body ?? archetype);
  const scaled = scaleDonor(donor, cr, { movement: options.movement ?? [], mechanics: options.mechanics ?? null, dprScale: options.dprScale ?? 1 });
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
  const wildcardAllowed = cr > 2 || (Array.isArray(options.mechanics) && options.mechanics.length > 0);
  // WHO HAS TRAITS is the BODY's question, not the tier's (corpus 2026-09-28,
  // 329 blocks): a non-boilerplate trait rides Ooze 100% / Elemental 94% /
  // Undead 63% / Construct 60% / Aberration 56%, against Beast 33% / Humanoid
  // 27% / Giant 20% / Dragon 13%; presence-by-CR climbs from 53% to 100% only
  // because Legendary and Magic Resistance do — the non-boilerplate rate is
  // flat ~40% at every band. A material body's rules ARE its substance, so it
  // owes a trait at every CR (the bell-ringer's ghost "cannot leave the tower"
  // had nowhere to seat at CR 2, critic 2026-09-28).
  const materialBody = /^(?:Ooze|Elemental|Undead|Construct|Aberration)$/i.test(String(options.resolvedType ?? '').trim());
  const traitWildcardAllowed = cr > 2 || materialBody;
  // a PLAIN PRINT-CREATURE prompt ("a wolf", "a bear") is the print block: no
  // invented signature action, no seed, no fitted trait — the print traits and
  // the owed traits are its composition (a bear took a Dread Visage seed, 2026-09-28)
  const printPlain = !!printCanonFor(options.userConcept ?? concept, cr);
  if (printPlain) trace('print canon:', `"${options.userConcept ?? concept}" is a print creature — the seats stand down; print's own rows are the composition`);
  if (!wildcardAllowed) {
    for (const [secG, esG] of Object.entries(scaled.sections)) scaled.sections[secG] = esG.filter((eG) => !eG.wildcard_slot);
    trace('claim gate:', `CR ${cr} with no claimed mechanics — the wildcard slot drops (print: 74% of CR<=2 blocks carry no non-attack action)`);
  }
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
    const rangedByNature = scaled.style === 'hurler' || archetype === 'caster' || (scaled.archetypes ?? []).includes('artillery') || !typeR || /^(?:Humanoid|Giant|Fey)$/i.test(typeR);
    const claimed = ['ranged', 'mixed'].includes(String(options.attackMode ?? '').toLowerCase()) || (Array.isArray(options.mechanics) && options.mechanics.some((m) => /thrown-weapon|breath/.test(String(m))));
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
  const reskinPrompt = buildReskinPrompt(scaled, { concept, takenNames: options.takenNames ?? [], signatureElements: options.signatureElements ?? [], energy: options.energy ?? null, mix: options.mix ?? null, mind: options.mind ?? null, resolvedType: options.resolvedType ?? null, fixedName });
  const raw = await callLLM(reskinPrompt, validateReskinResponse);
  let p = (() => { try { return normalizeTypeFields(JSON.parse(String(raw).replace(/^```json\s*|```\s*$/g, '').trim())); } catch { return null; } })();
  if (!p) throw new Error('reskin call failed — the pilot fails loudly, never silently');
  p.wildcard = ''; p.wildcard_economy = 'action'; delete p.trait_wildcard; // the defect checker and the weld read these; nothing free-text exists
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
    const want = ['Large', 'Huge', 'Gargantuan'].includes(p.size) ? 'Large' : 'Medium';
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
    for (const [rn, t] of Object.entries(p.damage_types)) {
      if (['Bludgeoning', 'Piercing', 'Slashing'].includes(t) && ANAT_STAMP.test(rn)) {
        p.damage_types[rn] = options.energy ?? 'Force';
        trace('mental-anatomy stamp:', `"${rn}" ${t} -> ${p.damage_types[rn]} (repair exhausted; the engine picks the magical type)`);
      }
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
      // digestion is Acid (Toad, Worm) UNLESS the concept declares an
      // energy — a furnace gullet burns (the Crucible Hulk swallowed
      // with Acid inside a Fire body, 2026-09-10); every other
      // containment crushes — print's Rug and Whelm deal Bludgeoning
      const interior = options.energy ?? (['Swallow', 'Engulf'].includes(row.name) ? 'Acid' : 'Bludgeoning');
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
  const inline = body === 'swarm' ? 'the swarm' : `the ${shortForm(p.name)}`;
  let pendingWildcard = null;
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
  const card = cardBudget(cr, { legendary: !!scaled.legendary });
  const mods = Object.fromEntries(Object.entries(scaled.stats).map(([k, v]) => [k, Math.floor((v - 10) / 2)]));
  const monster = {
    name: p.name, format: '2024', cr, cr_str: ({ 0.125: '1/8', 0.25: '1/4', 0.5: '1/2' })[cr] ?? String(cr),
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
    generation: { path: 'reskin', donor: donor.id, archetype, ...(body ? { body } : {}), ...(options.menuRole ? { menu_role: options.menuRole } : {}), ...(donor.invented ? { invented: true } : donor.cite ? { cite: donor.cite } : {}) },
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
  if (pendingWildcard || body || traitWildcardAllowed) { // body lines have no slot row but still get a TRAIT seat (three seatless bodies, the wide run)
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
    const ctxT = {
      scaled, sections, archetype, style: scaled.style ?? null, cr, movement: (options.movement ?? []).join(' '),
      energy: options.energy ?? null, mix: options.mix ?? null, meleeName: meleeRowT?.name?.replace(/ \(.*\)$/, '') ?? 'Slam',
      conditionMinor: p.conditions?.condition_minor ?? null, projectile: p.projectile ?? null,
      imposed: imposedT, mechanics: options.mechanics ?? null, name: p.name, concept: options.userConcept ?? concept,
    };
    const stampT = (t) => String(t).split('The creature').join(inline.charAt(0).toUpperCase() + inline.slice(1)).split('the creature').join(inline);
    const tagOf = (idea) => `[${idea.section}/${idea.trigger}/${idea.effect}]`;
    let ideasT = null;
    try {
      const rawIdea = await callLLM(buildIdeaPrompt({ name: p.name, cr, concept, sheetLines: sheetSoFarT, seats: seatsT, energy: options.energy ?? null, wantTrait: traitWildcardAllowed, engines: enginesT, verbs: conceptVerbs(`${options.userConcept ?? concept} ${seatsT?.action ?? ''} ${seatsT?.trait ?? ''}`) }), validateIdeaResponse);
      ideasT = parseIdeas(rawIdea);
    } catch (e7) {
      trace('signature idea call failed —', `${e7?.message ?? e7}; the library stands in`);
    }
    const fitSeat = async (seat, idea) => {
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
      const verbText = `${options.userConcept ?? concept}`;
      const seatText = `${seat === 'trait' ? (seatsT?.trait ?? '') : (seatsT?.action ?? '')}`;
      // THE WHOLE SHELF IS IN THE RACE (goldens 2026-09-22): the concept's verb
      // decides the SECTION (the bishop's "blesses" is a bonus-action mark) and
      // the TRIGGER (a trait idea tagged "always" must still see the on-being-hit
      // cards when the concept says "knits shut around the axes"); the idea's own
      // tag only orders the menu it is shown. Before this the section menu was
      // the whole race: the troll's Weapon Lodge and the keeper's Marking Bolt
      // (seven of her words) missed on a tag the model chose
      const wide = (seat === 'trait' ? ['trait'] : ['action', 'bonus_action', 'reaction', 'rider']).flatMap((sec) => templatesFor({ ...ctxT, section: sec, trigger: null, text: verbText, imposed: imposedT })).filter(legalT);
      const pool = [...menu, ...wide.filter((t) => !menu.some((m) => m.id === t.id))];
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
        let fit = parseFit(rawFit, offered, p.name);
        if (!fit.template && conceptBound.length && rankByVerb([conceptBound[0]], verbText)[0].concept.length >= 2) {
          // an EXACT concept match (two or more of the user's own verbs) is the
          // engine's call, not the model's — the bell's resonant-body and the
          // goat's Bloodied burst were on the shelf and declined (critic run six)
          trace('signature bound by force:', `${seat} — "${conceptBound[0].id}" matches ${rankByVerb([conceptBound[0]], verbText)[0].concept.join('+')} in the user's words; the model's none is overruled`);
          fit = { template: conceptBound[0], because: 'exact concept match', name: null, fills: {} };
        }
        if (!fit.template && conceptBound.length && seat !== 'trait') { // a trait has no fallback: when the binder says none, none (critic run two)
          // the idea drifted off the concept's verb and the model honestly said
          // none — pour the CONCEPT itself (the user's words + the seat element)
          // into the verb's template instead; the idea only ever supplied fiction
          const conceptIdea = { ...idea, idea: `${verbText}. Build the concept's own verb (${[...new Set(verbRanked.flatMap((r) => r.concept))].join(', ')}) as this ability.` };
          trace('signature re-poured:', `${seat} — the idea left the concept's verb; the concept itself is poured into ${conceptBound.map((t) => t.id).join(', ')}`);
          fit = parseFit(await callLLM(buildFitPrompt({ name: p.name, sheet: sheetSoFarT, idea: conceptIdea, menu: offered, cr, concept: verbText }), validateFitResponse), offered, p.name);
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
        return { row: { name: `${bare}${rendered.gate ? ` (${rendered.gate})` : ''}`, text: stampT(rendered.text), library: true, template: fit.template.id }, templateName: rendered.name, section: rendered.section, template: fit.template.id, host: fit.template.host ?? 'melee', supersedes: fit.template.supersedes ?? null, because: `${fit.because}${verbs.length ? ` [verb: ${verbs.join(', ')}]` : ' [shape fit, no verb match]'}` };
      } catch (e8) {
        trace('signature fit call failed —', `${seat}: ${e8?.message ?? e8}`);
        return null;
      }
    };
    if (pendingWildcard) {
    let actionT = wildcardAllowed && !printPlain ? await fitSeat('action', ideasT?.action) : null;
    // the slot row leaves either way — a proven row stands where it stood
    wcDropped = true;
    for (const es2 of Object.values(sections)) {
      const ix = es2.indexOf(pendingWildcard);
      if (ix !== -1) es2.splice(ix, 1);
    }
    const deadBareT = String(pendingWildcard?.name ?? '').replace(/ \((?:Recharge [\d–-]+|\d\/Day)\)$/, '');
    let riderShipped = false;
    if (actionT && actionT.section === 'Rider') {
      // A RIDER rides the melee row: the clause is appended, no new row ships
      const wantRanged = actionT.host === 'ranged';
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
        host.text = `${host.text.trim()} ${riderText}`;
        libraryDrawn = true;
        riderShipped = true;
        trace('signature rider:', `${actionT.template} -> ${host.name} (appended; ${actionT.because})`);
        if (deadBareT) sweepDeadName(sections, deadBareT, host, trace);
      } else trace('signature miss:', `action — a rider fit (${actionT.template}) but the sheet has no ${wantRanged ? 'ranged' : 'melee'} row to ride`);
    }
    if (actionT && actionT.section !== 'Rider' && actionT.section !== 'Traits') { // a re-seated TRAIT never climbs the ladder (Wounded Tolling: 27 per hit, no save — fresh ten)
      // THE VALUE CHECK — the row must be worth the attack it replaces
      const vc = valueCheck(actionT.row, { scaled, sections, cr, section: actionT.section });
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
      (sections[actionT.section] = sections[actionT.section] ?? []).push(actionT.row);
      libraryDrawn = true;
      trace('signature template:', `${actionT.template} -> ${actionT.section}/"${actionT.row.name}" ("${actionT.because}")`);
      if (deadBareT && deadBareT !== actionT.row.name.replace(/ \(.*\)$/, '')) sweepDeadName(sections, deadBareT, actionT.row, trace);
    } else if (wildcardAllowed && !printPlain) { // the claim gate closes the ACTION seat at CR<=2 — the fallback is that seat's, and a material body's open TRAIT seat must not reopen it (review 2026-09-28)
      // the same filtered menu the fit saw (engine families, ownership); the
      // blind library hash is the last resort only when that menu is empty
      const fbVerbText = `${options.userConcept ?? concept}`; const fbSeatText = `${seatsT?.action ?? ''}`; // the user's words are the concept; the seat element is idea-level
      const shelfT = fallbackMenu({ ...ctxT, text: `${fbVerbText} ${fbSeatText}`, imposed: imposedT }, fbVerbText, fbSeatText);
      const verbFirst = rankByVerb(shelfT, fbVerbText, fbSeatText).filter((r) => r.matched.length).length; // the verb-ranked head is taken in order; only the rest rotates
      let drawn = null;
      for (let i = 0; i < shelfT.length && !drawn; i += 1) {
        const t = i < verbFirst ? shelfT[i] : shelfT[verbFirst + ((nameHash(p.name) + i) % Math.max(1, shelfT.length - verbFirst))];
        const r = renderTemplate(t, ctxT, {}, { blind: true });
        if (!r) { trace('fallback skipped:', `${t.id} (the sheet cannot render it)`); continue; }
        const cand = { seed: t.id, section: r.section, row: { name: `${r.name}${r.gate ? ` (${r.gate})` : ''}`, text: r.text, library: true } };
        // a seed the floor cannot lift is skipped for the next one, never shipped
        const pre = valueCheck(cand.row, { scaled, sections, cr, section: cand.section });
        if (pre.steps.some((st) => /still under|does nothing/.test(st))) { trace('fallback skipped by the floor:', `${t.id} (EV ${pre.ev} vs ${pre.floor})`); continue; }
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
      if (drawn && /\{[a-z_]+\}/.test(drawn.row.text)) drawn = null; // a seed with an unfilled flavor blank never ships raw
      if (drawn) {
        const vc = valueCheck(drawn.row, { scaled, sections, cr, section: drawn.section });
        if (vc.steps.length) { drawn.row.text = vc.text; drawn.row.name = vc.name; }
        trace('value check:', `"${drawn.row.name}" EV ${vc.ev} vs floor ${vc.floor} (${vc.replaced})${vc.steps.length ? ` — ${vc.steps.join('; ')}` : ' — worth the trade'}`);
        if (vc.steps.some((st) => /still under|does nothing/.test(st))) { trace('signature dropped by the floor:', `"${drawn.row.name}" — a seed that cannot be lifted does not ship`); drawn = null; }
      }
      if (drawn) {
        drawn.row.text = stampT(drawn.row.text);
        (sections[drawn.section] = sections[drawn.section] ?? []).push(drawn.row);
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
        tt.row.bound = bound;
        supersedeByTrait(tt);
        (sections[secT] = sections[secT] ?? []).unshift(tt.row);
        if (tt.template === 'assassinate') for (const es2 of Object.values(sections)) for (const e2 of es2) if (/\(with Advantage during the first round of each combat\)/.test(e2.text ?? '')) { e2.text = e2.text.replace(/ ?\(with Advantage during the first round of each combat\)/, ''); trace('inline rider retired:', `${e2.name} — Assassinate grants the first-round Advantage now`); }
        trace('signature template (trait):', `${tt.template} -> ${secT}/"${tt.row.name}" ("${tt.because}")`);
      };
      // OWED FIRST (critic, the fourteen): a trait the SEAT owes by print seats
      // non-competitively and the idea competes for what remains — four blocks
      // lost their defining clause to a proposal the shelf could not hold. The
      // list is print's composition for that seat, not one row.
      const owedList = [...(SEAT_DEFAULT_TRAIT[scaled.style ?? ''] ?? SEAT_DEFAULT_TRAIT[archetype] ?? []), ...(Array.isArray(options.mechanics) ? options.mechanics.flatMap((mk) => MECHANIC_OWED_TRAIT[String(mk)] ?? []) : [])]; // a claimed mechanic owes its trait too (gaze → Vile Appearance)
      for (const owed of owedList) {
        if (traitT?.template === owed || Object.values(sections).flat().some((e2) => e2.template === owed)) continue;
        const ot = TEMPLATE_BY_ID.get(owed);
        if (!ot || !templatesFor({ ...ctxT, section: ot.section, trigger: null }).some((x) => x.id === owed)) continue;
        const r = renderTemplate(ot, ctxT, {}, { blind: true });
        if (!r) continue;
        trace('seat default:', `${scaled.style ?? archetype} owes ${owed} by print — it seats before the idea`);
        shipTrait({ row: { name: r.name, text: stampT(r.text), library: true, template: owed }, templateName: r.name, section: r.section, template: owed, because: 'the seat owes it by print', owed: true });
      }
      // a MEAT body earns its trait by a verb (review 2026-09-28): "a bear" took a
      // barbed coat the shelf fit with no word of the concept or the idea behind
      // it. A material body's substance is a rule, so a shape fit stands there;
      // on meat, a pick that matched nothing is the model's decoration, not the
      // user's creature.
      if (traitT && !materialBody && /\[shape fit, no verb match\]/.test(traitT.because ?? '')) { trace('trait declined:', `"${traitT.row.name}" — a shape fit with no verb match on a ${options.resolvedType ?? 'meat'} body; a meat body earns its trait by a verb`); traitT = null; }
      if (traitT) shipTrait(traitT);
    }
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
    const dm = /(\d+)d(\d+)(?:\s*\+\s*(\d+))?/.exec(monster.hp_formula ?? '');
    if (dm) monster.hp = Math.floor(Number(dm[1]) * (Number(dm[2]) + 1) / 2) + Number(dm[3] ?? 0);
  }
  // HEADER HONESTY (owner + critic 2026-09-22): speed from the concept's
  // movement set, languages from the mind, attack names from anatomy, fire
  // defenses from the material — all derived, all closed sets (header.mjs)
  {
    // A NEGATIVE CLAUSE REMOVES THE CAPABILITY (critic, blind A/B 2026-09-28: the
    // angel "with its wings sewn shut" flew 70 feet in one arm) — by rule, not by
    // the model's mood: the concept's own words take Fly out of the movement set
    const NEGATED_FLIGHT = /\bwings?\s+(?:sewn|stitched|bound|clipped|broken|torn|pinned|nailed|shut|tied)\b|\b(?:can(?:'t|not)|cannot|never|no longer) (?:fly|flies)\b|\bflightless\b|\bwingless\b|\bgrounded\b/i;
    const negatedFly = NEGATED_FLIGHT.test(options.userConcept ?? concept ?? '');
    const pcSpeed = printCanonFor(options.userConcept ?? concept, cr);
    const movementBase = pcSpeed ? pcSpeed.modes : (options.movement ?? []); // a print creature moves the way print says (a wolf climbed at 50 ft.)
    if (pcSpeed) trace('print canon speed:', `modes ${pcSpeed.modes.join(', ') || 'walk only'} — the ${pcSpeed.name}'s`);
    const movementT2 = movementBase.filter((m) => !(negatedFly && String(m).toLowerCase() === 'fly'));
    if (negatedFly && (options.movement ?? []).some((m) => String(m).toLowerCase() === 'fly')) trace('flight removed by the concept:', 'a negative clause names the wings — Fly leaves the movement set');
    const sp = honestSpeed(monster.speed, { movement: movementT2, style: scaled.style ?? null, bodyType: options.bodyType ?? null });
    // written whenever the line CHANGED, not only on an add or a drop: a kept
    // crawl lifted beside a fly speed (the lamplighter's Swim 5, manual smoke
    // 2026-09-22) is a change too
    if (sp.speed !== String(monster.speed ?? '')) { monster.speed = sp.speed; trace('speed by concept:', `${sp.dropped.length ? `dropped ${sp.dropped.join(', ')}` : ''}${sp.dropped.length && sp.added.length ? '; ' : ''}${sp.added.length ? `added ${sp.added.join(', ')}` : ''} — the concept's movement set decides`); }
    if (/^Construct\b/i.test(monster.type ?? '') && scaled.style === 'trap' && !/\b(?:speaks?|voices?|talks?|whispers?|sings?|says?|mimics?)\b/i.test(options.userConcept ?? concept ?? '')) {
      // a lurking OBJECT has no voice unless the concept gives it one (Common on a rain barrel, 2026-09-28)
      monster.languages = "Understands the languages of its creator but can't speak"; trace('languages by body:', 'a trap-line Construct with no voice in the concept');
    } else if (options.mind || /^Beast\b/i.test(monster.type ?? '')) { // a Beast never speaks even when the resolve read no mind (Common on a crab, a bird, 2026-09-28)
      const before = monster.languages; monster.languages = honestLanguages(monster.languages, { mind: options.mind, type: monster.type ?? '' });
      if (before !== monster.languages) trace('languages by mind:', `"${before}" -> "${monster.languages}" (${options.mind})`);
    }
    // PRINT CANON, the attack names: a plain prompt's melee rows take the print
    // block's own names in order (Wolf: Bite; Brown Bear: Bite, Claw) — the
    // anatomy pass then only has to agree with them
    {
      const pc = printCanonFor(options.userConcept ?? concept, cr);
      if (pc && pc.melee.length) {
        const meleeRows = Object.values(monster.sections).flat().filter((e) => /Melee Attack Roll/.test(e.text ?? '') && !/Melee or Ranged/.test(e.text ?? ''));
        meleeRows.forEach((e, i) => {
          const pr = pc.meleeRows[Math.min(i, pc.meleeRows.length - 1)]; const to = pr?.name; const from = String(e.name ?? '').replace(/ \(.*\)$/, '');
          if (!to) return;
          // the print row's TYPE and RIDER ride along (a wolf's Bite is Piercing and
          // knocks Prone; ours dealt Poison — critic 2026-09-28); the seat's energy
          // rider leaves a plain print creature
          if (pr.type) e.text = e.text.replace(/(\d+ \(\d+d\d+(?: \+ \d+)?\)) (Bludgeoning|Piercing|Slashing) damage/, `$1 ${pr.type} damage`);
          e.text = e.text.replace(/ plus \d+ \(\d+d\d+(?: \+ \d+)?\) [A-Z][a-z]+ damage/, '');
          if (pr.rider && !/If the target|has the \w+ condition/.test(e.text)) e.text = `${e.text.trim().replace(/[^.!?]$/, (c) => `${c}.`)} ${pr.rider.replace(new RegExp(`\\bthe ${pc.last}\\b`, 'gi'), inline)}`;
          if (from === to || meleeRows.some((o) => o !== e && String(o.name ?? '').replace(/ \(.*\)$/, '') === to)) return;
          const re = new RegExp(`\\b${from.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'g');
          e.name = to;
          for (const es3 of Object.values(monster.sections)) for (const e3 of es3) if (e3 !== e && re.test(e3.text ?? '')) e3.text = e3.text.replace(re, to);
          trace('print canon attack:', `"${from}" -> "${to}" — the ${pc.name}'s own row`);
        });
        const rangedRows = Object.values(monster.sections).flat().filter((e) => /Ranged Attack Roll/.test(e.text ?? ''));
        rangedRows.forEach((e, i) => {
          const prr = pc.rangedRows[Math.min(i, pc.rangedRows.length - 1)]; const to = prr?.name; const from = String(e.name ?? '').replace(/ \(.*\)$/, '');
          if (prr?.range) e.text = e.text.replace(/range \d+\/\d+ ft\./, `range ${prr.range} ft.`); // print's range for print's weapon (a Longbow is 150/600, not 30/90)
          if (!to || from === to) return;
          const re = new RegExp(`\\b${from.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'g');
          e.name = to;
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
        const re = new RegExp(`\\b${fromBare.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'g');
        for (const es3 of Object.values(monster.sections)) for (const e3 of es3) if (re.test(e3.text ?? '')) { e3.text = e3.text.replace(re, c.to); trace('rename propagated:', `"${fromBare}" -> "${c.to}" in "${e3.name}"`); }
      }
    }
    const fd = honestFireDefenses(monster, { material: options.material ?? null, concept: options.userConcept ?? concept });
    if (fd) trace('defenses by material:', fd);
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
      const hasRow = (re) => Object.values(sections).flat().some((e2) => re.test(`${e2.name} ${e2.text}`));
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
      const pc = printCanonFor(options.userConcept ?? concept, cr);
      if (pc && !skip.has(pc.last)) { // a rejected canon cue (the resolve said "not a troll") rejects the print block too
        for (const t of pc.traits) {
          if (hasRow(new RegExp(t.name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i'))) continue;
          const text = t.text.replace(new RegExp(`\\bthe ${pc.last}'s\\b`, 'gi'), `${inline}'s`).replace(new RegExp(`\\bthe ${pc.last}\\b`, 'gi'), inline).replace(new RegExp(`(?<!\\bthe )\\b${pc.last}'s\\b`, 'gi'), `${inline}'s`); // a bare possessive only — "the wolf's" was already handled (it minted "the the wolf's")
          (sections.Traits = sections.Traits ?? []).push({ name: t.name, text: text.charAt(0).toUpperCase() + text.slice(1), rules: true });
          trace('print canon trait:', `${t.name} — "${options.userConcept ?? concept}" is the ${pc.name} (print's own row)`);
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
    const warrantText = `${concept} ${p.lore ?? ''}`.replace(/lightning-(?:fast|quick|swift)|quick as lightning/gi, '');
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
        if (/ \((?:Recharge [\d–-]+|\d\/Day)\)$/.test(e2.name)) {
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
    const saveAction = (sections.Actions ?? []).find((e2) => !e2.name.startsWith('Multiattack') && !e2.name.startsWith('Spellcasting')
      // the or-form dialect counts too (the split tar-splash class,
      // 2026-09-15: "Saving Throw or have..." has no colon and the
      // finder skipped every wrapper sighting)
      && !/\((?:Recharge [\d–-]+|\d\/Day)\)/.test(e2.name) && /Saving Throw[:*]|must (?:make|succeed on) a DC \d+/.test(e2.text ?? '') && !/Attack Roll:/.test(e2.text ?? ''));
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
    if (/(?:its|'s) [Ss]peed is 0\b(?![^.]{0,40}until)/.test(allTexts) && !/^0 ft\./.test(monster.speed ?? '')) {
      lint.findings.push({ rule: 'speed-discord', severity: 'audit', message: `a trait sets Speed 0 permanently while the header says "${monster.speed}" — print puts immobility in the header (Speed 0 ft. or 5 ft.) and deletes the trait clause` });
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
  trace('done:', `"${monster.name}" — donor ${donor.id}, CR ${cr}`);
  return monster;
}
