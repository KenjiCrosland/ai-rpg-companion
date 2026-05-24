/**
 * Tests for renderDungeonOverview — section maps, consolidation,
 * dual-shape detection, entity emphasis.
 */

import {
  consolidateOverviewToMarkdown,
  renderOverview,
  pickSectionMap,
} from '../util/renderDungeonOverview.mjs';

function newShape(overrides = {}) {
  return {
    name: 'Eikheim Barrow',
    title: 'Tomb of the Singing Bones',
    overview: 'A low mound of moss-furred stone.',
    relation_to_larger_setting: 'At the southern edge of the Iron Hills.',
    approach_and_threshold: 'A worn stone stair descends into a phosphorescent chamber.',
    history: 'Built three centuries ago.',
    dominant_power: 'Vetheras, the lich-king, dreams in the central vault.',
    inhabitants: 'Skeleton wardens and a cultist vigil in the antechamber.',
    notable_inhabitant_facet: 'The cultists have begun arguing among themselves.',
    traps_and_security: 'Doors close on a slow rune-clock.',
    notable_security_facet: '',
    central_dynamic: 'Vetheras stirs more each cycle.',
    current_occupation: 'Three cultists are conducting the seventh vigil.',
    present_state: 'The barrow hums faintly at midnight.',
    difficulty_level: 'A Tier 1 dungeon for novice adventurers.',
    named_entities: ['Vetheras', 'Aldwyn'],
    ...overrides,
  };
}

function legacyShape(overrides = {}) {
  return {
    name: 'the Hollow Vault',
    title: 'A Bad Old Tomb',
    overview: 'A grim old place.',
    relation_to_larger_setting: 'In the moors.',
    finding_the_dungeon: 'A two-day ride east of Saltwell.',
    history: 'Built before memory.',
    dominant_power: 'The lich-king Vetheras.',
    dominant_power_goals: 'To wake fully.',
    dominant_power_minions: 'Skeleton wardens and three cultists.',
    miniboss_description: 'Aldwyn the cult-leader, mid-fifties, calm.',
    dominant_power_event: 'A cultist vigil reached its sixth night.',
    recent_event_consequences: 'The barrow began to hum at midnight.',
    secondary_power: 'A rival cult of Brunhild has been camping nearby.',
    secondary_power_event: 'They\'ve been observing the hum.',
    main_problem: 'Vetheras may wake within the year.',
    potential_solutions: 'Disrupt the vigils; recover the binding-stones.',
    conclusion: 'The barrow waits.',
    difficulty_level: 'Tier 1.',
    ...overrides,
  };
}

describe('pickSectionMap', () => {
  it('picks NEW map when central_dynamic is present', () => {
    const map = pickSectionMap(newShape());
    // New map has a 'Defenses' section; legacy doesn't.
    expect(map.some(s => s.heading === 'Defenses')).toBe(true);
  });

  it('picks LEGACY map when finding_the_dungeon is present and central_dynamic is not', () => {
    const map = pickSectionMap(legacyShape());
    // Legacy map does NOT have a 'Defenses' section.
    expect(map.some(s => s.heading === 'Defenses')).toBe(false);
  });

  it('defaults to NEW map for unknown shapes (no markers)', () => {
    const map = pickSectionMap({ name: 'x' });
    expect(map.some(s => s.heading === 'Defenses')).toBe(true);
  });

  it('handles null / non-object input', () => {
    expect(pickSectionMap(null)).toBeTruthy();
    expect(pickSectionMap(undefined)).toBeTruthy();
    expect(pickSectionMap('string')).toBeTruthy();
  });
});

describe('consolidateOverviewToMarkdown — new shape', () => {
  it('produces the expected section structure', () => {
    const md = consolidateOverviewToMarkdown(newShape());
    expect(md).toContain('## Region');
    expect(md).toContain('## Approach');
    expect(md).toContain('## History');
    expect(md).toContain('## Dominant Power');
    expect(md).toContain('## Inhabitants');
    expect(md).toContain('## Defenses');
    expect(md).toContain('## Present State');
    expect(md).toContain('## Difficulty');
    // Treasures section was dropped in design — verify it's gone.
    expect(md).not.toContain('## Treasures');
  });

  it('lead has no heading', () => {
    const md = consolidateOverviewToMarkdown(newShape());
    // Lead content appears before any heading.
    const firstHeadingIndex = md.indexOf('## ');
    const beforeHeadings = md.slice(0, firstHeadingIndex);
    expect(beforeHeadings).toContain('A low mound of moss-furred stone.');
  });

  it('groups Inhabitants + facet under the same heading', () => {
    const md = consolidateOverviewToMarkdown(newShape());
    expect(md).toContain('Skeleton wardens and a cultist vigil in the antechamber.');
    expect(md).toContain('The cultists have begun arguing among themselves.');
    // Both should be under the Inhabitants section.
    const inhabitantsIndex = md.indexOf('## Inhabitants');
    const defensesIndex = md.indexOf('## Defenses');
    const section = md.slice(inhabitantsIndex, defensesIndex);
    expect(section).toContain('Skeleton wardens');
    expect(section).toContain('arguing among themselves');
  });

  it('combines central_dynamic + current_occupation + present_state into one Present State section', () => {
    const md = consolidateOverviewToMarkdown(newShape());
    const presentIndex = md.indexOf('## Present State');
    const diffIndex = md.indexOf('## Difficulty');
    const section = md.slice(presentIndex, diffIndex);
    expect(section).toContain('Vetheras stirs more each cycle.');
    expect(section).toContain('Three cultists are conducting the seventh vigil.');
    expect(section).toContain('The barrow hums faintly at midnight.');
  });

  it('skips empty facet fields', () => {
    const md = consolidateOverviewToMarkdown(newShape({
      notable_inhabitant_facet: '',
      notable_security_facet: '',
    }));
    // Sections still present, just with one less field each.
    expect(md).toContain('## Inhabitants');
    expect(md).toContain('## Defenses');
  });

  it('skips entire sections when all fields are blank', () => {
    const overview = newShape({
      traps_and_security: '',
      notable_security_facet: '',
    });
    const md = consolidateOverviewToMarkdown(overview);
    expect(md).not.toContain('## Defenses');
  });
});

