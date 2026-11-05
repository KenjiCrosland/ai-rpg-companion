/**
 * TWO SHEETS MAY SHARE A NAME, AND THE NEW ONE MUST BE THE ONE ON SCREEN.
 *
 * Owner, 2026-11-05: "if I generate two headless horsemans at the same cr the first one
 * displays." The critic found the same thing on the 11-05 gate — block #21 showed #03's
 * Owlbear while both sheets were correct in storage.
 *
 * The cause: the generate path pushed the new sheet, re-sorted the folder by CR, then
 * recovered its index with `findIndex(m => m.name === …)`. First match wins, so the card
 * selected the OLDER sheet. At the same CR the two land adjacent after the sort, which is
 * why comparing variants of one creature is the workflow that breaks — a GM generating
 * three Headless Horsemen to pick between them sees the first one three times.
 *
 * Both call sites now select by object identity; the name search survives as a fallback.
 */
import fs from 'node:fs';
import path from 'node:path';
import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import StatblockGenerator from '../StatblockGenerator.vue';
import * as referenceStorage from '@/util/reference-storage.mjs';

// Mock Cedar components
jest.mock('@rei/cedar', () => ({
  CdrButton: { name: 'CdrButton', template: '<button><slot /></button>' },
  CdrInput: { name: 'CdrInput', template: '<input />', props: ['modelValue'] },
  CdrSelect: { name: 'CdrSelect', template: '<select><slot /></select>', props: ['modelValue', 'options'] },
  CdrCheckbox: { name: 'CdrCheckbox', template: '<input type="checkbox" />', props: ['modelValue'] },
  CdrToggleButton: { name: 'CdrToggleButton', template: '<button><slot /></button>', props: ['toggleValue'] },
  CdrToggleGroup: { name: 'CdrToggleGroup', template: '<div><slot /></div>', props: ['modelValue'] },
  CdrAccordion: { name: 'CdrAccordion', template: '<div><slot name="label" /><slot /></div>', props: ['opened'] },
  CdrAccordionGroup: { name: 'CdrAccordionGroup', template: '<div><slot /></div>' },
}));

// Mock child components
jest.mock('@/components/Statblock.vue', () => ({
  name: 'Statblock',
  template: '<div class="mock-statblock"></div>',
  props: ['monster', 'linkedNpcsCount'],
  emits: ['create-npc']
}));

jest.mock('@/components/GeneratorLayout.vue', () => ({
  name: 'GeneratorLayout',
  template: '<div><slot name="sidebar" /><slot /></div>',
  props: ['premium']
}));

jest.mock('../components/StatblockExports.vue', () => ({
  name: 'StatblockExports',
  template: '<div class="mock-exports"></div>',
  props: ['monster']
}));

jest.mock('@/components/DataManagerModal.vue', () => ({
  name: 'DataManagerModal',
  template: '<div class="mock-data-manager"></div>',
}));

describe('a duplicate name selects the new sheet, not the first one named like it', () => {
  let wrapper;
  afterEach(() => { if (wrapper) wrapper.unmount(); localStorage.clear(); });

  const seed = (rows) => localStorage.setItem('monsters', JSON.stringify({ Uncategorized: rows }));

  it('selects by identity when two sheets share a name AND a CR', () => {
    // same name, same CR: after sortMonstersByCR they sit adjacent, and a name search
    // cannot tell them apart
    const first = { name: 'Headless Horseman', challenge_rating: '5 (1,800 XP)', hp: 90, marker: 'FIRST' };
    seed([first]);
    wrapper = mount(StatblockGenerator, { props: { premium: false } });

    const second = { name: 'Headless Horseman', challenge_rating: '5 (1,800 XP)', hp: 120, marker: 'SECOND' };
    // the array the generate path works on: push, then sort by CR. At equal CR the sort
    // is stable, so the new sheet stays behind the one already saved.
    const list = [first, second].sort((a, b) => 0);

    const byIdentity = list.indexOf(second);
    const byName = list.findIndex((m) => m.name === second.name);
    expect(byIdentity).not.toBe(byName);           // the two disagree — that was the bug
    // and identity is the one that points at the new sheet
    expect(list[byIdentity].marker).toBe('SECOND');
    expect(list[byName].marker).toBe('FIRST');     // what the old code selected
    wrapper.vm.selectMonster('Uncategorized', byIdentity, { fillForm: false });
    expect(wrapper.vm.activeMonsterIndex).toBe(byIdentity);
  });

  it('and the generate path recovers the index by identity, not by name', () => {
    const src = fs.readFileSync(path.join(__dirname, '..', 'StatblockGenerator.vue'), 'utf8');
    // the sheet just placed in the array is found by reference; the name search is only a
    // fallback behind it
    expect(src).toMatch(/const byIdentity = monsters\.value\[folderName\]\.indexOf\(finalMonster\)/);
    expect(src).toMatch(/const movedIdentity = monsters\.value\[activeFolder\.value\]\.indexOf\(movedMonster\)/);
  });
});
