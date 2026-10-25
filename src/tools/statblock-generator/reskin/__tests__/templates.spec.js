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
    // EMANATION, not "within N feet" (2026-10-22): print's 2024 idiom for an area
    // around the creature is an Emanation — 25 such clauses in the corpus against
    // ONE bare "within N feet" (Lich/Deathly Teleport). The SIZE is unchanged, so
    // this is grammar only and the pricing does not move.
    expect(renderTemplate(lure, ctx, { lure_source: 'the lamp' }).text).toMatch(/in a 90-foot Emanation originating from the creature that can see or hear the lamp/);
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
    const hurler = { Actions: [{ name: 'Slab', text: '*Ranged Attack Roll:* +7, range 60/240 ft. 20 (3d10 + 4) Bludgeoning damage.', library: true }] }; // a throw the SHEET owns (a seed, a template, print's) excludes the retrieve; a chassis throw yields its slot instead (fidelity pipeline step 2)
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
    expect(templatesFor({ archetype: 'defender', cr: 7, style: 'warden', sections: {}, section: 'reaction' }).map((t) => t.id)).toContain('ward-retaliation'); // the warden seat (a plain defender has no ward to answer for, 2026-09-28)
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
    // NOT every rider: print's Mummy Lord (CR 15) and Vampire (CR 13) are casters
    // carrying a MELEE rider that reduces Hit Point maximum, so `life-drain`
    // reaches this shelf legitimately (2026-10-22). The claim that holds is that
    // the caster's own BOLT riders ride a ranged row.
    expect(riders.filter((t) => /^bolt-/.test(t.id)).every((t) => t.host === 'ranged')).toBe(true);
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
    const fills = { lure_source: 'the lamp', hook: 'its barbed chain', disguise: 'an inanimate statue', projectile: 'a knucklebone', wound_phrase: 'a weeping wound', zone_effect: 'a choking haze', zone_rule: 'has Disadvantage on attack rolls while inside it', save_stat: 'Wisdom', consumed_condition: 'Frightened', condition_minor: 'Prone', restraint: 'Restrained', r_vuln: 'Fire' };
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
    // the seat element is idea-level, and a generic noun in it never steers the blind draw (the bull's "straight-line charge" dealt a hook)
    const bull = fallbackMenu({ archetype: 'brute', style: 'charger', cr: 5, sections: {} }, 'a brass bull construct that charges through market stalls', 'straight-line charge that ends in a gore');
    expect(bull[0].id).not.toBe('hook-drag');
    // and with no verb earned, the blind rest holds only any-body fictions: no hook, no shell, no hurled weapon on a bull
    for (const id of ['hook-drag', 'shell-withdraw', 'throw-retrieve', 'lure', 'reel', 'obstacle-pull', 'aggro-curse', 'drain']) expect(bull.map((t) => t.id)).not.toContain(id);
    expect(bull.length).toBeGreaterThan(0);
    const priest = fallbackMenu({ archetype: 'caster', style: 'warpriest', cr: 6, sections: {} }, 'a thing with no verbs at all').map((t) => t.id);
    expect(priest).toContain('aggro-curse'); // a mark is any caster's
    const bullRanked = rankByVerb(bull, 'a brass bull construct that charges through market stalls', 'straight-line charge that ends in a gore');
    expect(bullRanked.find((r) => r.t.id === 'hook-drag')?.matched ?? []).toEqual([]);
  });
  test('a seed\'s rejected flavor fill falls to the blind default, never to a miss (the fill ladder is one ladder)', () => {
    const scaled = sheet(6, 'warpriest', 'caster');
    const ctx = { scaled, archetype: 'caster', style: 'warpriest', cr: 6, sections: scaled.sections, meleeName: 'Mace', energy: 'Fire', mix: 'both', imposed: [], name: 'B' };
    const brand = TEMPLATES.find((t) => t.id === 'delayed-brand');
    const blind = renderTemplate(brand, ctx, {}, { blind: true });
    if (blind) { // legal on this sheet: the model's bad fill must not kill it
      const r = renderTemplate(brand, ctx, { douse: 'takes 5 (1d10) Fire damage' });
      expect(r).not.toBeNull(); expect(r.text).toContain('tear the brand away'); expect(r.text).not.toMatch(/\{[a-z_]+\}/);
    }
  });
  test('the miss log\'s two clusters: the barbed lance binds the hooking rider, the duelist binds the riposte; both render and price', () => {
    const scaled = sheet(7, null, 'skirmisher');
    const ctx = { scaled, archetype: 'skirmisher', cr: 7, sections: scaled.sections, meleeName: 'Lance', energy: null, mix: null, imposed: [], name: 'L' };
    const riders = templatesFor({ archetype: 'skirmisher', cr: 7, sections: scaled.sections, section: 'rider' });
    expect(rankByVerb(riders, 'an ashen lancer whose barbed lance hooks and drags whoever it strikes')[0].t.id).toBe('hook-rider');
    const hook = renderTemplate(TEMPLATES.find((t) => t.id === 'hook-rider'), ctx);
    expect(hook.section).toBe('Rider'); expect(hook.text).toMatch(/pulled up to 10 feet straight toward/);
    const reactions = templatesFor({ archetype: 'skirmisher', cr: 7, sections: scaled.sections, section: 'reaction' });
    expect(rankByVerb(reactions, 'a scarred duelist whose saber parries and whose off-hand dagger answers every miss')[0].t.id).toBe('riposte');
    const rip = renderTemplate(TEMPLATES.find((t) => t.id === 'riposte'), ctx);
    expect(rip.section).toBe('Reactions'); expect(rip.text).toMatch(/misses it with a melee attack roll.*makes one Lance attack/);
    // a reaction is a free row whose attack grant is worth an attack — it clears the floor without a ladder
    const vc = valueCheck({ name: rip.name, text: rip.text }, { scaled, sections: scaled.sections, section: 'Reactions' });
    expect(vc.steps).toEqual([]); expect(vc.replaced).toMatch(/reaction \(free\)/); expect(vc.ev).toBeGreaterThan(vc.floor);
    // the direction rule: a caged sheet gets no pull rider either
    const caged = { Actions: [{ name: 'Reel', text: 'The creature pulls each creature Grappled by it up to 25 feet straight toward it.' }] };
    expect(templatesFor({ archetype: 'skirmisher', cr: 7, sections: caged, section: 'rider' }).map((t) => t.id)).not.toContain('hook-rider');
  });
  test('a template that supersedes a sheet row is offered despite that row\'s engine family; a thrown row the sheet OWNS still excludes it (a chassis throw yields its slot instead — fidelity pipeline step 2)', () => {
    const returning = { Actions: [{ name: 'Thrown Lance', text: 'The creature throws its lance. *Ranged Attack Roll:* +8, range 30/90 ft. 13 (2d8 + 4) Piercing damage. *Hit or Miss:* Immediately after the attack, the lance returns to its hand.' }] };
    expect(templatesFor({ archetype: 'skirmisher', style: 'hurler', cr: 9, sections: returning, section: 'action' }).map((t) => t.id)).toContain('throw-retrieve');
    const boulder = { Actions: [{ name: 'Boulder', text: 'The creature hurls a boulder. *Ranged Attack Roll:* +8, range 60/240 ft. 22 (4d10) Bludgeoning damage.', library: true }] };
    expect(templatesFor({ archetype: 'skirmisher', style: 'hurler', cr: 9, sections: boulder, section: 'action' }).map((t) => t.id)).not.toContain('throw-retrieve');
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
    // a prefix is a match only when the remainder IS an inflection (goldens 2026-09-22: "market" bound the bull to "marks")
    const riders = templatesFor({ archetype: 'artillery', cr: 6, sections: {}, section: 'rider' });
    expect(rankByVerb(riders, 'a brass bull that charges through market stalls').find((r) => r.t.id === 'bolt-mark').matched).toEqual([]);
    expect(rankByVerb(riders, 'a hunter whose bolt marks the straggler').find((r) => r.t.id === 'bolt-mark').concept).toEqual(expect.arrayContaining(['bolt', 'marks', 'straggler']));
    expect(rankByVerb(menu, 'a thing that keeps dragging its prey under').find((r) => r.t.id === 'hook-drag').concept).toEqual(expect.arrayContaining(['drag', 'under'])); // "dragging" still inflects to "drag"
    expect(rankByVerb(templatesFor({ archetype: 'caster', cr: 9, sections: {}, section: 'action' }), 'an astrologer who reads the stars').find((r) => r.t.id === 'pacify').matched).toEqual([]); // "stars" is not "stare"
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
    // ROUTED BY THE DECLARED MECHANIC, NOT BY WORDS (2026-10-25). Six verbs per
    // template was the only bridge from the GM's words to a shape before every
    // template declared a `mechanic` the resolve call can name. `kill-denial` is the
    // first template added AFTER that landed, and it carries no key words on purpose:
    // there is no verb for "what becomes of what you kill" that would not also fire
    // on ordinary killing. It reaches the menu because the route call answers
    // asked_mechanic: 'harvest' and `rankByVerb` seats the matching stamp first.
    //
    // This allowlist is deliberate friction: a template that wants to skip the keys
    // rule has to be named here, in a test, so the choice is visible in review.
    const KEYLESS_BY_DESIGN = new Set(['kill-denial', 'relic-object', 'tally']);
    for (const t of TEMPLATES) {
      if (KEYLESS_BY_DESIGN.has(t.id)) { expect(t.mechanic).toBeTruthy(); continue; }
      expect(t.keys.length).toBeGreaterThanOrEqual(6);
    }
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
    expect(conceptVerbs('a lighthouse keeper\'s drowned wife who pulls anyone who follows her back down into the surf')).toEqual(expect.arrayContaining(['pull', 'follows'])); // 'follows' is the tracker's now; bare 'follow' left the lure (fresh four 2026-09-28)
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
});

