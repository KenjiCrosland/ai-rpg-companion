# Item Generator Analytics — Phase 0 Findings

Read-only investigation against the real codebase. **No code changed.** This
corrects the brief's reconstructed guesses and produces the hand-off artifacts
(GA redaction keys, custom-dimension names, Patreon `location` strings). Awaiting
review before Phase 1.

Branch: `item-generator-analytics`.

---

## 0a. Prior-state check

- **`src/util/analytics.mjs` does NOT exist.** The March three-event design
  (`generate` / `tool_switch` / `patreon_click`) was never shipped. We build the
  wrapper fresh — nothing to extend or de-duplicate.
- **No `trackEvent` calls anywhere.**
- **The only existing `gtag` usage is Universal Analytics**, not GA4:
  `src/App.vue` (~lines 209–247) fires `gtag('config', 'UA-11925218-1', { page_path })`
  per `data-page` on mount. `UA-…` is a (sunset) Universal Analytics property.
  - ⚠️ **Confirm before Phase 1:** the brief assumes a **GA4** base tag is already
    loaded in WordPress (the one that makes `gtag('event', …)` land in GA4
    DebugView). The in-app calls above are legacy UA `config` calls and are
    *separate*. `window.gtag?.('event', …)` will dispatch to whatever gtag
    configs are live; we need the GA4 (`G-…`) config present in prod for events
    to arrive. **This is an owner/WordPress check, not a code change here.**

---

## 0b. Item generator field audit — **brief's guess was substantially wrong**

The generation form (`ItemGenerator.vue` lines ~66–88) has exactly **five**
user-facing fields (plus a dev-only test control). All dropdowns are **pure
native `<ParSelect>`** — no hybrid/custom-typed entry anywhere, so the brief's
"hybrid → `custom` token" handling is **not needed**.

| Field | Model | Control | Class | Log as |
|---|---|---|---|---|
| Item name | `itemName` | `ParInput` | **free-text** | `used_name` (boolean) |
| Rarity | `rarity` | `ParSelect` (`rarityOptions`, placeholder "Any rarity") | **closed-vocab** | `used_rarity` (boolean — **value NOT logged**, per owner: noise) |
| Type | `itemType` | `ParSelect` (`itemTypeOptions`, placeholder "Random") | **closed-vocab** | `used_item_type` (boolean — value NOT logged) |
| Origin | `itemOrigin` | `ParSelect` (`originOptions`, placeholder "Random") | **closed-vocab** | `used_origin` (boolean — value NOT logged) |
| Lore | `itemLore` | `ParTextarea` | **free-text** | `used_lore` (boolean) |
| ~~Register override~~ | `testRegisterOverride` | `<select v-if="isDev">` | **dev-only** | **do not log** |

**Corrections vs. the brief's reconstructed guess:**
- ❌ No **`concept`** field exists. The two free-text fields are **name** and **lore**.
- ❌ No **`attunement`** toggle in the generation form (attunement only appears in
  the *edit* form, `editForm.requires_attunement`, which is post-generation).
- ❌ **`include_lore` is not a boolean** — lore is a free-text textarea, logged as
  `used_lore` (filled vs blank), never its contents.
- ➕ There **is** an **`origin`** closed-vocab dropdown the brief omitted — safe to
  log the value.

**Corrected `generate` payload** — every field is a used/unused boolean; the
closed-vocab *values* (rarity/type/origin) are intentionally **not** logged
(owner: the actual property is noise — we only want whether it was specified):
```js
trackEvent('generate', {
  tool: 'item-generator',
  used_name:      Boolean(itemName?.trim()),
  used_lore:      Boolean(itemLore?.trim()),
  used_rarity:    Boolean(rarity?.trim()),     // usage only — value not logged
  used_item_type: Boolean(itemType?.trim()),
  used_origin:    Boolean(itemOrigin?.trim()),
});
```
Plant in `generateMagicItem` (form `@submit.prevent`, line ~65). Derive via a pure
helper `buildItemGenerateParams(formState)` for return-value testing.
`tool_open { tool: 'item-generator' }` on mount for the generate-rate denominator.

---

## 0c. Tab audit

`const itemTabs` (line 443), bound to `<ParTabs v-model:active-id="activeTabId">`:

```js
[
  { id: 'item-details', label: 'Item Details' },
  { id: 'lore-builder', label: 'Lore Builder' },
  { id: 'quest-hooks',  label: 'Quest Hooks' },
]
```

**`tab_view` DROPPED (owner: tab-switching is noise).** What matters is *using*
the features inside those tabs — which are also the premium-gated ones, so this
ties straight to conversion. Instead, instrument the in-tab **generation** as
`item_action`:

