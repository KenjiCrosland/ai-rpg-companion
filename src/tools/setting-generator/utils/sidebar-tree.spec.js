/**
 * Tests for sidebar-tree helpers.
 *
 * sortUnnamedToBottom: pure tree mutation — verify ordering at each
 * level, stability within buckets, recursion into children.
 *
 * siblingIdsToReparent: pure lookup — verify the cascade picks up
 * sibling stubs that match the constraint set, skips ones that don't.
 */

import {
  sortUnnamedToBottom,
  siblingIdsToReparent,
} from './sidebar-tree.mjs';

describe('sortUnnamedToBottom', () => {
  it('moves unnamed entries to the bottom of a single level', () => {
    const tree = [
      { id: 'a', place_name: 'Alpha', children: [] },
      { id: 'b', place_name: '', children: [] },        // unnamed
      { id: 'c', place_name: 'Charlie', children: [] },
      { id: 'd', place_name: null, children: [] },      // unnamed
    ];
    sortUnnamedToBottom(tree);
    expect(tree.map(n => n.id)).toEqual(['a', 'c', 'b', 'd']);
  });

  it('preserves insertion order within the named bucket (stable sort)', () => {
    const tree = [
      { id: 'first', place_name: 'A', children: [] },
      { id: 'second', place_name: 'B', children: [] },
      { id: 'third', place_name: 'C', children: [] },
    ];
    sortUnnamedToBottom(tree);
    expect(tree.map(n => n.id)).toEqual(['first', 'second', 'third']);
  });

  it('preserves insertion order within the unnamed bucket', () => {
    const tree = [
      { id: 'u1', place_name: '', children: [] },
      { id: 'u2', place_name: '', children: [] },
      { id: 'n', place_name: 'Named', children: [] },
      { id: 'u3', place_name: '', children: [] },
    ];
    sortUnnamedToBottom(tree);
    expect(tree.map(n => n.id)).toEqual(['n', 'u1', 'u2', 'u3']);
  });

  it('recurses into children so deep unnamed nodes sort too', () => {
    const tree = [
      {
        id: 'kingdom',
        place_name: 'Kingdom',
        children: [
          { id: 'city-unnamed', place_name: '', children: [] },
          { id: 'city-suzail', place_name: 'Suzail', children: [
            { id: 'district-unnamed', place_name: '', children: [] },
            { id: 'district-named', place_name: 'Market', children: [] },
          ] },
        ],
      },
    ];
    sortUnnamedToBottom(tree);
    expect(tree[0].children.map(n => n.id)).toEqual(['city-suzail', 'city-unnamed']);
    expect(tree[0].children[0].children.map(n => n.id)).toEqual(['district-named', 'district-unnamed']);
  });

  it('treats whitespace-only place_name as unnamed', () => {
    const tree = [
      { id: 'whitespace', place_name: '   ', children: [] },
      { id: 'real', place_name: 'Real', children: [] },
    ];
    sortUnnamedToBottom(tree);
    expect(tree.map(n => n.id)).toEqual(['real', 'whitespace']);
  });

  it('handles non-array input without throwing', () => {
    expect(() => sortUnnamedToBottom(null)).not.toThrow();
    expect(() => sortUnnamedToBottom(undefined)).not.toThrow();
    expect(() => sortUnnamedToBottom({})).not.toThrow();
  });

  it('leaves a fully-named single-level tree untouched', () => {
    const tree = [
      { id: 'a', place_name: 'A', children: [] },
      { id: 'b', place_name: 'B', children: [] },
      { id: 'c', place_name: 'C', children: [] },
    ];
    sortUnnamedToBottom(tree);
    expect(tree.map(n => n.id)).toEqual(['a', 'b', 'c']);
  });
});

