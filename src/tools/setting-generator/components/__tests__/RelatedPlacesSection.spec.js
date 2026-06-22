/**
 * @jest-environment jsdom
 *
 * RelatedPlacesSection tests — focused on the structural contract:
 * stubs grouped correctly by kind, the right action buttons fire the
 * right emits, removal goes through update flow, Features bucket is
 * populated in data but never rendered in UI.
 *
 * Open-ended visual content (group help text, etc.) isn't tested per
 * the project's test convention.
 */

import { mount } from '@vue/test-utils';
import RelatedPlacesSection from '../RelatedPlacesSection.vue';

// Lightweight stubs for the parchment primitives used in RelatedPlacesSection.
// Fallthrough attrs (including @click from the parent) bind to the root
// <button> automatically; adding an explicit @click="$emit('click')" would
// double-fire because the parent's listener lands twice (once via
// fallthrough, once via the explicit $emit).
jest.mock('@/parchment', () => ({
  ParButton: {
    name: 'ParButton',
    template: '<button type="button"><slot></slot></button>',
    props: ['variant', 'disabled'],
  },
  ParAddNewButton: {
    name: 'ParAddNewButton',
    template: '<button type="button"><slot></slot></button>',
    props: ['disabled'],
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

// Helper: find the first row-level "Create Setting" button inside the
// list (not the form's submit button, which only appears when the
// form is expanded). Since AddRelatedPlaceForm starts collapsed in
// every test below, all "Create Setting" buttons are row buttons.
function findRowCreateButtons(wrapper) {
  return wrapper.findAll('button').filter(b => b.text().trim() === 'Create Setting');
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

  it('groups stubs into Part Of / Neighbors / Contains; features are hidden', () => {
    const setting = makeSetting([
      { name: 'Krakova-Gora', kind: 'parent', role_brief: 'Volcano', source_quote: 'crowns the slope' },
      { name: 'Tverzh', kind: 'sibling', role_brief: 'Trading city' },
      { name: 'Smoke Quarter', kind: 'sublocation', role_brief: 'District' },
      { name: 'Silver Road', kind: 'feature', role_brief: 'Trade road' },
    ]);

    const wrapper = mount(RelatedPlacesSection, { props: { setting } });

    expect(wrapper.text()).toContain('Part Of');
    expect(wrapper.text()).toContain('Neighbors');
    expect(wrapper.text()).toContain('Contains');

    expect(wrapper.text()).toContain('Krakova-Gora');
    expect(wrapper.text()).toContain('Tverzh');
    expect(wrapper.text()).toContain('Smoke Quarter');

    // Features section is intentionally hidden — feature stubs exist in
    // the data layer for classification-bucket completeness but never
    // render in the UI. The stub name should NOT appear anywhere on
    // the page.
    expect(wrapper.text()).not.toContain('Features');
    expect(wrapper.text()).not.toContain('Silver Road');
  });

  it('renders the role_brief for each stub but hides source_quote from UI', () => {
    // source_quote stays in data (still feeds the promotion prompt for
    // LLM context) but isn't rendered — the card UI matches the spec
    // mockup which shows just name + role_brief + actions.
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
    expect(wrapper.text()).not.toContain('Gorod-Ognya crowns the western slope of Krakova-Gora.');
  });

  it('omits groups whose stub list is empty', () => {
    const setting = makeSetting([
      { name: 'Krakova-Gora', kind: 'parent' },
    ]);
    const wrapper = mount(RelatedPlacesSection, { props: { setting } });

    expect(wrapper.text()).toContain('Part Of');
    expect(wrapper.text()).not.toContain('Neighbors');
    expect(wrapper.text()).not.toContain('Contains');
  });

  it('routes unknown kind values into the feature bucket (which does not render)', () => {
    const setting = makeSetting([
      { name: 'Mystery Place', kind: 'unrecognized-kind' },
    ]);
    const wrapper = mount(RelatedPlacesSection, { props: { setting } });
    // The stub is bucketed into features by defensive fallback, and
    // features are not rendered — so the user sees the empty state.
    expect(wrapper.text()).toContain('No related places yet');
    expect(wrapper.text()).not.toContain('Mystery Place');
  });

  it('reads "no related places" when only feature-kind stubs are present', () => {
    // hasAnyPromotableStubs only counts parent/sibling/sublocation; a
    // setting populated only with features should still show the
    // empty-state copy.
    const setting = makeSetting([
      { name: 'Silver Road', kind: 'feature' },
      { name: 'Yavich', kind: 'feature' },
    ]);
    const wrapper = mount(RelatedPlacesSection, { props: { setting } });
    expect(wrapper.text()).toContain('No related places yet');
  });
});

describe('RelatedPlacesSection — promote button emits', () => {
  it('emits promote-related-place with kind=parent for a Part-Of row', async () => {
    const setting = makeSetting([
      { name: 'Krakova-Gora', kind: 'parent' },
    ]);
    const wrapper = mount(RelatedPlacesSection, { props: { setting } });

    const buttons = findRowCreateButtons(wrapper);
    expect(buttons).toHaveLength(1);

    await buttons[0].trigger('click');
    const events = wrapper.emitted('promote-related-place');
    expect(events).toHaveLength(1);
    expect(events[0][0].kind).toBe('parent');
    expect(events[0][0].stub.name).toBe('Krakova-Gora');
  });

  it('emits promote-related-place with kind=sibling for a Neighbors row', async () => {
    const setting = makeSetting([
      { name: 'Tverzh', kind: 'sibling' },
    ]);
    const wrapper = mount(RelatedPlacesSection, { props: { setting } });

    const buttons = findRowCreateButtons(wrapper);
    await buttons[0].trigger('click');

    const events = wrapper.emitted('promote-related-place');
    expect(events[0][0].kind).toBe('sibling');
    expect(events[0][0].stub.name).toBe('Tverzh');
  });

  it('emits promote-related-place with kind=sublocation for a Contains row', async () => {
    const setting = makeSetting([
      { name: 'Smoke Quarter', kind: 'sublocation' },
    ]);
    const wrapper = mount(RelatedPlacesSection, { props: { setting } });

    const buttons = findRowCreateButtons(wrapper);
    await buttons[0].trigger('click');

    const events = wrapper.emitted('promote-related-place');
    expect(events[0][0].kind).toBe('sublocation');
    expect(events[0][0].stub.name).toBe('Smoke Quarter');
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

    // No row-level "Create Setting" button when the stub is promoted.
    expect(findRowCreateButtons(wrapper)).toHaveLength(0);

    const viewBtn = wrapper
      .findAll('button')
      .find(b => b.text().includes('View in Setting Generator'));
    expect(viewBtn).toBeTruthy();

    await viewBtn.trigger('click');
    expect(navigateToTool).toHaveBeenCalledWith('setting-generator', { setting: 'set_krakova' });
  });
});

describe('RelatedPlacesSection — manual add form', () => {
  it('synthesizes a stub and emits promote-related-place when add-and-promote fires', async () => {
    const setting = makeSetting([]);
    const wrapper = mount(RelatedPlacesSection, { props: { setting } });

    // Simulate the AddRelatedPlaceForm child firing its event.
    const form = wrapper.findComponent({ name: 'AddRelatedPlaceForm' });
    expect(form.exists()).toBe(true);

    form.vm.$emit('add-and-promote', {
      kind: 'sibling',
      name: 'Aethelmar',
      role_brief: 'Anglo-Saxon trading port',
      suggested_setting_type: '',
    });

    const events = wrapper.emitted('promote-related-place');
    expect(events).toHaveLength(1);
    expect(events[0][0].kind).toBe('sibling');
    expect(events[0][0].stub).toEqual({
      name: 'Aethelmar',
      kind: 'sibling',
      role_brief: 'Anglo-Saxon trading port',
      source_quote: '',
      suggested_setting_type: '',
      promoted_setting_id: null,
    });
  });
});

describe('RelatedPlacesSection — remove', () => {
  it('emits remove-related-place when the × button is clicked', async () => {
    const stub = { name: 'Tverzh', kind: 'sibling' };
    const setting = makeSetting([stub]);
    const wrapper = mount(RelatedPlacesSection, { props: { setting } });

    const removeBtn = wrapper.find('.related-stub__remove');
    await removeBtn.trigger('click');

    const events = wrapper.emitted('remove-related-place');
    expect(events).toBeTruthy();
    expect(events[0][0].stub.name).toBe('Tverzh');
  });
});
