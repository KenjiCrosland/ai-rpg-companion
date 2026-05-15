import { createNPCPrompt, createRelationshipAndTipsPrompt, pickOutsiderRegister } from './npc-prompts.mjs';
import { goblinoidCharacterEpithets } from '@/shared/registers/goblinoid.mjs';
import { orcishCharacterEpithets } from '@/shared/registers/orcish.mjs';
import { elvenCharacterEpithets } from '@/shared/registers/elven.mjs';
import { registerList } from '@/shared/register-list.mjs';

describe('createNPCPrompt — register integration', () => {
  describe('legacy path (no register)', () => {
    it('returns the standard NPC prompt without any register blocks', () => {
      const prompt = createNPCPrompt('a tavern keeper');
      // The user's NPC description still flows into the prompt verbatim.
      expect(prompt).toContain('a tavern keeper');
      // Routing markers for the register blocks are absent — no register
      // means the legacy generation path is preserved.
      expect(prompt).not.toContain('LANGUAGE REGISTER RESTRICTION');
      expect(prompt).not.toContain('NAMING ARCHITECTURE');
    });
  });

  describe('baseline register guidance (always rendered when register is set)', () => {
    it.each([
      ['Latin-inspired: formal, structured (e.g., Aurelium)'],
      ['Elven: elegant'],
      ['Old-Norse-inspired: Eddaic register (e.g., Sigrún)'],
      ['Maori-inspired: vowel-rich Te Reo phonetics'],
    ])('communicates the register name to the LLM regardless of which register rolled (%s)', (register) => {
      const prompt = createNPCPrompt('a wandering bard', { register });
      // Baseline naming-register block surfaces the register name so the
      // LLM has a naming signal even when no protection block fires
      // (the case for Latin / Elven / Norse / etc.).
      expect(prompt).toContain('NAMING REGISTER FOR THIS GENERATION:');
      expect(prompt).toContain(register);
    });

    it('renders the cultural-detection override authority block alongside the baseline', () => {
      // Mirrors the item generator's LANGUAGE REGISTER OVERRIDE block.
      // Lets the LLM pivot to a stronger user-input signal when the
      // pre-selection didn't catch one.
      const prompt = createNPCPrompt('a wandering bard', {
        register: 'Latin-inspired: formal, structured',
      });
      expect(prompt).toContain('LANGUAGE REGISTER OVERRIDE (LLM AUTHORITY)');
    });
  });

  describe('register routing (cultural protections fire when register supplied)', () => {
    it('injects the catchall block for catchall registers (Maori)', () => {
      const prompt = createNPCPrompt('a wandering bard', {
        register: 'Maori-inspired: vowel-rich Te Reo phonetics',
      });
      // The catchall block is the section header used by buildCatchallPromptBlock.
      expect(prompt).toContain('NAMING ARCHITECTURE FOR THIS GENERATION');
    });

    it('injects the character whitelist for whitelisted registers (Maori)', () => {
      const prompt = createNPCPrompt('a wandering bard', {
        register: 'Maori-inspired: vowel-rich Te Reo phonetics',
      });
      // Maori has a curated whitelist; data-flow check that whitelist
      // entries reach the prompt body.
      expect(prompt).toContain('Manawa-Kaha');
    });

    it('does NOT inject any register block for Elven (no pool, no whitelist, no catchall match)', () => {
      const prompt = createNPCPrompt('an elven sage', {
        register: 'Elven: elegant',
      });
      // Elven is fictional fantasy — no pool, no whitelist, not a
      // catchall register. The prompt should be free of those blocks.
      expect(prompt).not.toContain('NAMING ARCHITECTURE FOR THIS GENERATION');
      expect(prompt).not.toContain('YORUBA');
    });
  });

  describe('LANGUAGE REGISTER RESTRICTION (Western-fantasy-bound gating)', () => {
    it('fires when fantasyRace is one of the five Western-fantasy-bound races', () => {
      const prompt = createNPCPrompt('a drow assassin', {
        register: 'Elven: elegant',
        fantasyRace: 'Elven',
      });
      expect(prompt).toContain('LANGUAGE REGISTER RESTRICTION — WESTERN-FANTASY-BOUND RACE CONTEXT');
    });

    it.each(['Orcish', 'Goblinoid', 'Dwarven', 'Gnomish', 'Elven'])(
      'fires for fantasyRace=%s',
      (race) => {
        const prompt = createNPCPrompt('an NPC', {
          register: 'Old-Norse-inspired: Eddaic register',
          fantasyRace: race,
        });
        expect(prompt).toContain('LANGUAGE REGISTER RESTRICTION — WESTERN-FANTASY-BOUND RACE CONTEXT');
      },
    );

    it('does NOT fire for Giant (cross-cultural archetype)', () => {
      const prompt = createNPCPrompt('a hill giant', {
        register: 'Norse-inspired: harsh consonants',
        fantasyRace: 'Giant',
      });
      expect(prompt).not.toContain('LANGUAGE REGISTER RESTRICTION — WESTERN-FANTASY-BOUND RACE CONTEXT');
    });

    it('does NOT fire when fantasyRace is null (no race signal)', () => {
      const prompt = createNPCPrompt('a wandering bard', {
        register: 'Maori-inspired: vowel-rich Te Reo phonetics',
        fantasyRace: null,
      });
      expect(prompt).not.toContain('LANGUAGE REGISTER RESTRICTION — WESTERN-FANTASY-BOUND RACE CONTEXT');
    });
  });

  describe('creature-profile path is unaffected by register options', () => {
    it('returns the creature profile prompt regardless of register/fantasyRace', () => {
      const prompt = createNPCPrompt('the Whirling Death', {
        isCreatureProfile: true,
        register: 'Maori-inspired: vowel-rich',
        fantasyRace: 'Orcish',
      });
      // Creature profiles use a separate template that doesn't include
      // register blocks — those are person-priming concerns and the
      // creature-profile branch deliberately avoids them.
      expect(prompt).toContain('CREATURE PROFILE');
      expect(prompt).not.toContain('LANGUAGE REGISTER RESTRICTION');
      expect(prompt).not.toContain('NAMING ARCHITECTURE FOR THIS GENERATION');
    });
  });
});

