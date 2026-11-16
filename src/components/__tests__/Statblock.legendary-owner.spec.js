import { mount } from '@vue/test-utils';
import Statblock from '@/components/Statblock.vue';

beforeAll(() => { global.ResizeObserver = class { observe() {} unobserve() {} disconnect() {} }; }); // jsdom has none; the card measures its own width

// the classic card's legendary preamble names its owner: a person's name stays a name,
// a creature's reads as the creature (critic's audit 2026-10-02: "The aurex the deathless can take 3 legendary actions")
const monster = (name) => ({
  name, size: 'Medium', type: 'Undead', alignment: 'Neutral Evil', armor_class: '17 (natural armor)', hit_points: '135 (18d8 + 54)', speed: '30 ft.',
  attributes: 'STR 11 (+0), DEX 16 (+3), CON 16 (+3), INT 20 (+5), WIS 14 (+2), CHA 16 (+3)',
  senses: 'truesight 120 ft., passive Perception 12', languages: 'Common', challenge_rating: '17 (18,000 XP)', abilities: [],
  actions: [{ name: 'Touch', description: 'Melee Spell Attack: +12 to hit, reach 5 ft., one target. Hit: 10 (3d6) cold damage.' }],
  legendary_actions: [{ name: 'Cantrip', description: 'The creature casts a cantrip.' }],
});

describe('the classic card names the legendary owner', () => {
  test('"Aurex the Deathless" is Aurex', () => {
    const w = mount(Statblock, { props: { monster: monster('Aurex the Deathless') } });
    expect(w.text()).toMatch(/Aurex can take 3 legendary actions/);
    expect(w.text()).not.toMatch(/the aurex the deathless/i);
  });
  test('"The Hanging Shroud" is the hanging shroud, one article', () => {
    const w = mount(Statblock, { props: { monster: monster('The Hanging Shroud') } });
    expect(w.text()).toMatch(/The hanging shroud can take 3 legendary actions/);
    expect(w.text()).not.toMatch(/The the hanging/);
  });
  test('"Lord of the Barrow" keeps the title: Lord', () => {
    const w = mount(Statblock, { props: { monster: monster('Lord of the Barrow') } });
    expect(w.text()).toMatch(/Lord can take 3 legendary actions/);
  });
  test('the rows\' short form wins when the block carries one: "the marshal", not "the ashen marshal"', () => {
    const w = mount(Statblock, { props: { monster: { ...monster('Ashen Marshal'), inline: 'the marshal' } } });
    expect(w.text()).toMatch(/The marshal can take 3 legendary actions/);
  });
});
