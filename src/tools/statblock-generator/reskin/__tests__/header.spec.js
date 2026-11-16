import { honestSpeed, honestLanguages, honestAttackNames, honestFireDefenses, materialVulnerability } from '../header.mjs';

describe('header honesty', () => {
  test('speed: donor modes the concept lacks are dropped; modes it names are added; a phantom or winged line keeps its flight', () => {
    expect(honestSpeed('10 ft., Fly 40 ft.', { movement: [], style: 'trap' })).toMatchObject({ speed: '10 ft.', dropped: ['Fly 40 ft.'] });
    expect(honestSpeed('30 ft.', { movement: ['climb'] })).toMatchObject({ speed: '30 ft., Climb 30 ft.', added: ['Climb 30 ft.'] });
    expect(honestSpeed('5 ft., Fly 60 ft. (hover)', { movement: ['climb', 'swim'], style: 'phantom' }).speed).toBe('5 ft., Fly 60 ft. (hover), Swim 30 ft., Climb 30 ft.'); // an added mode never inherits a crawl
    expect(honestSpeed('5 ft., Fly 60 ft. (hover), Swim 5 ft.', { movement: [], style: 'phantom' })).toMatchObject({ speed: '5 ft., Fly 60 ft. (hover)', dropped: ['Swim 5 ft.'] });
    expect(honestSpeed('5 ft., Fly 60 ft. (hover), Swim 5 ft.', { movement: ['swim'], style: 'phantom' }).speed).toBe('5 ft., Fly 60 ft. (hover), Swim 30 ft.'); // a kept crawl lifts too
    expect(honestSpeed('40 ft., Fly 80 ft.', { movement: [], bodyType: 'dragon' }).dropped).toEqual([]);
  });
  test('languages: mind decides the register; sapient lines keep print tokens only', () => {
    expect(honestLanguages('Common', { mind: 'mindless', type: 'Construct' })).toMatch(/Understands the languages of its creator/);
    expect(honestLanguages('Common, Celestial', { mind: 'bestial', type: 'Beast' })).toBe('None');
    expect(honestLanguages('Common, one ancient funerary tongue, Telepathy 60 ft', { mind: 'sapient', type: 'Undead' })).toBe('Common, telepathy 60 ft.');
    expect(honestLanguages('None', { mind: 'sapient', type: 'Undead' })).toBe('Common plus the languages it knew in life');
    expect(honestLanguages('Common plus the languages it knew in life', { mind: 'sapient', type: 'Undead' })).toBe('Common plus the languages it knew in life');
  });
  test('attack names obey anatomy: a Claw never names a ranged row, a Bite deals Piercing, a rock never names a melee row', () => {
    const sections = { Actions: [
      { name: 'Claw', text: '*Ranged Attack Roll:* +7, range 80/320 ft. 12 (2d6 + 5) Slashing damage.' },
      { name: 'Bite', text: '*Melee Attack Roll:* +7, reach 5 ft. 13 (2d8 + 4) Slashing damage.' },
      { name: 'Boulder', text: '*Melee Attack Roll:* +7, reach 5 ft. 13 (2d8 + 4) Bludgeoning damage.' },
    ] };
    const c = honestAttackNames(sections, { projectile: 'a knucklebone' });
    expect(sections.Actions[0].name).toBe('Knucklebone');
    expect(sections.Actions[1].text).toMatch(/Piercing damage/);
    expect(sections.Actions[2].name).toBe('Slam');
    expect(c.length).toBe(3);
  });
  test('a wax body is vulnerable to Fire and never resists it', () => {
    const m = { resistances: 'Fire, Cold', vulnerabilities: '' };
    expect(honestFireDefenses(m, { material: 'wax' })).toMatch(/vulnerable to Fire/);
    expect(m).toMatchObject({ resistances: 'Cold', vulnerabilities: 'Fire' });
    expect(honestFireDefenses({ resistances: 'Fire' }, { material: 'iron' })).toBeNull();
    // the GM's own words stand in when the CALL's answer carries no vulnerability
    // ('iron' has no entry): a glass ox is never immune to Thunder
    expect(materialVulnerability('a glass ox forged for a parade, hollow and humming', 'iron')).toEqual({ material: 'glass', vulnerability: 'Thunder', from: 'concept' });
    // ...but the table never votes against an answer it DOES know (owner, 2026-10-25).
    // A wax body stays Fire-vulnerable however much glass the concept mentions —
    // the old reader searched both as one string and `glass` is declared first.
    expect(materialVulnerability('a wax saint in a hall of glass mirrors', 'wax')).toEqual({ material: 'wax', vulnerability: 'Fire', from: 'call' });
    const ox = { immunities: 'Thunder; Charmed', resistances: '', vulnerabilities: '', sections: { Traits: [{ name: 'Absorb', text: 'Whenever the creature is subjected to Thunder damage, it takes no damage and instead regains Hit Points.' }] } };
    expect(honestFireDefenses(ox, { material: 'iron', concept: 'a glass ox that charges' })).toMatch(/vulnerable to Thunder/);
    expect(ox.vulnerabilities).toBe('Thunder'); expect(ox.sections.Traits.length).toBe(0);
  });
});

test('a Beast never speaks, whatever the resolve read into its mind (0/89 in print; Common on a bird, 2026-09-28)', () => {
  expect(honestLanguages('Common', { mind: 'sapient', type: 'Beast' })).toBe('None');
  expect(honestLanguages('Common', { mind: 'sapient', type: 'Humanoid' })).toBe('Common');
});

test('an Elemental speaks Primordial (17/17 in print; Common on a wildfire, fresh six)', () => {
  expect(honestLanguages('Common', { mind: 'sapient', type: 'Elemental' })).toBe('Primordial');
});

describe('the new lines\' first read (critic, new-lines 2026-09-28)', () => {
  test('every print Humanoid speaks: a bestial read on a Humanoid shifter never prints None', () => {
    expect(honestLanguages('None', { mind: 'bestial', type: 'Humanoid' })).toBe('Common');
    expect(honestLanguages('', { mind: 'sapient', type: 'Humanoid' })).toBe('Common');
    expect(honestLanguages('Common, Orc', { mind: 'bestial', type: 'Humanoid' })).toBe('Common, Orc');
    expect(honestLanguages('None', { mind: 'bestial', type: 'Beast' })).toBe('None');
    expect(honestLanguages('Elvish, Sylvan', { mind: 'sapient', type: 'Humanoid' })).toBe('Common, Elvish, Sylvan'); // a print Humanoid speaks Common
  });
});
