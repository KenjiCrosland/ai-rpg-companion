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
            <p><strong>Quest Giver:</strong> <span v-html="formatMarkdown(hook.questGiver)"></span></p>
            <p v-html="formatMarkdown(hook.setup)"></p>

            <h4>Objectives</h4>
            <cdr-list modifier="unordered">
              <li v-for="(objective, i) in hook.objectives" :key="i" v-html="formatMarkdown(objective)"></li>
            </cdr-list>

            <h4>Challenges</h4>
            <cdr-list modifier="unordered">
              <li v-for="(challenge, i) in hook.challenges" :key="i" v-html="formatMarkdown(challenge)"></li>
            </cdr-list>

            <h4>Rewards</h4>
            <p v-html="formatMarkdown(hook.reward)"></p>

            <div v-if="hook.twist" class="quest-twist">
              <h4>Potential Twist</h4>
              <p v-html="formatMarkdown(hook.twist)"></p>
            </div>

            <div class="button-group">
              <cdr-button @click="startEdit(index)" modifier="secondary">Edit Quest Hook</cdr-button>
              <cdr-button @click="deleteHook(index)" modifier="dark">Delete Quest Hook</cdr-button>
            </div>

            <!-- Export Section for this quest hook -->
            <div class="quest-export-section">
              <h4>Export This Quest</h4>
              <div class="export-options">
                <cdr-button @click="exportQuestAsMarkdown(hook)" modifier="secondary" size="small">
                  Copy as Markdown
                </cdr-button>
                <cdr-button @click="exportQuestAsPlainText(hook)" modifier="secondary" size="small">
                  Copy as Plain Text
                </cdr-button>
              </div>
              <p class="export-tip">
                Use markdown with <cdr-link href="https://homebrewery.naturalcrit.com/new"
                  target="_blank">Homebrewery</cdr-link>
                for beautiful D&D-styled handouts
              </p>
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

    <!-- Export All Section -->
    <div v-if="hooks.length > 0" class="export-all-section">
      <h3>Export All Quest Hooks</h3>
      <p class="export-description">
        Export all quest hooks for this item together. Perfect for creating a campaign handout with multiple adventure
        options.
      </p>

      <div class="export-options">
        <div class="export-option">
          <cdr-button @click="exportAllQuestsAsMarkdown" modifier="secondary" :full-width="true">
            Copy All as Markdown
          </cdr-button>
          <p class="option-description">For use with <a href="https://homebrewery.naturalcrit.com/new"
              target="_blank">Homebrewery</a> or other markdown tools</p>
        </div>

        <div class="export-option">
          <cdr-button @click="exportAllQuestsAsPlainText" modifier="secondary" :full-width="true">
            Copy All as Plain Text
          </cdr-button>
          <p class="option-description">Simple format for notes or sharing in chat</p>
        </div>
      </div>
    </div>
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
  CdrLink,
  IconXSm,
  CdrSkeleton,
  CdrSkeletonBone
} from '@rei/cedar';
import QuestHookSkeleton from '@/components/skeletons/QuestHookSkeleton.vue';
import { generateGptResponse } from "@/util/ai-client.mjs";
import { detectIncognito } from 'detectincognitojs';
import { readQuota, writeQuota, remainingFromQuota, ensureQuotaSeeded } from '@/util/quota-storage.mjs';
import { useToast } from '@/composables/useToast';

const toast = useToast();

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

const MAX_GENERATIONS = 5;
const RESET_WINDOW_MS = 86400000;

// Update remaining generations counter
const updateRemainingGenerations = async () => {
  if (props.premium) {
    remainingGenerations.value = Infinity;
    return;
  }
  const quota = await readQuota('quest-hook');
  remainingGenerations.value = remainingFromQuota(quota, MAX_GENERATIONS, RESET_WINDOW_MS);
};

