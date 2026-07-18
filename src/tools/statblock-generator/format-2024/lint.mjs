/**
 * 2024 statblock lint (build-order step 4 of docs/2024-architecture.md).
 *
 * Enforces the spec's lint_rules against the JSON block model (the same shape
 * srd52-monsters.json uses and the generation pipeline emits). The validation
 * section of scripts/parse-srd52.py is the reference implementation for the
 * consistency math (HP dice averages, mod/save sets, PB/XP tables) and the
 * text-extraction regexes.
 *
 * Severities (per the architecture contract):
 * - 'correctable' — out-of-budget or inconsistent NUMBERS. Findings carry the
 *   expected value; the caller clamps the numbers and regenerates flavor only,
 *   never accepting LLM numbers.
 * - 'reject' — missing required slots, structural violations, 2014 phrasing.
 *   The generation is rejected and flavor regenerated.
 *
 * Rule groups:
 * - Context-free rules always run. Calibrated against all 329 SRD blocks:
 *   zero false positives (the corpus test pins this), with one caveat — the
 *   SRD itself contains two vestigial "to hit" strings and 13 legitimate
 *   "to hit with spell attacks" spellcasting headers; the rule excepts the
 *   spellcasting phrasing only.
 * - Budget rules run when opts.chassis (archetype-adjusted, from
 *   applyArchetype/chassisFor) is provided.
 * - Structural rules run when opts.plan (from slotPlanFor) is provided.
 *   Required slots use the slot-tag protocol: the prompt layer instructs the
 *   model to tag each section entry with the slot id it fills (entry.slot);
 *   passive slots (stat/field obligations) are checked directly against the
 *   model's fields.
 */
import { pbFor } from '../chassis/chassis.mjs';

const HP_BAND = [0.75, 1.35];

const XP_BY_CR = {
  0: 10, 0.125: 25, 0.25: 50, 0.5: 100, 1: 200, 2: 450, 3: 700, 4: 1100,
  5: 1800, 6: 2300, 7: 2900, 8: 3900, 9: 5000, 10: 5900, 11: 7200, 12: 8400,
  13: 10000, 14: 11500, 15: 13000, 16: 15000, 17: 18000, 18: 20000, 19: 22000,
  20: 25000, 21: 33000, 22: 41000, 23: 50000, 24: 62000, 25: 75000, 26: 90000,
  27: 105000, 28: 120000, 29: 135000, 30: 155000,
};

const ABILITIES = ['Strength', 'Dexterity', 'Constitution', 'Intelligence', 'Wisdom', 'Charisma'];

// 2024 conditions that must render capitalized. "Exhaustion" is excluded —
// it appears legitimately in prose forms the SRD itself uses.
const CONDITIONS = [
  'Blinded', 'Charmed', 'Deafened', 'Frightened', 'Grappled', 'Incapacitated',
  'Invisible', 'Paralyzed', 'Petrified', 'Poisoned', 'Prone', 'Restrained',
  'Stunned', 'Unconscious',
];
const LOWERCASE_CONDITION_RE = new RegExp(
  `\\b(${CONDITIONS.map((c) => c.toLowerCase()).join('|')})\\b`
);

// 2014-style lead-in glued onto the structured 2024 save skeleton
// ("...must make a Dexterity Saving Throw: DC 27, each creature...").
// Never legal 2024; zero hits across the SRD corpus.
const HYBRID_SAVE_RE =
  /must (?:make|succeed on) an? \*?(?:Strength|Dexterity|Constitution|Intelligence|Wisdom|Charisma)\*? \*?Saving Throw\*?\s*:/i;

// Game terms the 2024 SRD always capitalizes (case-sensitive; zero lowercase
// occurrences across the corpus).
const LOWERCASE_TERM_RE = /\b(hit points?|opportunity attacks?)\b/;

const SECTION_FOR_CATEGORY = {
  trait: 'Traits',
  action: 'Actions',
  bonus_action: 'Bonus Actions',
  reaction: 'Reactions',
};

// Passive required slots are field-level obligations, checked directly.
const PASSIVE_SLOT_CHECKS = {
  'high STR': (m) => (m.stats?.STR ?? 0) >= 16,
  'resistance package: Bludgeoning/Piercing/Slashing': (m) =>
    ['Bludgeoning', 'Piercing', 'Slashing'].every((d) => (m.resistances ?? '').includes(d)),
  'condition immunities: Charmed, Frightened, Grappled, Paralyzed, Petrified, Prone, Restrained, Stunned':
    (m) =>
      ['Charmed', 'Frightened', 'Grappled', 'Paralyzed', 'Petrified', 'Prone', 'Restrained', 'Stunned']
        .every((c) => (m.immunities ?? '').includes(c)),
};

