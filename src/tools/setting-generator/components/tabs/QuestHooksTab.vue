<template>
  <div class="quest-hooks parchment">
    <!-- Generation form (heading + tagline share this surface) -->
    <div class="quest-hooks-form">
      <div class="quest-hooks-heading">
        <h3 class="quest-hooks-heading__title">Quest Hooks</h3>
        <p class="quest-hooks-heading__tagline">
          Quest hooks can be generated from any NPC, but fully generated NPCs — with complete
          descriptions and relationships — produce richer, more detailed quests than basic ones.
        </p>
      </div>

      <p v-if="!setting.npcs || setting.npcs.length === 0" class="quest-hooks-form__empty">
        You need at least one NPC before you can create quest hooks. Visit the NPCs tab to
        generate some first.
      </p>
      <template v-else>
        <ParField label="Quest giver" required>
          <ParSelect v-model="selectedQuestGiverIndex" :options="questGiverOptions" placeholder="Select an NPC" />
          <template #hint>Fully generated NPCs produce more detailed quests.</template>
        </ParField>
        <ParField label="Quest type">
          <ParSelect v-model="questType" :options="questTypes" placeholder="Select a quest type" />
        </ParField>
        <ParButton
          variant="primary"
          :full-width="true"
          :disabled="selectedQuestGiverIndex === null || loadingQuestHooks"
          @click="generateQuestHookFromTab"
        >
          {{ loadingQuestHooks ? 'Generating…' : 'Generate quest hook' }}
        </ParButton>
      </template>
    </div>

    <!-- Quest hook list (swap-style cards) -->
    <ul v-if="setting.questHooks?.length > 0 || loadingQuestHooks" class="quest-hook-list">
      <li v-for="(hook, index) in setting.questHooks" :key="index" class="quest-hook-item">
        <Transition :css="!reducedMotion" name="hook-swap" mode="out-in">
          <!-- Collapsed -->
          <div
            v-if="!isExpanded(index)"
            key="collapsed"
            class="quest-hook-collapsed"
            role="button"
            tabindex="0"
            :aria-expanded="false"
            :aria-label="`Expand ${hook.quest_title}`"
            @click="toggleExpand(index)"
            @keydown.enter.prevent="toggleExpand(index)"
            @keydown.space.prevent="toggleExpand(index)"
          >
            <div class="quest-hook-collapsed__info">
              <strong class="quest-hook-collapsed__title">{{ hook.quest_title }}</strong>
              <span v-if="getTeaser(hook)" class="quest-hook-collapsed__teaser">{{ getTeaser(hook) }}</span>
            </div>
            <span class="quest-hook-collapsed__chevron" aria-hidden="true">
              <svg viewBox="0 0 12 12" width="18" height="18">
                <polyline points="2,4 6,8 10,4" fill="none" stroke="currentColor" stroke-width="1.6"
                  stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </span>
          </div>

          <!-- Expanded -->
          <div v-else key="expanded" class="quest-card">
            <!-- Inline edit -->
            <div v-if="editingQuestHookIndex === index" class="quest-edit">
              <ParCardInput v-model="questHookEditForm.quest_title" label="Title" />
              <ParCardInput v-model="questHookEditForm.quest_giver_name" label="Quest Giver" />
              <ParCardTextarea v-model="questHookEditForm.combined_giver_and_quest"
                label="Quest Giver & Details" :rows="8" />

              <div class="quest-edit__array">
                <span class="quest-hook__label">Objectives</span>
                <div v-for="(objective, i) in questHookEditForm.objectives" :key="'obj-' + i" class="quest-edit__row">
                  <ParCardInput v-model="questHookEditForm.objectives[i]" :label="`Objective ${i + 1}`" />
                  <ParCardButton variant="muted" size="small" @click="removeQuestObjective(i)">Remove</ParCardButton>
                </div>
                <ParCardButton variant="create" size="small" @click="addQuestObjective">+ Add objective</ParCardButton>
              </div>

              <div class="quest-edit__array">
                <span class="quest-hook__label">Challenges</span>
                <div v-for="(challenge, i) in questHookEditForm.challenges" :key="'chal-' + i" class="quest-edit__row">
                  <ParCardInput v-model="questHookEditForm.challenges[i]" :label="`Challenge ${i + 1}`" />
                  <ParCardButton variant="muted" size="small" @click="removeQuestChallenge(i)">Remove</ParCardButton>
                </div>
                <ParCardButton variant="create" size="small" @click="addQuestChallenge">+ Add challenge</ParCardButton>
              </div>

              <div class="quest-edit__array">
                <span class="quest-hook__label">Rewards</span>
                <div v-for="(reward, i) in questHookEditForm.rewards" :key="'rew-' + i" class="quest-edit__row">
                  <ParCardInput v-model="questHookEditForm.rewards[i]" :label="`Reward ${i + 1}`" />
                  <ParCardButton variant="muted" size="small" @click="removeQuestReward(i)">Remove</ParCardButton>
                </div>
                <ParCardButton variant="create" size="small" @click="addQuestReward">+ Add reward</ParCardButton>
              </div>

              <ParCardTextarea v-model="questHookEditForm.twist" label="Twist (optional)" :rows="3" />

              <div class="quest-card__actions">
                <ParCardButton variant="primary" @click="saveEditQuestHook">Save changes</ParCardButton>
                <ParCardButton variant="muted" @click="cancelEditQuestHook">Cancel</ParCardButton>
              </div>
            </div>

            <!-- View -->
            <div v-else>
              <div
                class="quest-hook-expanded__header"
                role="button"
                tabindex="0"
                :aria-expanded="true"
                :aria-label="`Collapse ${hook.quest_title}`"
                @click="toggleExpand(index)"
                @keydown.enter.prevent="toggleExpand(index)"
                @keydown.space.prevent="toggleExpand(index)"
              >
                <h4 class="quest-hook-expanded__title">{{ hook.quest_title }}</h4>
                <span class="quest-hook-expanded__chevron" aria-hidden="true">
                  <svg viewBox="0 0 12 12" width="18" height="18">
                    <polyline points="2,8 6,4 10,8" fill="none" stroke="currentColor" stroke-width="1.6"
                      stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                </span>
              </div>

              <p class="quest-hook__quest-giver">
                <span class="quest-hook__inline-label">Quest Giver:</span>
                {{ hook.quest_giver_name }}
              </p>

              <div class="quest-hook__prose">
                <template v-if="hook.combined_giver_and_quest">
                  <p v-for="(paragraph, pIndex) in hook.combined_giver_and_quest.split('\n\n')" :key="pIndex">
                    {{ paragraph }}
                  </p>
                </template>
                <template v-else>
                  <p v-if="hook.quest_giver_background">{{ hook.quest_giver_background }}</p>
                  <p v-if="hook.quest_giver_encounter">{{ hook.quest_giver_encounter }}</p>
                  <p v-if="hook.quest_details">{{ hook.quest_details }}</p>
                </template>
              </div>

              <template v-if="hook.objectives?.length">
                <p class="quest-hook__label">Objectives</p>
                <ul class="quest-hook__list">
                  <li v-for="(objective, i) in hook.objectives" :key="i">{{ objective }}</li>
                </ul>
              </template>

              <template v-if="hook.challenges?.length">
                <p class="quest-hook__label">Challenges</p>
                <ul class="quest-hook__list">
                  <li v-for="(challenge, i) in hook.challenges" :key="i">{{ challenge }}</li>
                </ul>
              </template>

              <template v-if="hook.rewards?.length">
                <p class="quest-hook__label">Rewards</p>
                <ul class="quest-hook__list">
                  <li v-for="(reward, i) in hook.rewards" :key="i">{{ reward }}</li>
                </ul>
              </template>

              <div v-if="hook.twist" class="quest-hook__twist">
                <p class="quest-hook__twist-label">Potential Twist</p>
                <p class="quest-hook__twist-body">{{ hook.twist }}</p>
              </div>

              <div class="quest-card__actions">
                <ParCardButton variant="affirmative" size="small" @click="startEditingQuestHook(index)">Edit</ParCardButton>
                <ParCardButton variant="muted" size="small" @click="confirmDelete(index)">Delete</ParCardButton>
              </div>
            </div>
          </div>
        </Transition>
      </li>

      <!-- In-flight generation skeleton -->
      <li v-if="loadingQuestHooks" class="quest-hook-item">
        <div class="quest-card"><quest-hook-skeleton /></div>
      </li>
    </ul>

    <!-- Delete confirmation -->
    <ParConfirm
      :opened="deleteConfirmIndex !== null"
      title="Delete this quest hook?"
      confirm-label="Delete quest hook"
      cancel-label="Cancel"
      :destructive="true"
      @confirm="performDelete"
      @cancel="deleteConfirmIndex = null"
    >
      Deleting <strong>{{ deleteConfirmTitle }}</strong> removes it from this setting.
      This can't be undone.
    </ParConfirm>
  </div>
