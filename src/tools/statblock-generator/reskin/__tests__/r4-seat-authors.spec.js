/**
 * R4 — THE SEAT WRITES THE ROW THE CATALOG CANNOT HOLD.
 *
 * The step-1 replay (ROADMAP-results-2026-11-01.md, "R4, step 1") measured 220
 * ideas dying at `closest accepted` across three runs, and ALL 220 answered
 * `declined_because: no_fit` — "nothing offered carries the mechanic". These are
 * four of the ideas it named, each replayed through the real branch: the fit call
 * is shown the real menu and answers `none` + `no_fit`, exactly as it did on
 * those runs, and the seat authors the row instead of landing a template the call
 * had just refused.
 *
 * What each case holds:
 *   dire wolf    a trait, passive_effect threat   (the frost-rimed hide)
 *   bog hound    a save with movement             (heaves backward, dragging)
 *   owlbear      a save with a Prone condition    (drops from above)
 *   stone golem  a trait, passive_effect ability  (does not stop for masonry)
 *
 * And three properties of the branch itself: the trigger is `no_fit` alone (a
 * `collision` or `already_answered` decline never spends the call), the nearest
 * template is still the fallback when authoring returns nothing, and the authored
 * row goes through the seat's own `valueCheck` rather than straight into
 * `sections` (owner's decision (b), 2026-11-02).
 */
import { generateReskin, renameKeysOf } from '../generate.mjs';
import { pickDonor, scaleDonor } from '../scale.mjs';

const FIT = "A monster's signature ability";
const IDEA = 'You are inventing the SIGNATURE ability';
const SEAT = 'You are writing ONE ability for a D&D monster';

/** the main reskin answer for this donor, with every row named so nothing is left as a key */
const mainAnswer = (name, type, cr, archetype, style = null, over = {}) => {
  const scaled = scaleDonor(pickDonor(cr, style, archetype), cr, { mechanics: [] });
  const renames = {}; renameKeysOf(scaled).forEach((k, i) => { renames[k] = `Named Row${i}`; });
  const typed = Object.values(scaled.sections).flat().filter((e) => e.text.includes('{damage_type}') && !e.rules).map((e) => renames[e.name] ?? e.name);
  return JSON.stringify({
    name, type, size: 'Medium', alignment: 'Unaligned', senses: 'darkvision 60 ft.', languages: 'None',
    renames, damage_types: Object.fromEntries(typed.map((n) => [n, 'Bludgeoning'])),
    conditions: { condition_minor: 'Prone' }, melee_rider: 'none',
    wildcard: `*Strength Saving Throw*: DC ${scaled.dc}, one creature within 5 feet. *Failure:* The target has the Prone condition.`,
    ...over,
  });
};

/**
 * Drive one sheet. `ideas` is the idea call's answer, `fit` the fit call's, `seatRow`
 * the authoring call's. Returns the monster, the trace, and every prompt sent.
 */
const run = async ({ concept, cr, archetype, style = null, name, type, ideas, fit, seatRow }) => {
  const lines = []; const prompts = []; const orig = console.log;
  console.log = (...a) => { lines.push(a.join(' ')); };
  let m;
  try {
    m = await generateReskin({ archetype, ...(style ? { style } : {}), concept, userConcept: concept, cr, mechanics: [] }, async (prompt) => {
      prompts.push(prompt);
      if (prompt.startsWith(IDEA)) return JSON.stringify(ideas);
      if (prompt.startsWith(FIT)) return JSON.stringify(fit);
      if (prompt.startsWith(SEAT)) return JSON.stringify({ attacks: [], saves: [], traits: [], reactions: [], crossRef: null, unplaced: [], ...seatRow });
      if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
      if (prompt.startsWith('You are repairing') || prompt.startsWith('You are completing')) return JSON.stringify({});
      return mainAnswer(name, type, cr, archetype, style);
    });
  } finally { console.log = orig; }
  return { m, trace: lines.join('\n'), prompts, rows: Object.entries(m.sections).flatMap(([s, rs]) => rs.map((r) => ({ ...r, section: s }))) };
};

const REFUSED = { template: 'none', because: '', declined_because: 'no_fit', closest: 'bloodied-fury' };

