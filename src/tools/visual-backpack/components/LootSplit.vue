<template>
  <div class="ls" ref="rootEl">
    <p class="ls__sr" aria-live="polite" role="status">{{ announce }}</p>
    <div class="ls__bar">
      <label class="ls__shares">
        <span class="ls__shares-label">Shares</span>
        <button class="ls__step" type="button" :disabled="shares <= 2" aria-label="Fewer shares" @click="setShares(shares - 1)">−</button>
        <span class="ls__shares-n" aria-live="polite">{{ shares }}</span>
        <button class="ls__step" type="button" :disabled="shares >= 8" aria-label="More shares" @click="setShares(shares + 1)">+</button>
      </label>
      <button class="ls__redeal" type="button" @click="redeal">↻ Re-deal items</button>
      <button class="ls__redeal" type="button" @click="printAllShares">🖨 Print all shares</button>
      <label class="ls__rebalance">
        <input type="checkbox" v-model="rebalanceEnabled" @change="deal" />
        Balance shares by value
      </label>
      <span v-if="leftover.valueGp > 0" class="ls__leftover" :title="`Undividable remainder`">
        Leftover: {{ coinText(leftover.coins) }}
      </span>
    </div>

    <p v-if="rebalanceEnabled" class="ls__caveat">
      Deals high-value items to keep shares even, then balances the coins to match —
      recomputing as you move items. Values use standard DMG rarity prices; consumables
      like potions and scrolls are valued a tier lower, and custom / non-SRD magic
      count as neutral. Totals are estimates, shown with ~.
    </p>

    <p class="ls__hint">
      <template v-if="!rebalanceEnabled">Coins split evenly by value; items are dealt at random. </template>Click
      an item to move it to another pile (or drag it). Copy a pile to hand it off<template v-if="allowClaim">;
      claim one for yourself</template>.
    </p>

    <div class="ls__piles">
      <div
        v-for="(pile, pi) in piles"
        :key="pi"
        class="ls__pile"
        :class="{ 'ls__pile--claimed': claimedIndex === pi, 'ls__pile--drop': dropTarget === pi }"
        @dragover.prevent="dropTarget = pi"
        @dragleave="dropTarget = dropTarget === pi ? -1 : dropTarget"
        @drop="onDrop(pi)"
      >
        <header class="ls__pile-head">
          <span class="ls__pile-name">Share {{ pi + 1 }}</span>
        </header>

        <template v-if="pile.items.length">
          <div v-for="g in groupByType(pile.items)" :key="g.type" class="ls__group">
            <span class="ls__group-label" :style="{ background: g.bg, color: g.text }">{{ g.label }}</span>
            <ul class="ls__items">
              <li
                v-for="it in g.items"
                :key="it.id"
                class="ls__item"
                :class="{ 'ls__item--open': menuKey === `${pi}:${it.id}` }"
                draggable="true"
                :tabindex="claimedIndex >= 0 ? -1 : 0"
                role="button"
                aria-haspopup="menu"
                :aria-expanded="menuKey === `${pi}:${it.id}`"
                :aria-label="`${itemLabel(it)}, Share ${pi + 1}. Press Enter to move it to another share.`"
                @dragstart="onDragStart(pi, it.id, $event)"
                @dragend="dropTarget = -1"
                @click.stop="toggleMenu(pi, it.id)"
                @keydown="onItemKey(pi, it.id, $event)"
              >
                <span class="ls__item-grip" aria-hidden="true">⠿</span>
                <span class="ls__item-name">{{ it.name }}<span v-if="it.quantity > 1"> ×{{ it.quantity }}</span></span>

                <div
                  v-if="menuKey === `${pi}:${it.id}`"
                  class="ls__menu"
                  role="menu"
                  aria-label="Move item to another share"
                  @click.stop
                  @keydown.esc.stop.prevent="closeMenuFromInside"
                >
                  <span class="ls__menu-label">Move to</span>
                  <button
                    v-for="ti in otherPiles(pi)"
                    :key="ti"
                    class="ls__menu-opt"
                    type="button"
                    role="menuitem"
                    @click="pickMove(pi, it.id, ti)"
                  >Share {{ ti + 1 }}</button>
                </div>
              </li>
            </ul>
          </div>
        </template>

        <!-- Receipt-style footer: contents above, subtotals by component, grand total last. -->
        <div v-if="pile.items.length || coinText(pile.coins)" class="ls__totals">
          <div v-if="coinText(pile.coins)" class="ls__subtotal">
            <span class="ls__subtotal-label">Coins</span>
            <span class="ls__subtotal-value">{{ coinText(pile.coins) }}</span>
          </div>
          <div v-if="itemValueOf(pile) > 0" class="ls__subtotal">
            <span class="ls__subtotal-label">{{ hasEstimate(pile) ? 'Item value' : 'Treasure value' }}</span>
            <span class="ls__subtotal-value">{{ hasEstimate(pile) ? '~' : '' }}{{ formatGp(itemValueOf(pile)) }} gp</span>
          </div>
          <div class="ls__grand-total">
            <span>Total value</span>
            <span>{{ hasEstimate(pile) ? '~' : '' }}{{ formatGp(pile.valueGp) }} gp</span>
          </div>
        </div>
        <p v-else class="ls__pile-empty">No items or coins in this share</p>

        <div class="ls__pile-actions">
          <button class="ls__copy" type="button" @click="copyPile(pi)">
            {{ copiedIndex === pi ? '✓ Copied' : 'Copy' }}
          </button>
          <template v-if="allowClaim">
            <button
              v-if="claimedIndex === pi"
              class="ls__claimed"
              type="button"
              disabled
            >✓ Added to your pack</button>
            <button
              v-else
              class="ls__claim"
              type="button"
              :disabled="claimedIndex >= 0"
              :title="claimedIndex >= 0 ? 'You’ve already claimed a pile' : 'Add this pile to your pack'"
              @click="claim(pi)"
            >Add to my pack</button>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
