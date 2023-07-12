<template>
    <CdrSkeleton style="margin-top: 2rem;">
        <CdrSkeletonBone type="heading" style="width: 85%; height: 35px" />

        <h3>Author Name</h3>
        <CdrSkeletonBone type="line" style="width:35%" />

        <h3>Author's Background</h3>
        <CdrSkeletonBone type="line" style="width:95%" />
        <CdrSkeletonBone type="line" style="width:90%" />
        <CdrSkeletonBone type="line" style="width:85%" />
        <CdrSkeletonBone type="line" style="width:95%" />
        <CdrSkeletonBone type="line" style="width:30%" />

        <h3>Book Physical Description</h3>
        <CdrSkeletonBone type="line" style="width:95%" />
        <CdrSkeletonBone type="line" style="width:90%" />
        <CdrSkeletonBone type="line" style="width:85%" />
        <CdrSkeletonBone type="line" style="width:95%" />
        <CdrSkeletonBone type="line" style="width:30%" />

        <h3>Summary</h3>
        <CdrSkeletonBone type="line" style="width:95%" />
        <CdrSkeletonBone type="line" style="width:90%" />
        <CdrSkeletonBone type="line" style="width:85%" />
        <CdrSkeletonBone type="line" style="width:95%" />
        <CdrSkeletonBone type="line" style="width:60%" />

        <h3>Excerpt</h3>
        <CdrSkeletonBone type="line" style="width:95%" />
        <CdrSkeletonBone type="line" style="width:90%" />
        <CdrSkeletonBone type="line" style="width:85%" />
        <CdrSkeletonBone type="line" style="width:95%" />
        <CdrSkeletonBone type="line" style="width:60%" />

        <h3>Secret</h3>
        <CdrSkeletonBone type="line" style="width:95%" />
        <CdrSkeletonBone type="line" style="width:90%" />
        <CdrSkeletonBone type="line" style="width:85%" />
        <CdrSkeletonBone type="line" style="width:95%" />
        <CdrSkeletonBone type="line" style="width:60%" />

        <CdrSkeletonBone type="line" style="width:95%" />
        <CdrSkeletonBone type="line" style="width:90%" />
        <CdrSkeletonBone type="line" style="width:85%" />
        <CdrSkeletonBone type="line" style="width:95%" />
        <CdrSkeletonBone type="line" style="width:30%" />
    </CdrSkeleton>
</template>
  
<script setup>
import { ref } from 'vue';
import { CdrSkeleton, CdrSkeletonBone } from "@rei/cedar";

import "@rei/cedar/dist/style/cdr-skeleton.css";
import "@rei/cedar/dist/style/cdr-skeleton-bone.css";
  // If you have any data properties or methods, define them here. For example:
  // const myProperty = ref('');
</script>
  
<style scoped></style>
  