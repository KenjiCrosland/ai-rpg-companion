<template>
  <div class="encounter-monster-list">
    <div v-if="monsters.length === 0" class="empty-state">
      <p>Click a monster to add it.</p>
    </div>

    <div v-else class="monster-list">
      <div v-for="(monster, index) in monsters" :key="index"
        class="monster-entry"
        :class="{ 'monster-entry-highlight': shouldHighlight && index === highlightTargetIndex }"
        :ref="el => { if (index === highlightTargetIndex) highlightedMonsterRef = el }">
        <div class="monster-info">
          <div class="monster-header">
            <span class="monster-name">{{ monster.name }}</span>
            <div class="badge-group">
              <span :class="['source-badge', getSourceClass(monster.source)]">
                {{ getSourceLabel(monster) }}
              </span>
              <span v-if="shouldShowFolderBadge(monster)" class="folder-badge">
                {{ monster.sourceLabel }}
              </span>
            </div>
          </div>
          <div class="monster-stats">
            <span class="stat">CR {{ monster.cr }}</span>
            <span class="stat">{{ getMonsterXp(monster).toLocaleString() }} XP</span>
          </div>
        </div>

        <div class="monster-controls">
          <div class="quantity-control">
            <button class="qty-btn" @click="decrementQuantity(index)" :disabled="monster.quantity <= 1"
              aria-label="Decrease quantity">−</button>
            <span class="quantity">{{ monster.quantity }}</span>
            <button class="qty-btn" @click="incrementQuantity(index)" aria-label="Increase quantity">+</button>
          </div>

          <button class="remove-btn" @click="removeMonster(index)" aria-label="Remove monster"
            title="Remove monster">✕</button>
        </div>
      </div>

      <!-- Total XP and Difficulty -->
      <div class="encounter-summary">
        <div class="summary-row">
          <span class="label">Base XP:</span>
          <span class="value">{{ rawXp.toLocaleString() }}</span>
        </div>
        <div class="summary-row">
          <span class="label">
            Adjusted XP
            <span class="multiplier-note">(×{{ encounterMultiplier }})</span>:
          </span>
          <span class="value">{{ adjustedXp.toLocaleString() }}</span>
        </div>
        <div class="summary-row difficulty">
          <span class="label">Difficulty:</span>
          <span :class="['difficulty-badge', `difficulty-${difficultyRating.toLowerCase()}`]">
            {{ difficultyRating }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, nextTick } from 'vue';

// ─── CR-to-XP lookup (for per-monster display only) ──────────────────────────
const CR_TO_XP = {
  '0': 10, '1/8': 25, '1/4': 50, '1/2': 100,
  '1': 200, '2': 450, '3': 700, '4': 1100, '5': 1800,
  '6': 2300, '7': 2900, '8': 3900, '9': 5000, '10': 5900,
  '11': 7200, '12': 8400, '13': 10000, '14': 11500, '15': 13000,
  '16': 15000, '17': 18000, '18': 20000, '19': 22000, '20': 25000,
  '21': 33000, '22': 41000, '23': 50000, '24': 62000, '25': 75000,
  '26': 90000, '27': 105000, '28': 120000, '29': 135000, '30': 155000
};

function normalizeCR(cr) {
  if (cr === undefined || cr === null) return '0';
  const s = String(cr);
  if (s.includes('/')) return s;
  const num = parseFloat(s);
  if (isNaN(num)) return '0';
  if (num === 0.125) return '1/8';
  if (num === 0.25) return '1/4';
  if (num === 0.5) return '1/2';
  return String(Math.floor(num));
}

function getMonsterXp(monster) {
  const unitXp = monster.xp || CR_TO_XP[normalizeCR(monster.cr)] || 0;
  return unitXp * (monster.quantity || 1);
}

function getSourceClass(source) {
  if (!source) return 'source-unknown';
  const s = source.toLowerCase();
  if (s === 'srd') return 'source-srd';
  if (s === 'custom') return 'source-custom';
  if (s === 'saved') return 'source-saved';
  return 'source-other';
}

function getSourceLabel(monster) {
  // Show "Custom" for custom creatures instead of folder name
  if (monster.source === 'custom') return 'Custom';
  // Otherwise use the sourceLabel or source
  return monster.sourceLabel || monster.source || 'Unknown';
}