/**
 * Flat, anonymous loot splitter. Deals the parsed haul into N piles (coins even by
 * value, items dealt at random), lets the user rebalance by drag OR a per-item
 * "move" menu, copy any pile as text to hand off, and claim exactly one pile into
 * their own pack. Stateless — nothing persists; the parent owns applyTreasure.
 */
import { ref, watch, nextTick, onMounted, onBeforeUnmount } from 'vue';
import { splitLoot, rebalanceCoins } from '../utils/split-loot.mjs';
import { coinValueGp } from '../utils/carry-capacity.mjs';
import { itemType, TYPE_COLORS } from '../utils/tile-presentation.mjs';
import { estimateMagicValue } from '@/util/magic-item-value.mjs';

const props = defineProps({
  coins: { type: Object, default: () => ({}) },
  items: { type: Array, default: () => [] },
  // "Claim a pile into your pack" only makes sense inside the backpack. The
  // standalone splitter has no pack, so it hides that action (Copy stays).
  allowClaim: { type: Boolean, default: true },
});
const emit = defineEmits(['claim']);

const shares = ref(3);
// "Balance shares by value" is opt-in (off by default), but we REMEMBER the last
// choice across opens so it doesn't snap back every time the panel is reopened.
const BALANCE_PREF_KEY = 'backpack.lootSplit.balanceByValue';
const readBalancePref = () => {
  try { return localStorage.getItem(BALANCE_PREF_KEY) === 'true'; } catch { return false; }
};
const rebalanceEnabled = ref(readBalancePref());
watch(rebalanceEnabled, (v) => {
  try { localStorage.setItem(BALANCE_PREF_KEY, v ? 'true' : 'false'); } catch { /* storage blocked */ }
  announceMsg(`Balancing by value ${v ? 'on' : 'off'}.`);
});
const rootEl = ref(null);
// Screen-reader status line: mouse-free feedback for actions that otherwise leave
// no visible focus (re-deal, move, copy, claim). Blanked then reset so the same
// message re-announces.
const announce = ref('');
function announceMsg(msg) {
  announce.value = '';
  nextTick(() => { announce.value = msg; });
}
const piles = ref([]);
const leftover = ref({ coins: {}, valueGp: 0 });
const claimedIndex = ref(-1);
const copiedIndex = ref(-1);
const dropTarget = ref(-1);
const dragFrom = ref(null); // { pile, id }
const menuKey = ref(null); // `${pile}:${id}` of the item whose move-menu is open