describe('pickOutsiderRegister — outsider register selection', () => {
  // Behavioral checks on the routing decision. The 50/50 gate is a
  // probabilistic feature; tests assert the gate is honored at the
  // boundary and that selection respects the constraints.

  it('returns null when the gate roll is at or above the 50% threshold (mono-cultural relationships)', () => {
    expect(pickOutsiderRegister({
      sourceRegister: 'Goblin-inspired: sharp',
      gateRoll: 0.5,
      indexRoll: 0,
    })).toBe(null);
    expect(pickOutsiderRegister({
      sourceRegister: 'Goblin-inspired: sharp',
      gateRoll: 0.99,
      indexRoll: 0,
    })).toBe(null);
  });

  it('returns a non-null outsider when the gate roll is below the 50% threshold', () => {
    const outsider = pickOutsiderRegister({
      sourceRegister: 'Goblin-inspired: sharp',
      fantasyRace: 'Goblinoid',
      gateRoll: 0.0,
      indexRoll: 0.0,
    });
    expect(outsider).not.toBe(null);
    expect(typeof outsider).toBe('string');
  });

  it('never picks the source register as outsider', () => {
    // Sweep across the index space — even when the index would
    // otherwise land on the source's slot in the registerList, the
    // candidate filter excludes it.
    for (let i = 0; i < 20; i++) {
      const indexRoll = i / 20;
      const outsider = pickOutsiderRegister({
        sourceRegister: 'Goblin-inspired: sharp, crude, percussive',
        gateRoll: 0,
        indexRoll,
      });
      if (outsider !== null) {
        expect(outsider.startsWith('Goblin-inspired')).toBe(false);
      }
    }
  });

  it('filters outsiders to the WESTERN_FANTASY_BOUND_RACES allow-list when source is in that context', () => {
    // The LANGUAGE REGISTER RESTRICTION block forbids non-Western
    // registers for Western-fantasy-bound contexts. The outsider
    // candidate filter must apply the same allow-list, otherwise
    // the outsider directly contradicts the restriction.
    const allowedPrefixes = [
      'Latin-inspired', 'Greek-inspired',
      'Old-Slavic-inspired', 'Slavic-inspired', 'Russian-inspired',
      'Romanian-inspired', 'Hungarian-inspired', 'Finnish-inspired',
      'Norse-inspired', 'Old-Norse-inspired',
      'Anglo-Saxon-inspired', 'Old-High-German-inspired',
      'Middle-High-German-inspired', 'Gothic-inspired', 'Germanic-inspired',
      'Celtic-inspired', 'Welsh-inspired', 'Middle-Welsh-inspired',
      'Old-Irish-inspired', 'Irish-inspired', 'Old-Occitan-inspired',
      'Italian-Renaissance-inspired',
      'Elven', 'Goblin-inspired', 'Orcish', 'Gnomish',
      'Draconic', 'Aberrant', 'Abyssal', 'Infernal', 'Primordial',
      'Technomagical',
    ];
    for (let i = 0; i < 20; i++) {
      const outsider = pickOutsiderRegister({
        sourceRegister: 'Goblin-inspired: sharp',
        fantasyRace: 'Goblinoid',
        gateRoll: 0,
        indexRoll: i / 20,
      });
      if (outsider) {
        const matchesAllowList = allowedPrefixes.some(p => outsider.startsWith(p));
        expect(matchesAllowList).toBe(true);
      }
    }
  });

  it('does not apply the WESTERN_FANTASY_BOUND_RACES filter when fantasyRace is null or non-bound', () => {
    // Source is the Hungarian register (real-cultural, no race
    // restriction). The candidate pool is the full registerList minus
    // Hungarian. The filter doesn't kick in.
    const outsider = pickOutsiderRegister({
      sourceRegister: 'Hungarian-inspired: agglutinative',
      fantasyRace: null,
      gateRoll: 0,
      indexRoll: 0,
    });
    expect(outsider).not.toBe(null);
    expect(outsider.startsWith('Hungarian-inspired')).toBe(false);
  });
});

