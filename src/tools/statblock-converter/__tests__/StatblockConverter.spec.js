import { mount, flushPromises } from '@vue/test-utils';

jest.mock('@/util/ai-client.mjs', () => ({
  generateGptResponse: jest.fn(),
  isDegradedMode: jest.fn(() => false),
}));
jest.mock('@/util/can-generate-statblock.mjs', () => ({
  canGenerateStatblock: jest.fn(() => Promise.resolve(true)),
}));
jest.mock('@/util/converter-promo.mjs', () => ({
  ...jest.requireActual('@/util/converter-promo.mjs'),
  isConverterPromoActive: jest.fn(() => false), // default: post-trial behavior
}));
jest.mock('@/util/statblock-storage.mjs', () => ({
  saveStatblockToStorage: jest.fn(),
}));
jest.mock('@/util/navigation.mjs', () => ({
  navigateToTool: jest.fn(),
}));
jest.mock('@/composables/useToast', () => ({
  useToast: () => ({ success: jest.fn(), error: jest.fn(), info: jest.fn(), warning: jest.fn() }),
}));
jest.mock('@/tools/statblock-generator/format-2024/generate.mjs', () => {
  const actual = jest.requireActual('@/tools/statblock-generator/format-2024/generate.mjs');
  return { ...actual, convertEdition: jest.fn() };
});
jest.mock('@/components/Statblock.vue', () => ({
  name: 'Statblock', template: '<div class="mock-2014-card">2014 card</div>', props: ['monster', 'readonly', 'columns'],
}));
jest.mock('@/components/Statblock2024.vue', () => ({
  name: 'Statblock2024', template: '<div class="mock-2024-card">2024 card</div>', props: ['monster', 'readonly', 'loading'],
}));

import StatblockConverter from '../StatblockConverter.vue';
import * as aiClient from '@/util/ai-client.mjs';
import { canGenerateStatblock } from '@/util/can-generate-statblock.mjs';
import { saveStatblockToStorage } from '@/util/statblock-storage.mjs';
import { navigateToTool } from '@/util/navigation.mjs';
import { convertEdition } from '@/tools/statblock-generator/format-2024/generate.mjs';
import { isConverterPromoActive } from '@/util/converter-promo.mjs';

const PASTE_2014 = `Kralvag
Large giant, neutral evil
Armor Class 17
Hit Points: 199 (21d10 + 84)
Speed: 40 ft.
STR 22 (+6), DEX 18 (+4), CON 18 (+4), INT 6 (-2), WIS 14 (+2), CHA 10 (+0)
Senses: darkvision 60 ft.
CR:12 (8,400 XP)
Proficiency Bonus:+4
Wall Climb. The kralvag can climb difficult surfaces.
Actions
Pincer: Melee Weapon Attack: +10 to hit, reach 10 ft., one target. Hit: 37 (7d8 + 6) slashing damage.`;

const settle = async () => {
  await new Promise((r) => setTimeout(r, 400)); // parse debounce
  await flushPromises();
};

describe('StatblockConverter', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    isConverterPromoActive.mockReturnValue(false);
  });

  test('paste renders a free preview with the detected edition and zero LLM calls', async () => {
    const wrapper = mount(StatblockConverter);
    await wrapper.find('[data-testid="converter-input"] textarea, textarea').setValue(PASTE_2014);
    await settle();
    expect(wrapper.find('[data-testid="detected-banner"]').text()).toContain('Detected: 2014 rules');
    expect(wrapper.find('.mock-2014-card').exists()).toBe(true);
    expect(aiClient.generateGptResponse).not.toHaveBeenCalled();
    wrapper.unmount();
  });

  test('convert meters through the quota, saves with both printings, and funnels to the generator', async () => {
    convertEdition.mockResolvedValueOnce({ name: 'Kralvag', format: '2024', sections: {}, stats: {}, cr: 12 });
    const wrapper = mount(StatblockConverter);
    await wrapper.find('textarea').setValue(PASTE_2014);
    await settle();

    await wrapper.find('[data-testid="convert-button"]').trigger('click');
    await flushPromises();

    expect(canGenerateStatblock).toHaveBeenCalled();
    // Clean parse: convertEdition got the deterministic model, no LLM parse call.
    expect(convertEdition.mock.calls[0][0].format).toBe('2014');
    expect(aiClient.generateGptResponse).not.toHaveBeenCalled();

    const saved = saveStatblockToStorage.mock.calls[0];
    expect(saved[0].format).toBe('2024');
    expect(saved[0].other_edition.format).toBe('2014');
    expect(saved[1]).toBe('Converted');
    expect(wrapper.find('[data-testid="converted-card"]').exists()).toBe(true);

    await wrapper.find('[data-testid="open-in-generator"]').trigger('click');
    expect(navigateToTool).toHaveBeenCalledWith('statblock-generator', { monster: 'Kralvag', folder: 'Converted' });
    wrapper.unmount();
  });

  test('a denied quota blocks conversion with no calls', async () => {
    canGenerateStatblock.mockResolvedValueOnce(false);
    const wrapper = mount(StatblockConverter);
    await wrapper.find('textarea').setValue(PASTE_2014);
    await settle();
    await wrapper.find('[data-testid="convert-button"]').trigger('click');
    await flushPromises();
    expect(convertEdition).not.toHaveBeenCalled();
    expect(saveStatblockToStorage).not.toHaveBeenCalled();
    wrapper.unmount();
  });

  test('an incomplete paste spends its unit on LLM parse + conversion', async () => {
    aiClient.generateGptResponse.mockResolvedValueOnce(JSON.stringify({
      name: 'Gribble', size: 'Small', type: 'Aberration', alignment: 'Chaotic Evil',
      ac: 13, hp: 27, speed: '30 ft.',
      stats: { STR: 8, DEX: 16, CON: 12, INT: 10, WIS: 12, CHA: 6 },
      cr: '1/2', pb: 2,
      sections: { Actions: [{ name: 'Bite', text: 'Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 6 (1d6 + 3) piercing damage.' }] },
    }));
    convertEdition.mockResolvedValueOnce({ name: 'Gribble', format: '2024', sections: {} });

    const wrapper = mount(StatblockConverter);
    await wrapper.find('textarea').setValue('Gribble\nA weird little thing with a nasty bite. Melee Weapon Attack: +5 to hit.');
    await settle();
    expect(wrapper.find('[data-testid="detected-banner"]').text()).toContain("Couldn't read");

    await wrapper.find('[data-testid="convert-button"]').trigger('click');
    await flushPromises();
    expect(aiClient.generateGptResponse).toHaveBeenCalledTimes(1); // the parse call
    expect(convertEdition).toHaveBeenCalledTimes(1);
    expect(convertEdition.mock.calls[0][0].name).toBe('Gribble');
    wrapper.unmount();
  });
});

