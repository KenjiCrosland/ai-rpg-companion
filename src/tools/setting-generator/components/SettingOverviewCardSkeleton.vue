<template>
  <!--
    Parchment-framed loading state for the setting overview card.
    Mirrors OverviewTab.vue's structure (header → italic atmospheric
    lead → headed sections) so the layout doesn't shift when the
    generation lands. Same pattern as NPCCard, which renders skeleton
    bones inside its parchment frame rather than as bare lines.

    Used only by SettingGenerator.vue for the main Overview-tab
    loading state. The shared `@/components/skeletons/OverviewSkeleton.vue`
    stays untouched because Factions and Locations tabs use it as
    bare bones inside their own non-parchment containers.
  -->
  <div class="setting-card parchment">
    <!-- Header zone: name + epithet placeholders -->
    <div class="setting-card-header">
      <div class="setting-card-header-text">
        <CdrSkeleton>
          <CdrSkeletonBone type="line" class="bone-name" />
          <CdrSkeletonBone type="line" class="bone-epithet" />
        </CdrSkeleton>
      </div>
    </div>

    <div class="setting-card-content">
      <!-- Lead / italic atmospheric opener -->
      <div class="setting-card-read-aloud">
        <CdrSkeleton>
          <CdrSkeletonBone type="line" style="width: 95%" />
          <CdrSkeletonBone type="line" style="width: 90%" />
          <CdrSkeletonBone type="line" style="width: 70%" />
        </CdrSkeleton>
      </div>

      <!-- Each section: small-caps heading placeholder + paragraph bones.
           Widths match the rendered card's typical sentence shapes per
           section so the loading rhythm reads as continuous with the
           landed content. Every CdrSkeletonBone lives inside a CdrSkeleton
           parent — Cedar requires this for its context lookup, and
           orphan bones cause vnode-patch errors during the loading→
           loaded swap. -->
      <section
        v-for="section in skeletonSections"
        :key="section.heading"
        class="setting-card-section"
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

// Mirrors the SECTION_MAP in renderSettingOverview.mjs (sans the lead,
// which has its own bone block above). Line widths are tuned per
// section to suggest the typical sentence-length rhythm — Present
// State is the longest, Leadership the shortest.
const skeletonSections = [
  { heading: 'Region',       lineWidths: ['95%', '90%', '75%'] },
  { heading: 'History',      lineWidths: ['95%', '90%', '85%', '80%'] },
  { heading: 'Leadership',   lineWidths: ['90%', '60%'] },
  { heading: 'Society',      lineWidths: ['95%', '90%', '85%', '80%'] },
  { heading: 'Economy',      lineWidths: ['95%', '90%', '75%'] },
  { heading: 'Defense',      lineWidths: ['95%', '85%', '80%'] },
  { heading: 'Present State', lineWidths: ['95%', '90%', '85%', '90%', '75%'] },
];
</script>

<style scoped>
/* Mirrors the card frame from OverviewTab.vue. The framing styles are
   duplicated here (rather than imported) because Vue scoped styles
   don't cross component boundaries; the skeleton owns its own visual
   shell so the loading state renders complete on its own. */
.setting-card {
  background: var(--par-color-surface, #FBF7F0);
  border: 1.5px solid var(--par-color-border-strong, #c9b99a);
  border-radius: 2px;
  font-family: var(--par-font-serif, 'Source Serif 4', Georgia, 'Times New Roman', serif);
  overflow: hidden;
  margin-bottom: 1.5rem;
  font-size: 17px;
  line-height: 1.75;
}

.setting-card-header {
  padding: 2rem 3rem 1.5rem;
  background: rgba(0, 0, 0, 0.03);
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
}

.setting-card-header-text {
  min-width: 0;
  flex: 1;
}

/* Sized to match the rendered .setting-card-name (2.8rem font, line-height 1.15)
   and .setting-card-epithet (1.4rem font, italic) so the header doesn't
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

.setting-card-content {
  /* Matches OverviewTab: cap widened by the 6rem of side gutters so the
     measure stays at 65ch and the skeleton doesn't jump on load. */
  max-width: calc(65ch + 6rem);
  margin-inline: auto;
  padding: 0 3rem 2.5rem;
}

.setting-card-read-aloud {
  margin: 1.5rem 0 2rem;
}

.setting-card-section {
  margin: 2.5rem 0 0;
}

.setting-card-section:first-of-type {
  margin-top: 1rem;
}

/* Small-caps heading shape: short width, light height — matches the
   rendered .setting-section-heading (1.1rem, letter-spacing 0.18em). */
.bone-section-heading {
  width: 80px;
  height: 1rem;
  margin-bottom: 14px;
}

/* Skeleton bones inside each section get a touch of vertical breathing
   to suggest the body paragraphs they're standing in for. */
.setting-card-section :deep(.cdr-skeleton-bone) {
  margin-bottom: 0.5rem;
}

@media (max-width: 600px) {
  .setting-card-header,
  .setting-card-content {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
}
</style>
