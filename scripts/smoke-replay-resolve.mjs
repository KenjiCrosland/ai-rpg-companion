// Replay the resolve call N times through the app's own client (Vite page context)
// and show the RAW responses + whether validateArchetypeResponse accepts them.
import { chromium } from 'playwright';
const [concept, cr = '5', n = '6'] = process.argv.slice(2).filter((a) => !a.startsWith('--'));
const browser = await chromium.launch();
const page = await browser.newPage();
page.on('console', () => {});
await page.goto('http://localhost:5173/', { waitUntil: 'load' });
const out = await page.evaluate(async ({ concept, cr, n }) => {
  const g = await import('/src/tools/statblock-generator/reskin/route.mjs');
  const c = await import('/src/util/ai-client.mjs');
  const prompt = g.buildRoutePrompt(concept, { cr: Number(cr) });
  const res = [];
  for (let i = 0; i < Number(n); i++) {
    try {
      const raw = await c.generateGptResponse(prompt, null, 1);
      res.push({ ok: g.validateRouteResponse(raw), raw, chosen: g.validateRouteResponse(raw) ? g.chooseLine(JSON.parse(raw.replace(/^```(?:json)?|```$/gm, '').trim()), { text: concept }) : null });
    } catch (e) { res.push({ ok: false, raw: `THREW ${e.message}` }); }
  }
  return { promptLen: prompt.length, res };
}, { concept, cr, n });
await browser.close();
console.log(`prompt chars: ${out.promptLen}`);
const compact = process.argv.includes('--compact');
out.res.forEach((r, i) => {
  if (!compact) return console.log(`\n#${i + 1} valid=${r.ok}\n${r.raw.slice(0, 900)}`);
  let j = null; try { j = JSON.parse(r.raw.replace(/^```(?:json)?|```$/gm, '').trim()); } catch {}
  const picks = (j?.picks ?? []).map((k) => `${k.line}("${String(k.because ?? '').slice(0, 30)}")`).join(' > ');
  console.log(`#${i + 1} valid=${r.ok} → ${r.chosen?.line ?? 'NONE'} | picks=${picks || r.raw.slice(0, 120)} | type=${j?.creature_type ?? '?'} extras=${(j?.extras ?? []).map((x) => x.mechanic).join(',') || '—'}${r.chosen && r.chosen.line !== (j?.picks?.[0]?.line ?? '') ? ` | notes: ${r.chosen.notes.join(' ; ')}` : ''}`);
});
