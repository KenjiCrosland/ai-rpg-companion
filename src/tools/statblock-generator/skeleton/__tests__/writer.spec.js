/**
 * The writer call (expressiveness package, component 3): one small call,
 * one optional entry, mechanical verification, silent drop on any failure.
 */
import { buildSkeleton } from '../build-skeleton.mjs';
import { generateFromSkeleton } from '../generate.mjs';
import { buildWriterPrompt, validateWriterResponse, verifyWrittenEntry, writerEnvelopes } from '../writer.mjs';

const routed = (writerAnswer) => async (prompt) => {
  if (/Every number is already fixed/.test(prompt)) return null; // flavor: never-fail
  if (/finishing a D&D 2024 monster/.test(prompt)) return JSON.stringify(writerAnswer);
  return JSON.stringify({ findings: [] }); // audit
};
jest.setTimeout(60000);

describe('verification: the entry must live inside its envelope', () => {
  const sk = buildSkeleton({ cr: 12, seed: 4, themes: ['grasping'] });
  const env = writerEnvelopes(sk);
  const monster = {
    name: 'Test Warden',
    sections: { Actions: [{ name: 'Lash', text: `*Melee Attack Roll:* +10, reach 5 ft. 20 (3d8 + 7) Slashing damage plus 7 (2d6) Fire damage.` }] },
  };
  const attempt = (over) => verifyWrittenEntry({
    name: 'Heat Mirage', shape: 'a',
    text: `*Dexterity Saving Throw*: DC ${env.save.dc}, one creature the test warden can see within 60 feet. *Failure:* ${env.save.damage} (${env.save.dice}) Fire damage.`,
    ...over,
  }, monster, sk, {});

  test('a faithful shape-a entry passes', () => expect(attempt({})).toBeNull());
  test('a wrong DC fails', () => expect(attempt({ text: `*Dexterity Saving Throw*: DC 99, one creature within 60 feet. *Failure:* ${env.save.damage} (${env.save.dice}) Fire damage.` })).toMatch(/DC/));
  test('invented dice fail', () => expect(attempt({ text: `*Dexterity Saving Throw*: DC ${env.save.dc}, one creature within 60 feet. *Failure:* 55 (10d10) Fire damage.` })).toMatch(/dice/));
  test('an off-palette damage type fails', () => expect(attempt({ text: `*Dexterity Saving Throw*: DC ${env.save.dc}, one creature within 60 feet. *Failure:* ${env.save.damage} (${env.save.dice}) Radiant damage.` })).toMatch(/palette/));
  test('an invented gate fails', () => expect(attempt({ name: 'Heat Mirage (Recharge 5-6)' })).toMatch(/gate/));
  test('a role-fighting entry fails', () => {
    const grapplish = { name: 'Clutch', shape: 'b', text: `*Strength Saving Throw*: DC ${env.save.dc}, one creature within 60 feet. *Failure:* The target has the Grappled condition (escape DC 14).` };
    const reason = verifyWrittenEntry(grapplish, monster, sk, { roleExclusion: (a) => /Grappled condition \(escape/.test(a.template_2024) });
    expect(reason).toBeTruthy();
  });
  test('shape c may carry no machinery at all', () => {
    expect(verifyWrittenEntry({ name: 'Heat Shimmer', shape: 'c', text: 'The test warden leaves a heat-hazed afterimage where it stood whenever it moves 10 feet or more.' }, monster, sk, {})).toBeNull();
    expect(verifyWrittenEntry({ name: 'Bad', shape: 'c', text: `A blast: *Dexterity Saving Throw*: DC ${env.save.dc}.` }, monster, sk, {})).toMatch(/utility/);
  });
});

describe('end to end through the pipeline', () => {
  test('a faithful slot ships; the block is otherwise untouched', async () => {
    const sk = buildSkeleton({ cr: 12, seed: 4, themes: ['grasping'] });
    const env = writerEnvelopes(sk);
    const m = await generateFromSkeleton({
      concept: 'a trickster that leaves mirages', cr: 12, seed: 4, themes: ['grasping'],
      resolvedType: 'Monstrosity', archetypeName: 'controller', archetypeSource: 'user',
    }, routed({
      rows: [],
      slot: { use: true, section: 'Bonus Actions', shape: 'c', name: 'Heat Mirage',
        text: 'The creature leaves a shimmering afterimage in its space; the first attack roll against the creature before the start of its next turn has Disadvantage.' },
    }));
    const entry = Object.values(m.sections).flat().find((e) => e.name === 'Heat Mirage');
    expect(entry).toBeTruthy();
    expect(entry.text).toMatch(/the unnamed creature leaves|The unnamed creature leaves|afterimage/);
  });

  test('a cheating slot is dropped and the block ships clean', async () => {
    const m = await generateFromSkeleton({
      concept: 'a trickster', cr: 12, seed: 4, themes: ['grasping'],
      resolvedType: 'Monstrosity', archetypeName: 'controller', archetypeSource: 'user',
    }, routed({
      rows: [],
      slot: { use: true, section: 'Actions', shape: 'a', name: 'Doom Blast',
        text: '*Dexterity Saving Throw*: DC 25, each creature in a 90-foot Cone. *Failure:* 200 (40d10) Force damage.' },
    }));
    expect(Object.values(m.sections).flat().some((e) => e.name === 'Doom Blast')).toBe(false);
    expect(m.name).toBeTruthy(); // never-fail: the block itself shipped
  });

  test('declining the slot is honored, and below CR 5 the call never fires', async () => {
    const calls = [];
    await generateFromSkeleton({ concept: 'a small thing', cr: 4, seed: 4, themes: ['bestial'] },
      async (p) => { calls.push(p); return /fixed/.test(p) ? null : JSON.stringify({ findings: [] }); });
    expect(calls.some((p) => /finishing a D&D 2024 monster/.test(p))).toBe(false);
  });
});

describe('component 4: the writer as author', () => {
  const { specOf, verifyAuthoredRow, pickVoiceRows } = require('../writer.mjs');
  const NOOSE = "*Dexterity Saving Throw*: DC 23, one creature the keeper can see within 120 feet. *Failure:* The target has the Restrained condition until the lattice is destroyed (AC 20; HP 30; Vulnerability to Fire damage).";

  test('specOf extracts the mechanical facts, never the sentence', () => {
    const facts = specOf(NOOSE).join(' | ');
    expect(facts).toMatch(/Dexterity Saving Throw, DC 23/);
    expect(facts).toMatch(/Restrained condition until the lattice is destroyed/);
    expect(facts).toMatch(/AC 20/);
    expect(facts).toMatch(/HP 30/);
    // the targeting formula is a fact and stays; the *Failure:* framing is
    // the sentence and must not
    expect(facts).not.toMatch(/\*Failure:\*/);
  });

  test('a faithful rewrite passes; every cheat is named', () => {
    const faithful = "*Dexterity Saving Throw*: DC 23, one creature the keeper can see within 120 feet. *Failure:* Brine hardens to salt around the target: it has the Restrained condition until the lattice is destroyed (AC 20; HP 30; Vulnerability to Fire damage).";
    expect(verifyAuthoredRow(NOOSE, faithful)).toBeNull();
    expect(verifyAuthoredRow(NOOSE, faithful.replace('DC 23', 'DC 25'))).toBe('numbers differ');
    expect(verifyAuthoredRow(NOOSE, faithful.replace('Restrained', 'Paralyzed'))).toBe('conditions differ');
    expect(verifyAuthoredRow(NOOSE, faithful.replace('Fire damage', 'Radiant damage'))).toBe('damage types differ');
    expect(verifyAuthoredRow(NOOSE, faithful.replace('Dexterity', 'Charisma'))).toBe('save stats differ');
    expect(verifyAuthoredRow(NOOSE, `${faithful} It can repeat this on a Recharge 5-6.`)).toBeTruthy();
    expect(verifyAuthoredRow(NOOSE, `${faithful} ${'Salt sings in the gloom. '.repeat(20)}`)).toBe('over length');
  });

  test('pickVoiceRows skips rules rows and attack lines', () => {
    const m = { sections: { Actions: [
      { name: 'Multiattack', text: 'The x makes three Claw attacks and this line is long enough to pass the length floor easily.' },
      { name: 'Claw', text: '*Melee Attack Roll:* +8, reach 5 ft. 12 (2d6 + 5) Slashing damage. And more words to pass the length floor here.' },
      { name: 'Dread Toll', text: '*Wisdom Saving Throw*: DC 15, each creature in a 30-foot Emanation. *Failure:* 10 (3d6) Necrotic damage and dread.' },
    ] } };
    expect(pickVoiceRows(m).map((r) => r.name)).toEqual(['Dread Toll']);
  });

  test('e2e: a faithful authored row replaces the engine text; a cheat keeps it', async () => {
    const opts = { concept: 'a fen-dread', cr: 12, seed: 4, themes: ['grasping'], resolvedType: 'Monstrosity', archetypeName: 'controller', archetypeSource: 'user' };
    const control = await generateFromSkeleton(opts, routed({ rows: [], slot: { use: false } }));
    const target = pickVoiceRows(control)[0];
    if (!target) return; // seed grew no voice rows — nothing to author
    const faithful = `${target.text} Its shape is a rumor in the fog.`;
    const m2 = await generateFromSkeleton(opts, routed({ rows: [{ name: target.name, text: faithful }], slot: { use: false } }));
    expect(Object.values(m2.sections).flat().find((e) => e.name === target.name).text).toMatch(/rumor in the fog/);
    const m3 = await generateFromSkeleton(opts, routed({ rows: [{ name: target.name, text: target.text.replace(/DC \d+/, 'DC 99') }], slot: { use: false } }));
    expect(Object.values(m3.sections).flat().find((e) => e.name === target.name).text).toBe(target.text);
  });
});

describe('authored-case normalization (the Pelted Hound: 3 of 4 rows died of capitalization)', () => {
  const { normalizeAuthoredCase, verifyAuthoredRow } = require('../writer.mjs');
  test('game terms title-case deterministically; prose is untouched', () => {
    expect(normalizeAuthoredCase('deals 10 (3d6) fire damage and the frightened condition; it uses its reaction for opportunity attacks, then the hide action.'))
      .toBe('deals 10 (3d6) Fire damage and the Frightened condition; it uses its Reaction for Opportunity Attacks, then the Hide action.');
  });
  test('a lowercase-but-honest rewrite now survives verification', () => {
    const original = '*Dexterity Saving Throw*: DC 15, each creature in a 30-foot-long, 5-foot-wide Line. *Failure:* 31 (9d6) Fire damage. *Success:* Half damage.';
    const authored = normalizeAuthoredCase('*Dexterity Saving Throw*: DC 15, each creature in a 30-foot-long, 5-foot-wide Line. *Failure:* A reeking wave of hot spoor: 31 (9d6) fire damage. *Success:* Half damage.');
    expect(verifyAuthoredRow(original, authored)).toBeNull();
  });
});
