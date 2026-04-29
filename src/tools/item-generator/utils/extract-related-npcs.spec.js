/**
 * extract-related-npcs tests — focused on the pure mergeStubs helper.
 * The extractRelatedNPCs orchestrator is exercised end-to-end via the
 * RelatedNPCsSection component path; this spec covers the merge logic.
 */

import { mergeStubs } from './extract-related-npcs.mjs';

describe('mergeStubs', () => {
  it('returns a copy of existing stubs when fresh is empty', () => {
    const existing = [{ name: 'A', role_brief: 'r', context: 'c', npc_id: null, npc_folder: null }];
    const out = mergeStubs(existing, []);
    expect(out).toEqual(existing);
    expect(out).not.toBe(existing); // should be a copy
  });

  it('appends new stubs that do not match by case-insensitive name', () => {
    const existing = [{ name: 'Yelena', role_brief: 'oracle', context: '', npc_id: null, npc_folder: null }];
    const out = mergeStubs(existing, [
      { name: 'MORGHUL', role_brief: 'watcher', context: 'tends embers', source_quote: 'Morghul tends...' },
    ]);
    expect(out).toHaveLength(2);
    expect(out[1].name).toBe('MORGHUL');
    expect(out[1].source_quote).toBe('Morghul tends...');
    expect(out[1].npc_id).toBeNull();
  });

  it('refreshes role_brief, context, and source_quote on existing stub when not promoted', () => {
    const existing = [{
      name: 'Yelena', role_brief: 'old', context: 'old', source_quote: '',
      npc_id: null, npc_folder: null,
    }];
    const out = mergeStubs(existing, [
      { name: 'yelena', role_brief: 'new role', context: 'new ctx', source_quote: 'verbatim text' },
    ]);
    expect(out).toHaveLength(1);
    expect(out[0]).toMatchObject({
      name: 'Yelena',
      role_brief: 'new role',
      context: 'new ctx',
      source_quote: 'verbatim text',
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

  it('handles undefined existing array', () => {
    const out = mergeStubs(undefined, [
      { name: 'A', role_brief: 'r', context: 'c', source_quote: 's' },
    ]);
    expect(out).toHaveLength(1);
    expect(out[0].source_quote).toBe('s');
  });
});
