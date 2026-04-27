<template>
  <transition name="sheet-slide">
    <div v-if="zone" class="sheet-backdrop" @click.self="$emit('close')">
      <div
        class="sheet"
        role="dialog"
        :aria-label="`Zone: ${zone.name}`"
        @touchstart.passive="onTouchStart"
        @touchmove.passive="onTouchMove"
        @touchend="onTouchEnd"
      >
        <button class="sheet-close" aria-label="Close" @click="$emit('close')">×</button>
        <div class="sheet-handle" aria-hidden="true" />

        <h2 class="display-heading sheet-title">{{ zone.name || 'Unnamed Zone' }}</h2>

        <div class="sheet-body">
          <!-- ===== Edit tab: name, description, size + delete ===== -->
          <section v-if="activeTab === 'edit'" class="sheet-section">
            <label class="field">
              <span class="field-label">Name</span>
              <input
                v-model="draft.name"
                type="text"
                class="field-input sheet-name-input"
                @blur="commitEdit"
              />
            </label>

            <label class="field">
              <span class="field-label">Description</span>
              <textarea
                v-model="draft.description"
                class="field-input"
                rows="3"
                @blur="commitEdit"
              />
            </label>

            <div class="size-row">
              <label class="field field--inline">
                <span class="field-label">Cols</span>
                <input
                  v-model.number="draft.colSpan"
                  type="number"
                  min="1"
                  max="6"
                  class="field-input field-input--small"
                  @change="commitEdit"
                />
              </label>
              <label class="field field--inline">
                <span class="field-label">Rows</span>
                <input
                  v-model.number="draft.rowSpan"
                  type="number"
                  min="1"
                  max="6"
                  class="field-input field-input--small"
                  @change="commitEdit"
                />
              </label>
            </div>

            <OrnamentalDivider glyph="❦" />

            <div class="sheet-danger">
              <button class="sheet-danger-btn" @click="onDeleteClick">
                <Icon icon="game-icons:trash-can" :width="20" :height="20" />
                <span>Delete Zone</span>
              </button>
            </div>
          </section>

          <!-- ===== Tokens tab: list + inline add-token form ===== -->
          <section v-else-if="activeTab === 'tokens'" class="sheet-section">
            <p v-if="zoneTokens.length === 0" class="empty-note ink-italic">
              No tokens here right now.
            </p>
            <ul v-else class="token-list">
              <li
                v-for="token in zoneTokens"
                :key="token.id"
                class="token-row"
              >
                <div class="token-row-head">
                  <span
                    class="token-swatch"
                    :style="{ backgroundColor: paletteFor(token).fill, borderColor: paletteFor(token).border, color: paletteFor(token).text }"
                  >
                    <Icon v-if="iconNameFor(token)" :icon="iconNameFor(token)" :width="16" :height="16" />
                  </span>
                  <span class="token-label">{{ token.label }}</span>
                  <div class="token-move-wrap">
                    <button
                      :class="['token-move-btn', { 'token-move-btn--open': openMoveTokenId === token.id }]"
                      @click="toggleMove(token.id)"
                      :aria-expanded="openMoveTokenId === token.id"
                    >Move ▾</button>
                    <ul
                      v-if="openMoveTokenId === token.id"
                      class="move-menu"
                      @click.stop
                    >
                      <li v-if="moveTargets.length === 0" class="move-empty ink-italic">
                        No connected zones. Use Connect first.
                      </li>
                      <li v-for="target in moveTargets" :key="target.id">
                        <button class="move-menu-item" @click="selectMoveTarget(token.id, target.id)">
                          {{ target.name }}
                        </button>
                      </li>
                      <li>
                        <button class="move-menu-item move-menu-item--muted" @click="selectMoveTarget(token.id, null)">
                          Off the Board
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
                <DashCounter
                  :count="token.dashCount || 0"
                  :name="token.label"
                  class="token-row-dash"
                  @dash="$emit('dash', token.id)"
                  @undo="$emit('undo-dash', token.id)"
                />
              </li>
            </ul>

            <div class="sub-label">Add Token</div>

            <div class="field">
              <span class="field-label">Role</span>
              <div class="role-row">
                <button
                  v-for="r in roles"
                  :key="r"
                  type="button"
                  :class="['role-btn', { 'role-btn--active': newToken.role === r }]"
                  @click="pickTokenRole(r)"
                >{{ roleLabelFor(r) }}</button>
              </div>
            </div>

            <div class="field">
              <span class="field-label">Icon</span>
              <div class="icon-grid">
                <button
                  v-for="iconDef in iconList"
                  :key="iconDef.key"
                  type="button"
                  :class="['icon-cell', { 'icon-cell--active': newToken.icon === iconDef.key }]"
                  :title="`${iconDef.label} — by ${iconDef.author}`"
                  @click="pickTokenIcon(iconDef.key)"
                >
                  <Icon :icon="iconDef.iconifyName" :width="22" :height="22" />
                </button>
              </div>
              <p class="icon-attribution ink-italic">
                Icons by {{ authorList }} —
                <a href="https://game-icons.net" target="_blank" rel="noopener" class="attribution-link">game-icons.net</a>.
              </p>
            </div>

            <div class="field">
              <span class="field-label">Color</span>
              <div class="color-row">
                <button
                  v-for="colorKey in colorOrder"
                  :key="colorKey"
                  type="button"
                  :class="['color-swatch', { 'color-swatch--active': newToken.color === colorKey }]"
                  :title="colors[colorKey].name"
                  :style="{ backgroundColor: colors[colorKey].fill, borderColor: colors[colorKey].border }"
                  @click="pickTokenColor(colorKey)"
                />
              </div>
            </div>

            <div class="field">
              <span class="field-label">Name</span>
              <div class="custom-row">
                <input
                  v-model="newToken.label"
                  type="text"
                  class="field-input custom-input"
                  :placeholder="roleLabelFor(newToken.role)"
                  @keydown.enter="addToken"
                />
                <DButton variant="primary" @click="addToken">+ Add</DButton>
              </div>
            </div>
          </section>

          <!-- ===== Conditions tab: active pills + presets + custom ===== -->
          <section v-else-if="activeTab === 'conditions'" class="sheet-section">
            <div v-if="zone.pills.length" class="active-pills">
              <div
                v-for="pill in zone.pills"
                :key="pill.id"
                class="sheet-pill-wrap"
              >
                <div class="sheet-pill-row">
                  <button
                    :class="['sheet-pill', `sheet-pill--${pill.tone}`, { 'sheet-pill--open': openPillId === pill.id }]"
                    :aria-expanded="openPillId === pill.id"
                    @click="togglePill(pill)"
                  >{{ pill.label }}</button>
                  <button
                    class="sheet-pill-remove"
                    :aria-label="`Remove ${pill.label}`"
                    @click="$emit('remove-pill', zone.id, pill.id)"
                  >×</button>
                </div>
                <p v-if="openPillId === pill.id && pill.detail" class="sheet-pill-detail">{{ pill.detail }}</p>
              </div>
            </div>
            <p v-else class="empty-note ink-italic">No conditions yet.</p>

            <div class="sub-label">Quick Add</div>
            <div class="preset-row">
              <button
                v-for="preset in presets"
                :key="preset.label"
                type="button"
                class="preset-btn"
                @click="$emit('add-pill', zone.id, { ...preset })"
              >
                <span :class="['preset-chip', `preset-chip--${preset.tone}`]">{{ preset.label }}</span>
              </button>
            </div>

            <div class="sub-label">Custom</div>
            <div class="custom-row">
              <input
                v-model="customPill.label"
                type="text"
                class="field-input custom-input"
                placeholder="Label"
                maxlength="40"
                @keydown.enter="addCustomPill"
              />
              <div class="tone-swatches">
                <button
                  v-for="toneKey in toneOrder"
                  :key="toneKey"
                  type="button"
                  :class="['tone-swatch', `tone-swatch--${toneKey}`, { 'tone-swatch--active': customPill.tone === toneKey }]"
                  :title="tones[toneKey].name"
                  @click="customPill.tone = toneKey"
                />
              </div>
              <DButton
                variant="primary"
                :disabled="!customPill.label.trim()"
                @click="addCustomPill"
              >+ Add</DButton>
            </div>
            <textarea
              v-model="customPill.detail"
              class="field-input custom-detail"
              rows="2"
              placeholder="Optional GM note shown on hover"
            />
          </section>
        </div>

        <!-- Tab bar — sticks to the bottom of the sheet and stays
             visible while the active panel scrolls. -->
        <nav class="sheet-tabs" role="tablist" aria-label="Zone editor">
          <button
            v-for="tab in tabs"
            :key="tab.key"
            type="button"
            role="tab"
            :class="['sheet-tab', { 'sheet-tab--active': activeTab === tab.key }]"
            :aria-selected="activeTab === tab.key"
            @click="activeTab = tab.key"
          >
            <Icon :icon="tab.icon" :width="22" :height="22" />
            <span>{{ tab.label }}</span>
          </button>
        </nav>
      </div>
    </div>
  </transition>
