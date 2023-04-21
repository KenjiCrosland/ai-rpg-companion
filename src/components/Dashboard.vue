<template>
    <div class="dashboard">
        <div class="dashboard-content">
            <div class="menu">
                <ul>
                    <li :class="{ active: activeGenerator === 'all' }"
                        @click="showLocationGenerator = true; showNPCGenerator = true; activeGenerator = 'all';">
                        All Generators
                    </li>
                    <li :class="{ active: activeGenerator === 'location' }"
                        @click="showLocationGenerator = true; showNPCGenerator = false; activeGenerator = 'location';">
                        Location Generator
                    </li>
                    <li :class="{ active: activeGenerator === 'npc' }"
                        @click="showLocationGenerator = false; showNPCGenerator = true; activeGenerator = 'npc';">
                        NPC Generator
                    </li>
                </ul>
            </div>
            <div class="generator-container">
                <LocationGenerator class="generator" v-show="showLocationGenerator" />
                <NPCGenerator class="generator" v-show="showNPCGenerator" />
            </div>
        </div>
    </div>
</template>

  
<script>
import LocationGenerator from './LocationGenerator.vue';
import NPCGenerator from './NPCGenerator.vue';

export default {
    data() {
        return {
            showLocationGenerator: true,
            showNPCGenerator: true,
            activeGenerator: 'all',
        };
    },
    components: {
        LocationGenerator,
        NPCGenerator,
    },
};
</script>
  
<style lang="scss">
.dashboard {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 50px 30px;
}

.dashboard-content {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.menu {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;

    ul {
        display: flex;
        list-style-type: none;
        padding-left: 0;
        border-bottom: 1px solid #ddd;

        li {
            cursor: pointer;
            color: rgba(12, 11, 8, 0.75);
            padding: 8px 16px;
            border-right: 1px solid #ddd;

            &:hover {
                background-color: #f4f2ed;
            }

            &:active {
                background-color: #928b80;
                color: #FFFFFF;
            }

            &.active {
                background-color: #726d64;
                color: #FFFFFF;
            }

            &:last-child {
                border-right: none;
            }
        }
    }
}
.generator {
    flex: 1;
    min-width: 300px; /* Adjust this value based on your desired minimum width */
    margin: 0 10px;
}
.generator-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
}

@media (min-width: 768px) {
    .dashboard {
        flex-direction: row;
    }

    .generator-container {
        flex-wrap: nowrap;
    }
}
</style>