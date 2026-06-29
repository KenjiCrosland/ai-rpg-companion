<template>
  <div class="doll">
    <div class="doll__attune" :class="{ 'doll__attune--over': attunedCount > maxAttunement }">
      <span class="doll__attune-icon" aria-hidden="true">⚜</span>
      Attunement <strong>{{ attunedCount }} / {{ maxAttunement }}</strong>
    </div>

    <div class="doll__board">
      <!-- human silhouette behind the slots (Wikimedia Commons, CC BY-SA 3.0) -->
      <svg
        class="doll__figure"
        :viewBox="silhouetteViewBox"
        aria-hidden="true"
        preserveAspectRatio="xMidYMid meet"
      >
        <path :d="silhouettePath" />
      </svg>

      <div class="doll__grid">
        <div
          v-for="slot in slots"
          :key="slot.id"
          class="slot-wrap"
          :class="{
            'slot-wrap--head': slot.id === 'head',
            'slot-wrap--open': openSlotId === slot.id,
          }"
          :style="{ gridArea: slot.id }"
        >
          <!-- FILLED: shows the equipped item; click to view details, × to unequip. -->
          <div
            v-if="bySlot[slot.id]"
            class="slot slot--filled"
            :class="{ 'slot--selected': bySlot[slot.id].instanceId === selectedId }"
            role="button"
            tabindex="0"
            :aria-label="slotAria(slot)"
            @click="$emit('select', bySlot[slot.id].instanceId)"
            @keydown="onFilledKey(slot, $event)"
          >
            <span class="slot__label">{{ slot.label }}</span>
            <span class="slot__item" aria-hidden="true">
              {{ cleanName(bySlot[slot.id].name) }}
              <span v-if="bySlot[slot.id].attuned" class="slot__attune" title="Attuned">⚜</span>
            </span>
            <span v-if="isTwoHanded(bySlot[slot.id])" class="slot__grip" aria-hidden="true">Both hands</span>
            <button
              class="slot__unequip"
              type="button"
              :aria-label="`Unequip ${cleanName(bySlot[slot.id].name)}`"
              title="Unequip"
              @click.stop="$emit('unequip', bySlot[slot.id].instanceId)"
            >×</button>
          </div>

          <!-- BLOCKED: off hand occupied by a two-handed weapon in the main hand. -->
          <div
            v-else-if="slot.id === 'offHand' && twoHandedMain"
            class="slot slot--blocked"
            aria-disabled="true"
            :aria-label="`Off hand blocked — ${cleanName(twoHandedMain.name)} uses both hands.`"
          >
            <span class="slot__label">{{ slot.label }}</span>
            <span class="slot__blocked-mark" aria-hidden="true">✕</span>
            <span class="slot__blocked-note" aria-hidden="true">Both hands</span>
          </div>

          <!-- EMPTY: a menu trigger. Activate to pick an eligible item from the pack. -->
          <template v-else>
            <div
              class="slot slot--empty"
              :class="{ 'slot--open': openSlotId === slot.id }"
              role="button"
              tabindex="0"
              aria-haspopup="listbox"
              :aria-expanded="openSlotId === slot.id"
              :aria-label="`${slot.label} slot, empty. Activate to equip an item.`"
              @click="toggleMenu(slot, $event)"
              @keydown="onEmptyKey(slot, $event)"
            >
              <span class="slot__label">{{ slot.label }}</span>
              <span class="slot__add" aria-hidden="true">+</span>
            </div>

            <ul
              v-if="openSlotId === slot.id"
              :ref="setMenuEl"
              class="slot-menu"
              role="listbox"
              tabindex="-1"
              :aria-label="`Equip to ${slot.label}`"
              :aria-activedescendant="menuOptions.length ? `opt-${slot.id}-${activeIndex}` : null"
              @keydown="onMenuKey($event)"
            >
              <li
                v-for="(opt, i) in menuOptions"
                :id="`opt-${slot.id}-${i}`"
                :key="opt.id"
                class="slot-menu__opt"
                :class="{ 'slot-menu__opt--active': i === activeIndex }"
                role="option"
                :aria-selected="i === activeIndex"
                @click="selectOption(opt)"
                @mousemove="activeIndex = i"
              >
                <span class="slot-menu__name">{{ opt.label }}</span>
                <span v-if="opt.attune" class="slot-menu__attune" aria-hidden="true">⚜</span>
              </li>
              <li v-if="!menuOptions.length" class="slot-menu__none" role="presentation">
                No eligible items in your pack.
              </li>
            </ul>
          </template>
        </div>
      </div>
    </div>

    <p class="doll__hint">
      Click an empty slot to equip from your pack, or use <strong>Equip</strong> in an item's details.
    </p>

    <p class="doll__credit">
      Silhouette:
      <a href="https://commons.wikimedia.org/wiki/File:SVG_Human_Silhouette.svg" target="_blank" rel="noopener">“Human Silhouette”</a>
      (Wikimedia Commons), derived from work by Madhero88,
      <a href="https://creativecommons.org/licenses/by-sa/3.0/" target="_blank" rel="noopener">CC BY-SA 3.0</a>.
    </p>
  </div>