</template>

<script>
import { Icon } from '@iconify/vue';
import OrnamentalDivider from './OrnamentalDivider.vue';
import DButton from './DButton.vue';
import DashCounter from './DashCounter.vue';
import { TOKEN_COLORS, TOKEN_COLOR_ORDER } from '../config/tokenColors.js';
import {
  TOKEN_ICON_MAP,
  TOKEN_ICONS,
  TOKEN_ICON_AUTHORS,
  ROLE_DEFAULTS,
  ROLE_LABELS,
} from '../config/tokenIcons.js';
import { PILL_PRESETS, PILL_TONES, PILL_TONE_ORDER } from '../config/pills.js';

function freshDraft(zone) {
  return {
    name: zone?.name ?? '',
    description: zone?.description ?? '',
    colSpan: zone?.colSpan || 1,
    rowSpan: zone?.rowSpan || 1,
  };
}

function freshCustomPill() {
  return { label: '', tone: 'neutral', detail: '' };
}

function freshNewToken() {
  const role = 'pc';
  const defaults = ROLE_DEFAULTS[role];
  return {
    role,
    icon: defaults.icon,
    color: defaults.color,
    label: '',
    // Track whether the GM has explicitly picked an icon/color so
    // role changes don't clobber their selections.
    userOverrodeIcon: false,
    userOverrodeColor: false,
  };
}

