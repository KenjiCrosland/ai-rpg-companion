/**
 * 2024 generation runs through the SKELETON path by default (owner call,
 * 2026-08-02). localStorage['statblock-skeleton'] = '0' falls back to the
 * chassis.
 *
 * Both paths share one call site, the progress staging and the save flow, so
 * the two can be swapped live without a deploy.
 */
import { generateMonster2024 } from '../format-2024/generate.mjs';

const FLAG = 'statblock-skeleton';
const flavorPrompt = (p) => /Every number is already fixed/.test(p);

afterEach(() => localStorage.removeItem(FLAG));

describe('skeleton toggle', () => {
  test('2024 uses the skeleton path by default', async () => {
    const prompts = [];
    const m = await generateMonster2024(
      { concept: 'a bog lurker', cr: 5, archetypeName: null, edition: '2024' },
      async (p) => { prompts.push(p); return null; },
    );
    expect(prompts.some(flavorPrompt)).toBe(true);
    expect(m.generation.path).toBe('skeleton');
  });

  test("setting the flag to '0' falls back to the chassis", async () => {
    localStorage.setItem(FLAG, '0');
    const prompts = [];
    await generateMonster2024(
      { concept: 'a bog lurker', cr: 5, archetypeName: null, edition: '2024' },
      async (p) => { prompts.push(p); return '{"bad":true}'; },
    ).catch(() => {});
    expect(prompts.some(flavorPrompt)).toBe(false);
  });

  test('a null response still ships a usable block', async () => {
    const prompts = [];
    const m = await generateMonster2024(
      { concept: 'a bog lurker', cr: 5, archetypeName: null, edition: '2024' },
      async (p) => { prompts.push(p); return null; },
    );
    expect(prompts.some(flavorPrompt)).toBe(true);
    // Never-fail holds through the toggle: a null response still ships.
    expect(m.ac).toBeGreaterThan(0);
    expect(m.generation.path).toBe('skeleton');
  });

  test('a blank-form (seeded) generation also uses the skeleton', async () => {
    // The most common way to try the generator. Excluding it meant the switch
    // looked like it had not happened at all.
    const prompts = [];
    const m = await generateMonster2024(
      { concept: 'a random thing', cr: 5, archetypeName: null, edition: '2024', seedTraits: { concept: 'x' } },
      async (p) => { prompts.push(p); return null; },
    );
    expect(prompts.some(flavorPrompt)).toBe(true);
    expect(m.generation.path).toBe('skeleton');
  });

  test('2014 always uses the chassis path', async () => {
    // The ability library's 2014 templates cover about half the rows and no
    // traits at all, so the skeleton path is 2024-only for now.
    const prompts = [];
    await generateMonster2024(
      { concept: 'x', cr: 5, archetypeName: null, edition: '2014' },
      async (p) => { prompts.push(p); return '{"bad":true}'; },
    ).catch(() => {});
    expect(prompts.some(flavorPrompt)).toBe(false);
  });

  test('a blocked localStorage keeps the default instead of throwing', async () => {
    // Incognito or an embedded frame must not silently drop to the old path.
    const spy = jest.spyOn(Storage.prototype, 'getItem').mockImplementation(() => { throw new Error('blocked'); });
    const prompts = [];
    const m = await generateMonster2024(
      { concept: 'x', cr: 5, archetypeName: null, edition: '2024' },
      async (p) => { prompts.push(p); return null; },
    );
    expect(prompts.some(flavorPrompt)).toBe(true);
    expect(m.generation.path).toBe('skeleton');
    spy.mockRestore();
  });
});
