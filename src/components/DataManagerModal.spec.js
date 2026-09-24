/**
 * DataManagerModal — the free-tier upsell block.
 *
 * Scope is deliberately the upsell only, not backup/restore (covered by
 * the Playwright suite against a real browser). The regression guarded
 * here: the modal's CTA goes to the Patreon MEMBERSHIP page, which cannot
 * create a session on this site. Before the sign-in line was added, a
 * logged-out patron opening Backup/Restore had no route to premium at
 * all — they landed on Patreon, saw they were already a member, and came
 * back still logged out.
 */
import { mount } from '@vue/test-utils';
import DataManagerModal from './DataManagerModal.vue';
import { patreonTiersUrl } from '@/util/patreon-urls.mjs';
import { trackEvent } from '@/util/analytics.mjs';

jest.mock('@/util/analytics.mjs', () => ({ trackEvent: jest.fn() }));

function makeWrapper(props = {}) {
  return mount(DataManagerModal, {
    props: { opened: true, premium: false, ...props },
    // ParModal wraps its content in <Teleport to="body">, so without this
    // stub the rendered body never appears under the wrapper and every
    // `find` returns empty.
    global: { stubs: { teleport: true } },
  });
}

describe('DataManagerModal upsell', () => {
  it('shows the sign-in line to free users', () => {
    const signin = makeWrapper().find('.dm-signin');
    expect(signin.exists()).toBe(true);
    expect(signin.text()).toContain('Already a patron?');
    expect(signin.find('a').text()).toBe('Log in');
  });

  it('sends the Log in link to the Patreon flow, NOT the tiers page', () => {
    // The whole point of the fix. The tiers page cannot establish a
    // WordPress session, so pointing this at patreonTiersUrl would
    // restore the dead end.
    const href = makeWrapper().find('.dm-signin a').attributes('href');
    expect(href).toContain('https://cros.land/patreon-flow/');
    expect(href).toContain('patreon-login=yes');
    expect(href).not.toContain(patreonTiersUrl);
  });

  it('keeps the pledge CTA on the tiers page', () => {
    // The two destinations are different on purpose: pledge vs activate.
    const cta = makeWrapper().find('.dm-upsell__actions a');
    expect(cta.attributes('href')).toBe(patreonTiersUrl);
    expect(cta.text()).toContain('Support on Patreon');
  });

  it('opens the pledge CTA in a new tab but the login flow in this one', () => {
    // The login flow redirects back to this page; in a new tab the
    // original tab keeps its stale logged-out premium flag.
    const wrapper = makeWrapper();
    expect(wrapper.find('.dm-upsell__actions a').attributes('target')).toBe('_blank');
    expect(wrapper.find('.dm-signin a').attributes('target')).toBeUndefined();
  });

  it('tracks activation clicks separately from pledge clicks', async () => {
    const wrapper = makeWrapper();

    trackEvent.mockClear();
    await wrapper.find('.dm-signin a').trigger('click');
    expect(trackEvent).toHaveBeenCalledWith('patreon_login_click', { location: 'data-manager' });

    trackEvent.mockClear();
    await wrapper.find('.dm-upsell__actions a').trigger('click');
    expect(trackEvent).toHaveBeenCalledWith('patreon_click', { location: 'data-manager' });
  });

  it('hides the whole upsell, sign-in line included, for premium users', () => {
    const wrapper = makeWrapper({ premium: true });
    expect(wrapper.find('.dm-upsell').exists()).toBe(false);
    expect(wrapper.find('.dm-signin').exists()).toBe(false);
  });
});
