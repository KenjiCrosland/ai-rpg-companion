<template>
  <div ref="containerRef" :style="widthStyle" :class="`sb24-container ${effectiveColumns}`">
    <div v-if="loading" class="sb24-card">
      <Statblock2024Skeleton />
    </div>

    <!-- No role chip here — the card stays canonical (owner call, 2026-07-18);
         the auto-picked role surfaces in the Regenerate panel instead. -->
    <template v-else-if="monster">
      <!-- spec contract: support archetypes flag their solo weakness in the UI
           (archetype-chassis-spec.json solo_warning) -->
      <p v-if="monster.archetype === 'support'" class="sb24-solo-note">
        Support monsters underperform their CR when fought alone — pair with other creatures.
      </p>
      <div class="sb24-card">
      <header class="sb24-header">
        <h2 class="sb24-name">{{ monster.name }}</h2>
        <p class="sb24-subtitle">{{ subtitle }}</p>
      </header>

      <div class="sb24-body">
        <div class="sb24-vitals">
          <p class="sb24-line sb24-line--split">
            <span><strong>AC</strong> {{ monster.ac }}</span>
            <span><strong>Initiative</strong> {{ signed(initiativeBonus) }} ({{ initiativeScore }})</span>
          </p>
          <p class="sb24-line"><strong>HP</strong> {{ monster.hp }}<template v-if="monster.hp_formula"> ({{ monster.hp_formula }})</template></p>
          <p class="sb24-line" v-if="monster.speed"><strong>Speed</strong> {{ monster.speed }}</p>
        </div>

        <!-- Official 2024 3-column ability grid: STR/INT · DEX/WIS · CON/CHA,
             each cell ABBR · score · MOD · SAVE with tinted mod/save columns. -->
        <div class="sb24-abilities">
          <div class="sb24-ability-col" v-for="(col, i) in abilityColumns" :key="i">
            <div class="sb24-ability-cell sb24-ability-head">
              <span></span><span></span><span>MOD</span><span>SAVE</span>
            </div>
            <div class="sb24-ability-cell" v-for="stat in col" :key="stat">
              <span class="sb24-ability-abbr">{{ stat }}</span>
              <span class="sb24-ability-score">{{ monster.stats[stat] }}</span>
              <span class="sb24-ability-mod">{{ signed(modOf(monster.stats[stat])) }}</span>
              <span class="sb24-ability-save">{{ signed(saveOf(stat)) }}</span>
            </div>
          </div>
        </div>

        <div class="sb24-details">
          <p class="sb24-line" v-for="[label, value] in detailLines" :key="label">
            <strong>{{ label }}</strong> {{ value }}
          </p>
          <p class="sb24-line"><strong>CR</strong> {{ crText }}</p>
        </div>

        <section v-for="section in orderedSections" :key="section.name" class="sb24-section">
          <!-- Header + preamble + FIRST entry share a break-inside: avoid
               wrapper so a section title is never orphaned at the bottom of
               a column (break-after: avoid is not honored cross-browser in
               multicol). Remaining entries flow freely. -->
          <div class="sb24-section-head">
            <h3 class="sb24-section-title">{{ section.name }}</h3>
            <p
              v-if="section.name === 'Legendary Actions' && monster.legendary_uses"
              class="sb24-entry"
            >
              <em>Legendary Action Uses: {{ monster.legendary_uses }}. Immediately after another
              creature's turn, it can expend a use to take one of the following actions. It regains
              all expended uses at the start of each of its turns.</em>
            </p>
            <!-- The explicit {{ ' ' }} defeats Vue's whitespace condensing,
                 which otherwise glues the name to the text ("Amphibious.The…") -->
            <p v-if="section.entries[0]" class="sb24-entry">
              <strong><em>{{ section.entries[0].name }}.</em></strong>{{ ' ' }}<span v-html="formatText(section.entries[0].text)"></span>
            </p>
          </div>
          <p v-for="entry in section.entries.slice(1)" :key="entry.name" class="sb24-entry">
            <strong><em>{{ entry.name }}.</em></strong>{{ ' ' }}<span v-html="formatText(entry.text)"></span>
          </p>
        </section>
      </div>

      <!-- Footer bar lives inside the card like Statblock.vue's. Same events
           so the surrounding chrome doesn't care which card is mounted.
           Read-only v1 — no inline editing
           (see plans/statblock-2024-inline-editing.md). -->
      <div v-if="!readonly" class="card-footer-bar sb24-footer">
      <div class="card-footer-bar__actions">
        <CardFooterAction @click="$emit('move-to-folder')">
          <template #icon>📁</template>
          Move to folder
        </CardFooterAction>
        <CardFooterAction @click="$emit('use-in-encounter')">
          <template #icon>⚔️</template>
          Use in Encounter
        </CardFooterAction>
        <CardFooterAction @click="$emit('create-npc')">
          <template #icon>👤</template>
          Create NPC
        </CardFooterAction>
        <CardFooterAction @click="$emit('toggle-regenerate')">
          <template #icon>🔄</template>
          Regenerate
        </CardFooterAction>
        <CardFooterAction @click="$emit('toggle-export')">
          <template #icon>📤</template>
          Export
        </CardFooterAction>
      </div>
      <CardFooterAction @click="$emit('delete')" variant="danger" data-testid="delete-statblock">
        <template #icon>🗑️</template>
        Delete
      </CardFooterAction>
      </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import CardFooterAction from './CardFooterAction.vue';
