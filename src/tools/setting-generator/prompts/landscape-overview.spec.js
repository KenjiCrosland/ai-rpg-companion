/**
 * Tests for landscapeOverviewPrompt + validateLandscapeOverviewResponse.
 *
 * Per the project test convention: no prompt-string content tests
 * (those are verified by manual production review). The mechanical
 * surface tested here:
 *
 *   - validateLandscapeOverviewResponse — shape acceptance / rejection
 *     for required fields, named_entities array constraints (empty
 *     array allowed since many landscapes have no named people),
 *     malformed JSON, and the key omissions (polity / place fields
 *     absent is fine; landscape fields absent is rejection).
 *
 *   - landscapeOverviewPrompt — structural contract: returns a
 *     string, references parentName when supplied, omits parent
 *     block when no parent supplied, schema field names match
 *     validator, polity / place field names are absent from the
 *     landscape schema section.
 */

import {
  landscapeOverviewPrompt,
  validateLandscapeOverviewResponse,
} from './setting-prompts.mjs';

const fullLandscapeResponse = {
  name: 'Stonemother',
  title: 'Range of the Singing Peaks',
  overview: 'The wind off the high passes carries a low, almost musical drone...',
  extent: 'The range runs north-south for sixty days\' walk...',
  where_it_sits: 'Between the Eldryssian plain and the fading Imperial Core...',
  what_lives_here: 'Bears, ice-wolves, the dwarven Klofasteinn clan in the deep gallery...',
  travel_and_hazards: 'The Bear-Pass opens for three months in summer; in winter the deep is unreachable...',
  hidden_detail: 'A weathered cairn at the south pass, three stones taller than a man.',
  named_entities: [],
};

function asJson(obj) {
  return JSON.stringify(obj);
}

describe('validateLandscapeOverviewResponse', () => {
  it('accepts a complete landscape-scale response', () => {
    expect(validateLandscapeOverviewResponse(asJson(fullLandscapeResponse))).toBe(true);
  });

  it('accepts an empty named_entities array (common at landscape scale)', () => {
    const r = { ...fullLandscapeResponse, named_entities: [] };
    expect(validateLandscapeOverviewResponse(asJson(r))).toBe(true);
  });

  it('accepts a non-empty named_entities array (when a landscape has a named hermit or watcher)', () => {
    const r = { ...fullLandscapeResponse, named_entities: ['Sigrún Granite-Eye'] };
    expect(validateLandscapeOverviewResponse(asJson(r))).toBe(true);
  });

  it('rejects malformed JSON', () => {
    expect(validateLandscapeOverviewResponse('not json')).toBe(false);
    expect(validateLandscapeOverviewResponse('')).toBe(false);
  });

  it('rejects responses with a missing required string field', () => {
    const required = [
      'name', 'title', 'overview', 'extent',
      'where_it_sits', 'what_lives_here', 'travel_and_hazards', 'hidden_detail',
    ];
    for (const field of required) {
      const r = { ...fullLandscapeResponse };
      delete r[field];
      expect(validateLandscapeOverviewResponse(asJson(r))).toBe(false);
    }
  });

  it('rejects responses where a required field is an empty string', () => {
    const r = { ...fullLandscapeResponse, extent: '   ' };
    expect(validateLandscapeOverviewResponse(asJson(r))).toBe(false);
  });

  it('rejects responses where named_entities is not an array', () => {
    const r = { ...fullLandscapeResponse, named_entities: 'Sigrún' };
    expect(validateLandscapeOverviewResponse(asJson(r))).toBe(false);
  });

  it('does NOT require polity-scale fields (history, current_ruler_sentence, etc.)', () => {
    expect(validateLandscapeOverviewResponse(asJson(fullLandscapeResponse))).toBe(true);
    expect('history' in fullLandscapeResponse).toBe(false);
    expect('current_ruler_sentence' in fullLandscapeResponse).toBe(false);
    expect('npc_list' in fullLandscapeResponse).toBe(false);
  });

  it('does NOT require place-scale fields (features, what_happens_here, who_frequents_here)', () => {
    expect(validateLandscapeOverviewResponse(asJson(fullLandscapeResponse))).toBe(true);
    expect('features' in fullLandscapeResponse).toBe(false);
    expect('what_happens_here' in fullLandscapeResponse).toBe(false);
    expect('who_frequents_here' in fullLandscapeResponse).toBe(false);
  });

  it('accepts npc_list with one named individual (the rare landscape case)', () => {
    const r = {
      ...fullLandscapeResponse,
      npc_list: [
        {
          name: 'Sigrún Granite-Eye',
          description: 'A rune-caster who once stood at the Broken Gate; her cairn still marks the south pass.',
        },
      ],
    };
    expect(validateLandscapeOverviewResponse(asJson(r))).toBe(true);
  });

  it('accepts an empty npc_list array (the typical landscape case — populations, no named individuals)', () => {
    const r = { ...fullLandscapeResponse, npc_list: [] };
    expect(validateLandscapeOverviewResponse(asJson(r))).toBe(true);
  });

  it('accepts a response with no npc_list field at all', () => {
    const r = { ...fullLandscapeResponse };
    delete r.npc_list;
    expect(validateLandscapeOverviewResponse(asJson(r))).toBe(true);
  });

  it('rejects npc_list when it is not an array', () => {
    const r = { ...fullLandscapeResponse, npc_list: 'Sigrún' };
    expect(validateLandscapeOverviewResponse(asJson(r))).toBe(false);
  });

  it('rejects npc_list entries missing name or description', () => {
    const noName = { ...fullLandscapeResponse, npc_list: [{ description: 'no name' }] };
    expect(validateLandscapeOverviewResponse(asJson(noName))).toBe(false);

    const noDesc = { ...fullLandscapeResponse, npc_list: [{ name: 'X' }] };
    expect(validateLandscapeOverviewResponse(asJson(noDesc))).toBe(false);
  });
});