describe('createRelationshipAndTipsPrompt — outsider register integration', () => {
  it('renders the outsider directive and outsider whitelist when outsiderRegister has mandatory strictness (deterministic)', () => {
    // Use Orcish as outsider here because Orcish has `mandatory`
    // strictness — the whitelist always fires. Elven / Draconic /
    // Aberrant / etc. use `preferred` (70% gate) which is correct
    // production behavior but makes plain assertions flaky.
    const prompt = createRelationshipAndTipsPrompt('{}', {
      register: 'Elven: elegant',
      fantasyRace: 'Elven',
      outsiderRegister: 'Orcish: brutal, guttural',
    });
    // Outsider directive (routing-presence check, not phrase content).
    expect(prompt).toContain('RELATIONSHIPS — INCLUDE ONE OUTSIDER FROM A DIFFERENT CULTURE');
    // Outsider whitelist fires (orcish pool, tagged as OUTSIDER).
    expect(prompt).toContain('OUTSIDER NAMING — CHARACTER WHITELIST');
    expect(prompt).toContain(orcishCharacterEpithets[0]);
  });

  it('renders the outsider directive even when outsider whitelist is preferred-gated and may not always fire (Elven)', () => {
    // Elven outsider whitelist uses `preferred` strictness (70%
    // gate). The directive itself ALWAYS fires (it's what tells the
    // LLM there's a cross-cultural relationship). The whitelist may
    // or may not be present depending on the strictness gate; that's
    // the same behavior as for source whitelists.
    const prompt = createRelationshipAndTipsPrompt('{}', {
      register: 'Goblin-inspired: sharp, crude, percussive',
      fantasyRace: 'Goblinoid',
      outsiderRegister: 'Elven: elegant',
    });
    expect(prompt).toContain('RELATIONSHIPS — INCLUDE ONE OUTSIDER FROM A DIFFERENT CULTURE');
    // Source whitelist still fires (goblin pool, mandatory).
    expect(prompt).toContain(goblinoidCharacterEpithets[0]);
    // Outsider register name appears in the baseline regardless of
    // whitelist firing.
    expect(prompt).toContain('Elven: elegant');
  });

  it('does NOT render the outsider directive when outsiderRegister is explicitly null', () => {
    const prompt = createRelationshipAndTipsPrompt('{}', {
      register: 'Goblin-inspired: sharp, crude, percussive',
      fantasyRace: 'Goblinoid',
      outsiderRegister: null,
    });
    expect(prompt).not.toContain('RELATIONSHIPS — INCLUDE ONE OUTSIDER FROM A DIFFERENT CULTURE');
    expect(prompt).not.toContain('OUTSIDER NAMING — CHARACTER WHITELIST');
  });

  it('handles an outsider register without a whitelist gracefully (no whitelist block, directive still present)', () => {
    // Hungarian has no character whitelist. The outsider directive
    // still fires (tells DeepSeek there's a cross-cultural
    // relationship) but no OUTSIDER whitelist block follows.
    const prompt = createRelationshipAndTipsPrompt('{}', {
      register: 'Elven: elegant',
      fantasyRace: 'Elven',
      outsiderRegister: 'Hungarian-inspired: agglutinative',
    });
    expect(prompt).toContain('RELATIONSHIPS — INCLUDE ONE OUTSIDER FROM A DIFFERENT CULTURE');
    expect(prompt).not.toContain('OUTSIDER NAMING — CHARACTER WHITELIST');
  });
});

