<template>
  <div>
    <h2>Quest Hooks for {{ item.name }}</h2>
    <p>Generate quest hooks related to this magical item. These can serve as adventure seeds for your campaign.</p>

    <div class="quest-generator">
      <cdr-select v-model="questType" label="Quest Type" prompt="Choose a quest type" :options="questTypes" />
      <cdr-button @click="generateQuestHook" :full-width="true" modifier="dark" style="margin-top: 2rem;">
        Generate Quest Hook
      </cdr-button>
      <p v-if="!premium" class="generation-info">
        {{ remainingGenerations }} quest hook{{ remainingGenerations !== 1 ? 's' : '' }} remaining today
      </p>
    </div>

    <cdr-accordion-group v-if="hooks.length > 0 || loadingQuest" style="margin-top: 2rem;">
      <cdr-accordion v-for="(hook, index) in hooks" :key="index" :id="'quest-' + index" level="2" :opened="hook.open"
        @accordion-toggle="toggleOpen(index)">
        <template #label>
          {{ hook.title }}
        </template>

        <div class="quest-content">
          <div v-if="editingIndex === index" class="edit-form">
            <cdr-input v-model="editForm.title" label="Title" background="secondary" class="edit-field" />

            <cdr-input v-model="editForm.questGiver" label="Quest Giver" background="secondary" class="edit-field" />

            <cdr-input v-model="editForm.setup" label="Setup" background="secondary" :rows="4" tag="textarea"
              class="edit-field" />

            <div class="objectives-edit edit-field">
              <label class="section-label">Objectives</label>
              <div v-for="(objective, i) in editForm.objectives" :key="'obj-' + i" class="array-item-row">
                <cdr-input v-model="editForm.objectives[i]" background="secondary" class="array-item-input" :rows="2"
                  :label="`Objective ${i + 1}`" />
                <cdr-button size="small" modifier="dark" @click="removeObjective(i)"
                  v-if="editForm.objectives.length > 1" class="remove-button">
                  Remove
                </cdr-button>
              </div>
              <cdr-button size="small" modifier="secondary" @click="addObjective">
                + Add Objective
              </cdr-button>
            </div>

            <div class="challenges-edit edit-field">
              <label class="section-label">Challenges</label>
              <div v-for="(challenge, i) in editForm.challenges" :key="'chal-' + i" class="array-item-row">
                <cdr-input v-model="editForm.challenges[i]" background="secondary" class="array-item-input" :rows="2"
                  :label="`Challenge ${i + 1}`" />
                <cdr-button size="small" modifier="dark" @click="removeChallenge(i)"
                  v-if="editForm.challenges.length > 1" class="remove-button">
                  Remove
                </cdr-button>
              </div>
              <cdr-button size="small" modifier="secondary" @click="addChallenge">
                + Add Challenge
              </cdr-button>
            </div>

            <cdr-input v-model="editForm.reward" label="Reward" background="secondary" :rows="3" tag="textarea"
              class="edit-field" />

            <cdr-input v-model="editForm.twist" label="Potential Twist (Optional)" background="secondary" :rows="3"
              tag="textarea" class="edit-field" />

            <div class="button-group">
              <cdr-button @click="saveEdit">Save Changes</cdr-button>
              <cdr-button @click="cancelEdit" modifier="secondary">Cancel</cdr-button>
            </div>
          </div>

          <div v-else>
            <h3>{{ hook.title }}</h3>
            <p><strong>Quest Giver:</strong> {{ hook.questGiver }}</p>
            <p>{{ hook.setup }}</p>

            <h4>Objectives</h4>
            <cdr-list modifier="unordered">
              <li v-for="(objective, i) in hook.objectives" :key="i">{{ objective }}</li>
            </cdr-list>

            <h4>Challenges</h4>
            <cdr-list modifier="unordered">
              <li v-for="(challenge, i) in hook.challenges" :key="i">{{ challenge }}</li>
            </cdr-list>

            <h4>Rewards</h4>
            <p>{{ hook.reward }}</p>

            <div v-if="hook.twist" class="quest-twist">
              <h4>Potential Twist</h4>
              <p>{{ hook.twist }}</p>
            </div>

            <div class="button-group">
              <cdr-button @click="startEdit(index)" modifier="secondary">Edit Quest Hook</cdr-button>
              <cdr-button @click="deleteHook(index)" modifier="dark">Delete Quest Hook</cdr-button>
            </div>
          </div>
        </div>
      </cdr-accordion>

      <cdr-accordion level="2" id="loading-location" v-if="loadingQuest" :opened="true">
        <template #label>
          <CdrSkeleton>
            <CdrSkeletonBone type="line" style="width:150px" />
          </CdrSkeleton>
        </template>
        <div><quest-hook-skeleton /></div>
      </cdr-accordion>
    </cdr-accordion-group>
  </div>
</template>

<script setup>
import { ref, watch, computed, onMounted } from 'vue';
import {
  CdrSelect,
  CdrButton,
  CdrList,
  CdrAccordionGroup,
  CdrAccordion,
  CdrInput,
  IconXSm,
  CdrSkeleton,
  CdrSkeletonBone
} from '@rei/cedar';
import QuestHookSkeleton from '../skeletons/QuestHookSkeleton.vue';
import { generateGptResponse } from '../../util/open-ai.mjs';
import { detectIncognito } from 'detectincognitojs';