describe('landscapeOverviewPrompt — structural contract', () => {
  const baseArgs = {
    type: 'mountain-range',
    character: ['ancient', 'mountainous', 'song-keeping'],
    register: 'Old-Norse-inspired',
    userName: 'Stonemother',
    tension: 'inheritance-burden',
    bannedTropes: [],
    description: 'A great range where the dwarven clans dig deep.',
    lore: '',
  };

  it('returns a non-empty string', () => {
    const out = landscapeOverviewPrompt(baseArgs);
    expect(typeof out).toBe('string');
    expect(out.length).toBeGreaterThan(100);
  });

  it('emits the PARENT SETTING block when parentName is supplied', () => {
    const out = landscapeOverviewPrompt({
      ...baseArgs,
      parentName: 'the Eldryssian plain',
      parentLore: 'A broad, fertile basin between the Imperial Core and the Verdant States.',
    });
    expect(out).toContain('PARENT SETTING: the Eldryssian plain');
    expect(out).toContain('A broad, fertile basin');
  });

  it('omits the PARENT SETTING block when parentName is missing', () => {
    const out = landscapeOverviewPrompt(baseArgs);
    expect(out).not.toContain('PARENT SETTING:');
  });

  it('includes the landscape-scale required field names in the JSON schema section', () => {
    const out = landscapeOverviewPrompt(baseArgs);
    for (const field of [
      'name', 'title', 'overview', 'extent',
      'where_it_sits', 'what_lives_here', 'travel_and_hazards', 'hidden_detail',
      'named_entities',
    ]) {
      expect(out).toContain(`"${field}"`);
    }
  });

  it('does NOT include polity-only or place-only prose field names in the JSON schema section', () => {
    // npc_list is now part of the landscape schema as a structured
    // side-channel that populates the NPCs tab (0-2 entries at
    // landscape scale, often empty). Other polity- and place-only
    // prose fields must NOT appear.
    const out = landscapeOverviewPrompt(baseArgs);
    const schemaSection = out.slice(out.indexOf('{'));
    for (const otherScaleField of [
      // polity-only
      '"history"', '"current_ruler_sentence"', '"social_history"',
      '"economic_history"', '"military_history"', '"central_dynamic"',
      '"present_state"',
      // place-only
      '"features"', '"what_happens_here"', '"who_frequents_here"',
    ]) {
      expect(schemaSection).not.toContain(otherScaleField);
    }
    expect(schemaSection).toContain('"npc_list"');
  });
});