describe('createNPCPrompt — register-as-routing-signal (orchestrator-driven suppression)', () => {
  // Post-combined-inference architecture: createNPCPrompt no longer
  // looks at user input. The orchestrator (NPCGenerator.vue +
  // generateNPCDescription) decides whether to pass a register or
  // null based on the inferred {register, userName} result. The
  // prompt builder just trusts what it's given.
  //
  // Cases the orchestrator routes via register=null:
  //   - non-fantasy user input (cyberpunk / sci-fi / noir / etc.) →
  //     inference returned register=null
  //   - user-named source NPC (Boblin / Csaba) → inference returned
  //     a register, but the orchestrator passed null to
  //     createNPCPrompt to suppress whitelist competition with the
  //     "use names from source text verbatim" instruction
  //
  // Cases the orchestrator routes via register=<descriptor>:
  //   - empty input → upstream random selection
  //   - seeded NPC → seed's persisted register
  //   - fantasy input without a user-provided name → inferred register

  it('suppresses the register block when register is null', () => {
    const prompt = createNPCPrompt('any prompt context', { register: null });
    expect(prompt).not.toContain('NAMING REGISTER FOR THIS GENERATION');
    expect(prompt).not.toContain('NAMING — CHARACTER WHITELIST');
    expect(prompt).not.toContain('LANGUAGE REGISTER RESTRICTION');
  });

  it('renders the register block when register is supplied', () => {
    const prompt = createNPCPrompt('any prompt context', {
      register: 'Goblin-inspired: sharp, crude, percussive',
      fantasyRace: 'Goblinoid',
    });
    expect(prompt).toContain('NAMING REGISTER FOR THIS GENERATION');
    expect(prompt).toContain('NAMING — CHARACTER WHITELIST');
    expect(prompt).toContain(goblinoidCharacterEpithets[0]);
  });
});

