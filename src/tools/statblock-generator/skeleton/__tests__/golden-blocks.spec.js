/**
 * GOLDEN BLOCKS — the corrections-refactor safety net (owner-approved plan,
 * 2026-08-14).
 *
 * Three fixed-seed generations through generateMonster2024 (the layer the
 * app calls), snapshotted in full. The corrections-as-passes extraction is
 * contracted to be BYTE-IDENTICAL: any drift in any entry's name, text, or
 * field fails here before it ships. Every input is pinned — seed, mocks,
 * candidates — so these are deterministic by construction.
 *
 * If a deliberate behavior change lands later, update these snapshots in
 * the SAME commit as the change, never alongside a refactor.
 */
import { generateMonster2024 } from '../../format-2024/generate.mjs';
import { validateAuditResponse } from '../../format-2024/audit.mjs';
import { validateNamingResponse } from '../../format-2024/generate.mjs';

const routed = ({ flavor = null } = {}) => async (prompt, validate) => {
  if (/Every number is already fixed/.test(prompt)) {
    return flavor ? JSON.stringify(flavor(prompt)) : null;
  }
  if (validate === validateAuditResponse) return JSON.stringify({ findings: [] });
  if (validate === validateNamingResponse) {
    return JSON.stringify({ grade: 'A', candidates: ['Cairn Warden', 'Saltmaw', 'Gravemaw'] });
  }
  return JSON.stringify({ problems: [] });
};

// A deterministic model: reads the entry ids out of the prompt and names
// each, choosing menu option 1 and a Piercing form for attacks — so the
// named path, the choice resolution, and the per-entry physical all run.
const namedFlavor = (prompt) => ({
  name: 'Golden Test Subject',
  size: 'Large', type: 'Monstrosity', alignment: 'Unaligned',
  speed: '40 ft.', physical_damage: 'Slashing', energy_damage: 'Cold',
  stats: { STR: 22, DEX: 14, CON: 20, INT: 6, WIS: 14, CHA: 8 },
  save_proficiencies: ['STR', 'WIS'], skill_proficiencies: ['Perception'],
  senses_special: 'darkvision 60 ft.', languages: 'None',
  entries: [...prompt.matchAll(/^- (e\d+) \(/gm)].map(([, id], i) => ({
    id, choose: '1', name: `Keeper Move ${i + 1}`, physical: 'Piercing',
  })),
});

const strip = (m) => {
  // volatile non-content fields excluded; everything a table reads is kept
  const { generation, other_edition, ...rest } = m;
  return { ...rest, generation: { path: generation?.path, archetype: generation?.archetype, package: generation?.package } };
};

jest.setTimeout(60000);

describe('golden blocks (byte-exact through the refactor)', () => {
  test('G1: CR 20 forged skirmisher, never-fail placeholder path', async () => {
    const m = await generateMonster2024({
      concept: 'a warden of the deep road', cr: 20, seed: 91, edition: '2024',
      archetypeName: 'skirmisher', archetypeSource: 'user', resolvedType: 'Monstrosity',
      themes: ['forged'], energy: 'Fire', damageMix: 'both',
    }, routed());
    expect(strip(m)).toMatchSnapshot();
  });

  test('G2: CR 9 named path — choices, per-entry physical, renames, corrections', async () => {
    const m = await generateMonster2024({
      concept: 'a patient keeper of drowned things', cr: 9, seed: 4471, edition: '2024',
      archetypeName: 'controller', archetypeSource: 'user', resolvedType: 'Monstrosity',
      themes: ['grave', 'aquatic'], energy: 'Cold', damageMix: 'both',
    }, routed({ flavor: namedFlavor }));
    expect(strip(m)).toMatchSnapshot();
  });

  test('G3: CR 12 web signature — restraint scaling, physics, condition menus', async () => {
    const m = await generateMonster2024({
      concept: 'a snare-weaver of the under-eaves', cr: 12, seed: 815, edition: '2024',
      archetypeName: 'controller', archetypeSource: 'user', resolvedType: 'Monstrosity',
      themes: ['grasping'], signatureMechanic: 'snare', energy: 'Poison', damageMix: 'both',
    }, routed());
    expect(strip(m)).toMatchSnapshot();
  });
});
