<template>
  <h1>TABS EXAMPLE</h1>
  <div class="tabs-container">
    <Tabs>
      <TabPanel label="Tab 1">Content for Tab 1</TabPanel>
      <TabPanel label="Tab 2">Content for Tab 2</TabPanel>
      <TabPanel label="Tab 3">Content for Tab 3</TabPanel>
    </Tabs>

  </div>

</template>

<script setup>
import Tabs from './Tabs.vue';
import TabPanel from './TabPanel.vue';
</script>


<style scoped>
.tabs-container {
  max-width: 800px;
  margin: 0 auto;
}
</style>