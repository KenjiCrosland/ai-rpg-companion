<template>
  <div class="pill-manager-overlay" @click.self="$emit('close')">
    <div class="pill-manager-panel parchment-panel padded">
      <div class="manager-header">
        <div class="display-heading manager-title">Conditions</div>
        <button class="manager-close" @click="$emit('close')" aria-label="Close">×</button>
      </div>
      <p class="manager-subtitle ink-italic">
        Tag <strong>{{ zoneName }}</strong> with conditions. Hover a pill to
        see GM notes.
      </p>
      <OrnamentalDivider />

      <div class="field">
        <span class="field-label">Active</span>
        <div v-if="pills.length" class="active-pills">
          <div v-for="pill in pills" :key="pill.id" class="active-row">
            <ZonePill :pill="pill" />
            <button
              class="remove-btn"
              title="Remove pill"
              @click="$emit('remove', pill.id)"
            >×</button>
          </div>
        </div>
        <p v-else class="empty-hint ink-italic">No conditions yet.</p>
      </div>

      <div class="field">
        <span class="field-label">Quick Add</span>
        <div class="preset-row">
          <button
            v-for="preset in presets"
            :key="preset.label"
            type="button"
            class="preset-btn"
            @click="$emit('add', { ...preset })"
          >
            <span :class="['preset-chip', `preset-chip--${preset.tone}`]">{{ preset.label }}</span>
          </button>
        </div>
      </div>

      <div class="field custom-field">
        <span class="field-label">Custom</span>
        <div class="custom-row">
          <input
            v-model="customLabel"
            type="text"
            class="custom-input"
            placeholder="Label"
            maxlength="40"
            @keydown.enter="addCustom"
          />
          <div class="tone-swatches">
            <button
              v-for="toneKey in toneOrder"
              :key="toneKey"
              type="button"
              :class="['tone-swatch', `tone-swatch--${toneKey}`, { 'tone-swatch--active': customTone === toneKey }]"
              :title="tones[toneKey].name"
              @click="customTone = toneKey"
            />
          </div>
          <DButton variant="primary" :disabled="!customLabel.trim()" @click="addCustom">+ Add</DButton>
        </div>
        <textarea
          v-model="customDetail"
          class="custom-detail"
          placeholder="Optional GM note shown on hover"
          rows="2"
        />
      </div>
    </div>
  </div>
</template>

<script>
import ZonePill from './ZonePill.vue';
import DButton from './DButton.vue';
import OrnamentalDivider from './OrnamentalDivider.vue';
import { PILL_PRESETS, PILL_TONES, PILL_TONE_ORDER } from '../config/pills.js';

export default {
  name: 'PillManager',
  components: { ZonePill, DButton, OrnamentalDivider },
  props: {
    zoneName: { type: String, required: true },
    pills: { type: Array, default: () => [] },
  },
  emits: ['add', 'remove', 'close'],
  data() {
    return {
      customLabel: '',
      customTone: 'neutral',
      customDetail: '',
      presets: PILL_PRESETS,
      tones: PILL_TONES,
      toneOrder: PILL_TONE_ORDER,
    };
  },
  methods: {
    addCustom() {
      const label = this.customLabel.trim();
      if (!label) return;
      this.$emit('add', {
        label,
        tone: this.customTone,
        detail: this.customDetail.trim(),
      });
      this.customLabel = '';
      this.customDetail = '';
      this.customTone = 'neutral';
    },
  },
};
</script>

<style scoped>
.pill-manager-overlay {
  position: fixed;
  inset: 0;
  background: rgba(46, 33, 20, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  z-index: 115;
}

.pill-manager-panel {
  width: min(var(--ui-modal-width-md), 100%);
  max-height: 90vh;
  overflow-y: auto;
}

.manager-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.manager-title {
  font-size: var(--ui-modal-title-font);
}

.manager-close {
  background: transparent;
  border: none;
  font-size: var(--ui-modal-close-font);
  color: var(--ink-muted);
  cursor: pointer;
  padding: 0 0.55rem;
  line-height: 1;
}

.manager-subtitle {
  font-size: var(--ui-helper-font);
  margin: 0.5rem 0 0;
}

.manager-subtitle strong {
  color: var(--ink-primary);
}

.field {
  margin: var(--ui-field-gap) 0;
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

.active-pills {
  display: flex;
  flex-wrap: wrap;
  gap: 0.55rem;
}

.active-row {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
}

.remove-btn {
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

.remove-btn:hover {
  color: var(--accent-red);
}

.empty-hint {
  margin: 0;
  font-size: var(--ui-helper-font);
  color: var(--ink-muted);
}

.preset-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.55rem;
}

.preset-btn {
  background: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
}

/* Matches the real in-zone ZonePill size (see ZonePill.vue) so the
   Quick Add row previews exactly what the pill will look like once
   it's applied — these aren't primary CTAs. */
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
  gap: 0.65rem;
  align-items: center;
  flex-wrap: wrap;
}

.custom-input {
  flex: 1 1 11rem;
  min-width: 9rem;
  font-family: var(--font-body);
  font-size: var(--ui-input-font);
  padding: var(--ui-input-padding);
  background: var(--parchment-base);
  border: 1px solid var(--button-border);
  color: var(--ink-primary);
  border-radius: 2px;
}

.tone-swatches {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
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
  width: 100%;
  margin-top: 0.65rem;
  font-family: var(--font-body);
  font-size: var(--ui-input-font);
  padding: var(--ui-input-padding);
  background: var(--parchment-base);
  border: 1px solid var(--button-border);
  color: var(--ink-primary);
  border-radius: 2px;
  resize: vertical;
}

@media (max-width: 640px) {
  .pill-manager-overlay { padding: 1rem; }
}
</style>
