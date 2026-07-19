/**
 * Statblock2024 display component tests — build-order step 5, category 4.
 * DOM structure and data binding only; the visual look is verified by
 * screenshot review against the owner's reference images.
 */
import { mount } from '@vue/test-utils';
import Statblock2024 from '@/components/Statblock2024.vue';
import monsters from '@/data/srd52-monsters.json';

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

  describe('footer actions', () => {
    test('emits the shared footer events', async () => {
      const wrapper = mountCard(byName('Aboleth'));
      await wrapper.find('[data-testid="delete-statblock"]').trigger('click');
      expect(wrapper.emitted('delete')).toHaveLength(1);
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
