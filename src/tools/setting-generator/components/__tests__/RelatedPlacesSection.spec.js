/**
 * @jest-environment jsdom
 *
 * RelatedPlacesSection tests — focused on the structural contract:
 * stubs grouped correctly by kind, the right action buttons fire the
 * right emits, removal goes through update flow.
 *
 * Open-ended visual content (group help text, etc.) isn't tested per
 * the project's test convention.
 */

import { mount } from '@vue/test-utils';
import RelatedPlacesSection from '../RelatedPlacesSection.vue';

// Lightweight stub for ParCardButton. Fallthrough attrs (including
// @click from the parent) bind to the root <button> automatically;
// adding an explicit @click="$emit('click')" would double-fire because
// the parent's listener lands twice (once via fallthrough, once via
// the explicit $emit).
jest.mock('@/parchment', () => ({
  ParCardButton: {
    name: 'ParCardButton',
    template: '<button type="button"><slot></slot></button>',
  },
}));

// navigateToTool is a side-effect — stub it.
jest.mock('@/util/navigation.mjs', () => ({
  navigateToTool: jest.fn(),
}));

const { navigateToTool } = require('@/util/navigation.mjs');

function makeSetting(related_places = []) {
  return {
    id: 'set_current',
    place_name: 'Gorod-Ognya',
    setting_overview: { name: 'Gorod-Ognya' },
    related_places,
  };
}

describe('RelatedPlacesSection — rendering by kind', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('shows the empty state when related_places is missing or empty', () => {
    const wrapper = mount(RelatedPlacesSection, {
      props: { setting: makeSetting([]) },
    });
    expect(wrapper.text()).toContain('No related places yet');
  });

  it('groups stubs into Within / Adjacent / Contains / Features', () => {
    const setting = makeSetting([
      { name: 'Krakova-Gora', kind: 'parent', role_brief: 'Volcano', source_quote: 'crowns the slope' },
      { name: 'Tverzh', kind: 'sibling', role_brief: 'Trading city' },
      { name: 'Smoke Quarter', kind: 'sublocation', role_brief: 'District' },
      { name: 'Silver Road', kind: 'feature', role_brief: 'Trade road' },
    ]);

    const wrapper = mount(RelatedPlacesSection, { props: { setting } });

    expect(wrapper.text()).toContain('Within');
    expect(wrapper.text()).toContain('Adjacent');
    expect(wrapper.text()).toContain('Contains');
    expect(wrapper.text()).toContain('Features');

    expect(wrapper.text()).toContain('Krakova-Gora');
    expect(wrapper.text()).toContain('Tverzh');
    expect(wrapper.text()).toContain('Smoke Quarter');
    expect(wrapper.text()).toContain('Silver Road');
  });

  it('renders the source_quote and role_brief for each stub', () => {
    const setting = makeSetting([
      {
        name: 'Krakova-Gora',
        kind: 'parent',
        role_brief: 'Dormant volcano the city crowns',
        source_quote: 'Gorod-Ognya crowns the western slope of Krakova-Gora.',
      },
    ]);

    const wrapper = mount(RelatedPlacesSection, { props: { setting } });
    expect(wrapper.text()).toContain('Dormant volcano the city crowns');
    expect(wrapper.text()).toContain('Gorod-Ognya crowns the western slope of Krakova-Gora.');
  });

  it('omits groups whose stub list is empty', () => {
    const setting = makeSetting([
      { name: 'Krakova-Gora', kind: 'parent' },
    ]);
    const wrapper = mount(RelatedPlacesSection, { props: { setting } });

    expect(wrapper.text()).toContain('Within');
    expect(wrapper.text()).not.toContain('Adjacent');
    expect(wrapper.text()).not.toContain('Contains');
    expect(wrapper.text()).not.toContain('Features');
  });

  it('routes unknown kind values into the Features bucket (defensive)', () => {
    const setting = makeSetting([
      { name: 'Mystery Place', kind: 'unrecognized-kind' },
    ]);
    const wrapper = mount(RelatedPlacesSection, { props: { setting } });
    expect(wrapper.text()).toContain('Features');
    expect(wrapper.text()).toContain('Mystery Place');
  });
});

