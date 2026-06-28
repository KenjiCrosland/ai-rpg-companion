<template>
  <div class="dungeon-monsters parchment">
    <div class="dungeon-monsters-heading">
      <h3 class="dungeon-monsters-heading__title">Dungeon Monsters</h3>
      <p class="dungeon-monsters-heading__tagline">
        Creatures lurking in this dungeon — generate a full statblock for any of them.
      </p>
    </div>

    <!-- Monster list (swap-style cards) -->
    <ul v-if="monsters.length" class="monster-list">
      <li v-for="monster in monsters" :key="monster.id" class="monster-list-item">
        <!-- Collapsed -->
        <div
          v-if="!monster.opened"
          class="monster-card monster-card--collapsed"
          role="button"
          tabindex="0"
          :aria-expanded="false"
          :aria-label="`Expand ${monster.name}`"
          @click="monster.opened = true"
          @keydown.enter.prevent="monster.opened = true"
          @keydown.space.prevent="monster.opened = true"
        >
          <div class="monster-card__header-text">
            <h4 class="monster-card__title">{{ monster.name }}</h4>
            <p v-if="monsterTeaser(monster)" class="monster-card__teaser">{{ monsterTeaser(monster) }}</p>
          </div>
          <span class="monster-card__caret" aria-hidden="true">
            <svg viewBox="0 0 12 12" width="14" height="14">
              <polyline points="4,2 8,6 4,10" fill="none" stroke="currentColor"
                stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </span>
        </div>

        <!-- Expanded -->
        <div v-else class="monster-card monster-card--expanded">
          <!-- View mode -->
          <template v-if="editingMonsterId !== monster.id">
            <div
              class="monster-card__header"
              role="button"
              tabindex="0"
              :aria-expanded="true"
              :aria-label="`Collapse ${monster.name}`"
              @click="monster.opened = false"
              @keydown.enter.prevent="monster.opened = false"
              @keydown.space.prevent="monster.opened = false"
            >
              <h4 class="monster-card__title">{{ monster.name }}</h4>
              <span class="monster-card__caret monster-card__caret--open" aria-hidden="true">
                <svg viewBox="0 0 12 12" width="14" height="14">
                  <polyline points="4,2 8,6 4,10" fill="none" stroke="currentColor"
                    stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </span>
            </div>

            <!-- Description -->
            <div
              v-if="!dungeonStore.monsterLoadingStates[monster.id]?.description"
              class="monster-card__prose"
            >
              <template v-if="monster.combined_description">
                <p v-for="(paragraph, pIndex) in monster.combined_description.split('\n\n')" :key="pIndex">
                  {{ paragraph }}
                </p>
              </template>
              <template v-else-if="monster.detailedDescription">
                <p>{{ monster.detailedDescription.intro }}</p>
                <p>{{ monster.detailedDescription.appearance }}</p>
                <p>{{ monster.detailedDescription.behaviorAbilities }}</p>
                <p>{{ monster.detailedDescription.lore }}</p>
              </template>
              <template v-else>
                <p>{{ monster.description }}</p>
              </template>
            </div>
            <MonsterDescriptionSkeleton v-if="dungeonStore.monsterLoadingStates[monster.id]?.description" />
            <p v-if="monster.danger" class="monster-card__danger">{{ monster.danger }}</p>

            <!-- Statblock Not Found Warning -->
            <div v-if="monster.statblock_name && !monster.statblock && !dungeonStore?.monsterLoadingStates[monster.id]?.part1 && !dungeonStore?.monsterLoadingStates[monster.id]?.part2" class="statblock-not-found-message">
              <p><strong>Statblock not found</strong></p>
              <p>The statblock "{{ monster.statblock_name }}" was not found. It may have been deleted or renamed in the Statblock Generator.</p>
              <div class="button-group">
                <ParButton @click="dungeonStore.generateMonsterStatblock(monster.id, premium)" size="small">Regenerate statblock</ParButton>
                <ParButton @click="clearMonsterStatblockReference(monster)" variant="secondary" size="small">Clear Reference</ParButton>
              </div>
            </div>

            <!-- If monster has (or is generating) a statblock, show it -->
            <div v-if="
              monster.statblock ||
              dungeonStore?.monsterLoadingStates[monster.id]?.part1 ||
              dungeonStore?.monsterLoadingStates[monster.id]?.part2
            " style="margin-top: 1rem;">
              <Statblock :monster="monster.statblock" :premium="premium" :readonly="true"
                :loadingPart1="dungeonStore.monsterLoadingStates[monster.id]?.part1 || false"
                :loadingPart2="dungeonStore.monsterLoadingStates[monster.id]?.part2 || false"
                @update-monster="updateMonsterStatblock(monster, $event)" />

              <!-- Statblock Saved Message -->
              <div v-if="monster.statblock && monster.statblock_name" class="statblock-saved-message">
                <p>
                  Edit this statblock in the
                  <a :href="getStatblockGeneratorUrl(monster.statblock_name, monster.statblock_folder)" target="_blank"
                    @click="openStatblockGenerator($event, monster.statblock_name, monster.statblock_folder)">Statblock Generator</a>
                </p>
              </div>
            </div>

            <!-- Statblock Limit Message -->
            <div v-if="dungeonStore.monsterLoadingStates[monster.id]?.limitReached"
              class="statblock-limit-message">
              <p><strong>Statblock generation limit reached</strong></p>
              <p>You are at your daily statblock generation limit (5 per 24 hours).</p>
              <PatreonCallout :patreon-url="patreonLoginUrl" location="dungeon-monster-statblock-limit">
                <template #body></template>
                <template #aside></template>
                <template #features>
                  <li>Unlimited statblock generation — no daily cap.</li>
                  <li>Cross-device save and load — your dungeons sync between browsers and devices.</li>
                  <li>
                    <a :href="patreonTiersUrl" target="_blank" rel="noopener">See all premium tiers and benefits on Patreon</a><span aria-hidden="true"> →</span>
                  </li>
                </template>
              </PatreonCallout>
            </div>

            <!-- Statblock generation controls -->
            <div v-if="!dungeonStore.monsterLoadingStates[monster.id]?.generating" class="monster-card__statblock-controls">
              <div class="monster-card__statblock-fields">
                <ParField label="CR">
                  <ParSelect v-model="monster.CR" :options="crOptions" placeholder="Select CR" />
                </ParField>
                <ParField label="Monster Type">
                  <ParSelect v-model="monster.monsterType" :options="monsterTypeOptions" placeholder="Select type" />
                </ParField>
              </div>
              <ParCheckbox v-model="monster.isSpellcaster">Creature is a spellcaster</ParCheckbox>
            </div>

            <!-- Actions -->
            <div class="monster-card__actions">
              <div class="monster-card__actions-primary">
                <button
                  type="button"
                  class="monster-ghost monster-ghost--lapis"
                  :disabled="dungeonStore.monsterLoadingStates[monster.id]?.generating"
                  @click="dungeonStore.generateMonsterStatblock(monster.id, premium)"
                >
                  {{
                    dungeonStore.monsterLoadingStates[monster.id]?.generating
                      ? 'Generating…'
                      : (monster.statblock ? 'Regenerate statblock' : 'Generate statblock')
                  }}
                </button>
                <ParCardButton
                  v-if="monster.detailedDescription || monster.combined_description"
                  variant="affirmative"
                  size="small"
                  @click="startEditingMonster(monster)"
                >
                  Edit description
                </ParCardButton>
              </div>
              <ParCardButton variant="danger" size="small" @click="confirmDelete(monster)">
                Delete monster
              </ParCardButton>
            </div>
          </template>

          <!-- Edit mode -->
          <form v-else class="edit-form" @submit.prevent="saveEditMonster">
            <h4 class="edit-form-title">Edit monster</h4>

            <ParField label="Monster name">
              <ParInput v-model="monsterEditForm.name" />
            </ParField>

            <ParField label="Monster description">
              <ParTextarea v-model="monsterEditForm.combined_description" :rows="10" />
              <template #hint>
                Intro, appearance, behavior/abilities, and lore. Use double line breaks for paragraphs.
              </template>
            </ParField>

            <div class="button-group">
              <ParCardButton type="submit" variant="primary">Save changes</ParCardButton>
              <ParCardButton type="button" variant="muted" @click="cancelEditMonster">Cancel</ParCardButton>
            </div>
          </form>
        </div>
      </li>
    </ul>

    <p v-else class="dungeon-monsters-empty">
      No monsters have been generated for this dungeon yet.
    </p>

    <!-- Create a custom monster (CR defaults to the highest existing monster's). -->
    <form class="create-monster-form" @submit.prevent="generateNewMonster">
      <h3 class="create-monster-form__title">Create a custom monster</h3>
      <p v-if="statblockFormError" class="create-monster-form__error">{{ statblockFormError }}</p>

      <div class="create-monster-grid">
        <ParField label="Monster name" :optional="true">
          <ParInput id="monsterName" v-model="statblockForm.name" placeholder="e.g., Headless Horseman" />
        </ParField>
        <ParField label="Monster Type">
          <ParSelect v-model="statblockForm.monsterType" :options="monsterTypeOptions" placeholder="Select type" />
        </ParField>
        <ParField label="CR">
          <ParSelect v-model="statblockForm.CR" :options="crOptions" placeholder="Select CR" />
        </ParField>
      </div>

      <ParField label="Monster description / special instructions" :optional="true">
        <ParTextarea v-model="statblockForm.description" :rows="4"
          placeholder="Describe the monster's abilities, or any special instructions…" />
      </ParField>

      <ParCheckbox v-model="statblockForm.isSpellcaster">Creature is a spellcaster</ParCheckbox>

      <ParButton type="submit" :disabled="generatingStatblock">
        {{ generatingStatblock ? 'Generating…' : 'Create monster' }}
      </ParButton>
    </form>

    <!-- Delete confirmation -->
    <ParConfirm
      :opened="deleteConfirmId !== null"
      title="Delete this monster?"
      confirm-label="Delete monster"
      cancel-label="Cancel"
      :destructive="true"
      @confirm="performDelete"
      @cancel="deleteConfirmId = null"
    >
      Deleting <strong>{{ deleteConfirmName }}</strong> removes it from this dungeon. This can't be undone.
    </ParConfirm>
  </div>
</template>

<script setup>
import { ParButton, ParCardButton, ParField, ParInput, ParTextarea, ParSelect, ParCheckbox, ParConfirm } from "@/parchment";
import { ref, computed, onMounted } from 'vue';
import { useDungeonStore } from '../stores/dungeon-store.mjs';
import { navigateToTool } from '@/util/navigation.mjs';
import Statblock from '@/components/Statblock.vue';
import PatreonCallout from '@/components/PatreonCallout.vue';
import { patreonTiersUrl } from '@/util/patreon-urls.mjs';
import crList from '../data/cr-list.json';
import MonsterDescriptionSkeleton from './skeletons/MonsterDescriptionSkeleton.vue';

const dungeonStore = useDungeonStore();
const props = defineProps({ premium: { type: Boolean, default: false } });

// Monsters for the current dungeon (swap-card list).
const monsters = computed(() => dungeonStore.currentDungeon?.monsters || []);

// Statblock-bias options for the CR/type selects.
const monsterTypeOptions = ['Random', 'Stronger Defense', 'Balanced', 'Stronger Offense'];

// One-line teaser for a collapsed card — first sentence of the richest
// available description.
function monsterTeaser(monster) {
  const source = monster.combined_description
    || monster.detailedDescription?.intro
    || monster.description
    || '';
  if (!source) return '';
  const text = source.replace(/\s+/g, ' ').trim();
  const firstSentence = text.match(/^.*?[.!?](\s|$)/)?.[0]?.trim() || text;
  return firstSentence;
}

// Delete confirmation (ParConfirm modal).
const deleteConfirmId = ref(null);
const deleteConfirmName = computed(() =>
  deleteConfirmId.value === null
    ? ''
    : (monsters.value.find(m => m.id === deleteConfirmId.value)?.name || 'this monster'),
);
const confirmDelete = (monster) => {
  deleteConfirmId.value = monster.id;
};
const performDelete = () => {
  if (deleteConfirmId.value === null) return;
  dungeonStore.deleteMonster(deleteConfirmId.value);
  deleteConfirmId.value = null;
};

// Patreon OAuth URL
const patreonLoginUrl = computed(() => {
  const returnUrl = encodeURIComponent(window.location.href);
  return `https://cros.land/patreon-flow/?patreon-login=yes&patreon-final-redirect=${returnUrl}`;
});

// Statblock Generator URL with query params (the href used in production,
// where the link opens the cros.land page in a new tab).
function getStatblockGeneratorUrl(monsterName, folderName) {
  const base = 'https://cros.land/ai-powered-dnd-5e-monster-statblock-generator/';
  const params = new URLSearchParams();
  if (monsterName) params.set('monster', monsterName);
  if (folderName) params.set('folder', folderName);
  const qs = params.toString();
  return qs ? `${base}?${qs}` : base;
}

// Dev has no per-tool URL (tools route via sessionStorage + '/'), so the
// production href above 404s in dev. Intercept the click in dev and route
// through the dev/prod-aware navigateToTool; in prod, fall through so the
// href + target="_blank" opens the page in a new tab.
function openStatblockGenerator(event, monsterName, folderName) {
  const isDev = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
  if (!isDev) return;
  event.preventDefault();
  navigateToTool('statblock-generator', { monster: monsterName, folder: folderName });
}

const crOptions = crList.fullArray;

// Edit mode state
const editingMonsterId = ref(null);
const monsterEditForm = ref({
  name: '',
  combined_description: ''
});

// This form is for creating a brand-new monster from scratch
const statblockForm = ref({
  name: '',
  CR: '',
  monsterType: '',
  description: '',
  isSpellcaster: false,
});

const statblockFormError = ref(null);
const generatingStatblock = ref(false);

function parseCR(crString) {
  if (!crString) return 0;
  if (crString.includes('/')) {
    const [num, den] = crString.split('/');
    const numerator = parseFloat(num);
    const denominator = parseFloat(den);
    if (!isNaN(numerator) && !isNaN(denominator)) {
      return numerator / denominator;
    }
  }
  const asFloat = parseFloat(crString);
  return isNaN(asFloat) ? 0 : asFloat;
}

function setDefaultCRToHighestMonster() {
  if (!dungeonStore.currentDungeon) return;
  const monsters = dungeonStore.currentDungeon.monsters || [];
  if (!monsters.length) return;

  let highestValue = 0;
  let highestString = '';

  for (const monster of monsters) {
    const val = parseCR(monster.CR);
    if (val > highestValue) {
      highestValue = val;
      highestString = monster.CR;
    }
  }
  // Set the form CR to the highest CR found
  if (highestString) {
    statblockForm.value.CR = highestString;
  }
}

onMounted(() => {
  setDefaultCRToHighestMonster();
});

// Called by the Statblock component to update an existing monster's statblock
function updateMonsterStatblock(monster, updatedMonster) {
  monster.statblock = updatedMonster;
  dungeonStore.updateStatblock(monster.id, updatedMonster);
}

function clearMonsterStatblockReference(monster) {
  delete monster.statblock_name;
  delete monster.statblock_folder;
  monster.statblock = null;
  dungeonStore.saveDungeons();
}

// Create a new monster with a statblock (via GPT or any generator)
async function generateNewMonster() {
  if (!dungeonStore.currentDungeon) {
    statblockFormError.value = 'No dungeon selected.';
    return;
  }

  generatingStatblock.value = true;
  try {
    await dungeonStore.createAndGenerateMonster({
      name: statblockForm.value.name,
      shortDescription: statblockForm.value.description,
      monsterType: statblockForm.value.monsterType,
      CR: statblockForm.value.CR,
      isSpellcaster: statblockForm.value.isSpellcaster,
      premium: props.premium,
    });
  } catch (error) {
    statblockFormError.value = error.message;
  } finally {
    generatingStatblock.value = false;
  }
}

// Helper function to combine monster description fields
function combineMonsterDescription(monster) {
  if (!monster) return '';

  // If already using combined_description, return it
  if (monster.combined_description) {
    return monster.combined_description;
  }

  // Otherwise combine detailedDescription fields
  if (monster.detailedDescription) {
    const parts = [];
    if (monster.detailedDescription.intro) parts.push(monster.detailedDescription.intro);
    if (monster.detailedDescription.appearance) parts.push(monster.detailedDescription.appearance);
    if (monster.detailedDescription.behaviorAbilities) parts.push(monster.detailedDescription.behaviorAbilities);
    if (monster.detailedDescription.lore) parts.push(monster.detailedDescription.lore);
    return parts.join('\n\n');
  }

  // Fallback to basic description
  return monster.description || '';
}

// Start editing monster description
function startEditingMonster(monster) {
  if (!monster) return;

  monsterEditForm.value = {
    name: monster.name || '',
    combined_description: combineMonsterDescription(monster)
  };

  editingMonsterId.value = monster.id;
}

// Cancel editing monster
function cancelEditMonster() {
  editingMonsterId.value = null;
}

// Save edited monster description
function saveEditMonster() {
  if (editingMonsterId.value === null) return;

  const monster = dungeonStore.currentDungeon.monsters.find(m => m.id === editingMonsterId.value);
  if (!monster) return;

  // Update monster fields
  monster.name = monsterEditForm.value.name;
  monster.combined_description = monsterEditForm.value.combined_description;

  // Save to localStorage
  dungeonStore.saveDungeons();

  editingMonsterId.value = null;
}
</script>

<style lang="scss" scoped>
.dungeon-monsters {
  padding: 1rem;
  font-family: var(--par-font-serif, 'Source Serif 4', Georgia, 'Times New Roman', serif);
}

/* ── Header (matches the sibling NPCs tab) ──────────────────────────────── */
.dungeon-monsters-heading {
  margin-bottom: 1.5rem;
}

.dungeon-monsters-heading__title {
  margin: 0 0 0.3rem;
  font-family: var(--par-font-serif, 'Source Serif 4', Georgia, 'Times New Roman', serif);
  font-size: 2.8rem;
  font-weight: 600;
  color: var(--par-color-action-primary, #2A4D70);
  line-height: 1.2;
}

.dungeon-monsters-heading__tagline {
  margin: 0;
  font-family: var(--par-font-serif, 'Source Serif 4', Georgia, 'Times New Roman', serif);
  font-size: 1.5rem;
  font-style: normal;
  color: var(--par-color-text-secondary, #555);
  line-height: 1.55;
}

.dungeon-monsters-empty {
  margin: 0.75rem 0 1.5rem;
  font-family: var(--par-font-sans, sans-serif);
  font-size: 1.3rem;
  font-style: italic;
  color: var(--par-color-text-muted, #6b6b6b);
}

/* ── Monster swap cards (mirrors the setting Factions tab) ──────────────── */
.monster-list {
  list-style: none;
  padding: 0;
  margin: 0 0 1.5rem;
}

.monster-list-item {
  margin: 0;
}

/* Lighter swap-card convention (matches the setting Quest Hooks cards):
   near-white cream + a tan border + soft shadow, so the card lifts off the
   content-container without the heavier callout-bg tan. */
.monster-card {
  background: var(--par-color-surface, #FBF7F0);
  /* Light 1px tan edge — converged with the faction card, lore spine nodes,
     and the item/NPC cards (M5). Was the heavier 1.5px border-strong. */
  border: 1px solid var(--par-color-border, #e8e2d4);
  border-radius: 0.8rem;
  box-shadow: var(--par-color-card-shadow, 0 1px 3px rgba(122, 50, 30, 0.04));
  margin-bottom: 0.8rem;
}

.monster-card--collapsed {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.5rem;
  cursor: pointer;

  &:focus-visible {
    outline: 2px solid var(--color-action-secondary-rest, #5A7A9A);
    outline-offset: -2px;
  }
}

.monster-card--expanded {
  padding: 1.25rem 1.5rem;
}

.monster-card__title {
  margin: 0;
  font-family: var(--par-font-serif, 'Source Serif 4', Georgia, 'Times New Roman', serif);
  font-size: 1.8rem;
  font-weight: 600;
  color: var(--par-color-title, #7a1f1f);
  line-height: 1.3;
}

.monster-card__header-text {
  flex: 1;
  min-width: 0;
}

.monster-card__teaser {
  margin: 0.15rem 0 0;
  font-family: var(--par-font-serif, 'Source Serif 4', Georgia, 'Times New Roman', serif);
  font-size: 1.3rem;
  font-style: italic;
  color: var(--par-color-text-secondary, #555);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.monster-card__header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
  cursor: pointer;

  &:focus-visible {
    outline: 2px solid var(--color-action-secondary-rest, #5A7A9A);
    outline-offset: -2px;
  }
}

.monster-card__caret {
  display: inline-flex;
  align-items: center;
  flex-shrink: 0;
  color: var(--par-color-title, #7a1f1f);
  transition: transform 0.2s ease;
}

.monster-card__caret--open {
  transform: rotate(90deg);
}

.monster-card__prose {
  max-width: 62rem;
  margin: 1rem 0 0;
  font-size: 1.5rem;
  line-height: 1.7;
  color: var(--par-color-text, #222);

  p {
    margin: 0 0 1rem;

    &:last-child {
      margin-bottom: 0;
    }
  }
}

.monster-card__danger {
  max-width: 62rem;
  margin: 1rem 0 0;
  font-size: 1.5rem;
  font-style: italic;
  color: var(--par-color-text-secondary, #555);
  line-height: 1.6;
}

/* Form zone — separated from the description above by a tan divider. */
.monster-card__statblock-controls {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 0.5px solid var(--par-color-divider, #e2dccd);
}

.monster-card__statblock-fields {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  gap: 1.5rem;
}

.monster-card__actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  padding-top: 1rem;
  border-top: 0.5px solid var(--par-color-border, #e8e2d4);
}

.monster-card__actions-primary {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
}

/* ── Ghost buttons (slate / lapis / burgundy) ──────────────────────────── */
.monster-ghost {
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

  &:focus-visible {
    outline: 2px solid currentColor;
    outline-offset: 2px;
  }

  &:disabled {
    opacity: 0.55;
    cursor: default;
  }
}

.monster-ghost--lapis {
  color: var(--color-action-rest, #365A85);

  &:hover:not(:disabled) {
    background: rgba(54, 90, 133, 0.08);
  }
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

/* ── Create-monster form ───────────────────────────────────────────────── */
.create-monster-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding-top: 1.5rem;
  margin-top: 1.5rem;
  border-top: 0.5px solid var(--par-color-border, #e8e2d4);
}

.create-monster-form__title {
  margin: 0;
  font-family: var(--par-font-serif, 'Source Serif 4', Georgia, 'Times New Roman', serif);
  font-size: 1.8rem;
  font-weight: 600;
  color: var(--color-action-hover, #2A4D70);
}

.create-monster-form__error {
  margin: 0;
  font-family: var(--par-font-serif, 'Source Serif 4', Georgia, 'Times New Roman', serif);
  font-size: 1.4rem;
  color: var(--par-color-title, #7a1f1f);
}

.create-monster-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 1.5rem;
}

.statblock-limit-message {
  /* text-align: center removed during PatreonCallout migration — the
     callout's actions row needs to flow inline, not stack centered. */
  margin-top: 1rem;
  margin-bottom: 1rem;
  padding: 1.5rem 0;

  p {
    margin: 0.5rem 0;
    color: #6b7280;
    font-size: 1.4rem;
    line-height: 1.6;

    strong {
      color: #374151;
      font-size: 1.6rem;
    }
  }

  .patreon-universal-button {
    margin-top: 1rem;

    a {
      text-decoration: none;
    }

    .patreon-responsive-button-wrapper {
      border-radius: 6px;
      overflow: hidden;
    }

    .patreon-responsive-button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      padding: 0.75rem 1.5rem;
      background: #F96854;
      color: #fff;
      font-weight: 700;
      font-size: 0.9375rem;
      font-variant: small-caps;
      text-decoration: none;
      border-radius: 6px;
      transition: all 0.2s ease;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

      .patreon_logo {
        width: 20px;
        height: 20px;
      }

      &:hover {
        background: #e63946;
        transform: translateY(-1px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
      }

      &:active {
        transform: translateY(0);
      }
    }
  }
}

/* Parchment callouts — match the NPC generator's statblock messages. */
.statblock-saved-message {
  margin-top: 1.5rem;
  padding: 1rem 1.5rem;
  background: var(--par-color-callout-bg, #f3ebda);
  border: 0.5px solid var(--par-color-border-strong, #c9b99a);
  border-radius: var(--par-radius-md, 4px);

  p {
    margin: 0;
    color: var(--par-color-text, #222);
    font-size: 1.6rem;
  }

  a {
    color: var(--color-action-hover, #2A4D70);
    font-weight: 600;
    text-decoration: underline;

    &:hover {
      color: var(--color-action-active, #1F3A5C);
    }
  }
}

/* Warning state — parchment callout with a burgundy left-rule (the parchment
   "attention" accent), not the alarming red. */
.statblock-not-found-message {
  margin-top: 1.5rem;
  padding: 1.25rem 1.5rem;
  background: var(--par-color-callout-bg, #f3ebda);
  border: 0.5px solid var(--par-color-border-strong, #c9b99a);
  border-left: 3px solid var(--par-color-title, #7a1f1f);
  border-radius: 0 var(--par-radius-md, 4px) var(--par-radius-md, 4px) 0;

  p {
    margin: 0 0 0.5rem 0;
    color: var(--par-color-text, #222);
    font-size: 1.6rem;
    line-height: 1.6;

    &:last-of-type {
      margin-bottom: 1rem;
    }

    strong {
      color: var(--par-color-title, #7a1f1f);
    }
  }

  .button-group {
    display: flex;
    gap: 1rem;
    margin-top: 1rem;
  }
}

.button-group {
  display: flex;
  gap: 1rem;
  margin-top: 0.5rem;
}

@media screen and (max-width: 768px) {
  .monster-card__actions {
    flex-direction: column;
    align-items: stretch;
  }

  .monster-card__actions-primary {
    flex-direction: column;
  }

  .create-monster-grid {
    grid-template-columns: 1fr;
  }

  .button-group {
    flex-direction: column;
  }

  .button-group button {
    width: 100%;
  }
}
</style>
