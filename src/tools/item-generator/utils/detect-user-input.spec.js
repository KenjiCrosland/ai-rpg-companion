import { detectFromUserInput } from './detect-user-input.mjs';

describe('detectFromUserInput', () => {
  describe('basic matching', () => {
    it('returns the matching term when a single term appears in the input', () => {
      expect(detectFromUserInput('She wielded a longbow at dawn', ['longbow', 'shortbow'])).toBe('longbow');
    });

    it('returns null when no term matches', () => {
      expect(detectFromUserInput('A cloak of feathers', ['longbow', 'shortbow'])).toBe(null);
    });

    it('returns null on empty input', () => {
      expect(detectFromUserInput('', ['longbow'])).toBe(null);
      expect(detectFromUserInput(null, ['longbow'])).toBe(null);
      expect(detectFromUserInput(undefined, ['longbow'])).toBe(null);
    });

    it('returns null on empty terms list', () => {
      expect(detectFromUserInput('a longbow', [])).toBe(null);
      expect(detectFromUserInput('a longbow', null)).toBe(null);
    });

    it('matches case-insensitively', () => {
      expect(detectFromUserInput('A Longbow at dawn', ['longbow'])).toBe('longbow');
      expect(detectFromUserInput('a LONGBOW', ['longbow'])).toBe('longbow');
    });
  });

  describe('word-boundary behavior', () => {
    it('matches whole words but not substrings within other words', () => {
      // "longboard" should NOT match "longbow" — different word.
      expect(detectFromUserInput('a longboard', ['longbow'])).toBe(null);
      // "long bow" with a space DOES match (the term itself doesn't have
      // a space; \b sits at the space boundary).
      expect(detectFromUserInput('a long bow', ['bow'])).toBe('bow');
    });

    it('matches at the start of input', () => {
      expect(detectFromUserInput('longbow forged from yew', ['longbow'])).toBe('longbow');
    });

    it('matches at the end of input', () => {
      expect(detectFromUserInput('forged from yew, a longbow', ['longbow'])).toBe('longbow');
    });

    it('matches across punctuation as a word boundary', () => {
      expect(detectFromUserInput('a "longbow" appears', ['longbow'])).toBe('longbow');
      expect(detectFromUserInput('item:longbow', ['longbow'])).toBe('longbow');
    });
  });

  describe('length-descending sort (multi-word and overlapping terms)', () => {
    it('matches a longer term before a shorter substring of it', () => {
      // "shortsword" should beat "sword" because the sort puts longer first.
      expect(detectFromUserInput('a shortsword on her hip', ['sword', 'shortsword'])).toBe('shortsword');
    });

    it('matches the longer term regardless of input order in the terms list', () => {
      // Terms list order shouldn't matter; the function sorts internally.
      expect(detectFromUserInput('a shortsword on her hip', ['shortsword', 'sword'])).toBe('shortsword');
    });

    it('matches a multi-word phrase before a shorter single word', () => {
      // "musical instrument" should beat "instrument" alone.
      expect(detectFromUserInput('a magical musical instrument', ['instrument', 'musical instrument'])).toBe('musical instrument');
    });

    it('falls back to the shorter term when the longer one does not match', () => {
      expect(detectFromUserInput('a sharp sword', ['sword', 'shortsword'])).toBe('sword');
    });
  });

  describe('regex-special characters in terms', () => {
    it('matches terms containing hyphens as literals', () => {
      // Cedar-style "double-bladed scimitar" — hyphen is a regex special
      // char inside character classes. detectFromUserInput must escape it.
      expect(detectFromUserInput('a double-bladed scimitar', ['double-bladed scimitar'])).toBe('double-bladed scimitar');
    });

    it('matches terms with apostrophes', () => {
      expect(detectFromUserInput('a wizard\'s wand', ['wizard\'s wand'])).toBe('wizard\'s wand');
    });

    it('does not interpret special characters as regex metacharacters', () => {
      // "a.b" in the terms list should match literal "a.b" only, not
      // arbitrary 3-character sequences.
      expect(detectFromUserInput('axb in the cellar', ['a.b'])).toBe(null);
      expect(detectFromUserInput('a.b in the cellar', ['a.b'])).toBe('a.b');
    });
  });

  describe('combined-subtype scan for parent-type inference', () => {
    // The item generator builds a combined list of [...weaponTypes,
    // ...wondrousItemForms] and runs ONE detectFromUserInput call
    // against it. The matched subtype is then mapped back to its parent
    // item type via a lookup table. These tests document the resolution
    // behavior of that combined scan — the bug being fixed was that the
    // top-level scan alone (just ['Weapon','Armor','Ring',...]) missed
    // user inputs like "Quartermaster's Shortsword" because no top-level
    // word appeared in the input.
    const weaponTypes = [
      'longsword', 'shortsword', 'greatsword', 'longbow', 'shortbow',
      'dagger', 'quarterstaff', 'sling', 'whip', 'blowgun',
    ];
    const wondrousItemForms = [
      'lantern', 'cloak', 'mirror', 'musical instrument', 'compass',
      'ring', 'crown',
    ];
    const allSubtypes = [...weaponTypes, ...wondrousItemForms];

    it('finds a weapon subtype buried in a name field', () => {
      // The original bug: "Quartermaster's Shortsword" produced armor
      // because no top-level type word matched. Combined scan finds
      // shortsword, which is then mapped to Weapon.
      expect(detectFromUserInput("Quartermaster's Shortsword", allSubtypes)).toBe('shortsword');
    });

    it('finds a wondrous form word in lore', () => {
      expect(detectFromUserInput('A magical lantern in the alcove', allSubtypes)).toBe('lantern');
    });

    it('picks the longer subtype when multiple appear ("shield with shortsword inscriptions")', () => {
      // "shield" isn't in any subtype list (it's a top-level item type
      // implied by Armor in this codebase), so only "shortsword" is
      // detected. Documents that the resolution falls through to the
      // detected subtype regardless of other unrelated words.
      expect(detectFromUserInput('A shield with shortsword inscriptions', allSubtypes)).toBe('shortsword');
    });

    it('picks the longer subtype on length ties via stable sort', () => {
      // "longbow" (7) and "lantern" (7) tie on length. The combined list
      // has weaponTypes first, so longbow is checked first; first match
      // wins. Documents the deterministic tiebreak.
      expect(detectFromUserInput('a longbow and a lantern', allSubtypes)).toBe('longbow');
      // Reversing the input order doesn't change the result — the sort
      // is by term length, not input position.
      expect(detectFromUserInput('a lantern and a longbow', allSubtypes)).toBe('longbow');
    });

    it('does not match shorter subtypes inside larger words', () => {
      // "ring" (in wondrousItemForms) shouldn't match inside "earring"
      // or "warring" via word-boundary regex. (earring is in the list as
      // its own term in the real array, but here we only have 'ring'.)
      expect(detectFromUserInput('a warring faction', allSubtypes)).toBe(null);
      expect(detectFromUserInput('an earring', allSubtypes)).toBe(null);
      // But a standalone "ring" does match.
      expect(detectFromUserInput('a brass ring', allSubtypes)).toBe('ring');
    });

    it('returns null when input mentions no subtype', () => {
      expect(detectFromUserInput('A vague sense of unease', allSubtypes)).toBe(null);
    });
  });

  describe('generic-word fallback (parent-type inference only)', () => {
    // The item generator runs a SEPARATE scan after the specific-subtype
    // scan, against generic words like "bow", "sword", "axe", "box".
    // These imply a parent type but aren't specific enough to be a seed
    // (the LLM shouldn't be told to "design around 'bow'"); they trigger
    // a constrained-random pick from a sub-pool of specific subtypes
    // matching that generic. The bug being fixed: "Verdant Bow" produced
    // a brooch because "bow" wasn't in the specific-subtype list and
    // no top-level word matched, so the random fallback fired.
    const genericWeaponWords = ['bow', 'sword', 'axe', 'hammer', 'blade', 'crossbow', 'knife'];
    const genericWondrousWords = ['box'];
    const allGenerics = [...genericWeaponWords, ...genericWondrousWords];

    it('detects generic "bow" in input', () => {
      expect(detectFromUserInput('Verdant Bow', allGenerics)).toBe('bow');
    });

    it('detects generic "sword" in input', () => {
      expect(detectFromUserInput('A weathered sword on the wall', allGenerics)).toBe('sword');
    });

    it('detects generic "box" in input', () => {
      expect(detectFromUserInput('a small wooden box', allGenerics)).toBe('box');
    });

    it('does not match generic "bow" inside "longbow"', () => {
      // Word boundary prevents partial-word matching. This is critical:
      // if the user wrote "longbow", the SPECIFIC scan should catch it
      // first and the generic scan should never run. But even if it did,
      // \bbow\b doesn't match inside "longbow" (no word boundary between
      // 'g' and 'b' — both are word characters).
      expect(detectFromUserInput('a longbow at dawn', genericWeaponWords)).toBe(null);
    });

    it('does not match generic "box" inside "boxer" or "toolbox"', () => {
      expect(detectFromUserInput('a boxer in the ring', genericWondrousWords)).toBe(null);
      expect(detectFromUserInput('a heavy toolbox', genericWondrousWords)).toBe(null);
      // But standalone "box" matches.
      expect(detectFromUserInput('a small box', genericWondrousWords)).toBe('box');
    });

    it('picks the longer generic when overlap is possible (e.g. "crossbow" vs "bow")', () => {
      // "crossbow" should beat "bow" via length-descending sort. Critical
      // because if a user writes "Verdant Crossbow", we want the
      // crossbow-specific subpool, not the broader bow subpool.
      expect(detectFromUserInput('Verdant Crossbow', genericWeaponWords)).toBe('crossbow');
    });

    it('matches generic in either name or lore field (concatenated input)', () => {
      // The item generator concatenates `${itemName.value} ${itemLore.value}`
      // before scanning, so a generic in either field is detected.
      expect(detectFromUserInput('Verdant Bow A weapon of the forest spirits', allGenerics)).toBe('bow');
    });
  });

  describe('extended keyword sweep — Armor, Potion, Wondrous synonyms', () => {
    // Second pass on genericTypeWords added Armor synonyms (plate, mail,
    // chainmail, shield), Potion synonyms (elixir, draught, tonic, brew),
    // wondrous-form synonyms (helmet, lamp, book, amulet, necklace,
    // instrument, hat), and additional weapon generics (spear, club,
    // mace, pole). These tests document the inputs the brief flagged
    // as previously failing — "Plate of Stars" producing armor, etc.
    const allGenerics = [
      // Weapon
      'bow', 'sword', 'blade', 'axe', 'hammer', 'crossbow', 'knife',
      'spear', 'club', 'mace', 'pole',
      // Wondrous
      'box', 'helmet', 'lamp', 'book', 'amulet', 'necklace', 'instrument', 'hat',
      // Armor
      'plate', 'mail', 'chainmail', 'shield',
      // Potion
      'elixir', 'draught', 'tonic', 'brew',
    ];

    it('detects "plate" in armor names', () => {
      expect(detectFromUserInput('Plate of Stars', allGenerics)).toBe('plate');
    });

    it('detects "mail" and "chainmail" without colliding', () => {
      // Length-descending sort means "chainmail" (9) beats "mail" (4)
      // when both could match. "Iron Mail" only contains "mail";
      // "Iron Chainmail" matches "chainmail" first.
      expect(detectFromUserInput('Iron Mail', allGenerics)).toBe('mail');
      expect(detectFromUserInput('Iron Chainmail', allGenerics)).toBe('chainmail');
    });

    it('detects "shield" in armor names', () => {
      expect(detectFromUserInput("Captain's Shield", allGenerics)).toBe('shield');
    });

    it('detects potion synonyms', () => {
      expect(detectFromUserInput('Crimson Elixir', allGenerics)).toBe('elixir');
      expect(detectFromUserInput("Witch's Draught", allGenerics)).toBe('draught');
      expect(detectFromUserInput('Healing Tonic', allGenerics)).toBe('tonic');
      expect(detectFromUserInput('Strange Brew', allGenerics)).toBe('brew');
    });

    it('detects wondrous synonyms', () => {
      expect(detectFromUserInput("Witch's Helmet", allGenerics)).toBe('helmet');
      expect(detectFromUserInput('Forest Lamp', allGenerics)).toBe('lamp');
      expect(detectFromUserInput('Heavy Book', allGenerics)).toBe('book');
      expect(detectFromUserInput('Bone Amulet', allGenerics)).toBe('amulet');
      expect(detectFromUserInput('Silver Necklace', allGenerics)).toBe('necklace');
      expect(detectFromUserInput('Bardic Instrument', allGenerics)).toBe('instrument');
      expect(detectFromUserInput("Mage's Hat", allGenerics)).toBe('hat');
    });

    it('detects additional weapon generics', () => {
      expect(detectFromUserInput('Sun Spear', allGenerics)).toBe('spear');
      expect(detectFromUserInput('Bandit Club', allGenerics)).toBe('club');
      expect(detectFromUserInput('Heavy Mace', allGenerics)).toBe('mace');
      expect(detectFromUserInput('Pole of Authority', allGenerics)).toBe('pole');
    });

    it('does not match generics inside larger words (word boundary)', () => {
      // helmet shouldn't match in "helmeted"; book shouldn't match in
      // "bookend"; shield shouldn't match in "shielded".
      expect(detectFromUserInput('a helmeted soldier', allGenerics)).toBe(null);
      expect(detectFromUserInput('a bookend on the desk', allGenerics)).toBe(null);
      expect(detectFromUserInput('a shielded enclave', allGenerics)).toBe(null);
      // mace inside "grimace" — \b BEFORE 'm' fails because the 'i' is
      // also a word character (no boundary between two word chars). So
      // \bmace\b does NOT match inside "grimace". Word-boundary protection
      // correctly handles this case.
      expect(detectFromUserInput('Grimace of the King', allGenerics)).toBe(null);
    });

    it('documents the "horn" gap — drinking horn falls through to random', () => {
      // The brief explicitly chose not to add 'horn' to genericTypeWords
      // because there's no analogous form in wondrousItemForms. A user
      // typing "Drinking Horn" gets a random wondrous form from the full
      // pool, which may be jarring. Documented gap; revisit if it
      // surfaces in user testing.
      expect(detectFromUserInput('Drinking Horn', allGenerics)).toBe(null);
    });

    it('does not collide generic "staff" — top-level Staff handles it', () => {
      // 'staff' is intentionally excluded from genericTypeWords because
      // it's already a top-level item type (Staff of Fire, Staff of the
      // Magi). The top-level detection scan catches "staff" in input
      // before the generic scan even runs, resolving to Staff item type.
      expect(allGenerics).not.toContain('staff');
    });
  });

  describe('item-generator integration scenarios', () => {
    const weaponTypes = [
      'longsword', 'shortsword', 'greatsword', 'rapier', 'dagger',
      'longbow', 'shortbow', 'light crossbow', 'heavy crossbow',
      'quarterstaff', 'whip', 'blowgun', 'double-bladed scimitar',
    ];

    it('detects a weapon type buried in lore prose', () => {
      expect(detectFromUserInput(
        'A staff forged from yew, sister to a famous longbow',
        weaponTypes
      )).toBe('longbow');
    });

    it('prefers shortsword over sword when both could match', () => {
      // Sword isn't in this terms list, so shortsword wins on its own.
      expect(detectFromUserInput('she drew her shortsword', weaponTypes)).toBe('shortsword');
    });

    it('handles the brief\'s edge-case sentence with multiple weapon mentions', () => {
      // "I want a sword forged from longbow staves" — none of the terms
      // are "sword" or "staves", so longbow wins.
      // (If "sword" were in the list, length-descending sort would still
      // make longbow win because "longbow" (7) > "sword" (5).)
      expect(detectFromUserInput(
        'I want a sword forged from longbow staves',
        weaponTypes
      )).toBe('longbow');
    });

    it('returns null when input mentions no weapon type', () => {
      expect(detectFromUserInput(
        'A cloak woven from moth wings',
        weaponTypes
      )).toBe(null);
    });
  });
});
