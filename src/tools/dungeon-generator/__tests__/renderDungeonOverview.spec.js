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
    quest_hook: 'An Ash-Bearer factor pays 200gp for the Singing Bones before the next full moon.',
    relation_to_larger_setting: 'At the southern edge of the Iron Hills.',
    approach_and_threshold: 'A worn stone stair descends into a phosphorescent chamber.',
    history: 'Built three centuries ago.',
    dominant_power: 'Vetheras, the lich-king, dreams in the central vault.',
    inhabitants: 'Skeleton wardens and a cultist vigil in the antechamber.',
    notable_inhabitant_facet: 'The cultists have begun arguing among themselves.',
    hazards_and_dangers: 'Doors close on a slow rune-clock.',
    notable_hazard_facet: '',
    central_dynamic: 'Vetheras stirs more each cycle.',
    present_state: 'The barrow hums faintly at midnight.',
    potential_outcomes: 'The rune-clock can be slowed by hammering the central altar out of tune. Vetheras re-binds into dreamless sleep if his true name is recited at the vault. Aldwyn fights when confronted, and the cult scatters with him.',
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
    // New map has a Potential Outcomes section; legacy doesn't.
    expect(map.some(s => s.heading === 'Potential Outcomes')).toBe(true);
  });

  it('picks LEGACY map when finding_the_dungeon is present and central_dynamic is not', () => {
    const map = pickSectionMap(legacyShape());
    expect(map.some(s => s.heading === 'Potential Outcomes')).toBe(false);
  });

  it('defaults to NEW map for unknown shapes (no markers)', () => {
    const map = pickSectionMap({ name: 'x' });
    expect(map.some(s => s.heading === 'Potential Outcomes')).toBe(true);
  });

  it('neither section map renders a Hazards section (hazards is downstream-only)', () => {
    // hazards_and_dangers stays in the JSON schema for the room
    // generator, but the GM-facing UI no longer renders a Hazards
    // section — the field's content surfaces via POV / inhabitants /
    // present_state consequences instead.
    expect(pickSectionMap(newShape()).some(s => s.heading === 'Hazards')).toBe(false);
    expect(pickSectionMap(legacyShape()).some(s => s.heading === 'Hazards')).toBe(false);
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
    expect(md).toContain('## Quest Hook');
    expect(md).toContain('## Approach');
    expect(md).toContain('## History');
    expect(md).toContain('## Inhabitants');
    expect(md).toContain('## Present State');
    expect(md).toContain('## Potential Outcomes');
    // Hazards section was dropped from the UI render — the field is
    // still generated, validated, and persisted, but surfaces to the
    // GM via POV / inhabitants / present_state consequences.
    expect(md).not.toContain('## Hazards');
    // Difficulty section was removed from the UI render — verify it's gone.
    expect(md).not.toContain('## Difficulty');
    // Potential Outcomes (originally "Resolutions") superseded both
    // the original Resolution Paths and the brief Levers/Costs split —
    // single prose section now.
    expect(md).not.toContain('## Resolutions');
    expect(md).not.toContain('## Resolution Paths');
    expect(md).not.toContain('## Levers');
    expect(md).not.toContain('## Costs');
    // Region merged into Approach in the consolidation.
    expect(md).not.toContain('## Region');
    // Dominant Power merged into Inhabitants in the consolidation.
    expect(md).not.toContain('## Dominant Power');
    // Treasures section was dropped in design — verify it's gone.
    expect(md).not.toContain('## Treasures');
  });

  it('renders Quest Hook as a non-list section right after the lead', () => {
    const md = consolidateOverviewToMarkdown(newShape());
    const leadEnd = md.indexOf('## ');
    expect(md.slice(leadEnd, leadEnd + 100)).toContain('## Quest Hook');
    expect(md).toContain('An Ash-Bearer factor pays 200gp');
  });

  it('renders Potential Outcomes as a prose paragraph (no list, no bullets)', () => {
    const md = consolidateOverviewToMarkdown(newShape());
    const idx = md.indexOf('## Potential Outcomes');
    expect(idx).toBeGreaterThan(-1);
    const section = md.slice(idx);
    expect(section).toContain('rune-clock can be slowed');
    expect(section).toContain('Vetheras re-binds');
    expect(section).toContain('Aldwyn fights when confronted');
    // No bullet markers.
    expect(section).not.toMatch(/\n- /);
  });

  it('Potential Outcomes section is skipped when potential_outcomes is missing', () => {
    const overview = newShape();
    delete overview.potential_outcomes;
    const md = consolidateOverviewToMarkdown(overview);
    expect(md).not.toContain('## Potential Outcomes');
  });

  it('lead has no heading', () => {
    const md = consolidateOverviewToMarkdown(newShape());
    // Lead content appears before any heading.
    const firstHeadingIndex = md.indexOf('## ');
    const beforeHeadings = md.slice(0, firstHeadingIndex);
    expect(beforeHeadings).toContain('A low mound of moss-furred stone.');
  });

  it('groups dominant_power + inhabitants + facet under the merged Inhabitants heading', () => {
    const md = consolidateOverviewToMarkdown(newShape());
    expect(md).toContain('Skeleton wardens and a cultist vigil in the antechamber.');
    expect(md).toContain('The cultists have begun arguing among themselves.');
    // All three pieces should be under the merged Inhabitants section.
    // The next section after Inhabitants is Present State (Hazards
    // is no longer rendered in UI).
    const inhabitantsIndex = md.indexOf('## Inhabitants');
    const presentStateIndex = md.indexOf('## Present State');
    const section = md.slice(inhabitantsIndex, presentStateIndex);
    expect(section).toContain('Skeleton wardens');
    expect(section).toContain('arguing among themselves');
    // The dominant_power field is also under this section.
    expect(section).toContain('Vetheras, the lich-king');
  });

  it('groups relation_to_larger_setting + approach_and_threshold under the merged Approach heading', () => {
    const md = consolidateOverviewToMarkdown(newShape());
    const approachIndex = md.indexOf('## Approach');
    const historyIndex = md.indexOf('## History');
    const section = md.slice(approachIndex, historyIndex);
    expect(section).toContain('At the southern edge of the Iron Hills.');
    expect(section).toContain('A worn stone stair descends');
  });

  it('combines central_dynamic + present_state into one Present State section', () => {
    const md = consolidateOverviewToMarkdown(newShape());
    const presentIndex = md.indexOf('## Present State');
    const section = md.slice(presentIndex);
    expect(section).toContain('Vetheras stirs more each cycle.');
    expect(section).toContain('The barrow hums faintly at midnight.');
  });

  it('skips empty facet fields', () => {
    const md = consolidateOverviewToMarkdown(newShape({
      notable_inhabitant_facet: '',
      notable_hazard_facet: '',
    }));
    // Inhabitants is still present (it has fields beyond the facet).
    expect(md).toContain('## Inhabitants');
    // Hazards is not rendered in UI regardless of facet state.
    expect(md).not.toContain('## Hazards');
  });

  it('ignores stale hazards fields from legacy dungeon data', () => {
    // hazards_and_dangers was removed from the schema in 2026-05.
    // Legacy dungeons may still carry it in localStorage; the
    // renderer must not surface those stale fields.
    const md = consolidateOverviewToMarkdown(newShape({
      hazards_and_dangers: 'A legacy hazards block from before the field was dropped.',
      notable_hazard_facet: 'A legacy facet detail.',
    }));
    expect(md).not.toContain('## Hazards');
    expect(md).not.toContain('A legacy hazards block');
    expect(md).not.toContain('A legacy facet detail');
  });
});

