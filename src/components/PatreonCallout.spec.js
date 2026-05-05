import { mount } from '@vue/test-utils';
import PatreonCallout from './PatreonCallout.vue';

const PATREON_URL = 'https://patreon.com/example';

function makeWrapper(props = {}) {
  return mount(PatreonCallout, {
    props: { patreonUrl: PATREON_URL, ...props },
  });
}

describe('PatreonCallout', () => {
  describe('rendering', () => {
    it('renders the Premium label, body, and aside copy', () => {
      const wrapper = makeWrapper();
      const text = wrapper.text();
      expect(text).toContain('Premium');
      expect(text).toContain('saved to this browser only');
      expect(text).toContain('built and maintained by one developer');
    });

    it('passes patreonUrl through to the action button href', () => {
      // The bullet list now also contains an <a> (membership link), so we
      // target the action button by its par-action class to avoid matching
      // the wrong anchor.
      const wrapper = makeWrapper();
      const action = wrapper.find('.par-action');
      expect(action.attributes('href')).toBe(PATREON_URL);
    });

    it('renders the action button as <a>, not <button>', () => {
      // tag="a" on the ParActionButton — required for navigation.
      const wrapper = makeWrapper();
      const action = wrapper.find('.par-action');
      expect(action.exists()).toBe(true);
      expect(action.element.tagName).toBe('A');
      expect(action.text()).toContain('Support on Patreon');
    });

    it('renders the action button in the luminous variant', () => {
      const wrapper = makeWrapper();
      const action = wrapper.find('.par-action');
      expect(action.classes()).toContain('par-action--variant-luminous');
    });
  });

  describe('expandable behaviour', () => {
    it('starts collapsed', () => {
      const wrapper = makeWrapper();
      const trigger = wrapper.find('.patreon-callout__expand-trigger');
      const content = wrapper.find('.patreon-callout__expand-content');
      expect(trigger.attributes('aria-expanded')).toBe('false');
      // v-show toggles inline display — collapsed = display:none.
      expect(content.element.style.display).toBe('none');
    });

    it('expands on click', async () => {
      const wrapper = makeWrapper();
      const trigger = wrapper.find('.patreon-callout__expand-trigger');
      await trigger.trigger('click');
      expect(trigger.attributes('aria-expanded')).toBe('true');
      const content = wrapper.find('.patreon-callout__expand-content');
      expect(content.element.style.display).not.toBe('none');
    });

    it('collapses on second click', async () => {
      const wrapper = makeWrapper();
      const trigger = wrapper.find('.patreon-callout__expand-trigger');
      await trigger.trigger('click');
      await trigger.trigger('click');
      expect(trigger.attributes('aria-expanded')).toBe('false');
    });

    it('applies the open modifier class when expanded (drives caret rotation)', async () => {
      const wrapper = makeWrapper();
      const expandable = wrapper.find('.patreon-callout__expandable');
      expect(expandable.classes()).not.toContain('patreon-callout__expandable--open');
      await wrapper.find('.patreon-callout__expand-trigger').trigger('click');
      expect(expandable.classes()).toContain('patreon-callout__expandable--open');
    });

    it('wires aria-controls to the content element id', () => {
      const wrapper = makeWrapper();
      const trigger = wrapper.find('.patreon-callout__expand-trigger');
      const content = wrapper.find('.patreon-callout__expand-content');
      const controlsId = trigger.attributes('aria-controls');
      expect(controlsId).toBeTruthy();
      expect(content.attributes('id')).toBe(controlsId);
    });

    it('renders the default four feature bullets in the expanded content', async () => {
      const wrapper = makeWrapper();
      await wrapper.find('.patreon-callout__expand-trigger').trigger('click');
      const items = wrapper.findAll('.patreon-callout__list li');
      expect(items).toHaveLength(4);
      expect(items[0].text()).toContain('Cross-device save and load');
      expect(items[1].text()).toContain('Unlimited Lore Builder');
      expect(items[2].text()).toContain('Unlimited Quest Hook');
      expect(items[3].text()).toContain('See all premium tiers and benefits on Patreon');
    });

    it('keeps multiple instances independent', async () => {
      const a = makeWrapper();
      const b = makeWrapper();
      await a.find('.patreon-callout__expand-trigger').trigger('click');
      // a should be expanded, b should remain collapsed.
      expect(a.find('.patreon-callout__expand-trigger').attributes('aria-expanded')).toBe('true');
      expect(b.find('.patreon-callout__expand-trigger').attributes('aria-expanded')).toBe('false');
      // The aria-controls id should differ so the two instances don't
      // collide if they appear on the same page.
      expect(a.find('.patreon-callout__expand-trigger').attributes('aria-controls'))
        .not.toBe(b.find('.patreon-callout__expand-trigger').attributes('aria-controls'));
    });
  });

  describe('body and aside slots', () => {
    it('renders custom body content when #body slot is provided', () => {
      const wrapper = mount(PatreonCallout, {
        props: { patreonUrl: PATREON_URL },
        slots: {
          body: '<p class="patreon-callout__body">Custom dungeon-specific body copy.</p>',
        },
      });
      expect(wrapper.text()).toContain('Custom dungeon-specific body copy');
      // Default body must NOT leak through.
      expect(wrapper.text()).not.toContain('unlocks unlimited Lore Builder and Quest Hook');
    });

    it('renders custom aside content when #aside slot is provided', () => {
      const wrapper = mount(PatreonCallout, {
        props: { patreonUrl: PATREON_URL },
        slots: {
          aside: '<p class="patreon-callout__aside">Custom aside copy.</p>',
        },
      });
      expect(wrapper.text()).toContain('Custom aside copy');
      // Default aside must NOT leak through.
      expect(wrapper.text()).not.toContain('built and maintained by one developer');
    });

    it('suppresses body paragraph entirely when #body slot is empty', () => {
      // Used by inline limit-reached contexts (dungeon NPCsTab/MonstersTab)
      // where the surrounding heading already does the framing and the
      // callout should strip down to PREMIUM → expandable → button.
      //
      // Mounting via a wrapper template so the test mirrors the real
      // production pattern (<template #body></template>). Vue Test Utils'
      // `slots: { body: '' }` shorthand treats empty string as "no slot
      // provided" and triggers the fallback — wrong shape for this case.
      const wrapper = mount({
        components: { PatreonCallout },
        template: `
          <PatreonCallout patreon-url="${PATREON_URL}">
            <template #body></template>
          </PatreonCallout>
        `,
      });
      expect(wrapper.find('.patreon-callout__body').exists()).toBe(false);
      expect(wrapper.text()).not.toContain('unlocks unlimited Lore Builder and Quest Hook');
    });

    it('suppresses aside paragraph entirely when #aside slot is empty', () => {
      const wrapper = mount({
        components: { PatreonCallout },
        template: `
          <PatreonCallout patreon-url="${PATREON_URL}">
            <template #aside></template>
          </PatreonCallout>
        `,
      });
      expect(wrapper.find('.patreon-callout__aside').exists()).toBe(false);
      expect(wrapper.text()).not.toContain('built and maintained by one developer');
    });

    it('default fallback body and aside still render when no slots provided', () => {
      // Unchanged behaviour — covered already by the rendering describe
      // block, but explicit here so a future refactor can't silently
      // break the item-generator default path.
      const wrapper = makeWrapper();
      expect(wrapper.find('.patreon-callout__body').exists()).toBe(true);
      expect(wrapper.find('.patreon-callout__aside').exists()).toBe(true);
      expect(wrapper.text()).toContain('unlocks unlimited Lore Builder and Quest Hook');
      expect(wrapper.text()).toContain('built and maintained by one developer');
    });
  });

  describe('features slot', () => {
    it('renders custom slot content instead of the default bullets when #features is provided', async () => {
      const wrapper = mount(PatreonCallout, {
        props: { patreonUrl: PATREON_URL },
        slots: {
          features: `
            <li>Custom NPC bullet one</li>
            <li>Custom NPC bullet two</li>
          `,
        },
      });
      await wrapper.find('.patreon-callout__expand-trigger').trigger('click');
      const items = wrapper.findAll('.patreon-callout__list li');
      expect(items).toHaveLength(2);
      expect(items[0].text()).toBe('Custom NPC bullet one');
      expect(items[1].text()).toBe('Custom NPC bullet two');
      // Default copy must NOT leak through when the slot is overridden.
      expect(wrapper.text()).not.toContain('Cross-device save and load');
    });

    it('default slot links to the membership tiers page with safe target attrs', async () => {
      const wrapper = makeWrapper();
      await wrapper.find('.patreon-callout__expand-trigger').trigger('click');
      const link = wrapper.find('.patreon-callout__list a');
      expect(link.exists()).toBe(true);
      expect(link.attributes('href')).toBe('https://www.patreon.com/c/ai_rpg_tookit/membership');
      // target=_blank without rel=noopener is a known security risk —
      // the new tab can call window.opener.location and redirect the
      // original tab. rel=noopener prevents that.
      expect(link.attributes('target')).toBe('_blank');
      expect(link.attributes('rel')).toContain('noopener');
    });

    it('the arrow glyph after the link is hidden from screen readers', async () => {
      // The visual arrow signals "external link" without screen readers
      // announcing the literal word "arrow" in the middle of the bullet.
      const wrapper = makeWrapper();
      await wrapper.find('.patreon-callout__expand-trigger').trigger('click');
      const arrow = wrapper.find('.patreon-callout__list span[aria-hidden="true"]');
      expect(arrow.exists()).toBe(true);
      expect(arrow.text()).toContain('→');
    });
  });

  describe('accessibility', () => {
    it('marks decorative SVGs with aria-hidden', () => {
      const wrapper = makeWrapper();
      const svgs = wrapper.findAll('svg');
      expect(svgs.length).toBeGreaterThan(0);
      svgs.forEach(svg => {
        expect(svg.attributes('aria-hidden')).toBe('true');
      });
    });

    it('uses a real <button> element for the expandable trigger', () => {
      // Real buttons get keyboard activation (Enter/Space) for free.
      const wrapper = makeWrapper();
      const trigger = wrapper.find('.patreon-callout__expand-trigger');
      expect(trigger.element.tagName).toBe('BUTTON');
      expect(trigger.attributes('type')).toBe('button');
    });
  });
});
