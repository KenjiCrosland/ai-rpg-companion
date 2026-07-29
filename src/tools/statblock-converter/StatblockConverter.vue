<template>
  <div class="converter-page">
    <div class="converter-column">
      <div class="form-card parchment paper-grain">
        <h2 class="form-heading">Convert a statblock between 2014 and 2024 rules</h2>
        <p class="converter-hint">
          Paste any D&amp;D 5e monster statblock. The tool detects its edition,
          shows it as a card, and converts the wording to the other edition
          while keeping every number identical.
        </p>
        <ParTextarea v-model="pasteText" :rows="14" data-testid="converter-input"
          placeholder="Paste a full statblock here — name, AC, hit points, abilities, actions…" />
      </div>

      <template v-if="parsed && pasteText.trim()">
        <div class="converter-detected" data-testid="detected-banner">
          <span class="converter-detected__chip">Detected: {{ parsed.edition }} rules</span>
          <span v-if="!parsed.ok" class="converter-detected__warn">
            Couldn't read: {{ parsed.missing.join(', ') }}. Convert runs an extra
            AI pass to read the whole block first.
          </span>
        </div>

        <div v-if="parsed.model" class="converter-preview">
          <Statblock2024 v-if="parsed.edition === '2024'" :monster="parsed.model" :readonly="true" />
          <Statblock v-else :monster="parsed.model" :readonly="true" :columns="'two_columns'" />
        </div>

        <div class="converter-actions">
          <ParButton data-testid="convert-button" :disabled="converting" @click="convert">
            {{ converting ? 'Converting…' : `Convert to ${targetEdition} rules` }}
          </ParButton>
        </div>
      </template>

      <template v-if="converted">
        <h3 class="converter-result-heading">{{ converted.name }} — {{ targetEdition }} rules</h3>
        <div class="converter-preview" data-testid="converted-card">
          <Statblock2024 v-if="converted.format === '2024'" :monster="converted" :readonly="true" />
          <Statblock v-else :monster="converted" :readonly="true" :columns="'two_columns'" />
        </div>
        <div class="converter-actions">
          <ParButton data-testid="open-in-generator" @click="openInGenerator">
            Open in Statblock Generator
          </ParButton>
          <p class="converter-meter-note">
            Saved to your library with both printings — the generator's tabs flip
            between them.
          </p>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { ParButton, ParTextarea } from '@/parchment';
import Statblock from '@/components/Statblock.vue';
import Statblock2024 from '@/components/Statblock2024.vue';
import { parseStatblockText, buildStatblockParsePrompt, validateParsedStatblock, modelFromLLMParse } from './statblock-text-parser.mjs';
import { convertEdition } from '@/tools/statblock-generator/format-2024/generate.mjs';
import { generateGptResponse, isDegradedMode } from '@/util/ai-client.mjs';
import { canGenerateStatblock } from '@/util/can-generate-statblock.mjs';
import { saveStatblockToStorage } from '@/util/statblock-storage.mjs';
import { navigateToTool } from '@/util/navigation.mjs';
import { useToast } from '@/composables/useToast';
import { logger } from '@/util/logger.mjs';

const props = defineProps({ premium: { type: Boolean, default: false } });
const toast = useToast();

const pasteText = ref('');
const parsed = ref(null);
const converting = ref(false);
const converted = ref(null);
const savedFolder = 'Converted';

let debounceTimer = null;
watch(pasteText, (text) => {
  converted.value = null;
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    parsed.value = text.trim() ? parseStatblockText(text) : null;
  }, 350);
});

const targetEdition = computed(() =>
  parsed.value?.edition === '2024' ? '2014' : '2024');

async function convert() {
  if (!parsed.value || converting.value) return;
  // Conversion meters like a generation; a messy paste spends its unit on
  // up to two calls (LLM parse + conversion), same shape as a generation's
  // resolve + main call.
  const canConvert = await canGenerateStatblock(props.premium);
  if (!canConvert) return;

  converting.value = true;
  try {
    let sourceModel = parsed.value.model;
    if (!parsed.value.ok) {
      const raw = await generateGptResponse(
        buildStatblockParsePrompt(pasteText.value, parsed.value.edition),
        validateParsedStatblock,
        3,
      );
      sourceModel = modelFromLLMParse(raw, parsed.value.edition);
      parsed.value = { ...parsed.value, ok: true, model: sourceModel };
    }

    const result = await convertEdition(
      sourceModel,
      (p, v) => generateGptResponse(p, v, 3),
      { degraded: isDegradedMode() },
    );
    const conversionNotes = result._conversionNotes ?? [];
    delete result._conversionNotes;

    // The converted printing becomes the active edition; the source rides
    // along so the statblock generator's tabs flip between both.
    result.other_edition = sourceModel;
    converted.value = result;
    saveStatblockToStorage(result, savedFolder);
    toast.success(`${result.name} converted and saved to your statblocks.`);
    for (const note of conversionNotes) toast.info(note, 8000);
  } catch (e) {
    logger.error('Statblock conversion failed:', e);
    toast.error('Conversion failed. Check that the paste is a complete statblock and try again.');
  } finally {
    converting.value = false;
  }
}

function openInGenerator() {
  if (!converted.value) return;
  navigateToTool('statblock-generator', {
    monster: converted.value.name,
    folder: savedFolder,
  });
}
</script>

<style scoped lang="scss">
.converter-page {
  display: flex;
  justify-content: center;
  padding: 1rem;
}

.converter-column {
  width: 100%;
  max-width: 880px;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}

.form-card {
  padding: 1.6rem;
}

.form-heading {
  font-family: var(--par-font-serif, 'Source Serif 4', Georgia, serif);
  font-size: 2.2rem;
  margin: 0 0 0.6rem;
  color: var(--color-action-hover, #2A4D70);
}

.converter-hint {
  margin: 0 0 1rem;
  font-size: 1.4rem;
  color: var(--par-color-text-muted, #6b6b6b);
}

.converter-detected {
  display: flex;
  align-items: baseline;
  gap: 1rem;
  flex-wrap: wrap;
}

.converter-detected__chip {
  font-family: var(--par-font-serif, Georgia, serif);
  font-weight: 600;
  font-size: 1.4rem;
  color: #7a1f1f;
  background: var(--par-color-surface, #FBF7F0);
  border: 1px solid var(--par-color-border, #e8e2d4);
  border-radius: 2px;
  padding: 0.3rem 0.9rem;
}

.converter-detected__warn {
  font-size: 1.3rem;
  color: var(--par-color-text-muted, #6b6b6b);
}

.converter-actions {
  display: flex;
  align-items: baseline;
  gap: 1.2rem;
  flex-wrap: wrap;
}

.converter-meter-note {
  font-size: 1.3rem;
  color: var(--par-color-text-muted, #6b6b6b);
  margin: 0;
}

.converter-result-heading {
  font-family: var(--par-font-serif, Georgia, serif);
  font-size: 1.9rem;
  margin: 0.6rem 0 0;
  color: var(--color-action-hover, #2A4D70);
}
</style>
