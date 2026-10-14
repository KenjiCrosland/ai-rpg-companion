// THE RE-ROLL TAKES THE WHOLE CREATURE (step 9b, 2026-10-13). Users: a per-entry
// re-roll "seems incredibly random as though it doesn't take the whole creature
// into consideration". It was: the call saw the monster's name, its CR, and the
// NAMES of its other entries, then wrote rules text freely — no concept, no
// header, no sibling rules, no catalog, no value check, and the card's numbers
// for the CR rather than the creature's own derived ones.
const { rerollEntry, rerollSection, validateEntryResponse } = require('../format-2024/generate.mjs');

const warden = () => ({
  format: '2024', name: 'Tidecaller Reef-Warden', inline: 'the reef-warden', type: 'Humanoid', size: 'Medium',
  alignment: 'Neutral', ac: 16, hp: 97, challenge_rating: '5', cr: 5, pb: 3, archetype: 'controller',
  speed: '30 ft., Swim 30 ft.', senses: 'Darkvision 60 ft.; Passive Perception 13', languages: 'Common, Primordial',
  stats: { STR: 14, DEX: 14, CON: 16, INT: 12, WIS: 16, CHA: 12 },
  generation: { userConcept: 'a triton reef-warden who drags raiders under the water with a lash of kelp', archetype: 'controller' },
  sections: {
    Traits: [{ name: 'Amphibious', text: 'The reef-warden can breathe air and water.', kit: 'triton', clause: 'a triton' }],
    Actions: [
      { name: 'Multiattack', text: 'The reef-warden makes two Kelp Lash attacks.' },
      { name: 'Kelp Lash', text: '*Melee Attack Roll:* +6, reach 10 ft. 12 (2d8 + 3) Bludgeoning damage.', part: true, clause: 'a lash of kelp' },
      { name: 'Tidal Surge', text: '*Strength Saving Throw*: DC 14, each creature in a 15-foot Cone. *Failure:* 10 (3d6) Cold damage.' },
    ],
  },
});
const surge = (m) => ({ name: 'Tidal Surge', description: m.sections.Actions[2].text });
const roll = (m, body, opts = {}) => {
  let prompt = ''; let calls = 0;
  const answers = Array.isArray(body) ? body : [body];
  return rerollEntry(m, { kind: 'action', current: surge(m), ...opts }, async (p) => { prompt = p; calls += 1; return answers[Math.min(calls - 1, answers.length - 1)]; })
    .then((r) => ({ r, prompt, calls }), (e) => ({ err: e, prompt, calls }));
};