</template>

<script setup>
import {
  ParButton,
  ParField,
  ParSelect,
  ParCardButton,
  ParCardInput,
  ParCardTextarea,
  ParConfirm,
} from "@/parchment";
import { ref, computed, watch } from 'vue';
import QuestHookSkeleton from '@/components/skeletons/QuestHookSkeleton.vue';
import { logger } from "@/util/logger.mjs";
import { generateGptResponse } from "@/util/ai-client.mjs";
import { createQuestHookPrompt } from '../../prompts/index.mjs';

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
    return { label, value: index };
  });
});

// ── Collapsed ↔ expanded swap (single hook open at a time, local state) ──
const expandedKey = ref(null);
const isExpanded = (index) => expandedKey.value === index;
const toggleExpand = (index) => {
  expandedKey.value = expandedKey.value === index ? null : index;
  // Leaving an editing row cancels its edit.
  if (editingQuestHookIndex.value !== null && editingQuestHookIndex.value !== index) {
    cancelEditQuestHook();
  }
};

// Respect prefers-reduced-motion so the swap doesn't cross-fade.
const reducedMotion = ref(
  typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-reduced-motion: reduce)').matches,
);

// One-line teaser for a collapsed card: first sentence of the quest narrative.
const getTeaser = (hook) => {
  const text = (hook.combined_giver_and_quest
    || hook.quest_details
    || hook.quest_giver_background
    || '').replace(/\s+/g, ' ').trim();
  if (!text) return '';
  const firstSentence = text.match(/^.*?[.!?](\s|$)/)?.[0]?.trim() || text;
  if (firstSentence.length <= 120) return firstSentence;
  const cut = firstSentence.slice(0, 120);
  const lastSpace = cut.lastIndexOf(' ');
  return (lastSpace > 60 ? cut.slice(0, lastSpace) : cut).trimEnd() + '…';
};

