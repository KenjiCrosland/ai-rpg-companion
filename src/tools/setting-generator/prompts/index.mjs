// Barrel export for backwards compatibility
// Re-exports all prompt functions from their respective modules

export {
  settingOverviewPrompt,
  sublocationOverviewPrompt,
  subLocationsPrompt,
} from './setting-prompts.mjs';

export {
  factionListPrompt,
  detailedFactionPrompt,
  singleFactionPrompt,
} from './faction-prompts.mjs';

export {
  createNPCPrompt,
  createNPCRelationshipPrompt,
  createRelationshipAndTipsPrompt,
  generateSingleRelationshipPrompt,
} from './npc-setting-prompts.mjs';

export {
  createQuestHookPrompt,
} from './quest-setting-prompts.mjs';
