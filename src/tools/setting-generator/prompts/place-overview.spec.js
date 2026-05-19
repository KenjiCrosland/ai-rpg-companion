/**
 * Tests for placeOverviewPrompt + validatePlaceOverviewResponse.
 *
 * Per the project test convention: no prompt-string content tests
 * (those are verified by manual production review). The mechanical
 * surface tested here:
 *
 *   - validatePlaceOverviewResponse — shape acceptance / rejection
 *     for required fields, optional named_entities array constraints,
 *     malformed JSON, and the key omissions (polity fields absent is
 *     fine; place fields absent is rejection).
 *
 *   - placeOverviewPrompt — structural contract: returns a string,
 *     references parentName when supplied (so the LLM anchors
 *     "where it sits"), and omits parent block when no parent
 *     supplied. No deep prompt-content assertions.
 */

import {
  placeOverviewPrompt,
  validatePlaceOverviewResponse,
} from './setting-prompts.mjs';

const fullPlaceResponse = {
  name: 'Piazza dei Fonditori',
  title: 'Piazza of the Cracked Cobbles',
  overview: 'The air still tastes of bronze and old smoke...',
  where_it_sits: 'Near the south face of the Collina dei Conclavi...',
  features: 'Roughly twenty paces across, ringed with low stone benches...',
  what_happens_here: 'The bell-founders haggle here at the morning bells...',
  who_frequents_here: 'Old Renzo Pettirosso comes every dusk...',
  hidden_detail: 'A dark stain on the third step, scrubbed but never gone.',
  named_entities: ['Renzo Pettirosso'],
};

function asJson(obj) {
  return JSON.stringify(obj);
}

describe('validatePlaceOverviewResponse', () => {
  it('accepts a complete place-scale response', () => {
    expect(validatePlaceOverviewResponse(asJson(fullPlaceResponse))).toBe(true);
  });

  it('accepts an empty named_entities array (a place with no named NPCs is rare but legal)', () => {
    const r = { ...fullPlaceResponse, named_entities: [] };
    expect(validatePlaceOverviewResponse(asJson(r))).toBe(true);
  });

  it('rejects malformed JSON', () => {
    expect(validatePlaceOverviewResponse('not json')).toBe(false);
    expect(validatePlaceOverviewResponse('')).toBe(false);
  });

  it('rejects responses with a missing required string field', () => {
    const required = [
      'name', 'title', 'overview', 'where_it_sits',
      'features', 'what_happens_here', 'who_frequents_here', 'hidden_detail',
    ];
    for (const field of required) {
      const r = { ...fullPlaceResponse };
      delete r[field];
      expect(validatePlaceOverviewResponse(asJson(r))).toBe(false);
    }
  });

  it('rejects responses where a required field is an empty string', () => {
    const r = { ...fullPlaceResponse, hidden_detail: '   ' };
    expect(validatePlaceOverviewResponse(asJson(r))).toBe(false);
  });

  it('rejects responses where a required field is the wrong type', () => {
    const r = { ...fullPlaceResponse, features: 42 };
    expect(validatePlaceOverviewResponse(asJson(r))).toBe(false);
  });

  it('rejects responses where named_entities is not an array', () => {
    const r = { ...fullPlaceResponse, named_entities: 'Renzo' };
    expect(validatePlaceOverviewResponse(asJson(r))).toBe(false);
  });

  it('rejects responses where named_entities contains non-string values', () => {
    const r = { ...fullPlaceResponse, named_entities: ['Renzo', 42] };
    expect(validatePlaceOverviewResponse(asJson(r))).toBe(false);
  });

  it('rejects array-as-root and primitive-as-root payloads', () => {
    expect(validatePlaceOverviewResponse(JSON.stringify([fullPlaceResponse]))).toBe(false);
    expect(validatePlaceOverviewResponse(JSON.stringify('a string'))).toBe(false);
  });

  it('does NOT require polity-scale fields (history, current_ruler_sentence, etc.)', () => {
    // A response with only the six place-scale fields + meta is
    // valid — the absence of history / current_ruler_sentence /
    // social_history etc. is the point of the split.
    expect(validatePlaceOverviewResponse(asJson(fullPlaceResponse))).toBe(true);
    expect('history' in fullPlaceResponse).toBe(false);
    expect('current_ruler_sentence' in fullPlaceResponse).toBe(false);
  });

  it('accepts npc_list when it is a valid array (the structured side-channel for the NPCs tab)', () => {
    const r = {
      ...fullPlaceResponse,
      npc_list: [
        {
          name: 'Renzo Pettirosso',
          description: 'Sweeper of the cracked cobbles since his brother fell in the Masquerade Revolt.',
        },
      ],
    };
    expect(validatePlaceOverviewResponse(asJson(r))).toBe(true);
  });

  it('accepts npc_list with two entries (the typical place-scale case)', () => {
    const r = {
      ...fullPlaceResponse,
      npc_list: [
        { name: 'Celso della Fonte', description: 'A young Lavorante who lost his brother here.' },
        { name: 'la Vedova del Grillo', description: 'An old woman who sweeps the cobbles before the full moon.' },
      ],
    };
    expect(validatePlaceOverviewResponse(asJson(r))).toBe(true);
  });

  it('accepts an empty npc_list array', () => {
    const r = { ...fullPlaceResponse, npc_list: [] };
    expect(validatePlaceOverviewResponse(asJson(r))).toBe(true);
  });

  it('accepts a response with no npc_list field at all (back-compat with pre-NPC place responses)', () => {
    const r = { ...fullPlaceResponse };
    delete r.npc_list;
    expect(validatePlaceOverviewResponse(asJson(r))).toBe(true);
  });

  it('rejects npc_list when it is not an array', () => {
    const r = { ...fullPlaceResponse, npc_list: 'Renzo' };
    expect(validatePlaceOverviewResponse(asJson(r))).toBe(false);
  });

  it('rejects npc_list entries missing name or description', () => {
    const noName = { ...fullPlaceResponse, npc_list: [{ description: 'no name' }] };
    expect(validatePlaceOverviewResponse(asJson(noName))).toBe(false);

    const noDesc = { ...fullPlaceResponse, npc_list: [{ name: 'X' }] };
    expect(validatePlaceOverviewResponse(asJson(noDesc))).toBe(false);

    const blankName = { ...fullPlaceResponse, npc_list: [{ name: '   ', description: 'd' }] };
    expect(validatePlaceOverviewResponse(asJson(blankName))).toBe(false);
  });
});

