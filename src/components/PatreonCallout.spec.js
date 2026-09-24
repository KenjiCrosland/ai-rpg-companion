import { mount } from '@vue/test-utils';
import PatreonCallout from './PatreonCallout.vue';
import { trackEvent } from '@/util/analytics.mjs';
import { patreonTiersUrl } from '@/util/patreon-urls.mjs';

jest.mock('@/util/analytics.mjs', () => ({ trackEvent: jest.fn() }));

function makeWrapper(props = {}) {
  return mount(PatreonCallout, { props });
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

    it('sends the action button to the Patreon pledge page', () => {
      // "Support on Patreon" must land where you can actually pledge. It
      // used to take a `patreonUrl` prop, which every tool filled with the
      // OAuth login flow — so the button skipped the pledge page entirely.
      // The bullet list also contains an <a>, so target the button by its
      // par-button class to avoid matching the wrong anchor.
      const wrapper = makeWrapper();
      const action = wrapper.find('.par-button');
      expect(action.attributes('href')).toBe(patreonTiersUrl);
    });

    it('opens the pledge page in a new tab, safely', () => {
      // Matches DataManagerModal's CTA and every "See all premium tiers"
      // link. The tool page is mid-work; leaving it in place matters.
      const action = makeWrapper().find('.par-button');
      expect(action.attributes('target')).toBe('_blank');
      expect(action.attributes('rel')).toContain('noopener');
    });

    it('renders the action button as <a>, not <button>', () => {
      // tag="a" on the ParButton — required for navigation.
      const wrapper = makeWrapper();
      const action = wrapper.find('.par-button');
      expect(action.exists()).toBe(true);
      expect(action.element.tagName).toBe('A');
      expect(action.text()).toContain('Support on Patreon');
    });

    it('renders the action button in the luminous variant', () => {
      const wrapper = makeWrapper();
      const action = wrapper.find('.par-button');
      expect(action.classes()).toContain('par-button--variant-luminous');
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
        props: {},
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
        props: {},
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
          <PatreonCallout>
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
          <PatreonCallout>
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

  describe('sign-in line', () => {
    // Why this exists: an existing patron who is logged out reads
    // "Support on Patreon" as "pay again" and never clicks it, so they
    // never reach the only flow that creates a session. The qualifier
    // phrase is what routes them.
    it('renders the "Already a patron?" line with a Log in link', () => {
      const wrapper = makeWrapper();
      const signin = wrapper.find('.patreon-callout__signin');
      expect(signin.exists()).toBe(true);
      expect(signin.text()).toContain('Already a patron?');
      expect(signin.text()).toContain('activate premium in this browser');
      expect(signin.find('a').text()).toBe('Log in');
    });

    it('sends Log in to the Patreon flow, a different place than the CTA', () => {
      // Two audiences, two destinations. The pledge page cannot create a
      // session here, and the login flow does not take a pledge, so a
      // single destination cannot serve both readers.
      const wrapper = makeWrapper();
      const login = wrapper.find('.patreon-callout__signin a').attributes('href');
      expect(login).toContain('https://cros.land/patreon-flow/');
      expect(login).toContain('patreon-login=yes');
      expect(login).not.toContain(patreonTiersUrl);
      expect(wrapper.find('.par-button').attributes('href')).toBe(patreonTiersUrl);
    });

    it('does not open the login flow in a new tab', () => {
      // The flow redirects back to this page. In a new tab the original
      // tab keeps its stale logged-out premium flag.
      const wrapper = makeWrapper();
      expect(wrapper.find('.patreon-callout__signin a').attributes('target')).toBeUndefined();
    });

    it('fires a distinct analytics event from the pledge CTA', async () => {
      // Both navigate to the same URL, so a shared event would make it
      // impossible to tell activation attempts from pledge intent — which
      // is the one question this line was added to answer.
      trackEvent.mockClear();
      const wrapper = makeWrapper({ location: 'item-footer' });
      await wrapper.find('.patreon-callout__signin a').trigger('click');
      expect(trackEvent).toHaveBeenCalledWith('patreon_login_click', { location: 'item-footer' });

      trackEvent.mockClear();
      await wrapper.find('.par-button').trigger('click');
      expect(trackEvent).toHaveBeenCalledWith('patreon_click', { location: 'item-footer' });
    });

    it('renders even when the body and aside slots are suppressed', () => {
      // The stripped-down inline limit-reached shape (dungeon
      // NPCsTab/MonstersTab) is exactly where a blocked patron lands.
      const wrapper = mount({
        components: { PatreonCallout },
        template: `
          <PatreonCallout>
            <template #body></template>
            <template #aside></template>
          </PatreonCallout>
        `,
      });
      expect(wrapper.find('.patreon-callout__signin').exists()).toBe(true);
    });
  });

  describe('features slot', () => {
    it('renders custom slot content instead of the default bullets when #features is provided', async () => {
      const wrapper = mount(PatreonCallout, {
        props: {},
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
