<template>
  <div>
    <h3>Relationships</h3>
    <CdrSkeleton>
      <div v-for="(item, index) in 3" :key="index">
        <div class="flex-bone">
          <CdrSkeletonBone type="line" style="width:10%;" /> :
          <CdrSkeletonBone type="line" style="width:80%;" />
        </div>
        <CdrSkeletonBone type="line" style="width:100%; margin-top: 0" />
        <CdrSkeletonBone type="line" style="width:90%;" />
        <CdrSkeletonBone type="line" style="width:85%;" />
      </div>

      <h3>Roleplaying Tips</h3>

      <p style="margin-top: 0">
        <CdrSkeletonBone type="line" style="width:95%" />
        <CdrSkeletonBone type="line" style="width:90%" />
        <CdrSkeletonBone type="line" style="width:85%" />
        <CdrSkeletonBone type="line" style="width:95%" />
        <CdrSkeletonBone type="line" style="width:60%" />
      </p>
    </CdrSkeleton>
  </div>
</template>

<script>
import { CdrSkeleton, CdrSkeletonBone } from '@rei/cedar';
import "@rei/cedar/dist/style/cdr-skeleton.css";
import "@rei/cedar/dist/style/cdr-skeleton-bone.css";
export default {
  components: {
    CdrSkeleton,
    CdrSkeletonBone,
  },
};
</script>

<style scoped>
.flex-bone {
  display: flex;
  align-items: center;
}
</style>