import Statblock2024Skeleton from './skeletons/Statblock2024Skeleton.vue';

const props = defineProps({
  monster: { type: Object, default: null },
  columns: { type: String, default: 'two_columns' },
  width: { type: Number, default: 850 },
  loading: { type: Boolean, default: false },
  readonly: { type: Boolean, default: false },
});

const emit = defineEmits([
  'move-to-folder', 'use-in-encounter', 'create-npc', 'delete',
  'can-switch-columns', 'toggle-export', 'toggle-regenerate',
]);

const SECTION_ORDER = ['Traits', 'Actions', 'Bonus Actions', 'Reactions', 'Legendary Actions'];
const DETAIL_FIELDS = [
  ['skills', 'Skills'],
  ['vulnerabilities', 'Vulnerabilities'],
  ['resistances', 'Resistances'],
  ['immunities', 'Immunities'],
  ['gear', 'Gear'],
  ['senses', 'Senses'],
  ['languages', 'Languages'],
];

const abilityColumns = [['STR', 'INT'], ['DEX', 'WIS'], ['CON', 'CHA']];

const signed = (n) => (n >= 0 ? `+${n}` : `${n}`);
const modOf = (score) => Math.floor((score - 10) / 2);
const saveOf = (stat) => props.monster.saves?.[stat] ?? modOf(props.monster.stats[stat]);

const subtitle = computed(() => {
  const m = props.monster;
  const subtype = m.subtype ? ` (${m.subtype})` : '';
  return [`${m.size ?? ''} ${m.type ?? ''}${subtype}`.trim(), m.alignment].filter(Boolean).join(', ');
});

const initiativeBonus = computed(() =>
  props.monster.initiative_bonus ?? modOf(props.monster.stats.DEX)
);
const initiativeScore = computed(() =>
  props.monster.initiative_score ?? 10 + initiativeBonus.value
);

const detailLines = computed(() =>
  DETAIL_FIELDS.filter(([field]) => props.monster[field]).map(([field, label]) => [label, props.monster[field]])
);

const crText = computed(() => {
  const m = props.monster;
  const cr = m.cr_str ?? String(m.cr);
  const xp = (m.xp ?? 0).toLocaleString('en-US');
  return `${cr} (XP ${xp}; PB ${signed(m.pb ?? 2)})`;
});

const orderedSections = computed(() =>
  SECTION_ORDER
    .map((name) => ({ name, entries: props.monster.sections?.[name] ?? [] }))
    .filter((s) => s.entries.length > 0)
);

// Escape HTML, then translate the SRD's minimal markdown (bold/italic
// markers, newlines) for display.
function formatText(text) {
  const escaped = String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
  return escaped
    .replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/\n/g, '<br>');
}

// Column-switch reporting, mirroring Statblock.vue: below 700px the card
// forces one column and tells the parent to hide the toggle.
const containerRef = ref(null);
const containerWidth = ref(props.width);
let resizeObserver = null;

const effectiveColumns = computed(() =>
  containerWidth.value < 700 ? 'one_column' : props.columns
);
const widthStyle = computed(() => ({ maxWidth: `${props.width}px` }));

onMounted(() => {
  if (typeof ResizeObserver !== 'undefined' && containerRef.value) {
    resizeObserver = new ResizeObserver((entries) => {
      containerWidth.value = entries[0]?.contentRect?.width ?? containerWidth.value;
      emit('can-switch-columns', containerWidth.value >= 700);
    });
    resizeObserver.observe(containerRef.value);
  }
});

