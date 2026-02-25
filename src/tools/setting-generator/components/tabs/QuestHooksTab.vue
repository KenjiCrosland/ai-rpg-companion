<template>
  <div>
    <h2>Quest Hooks</h2>
    <p style="margin-bottom: 2rem; color: #666; font-style: italic;">
      Quest hooks can be generated from any NPC, but fully generated NPCs (with complete descriptions and
      relationships)
      will produce richer, more detailed quests than basic NPCs.
    </p>

    <div v-if="setting.questHooks?.length > 0">
      <cdr-accordion-group>
        <cdr-accordion
          v-for="(hook, index) in setting.questHooks"
          :key="index"
          :id="'hook-' + index"
          level="2"
          :opened="hook.open"
          @accordion-toggle="hook.open = !hook.open"
        >
          <template #label>
            {{ hook.quest_title }}
          </template>
          <div>
            <cdr-tooltip id="tooltip-example" position="left" class="delete-button">
              <template #trigger>
                <cdr-button size="small" :icon-only="true" :with-background="true"
                  @click.stop="deleteQuestHook(index)">
                  <template #icon>
                    <icon-x-sm />
                  </template>
                </cdr-button>
              </template>
              <div>Delete Quest Hook</div>
            </cdr-tooltip>

            <!-- View Mode -->
            <div v-if="editingQuestHookIndex !== index">
              <h2>{{ hook.quest_title }}</h2>
              <p><strong>Quest Giver:</strong> {{ hook.quest_giver_name }}</p>

              <div v-if="hook.combined_giver_and_quest">
                <p v-for="(paragraph, pIndex) in hook.combined_giver_and_quest.split('\n\n')" :key="pIndex">
                  {{ paragraph }}
                </p>
              </div>
              <div v-else>
                <p>{{ hook.quest_giver_background }}</p>
                <p>{{ hook.quest_giver_encounter }}</p>
                <p>{{ hook.quest_details }}</p>
              </div>

              <h3>Objectives</h3>
              <cdr-list v-for="(objective, objIndex) in hook.objectives" modifier="unordered" :key="objIndex">
                <li>{{ objective }}</li>
              </cdr-list>

              <h3>Challenges</h3>
              <cdr-list v-for="(challenge, chalIndex) in hook.challenges" modifier="unordered" :key="chalIndex">
                <li>{{ challenge }}</li>
              </cdr-list>

              <h3>Rewards</h3>
              <cdr-list v-for="(reward, rewIndex) in hook.rewards" modifier="unordered" :key="rewIndex">
                <li>{{ reward }}</li>
              </cdr-list>

              <h3>Twist</h3>
              <p>{{ hook.twist }}</p>

              <div class="button-group" style="margin-top: 2rem;">
                <cdr-button @click="startEditingQuestHook(index)" modifier="secondary">Edit Quest Hook</cdr-button>
              </div>
            </div>

            <!-- Edit Mode -->
            <div v-else class="edit-form">
              <h2>Edit Quest Hook</h2>

              <cdr-input v-model="questHookEditForm.quest_title" label="Quest Title" background="secondary"
                class="edit-field" />

              <cdr-input v-model="questHookEditForm.quest_giver_name" label="Quest Giver Name"
                background="secondary" class="edit-field" />

              <cdr-input v-model="questHookEditForm.combined_giver_and_quest" label="Quest Giver & Quest Details"
                background="secondary" :rows="10" tag="textarea" class="edit-field">
                <template #helper-text-bottom>
                  Giver background, encounter description, and quest details. Use double line breaks for paragraphs.
                </template>
              </cdr-input>

              <h3>Objectives</h3>
              <div v-for="(objective, objIndex) in questHookEditForm.objectives" :key="objIndex"
                style="margin-bottom: 1rem; padding: 1rem; background: #f4f2ed; border-radius: 4px;">
                <cdr-input v-model="questHookEditForm.objectives[objIndex]" label="Objective" background="secondary" />
                <cdr-button size="small" @click="removeQuestObjective(objIndex)"
                  style="margin-top: 0.5rem;">Remove</cdr-button>
              </div>
              <cdr-button @click="addQuestObjective" modifier="secondary" size="small">Add Objective</cdr-button>

              <h3 style="margin-top: 2rem;">Challenges</h3>
              <div v-for="(challenge, chalIndex) in questHookEditForm.challenges" :key="chalIndex"
                style="margin-bottom: 1rem; padding: 1rem; background: #f4f2ed; border-radius: 4px;">
                <cdr-input v-model="questHookEditForm.challenges[chalIndex]" label="Challenge" background="secondary" />
                <cdr-button size="small" @click="removeQuestChallenge(chalIndex)"
                  style="margin-top: 0.5rem;">Remove</cdr-button>
              </div>
              <cdr-button @click="addQuestChallenge" modifier="secondary" size="small">Add Challenge</cdr-button>

              <h3 style="margin-top: 2rem;">Rewards</h3>
              <div v-for="(reward, rewIndex) in questHookEditForm.rewards" :key="rewIndex"
                style="margin-bottom: 1rem; padding: 1rem; background: #f4f2ed; border-radius: 4px;">
                <cdr-input v-model="questHookEditForm.rewards[rewIndex]" label="Reward" background="secondary" />
                <cdr-button size="small" @click="removeQuestReward(rewIndex)"
                  style="margin-top: 0.5rem;">Remove</cdr-button>
              </div>
              <cdr-button @click="addQuestReward" modifier="secondary" size="small">Add Reward</cdr-button>

              <cdr-input v-model="questHookEditForm.twist" label="Twist" background="secondary" :rows="3"
                tag="textarea" class="edit-field" style="margin-top: 2rem;">
                <template #helper-text-bottom>
                  An unexpected element that adds complexity to the quest
                </template>
              </cdr-input>

              <div class="button-group">
                <cdr-button @click="saveEditQuestHook">Save Changes</cdr-button>
                <cdr-button @click="cancelEditQuestHook" modifier="secondary">Cancel</cdr-button>
              </div>
            </div>
          </div>
        </cdr-accordion>

        <cdr-accordion class="accordion" level="2" id="loading-quest-hook" v-if="loadingQuestHooks">
          <template #label>
            <CdrSkeleton>
              <CdrSkeletonBone type="line" style="width:150px" />
            </CdrSkeleton>
          </template>
        </cdr-accordion>
      </cdr-accordion-group>
    </div>

    <div v-if="!(setting.questHooks?.length > 0) && !loadingQuestHooks">
      <p>Generate quest hooks using NPCs from your setting as quest givers.</p>
    </div>
    <div v-if="!(setting.questHooks?.length > 0) && loadingQuestHooks">
      <cdr-accordion-group>
        <cdr-accordion class="accordion" level="2" id="loading-quest-hook-empty">
          <template #label>
            <CdrSkeleton>
              <CdrSkeletonBone type="line" style="width:150px" />
            </CdrSkeleton>
          </template>
        </cdr-accordion>
      </cdr-accordion-group>
    </div>

    <hr style="margin: 2rem 0;">

    <h3>Generate New Quest Hook</h3>
    <p v-if="!setting.npcs || setting.npcs.length === 0" style="font-style: italic; color: #666;">
      You need to have NPCs generated before you can create quest hooks. Visit the NPCs tab to generate some NPCs
      first.
    </p>
    <div v-else>
      <cdr-select
        v-model="selectedQuestGiverIndex"
        label="Quest Giver"
        :options="questGiverOptions"
        placeholder="Select an NPC"
        background="secondary"
        style="margin-bottom: 1rem;"
      >
        <template #helper-text-bottom>
          Fully generated NPCs will produce more detailed quests
        </template>
      </cdr-select>

      <cdr-select
        label="Quest Type"
        v-model="questType"
        :options="questTypes"
        placeholder="Select a Quest Type"
        background="secondary"
        style="margin-bottom: 1rem;"
      />

      <cdr-button @click="generateQuestHookFromTab" :full-width="true" :disabled="selectedQuestGiverIndex === null">
        Generate Quest Hook
      </cdr-button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import {
  CdrButton,
  CdrInput,
  CdrSelect,
  CdrList,
  CdrAccordionGroup,
  CdrAccordion,
  CdrTooltip,
  CdrSkeleton,
  CdrSkeletonBone,
  IconXSm,
} from '@rei/cedar';
import { generateGptResponse } from '@/util/open-ai.mjs';
import { createQuestHookPrompt } from '@/prompts/index.mjs';

