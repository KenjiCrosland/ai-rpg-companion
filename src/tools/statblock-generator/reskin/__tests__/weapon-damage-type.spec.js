/**
 * A WEAPON ROW DEALS ITS WEAPON'S DAMAGE.
 *
 * Owner, 2026-10-30, spot-checking the Dayvault Warden: "I don't mind fire as a
 * rider but spears should do physical damage unless it's a 'fire spear' and even
 * then probably not." That sheet's Spear dealt 19 (4d6 + 5) FIRE and nothing
 * physical, and every damage source on it was Fire.
 *
 * Print agrees without qualification: 53 rows named after a mundane weapon, 53
 * dealing a physical type as the main damage, 0 pure energy, and 11 carrying an
 * energy RIDER on top — the Knight's Greatsword is "Slashing plus Radiant", never
 * Radiant alone. So the owner's "even then probably not" is print's position too.
 *
 * The engine already preferred the row's declared weapon over the body's energy,
 * but only inside the `energyWithheld` branch, which fires only for a HUMANOID
 * whose energy has no warrant in the concept's own words. The warden is a
 * Monstrosity, so the gate never applied. A weapon's damage type is not a
 * question about the body, so the stamp now wins unconditionally.
 */
import printBlocks from '@/data/srd52-monsters.json';
import { WEAPONS } from '@/tools/statblock-generator/reskin/weapons.mjs';
import { buildReskinPrompt } from '@/tools/statblock-generator/reskin/generate.mjs';
import { pickDonor, scaleDonor } from '@/tools/statblock-generator/reskin/scale.mjs';

const PHYS = ['Bludgeoning', 'Piercing', 'Slashing'];
const WEAPON_ROW = /^(Spear|Longsword|Shortsword|Greatsword|Greataxe|Handaxe|Javelin|Mace|Maul|Dagger|Club|Warhammer|Pike|Glaive|Halberd|Scimitar|Rapier|Quarterstaff|Trident|Longbow|Shortbow|Light Crossbow|Hand Crossbow|Heavy Crossbow|Sling|Dart|Whip|Sickle|Morningstar|Flail|Lance|Battleaxe)\b/;

const printWeaponRows = printBlocks.flatMap((b) => Object.values(b.sections ?? {}).flat()
  .filter((r) => WEAPON_ROW.test(String(r?.name ?? '')))
  .map((r) => ({ block: b.name, name: r.name, comps: [...String(r.text ?? '').matchAll(/\d+ \(\d+d\d+(?:\s*[+-]\s*\d+)?\) (\w+) damage/g)].map((m) => m[1]) }))
  .filter((r) => r.comps.length));

describe('print, which the rule is taken from', () => {
  it('has a worthwhile sample', () => {
    expect(printWeaponRows.length).toBeGreaterThanOrEqual(50);
  });

  it('never gives a weapon row energy alone — every one deals a physical type', () => {
    const pureEnergy = printWeaponRows.filter((r) => !r.comps.some((c) => PHYS.includes(c)));
    expect(pureEnergy).toEqual([]);
  });

  it('does put energy on a weapon row as a RIDER, which is what the owner allows', () => {
    const riders = printWeaponRows.filter((r) => r.comps.some((c) => PHYS.includes(c)) && r.comps.some((c) => !PHYS.includes(c)));
    expect(riders.length).toBeGreaterThanOrEqual(10);
    // the one the ruling turns on: themed hard, still physical first
    const knight = riders.find((r) => r.block === 'Knight' && r.name === 'Greatsword');
    expect(knight.comps[0]).toBe('Slashing');
    expect(knight.comps).toContain('Radiant');
  });
});

describe('the weapon table backs every such row', () => {
  it.each(['spear', 'mace', 'greataxe', 'maul', 'dagger', 'longbow'])('%s declares a physical type', (w) => {
    expect(PHYS).toContain(WEAPONS[w].type);
  });

  it('no weapon in the table declares an energy type — the stamp can always be trusted', () => {
    const energyWeapons = Object.entries(WEAPONS).filter(([, v]) => v.type != null && !PHYS.includes(v.type)).map(([k]) => k);
    expect(energyWeapons).toEqual([]);
  });
});

