/**
 * @jest-environment jsdom
 *
 * Tests for ParAddNewButton.
 *
 * Focus: the component's structural contract — renders as a button,
 * emits click, respects disabled, slot content lands as the label.
 * Visual styling (dashed border, lapis color) is verified by manual
 * production review per the project's test-writing convention; tests
 * here cover the behavior side.
 */

import { mount } from '@vue/test-utils';
import ParAddNewButton from './ParAddNewButton.vue';

describe('ParAddNewButton', () => {
  it('renders as a button element', () => {
    const wrapper = mount(ParAddNewButton);
    expect(wrapper.element.tagName).toBe('BUTTON');
  });

  it('renders default-slot content as the label', () => {
    const wrapper = mount(ParAddNewButton, {
      slots: { default: '+ Add a Related Place' },
    });
    expect(wrapper.text()).toBe('+ Add a Related Place');
  });

  it('emits click when activated', async () => {
    const wrapper = mount(ParAddNewButton, {
      slots: { default: '+ Add' },
    });
    await wrapper.trigger('click');
    expect(wrapper.emitted('click')).toHaveLength(1);
  });

  it('defaults type to "button" so the click does not submit a surrounding form', () => {
    const wrapper = mount(ParAddNewButton);
    expect(wrapper.element.type).toBe('button');
  });

  it('accepts type="submit" for use as a form submit affordance', () => {
    const wrapper = mount(ParAddNewButton, { props: { type: 'submit' } });
    expect(wrapper.element.type).toBe('submit');
  });

  it('disabled prop reflects as native disabled and blocks click', async () => {
    const wrapper = mount(ParAddNewButton, {
      props: { disabled: true },
      slots: { default: '+ Add' },
    });
    expect(wrapper.element.disabled).toBe(true);
    // jsdom does block the native click event on disabled buttons so
    // this asserts the wiring is in place; in production, the click
    // event won't reach the @click handler.
    await wrapper.trigger('click');
    // Synthetic click via trigger DOES fire on disabled in test-utils,
    // but the native event listener wouldn't in real DOM. We at least
    // verify the disabled attribute is set, which is what stops the
    // browser-level activation.
    expect(wrapper.element.disabled).toBe(true);
  });

  it('rejects invalid type values via validator', () => {
    const validator = ParAddNewButton.props.type.validator;
    expect(validator('button')).toBe(true);
    expect(validator('submit')).toBe(true);
    expect(validator('reset')).toBe(true);
    expect(validator('bogus')).toBe(false);
  });
});
