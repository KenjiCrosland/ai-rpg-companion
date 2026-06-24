<template>
  <div class="factions-tab parchment">
    <div class="factions-heading">
      <h3 class="factions-heading__title">Factions</h3>
      <p class="factions-heading__tagline">
        Any group gathered to pursue a goal or hold onto power — from the
        ruling family down to a guild, cult, or band of malcontents.
      </p>
    </div>

    <div v-if="setting.factions && setting.factions.length > 0">
      <ul class="faction-list">
        <li v-for="(faction, index) in setting.factions" :key="faction.name" class="faction-list-item">
          <!-- Collapsed -->
          <div
            v-if="!faction.open"
            class="faction-card faction-card--collapsed"
            role="button"
            tabindex="0"
            :aria-expanded="false"
            :aria-label="`Expand ${faction.name}`"
            @click="faction.open = true"
            @keydown.enter.prevent="faction.open = true"
            @keydown.space.prevent="faction.open = true"
          >
            <div class="faction-card__header-text">
              <h4 class="faction-card__title">{{ faction.name }}</h4>
              <p class="faction-card__teaser">
                Influence: {{ levelWord(faction) }}<template v-if="factionTeaser(faction)"> — {{ factionTeaser(faction) }}</template>
              </p>
            </div>
            <span class="faction-card__caret" aria-hidden="true">
              <svg viewBox="0 0 12 12" width="14" height="14">
                <polyline points="4,2 8,6 4,10" fill="none" stroke="currentColor"
                  stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </span>
          </div>

          <!-- Expanded -->
          <div v-else class="faction-card faction-card--expanded">
            <!-- View Mode -->
            <template v-if="editingFactionIndex !== index">
              <div
                class="faction-card__header"
                role="button"
                tabindex="0"
                :aria-expanded="true"
                :aria-label="`Collapse ${faction.name}`"
                @click="faction.open = false"
                @keydown.enter.prevent="faction.open = false"
                @keydown.space.prevent="faction.open = false"
              >
                <h4 class="faction-card__title">{{ faction.name }}</h4>
                <span class="faction-card__caret faction-card__caret--open" aria-hidden="true">
                  <svg viewBox="0 0 12 12" width="14" height="14">
                    <polyline points="4,2 8,6 4,10" fill="none" stroke="currentColor"
                      stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                </span>
              </div>

              <div class="faction-card__metadata">
                <span class="faction-card__metadata-label">Influence Level</span>
                <span class="faction-card__metadata-value">{{ levelWord(faction) }}</span>
                <ParTooltip :text="levelDef(faction)" placement="top">
                  <span class="faction-card__metadata-info" tabindex="0" aria-label="What this influence level means">i</span>
                </ParTooltip>
              </div>

              <div class="faction-card__section">
                <p class="faction-card__section-label">Faction Leader</p>
                <p class="faction-card__section-body">
                  <span class="faction-card__leader-name">{{ faction.faction_leader }}.</span>
                  {{ faction.faction_leader_description }}
                </p>
              </div>

              <div class="faction-card__section">
                <p class="faction-card__section-label">Key Strengths</p>
                <p class="faction-card__section-body">{{ faction.key_resources_and_assets }}</p>
              </div>

              <div v-if="detailParagraphs(faction).length" class="faction-card__section">
                <p class="faction-card__section-label">Details</p>
                <div class="faction-card__section-body faction-card__section-body--prose">
                  <p v-for="(paragraph, pIndex) in detailParagraphs(faction)" :key="pIndex">
                    {{ paragraph }}
                  </p>
                </div>
              </div>

              <div v-if="loadingFactionIndex === index" class="faction-card__loading">
                <CdrSkeleton><OverviewSkeleton /></CdrSkeleton>
              </div>

              <p v-if="faction.motto" class="faction-card__quote">"{{ faction.motto }}"</p>

              <div class="faction-card__actions">
                <div class="faction-card__actions-primary">
                  <ParCardButton variant="affirmative" size="small"
                    @click="startEditingFaction(index)">Edit faction</ParCardButton>
                  <button
                    v-if="!faction.history && !faction.combined_content"
                    type="button"
                    class="faction-ghost faction-ghost--lapis"
                    :disabled="loadingFactionIndex === index"
                    @click="generateDetailedFaction(index)"
                  >Generate full description</button>
                </div>
                <ParCardButton variant="danger" size="small"
                  @click="confirmDelete(index)">Delete faction</ParCardButton>
              </div>
            </template>

            <!-- Edit Mode -->
            <form v-else class="edit-form" @submit.prevent="saveEditFaction">
              <h4 class="edit-form-title">Edit faction</h4>

              <ParField label="Faction Name">
                <ParInput v-model="factionEditForm.name" />
              </ParField>

              <ParField label="Influence Level">
                <ParSelect v-model="factionEditForm.influence_level" :options="influenceLevelOptions" />
                <template #hint>
                  {{ factionPowerLevels[factionEditForm.influence_level - 1] }}: {{ factionPowerDescriptions[factionEditForm.influence_level - 1] }}
                </template>
              </ParField>

              <ParField label="Faction Leader">
                <ParInput v-model="factionEditForm.faction_leader" />
              </ParField>

              <ParField label="Faction Leader Description">
                <ParTextarea v-model="factionEditForm.faction_leader_description" :rows="3" />
              </ParField>

              <ParField label="Key Strengths / Resources">
                <ParTextarea v-model="factionEditForm.key_resources_and_assets" :rows="3" />
              </ParField>

              <ParField label="Faction Motto">
                <ParInput v-model="factionEditForm.motto" />
              </ParField>

              <ParField label="Detailed Description">
                <ParTextarea v-model="factionEditForm.detailed_content" :rows="12" />
                <template #hint>
                  The full history and details of the faction. Use double line breaks for paragraphs.
                </template>
              </ParField>

              <div class="button-group">
                <ParCardButton type="submit" variant="primary">Save changes</ParCardButton>
                <ParCardButton type="button" variant="muted" @click="cancelEditFaction">Cancel</ParCardButton>
              </div>
            </form>
          </div>
        </li>

        <!-- Loading skeleton for a new faction being added -->
        <li v-if="loadingNewFaction" class="faction-list-item">
          <div class="faction-card faction-card--expanded">
            <h4 class="faction-card__title">{{ newFactionName }}</h4>
            <div class="faction-card__loading">
              <CdrSkeleton><FactionSkeleton /></CdrSkeleton>
            </div>
          </div>
        </li>
      </ul>

      <!-- Create new faction -->
      <form class="create-faction-form" @submit.prevent="addNewFaction">
        <h3 class="create-faction-form__title">Create new faction</h3>
        <ParField label="Faction name">
          <ParInput id="faction-name" v-model="newFactionName" placeholder="e.g., The Ashen Concord" />
        </ParField>
        <ParField label="Faction description" :optional="true">
          <ParTextarea id="faction-description" v-model="newFactionDescription" :rows="3"
            placeholder="A sentence or two on who they are and what they want — or leave blank." />
        </ParField>
        <ParButton type="submit" variant="primary" :disabled="!newFactionName">Add faction</ParButton>
      </form>

      <!-- Tab-level re-generate -->
      <div class="factions-tab__regenerate">
        <button type="button" class="faction-ghost faction-ghost--lapis" @click="generateFactions">
          Re-generate factions for {{ setting.place_name }}
        </button>
      </div>
    </div>

    <template v-else-if="!loadingFactions">
      <p class="factions-empty">
        No factions yet. Generate a starting roster from this setting's overview,
        then refine, regenerate, or add your own.
      </p>
      <ParButton @click="generateFactions">
        Generate factions for {{ setting.place_name }}
      </ParButton>
    </template>

    <div v-if="loadingFactions">
      <BlockSkeleton />
    </div>

    <!-- Delete confirmation -->
    <ParConfirm
      :opened="deleteConfirmIndex !== null"
      title="Delete this faction?"
      confirm-label="Delete faction"
      cancel-label="Cancel"
      :destructive="true"
      @confirm="performDelete"
      @cancel="deleteConfirmIndex = null"
    >
      Deleting <strong>{{ deleteConfirmName }}</strong> removes it from this
      setting. This can't be undone.
    </ParConfirm>
  </div>
