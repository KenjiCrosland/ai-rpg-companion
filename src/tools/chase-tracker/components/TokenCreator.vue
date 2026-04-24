<template>
  <div class="creator-overlay" @click.self="$emit('cancel')">
    <div class="creator-panel">
      <div class="display-heading creator-title">New Token</div>
      <OrnamentalDivider />

      <div class="field">
        <span class="field-label">Role</span>
        <div class="role-group">
          <button
            v-for="r in roles"
            :key="r"
            type="button"
            :class="['role-btn', { 'role-btn--active': role === r }]"
            @click="pickRole(r)"
          >{{ labelFor(r) }}</button>
        </div>
      </div>

      <div class="field">
        <span class="field-label">Icon</span>
        <div class="icon-grid">
          <button
            v-for="iconDef in iconList"
            :key="iconDef.key"
            type="button"
            :class="['icon-cell', { 'icon-cell--active': icon === iconDef.key }]"
            :title="`${iconDef.label} — by ${iconDef.author}`"
            @click="pickIcon(iconDef.key)"
          >
            <Icon :icon="iconDef.iconifyName" :width="24" :height="24" />
          </button>
        </div>
        <p class="icon-attribution ink-italic">
          Icons made by {{ authorList }}. Available on
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
            :class="['color-swatch', { 'color-swatch--active': color === colorKey }]"
            :title="colors[colorKey].name"
            :style="{ backgroundColor: colors[colorKey].fill, borderColor: colors[colorKey].border }"
            @click="pickColor(colorKey)"
          />
        </div>
      </div>

      <div class="field">
        <label class="field-label" for="creator-label">Name</label>
        <input
          id="creator-label"
          ref="labelInput"
          v-model="label"
          type="text"
          class="field-input"
          placeholder="Name this token"
          @keydown.enter="submit"
        />
      </div>

      <div class="actions">
        <DButton variant="tertiary" @click="$emit('cancel')">Cancel</DButton>
        <DButton variant="primary" @click="submit">Add Token</DButton>
      </div>
    </div>
  </div>
</template>

<script>
import { nextTick } from 'vue';
import { Icon } from '@iconify/vue';
import DButton from './DButton.vue';
import OrnamentalDivider from './OrnamentalDivider.vue';
import { TOKEN_ICONS, TOKEN_ICON_AUTHORS, ROLE_DEFAULTS, ROLE_LABELS } from '../config/tokenIcons.js';
import { TOKEN_COLORS, TOKEN_COLOR_ORDER } from '../config/tokenColors.js';

export default {
  name: 'TokenCreator',
  components: { Icon, DButton, OrnamentalDivider },
  emits: ['create', 'cancel'],
  data() {
    const role = 'pc';
    const defaults = ROLE_DEFAULTS[role];
    return {
      role,
      icon: defaults.icon,
      color: defaults.color,
      label: '',
      userOverrodeIcon: false,
      userOverrodeColor: false,
      roles: ['quarry', 'pc', 'pursuer'],
      iconList: TOKEN_ICONS,
      colorOrder: TOKEN_COLOR_ORDER,
      colors: TOKEN_COLORS,
    };
  },
  mounted() {
    nextTick(() => this.$refs.labelInput?.focus());
  },
  computed: {
    authorList() {
      return TOKEN_ICON_AUTHORS.join(', ');
    },
  },
  methods: {
    labelFor(role) {
      return ROLE_LABELS[role];
    },
    pickRole(r) {
      this.role = r;
      if (!this.userOverrodeIcon) this.icon = ROLE_DEFAULTS[r].icon;
      if (!this.userOverrodeColor) this.color = ROLE_DEFAULTS[r].color;
    },
    pickIcon(name) {
      this.icon = name;
      this.userOverrodeIcon = true;
    },
    pickColor(key) {
      this.color = key;
      this.userOverrodeColor = true;
    },
    submit() {
      this.$emit('create', {
        label: this.label.trim() || ROLE_LABELS[this.role],
        role: this.role,
        icon: this.icon,
        color: this.color,
      });
    },
  },
};
</script>

<style scoped>
.creator-overlay {
  position: fixed;
  inset: 0;
  background: rgba(46, 33, 20, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  z-index: 120;
}

.creator-panel {
  background-color: var(--parchment-warm);
  border: 1px solid var(--parchment-edge);
  box-shadow:
    inset 0 0 0 3px var(--parchment-warm),
    inset 0 0 0 4px var(--parchment-edge),
    0 10px 30px rgba(46, 33, 20, 0.35);
  padding: var(--ui-modal-padding);
  width: min(var(--ui-modal-width-sm), 100%);
  border-radius: 2px;
}

.creator-title {
  text-align: center;
  font-size: var(--ui-modal-title-font);
}

.field {
  margin-bottom: var(--ui-field-gap);
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

.role-group {
  display: flex;
  gap: 0.4rem;
}

.role-btn {
  flex: 1;
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

.icon-grid {
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  gap: 0.3rem;
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
  font-size: var(--ui-label-font);
  color: var(--ink-muted);
  margin: 0.55rem 0 0;
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
  /* flex-shrink: 0 forces the swatch to respect its width; without it
     the row can squeeze circles into ovals when the modal gets tight. */
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

.actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  margin-top: 0.75rem;
}
</style>
