import { mount } from '@vue/test-utils';
import ParField from './ParField.vue';
import ParInput from './ParInput.vue';
import ParTextarea from './ParTextarea.vue';
import ParSelect from './ParSelect.vue';

describe('ParField', () => {
  it('renders the label and omits the optional marker by default', () => {
    const wrapper = mount(ParField, { props: { label: 'Item name' } });
    expect(wrapper.text()).toContain('Item name');
    expect(wrapper.find('.par-field__optional').exists()).toBe(false);
  });

  it('renders the "— optional" marker when optional', () => {
    const wrapper = mount(ParField, { props: { label: 'Notes', optional: true } });
    expect(wrapper.find('.par-field__optional').text()).toContain('optional');
  });

  it('renders hint from the prop and lets the #hint slot override it', () => {
    const fromProp = mount(ParField, { props: { label: 'Origin', hint: 'Shapes the theme' } });
    expect(fromProp.find('.par-field__hint').text()).toBe('Shapes the theme');

    const fromSlot = mount(ParField, {
      props: { label: 'Origin', hint: 'ignored' },
      slots: { hint: 'rich <em>hint</em>' },
    });
    expect(fromSlot.find('.par-field__hint').text()).not.toContain('ignored');
  });

  it('hides the hint element when neither prop nor slot is provided', () => {
    const wrapper = mount(ParField, { props: { label: 'Rarity' } });
    expect(wrapper.find('.par-field__hint').exists()).toBe(false);
  });

  it('wraps the slotted control in the label for implicit association', () => {
    const wrapper = mount(ParField, {
      props: { label: 'Item name' },
      slots: { default: '<input class="probe" />' },
    });
    expect(wrapper.find('label.par-field input.probe').exists()).toBe(true);
  });
});

describe('ParInput', () => {
  it('reflects modelValue and emits update:modelValue on input', async () => {
    const wrapper = mount(ParInput, { props: { modelValue: 'Goblet' } });
    expect(wrapper.find('input').element.value).toBe('Goblet');

    await wrapper.find('input').setValue('Chalice');
    expect(wrapper.emitted('update:modelValue')[0]).toEqual(['Chalice']);
  });

  it('passes through type, placeholder, and disabled', () => {
    const wrapper = mount(ParInput, {
      props: { type: 'number', placeholder: 'e.g. 3', disabled: true },
    });
    const input = wrapper.find('input');
    expect(input.attributes('type')).toBe('number');
    expect(input.attributes('placeholder')).toBe('e.g. 3');
    expect(input.element.disabled).toBe(true);
  });
});

describe('ParTextarea', () => {
  it('reflects modelValue and emits on input', async () => {
    const wrapper = mount(ParTextarea, { props: { modelValue: 'lore' } });
    expect(wrapper.find('textarea').element.value).toBe('lore');

    await wrapper.find('textarea').setValue('new lore');
    expect(wrapper.emitted('update:modelValue')[0]).toEqual(['new lore']);
  });

  it('passes rows through when provided', () => {
    const wrapper = mount(ParTextarea, { props: { rows: 3 } });
    expect(wrapper.find('textarea').attributes('rows')).toBe('3');
  });
});

describe('ParSelect', () => {
  it('normalizes string options to value/label', () => {
    const wrapper = mount(ParSelect, { props: { options: ['Common', 'Rare'] } });
    const opts = wrapper.findAll('option');
    expect(opts.map(o => o.text())).toEqual(['Common', 'Rare']);
    expect(opts.map(o => o.element.value)).toEqual(['Common', 'Rare']);
  });

  it('accepts {value, label} options and falls back to value when label is missing', () => {
    const wrapper = mount(ParSelect, {
      props: { options: [{ value: 'vr', label: 'Very Rare' }, { value: 'leg' }] },
    });
    const opts = wrapper.findAll('option');
    expect(opts[0].text()).toBe('Very Rare');
    expect(opts[0].element.value).toBe('vr');
    expect(opts[1].text()).toBe('leg');
  });

  it('renders a leading placeholder option when placeholder is set', () => {
    const wrapper = mount(ParSelect, {
      props: { placeholder: 'Any rarity', options: ['Common'] },
    });
    const first = wrapper.findAll('option')[0];
    expect(first.text()).toBe('Any rarity');
    expect(first.element.value).toBe('');
  });

  it('emits update:modelValue on change', async () => {
    const wrapper = mount(ParSelect, { props: { options: ['Common', 'Rare'] } });
    await wrapper.find('select').setValue('Rare');
    expect(wrapper.emitted('update:modelValue')[0]).toEqual(['Rare']);
  });
});