export default {
  name: 'ZoneDetailSheet',
  components: { Icon, OrnamentalDivider, DButton, DashCounter },
  props: {
    zone: { type: Object, default: null },
    tokens: { type: Array, default: () => [] },
    connections: { type: Array, default: () => [] },
    allZones: { type: Array, default: () => [] },
  },
  emits: [
    'close',
    'update-zone',
    'add-pill',
    'remove-pill',
    'add-token',
    'move-token',
    'dash',
    'undo-dash',
    'delete',
  ],
  data() {
    return {
      activeTab: 'edit',
      openPillId: null,
      openMoveTokenId: null,
      touchStartY: null,
      touchCurrentY: null,
      draft: freshDraft(this.zone),
      customPill: freshCustomPill(),
      newToken: freshNewToken(),
      presets: PILL_PRESETS,
      tones: PILL_TONES,
      toneOrder: PILL_TONE_ORDER,
      roles: ['quarry', 'pc', 'pursuer'],
      iconList: TOKEN_ICONS,
      colorOrder: TOKEN_COLOR_ORDER,
      colors: TOKEN_COLORS,
      tabs: [
        { key: 'edit',       icon: 'game-icons:quill-ink', label: 'Edit' },
        { key: 'tokens',     icon: 'game-icons:meeple',    label: 'Tokens' },
        { key: 'conditions', icon: 'game-icons:price-tag', label: 'Conditions' },
      ],
    };
  },
  computed: {
    zoneTokens() {
      if (!this.zone) return [];
      return this.tokens.filter((t) => t.zoneId === this.zone.id);
    },
    moveTargets() {
      if (!this.zone) return [];
      const neighborIds = new Set();
      for (const [a, b] of this.connections) {
        if (a === this.zone.id) neighborIds.add(b);
        if (b === this.zone.id) neighborIds.add(a);
      }
      return this.allZones.filter((z) => neighborIds.has(z.id));
    },
    authorList() {
      return TOKEN_ICON_AUTHORS.join(', ');
    },
  },
  watch: {
    zone: {
      immediate: true,
      handler(val, prev) {
        // On zone switch, reset transient UI state and re-seed the
        // edit draft from the incoming zone. Active tab is preserved
        // so a GM flipping between zones stays in (e.g.) Conditions.
        if (!val || (prev && val.id !== prev.id)) {
          this.openPillId = null;
          this.openMoveTokenId = null;
          this.customPill = freshCustomPill();
          this.newToken = freshNewToken();
        }
        if (val) {
          this.draft = freshDraft(val);
        }
      },
    },
  },
  mounted() {
    window.addEventListener('keydown', this.handleKeydown);
  },
  beforeUnmount() {
    window.removeEventListener('keydown', this.handleKeydown);
  },
  methods: {
    handleKeydown(e) {
      if (e.key === 'Escape' && this.zone) this.$emit('close');
    },
    paletteFor(token) {
      return TOKEN_COLORS[token.color] || TOKEN_COLORS.ink;
    },
    iconNameFor(token) {
      return TOKEN_ICON_MAP[token.icon]?.iconifyName;
    },
    roleLabelFor(role) {
      return ROLE_LABELS[role] || role;
    },
    togglePill(pill) {
      if (!pill.detail) return;
      this.openPillId = this.openPillId === pill.id ? null : pill.id;
    },
    toggleMove(tokenId) {
      this.openMoveTokenId = this.openMoveTokenId === tokenId ? null : tokenId;
    },
    selectMoveTarget(tokenId, targetZoneId) {
      this.$emit('move-token', tokenId, targetZoneId);
      this.openMoveTokenId = null;
    },
    commitEdit() {
      if (!this.zone) return;
      // Clamp spans into the 1..6 range to match the old ZoneEditor
      // so runaway keystrokes can't break the grid.
      const clamp = (n) => {
        const v = Number(n);
        if (!Number.isFinite(v) || v < 1) return 1;
        if (v > 6) return 6;
        return Math.floor(v);
      };
      const fields = {
        name: (this.draft.name || '').trim() || this.zone.name,
        description: this.draft.description || '',
        colSpan: clamp(this.draft.colSpan),
        rowSpan: clamp(this.draft.rowSpan),
      };
      // Keep the draft in sync with clamped values so the inputs
      // settle to the legal range after commit.
      this.draft.colSpan = fields.colSpan;
      this.draft.rowSpan = fields.rowSpan;
      this.draft.name = fields.name;
      this.$emit('update-zone', this.zone.id, fields);
    },
    addCustomPill() {
      const label = (this.customPill.label || '').trim();
      if (!label) return;
      this.$emit('add-pill', this.zone.id, {
        label,
        tone: this.customPill.tone,
        detail: (this.customPill.detail || '').trim(),
      });
      this.customPill = freshCustomPill();
    },
    pickTokenRole(role) {
      this.newToken.role = role;
      // Swap icon/color to the new role's defaults unless the GM has
      // already overridden those picks — mirrors the TokenCreator modal.
      if (!this.newToken.userOverrodeIcon) {
        this.newToken.icon = ROLE_DEFAULTS[role].icon;
      }
      if (!this.newToken.userOverrodeColor) {
        this.newToken.color = ROLE_DEFAULTS[role].color;
      }
    },
    pickTokenIcon(iconKey) {
      this.newToken.icon = iconKey;
      this.newToken.userOverrodeIcon = true;
    },
    pickTokenColor(colorKey) {
      this.newToken.color = colorKey;
      this.newToken.userOverrodeColor = true;
    },
    addToken() {
      const label = (this.newToken.label || '').trim();
      this.$emit('add-token', this.zone.id, {
        role: this.newToken.role,
        icon: this.newToken.icon,
        color: this.newToken.color,
        label: label || this.roleLabelFor(this.newToken.role),
      });
      this.newToken = freshNewToken();
    },
    onDeleteClick() {
      if (!this.zone) return;
      if (window.confirm(`Delete zone "${this.zone.name}"?`)) {
        this.$emit('delete', this.zone.id);
      }
    },
    onTouchStart(e) {
      if (!e.touches || !e.touches[0]) return;
      const target = e.currentTarget;
      const rect = target.getBoundingClientRect();
      if (e.touches[0].clientY - rect.top > 60) return;
      this.touchStartY = e.touches[0].clientY;
      this.touchCurrentY = e.touches[0].clientY;
    },
    onTouchMove(e) {
      if (this.touchStartY == null) return;
      if (e.touches && e.touches[0]) this.touchCurrentY = e.touches[0].clientY;
    },
    onTouchEnd() {
      if (this.touchStartY == null) return;
      const delta = (this.touchCurrentY ?? this.touchStartY) - this.touchStartY;
      this.touchStartY = null;
      this.touchCurrentY = null;
      if (delta > 90) this.$emit('close');
    },
  },
};
</script>

