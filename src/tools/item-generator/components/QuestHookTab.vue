<template>
  <div class="quest-hooks parchment">
    <div class="quest-hooks-form">
      <div class="quest-hooks-heading">
        <h2 class="quest-hooks-heading__title">Quest Hooks for {{ item.name }}</h2>
        <p class="quest-hooks-heading__tagline">
          Adventure seeds for your campaign — quest givers, objectives, twists.
        </p>
      </div>

      <ParField label="Quest type" required>
        <ParSelect v-model="questType" :options="questTypes" placeholder="Choose a quest type" />
      </ParField>
      <ParButton variant="primary" :disabled="!questType || loadingQuest" @click="generateQuestHook">
        {{ loadingQuest ? 'Generating…' : 'Generate quest hook' }}
      </ParButton>
      <p v-if="!premium" class="quest-hooks-form__limit">
        {{ remainingGenerations }} quest hook{{ remainingGenerations !== 1 ? 's' : '' }} remaining today
      </p>
    </div>

    <ul v-if="hooks.length > 0 || loadingQuest" class="quest-hook-list">
      <li v-for="(hook, index) in hooks" :key="index" class="quest-hook-item">
        <Transition :css="!reducedMotion" name="hook-swap" mode="out-in">
          <!-- Collapsed: title + one-line teaser + chevron; whole row toggles -->
          <div
            v-if="!isExpanded(index)"
            key="collapsed"
            class="quest-hook-collapsed"
            role="button"
            tabindex="0"
            :aria-expanded="false"
            :aria-label="`Expand ${hook.title}`"
            @click="toggleExpand(index)"
            @keydown.enter.prevent="toggleExpand(index)"
            @keydown.space.prevent="toggleExpand(index)"
          >
            <div class="quest-hook-collapsed__info">
              <strong class="quest-hook-collapsed__title">{{ hook.title }}</strong>
              <span v-if="getTeaser(hook)" class="quest-hook-collapsed__teaser">{{ getTeaser(hook) }}</span>
            </div>
            <span class="quest-hook-collapsed__chevron" aria-hidden="true">
              <svg viewBox="0 0 12 12" width="18" height="18">
                <polyline points="2,4 6,8 10,4" fill="none" stroke="currentColor" stroke-width="1.6"
                  stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </span>
          </div>

          <!-- Expanded: full hook contents (view or inline edit) -->
          <div v-else key="expanded" class="quest-card">
            <!-- Inline edit form -->
            <div v-if="editingIndex === index" class="quest-edit">
              <ParCardInput v-model="editForm.title" label="Title" />
              <ParCardInput v-model="editForm.questGiver" label="Quest Giver" />
              <ParCardTextarea v-model="editForm.setup" label="Setup" :rows="4" />

              <div class="quest-edit__array">
                <span class="quest-hook__label">Objectives</span>
                <div v-for="(objective, i) in editForm.objectives" :key="'obj-' + i" class="quest-edit__row">
                  <ParCardInput v-model="editForm.objectives[i]" :label="`Objective ${i + 1}`" />
                  <ParCardButton v-if="editForm.objectives.length > 1" variant="muted" size="small"
                    @click="removeObjective(i)">
                    Remove
                  </ParCardButton>
                </div>
                <ParCardButton variant="create" size="small" @click="addObjective">+ Add objective</ParCardButton>
              </div>

              <div class="quest-edit__array">
                <span class="quest-hook__label">Challenges</span>
                <div v-for="(challenge, i) in editForm.challenges" :key="'chal-' + i" class="quest-edit__row">
                  <ParCardInput v-model="editForm.challenges[i]" :label="`Challenge ${i + 1}`" />
                  <ParCardButton v-if="editForm.challenges.length > 1" variant="muted" size="small"
                    @click="removeChallenge(i)">
                    Remove
                  </ParCardButton>
                </div>
                <ParCardButton variant="create" size="small" @click="addChallenge">+ Add challenge</ParCardButton>
              </div>

              <ParCardTextarea v-model="editForm.reward" label="Reward" :rows="3" />
              <ParCardTextarea v-model="editForm.twist" label="Potential Twist (optional)" :rows="3" />

              <div class="quest-card__actions">
                <ParCardButton variant="primary" @click="saveEdit">Save changes</ParCardButton>
                <ParCardButton variant="muted" @click="cancelEdit">Cancel</ParCardButton>
              </div>
            </div>

            <!-- View -->
            <div v-else>
              <div
                class="quest-hook-expanded__header"
                role="button"
                tabindex="0"
                :aria-expanded="true"
                :aria-label="`Collapse ${hook.title}`"
                @click="toggleExpand(index)"
                @keydown.enter.prevent="toggleExpand(index)"
                @keydown.space.prevent="toggleExpand(index)"
              >
                <h3 class="quest-hook-expanded__title">{{ hook.title }}</h3>
                <span class="quest-hook-expanded__chevron" aria-hidden="true">
                  <svg viewBox="0 0 12 12" width="18" height="18">
                    <polyline points="2,8 6,4 10,8" fill="none" stroke="currentColor" stroke-width="1.6"
                      stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                </span>
              </div>

              <p class="quest-hook__quest-giver">
                <span class="quest-hook__inline-label">Quest Giver:</span>
                <span v-html="formatMarkdown(hook.questGiver)"></span>
              </p>
              <p class="quest-hook__body" v-html="formatMarkdown(hook.setup)"></p>

              <p class="quest-hook__label">Objectives</p>
              <ul class="quest-hook__list">
                <li v-for="(objective, i) in hook.objectives" :key="i" v-html="formatMarkdown(objective)"></li>
              </ul>

              <p class="quest-hook__label">Challenges</p>
              <ul class="quest-hook__list">
                <li v-for="(challenge, i) in hook.challenges" :key="i" v-html="formatMarkdown(challenge)"></li>
              </ul>

              <p class="quest-hook__label">Rewards</p>
              <p class="quest-hook__body" v-html="formatMarkdown(hook.reward)"></p>

              <div v-if="hook.twist" class="quest-hook__twist">
                <p class="quest-hook__twist-label">Potential Twist</p>
                <p class="quest-hook__twist-body" v-html="formatMarkdown(hook.twist)"></p>
              </div>

              <div class="quest-card__actions">
                <ParCardButton variant="affirmative" size="small" @click="startEdit(index)">Edit</ParCardButton>
                <ParCardButton variant="muted" size="small" @click="deleteHook(index)">Delete</ParCardButton>
              </div>

              <!-- Per-hook export -->
              <div class="quest-export">
                <p class="quest-hook__label">Export this quest</p>
                <div class="quest-card__actions">
                  <ParCardButton variant="affirmative" size="small" @click="exportQuestAsMarkdown(hook)">
                    Copy as Markdown
                  </ParCardButton>
                  <ParCardButton variant="affirmative" size="small" @click="exportQuestAsPlainText(hook)">
                    Copy as plain text
                  </ParCardButton>
                </div>
                <p class="quest-export__tip">
                  Use markdown with <cdr-link href="https://homebrewery.naturalcrit.com/new"
                    target="_blank">Homebrewery</cdr-link>
                  for beautiful D&D-styled handouts.
                </p>
              </div>
            </div>
          </div>
        </Transition>
      </li>

      <!-- In-flight generation: skeleton card appended at the list's end -->
      <li v-if="loadingQuest" class="quest-hook-item">
        <div class="quest-card"><quest-hook-skeleton /></div>
      </li>
    </ul>

    <!-- Export All Section (shared format) -->
    <ItemExportsSection v-if="hooks.length > 0" heading="Export All Quest Hooks">
      <template #description>
        Export all quest hooks for this item together. Perfect for creating a campaign handout with multiple adventure
        options. The markdown format works perfectly with
        <cdr-link href="https://homebrewery.naturalcrit.com" target="_blank">Homebrewery</cdr-link>.
      </template>
      <template #buttons>
        <ParButton @click="exportAllQuestsAsMarkdown" variant="secondary">
          Copy All as Markdown
        </ParButton>
        <ParButton @click="exportAllQuestsAsPlainText" variant="secondary">
          Copy All as Plain Text
        </ParButton>
      </template>
    </ItemExportsSection>
  </div>
