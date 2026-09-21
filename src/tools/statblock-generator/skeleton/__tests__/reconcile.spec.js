/**
 * Unit tests for reconcileConcept — the concept-output repair layer as one
 * pure function (audit finding #4). Integration coverage lives in the
 * accretion suite; these exercise the function directly, which the
 * scattered version never allowed.
 */
import { reconcileConcept } from '../reconcile.mjs';

const base = {
  crNum: 20, archetypeName: 'brute', archetypeSource: 'user',
  resolvedType: 'Monstrosity', typeSource: 'auto', themes: ['bestial'],
};

describe('reconcileConcept is pure and total', () => {
  test('same input, same output — including the traces', () => {
    const a = reconcileConcept({ ...base, concept: 'a shrieking, screaming thing', damageMix: 'physical', energy: 'Fire' });
    const b = reconcileConcept({ ...base, concept: 'a shrieking, screaming thing', damageMix: 'physical', energy: 'Fire' });
    expect(a).toEqual(b);
  });

  test('empty options still resolve every axis', () => {
    const r = reconcileConcept({ crNum: 9 });
    expect(r.finalType).toBe('Monstrosity');
    expect(r.blockMind).toBe('sapient');
    expect(r.blockThemes === null || Array.isArray(r.blockThemes)).toBe(true);
  });
});

describe('the mind check: the prose\'s own INT claim outranks the flag (the Vanteg)', () => {
  const mind = (over) => {
    const r = reconcileConcept({ ...base, ...over });
    return { mind: r.blockMind, traced: r.traces.some(([l]) => l === 'mind reconciled:') };
  };

  test('the Vanteg: "fully sapient (INT 10-14)" flagged mindless ships sapient', () => {
    expect(mind({ mind: 'mindless', concept: 'a cosmic child seeking games. It is fully sapient (INT 10-14).' }))
      .toEqual({ mind: 'sapient', traced: true });
  });

  test('"scheming (INT 14-16)" flagged bestial ships sapient', () => {
    expect(mind({ mind: 'bestial', concept: 'It is scheming (INT 14-16), a courteous warden.' }))
      .toEqual({ mind: 'sapient', traced: true });
  });

  test('mid-band cunning: INT 5-7 lifts mindless to bestial, no further', () => {
    expect(mind({ mind: 'mindless', concept: 'a crude hunter (INT 5-7).' }))
      .toEqual({ mind: 'bestial', traced: true });
  });

  test('"instinct-driven (INT 2-4)" flagged sapient drops to bestial — never to mindless', () => {
    expect(mind({ mind: 'sapient', concept: 'It is instinct-driven (INT 2-4), all appetite.' }))
      .toEqual({ mind: 'bestial', traced: true });
  });

  test('no INT claim: the flag stands untouched', () => {
    expect(mind({ mind: 'mindless', concept: 'a drifting hunger with the curiosity of a child.' }))
      .toEqual({ mind: 'mindless', traced: false });
  });

  test('an explicit caster is sapient regardless of any claim', () => {
    expect(mind({ mind: 'mindless', caster: true, concept: 'a mute engine (INT 2-4).' }))
      .toEqual({ mind: 'sapient', traced: false });
  });
});

describe('the gathered layers still hold at the unit level', () => {
  test('funnel: an artillery Ooze resolves per whoever chose it', () => {
    const userRole = reconcileConcept({ crNum: 9, archetypeName: 'artillery', archetypeSource: 'user', resolvedType: 'Ooze', typeSource: 'auto' });
    expect(userRole.finalType).toBe('Monstrosity');
    const userType = reconcileConcept({ crNum: 9, archetypeName: 'artillery', archetypeSource: 'auto', resolvedType: 'Ooze', typeSource: 'user' });
    expect(userType.blockArchetype).toBeNull();
  });

  test('energy: a declared energy beats a physical roll', () => {
    const r = reconcileConcept({ ...base, damageMix: 'physical', energy: 'Fire',
      concept: 'It shrieks as it circles, screaming over the wrack.' });
    expect(r.blockMix).toBe('both');
    expect(r.blockEnergy).toBe('Thunder');
  });

  test('the type-energy contract: no radiant fiends', () => {
    const r = reconcileConcept({ crNum: 20, resolvedType: 'Fiend', damageMix: 'both', energy: 'Radiant' });
    expect(r.blockEnergy).toBe('Necrotic');
  });

  test('signature: a vetoed grapple on a skirmisher translates to web', () => {
    const r = reconcileConcept({ crNum: 20, archetypeName: 'skirmisher', archetypeSource: 'user', signatureMechanic: 'grapple' });
    expect(r.blockSignature).toBe('web');
  });
});