describe('createNPCPrompt — production bug regression: goblin whitelist injection on random fallback', () => {
  // Production scenario: NPC generator with empty input runs random
  // fallback in selectRegister, lands on Goblin-inspired register, but
  // resolveFantasyRace returns null because no goblin keyword was in
  // the (empty) input. Pre-fix, the whitelist registry had no entry
  // for the Goblin-inspired register prefix, so the whitelist block
  // didn't fire and DeepSeek anchored on the static example names
  // (Skragbit, Mukgash, Krik-tak), producing clustering across
  // generations.

  it('injects the goblin whitelist into Part 1 when register=Goblin-inspired and fantasyRace=null', () => {
    const prompt = createNPCPrompt('a wandering bard', {
      register: 'Goblin-inspired: sharp, crude, percussive (e.g., Skragbit)',
      fantasyRace: null,
    });
    expect(prompt).toContain('NAMING — CHARACTER WHITELIST FOR THIS GENERATION');
    // Behavioral check: actual whitelist names from the goblin pool
    // reach the prompt body (not just the section header).
    expect(prompt).toContain(goblinoidCharacterEpithets[0]);
  });

  it('injects the goblin whitelist into Part 2 (relationships) when register=Goblin-inspired and fantasyRace=null', () => {
    const prompt = createRelationshipAndTipsPrompt('{}', {
      register: 'Goblin-inspired: sharp, crude, percussive (e.g., Skragbit)',
      fantasyRace: null,
    });
    expect(prompt).toContain('NAMING — CHARACTER WHITELIST FOR THIS GENERATION');
    expect(prompt).toContain(goblinoidCharacterEpithets[0]);
  });

  it('injects the orcish whitelist when register=Orcish and fantasyRace=null', () => {
    const prompt = createRelationshipAndTipsPrompt('{}', {
      register: 'Orcish: brutal, guttural (e.g., Grokthash)',
      fantasyRace: null,
    });
    expect(prompt).toContain('NAMING — CHARACTER WHITELIST FOR THIS GENERATION');
    expect(prompt).toContain(orcishCharacterEpithets[0]);
  });
});

describe('createRelationshipAndTipsPrompt — register integration', () => {
  // The relationships prompt generates names for the NPC's relationship
  // targets, so it needs the same protection blocks Part 1 gets.
  // Without these, Part 2 was silently bypassing pool/catchall/whitelist
  // /restriction protection — a real gap surfaced in production.

  const npcJson = '{"character_name":"Korrish","description_of_position":"a salt oracle"}';

  it('legacy path (no register) returns the standard relationships prompt without register blocks', () => {
    const prompt = createRelationshipAndTipsPrompt(npcJson);
    expect(prompt).toContain('description of relationships');
    expect(prompt).not.toContain('LANGUAGE REGISTER RESTRICTION');
    expect(prompt).not.toContain('NAMING ARCHITECTURE FOR THIS GENERATION');
  });

  it('injects the catchall block when a catchall register is supplied (Maori)', () => {
    const prompt = createRelationshipAndTipsPrompt(npcJson, {
      register: 'Maori-inspired: vowel-rich Te Reo phonetics',
    });
    expect(prompt).toContain('NAMING ARCHITECTURE FOR THIS GENERATION');
  });

  it('injects the character whitelist for whitelisted registers (Maori)', () => {
    const prompt = createRelationshipAndTipsPrompt(npcJson, {
      register: 'Maori-inspired: vowel-rich Te Reo phonetics',
    });
    expect(prompt).toContain('Manawa-Kaha');
  });

  it.each(['Orcish', 'Goblinoid', 'Dwarven', 'Gnomish', 'Elven'])(
    'fires LANGUAGE REGISTER RESTRICTION for fantasyRace=%s (Western-fantasy-bound)',
    (race) => {
      const prompt = createRelationshipAndTipsPrompt(npcJson, {
        register: 'Old-Norse-inspired: Eddaic register',
        fantasyRace: race,
      });
      expect(prompt).toContain('LANGUAGE REGISTER RESTRICTION — WESTERN-FANTASY-BOUND RACE CONTEXT');
    },
  );

  it('does NOT fire LANGUAGE REGISTER RESTRICTION for Giant (cross-cultural archetype)', () => {
    const prompt = createRelationshipAndTipsPrompt(npcJson, {
      register: 'Norse-inspired: harsh consonants',
      fantasyRace: 'Giant',
    });
    expect(prompt).not.toContain('LANGUAGE REGISTER RESTRICTION — WESTERN-FANTASY-BOUND RACE CONTEXT');
  });

  it('creature-profile relationships prompt is unaffected by register options', () => {
    const prompt = createRelationshipAndTipsPrompt(npcJson, {
      isCreatureProfile: true,
      register: 'Maori-inspired: vowel-rich',
      fantasyRace: 'Orcish',
    });
    expect(prompt).toContain('ASSOCIATED FIGURES');
    expect(prompt).not.toContain('LANGUAGE REGISTER RESTRICTION');
    expect(prompt).not.toContain('NAMING ARCHITECTURE FOR THIS GENERATION');
  });
});