</template>

<script setup>
import { ref, watch, computed, onMounted } from 'vue';
import { CdrLink } from '@rei/cedar';
import {
  ParButton,
  ParField,
  ParSelect,
  ParCardButton,
  ParCardInput,
  ParCardTextarea,
} from '@/parchment';
import { formatMarkdown } from '../utils/format-markdown.mjs';
import QuestHookSkeleton from '@/components/skeletons/QuestHookSkeleton.vue';
import ItemExportsSection from './ItemExportsSection.vue';
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

// Single-open expansion, mirroring the dungeon NPC list: the collapsed row
// is swapped out for the full contents, and only one hook is open at a time.
// Tracked locally by row index (null = all collapsed) rather than the
// persisted hook.open flag.
const expandedKey = ref(null);

const isExpanded = (index) => expandedKey.value === index;

const toggleExpand = (index) => {
  expandedKey.value = expandedKey.value === index ? null : index;
  // Editing is a property of a specific row; leaving it cancels the edit.
  if (editingIndex.value !== null && editingIndex.value !== index) {
    cancelEdit();
  }
};

// Respect prefers-reduced-motion so the collapsed↔expanded swap doesn't
// cross-fade when the user has asked the system to minimize motion.
const reducedMotion = ref(
  typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
);

// One-line teaser for a collapsed card: the narrative's first sentence,
// lightly truncated on a word boundary (the row also clips with ellipsis).
const getTeaser = (hook) => {
  const text = (hook.setup || '').replace(/\s+/g, ' ').trim();
  if (!text) return '';
  const firstSentence = text.match(/^.*?[.!?](\s|$)/)?.[0]?.trim() || text;
  if (firstSentence.length <= 120) return firstSentence;
  const cut = firstSentence.slice(0, 120);
  const lastSpace = cut.lastIndexOf(' ');
  return (lastSpace > 60 ? cut.slice(0, lastSpace) : cut).trimEnd() + '…';
};