const props = defineProps({
  item: {
    type: Object,
    required: true
  },
  premium: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['updated-item']);

const loadingQuest = ref(false);
const questType = ref('');
const hooks = ref([]);
const remainingGenerations = ref(5);
const editingIndex = ref(null);
const editForm = ref({
  title: '',
  questGiver: '',
  setup: '',
  objectives: [],
  challenges: [],
  reward: '',
  twist: ''
});

// Initialize hooks from item
const initializeHooks = () => {
  if (props.item?.questHooks && Array.isArray(props.item.questHooks)) {
    hooks.value = props.item.questHooks.map(hook => ({
      ...hook,
      open: hook.open !== undefined ? hook.open : false
    }));
  } else {
    hooks.value = [];
  }
};

// Update remaining generations counter
const updateRemainingGenerations = () => {
  if (props.premium) {
    remainingGenerations.value = Infinity;
    return;
  }

  const MAX_GENERATIONS = 5;
  const storage = window.localStorage;
  const questHookData = JSON.parse(storage.getItem('questHookTracking')) || {
    generationCount: '0',
    firstGenerationTime: null,
  };

  let generationCount = parseInt(questHookData.generationCount) || 0;
  let firstGenerationTime = parseInt(questHookData.firstGenerationTime);
  const currentTime = new Date().getTime();

  // Reset if 24 hours have passed
  if (firstGenerationTime && currentTime - firstGenerationTime >= 86400000) {
    generationCount = 0;
    questHookData.generationCount = '0';
    questHookData.firstGenerationTime = null;
    storage.setItem('questHookTracking', JSON.stringify(questHookData));
  }

  remainingGenerations.value = Math.max(0, MAX_GENERATIONS - generationCount);
};

// Check if user can generate quest hook
const canGenerateQuestHook = async () => {
  if (props.premium) {
    return true;
  }

  const incognitoResult = await detectIncognito();

  if (incognitoResult.isPrivate) {
    alert(
      "The free quest hook generator is not available in incognito or private mode as we can't keep track of the number of quest hooks generated. Please disable incognito mode to use the generator or you can access unlimited quest hook generation as a $5 patron.",
    );
    return false;
  }

  const MAX_GENERATIONS = 5;
  const storage = window.localStorage;
  const questHookData = JSON.parse(storage.getItem('questHookTracking')) || {
    generationCount: '0',
    firstGenerationTime: null,
  };

  let generationCount = parseInt(questHookData.generationCount) || 0;
  let firstGenerationTime = parseInt(questHookData.firstGenerationTime);
  const currentTime = new Date().getTime();

  if (generationCount >= MAX_GENERATIONS) {
    if (!firstGenerationTime || currentTime - firstGenerationTime >= 86400000) {
      // 24 hours in milliseconds
      // Reset the count and set the new day's first generation time
      questHookData.generationCount = '1';
      questHookData.firstGenerationTime = currentTime.toString();
    } else {
      const resetTime = new Date(firstGenerationTime + 86400000);
      const alertMessage = `You have reached the 5 quest hook generation limit for a 24-hour period. Please come back at ${resetTime.toLocaleString()} or you can access unlimited quest hook generation as a $5 patron.`;
      alert(alertMessage);
      return false;
    }
  } else {
    // Increment the count
    questHookData.generationCount = (generationCount + 1).toString();
    if (generationCount === 0) {
      questHookData.firstGenerationTime = currentTime.toString(); // Set the first generation time if this is the first count
    }
  }

  storage.setItem('questHookTracking', JSON.stringify(questHookData)); // Save the updated object to local storage
  updateRemainingGenerations();
  return true;
};

// Initialize on mount
onMounted(() => {
  initializeHooks();
  updateRemainingGenerations();
});

// Watch for item changes (when switching between saved items)
watch(
  () => props.item,
  () => {
    initializeHooks();
  },
  { deep: true }
);

// Watch for premium changes
watch(
  () => props.premium,
  () => {
    updateRemainingGenerations();
  }
);

const questTypes = [
  'Recovery: Retrieve the item from a dangerous location',
  'Protection: Defend the item from those who would steal it',
  'Destruction: Destroy the item to prevent catastrophe',
  'Delivery: Transport the item to its rightful owner',
  'Investigation: Uncover the item\'s true nature and history',
  'Curse Breaking: Free someone from the item\'s curse',
  'Ritual: Use the item in an important ceremony',
  'Trade: Exchange the item for something vital',
  'Theft: Steal the item from a powerful enemy',
  'Creation: Gather components to create or restore the item'
];

const questHookValidation = (jsonString) => {
  try {
    const jsonObj = JSON.parse(jsonString);
    const keys = ['title', 'questGiver', 'setup', 'objectives', 'challenges', 'reward'];
    return keys.every((k) => k in jsonObj) &&
      Array.isArray(jsonObj.objectives) &&
      Array.isArray(jsonObj.challenges);
  } catch {
    return false;
  }
};

const emitUpdatedItem = () => {
  const updatedItem = {
    ...props.item,
    questHooks: [...hooks.value]
  };
  emit('updated-item', updatedItem);
};

const toggleOpen = (index) => {
  hooks.value[index].open = !hooks.value[index].open;
  emitUpdatedItem();
};

const deleteHook = (index) => {
  if (confirm('Are you sure you want to delete this quest hook?')) {
    hooks.value.splice(index, 1);
    emitUpdatedItem();
  }
};

const startEdit = (index) => {
  editingIndex.value = index;
  const hook = hooks.value[index];
  editForm.value = {
    title: hook.title,
    questGiver: hook.questGiver,
    setup: hook.setup,
    objectives: [...hook.objectives],
    challenges: [...hook.challenges],
    reward: hook.reward,
    twist: hook.twist || ''
  };
};

const cancelEdit = () => {
  editingIndex.value = null;
  editForm.value = {
    title: '',
    questGiver: '',
    setup: '',
    objectives: [],
    challenges: [],
    reward: '',
    twist: ''
  };
};

const saveEdit = () => {
  if (editingIndex.value !== null) {
    hooks.value[editingIndex.value] = {
      ...hooks.value[editingIndex.value],
      title: editForm.value.title,
      questGiver: editForm.value.questGiver,
      setup: editForm.value.setup,
      objectives: editForm.value.objectives.filter(obj => obj.trim() !== ''),
      challenges: editForm.value.challenges.filter(chal => chal.trim() !== ''),
      reward: editForm.value.reward,
      twist: editForm.value.twist
    };
    emitUpdatedItem();
    cancelEdit();
  }
};

const addObjective = () => {
  editForm.value.objectives.push('');
};

const removeObjective = (index) => {
  editForm.value.objectives.splice(index, 1);
};

const addChallenge = () => {
  editForm.value.challenges.push('');
};

const removeChallenge = (index) => {
  editForm.value.challenges.splice(index, 1);
};

const generateQuestHook = async () => {
  if (!questType.value) {
    alert('Please select a quest type.');
    return;
  }
  if (!props.item) return;

  // Check if user can generate
  const canGenerate = await canGenerateQuestHook();
  if (!canGenerate) return;

  const questPrompt = `Generate a D&D 5e quest hook for the following magic item:
    Item Name: ${props.item.name}
    Type: ${props.item.item_type}
    Rarity: ${props.item.rarity}
    Features: ${JSON.stringify(props.item.features || {})}
    Lore: ${props.item.lore || ''}

    Quest Type: ${questType.value}

    Create a quest hook with the following structure:
    {
      "title": "A compelling quest title",
      "questGiver": "Name and brief description of the quest giver",
      "setup": "The initial scenario and why the party should care (2-3 sentences)",
      "objectives": ["Primary objective", "Secondary objective", "Optional objective"],
      "challenges": ["First major challenge", "Second major challenge", "Environmental or social obstacle"],
      "reward": "What the party gains beyond just the item itself",
      "twist": "An optional plot twist that could occur during the quest"
    }
    The difficulty and complexity of the quest should align with the item's rarity.
  `;

  try {
    loadingQuest.value = true;
    const response = await generateGptResponse(questPrompt, questHookValidation, 3);
    const questHook = JSON.parse(response);
    hooks.value.push({ ...questHook, open: true });
    emitUpdatedItem();
  } catch (err) {
    console.error('Error generating quest hook:', err);
    alert('Failed to generate quest hook. Please try again.');
  } finally {
    loadingQuest.value = false;
  }
};
</script>

<style scoped lang="scss">
@import '@rei/cdr-tokens/dist/scss/cdr-tokens.scss';

.quest-generator {
  padding: 1.5rem;
  background-color: $cdr-color-background-secondary;
  border-radius: 4px;
  margin-top: 1rem;

  .generation-info {
    margin-top: 1rem;
    margin-bottom: 0;
    font-size: 0.875rem;
    color: $cdr-color-text-secondary;
    text-align: center;
  }
}

.quest-content {
  padding: 1rem;

  .button-group {
    display: flex;
    gap: 1rem;
    margin-top: 2rem;
  }

  .edit-form {
    .edit-field {
      margin-bottom: 1.5rem;
    }

    .section-label {
      display: block;
      font-weight: 500;
      margin-bottom: 1rem;
      color: $cdr-color-text-primary;
    }

    .objectives-edit,
    .challenges-edit {
      .array-item-row {
        display: grid;
        gap: 1rem;
        grid-template-columns: 13fr 1fr;
        margin-bottom: 1rem;
        align-items: end;
        width: 100%;
      }
    }
  }

  h3 {
    margin-top: 0;
  }

  h4 {
    margin-top: 1.5rem;
    margin-bottom: 0.5rem;
    color: $cdr-color-text-primary;
  }

  .quest-twist {
    margin-top: 1.5rem;
    padding: 1rem;
    background-color: $cdr-color-background-secondary;
    border-left: 4px solid $cdr-color-border-primary;
    border-radius: 4px;
  }
}
</style>