function shouldShowFolderBadge(monster) {
  // Show folder badge only for custom creatures with a folder name that's not Uncategorized
  return monster.source === 'custom' &&
    monster.sourceLabel &&
    monster.sourceLabel !== 'Uncategorized';
}

// ─── Props ───────────────────────────────────────────────────────────────────
const props = defineProps({
  monsters: {
    type: Array,
    required: true,
  },
  partySize: {
    type: Number,
    default: 4,
  },
  difficultyThresholds: {
    type: Object,
    default: () => ({ easy: 0, medium: 0, hard: 0, deadly: 0 }),
  },
  rawXp: {
    type: Number,
    default: 0,
  },
  adjustedXp: {
    type: Number,
    default: 0,
  },
  difficultyRating: {
    type: String,
    default: 'None',
  },
  encounterMultiplier: {
    type: Number,
    default: 1,
  },
  highlightOnMount: {
    type: Boolean,
    default: false,
  },
  highlightIndex: {
    type: Number,
    default: -1,
  },
});

const emit = defineEmits(['update-monsters', 'highlight-complete']);

// ─── Highlight animation ─────────────────────────────────────────────────────
const shouldHighlight = ref(false);
const highlightTargetIndex = ref(-1);
const highlightedMonsterRef = ref(null);

// Function to trigger highlight animation
async function triggerHighlight(index) {
  highlightTargetIndex.value = index;
  await nextTick();

  // Scroll monster into view
  if (highlightedMonsterRef.value) {
    highlightedMonsterRef.value.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest'
    });
  }

  // Trigger highlight animation
  shouldHighlight.value = true;

  // Remove highlight class after animation completes (1.5s)
  setTimeout(() => {
    shouldHighlight.value = false;
    highlightTargetIndex.value = -1;
    emit('highlight-complete');
  }, 1500);
}

// Watch for highlight on mount (deep link from statblock generator)
watch(() => props.highlightOnMount, async (newValue) => {
  if (newValue && props.monsters.length > 0) {
    triggerHighlight(0); // Deep link always highlights first monster
  }
});

// Watch for highlight index changes (when monsters are added)
watch(() => props.highlightIndex, async (newIndex) => {
  if (newIndex >= 0 && newIndex < props.monsters.length) {
    triggerHighlight(newIndex);
  }
});

// ─── Monster controls ────────────────────────────────────────────────────────
function incrementQuantity(index) {
  const updated = [...props.monsters];
  updated[index] = { ...updated[index], quantity: updated[index].quantity + 1 };
  emit('update-monsters', updated);
}

function decrementQuantity(index) {
  const updated = [...props.monsters];
  if (updated[index].quantity > 1) {
    updated[index] = { ...updated[index], quantity: updated[index].quantity - 1 };
    emit('update-monsters', updated);
  }
}

function removeMonster(index) {
  const updated = props.monsters.filter((_, i) => i !== index);
  emit('update-monsters', updated);
}
</script>

<style scoped>
.encounter-monster-list {
  background: transparent;
  font-family: var(--par-font-serif, 'Source Serif 4', Georgia, 'Times New Roman', serif);
}

