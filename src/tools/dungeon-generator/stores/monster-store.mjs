import { currentDungeon, monsterLoadingStates } from './dungeon-state.mjs';
import { saveDungeons, findMonsterById } from './dungeon-utils.mjs';
import { canGenerateStatblock } from '@/util/can-generate-statblock.mjs';
import { generateEmbeddedStatblock } from '@/util/embedded-statblock.mjs';
import { generateStatblockForCreature } from '../util/statblock-generator.mjs';
import { saveStatblockToStorage } from '@/util/statblock-storage.mjs';
import { logger } from '@/util/logger.mjs';

export async function createAndGenerateMonster({
  name,
  shortDescription,
  monsterType,
  archetype,
  CR,
  isSpellcaster,
  premium,
}) {
  if (!currentDungeon.value) {
    logger.error('No dungeon selected');
    return null;
  }

  // Fall back to placeholders if user left fields blank
  const monsterName = name && name.trim() !== '' ? name : '';
  const monsterDesc =
    shortDescription && shortDescription.trim() !== '' ? shortDescription : '';

  const newMonsterId = crypto.randomUUID();
  const newMonster = {
    id: newMonsterId,
    name: monsterName,
    CR: CR || '1',
    monsterType: monsterType || 'Random',
    archetype: archetype || 'auto',
    isSpellcaster: !!isSpellcaster,
    // We'll store the short user-provided text in `description` so GPT can expand it
    description: monsterDesc,
    statblock: undefined, // will be filled later
    detailedDescription: undefined,
  };

  // Add monster to the dungeon
  currentDungeon.value.monsters.push(newMonster);
  saveDungeons();

  // Generate only the statblock — the user-provided short text in
  // `description` is the description the monster carries. We no longer
  // expand it into a 4-section detailedDescription in the monsters tab.
  try {
    await generateMonsterStatblock(newMonsterId, premium);
  } catch (error) {
    logger.error('Error generating monster statblock:', error);
  }

  return newMonster;
}

export async function generateMonsterStatblock(monsterId, premium) {
  if (!currentDungeon.value) return;

  const monster = findMonsterById(currentDungeon, monsterId);
  if (!monster) {
    logger.error('Monster not found');
    return;
  }

  const canGen = await canGenerateStatblock(premium);
  if (!canGen) {
    // Set flag to show limit message in UI
    monsterLoadingStates.value[monsterId] = {
      part1: false,
      part2: false,
      description: false,
      generating: false,
      limitReached: true,
    };
    return;
  }

  monsterLoadingStates.value[monsterId] = {
    part1: true,
    part2: true,
    description: false,
    generating: true,
    limitReached: false,
  };

  let generated = null;

  try {
    // Engine-routed generation (phase 1 of the embedded edition migration):
    // resolve call + main call — same two calls as the old part1/part2 flow,
    // now with chassis-exact numbers, the full lint stack, and the shared
    // edition preference. 2014 output arrives in the legacy shape this
    // store already persists; 2024 output is the sections model (rendered
    // by Statblock2024, format-dispatched in MonstersTab).
    const fullDescription = monster.detailedDescription
      ? Object.values(monster.detailedDescription).join('\n')
      : monster.description || 'A mysterious being';
    generated = await generateEmbeddedStatblock({
      name: monster.name,
      cr: monster.CR || '1',
      description: fullDescription,
      caster: monster.isSpellcaster || false,
      // monster.monsterType is the LEGACY Build value ('Stronger Defense')
      // on old saves — map it onto a role; new monsters carry `archetype`.
      archetype: monster.archetype
        ?? ({ 'Stronger Defense': 'defender', 'Stronger Offense': 'brute', Balanced: 'balanced' }[monster.monsterType] ?? 'auto'),
      onResolve: () => {
        monsterLoadingStates.value[monsterId] = {
          part1: false,
          part2: true,
          description: false,
          generating: true,
          limitReached: false,
        };
      },
    });

    const finalStatblock = { id: monster.id, ...generated };
    monster.statblock = finalStatblock;

    // Auto-save to shared storage
    const folderName = currentDungeon.value?.dungeonOverview?.name || 'Dungeon Creatures';
    saveStatblockToStorage(finalStatblock, folderName);
    monster.statblock_name = finalStatblock.name;
    monster.statblock_folder = folderName;

    // Success - save once at the end
    saveDungeons();
  } catch (error) {
    logger.error('Error generating monster statblock:', error);
    monster.statblock = undefined;
    // Don't save here - let finally block handle it
    throw error;
  } finally {
    monsterLoadingStates.value[monsterId] = {
      part1: false,
      part2: false,
      description: false,
      generating: false,
      limitReached: false,
    };
    // Only save if we didn't already save in success path
    // (This handles error case where we cleared partial statblock)
    if (!generated) {
      saveDungeons();
    }
  }
}

export async function updateStatblock(monsterId, statblock) {
  if (!currentDungeon.value) return;

  const monster = findMonsterById(currentDungeon, monsterId);
  if (!monster) {
    logger.error('Monster not found');
    return;
  }

  // Ensure the statblock has an id
  if (!statblock.id) {
    statblock.id = monster.id || crypto.randomUUID();
  }

  // Just store the updated statblock on the monster
  monster.statblock = statblock;
  saveDungeons();
}

export async function generateAndSaveStatblock({
  name,
  CR,
  description,
  isSpellcaster,
  premium,
  monsterType,
}) {
  if (!currentDungeon.value) {
    logger.error('No dungeon selected');
    return;
  }

  try {
    const statblock = await generateStatblockForCreature({
      name,
      CR,
      description,
      isSpellcaster,
      premium,
      monsterType,
    });

    // If we’re not attaching this to an existing monster, just store the statblock somewhere
    // Or you might create a new monster object on the fly:
    const monster = {
      id: crypto.randomUUID(),
      name,
      CR,
      description,
      isSpellcaster,
      monsterType,
      statblock,
    };

    // Push the new monster to the dungeon’s monsters array
    currentDungeon.value.monsters.push(monster);
    saveDungeons();

    return statblock;
  } catch (error) {
    logger.error('Error generating statblock:', error);
    throw error;
  }
}

// Delete the entire monster from the dungeon, including its statblock
export function deleteMonster(monsterId) {
  if (!currentDungeon.value) return;

  const idx = currentDungeon.value.monsters.findIndex(
    (m) => m.id === monsterId,
  );
  if (idx !== -1) {
    currentDungeon.value.monsters.splice(idx, 1);
    saveDungeons();
  }
}