const deleteHook = (index) => {
  if (confirm('Are you sure you want to delete this quest hook?')) {
    hooks.value.splice(index, 1);
    // Keep the single-open pointer aligned with the shifted indices.
    if (expandedKey.value === index) {
      expandedKey.value = null;
    } else if (expandedKey.value !== null && expandedKey.value > index) {
      expandedKey.value -= 1;
    }
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
    // Auto-expand the freshly generated hook (the user just asked for it).
    expandedKey.value = hooks.value.length - 1;
    emitUpdatedItem();
  } catch (err) {
    console.error('Error generating quest hook:', err);
    toast.error('Failed to generate quest hook. Please try again.');
  } finally {
    loadingQuest.value = false;
  }
};
</script>

<style scoped>
/* ──────────────────────────────────────────────────────────────────────────
   Quest Hooks — editorial parchment. Lapis tool heading + cream form card
   (chrome register), warm-cream swap-style hook cards with burgundy small-caps
   labels, serif body, burgundy bullets, and a warm-tan twist callout. Colors
   go through --par-* / --color-action-* tokens, never hex literals (the lone
   #f8f3e8 hover tint mirrors the dungeon NPC list, which predates a token).
   ────────────────────────────────────────────────────────────────────────── */

.quest-hooks {
  font-family: var(--par-font-serif, 'Source Serif 4', Georgia, 'Times New Roman', serif);
}

/* ── Heading (lapis tool-chrome register, sits atop the form surface) ───── */
.quest-hooks-heading {
  margin-bottom: 1.5rem;
}