const round2 = (n) => Math.round(n * 100) / 100;
const DENOMS = ['pp', 'gp', 'ep', 'sp', 'cp'];

function deal() {
  const r = splitLoot(props.coins, props.items, shares.value, Math.random, {
    rebalance: rebalanceEnabled.value,
  });
  piles.value = r.piles;
  leftover.value = r.leftover;
  claimedIndex.value = -1; // a fresh deal invalidates any prior claim intent
  copiedIndex.value = -1;
}
function setShares(n) {
  shares.value = Math.min(8, Math.max(2, n));
}
// User-triggered re-deal (announced); the mount/watch calls to deal() stay silent.
function redeal() {
  deal();
  announceMsg(`Loot re-dealt into ${shares.value} shares.`);
}
onMounted(deal);
watch(shares, deal);
// Re-deal if the upstream selection changes (checkbox toggles in the modal).
watch(() => [props.items, props.coins], deal, { deep: true });

const otherPiles = (pi) => piles.value.map((_, i) => i).filter((i) => i !== pi);
const itemLabel = (it) => `${it.name}${it.quantity > 1 ? ` (×${it.quantity})` : ''}`;

// The item-value component of a pile's total: mundane treasure always, plus magic
// rarity estimates when balancing (so total = coins + item value reconciles, and a
// Legendary-only share reads ~30,000 instead of a phantom number).
const itemValueOf = (pile) =>
  round2(
    (pile.items || []).reduce((s, it) => {
      const q = Number(it.quantity) || 1;
      if (it.category === 'Treasure') return s + (Number(it.valueGp) || 0) * q;
      if (rebalanceEnabled.value && it.category === 'Magic Item') return s + estimateMagicValue(it) * q;
      return s;
    }, 0),
  );

// A pile carries a `~` only when its total folds in a rarity-BASED magic estimate;
// coins and treasure are exact, so a magic-free share (even while balancing) reads
// as a firm figure with a "Treasure value" line rather than an estimated "Item value".
const magicEstimateOf = (pile) =>
  rebalanceEnabled.value
    ? (pile.items || []).reduce(
        (s, it) => (it.category === 'Magic Item' ? s + estimateMagicValue(it) * (Number(it.quantity) || 1) : s),
        0,
      )
    : 0;
const hasEstimate = (pile) => magicEstimateOf(pile) > 0;

// Group a pile's items by type, most-interesting first: magic items, then treasure,
// then the mundane gear family — so each share reads as a tidy grouped breakdown.
const TYPE_ORDER = ['magic', 'treasure', 'weapon', 'armor', 'consumable', 'tools', 'gear', 'misc', 'currency'];
function groupByType(items) {
  const by = {};
  for (const it of items) (by[itemType(it)] ||= []).push(it);
  return TYPE_ORDER.filter((t) => by[t]).map((t) => ({
    type: t,
    label: TYPE_COLORS[t]?.label || t,
    bg: TYPE_COLORS[t]?.bg || '#e7ddc7',
    text: TYPE_COLORS[t]?.text || '#555',
    items: by[t],
  }));
}

// --- click-to-move menu ---
const closeMenu = () => { menuKey.value = null; };
function toggleMenu(pi, id) {
  if (claimedIndex.value >= 0) return; // arrangement locks once a pile is claimed
  const key = `${pi}:${id}`;
  if (menuKey.value === key) {
    menuKey.value = null;
  } else {
    menuKey.value = key;
    // Drop focus onto the first destination so keyboard users land in the menu.
    nextTick(() => rootEl.value?.querySelector('.ls__menu-opt')?.focus());
  }
}
// Keyboard on an item row: Enter/Space opens the move menu, Escape closes it.
function onItemKey(pi, id, e) {
  // Ignore keys bubbling up from the open menu's buttons (else Enter on a
  // destination would be hijacked here and never reach the button's click).
  if (e.target !== e.currentTarget) return;
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    toggleMenu(pi, id);
  } else if (e.key === 'Escape' && menuKey.value === `${pi}:${id}`) {
    e.preventDefault();
    menuKey.value = null;
  }
}
// Escape from inside the menu — close and return focus to the row that owns it.
function closeMenuFromInside() {
  const row = rootEl.value?.querySelector('.ls__item--open');
  menuKey.value = null;
  row?.focus();
}
function pickMove(fromPi, id, toPi) {
  moveItem(fromPi, id, toPi);
  menuKey.value = null;
}
watch(menuKey, (k) => {
  if (k) window.addEventListener('click', closeMenu);
  else window.removeEventListener('click', closeMenu);
});
onBeforeUnmount(() => window.removeEventListener('click', closeMenu));