// Check if user can generate quest hook
const canGenerateQuestHook = async () => {
  if (props.premium) {
    await ensureQuotaSeeded('quest-hook');
    return true;
  }

  const incognitoResult = await detectIncognito();

  if (incognitoResult.isPrivate) {
    toast.warning(
      "The free quest hook generator is not available in incognito or private mode. Please disable incognito mode or become a $5 patron for unlimited access.",
      8000
    );
    return false;
  }

  const quota = await readQuota('quest-hook');

  if (!quota.valid) {
    toast.warning(
      "Quest hook tracking data couldn't be read. Clear this site's browser storage to reset, or become a $5 patron for unlimited access.",
      8000
    );
    return false;
  }

  const { count, firstGenTime } = quota;
  const now = Date.now();

  if (count >= MAX_GENERATIONS) {
    if (!firstGenTime || now - firstGenTime >= RESET_WINDOW_MS) {
      await writeQuota('quest-hook', { count: 1, firstGenTime: now });
    } else {
      const resetTime = new Date(firstGenTime + RESET_WINDOW_MS);
      toast.warning(`You've reached the 5 quest hook generation limit. Come back at ${resetTime.toLocaleString()} or become a $5 patron for unlimited access.`, 8000);
      return false;
    }
  } else {
    await writeQuota('quest-hook', {
      count: count + 1,
      firstGenTime: count === 0 ? now : firstGenTime,
    });
  }

  await updateRemainingGenerations();
  return true;
};

// Export functions for individual quest hooks
const exportQuestAsMarkdown = (hook) => {
  let markdown = `## ${hook.title}\n\n`;
  markdown += `**Quest Giver:** ${hook.questGiver}\n\n`;
  markdown += `${hook.setup}\n\n`;
  markdown += `### Objectives\n`;
  hook.objectives.forEach(obj => {
    markdown += `- ${obj}\n`;
  });
  markdown += `\n### Challenges\n`;
  hook.challenges.forEach(challenge => {
    markdown += `- ${challenge}\n`;
  });
  markdown += `\n### Rewards\n${hook.reward}\n`;
  if (hook.twist) {
    markdown += `\n### Potential Twist\n${hook.twist}\n`;
  }
  markdown += `\n---\n\n*Quest hook for ${props.item.name}*`;

  navigator.clipboard.writeText(markdown);
  toast.success('Quest hook copied as markdown! Paste it into Homebrewery to see it formatted.');
};

const exportQuestAsPlainText = (hook) => {
  let text = `${hook.title}\n\n`;
  text += `Quest Giver: ${hook.questGiver}\n\n`;
  text += `${hook.setup}\n\n`;
  text += `Objectives:\n`;
  hook.objectives.forEach(obj => {
    text += `• ${obj}\n`;
  });
  text += `\nChallenges:\n`;
  hook.challenges.forEach(challenge => {
    text += `• ${challenge}\n`;
  });
  text += `\nRewards: ${hook.reward}\n`;
  if (hook.twist) {
    text += `\nPotential Twist: ${hook.twist}\n`;
  }
  text += `\n---\n\nQuest hook for ${props.item.name}`;

  navigator.clipboard.writeText(text);
  toast.success('Quest hook copied as plain text!');
};

// Export all quest hooks
const exportAllQuestsAsMarkdown = () => {
  let markdown = `# Quest Hooks for ${props.item.name}\n\n`;

  hooks.value.forEach((hook, index) => {
    if (index > 0) markdown += '\n---\n\n';
    markdown += `## ${hook.title}\n\n`;
    markdown += `**Quest Giver:** ${hook.questGiver}\n\n`;
    markdown += `${hook.setup}\n\n`;
    markdown += `### Objectives\n`;
    hook.objectives.forEach(obj => {
      markdown += `- ${obj}\n`;
    });
    markdown += `\n### Challenges\n`;
    hook.challenges.forEach(challenge => {
      markdown += `- ${challenge}\n`;
    });
    markdown += `\n### Rewards\n${hook.reward}\n`;
    if (hook.twist) {
      markdown += `\n### Potential Twist\n${hook.twist}\n`;
    }
  });

  navigator.clipboard.writeText(markdown);
  toast.success('All quest hooks copied as markdown! Paste into Homebrewery to see them formatted.');
};

