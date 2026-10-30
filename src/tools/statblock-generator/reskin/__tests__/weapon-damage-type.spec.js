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
    expect(prompt).toMatch(/put it on "melee_rider"/);
  });
});