function recompute(pile) {
  pile.valueGp = round2(coinValueGp(pile.coins) + itemValueOf(pile));
}
function moveItem(fromPi, id, toPi) {
  if (fromPi === toPi || claimedIndex.value >= 0) return;
  const from = piles.value[fromPi];
  const to = piles.value[toPi];
  const it = from.items.find((x) => x.id === id);
  if (!from || !to || !it) return;
  from.items = from.items.filter((x) => x.id !== id);
  const existing = to.items.find((x) => x.id === id);
  if (existing) existing.quantity += it.quantity;
  else to.items.push(it);

  if (rebalanceEnabled.value) {
    // Item values shifted → redistribute the coin pool across ALL shares and
    // restamp every total, so the balance holds after a manual move.
    leftover.value = rebalanceCoins(piles.value, props.coins);
    piles.value.forEach(recompute);
  } else {
    recompute(from);
    recompute(to);
  }
  announceMsg(`Moved ${itemLabel(it)} to Share ${toPi + 1}.${rebalanceEnabled.value ? ' Coins re-balanced.' : ''}`);
}

// --- drag ---
function onDragStart(pi, id, e) {
  dragFrom.value = { pile: pi, id };
  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('text/plain', id);
}
function onDrop(toPi) {
  dropTarget.value = -1;
  if (dragFrom.value) moveItem(dragFrom.value.pile, dragFrom.value.id, toPi);
  dragFrom.value = null;
}
function claim(pi) {
  if (claimedIndex.value >= 0) return;
  claimedIndex.value = pi;
  emit('claim', { coins: { ...piles.value[pi].coins }, items: piles.value[pi].items.map((i) => ({ ...i })) });
  announceMsg(`Share ${pi + 1} added to your pack.`);
}

// --- text export ---
// Mixed-denomination tally on one line, thousand-separated: "194,238 gp, 2 sp, 5 cp".
// Zero denominations are skipped so it reads as a merchant's total, not a worksheet.
function coinText(coins) {
  return DENOMS.filter((d) => (Number(coins?.[d]) || 0) > 0)
    .map((d) => `${(Number(coins[d]) || 0).toLocaleString('en-US')} ${d}`)
    .join(', ');
}
function formatGp(v) {
  return (Number(v) || 0).toLocaleString('en-US', { maximumFractionDigits: 2 });
}
function pileText(pi) {
  const pile = piles.value[pi];
  const lines = [`Share ${pi + 1} — ${formatGp(pile.valueGp)} gp`];
  const c = coinText(pile.coins);
  if (c) lines.push(`Coins: ${c}`);
  if (pile.items.length) {
    lines.push('Items: ' + pile.items.map((i) => (i.quantity > 1 ? `${i.name} ×${i.quantity}` : i.name)).join(', '));
  }
  return lines.join('\n');
}
async function copyPile(pi) {
  const text = pileText(pi);
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    // Clipboard blocked (e.g. insecure context) — fall back to a temp textarea.
    const ta = document.createElement('textarea');
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); } catch { /* give up quietly */ }
    ta.remove();
  }
  copiedIndex.value = pi;
  announceMsg(`Share ${pi + 1} copied to the clipboard.`);
  setTimeout(() => { if (copiedIndex.value === pi) copiedIndex.value = -1; }, 1400);
}

// --- printable breakdown of every share ---
const esc = (s) =>
  String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

