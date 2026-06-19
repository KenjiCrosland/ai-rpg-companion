import { mount } from '@vue/test-utils';
import ParCardButton from './ParCardButton.vue';

describe('ParCardButton', () => {
  it('renders the default slot as the label', () => {
    const wrapper = mount(ParCardButton, { slots: { default: 'Edit' } });
    expect(wrapper.text()).toContain('Edit');
  });

  it('emits click when pressed', async () => {
    const wrapper = mount(ParCardButton);
    await wrapper.find('button').trigger('click');
    expect(wrapper.emitted('click')).toHaveLength(1);
  });

  // Color carries meaning in this component, so the variant→class mapping
  // is real behavior (the timeline relies on create=lapis / muted=gray etc.).
  it.each([
    ['create', 'par-card-button--create'],
    ['affirmative', 'par-card-button--affirmative'],
    ['primary', 'par-card-button--primary'],
    ['muted', 'par-card-button--muted'],
    ['danger', 'par-card-button--danger'],
    ['ghost', 'par-card-button--ghost'],
    ['link', 'par-card-button--link'],
  ])('maps variant "%s" to class %s', (variant, expectedClass) => {
    const wrapper = mount(ParCardButton, { props: { variant } });
    expect(wrapper.find('button').classes()).toContain(expectedClass);
  });

  it('applies the small size modifier', () => {
    const wrapper = mount(ParCardButton, { props: { size: 'small' } });
    expect(wrapper.find('button').classes()).toContain('par-card-button--small');
  });

  it('sets the native disabled attribute and does not emit click', async () => {
    const wrapper = mount(ParCardButton, { props: { disabled: true } });
    expect(wrapper.find('button').element.disabled).toBe(true);
    await wrapper.find('button').trigger('click');
    expect(wrapper.emitted('click')).toBeUndefined();
  });

  it('defaults the native button type to "button" so it never submits a parent form', () => {
    const wrapper = mount(ParCardButton);
    expect(wrapper.find('button').attributes('type')).toBe('button');
  });

  it('renders the icon slot before the label', () => {
    const wrapper = mount(ParCardButton, {
      slots: { icon: '<svg class="probe" />', default: 'Add' },
    });
    expect(wrapper.find('.par-card-button__icon .probe').exists()).toBe(true);
  });
});