// ── Delete confirmation (ParConfirm modal) ──
const deleteConfirmIndex = ref(null);
const deleteConfirmTitle = computed(() =>
  deleteConfirmIndex.value === null
    ? ''
    : (props.setting.questHooks?.[deleteConfirmIndex.value]?.quest_title || 'this quest hook'),
);

// -------------------------
// Helper functions
// -------------------------

// Map any common variant the AI drifts to → canonical snake_case key.
// Covers Title Case, camelCase, and spaced/hyphenated variants. Unknown
// keys pass through; the required-keys check still catches genuinely
// bad responses.
const QUEST_HOOK_KEY_ALIASES = {
  quest_title: 'quest_title', QuestTitle: 'quest_title',
  questTitle: 'quest_title', 'Quest Title': 'quest_title',
  quest_giver_name: 'quest_giver_name', QuestGiverName: 'quest_giver_name',
  questGiverName: 'quest_giver_name', 'Quest Giver Name': 'quest_giver_name',
  quest_giver_background: 'quest_giver_background',
  QuestGiverBackground: 'quest_giver_background',
  questGiverBackground: 'quest_giver_background',
  'Quest Giver Background': 'quest_giver_background',
  quest_giver_encounter: 'quest_giver_encounter',
  QuestGiverEncounter: 'quest_giver_encounter',
  questGiverEncounter: 'quest_giver_encounter',
  'Quest Giver Encounter': 'quest_giver_encounter',
  quest_details: 'quest_details', QuestDetails: 'quest_details',
  questDetails: 'quest_details', 'Quest Details': 'quest_details',
  objectives: 'objectives', Objectives: 'objectives',
  challenges: 'challenges', Challenges: 'challenges',
  rewards: 'rewards', Rewards: 'rewards',
  twist: 'twist', Twist: 'twist',
};

