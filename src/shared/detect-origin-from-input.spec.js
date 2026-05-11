import {
  detectOriginFromInput,
  fantasyRaceKeywords,
  aestheticOriginKeywords,
} from './select-register.mjs';

describe('detectOriginFromInput', () => {
  describe('fantasy-race detection (canonical terms)', () => {
    it.each([
      ['an elven longbow', 'Elven'],
      ['a dwarven warhammer', 'Dwarven'],
      ['an orcish chieftain', 'Orcish'],
      ['a goblin thief', 'Goblinoid'],
      ['a clever gnome', 'Gnomish'],
      ['a hill giant', 'Giant'],
    ])('"%s" → %s', (input, expected) => {
      expect(detectOriginFromInput(input)).toBe(expected);
    });
  });

  describe('fantasy-race sub-race aliases', () => {
    it.each([
      ['a drow cleric', 'Elven'],
      ['an eladrin sage', 'Elven'],
      ['half-elf ranger', 'Elven'],
      ['a duergar smith', 'Dwarven'],
      ['half-orc barbarian', 'Orcish'],
      ['a hobgoblin captain', 'Goblinoid'],
      ['bugbear scout', 'Goblinoid'],
      ['a svirfneblin tinkerer', 'Gnomish'],
      ['titan warlord', 'Giant'],
      ['cyclops shepherd', 'Giant'],
      ['firbolg hermit', 'Giant'],
      ['goliath champion', 'Giant'],
    ])('"%s" → %s', (input, expected) => {
      expect(detectOriginFromInput(input)).toBe(expected);
    });
  });

  describe('common misspellings', () => {
    it.each([
      ['a gobblin shaman', 'Goblinoid'],
      ['a gobblyn cutpurse', 'Goblinoid'],
      ['a goblen thief', 'Goblinoid'],
      ['a dwerf miner', 'Dwarven'],
      ['an elph archer', 'Elven'],
      ['an elfen lord', 'Elven'],
      ['orken war chief', 'Orcish'],
    ])('"%s" → %s', (input, expected) => {
      expect(detectOriginFromInput(input)).toBe(expected);
    });
  });

  describe('aesthetic-origin Tier 1 detection', () => {
    it.each([
      ['a wyrm cult', 'Draconic'],
      ['ancient draconic seal', 'Draconic'],
      ['a wyvern rider', 'Draconic'],
      ['a dragonborn paladin', 'Draconic'],
      ['someone from the feywild', 'Fey'],
      ['a sidhe noble', 'Fey'],
      ['a satyr piper', 'Fey'],
      ['a pixie merchant', 'Fey'],
      ['the vampire lord of the spire', 'Vampiric'],
      ['a dhampir hunter', 'Vampiric'],
      ['a necromancer of the salt-cult', 'Necromantic'],
      ['lich-touched scribe', 'Necromantic'],
      ['undead courtier', 'Necromantic'],
      ['werewolf scout', 'Lycanthropic'],
      ['a shapeshifter assassin', 'Lycanthropic'],
      ['an angel of the seventh choir', 'Celestial'],
      ['aasimar paladin', 'Celestial'],
      ['a seraph in disguise', 'Celestial'],
      ['demon-bound warlock', 'Abyssal'],
      ['a tiefling rogue', 'Abyssal'],
      ['a devil-bound knight', 'Infernal'],
      ['hellfire scholar', 'Infernal'],
      ['fiendish pact-bearer', 'Infernal'],
    ])('"%s" → %s', (input, expected) => {
      expect(detectOriginFromInput(input)).toBe(expected);
    });
  });

  describe('aesthetic-origin Tier 2 detection', () => {
    it.each([
      ['an aberration cultist', 'Aberrant'],
      ['mind flayer thrall', 'Aberrant'],
      ['an illithid scholar', 'Aberrant'],
      ['an eldritch herald', 'Aberrant'],
      ['a shadow-bound assassin', 'Shadow'],
      ['shadar-kai courier', 'Shadow'],
      ['someone from the shadowfell', 'Shadow'],
      ['a githyanki warrior', 'Astral'],
      ['astral wanderer', 'Astral'],
      ['a fire genasi', 'Elemental'],
      ['a djinn courier', 'Elemental'],
      ['efreeti merchant', 'Elemental'],
    ])('"%s" → %s', (input, expected) => {
      expect(detectOriginFromInput(input)).toBe(expected);
    });
  });

  describe('precedence rules', () => {
    it('fantasy race wins over aesthetic origin (race is the more specific signal)', () => {
      // Both "elven" and "demon" are present; race wins because the race
      // map is checked first.
      expect(detectOriginFromInput('an elven warlock who summoned a demon')).toBe('Elven');
    });

    it('Abyssal wins over Infernal for "demon" (declaration order, documents the tiebreak)', () => {
      // "demon" is in Abyssal's keyword list; "fiend" is in Infernal's.
      // Abyssal declared first → "demon" alone → Abyssal.
      expect(detectOriginFromInput('a demon-bound mercenary')).toBe('Abyssal');
    });

    it('Infernal-specific terms still resolve to Infernal (not stolen by Abyssal)', () => {
      expect(detectOriginFromInput('a devil-bound knight')).toBe('Infernal');
      expect(detectOriginFromInput('hellfire and brimstone')).toBe('Infernal');
    });

    it('first race in declaration order wins on conflicting race signals', () => {
      // Elven declared before Orcish in fantasyRaceKeywords.
      expect(detectOriginFromInput('elven blade carried by an orcish raider')).toBe('Elven');
    });
  });

  describe('word-boundary protection', () => {
    it('does not match short keywords inside larger words', () => {
      // "elf" should NOT match inside "self" or "shelf".
      expect(detectOriginFromInput('on the shelf, the self')).toBe(null);
      // "orc" should NOT match inside "force" or "torch".
      expect(detectOriginFromInput('she lit a torch with force')).toBe(null);
      // "fey" should NOT match inside "they" or "feyish-imitating-prefix"
      // — \b before 'f' fails because the preceding char is also a word char.
      expect(detectOriginFromInput('they did not appear')).toBe(null);
    });

    it('matches keywords at word boundaries even with punctuation', () => {
      expect(detectOriginFromInput('"vampire," she whispered')).toBe('Vampiric');
      expect(detectOriginFromInput('half-orc!')).toBe('Orcish');
    });

    it('is case-insensitive', () => {
      expect(detectOriginFromInput('A DROW CLERIC')).toBe('Elven');
      expect(detectOriginFromInput('FEYWILD')).toBe('Fey');
    });
  });

  describe('null / empty / no-signal', () => {
    it.each([
      [null],
      [undefined],
      [''],
    ])('returns null for %p', (input) => {
      expect(detectOriginFromInput(input)).toBe(null);
    });

    it('returns null when input has no race or aesthetic-origin keyword', () => {
      expect(detectOriginFromInput('a sentient gazebo named Gary')).toBe(null);
      expect(detectOriginFromInput('Vrax-mogoth')).toBe(null);
    });
  });

  describe('keyword-map integrity', () => {
    it('fantasyRaceKeywords and aestheticOriginKeywords have disjoint origin keys', () => {
      // The two maps must not declare the same origin twice — a single
      // origin would route ambiguously through both maps.
      const raceKeys = Object.keys(fantasyRaceKeywords);
      const aestheticKeys = Object.keys(aestheticOriginKeywords);
      const overlap = raceKeys.filter(k => aestheticKeys.includes(k));
      expect(overlap).toEqual([]);
    });
  });
});
