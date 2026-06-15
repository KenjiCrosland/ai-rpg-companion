<template>
  <!--
    Parchment-framed loading state for the dungeon overview card.
    Mirrors OverviewTab.vue's structure (header → italic atmospheric
    lead → headed sections) so the layout doesn't shift when the
    generation lands. Same pattern as SettingOverviewCardSkeleton
    in the setting generator.

    Used only by OverviewTab.vue (dungeon) for the main Overview-tab
    loading state. The shared `./OverviewSkeleton.vue` stays untouched
    in case other tabs use it bare.
  -->
  <div class="dungeon-card parchment">
    <!-- Header zone: name + epithet placeholders -->
    <div class="dungeon-card-header">
      <div class="dungeon-card-header-text">
        <CdrSkeleton>
          <CdrSkeletonBone type="line" class="bone-name" />
          <CdrSkeletonBone type="line" class="bone-epithet" />
        </CdrSkeleton>
      </div>
    </div>

    <div class="dungeon-card-content">
      <!-- Lead / italic atmospheric opener -->
      <div class="dungeon-card-read-aloud">
        <CdrSkeleton>
          <CdrSkeletonBone type="line" style="width: 95%" />
          <CdrSkeletonBone type="line" style="width: 90%" />
          <CdrSkeletonBone type="line" style="width: 70%" />
        </CdrSkeleton>
      </div>

      <!-- Each section: small-caps heading placeholder + paragraph bones.
           Widths tuned per section to suggest the typical sentence-length
           rhythm — Inhabitants and Present State are longest, Quest Hook
           shortest. Every CdrSkeletonBone lives inside a CdrSkeleton
           parent — Cedar requires this for its context lookup, and
           orphan bones cause vnode-patch errors during the loading→
           loaded swap. -->
      <section
        v-for="section in skeletonSections"
        :key="section.heading"
        class="dungeon-card-section"
      >
        <CdrSkeleton>
          <CdrSkeletonBone type="line" class="bone-section-heading" />
          <CdrSkeletonBone
            v-for="(width, i) in section.lineWidths"
            :key="i"
            type="line"
            :style="{ width }"
          />
        </CdrSkeleton>
      </section>
    </div>
  </div>
</template>

<script setup>
import { CdrSkeleton, CdrSkeletonBone } from '@rei/cedar';

// Mirrors DUNGEON_SECTION_MAP_SPLIT in renderDungeonOverview.mjs
// (sans the lead, which has its own bone block above).
const skeletonSections = [
  { heading: 'Quest Hook',         lineWidths: ['95%', '90%', '70%'] },
  { heading: 'Approach',           lineWidths: ['95%', '90%', '85%', '80%'] },
  { heading: 'History',            lineWidths: ['95%', '90%', '85%', '80%'] },
  { heading: 'Inhabitants',        lineWidths: ['95%', '90%', '85%', '90%', '80%'] },
  { heading: 'Present State',      lineWidths: ['95%', '90%', '85%', '80%', '85%'] },
  { heading: 'Potential Outcomes', lineWidths: ['95%', '90%', '85%', '80%'] },
];
</script>

<style scoped>
/* Mirrors the card frame from OverviewTab.vue. The framing styles are
   duplicated here (rather than imported) because Vue scoped styles
   don't cross component boundaries; the skeleton owns its own visual
   shell so the loading state renders complete on its own. */
.dungeon-card {
  background: var(--par-color-surface, #fdfbf6);
  border: 1.5px solid var(--par-color-border-strong, #c9b99a);
  border-radius: 2px;
  font-family: var(--par-font-serif, 'Source Serif 4', Georgia, 'Times New Roman', serif);
  overflow: hidden;
  margin-bottom: 1.5rem;
  font-size: 17px;
  line-height: 1.75;
}

.dungeon-card-header {
  padding: 2rem 3rem 1.5rem;
  background: rgba(0, 0, 0, 0.03);
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
}

.dungeon-card-header-text {
  min-width: 0;
  flex: 1;
}

/* Sized to match the rendered .dungeon-card-name (2.8rem font, line-height 1.15)
   and .dungeon-card-epithet (1.4rem font, italic) so the header doesn't
   jump when the real text lands. */
.bone-name {
  width: 55%;
  height: 2.6rem;
  margin-bottom: 0.6rem;
}

.bone-epithet {
  width: 35%;
  height: 1.4rem;
}

.dungeon-card-content {
  max-width: 75ch;
  margin-inline: auto;
  padding: 0 3rem 2.5rem;
}

.dungeon-card-read-aloud {
  margin: 1.5rem 0 2rem;
}

.dungeon-card-section {
  margin: 2.5rem 0 0;
}

.dungeon-card-section:first-of-type {
  margin-top: 1rem;
}

/* Small-caps heading shape: short width, light height — matches the
   rendered .dungeon-section-heading (1.1rem, letter-spacing 0.18em). */
.bone-section-heading {
  width: 80px;
  height: 1rem;
  margin-bottom: 14px;
}

/* Skeleton bones inside each section get vertical breathing to suggest
   the body paragraphs they're standing in for. Dungeon paragraphs use
   3rem line-height (vs. setting's tighter rhythm), so bones get a touch
   more space. */
.dungeon-card-section :deep(.cdr-skeleton-bone) {
  margin-bottom: 0.6rem;
}

@media (max-width: 600px) {
  .dungeon-card-header,
  .dungeon-card-content {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
}
</style>