describe('the re-roll takes the whole creature (step 9b)', () => {
  test('the answer is a catalog template OR written text, and the validator accepts exactly those', () => {
    expect(validateEntryResponse(JSON.stringify({ template: 'reel', name: 'Undertow Haul' }))).toBe(true);
    expect(validateEntryResponse(JSON.stringify({ template: 'none', name: 'Undertow Haul', text: 'It pulls.' }))).toBe(true);
    expect(validateEntryResponse(JSON.stringify({ template: 'none', name: 'Undertow Haul' }))).toBe(false); // none and no text is no answer
    expect(validateEntryResponse(JSON.stringify({ name: '', text: 'It pulls.' }))).toBe(false);
    expect(validateEntryResponse(JSON.stringify({ name: 'Undertow Haul', text: 'It pulls.' }))).toBe(true); // the old shape still answers
  });

  test('the prompt carries the concept, the header, the inline, and every sibling\'s RULES — not just their names', async () => {
    const { prompt } = await roll(warden(), JSON.stringify({ template: 'none', name: 'Undertow Grasp', text: '*Strength Saving Throw*: DC 14, one creature within 15 feet. *Failure:* 24 (7d6) Cold damage.' }), { degraded: true });
    expect(prompt).toContain('a triton reef-warden who drags raiders under the water');       // what the GM asked for
    expect(prompt).toContain('Medium Humanoid');                                              // the header
    expect(prompt).toContain('Swim 30 ft.');
    expect(prompt).toContain('IT IS CALLED "the reef-warden" IN RULES TEXT');                  // the sheet's own self-reference
    expect(prompt).toContain('12 (2d8 + 3) Bludgeoning damage');                              // a sibling's rules, verbatim
    expect(prompt).toMatch(/\* Kelp Lash/);                                                   // and which rows the GM named
    expect(prompt).toMatch(/\* Amphibious/);
  });

  test('the catalog is offered first, ranked by the GM\'s own verb', async () => {
    const { prompt } = await roll(warden(), JSON.stringify({ template: 'none', name: 'Undertow Grasp', text: '*Strength Saving Throw*: DC 14, one creature within 15 feet. *Failure:* 24 (7d6) Cold damage.' }), { degraded: true });
    const ids = [...prompt.matchAll(/^- ([a-z-]+) \[/gm)].map((m) => m[1]);
    expect(ids.length).toBeGreaterThan(3);
    expect(ids[0]).toBe('reel');                                   // "drags raiders under" is the reel's own verb
    expect(prompt).toContain('VERB MATCH: drag (concept)');
    expect(prompt).toContain('name in "wrong" any template whose key word does not mean its mechanic here');
  });

  test('a template that fits IS the entry: print\'s frame, the engine\'s numbers, the sheet\'s inline, and provenance', async () => {
    const { r, calls } = await roll(warden(), JSON.stringify({ template: 'reel', name: 'Undertow Haul', fills: {}, wrong: [] }));
    expect(calls).toBe(1);                                          // a re-roll is still ONE call
    expect(r.name).toBe('Undertow Haul');
    expect(r.description).toContain('pulled up to 15 feet straight toward the reef-warden'); // the inline, not "the creature"
    expect(r.description).toMatch(/^\*Strength Saving Throw\*: DC 14,/);                      // the SHEET's DC, not the card's 15
    expect(r.description).toMatch(/\d+ \(\d+d\d+\)/);
    expect(r.template).toBe('reel');
    expect(r.boundKeys).toContain('drag');                          // the receipt: the GM's word this row binds
  });

  test('the value floor still prices a re-rolled row, and a floored template steers the retry', async () => {
    // snare at CR 5 is a gated Restrain with no damage: the ladder cannot lift it
    const { r, calls } = await roll(warden(), [
      JSON.stringify({ template: 'snare', name: 'Kelp Snare', fills: { restraint: 'kelp', r_vuln: 'Fire' }, wrong: [] }),
      JSON.stringify({ template: 'none', name: 'Undertow Grasp', text: '*Strength Saving Throw*: DC 14, one creature within 15 feet. *Failure:* 24 (7d6) Cold damage.' }),
    ], { degraded: true });
    expect(calls).toBe(2);                                          // one retry, as before — the reason is the floor
    expect(r.name).toBe('Undertow Grasp');
    expect(r.template).toBeUndefined();                             // free text carries no provenance
  });

  test('the skeletons are the creature\'s own derived numbers, not the card\'s for its CR', async () => {
    const { prompt } = await roll(warden(), JSON.stringify({ template: 'none', name: 'Undertow Grasp', text: '*Strength Saving Throw*: DC 14, one creature within 15 feet. *Failure:* 24 (7d6) Cold damage.' }), { degraded: true });
    // the sheet reads DC 14 and +6; the CR 5 controller card reads DC 15 and +7
    expect(prompt).toContain('Saving Throw*: DC 14');
    expect(prompt).toContain('*Melee Attack Roll:* +6');
    expect(prompt).not.toContain('DC 15');
  });

  test('a hand-edited outlier does not drag the budget: the card stands when the sheet is far off', async () => {
    const m = warden();
    m.sections.Actions[2].text = '*Strength Saving Throw*: DC 25, each creature in a 15-foot Cone. *Failure:* 10 (3d6) Cold damage.';
    m.sections.Actions[1].text = '*Melee Attack Roll:* +19, reach 10 ft. 12 (2d8 + 3) Bludgeoning damage.';
    const { prompt } = await roll(m, JSON.stringify({ template: 'none', name: 'Undertow Grasp', text: '*Strength Saving Throw*: DC 15, one creature within 15 feet. *Failure:* 24 (7d6) Cold damage.' }), { degraded: true });
    expect(prompt).toContain('Saving Throw*: DC 15');               // the card's, because the sheet's is 10 over
    expect(prompt).toContain('*Melee Attack Roll:* +7');
  });

  test('a structural name still survives, and the catalog text lands under it', async () => {
    const m = warden();
    const { r } = await rerollEntry(m, { kind: 'action', current: { name: 'Multiattack', description: m.sections.Actions[0].text }, degraded: true },
      async () => JSON.stringify({ template: 'none', name: 'Twin Lashes', text: 'The reef-warden makes two Kelp Lash attacks.' })).then((x) => ({ r: x }), (e) => ({ err: e }));
    expect(r.name).toBe('Multiattack');
  });

  test('a legendary action has no catalog shelf, and the old prompt shape still works', async () => {
    const m = warden();
    m.sections['Legendary Actions'] = [{ name: 'Riptide', text: 'The reef-warden moves up to its Speed.' }];
    let prompt = '';
    const out = await rerollEntry(m, { kind: 'legendary', current: { name: 'Riptide', description: 'The reef-warden moves up to its Speed.' }, degraded: true },
      async (p) => { prompt = p; return JSON.stringify({ name: 'Undertow Step', text: 'The reef-warden moves up to half its Speed without provoking Opportunity Attacks.' }); });
    expect(prompt).toContain('FIXED NUMBER SKELETONS');
    expect(prompt).not.toContain('FIRST CHOICE — THE CATALOG');
    expect(out.name).toBe('Undertow Step');
  });

  test('a whole-section re-roll sees the same creature', async () => {
    let prompt = '';
    await rerollSection(warden(), { kind: 'abilities', suggestion: 'make it tidal', degraded: true },
      async (p) => { prompt = p; return JSON.stringify([{ name: 'Tide-Born', text: 'The reef-warden can breathe air and water.' }]); });
    expect(prompt).toContain('a triton reef-warden who drags raiders under the water');
    expect(prompt).toContain('12 (2d8 + 3) Bludgeoning damage');
    expect(prompt).toContain('IT IS CALLED "the reef-warden" IN RULES TEXT');
  });
});

// FROM THE LIVE BLOCKS (2026-10-14): the first critic run of the re-roll found
// three defects that no unit test had reached.
describe('what the live blocks found', () => {
  const m0 = () => warden();
  test('a rewrite keeps the row\'s own numbers — the skeleton\'s budget is for a NEW row', async () => {
    const m = m0();
    // the Multiattack names Kelp Lash, so the name is load-bearing and this is a REWRITE
    const out = await rerollEntry(m, { kind: 'action', current: { name: 'Kelp Lash', description: m.sections.Actions[1].text }, degraded: true },
      async () => JSON.stringify({ template: 'none', name: 'Kelp Lash', text: '*Melee Attack Roll:* +9, reach 10 ft. 25 (6d6 + 4) Bludgeoning damage.' }));
    expect(out.name).toBe('Kelp Lash');
    expect(out.description).toContain('+6');          // the row's own bonus, not the model's +9
    expect(out.description).toContain('12 (2d8 + 3)'); // and the row's own dice
    expect(out.description).not.toContain('6d6');
  });

  test('a re-roll never re-picks the template it is replacing', async () => {
    const m = m0();
    m.sections.Actions[2].template = 'reel';          // the row came from the catalog
    let prompt = '';
    const out = await rerollEntry(m, { kind: 'action', current: { name: 'Tidal Surge', description: m.sections.Actions[2].text }, degraded: true },
      async (p) => { prompt = p; return JSON.stringify({ template: 'none', name: 'Undertow Grasp', text: '*Strength Saving Throw*: DC 14, one creature within 15 feet. *Failure:* 24 (7d6) Cold damage.' }); });
    expect(prompt).toMatch(/FIRST CHOICE — THE CATALOG/);
    expect(prompt).not.toMatch(/^- reel \[/m); // the row's own template is off the menu
    expect(out.name).toBe('Undertow Grasp');
  });

  test('a trait never climbs the value ladder, so no "Success: Half" fragment lands on one', async () => {
    const m = m0();
    m.archetype = 'lurker'; // evasion's own roles are lurker and skirmisher
    m.sections.Traits.push({ name: 'Marsh Sense', text: 'The reef-warden has Advantage on Perception checks in water.' });
    const out = await rerollEntry(m, { kind: 'ability', current: { name: 'Marsh Sense', description: 'The reef-warden has Advantage on Perception checks in water.' }, degraded: true },
      async () => JSON.stringify({ template: 'evasion', name: 'Reef Slip', fills: {}, wrong: [] }));
    expect(out.description).not.toMatch(/\*Success:\*/);
    expect(out.description).not.toMatch(/Half damage/);
  });
});
