/**
 * Chassis layer for 2024 statblock generation (build-order step 1).
 *
 * CR → baseline AC/HP/attack/DC/PB, deterministic JS. The LLM never generates
 * numbers — see docs/2024-architecture.md (the contract) and
 * src/data/archetype-chassis-spec.json (the fitted spec).
 *
 * Coefficients below mirror spec.chassis.formulas_cr_gte_1. They are code, not
 * eval'd from the JSON strings; the test suite holds them accountable to the
 * empirical per-CR medians in src/data/chassis-test-fixtures.json, so drift
 * between code and spec surfaces as a test failure against ground-truth data.
 */
import spec from '@/data/archetype-chassis-spec.json';

const ANCHORS = spec.chassis.anchors_cr_lt_1;

// spec.archetypes carries a "_comment" documentation key alongside the real profiles.
const ARCHETYPES = Object.fromEntries(
  Object.entries(spec.archetypes).filter(([name]) => !name.startsWith('_'))
);

const FRACTIONAL_CRS = [0, 0.125, 0.25, 0.5];

/** Shared CR-domain guard, also used by the slot-plan resolver. */
export function assertValidCR(cr) {
  const valid =
    typeof cr === 'number' &&
    Number.isFinite(cr) &&
    (FRACTIONAL_CRS.includes(cr) || (Number.isInteger(cr) && cr >= 1 && cr <= 30));
  if (!valid) {
    throw new RangeError(
      `Invalid CR: ${cr}. Valid CRs are 0, 0.125, 0.25, 0.5, and integers 1-30.`
    );
  }
}

/**
 * Proficiency bonus for a CR, per the 5e progression (+2 at CR < 5, then +1
 * every 4 CR).
 */
export function pbFor(cr) {
  assertValidCR(cr);
  return cr < 5 ? 2 : 2 + Math.floor((Math.ceil(cr) - 1) / 4);
}

/**
 * Ability scores cap at 30 (+10 mod), so an attack bonus above PB + 10 or a
 * save DC above PB + 18 is unconstructible as an ability derivation — a
 * combination official blocks never print (they undershoot the ceiling,
 * never exceed it). The raw formulas obey this at every CR; archetype
 * attack/dc mods at CR 27+ would otherwise push past it (live finding:
 * lurker CR 28 emitted +19 to hit against a +18 ceiling, which then baked
 * an impossible +11 flat damage mod into the skeleton).
 */
function capToAbilityCeiling(chassis) {
  return {
    ...chassis,
    attack_bonus: Math.min(chassis.attack_bonus, chassis.pb + 10),
    save_dc: Math.min(chassis.save_dc, chassis.pb + 18),
  };
}

/**
 * Baseline ("Balanced") chassis for a CR. CR below 1 uses the anchor table
 * from the spec; CR 1+ uses the fitted linear formulas.
 */
export function chassisFor(cr) {
  assertValidCR(cr);
  if (cr < 1) {
    const anchor = ANCHORS[String(cr)];
    return capToAbilityCeiling({ cr, pb: pbFor(cr), ...anchor });
  }
  return capToAbilityCeiling({
    cr,
    pb: pbFor(cr),
    ac: Math.round(12.9 + 0.37 * cr),
    hp: Math.round(10 + 17 * cr),
    attack_bonus: Math.round(4.1 + 0.51 * cr),
    save_dc: Math.round(11.2 + 0.52 * cr),
  });
}

/**
 * Apply an archetype's modifier profile to a chassis. Returns a new object;
 * the input chassis is not mutated.
 *
 * Numeric fields (hp/ac/attack_bonus/save_dc) are adjusted here. damage_mult,
 * nova_mult, required_slots, forbidden, and solo_warning are passed through
 * untouched for the downstream slot-resolver (step 2) and lint (step 4)
 * layers — the chassis has no damage baseline; damage budgets are per-slot.
 */
export function applyArchetype(chassis, archetypeName) {
  const profile = ARCHETYPES[archetypeName];
  if (!profile) {
    throw new RangeError(
      `Unknown archetype: ${archetypeName}. Valid archetypes: ${Object.keys(ARCHETYPES).join(', ')}`
    );
  }
  if (
    !chassis ||
    typeof chassis.hp !== 'number' ||
    typeof chassis.ac !== 'number' ||
    typeof chassis.attack_bonus !== 'number' ||
    typeof chassis.save_dc !== 'number'
  ) {
    throw new TypeError('applyArchetype expects a chassis from chassisFor()');
  }

  const adjusted = capToAbilityCeiling({
    ...chassis,
    archetype: archetypeName,
    hp: Math.round(chassis.hp * (profile.hp_mult ?? 1)),
    ac: chassis.ac + (profile.ac_mod ?? 0),
    attack_bonus: chassis.attack_bonus + (profile.attack_mod ?? 0),
    save_dc: chassis.save_dc + (profile.dc_mod ?? 0),
    damage_mult: profile.damage_mult ?? 1,
    required_slots: [...(profile.required_slots ?? [])],
    forbidden: [...(profile.forbidden ?? [])],
  });
  if (profile.nova_mult != null) adjusted.nova_mult = profile.nova_mult;
  if (profile.solo_warning != null) adjusted.solo_warning = profile.solo_warning;
  return adjusted;
}