const props = defineProps({
  setting: {
    type: Object,
    required: true,
  },
  premium: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['updated-setting']);

// -------------------------
// Constants
// -------------------------
const randomQuestString = 'Random: Generate a quest with a random objective and theme.';

// -------------------------
// Local state
// -------------------------
const loadingQuestHooks = ref(false);
const selectedQuestGiverIndex = ref(null);
const questType = ref(randomQuestString);
const editingQuestHookIndex = ref(null);
const questHookEditForm = ref({
  quest_title: '',
  quest_giver_name: '',
  combined_giver_and_quest: '',
  objectives: [],
  challenges: [],
  rewards: [],
  twist: '',
});

const questTypes = [
  randomQuestString,
  'Escort: Safeguard a person, creature, or caravan from one location to another.',
  'Rescue: Save a captive or stranded individual from danger.',
  'Investigation: Solve a mystery or uncover hidden truths.',
  'Hunting: Track down and eliminate a dangerous creature or villain.',
  'Diplomacy: Mediate a dispute between warring factions or negotiate a treaty.',
  'Exploration: Chart unknown territories or discover hidden places.',
  'Protection: Defend a village or landmark from an imminent threat.',
  'Delivery: Transport a crucial item or message to a specific location.',
  'Recovery: Retrieve stolen or lost items that are not artifacts.',
  'Construction: Help build or repair a structure, like a bridge or fortification.',
  'Training: Teach or train a group or individual in a specific skill or knowledge.',
  'Distraction: Create a diversion to aid another operation or quest.',
  'Sabotage: Undermine an enemy\'s plans or operations.',
  'Recruitment: Gather individuals to join a cause, guild, or army.',
  'Research: Gather information or resources for a scholarly purpose.',
  'Harvesting: Collect rare ingredients or resources from the environment.',
  'Trade: Facilitate or protect a trade agreement or caravan.',
  'Revenge: Avenge a wrong done to a character or group.',
  'Ceremony: Perform or oversee a significant ritual or event.',
  'Bounty: Capture or kill a wanted criminal or creature.',
  'Alliance: Forge an alliance with a powerful entity or group.',
  'Exorcism: Rid a location or individual of a haunting or curse.',
  'Contest: Win a competition or tournament.',
  'Heist: Steal a valuable item or information from a well-guarded location.',
  'Infiltration: Gain access to a secure location or organization.',
  'Pilgrimage: Travel to a sacred site or complete a spiritual journey.',
  'Curse: Lift a curse or break a magical enchantment.',
  'Mystery: Solve a series of strange occurrences or unexplained phenomena.',
  'Prophecy: Fulfill or prevent a prophecy from coming to pass.',
  'Assassination: Eliminate a target without being detected.',
  'Betrayal: Uncover or prevent a betrayal within a group or organization.',
];

// -------------------------
// Computed
// -------------------------
const questGiverOptions = computed(() => {
  if (!props.setting?.npcs) return [];

  return props.setting.npcs.map((npc, index) => {
    const isFullyGenerated = !!npc.read_aloud_description;
    const label = isFullyGenerated
      ? `${npc.name} (Fully Generated)`
      : `${npc.name} (Basic)`;
    return { text: label, value: index };
  });
});

// -------------------------
// Helper functions
// -------------------------
function questHookValidation(jsonString) {
  try {
    const jsonObj = JSON.parse(jsonString);
    const keys = [
      'quest_title', 'quest_giver_name', 'quest_giver_background',
      'quest_giver_encounter', 'quest_details', 'objectives',
      'challenges', 'rewards', 'twist',
    ];
    return keys.every(key => key in jsonObj);
  } catch {
    return false;
  }
}

function getOverviewText(overviewObject) {
  if (!overviewObject) return '';
  return Object.entries(overviewObject).map(([, value]) => {
    if (Array.isArray(value)) return '';
    return `${value}`;
  }).join('\n');
}

function getFullNPCDescription(npc) {
  const isFullyGenerated = !!npc.read_aloud_description;

  if (!isFullyGenerated) {
    return `${npc.name}: ${npc.description || 'A character in the setting'}`;
  }

  let description = `${npc.read_aloud_description || ''} ${npc.description_of_position || ''} ${npc.current_location || ''} ${npc.distinctive_features_or_mannerisms || ''} ${npc.character_secret || ''}`.trim();

  if (npc.relationships && Object.keys(npc.relationships).length > 0) {
    const relationshipText = Object.entries(npc.relationships)
      .map(([name, desc]) => `${name}: ${desc}`)
      .join(' ');
    description += `\n  Relationships:\n ${relationshipText}`;
  }

  return description;
}

function combineQuestGiverAndDetails(hook) {
  if (!hook) return '';
  const parts = [];
  if (hook.quest_giver_background) parts.push(hook.quest_giver_background);
  if (hook.quest_giver_encounter) parts.push(hook.quest_giver_encounter);
  if (hook.quest_details) parts.push(hook.quest_details);
  return parts.filter(Boolean).join('\n\n');
}

// -------------------------
// Emit helper
// -------------------------
function emitUpdatedSetting(updatedQuestHooks) {
  emit('updated-setting', {
    ...props.setting,
    questHooks: updatedQuestHooks,
  });
}

// -------------------------
// Delete
// -------------------------
const deleteQuestHook = (index) => {
  const updated = [...props.setting.questHooks];
  updated.splice(index, 1);
  emitUpdatedSetting(updated);
};

// -------------------------
// Edit
// -------------------------
const startEditingQuestHook = (index) => {
  const hook = props.setting.questHooks[index];
  questHookEditForm.value = {
    quest_title: hook.quest_title || '',
    quest_giver_name: hook.quest_giver_name || '',
    combined_giver_and_quest: hook.combined_giver_and_quest || combineQuestGiverAndDetails(hook),
    objectives: [...(hook.objectives || [])],
    challenges: [...(hook.challenges || [])],
    rewards: [...(hook.rewards || [])],
    twist: hook.twist || '',
  };
  editingQuestHookIndex.value = index;
};

const cancelEditQuestHook = () => {
  editingQuestHookIndex.value = null;
};

const saveEditQuestHook = () => {
  if (editingQuestHookIndex.value === null) return;

  const updated = props.setting.questHooks.map((hook, i) => {
    if (i !== editingQuestHookIndex.value) return hook;
    return {
      ...hook,
      quest_title: questHookEditForm.value.quest_title,
      quest_giver_name: questHookEditForm.value.quest_giver_name,
      combined_giver_and_quest: questHookEditForm.value.combined_giver_and_quest,
      objectives: [...questHookEditForm.value.objectives],
      challenges: [...questHookEditForm.value.challenges],
      rewards: [...questHookEditForm.value.rewards],
      twist: questHookEditForm.value.twist,
    };
  });

  emitUpdatedSetting(updated);
  editingQuestHookIndex.value = null;
};

// Array manipulation for edit form
const addQuestObjective = () => { questHookEditForm.value.objectives.push(''); };
const removeQuestObjective = (index) => { questHookEditForm.value.objectives.splice(index, 1); };
const addQuestChallenge = () => { questHookEditForm.value.challenges.push(''); };
const removeQuestChallenge = (index) => { questHookEditForm.value.challenges.splice(index, 1); };
const addQuestReward = () => { questHookEditForm.value.rewards.push(''); };
const removeQuestReward = (index) => { questHookEditForm.value.rewards.splice(index, 1); };

// Reset edit state when the parent switches to a different setting
watch(
  () => props.setting,
  (newSetting, oldSetting) => {
    if (newSetting !== oldSetting) {
      editingQuestHookIndex.value = null;
    }
  }
);

// -------------------------
// Generate
// -------------------------
const generateQuestHookFromTab = async () => {
  if (selectedQuestGiverIndex.value === null) return;

  const npc = props.setting.npcs[selectedQuestGiverIndex.value];
  const overviewText = getOverviewText(props.setting.setting_overview);
  const npcText = getFullNPCDescription(npc);

  let hookQuestType = questType.value;
  if (hookQuestType === randomQuestString) {
    hookQuestType = questTypes[Math.floor(Math.random() * questTypes.length)];
  }

  const prompt = createQuestHookPrompt(overviewText, npcText, hookQuestType);

  try {
    loadingQuestHooks.value = true;
    const response = await generateGptResponse(prompt, questHookValidation);
    const questHook = JSON.parse(response);
    questHook.combined_giver_and_quest = combineQuestGiverAndDetails(questHook);

    const updated = [...(props.setting.questHooks || []), questHook];
    emitUpdatedSetting(updated);
  } catch (error) {
    console.error('Error generating quest hook:', error);
  } finally {
    loadingQuestHooks.value = false;
  }
};
</script>

<style scoped>
.delete-button {
  position: absolute;
  top: 65px;
  right: 15px;
  z-index: 1;
}

.edit-form .edit-field {
  margin-bottom: 1.5rem;
}

.button-group {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
}

@media (max-width: 768px) {
  .button-group {
    flex-direction: column;
  }

  .button-group button {
    width: 100%;
  }
}
</style>