function buildPrintHtml() {
  const shares = piles.value
    .map((pile, pi) => {
      const groups = groupByType(pile.items)
        .map(
          (g) =>
            `<div class="grp"><div class="grp-label" style="background:${g.bg};color:${g.text}">${esc(g.label)}</div><ul>` +
            g.items
              .map(
                (it) =>
                  `<li>${esc(it.name)}${it.quantity > 1 ? ` &times;${it.quantity}` : ''}` +
                  `${it.valueGp > 0 ? ` <span class="v">${formatGp(it.valueGp * it.quantity)} gp</span>` : ''}</li>`,
              )
              .join('') +
            '</ul></div>',
        )
        .join('');
      const iv = itemValueOf(pile);
      const treas = iv > 0
        ? `<div class="treas">${rebalanceEnabled.value ? 'Item value: ~' : 'Treasure value: '}${formatGp(iv)} gp</div>`
        : '';
      return (
        `<section class="share"><h2>Share ${pi + 1}<span class="tot">${rebalanceEnabled.value ? '~' : ''}${formatGp(pile.valueGp)} gp</span></h2>` +
        `<div class="coins">Coins: ${esc(coinText(pile.coins) || 'none')}</div>` +
        `${groups || '<p class="none">— no items —</p>'}${treas}</section>`
      );
    })
    .join('');
  const leftoverHtml =
    leftover.value.valueGp > 0
      ? `<p class="leftover">Leftover (undividable): ${esc(coinText(leftover.value.coins))}</p>`
      : '';
  return `<!doctype html><html><head><meta charset="utf-8"><title>Loot Split</title><style>
    body{font-family:'Source Serif 4',Georgia,serif;color:#222;margin:24px;}
    h1{font-size:20px;margin:0 0 12px;border-bottom:1px solid #999;padding-bottom:6px;}
    .shares{display:grid;grid-template-columns:repeat(2,1fr);gap:14px;}
    .share{border:1px solid #ccc;border-radius:4px;padding:9px 12px;break-inside:avoid;}
    .share h2{margin:0 0 4px;font-size:15px;display:flex;justify-content:space-between;align-items:baseline;}
    .share .tot{color:#8a6a12;font-weight:700;}
    .coins{font-size:12px;color:#555;margin-bottom:6px;}
    .grp{margin-bottom:5px;}
    .grp-label{display:inline-block;padding:1px 6px;border-radius:3px;font-size:9px;text-transform:uppercase;letter-spacing:0.06em;font-weight:700;-webkit-print-color-adjust:exact;print-color-adjust:exact;}
    .grp ul{margin:1px 0 0;padding-left:16px;font-size:12.5px;}
    .grp .v{color:#8a6a12;}
    .none{font-style:italic;color:#999;font-size:12px;margin:2px 0;}
    .treas{margin-top:6px;padding-top:4px;border-top:1px solid #eee;font-size:12px;}
    .leftover{margin-top:12px;font-style:italic;color:#a03333;}
    .attrib{margin-top:16px;font-size:10px;color:#999;}
    @page{margin:1.4cm;}
  </style></head><body>
    <h1>Loot Split &mdash; ${piles.value.length} shares</h1>
    <div class="shares">${shares}</div>${leftoverHtml}
    <p class="attrib">Divided with the RPG Companion. Game content uses SRD 5.1, licensed under CC-BY-4.0.</p>
  </body></html>`;
}

function printAllShares() {
  const iframe = document.createElement('iframe');
  Object.assign(iframe.style, { position: 'fixed', right: '0', bottom: '0', width: '0', height: '0', border: '0' });
  document.body.appendChild(iframe);
  const doc = iframe.contentWindow.document;
  doc.open();
  doc.write(buildPrintHtml());
  doc.close();
  iframe.contentWindow.focus();
  iframe.contentWindow.print();
  setTimeout(() => iframe.remove(), 1000);
}
</script>