</template>

<script setup>
import {
  ParButton,
  ParCardButton,
  ParField,
  ParInput,
  ParTextarea,
  ParSelect,
  ParConfirm,
  ParTooltip,
} from "@/parchment";
import { logger } from "@/util/logger.mjs";
import { ref, computed, watch } from 'vue';
import { CdrSkeleton } from '@rei/cedar';
import FactionSkeleton from '@/components/skeletons/FactionSkeleton.vue';
import OverviewSkeleton from '@/components/skeletons/OverviewSkeleton.vue';
import BlockSkeleton from '@/components/skeletons/BlockSkeleton.vue';
import { generateGptResponse } from "@/util/ai-client.mjs";
import {
  factionListPrompt,
  detailedFactionPrompt,
  singleFactionPrompt,
  classifyNPCsByFactionPrompt,
  classifyNPCsByFactionValidation,
} from '../../prompts/index.mjs';

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
const factionPowerLevels = [
  'Nonexistent', 'Marginal', 'Emerging', 'Moderate', 'Noteworthy', 'Influential',
  'Powerful', 'Dominant', 'Controlling', 'Totalitarian',
];

const factionPowerDescriptions = [
  'No influence or recognition in any sphere. Entirely disregarded in political, social, and economic contexts.',
  'Very limited influence, struggling for recognition. Minor local impact but largely ineffective on a broader scale.',
  'Beginning to make their presence felt with minimal overall influence. Early stages of establishing a base.',
  'Noticeable but limited regional influence. May sway local policies but lack broader power.',
  'Recognized within a larger context, starting to effect significant change. Gaining momentum.',
  'Significant sway in local politics and society. Can influence major decisions and hold considerable clout.',
  'Strong influence and considerable resources. Shapes outcomes in multiple spheres and key player in environments.',
  'Strong influence in one branch of government or aspect of governance. Major player but power is not absolute.',
  'High level of power, controls multiple branches or has significant sway across governance. Broad control over policies.',
  'Absolute control over society, without opposition. Marked by unilateral decision-making and lack of democratic processes.',
];

