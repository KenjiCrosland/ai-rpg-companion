// Ad hoc: print the character size of every statblock prompt for one concept — NOT a test.
import { chromium } from 'playwright';
const browser = await chromium.launch(); const page = await browser.newPage();
await page.goto('http://localhost:5173/', { waitUntil: 'load' });
const out = await page.evaluate(async () => {
  const g = await import('/src/tools/statblock-generator/format-2024/generate.mjs');
  const r = await import('/src/tools/statblock-generator/reskin/route.mjs');
  const rg = await import('/src/tools/statblock-generator/reskin/generate.mjs');
  const sc = await import('/src/tools/statblock-generator/reskin/scale.mjs');
  const au = await import('/src/tools/statblock-generator/format-2024/audit.mjs');
  const concept = 'a clockwork bishop that blesses the poor by day and at night unfolds into a cage of brass ribs around whoever it has chosen';
  const sizes = {}; const T = (k, f) => { try { sizes[k] = f().length; } catch (e) { sizes[k] = `ERR ${e.message.slice(0, 70)}`; } };
  T('route', () => r.buildRoutePrompt(concept, { cr: 9 }));
  T('identity', () => g.buildIdentityPrompt(concept, '', { cr: 9, line: 'brute-grappler', resolvedType: 'Construct' }));
  T('seed_synthesis', () => g.buildSeedSynthesisPrompt({ intelligence: 'cunning', physical: 'brass-plated', silhouette: 'a hulk', origin: 'a foundry', creature_type: 'Construct', concept: 'x' }, { cr: 9, energy: 'Fire', damageMix: 'both', naming: null }));
  const scaled = sc.scaleDonor(sc.pickDonor(9, 'grappler', 'brute'), 9, { mechanics: ['grapple', 'engulf'] });
  T('reskin', () => rg.buildReskinPrompt(scaled, { concept, takenNames: [], signatureElements: [{ element: 'blessing the poor', kind: 'behavior' }], energy: 'Fire', mix: 'both', mind: 'sapient', resolvedType: 'Construct' }));
  const fake = { name: 'Brass Almoner', size: 'Large', type: 'Construct', cr: 9, sections: { Actions: [{ name: 'Censer', text: '*Melee Attack Roll:* +8, reach 10 ft. 18 (4d6 + 4) Bludgeoning damage.' }] } };
  T('audit', () => au.buildAuditPrompt(fake, '2024', { reskin: true }));
  T('naming', () => g.buildNamingPrompt(fake, null, [], concept));
  T('slot_generation', () => { const ctx = g.buildContext(9, 'brute'); return g.buildGenerationPrompt({ concept, cr: 9, chassis: ctx.chassis, plan: ctx.plan, caster: false }); });
  T('audit_real', () => au.buildAuditPrompt({ ...fake, stats: { STR: 18, DEX: 8, CON: 17, INT: 4, WIS: 12, CHA: 6 }, hp: 161, hp_formula: '19d10 + 57', ac: 15, speed: '40 ft.', alignment: 'Lawful Neutral', senses: 'darkvision 60 ft.; Passive Perception 15', languages: '—', pb: 4, saves: {}, format: '2024' }, '2024', { reskin: true }));
  return sizes;
});
await browser.close();
for (const [k, v] of Object.entries(out)) console.log(`${k.padEnd(16)} ${typeof v === 'number' ? `${v.toLocaleString()} chars (~${Math.round(v / 4).toLocaleString()} tokens)` : v}`);