.quest-hooks-heading__title {
  /* 2.8rem — the shared tab-header standard, matched across the setting
     generator's tabs for cross-tool consistency. */
  margin: 0 0 0.3rem;
  font-family: var(--par-font-serif, 'Source Serif 4', Georgia, serif);
  font-size: 2.8rem;
  font-weight: 600;
  color: var(--color-action-hover, #2A4D70);
  line-height: 1.2;
}

.quest-hooks-heading__tagline {
  margin: 0;
  font-family: var(--par-font-serif, 'Source Serif 4', Georgia, serif);
  font-size: 1.5rem;
  font-style: normal;
  color: var(--par-color-text-secondary, #555);
  line-height: 1.55;
}

/* ── Generation form — flat (no inner card). The shell's .item-view cream
   container provides the surface now; a boxed form here would double up. ──── */
.quest-hooks-form {
  margin-bottom: 2rem;
}

.quest-hooks-form__limit {
  margin: 0.9rem 0 0;
  font-family: var(--par-font-serif, 'Source Serif 4', Georgia, serif);
  font-size: 1.3rem;
  font-style: italic;
  color: var(--par-color-text-muted, #6b6b6b);
  text-align: center;
}

/* ---- Quest hook list (swap-style card, mirrors dungeon NPCsTab) ---- */
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
  font-family: var(--par-font-serif, 'Source Serif 4', Georgia, 'Times New Roman', serif);
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
  font-family: var(--par-font-serif, 'Source Serif 4', Georgia, 'Times New Roman', serif);
  font-size: 1.8rem;
  font-weight: 600;
  color: var(--par-color-title, #7a1f1f);
  line-height: 1.3;
}

.quest-hook-collapsed__teaser {
  font-family: var(--par-font-serif, 'Source Serif 4', Georgia, 'Times New Roman', serif);
  font-size: 1.4rem;
  font-style: italic;
  color: var(--par-color-text-muted, #6b6b6b);
  line-height: 1.4;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.quest-hook-collapsed__chevron {
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

.quest-hook-collapsed__chevron svg { display: block; }

.quest-hook-collapsed:hover .quest-hook-collapsed__chevron {
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
  font-family: var(--par-font-serif, 'Source Serif 4', Georgia, 'Times New Roman', serif);
}

/* Header row doubles as the collapse affordance (title + up-chevron). */
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

.quest-hook-expanded__chevron svg { display: block; }

.quest-hook-expanded__header:hover .quest-hook-expanded__chevron {
  color: var(--par-color-title, #7a1f1f);
  border-color: var(--par-color-title, #7a1f1f);
  background: rgba(255, 255, 255, 0.85);
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

/* Narrative / rewards body prose. */
.quest-hook__body {
  margin: 0 0 1rem;
  font-size: 1.55rem;
  line-height: 1.65;
  color: var(--par-color-text, #222);
}

.quest-hook__body :deep(strong) { font-weight: 600; }
.quest-hook__quest-giver :deep(strong) { font-weight: 600; }

/* Section labels — burgundy small-caps, matching the item card / Lore Builder. */
.quest-hook__label {
  margin: 1.5rem 0 0.5rem;
  font-size: 1.2rem;
  font-weight: 500;
  color: var(--par-color-title, #7a1f1f);
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.quest-hook__list {
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

.quest-hook__list :deep(strong) { font-weight: 600; }

/* Potential Twist — warm-tan callout with burgundy left-rule (Lore Builder
   summary-card pattern). */
.quest-hook__twist {
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

.quest-hook__twist-body :deep(strong) { font-weight: 600; }

/* Card action rows (view + edit). */
.quest-card__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.7rem;
  margin-top: 1.5rem;
}

/* Per-hook export block. */
.quest-export {
  margin-top: 2rem;
  padding-top: 1.25rem;
  border-top: 1px solid var(--par-color-divider, #e2dccd);
}

.quest-export .quest-card__actions {
  margin-top: 0.5rem;
}

.quest-export__tip {
  margin: 0.75rem 0 0;
  font-size: 1.3rem;
  font-style: italic;
  color: var(--par-color-text-muted, #6b6b6b);
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

/* Responsive: stack action rows on narrow screens. */
@media (max-width: 560px) {
  .quest-card__actions { flex-direction: column; align-items: stretch; }
  .quest-edit__row { flex-direction: column; align-items: stretch; }
}
</style>