</template>

<script setup>
/**
 * Paper-doll equipment view. Each slot shows its equipped item (click to view
 * details, × to unequip) or, when empty, acts as a listbox trigger: activating it
 * opens a menu of eligible unequipped pack items, and choosing one equips it to
 * that exact slot. The 5e attunement counter (max 3) sits above.
 */
import { ref, computed, nextTick, onMounted, onBeforeUnmount } from 'vue';
import { EQUIP_SLOTS, cleanName, equipTargets, isTwoHanded } from '../utils/tile-presentation.mjs';
import { SILHOUETTE_PATH as silhouettePath, SILHOUETTE_VIEWBOX as silhouetteViewBox } from '../data/silhouette.js';

const props = defineProps({
  bySlot: { type: Object, default: () => ({}) },
  items: { type: Array, default: () => [] },
  attunedCount: { type: Number, default: 0 },
  maxAttunement: { type: Number, default: 3 },
  selectedId: { type: String, default: null },
});

const emit = defineEmits(['select', 'unequip', 'equip']);

const slots = EQUIP_SLOTS;

// --- eligibility ---------------------------------------------------------
/** Unequipped pack items that can occupy this slot (one-handed weapons fit both hands). */
function eligibleFor(slotId) {
  return props.items.filter((i) => !i.equippedSlot && equipTargets(i).includes(slotId));
}

// A two-handed weapon in the main hand blocks the off hand (it needs both).
const twoHandedMain = computed(() => {
  const m = props.bySlot.mainHand;
  return m && isTwoHanded(m) ? m : null;
});

// --- menu state ----------------------------------------------------------
const openSlotId = ref(null);
const activeIndex = ref(0);
const menuEl = ref(null);
const setMenuEl = (el) => {
  if (el) menuEl.value = el; // function ref: only the open menu mounts, so this holds it
};
let triggerEl = null;

const menuOptions = computed(() => {
  if (!openSlotId.value) return [];
  return eligibleFor(openSlotId.value).map((i) => ({
    id: i.instanceId,
    label: cleanName(i.name),
    attune: !!i.requiresAttunement,
  }));
});

function openMenu(slot, el) {
  openSlotId.value = slot.id;
  activeIndex.value = 0;
  triggerEl = el;
  nextTick(() => menuEl.value?.focus());
}
function closeMenu(refocus = true) {
  openSlotId.value = null;
  if (refocus && triggerEl) triggerEl.focus();
  triggerEl = null;
}
function toggleMenu(slot, e) {
  if (openSlotId.value === slot.id) closeMenu();
  else openMenu(slot, e.currentTarget);
}
function selectOption(opt) {
  if (!opt) return;
  emit('equip', { instanceId: opt.id, slot: openSlotId.value });
  closeMenu();
}

// --- keyboard ------------------------------------------------------------
const ACTIVATE = (e) => e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar';

/** Filled slot: Enter/Space opens its details (the div has role="button"). */
function onFilledKey(slot, e) {
  if (!props.bySlot[slot.id]) return;
  if (ACTIVATE(e)) {
    e.preventDefault();
    emit('select', props.bySlot[slot.id].instanceId);
  }
}
/** Empty slot: Enter/Space toggles the menu; ArrowDown opens it onto the first option. */
function onEmptyKey(slot, e) {
  if (ACTIVATE(e)) {
    e.preventDefault();
    toggleMenu(slot, e);
  } else if (e.key === 'ArrowDown') {
    e.preventDefault();
    if (openSlotId.value !== slot.id) openMenu(slot, e.currentTarget);
  }
}
/** Listbox: arrow/Home/End move the active option; Enter/Space select; Esc closes. */
function onMenuKey(e) {
  const n = menuOptions.value.length;
  if (e.key === 'Escape') {
    e.preventDefault();
    closeMenu();
  } else if (e.key === 'ArrowDown') {
    e.preventDefault();
    if (n) activeIndex.value = (activeIndex.value + 1) % n;
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    if (n) activeIndex.value = (activeIndex.value - 1 + n) % n;
  } else if (e.key === 'Home') {
    e.preventDefault();
    activeIndex.value = 0;
  } else if (e.key === 'End') {
    e.preventDefault();
    activeIndex.value = Math.max(0, n - 1);
  } else if (ACTIVATE(e)) {
    e.preventDefault();
    if (n) selectOption(menuOptions.value[activeIndex.value]);
  } else if (e.key === 'Tab') {
    closeMenu(false); // let focus move naturally
  }
}