describe('launch trial window (owner call, 2026-07-31)', () => {
  beforeEach(() => jest.clearAllMocks());

  test('during the trial a free-tier conversion skips the quota entirely', async () => {
    isConverterPromoActive.mockReturnValue(true);
    convertEdition.mockResolvedValueOnce({ name: 'Kralvag', format: '2024', sections: {} });
    const wrapper = mount(StatblockConverter);
    await wrapper.find('textarea').setValue(PASTE_2014);
    await settle();

    await wrapper.find('[data-testid="convert-button"]').trigger('click');
    await flushPromises();

    // The gate both checks and consumes, so skipping the call IS the promo.
    expect(canGenerateStatblock).not.toHaveBeenCalled();
    expect(convertEdition).toHaveBeenCalledTimes(1);
    expect(saveStatblockToStorage).toHaveBeenCalled();
    wrapper.unmount();
  });

  test('the trial note states both the offer and what happens after', async () => {
    isConverterPromoActive.mockReturnValue(true);
    const wrapper = mount(StatblockConverter);
    const note = wrapper.find('[data-testid="trial-note"]');
    expect(note.exists()).toBe(true);
    expect(note.text()).toContain('Free and unlimited through August 7');
    expect(note.text()).toContain('5 AI generations a day');
    wrapper.unmount();
  });

  test('premium never sees the trial note and still calls through the gate', async () => {
    isConverterPromoActive.mockReturnValue(true);
    convertEdition.mockResolvedValueOnce({ name: 'Kralvag', format: '2024', sections: {} });
    const wrapper = mount(StatblockConverter, { props: { premium: true } });
    expect(wrapper.find('[data-testid="trial-note"]').exists()).toBe(false);
    await wrapper.find('textarea').setValue(PASTE_2014);
    await settle();
    await wrapper.find('[data-testid="convert-button"]').trigger('click');
    await flushPromises();
    expect(canGenerateStatblock).toHaveBeenCalledWith(true);
    wrapper.unmount();
  });

  test('after the window everything reverts with no deploy: gate enforced, note gone', async () => {
    isConverterPromoActive.mockReturnValue(false);
    canGenerateStatblock.mockResolvedValueOnce(false);
    const wrapper = mount(StatblockConverter);
    expect(wrapper.find('[data-testid="trial-note"]').exists()).toBe(false);
    await wrapper.find('textarea').setValue(PASTE_2014);
    await settle();
    await wrapper.find('[data-testid="convert-button"]').trigger('click');
    await flushPromises();
    expect(canGenerateStatblock).toHaveBeenCalled();
    expect(convertEdition).not.toHaveBeenCalled();
    wrapper.unmount();
  });
});

describe('isConverterPromoActive', () => {
  const { isConverterPromoActive: real, CONVERTER_PROMO_END_MS } =
    jest.requireActual('@/util/converter-promo.mjs');

  test('is true before the end instant and false at or after it', () => {
    expect(real(CONVERTER_PROMO_END_MS - 1)).toBe(true);
    expect(real(CONVERTER_PROMO_END_MS)).toBe(false);
    expect(real(CONVERTER_PROMO_END_MS + 86400000)).toBe(false);
  });
});