describe('RelatedPlacesSection — promote button labels and emits', () => {
  it('emits promote-related-place with kind=parent when "Create as Parent" is clicked', async () => {
    const setting = makeSetting([
      { name: 'Krakova-Gora', kind: 'parent' },
    ]);
    const wrapper = mount(RelatedPlacesSection, { props: { setting } });

    const btn = wrapper
      .findAll('button')
      .find(b => b.text().includes('Create as Parent'));
    expect(btn).toBeTruthy();

    await btn.trigger('click');
    const events = wrapper.emitted('promote-related-place');
    expect(events).toBeTruthy();
    expect(events).toHaveLength(1);
    expect(events[0][0].kind).toBe('parent');
    expect(events[0][0].stub.name).toBe('Krakova-Gora');
  });

  it('emits promote-related-place with kind=sibling when "Create as Sibling" is clicked', async () => {
    const setting = makeSetting([
      { name: 'Tverzh', kind: 'sibling' },
    ]);
    const wrapper = mount(RelatedPlacesSection, { props: { setting } });

    const btn = wrapper
      .findAll('button')
      .find(b => b.text().includes('Create as Sibling'));
    await btn.trigger('click');

    const events = wrapper.emitted('promote-related-place');
    expect(events[0][0].kind).toBe('sibling');
    expect(events[0][0].stub.name).toBe('Tverzh');
  });

  it('emits promote-related-place with kind=sublocation when "Create as Sublocation" is clicked', async () => {
    const setting = makeSetting([
      { name: 'Smoke Quarter', kind: 'sublocation' },
    ]);
    const wrapper = mount(RelatedPlacesSection, { props: { setting } });

    const btn = wrapper
      .findAll('button')
      .find(b => b.text().includes('Create as Sublocation'));
    await btn.trigger('click');

    const events = wrapper.emitted('promote-related-place');
    expect(events[0][0].kind).toBe('sublocation');
    expect(events[0][0].stub.name).toBe('Smoke Quarter');
  });

  it('does NOT render a promote button for feature kind', () => {
    const setting = makeSetting([
      { name: 'Silver Road', kind: 'feature' },
    ]);
    const wrapper = mount(RelatedPlacesSection, { props: { setting } });

    const promote = wrapper
      .findAll('button')
      .find(b => /Create as|Promote/.test(b.text()));
    expect(promote).toBeUndefined();
  });

  it('shows "View in Setting Generator" instead of Create when promoted_setting_id is present', async () => {
    const setting = makeSetting([
      {
        name: 'Krakova-Gora',
        kind: 'parent',
        promoted_setting_id: 'set_krakova',
      },
    ]);
    const wrapper = mount(RelatedPlacesSection, { props: { setting } });

    const createBtn = wrapper
      .findAll('button')
      .find(b => b.text().includes('Create as Parent'));
    expect(createBtn).toBeUndefined();

    const viewBtn = wrapper
      .findAll('button')
      .find(b => b.text().includes('View in Setting Generator'));
    expect(viewBtn).toBeTruthy();

    await viewBtn.trigger('click');
    expect(navigateToTool).toHaveBeenCalledWith('setting-generator', { setting: 'set_krakova' });
  });
});

describe('RelatedPlacesSection — remove', () => {
  it('emits remove-related-place when the × button is clicked', async () => {
    const stub = { name: 'Tverzh', kind: 'sibling' };
    const setting = makeSetting([stub]);
    const wrapper = mount(RelatedPlacesSection, { props: { setting } });

    const removeBtn = wrapper.find('.related-place-remove');
    await removeBtn.trigger('click');

    const events = wrapper.emitted('remove-related-place');
    expect(events).toBeTruthy();
    expect(events[0][0].stub.name).toBe('Tverzh');
  });
});