// -------------------------
// Display helpers (map flat faction fields onto the card's display register)
// -------------------------
// Influence level: numeric 1-10 → descriptive word + its definition.
const levelWord = (faction) => factionPowerLevels[faction.influence_level - 1] || '—';
const levelDef = (faction) => factionPowerDescriptions[faction.influence_level - 1] || '';

// One-line teaser for the collapsed card. The LLM produces prose, not a
// dedicated teaser field, so we derive it from the first sentence of the
// richest available text, falling back to the leader/strengths blurb.
function factionTeaser(faction) {
  const source = faction.combined_content
    || faction.history
    || faction.faction_leader_description
    || faction.key_resources_and_assets
    || '';
  if (!source) return '';
  const firstSentence = source.split(/(?<=[.!?])\s/)[0] || source;
  return firstSentence.trim();
}

// Full-description paragraphs for the expanded card's Details section.
// Prefer the combined_content (the canonical full description); fall back to
// the legacy discrete fields for factions saved before combined_content.
function detailParagraphs(faction) {
  if (faction.combined_content) {
    return faction.combined_content.split('\n\n').map(p => p.trim()).filter(Boolean);
  }
  if (faction.history) {
    return [
      faction.history,
      [faction.recent_event, faction.current_situation].filter(Boolean).join(' '),
      [faction.rites_and_ceremonies, faction.recent_ceremony].filter(Boolean).join(' '),
      [faction.challenge_to_power, faction.challenge_event].filter(Boolean).join(' '),
    ].map(p => p.trim()).filter(Boolean);
  }
  return [];
}

// -------------------------
// Local state
// -------------------------
const loadingFactions = ref(false);
const loadingNewFaction = ref(false);
const loadingFactionIndex = ref(null);

// Delete confirmation (ParConfirm modal) — index of the faction pending
// deletion, or null when the modal is closed.
const deleteConfirmIndex = ref(null);
const deleteConfirmName = computed(() =>
  deleteConfirmIndex.value === null
    ? ''
    : (props.setting.factions?.[deleteConfirmIndex.value]?.name || 'this faction'),
);

const editingFactionIndex = ref(null);
const factionEditForm = ref({
  name: '',
  influence_level: 1,
  faction_leader: '',
  faction_leader_description: '',
  key_resources_and_assets: '',
  motto: '',
  detailed_content: '',
});