describe('consolidateOverviewToMarkdown — legacy shape', () => {
  it('uses legacy section structure (no Defenses)', () => {
    const md = consolidateOverviewToMarkdown(legacyShape());
    expect(md).toContain('## Region');
    expect(md).toContain('## Approach');
    expect(md).toContain('## History');
    expect(md).toContain('## Dominant Power');
    expect(md).toContain('## Inhabitants');
    expect(md).toContain('## Present State');
    expect(md).toContain('## Difficulty');
    expect(md).not.toContain('## Defenses');
    // Treasures was removed from both shapes — verify.
    expect(md).not.toContain('## Treasures');
  });

  it('groups dominant_power + dominant_power_goals + miniboss_description under Dominant Power', () => {
    const md = consolidateOverviewToMarkdown(legacyShape());
    const domIndex = md.indexOf('## Dominant Power');
    const inhabIndex = md.indexOf('## Inhabitants');
    const section = md.slice(domIndex, inhabIndex);
    expect(section).toContain('The lich-king Vetheras.');
    expect(section).toContain('To wake fully.');
    expect(section).toContain('Aldwyn the cult-leader');
  });

  it('routes legacy dominant_power_minions under Inhabitants', () => {
    const md = consolidateOverviewToMarkdown(legacyShape());
    expect(md).toContain('Skeleton wardens and three cultists.');
  });

  it('collapses the legacy dramatic-arc tail into Present State', () => {
    const md = consolidateOverviewToMarkdown(legacyShape());
    const presentIndex = md.indexOf('## Present State');
    const diffIndex = md.indexOf('## Difficulty');
    const section = md.slice(presentIndex, diffIndex);
    expect(section).toContain('cultist vigil reached its sixth night');
    expect(section).toContain('wake within the year');
    expect(section).toContain('The barrow waits.');
  });

  it('uses finding_the_dungeon for Approach in legacy', () => {
    const md = consolidateOverviewToMarkdown(legacyShape());
    expect(md).toContain('A two-day ride east of Saltwell.');
  });
});

describe('renderOverview', () => {
  it('returns parsed AST for new-shape overview', () => {
    const ast = renderOverview(newShape());
    expect(ast.lead).toBeTruthy();
    expect(ast.sections.length).toBeGreaterThan(0);
    expect(ast.sections.some(s => s.heading === 'Defenses')).toBe(true);
  });

  it('returns parsed AST for legacy-shape overview', () => {
    const ast = renderOverview(legacyShape());
    expect(ast.lead).toBeTruthy();
    expect(ast.sections.some(s => s.heading === 'Present State')).toBe(true);
  });

  it('parses combined_content directly when present', () => {
    const overview = {
      name: 'X',
      combined_content: 'first paragraph\n\n## History\n\nthe history',
    };
    const ast = renderOverview(overview);
    expect(ast.lead.children.some(c => c.value && c.value.includes('first paragraph'))).toBe(true);
    expect(ast.sections.some(s => s.heading === 'History')).toBe(true);
  });

  it('applies entity emphasis to first mention only', () => {
    const overview = newShape({
      named_entities: ['Vetheras'],
    });
    const ast = renderOverview(overview);
    // Count entity-tagged nodes for Vetheras across all blocks.
    let entityCount = 0;
    const visitChildren = (children) => {
      if (!children) return;
      for (const child of children) {
        if (child.type === 'entity' && child.value === 'Vetheras') entityCount++;
      }
    };
    if (ast.lead) visitChildren(ast.lead.children);
    for (const section of ast.sections) {
      for (const block of section.blocks) visitChildren(block.children);
    }
    // First mention wraps, subsequent ones stay plain.
    expect(entityCount).toBe(1);
  });

  it('does not emphasize the dungeon name itself', () => {
    const overview = newShape({
      named_entities: ['Eikheim Barrow', 'Vetheras'],
    });
    const ast = renderOverview(overview);
    let dungeonNameWrapped = 0;
    const visitChildren = (children) => {
      if (!children) return;
      for (const child of children) {
        if (child.type === 'entity' && child.value === 'Eikheim Barrow') dungeonNameWrapped++;
      }
    };
    if (ast.lead) visitChildren(ast.lead.children);
    for (const section of ast.sections) {
      for (const block of section.blocks) visitChildren(block.children);
    }
    expect(dungeonNameWrapped).toBe(0);
  });

  it('returns empty AST shape for null overview', () => {
    expect(renderOverview(null)).toEqual({ lead: null, sections: [] });
  });
});