describe('the prompt tells the model before the engine has to correct it', () => {
  const prompt = buildReskinPrompt(scaleDonor(pickDonor(8, null, 'brute'), 8, { mechanics: [] }), { concept: 'a winged warden with a spear', energy: 'Fire' });

  it('names the weapon rule, not only the limb rule', () => {
    expect(prompt).toMatch(/a bite Piercing, a slam Bludgeoning, a claw Slashing/);  // the limb rule, still there
    expect(prompt).toMatch(/named after a WEAPON a person could carry deals THAT WEAPON'S type/);
    expect(prompt).toMatch(/a spear Piercing/);
  });

  it('points the energy at the rider field instead of forbidding it', () => {
    expect(prompt).toMatch(/that energy on "melee_rider"/);
  });

  // 3d, owner's ruling 2026-11-01: the first cut of this rule told the model the
  // main slot must be physical, and the model satisfied it by DROPPING the energy
  // — the Cinder Knight ("carries a flaming spear and a burning shield") shipped
  // one Piercing spear with no fire anywhere, not even a resistance.
  it('asks for BOTH halves, and names the failure it is correcting', () => {
    expect(prompt).toMatch(/answer the weapon's PHYSICAL type here AND that energy/);
    expect(prompt).toMatch(/Piercing damage plus Fire damage/);
    expect(prompt).toMatch(/Do NOT drop the energy/);
  });
});

/**
 * 3d — the engine keeps the energy when the model drops it.
 *
 * Two paths, and the one that mattered was the one the plan did not name. A row
 * the GM names ("carries a flaming spear") becomes a PART, which never reaches the
 * damage-type block the 10-30 override lives in; instead the part builder strips
 * the energy component and FOLDS its damage into the physical main, so the number
 * survived and the type was erased. That is why the Cinder Knight had no fire.
 */
describe('the energy survives as a rider', () => {
  const { generateReskin, renameKeysOf } = require('@/tools/statblock-generator/reskin/generate.mjs');
  const { pickDonor: pd, scaleDonor: sd } = require('@/tools/statblock-generator/reskin/scale.mjs');

  const run = async (concept, energy, over = {}) => {
    const scaled = sd(pd(9, null, 'brute'), 9, { mechanics: [] });
    const renames = {}; renameKeysOf(scaled).forEach((k, i) => { renames[k] = `Named Row${i}`; });
    const body = JSON.stringify({
      name: 'Test Body', type: 'Humanoid', size: 'Medium', alignment: 'Neutral',
      senses: 'darkvision 60 ft.', languages: 'Common', renames,
      damage_types: Object.fromEntries(Object.values(renames).map((n) => [n, energy ?? 'Slashing'])),
      weapons: {}, conditions: { condition_minor: 'Prone' }, melee_rider: 'none', ...over,
    });
    const orig = console.log; const lines = []; console.log = (...a) => { lines.push(a.join(' ')); };
    let m;
    try {
      m = await generateReskin({ archetype: 'brute', concept, userConcept: concept, cr: 9, energy, resolvedType: 'Humanoid' }, async (pr) => {
        if (pr.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
        if (pr.startsWith('You are repairing') || pr.startsWith('You are completing')) return JSON.stringify({});
        return body;
      });
    } finally { console.log = orig; }
    return { m, lines, rows: Object.values(m.sections).flat() };
  };

  it('a GM-named flaming spear deals Piercing PLUS Fire, not Piercing alone', async () => {
    const { rows, lines } = await run('a cinder knight who carries a flaming spear', 'Fire');
    const spear = rows.find((e) => /Spear/i.test(String(e.name ?? '')));
    expect(spear).toBeDefined();
    expect(spear.text).toMatch(/Piercing damage plus \d+ \(\d+d\d+\) Fire damage/);
    expect(lines.join('\n')).toMatch(/energy rides the named weapon/);
  });

  it('and a purely physical concept gains no rider it did not ask for', async () => {
    const { rows } = await run('a line legionary who carries a spear', null);
    const spear = rows.find((e) => /Spear/i.test(String(e.name ?? '')));
    expect(spear).toBeDefined();
    expect(spear.text).not.toMatch(/plus \d+ \(\d+d\d+\) (?:Fire|Cold|Acid|Necrotic|Radiant|Thunder|Lightning|Poison|Psychic|Force) damage/);
  });
});

/**
 * Roadmap item 3c — the dice follow the average.
 *
 * The class-weapon swap folded a damage component in by ADDING its average to the
 * stated figure and leaving the dice alone, so a monk's Unarmed Strike shipped
 * "23 (3d8 + 3)" — which rolls 16.5 — and the `damage-dice` gate failed it. Not a
 * die-size problem: Unarmed Strike is not in the weapon table at all, so the
 * re-dice could never reach it by any route.
 */
describe('3c — a folded component re-solves its dice', () => {
  const { attackDamageDiceFor } = require('@/tools/statblock-generator/format-2024/dice.mjs');

  it.each([[23, 3], [16, 3], [31, 4], [40, 5]])('a %d-point hit with +%d rolls what it states', (avg, mod) => {
    const r = attackDamageDiceFor(avg, mod);
    const m = /(\d+)d(\d+)/.exec(r.dice);
    expect(m).toBeTruthy();
    const rolled = Math.floor((Number(m[1]) * (Number(m[2]) + 1)) / 2) + mod;
    expect(rolled).toBe(r.avg);          // the gate's own test: stated == rolled
  });

  it('the shipped defect is no longer producible by the fold', () => {
    // "23 (3d8 + 3)" was the forty's FAIL; 3d8+3 rolls 16.5
    const r = attackDamageDiceFor(23, 3);
    expect(r.dice).not.toBe('3d8 + 3');
    const m = /(\d+)d(\d+)/.exec(r.dice);
    expect(Math.floor((Number(m[1]) * (Number(m[2]) + 1)) / 2) + 3).toBe(r.avg);
  });
});