function normalizeQuestHook(raw) {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return null;
  const out = {};
  for (const [k, v] of Object.entries(raw)) {
    out[QUEST_HOOK_KEY_ALIASES[k] || k] = v;
  }
  // Some models nest a {Name, Description, Background} object under
  // quest_giver_name. Flatten into the three flat string fields the
  // template expects.
  const giver = out.quest_giver_name;
  if (giver && typeof giver === 'object' && !Array.isArray(giver)) {
    out.quest_giver_name =
      giver.Name || giver.name || '';
    out.quest_giver_background = out.quest_giver_background ||
      giver.Description || giver.description ||
      giver.Background || giver.background || '';
    out.quest_giver_encounter = out.quest_giver_encounter ||
      giver.Encounter || giver.encounter || '';
  }
  return out;
}

function questHookValidation(jsonString) {
  try {
    const normalized = normalizeQuestHook(JSON.parse(jsonString));
    if (!normalized) return false;
    const required = [
      'quest_title', 'quest_giver_name', 'quest_giver_background',
      'quest_giver_encounter', 'quest_details', 'objectives',
      'challenges', 'rewards', 'twist',
    ];
    return required.every((k) => k in normalized);
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
// Open the ParConfirm modal for the quest hook at `index`.
const confirmDelete = (index) => {
  deleteConfirmIndex.value = index;
};

// Commit the pending deletion once confirmed.
const performDelete = () => {
  const index = deleteConfirmIndex.value;
  if (index === null) return;
  const updated = [...props.setting.questHooks];
  updated.splice(index, 1);
  // Keep the single-open pointer aligned with the shifted indices.
  if (expandedKey.value === index) {
    expandedKey.value = null;
  } else if (expandedKey.value !== null && expandedKey.value > index) {
    expandedKey.value -= 1;
  }
  emitUpdatedSetting(updated);
  deleteConfirmIndex.value = null;
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
      expandedKey.value = null;
    }
  }
);

// -------------------------
// Generate
// -------------------------
const generateQuestHookFromTab = async () => {
  if (selectedQuestGiverIndex.value === null) return;

  // ParSelect emits the native string value; index back into the NPC array.
  const npc = props.setting.npcs[Number(selectedQuestGiverIndex.value)];
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
    const questHook = normalizeQuestHook(JSON.parse(response));
    questHook.combined_giver_and_quest = combineQuestGiverAndDetails(questHook);

    const updated = [...(props.setting.questHooks || []), questHook];
    emitUpdatedSetting(updated);
  } catch (error) {
    logger.error('Error generating quest hook:', error);
  } finally {
    loadingQuestHooks.value = false;
  }
};
</script>

<style scoped>
/* Setting Quest Hooks — parchment swap-card design, mirroring the Item
   Generator's Quest Hooks tab. Wrapped in the same lighter/cooler cream panel
   (and matching 3.75rem/4rem inset) as the Locations / Factions / NPCs tabs so
   the tab chrome stays uniform across the setting generator. */
/* Bare — the shared .setting-tabs container provides the cream surface and
   padding now (the tab strip and content share one card). */
.quest-hooks {
  background: transparent;
  padding: 1rem;
  font-family: var(--par-font-serif, 'Source Serif 4', Georgia, 'Times New Roman', serif);
}

