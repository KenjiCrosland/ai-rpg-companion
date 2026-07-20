/**
 * Statblock2024 display component tests — build-order step 5, category 4,
 * plus the inline-edit surface (2026-07-19). DOM structure and data binding
 * only; the visual look is verified by screenshot review.
 */
import { mount, flushPromises } from '@vue/test-utils';
import Statblock2024 from '@/components/Statblock2024.vue';
import * as aiClient from '@/util/ai-client.mjs';
import monsters from '@/data/srd52-monsters.json';

jest.mock('@/util/ai-client.mjs', () => ({
  generateGptResponse: jest.fn(),
}));

const byName = (name) => monsters.find((m) => m.name === name);

const mountCard = (monster, props = {}) =>
  mount(Statblock2024, { props: { monster, ...props } });

describe('Statblock2024', () => {
  describe('header and vitals (Aboleth)', () => {
    const wrapper = mountCard(byName('Aboleth'));

    test('name and subtitle', () => {
      expect(wrapper.find('.sb24-name').text()).toBe('Aboleth');
      expect(wrapper.find('.sb24-subtitle').text()).toBe('Large Aberration, Lawful Evil');
    });

    test('AC and Initiative share a line with bonus + passive score', () => {
      const line = wrapper.find('.sb24-line--split').text();
      expect(line).toContain('AC 17');
      expect(line).toContain('Initiative +3 (13)');
    });

    test('HP with formula and CR line', () => {
      expect(wrapper.text()).toContain('HP 150 (20d10 + 40)');
      expect(wrapper.text()).toContain('CR 10 (XP 5,900; PB +4)');
    });
  });

  describe('ability grid', () => {
    const wrapper = mountCard(byName('Aboleth'));

    test('three columns in official STR/INT · DEX/WIS · CON/CHA order', () => {
      const cols = wrapper.findAll('.sb24-ability-col');
      expect(cols).toHaveLength(3);
      const abbrs = (col) => col.findAll('.sb24-ability-abbr').map((a) => a.text());
      expect(abbrs(cols[0])).toEqual(['STR', 'INT']);
      expect(abbrs(cols[1])).toEqual(['DEX', 'WIS']);
      expect(abbrs(cols[2])).toEqual(['CON', 'CHA']);
    });

    test('cells carry score, signed mod, and save (proficient save differs from mod)', () => {
      const dexCell = wrapper.findAll('.sb24-ability-cell').find((c) => c.text().includes('DEX'));
      expect(dexCell.find('.sb24-ability-score').text()).toBe('9');
      expect(dexCell.find('.sb24-ability-mod').text()).toBe('-1');
      expect(dexCell.find('.sb24-ability-save').text()).toBe('+3');
    });

    test('missing saves fall back to the plain mod', () => {
      const noSaves = { ...byName('Aboleth'), saves: undefined };
      const w = mountCard(noSaves);
      const strCell = w.findAll('.sb24-ability-cell').find((c) => c.text().includes('STR'));
      expect(strCell.find('.sb24-ability-save').text()).toBe('+5');
    });
  });

  describe('sections and entries', () => {
    const wrapper = mountCard(byName('Aboleth'));

    test('sections render in canonical order', () => {
      const titles = wrapper.findAll('.sb24-section-title').map((t) => t.text());
      expect(titles).toEqual(['Traits', 'Actions', 'Legendary Actions']);
    });

    test('entry names are bold-italic with trailing period', () => {
      const first = wrapper.find('.sb24-entry');
      expect(first.find('strong em').text()).toBe('Amphibious.');
    });

    test('SRD markdown italics render as em elements', () => {
      expect(wrapper.html()).toContain('<em>Melee Attack Roll:</em>');
    });

    test('legendary_uses renders the uses preamble in the Legendary Actions section', () => {
      expect(wrapper.text()).not.toContain('Legendary Action Uses'); // SRD block, no field
      const generated = mountCard({ ...byName('Aboleth'), legendary_uses: 3 });
      expect(generated.text()).toContain('Legendary Action Uses: 3.');
    });
  });

  describe('optional fields and role chip', () => {
    test('absent detail lines are omitted; subtype renders', () => {
      const wrapper = mountCard(byName('Allosaurus'));
      expect(wrapper.text()).not.toContain('Languages');
      expect(wrapper.text()).not.toContain('Resistances');
      expect(wrapper.find('.sb24-subtitle').text()).toBe('Large Beast (Dinosaur), Unaligned');
    });

    test('support archetype shows the solo warning; others do not', () => {
      const support = mountCard({ ...byName('Aboleth'), archetype: 'support', archetype_source: 'user' });
      expect(support.find('.sb24-solo-note').text()).toContain('underperform');
      const brute = mountCard({ ...byName('Aboleth'), archetype: 'brute', archetype_source: 'user' });
      expect(brute.find('.sb24-solo-note').exists()).toBe(false);
    });

    test('no role chip renders even with archetype fields (owner call: noise)', () => {
      const auto = mountCard({ ...byName('Aboleth'), archetype: 'lurker', archetype_source: 'auto' });
      expect(auto.find('.sb24-role').exists()).toBe(false);
      expect(auto.text()).not.toContain('Role:');
    });
  });

  describe('inline editing', () => {
    beforeEach(() => jest.clearAllMocks());

    // A 2024-engine-shaped monster (cr/archetype present for band hints).
    const engineMonster = () => ({
      ...JSON.parse(JSON.stringify(monsters.find((m) => m.name === 'Aboleth'))),
      cr: 10, archetype: 'controller', archetype_source: 'auto', format: '2024',
    });

    const enterEdit = async (monster, props = {}) => {
      const wrapper = mount(Statblock2024, { props: { monster, premium: true, ...props } });
      await wrapper.find('[data-testid="edit-statblock"]').trigger('click');
      return wrapper;
    };

    test('edit mode shows the form; save emits update-monster', async () => {
      const wrapper = await enterEdit(engineMonster());
      expect(wrapper.find('[data-testid="sb24-edit-form"]').exists()).toBe(true);
      await wrapper.find('[data-testid="save-edit"]').trigger('click');
      expect(wrapper.emitted('update-monster')).toHaveLength(1);
    });

    test('score edits recompute saves, preserving proficiency', async () => {
      const wrapper = await enterEdit(engineMonster());
      // Aboleth: STR 21 (save +5 = mod, NOT proficient), DEX 9 (save +3 = mod+4, proficient).
      await wrapper.find('[data-testid="edit-STR"]').setValue(25);
      await wrapper.find('[data-testid="edit-DEX"]').setValue(15);
      await wrapper.find('[data-testid="save-edit"]').trigger('click');
      const saved = wrapper.emitted('update-monster')[0][0];
      expect(saved.saves.STR).toBe(7);       // new mod, still unproficient
      expect(saved.saves.DEX).toBe(2 + 4);   // new mod + PB, proficiency kept
      expect(saved.initiative_bonus).toBe(2); // follows DEX
      expect(saved.initiative_score).toBe(12);
    });

    test('band hints appear for off-budget numbers and do not block saving', async () => {
      const wrapper = await enterEdit(engineMonster());
      expect(wrapper.find('[data-testid="band-hints"]').exists()).toBe(false);
      await wrapper.find('[data-testid="edit-ac"]').setValue(25); // controller CR 10 budget is 17
      expect(wrapper.find('[data-testid="band-hints"]').text()).toContain('AC');
      await wrapper.find('[data-testid="save-edit"]').trigger('click');
      expect(wrapper.emitted('update-monster')[0][0].ac).toBe(25); // hint, not a block
    });

    test('entries can be edited, added, and removed', async () => {
      const wrapper = await enterEdit(engineMonster());
      const textarea = wrapper.findAll('textarea')[0];
      await textarea.setValue('It breathes air and water, begrudgingly.');
      const addButtons = wrapper.findAll('button').filter((b) => b.text().startsWith('+ Add to'));
      await addButtons[0].trigger('click'); // add a Trait
      await wrapper.find('[data-testid="save-edit"]').trigger('click');
      const saved = wrapper.emitted('update-monster')[0][0];
      expect(saved.sections.Traits[0].text).toContain('begrudgingly');
      expect(saved.sections.Traits.some((e) => e.name === 'New Ability')).toBe(true);
    });

    test('per-entry AI re-roll replaces the entry via the engine', async () => {
      aiClient.generateGptResponse.mockResolvedValue(
        JSON.stringify({ name: 'Slime Sheen', text: 'Its hide glistens with mucous light.' })
      );
      const wrapper = await enterEdit(engineMonster());
      await wrapper.find('[data-testid="reroll-Traits-0"]').trigger('click');
      await flushPromises();
      expect(aiClient.generateGptResponse).toHaveBeenCalledTimes(1);
      await wrapper.find('[data-testid="save-edit"]').trigger('click');
      const saved = wrapper.emitted('update-monster')[0][0];
      expect(saved.sections.Traits[0]).toEqual({ name: 'Slime Sheen', text: 'Its hide glistens with mucous light.' });
    });

    test('whole-section re-roll replaces the section via the engine', async () => {
      // Fixture sized to the real slot plan so the section re-roll's count
      // check passes; text is number-free so the pseudo-block lint is clean.
      const { slotPlanFor } = require('@/tools/statblock-generator/chassis/slot-plan.mjs');
      const range = slotPlanFor(10, 'controller').traits;
      const fixture = Array.from({ length: range.min }, (_, i) => ({
        name: `Dirge Verse ${i + 1}`, text: 'The creature hums a tuneless dirge.',
      }));
      aiClient.generateGptResponse.mockResolvedValue(JSON.stringify(fixture));
      const wrapper = await enterEdit(engineMonster());
      await wrapper.find('[data-testid="reroll-section-Traits"]').trigger('click');
      await flushPromises();
      expect(aiClient.generateGptResponse).toHaveBeenCalledTimes(1);
      await wrapper.find('[data-testid="save-edit"]').trigger('click');
      const saved = wrapper.emitted('update-monster')[0][0];
      expect(saved.sections.Traits).toEqual(fixture);
    });

    test('re-roll is premium-gated; manual editing is not', async () => {
      jest.spyOn(window, 'alert').mockImplementation(() => {});
      const wrapper = await enterEdit(engineMonster(), { premium: false });
      expect(wrapper.find('[data-testid="sb24-edit-form"]').exists()).toBe(true); // editing open to all
      await wrapper.find('[data-testid="reroll-Traits-0"]').trigger('click');
      expect(aiClient.generateGptResponse).not.toHaveBeenCalled();
      expect(window.alert).toHaveBeenCalled();
      window.alert.mockRestore();
    });

    test('cancel discards changes', async () => {
      const wrapper = await enterEdit(engineMonster());
      await wrapper.find('[data-testid="edit-ac"]').setValue(25);
      const cancel = wrapper.findAll('button').find((b) => b.text().includes('Cancel'));
      await cancel.trigger('click');
      expect(wrapper.emitted('update-monster')).toBeUndefined();
      expect(wrapper.find('.sb24-name').text()).toBe('Aboleth'); // display restored
    });
  });

  describe('footer actions', () => {
    test('emits the shared footer events', async () => {
      const wrapper = mountCard(byName('Aboleth'));
      await wrapper.find('[data-testid="delete-statblock"]').trigger('click');
      expect(wrapper.emitted('delete')).toHaveLength(1);
    });

    test('convert-edition action emits (generator premium-gates and converts)', async () => {
      const wrapper = mountCard(byName('Aboleth'));
      expect(wrapper.find('[data-testid="convert-edition"]').text()).toContain('2014');
      await wrapper.find('[data-testid="convert-edition"]').trigger('click');
      expect(wrapper.emitted('convert-edition')).toHaveLength(1);
    });

    test('readonly hides the footer bar', () => {
      const wrapper = mountCard(byName('Aboleth'), { readonly: true });
      expect(wrapper.find('.card-footer-bar').exists()).toBe(false);
    });

    test('loading shows the skeleton instead of the card', () => {
      const wrapper = mountCard(null, { loading: true });
      expect(wrapper.find('.sb24-name').exists()).toBe(false);
      expect(wrapper.find('.card-footer-bar').exists()).toBe(false);
    });
  });
});
