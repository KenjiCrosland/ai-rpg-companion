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
      use: true, section: 'Bonus Actions', shape: 'c', name: 'Heat Mirage',
      text: 'The creature leaves a shimmering afterimage in its space; the first attack roll against the creature before the start of its next turn has Disadvantage.',
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
      use: true, section: 'Actions', shape: 'a', name: 'Doom Blast',
      text: '*Dexterity Saving Throw*: DC 25, each creature in a 90-foot Cone. *Failure:* 200 (40d10) Force damage.',
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