const newFactionName = ref('');
const newFactionDescription = ref('');

// -------------------------
// Computed
// -------------------------
const influenceLevelOptions = computed(() => {
  return factionPowerLevels.map((level, index) => ({
    label: `${index + 1} - ${level}`,
    value: index + 1,
  }));
});

// -------------------------
// Helpers
// -------------------------
function getOverviewText(overviewObject) {
  if (!overviewObject) return '';
  return Object.entries(overviewObject).map(([, value]) => {
    if (Array.isArray(value)) return '';
    return `${value}`;
  }).join('\n');
}

function getFactionText(factionsArray) {
  return factionsArray.map(faction =>
    `Faction Name: ${faction.name} \n Influence Level: ${faction.influence_level} \n Faction Leader: ${faction.faction_leader} ${faction.faction_leader_description} \n Faction Assets: ${faction.key_resources_and_assets} \n Faction Motto: \n ${faction.motto}`
  ).join('\n---\n\n');
}

function combineFactionDetails(faction) {
  if (!faction) return '';
  const parts = [];
  if (faction.history) parts.push(faction.history);
  if (faction.recent_event || faction.current_situation) {
    parts.push([faction.recent_event, faction.current_situation].filter(Boolean).join(' '));
  }
  if (faction.rites_and_ceremonies || faction.recent_ceremony) {
    parts.push([faction.rites_and_ceremonies, faction.recent_ceremony].filter(Boolean).join(' '));
  }
  if (faction.challenge_to_power || faction.challenge_event) {
    parts.push([faction.challenge_to_power, faction.challenge_event].filter(Boolean).join(' '));
  }
  return parts.filter(Boolean).join('\n\n');
}

// -------------------------
// Validation
// -------------------------
function factionListValidation(jsonString) {
  try {
    const jsonObj = JSON.parse(jsonString);
    return jsonObj.every(faction =>
      ['name', 'influence_level', 'faction_leader', 'faction_leader_description', 'key_resources_and_assets', 'motto']
        .every(key => key in faction)
    );
  } catch { return false; }
}

function factionDetailValidation(jsonString) {
  try {
    const jsonObj = JSON.parse(jsonString);
    const keys = ['history', 'recent_event', 'current_situation', 'rites_and_ceremonies', 'recent_ceremony', 'challenge_to_power', 'challenge_event'];
    return keys.every(key => key in jsonObj);
  } catch { return false; }
}

function singleFactionValidation(jsonString) {
  try {
    const jsonObj = JSON.parse(jsonString);
    const keys = ['name', 'history', 'recent_event', 'current_situation', 'motto', 'influence_level',
      'faction_leader', 'faction_leader_description', 'key_resources_and_assets', 'rites_and_ceremonies',
      'recent_ceremony', 'challenge_to_power', 'challenge_event'];
    return keys.every(key => key in jsonObj);
  } catch { return false; }
}

// -------------------------
// Emit helper
// -------------------------
function emitUpdated(patch) {
  emit('updated-setting', { ...props.setting, ...patch });
}

// -------------------------
// Delete
// -------------------------
// Open the ParConfirm modal for the faction at `index`.
const confirmDelete = (index) => {
  deleteConfirmIndex.value = index;
};

// Commit the pending deletion once confirmed.
const performDelete = () => {
  const index = deleteConfirmIndex.value;
  if (index === null) return;
  const updatedFactions = [...props.setting.factions];
  updatedFactions.splice(index, 1);
  emitUpdated({ factions: updatedFactions });
  deleteConfirmIndex.value = null;
};

// -------------------------
// Edit
// -------------------------
const startEditingFaction = (index) => {
  const faction = props.setting.factions[index];
  factionEditForm.value = {
    name: faction.name || '',
    influence_level: faction.influence_level || 1,
    faction_leader: faction.faction_leader || '',
    faction_leader_description: faction.faction_leader_description || '',
    key_resources_and_assets: faction.key_resources_and_assets || '',
    motto: faction.motto || '',
    detailed_content: faction.combined_content || combineFactionDetails(faction),
  };
  editingFactionIndex.value = index;
};