/** floor(NdD average) + mod — mirrors avg_dice in parse-srd52.py. */
export function avgDice(expr) {
  const m = /^\s*(\d+)d(\d+)\s*([+-]\s*\d+)?\s*$/.exec(expr ?? '');
  if (!m) return null;
  const n = Number(m[1]);
  const d = Number(m[2]);
  const mod = m[3] ? Number(m[3].replace(/\s/g, '')) : 0;
  return Math.floor((n * (d + 1)) / 2) + mod;
}

const modOf = (score) => Math.floor((score - 10) / 2);

function entriesOf(monster) {
  const out = [];
  for (const [section, entries] of Object.entries(monster.sections ?? {})) {
    for (const entry of entries ?? []) out.push({ section, entry });
  }
  return out;
}

function maxExtracted(monster, re) {
  let max = null;
  for (const { entry } of entriesOf(monster)) {
    for (const m of entry.text.matchAll(re)) {
      const v = Number(m[1]);
      if (max === null || v > max) max = v;
    }
  }
  return max;
}

export function lintStatblock(monster, { chassis, plan } = {}) {
  if (!monster || typeof monster !== 'object') {
    throw new TypeError('lintStatblock expects a statblock model object');
  }
  const findings = [];
  const push = (rule, severity, message, expected) => {
    findings.push(expected === undefined ? { rule, severity, message } : { rule, severity, message, expected });
  };

  // --- Context-free consistency rules -------------------------------------
  if (monster.hp != null && monster.hp_formula != null) {
    const avg = avgDice(monster.hp_formula);
    if (avg === null) {
      push('hp-formula', 'correctable', `HP formula "${monster.hp_formula}" is not parseable NdD ± mod`);
    } else if (avg !== monster.hp) {
      push('hp-formula', 'correctable', `HP listed ${monster.hp} but formula ${monster.hp_formula} averages ${avg}`, avg);
    }
  }

  if (monster.stats && monster.saves) {
    const pb = monster.pb ?? (monster.cr != null ? pbFor(monster.cr) : null);
    for (const [ab, save] of Object.entries(monster.saves)) {
      const score = monster.stats[ab];
      if (typeof score !== 'number') continue;
      const mod = modOf(score);
      const legal = pb == null ? [mod] : [mod, mod + pb, mod + 2 * pb];
      if (!legal.includes(save)) {
        push('saves', 'correctable', `${ab} save ${save} is not mod (${mod}) or mod+PB`, mod);
      }
    }
  }

  // Initiative absence is fine (the renderer derives it from DEX); when
  // present, the passive score must be 10 + bonus.
  if (monster.initiative_bonus != null || monster.initiative_score != null) {
    if (
      monster.initiative_bonus == null ||
      monster.initiative_score !== 10 + monster.initiative_bonus
    ) {
      const expected = monster.initiative_bonus != null ? 10 + monster.initiative_bonus : undefined;
      push('initiative', 'correctable', 'Initiative must pair a bonus with passive score 10 + bonus', expected);
    }
  }

  if (monster.pb != null && monster.cr != null) {
    const expected = pbFor(monster.cr);
    if (monster.pb !== expected) {
      push('pb', 'correctable', `PB +${monster.pb} inconsistent with CR ${monster.cr} (table says +${expected})`, expected);
    }
  }

  if (monster.xp != null && monster.cr != null) {
    const expected = XP_BY_CR[monster.cr];
    const ok = monster.cr === 0 ? monster.xp === 0 || monster.xp === 10 : monster.xp === expected;
    if (expected != null && !ok) {
      push('xp', 'correctable', `XP ${monster.xp} inconsistent with CR ${monster.cr} (table says ${expected})`, expected);
    }
  }

  for (const { section, entry } of entriesOf(monster)) {
    const where = `${section}/${entry.name}`;
    if (/(Melee|Ranged)\s+(Weapon|Spell)\s+Attack/.test(entry.text)) {
      push('phrasing-2014', 'reject', `2014 attack phrasing in ${where} — use "Melee Attack Roll:" form`);
    }
    if (/to hit(?! with spell attacks)/.test(entry.text)) {
      push('phrasing-to-hit', 'reject', `"to hit" phrasing in ${where} — 2024 attack lines carry no "to hit"`);
    }
    for (const m of entry.text.matchAll(/Saving Throw/g)) {
      const before = entry.text.slice(0, m.index);
      if (!new RegExp(`(${ABILITIES.join('|')})[*\\s]*$`).test(before)) {
        push('phrasing-saving-throw', 'reject', `Saving throw in ${where} must name an ability: "*Constitution Saving Throw*: DC n"`);
        break;
      }
    }
    const lower = LOWERCASE_CONDITION_RE.exec(entry.text);
    if (lower) {
      push('condition-caps', 'reject', `Lowercase condition "${lower[1]}" in ${where} — 2024 conditions are capitalized`);
    }
    if (HYBRID_SAVE_RE.test(entry.text)) {
      push('phrasing-hybrid-save', 'reject', `Hybrid save phrasing in ${where} — the "*Ability Saving Throw*: DC n, <targets>" skeleton is the whole sentence; drop the "must make a" lead-in`);
    }
    const term = LOWERCASE_TERM_RE.exec(entry.text);
    if (term) {
      push('term-caps', 'reject', `Lowercase game term "${term[1]}" in ${where} — 2024 capitalizes Hit Points and Opportunity Attacks`);
    }
    // Every damage expression must be internally consistent: N (XdY ± Z)
    // with N = floor-average. Calibrated against all 728 expressions in the
    // SRD corpus: zero mismatches, so full strictness is safe.
    for (const dm of entry.text.matchAll(/(\d+)\s*\((\d+d\d+(?:\s*[+-]\s*\d+)?)\)/g)) {
      const avg = avgDice(dm[2]);
      if (avg !== null && avg !== Number(dm[1])) {
        push('damage-dice', 'correctable', `${where}: "${dm[0]}" — ${dm[2]} averages ${avg}`, avg);
      }
    }
  }

  // --- Budget rules (need archetype-adjusted chassis) ---------------------
  if (chassis) {
    if (monster.hp != null) {
      const ratio = monster.hp / chassis.hp;
      if (ratio < HP_BAND[0] || ratio > HP_BAND[1]) {
        push('hp-band', 'correctable', `HP ${monster.hp} outside [${HP_BAND[0]}, ${HP_BAND[1]}] of budget ${chassis.hp}`, chassis.hp);
      }
    }
    if (monster.ac != null && Math.abs(monster.ac - chassis.ac) > 1) {
      push('ac-band', 'correctable', `AC ${monster.ac} outside ±1 of budget ${chassis.ac}`, chassis.ac);
    }
    const maxAttack = maxExtracted(monster, /Attack Roll:\*?\s*\+(\d+)/g);
    if (maxAttack != null && Math.abs(maxAttack - chassis.attack_bonus) > 1) {
      push('attack-band', 'correctable', `Attack bonus +${maxAttack} outside ±1 of budget +${chassis.attack_bonus}`, chassis.attack_bonus);
    }
    const maxDC = maxExtracted(monster, /DC\s+(\d+)/g);
    if (maxDC != null && Math.abs(maxDC - chassis.save_dc) > 1) {
      push('dc-band', 'correctable', `Save DC ${maxDC} outside ±1 of budget ${chassis.save_dc}`, chassis.save_dc);
    }
  }

  // --- Structural rules (need slot plan) ----------------------------------
  if (plan) {
    const all = entriesOf(monster);

    for (const slot of plan.required_slots) {
      const passiveCheck = PASSIVE_SLOT_CHECKS[slot.description];
      if (slot.category === 'passive' && passiveCheck) {
        if (!passiveCheck(monster)) {
          push('slot-missing', 'reject', `Required passive slot not satisfied: ${slot.description}`);
        }
        continue;
      }
      const categories = Array.isArray(slot.category) ? slot.category : [slot.category];
      const sections = categories.map((c) => SECTION_FOR_CATEGORY[c]).filter(Boolean);
      const filled = all.some(
        ({ section, entry }) => entry.slot === slot.description && sections.includes(section)
      );
      if (!filled) {
        push('slot-missing', 'reject', `Required slot not filled (tag an entry in ${sections.join(' or ')} with slot id): ${slot.description}`);
      }
    }

    const actions = monster.sections?.Actions ?? [];
    const hasMultiattack = actions.some((e) => e.name.startsWith('Multiattack'));
    if (plan.multiattack.status === 'required' && !hasMultiattack) {
      push('multiattack', 'reject', 'Multiattack action is required at this tier');
    }
    if (plan.multiattack.status === 'forbidden' && hasMultiattack) {
      push('multiattack', 'reject', 'Multiattack is not allowed at this tier');
    }

    const legendary = monster.sections?.['Legendary Actions'] ?? [];
    if (plan.legendary.status === 'required' && legendary.length === 0) {
      push('legendary', 'reject', 'Legendary Actions are required at this tier');
    }
    if (plan.legendary.status === 'forbidden' && legendary.length > 0) {
      push('section-structure', 'reject', 'Legendary Actions are not allowed at this tier');
    }
    for (const [field, section] of [['bonus_action', 'Bonus Actions'], ['reaction', 'Reactions']]) {
      if (plan[field] === 'forbidden' && (monster.sections?.[section] ?? []).length > 0) {
        push('section-structure', 'reject', `${section} are not allowed at this tier`);
      }
    }

    const nTraits = (monster.sections?.Traits ?? []).length;
    const nActions = actions.length;
    if (nTraits < plan.traits.min || nTraits > plan.traits.max) {
      push('counts', 'reject', `${nTraits} traits outside plan range [${plan.traits.min}, ${plan.traits.max}]`);
    }
    if (nActions < plan.actions.min || nActions > plan.actions.max) {
      push('counts', 'reject', `${nActions} actions outside plan range [${plan.actions.min}, ${plan.actions.max}]`);
    }
  }

  return { ok: findings.length === 0, findings };
}
