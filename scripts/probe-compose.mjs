// CAN THE CALL NAME TWO COMPOSING TEMPLATE IDS? (change 3 of
// plans/parameterise-the-catalog-2026-10-22.md)
//
// The owner's idea, vetted and agreed in form: a refusal may answer with
// `compose: { base, rider }` where BOTH are ids from the offered menu — ids, not
// prose, or the engine would have to map text to templates and that is the regex
// layer being retired. Composition must use the existing rider weld (one row, not
// two) and must price through valueCheck.
//
// This probes the ONE thing that decides whether the idea is buildable: can the
// model reliably name two ids that actually compose? Scored on the engine's terms,
// not the model's — both ids on the menu, the rider really a rider, both render,
// and the pair prices. A confident answer that does not render is a FAIL here.
//
//   node --import ./scripts/alias-loader.mjs scripts/probe-compose.mjs [runs]
const RUNS = Number(process.argv.find((a) => /^\d+$/.test(a)) ?? 2);
const BASE = process.env.PROBE_BASE_URL ?? 'http://localhost:5173';
const MODEL = process.env.PROBE_MODEL ?? 'deepseek-flash';

const { templatesFor, renderTemplate, templateMenuLines, TEMPLATE_BY_ID, valueCheck, rankByVerb } =
  await import('@/tools/statblock-generator/reskin/templates.mjs');
const { pickDonor, scaleDonor } = await import('@/tools/statblock-generator/reskin/scale.mjs');

// REAL refusals from sweep-2026-10-22T17-05-33's gap list — the ones my own
// classification called genuinely compound rather than a missing single.
const CASES = [
  ['storm drake', 'brute', 10, 'Deals thunder damage in an area around the drake and shoves each creature struck outward, repositioning them away from it'],
  ['ash hound', 'skirmisher', 5, 'leaves a lingering patch on the ground that keeps damaging creatures standing in it after the hit'],
  ['slick golem', 'brute', 9, 'leaves a trail of slick ground that Grapples creatures who stop or fall on it, letting the golem follow at its normal pace'],
  ['hunting dragon', 'lurker', 13, 'marks the creature that attacked or cast during the pass so the dragon knows its location and strikes it'],
  ['line charger', 'brute', 7, 'moves the creature along a line and shoves every creature in its path into walls or bodies to hold them in place'],
  ['pack hunter', 'skirmisher', 4, 'on-hit bite that slows and stiffens the struck limb, aided by a packmate harrying the same quarry'],
  ['dragging horror', 'brute', 6, 'moves a grappled creature along with the monster and leaves it off-balance while the monster moves'],
  ['constrictor', 'brute', 5, "damages a creature already held in the creature's grapple at the start of its turn, persisting until the grapple ends"],
];

// TWO MENUS, because production has none that could answer this. The fit call's
// menu is built per SEAT (`section: idea.section`), so an action seat is shown
// actions and NO RIDERS — the call cannot name a rider from what it sees. Probing
// `compose` therefore means probing a prompt that does not exist yet: a base list
// AND a rider list. Production caps a menu at 14, so this keeps the same budget
// (10 bases + 6 riders) rather than quietly asking for a bigger prompt.
const menuFor = (archetype, cr, idea) => {
  const scaled = scaleDonor(pickDonor(cr, null, archetype), cr, { mechanics: [] });
  // THE IDEA DRIVES THE RANKING, as production does: format-2024/generate.mjs
  // ranks with rankByVerb(menu, concept, idea.idea) before the 14-cap. The first
  // version of this probe ranked with an EMPTY concept and idea, which cut the
  // exact templates the compose needs — push-prone, bolt-mark, exploiter,
  // blighted-ground are all inside the top 14 once the idea ranks them. That
  // produced 16 of 16 declines reading 'no offered base supplies X' and nearly
  // got reported as 'the parts do not exist' and then as 'routing is broken'.
  // Both were this line (2026-10-22).
  const ctx = { archetype, cr, movement: '40 ft.', type: 'Monstrosity', size: 'Large', sections: scaled.sections, concept: idea, scaled };
  const pick = (sections) => {
    const seen = new Map();
    for (const section of sections) {
      for (const t of templatesFor({ ...ctx, section, trigger: null })) if (!seen.has(t.id)) seen.set(t.id, t);
    }
    return [...seen.values()];
  };
  const bases = rankByVerb(pick(['action', 'bonus_action', 'reaction', 'trait']), idea, idea).map((r) => r.t).slice(0, 10);
  const riders = rankByVerb(pick(['rider']), idea, idea).map((r) => r.t).slice(0, 6);
  return { bases, riders, ctx, scaled };
};