/* Empty state — warm-cream dashed box: "Click a monster to add it." */
.empty-state {
  background: var(--par-color-surface, #FBF7F0);
  border: 0.5px dashed var(--par-color-border-strong, #c9b99a);
  border-radius: var(--par-radius-md, 4px);
  padding: 1.5rem 1rem;
  text-align: center;
  min-height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;
  font-style: italic;
  color: var(--par-color-text-secondary, #555);
}

.monster-list {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.monster-entry {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem;
  border: 0.5px solid var(--par-color-border-strong, #c9b99a);
  border-radius: var(--par-radius-md, 4px);
  background: var(--par-color-callout-bg-light, #F8F2E3);
  gap: 1rem;
}

.monster-info {
  flex: 1;
  min-width: 0;
}

.monster-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.25rem;
  flex-wrap: wrap;
}

.monster-name {
  font-weight: 600;
  font-size: 1.5rem;
  color: var(--par-color-title, #7a1f1f);
}

/* Source / folder badges — quiet tan pills (no candy colors). */
.source-badge,
.folder-badge {
  padding: 0.1rem 0.5rem;
  font-size: 1rem;
  font-weight: 500;
  border-radius: 3px;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  white-space: nowrap;
  background: var(--par-color-callout-bg, #f3ebda);
  color: var(--par-color-text-secondary, #555);
  border: none;
}

.badge-group {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  flex-wrap: wrap;
}

.monster-stats {
  display: flex;
  gap: 0.75rem;
  font-size: 1.2rem;
  color: var(--par-color-text-secondary, #555);
}

.stat {
  font-weight: 500;
}

.monster-controls {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-shrink: 0;
}

.quantity-control {
  display: flex;
  align-items: center;
  gap: 0;
  border: 0.5px solid var(--par-color-border-strong, #c9b99a);
  border-radius: var(--par-radius-md, 4px);
  overflow: hidden;
}

.qty-btn {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;
  font-weight: 600;
  line-height: 1;
  border: none;
  background: var(--par-color-surface, #FBF7F0);
  color: var(--par-color-text, #222);
  cursor: pointer;
  transition: background-color 0.15s;
  padding: 0;
  user-select: none;
}

.qty-btn:hover:not(:disabled) {
  background: var(--par-color-callout-bg, #f3ebda);
}

.qty-btn:disabled {
  color: var(--par-color-text-disabled, #ccc);
  cursor: not-allowed;
}

.quantity {
  min-width: 2rem;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 1.3rem;
  color: var(--par-color-text, #222);
  background: var(--par-color-surface-card, #FEFBF4);
  border-left: 0.5px solid var(--par-color-border-strong, #c9b99a);
  border-right: 0.5px solid var(--par-color-border-strong, #c9b99a);
}

/* Remove — quiet slate, burgundy on hover (the parchment destructive step). */
.remove-btn {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;
  line-height: 1;
  border: 0.5px solid var(--par-color-border-strong, #c9b99a);
  border-radius: var(--par-radius-md, 4px);
  background: transparent;
  color: var(--color-action-secondary-rest, #5A7A9A);
  cursor: pointer;
  transition: color 0.15s, border-color 0.15s, background-color 0.15s;
  padding: 0;
}

.remove-btn:hover {
  background: var(--par-color-action-destructive-hover, rgba(122, 31, 31, 0.06));
  border-color: var(--par-color-title, #7a1f1f);
  color: var(--par-color-title, #7a1f1f);
}

/* Summary */
.encounter-summary {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 0.5px solid var(--par-color-border-strong, #c9b99a);
}

.summary-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.375rem 0;
  font-size: 1.4rem;
  color: var(--par-color-text, #222);
}

.summary-row.difficulty {
  margin-top: 0.5rem;
  padding-top: 0.75rem;
  border-top: 0.5px solid var(--par-color-divider, #e2dccd);
}

.label {
  font-weight: 600;
  color: var(--par-color-text-secondary, #555);
}

.multiplier-note {
  font-weight: 400;
  color: var(--par-color-text-muted, #6b6b6b);
  font-size: 1.2rem;
}

.value {
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--par-color-text, #222);
}

/* Difficulty pill — original semantic colors, desaturated/warm-toned for
   parchment. Small-caps register. */
.difficulty-badge {
  padding: 0.2rem 0.55rem;
  font-weight: 600;
  font-size: 1.05rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  border-radius: 3px;
}

.difficulty-none {
  background: transparent;
  color: var(--par-color-text-muted, #6b6b6b);
  font-weight: 500;
}

.difficulty-trivial {
  background: #e8e2d4;
  color: #6b6b6b;
}

.difficulty-easy {
  background: #dde7d3;
  color: #4d6a3c;
}

.difficulty-medium {
  background: #efe6c6;
  color: #87691d;
}

.difficulty-hard {
  background: #ecd7c2;
  color: #9b5730;
}

.difficulty-deadly {
  background: #ebcfca;
  color: #8e3830;
}

@keyframes monster-highlight {
  0% { box-shadow: 0 0 0 0 rgba(122, 31, 31, 0.25); }
  50% { box-shadow: 0 0 0 6px rgba(122, 31, 31, 0.08); }
  100% { box-shadow: 0 0 0 0 rgba(122, 31, 31, 0); }
}

.monster-entry-highlight {
  animation: monster-highlight 1.5s ease-out;
}
</style>
