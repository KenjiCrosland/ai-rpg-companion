<template>
  <div ref="containerRef" :style="widthStyle" :class="`sb24-container ${effectiveColumns}${tightGrid ? ' sb24--tight' : ''}`">
    <div v-if="loading" class="sb24-card">
      <Statblock2024Skeleton :chassis="chassisPreview" />
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
      <!-- One body for display AND edit — editing happens IN PLACE within
           the card layout (2014-card convention, owner call 2026-07-19):
           each field swaps to an input where it lives, the card never turns
           into a separate form. -->
      <header class="sb24-header">
        <h2 v-if="!isEditing" class="sb24-name">{{ monster.name }}</h2>
        <input v-else v-model="edited.name" class="sb24-edit__input sb24-edit__input--name" aria-label="Name" />
        <p v-if="!isEditing" class="sb24-subtitle">{{ subtitle }}</p>
        <p v-else class="sb24-subtitle sb24-edit__subtitle">
          <input v-model="edited.size" class="sb24-edit__input sb24-edit__input--short" aria-label="Size" placeholder="Size" />
          <input v-model="edited.type" class="sb24-edit__input sb24-edit__input--short" aria-label="Type" placeholder="Type" />
          <input v-model="edited.alignment" class="sb24-edit__input sb24-edit__input--short" aria-label="Alignment" placeholder="Alignment" />
        </p>
      </header>

      <div class="sb24-body" :class="{ 'sb24-body--editing': isEditing }"
        :data-testid="isEditing ? 'sb24-edit-form' : undefined">
        <div class="sb24-vitals">
          <p class="sb24-line sb24-line--split">
            <!-- {{ ' ' }} defeats Vue's whitespace condensing between the
                 label element and the value (same trick as the entries). -->
            <span><strong>AC</strong>{{ ' ' }}<template v-if="!isEditing">{{ monster.ac }}</template>
              <input v-else v-model.number="edited.ac" type="number"
                class="sb24-edit__input sb24-edit__input--num" data-testid="edit-ac" aria-label="Armor Class" />
            </span>
            <span><strong>Initiative</strong> {{ signed(displayInitiativeBonus) }} ({{ 10 + displayInitiativeBonus }})</span>
          </p>
          <p class="sb24-line"><strong>HP</strong>{{ ' ' }}<template v-if="!isEditing">{{ monster.hp }}<template v-if="monster.hp_formula"> ({{ monster.hp_formula }})</template></template>
            <template v-else>
              <input v-model.number="edited.hp" type="number"
                class="sb24-edit__input sb24-edit__input--num" aria-label="Hit Points" />
              (<input v-model="edited.hp_formula" class="sb24-edit__input sb24-edit__input--short" aria-label="HP formula" />)
            </template>
          </p>
          <p class="sb24-line" v-if="isEditing || monster.speed"><strong>Speed</strong>{{ ' ' }}<template v-if="!isEditing">{{ monster.speed }}</template>
            <input v-else v-model="edited.speed" class="sb24-edit__input sb24-edit__input--line" aria-label="Speed" />
          </p>
        </div>

        <!-- Official 2024 3-column ability grid: STR/INT · DEX/WIS · CON/CHA,
             each cell ABBR · score · MOD · SAVE with tinted mod/save columns.
             In edit mode the SCORE cell becomes an input in place; MOD and
             SAVE recompute live (saves preserve recorded proficiency). -->
        <div class="sb24-abilities">
          <div class="sb24-ability-col" v-for="(col, i) in abilityColumns" :key="i">
            <div class="sb24-ability-cell sb24-ability-head">
              <span></span><span></span><span>MOD</span><span>SAVE</span>
            </div>
            <div class="sb24-ability-cell" v-for="stat in col" :key="stat">
              <span class="sb24-ability-abbr">{{ stat }}</span>
              <span v-if="!isEditing" class="sb24-ability-score">{{ monster.stats[stat] }}</span>
              <input v-else v-model.number="edited.stats[stat]" type="number"
                class="sb24-edit__input sb24-edit__input--score" :data-testid="`edit-${stat}`" :aria-label="stat" />
              <span class="sb24-ability-mod">{{ signed(modOf(displayStat(stat))) }}</span>
              <span class="sb24-ability-save">{{ signed(displaySave(stat)) }}</span>
            </div>
          </div>
        </div>

        <div class="sb24-details">
          <template v-if="!isEditing">
            <p class="sb24-line" v-for="[label, value] in detailLines" :key="label">
              <strong>{{ label }}</strong> {{ value }}
            </p>
            <p class="sb24-line"><strong>CR</strong> {{ crText }}</p>
          </template>
          <template v-else>
            <!-- All detail lines show while editing so absent ones can be
                 filled in; empty lines drop back out on save. -->
            <p class="sb24-line" v-for="[field, label] in DETAIL_FIELDS" :key="field">
              <strong>{{ label }}</strong>
              <input v-model="edited[field]" class="sb24-edit__input sb24-edit__input--line" :aria-label="label" />
            </p>
            <p class="sb24-line"><strong>CR</strong> {{ crText }}
              <span class="sb24-edit__note">CR, PB, and initiative are engine-owned; use Regenerate to change them.</span>
            </p>
          </template>
        </div>

        <div v-if="isEditing && bandHints.length" class="sb24-edit__hints" data-testid="band-hints">
          <p class="sb24-edit__hints-title">Off-budget for its CR and role (saved anyway — your call):</p>
          <p v-for="hint in bandHints" :key="hint" class="sb24-edit__hint">{{ hint }}</p>
        </div>

        <section v-for="section in visibleSections" :key="section.name" class="sb24-section">
          <template v-if="!isEditing">
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
          </template>
          <template v-else>
            <div class="sb24-edit__section-head">
              <h3 class="sb24-section-title">{{ section.name }}</h3>
              <button v-if="SECTION_REROLL_KIND[section.name] && edited.sections[section.name].length"
                class="sb24-edit__btn" :disabled="rerollingSections.has(section.name)"
                @click="rerollSectionAt(section.name)" :data-testid="`reroll-section-${section.name}`">
                {{ rerollingSections.has(section.name) ? '…' : 'Re-roll all' }}
              </button>
            </div>
            <div v-for="(entry, i) in edited.sections[section.name]" :key="i" class="sb24-edit__entry">
              <div class="sb24-edit__entry-bar">
                <input v-model="entry.name" class="sb24-edit__input sb24-edit__input--entry-name" />
                <button class="sb24-edit__btn" :disabled="rerollingKeys.has(`${section.name}:${i}`)"
                  @click="rerollEntryAt(section.name, i)" :data-testid="`reroll-${section.name}-${i}`">
                  {{ rerollingKeys.has(`${section.name}:${i}`) ? '…' : 'Re-roll' }}
                </button>
                <button class="sb24-edit__btn sb24-edit__btn--danger" @click="removeEntry(section.name, i)">✕</button>
              </div>
              <textarea v-model="entry.text" class="sb24-edit__textarea" rows="3"></textarea>
            </div>
            <button class="sb24-edit__btn sb24-edit__add" @click="addEntry(section.name)">+ Add to {{ section.name }}</button>
          </template>
        </section>
      </div>

      <!-- Footer bar lives inside the card like Statblock.vue's. Same events
           so the surrounding chrome doesn't care which card is mounted. -->
      <div v-if="isEditing" class="card-footer-bar sb24-footer">
        <div class="card-footer-bar__actions">
          <CardFooterAction data-testid="save-edit" @click="saveEdit">
            <template #icon>💾</template>
            Save changes
          </CardFooterAction>
          <CardFooterAction @click="cancelEdit">
            <template #icon>↩️</template>
            Cancel
          </CardFooterAction>
        </div>
      </div>
      <div v-else-if="!readonly" class="card-footer-bar sb24-footer">
      <div class="card-footer-bar__actions">
        <CardFooterAction data-testid="edit-statblock" @click="startEdit">
          <template #icon>✏️</template>
          Edit
        </CardFooterAction>
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
import { logger } from '@/util/logger.mjs';
import { generateGptResponse, isDegradedMode } from '@/util/ai-client.mjs';
import { rerollEntry, rerollSection, buildContext } from '@/tools/statblock-generator/format-2024/generate.mjs';
import { lintStatblock } from '@/tools/statblock-generator/format-2024/lint.mjs';