const PROMPT = (idea, bases, riders, cr) => `A monster's signature ability was described in plain words, and NO SINGLE printed template holds it. You may answer with TWO templates that together do hold it: one BASE row, plus one RIDER welded onto it as a clause. One row on the page, not two.

WHAT IT MUST DO: ${idea}

BASE ROWS ON OFFER (CR ${cr}) — name one of these as "base":
${templateMenuLines(bases, { cr, concept: '', idea })}

RIDERS ON OFFER — a clause that welds onto the base row; name one of these as "rider":
${templateMenuLines(riders, { cr, concept: '', idea })}

Rules:
- "base" must come from the BASE ROWS list, "rider" from the RIDERS list.
- Together they must do what the ability must do. If two of these genuinely cannot, answer "compose": null. A wrong pair is worse than none: it puts a rule on the page the GM can see is nonsense.
- Do not name an id that is not on these lists.

Return ONLY JSON, no markdown: {"compose": {"base": "<id>", "rider": "<id>", "because": "<what each half contributes>"} }  — or {"compose": null, "why_not": "<the mechanic neither half supplies>"}`;

const call = async (prompt) => {
  const r = await fetch(`${BASE}/api/ai/deepseek`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ model: MODEL, messages: [{ role: 'user', content: prompt }], temperature: 0.2 }),
  });
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  const j = await r.json();
  const m = /\{[\s\S]*\}/.exec(j.choices?.[0]?.message?.content ?? '');
  return m ? JSON.parse(m[0]) : null;
};

let answered = 0; let offMenu = 0; let notARider = 0; let renderFail = 0; let ok = 0; let declined = 0; let bad = 0;
for (const [label, archetype, cr, idea] of CASES) {
  const { bases, riders, ctx } = menuFor(archetype, cr, idea);
  const baseIds = new Set(bases.map((t) => t.id));
  const riderIds = new Set(riders.map((t) => t.id));
  for (let i = 0; i < RUNS; i += 1) {
    let got = null;
    // NEVER SWALLOW THE ERROR. The first run of this probe reported 16 of 16
    // 'call failures' and 0 answers, which reads exactly like the idea failing.
    // It was the probe (a-parser-reporting-zero, 2026-10-22).
    try { got = await call(PROMPT(idea, bases, riders, cr)); } catch (e) { bad += 1; if (bad <= 2) console.log(`CALL FAILED: ${e?.message ?? e}\n${String(e?.stack ?? '').split('\n').slice(1, 4).join('\n')}`); continue; }
    const c = got?.compose;
    if (!c) { declined += 1; console.log(`DECLINED  ${label.padEnd(16)} ${String(got?.why_not ?? '').slice(0, 58)}`); continue; }
    answered += 1;
    const b = TEMPLATE_BY_ID.get(c.base); const rd = TEMPLATE_BY_ID.get(c.rider);
    const bOn = baseIds.has(c.base); const rOn = riderIds.has(c.rider);
    if (!bOn || !rOn) { offMenu += 1; console.log(`OFF-MENU  ${label.padEnd(16)} base=${c.base}${bOn ? '' : ' [NOT OFFERED]'} rider=${c.rider}${rOn ? '' : ' [NOT OFFERED]'}`); continue; }
    if (rd?.section !== 'rider') { notARider += 1; console.log(`NOT-RIDER ${label.padEnd(16)} rider=${c.rider} is a ${rd?.section}`); continue; }
    const rb = renderTemplate(b, ctx, {}); const rr = renderTemplate(rd, ctx, {});
    if (!rb || !rr) { renderFail += 1; console.log(`NO-RENDER ${label.padEnd(16)} base=${c.base}${rb ? '' : ' [base]'} rider=${c.rider}${rr ? '' : ' [rider]'}`); continue; }
    ok += 1;
    console.log(`OK        ${label.padEnd(16)} ${c.base} + ${c.rider}`);
  }
}
const tot = answered + declined;
console.log(`\n  ${CASES.length} real refusals x ${RUNS} runs = ${tot} answers (${bad} call failures)`);
console.log(`  COMPOSED AND RENDERABLE: ${ok}`);
console.log(`  declined outright:       ${declined}`);
console.log(`  named an id NOT on the offered menu: ${offMenu}   <- fatal to the idea if high`);
console.log(`  named a non-rider as the rider:      ${notARider}`);
console.log(`  pair would not render:               ${renderFail}`);
