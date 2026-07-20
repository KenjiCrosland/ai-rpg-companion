import { mount } from '@vue/test-utils';
import ParSwitch from './ParSwitch.vue';

const mountSwitch = (modelValue) =>
  mount(ParSwitch, {
    props: { modelValue, offLabel: '2014 rules', onLabel: '2024 rules', ariaLabel: 'Use 2024 rules' },
  });

describe('ParSwitch', () => {
  test('renders switch semantics with both labels', () => {
    const wrapper = mountSwitch(true);
    const button = wrapper.find('button[role="switch"]');
    expect(button.attributes('aria-checked')).toBe('true');
    expect(button.attributes('aria-label')).toBe('Use 2024 rules');
    expect(wrapper.text()).toContain('2014 rules');
    expect(wrapper.text()).toContain('2024 rules');
  });

  test('click emits the inverted value; state follows the prop', async () => {
    const wrapper = mountSwitch(false);
    expect(wrapper.find('button').attributes('aria-checked')).toBe('false');
    await wrapper.find('button').trigger('click');
    expect(wrapper.emitted('update:modelValue')).toEqual([[true]]);
    await wrapper.setProps({ modelValue: true });
    expect(wrapper.find('button').attributes('aria-checked')).toBe('true');
    await wrapper.find('button').trigger('click');
    expect(wrapper.emitted('update:modelValue')[1]).toEqual([false]);
  });

  test('active label tracks the state', async () => {
    const wrapper = mountSwitch(false);
    const active = () => wrapper.findAll('.par-switch__opt.is-active').map((o) => o.text());
    expect(active()).toEqual(['2014 rules']);
    await wrapper.setProps({ modelValue: true });
    expect(active()).toEqual(['2024 rules']);
  });
});
