<template>
  <div class="npc-card">
    <CdrSkeleton>
      <div class="npc-card-header">
        <CdrSkeletonBone type="heading" style="width: 45%; height: 36px; margin-bottom: 0.25rem;" />
        <CdrSkeletonBone type="line" style="width: 30%; height: 12px;" />
      </div>
      <div class="npc-card-read-aloud">
        <CdrSkeletonBone type="line" style="width:95%; margin-bottom: 0.5rem;" />
        <CdrSkeletonBone type="line" style="width:88%;" />
      </div>
      <div class="npc-card-body">
        <CdrSkeletonBone type="line" style="width:95%; margin-bottom: 0.5rem;" />
        <CdrSkeletonBone type="line" style="width:90%; margin-bottom: 0.5rem;" />
        <CdrSkeletonBone type="line" style="width:85%; margin-bottom: 0.5rem;" />
        <CdrSkeletonBone type="line" style="width:92%; margin-bottom: 1rem;" />
        <CdrSkeletonBone type="line" style="width:88%; margin-bottom: 0.5rem;" />
        <CdrSkeletonBone type="line" style="width:93%; margin-bottom: 0.5rem;" />
        <CdrSkeletonBone type="line" style="width:87%; margin-bottom: 1rem;" />
        <CdrSkeletonBone type="line" style="width:91%; margin-bottom: 0.5rem;" />
        <CdrSkeletonBone type="line" style="width:86%; margin-bottom: 0.5rem;" />
        <CdrSkeletonBone type="line" style="width:60%;" />
      </div>

      <!-- SVG Flourish -->
      <svg viewBox="0 0 400 12" xmlns="http://www.w3.org/2000/svg" class="npc-flourish">
        <line x1="0" y1="6" x2="188" y2="6" stroke="#c9b99a" stroke-width="0.75" />
        <line x1="212" y1="6" x2="400" y2="6" stroke="#c9b99a" stroke-width="0.75" />
        <polygon points="200,1 206,6 200,11 194,6" fill="#7b2d26" />
      </svg>

      <!-- Relationships -->
      <div class="npc-card-relationships">
        <CdrSkeletonBone type="line" style="width: 25%; height: 13px; margin-bottom: 0.625rem;" />
        <div class="npc-relationship-card">
          <CdrSkeletonBone type="line" style="width: 40%; height: 13px; margin-bottom: 0.25rem;" />
          <CdrSkeletonBone type="line" style="width: 90%;" />
          <CdrSkeletonBone type="line" style="width: 75%;" />
        </div>
        <div class="npc-relationship-card">
          <CdrSkeletonBone type="line" style="width: 35%; height: 13px; margin-bottom: 0.25rem;" />
          <CdrSkeletonBone type="line" style="width: 85%;" />
          <CdrSkeletonBone type="line" style="width: 80%;" />
        </div>
        <div class="npc-relationship-card">
          <CdrSkeletonBone type="line" style="width: 38%; height: 13px; margin-bottom: 0.25rem;" />
          <CdrSkeletonBone type="line" style="width: 88%;" />
          <CdrSkeletonBone type="line" style="width: 70%;" />
        </div>
      </div>
    </CdrSkeleton>
  </div>
</template>

<script setup>
import { CdrSkeleton, CdrSkeletonBone } from "@rei/cedar";
</script>

<style scoped lang="scss">
/* NPC Card Skeleton Styles */
.npc-card {
  background: #faf8f3;
  border: 1.5px solid #c9b99a;
  border-top: 3px solid #7b2d26;
  border-radius: 2px;
  font-family: Georgia, 'Times New Roman', serif;
  overflow: hidden;
  margin-bottom: 1.5rem;
}

.npc-card-header {
  padding: 1.25rem 1.5rem 0.75rem;
}

.npc-card-read-aloud {
  border-top: 1px solid #c9b99a;
  border-bottom: 1px solid #c9b99a;
  margin: 0 1.5rem;
  padding: 1rem 0;
}

.npc-card-body {
  padding: 0.75rem 1.5rem 1rem;
  color: #3d3d3d;
  font-size: 15px;
  line-height: 1.6;
}

.npc-flourish {
  width: 60%;
  height: 12px;
  display: block;
  margin: 1rem auto;
}

.npc-card-relationships {
  padding: 0.75rem 1.5rem 1rem;
}

.npc-relationship-card {
  background: #f4f0e8;
  border-radius: 3px;
  padding: 0.625rem 0.75rem;
  margin-bottom: 0.75rem;
}
</style>