describe('the four ideas the step-1 replay named', () => {
  test('the dire wolf\'s frost-rimed hide: the seat writes the trait no template carried', async () => {
    const idea = 'The frost-rimed hide sheds a crawling rime, so while the wolf is within reach of a creature that creature is slowed by the cold.';
    const { trace, rows, prompts } = await run({
      concept: 'Dire Wolf with a frost-rimed hide', cr: 1, archetype: 'skirmisher', name: 'Dire Wolf', type: 'Beast',
      ideas: { trait: { idea, section: 'trait', trigger: 'always', effect: 'threat' } },
      fit: { ...REFUSED, missing: 'a passive that costs a creature something merely for standing beside it' },
      seatRow: { traits: [{ clause: 'with a frost-rimed hide', name: 'Crawling Rime', trigger: 'While a creature is within 5 feet of the wolf', effect: 'that creature takes {dmg} Cold damage at the start of its turn', imposes: null, condition_relation: 'none', passive_effect: 'threat' }] },
    });
    expect(trace).toMatch(/seat authored the row:.*Crawling Rime/);
    const row = rows.find((r) => r.name === 'Crawling Rime');
    expect(row).toBeTruthy();
    expect(row.section).toBe('Traits');
    expect(row.authoredSeat).toBe(true);
    expect(row.template).toBeUndefined();   // no template id: the gates keyed on one stand down
    expect(row.text).toMatch(/\d+ \(\d+d\d+\) Cold damage/); // the engine priced the {dmg} token
    expect(prompts.filter((q) => q.startsWith(SEAT))).toHaveLength(1);
  }, 30000);

  test('the bog hound heaves backward: the seat writes the save with movement', async () => {
    const idea = 'It sets its mud-slick paws and heaves backward, dragging whatever it has hold of off its feet and into the water.';
    const { trace, rows } = await run({
      concept: 'a bog hound that drags fishermen under', cr: 4, archetype: 'brute', name: 'Bog Hound', type: 'Monstrosity',
      ideas: { action: { idea, section: 'action', trigger: 'save', effect: 'movement' } },
      fit: { ...REFUSED, missing: 'a pull that drags the target toward the creature and off its feet in one row' },
      seatRow: { saves: [{ clause: 'drags fishermen under', name: 'Heave Under', stat: 'Strength', target: 'one creature within 5 feet', damage: true, type: 'Bludgeoning', condition: 'Prone', movement: 'pulled up to 15 feet', success: 'none', recharge: false }] },
    });
    expect(trace).toMatch(/seat authored the row:.*Heave Under/);
    const row = rows.find((r) => /^Heave Under/.test(r.name));
    expect(row).toBeTruthy();
    expect(['Actions', 'Bonus Actions']).toContain(row.section);
    expect(row.text).toMatch(/pulled up to 15 feet straight toward/);
    expect(row.imposes).toBe('Prone');     // the call's own answer, kept as a field
    expect(row.imposesMovement).toBe(true);
    expect(trace).toMatch(/value check:.*Heave Under/); // decision (b): it faced the seat's own floor
  }, 30000);

  test('the owlbear drops from above: the seat writes the save that lands Prone', async () => {
    const idea = 'It drops from above onto a creature it has climbed over, slamming it flat beneath its weight.';
    const { trace, rows } = await run({
      concept: 'an owlbear that climbs and drops on what it has pinned', cr: 3, archetype: 'brute', name: 'Owlbear', type: 'Monstrosity',
      ideas: { action: { idea, section: 'action', trigger: 'save', effect: 'condition' } },
      fit: { ...REFUSED, missing: 'a pounce from above that both damages and knocks flat' },
      seatRow: { saves: [{ clause: 'climbs and drops', name: 'Crushing Drop', stat: 'Dexterity', target: 'one creature within 5 feet', damage: true, type: 'Bludgeoning', condition: 'Prone', movement: null, success: 'half', recharge: false }] },
    });
    expect(trace).toMatch(/seat authored the row:.*Crushing Drop/);
    const row = rows.find((r) => /^Crushing Drop/.test(r.name));
    expect(row).toBeTruthy();
    expect(row.text).toMatch(/has the Prone condition/);
    expect(row.imposes).toBe('Prone');
  }, 30000);

  test('the stone golem does not stop for masonry: the seat writes the trait', async () => {
    const idea = 'The saint does not stop for masonry: the golem can move through nonmagical walls as though they were not there.';
    const { trace, rows } = await run({
      concept: 'Stone Golem built around the bones of a walled-up saint', cr: 10, archetype: 'brute', name: 'Stone Golem', type: 'Construct',
      ideas: { trait: { idea, section: 'trait', trigger: 'always', effect: 'movement' } },
      fit: { ...REFUSED, missing: 'passage through solid nonmagical stone, which no template grants' },
      seatRow: { traits: [{ clause: 'walled-up saint', name: 'Unwalled', trigger: null, effect: 'The golem can move through nonmagical walls and other nonmagical objects as though they were Difficult Terrain', imposes: null, condition_relation: 'none', passive_effect: 'ability' }] },
    });
    expect(trace).toMatch(/seat authored the row:.*Unwalled/);
    const row = rows.find((r) => r.name === 'Unwalled');
    expect(row).toBeTruthy();
    expect(row.section).toBe('Traits');
    expect(row.freeRow).toBe(true);        // marked free, so settleSheetBudgets ranks it on the finished sheet
    expect(row.decoration).toBeUndefined(); // but it is NOT decoration: it was written to carry the idea
  }, 30000);
});