describe('an Ooze deals Acid (the Skorvith): 4/4 printed, no exceptions', () => {
  test('a rolled Fire on an Ooze reconciles to Acid, traced', () => {
    const r = reconcileConcept({ crNum: 8, resolvedType: 'Ooze', typeSource: 'auto', damageMix: 'both', energy: 'Fire' });
    expect(r.blockEnergy).toBe('Acid');
    expect(r.traces.some(([l, d]) => l === 'damage reconciled:' && /Acid/.test(d))).toBe(true);
  });

  test('the contract outranks even a prose declaration — print has no fire oozes', () => {
    const r = reconcileConcept({ crNum: 8, resolvedType: 'Ooze', typeSource: 'auto', damageMix: 'both', energy: 'Cold',
      concept: 'a burning mass, searing flame in its folds, fire dripping from it' });
    expect(r.blockEnergy).toBe('Acid');
  });

  test('an Acid Ooze passes untouched', () => {
    const r = reconcileConcept({ crNum: 8, resolvedType: 'Ooze', typeSource: 'auto', damageMix: 'both', energy: 'Acid' });
    expect(r.blockEnergy).toBe('Acid');
  });
});

describe('a Dragon has a mind (the Ssvorrach): 45/45 printed Dragons are at least bestial', () => {
  const dragon = (mind) => {
    const r = reconcileConcept({ crNum: 8, resolvedType: 'Dragon', typeSource: 'auto', mind });
    return { type: r.finalType, mind: r.blockMind, traced: r.traces.some(([l]) => l === 'mind reconciled:') };
  };

  test('a mindless Dragon lifts to bestial — the Wyvern floor — and keeps its type', () => {
    expect(dragon('mindless')).toEqual({ type: 'Dragon', mind: 'bestial', traced: true });
  });

  test('bestial and sapient Dragons stand untouched', () => {
    expect(dragon('bestial')).toEqual({ type: 'Dragon', mind: 'bestial', traced: false });
    expect(dragon('sapient')).toEqual({ type: 'Dragon', mind: 'sapient', traced: false });
  });
});

describe('a Humanoid is a person (the Pelted Lull): 26/26 printed Humanoids are sapient speakers', () => {
  const human = (over) => {
    const r = reconcileConcept({ crNum: 8, resolvedType: 'Humanoid', typeSource: 'auto', ...over });
    return { type: r.finalType, mind: r.blockMind, traced: r.traces.some(([l]) => l === 'type reconciled:') };
  };

  test('the Pelted Lull: a mindless Humanoid ships Monstrosity, traced', () => {
    expect(human({ mind: 'mindless' }))
      .toEqual({ type: 'Monstrosity', mind: 'mindless', traced: true });
  });

  test('a bestial Humanoid retypes too — the rule is sapience, not just mindlessness', () => {
    expect(human({ mind: 'bestial' })).toEqual({ type: 'Monstrosity', mind: 'bestial', traced: true });
  });

  test('a sapient Humanoid stands untouched', () => {
    expect(human({ mind: 'sapient' })).toEqual({ type: 'Humanoid', mind: 'sapient', traced: false });
  });

  test('the user\'s explicit Humanoid is the fixed point, mindless or not', () => {
    expect(human({ mind: 'mindless', typeSource: 'user' }))
      .toEqual({ type: 'Humanoid', mind: 'mindless', traced: false });
  });

  test('a prose INT claim rescues the type by proving sapience first', () => {
    expect(human({ mind: 'mindless', concept: 'a cunning border-warden, fully sapient (INT 12).' }))
      .toEqual({ type: 'Humanoid', mind: 'sapient', traced: false });
  });
});