| Tab | Action value | Plant point |
|---|---|---|
| Quest Hooks | `quest_hook_generate` | `QuestHookTab.vue` `generateQuestHook` — after the hook is pushed (success) |
| Lore Builder | `lore_generate` | `LoreBuilderTab.vue` `generateEvent` — after `pendingEvent` is set (generation succeeded) |
| Lore Builder | `lore_summary` | `LoreBuilderTab.vue` `generateSummary` — after the item lore is updated |

These reuse the existing `item_action` event + `action` dimension (no new
schema). Fire on **success only**.

---

## 0d. Cross-tool links within the item generator

Three "Related …" sub-components, each fires JS via `navigateToTool(...)` — **not**
plain `<a>` links, so `cross_tool_start` can fire synchronously **before**
navigation (no extra click-handler plumbing needed; just call `trackEvent` on the
line above each `navigateToTool`).

| Source component | Action | `to_tool` | Call |
|---|---|---|---|
| `RelatedNPCsSection.vue:161` | Create NPC | `npc-generator` | `navigateToTool('npc-generator', {fromType,fromId,entityName})` |
| `RelatedNPCsSection.vue:170` | View in NPC Generator | `npc-generator` | `navigateToTool('npc-generator', {npc})` |
| `RelatedDungeonsSection.vue:187,200,208` | Create / View dungeon | `dungeon-generator` | `navigateToTool('dungeon-generator', {…})` |
| `RelatedSettingsSection.vue:168` | Create setting | `setting-generator` | `navigateToTool('setting-generator', {fromType,fromId,entityName})` |
| `RelatedSettingsSection.vue:177` | View in setting | `setting-generator` | `navigateToTool('setting-generator', {setting})` |

`navigateToTool` (`src/util/navigation.mjs:19`) is synchronous (`window.location.href = …`
at the end). `cross_tool_start { from_tool: 'item-generator', to_tool }` goes
immediately before each call. Funnel closes on the destination's `generate` event
carrying `seeded: true, seed_source: 'item'` (Phase 2 instruments only that
provenance flag on npc/dungeon/setting `generate` calls).

---

## 0e. Patreon inventory (suite-wide)

**`PatreonCallout.vue` is the shared upsell** and the right single instrumentation
point. Its CTA is `<ParButton variant="luminous" tag="a" :href="patreonUrl">Support
on Patreon</ParButton>` — i.e. a **plain `<a>`** with **no JS handler today**. To
fire before navigation: add a `location` **prop** + a `@click` on the CTA that
calls `trackEvent('patreon_click', { location })`. Instrument once; every consumer
passes a `location`.

**Consumers (each needs a `location` string):**

| File | Proposed `location` | Notes |
|---|---|---|
| `item-generator/ItemGenerator.vue` | `item-footer` | footer-meta upsell |
| `npc-generator/NPCGenerator.vue` | `npc-sidebar` *(confirm placement)* | |
| `setting-generator/SettingGenerator.vue` | `setting-sidebar` *(confirm)* | |
| `encounter-generator/EncounterGenerator.vue` | `encounter-sidebar` *(confirm)* | |
| `statblock-generator/StatblockGenerator.vue` | `statblock-sidebar` *(confirm)* | |
| `location-generator/LocationGenerator.vue` | `location-sidebar` *(confirm)* | |
| `dungeon-generator/components/DungeonGenerator.vue` | `dungeon-main` *(confirm)* | |
| `dungeon-generator/components/NPCsTab.vue` | `dungeon-npcs-limit` | inline limit-reached context |
| `dungeon-generator/components/MonstersTab.vue` | `dungeon-monsters-limit` | inline limit-reached context |
| `components/LandingPage.vue` | `landing` | |
| `components/ToolSuiteShowcase.vue` | `showcase` | |
| `components/DataManagerModal.vue` | `data-manager` | backup/restore upsell |
| `components/GeneratorLayout.vue` | *(verify it actually renders one)* | appeared in grep — confirm in Phase 2 |

> Phase 2 should glance at each call site to finalize the `<context>` half of the
> string; the convention is `<tool>-<context>`. Several are "confirm" because the
> exact placement (sidebar vs inline vs limit-reached) wasn't read in Phase 0.