describe('consolidateOverviewToMarkdown — legacy shape', () => {
  it('uses legacy section structure (no Hazards) with merged headings', () => {
    const md = consolidateOverviewToMarkdown(legacyShape());
    expect(md).toContain('## Approach');
    expect(md).toContain('## History');
    expect(md).toContain('## Inhabitants');
    expect(md).toContain('## Present State');
    // Difficulty section was removed from the UI render.
    expect(md).not.toContain('## Difficulty');
    expect(md).not.toContain('## Hazards');
    expect(md).not.toContain('## Region');
    expect(md).not.toContain('## Dominant Power');
    // Treasures was removed from both shapes — verify.
    expect(md).not.toContain('## Treasures');
  });

  it('groups dominant_power + dominant_power_goals + miniboss_description + dominant_power_minions under merged Inhabitants', () => {
    const md = consolidateOverviewToMarkdown(legacyShape());
    const inhabIndex = md.indexOf('## Inhabitants');
    const presentIndex = md.indexOf('## Present State');
    const section = md.slice(inhabIndex, presentIndex);
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
    const section = md.slice(presentIndex);
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
    // New shape has a Potential Outcomes section (legacy doesn't).
    expect(ast.sections.some(s => s.heading === 'Potential Outcomes')).toBe(true);
    // Hazards is dropped from UI render even in the new shape.
    expect(ast.sections.some(s => s.heading === 'Hazards')).toBe(false);
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