describe('placeOverviewPrompt — structural contract', () => {
  const baseArgs = {
    type: 'piazza',
    character: ['embattled', 'guild-ruled', 'forge-clanging'],
    register: 'Italian-Renaissance-inspired',
    userName: 'Piazza dei Fonditori',
    tension: 'inheritance-burden',
    bannedTropes: [],
    description: 'A small piazza where the revolt was crushed.',
    lore: '',
  };

  it('returns a non-empty string', () => {
    const out = placeOverviewPrompt(baseArgs);
    expect(typeof out).toBe('string');
    expect(out.length).toBeGreaterThan(100);
  });

  it('emits the PARENT SETTING block when parentName is supplied', () => {
    const out = placeOverviewPrompt({
      ...baseArgs,
      parentName: 'Repubblica dei Cinque Martelli',
      parentLore: 'A city-state ruled by five guilds.',
    });
    expect(out).toContain('PARENT SETTING: Repubblica dei Cinque Martelli');
    expect(out).toContain('A city-state ruled by five guilds.');
  });

  it('omits the PARENT SETTING block when parentName is missing', () => {
    const out = placeOverviewPrompt(baseArgs);
    expect(out).not.toContain('PARENT SETTING:');
  });

  it('includes the place-scale required field names in the JSON schema section', () => {
    // Mechanical check that the prompt asks for the six fields we
    // validate. Not a content check — just confirming the schema
    // and validator agree on field names.
    const out = placeOverviewPrompt(baseArgs);
    for (const field of [
      'name', 'title', 'overview', 'where_it_sits',
      'features', 'what_happens_here', 'who_frequents_here', 'hidden_detail',
      'named_entities',
    ]) {
      expect(out).toContain(`"${field}"`);
    }
  });

  it('does NOT include polity-only field names in the JSON schema section', () => {
    // The place-scale prompt's schema is the six-slot prose shape
    // plus name / title / named_entities / npc_list. npc_list is the
    // structured side-channel that populates the NPCs tab; it's NOT
    // a rendered section (the renderer ignores it). Other polity-
    // only fields (history, current_ruler_sentence, etc.) must NOT
    // appear in the schema.
    const out = placeOverviewPrompt(baseArgs);
    const schemaSection = out.slice(out.indexOf('{'));
    for (const polityField of [
      '"history"', '"current_ruler_sentence"', '"social_history"',
      '"economic_history"', '"military_history"', '"central_dynamic"',
      '"present_state"',
    ]) {
      expect(schemaSection).not.toContain(polityField);
    }
    // npc_list, on the other hand, IS now part of the place schema.
    expect(schemaSection).toContain('"npc_list"');
  });
});