describe('the branch itself', () => {
  const golemCase = {
    concept: 'Stone Golem built around the bones of a walled-up saint', cr: 10, archetype: 'brute', name: 'Stone Golem', type: 'Construct',
    ideas: { trait: { idea: 'The saint does not stop for masonry: the golem can move through nonmagical walls as though they were not there.', section: 'trait', trigger: 'always', effect: 'movement' } },
  };

  test('only `no_fit` spends the call — a `collision` decline authors nothing', async () => {
    const { prompts, trace } = await run({ ...golemCase, fit: { template: 'none', because: '', declined_because: 'collision', closest: 'bloodied-fury', missing: 'x' }, seatRow: {} });
    expect(prompts.filter((q) => q.startsWith(SEAT))).toHaveLength(0);
    expect(trace).toMatch(/closest refused:/);
  }, 30000);

  test('the nearest template is still the fallback when the authoring call writes nothing', async () => {
    const { prompts, trace } = await run({ ...golemCase, fit: { ...REFUSED, missing: 'passage through solid stone' }, seatRow: { unplaced: [{ clause: 'walled-up saint', where: 'description', text: 'a saint was walled into it' }] } });
    expect(prompts.filter((q) => q.startsWith(SEAT))).toHaveLength(1);
    expect(trace).toMatch(/seat authored nothing:/);
    expect(trace).toMatch(/closest accepted:/); // the measured behaviour, unchanged, behind the attempt
  }, 30000);

  test("an authored row does not overrule print's calibration — the trait ceiling still stops it", async () => {
    // The SAME golem idea on the juggernaut chassis, which brings three rules traits
    // of print's own (Immutable Form, Siege Monster, Magic Resistance). Measured while
    // building this: the authored row passes the receipt gate and then loses to print's
    // trait ceiling, and the trace says so. That is the intended order — the catalog is
    // a resource rather than a veto on whether a mechanic may exist, and print still
    // rules calibration (owner, 2026-10-27).
    const { trace, rows } = await run({
      ...golemCase, style: 'juggernaut',
      fit: { ...REFUSED, missing: 'passage through solid nonmagical stone' },
      seatRow: { traits: [{ clause: 'walled-up saint', name: 'Unwalled', trigger: null, effect: 'The golem can move through nonmagical walls and other nonmagical objects as though they were Difficult Terrain', imposes: null, condition_relation: 'none', passive_effect: 'ability' }] },
    });
    expect(trace).toMatch(/seat authored the row:.*Unwalled/);     // it was written
    expect(trace).toMatch(/free signature row: "Unwalled"/);        // and it passed the receipt gate
    expect(trace).toMatch(/trait ceiling: "Unwalled" does not ship/); // and print's ceiling is what stopped it
    expect(rows.find((r) => r.name === 'Unwalled')).toBeUndefined();
  }, 30000);

  test('an authored save that grapples carries the escape DC and no timer — the four frames of forty #2', async () => {
    // FOUR of forty #2's six FAILs were this one sentence, every one an authored save
    // row: Drowning Roar, Coat Lash, Heartbriar Hook, Hooked Lash, each
    // `grapple-no-escape`. The save form wrote "the target has the Grappled condition
    // until the end of its next turn" — no escape DC, and a timer Grappled does not
    // have. Measured against print before the fix: of its 10 save rows that grapple,
    // 10 carry an escape DC and 0 carry a timer.
    const concept = 'a chalk-hound that hooks you and will not let go';
    const { rows, trace } = await run({
      concept, cr: 4, archetype: 'brute', name: 'Chalk Hound', type: 'Monstrosity',
      ideas: { action: { idea: 'It hooks a victim and holds on.', section: 'action', trigger: 'save', effect: 'condition' } },
      fit: { ...REFUSED, missing: 'a seize that holds rather than a shove' },
      seatRow: { saves: [{ clause: 'hooks you and will not let go', name: 'Heartbriar Hook', stat: 'Strength', target: 'one creature within 5 feet', damage: false, type: null, condition: 'Grappled', movement: null, success: 'none', recharge: false }] },
    });
    expect(trace).toMatch(/seat authored the row:.*Heartbriar Hook/);
    const row = rows.find((r) => /^Heartbriar Hook/.test(r.name));
    expect(row).toBeTruthy();
    expect(row.text).toMatch(/has the Grappled condition \(escape DC \d+\)/); // the checker's grapple-no-escape
    expect(row.text).not.toMatch(/Grappled condition until/);                   // Grappled has no timer
  }, 30000);

  test('the condition clause has one body — the repair path\'s rider keeps print\'s own shapes', async () => {
    const { renderForm } = require('@/tools/statblock-generator/reskin/forms.mjs');
    // a guard on the shared clause, not a second copy of it: Prone takes no timer,
    // an ordinary condition takes one, and only Grappled takes a DC. If someone edits
    // `conditionClause`, the Grappled frame above and this fail together.
    expect(renderForm({ kind: 'save', stat: 'Strength', dc: 13, target: 'one creature within 5 feet', failure: 'the target has the Prone condition.' }, '2024'))
      .toMatch(/\*Failure:\* The target has the Prone condition\./);
  });

  test('NEVER-FAIL: an authored row carrying a slot the engine cannot fill is refused, not shipped', async () => {
    // THE ONE GENERATION THAT THREW ON FORTY #2. The storm drake's authored trait
    // wrote `{condition}` — the forms ask for `{dc}` and `{dmg}`, and the call
    // generalised — nothing substitutes it, and it reached the ship-time guard:
    // "unfilled slot in Thunderwake Aura — failing loudly per spec". A failed
    // generation is worse than any gate failure, so the seat validates its own
    // substitution and the nearest template stands in.
    const concept = 'a young storm drake whose breath is a rolling wall of thunder';
    const { trace, rows, m } = await run({
      concept, cr: 7, archetype: 'brute', name: 'Storm Drake', type: 'Dragon',
      ideas: { trait: { idea: 'The air within reach of the drake is alive with static.', section: 'trait', trigger: 'always', effect: 'threat' } },
      fit: { ...REFUSED, missing: 'a moving wall of thunder' },
      seatRow: { traits: [{ clause: 'rolling wall of thunder', name: 'Thunderwake Aura', trigger: 'When a creature ends its turn within 10 feet of the drake', effect: 'that creature takes {dmg} Thunder damage and has the {condition} condition until the end of its next turn', imposes: null, condition_relation: 'none', passive_effect: 'threat' }] },
    });
    expect(m).toBeTruthy();                                   // the generation did not throw
    expect(trace).toMatch(/seat authoring refused:.*still carries \{condition\}/);
    expect(rows.find((r) => r.name === 'Thunderwake Aura')).toBeUndefined();
    for (const r of rows) expect(r.text ?? '').not.toMatch(/\{[a-z_0-9]+\}/); // nothing reached the sheet wearing braces
  }, 30000);

  test('both seats can author on one sheet — the allowance is settled on the finished sheet, not at grant', async () => {
    // THE COUNTER THE CRITIC REMOVED, and that the first wiring of this attempt put
    // back. It refused a seat whose sheet had already spent `freeRowsUsed`, which on
    // the live twelve (r4-twelve-2026-11-02T04-46-44) fired 5 times of 22 — every one
    // the TRAIT seat, forbidden because the ACTION seat had authored first. Nothing
    // else in generate.mjs compares that counter; `settleSheetBudgets` ranks free rows
    // on the finished sheet. So two authored rows must be able to REACH the budget,
    // and the budget is what decides whether both stay.
    const concept = 'a bog hound that drags fishermen under and whose hide steams';
    const { trace, rows } = await run({
      concept, cr: 4, archetype: 'brute', name: 'Bog Hound', type: 'Monstrosity',
      ideas: {
        action: { idea: 'It heaves backward, dragging whatever it has hold of off its feet.', section: 'action', trigger: 'save', effect: 'movement' },
        trait: { idea: 'Its hide steams, so standing beside it is its own punishment.', section: 'trait', trigger: 'always', effect: 'threat' },
      },
      fit: { ...REFUSED, missing: 'a shape the catalog does not hold' },
      seatRow: {
        saves: [{ clause: 'drags fishermen under', name: 'Heave Under', stat: 'Strength', target: 'one creature within 5 feet', damage: true, type: 'Bludgeoning', condition: null, movement: 'pulled up to 15 feet', success: 'none', recharge: false }],
        traits: [{ clause: 'whose hide steams', name: 'Steaming Hide', trigger: 'While a creature is within 5 feet of the hound', effect: 'that creature takes {dmg} Fire damage at the start of its turn', imposes: null, condition_relation: 'none', passive_effect: 'threat' }],
      },
    });
    expect(trace).not.toMatch(/already spent its one free signature row/); // the counter is gone
    expect(trace).toMatch(/seat authored the row: action/);
    expect(trace).toMatch(/seat authored the row: trait/);               // the trait seat got its attempt
    // both reached the finished-sheet budget; it decides what stays, and it is traced
    expect(trace).toMatch(/free-row budget/);
    expect(rows.filter((r) => r.authoredSeat).length).toBeGreaterThanOrEqual(1);
  }, 30000);

  test('the authored row may not impose a condition the sheet already imposes twice — the Quarry Scree frame', async () => {
    // THE FRAME THAT PRODUCED THE FAIL, replayed. On the first live twelve
    // (r4-twelve-2026-11-02T04-46-44) this sheet shipped Restrained on Slam, on
    // Entomb AND on the authored "Pitfall Snare": `duplicate-mechanic`, "3 rows
    // impose Restrained; print has no block with three (0 of 329)". The rule was
    // enforced as a MENU filter, and an authored row reaches no menu. A rarely
    // triggered guard cannot be proven by a clean run, so this replays the frame and
    // requires the refusal.
    const concept = 'a quarry-pit thing of living scree that buries what it catches';
    const { trace, rows } = await run({
      concept, cr: 5, archetype: 'brute', style: 'grappler', name: 'Quarry Scree', type: 'Ooze',
      ideas: { action: { idea: 'It pulls the target down into a pit and pins it there.', section: 'action', trigger: 'save', effect: 'condition' } },
      fit: { ...REFUSED, missing: 'a pull into a pit that pins the target there' },
      seatRow: { saves: [{ clause: 'buries what it catches', name: 'Pitfall Snare', stat: 'Dexterity', target: 'one creature within 30 feet', damage: false, type: null, condition: 'Restrained', movement: null, success: 'none', recharge: false }] },
    });
    // the grappler chassis declares Restrained on two rows (its grapple row and its
    // swallow row). Count the DECLARED records, which is what the rule reads — the
    // prose differs ("has the Restrained condition" vs "has the Blinded and
    // Restrained conditions") and a text count read one of the two.
    const restrained = rows.filter((r) => [].concat(r.imposes ?? []).includes('Restrained'));
    expect(restrained.length).toBeGreaterThanOrEqual(2);
    expect(trace).toMatch(/seat authoring refused:.*imposes Restrained, which two rows on this sheet already impose/);
    expect(rows.find((r) => /^Pitfall Snare/.test(r.name))).toBeUndefined();
  }, 30000);

  test('the seat takes only the form its own section asked for', async () => {
    // the TRAIT seat is offered a save: it is not a trait, so the nearest stands in
    const { trace } = await run({ ...golemCase, fit: { ...REFUSED, missing: 'passage through solid stone' }, seatRow: { saves: [{ clause: 'c', name: 'Wrong Form', stat: 'Strength', target: 'one creature within 5 feet', damage: true, type: 'Bludgeoning', condition: null, movement: null, success: 'none', recharge: false }] } });
    expect(trace).toMatch(/seat authored nothing:.*wrote no row of that kind/);
    expect(trace).not.toMatch(/seat authored the row:/);
  }, 30000);
});