const exportAllQuestsAsPlainText = () => {
  let text = `Quest Hooks for ${props.item.name}\n`;
  text += `${props.item.item_type}, ${props.item.rarity}\n`;
  text += `${'='.repeat(50)}\n\n`;

  hooks.value.forEach((hook, index) => {
    if (index > 0) text += `\n${'-'.repeat(50)}\n\n`;
    text += `${hook.title}\n\n`;
    text += `Quest Giver: ${hook.questGiver}\n\n`;
    text += `${hook.setup}\n\n`;
    text += `Objectives:\n`;
    hook.objectives.forEach(obj => {
      text += `• ${obj}\n`;
    });
    text += `\nChallenges:\n`;
    hook.challenges.forEach(challenge => {
      text += `• ${challenge}\n`;
    });
    text += `\nRewards: ${hook.reward}\n`;
    if (hook.twist) {
      text += `\nPotential Twist: ${hook.twist}\n`;
    }
  });

  navigator.clipboard.writeText(text);
  toast.success('All quest hooks copied as plain text!');
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

// Maps any common variant the AI drifts to → canonical camelCase key.
// Covers Title Case, "Spaced Title Case", and PascalCase. Unknown keys
// pass through so we don't silently lose anything; the required-keys
// check still catches genuinely bad responses.
const QUEST_HOOK_KEY_ALIASES = {
  title: 'title', Title: 'title',
  questGiver: 'questGiver', QuestGiver: 'questGiver',
  'Quest Giver': 'questGiver', 'quest giver': 'questGiver', 'quest_giver': 'questGiver',
  setup: 'setup', Setup: 'setup',
  objectives: 'objectives', Objectives: 'objectives',
  challenges: 'challenges', Challenges: 'challenges',
  reward: 'reward', Reward: 'reward',
  twist: 'twist', Twist: 'twist',
};

// Coerce a possibly-nested questGiver object ({Name, Description}) or
// reward object ({Items, Other}) into the single string the template
// expects. The model occasionally splits them despite the prompt.
function flattenQuestGiver(value) {
  if (typeof value === 'string') return value;
  if (!value || typeof value !== 'object') return '';
  const name = value.Name || value.name || '';
  const desc = value.Description || value.description || '';
  return [name, desc].filter(Boolean).join('. ').trim();
}

function flattenReward(value) {
  if (typeof value === 'string') return value;
  if (!value || typeof value !== 'object') return '';
  const itemsRaw = value.Items || value.items;
  const items = Array.isArray(itemsRaw) ? itemsRaw.join(', ') : (itemsRaw || '');
  const other = value.Other || value.other || '';
  return [items, other].filter(Boolean).join(' ').trim();
}

function normalizeQuestHook(raw) {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return null;
  const out = {};
  for (const [k, v] of Object.entries(raw)) {
    out[QUEST_HOOK_KEY_ALIASES[k] || k] = v;
  }
  if (out.questGiver !== undefined) out.questGiver = flattenQuestGiver(out.questGiver);
  if (out.reward !== undefined) out.reward = flattenReward(out.reward);
  return out;
}

const questHookValidation = (jsonString) => {
  try {
    const normalized = normalizeQuestHook(JSON.parse(jsonString));
    if (!normalized) return false;
    const required = ['title', 'questGiver', 'setup', 'objectives', 'challenges', 'reward'];
    return required.every((k) => k in normalized) &&
      Array.isArray(normalized.objectives) &&
      Array.isArray(normalized.challenges);
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

const formatMarkdown = (text) => {
  if (!text) return text;

  // Escape HTML to prevent XSS
  const escapeHtml = (str) => {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  };

  // Escape any existing HTML first
  text = escapeHtml(text);

  // Then apply markdown formatting (now safe because we escaped first)
  // Bold first (double asterisks)
  text = text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  // Then italic (single asterisks)
  text = text.replace(/\*(.+?)\*/g, '<em>$1</em>');

  return text;
};

const generateQuestHook = async () => {
  if (!questType.value) {
    toast.warning('Please select a quest type.');
    return;
  }
  if (!props.item) return;

  // Check if user can generate
  const canGenerate = await canGenerateQuestHook();
  if (!canGenerate) return;

  const questPrompt = `You are a D&D 5e quest designer. Create quest hooks that are detailed enough to run with minimal prep.

RESPONSE FORMAT — STRICT REQUIREMENTS (deviations will be rejected):
- Return ONLY valid JSON. No prose before or after. No markdown fences.
- Use these EXACT field names, lowercase camelCase, case-sensitive:
  title, questGiver, setup, objectives, challenges, reward, twist
- DO NOT use Title Case or spaces in keys. Wrong: "Title", "Quest Giver",
  "QuestGiver". Correct: "title", "questGiver".
- title, questGiver, setup, reward, and twist are STRINGS, not objects.
  Do NOT split questGiver into {Name, Description}. Do NOT split reward
  into {Items, Other}. Combine the information into a single string.
- objectives and challenges are ARRAYS of strings (3-4 items each).

Content rules:
- questGiver: 2-3 sentences. One visual detail, one motivation.
- setup: 3-4 sentences. What happened, why the party, what's at stake.
- objectives: 3-4 entries, one sentence each.
- challenges: 3-4 entries, 2 sentences each. Include specific creature
  types, DCs, or environmental details.
- reward: 2-3 sentences. Named items and concrete benefits.
- twist: 2-3 sentences. A specific complication, not just a concept.

Generate a D&D 5e quest hook for the following magic item:
    Item Name: ${props.item.name}
    Type: ${props.item.item_type}
    Rarity: ${props.item.rarity}
    Features: ${JSON.stringify(props.item.features || {})}
    Lore: ${props.item.lore || ''}

    Quest Type: ${questType.value}

    Schema example (use these exact key names — fill in your own values):
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
    const questHook = normalizeQuestHook(JSON.parse(response));
    hooks.value.push({ ...questHook, open: true });
    emitUpdatedItem();
  } catch (err) {
    console.error('Error generating quest hook:', err);
    toast.error('Failed to generate quest hook. Please try again.');
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

  // Individual quest export section
  .quest-export-section {
    margin-top: 2rem;
    padding: 1rem;
    background-color: rgba($cdr-color-background-secondary, 0.5);
    border-radius: 4px;
    border: 1px solid $cdr-color-border-secondary;

    h4 {
      margin-top: 0;
      margin-bottom: 1rem;
      font-size: 1rem;
    }

    .export-options {
      display: flex;
      gap: 0.75rem;
      margin-bottom: 0.75rem;
      flex-wrap: wrap;
    }

    .export-tip {
      font-size: 0.85rem;
      color: $cdr-color-text-secondary;
      font-style: italic;
      margin: 0;
    }
  }
}

// Export all section at the bottom
.export-all-section {
  margin-top: 3rem;
  padding: 1.5rem;
  background-color: $cdr-color-background-secondary;
  border-radius: 8px;

  h3 {
    margin-top: 0;
    margin-bottom: 1rem;
  }

  .export-description {
    margin-bottom: 1.5rem;
    line-height: 1.5;
    color: $cdr-color-text-secondary;
  }

  .export-options {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
  }

  .export-option {
    .option-description {
      margin-top: 0.5rem;
      font-size: 0.875rem;
      color: $cdr-color-text-secondary;
      font-style: italic;
    }
  }
}

// Responsive adjustments
@media (max-width: 768px) {
  .quest-content {
    .button-group {
      flex-direction: column;

      button {
        width: 100%;
      }
    }

    .quest-export-section {
      .export-options {
        flex-direction: column;

        button {
          width: 100%;
        }
      }
    }
  }

  .export-all-section {
    .export-options {
      grid-template-columns: 1fr;
    }
  }
}
</style>