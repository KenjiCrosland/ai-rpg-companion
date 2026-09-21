<template>
  <!-- Loading skeleton shaped like the 2024 card: name, subtitle, the
       AC/Initiative split line, the 3-group ability grid, detail lines,
       and a section with entries. -->
  <CdrSkeleton class="sb24-skeleton">
    <CdrSkeletonBone type="line" class="sb24-skeleton__bone" style="width: 40%; height: 2.2rem;" />
    <CdrSkeletonBone type="line" class="sb24-skeleton__bone" style="width: 30%; height: 1.4rem;" />

    <div class="sb24-skeleton__split">
      <span v-if="chassis" class="sb24-skeleton__real" data-testid="skeleton-ac"><strong>AC</strong> {{ chassis.ac }}</span>
      <CdrSkeletonBone v-else type="line" class="sb24-skeleton__bone" style="width: 8rem;" />
      <CdrSkeletonBone type="line" class="sb24-skeleton__bone" style="width: 12rem;" />
    </div>
    <span v-if="chassis" class="sb24-skeleton__real" data-testid="skeleton-hp"><strong>HP</strong> ~{{ chassis.hp }}</span>
    <CdrSkeletonBone v-else type="line" class="sb24-skeleton__bone" style="width: 16rem;" />
    <CdrSkeletonBone type="line" class="sb24-skeleton__bone" style="width: 12rem;" />

    <div class="sb24-skeleton__abilities">
      <div v-for="col in 3" :key="col" class="sb24-skeleton__ability-col">
        <CdrSkeletonBone v-for="row in 2" :key="row" type="line" class="sb24-skeleton__bone" style="width: 100%; height: 2rem;" />
      </div>
    </div>

    <CdrSkeletonBone v-for="line in 3" :key="`d${line}`" type="line" class="sb24-skeleton__bone" :style="`width: ${30 + line * 8}%;`" />
    <span v-if="chassis" class="sb24-skeleton__real" data-testid="skeleton-cr"><strong>CR</strong> {{ chassis.cr_str }} (XP {{ (chassis.xp ?? 0).toLocaleString('en-US') }}; PB +{{ chassis.pb }})</span>
    <CdrSkeletonBone v-else type="line" class="sb24-skeleton__bone" style="width: 62%;" />

    <CdrSkeletonBone type="line" class="sb24-skeleton__bone sb24-skeleton__section" style="width: 18%; height: 1.6rem;" />
    <template v-for="entry in 3" :key="`e${entry}`">
      <CdrSkeletonBone type="line" class="sb24-skeleton__bone" style="width: 96%;" />
      <CdrSkeletonBone type="line" class="sb24-skeleton__bone sb24-skeleton__entry-tail" :style="`width: ${50 + entry * 12}%;`" />
    </template>
  </CdrSkeleton>
</template>

<script setup>
import { CdrSkeleton, CdrSkeletonBone } from '@rei/cedar';

// Engine chassis numbers, known before any LLM call — rendered as REAL
// values inside the shimmer ({ ac, hp, cr_str, pb, xp }). HP is the budget
// (the final formula-derived value lands near it), hence the tilde.
defineProps({ chassis: { type: Object, default: null } });
import '@rei/cedar/dist/style/cdr-skeleton.css';
import '@rei/cedar/dist/style/cdr-skeleton-bone.css';
</script>

<style scoped>
.sb24-skeleton__bone {
  margin-bottom: 0.7rem;
}

.sb24-skeleton__real {
  display: block;
  font-size: 1.4rem;
  color: #58180D;
  margin-bottom: 0.7rem;
}

.sb24-skeleton__split {
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
}

.sb24-skeleton__abilities {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.4rem 1.6rem;
  margin: 1.2rem 0;
}

.sb24-skeleton__section {
  margin-top: 1.6rem;
}

.sb24-skeleton__entry-tail {
  margin-bottom: 1.1rem;
}
</style>
