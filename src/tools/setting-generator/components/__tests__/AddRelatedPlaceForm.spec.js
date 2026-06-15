/**
 * @jest-environment jsdom
 *
 * AddRelatedPlaceForm tests — focused on the form's structural
 * contract: toggle expands/collapses, kind picker has the three
 * options mapping to parent/sibling/sublocation, submit fires the
 * right payload, cancel resets state, name is required.
 */

import { mount } from '@vue/test-utils';
import AddRelatedPlaceForm from '../AddRelatedPlaceForm.vue';

jest.mock('@/parchment', () => ({
  ParButton: {
    name: 'ParButton',
    template: '<button type="button" :disabled="disabled"><slot></slot></button>',
    props: ['variant', 'disabled'],
  },
  ParAddNewButton: {
    name: 'ParAddNewButton',
    template: '<button type="button" :disabled="disabled" class="par-add-new-stub"><slot></slot></button>',
    props: ['disabled'],
  },
}));

describe('AddRelatedPlaceForm', () => {
  it('starts collapsed; clicking the toggle reveals the form', async () => {
    const wrapper = mount(AddRelatedPlaceForm);
    expect(wrapper.find('form').exists()).toBe(false);

    const toggle = wrapper.findComponent({ name: 'ParAddNewButton' });
    expect(toggle.exists()).toBe(true);
    await toggle.trigger('click');

    expect(wrapper.find('form').exists()).toBe(true);
  });

  it('exposes the three kind options mapping to parent/sibling/sublocation', async () => {
    const wrapper = mount(AddRelatedPlaceForm);
    await wrapper.findComponent({ name: 'ParAddNewButton' }).trigger('click');

    const options = wrapper.findAll('option').map(o => o.element.value);
    expect(options).toEqual(['parent', 'sibling', 'sublocation']);
  });

  it('allows submit with both name and description blank ("surprise me with a new place of this kind")', async () => {
    const wrapper = mount(AddRelatedPlaceForm);
    await wrapper.findComponent({ name: 'ParAddNewButton' }).trigger('click');

    const submitBtn = wrapper.findAll('button').find(b => b.text().includes('Create Setting'));
    // No disabled attribute regardless of empty fields — kind has a
    // default, and empty fields signal "let the AI invent freely."
    expect(submitBtn.attributes('disabled')).toBeUndefined();

    await submitBtn.trigger('click');
    const events = wrapper.emitted('add-and-promote');
    expect(events).toHaveLength(1);
    expect(events[0][0]).toEqual({
      kind: 'sibling',  // default
      name: '',
      role_brief: '',
      suggested_setting_type: '',
    });
  });

  it('emits add-and-promote with the form values on submit', async () => {
    const wrapper = mount(AddRelatedPlaceForm);
    await wrapper.findComponent({ name: 'ParAddNewButton' }).trigger('click');

    await wrapper.find('select').setValue('parent');
    const inputs = wrapper.findAll('input[type="text"]');
    await inputs[0].setValue('The Northern Marches');
    await inputs[1].setValue('Kingdom containing the city');

    const submitBtn = wrapper.findAll('button').find(b => b.text().includes('Create Setting'));
    await submitBtn.trigger('click');

    const events = wrapper.emitted('add-and-promote');
    expect(events).toHaveLength(1);
    expect(events[0][0]).toEqual({
      kind: 'parent',
      name: 'The Northern Marches',
      role_brief: 'Kingdom containing the city',
      suggested_setting_type: '',
    });
  });

  it('resets and collapses after a successful submit', async () => {
    const wrapper = mount(AddRelatedPlaceForm);
    await wrapper.findComponent({ name: 'ParAddNewButton' }).trigger('click');

    await wrapper.find('input[type="text"]').setValue('Aethelmar');
    const submitBtn = wrapper.findAll('button').find(b => b.text().includes('Create Setting'));
    await submitBtn.trigger('click');

    // Form collapsed back to toggle.
    expect(wrapper.find('form').exists()).toBe(false);
    expect(wrapper.findComponent({ name: 'ParAddNewButton' }).exists()).toBe(true);
  });

  it('cancel button collapses the form without emitting', async () => {
    const wrapper = mount(AddRelatedPlaceForm);
    await wrapper.findComponent({ name: 'ParAddNewButton' }).trigger('click');

    await wrapper.find('input[type="text"]').setValue('Aethelmar');
    const cancelBtn = wrapper.find('.add-related-place-cancel');
    await cancelBtn.trigger('click');

    expect(wrapper.find('form').exists()).toBe(false);
    expect(wrapper.emitted('add-and-promote')).toBeFalsy();
  });

  it('trims whitespace from name and role_brief before emitting', async () => {
    const wrapper = mount(AddRelatedPlaceForm);
    await wrapper.findComponent({ name: 'ParAddNewButton' }).trigger('click');

    const inputs = wrapper.findAll('input[type="text"]');
    await inputs[0].setValue('  Aethelmar  ');
    await inputs[1].setValue('  Trading port  ');

    const submitBtn = wrapper.findAll('button').find(b => b.text().includes('Create Setting'));
    await submitBtn.trigger('click');

    const events = wrapper.emitted('add-and-promote');
    expect(events[0][0].name).toBe('Aethelmar');
    expect(events[0][0].role_brief).toBe('Trading port');
  });

  it('settingName prop appears in the kind option labels', async () => {
    const wrapper = mount(AddRelatedPlaceForm, {
      props: { settingName: 'Gorod-Ognya' },
    });
    await wrapper.findComponent({ name: 'ParAddNewButton' }).trigger('click');
    const optionText = wrapper.findAll('option').map(o => o.text()).join(' | ');
    expect(optionText).toContain('Gorod-Ognya');
  });
});