/* ── Heading — shared tab-header standard (2.8rem lapis title + regular
   serif description), consistent with the other setting tabs. Sits inside the
   form surface; the form's flex gap provides the spacing below it. ───────── */
.quest-hooks-heading {
  margin-bottom: 0;
}

.quest-hooks-heading__title {
  margin: 0 0 0.3rem;
  font-family: var(--par-font-serif, 'Source Serif 4', Georgia, 'Times New Roman', serif);
  font-size: 2.8rem;
  font-weight: 600;
  color: var(--par-color-action-primary, #2A4D70);
  line-height: 1.2;
}

.quest-hooks-heading__tagline {
  margin: 0;
  font-family: var(--par-font-serif, 'Source Serif 4', Georgia, 'Times New Roman', serif);
  font-size: 1.5rem;
  font-weight: 400;
  color: var(--par-color-text-secondary, #555);
  line-height: 1.55;
}

/* ── Generation form — sits flat on the tab panel (no inner card), matching
   the NPCs / Locations tabs where the heading + controls share the panel
   surface. ──────────────────────────────────────────────────────────────── */
.quest-hooks-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.quest-hooks-form__empty {
  margin: 0;
  font-size: 1.5rem;
  font-style: italic;
  color: var(--par-color-text-muted, #6b6b6b);
  line-height: 1.6;
}

/* ── Quest hook list (swap-style cards) ─────────────────────────────────── */
.quest-hook-list {
  list-style: none;
  padding: 0;
  margin: 2rem 0 0;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.quest-hook-item {
  list-style: none;
}

.quest-hook-collapsed {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1.5rem;
  padding: 1.6rem 2rem;
  background: var(--par-color-surface, #FBF7F0);
  border: 1.5px solid var(--par-color-border-strong, #c9b99a);
  border-radius: var(--par-radius-sm, 3px);
  box-shadow: var(--par-color-card-shadow, 0 1px 3px rgba(122, 50, 30, 0.04));
  cursor: pointer;
  transition: background-color 0.15s ease, border-color 0.15s ease;
}

.quest-hook-collapsed:hover {
  background: var(--par-color-callout-bg-light, #F8F2E3);
  border-color: var(--par-color-title, #7a1f1f);
}

.quest-hook-collapsed:focus-visible {
  outline: 2px solid var(--par-color-action-primary, #2A4D70);
  outline-offset: 2px;
}

.quest-hook-collapsed__info {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  min-width: 0;
  flex: 1;
}

.quest-hook-collapsed__title {
  font-size: 1.8rem;
  font-weight: 600;
  color: var(--par-color-title, #7a1f1f);
  line-height: 1.3;
}

.quest-hook-collapsed__teaser {
  font-size: 1.4rem;
  font-style: italic;
  color: var(--par-color-text-muted, #6b6b6b);
  line-height: 1.4;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.quest-hook-collapsed__chevron,
.quest-hook-expanded__chevron {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.55rem 0.75rem;
  color: var(--par-color-action-muted, #5A7A9A);
  border: 1px solid var(--par-color-divider, #e2dccd);
  border-radius: var(--par-radius-sm, 3px);
  background: rgba(255, 255, 255, 0.5);
  flex-shrink: 0;
  transition: color 0.15s ease, background-color 0.15s ease, border-color 0.15s ease;
}

.quest-hook-collapsed__chevron svg,
.quest-hook-expanded__chevron svg { display: block; }

.quest-hook-collapsed:hover .quest-hook-collapsed__chevron,
.quest-hook-expanded__header:hover .quest-hook-expanded__chevron {
  color: var(--par-color-title, #7a1f1f);
  border-color: var(--par-color-title, #7a1f1f);
  background: rgba(255, 255, 255, 0.85);
}

/* Cross-fade between collapsed and expanded states. */
.hook-swap-enter-active,
.hook-swap-leave-active {
  transition: opacity 0.15s ease;
}

.hook-swap-enter-from,
.hook-swap-leave-to {
  opacity: 0;
}

/* ── Expanded card (also wraps the loading skeleton) ────────────────────── */
.quest-card {
  padding: 1.6rem 2rem;
  background: var(--par-color-surface, #FBF7F0);
  border: 1.5px solid var(--par-color-border-strong, #c9b99a);
  border-radius: var(--par-radius-sm, 3px);
  box-shadow: var(--par-color-card-shadow, 0 1px 3px rgba(122, 50, 30, 0.04));
}

.quest-hook-expanded__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 1rem;
  cursor: pointer;
}

.quest-hook-expanded__header:focus-visible {
  outline: 2px solid var(--par-color-action-primary, #2A4D70);
  outline-offset: 2px;
  border-radius: var(--par-radius-sm, 3px);
}

.quest-hook-expanded__title {
  margin: 0;
  font-size: 1.95rem;
  font-weight: 600;
  color: var(--par-color-title, #7a1f1f);
  line-height: 1.2;
}

.quest-hook-expanded__header:hover .quest-hook-expanded__title {
  color: var(--par-color-title-deep, #58180d);
}

/* Quest Giver — inline burgundy label + serif body. */
.quest-hook__quest-giver {
  margin: 0 0 1rem;
  font-size: 1.55rem;
  line-height: 1.65;
  color: var(--par-color-text, #222);
}

.quest-hook__inline-label {
  font-weight: 600;
  color: var(--par-color-title, #7a1f1f);
  margin-right: 0.4rem;
}

/* Narrative prose — constrained measure + open leading for readability. */
.quest-hook__prose {
  max-width: 62rem;
  margin: 0 0 0.5rem;
  font-size: 1.55rem;
  line-height: 1.7;
  color: var(--par-color-text, #222);
}

.quest-hook__prose p {
  margin: 0 0 1rem;
}

.quest-hook__prose p:last-child {
  margin-bottom: 0;
}

/* Section labels — burgundy small-caps. */
.quest-hook__label {
  margin: 1.5rem 0 0.5rem;
  font-size: 1.2rem;
  font-weight: 500;
  color: var(--par-color-title, #7a1f1f);
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.quest-hook__list {
  max-width: 62rem;
  margin: 0 0 1rem;
  padding-left: 1.6rem;
  font-size: 1.55rem;
  line-height: 1.65;
  color: var(--par-color-text, #222);
}

.quest-hook__list li {
  margin-bottom: 0.5rem;
}

.quest-hook__list li::marker {
  color: var(--par-color-title, #7a1f1f);
}

/* Potential Twist — warm-tan callout with burgundy left-rule. */
.quest-hook__twist {
  max-width: 62rem;
  margin: 1.5rem 0 0;
  padding: 1rem 1.25rem;
  background: var(--par-color-callout-bg, #f3ebda);
  border-left: 3px solid var(--par-color-title, #7a1f1f);
  border-radius: 0 var(--par-radius-md, 4px) var(--par-radius-md, 4px) 0;
}

.quest-hook__twist-label {
  margin: 0 0 0.5rem;
  font-size: 1.2rem;
  font-weight: 500;
  color: var(--par-color-title, #7a1f1f);
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.quest-hook__twist-body {
  margin: 0;
  font-size: 1.55rem;
  line-height: 1.65;
  color: var(--par-color-text, #222);
}

/* Card action row (view + edit). */
.quest-card__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.7rem;
  margin-top: 1.5rem;
}

/* ── Inline edit form ───────────────────────────────────────────────────── */
.quest-edit {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}

.quest-edit__array {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.quest-edit__array .quest-hook__label {
  margin: 0;
}

.quest-edit__row {
  display: flex;
  align-items: flex-end;
  gap: 0.7rem;
}

.quest-edit__row > :first-child {
  flex: 1;
  min-width: 0;
}

@media (max-width: 560px) {
  .quest-card__actions { flex-direction: column; align-items: stretch; }
  .quest-edit__row { flex-direction: column; align-items: stretch; }
}
</style>