onBeforeUnmount(() => {
  if (resizeObserver) resizeObserver.disconnect();
});
</script>

<style scoped lang="scss">
/* Canonical 2024 textbook register — deliberately NOT parchment chrome
   (owner-approved deviation; see docs/2024-architecture.md UI decisions).
   Palette approximates the official 2025 MM card. */
.sb24-container {
  width: 100%;
  margin: 0 auto;
}

.sb24-card {
  background: #fdf9ef;
  border: 1.5px solid #d0b88a;
  border-radius: 10px;
  padding: 2rem 2.4rem 2.4rem;
  box-shadow: 0 1px 4px rgba(90, 60, 30, 0.12);
  font-family: 'Source Serif 4', Georgia, serif;
  font-size: 1.4rem;
  line-height: 1.45;
  color: #1a1712;
}

.sb24-header {
  margin-bottom: 1rem;
}

.sb24-name {
  margin: 0;
  font-size: 2.1rem;
  font-weight: 700;
  font-variant: small-caps;
  letter-spacing: 0.03em;
  color: #7a1f1f;
}

.sb24-subtitle {
  margin: 0.1rem 0 0;
  font-style: italic;
  color: #5a5347;
}

.sb24-solo-note {
  margin: -0.2rem 0 0.8rem;
  font-size: 1.2rem;
  font-style: italic;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  color: #8a8172;
}

/* Two-column mode: sections flow like the official spreads. */
.sb24-container.two_columns .sb24-body {
  column-count: 2;
  column-gap: 2.8rem;
}

/* One-column mode: the official single-column cards are narrow book-column
   strips — cap the card (and its footer/chip), not the container, so the
   parent's column-toggle width detection keeps seeing the full width. */
.sb24-container.one_column .sb24-card,
.sb24-container.one_column .sb24-solo-note {
  max-width: 44rem;
  margin-left: auto;
  margin-right: auto;
}

.sb24-container.one_column .sb24-solo-note {
  display: block;
  width: fit-content;
}


.sb24-vitals,
.sb24-abilities,
.sb24-details,
.sb24-entry,
.sb24-section-head {
  break-inside: avoid;
}

.sb24-line {
  margin: 0.15rem 0;
}

.sb24-line strong {
  color: #7a1f1f;
  font-weight: 700;
}

.sb24-line--split {
  display: flex;
  justify-content: space-between;
  gap: 1.6rem;
}

/* Ability grid: 3 groups (STR/INT · DEX/WIS · CON/CHA), 4 cells per row.
   Groups are content-sized — the tinted MOD/SAVE boxes hug the digits like
   the official cards (owner feedback) — and wrap at narrow widths. */
.sb24-abilities {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem 0.8rem;
  margin: 1rem 0;
}

/* Cell widths sized to the digits (official-card proportions) so all three
   groups fit across even the narrow one-column card. */
.sb24-ability-cell {
  display: grid;
  grid-template-columns: 3.2rem 2.6rem 3.2rem 3.2rem;
  align-items: center;
  text-align: center;
}

.sb24-ability-head {
  font-size: 0.95rem;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 600;
  letter-spacing: 0.05em;
  color: #8a8172;
}

.sb24-ability-abbr {
  font-weight: 700;
  font-variant: small-caps;
  text-align: left;
  padding-left: 0.4rem;
}

.sb24-ability-cell:not(.sb24-ability-head) {
  border-top: 1px solid #e6dcc6;
  padding: 0.25rem 0;
}

.sb24-ability-mod {
  background: #f0e4cb;
  padding: 0.25rem 0;
}

.sb24-ability-save {
  background: #e9e5da;
  padding: 0.25rem 0;
}

.sb24-details {
  margin-bottom: 0.6rem;
}

.sb24-section {
  margin-top: 1.2rem;
}

.sb24-section-title {
  margin: 0 0 0.6rem;
  font-size: 1.5rem;
  font-weight: 700;
  font-variant: small-caps;
  letter-spacing: 0.06em;
  color: #7a1f1f;
  border-bottom: 1.5px solid #c9ab6e;
  padding-bottom: 0.2rem;
}

.sb24-entry {
  margin: 0 0 0.8rem;
}

.sb24-entry strong em {
  color: #1a1712;
}

/* Footer bar sits inside the card (matching Statblock.vue), separated by a
   rule in the card's own palette. */
.sb24-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.8rem;
  margin-top: 1.8rem;
  padding-top: 1.2rem;
  border-top: 1px solid #e6dcc6;
}

.card-footer-bar__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
}
</style>
