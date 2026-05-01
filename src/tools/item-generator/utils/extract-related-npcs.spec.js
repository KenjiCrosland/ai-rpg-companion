/**
 * extract-related-npcs tests — focused on the pure mergeStubs helper.
 * The extractRelatedNPCs orchestrator is exercised end-to-end via the
 * RelatedNPCsSection component path; this spec covers the merge logic.
 */

import { mergeStubs } from './extract-related-npcs.mjs';

describe('mergeStubs (rescan reconciliation)', () => {
  it('preserves all promoted stubs even when fresh extraction is empty', () => {
    const existing = [
      { name: 'Yelena', role_brief: 'oracle', context: 'old', source_quote: '',
        npc_id: 'npc_yel', npc_folder: 'Uncategorized' },
      { name: 'Morghul', role_brief: 'watcher', context: '', source_quote: '',
        npc_id: 'npc_mor', npc_folder: 'Cult' },
    ];
    const out = mergeStubs(existing, []);
    expect(out).toHaveLength(2);
    expect(out.map(s => s.npc_id)).toEqual(['npc_yel', 'npc_mor']);
  });

  it('drops unpromoted existing stubs that are absent from the fresh extraction', () => {
    const existing = [
      { name: 'Stale Variant', role_brief: 'old', context: '', npc_id: null, npc_folder: null },
    ];
    const out = mergeStubs(existing, [
      { name: 'Different Name', role_brief: 'fresh', context: 'fresh', source_quote: 'q' },
    ]);
    expect(out).toHaveLength(1);
    expect(out[0].name).toBe('Different Name');
  });

  it('replaces unpromoted existing stub fields with the fresh values when names match', () => {
    const existing = [{
      name: 'Yelena', role_brief: 'old', context: 'old', source_quote: 'old quote',
      npc_id: null, npc_folder: null,
    }];
    const out = mergeStubs(existing, [
      { name: 'yelena', role_brief: 'new role', context: 'new ctx', source_quote: 'new quote' },
    ]);
    expect(out).toHaveLength(1);
    expect(out[0]).toMatchObject({
      name: 'yelena',
      role_brief: 'new role',
      context: 'new ctx',
      source_quote: 'new quote',
      npc_id: null,
    });
  });

  it('NEVER overwrites a stub that has been promoted to a real NPC', () => {
    const existing = [{
      name: 'Yelena', role_brief: 'oracle', context: 'old', source_quote: 'old quote',
      npc_id: 'npc_existing', npc_folder: 'Uncategorized',
    }];
    const out = mergeStubs(existing, [
      { name: 'Yelena', role_brief: 'replaced', context: 'replaced', source_quote: 'replaced quote' },
    ]);
    expect(out).toHaveLength(1);
    expect(out[0]).toMatchObject({
      role_brief: 'oracle',
      context: 'old',
      source_quote: 'old quote',
      npc_id: 'npc_existing',
    });
  });

  it('drops fresh stubs whose name matches a promoted stub (no unpromoted twin)', () => {
    const existing = [{
      name: 'Yelena', role_brief: 'oracle', context: '', source_quote: '',
      npc_id: 'npc_yel', npc_folder: 'Uncategorized',
    }];
    const out = mergeStubs(existing, [
      { name: 'YELENA', role_brief: 'twin would resurrect', context: '', source_quote: '' },
      { name: 'New Person', role_brief: 'newcomer', context: '', source_quote: '' },
    ]);
    expect(out).toHaveLength(2);
    // Promoted survives intact; fresh "YELENA" was dropped.
    expect(out[0]).toMatchObject({ name: 'Yelena', npc_id: 'npc_yel' });
    expect(out[1].name).toBe('New Person');
  });

  it('appends fresh stubs that do not collide with any promoted stub', () => {
    const existing = [];
    const out = mergeStubs(existing, [
      { name: 'MORGHUL', role_brief: 'watcher', context: 'tends embers', source_quote: 'Morghul tends...' },
    ]);
    expect(out).toHaveLength(1);
    expect(out[0]).toMatchObject({
      name: 'MORGHUL',
      role_brief: 'watcher',
      source_quote: 'Morghul tends...',
      npc_id: null,
    });
  });

  it('dedups within the fresh array by case-insensitive name', () => {
    const out = mergeStubs([], [
      { name: 'Dragana', role_brief: 'first', context: '', source_quote: '' },
      { name: 'DRAGANA', role_brief: 'duplicate-defensive', context: '', source_quote: '' },
    ]);
    expect(out).toHaveLength(1);
    expect(out[0].name).toBe('Dragana');
  });

  it('handles undefined existing array', () => {
    const out = mergeStubs(undefined, [
      { name: 'A', role_brief: 'r', context: 'c', source_quote: 's' },
    ]);
    expect(out).toHaveLength(1);
    expect(out[0].source_quote).toBe('s');
  });

  it('returns a new array (does not mutate the existing input)', () => {
    const existing = [
      { name: 'Yelena', role_brief: 'oracle', context: '', source_quote: '',
        npc_id: 'npc_yel', npc_folder: 'Uncategorized' },
    ];
    const out = mergeStubs(existing, []);
    expect(out).not.toBe(existing);
    expect(out[0]).not.toBe(existing[0]);
  });
});
