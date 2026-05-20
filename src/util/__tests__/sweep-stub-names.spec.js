/**
 * @jest-environment jsdom
 */

import { sweepStubNames } from '../sweep-stub-names.mjs';

describe('sweepStubNames', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('aligns related_places stub names to the linked setting place_name', () => {
    localStorage.setItem('gameSettings', JSON.stringify([
      { id: 'set_target', place_name: 'Current Name' },
      {
        id: 'set_a',
        place_name: 'A',
        related_places: [
          { name: 'Stale Name', kind: 'sibling', promoted_setting_id: 'set_target' },
          { name: 'Unrelated', kind: 'sibling', promoted_setting_id: 'set_other' },
        ],
      },
    ]));

    sweepStubNames();

    const settings = JSON.parse(localStorage.getItem('gameSettings'));
    expect(settings[1].related_places[0].name).toBe('Current Name');
    expect(settings[1].related_places[1].name).toBe('Unrelated');
  });

  it('aligns item-side related_settings stub names', () => {
    localStorage.setItem('gameSettings', JSON.stringify([
      { id: 'set_target', place_name: 'Current Name' },
    ]));
    localStorage.setItem('savedItems', JSON.stringify([
      {
        name: 'Hearthstaff',
        related_settings: [
          { name: 'Stale Name', setting_id: 'set_target', role_brief: 'origin' },
          { name: 'Unrelated', setting_id: 'set_other' },
        ],
      },
    ]));

    sweepStubNames();

    const items = JSON.parse(localStorage.getItem('savedItems'));
    expect(items[0].related_settings[0].name).toBe('Current Name');
    expect(items[0].related_settings[0].role_brief).toBe('origin');
    expect(items[0].related_settings[1].name).toBe('Unrelated');
  });

  it('is idempotent when stub names already match the linked setting', () => {
    const initialSettings = [
      { id: 'set_target', place_name: 'Current Name' },
      {
        id: 'set_a',
        place_name: 'A',
        related_places: [
          { name: 'Current Name', promoted_setting_id: 'set_target' },
        ],
      },
    ];
    const initialItems = [
      { name: 'Item', related_settings: [{ name: 'Current Name', setting_id: 'set_target' }] },
    ];
    localStorage.setItem('gameSettings', JSON.stringify(initialSettings));
    localStorage.setItem('savedItems', JSON.stringify(initialItems));
    const beforeSettings = localStorage.getItem('gameSettings');
    const beforeItems = localStorage.getItem('savedItems');

    sweepStubNames();

    // No rewrite when nothing changed.
    expect(localStorage.getItem('gameSettings')).toBe(beforeSettings);
    expect(localStorage.getItem('savedItems')).toBe(beforeItems);
  });

  it('skips stubs that have no linked setting id', () => {
    localStorage.setItem('gameSettings', JSON.stringify([
      { id: 'set_target', place_name: 'Current Name' },
      {
        id: 'set_a',
        place_name: 'A',
        related_places: [
          { name: 'Unlinked Stub' },
          { name: 'Stale Name', promoted_setting_id: 'set_target' },
        ],
      },
    ]));

    sweepStubNames();

    const settings = JSON.parse(localStorage.getItem('gameSettings'));
    expect(settings[1].related_places[0].name).toBe('Unlinked Stub');
    expect(settings[1].related_places[1].name).toBe('Current Name');
  });

  it('skips stubs whose linked id no longer resolves to a setting', () => {
    localStorage.setItem('gameSettings', JSON.stringify([
      { id: 'set_target', place_name: 'Current Name' },
      {
        id: 'set_a',
        place_name: 'A',
        related_places: [
          { name: 'Stale Name', promoted_setting_id: 'set_deleted' },
        ],
      },
    ]));

    sweepStubNames();

    const settings = JSON.parse(localStorage.getItem('gameSettings'));
    expect(settings[1].related_places[0].name).toBe('Stale Name');
  });

  it('skips settings without a stable id when building the lookup', () => {
    localStorage.setItem('gameSettings', JSON.stringify([
      { place_name: 'No Id Setting' },
      {
        id: 'set_a',
        place_name: 'A',
        related_places: [
          { name: 'Whatever', promoted_setting_id: undefined },
        ],
      },
    ]));

    expect(() => sweepStubNames()).not.toThrow();
    const settings = JSON.parse(localStorage.getItem('gameSettings'));
    expect(settings[1].related_places[0].name).toBe('Whatever');
  });

  it('returns early when there are no settings', () => {
    expect(() => sweepStubNames()).not.toThrow();
    expect(localStorage.getItem('gameSettings')).toBeNull();
  });

  it('returns early when settings array is empty', () => {
    localStorage.setItem('gameSettings', JSON.stringify([]));
    expect(() => sweepStubNames()).not.toThrow();
    expect(JSON.parse(localStorage.getItem('gameSettings'))).toEqual([]);
  });

  it('returns early when no setting has both id and place_name', () => {
    localStorage.setItem('gameSettings', JSON.stringify([
      { id: 'set_a' },
      { place_name: 'No Id' },
    ]));
    localStorage.setItem('savedItems', JSON.stringify([
      { name: 'Item', related_settings: [{ name: 'Stale', setting_id: 'set_a' }] },
    ]));
    const beforeItems = localStorage.getItem('savedItems');

    sweepStubNames();

    expect(localStorage.getItem('savedItems')).toBe(beforeItems);
  });

  it('tolerates malformed gameSettings JSON', () => {
    localStorage.setItem('gameSettings', '{not json');
    expect(() => sweepStubNames()).not.toThrow();
  });

  it('tolerates malformed savedItems JSON', () => {
    localStorage.setItem('gameSettings', JSON.stringify([
      { id: 'set_target', place_name: 'Current Name' },
    ]));
    localStorage.setItem('savedItems', '{not json');
    expect(() => sweepStubNames()).not.toThrow();
  });

  it('walks both stores and updates multiple stubs across them in one pass', () => {
    localStorage.setItem('gameSettings', JSON.stringify([
      { id: 'set_target', place_name: 'New Name' },
      {
        id: 'set_a',
        place_name: 'A',
        related_places: [
          { name: 'Old A', promoted_setting_id: 'set_target' },
        ],
      },
      {
        id: 'set_b',
        place_name: 'B',
        related_places: [
          { name: 'Old B', promoted_setting_id: 'set_target' },
        ],
      },
    ]));
    localStorage.setItem('savedItems', JSON.stringify([
      { name: 'Item1', related_settings: [{ name: 'Old Item1', setting_id: 'set_target' }] },
      { name: 'Item2', related_settings: [{ name: 'Old Item2', setting_id: 'set_target' }] },
    ]));

    sweepStubNames();

    const settings = JSON.parse(localStorage.getItem('gameSettings'));
    expect(settings[1].related_places[0].name).toBe('New Name');
    expect(settings[2].related_places[0].name).toBe('New Name');
    const items = JSON.parse(localStorage.getItem('savedItems'));
    expect(items[0].related_settings[0].name).toBe('New Name');
    expect(items[1].related_settings[0].name).toBe('New Name');
  });

  it('skips settings whose place_name is empty or whitespace', () => {
    localStorage.setItem('gameSettings', JSON.stringify([
      { id: 'set_target', place_name: '   ' },
      {
        id: 'set_a',
        place_name: 'A',
        related_places: [
          { name: 'Should Not Change', promoted_setting_id: 'set_target' },
        ],
      },
    ]));

    sweepStubNames();

    const settings = JSON.parse(localStorage.getItem('gameSettings'));
    expect(settings[1].related_places[0].name).toBe('Should Not Change');
  });
});
