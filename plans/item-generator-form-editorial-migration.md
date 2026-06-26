# Magic Item Generator — Form Editorial Migration

**Status:** Planned — not yet ready for implementation. Captures the design decisions and implementation approach for migrating the magic item generator's *generation form* to cros.land's editorial parchment system in the "magic UI" register. Pick up when scheduled.

## Trigger

Read this plan before doing any of:
- Editorial/visual migration of the magic item generator's input form.
- Building shared form-input primitives (the new default `ParInput`/`ParSelect`/`ParTextarea` + `ParField`) for any generator.
- Renaming the existing `ParInput`/`ParSelect`/`ParTextarea` parchment primitives to `ParCard*`.
- Editorial migration of any other generator form (NPC, location, encounter, setting, dungeon, statblock, bookshelf, lore/timeline) — Step 2's primitives are the shared foundation for all of them.

## Codebase reality check (verified 2026-06-14)

Facts the plan body depends on, confirmed against the tree so a future session doesn't re-derive them:

- **Parchment primitives live in `src/parchment/`**, barrel-exported from **`src/parchment/index.mjs`** (note `.mjs`, not `.js`). Existing components: `ParCardButton`, `ParActionButton`, `ParAddNewButton`, `ParCallout`, `ParInput`, `ParTextarea`, `ParSelect`, `ParCheckbox`, `ParTooltip`, `ParTabToggle`, `ParModal`. Tokens load once via `src/entries/base.js`.
- **The current generation form uses Cedar (`cdr-input`) + a raw `<select>`**, not parchment and not generic styled fields. See [`ItemGenerator.vue:44`](../src/tools/item-generator/ItemGenerator.vue#L44) (`<cdr-input>`) and [`:67`](../src/tools/item-generator/ItemGenerator.vue#L67) (raw `<select>`). Migration means **removing the Cedar component**, not just restyling an existing parchment field. The marketing H1 is at [`:35`](../src/tools/item-generator/ItemGenerator.vue#L35) ("Craft Unique D&D 5e Magic Items in Seconds").
- **`ParInput`/`ParSelect`/`ParTextarea` ARE already used** — but in the item generator's *card edit form* ([`ItemGenerator.vue:214+`](../src/tools/item-generator/ItemGenerator.vue#L214)) and as general-purpose inputs across the dungeon, encounter, and statblock tools. They are **not** card-edit-only. See the caveat under Step 1.
- **No `ParField` exists today.** The new form field-wrapper `ParField` (Step 2) is net-new. (Card inputs don't use a wrapper — they carry a built-in `label` prop, e.g. `<ParInput label="Name">`.)
- `itemName` reactive ref is at [`ItemGenerator.vue:386`](../src/tools/item-generator/ItemGenerator.vue#L386); the "no input → fully random" path is gated at [`:806`](../src/tools/item-generator/ItemGenerator.vue#L806). The random affordance (Step 3) should invoke whatever generation path runs when all of `itemName`/`itemLore`/`origin` are empty.

## Visual reference — "Option B: Tinted Fields, Lapis Ink"

The agreed visual target (mockup reviewed 2026-06-14). Annotation accompanying the mockup:

> *Same boxed structure but field interiors use the warm tan tint instead of cream. Fields look distinctly like "containers" against the lighter cream surface. Slightly more workshop, less reading-room.*

What the mockup confirms:
- Boxed cream card (`.form-card`) with rounded corners and a 0.5px strong border, on the lighter cream page surface.
- Centered H2 **"Generate a magic item"** in dark-lapis Source Serif — the strongest element on the surface.
- Italic centered subhead beneath it.
- Uppercase, letter-spaced **dark-lapis labels** ("ITEM NAME", "RARITY", "TYPE", "NOTES FOR THE SCRIBE — optional").
- **Warm-tan tinted field interiors** (the `rgba(243, 235, 218, 0.5)` tint) reading as distinct containers against the cream card — this is the defining choice of Option B vs. a cream-on-cream variant.
- Rarity/Type in a two-column grid; "Any rarity" / "Random" placeholder defaults; custom caret on selects.
- Notes textarea with the "— optional" italic-gray marker.
- Full-width lifted-lapis **"Generate magic item"** button (sentence case).

> **Subhead — resolved.** The subhead is the interactive *"surprise me with something random"* affordance (Step 3), **not** the mockup's descriptive tagline. Drop "Mechanics, lore, and quest hooks for your campaign." See Decisions §1 and §4.

## Decisions (resolved 2026-06-14 with Kenji)

All open questions from the initial draft are resolved. Recorded here so implementation doesn't reopen them.

1. **Subhead = the "surprise me" affordance.** The subhead IS the interactive random-generation trigger, not a descriptive tagline. Drop the mockup's "Mechanics, lore, and quest hooks…" tagline.
2. **Lapis is the universal form register.** The new `ParInput`/`ParSelect`/`ParTextarea`/`ParField` hardcode dark-lapis ink (`--color-action-hover` for labels/structure, `--color-action-rest` for focus). All 9 generator forms adopt lapis; no per-tool accent — lapis is the app's form accent (the submit button already is).
3. **Keep the Origin helper text, reworded in the editorial/magic voice.** Don't drop it — it explains real behavior and ties into the random affordance. New copy (draft, confirm wording): *"Colors the item's theme, look, and name — chosen for you when you leave the name and notes blank."* This requires a **helper/hint affordance on `ParField`** (see Step 2).
4. **Drop the existing `value-prop` line.** The new subhead replaces it. **Cross-tool note:** the random-generation affordance is a pattern *all 9 generators* adopt — like the form primitives, it's not item-only. Each tool's editorial migration adds its own "surprise me" trigger.
5. **Shrink the lore/Notes textarea.** Go with the shorter `min-height: 80px` (~3 rows), not the current `:rows="7"`.
6. **Leave the dev `testRegisterOverride` fieldset untouched.** Yoruba is not in use and is out of scope for this changeset — don't add to or remove it here.
7. **Overwrite the existing `.form-card` rule.** It's a component-scoped white SaaS card ([`ItemGenerator.vue:2452`](../src/tools/item-generator/ItemGenerator.vue#L2452): `#fff`, gray border, drop shadow). Same element, restyled to parchment — overwrite the local rule; no new class. Note there's a second `.form-card` rule (~`:2829`, likely a media query) and `.item-form` (~`:2575`) that also need updating.
8. **Form is identical for free vs. premium.** Verified: `premium` only drives the Free/Premium pill and footer callout (and the Lore/Quest tabs, not the form). No form-level differences to handle.
9. **Lore placeholder copy** — "A fallen empire, a coastal cult, a lost language…" is fine for now.

**Naming convention** — unprefixed `Par*` = form default, `ParCard*` = card-edit variant (see Architectural framing). **Step 0** (lands first, own commit) renames `ParActionButton` → `ParButton` for full symmetry.

## Why this work exists

The magic item generator's form is the most-trafficked surface on cros.land that hasn't received editorial migration. It sits on cream surface but uses Cedar-styled fields, sans-serif labels, and copy that markets the tool ("Craft Unique D&D 5e Magic Items in Seconds") rather than addressing the user.

This migration brings the form into cros.land's manuscript palette as the first surface using the **"magic UI" register** — same parchment system as the magic item card, but using **dark lapis** as the structural ink color (vs. burgundy on cards). The form expresses identity through typography, structural treatment, and copy voice rather than ornament.

It also adds a **"surprise me with something random"** affordance inline in the subhead, addressing a real product gap: users don't know that leaving fields blank invokes the prompt seeds, which often produce the best items.

## Architectural framing

cros.land's parchment system has two distinct input contexts:

- **Form-family inputs (the default, to be built)** — for tool input forms across all generators. Keep the canonical, unprefixed names: `ParInput`, `ParSelect`, `ParTextarea`, plus the new `ParField` wrapper. This is the common case (all 9 generator forms), so it gets the unmarked name. These inputs carry **no built-in label** — they pair with `ParField`. Built as part of this plan.
- **Card-family inputs (existing, the specialized variant)** — for inline editing within rendered card content. Currently named `ParInput`, `ParSelect`, `ParTextarea`; to be **renamed** `ParCardInput`, `ParCardSelect`, `ParCardTextarea` as Step 1 (freeing the canonical names for the form family). These carry a **built-in `label` prop** (e.g. `<ParCardInput label="Name">`).

The two families serve genuinely different purposes and visual treatments. Do **not** unify them into one family.

**Naming convention:** unprefixed `Par*` = the default (form / page context); `ParCard*` = the specialized variant used directly inside rendered card content. The existing `ParActionButton` / `ParCardButton` pair doesn't yet follow this (no unprefixed default), but the target is to make it consistent: `ParActionButton` → `ParButton` as a separate standalone commit that lands first (see Step 0). Until then, the convention holds for inputs and is the direction for everything.

The form-family primitives, once built, propagate to all 9 generator forms (NPC, location, encounter, setting, dungeon, statblock, bookshelf, lore/timeline) as each tool's editorial migration happens. The magic item generator is the first migration; subsequent migrations reuse the same primitives.

## Step 0: Rename `ParActionButton` → `ParButton` (own commit, lands first)

**Do this before Step 1, as its own standalone commit.** It completes the naming convention (unprefixed `Par*` = default; `ParCard*` = card variant) and makes the button pair symmetric with the input families: `ParButton` (default form/action button) + `ParCardButton` (card button).

Why first: it's the lowest-risk change in the effort (pure mechanical rename, no logic), and it's the same chore as Step 1's input rename — doing buttons → then inputs lands the whole convention as a clean sweep *before* any new component (Step 2) or form work (Step 3). Everything downstream is then written against the final names; you never write `ParActionButton` in new Step 3 code only to rename it later.

Purely a mechanical rename, easy to review and revert:
- Rename `src/parchment/ParActionButton.vue` → `ParButton.vue` (and `ParActionButton.spec.js` → `ParButton.spec.js`).
- Update the barrel export in `src/parchment/index.mjs`.
- Update **~46 usage sites** across the repo (component imports + template tags).
- Rename SCSS classes `par-action*` → `par-button*` (e.g. `par-action--${size}`, `par-action--${variant}`) inside the component.
- No visual or behavioral change; verify the spec passes and a few button surfaces render unchanged.

Do **not** bundle this with the item-generator migration — it touches far more files and should land cleanly on its own.

**Estimated time:** 30–45 minutes.

## Step 1: Rename existing card-family components

Before any new work, rename to clarify the dual-family architecture:

- `ParInput` → `ParCardInput`
- `ParSelect` → `ParCardSelect`
- `ParTextarea` → `ParCardTextarea`
- (`ParField` does not exist — skip.)

This **frees the canonical `ParInput`/`ParSelect`/`ParTextarea` names** so Step 2 can build the new form family under them. The rename must complete (and the old files be renamed on disk) before Step 2 creates the new components, or the names collide.

Update SCSS class names accordingly: `par-input` → `par-card-input`, etc. Find-and-replace all imports and template usages across the codebase. Update the barrel exports in **`src/parchment/index.mjs`**.

Test all inline card editing surfaces to verify rendering/behavior unchanged. Purely architectural rename, no visual/behavioral change.

> **Caveat (from codebase check):** `ParInput`/`ParSelect`/`ParTextarea` are currently used not only for inline card editing but as general-purpose inputs in the dungeon, encounter, and statblock tools. The mechanical rename to `ParCard*` is safe, but it will *mislabel* those form-context usages until those tools migrate to the new form-family `Par*` inputs. Accept this as a known transitional state — don't try to sort form-vs-card usages during the rename; that happens per-tool as each form migrates.

**Estimated time:** 30–45 minutes.

## Step 2: Build form-family primitives

Build `ParField`, `ParInput`, `ParSelect`, `ParTextarea` as parchment primitives, exported from `src/parchment/index.mjs`. Used by Step 3 and by subsequent generator migrations.

### ParField

Wraps a label and input element. Handles label styling, optional indicator, label-input spacing.

Props:
- `label` — required string, the field label
- `optional` — boolean, default false. When true, appends a small italic gray "— optional" after the label
- `hint` — optional string, helper text rendered below the input in the editorial italic-gray treatment (used for the Origin field — Decisions §3). Prefer the prop; expose a `#hint` slot too for rich content.

Slot:
- `default` — the input element (`ParInput`, `ParSelect`, `ParTextarea`, etc.)
- `hint` — optional, overrides the `hint` prop for rich helper content

```scss
.par-field {
  margin: 0 0 1.25rem;
}

.par-field__label {
  display: block;
  font-family: var(--par-font-serif);
  font-size: 11px;
  font-weight: 500;
  color: var(--color-action-hover);  /* dark lapis */
  letter-spacing: 0.12em;
  text-transform: uppercase;
  margin-bottom: 0.4rem;
}

.par-field__optional {
  text-transform: none;
  letter-spacing: 0;
  color: var(--par-color-text-muted);
  font-style: italic;
  font-weight: 400;
}

.par-field__hint {
  font-family: var(--par-font-serif);
  font-size: 12px;
  font-style: italic;
  color: var(--par-color-text-muted);
  line-height: 1.5;
  margin-top: 0.35rem;
}
```

### ParInput

Text input with parchment treatment. Standard input props (`modelValue`, `placeholder`, `type` default `text`, `disabled`). Emits `update:modelValue`.

```scss
.par-input {
  width: 100%;
  padding: 10px 14px;
  background: rgba(243, 235, 218, 0.5);  /* tinted callout color at 50% opacity */
  border: 0.5px solid var(--par-color-border-strong);
  border-radius: 4px;
  font-family: var(--par-font-serif);
  font-size: 15px;
  color: var(--par-color-text);
  outline: none;
  box-sizing: border-box;
  transition: border-color 0.15s ease;
}

.par-input:focus {
  border-color: var(--color-action-rest);
}
```

### ParSelect

Select with custom caret and parchment treatment. Props: `modelValue`, `options` (array of `{ value, label }` or plain strings), `placeholder` (optional default option). Emits `update:modelValue`.

```vue
<template>
  <div class="par-select-wrapper">
    <select
      class="par-select"
      :value="modelValue"
      @change="$emit('update:modelValue', $event.target.value)"
    >
      <option v-if="placeholder" value="">{{ placeholder }}</option>
      <option v-for="option in normalizedOptions" :key="option.value" :value="option.value">
        {{ option.label }}
      </option>
    </select>
    <svg class="par-select__caret" width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
      <path d="M2 4L5 7L8 4" stroke="currentColor" stroke-width="1" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  </div>
</template>
```

```scss
.par-select-wrapper {
  position: relative;
}

.par-select {
  width: 100%;
  padding: 10px 32px 10px 14px;
  background: rgba(243, 235, 218, 0.5);
  border: 0.5px solid var(--par-color-border-strong);
  border-radius: 4px;
  font-family: var(--par-font-serif);
  font-size: 15px;
  color: var(--par-color-text);
  outline: none;
  appearance: none;
  cursor: pointer;
  box-sizing: border-box;
  transition: border-color 0.15s ease;
}

.par-select:focus {
  border-color: var(--color-action-rest);
}

.par-select__caret {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  color: var(--color-action-hover);  /* dark lapis */
}
```

### ParTextarea

Textarea with parchment treatment. Props: `modelValue`, `placeholder`, `rows` (optional, defaults to ~80px min-height). Emits `update:modelValue`.

```scss
.par-textarea {
  width: 100%;
  min-height: 80px;
  padding: 10px 14px;
  background: rgba(243, 235, 218, 0.5);
  border: 0.5px solid var(--par-color-border-strong);
  border-radius: 4px;
  font-family: var(--par-font-serif);
  font-size: 15px;
  color: var(--par-color-text);
  outline: none;
  resize: vertical;
  line-height: 1.6;
  box-sizing: border-box;
  transition: border-color 0.15s ease;
}

.par-textarea:focus {
  border-color: var(--color-action-rest);
}
```

**Estimated time:** 1.5–2 hours.

## Step 3: Migrate the magic item generator's form

Use the new form-family primitives. Covers heading, subhead with random affordance, all field treatments, and copy refresh. **Remove the Cedar `cdr-input` and raw `<select>`** in the process.

### Heading and subhead

Replace the current H1 with an H2 in dark lapis using Source Serif:

```vue
<h2 class="form-heading">Generate a magic item</h2>
<p class="form-subhead">
  Specify what you want, or
  <button
    type="button"
    class="form-subhead__random"
    @click="generateRandom"
  >surprise me with something random</button>.
</p>
```

```scss
.form-heading {
  font-family: var(--par-font-serif);
  font-size: 24px;
  font-weight: 600;
  color: var(--color-action-hover);  /* dark lapis */
  text-align: center;
  margin: 0 0 0.5rem;
  line-height: 1.2;
  letter-spacing: -0.01em;
}

.form-subhead {
  font-family: var(--par-font-serif);
  font-size: 14px;
  color: var(--par-color-text-secondary);
  text-align: center;
  font-style: italic;
  margin: 0 0 1.75rem;
  line-height: 1.6;
}

.form-subhead__random {
  display: inline;
  background: transparent;
  border: none;
  padding: 0 0 1px;
  font-family: inherit;
  font-size: inherit;
  font-style: italic;  /* explicit — buttons don't inherit italic by default */
  color: var(--color-action-hover);
  font-weight: 500;
  cursor: pointer;
  border-bottom: 0.5px solid var(--color-action-hover);
  vertical-align: baseline;
  line-height: inherit;
  transition: color 0.15s ease, border-color 0.15s ease;
}

.form-subhead__random:hover {
  color: var(--color-action-active);
  border-color: var(--color-action-active);
}

.form-subhead__random:focus { outline: none; }

.form-subhead__random:focus-visible {
  outline: 2px solid var(--color-action-secondary-rest);
  outline-offset: 2px;
  border-radius: 2px;
}
```

The "Kenji's Item Generator" tool tag and "Free" badge above the heading stay as-is — tool identification, not editorial content.

### Random affordance click behavior

`generateRandom` bypasses all form fields and invokes the same generation logic as the Generate button, but with all field values cleared/ignored — prompt seeds run fully unconstrained. If a user typed into the name field then clicks "surprise me," the result is fully random regardless. Don't combine partial specification with random through this affordance — that (specify some, leave others blank) is what the main Generate button already supports.

Simplest implementation: clear all reactive form state, then invoke the generation function. The fully-random path already exists — see the gate at [`ItemGenerator.vue:806`](../src/tools/item-generator/ItemGenerator.vue#L806) (`!resolvedOrigin && !itemName.value.trim() && !itemLore.value.trim()`).

### Form fields

```vue
<ParField label="Item name">
  <ParInput
    v-model="itemName"
    placeholder="Goblet of the Firmament, or leave blank for a random name"
  />
</ParField>

<div class="form-grid">
  <ParField label="Rarity">
    <ParSelect v-model="rarity" :options="rarityOptions" placeholder="Any rarity" />
  </ParField>

  <ParField label="Type">
    <ParSelect v-model="itemType" :options="typeOptions" placeholder="Random" />
  </ParField>
</div>

<ParField
  label="Origin"
  hint="Colors the item's theme, look, and name — chosen for you when you leave the name and notes blank."
>
  <ParSelect v-model="itemOrigin" :options="originOptions" placeholder="Random" />
</ParField>

<ParField label="Notes for the scribe" :optional="true">
  <ParTextarea
    v-model="itemLore"
    :rows="3"
    placeholder="A fallen empire, a coastal cult, a lost language…"
  />
</ParField>
```

> **Note — v-model names.** Bind to the existing refs: `itemName`, `rarity`, `itemType`, `itemOrigin`, `itemLore` (see [`ItemGenerator.vue`](../src/tools/item-generator/ItemGenerator.vue) — the current Cedar fields use these). Don't introduce `origin`/`notes` aliases.

### Field copy updates

- "Item Name (optional):" → "Item name" (drop "(optional):" — random affordance positively frames blank)
- Name placeholder: → "Goblet of the Firmament, or leave blank for a random name"
- Help text below name field: remove (placeholder now does this work)
- "Rarity Level (optional)" → "Rarity"; "Choose a rarity level" default → "Any rarity"
- "Item Type (optional)" → "Type"
- "Item Origin (optional)" → "Origin"; **keep** the helper text, reworded: *"Colors the item's theme, look, and name — chosen for you when you leave the name and notes blank."* (via `ParField`'s `hint`)
- "Item Lore (optional)" → "Notes for the scribe — optional"; **shrink** from `:rows="7"` to `:rows="3"`
- Lore textarea placeholder: → "A fallen empire, a coastal cult, a lost language…"

The "(optional)" parenthetical pattern is replaced with positive framing via the random affordance and field defaults. The one field keeping an explicit optional marker is "Notes for the scribe — optional" using the editorial italic-gray treatment. Origin keeps a `hint`; all other help text is removed.

### Layout

Form sits in a contained card — same parchment treatment as the magic item card, but lapis ink instead of burgundy:

```scss
.form-card {
  background: var(--par-color-surface);
  border: 0.5px solid var(--par-color-border-strong);
  border-radius: var(--par-radius-lg);
  padding: 2.25rem 2.25rem 2rem;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin: 0 0 1.25rem;
}

@media (max-width: 600px) {
  .form-grid { grid-template-columns: 1fr; }
}
```

### Submit button

Stays as-is (already uses lifted lapis primary `#365A85` from the recent token update). Only change: "Generate Magic Item" → "Generate magic item" for sentence-case consistency.

**Estimated time:** 2 hours.

## Testing

**Visual:**
- Form renders correctly on the cream page surface.
- Field interiors read as quieter tinted workspaces against the cream form surface.
- Labels in dark lapis read as structural emphasis; heading in dark lapis is the strongest element.
- Subhead with inline random affordance reads naturally — unmistakably interactive without breaking the italic editorial voice.
- Custom dropdown carets render correctly in Chrome, Safari, Firefox.
- Mobile: form scales, grid collapses, text readable.

**Behavioral:**
- Tab navigation moves through fields in correct order including the random affordance.
- Keyboard activation (Enter/Space) on the random affordance triggers generation.
- Random affordance generates fully random items regardless of field values.
- Generate button respects all field values (existing behavior preserved).
- Focus states: lapis border on fields; secondary slate outline ring on random affordance. Hover deepens color/border.

**Accessibility:**
- All fields have proper `<label>` associations through `ParField`.
- Random affordance is a real `<button>`, not a styled link.
- Screen readers announce "Generate a magic item, heading level 2" then the subhead with the random button correctly identified.
- Logical tab order; focus rings visible on keyboard navigation.

## Total estimated scope

| Step | Time |
|---|---|
| Step 0 (rename `ParActionButton` → `ParButton`, own commit, lands first) | 30–45 min |
| Step 1 (rename card-family) | 30–45 min |
| Step 2 (build form-family primitives) | 1.5–2 hr |
| Step 3 (migrate item generator form) | 2 hr |
| Cross-browser testing | 30–45 min |
| Mobile testing | 30 min |

**Total: 5–6 hours of focused work** — roughly one full day with reviews and iteration.

## Cross-tool follow-up

**Tracked, not scheduled here:** the "surprise me with something random" affordance and the `Par*` form primitives propagate to the other 8 generator forms (NPC, location, encounter, setting, dungeon, statblock, bookshelf, lore/timeline) as each gets its editorial migration. This plan ships the item generator first; subsequent tools reuse the primitives and add their own random trigger.

**Deferred decision — flip/remove the global font override (`App.vue`).** `App.vue` forces `font-family: var(--font-sans) !important` on everything except `.parchment` (and descendants); the redesign is inverting that — editorial serif is becoming the default register, including for chrome/forms. For now the form primitives self-mark with `class="parchment"` (and the item form-card does too) to opt out, which keeps blast radius zero. Once enough tools are migrated, revisit App.vue: either remove the rule or flip the default to serif (forcing sans only where still needed). That's an app-wide change requiring visual QA across all 9 tools — its own commit, not bundled with a per-tool migration. When it lands, the per-component `.parchment` self-marks become no-ops (harmless) and can be cleaned up opportunistically.