describe('the seat owes a LIST, not a row (2026-09-28)', () => {
  test("the skulker seat owes Assassinate AND Evasion — print's 2024 Assassin carries both", () => {
    const { SEAT_DEFAULT_TRAIT } = require('../templates.mjs');
    expect(Array.isArray(SEAT_DEFAULT_TRAIT.skulker)).toBe(true);
    expect(SEAT_DEFAULT_TRAIT.skulker).toEqual(['assassinate', 'evasion']);
    for (const owed of Object.values(SEAT_DEFAULT_TRAIT)) for (const id of owed) expect(TEMPLATES.find((t) => t.id === id)).toBeDefined();
  });
  test('any burrower may erupt — the shape is gated by the Burrow speed, not by the skulker seat', () => {
    const ids = (archetype) => templatesFor({ archetype, cr: 6, sections: {}, section: 'action', movement: '30 ft., Burrow 30 ft.' }).map((t) => t.id);
    expect(ids('brute')).toContain('burrow-ambush');
    expect(ids('lurker')).toContain('burrow-ambush');
    expect(templatesFor({ archetype: 'brute', cr: 6, sections: {}, section: 'action', movement: '30 ft.' }).map((t) => t.id)).not.toContain('burrow-ambush');
  });
});

describe('the trait shelf pass (2026-09-27): four always-on cards from the miss log', () => {
  const ctx = (cr, archetype = 'brute', extra = {}) => ({ scaled: sheet(cr, null, archetype), archetype, cr, energy: null, mix: 'physical', meleeName: 'Slam', imposed: [], name: 'X', ...extra });
  test('all four are trait-section, always-trigger, and render at every band', () => {
    for (const id of ['spider-climb', 'terrain-walk', 'aberrant-ground', 'faultless-tracker']) {
      const t = TEMPLATES.find((x) => x.id === id);
      expect(t.section).toBe('trait'); expect(t.trigger).toBe('always');
      for (const cr of [1, 4, 8, 11, 16, 24]) expect(renderTemplate(t, ctx(cr), {})).not.toBeNull();
    }
  });
  // 2026-10-22: this test used to assert the OPPOSITE — that Spider Climb is
  // offered ONLY with a Climb speed. That gate was circular (the trait GRANTS the
  // climbing) and print contradicts it: the Vampire Spawn is Medium, "30 ft.", and
  // carries Spider Climb outright. 12 of print's 14 instances pair it with a Climb
  // speed, which is CORRELATION, not a requirement. Print overrules pins.
  test('Spider Climb does not require a Climb speed — it grants the climbing (print: the Vampire Spawn)', () => {
    const ids = (movement) => templatesFor({ archetype: 'lurker', cr: 5, sections: {}, section: 'trait', movement }).map((t) => t.id);
    expect(ids('climb')).toContain('spider-climb');
    expect(ids('climb fly')).toContain('spider-climb');
    expect(ids('')).toContain('spider-climb');     // the Vampire Spawn case: no Climb speed, has the trait
    expect(ids('swim')).toContain('spider-climb');
    expect(TEMPLATES.find((x) => x.id === 'spider-climb').requires_movement).toBeNull();
    // the concept still RANKS it first where the fiction asks for it
    expect(rankByVerb(templatesFor({ archetype: 'lurker', cr: 5, sections: {}, section: 'trait', movement: 'climb' }), 'a gargoyle-thing that scuttles along the cathedral ceiling and drops from the gutters')[0].t.id).toBe('spider-climb');
  });
  test('Sure Footing is the Ice Walk grammar with the terrain as the slot; the blind fill is plain', () => {
    const t = TEMPLATES.find((x) => x.id === 'terrain-walk');
    expect(t.flavor).toEqual(['terrain']);
    expect(renderTemplate(t, ctx(7), { terrain: 'ice or snow' }).text).toBe("Difficult Terrain composed of ice or snow doesn't cost the creature extra movement, and the creature can move across ice or snow without needing to make an ability check.");
    expect(renderTemplate(t, ctx(7), {}).text).toMatch(/composed of mud/);
    expect(renderTemplate(t, ctx(7), { terrain: 'a DC 15 saving throw of mud' })).not.toBeNull(); // a rules-grammar fill falls to the default, never to a miss
    expect(rankByVerb(templatesFor({ archetype: 'brute', cr: 7, sections: {}, section: 'trait' }), 'a bog troll one with the mire, whose muddy ground never slows it')[0].t.id).toBe('terrain-walk');
    expect(rankByVerb(templatesFor({ archetype: 'skirmisher', cr: 3, sections: {}, section: 'trait' }), 'a swamp heron that spears frogs and men alike, then wades backward into the reeds where nothing can follow')[0].t.id).toBe('terrain-walk');
  });
  test('Aberrant Ground carries the wake ideas; Faultless Tracker carries the quarry ideas', () => {
    expect(renderTemplate(TEMPLATES.find((x) => x.id === 'aberrant-ground'), ctx(6), {}).text).toBe('The ground in a 10-foot Emanation originating from the creature is Difficult Terrain.');
    expect(rankByVerb(templatesFor({ archetype: 'brute', cr: 6, sections: {}, section: 'trait' }), 'a drowned keeper, bloated and waterlogged, who leaves a spreading slick of brine and seawater wherever she moves')[0].t.id).toBe('aberrant-ground');
    expect(rankByVerb(templatesFor({ archetype: 'brute', cr: 6, sections: {}, section: 'trait' }), 'a stone exile whose hide crumbles into a wake of rubble and scree that pursuers slow in').slice(0, 2).map((r) => r.t.id)).toContain('aberrant-ground');
    const ft = TEMPLATES.find((x) => x.id === 'faultless-tracker');
    expect(ft.cite).toBeFalsy(); // an invention carries no print cite
    expect(renderTemplate(ft, ctx(13, 'lurker'), {}).text).toMatch(/knows the direction and distance to any creature it has damaged within the last 24 hours/);
    expect(rankByVerb(templatesFor({ archetype: 'controller', cr: 13, sections: {}, section: 'trait' }), 'a hanged judge whose noose still tightens around the guilty from a hundred feet away; it always knows exactly where its quarry stands')[0].t.id).toBe('faultless-tracker');
    expect(rankByVerb(templatesFor({ archetype: 'artillery', cr: 7, sections: {}, section: 'trait' }), "a lighthouse keeper whose lantern marks the drowning so her bolts find them again, tracking them through the dark")[0].t.id).toBe('faultless-tracker');
    // Web Walker (print, 2024 text): the widow's "knows every thread of its web"
    expect(renderTemplate(TEMPLATES.find((x) => x.id === 'web-walker'), ctx(3, 'lurker'), {}).text).toMatch(/knows the location of any other creature in contact with the same web/);
    expect(rankByVerb(templatesFor({ archetype: 'lurker', cr: 3, sections: {}, section: 'trait', movement: 'climb' }), 'a cellar spider the size of a hound that hangs from the rafters and knows every thread of its web')[0].t.id).toBe('web-walker');
    // and none of them shows up on a sheet that already ships it
    const shipped = { Traits: [{ name: 'Faultless Tracker', text: 'x', template: 'faultless-tracker' }] };
    expect(templatesFor({ archetype: 'controller', cr: 13, sections: shipped, section: 'trait' }).map((t) => t.id)).not.toContain('faultless-tracker');
  });
});