<style scoped>
.sheet-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(46, 33, 20, 0.45);
  z-index: 130;
  display: flex;
  align-items: flex-end;
  justify-content: center;
}

.sheet {
  position: relative;
  background-color: var(--parchment-base);
  background-image:
    radial-gradient(ellipse at top left, rgba(164, 134, 86, 0.08), transparent 50%),
    radial-gradient(ellipse at bottom right, rgba(164, 134, 86, 0.1), transparent 50%);
  width: 100%;
  max-width: 640px;
  max-height: 88vh;
  border-top-left-radius: 14px;
  border-top-right-radius: 14px;
  box-shadow: 0 -8px 30px rgba(46, 33, 20, 0.35);
  padding: 0.9rem 1.1rem 0;
  /* Column flex so the tab bar can pin to the bottom while the
     body scrolls between the title and the nav. */
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.sheet-body {
  flex: 1 1 auto;
  min-height: 0;
  overflow-y: auto;
  padding-bottom: 1rem;
}

.sheet-title {
  font-size: 1.5rem;
  margin: 0 0 0.6rem;
  padding-right: 2.5rem;
  line-height: 1.2;
}

.sheet-handle {
  width: 42px;
  height: 5px;
  background: var(--parchment-edge);
  border-radius: 3px;
  margin: 0 auto 0.9rem;
  opacity: 0.7;
}

.sheet-close {
  position: absolute;
  top: 0.5rem;
  right: 0.6rem;
  width: 36px;
  height: 36px;
  background: transparent;
  border: none;
  font-size: 1.7rem;
  line-height: 1;
  color: var(--ink-muted);
  cursor: pointer;
  padding: 0;
  z-index: 2;
}

.sheet-close:hover { color: var(--ink-primary); }

/* ---------- Section scaffolding ---------- */

.sheet-section {
  margin: 0.4rem 0;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.section-label {
  font-family: var(--font-display);
  font-size: 1.05rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--ink-muted);
  margin-bottom: 0.25rem;
}

.sub-label {
  font-family: var(--font-display);
  font-size: 0.8rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--ink-muted);
  margin-top: 0.25rem;
}