const cancelEditFaction = () => {
  editingFactionIndex.value = null;
};

const saveEditFaction = () => {
  if (editingFactionIndex.value === null) return;
  const updatedFactions = props.setting.factions.map((faction, i) => {
    if (i !== editingFactionIndex.value) return faction;
    return {
      ...faction,
      name: factionEditForm.value.name,
      // ParSelect emits the native string value; store it back as a number
      // so influence-level math (sorting, level lookups) stays numeric.
      influence_level: Number(factionEditForm.value.influence_level),
      faction_leader: factionEditForm.value.faction_leader,
      faction_leader_description: factionEditForm.value.faction_leader_description,
      key_resources_and_assets: factionEditForm.value.key_resources_and_assets,
      motto: factionEditForm.value.motto,
      combined_content: factionEditForm.value.detailed_content,
    };
  });
  emitUpdated({ factions: updatedFactions });
  editingFactionIndex.value = null;
};

// -------------------------
// Generate bulk factions
// -------------------------
async function generateFactions() {
  let currentFactions = props.setting.factions;
  if (currentFactions.length > 0) {
    if (!confirm('Are you sure you want to regenerate factions? This will erase all existing factions and will remove all npcs associated with a faction.')) return;
    currentFactions = [];
  }

  const overviewText = getOverviewText(props.setting.setting_overview);
  const prompt = factionListPrompt(overviewText);

  try {
    loadingFactions.value = true;
    const response = await generateGptResponse(prompt, factionListValidation);
    const factions = JSON.parse(response);
    factions.sort((a, b) => a.influence_level - b.influence_level).reverse();

    // Add faction leaders as NPCs if not already present
    const existingNpcNames = props.setting.npcs.map(npc => npc.name);
    const newNpcs = [...props.setting.npcs.filter(npc => !npc.faction)];
    factions.forEach(faction => {
      if (!existingNpcNames.includes(faction.faction_leader)) {
        newNpcs.push({
          name: faction.faction_leader,
          description: faction.faction_leader_description,
          faction: faction.name,
        });
      }
    });

    // Classify existing un-affiliated NPCs into the new factions so
    // they leave the "Unaffiliated" bucket. NPCs extracted from setting
    // prose before factions existed have no faction field; we ask the
    // LLM which (if any) faction each one fits. NPCs that don't clearly
    // belong to any get `faction: null` and stay in Unaffiliated.
    //
    // Done as a best-effort step: if the classification call fails or
    // returns malformed JSON, we still emit the faction list + new
    // NPCs — the user can manually re-classify later when we ship the
    // manual UI. Faction leaders are excluded from classification —
    // they were just assigned their own faction above.
    const npcsToClassify = newNpcs.filter(npc => !npc.faction && npc.name);
    if (npcsToClassify.length > 0 && factions.length > 0) {
      try {
        const classifyPrompt = classifyNPCsByFactionPrompt(npcsToClassify, factions);
        const classifyResponse = await generateGptResponse(classifyPrompt, classifyNPCsByFactionValidation);
        const { assignments } = JSON.parse(classifyResponse);
        const factionNameSet = new Set(factions.map(f => f.name));
        const assignmentMap = new Map();
        for (const a of assignments) {
          // Only accept faction values that exist in the just-generated
          // list — guards against the LLM hallucinating faction names.
          if (a.faction && factionNameSet.has(a.faction)) {
            assignmentMap.set(a.name, a.faction);
          }
        }
        for (let i = 0; i < newNpcs.length; i++) {
          if (newNpcs[i].faction) continue;
          const assigned = assignmentMap.get(newNpcs[i].name);
          if (assigned) newNpcs[i] = { ...newNpcs[i], faction: assigned };
        }
      } catch (err) {
        logger.warn('NPC-to-faction classification failed; NPCs stay Unaffiliated:', err);
      }
    }

    emitUpdated({ factions, npcs: newNpcs });
  } catch (error) {
    logger.error('Error generating factions:', error);
  } finally {
    loadingFactions.value = false;
  }
}