describe('the fourteen (2026-09-28): eight print families, six kin-cited inventions', () => {
  const ctx = (cr, archetype = 'brute', extra = {}) => ({ scaled: sheet(cr, null, archetype), archetype, cr, energy: 'Fire', mix: 'both', meleeName: 'Slam', imposed: [], name: 'X', ...extra });
  const IDS = ['fire-aura', 'noxious-aura', 'bloodied-fury', 'uncanny-sense', 'earth-glide', 'tunneler', 'berserk', 'shielded-mind', 'evasion', 'relentless-pursuit', 'bound', 'marking-light', 'sealed-body', 'warded-mending', 'guarded-stance'];
  test('all fifteen cards are traits and render at every band inside their range', () => {
    for (const id of IDS) {
      const t = TEMPLATES.find((x) => x.id === id);
      expect(`${id}: ${t ? t.section : 'MISSING'}`).toBe(`${id}: trait`);
      for (const cr of [1, 4, 8, 11, 16, 24]) if (cr >= t.cr_range[0]) expect(`${id}@${cr}: ${renderTemplate(t, ctx(cr, t.roles[0]), {}) ? 'ok' : 'NULL'}`).toBe(`${id}@${cr}: ok`);
    }
  });
  test('print constants by band: the aura, the mending, the sense range', () => {
    const fa = TEMPLATES.find((x) => x.id === 'fire-aura');
    expect(renderTemplate(fa, ctx(2), {}).text).toMatch(/5-foot Emanation originating from the creature takes 5 \(1d10\) Fire damage/);
    expect(renderTemplate(fa, ctx(19), {}).text).toMatch(/takes 13 \(3d8\) Fire damage/); // the Balor's number
    expect(renderTemplate(TEMPLATES.find((x) => x.id === 'warded-mending'), ctx(5), { ward: 'the high priest' }).text).toMatch(/regains 10 Hit Points at the start of each of its turns if it has at least 1 Hit Point and the high priest is within 30 feet/);
    expect(renderTemplate(TEMPLATES.find((x) => x.id === 'uncanny-sense'), ctx(1), { sense_target: 'ferrous metal' }).text).toMatch(/pinpoint the location of ferrous metal within 30 feet/);
    const na = renderTemplate(TEMPLATES.find((x) => x.id === 'noxious-aura'), ctx(8), { save_stat: 'Constitution', condition_minor: 'Poisoned' }).text;
    expect(na).toMatch(/\*Constitution Saving Throw\*: DC \d+, any creature that starts its turn in a 10-foot Emanation/);
    expect(na).toMatch(/Poisoned condition until the start of its next turn/);
  });
  test('gates: burrow cards need a Burrow speed; one aura per body; sealed minds and mending never double the chassis', () => {
    const ids = (movement) => templatesFor({ archetype: 'brute', cr: 5, sections: {}, section: 'trait', movement }).map((t) => t.id);
    expect(ids('burrow')).toEqual(expect.arrayContaining(['earth-glide', 'tunneler']));
    expect(ids('')).not.toContain('earth-glide'); expect(ids('')).not.toContain('tunneler');
    const heated = { Traits: [{ name: 'Molten Hide', text: 'A creature that touches the creature or hits it with a melee attack while within 5 feet of it takes 5 (1d10) Fire damage.' }] };
    expect(templatesFor({ archetype: 'brute', cr: 5, sections: heated, section: 'trait' }).map((t) => t.id)).not.toContain('fire-aura');
    const aura = { Traits: [{ name: 'Heat Aura', text: "At the end of each of the creature's turns, each creature in a 5-foot Emanation originating from the creature takes 5 (1d10) Fire damage." }] };
    const onAura = templatesFor({ archetype: 'brute', cr: 5, sections: aura, section: 'trait' }).map((t) => t.id);
    expect(onAura).not.toContain('noxious-aura'); expect(onAura).not.toContain('heated-body');
    const golem = { Traits: [{ name: 'Immutable Form', text: 'The creature is immune to any spell or effect that would alter its form.' }] };
    expect(templatesFor({ archetype: 'brute', cr: 9, sections: golem, section: 'trait' }).map((t) => t.id)).not.toContain('sealed-body');
    const regen = { Traits: [{ name: 'Regeneration', text: 'The creature regains 15 Hit Points at the start of each of its turns. If the creature takes Acid or Fire damage, this trait doesn\'t function on the creature\'s next turn.' }] };
    expect(templatesFor({ archetype: 'brute', cr: 7, sections: regen, section: 'trait' }).map((t) => t.id)).toContain('warded-mending'); // offered because it SUPERSEDES the Regeneration row (one body, one mending)
    expect(templatesFor({ archetype: 'brute', cr: 7, sections: {}, section: 'trait' }).map((t) => t.id)).toContain('warded-mending');
  });
  test('the concept binds each card by its own words', () => {
    const top = (archetype, cr, text, movement = '') => rankByVerb(templatesFor({ archetype, cr, sections: {}, section: 'trait', movement }), text)[0].t.id;
    expect(top('brute', 9, 'a clockwork bull that runs amok when its brass is cracked')).toBe('berserk');
    expect(top('lurker', 2, "a bell-ringer's ghost who tolls the hour and cannot leave the tower")).toBe('bound');
    expect(top('brute', 9, 'a rusted gallows that never stops walking toward the nearest living thing')).toBe('relentless-pursuit');
    expect(top('artillery', 7, "a lighthouse keeper whose lantern's glow clings to whoever it lights up")).toBe('marking-light');
    expect(top('brute', 4, 'a rust-eater that can smell iron through a foot of stone', 'burrow')).toBe('uncanny-sense');
    // ground-sense is the header's Tremorsense: a tremor concept never binds the sense card
    expect(templatesFor({ archetype: 'lurker', cr: 4, sections: {}, section: 'trait', text: 'a burrowing mole-hound that hunts by tremor' }).map((t) => t.id)).not.toContain('uncanny-sense');
    // "mend" is not absorption's verb; the ward-gated mending SUPERSEDES chassis Regeneration rather than being excluded by it
    const regen = { Traits: [{ name: 'Regeneration', text: 'The creature regains 10 Hit Points at the start of each of its turns if it has at least 1 Hit Point.' }] };
    const onRegen = rankByVerb(templatesFor({ archetype: 'defender', cr: 7, style: 'warden', sections: regen, section: 'trait' }), 'a shrine-guardian whose cracks mend while litanies are spoken nearby');
    expect(onRegen[0].t.id).toBe('warded-mending');
    expect(onRegen.find((r) => r.t.id === 'absorption')?.concept ?? []).toEqual([]);
    // a ward-shaped reaction needs the warden seat: a plain defender never seats "a creature that it guards"
    expect(templatesFor({ archetype: 'defender', cr: 6, style: null, sections: {}, section: 'reaction' }).map((t) => t.id)).not.toContain('ward-retaliation');
    expect(templatesFor({ archetype: 'defender', cr: 6, style: 'warden', sections: {}, section: 'reaction' }).map((t) => t.id)).toEqual(expect.arrayContaining(['ward-retaliation', 'interpose']));
    expect(top('defender', 7, 'an iron duelist whose shield and blade form a seamless guard')).toBe('guarded-stance');
    expect(top('defender', 7, 'a consecrated shrine-stone sentinel whose cracks mend when litanies are spoken nearby')).toBe('warded-mending');
    expect(top('brute', 11, 'a foundry overseer welded into his furnace-suit; the air around him shimmers with waste heat')).toBe('fire-aura');
    expect(top('brute', 8, 'a hezrou-thing whose stench sickens everything that stands near it')).toBe('noxious-aura');
    // fresh three: the Zombie's and the Green Hag's own traits, bound by the concept's clause
    expect(top('defender', 7, 'a hedge knight sworn to a dead king, whose oath keeps him standing after his body should have quit')).toBe('undead-fortitude');
    expect(top('lurker', 3, 'a magpie-thing that steals voices and mimics them to lure travelers off the road')).toBe('mimicry');
    expect(renderTemplate(TEMPLATES.find((x) => x.id === 'mimicry'), ctx(3, 'lurker'), {}).text).toMatch(/only with a successful DC \d+ Wisdom \(Insight\) check/);
    expect(renderTemplate(TEMPLATES.find((x) => x.id === 'undead-fortitude'), ctx(7, 'defender'), {}).text).toMatch(/DC 5 plus the damage taken/);
    expect(top('lurker', 15, "a drowned cathedral's choir, one body of many mouths, whose hymn stops hearts")).toBe('noxious-aura');
    // the choir's ACTION seat: the Wail is the area Threshold Execute, 1/Day, priced as a nova
    const wailMenu = templatesFor({ archetype: 'lurker', cr: 15, sections: {}, section: 'action' });
    expect(rankByVerb(wailMenu, "a drowned cathedral's choir, one body of many mouths, whose hymn stops hearts")[0].t.id).toBe('wail');
    const w = renderTemplate(TEMPLATES.find((x) => x.id === 'wail'), { ...ctx(15, 'lurker'), energy: 'Necrotic' }, {});
    // EMANATION, not "within N feet" — see the note in library.mjs (2026-10-22).
    // Print attests the sense qualifier AFTER the Emanation (Doppelganger:
    // "...originating from the doppelganger that can see the doppelganger").
    expect(w.text).toMatch(/each creature in a 60-foot Emanation originating from the creature that can hear it/);
    expect(w.text).toMatch(/75 Hit Points or fewer after taking this damage, it drops to 0 Hit Points/);
    expect(w.gate).toBe('1/Day');
    // the kill clause IS the payload: the Wail never climbs the dice ladder
    const s15 = sheet(15, null, 'lurker'); const per15 = Math.round(s15.per_hit);
    const secs = { Actions: [{ name: 'Multiattack', text: 'The creature makes three Mouth attacks.' }, { name: 'Mouth', text: `*Melee Attack Roll:* +11, reach 5 ft. ${per15} (10d8 + 6) Necrotic damage.` }] }; // three attacks: the nova floor a two-target area sits under
    const vc = valueCheck({ name: 'Drowning Hymn (1/Day)', text: w.text }, { scaled: s15, sections: secs, section: 'Actions' });
    expect(vc.steps.join(' ')).not.toMatch(/dice/);
    // a construct concept no longer binds Berserk by its type noun alone
    expect(rankByVerb(templatesFor({ archetype: 'brute', cr: 8, sections: {}, section: 'trait' }), 'a plague-doctor construct of lacquered leather').filter((r) => r.concept.length).map((r) => r.t.id)).not.toContain('berserk');
    expect(top('controller', 9, "a clockwork bishop whose thoughts can't be read and who cannot be talked down")).toMatch(/^(sealed-body|shielded-mind)$/);
  });
});