describe('siblingIdsToReparent', () => {
  // The scenario in the user's report: source is at parentId=null
  // (top-level); a sibling was promoted from source.related_places
  // and is also at parentId=null. When source gets a new parent, the
  // sibling should follow.
  it('returns ids of promoted siblings still at the source\'s old parent', () => {
    const sourceOldParentId = null;
    const source = {
      id: 'set_source',
      parentId: 'set_new_parent', // already updated by caller; old level was null
      related_places: [
        { name: 'Tverzh', kind: 'sibling', promoted_setting_id: 'set_tverzh' },
        { name: 'Aethelmar', kind: 'sibling', promoted_setting_id: 'set_aethelmar' },
      ],
    };
    const settings = [
      source,
      { id: 'set_tverzh', parentId: null },
      { id: 'set_aethelmar', parentId: null },
      { id: 'set_unrelated', parentId: null }, // not in source.related_places
    ];

    const ids = siblingIdsToReparent({ settings, source, oldParentId: sourceOldParentId });
    expect(ids.sort()).toEqual(['set_aethelmar', 'set_tverzh']);
  });

  it('skips siblings the user has manually moved to a different parent', () => {
    const source = {
      id: 'set_source',
      related_places: [
        { name: 'Tverzh', kind: 'sibling', promoted_setting_id: 'set_tverzh' },
        { name: 'Aethelmar', kind: 'sibling', promoted_setting_id: 'set_aethelmar' },
      ],
    };
    const settings = [
      source,
      // Tverzh still at the old level — eligible.
      { id: 'set_tverzh', parentId: null },
      // Aethelmar got manually re-parented to a different setting since
      // promotion. Don't override that user choice.
      { id: 'set_aethelmar', parentId: 'set_other_parent' },
    ];

    const ids = siblingIdsToReparent({ settings, source, oldParentId: null });
    expect(ids).toEqual(['set_tverzh']);
  });

  it('skips sibling stubs that were never promoted (promoted_setting_id null)', () => {
    const source = {
      id: 'set_source',
      related_places: [
        { name: 'Promoted', kind: 'sibling', promoted_setting_id: 'set_promoted' },
        { name: 'Unpromoted', kind: 'sibling', promoted_setting_id: null },
      ],
    };
    const settings = [
      source,
      { id: 'set_promoted', parentId: null },
    ];
    const ids = siblingIdsToReparent({ settings, source, oldParentId: null });
    expect(ids).toEqual(['set_promoted']);
  });

  it('skips stubs whose kind is not "sibling"', () => {
    const source = {
      id: 'set_source',
      related_places: [
        { name: 'Should-Move', kind: 'sibling', promoted_setting_id: 'set_sib' },
        { name: 'Should-Not', kind: 'sublocation', promoted_setting_id: 'set_sub' },
        { name: 'Should-Not-Either', kind: 'parent', promoted_setting_id: 'set_par' },
      ],
    };
    const settings = [
      source,
      { id: 'set_sib', parentId: null },
      { id: 'set_sub', parentId: null },
      { id: 'set_par', parentId: null },
    ];
    const ids = siblingIdsToReparent({ settings, source, oldParentId: null });
    expect(ids).toEqual(['set_sib']);
  });

  it('handles non-null oldParentId (nested cascade)', () => {
    // Scenario: source is currently a child of kingdom (parentId =
    // set_kingdom). User creates a new region between them. Sibling
    // settings that were also under set_kingdom should follow source
    // into the new region.
    const source = {
      id: 'set_city_a',
      related_places: [
        { name: 'City B', kind: 'sibling', promoted_setting_id: 'set_city_b' },
      ],
    };
    const settings = [
      source,
      { id: 'set_city_b', parentId: 'set_kingdom' },
      { id: 'set_unrelated_city', parentId: 'set_kingdom' }, // not a sibling stub
    ];
    const ids = siblingIdsToReparent({
      settings,
      source,
      oldParentId: 'set_kingdom',
    });
    expect(ids).toEqual(['set_city_b']);
  });

  it('returns empty array on missing inputs', () => {
    expect(siblingIdsToReparent({ settings: [], source: null, oldParentId: null })).toEqual([]);
    expect(siblingIdsToReparent({ settings: null, source: {}, oldParentId: null })).toEqual([]);
    expect(siblingIdsToReparent({ settings: [], source: { id: 'x' }, oldParentId: null })).toEqual([]);
  });

  it('treats undefined oldParentId as null', () => {
    const source = {
      id: 'set_source',
      related_places: [
        { name: 'Sib', kind: 'sibling', promoted_setting_id: 'set_sib' },
      ],
    };
    const settings = [source, { id: 'set_sib', parentId: null }];
    const ids = siblingIdsToReparent({ settings, source, oldParentId: undefined });
    expect(ids).toEqual(['set_sib']);
  });
});
