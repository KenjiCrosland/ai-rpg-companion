import { mount } from '@vue/test-utils';
import ParActionButton from './ParActionButton.vue';

describe('ParActionButton', () => {
  describe('tag rendering', () => {
    it('renders as a <button> by default', () => {
      const wrapper = mount(ParActionButton, { slots: { default: 'Submit' } });
      expect(wrapper.element.tagName).toBe('BUTTON');
    });

    it('renders as an <a> when tag="a"', () => {
      const wrapper = mount(ParActionButton, {
        props: { tag: 'a' },
        slots: { default: 'Open' },
        attrs: { href: '#' },
      });
      expect(wrapper.element.tagName).toBe('A');
    });

    it('rejects invalid tag values via prop validator', () => {
      const validator = ParActionButton.props.tag.validator;
      expect(validator('button')).toBe(true);
      expect(validator('a')).toBe(true);
      expect(validator('div')).toBe(false);
      expect(validator('span')).toBe(false);
    });
  });

  describe('type prop', () => {
    it('applies type="button" by default on a <button>', () => {
      const wrapper = mount(ParActionButton);
      expect(wrapper.attributes('type')).toBe('button');
    });

    it('applies type="submit" when prop is submit', () => {
      const wrapper = mount(ParActionButton, { props: { type: 'submit' } });
      expect(wrapper.attributes('type')).toBe('submit');
    });

    it('omits type attribute on <a> tags', () => {
      const wrapper = mount(ParActionButton, {
        props: { tag: 'a', type: 'submit' },
        attrs: { href: '#' },
      });
      // Anchor tags don't have a `type` attribute in the same sense as buttons.
      // Binding it would produce invalid HTML.
      expect(wrapper.attributes('type')).toBeUndefined();
    });
  });

  describe('disabled state', () => {
    it('applies disabled attribute on <button> when disabled', () => {
      const wrapper = mount(ParActionButton, { props: { disabled: true } });
      expect(wrapper.attributes('disabled')).toBeDefined();
    });

    it('omits disabled attribute when not disabled', () => {
      const wrapper = mount(ParActionButton);
      expect(wrapper.attributes('disabled')).toBeUndefined();
    });

    it('applies aria-disabled and tabindex=-1 on <a> when disabled', () => {
      const wrapper = mount(ParActionButton, {
        props: { tag: 'a', disabled: true },
        attrs: { href: '#' },
      });
      expect(wrapper.attributes('aria-disabled')).toBe('true');
      expect(wrapper.attributes('tabindex')).toBe('-1');
      // `disabled` is not a valid attribute on <a>, so it should not be set.
      expect(wrapper.attributes('disabled')).toBeUndefined();
    });

    it('does not apply aria-disabled or tabindex on a non-disabled anchor', () => {
      const wrapper = mount(ParActionButton, {
        props: { tag: 'a' },
        attrs: { href: '#' },
      });
      expect(wrapper.attributes('aria-disabled')).toBeUndefined();
      expect(wrapper.attributes('tabindex')).toBeUndefined();
    });
  });

  describe('click handling', () => {
    it('emits click events when enabled', async () => {
      const wrapper = mount(ParActionButton);
      await wrapper.trigger('click');
      expect(wrapper.emitted('click')).toHaveLength(1);
    });

    it('blocks click on disabled anchor (preventDefault)', async () => {
      const wrapper = mount(ParActionButton, {
        props: { tag: 'a', disabled: true },
        attrs: { href: '#' },
      });
      // We intercept the click and call preventDefault to stop navigation.
      // The native disabled attribute doesn't exist on <a> tags, so the
      // component has to handle this in JS.
      const event = new MouseEvent('click', { bubbles: true, cancelable: true });
      wrapper.element.dispatchEvent(event);
      expect(event.defaultPrevented).toBe(true);
      expect(wrapper.emitted('click')).toBeFalsy();
    });
  });

  describe('layout modifiers', () => {
    it('applies par-action--full-width class when fullWidth is true', () => {
      const wrapper = mount(ParActionButton, { props: { fullWidth: true } });
      expect(wrapper.classes()).toContain('par-action--full-width');
    });

    it('does NOT apply full-width when iconOnly is also true', () => {
      // iconOnly means a square button — full-width would distort the
      // aspect ratio. The component suppresses one when the other is set.
      const wrapper = mount(ParActionButton, {
        props: { fullWidth: true, iconOnly: true },
      });
      expect(wrapper.classes()).not.toContain('par-action--full-width');
      expect(wrapper.classes()).toContain('par-action--icon-only');
    });

    it('applies par-action--icon-only class when iconOnly is true', () => {
      const wrapper = mount(ParActionButton, { props: { iconOnly: true } });
      expect(wrapper.classes()).toContain('par-action--icon-only');
    });
  });

  describe('size variants', () => {
    it('defaults to medium size', () => {
      const wrapper = mount(ParActionButton);
      expect(wrapper.classes()).toContain('par-action--medium');
    });

    it('applies par-action--small for size="small"', () => {
      const wrapper = mount(ParActionButton, { props: { size: 'small' } });
      expect(wrapper.classes()).toContain('par-action--small');
    });

    it('applies par-action--large for size="large"', () => {
      const wrapper = mount(ParActionButton, { props: { size: 'large' } });
      expect(wrapper.classes()).toContain('par-action--large');
    });
  });

  describe('variant', () => {
    it('defaults to primary (no variant class applied)', () => {
      // Primary is the base treatment; only secondary needs its own class.
      const wrapper = mount(ParActionButton);
      expect(wrapper.classes()).not.toContain('par-action--variant-secondary');
    });

    it('applies par-action--variant-secondary class when variant="secondary"', () => {
      const wrapper = mount(ParActionButton, { props: { variant: 'secondary' } });
      expect(wrapper.classes()).toContain('par-action--variant-secondary');
    });

    it('rejects invalid variant values via prop validator', () => {
      const validator = ParActionButton.props.variant.validator;
      expect(validator('primary')).toBe(true);
      expect(validator('secondary')).toBe(true);
      expect(validator('tertiary')).toBe(false);
      expect(validator('luminous')).toBe(false);
      expect(validator('')).toBe(false);
    });

    it('preserves all structural props across variants', () => {
      // Sizes, fullWidth, iconOnly all work the same regardless of variant.
      const wrapper = mount(ParActionButton, {
        props: { variant: 'secondary', size: 'large', fullWidth: true },
      });
      expect(wrapper.classes()).toContain('par-action--variant-secondary');
      expect(wrapper.classes()).toContain('par-action--large');
      expect(wrapper.classes()).toContain('par-action--full-width');
    });
  });

  describe('icon slots', () => {
    it('renders all four slot positions in order', () => {
      const wrapper = mount(ParActionButton, {
        slots: {
          'icon-left': '<span class="left">L</span>',
          icon: '<span class="middle">M</span>',
          default: 'Label',
          'icon-right': '<span class="right">R</span>',
        },
      });
      // textContent reflects DOM order.
      expect(wrapper.text()).toBe('LMLabelR');
    });

    it('applies has-icon-left class only when icon-left + default both present', () => {
      const withIcon = mount(ParActionButton, {
        slots: { 'icon-left': '<svg />', default: 'Save' },
      });
      expect(withIcon.classes()).toContain('par-action--has-icon-left');

      const iconOnly = mount(ParActionButton, {
        slots: { 'icon-left': '<svg />' },
      });
      expect(iconOnly.classes()).not.toContain('par-action--has-icon-left');
    });

    it('applies has-icon-right class only when icon-right + default both present', () => {
      const withIcon = mount(ParActionButton, {
        slots: { default: 'Next', 'icon-right': '<svg />' },
      });
      expect(withIcon.classes()).toContain('par-action--has-icon-right');

      const iconOnly = mount(ParActionButton, {
        slots: { 'icon-right': '<svg />' },
      });
      expect(iconOnly.classes()).not.toContain('par-action--has-icon-right');
    });
  });
});