const props = defineProps({
  monster: { type: Object, default: null },
  columns: { type: String, default: 'two_columns' },
  width: { type: Number, default: 850 },
  loading: { type: Boolean, default: false },
  chassisPreview: { type: Object, default: null },
  readonly: { type: Boolean, default: false },
  premium: { type: Boolean, default: false },
});

const emit = defineEmits([
  'update-monster', 'move-to-folder', 'use-in-encounter', 'create-npc', 'delete',
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
  // Languages ALWAYS renders — the official 2024 empty form is "None"
  // (assembly leaves the field unset; live: a block shipped with no
  // Languages line at all). 2014's em-dash is toLegacyModel's business.
  DETAIL_FIELDS.filter(([field]) => props.monster[field] || field === 'languages')
    .map(([field, label]) => [label, props.monster[field] || 'None'])
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

// Edit mode shows every section (so entries can be added to empty ones);
// display mode shows only populated sections.
const visibleSections = computed(() =>
  isEditing.value
    ? SECTION_ORDER.map((name) => ({ name, entries: edited.value.sections[name] ?? [] }))
    : orderedSections.value
);

// Live values for the in-place ability grid and initiative line: while
// editing, MOD/SAVE/Initiative track the edited scores (saves preserve the
// proficiency recorded at edit-start — same math saveEdit commits).
const displayStat = (stat) =>
  isEditing.value ? (Number(edited.value.stats[stat]) || 10) : props.monster.stats[stat];
const displaySave = (stat) =>
  isEditing.value
    ? modOf(displayStat(stat)) + (proficientSaves.value.has(stat) ? (edited.value.pb ?? 2) : 0)
    : saveOf(stat);
const displayInitiativeBonus = computed(() =>
  isEditing.value ? modOf(displayStat('DEX')) : initiativeBonus.value
);

// ---------------------------------------------------------------------------
// Inline editing (owner call, 2026-07-19 — closes the read-only-v1 scope).
// Numeric edits get band HINTS from the engine, never blocks: the user may
// break the math on purpose; only the generation pipeline may not.
// ---------------------------------------------------------------------------
const STAT_KEYS = ['STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA'];
const REROLL_KIND = {
  Traits: 'ability', Actions: 'action', 'Legendary Actions': 'legendary',
  'Bonus Actions': 'bonus', Reactions: 'reaction',
};
// Whole-section re-rolls (parity with the 2014 card's per-section regenerate).
const SECTION_REROLL_KIND = {
  Traits: 'abilities', Actions: 'actions', 'Legendary Actions': 'legendary',
};

const isEditing = ref(false);
const edited = ref(null);
const proficientSaves = ref(new Set());
const rerollingKeys = ref(new Set());
const rerollingSections = ref(new Set());

function startEdit() {
  const m = props.monster;
  edited.value = JSON.parse(JSON.stringify(m));
  for (const s of SECTION_ORDER) edited.value.sections[s] ??= [];
  // Record which saves are proficient so score edits recompute correctly.
  proficientSaves.value = new Set(STAT_KEYS.filter(
    (s) => (m.saves?.[s] ?? modOf(m.stats[s])) > modOf(m.stats[s])
  ));
  isEditing.value = true;
}

function cancelEdit() {
  isEditing.value = false;
  edited.value = null;
}

function saveEdit() {
  const m = edited.value;
  for (const s of STAT_KEYS) {
    m.stats[s] = Math.min(30, Math.max(1, Math.round(Number(m.stats[s]) || 10)));
    m.saves = m.saves ?? {};
    m.saves[s] = modOf(m.stats[s]) + (proficientSaves.value.has(s) ? (m.pb ?? 2) : 0);
  }
  m.ac = Math.max(1, Math.round(Number(m.ac) || 10));
  m.hp = Math.max(1, Math.round(Number(m.hp) || 1));
  m.initiative_bonus = modOf(m.stats.DEX);
  m.initiative_score = 10 + m.initiative_bonus;
  for (const s of SECTION_ORDER) {
    m.sections[s] = (m.sections[s] ?? []).filter((e) => e.name?.trim() && e.text?.trim());
    if (!m.sections[s].length) delete m.sections[s];
  }
  emit('update-monster', m);
  isEditing.value = false;
  edited.value = null;
}

// Engine band hints on the live edit copy — advisory only.
const bandHints = computed(() => {
  const m = edited.value;
  if (!isEditing.value || !m || m.cr == null) return [];
  try {
    const { chassis } = buildContext(m.cr, m.archetype ?? 'balanced');
    return lintStatblock(m, { chassis, edition: '2024' })
      .findings.filter((f) => f.severity === 'correctable').map((f) => f.message);
  } catch {
    return [];
  }
});

function addEntry(section) {
  (edited.value.sections[section] ??= []).push({ name: 'New Ability', text: 'Describe it here.' });
}

function removeEntry(section, index) {
  edited.value.sections[section].splice(index, 1);
}

async function rerollEntryAt(section, index) {
  if (!props.premium) {
    alert('AI re-rolls in edit mode are available to premium supporters.');
    return;
  }
  const key = `${section}:${index}`;
  rerollingKeys.value.add(key);
  try {
    const result = await rerollEntry(
      edited.value,
      { kind: REROLL_KIND[section], current: edited.value.sections[section][index], degraded: isDegradedMode() },
      (p, v) => generateGptResponse(p, v, 3),
    );
    edited.value.sections[section][index] = { name: result.name, text: result.description };
  } catch (e) {
    logger.error('Error re-rolling entry:', e);
    alert('Failed to re-roll this entry. Please try again.');
  } finally {
    rerollingKeys.value.delete(key);
  }
}

async function rerollSectionAt(section) {
  if (!props.premium) {
    alert('AI re-rolls in edit mode are available to premium supporters.');
    return;
  }
  rerollingSections.value.add(section);
  try {
    const entries = await rerollSection(
      edited.value,
      { kind: SECTION_REROLL_KIND[section], degraded: isDegradedMode() },
      (p, v) => generateGptResponse(p, v, 3),
    );
    edited.value.sections[section] = entries.map((e) => ({ name: e.name, text: e.description }));
  } catch (e) {
    logger.error('Error re-rolling section:', e);
    alert('Failed to re-roll this section. Please try again.');
  } finally {
    rerollingSections.value.delete(section);
  }
}

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
// Below the statblock generator's canonical 850px, two-column text columns
// get narrower than the full-size ability grid (38.2rem needs ~385px per
// column) — compress the grid instead of letting the third group wrap
// (live: embedded NPC/dungeon cards run ~750-820px containers).
const tightGrid = computed(() =>
  effectiveColumns.value === 'two_columns' && containerWidth.value < 850
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
   groups fit across even the narrow one-column card. The column gap keeps
   wide abbreviations (CON, CHA) off two-digit scores; nowrap stops prod
   themes' word-wrap: break-word from fracturing them. */
.sb24-ability-cell {
  display: grid;
  grid-template-columns: 3.2rem 2.3rem 2.9rem 2.9rem;
  column-gap: 0.3rem;
  align-items: center;
  text-align: center;
}

/* Tight mode (two-column container under 850px): the grid compresses to
   ~33rem so all three groups stay on one row in ~330px columns. */
.sb24-container.sb24--tight .sb24-abilities {
  gap: 0.4rem 0.6rem;
}

.sb24-container.sb24--tight .sb24-ability-cell {
  grid-template-columns: 2.8rem 2rem 2.6rem 2.6rem;
  column-gap: 0.2rem;
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
  white-space: nowrap;
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

/* Edit mode — in-place inputs inside the card layout (2014-card
   convention): fields edit where they live, the card never becomes a
   separate form, and the two-column flow stays. Textareas are fixed-height
   (rows, no auto-grow), so columns only rebalance on add/remove/re-roll,
   never mid-keystroke; break-inside keeps each entry editor whole. */
.sb24-edit__entry,
.sb24-edit__section-head,
.sb24-edit__hints {
  break-inside: avoid;
}

.sb24-edit__input,
.sb24-edit__textarea {
  font-family: inherit;
  font-size: 1.35rem;
  color: #1a1712;
  background: #fffdf7;
  border: 1px solid #ddc9a3;
  border-radius: 4px;
  padding: 0.4rem 0.6rem;
}

.sb24-edit__input--name {
  width: 100%;
  font-size: 2.1rem;
  font-weight: 700;
  font-variant: small-caps;
  letter-spacing: 0.03em;
  color: #7a1f1f;
}

.sb24-edit__subtitle {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-top: 0.4rem;
}

.sb24-edit__input--num { width: 6.4rem; }
.sb24-edit__input--short { width: 12rem; }
.sb24-edit__input--line { width: 100%; max-width: 32rem; }
.sb24-edit__input--entry-name { flex: 1; font-weight: 700; min-width: 0; }
.sb24-edit__textarea { width: 100%; resize: vertical; }

/* Score input sits inside its grid cell like the display value; the score
   column widens while editing so the input fits. */
.sb24-edit__input--score {
  width: 4.6rem;
  padding: 0.2rem 0.3rem;
  text-align: center;
  justify-self: center;
}

.sb24-body--editing .sb24-ability-cell {
  grid-template-columns: 3.2rem 5.2rem 3.2rem 3.2rem;
}

.sb24-edit__note {
  font-size: 1.2rem;
  font-style: italic;
  color: #8a8172;
}

.sb24-edit__hints {
  background: #f7efdc;
  border: 1px solid #ddc9a3;
  border-radius: 4px;
  padding: 0.8rem 1rem;
  margin-bottom: 1.2rem;
}

.sb24-edit__hints-title {
  margin: 0 0 0.4rem;
  font-weight: 700;
  font-size: 1.2rem;
  color: #7a5a1f;
}

.sb24-edit__hint {
  margin: 0.15rem 0;
  font-size: 1.2rem;
  color: #7a5a1f;
}

.sb24-edit__section-head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 0.8rem;
  border-bottom: 1.5px solid #c9ab6e;
  margin-bottom: 0.6rem;
}

.sb24-edit__section-head .sb24-section-title {
  border-bottom: none;
  margin-bottom: 0;
}

.sb24-edit__entry { margin-bottom: 0.8rem; }

.sb24-edit__entry-bar {
  display: flex;
  gap: 0.6rem;
  margin-bottom: 0.4rem;
}

.sb24-edit__btn {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 1.2rem;
  padding: 0.3rem 0.8rem;
  background: #f3e9d5;
  border: 1px solid #ddc9a3;
  border-radius: 4px;
  cursor: pointer;
}

/* ✕ delete is a fixed square (shared shape with the 2014 card's edit bars). */
.sb24-edit__btn--danger {
  color: #a03333;
  width: 3.2rem;
  padding: 0.3rem 0;
  text-align: center;
  flex-shrink: 0;
}
.sb24-edit__add { margin-top: 0.2rem; }

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
