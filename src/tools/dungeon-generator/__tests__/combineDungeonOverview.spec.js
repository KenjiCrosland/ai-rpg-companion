/**
 * Tests for combineDungeonOverview — dual-shape plain-prose
 * combiner used for edit-textarea pre-fill.
 */

import { combineDungeonOverview } from '../util/combineDungeonOverview.mjs';

describe('combineDungeonOverview', () => {
  it('returns empty string for null / undefined / non-object input', () => {
    expect(combineDungeonOverview(null)).toBe('');
    expect(combineDungeonOverview(undefined)).toBe('');
  });

  describe('new shape', () => {
    const newShape = {
      overview: 'A low mound of moss-furred stone.',
      relation_to_larger_setting: 'At the southern edge of the Iron Hills.',
      approach_and_threshold: 'A stair descends into a phosphorescent chamber.',
      history: 'Built three centuries ago.',
      dominant_power: 'Vetheras, the lich-king, dreams in the central vault.',
      inhabitants: 'Skeleton wardens and a cultist vigil.',
      notable_inhabitant_facet: 'The cultists have begun arguing.',
      hazards_and_dangers: 'Doors close on a slow rune-clock.',
      notable_hazard_facet: '',
      central_dynamic: 'Vetheras stirs more each cycle.',
      present_state: 'The barrow hums faintly at midnight.',
      difficulty_level: 'A Tier 1 dungeon for novice adventurers.',
    };

    it('includes all primary fields as paragraphs', () => {
      const result = combineDungeonOverview(newShape);
      expect(result).toContain('A low mound of moss-furred stone.');
      expect(result).toContain('Iron Hills');
      expect(result).toContain('phosphorescent chamber');
      expect(result).toContain('three centuries ago');
      expect(result).toContain('Vetheras, the lich-king');
      expect(result).toContain('Skeleton wardens');
      expect(result).toContain('arguing');
      expect(result).toContain('rune-clock');
      expect(result).toContain('stirs more each cycle');
      expect(result).toContain('hums faintly');
      expect(result).toContain('Tier 1');
    });

    it('uses approach_and_threshold (not finding_the_dungeon) for new shape', () => {
      const result = combineDungeonOverview({
        ...newShape,
        finding_the_dungeon: 'OLD APPROACH FIELD',
      });
      expect(result).toContain('phosphorescent chamber');
      expect(result).not.toContain('OLD APPROACH FIELD');
    });

    it('skips empty facet fields', () => {
      const result = combineDungeonOverview({
        ...newShape,
        notable_inhabitant_facet: '',
      });
      // Should not produce trailing whitespace artifacts.
      expect(result).not.toContain('  ');
    });

    it('separates sections with double newlines', () => {
      const result = combineDungeonOverview(newShape);
      expect(result).toContain('\n\n');
      const paragraphs = result.split('\n\n');
      // We have 9 logical sections; with full data we expect ~9 paragraphs.
      expect(paragraphs.length).toBeGreaterThanOrEqual(7);
    });
  });

  describe('legacy shape', () => {
    const legacyShape = {
      overview: 'A grim old place.',
      relation_to_larger_setting: 'In the moors.',
      finding_the_dungeon: 'A two-day ride east of Saltwell.',
      history: 'Built before memory.',
      dominant_power: 'The lich-king Vetheras.',
      dominant_power_goals: 'To wake fully.',
      dominant_power_minions: 'Skeleton wardens and three cultists.',
      miniboss_description: 'Aldwyn the cult-leader.',
      dominant_power_event: 'A vigil reached its sixth night.',
      recent_event_consequences: 'The barrow began to hum.',
      secondary_power: 'A rival cult of Brunhild nearby.',
      secondary_power_event: 'They\'ve been observing.',
      main_problem: 'Vetheras may wake within the year.',
      potential_solutions: 'Disrupt the vigils.',
      conclusion: 'The barrow waits.',
      difficulty_level: 'Tier 1.',
    };

    it('uses finding_the_dungeon for Approach in legacy', () => {
      const result = combineDungeonOverview(legacyShape);
      expect(result).toContain('two-day ride east of Saltwell');
    });

    it('joins dominant_power + goals + miniboss_description into one paragraph', () => {
      const result = combineDungeonOverview(legacyShape);
      const paragraphs = result.split('\n\n');
      // Find the paragraph containing 'lich-king Vetheras'.
      const dpPara = paragraphs.find(p => p.includes('lich-king Vetheras'));
      expect(dpPara).toContain('To wake fully');
      expect(dpPara).toContain('Aldwyn the cult-leader');
    });

    it('puts dominant_power_minions in its own paragraph (Inhabitants)', () => {
      const result = combineDungeonOverview(legacyShape);
      const paragraphs = result.split('\n\n');
      const inhabPara = paragraphs.find(p =>
        p === 'Skeleton wardens and three cultists.'
      );
      expect(inhabPara).toBeTruthy();
    });

    it('collapses dramatic-arc fields into one paragraph (Present State)', () => {
      const result = combineDungeonOverview(legacyShape);
      const paragraphs = result.split('\n\n');
      const presentPara = paragraphs.find(p => p.includes('vigil reached its sixth night'));
      expect(presentPara).toContain('began to hum');
      expect(presentPara).toContain('rival cult of Brunhild');
      expect(presentPara).toContain('Vetheras may wake within the year');
      expect(presentPara).toContain('barrow waits');
    });

    it('does not include defenses section for legacy', () => {
      const result = combineDungeonOverview(legacyShape);
      // Legacy doesn't have the defenses field; it shouldn't surface
      // as literal "undefined" or an empty paragraph.
      expect(result).not.toContain('undefined');
      expect(result).not.toContain('\n\n\n\n');
    });
  });

  describe('partial / sparse data', () => {
    it('skips entire sections when all relevant fields are blank', () => {
      const result = combineDungeonOverview({
        overview: 'lonely overview',
        history: 'lonely history',
        // No relation, approach, dominant, etc.
      });
      expect(result).toBe('lonely overview\n\nlonely history');
    });

    it('returns empty string when no fields are present', () => {
      expect(combineDungeonOverview({})).toBe('');
    });
  });
});
