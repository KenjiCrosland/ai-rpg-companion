<template>
  <!-- `parchment` opts this subtree out of App.vue's global font-family
       !important override (which forces --font-sans on non-parchment
       elements). Covers the slotted control too, as its descendant. -->
  <label class="par-field parchment">
    <span class="par-field__label">
      {{ label }}<span v-if="optional" class="par-field__optional"> — optional</span><span
        v-else-if="required" class="par-field__required" aria-hidden="true">*</span>
    </span>
    <slot />
    <span v-if="hint || $slots.hint" class="par-field__hint">
      <slot name="hint">{{ hint }}</slot>
    </span>
  </label>
</template>

<script setup>
/**
 * ParField — form field wrapper for the form-input family
 * (ParInput / ParSelect / ParTextarea). Pairs a lapis label with the
 * control and an optional editorial hint, in the "magic UI" register.
 *
 * Renders a <label> wrapping the slotted control so association is
 * implicit (clicking the label focuses the control) — no for/id wiring
 * needed. One control per field.
 *
 * Sibling to the card-input family: ParCardInput/Select/Textarea carry
 * their own built-in label prop and burgundy palette for inline card
 * editing. ParField + ParInput/Select/Textarea are the lapis form
 * primitives for tool input forms.
 */
defineProps({
  label: { type: String, required: true },
  // Appends a small italic gray "— optional" after the label.
  optional: { type: Boolean, default: false },
  // Appends a lapis "*" after the label to mark the field as required.
  // Ignored when `optional` is set (a field can't be both).
  required: { type: Boolean, default: false },
  // Helper text below the control. Prefer the prop; use the #hint slot
  // for rich content.
  hint: { type: String, default: '' },
});
</script>

<style scoped>
.par-field {
  display: block;
  margin: 0 0 1.25rem;
}

.par-field__label {
  display: block;
  font-family: var(--par-font-serif, 'Source Serif 4', Georgia, 'Times New Roman', serif);
  font-size: 1.1rem;
  font-weight: 500;
  color: var(--color-action-hover, #2A4D70); /* dark lapis */
  letter-spacing: 0.12em;
  text-transform: uppercase;
  margin-bottom: 0.4rem;
}

.par-field__optional {
  text-transform: none;
  letter-spacing: 0;
  color: var(--par-color-text-muted, #6b6b6b);
  font-style: italic;
  font-weight: 400;
}

.par-field__required {
  margin-left: 0.25em;
  color: var(--color-action-rest, #365A85); /* lapis — matches the label */
  font-weight: 600;
}

.par-field__hint {
  display: block;
  font-family: var(--par-font-serif, 'Source Serif 4', Georgia, 'Times New Roman', serif);
  font-size: 1.2rem;
  font-style: italic;
  color: var(--par-color-text-muted, #6b6b6b);
  line-height: 1.5;
  margin-top: 0.35rem;
}
</style>