// -------------------------
// Generate detailed faction
// -------------------------
async function generateDetailedFaction(index) {
  const faction = props.setting.factions[index];
  const factionText = getFactionText(props.setting.factions);
  const settingOverviewText = getOverviewText(props.setting.setting_overview);
  const prompt = detailedFactionPrompt(faction.name, factionText, settingOverviewText);

  try {
    loadingFactionIndex.value = index;
    const response = await generateGptResponse(prompt, factionDetailValidation);
    const detailedData = JSON.parse(response);
    const updatedFactions = props.setting.factions.map((f, i) => {
      if (i !== index) return f;
      const merged = { ...f, ...detailedData };
      merged.combined_content = combineFactionDetails(merged);
      return merged;
    });
    emitUpdated({ factions: updatedFactions });
  } catch (error) {
    logger.error('Error generating detailed faction:', error);
  } finally {
    loadingFactionIndex.value = null;
  }
}

// -------------------------
// Add new faction
// -------------------------
async function addNewFaction() {
  if (!newFactionName.value) return;

  const overviewText = getOverviewText(props.setting.setting_overview);
  const factionText = props.setting.factions.length > 0
    ? getFactionText(props.setting.factions)
    : null;
  const prompt = singleFactionPrompt(newFactionName.value, newFactionDescription.value, factionText, overviewText);

  try {
    loadingNewFaction.value = true;
    const response = await generateGptResponse(prompt, singleFactionValidation);
    const newGeneratedFaction = JSON.parse(response);
    newGeneratedFaction.combined_content = combineFactionDetails(newGeneratedFaction);
    newGeneratedFaction.open = true;

    const updatedFactions = [...props.setting.factions, newGeneratedFaction];

    // Add faction leader as NPC if not already present
    const updatedNpcs = [...props.setting.npcs];
    if (!updatedNpcs.map(npc => npc.name).includes(newGeneratedFaction.faction_leader)) {
      updatedNpcs.push({
        name: newGeneratedFaction.faction_leader,
        description: newGeneratedFaction.faction_leader_description,
        faction: newGeneratedFaction.name,
      });
    }

    emitUpdated({ factions: updatedFactions, npcs: updatedNpcs });
    newFactionName.value = '';
    newFactionDescription.value = '';
  } catch (error) {
    logger.error('Error adding new faction:', error);
  } finally {
    loadingNewFaction.value = false;
  }
}

// Reset edit state when parent switches to a different setting
watch(
  () => props.setting,
  (newSetting, oldSetting) => {
    if (newSetting !== oldSetting) {
      editingFactionIndex.value = null;
    }
  },
);
</script>

<style scoped>
/* Lighter/cooler cream surface panel (no border) — the quiet ground that
   warmer-toned faction cards lift off of (matches the Locations tab). The
   Locations/NPCs tabs nest their content in a section with its own 2rem
   padding on top of the tab's 1.75rem/2rem; Factions renders content directly,
   so the inset is rolled into the tab padding here to match that breathing. */
/* Bare — the shared .setting-tabs container provides the cream surface and
   padding now (the tab strip and content share one card). */
.factions-tab {
  background: transparent;
  padding: 1rem;
  font-family: var(--par-font-serif, 'Source Serif 4', Georgia, 'Times New Roman', serif);
}

/* ── Heading — shared tab-header standard (matches Locations / NPCs / Quest
   Hooks): large serif 2.8rem/600 lapis title + regular-weight serif
   description. ──────────────────────────────────────────────────────────── */
.factions-heading {
  margin-bottom: 1.5rem;
}