.field {
  display: block;
  margin: 0;
}

.field--inline {
  display: inline-flex;
  flex-direction: column;
  margin-right: 1rem;
}

.field-label {
  display: block;
  font-family: var(--font-display);
  font-size: var(--ui-label-font);
  letter-spacing: var(--ui-label-tracking);
  text-transform: uppercase;
  color: var(--ink-muted);
  margin-bottom: var(--ui-label-gap);
}

.field-input {
  font-family: var(--font-body);
  font-size: var(--ui-input-font);
  width: 100%;
  padding: var(--ui-input-padding);
  background: var(--parchment-base);
  border: 1px solid var(--button-border);
  color: var(--ink-primary);
  border-radius: 2px;
}

.field-input--small {
  width: 5rem;
}

.sheet-name-input {
  font-family: var(--font-display);
  letter-spacing: 0.02em;
}

.size-row {
  display: flex;
  gap: 0.5rem;
}

/* ---------- Conditions section ---------- */

.active-pills {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.sheet-pill-wrap {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.sheet-pill-row {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  align-self: flex-start;
}

.sheet-pill {
  font-family: var(--font-display);
  font-size: 0.95rem;
  letter-spacing: 0.05em;
  padding: 0.3rem 0.85rem;
  border-radius: 999px;
  border: 1px solid;
  cursor: pointer;
  line-height: 1.4;
}

.sheet-pill--open {
  box-shadow: 0 0 0 2px var(--accent-gold);
}

.sheet-pill--neutral { background: #d9c28d; color: #2e2114; border-color: #a3905f; }
.sheet-pill--warm    { background: #c46a3b; color: #f5ede0; border-color: #8b4322; }
.sheet-pill--danger  { background: #8a2a2a; color: #f5ede0; border-color: #5a1515; }
.sheet-pill--muted   { background: #8a8270; color: #f5ede0; border-color: #5f594b; }
.sheet-pill--mystery { background: #5c3762; color: #f5ede0; border-color: #38213c; }

.sheet-pill-remove {
  background: transparent;
  border: none;
  color: var(--ink-muted);
  font-family: var(--font-display);
  font-size: 1.15rem;
  line-height: 1;
  padding: 0.2rem 0.35rem;
  cursor: pointer;
  transition: color 120ms ease;
}

.sheet-pill-remove:hover { color: var(--accent-red); }

.sheet-pill-detail {
  font-family: var(--font-body);
  font-size: 0.9rem;
  line-height: 1.4;
  color: var(--ink-primary);
  background: var(--parchment-warm);
  border: 1px solid var(--parchment-edge);
  border-radius: 4px;
  padding: 0.4rem 0.6rem;
  margin: 0;
  max-width: 24rem;
}

.preset-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
}

.preset-btn {
  background: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
}

.preset-chip {
  display: inline-flex;
  padding: 0.25rem 0.8rem;
  border-radius: 999px;
  font-family: var(--font-display);
  font-size: 0.95rem;
  letter-spacing: 0.05em;
  line-height: 1.4;
  border: 1px solid;
  transition: transform 120ms ease;
}

.preset-btn:hover .preset-chip {
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(46, 33, 20, 0.2);
}

.preset-chip--neutral { background: #d9c28d; color: #2e2114; border-color: #a3905f; }
.preset-chip--warm    { background: #c46a3b; color: #f5ede0; border-color: #8b4322; }
.preset-chip--danger  { background: #8a2a2a; color: #f5ede0; border-color: #5a1515; }
.preset-chip--muted   { background: #8a8270; color: #f5ede0; border-color: #5f594b; }
.preset-chip--mystery { background: #5c3762; color: #f5ede0; border-color: #38213c; }

.custom-row {
  display: flex;
  gap: 0.55rem;
  align-items: center;
  flex-wrap: wrap;
}

.custom-input {
  flex: 1 1 10rem;
  min-width: 8rem;
  width: auto;
}

.tone-swatches {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.tone-swatch {
  flex: 0 0 auto;
  width: var(--ui-swatch-size);
  height: var(--ui-swatch-size);
  border-radius: 50%;
  border: 2px solid rgba(0, 0, 0, 0.2);
  cursor: pointer;
  padding: 0;
}

.tone-swatch--neutral { background: #d9c28d; }
.tone-swatch--warm    { background: #c46a3b; }
.tone-swatch--danger  { background: #8a2a2a; }
.tone-swatch--muted   { background: #8a8270; }
.tone-swatch--mystery { background: #5c3762; }

.tone-swatch--active {
  box-shadow: 0 0 0 2px var(--accent-gold);
}

.custom-detail {
  resize: vertical;
}

/* ---------- Tokens section ---------- */

.empty-note {
  font-size: 0.95rem;
  color: var(--ink-muted);
  margin: 0;
}

.token-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
}

.token-row {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0.45rem 0.6rem;
  background: var(--parchment-warm);
  border: 1px solid var(--parchment-edge);
  border-radius: 3px;
}

.token-row-head {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}

.token-row-dash {
  align-self: flex-start;
}

.token-swatch {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 2px solid;
  flex-shrink: 0;
}

.token-label {
  flex: 1;
  font-family: var(--font-display);
  font-size: 1.1rem;
  color: var(--ink-primary);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.token-move-wrap {
  position: relative;
}

.token-move-btn {
  font-family: var(--font-display);
  font-size: 0.9rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  padding: 0.35rem 0.75rem;
  background: transparent;
  border: 1px solid var(--button-border);
  color: var(--ink-primary);
  cursor: pointer;
  border-radius: 2px;
}

.token-move-btn--open,
.token-move-btn:hover {
  background: var(--button-bg);
}

.move-menu {
  position: absolute;
  top: calc(100% + 0.3rem);
  right: 0;
  min-width: 12rem;
  max-height: 50vh;
  overflow-y: auto;
  background: var(--parchment-warm);
  border: 1px solid var(--parchment-edge);
  box-shadow: 0 4px 12px rgba(46, 33, 20, 0.3);
  padding: 0.25rem 0;
  margin: 0;
  list-style: none;
  z-index: 5;
}

.move-menu-item {
  display: block;
  width: 100%;
  text-align: left;
  padding: 0.5rem 0.85rem;
  background: transparent;
  border: none;
  font-family: var(--font-body);
  font-size: 1rem;
  color: var(--ink-primary);
  cursor: pointer;
}

.move-menu-item:hover { background: var(--parchment-shadow); }

.move-menu-item--muted {
  color: var(--ink-muted);
  border-top: 1px solid var(--parchment-edge);
  font-style: italic;
}

.move-empty {
  padding: 0.5rem 0.75rem;
  font-size: 0.85rem;
  color: var(--ink-muted);
}

.role-row {
  display: flex;
  gap: 0.4rem;
  flex-wrap: wrap;
}

.role-btn {
  flex: 1 1 auto;
  font-family: var(--font-display);
  font-size: var(--ui-chip-font);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: var(--ui-chip-padding);
  background: transparent;
  border: 1px solid var(--button-border);
  color: var(--ink-secondary);
  cursor: pointer;
  border-radius: 2px;
}

.role-btn--active {
  background: var(--accent-gold);
  color: var(--parchment-base);
  border-color: var(--accent-gold-dark);
}

/* ---------- Icon + color pickers (Tokens tab) ---------- */

.icon-grid {
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  gap: 0.35rem;
}

.icon-cell {
  aspect-ratio: 1;
  background: var(--parchment-base);
  border: 1.5px solid var(--parchment-edge);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--ink-primary);
  cursor: pointer;
  border-radius: 2px;
  padding: 0;
}

.icon-cell:hover {
  background: var(--parchment-shadow);
}

.icon-cell--active {
  box-shadow: 0 0 0 2px var(--accent-gold);
  border-color: var(--accent-gold-dark);
}

.icon-attribution {
  font-size: 0.82rem;
  color: var(--ink-muted);
  margin: 0.5rem 0 0;
  line-height: 1.4;
  text-align: right;
}

.attribution-link {
  color: var(--ink-secondary);
  text-decoration: underline;
  text-decoration-color: var(--parchment-edge);
  text-underline-offset: 2px;
}

.attribution-link:hover {
  color: var(--accent-red);
}

.color-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.color-swatch {
  flex: 0 0 auto;
  width: var(--ui-swatch-size);
  height: var(--ui-swatch-size);
  border-radius: 50%;
  border: 2px solid;
  cursor: pointer;
  padding: 0;
}

.color-swatch--active {
  box-shadow: 0 0 0 2px var(--accent-gold);
}

/* ---------- Danger (inside the Edit tab) ---------- */

.sheet-danger {
  margin-top: 0.75rem;
}

.sheet-danger-btn {
  width: 100%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1.2rem;
  background: transparent;
  border: 1px solid var(--accent-red);
  color: var(--accent-red);
  font-family: var(--font-display);
  font-size: 0.95rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  cursor: pointer;
  border-radius: 3px;
  transition: background-color 120ms ease, color 120ms ease;
}

.sheet-danger-btn:hover {
  background: var(--accent-red);
  color: var(--parchment-base);
}

/* ---------- Bottom tab bar ---------- */

.sheet-tabs {
  flex: 0 0 auto;
  display: flex;
  gap: 0.4rem;
  padding: 0.6rem 0 0.9rem;
  border-top: 1px solid var(--parchment-edge);
  background: var(--parchment-base);
}

.sheet-tab {
  flex: 1 1 0;
  min-width: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.3rem;
  padding: 0.7rem 0.4rem;
  background: transparent;
  border: 1px solid var(--parchment-edge);
  border-radius: 3px;
  font-family: var(--font-display);
  font-size: 0.85rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--ink-secondary);
  cursor: pointer;
  line-height: 1.2;
  text-align: center;
  transition: background-color 120ms ease, color 120ms ease, border-color 120ms ease;
}

.sheet-tab:hover {
  background: var(--parchment-warm);
  color: var(--ink-primary);
}

.sheet-tab--active {
  background: var(--button-bg);
  border-color: var(--accent-gold-dark);
  color: var(--ink-primary);
}

.sheet-tab--active:hover {
  background: var(--button-bg-hover);
}

/* ---------- Slide transition ---------- */

.sheet-slide-enter-active,
.sheet-slide-leave-active {
  transition: opacity 180ms ease;
}

.sheet-slide-enter-active .sheet,
.sheet-slide-leave-active .sheet {
  transition: transform 220ms ease;
}

.sheet-slide-enter-from,
.sheet-slide-leave-to {
  opacity: 0;
}

.sheet-slide-enter-from .sheet,
.sheet-slide-leave-to .sheet {
  transform: translateY(100%);
}
</style>