**Secondary Patreon links (decide whether to track):**
- The **"See all premium tiers …"** link inside `PatreonCallout`'s features slot
  (and the item generator's slot override) → `patreonTiersUrl`. Different
  destination (tier breakdown, not checkout). Suggest `patreon_tiers_click` or a
  `location`-tagged variant if we want it; otherwise leave untracked.
- **WordPress footer Patreon link** (in the PHP templates, *outside* the Vue app)
  — not reachable by the gtag wrapper without adding JS to the footer. **Out of
  scope** for this brief unless explicitly wanted.

Patreon URLs are centralized in `src/util/patreon-urls.mjs` (`patreonTiersUrl`;
`patreonLoginUrl` used by the item generator).

---

## 0f. Quota / gate detection points (suite-wide)

Central signed-counter store: `src/util/quota-storage.mjs`. **`DOMAINS`** (these
are the real `quota_type` values):

| Domain (`quota_type`) | Where the cap is detected → `quota_reached` plant point |
|---|---|
| `quest-hook` | `QuestHookTab.vue:305` — `if (count >= MAX_GENERATIONS)` inside `canGenerateQuestHook()` (cap = 5 / 24h) |
| `lore` | `LoreBuilderTab.vue` — parallel `canGenerate…` check (cap = 5 / 24h) |
| `cross-tool` | `can-generate-cross-tool.mjs:113` — `if (count >= MAX_GENERATIONS)`; consumed by `DungeonGenerator.vue` & `SettingGenerator.vue` (cap = 5 / 24h) |

`quota_reached` fires at the **cap-detection branch** (fires even if the user never
clicks the upsell, per brief). Payload:
```js
trackEvent('quota_reached', { tool: /* slug */, quota_type: 'quest-hook' | 'lore' | 'cross-tool' });
```
- For `quest-hook`/`lore`, `tool: 'item-generator'`.
- For `cross-tool`, `tool` = the tool where it triggers (`dungeon-generator` /
  `setting-generator`).

**Decision needed — incognito/private-mode block is a *separate* gate.** Each
checker also blocks when private browsing defeats the quota storage (e.g.
`QuestHookTab.vue:286`, `can-generate-cross-tool.mjs:85`) with its own message.
That's a different failure mode than "hit the daily cap." Options: (a) emit
`quota_reached` with `quota_type: '<domain>-incognito'`, (b) a separate
`gate_blocked { reason: 'incognito' }` event, or (c) don't track it. **Recommend
(a) or (c); flag for owner.**

---

## 0g. Tool switcher

Canonical navigation: **`src/data/tool-navigation.js:31` `export function navigate(slug)`**
— used by `ToolNavigation.vue` (imported as `navigateToTool`) and
`GeneratorLayout.vue`'s mobile bottom bar. Single choke-point; plant here:

```js
trackEvent('tool_switch', { from: getCurrentSlug(), to: slug });
```
`getCurrentSlug()` is already exported from the same file. Both values are tool
slugs (closed vocab). This captures arrivals into the item generator
(`to: 'item-generator'`) plus every other switch for free.

(`ToolNavigation.vue:26` has a thin local `navigate(slug)` wrapper — confirm in
Phase 2 whether it calls the data-layer one or duplicates it; instrument the
data-layer function regardless so the mobile bottom bar is covered too.)

---

## 0h. URL / PII enumeration (hand-off for GA admin)

**`document.title` is never written** anywhere in `src/` (grep clean) — no PII in
the page title. ✅

**The item generator writes no params to its *own* URL.** It writes cross-tool
handoff params (via the Related sections → `navigateToTool`) onto the
**destination** tool's `?query` in prod (`navigation.mjs:62–64`,
`new URLSearchParams(params)`). Param **keys** written across the cross-tool flows:

| Key | Value source | Class | GA action |
|---|---|---|---|
| `fromType` | literal `'item'` | functional, closed | keep; not PII |
| **`fromId`** | **`item.name`** (item's name — user- or AI-authored) | **functional + content** | **REDACT** |
| **`entityName`** | **`stub.name`** (an NPC/place name) | **functional + content** | **REDACT** |
| `npc` | `stub.npc_id` (e.g. `npc_…`) | functional id | keep; not PII |
| `dungeon` | `stub.dungeon_id` (`dng_…`) | functional id | keep; not PII |
| `setting` | `stub.setting_id` (`set_…`) | functional id | keep; not PII |

**→ GA4 Data Redaction key list (owner enters in Admin → Data Streams →
Configure tag settings → Redact data):**
```
fromId
entityName
```
These are the only content-bearing query keys; they reach GA via `page_location`.

**Fragment-migration evaluation (the brief's 0h note):** these params are **not
shareable item-state links** — they're **read-once internal handoffs**
(`getNavigationParams()` reads `window.location.search` on mount; in dev it uses
sessionStorage and deletes after read). Because nothing relies on them being a
shareable `?query`, moving them to the **URL fragment (`#…`)** is clean and keeps
the handoff working while keeping the content out of `page_location` (GA doesn't
record the fragment by default).
- **Change scope if we go this route:** `navigateToTool` (build `#` instead of
  `?`) **and** `getNavigationParams` (read `window.location.hash` instead of
  `.search`), both in `navigation.mjs`. Self-contained — the substrate funnels all
  cross-tool nav through these two functions.
- **Recommendation:** fragment migration is the cleaner permanent fix and avoids
  needing redaction for these keys at all; **redaction is the zero-risk fallback**
  if we'd rather not touch the nav substrate now. Either way, the redaction key
  list above is the safety net. *Owner's call.*

---

## Summary of corrections to the brief

1. **No `analytics.mjs` / no prior events** — build fresh (0a).
2. **Confirm GA4 (`G-…`) tag is live in prod**; the in-app `gtag` is legacy UA (0a).
3. **Every form field is a used/unused boolean** — `used_name`, `used_lore`,
   `used_rarity`, `used_item_type`, `used_origin`. No `concept`, no
   generation-form `attunement`. **Per owner: closed-vocab values are NOT
   logged** (rarity/type/origin are noise — usage only). `origin` was missing
   from the brief entirely (0b).
4. **No hybrid/custom-typed fields** — drop the `custom`-token handling (0b).
5. **Quota types are `quest-hook`, `lore`, `cross-tool`** (not generic) (0f).
6. **Redaction keys are exactly `fromId`, `entityName`**; title is clean; fragment
   migration is viable and recommended over redaction (0h).

## Resolved decisions (owner) — locked for Phase 1/2

- **A — SKIP.** Do **not** track the secondary "See all premium tiers" link
  (`patreonTiersUrl`). `patreon_click` stays a pure conversion signal (the
  "Support on Patreon" CTA only). (0e)
- **B — DO NOT CONFLATE.** The daily-cap gate and the incognito/private-mode
  block are separate signals.
  - `quota_reached { tool, quota_type }` fires **only** on actual daily-cap hits.
  - The incognito block fires a **distinct** event:
    `gate_blocked { tool, reason: 'incognito' }`. This keeps the cap-hit funnel
    clean and is extensible to other block reasons later. (Adds one event-scoped
    dimension, `reason`.) (0f)
- **C — FRAGMENT MIGRATION, behavior-preserving.** Move `fromId`/`entityName`
  (and the rest of the cross-tool handoff params) from `?query` to `#fragment`.
  **Hard constraint: no functional change** — the handoff must behave identically,
  only the transport changes (`?`→`#`). Scope = two functions in
  `navigation.mjs`: `navigateToTool` (build `#…`) and `getNavigationParams`
  (read `window.location.hash` instead of `.search`). **Phase 2 must verify** the
  read-once handoff, dev sessionStorage path (untouched), reload/back-button
  behavior, and that nothing else reads `window.location.search` for these keys.
  GA redaction of `fromId`/`entityName` stays the zero-risk fallback if any edge
  case bites. (0h)
- **D — FULL FUNNEL: add `premium_unlocked`.** See **§0i** below for the
  mechanism (free→premium transition detection — no WordPress change). (per brief)

## 0i. Premium-unlocked detection (added per decision D)

**Architecture:** premium is **server-determined**, not an in-app OAuth callback.
- `wordpress/kenji-premium-gate.php` → `kenji_is_premium()` reads the Patreon
  pledge (`patreon_latest_patron_info` user meta) and renders
  `<div id="app" data-premium="true|false">`. The app reads it via
  `getEffectivePremium({ withPremium, el })` (`src/util/dev-premium-controls.mjs`),
  called in `base.js` `mountApp` (`src/entries/base.js:68`).
- The CTA (`patreonUrl` = each tool's `patreonLoginUrl` computed, e.g.
  `ItemGenerator.vue:428`) → `https://cros.land/patreon-flow/?patreon-login=yes&patreon-final-redirect=<currentPage>`.
  After OAuth the user is redirected **back to the same tool page**, now with
  `data-premium="true"`. **The return URL carries no success param** — so there's
  nothing to detect a callback on.

**Therefore `premium_unlocked` = a free→premium transition detector**, planted in
`base.js mountApp` (runs on every prod tool page, already has `isPremium`):
```js
// pseudo — in mountApp, after computing isPremium
const KEY = 'seen-premium-state';
const last = localStorage.getItem(KEY);           // 'free' | 'premium' | null
const now  = isPremium ? 'premium' : 'free';
if (now === 'premium' && last === 'free') {
  trackEvent('premium_unlocked', {});             // fires once per device on the flip
}
localStorage.setItem(KEY, now);
```
**Properties / caveats:**
- Fires **once per device** on the first premium load after being free — which is
  the conversion moment, regardless of how they returned.
- Not strictly tied to the OAuth round-trip; it also catches "subscribed on
  another device, came back premium." That's acceptable (still a real unlock); the
  `patreon_click → premium_unlocked` funnel is correlated at the GA4 device
  (pseudo-id) level.
- **Prod-only** — `base.js` doesn't run in dev (dev mounts via `App.vue`), and
  `window.gtag?.()` no-ops there anyway. Premium is a prod concept regardless.
- No WordPress change required. (If we later want to attribute the *OAuth-return*
  specifically, the patreon-flow page could append a `?patreon=success` to the
  final redirect — a WordPress change, deferred unless wanted.)

## GA4 custom dimensions to register (EVENT-SCOPED) — for Phase 3

`tool`, `used_name`, `used_lore`, `used_rarity`, `used_item_type`, `used_origin`,
`action`, `from_tool`, `to_tool`, `seeded`, `seed_source`, `location`,
`quota_type`, `reason`.
*(All form fields are usage booleans; closed-vocab values intentionally not
logged. `tab` dropped — `tab_view` was cut as noise (owner). `reason` for
`gate_blocked`. `premium_unlocked` carries no params.)*

---

## IMPLEMENTATION LOG (Phases 1 & 2 — shipped)

**Wrapper:** `src/util/analytics.mjs` (`trackEvent`, no-ops without gtag).

**Phase 1 — item-generator usability:**
- `tool_open { tool }` — `ItemGenerator.vue` onMounted.
- `generate` — content-free `buildItemGenerateParams(...)` (own file + spec).
- `item_action { action }` — `copy`/`edit`/`save`/`regenerate` (ItemGenerator) +
  `quest_hook_generate` (QuestHookTab), `lore_generate`/`lore_summary`
  (LoreBuilderTab). `tab_view` was **cut** (owner: noise).

**Phase 2 — cross-tool + suite-wide conversion:**
- `tool_switch { from, to }` — `data/tool-navigation.js` `navigate()`.
- `premium_unlocked` — `entries/base.js` mountApp (free→premium flip, reads raw
  `el.dataset.premium`).
- `quota_reached { tool, quota_type }` — QuestHookTab (`quest-hook`),
  LoreBuilderTab (`lore`), `can-generate-cross-tool.mjs` (`cross-tool`, tool =
  `${destType}-generator`).
- `gate_blocked { tool, reason: 'incognito' }` — same three checkers (decision B,
  separate from the cap).
- `patreon_click { location }` — instrumented in `PatreonCallout.vue` (new
  `location` prop), passed from **14** call sites + 2 standalone CTAs. **Final
  location strings:** `item-footer`, `npc-footer`, `dungeon-footer`,
  `dungeon-npc-statblock-limit`, `dungeon-monster-statblock-limit`,
  `encounter-footer`, `setting-footer`, `statblock-footer`, `showcase`,
  `data-manager`, `landing`. (Tool-level, not split form/result — easy to refine.
  GeneratorLayout footer nav link intentionally skipped.)
- `cross_tool_start { from_tool: 'item-generator', to_tool }` — the 3 Related
  sections' create actions (npc/dungeon×2/setting).
- Seeded provenance: `generate { tool, seeded: true, seed_source }` at each
  destination's seed-finalize — `NPCGenerator.finalizePendingSeed`,
  `SettingGenerator.finalizePendingSeed`, dungeon `overview-store`.
- **Fragment migration (decision C):** `navigateToTool` now writes handoff params
  to `#fragment` (not `?query`); `getNavigationParams` reads hash with a
  ?query fallback. EncounterGenerator's deep-link cleanup updated to clear the
  hash too. **Net: `fromId`/`entityName` no longer reach GA `page_location`** —
  GA redaction of those keys becomes optional (the zero-risk fallback).

**Tests:** `build-generate-params.spec.js` (5, the pure helper). 1255 tests green
across all touched tools — no regressions. Remaining verification is manual
(console-stub locally / GA4 DebugView in prod, once the `G-…` tag is confirmed).

**STILL OWNER-SIDE (not code):** confirm GA4 tag live in WordPress (0a); register
the dimensions above (Phase 3); optional redaction of `fromId`/`entityName`
(now belt-and-suspenders given the fragment migration).
