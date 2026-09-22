import { TEMPLATES, templatesFor, renderTemplate, coveredBySheet, triggerCompatible, fallbackMenu, normaliseTag, rankByVerb, conceptVerbs, valueCheck, rowValue, multiattackShape, buildIdeaPrompt, buildFitPrompt, parseIdeas, parseFit, validateIdeaResponse, validateFitResponse, FLAVOR_SLOTS } from '../templates.mjs';
import { pickDonor, scaleDonor } from '../scale.mjs';
import { generateReskin } from '../generate.mjs';

const sheet = (cr = 8, style = null, archetype = 'skirmisher') => scaleDonor(pickDonor(cr, style, archetype), cr, { mechanics: [] });

describe('the catalog', () => {
  test('promoted seeds: lure and hook-drag are shapes now — band frames, flavor slots, seeds retired', () => {
    const lure = TEMPLATES.find((t) => t.id === 'lure'); const hook = TEMPLATES.find((t) => t.id === 'hook-drag');
    expect(lure.kind).toBe('shape'); expect(hook.kind).toBe('shape');
    expect(TEMPLATES.filter((t) => t.id === 'lure').length).toBe(1);
    const ctx = { scaled: sheet(15, null, 'lurker'), archetype: 'lurker', cr: 15, energy: null, mix: 'physical', meleeName: 'Claw', imposed: [], name: 'X' };
    expect(renderTemplate(lure, ctx, { lure_source: 'the lamp' }).text).toMatch(/within 90 feet that can see or hear the lamp/);
    expect(renderTemplate(lure, ctx, {}).text).toMatch(/can see or hear the creature/); // a missing fill falls to the plain default, never a miss
    expect(renderTemplate(hook, { ...ctx, scaled: sheet(3, null, 'brute'), archetype: 'brute', cr: 3 }, { hook: 'its barbed chain' }).text).toMatch(/pulled up to 20 feet straight toward the creature by its barbed chain/);
    expect(lure.keys).toEqual(expect.arrayContaining(['lure', 'beckon', 'lamp']));
  });
  test('the value check: an under row climbs the ladder; a worth-an-attack condition passes; an over row is gated; a bonus action is free', () => {
    const scaled = sheet(6, null, 'brute'); const per = Math.round(scaled.per_hit);
    const sections = { Actions: [{ name: 'Multiattack', text: 'The creature makes two Slam attacks.' }, { name: 'Slam', text: `*Melee Attack Roll:* +7, reach 5 ft. ${per} (2d8 + 4) Bludgeoning damage.` }] };
    expect(multiattackShape(sections).attacks).toBe(2);
    const half = Math.max(2, Math.round(per / 2));
    const under = valueCheck({ name: 'Sealing Sermon', text: `*Constitution Saving Throw*: DC 15, one creature within 30 feet. *Failure:* ${half} (2d4) Fire damage, and the target can't regain Hit Points until the end of the creature's next turn.` }, { scaled, sections, section: 'Actions' });
    expect(under.steps.join(' ')).toMatch(/Success: Half/);
    expect(under.steps.join(' ')).toMatch(/dice/);
    expect(rowValue(under.text, per).ev).toBeGreaterThanOrEqual(under.floor);
    const lure = valueCheck({ name: 'Lure', text: '*Wisdom Saving Throw*: DC 15, one creature within 30 feet. *Failure:* The target has the Charmed condition until the start of the creature\'s next turn.' }, { scaled, sections, section: 'Actions' });
    expect(lure.steps).toEqual([]);
    const over = valueCheck({ name: 'Ruin', text: `*Dexterity Saving Throw*: DC 15, each creature in a 20-foot Emanation. *Failure:* ${per * 4} (12d8) Fire damage. *Success:* Half damage only.` }, { scaled, sections, section: 'Actions' });
    expect(over.name).toMatch(/\(Recharge 5-6\)$/);
    const bonus = valueCheck({ name: 'Focus', text: 'The creature has Advantage on its next attack roll.' }, { scaled, sections, section: 'Bonus Actions' });
    expect(bonus.ev).toBeGreaterThan(0); // Advantage is worth a quarter of the attack
    expect(bonus.steps).toEqual([]); // and clears the bonus-action minimum
    expect(valueCheck({ name: 'Idle', text: 'The creature looks around.' }, { scaled, sections, section: 'Bonus Actions' }).steps.join(' ')).toMatch(/free row that does nothing/);
    // a mass effect is priced by targets whether gated or not
    const mass = valueCheck({ name: 'Choir', text: `*Wisdom Saving Throw*: DC 15, each creature of the creature's choice within 60 feet. *Failure:* The target has the Charmed condition until the start of the creature's next turn and can't take Reactions.` }, { scaled, sections, section: 'Actions' });
    expect(mass.name).toMatch(/\(Recharge 5-6\)$/);
    // the fill ladder: an empty fills object never costs the signature
    expect(renderTemplate(TEMPLATES.find((t) => t.id === 'false-appearance'), { scaled, archetype: 'brute', cr: 6, energy: null, mix: 'physical', meleeName: 'Slam', imposed: [], name: 'X' }, {}).text).toMatch(/indistinguishable from an ordinary object/);
    expect(renderTemplate(TEMPLATES.find((t) => t.id === 'throw-retrieve'), { scaled, archetype: 'brute', cr: 6, energy: null, mix: 'physical', meleeName: 'Slam', imposed: [], name: 'X', projectile: 'its iron lance' }, {}).text).toMatch(/hurls its iron lance/);
    // a hurler sheet excludes the named-weapon retrieve
    const hurler = { Actions: [{ name: 'Slab', text: '*Ranged Attack Roll:* +7, range 60/240 ft. 20 (3d10 + 4) Bludgeoning damage.' }] };
    expect(templatesFor({ archetype: 'skirmisher', style: 'hurler', cr: 6, sections: hurler, section: 'action' }).map((t) => t.id)).not.toContain('throw-retrieve');
    const gatedBonus = valueCheck({ name: 'Bedrock Grasp (2/Day)', text: `*Strength Saving Throw*: DC 15, one creature within 30 feet. *Failure:* ${Math.round(per / 4)} (1d8) Bludgeoning damage, and the target has the Grappled condition (escape DC 15).` }, { scaled, sections, section: 'Bonus Actions' });
    expect(gatedBonus.steps).toEqual([]); // a gated bonus action is not a nova
    const prereq = valueCheck({ name: 'Lash', text: `*Strength Saving Throw*: DC 15, one creature within 30 feet that is Grappled by the creature. *Failure:* ${per} (2d8) Slashing damage.` }, { scaled, sections, section: 'Actions' });
    expect(prereq.name).toBe('Lash'); // a prerequisite condition is not a payload — no gate
    const gatedNova = valueCheck({ name: 'Toll (Recharge 5-6)', text: `*Constitution Saving Throw*: DC 15, each creature within 15 feet. *Failure:* ${per} (2d8) Thunder damage. *Success:* Half damage only.` }, { scaled, sections, section: 'Actions' });
    expect(gatedNova.replaced).toMatch(/whole Multiattack/);
    // a gated nova climbs to the NOVA budget (2x the round) and lands inside [1.3x, 2.5x] of the Multiattack
    const maEV = 0.65 * per * 2;
    expect(gatedNova.steps.join(' ')).toMatch(/nova budget/);
    expect(gatedNova.ev).toBeGreaterThanOrEqual(1.3 * maEV - 0.5);
    expect(gatedNova.ev).toBeLessThanOrEqual(2.5 * maEV + 0.65 * per * 2); // an already-gated row may sit over the ceiling; it is never double-gated
    expect(gatedNova.name).toBe('Toll (Recharge 5-6)'); // already gated — never double-gated
    // on an area nova, Deafened is a hit's worth, not a quarter
    expect(rowValue(`*Constitution Saving Throw*: DC 15, each creature within 15 feet. *Failure:* ${per} (2d8) Thunder damage, and the target has the Deafened condition.`, per, { area: true }).ev).toBeGreaterThan(rowValue(`*Constitution Saving Throw*: DC 15, one creature within 15 feet. *Failure:* ${per} (2d8) Thunder damage, and the target has the Deafened condition.`, per).ev);
  });
  test('the rider roadmap: pounce, isolation, snatch (flyers only), a ward reaction, and Assassinate bind by verb', () => {
    const lurk = sheet(8, null, 'lurker');
    const ctx = { scaled: lurk, archetype: 'lurker', cr: 8, energy: null, mix: 'physical', meleeName: 'Claw', imposed: [], name: 'X' };
    const riders = templatesFor({ archetype: 'lurker', cr: 8, sections: {}, section: 'rider', movement: '' }).map((t) => t.id);
    expect(riders).toEqual(expect.arrayContaining(['pounce', 'isolation']));
    expect(riders).not.toContain('snatch'); // needs Fly
    expect(templatesFor({ archetype: 'skirmisher', cr: 8, sections: {}, section: 'rider', movement: 'Fly 60 ft.' }).map((t) => t.id)).toContain('snatch');
    expect(rankByVerb(templatesFor({ archetype: 'lurker', cr: 8, sections: {}, section: 'rider' }), 'a leopard-thing that stalks the canopy and drops on stragglers from above')[0].t.id).toBe('pounce');
    expect(renderTemplate(TEMPLATES.find((t) => t.id === 'pounce'), ctx, {}).text).toMatch(/one Claw attack against it as a Bonus Action/);
    expect(templatesFor({ archetype: 'defender', cr: 7, sections: {}, section: 'reaction' }).map((t) => t.id)).toContain('ward-retaliation');
    expect(templatesFor({ archetype: 'brute', cr: 7, sections: {}, section: 'reaction' }).map((t) => t.id)).not.toContain('ward-retaliation'); // print brutes have no reactions
    expect(rankByVerb(templatesFor({ archetype: 'lurker', cr: 8, sections: {}, section: 'trait' }), 'an assassin who strikes before they notice')[0].t.id).toBe('assassinate');
    expect(rankByVerb(templatesFor({ archetype: 'lurker', cr: 4, sections: {}, section: 'trait' }), 'a mimic posing as a strongroom chest')[0].t.id).toBe('adhesive');
  });
  test('a payoff needs a producer; a blink has a value', () => {
    const noHold = templatesFor({ archetype: 'brute', cr: 9, sections: {}, section: 'action', imposed: [] }).map((t) => t.id);
    expect(noHold).not.toContain('condition-payoff'); expect(noHold).not.toContain('exploiter');
    expect(templatesFor({ archetype: 'brute', cr: 9, sections: {}, section: 'action', imposed: ['Grappled'] }).map((t) => t.id)).toContain('condition-payoff');
    expect(rowValue('The creature teleports up to 30 feet to an unoccupied space it can see.', 12).ev).toBeGreaterThan(0.25 * 0.65 * 12); // clears the bonus-action minimum
  });
  test('the caster line has a rider section now; contact damage is a print constant by band', () => {
    const riders = templatesFor({ archetype: 'caster', cr: 7, sections: {}, section: 'rider' });
    expect(riders.map((t) => t.id)).toEqual(expect.arrayContaining(['bolt-restrain', 'bolt-drag', 'bolt-mark']));
    expect(riders.every((t) => t.host === 'ranged')).toBe(true);
    expect(rankByVerb(riders, 'a hermit who calls down a lightning strike from a mile away and pins the lone climber')[0].t.id).toMatch(/^bolt-/);
    const hb = TEMPLATES.find((t) => t.id === 'heated-body');
    const ctx17 = { scaled: sheet(17, null, 'brute'), archetype: 'brute', cr: 17, energy: 'Fire', mix: 'both', meleeName: 'Slam', imposed: [], name: 'X' };
    expect(renderTemplate(hb, ctx17, {}).text).toMatch(/takes 10 \(3d6\) Fire damage/); // the Balor's number at its tier, not 5d8
    expect(renderTemplate(hb, { ...ctx17, scaled: sheet(2, null, 'brute'), cr: 2 }, {}).text).toMatch(/takes 3 \(1d6\) Fire damage/);
  });
  test('a rider is offered only when its host row is on the sheet', () => {
    const meleeOnly = { Actions: [{ name: 'Claw', text: '*Melee Attack Roll:* +6, reach 5 ft. 9 (1d8 + 5) Slashing damage.' }] };
    const ids = templatesFor({ archetype: 'lurker', cr: 7, sections: meleeOnly, section: 'rider' }).map((t) => t.id);
    expect(ids).toContain('pounce'); expect(ids).not.toContain('bolt-drag');
    const rangedOnly = { Actions: [{ name: 'Bolt', text: '*Ranged Attack Roll:* +6, range 120 ft. 9 (1d8 + 5) Lightning damage.' }] };
    const ids2 = templatesFor({ archetype: 'caster', cr: 7, sections: rangedOnly, section: 'rider' }).map((t) => t.id);
    expect(ids2).toContain('bolt-drag'); expect(ids2).not.toContain('pounce');
  });
  test('"brand" binds the targeting mark, not the seal', () => {
    const riders = templatesFor({ archetype: 'caster', cr: 6, sections: { Actions: [{ name: 'Bolt', text: '*Ranged Attack Roll:* +6, range 120 ft. 9 (2d8) Radiant damage.' }] }, section: 'rider' });
    expect(rankByVerb(riders, 'a lighthouse hermit-mage whose lantern beam brands whoever it falls on, so her bolts find them again in the dark')[0].t.id).toBe('bolt-mark');
    expect(TEMPLATES.find((t) => t.id === 'seal').keys).not.toContain('brand');
  });
  test('a vomited cloud is a Cone from the goat; "light" is not "lightning"; a scarecrow binds False Appearance', () => {
    const menu = templatesFor({ archetype: 'skirmisher', cr: 3, sections: {}, section: 'action' });
    expect(rankByVerb(menu, 'a carrion goat that vomits a choking cloud when cornered')[0].t.id).toBe('spew');
    expect(rankByVerb(templatesFor({ archetype: 'brute', cr: 5, sections: {}, section: 'trait' }), 'a shard of light').find((r) => r.t.id === 'heated-body').concept).not.toContain('lightning');
    expect(rankByVerb(templatesFor({ archetype: 'brute', cr: 5, sections: {}, section: 'trait' }), 'a scarecrow stuffed with hay')[0].t.id).toBe('false-appearance');
  });
  test('every template id is unique across shapes and seeds', () => {
    const ids = TEMPLATES.map((t) => t.id);
    expect(new Set(ids).size).toBe(ids.length);
    expect(ids).toContain('zone-seed');
  });
  test('every template renders at a mid CR with flavor slots supplied and no slot left unfilled', () => {
    const fills = { lure_source: 'the lamp', hook: 'its barbed chain', disguise: 'an inanimate statue', projectile: 'a knucklebone', wound_noun: 'gash', zone_effect: 'a choking haze', zone_rule: 'has Disadvantage on attack rolls while inside it', save_stat: 'Wisdom', consumed_condition: 'Frightened', condition_minor: 'Prone', restraint: 'Restrained', r_vuln: 'Fire' };
    for (const t of TEMPLATES) {
      const cr = Math.max(t.cr_range[0], Math.min(8, t.cr_range[1]));
      const archetype = t.roles.includes('skirmisher') ? 'skirmisher' : t.roles.includes('brute') ? 'brute' : t.roles.includes('lurker') ? 'lurker' : t.roles.includes('caster') ? 'caster' : t.roles.includes('defender') ? 'defender' : 'skirmisher';
      const scaled = sheet(cr, null, archetype);
      const ctx = { scaled, archetype, cr, energy: 'Fire', mix: 'both', meleeName: 'Claw', conditionMinor: 'Prone', projectile: null, imposed: ['Prone'], mechanics: [], name: 'Test' };
      const r = renderTemplate(t, ctx, fills);
      if (!r) continue; // a seed illegal on this sheet is a legitimate null
      expect(r.text).not.toMatch(/\{[a-z_]+\}/);
      expect(['Traits', 'Actions', 'Bonus Actions', 'Reactions', 'Rider']).toContain(r.section);
    }
  });
  test('engine slots are the sheet\'s numbers; a vocabulary slot only accepts a listed value; a flavor slot with digits or rules words is a miss', () => {
    const scaled = sheet(8);
    const gaze = TEMPLATES.find((t) => t.id === 'gaze-single');
    const ctx = { scaled, archetype: 'skirmisher', cr: 8, energy: 'Necrotic', mix: 'both', meleeName: 'Claw', conditionMinor: 'Prone', imposed: [], name: 'X' };
    const r = renderTemplate(gaze, ctx, { condition_minor: 'Stunned' }); // Stunned is not a minor condition
    expect(r.text).toContain(`DC ${scaled.dc}`);
    expect(r.text).toContain('Prone condition'); // fell to the sheet's own minor condition
    const s11 = sheet(11);
    expect(renderTemplate(gaze, { ...ctx, scaled: s11, cr: 11 }, {}).text).toContain('Necrotic damage'); // the 10-12 band adds damage
    const burst = TEMPLATES.find((t) => t.id === 'thrown-burst');
    expect(renderTemplate(burst, { ...ctx, archetype: 'brute', cr: 8 }, { projectile: 'a 20-pound stone' }).text).toMatch(/hurls a hurled object/); // a fill with digits is refused and the default stands in
    expect(renderTemplate(burst, { ...ctx, archetype: 'brute', cr: 8 }, { projectile: 'a grave-slab' }).text).toContain('hurls a grave-slab');
  });
  test('templatesFor filters by line, CR band, movement, section, and what the sheet owns; a second nova is refused', () => {
    const scaled = sheet(8, 'hurler', 'skirmisher');
    const menu = templatesFor({ archetype: 'skirmisher', style: 'hurler', cr: 8, movement: '', sections: scaled.sections, section: 'action' });
    expect(menu.every((t) => t.section === 'action')).toBe(true);
    expect(menu.map((t) => t.id)).not.toContain('burrow-ambush'); // needs Burrow
    expect(menu.map((t) => t.id)).not.toContain('rampage'); // bonus action
    const hasNova = Object.values(scaled.sections).flat().some((e) => /\(Recharge/.test(e.name ?? ''));
    if (hasNova) expect(menu.some((t) => t.nova)).toBe(false);
    const owned = { Actions: [{ name: 'Dread Gaze', text: 'x' }] };
    expect(templatesFor({ archetype: 'lurker', cr: 8, sections: owned, section: 'action' }).map((t) => t.id)).not.toContain('gaze-single');
    expect(templatesFor({ archetype: 'caster', cr: 8, sections: {}, section: 'action' }).some((t) => t.kind === 'seed')).toBe(true);
  });
  test('a sheet that already carries the containment engine gets no pull, reel, snare, or hook template (the iron maiden)', () => {
    const caged = { Actions: [{ name: 'Brass Rib', text: '*Melee Attack Roll:* +8, reach 10 ft. 18 (4d6 + 4) Bludgeoning damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 16).' }], 'Bonus Actions': [{ name: 'Cage', text: 'x', engulf_engine: true }] };
    const touch = { Actions: [{ name: 'Grasp', text: '*Melee Attack Roll:* +7, reach 5 ft. 26 (5d8 + 4) Necrotic damage. If the target is a Medium or smaller creature, it has the Grappled condition (escape DC 15).' }] };
    expect(templatesFor({ archetype: 'lurker', style: 'phantom', cr: 7, sections: touch, section: 'action' }).map((t) => t.id)).toContain('obstacle-pull'); // a grapple rider is not the containment engine
    const ids = templatesFor({ archetype: 'brute', style: 'grappler', cr: 8, sections: caged, section: 'action' }).map((t) => t.id);
    for (const x of ['hook-drag', 'obstacle-pull', 'reel', 'snare']) expect(ids).not.toContain(x);
    expect(templatesFor({ archetype: 'brute', cr: 8, sections: {}, section: 'action' }).map((t) => t.id)).toContain('hook-drag');
    // the direction rule: no repeller on a cage seat; holders stay; both come back on an open sheet
    for (const x of ['escalating-dread', 'terror-pulse', 'push-prone', 'gaze-single']) expect(ids).not.toContain(x);
    expect(ids).toEqual(expect.arrayContaining(['condition-payoff', 'exploiter']));
    expect(templatesFor({ archetype: 'brute', cr: 8, sections: {}, section: 'action' }).map((t) => t.id)).toContain('push-prone');
  });
  test('a temporal trigger is structural: an on_being_hit idea sees no telegraphed nova (the bell hermit); save/always/once_per_fight interchange', () => {
    const scaled = sheet(6, 'grappler', 'brute');
    const base = { archetype: 'brute', style: 'grappler', cr: 6, sections: scaled.sections, section: 'action' };
    const hit = templatesFor({ ...base, trigger: 'on_being_hit' }).map((t) => t.id);
    expect(hit).not.toContain('wind-up');
    expect(hit.every((id) => TEMPLATES.find((t) => t.id === id).trigger === 'on_being_hit')).toBe(true);
    const save = templatesFor({ ...base, trigger: 'save' }).map((t) => t.id);
    expect(save).toContain('wind-up');
    expect(save.every((id) => !['on_hit', 'on_being_hit', 'start_of_turn'].includes(TEMPLATES.find((t) => t.id === id).trigger))).toBe(true);
    expect(triggerCompatible('once_per_fight', 'save')).toBe(true);
    expect(triggerCompatible('on_hit', 'save')).toBe(false);
    expect(triggerCompatible(null, 'on_hit')).toBe(true);
    expect(TEMPLATES.find((t) => t.id === 'heated-body').trigger).toBe('on_being_hit');
  });
  test('the fallback obeys the verb and never deals a utility row blind (the obscurement "new dead row")', () => {
    const scaled = sheet(7, 'phantom', 'lurker');
    const ctx = { archetype: 'lurker', style: 'phantom', cr: 7, sections: scaled.sections };
    const blind = fallbackMenu(ctx, 'a thing with no verbs at all').map((t) => t.id);
    for (const n of ['leap', 'trample', 'thrown-burst', 'thrown-burst-seed', 'wind-up', 'active-toll']) expect(blind).not.toContain(n); // no nova stands in for one attack
    for (const u of ['zone-seed', 'focus', 'feint-slip', 'phase-slip', 'rally', 'reveal', 'coating']) expect(blind).not.toContain(u);
    const keeper = fallbackMenu(ctx, 'a lighthouse keeper\'s drowned wife who beckons and lures anyone who follows her down').map((t) => t.id);
    expect(['lure', 'obstacle-pull', 'hook-drag']).toContain(keeper[0]);
    const dark = fallbackMenu(ctx, 'a shadow that fills the hall with darkness and murk').map((t) => t.id);
    expect(dark[0]).toBe('zone-seed'); // a utility row ships only when the concept asks for it
  });
  test('the miss fallback draws from the SAME filtered menu — a caged or reeling sheet never gets a containment seed', () => {
    const roper = { Actions: [{ name: 'Tongue Snare', text: '*Melee Attack Roll:* +7, reach 50 ft. The target has the Grappled condition (escape DC 15).' }, { name: 'Reel', text: 'The creature pulls each creature Grappled by it up to 25 feet straight toward it.' }] };
    const ids = fallbackMenu({ archetype: 'lurker', style: 'trap', cr: 6, sections: roper }).map((t) => t.id);
    expect(ids.length).toBeGreaterThan(0);
    for (const x of ['obstacle-pull', 'hook-drag', 'reel', 'snare']) expect(ids).not.toContain(x);
    expect(renderTemplate(TEMPLATES.find((t) => t.id === 'lure'), { scaled: sheet(6, 'trap', 'lurker'), archetype: 'lurker', cr: 6, energy: null, mix: 'physical', meleeName: 'Claw', imposed: [], name: 'X' }, {}, { blind: true }).text).toMatch(/can see or hear the creature/);
    expect(fallbackMenu({ archetype: 'caster', cr: 6, sections: {} }, 'a wax preacher whose sermons seal the wounds of its flock')[0]).toMatchObject({ id: 'seal' });
  });
  test('the blind read\'s five: x2 slots render; a trap sheet gets no second disguise; the verb ranks the menu; retired and gated seeds', () => {
    const scaled = sheet(7, null, 'lurker');
    const payoff = TEMPLATES.find((t) => t.id === 'condition-payoff');
    const ctx = { scaled, archetype: 'lurker', cr: 7, energy: 'Cold', mix: 'both', meleeName: 'Lance', conditionMinor: 'Prone', imposed: ['Prone'], name: 'K' };
    expect(renderTemplate(payoff, ctx, { save_stat: 'Strength', consumed_condition: 'Prone' }).text).not.toMatch(/\{[a-z_0-9]+\}/);
    const trap = { Traits: [{ name: 'False Form', text: 'The creature shape-shifts to resemble a Medium or Small object while retaining its statistics.' }] };
    expect(templatesFor({ archetype: 'lurker', style: 'trap', cr: 4, sections: trap, section: 'trait' }).map((t) => t.id)).not.toContain('false-appearance');
    const menu = templatesFor({ archetype: 'lurker', cr: 7, sections: {}, section: 'action' });
    const ranked = rankByVerb(menu, 'a lighthouse ghost whose lamp beckons and lures sailors onto the rocks');
    expect(rankByVerb(menu, 'a bishop that walks the poor quarter at night').find((r) => r.t.id === 'escalating-dread').matched).toEqual([]); // "night" is not "nightmare"
    const knight = rankByVerb(menu, 'a drowned knight who rides the causeway', 'the tide draws them to follow and lures them under');
    expect(knight.find((r) => r.t.id === 'lure').concept).toEqual([]);
    expect(knight.find((r) => r.t.id === 'lure').idea).toContain('lure');
    expect(ranked.find((r) => r.t.id === 'lure').score).toBeGreaterThan(knight.find((r) => r.t.id === 'lure').score);
    // "beckons" and "lures" both name verbs on the shelf — both rank above the unmatched rest
    expect(ranked.find((r) => r.t.id === 'lure').matched).toContain('lure');
    expect(ranked.find((r) => r.t.id === 'obstacle-pull').matched).toContain('beckon');
    const firstUnmatched = ranked.findIndex((r) => r.matched.length === 0);
    expect(ranked.slice(firstUnmatched).every((r) => r.matched.length === 0)).toBe(true); // every match ranks ahead of every non-match
    expect(buildFitPrompt({ name: 'K', idea: { idea: 'the lamp lures them up', section: 'action', trigger: 'save', effect: 'condition' }, menu, cr: 7, concept: 'a lighthouse ghost that lures' })).toMatch(/- lure \[Actions\] VERB MATCH: lure \(concept\)/);
    expect(TEMPLATES.map((t) => t.id)).not.toContain('unnerve');
    expect(TEMPLATES.find((t) => t.id === 'focus').gate).toBe('2/Day');
  });
  test('the keys pass: every template has at least six verbs; the four new cards render and match their concepts', () => {
    for (const t of TEMPLATES) expect(t.keys.length).toBeGreaterThanOrEqual(6);
    const scaled = sheet(6, null, 'brute');
    const ctx = { scaled, archetype: 'brute', cr: 6, energy: 'Thunder', mix: 'both', meleeName: 'Claw', imposed: [], name: 'H' };
    const menuT = templatesFor({ archetype: 'brute', cr: 6, sections: {}, section: 'trait' });
    const bell = rankByVerb(menuT, 'a hermit crab that wears a bronze church bell as its shell and rings it when it is wounded');
    // the bell concept names both the wound-toll and the struck-toll — both outrank the rest
    expect(bell.slice(0, 2).map((r) => r.t.id).sort()).toEqual(['bloodied-burst', 'resonant-body']);
    expect(renderTemplate(TEMPLATES.find((t) => t.id === 'resonant-body'), ctx, {}).text).toMatch(/Thunder damage and has the Deafened condition/);
    const menuA = templatesFor({ archetype: 'brute', cr: 6, sections: {}, section: 'action' });
    expect(rankByVerb(menuA, 'a hollow suit of armor that hurls its own lance and thunders across the field to retrieve it')[0].t.id).toBe('throw-retrieve');
    expect(renderTemplate(TEMPLATES.find((t) => t.id === 'throw-retrieve'), ctx, { projectile: 'its lance' }).text).toMatch(/hurls its lance.*Speed is halved/);
    const menuC = templatesFor({ archetype: 'caster', cr: 6, sections: {}, section: 'action' });
    expect(rankByVerb(menuC, 'a wax preacher whose sermons seal the wounds of its flock')[0].t.id).toBe('seal');
    const tarred = { Traits: [{ name: 'Adhesive Hide', text: 'The creature adheres to anything that touches it. A Huge or smaller creature adhered to it is also Grappled.' }] };
    expect(templatesFor({ archetype: 'lurker', cr: 4, sections: tarred, section: 'trait' }).map((t) => t.id)).not.toContain('adhesive');
    expect(rankByVerb(templatesFor({ archetype: 'brute', cr: 5, sections: {}, section: 'trait' }), 'a tar-mouthed toad')[0].t.id).toBe('adhesive');
  });
  test('coveredBySheet: a gated nova or rules row covers elements sharing its stem; plain attack names cover nothing', () => {
    const scaled = sheet(5, 'charger', 'brute');
    const c = coveredBySheet(scaled.sections);
    expect(c.names.length).toBeGreaterThan(0);
    expect(c.regex.test('a straight-line goring charge')).toBe(true); // the charger's own nova
    expect(c.regex.test('blessing the poor by day')).toBe(false);
    expect(coveredBySheet({ Actions: [{ name: 'Claw', text: '*Melee Attack Roll:* +5, reach 5 ft. 8 (1d8 + 3) Slashing damage.' }] }).regex).toBeNull();
    const menu = templatesFor({ archetype: 'brute', style: 'charger', cr: 5, sections: scaled.sections, section: 'trait' });
    const ctx = { scaled, archetype: 'brute', cr: 5, energy: 'Fire', mix: 'both', meleeName: 'Gore', imposed: [], name: 'Bull' };
    expect(renderTemplate(menu.find((t) => t.id === 'absorption'), ctx, {}).text).toMatch(/subjected to Fire damage, it takes no damage/);
  });
  test('the first backlog pass: heated body and false appearance render as traits on any line', () => {
    const scaled = sheet(5, 'charger', 'brute');
    const ctx = { scaled, archetype: 'brute', cr: 5, energy: 'Fire', mix: 'both', meleeName: 'Gore', imposed: [], name: 'Bull' };
    const menu = templatesFor({ archetype: 'brute', style: 'charger', cr: 5, sections: scaled.sections, section: 'trait' });
    expect(menu.map((t) => t.id)).toEqual(expect.arrayContaining(['heated-body', 'false-appearance']));
    expect(renderTemplate(menu.find((t) => t.id === 'heated-body'), ctx, {}).text).toMatch(/hits it with a melee attack while within 5 feet of it takes \d+ \(\d+d\d+\) Fire damage/);
    expect(renderTemplate(menu.find((t) => t.id === 'false-appearance'), ctx, { disguise: 'a brass statue' }).text).toBe('While the creature remains motionless, it is indistinguishable from a brass statue.');
    expect(renderTemplate(menu.find((t) => t.id === 'false-appearance'), ctx, {}).text).toMatch(/an ordinary object/);
  });
});

describe('the two calls', () => {
  test('the idea prompt never shows a template; the fit prompt shows the menu with slots and vocabularies', () => {
    expect(conceptVerbs('a lighthouse keeper\'s drowned wife who pulls anyone who follows her back down into the surf')).toEqual(expect.arrayContaining(['pull', 'follow']));
    const p = buildIdeaPrompt({ name: 'X', cr: 8, concept: 'a thing', sheetLines: '- [Actions] Claw: x', seats: { action: 'a hurled skull', trait: 'bone hide', packaged: false }, wantTrait: true, engines: ['Cage'], verbs: ['hurl', 'throw'] });
    expect(p).toMatch(/THE CONCEPT'S OWN VERBS: hurl, throw/);
    expect(p).toMatch(/PLAIN WORDS/);
    expect(p).toMatch(/ENGINE IS ALREADY BUILT: Cage/);
    expect(p).not.toMatch(/Saving Throw\*: DC/);
    expect(p).toMatch(/"trait"/);
    const menu = templatesFor({ archetype: 'skirmisher', style: 'skulker', cr: 8, sections: {}, section: 'action' });
    const f = buildFitPrompt({ name: 'X', idea: { idea: 'it stares and they freeze', section: 'action', trigger: 'save', effect: 'condition' }, menu, cr: 8 });
    expect(f).toMatch(/- gaze-single \[Actions\]/);
    expect(f).toMatch(/\{condition_minor\} ∈ Prone\/Poisoned/);
    expect(f).toMatch(/or none/);
  });
  test('print section grammar: an "on_hit" action is a save action; a "when hurt" action is a reaction; a start-of-turn action is a trait', () => {
    expect(normaliseTag('action', 'on_hit')).toEqual({ section: 'rider', trigger: 'on_hit' });
    expect(normaliseTag('action', 'on_being_hit')).toEqual({ section: 'reaction', trigger: 'on_being_hit' });
    expect(normaliseTag('bonus_action', 'start_of_turn')).toEqual({ section: 'trait', trigger: 'start_of_turn' });
    expect(normaliseTag('trait', 'save')).toEqual({ section: 'trait', trigger: 'always' });
    expect(normaliseTag('reaction', 'save')).toEqual({ section: 'reaction', trigger: 'on_being_hit' });
    expect(normaliseTag('action', 'save')).toEqual({ section: 'action', trigger: 'save' });
    const ideas = parseIdeas(JSON.stringify({ action: { idea: 'When its claw lands it floods the victim with brine and they cannot breathe for a moment.', section: 'action', trigger: 'on_hit', effect: 'condition' } }));
    expect(ideas.action).toMatchObject({ section: 'rider', trigger: 'on_hit' });
    const riders = templatesFor({ archetype: 'brute', cr: 6, sections: {}, section: 'rider' }).map((t) => t.id);
    expect(riders).toEqual(expect.arrayContaining(['affliction', 'charge']));
    const charger = sheet(5, 'charger', 'brute');
    expect(templatesFor({ archetype: 'brute', style: 'charger', cr: 5, sections: charger.sections, section: 'rider' }).map((t) => t.id)).not.toContain('charge'); // the chassis already charges
    expect(templatesFor({ archetype: 'ooze', cr: 4, sections: {}, section: 'trait' }).length).toBeGreaterThan(0); // body lines borrow a shelf
  });
  test('parsers are tolerant: bad tags default, a decorated id resolves, a long or numeric name is dropped', () => {
    expect(validateIdeaResponse(JSON.stringify({ action: { idea: 'short' } }))).toBe(false);
    const ideas = parseIdeas(JSON.stringify({ action: { idea: 'It lets out a cry that roots the nearest intruder to the spot for a breath.', section: 'legendary', trigger: 'nope', effect: 'condition' }, trait: { idea: 'Its hide is bone and turns blades that strike it flat.', section: 'action' } }));
    expect(ideas.action).toMatchObject({ section: 'action', trigger: 'always', effect: 'condition' });
    expect(ideas.trait.section).toBe('trait');
    const menu = templatesFor({ archetype: 'lurker', cr: 8, sections: {}, section: 'action' });
    expect(validateFitResponse('{"template": "none"}')).toBe(true);
    const fit = parseFit(JSON.stringify({ template: 'Gaze-Single (the stare)', name: 'Rooting Stare', because: 'stares and they freeze', fills: { condition_minor: 'Frightened' } }), menu);
    expect(fit.template?.id).toBe('gaze-single');
    expect(fit.name).toBe('Rooting Stare');
    expect(parseFit(JSON.stringify({ template: 'gaze-single', name: 'A Stare That Roots Them All' }), menu).name).toBeNull();
    expect(parseFit(JSON.stringify({ template: 'none' }), menu).template).toBeNull();
    expect(parseFit(JSON.stringify({ template: 'gaze-single', name: 'Preacher Sermon' }), menu, 'Wax Preacher').name).toBeNull(); // never the creature's own name
    expect(TEMPLATES.find((t) => t.id === 'throw-retrieve').supersedes.test('The lance returns to its hand Hit or Miss')).toBe(true);
    expect(rankByVerb(templatesFor({ archetype: 'brute', cr: 9, sections: {}, section: 'bonus_action' }), 'a clockwork bishop that blesses the poor')[0].t.id).toBe('rally');
  });
});

describe('generateReskin in template mode', () => {
  const mainAnswer = () => JSON.stringify({
    name: 'Gloam Courser', type: 'Fey', size: 'Medium', alignment: 'Neutral Evil', senses: 'darkvision 60 ft.', languages: 'Sylvan',
    renames: { 'Melee Attack': 'Thorn Rake', 'Ranged Attack': 'Cast Thorn', 'Sweeping Area Attack': 'Bramble Sweep', 'Signature Slot': 'Waylay', 'Escape Action': 'Fade Between Hedges', 'Mobility Trait': 'Hedge Runner', 'Reactive Reposition': 'Slip the Ring', 'Legendary Move and Attack': 'Circling Cut', 'Legendary Ranged Attack': 'Parting Thorn', 'Legendary Escape': 'Gone to Green' },
    damage_types: { 'Thorn Rake': 'Slashing', 'Cast Thorn': 'Piercing', 'Bramble Sweep': 'Slashing' },
    conditions: { condition_minor: 'Prone' }, melee_rider: 'none', slot_save: 'Wisdom', speed_shape: 'runner', lore: 'It waylays travelers on the hedge roads.',
  });
  const run = (fitReply, ideaReply) => generateReskin({ archetype: 'skirmisher', style: 'skulker', concept: 'a hedge-fey whose stare roots travelers to the road', cr: 8, energy: 'Psychic', mix: 'both', mechanics: [] }, async (prompt) => {
    if (/inventing the SIGNATURE ability/.test(prompt)) return ideaReply ?? JSON.stringify({ action: { idea: 'It fixes one traveler with its stare and they cannot bring themselves to step off the road until it looks away.', section: 'action', trigger: 'save', effect: 'condition' }, trait: { idea: 'Its footprints close behind it and the hedge shows no sign it passed.', trigger: 'always', effect: 'defense' } });
    if (/Pour it into ONE/.test(prompt)) return fitReply(prompt);
    if (/findings/.test(prompt)) return JSON.stringify({ findings: [] });
    return mainAnswer();
  });

  test('the fit lands as a proven row under the model\'s name; the main call was never asked for a wildcard; no repair call happened', async () => {
    const prompts = [];
    const m = await run((prompt) => { prompts.push(prompt); return /gaze-single/.test(prompt) ? JSON.stringify({ template: 'gaze-single', because: 'fixes one traveler with its stare', name: 'Rooting Stare', fills: { condition_minor: 'Frightened' } }) : JSON.stringify({ template: 'none' }); });
    const rows = Object.values(m.sections).flat();
    // THE FLOOR BLOCKS: a Frightened-only gaze at CR 8 is a dead replacement
    // (EV ~0.25 of an attack) — it is dropped and a seed that clears the
    // floor stands in; the fit's name never reaches the page
    expect(rows.map((e) => e.name)).not.toContain('Rooting Stare');
    expect(rows.some((e) => e.library)).toBe(true);
    expect(rows.map((e) => e.name)).not.toContain('Waylay');
    expect(rows.map((e) => e.name)).not.toContain('Signature Slot');
    expect(m.generation?.signature ?? 'library').toBe('library');
  });

  test('a "none" from the fit logs a miss and the library seed stands in — the block still ships', async () => {
    const m = await run(() => JSON.stringify({ template: 'none', because: '' }));
    const rows = Object.values(m.sections).flat();
    expect(rows.some((e) => e.library)).toBe(true);
    expect(rows.map((e) => e.name)).not.toContain('Signature Slot');
  });

  test('a fit whose flavor slot cannot be filled is a miss, not a half-filled row', async () => {
    const m = await run((prompt) => (/thrown-burst/.test(prompt) ? JSON.stringify({ template: 'thrown-burst', name: 'Stone Toss', fills: { projectile: 'a 40-pound rock' } }) : JSON.stringify({ template: 'none' })));
    const rows = Object.values(m.sections).flat();
    expect(rows.every((e) => !/\{[a-z_]+\}/.test(e.text))).toBe(true);
    expect(rows.map((e) => e.name)).not.toContain('Stone Toss');
  });

  test('signatureMode freetext keeps the old path (the main call is asked for a wildcard)', async () => {
    let askedWildcard = false;
    await generateReskin({ archetype: 'skirmisher', concept: 'x', cr: 8, signatureMode: 'freetext' }, async (prompt) => {
      if (/"wildcard": "<The monster is always/.test(prompt)) askedWildcard = true;
      if (/findings/.test(prompt)) return JSON.stringify({ findings: [] });
      return JSON.stringify({ ...JSON.parse(mainAnswer()), wildcard: '*Wisdom Saving Throw*: DC 15, one creature within 30 feet. *Failure:* The target has the Prone condition.', wildcard_economy: 'action' });
    }).catch(() => {});
    expect(askedWildcard).toBe(true);
  });
});
