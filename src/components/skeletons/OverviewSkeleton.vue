<template>
  <!-- 8 paragraphs total, mirroring the rendered overview's structure:
       overview/relation, history, ruler-sentence, social, economic,
       military, central_dynamic/responses, present_state. Line counts
       vary by typical field length (the central dynamic + responses
       paragraph is the longest at 7 lines). -->
  <p>
    <CdrSkeletonBone type="line" style="width:95%" />
    <CdrSkeletonBone type="line" style="width:90%" />
    <CdrSkeletonBone type="line" style="width:95%" />
    <CdrSkeletonBone type="line" style="width:90%" />
    <CdrSkeletonBone type="line" style="width:85%" />
    <CdrSkeletonBone type="line" style="width:90%" />
    <CdrSkeletonBone type="line" style="width:80%" />
  </p>
  <p>
    <CdrSkeletonBone type="line" style="width:95%" />
    <CdrSkeletonBone type="line" style="width:90%" />
    <CdrSkeletonBone type="line" style="width:85%" />
    <CdrSkeletonBone type="line" style="width:90%" />
    <CdrSkeletonBone type="line" style="width:85%" />
    <CdrSkeletonBone type="line" style="width:80%" />
  </p>
  <p>
    <CdrSkeletonBone type="line" style="width:95%" />
    <CdrSkeletonBone type="line" style="width:90%" />
    <CdrSkeletonBone type="line" style="width:70%" />
  </p>
  <p>
    <CdrSkeletonBone type="line" style="width:95%" />
    <CdrSkeletonBone type="line" style="width:90%" />
    <CdrSkeletonBone type="line" style="width:85%" />
    <CdrSkeletonBone type="line" style="width:80%" />
  </p>
  <p>
    <CdrSkeletonBone type="line" style="width:95%" />
    <CdrSkeletonBone type="line" style="width:90%" />
    <CdrSkeletonBone type="line" style="width:85%" />
    <CdrSkeletonBone type="line" style="width:85%" />
  </p>
  <p>
    <CdrSkeletonBone type="line" style="width:95%" />
    <CdrSkeletonBone type="line" style="width:90%" />
    <CdrSkeletonBone type="line" style="width:85%" />
    <CdrSkeletonBone type="line" style="width:80%" />
  </p>
  <p>
    <CdrSkeletonBone type="line" style="width:95%" />
    <CdrSkeletonBone type="line" style="width:90%" />
    <CdrSkeletonBone type="line" style="width:95%" />
    <CdrSkeletonBone type="line" style="width:90%" />
    <CdrSkeletonBone type="line" style="width:85%" />
    <CdrSkeletonBone type="line" style="width:90%" />
    <CdrSkeletonBone type="line" style="width:80%" />
  </p>
  <p>
    <CdrSkeletonBone type="line" style="width:95%" />
    <CdrSkeletonBone type="line" style="width:90%" />
    <CdrSkeletonBone type="line" style="width:85%" />
    <CdrSkeletonBone type="line" style="width:90%" />
    <CdrSkeletonBone type="line" style="width:75%" />
  </p>
</template>

<script setup>
import { CdrList, CdrSkeleton, CdrSkeletonBone } from "@rei/cedar";
</script>

<style scoped lang="scss">
.bone-list-item {
  margin: 4rem 0;
}
</style>