test("the auxiliary 'will' is not the noun: a hulk that will not be moved has no sealed mind (2026-09-28)", () => {
  const menu = templatesFor({ archetype: 'brute', cr: 12, sections: {}, section: 'trait' });
  expect(rankByVerb(menu, 'a mountain of old iron that will not be moved').filter((r) => r.concept.length).map((r) => r.t.id)).not.toContain('shielded-mind');
  expect(rankByVerb(menu, "a clockwork bishop whose thoughts can't be read").filter((r) => r.concept.length).map((r) => r.t.id)).toContain('shielded-mind');
});

describe('fresh four (2026-09-28): the header rides along, the save follows the condition, novas stop at breath scale', () => {
  const { NOVA_CAP } = require('../templates.mjs');
  test('no call is an island: both prompts carry the whole sheet so far', () => {
    const sheet = '## X\n*Large Fiend*\n\n**AC** 15\n| STR | 18 | +4 | +4 |\n\n### Actions\n**Bite.** x';
    const idea = buildIdeaPrompt({ name: 'X', cr: 8, concept: 'a thing', sheetLines: sheet });
    expect(idea).toMatch(/THE SHEET SO FAR \(X, CR 8\)[^\n]*\n## X\n\*Large Fiend\*/);
    expect(idea).toMatch(/\*\*AC\*\* 15/); expect(idea).toMatch(/\| STR \| 18 \|/);
    const t = TEMPLATES.find((x) => x.id === 'noxious-aura');
    const fit = buildFitPrompt({ name: 'X', idea: { idea: 'it reeks', section: 'trait', trigger: 'save', effect: 'condition' }, menu: [t], cr: 8, sheet });
    expect(fit).toMatch(/MONSTER: X \(CR 8\)\nTHE SHEET SO FAR[^\n]*\n## X/);
    expect(fit).toMatch(/\| STR \| 18 \|/);
  });
  test('a condition aura saves by its condition, whatever the model proposed', () => {
    const t = TEMPLATES.find((x) => x.id === 'noxious-aura');
    const ctx = { scaled: sheet(8, null, 'brute'), archetype: 'brute', cr: 8, energy: 'Poison', mix: 'both', meleeName: 'Slam', imposed: [], name: 'X' };
    expect(renderTemplate(t, ctx, { save_stat: 'Wisdom', condition_minor: 'Poisoned' }).text).toMatch(/^\*Constitution Saving Throw\*/);
    expect(renderTemplate(t, ctx, { save_stat: 'Constitution', condition_minor: 'Frightened' }).text).toMatch(/^\*Wisdom Saving Throw\*/);
    expect(renderTemplate(t, ctx, { condition_minor: 'Deafened' }).text).toMatch(/^\*Constitution Saving Throw\*.*Deafened condition/);
  });
  test("a gated nova's dice never climb past print's breath scale for the CR", () => {
    expect(NOVA_CAP(14)).toBe(71); expect(NOVA_CAP(6)).toBe(33); expect(NOVA_CAP(24)).toBe(111);
    const scaled = sheet(14, null, 'lurker'); const per = Math.round(scaled.per_hit);
    const sections = { Actions: [{ name: 'Multiattack', text: 'The creature makes three Claw attacks.' }, { name: 'Claw', text: `*Melee Attack Roll:* +9, reach 5 ft. ${per} (3d10 + 5) Slashing damage.` }] };
    const vc = valueCheck({ name: 'Saltcrack Field (2/Day)', text: '*Dexterity Saving Throw*: DC 17, one creature within 60 feet. *Failure:* 19 (3d12) Acid damage. *Success:* Half damage only.' }, { scaled, sections, section: 'Actions', cr: 14 });
    const avg = Number((/(\d+) \(\d+d\d+/.exec(vc.text) ?? [0, 0])[1]);
    expect(avg).toBeLessThanOrEqual(71);
  });
  test('the truth aura binds the reliquary knight and never doubles another aura', () => {
    const top = rankByVerb(templatesFor({ archetype: 'defender', cr: 6, sections: {}, section: 'trait' }), "a reliquary knight, a hollow suit built around a saint's fingerbone that will not let a lie be spoken near it")[0].t.id;
    expect(top).toBe('truth-aura');
    const withAura = { Traits: [{ name: 'Stench', text: '*Constitution Saving Throw*: DC 12, any creature that starts its turn in a 5-foot Emanation originating from the creature. *Failure:* x' }] };
    expect(templatesFor({ archetype: 'defender', cr: 6, sections: withAura, section: 'trait' }).map((t) => t.id)).not.toContain('truth-aura');
  });
});

describe('value check after the blind A/B (2026-09-28)', () => {
  test('a delayed payload never gains Success: Half; a control row never gains a gate', () => {
    const scaled = sheet(13, null, 'lurker'); const per = Math.round(scaled.per_hit);
    const sections = { Actions: [{ name: 'Multiattack', text: 'The creature makes three Noose attacks.' }, { name: 'Noose', text: `*Melee Attack Roll:* +9, reach 5 ft. ${per} (3d10 + 5) Necrotic damage.` }] };
    const dread = valueCheck({ name: 'Creeping Dread', text: "*Wisdom Saving Throw:* DC 17, one creature within 60 feet. *Failure:* The target has the Frightened condition until the end of the creature's next turn. If the target was already Frightened by this ability, it also takes 9 (2d8) Psychic damage." }, { scaled, sections, section: 'Actions', cr: 13 });
    expect(dread.text).not.toMatch(/Success:\*? Half/);
    const glare = valueCheck({ name: 'Horrid Display', text: "*Wisdom Saving Throw*: DC 15, each creature of the creature's choice within 30 feet that can see or hear it. *Failure:* The target has the Frightened condition until the end of its next turn." }, { scaled, sections, section: 'Actions', cr: 13 });
    expect(glare.name).toBe('Horrid Display');
    expect(glare.steps.join(' ')).toMatch(/control row|^$/);
  });
});

test('a forced bind fills the terrain from the concept: an ice goat walks on ice or snow, not mud (2026-09-28)', () => {
  const t = TEMPLATES.find((x) => x.id === 'terrain-walk');
  const ctx = (concept) => ({ scaled: sheet(8, null, 'brute'), archetype: 'brute', cr: 8, energy: null, mix: 'physical', meleeName: 'Slam', imposed: [], name: 'X', concept });
  expect(renderTemplate(t, ctx('a mountain goat with antlers of living ice that freezes the handholds'), {}).text).toMatch(/composed of ice or snow/);
  expect(renderTemplate(t, ctx('a bog troll one with the mire'), {}).text).toMatch(/composed of mud/);
  expect(renderTemplate(t, ctx('a thing'), {}).text).toMatch(/composed of mud/); // the blind default when the concept says nothing
});

describe('the critic\'s three refinements (2026-09-28)', () => {
  test('the gaze trait is Frightened-tier by construction: a KO condition falls to the vocabulary default, never to an at-will lock', () => {
    const t = TEMPLATES.find((x) => x.id === 'gaze-aura');
    const ctx = { scaled: sheet(7, null, 'lurker'), archetype: 'lurker', cr: 7, energy: null, mix: 'physical', meleeName: 'Claw', imposed: [], name: 'X' };
    const r = renderTemplate(t, ctx, { save_stat: 'Wisdom', condition_minor: 'Paralyzed' }).text;
    expect(r).not.toMatch(/Paralyzed|Stunned|Petrified|Incapacitated/);
    expect(r).toMatch(/and can see it\. \*Failure:\* The target has the Frightened condition until the start of its next turn/);
    expect(rankByVerb(templatesFor({ archetype: 'lurker', cr: 7, sections: {}, section: 'trait' }), 'a taxidermied bear that hates being looked at')[0].t.id).toBe('gaze-aura');
    const { MECHANIC_OWED_TRAIT } = require('../templates.mjs'); expect(MECHANIC_OWED_TRAIT.gaze).toEqual(['gaze-aura']);
  });
  test('the push form of the charge binds the run-down verbs and is offered to the phantom seat', () => {
    const riders = templatesFor({ archetype: 'lurker', cr: 6, sections: { Actions: [{ name: 'Slam', text: '*Melee Attack Roll:* +7, reach 5 ft. 13 (2d8 + 4) Bludgeoning damage.' }] }, section: 'rider' });
    expect(riders.map((t) => t.id)).toContain('charge-push');
    expect(rankByVerb(riders, "a courier's ghost who runs anyone who blocks it off the cliff")[0].t.id).toBe('charge-push');
    expect(renderTemplate(TEMPLATES.find((x) => x.id === 'charge-push'), { scaled: sheet(6, null, 'lurker'), archetype: 'lurker', cr: 6, energy: null, mix: 'physical', meleeName: 'Slam', imposed: [], name: 'X' }, {}).text).toMatch(/pushed up to 10 feet straight away from the creature and has the Prone condition/);
  });
  test('a solid breath is physical; a fill never doubles the frame\'s verb', () => {
    const spew = TEMPLATES.find((x) => x.id === 'spew');
    const ctx = (concept) => ({ scaled: sheet(8, null, 'brute'), archetype: 'brute', cr: 8, energy: 'Fire', mix: 'both', meleeName: 'Slam', imposed: [], name: 'X', concept });
    expect(renderTemplate(spew, ctx('a furnace that swallows sand and breathes out glass shards'), {}).text).toMatch(/Slashing damage/);
    expect(renderTemplate(spew, ctx('a furnace that breathes fire'), {}).text).toMatch(/Fire damage/);
    const wind = TEMPLATES.find((x) => x.id === 'wind-up');
    const w = renderTemplate(wind, { ...ctx('x'), archetype: 'brute' }, { telegraph: 'gathering itself' });
    expect(w?.text ?? '').not.toMatch(/gathering destructive power, gathering/);
  });
});

test('fresh six: an obscuring breath blinds; a nonmagical weapon lodges in 2024 grammar', () => {
  const spew = TEMPLATES.find((x) => x.id === 'spew');
  const ctx = (concept) => ({ scaled: sheet(14, null, 'brute'), archetype: 'brute', cr: 14, energy: 'Fire', mix: 'both', meleeName: 'Slam', imposed: [], name: 'X', concept });
  expect(renderTemplate(spew, ctx('a wildfire that breathes a cone of ash'), { condition_minor: 'Deafened' }).text).toMatch(/Blinded condition/);
  expect(renderTemplate(spew, ctx('a dragon that breathes fire'), {}).text).toMatch(/Poisoned condition/); // the Poison-breath frame's own rider stands when nothing obscures
  expect(TEMPLATES.find((x) => x.id === 'weapon-lodge').frames['6-9']).toMatch(/^When a creature hits the creature with a nonmagical weapon/);
});

describe('the new lines\' first read (critic, new-lines 2026-09-28)', () => {
  test('a homograph binds in the sense its phrase carries: "roots up the graves" digs, "roots him in place" holds', () => {
    const snare = TEMPLATES.find((t) => t.id === 'snare-bolt');
    expect(rankByVerb([snare], 'a miller who turns into a boar and roots up the graves')[0].matched).not.toContain('root');
    expect(rankByVerb([snare], 'a warden who roots him in place with a word')[0].matched).toContain('root');
  });
  test('guarded-stance hears "turns every blade aside"; resonant-body binds on a material, not on a thunderous idea', () => {
    const gs = TEMPLATES.find((t) => t.id === 'guarded-stance');
    expect(rankByVerb([gs], 'a pirate queen who turns every blade aside with a laugh')[0].matched.length).toBeGreaterThan(0);
    expect(rankByVerb([gs], 'a sergeant who orders a volley and holds the shield line')[0].concept).toEqual(expect.arrayContaining(['keeps the shield line', 'shield line'])); // the fixed phrase's own key
    const rb = TEMPLATES.find((t) => t.id === 'resonant-body');
    expect(rankByVerb([rb], 'a miller who turns into a boar', 'splintered bone shards recoil with a thunderous crack that echoes and deafens')[0].matched).toEqual([]);
    expect(rankByVerb([rb], 'a hermit crab that wears a stolen bronze church bell')[0].matched.length).toBeGreaterThan(0);
  });
  test('a leap is jump-to-a-space: a self-centred ground burst is denied the card', () => {
    const ids = (text) => templatesFor({ archetype: 'skirmisher', cr: 3, sections: {}, section: 'action', text }).map((t) => t.id);
    expect(ids('roots up the ground in a wide circle around it')).not.toContain('leap');
    expect(ids('drops on a straggler from above')).toContain('leap');
  });
  test('the library round (2026-09-29): a self-centred burst, a snap shot that needs a bow, a volley order for the leader', () => {
    const brute = sheet(9, null, 'brute');
    const gb = templatesFor({ archetype: 'brute', cr: 9, sections: brute.sections, section: 'action', text: 'a barrow-wight that erupts in a shockwave of grave earth around it' }).find((t) => t.id === 'ground-burst');
    expect(gb).toBeDefined();
    expect(rankByVerb([gb], 'a barrow-wight that erupts in a shockwave of grave earth around it')[0].concept.length).toBeGreaterThanOrEqual(2);
    const r = renderTemplate(gb, { scaled: brute, sections: brute.sections, archetype: 'brute', cr: 9, energy: null, mix: 'physical', concept: 'a barrow-wight that erupts', conditionMinor: 'Prone' }, { save_stat: 'Dexterity' }, { blind: true });
    expect(r.text).toMatch(/^\*Dexterity Saving Throw\*: DC \d+, each creature in a 15-foot Emanation originating from the creature\. \*Failure:\* \d+ \(\d+d\d+\) Bludgeoning damage\. \*Success:\* Half damage\.$/);
    expect(r.gate).toBe('Recharge 5-6');
    // grave earth bruises whatever the body's energy; a stomp knocks Prone
    const earth = renderTemplate(gb, { scaled: brute, sections: brute.sections, archetype: 'brute', cr: 9, energy: 'Necrotic', mix: null, concept: 'a barrow-wight that erupts in a shockwave of grave earth around it', conditionMinor: 'Prone' }, { save_stat: 'Dexterity' }, { blind: true });
    expect(earth.text).toMatch(/Bludgeoning damage\. \*Success:\* Half damage\.$/);
    const stomp = renderTemplate(gb, { scaled: brute, sections: brute.sections, archetype: 'brute', cr: 9, energy: null, mix: 'physical', concept: 'a temple gong given legs that stomps and sends a tremor', conditionMinor: 'Prone' }, { save_stat: 'Dexterity' }, { blind: true });
    expect(stomp.text).toMatch(/Bludgeoning damage, and the target has the Prone condition\. \*Success:\* Half damage only\.$/);
    // the snap shot needs a pure ranged row on the sheet and names it
    const archer = sheet(8, 'archer', 'skirmisher'); const bowName = Object.values(archer.sections).flat().find((e) => /Ranged Attack Roll/.test(e.text) && !/Melee or Ranged/.test(e.text)).name;
    expect(templatesFor({ archetype: 'skirmisher', style: 'archer', cr: 8, sections: archer.sections, section: 'reaction' }).map((t) => t.id)).toContain('snap-shot');
    expect(templatesFor({ archetype: 'brute', cr: 8, sections: brute.sections, section: 'reaction' }).map((t) => t.id)).not.toContain('snap-shot');
    const ss = TEMPLATES.find((t) => t.id === 'snap-shot');
    const sr = renderTemplate(ss, { scaled: archer, sections: archer.sections, archetype: 'skirmisher', cr: 8, energy: null, rangedName: bowName, concept: 'a sniper who snaps off a shot as they close' }, {}, { blind: true });
    expect(sr.text).toBe(`*Trigger:* A creature the creature can see moves to within 5 feet of it. *Response:* The creature makes one ${bowName} attack against that creature.`); // it fires when someone ENGAGES, not every round at 30 feet
    // the volley order outranks the rally on "orders a volley"
    const leader = sheet(5, 'leader', 'defender');
    const vtext = 'a dwarven crossbow sergeant who orders a volley and holds the shield line';
    const bonus = templatesFor({ archetype: 'defender', style: 'leader', cr: 5, sections: leader.sections, section: 'bonus_action', text: vtext }).map((t) => t.id);
    expect(bonus).toContain('volley-order'); expect(bonus).not.toContain('rally'); // a volley is not a rally
    expect(templatesFor({ archetype: 'defender', style: null, cr: 5, sections: sheet(5, null, 'defender').sections, section: 'bonus_action' }).map((t) => t.id)).not.toContain('volley-order'); // leader-gated
    const vo = TEMPLATES.find((t) => t.id === 'volley-order');
    expect(renderTemplate(vo, { scaled: leader, sections: leader.sections, archetype: 'defender', style: 'leader', cr: 5, energy: null, concept: vtext }, {}, { blind: true })).toMatchObject({ gate: '2/Day', text: 'Each ally within 30 feet of the creature that can see or hear it can take a Reaction to make one ranged attack roll.' });
  });
  test('fixed phrases carry one sense, read before any table (critic, library round 2026-09-29)', () => {
    const { readPhrases } = require('../lexicon.mjs');
    expect(readPhrases('a goblin warchief who screams fire at will to her archers')).toBe('a goblin warchief who screams looses at will to her archers');
    expect(readPhrases('a sergeant who holds the shield line and held the gate')).toBe('a sergeant who keeps the shield line and kept the gate');
    expect(readPhrases('a miller who roots up the graves')).toBe('a miller who digs up the graves');
    expect(readPhrases('a ferryman who takes a toll from the dead')).toBe('a ferryman who takes a fee from the dead');
    expect(readPhrases('a troll that guards the bridge and collects a toll')).toBe('a troll that guards the bridge and collects a fee'); // the troll's toll is a fee, not a bell
    expect(readPhrases('a fisher who spears the eels')).toBe('a fisher who impales the eels');
    expect(readPhrases('eyestalks that each fire a different ray')).toBe('eyestalks that each loose a different ray'); // no flame in a fired ray (the orb's Heated Body)
    expect(readPhrases('she fires a bolt of light')).toBe('she looses a bolt of light');
    expect(readPhrases('a bell that tolls the hour and holds its prey')).toBe('a bell that tolls the hour and holds its prey'); // the bell and the grapple keep their words
    const { deniedBy } = require('../templates.mjs');
    const rally = TEMPLATES.find((t) => t.id === 'rally'); const vo = TEMPLATES.find((t) => t.id === 'volley-order');
    expect(deniedBy(rally, 'screams fire at will to her archers').length).toBeGreaterThan(0);
    expect(rankByVerb([vo], 'screams fire at will to her archers')[0].concept.length).toBeGreaterThanOrEqual(2);
    const rb = TEMPLATES.find((t) => t.id === 'resonant-body');
    expect(rankByVerb([rb], 'a ferryman who takes a toll from the dead')[0].matched).toEqual([]);
  });
  test('overshoot scales DOWN to the ceiling before the ladder gates (the gong\'s 13d6 Prone follow-up)', () => {
    const scaled = sheet(9, null, 'brute');
    const row = { name: 'Toppling Tremor', text: '*Dexterity Saving Throw*: DC 15, one creature within 30 feet. *Failure:* 77 (22d6) Bludgeoning damage, and the target has the Prone condition.' };
    const vc = valueCheck(row, { scaled, sections: scaled.sections, cr: 9, section: 'Actions' });
    expect(vc.steps.join('; ')).toMatch(/dice 77 → \d+ \(scaled down to the ceiling\)/);
    expect(vc.name).not.toMatch(/Recharge/);
    expect(Number(/(\d+) \(/.exec(vc.text)[1])).toBeLessThan(77);
  });
  test('the head noun stops at "given": a temple gong given legs is a gong', () => {
    const { headNoun } = require('../lexicon.mjs');
    expect(headNoun('a temple gong given legs that stomps and sends a tremor in all directions')).toBe('gong');
    expect(headNoun('a cliff troll that shears slabs')).toBe('troll');
    expect(headNoun('a hollow suit of tourney armor that hurls its own lance')).toBe('armor');
  });
  test('a blind creature never draws a gaze (the half-blind dragon\'s Dread Gaze)', () => {
    const ids = templatesFor({ archetype: 'brute', cr: 15, sections: {}, section: 'action', text: 'the last dragon of the northern range, old and half-blind' }).map((t) => t.id);
    expect(ids).not.toContain('gaze-single');
  });
  test('the prompt names its own CR: a party level or an explicit cr reads before the dice roll', () => {
    const { crFromPrompt } = require('../lexicon.mjs');
    expect(crFromPrompt('something nasty for a level 3 party, forest, ambush')).toBe('3');
    expect(crFromPrompt('big ogre with a club, cr 5')).toBe('5');
    expect(crFromPrompt('a wisp for a 1st-level party')).toBe('1');
    expect(crFromPrompt('a swarm of rats, CR 1/4')).toBe('1/4');
    expect(crFromPrompt('a wolf')).toBeNull();
  });
  test('the PI follow-up cards: Eye Rays renders a closed per-band ray table; Blurred Form is the displaced image', () => {
    const rr = TEMPLATES.find((t) => t.id === 'random-ray'); const bf = TEMPLATES.find((t) => t.id === 'blurred-form');
    const b3 = renderTemplate(rr, { scaled: sheet(4, null, 'brute'), sections: {}, archetype: 'brute', cr: 4, energy: null, concept: 'a floating orb with eyestalks' }, {}, { blind: true });
    expect(b3.text).toMatch(/^The creature fires three rays .* rolling a d4 for each ray/); expect(b3.text).toMatch(/4 — Dread Ray/); expect(b3.text).not.toMatch(/5 — /); expect(b3.gate).toBe('Recharge 5-6');
    const b13 = renderTemplate(rr, { scaled: sheet(13, null, 'brute'), sections: {}, archetype: 'brute', cr: 13, energy: null, concept: 'a floating orb with eyestalks' }, {}, { blind: true });
    expect(b13.text).toMatch(/rolling a d6 for each ray/); expect(b13.text).toMatch(/6 — Withering Ray: \*Constitution Saving Throw\*: DC \d+\. \*Failure:\* \d+ \(\d+d\d+\) Necrotic damage\./); expect(b13.text).not.toMatch(/\{[a-z_]+\}/);
    // the table is COMPOSED from library cards, not authored: it shares at most two names with the Monster Manual's ten
    const MM_RAYS = ['Charm Ray', 'Paralyzing Ray', 'Fear Ray', 'Slowing Ray', 'Enervation Ray', 'Telekinetic Ray', 'Sleep Ray', 'Petrification Ray', 'Disintegration Ray', 'Death Ray'];
    const names = [...b13.text.matchAll(/\d — ([A-Z][a-z]+ Ray):/g)].map((m) => m[1]);
    expect(names.length).toBe(6); expect(names.filter((n) => MM_RAYS.includes(n)).length).toBeLessThanOrEqual(2);
    expect(b13.text).toMatch(/Binding Ray: \*Dexterity Saving Throw\*: DC \d+\. \*Failure:\* The target has the Restrained condition/); // snare-bolt's own clause
    expect((b13.text.match(/\d+ \(\d+d\d+\)/g) ?? []).length).toBe(2); // two of six rays deal damage (Shoving, Withering) — print's Beholder has three of ten; the rest are bare conditions
    expect(TEMPLATES.find((t) => t.id === 'adhesive').keys).not.toContain('vault');
    expect(templatesFor({ archetype: 'skirmisher', style: 'hurler', cr: 5, sections: sheet(5, 'hurler', 'skirmisher').sections, section: 'action', text: 'fights with net and spear' }).map((t) => t.id)).not.toContain('throw-retrieve'); // a net is never a returning throw
    expect(rankByVerb([rr], 'a floating orb with one great central eye and a crown of eyestalks that each fire a different ray')[0].concept.length).toBeGreaterThanOrEqual(2);
    const f = renderTemplate(bf, { scaled: sheet(3, null, 'skirmisher'), sections: {}, archetype: 'skirmisher', cr: 3, energy: null, concept: 'a six-legged panther whose image appears a few feet from where it stands' }, {}, { blind: true });
    expect(f.text).toBe('Attack rolls against the creature have Disadvantage. If the creature is hit by an attack roll, this trait is disabled until the end of its next turn.');
    expect(rankByVerb([bf], 'a six-legged panther with two tentacles whose image appears a few feet from where it stands')[0].concept.length).toBeGreaterThanOrEqual(2);
  });
  test('a leader\'s command words are the rally\'s keys', () => {
    const rally = TEMPLATES.find((t) => t.id === 'rally');
    expect(rankByVerb([rally], 'a warlord who bellows her troops into a frenzy')[0].concept.length).toBeGreaterThanOrEqual(2);
  });
  test('a body trait is a BODY\'s: contact damage and auras are off a Humanoid\'s trait shelf', () => {
    const ids = (type) => templatesFor({ archetype: 'defender', cr: 8, sections: {}, section: 'trait', type }).map((t) => t.id);
    expect(ids('Humanoid')).not.toContain('heated-body');
    expect(ids('Humanoid')).not.toContain('noxious-aura');
    expect(ids('Undead')).toContain('heated-body');
    expect(ids('')).toContain('heated-body'); // no type known: no exclusion
  });
  test('a recurring tick is priced by two turns and capped at half a hit — never climbed to the round', () => {
    const scaled = sheet(8, null, 'skirmisher');
    const row = { name: 'Venom Numb Shot', text: '*Constitution Saving Throw:* DC 15, one creature within 60 feet. *Failure:* The target is branded: it takes 21 (6d6) Poison damage at the start of each of its turns until it uses its action to claw the poison from its flesh.' };
    const vc = valueCheck(row, { scaled, sections: scaled.sections, cr: 8, section: 'Actions' });
    expect(vc.steps.join('; ')).toMatch(/recurring tick 21 → \d+ \(half a hit, priced by two turns\)/);
    expect(vc.steps.join('; ')).not.toMatch(/dice \d+ → \d+/);
    const tick = Number(/takes (\d+) \(/.exec(vc.text)[1]);
    expect(tick).toBeLessThanOrEqual(11);
    expect(vc.text).toMatch(/flesh\.$/);
  });
});

describe('form-ten template reads (2026-10-01)', () => {
  test('"carries plague" is the contagion rider\'s verb — a disease, not a wound (the swarm shipped unbound, then bound to the bleed card)', () => {
    const ranked = rankByVerb(templatesFor({ archetype: 'brute', cr: 6, sections: {}, section: 'rider' }), 'a swarm of rats that carries plague');
    expect(ranked[0].t.id).toBe('contagion');
    expect(rankByVerb(templatesFor({ archetype: 'brute', cr: 1, sections: {}, section: 'rider' }), 'a swarm of rats that carries plague')[0].t.id).toBe('contagion'); // at the rat swarm's own CR too
  });
});

describe('attack-roll frames price like attack rows (goldens 2026-10-03: the hollow lancer\'s 18 (4d8) lance)', () => {
  test('throw-retrieve carries the striker\'s mod inside the dice; a save frame stays dice-only', () => {
    const scaled = sheet(7, 'hurler', 'skirmisher'); const mod = Math.floor((scaled.stats[scaled.striker_stat ?? 'STR'] - 10) / 2);
    const ctx = { scaled, archetype: 'skirmisher', cr: 7, energy: null, mix: 'physical', meleeName: 'Lance', imposed: [], name: 'lancer', mechanics: [], concept: 'a lancer who hurls its lance' };
    const thrown = renderTemplate(TEMPLATES.find((x) => x.id === 'throw-retrieve'), ctx, { projectile: 'its lance' });
    expect(mod).toBeGreaterThan(0);
    const dm = /(\d+) \((\d+)d(\d+) \+ (\d+)\) \w+ damage/.exec(thrown.text); expect(dm).not.toBeNull();
    expect(Number(dm[4])).toBe(mod); expect(Number(dm[1])).toBe(Math.floor(Number(dm[2]) * (Number(dm[3]) + 1) / 2) + mod);
    const spew = renderTemplate(TEMPLATES.find((x) => x.id === 'spew'), { ...ctx, energy: 'Poison', mix: 'energy' }, {});
    expect(spew.text).toMatch(/\d+ \(\d+d\d+\) \w+ damage/);
  });
});