/** Full accessible name for a filled slot: position + occupant + state + action. */
function slotAria(slot) {
  const item = props.bySlot[slot.id];
  if (!item) return `${slot.label} slot, empty.`;
  const grip = isTwoHanded(item) ? ', uses both hands' : '';
  return `${slot.label} slot: ${cleanName(item.name)} equipped${item.attuned ? ', attuned' : ''}${grip}. Activate to view details.`;
}

// Close the menu when clicking anywhere outside a slot.
function onDocMouseDown(e) {
  if (openSlotId.value && !e.target.closest('.slot-wrap')) closeMenu(false);
}
onMounted(() => document.addEventListener('mousedown', onDocMouseDown));
onBeforeUnmount(() => document.removeEventListener('mousedown', onDocMouseDown));
</script>

<style scoped>
.doll {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: var(--par-font-serif, 'Source Serif 4', Georgia, serif);
}

.doll__attune {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 2.6rem; /* breathing room above the figure */
  padding: 0.5rem 1.2rem;
  background: var(--par-color-callout-bg, #f3ebda);
  border: 0.5px solid var(--par-color-border-strong, #c9b99a);
  border-radius: 999px;
  font-size: 1.4rem;
  color: var(--par-color-text, #222);
}
.doll__attune strong {
  font-weight: 600;
  color: var(--par-color-title, #7a1f1f);
}
.doll__attune-icon {
  color: var(--par-color-title, #7a1f1f);
}
.doll__attune--over {
  border-color: var(--par-color-destructive, #a03333);
  color: var(--par-color-destructive, #a03333);
}
.doll__attune--over strong {
  color: var(--par-color-destructive, #a03333);
}

.doll__board {
  position: relative;
  width: 100%;
  max-width: 52rem;
}
.doll__figure {
  position: absolute;
  /* Centered so the body slots (chest/waist/feet) line up; only the HEAD slot is
     nudged up to meet the head (see .slot-wrap--head). */
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  height: 108%;
  width: auto;
  aspect-ratio: 358.5 / 1086;
  fill: #8a8a8f; /* gray (recolored from the source's black) */
  opacity: 0.5;
  pointer-events: none;
}

.doll__grid {
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1.15fr 1fr;
  gap: 0.7rem;
  /* Rows mapped to a standing figure: head, chest, waist, thigh, feet. */
  grid-template-areas:
    '.         head      .'
    'neck      body      cloak'
    'mainHand  belt      offHand'
    'hands     .         ring1'
    '.         feet      ring2';
}

/* The wrap is the grid cell; the menu anchors to it. */
.slot-wrap {
  position: relative;
}
/* Raise the open slot above sibling slots so its menu isn't painted under them
   (siblings are positioned, so DOM order — not the menu's own z-index — wins). */
.slot-wrap--open {
  z-index: 30;
}
/* Only the HEAD wrap rides up to meet the head; other slots stay put. */
.slot-wrap--head {
  transform: translateY(-1.7rem);
}

.slot {
  position: relative;
  min-height: 7.2rem;
  padding: 0.5rem 0.6rem;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  /* Quiet but compliant: a solid border at the WCAG AA minimum (3.3:1 on cream). */
  border: 1px solid #9a8a63;
  border-radius: var(--par-radius-md, 4px);
}

/* Filled slots are the loud thing: cream card + shadow + content. Empties recede. */
.slot--filled {
  background: var(--par-color-surface-card, #fefbf4);
  box-shadow: var(--par-color-card-shadow, 0 1px 3px rgba(122, 50, 30, 0.04));
  cursor: pointer;
}
.slot--filled:hover {
  border-color: var(--color-action-rest, #365a85);
}
/* Selected = lapis border + inner ring; focus = a distinct outer outline. */
.slot--selected {
  border-color: var(--color-action-rest, #365a85);
  box-shadow:
    inset 0 0 0 1px var(--color-action-rest, #365a85),
    var(--par-color-card-shadow, 0 1px 3px rgba(122, 50, 30, 0.04));
}

/* Empty slots: quiet at rest, but clearly actionable on hover/focus/open. */
.slot--empty {
  cursor: pointer;
  align-items: center;
  justify-content: center;
  transition: border-color 0.12s ease, background 0.12s ease;
}
.slot--empty .slot__label {
  text-align: center;
}
.slot__add {
  margin-top: 0.1rem;
  font-size: 1.8rem;
  line-height: 1;
  color: #9a8a63;
  opacity: 0;
  transition: opacity 0.12s ease;
}
.slot--empty:hover,
.slot--empty:focus-visible,
.slot--open {
  border-color: var(--color-action-rest, #365a85);
  background: var(--par-color-callout-bg-light, #f8f2e3);
}
.slot--empty:hover .slot__add,
.slot--empty:focus-visible .slot__add,
.slot--open .slot__add {
  opacity: 1;
  color: var(--color-action-rest, #365a85);
}

.slot:focus-visible {
  outline: 3px solid var(--color-action-active, #1f3a5c);
  outline-offset: 2px;
}

.slot__label {
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  /* Muted warm gray that still clears WCAG AA (4.6:1 on cream) — quiet, not faint. */
  color: #6e665a;
}
.slot__item {
  font-size: 1.3rem;
  font-weight: 600;
  line-height: 1.2;
  color: var(--par-color-title, #7a1f1f);
}
.slot__grip {
  margin-top: 0.1rem;
  font-size: 0.95rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--color-action-hover, #2a4d70);
}

/* Off hand claimed by a two-hander: visibly inert, not a place you can equip. */
.slot--blocked {
  align-items: center;
  justify-content: center;
  background: repeating-linear-gradient(
    -45deg,
    rgba(122, 50, 30, 0.05) 0,
    rgba(122, 50, 30, 0.05) 6px,
    transparent 6px,
    transparent 12px
  );
  border-style: dashed;
  cursor: not-allowed;
}
.slot--blocked .slot__label {
  text-align: center;
}
.slot__blocked-mark {
  font-size: 1.6rem;
  line-height: 1;
  color: var(--par-color-text-muted, #6b6b6b);
}
.slot__blocked-note {
  font-size: 0.95rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--par-color-text-muted, #6b6b6b);
}
.slot__attune {
  color: var(--par-color-title, #7a1f1f);
}
.slot__unequip {
  position: absolute;
  top: 0.1rem;
  right: 0.1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.4rem; /* ≥24px target (WCAG 2.5.8) */
  height: 2.4rem;
  border: none;
  background: transparent;
  color: var(--par-color-text-muted, #6b6b6b);
  font-size: 1.5rem;
  line-height: 1;
  border-radius: 50%;
  cursor: pointer;
  opacity: 0;
}
.slot--filled:hover .slot__unequip,
.slot--filled:focus-within .slot__unequip {
  opacity: 0.7;
}
.slot__unequip:hover {
  opacity: 1;
  background: rgba(160, 51, 51, 0.14);
  color: var(--par-color-destructive, #a03333);
}

/* The equip menu (listbox) popped below an empty slot. */
.slot-menu {
  position: absolute;
  z-index: 30;
  top: calc(100% + 0.4rem);
  left: 0;
  min-width: max(100%, 16rem);
  max-height: 22rem;
  overflow-y: auto;
  margin: 0;
  padding: 0.4rem;
  list-style: none;
  background: var(--par-color-surface-card, #fefbf4);
  border: 0.5px solid var(--par-color-border-strong, #c9b99a);
  border-radius: var(--par-radius-md, 4px);
  box-shadow: 0 4px 16px rgba(122, 50, 30, 0.18);
}
.slot-menu:focus {
  outline: none; /* focus shows on the active option instead */
}
.slot-menu__opt {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.6rem;
  padding: 0.55rem 0.7rem;
  border-radius: var(--par-radius-sm, 3px);
  font-size: 1.35rem;
  color: var(--par-color-text, #222);
  cursor: pointer;
}
.slot-menu__opt--active {
  background: var(--color-action-rest, #365a85);
  color: var(--color-action-text, #fbf7f0);
}
.slot-menu__name {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.slot-menu__attune {
  flex: none;
}
.slot-menu__none {
  padding: 0.7rem;
  font-size: 1.25rem;
  font-style: italic;
  text-align: center;
  color: var(--par-color-text-muted, #6b6b6b);
}

.doll__hint {
  margin: 1.6rem 0 0;
  font-size: 1.3rem;
  font-style: italic;
  text-align: center;
  color: var(--par-color-text-muted, #6b6b6b);
}

.doll__credit {
  margin: 0.8rem 0 0;
  font-size: 1.05rem;
  text-align: center;
  color: var(--par-color-text-muted, #6b6b6b);
}
.doll__credit a {
  color: var(--color-action-hover, #2a4d70);
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
</style>