<style scoped>
.ls {
  margin-top: 1.4rem;
  padding-top: 1.2rem;
  border-top: 0.5px solid var(--par-color-border-strong, #c9b99a);
}
.ls__bar {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 0.6rem;
}
.ls__shares { display: inline-flex; align-items: center; gap: 0.5rem; }
.ls__shares-label {
  font-size: 1.1rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--par-color-text-secondary, #555);
}
.ls__step {
  width: 2.6rem;
  height: 2.6rem;
  border: 0.5px solid var(--par-color-border-strong, #c9b99a);
  border-radius: var(--par-radius-sm, 3px);
  background: var(--par-color-surface, #fbf7f0);
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--par-color-text-secondary, #555);
  cursor: pointer;
}
.ls__step:disabled { color: var(--par-color-text-disabled, #ccc); cursor: not-allowed; }
.ls__shares-n { min-width: 1.6rem; text-align: center; font-size: 1.6rem; font-weight: 700; }
.ls__redeal {
  min-height: 2.8rem;
  padding: 0 1rem;
  border: 0.5px solid var(--par-color-border-strong, #cbb8a0);
  border-radius: var(--par-radius-sm, 3px);
  background: transparent;
  font-family: inherit;
  font-size: 1.2rem;
  color: var(--par-color-text-secondary, #555);
  cursor: pointer;
}
.ls__redeal:hover { background: var(--par-color-callout-bg, #f3ebda); color: var(--par-color-text, #222); }
.ls__rebalance {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-family: var(--par-font-serif, 'Source Serif 4', Georgia, serif);
  font-size: 1.3rem;
  color: var(--par-color-text-secondary, #555);
  cursor: pointer;
}
.ls__rebalance input { width: 1.5rem; height: 1.5rem; accent-color: var(--color-action-rest, #365a85); cursor: pointer; }
.ls__leftover {
  margin-left: auto;
  font-size: 1.2rem;
  font-style: italic;
  color: var(--par-color-destructive, #a03333);
}
.ls__caveat {
  margin: 0 0 0.6rem;
  font-family: var(--par-font-serif, 'Source Serif 4', Georgia, serif);
  font-size: 1.1rem;
  font-style: italic;
  line-height: 1.45;
  color: var(--par-color-text-muted, #6b6b6b);
}
.ls__hint {
  margin: 0 0 1rem;
  font-family: var(--par-font-serif, 'Source Serif 4', Georgia, serif);
  font-size: 1.2rem;
  font-style: italic;
  line-height: 1.45;
  color: var(--par-color-text-muted, #6b6b6b);
}

.ls__piles {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
  gap: 1rem;
}
.ls__pile {
  display: flex;
  flex-direction: column;
  border: 0.5px solid var(--par-color-border-strong, #c9b99a);
  border-radius: var(--par-radius-md, 4px);
  background: var(--par-color-surface, #fbf7f0);
  padding: 0.8rem 0.9rem 0.9rem;
}
.ls__pile--drop { border-color: var(--color-action-rest, #365a85); box-shadow: 0 0 0 2px rgba(54, 90, 133, 0.25); }
.ls__pile--claimed { border-color: #8aa06a; background: rgba(138, 160, 106, 0.1); }
.ls__pile-head {
  margin-bottom: 0.55rem;
}
.ls__pile-name {
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--color-action-hover, #2a4d70);
}
.ls__group { margin-bottom: 0.5rem; }
.ls__group-label {
  display: inline-block;
  padding: 0.1rem 0.55rem;
  border-radius: 3px;
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}
.ls__items { list-style: none; margin: 0.1rem 0 0; padding: 0; }
.ls__item {
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.3rem 0.2rem;
  border-bottom: 0.5px solid var(--par-color-border, #e8e2d4);
  border-radius: 3px;
  font-family: var(--par-font-serif, 'Source Serif 4', Georgia, serif);
  font-size: 1.25rem;
  cursor: pointer;
}
.ls__item:hover { background: var(--par-color-callout-bg, #f3ebda); }
.ls__item--open { background: var(--par-color-callout-bg, #f3ebda); }
.ls__item:focus-visible {
  outline: 2px solid var(--color-action-rest, #365a85);
  outline-offset: -2px;
}
/* Visually-hidden live region — announced by screen readers, invisible on screen. */
.ls__sr {
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
.ls__item-grip { flex: none; color: var(--par-color-text-muted, #b6ab97); cursor: grab; }
/* One line by default (badges stay aligned); the full name wraps only when the
   row is clicked open. */
.ls__item-name {
  flex: 1;
  min-width: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.ls__item--open .ls__item-name {
  white-space: normal;
  overflow: visible;
  overflow-wrap: anywhere;
}
.ls__menu {
  position: absolute;
  top: 100%;
  right: 0;
  z-index: 5;
  display: flex;
  flex-direction: column;
  min-width: 12rem;
  margin-top: 2px;
  padding: 0.4rem;
  background: var(--par-color-surface-card, #fefbf4);
  border: 0.5px solid var(--par-color-border-strong, #c9b99a);
  border-radius: var(--par-radius-md, 4px);
  box-shadow: 0 6px 18px rgba(20, 30, 50, 0.18);
}
.ls__menu-label {
  padding: 0.2rem 0.5rem;
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--par-color-text-muted, #6b6b6b);
}
.ls__menu-opt {
  padding: 0.45rem 0.6rem;
  border: none;
  border-radius: 3px;
  background: transparent;
  text-align: left;
  font-family: inherit;
  font-size: 1.25rem;
  color: var(--par-color-text, #222);
  cursor: pointer;
}
.ls__menu-opt:hover {
  background: var(--color-action-rest, #365a85);
  color: var(--color-action-text, #fbf7f0);
}
/* Receipt-style footer: quiet subtotal rows, then a weightier burgundy grand total. */
.ls__totals {
  border-top: 0.5px solid var(--par-color-border, #e8e2d4);
  margin-top: 0.75rem;
  padding-top: 0.5rem;
}
.ls__subtotal {
  display: flex;
  justify-content: space-between;
  gap: 0.9rem;
  padding: 0.2rem 0;
  font-family: var(--par-font-serif, 'Source Serif 4', Georgia, serif);
  font-size: 1.3rem;
  color: var(--par-color-text, #222);
}
.ls__subtotal-label { flex: none; color: var(--par-color-text-muted, #6b6b6b); }
.ls__subtotal-value { font-weight: 600; text-align: right; }
.ls__grand-total {
  display: flex;
  justify-content: space-between;
  gap: 0.9rem;
  margin-top: 0.4rem;
  padding: 0.4rem 0 0;
  border-top: 0.5px solid rgba(201, 185, 154, 0.5);
  font-family: var(--par-font-serif, 'Source Serif 4', Georgia, serif);
  font-size: 1.6rem;
  font-weight: 600;
  color: #7a1f1f;
}
.ls__pile-empty {
  margin: 0.75rem 0 0.6rem;
  padding-top: 0.5rem;
  border-top: 0.5px solid var(--par-color-border, #e8e2d4);
  font-size: 1.15rem;
  font-style: italic;
  color: var(--par-color-text-muted, #9a9082);
}
.ls__pile-actions { margin-top: auto; display: flex; gap: 0.5rem; padding-top: 0.8rem; }
.ls__copy,
.ls__claim,
.ls__claimed {
  flex: 1;
  min-height: 3rem;
  border-radius: var(--par-radius-sm, 3px);
  font-family: inherit;
  font-size: 1.15rem;
  font-weight: 500;
  cursor: pointer;
}
.ls__copy {
  border: 0.5px solid var(--par-color-border-strong, #cbb8a0);
  background: transparent;
  color: var(--par-color-text-secondary, #555);
}
.ls__copy:hover { background: var(--par-color-callout-bg, #f3ebda); color: var(--par-color-text, #222); }
.ls__claim {
  border: 0.5px solid var(--color-action-rest, #365a85);
  background: transparent;
  color: var(--color-action-rest, #365a85);
  font-weight: 600;
}
.ls__claim:hover:not(:disabled) { background: var(--color-action-rest, #365a85); color: var(--color-action-text, #fbf7f0); }
.ls__claim:disabled { border-color: var(--par-color-border, #e4d8c4); color: var(--par-color-text-muted, #9a9082); cursor: not-allowed; }
.ls__claimed {
  border: 0.5px solid #8aa06a;
  background: rgba(138, 160, 106, 0.15);
  color: #4d6a3c;
  cursor: default;
}
</style>