.factions-heading__title {
  margin: 0 0 0.3rem;
  font-family: var(--par-font-serif, 'Source Serif 4', Georgia, 'Times New Roman', serif);
  font-size: 2.8rem;
  font-weight: 600;
  color: var(--par-color-action-primary, #2A4D70);
  line-height: 1.2;
}

.factions-heading__tagline {
  margin: 0;
  font-family: var(--par-font-serif, 'Source Serif 4', Georgia, 'Times New Roman', serif);
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 400;
  color: var(--par-color-text-secondary, #555);
  line-height: 1.55;
}

.factions-empty {
  margin: 0.75rem 0 1.5rem;
  font-family: var(--par-font-serif, 'Source Serif 4', Georgia, 'Times New Roman', serif);
  font-size: 1.5rem;
  font-style: italic;
  color: var(--par-color-text-muted, #6b6b6b);
  line-height: 1.6;
}

/* ── Faction list ──────────────────────────────────────────────────────── */
.faction-list {
  list-style: none;
  margin: 0 0 1.5rem;
  padding: 0;
}

.faction-list-item {
  margin: 0;
}

/* Warm-tan card — real contrast against the cream tab container, no border
   (the fill carries the weight). */
/* Lighter swap-card convention (matches the dungeon Monsters cards): near-white
   cream + a tan border + soft shadow, rather than the heavier callout-bg tan. */
.faction-card {
  background: var(--par-color-surface, #FBF7F0);
  border: 1.5px solid var(--par-color-border-strong, #c9b99a);
  border-radius: 0.8rem;
  box-shadow: var(--par-color-card-shadow, 0 1px 3px rgba(122, 50, 30, 0.04));
  margin-bottom: 0.8rem;
}

.faction-card--collapsed {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.5rem;
  cursor: pointer;
}

.faction-card--collapsed:focus-visible {
  outline: 2px solid var(--color-action-secondary-rest, #5A7A9A);
  outline-offset: -2px;
}

.faction-card--expanded {
  padding: 1.25rem 1.5rem;
}

/* Title — substantial serif display, NOT small-caps. Reads as the name of a
   thing, distinct from the small-caps label register inside the card. */
.faction-card__title {
  margin: 0;
  font-family: var(--par-font-serif, 'Source Serif 4', Georgia, 'Times New Roman', serif);
  font-size: 1.8rem;
  font-weight: 600;
  color: var(--par-color-title, #7a1f1f);
  line-height: 1.3;
}

.faction-card__header-text {
  flex: 1;
  min-width: 0;
}

.faction-card__teaser {
  margin: 0.15rem 0 0;
  font-family: var(--par-font-serif, 'Source Serif 4', Georgia, 'Times New Roman', serif);
  font-size: 1.3rem;
  font-style: italic;
  color: var(--par-color-text-secondary, #555);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.faction-card__header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
  cursor: pointer;
}

.faction-card__header:focus-visible {
  outline: 2px solid var(--color-action-secondary-rest, #5A7A9A);
  outline-offset: -2px;
}

.faction-card__caret {
  display: inline-flex;
  align-items: center;
  flex-shrink: 0;
  color: var(--par-color-title, #7a1f1f);
  transition: transform 0.2s ease;
}

.faction-card__caret--open {
  transform: rotate(90deg);
}

/* Metadata row — structured "Influence Level: Dominant ⓘ" with a tan rule. */
.faction-card__metadata {
  display: flex;
  align-items: baseline;
  gap: 0.75rem;
  margin: 1rem 0 1.25rem;
  padding-bottom: 1rem;
  border-bottom: 0.5px solid var(--par-color-border, #e8e2d4);
}

.faction-card__metadata-label {
  font-family: var(--par-font-serif, 'Source Serif 4', Georgia, 'Times New Roman', serif);
  font-size: 1.1rem;
  font-weight: 500;
  color: var(--par-color-title, #7a1f1f);
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.faction-card__metadata-value {
  font-family: var(--par-font-serif, 'Source Serif 4', Georgia, 'Times New Roman', serif);
  font-size: 1.4rem;
  font-weight: 500;
  color: var(--par-color-text, #222);
}

.faction-card__metadata-info {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.4rem;
  height: 1.4rem;
  border: 0.5px solid var(--par-color-text-secondary, #555);
  border-radius: 50%;
  font-family: var(--par-font-serif, 'Source Serif 4', Georgia, 'Times New Roman', serif);
  font-size: 0.9rem;
  font-style: italic;
  color: var(--par-color-text-secondary, #555);
  cursor: help;
}

/* Labelled body sections ──────────────────────────────────────────────── */
.faction-card__section {
  margin-bottom: 1.25rem;
}

.faction-card__section-label {
  margin: 0 0 0.5rem;
  font-family: var(--par-font-serif, 'Source Serif 4', Georgia, 'Times New Roman', serif);
  font-size: 1.1rem;
  font-weight: 500;
  color: var(--par-color-title, #7a1f1f);
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.faction-card__section-body {
  margin: 0;
  max-width: 62rem;
  font-family: var(--par-font-serif, 'Source Serif 4', Georgia, 'Times New Roman', serif);
  font-size: 1.5rem;
  line-height: 1.7;
  color: var(--par-color-text, #222);
}

.faction-card__section-body p {
  margin: 0 0 1rem;
}

.faction-card__section-body p:last-child {
  margin-bottom: 0;
}

.faction-card__leader-name {
  font-weight: 600;
  color: var(--par-color-title, #7a1f1f);
}

/* Long-form Details prose: a readability pass. Long lines are the main cause
   of the "wall of text" read, so the measure is constrained to a comfortable
   ~70-character line; leading opens up and paragraph spacing carries the
   rhythm so each block reads as a distinct beat rather than an undivided slab. */
.faction-card__section-body--prose {
  max-width: 62rem;
  line-height: 1.8;
}

.faction-card__section-body--prose p {
  margin: 0 0 1.25rem;
}

.faction-card__section-body--prose p:last-child {
  margin-bottom: 0;
}

/* Quote — editorial pull-quote with a tan left rule. */
.faction-card__quote {
  max-width: 62rem;
  margin: 0 0 1.5rem;
  padding-left: 1rem;
  border-left: 2px solid var(--par-color-border, #e8e2d4);
  font-family: var(--par-font-serif, 'Source Serif 4', Georgia, 'Times New Roman', serif);
  font-size: 1.4rem;
  font-style: italic;
  color: var(--par-color-text-secondary, #555);
  line-height: 1.6;
}

.faction-card__loading {
  margin: 1.25rem 0;
}

/* Action row — three ghost buttons, delete pushed right by space-between. */
.faction-card__actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  padding-top: 1rem;
  border-top: 0.5px solid var(--par-color-border, #e8e2d4);
}

.faction-card__actions-primary {
  display: flex;
  gap: 0.6rem;
}

/* ── Ghost buttons (slate / lapis / burgundy) ──────────────────────────── */
.faction-ghost {
  appearance: none;
  -webkit-appearance: none;
  background: transparent;
  border: 0.5px solid currentColor;
  border-radius: 0.6rem;
  padding: 0.8rem 1.6rem;
  font-family: var(--par-font-serif, 'Source Serif 4', Georgia, 'Times New Roman', serif);
  font-size: 1.3rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.15s ease, color 0.15s ease, border-color 0.15s ease;
}

.faction-ghost:focus-visible {
  outline: 2px solid currentColor;
  outline-offset: 2px;
}

.faction-ghost:disabled {
  opacity: 0.55;
  cursor: default;
}

.faction-ghost--lapis {
  color: var(--color-action-rest, #365A85);
}

.faction-ghost--lapis:hover:not(:disabled) {
  background: rgba(54, 90, 133, 0.08);
}

/* ── Edit form (inside expanded card) ──────────────────────────────────── */
.edit-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.edit-form-title {
  margin: 0;
  font-family: var(--par-font-serif, 'Source Serif 4', Georgia, 'Times New Roman', serif);
  font-size: 1.8rem;
  font-weight: 600;
  color: var(--par-color-title, #7a1f1f);
}

/* ── Create-new form — its own card on the panel, lapis (chrome) title ──── */
.create-faction-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding-top: 1.5rem;
  border-top: 0.5px solid var(--par-color-border, #e8e2d4);
  margin-bottom: 1.5rem;
}

.create-faction-form__title {
  margin: 0;
  font-family: var(--par-font-serif, 'Source Serif 4', Georgia, 'Times New Roman', serif);
  font-size: 1.8rem;
  font-weight: 600;
  color: var(--color-action-hover, #2A4D70);
}

/* ── Tab-level re-generate — lapis ghost on its own ruled row ───────────── */
.factions-tab__regenerate {
  padding-top: 1rem;
  border-top: 0.5px solid var(--par-color-border, #e8e2d4);
}

.button-group {
  display: flex;
  gap: 1rem;
  margin-top: 0.5rem;
}

@media (max-width: 768px) {
  .faction-card__actions {
    flex-direction: column;
    align-items: stretch;
  }

  .faction-card__actions-primary {
    flex-direction: column;
  }

  .button-group {
    flex-direction: column;
  }

  .button-group button {
    width: 100%;
  }
}
</style>
