<template>
    <ToolSuiteShowcase :premium="premium" display-mode="banner" />
    <div class="app-container">
        <!-- Overlay to close sidebar on click -->
        <div class="overlay" v-show="isSidebarVisible && windowWidth <= 768" @click="isSidebarVisible = false"></div>

        <div class="sidebar" :style="sidebarStyle">
            <div class="sidebar-content">
                <ul class="npc-list">
                    <li v-for="(npc, index) in npcs" :key="index" :class="{ 'active-tab': currentNPCIndex === index }"
                        @click="selectNPC(index)">
                        <button class="npc-button">
                            {{ npc.npcDescriptionPart1?.character_name || 'Unnamed NPC' }}
                        </button>
                    </li>
                    <li>
                        <button v-if="!loadingPart1" class="npc-button" @click="createNewNPC">+ New NPC</button>
                    </li>
                </ul>
                <div class="sidebar-buttons">
                    <!-- Export Section -->
                    <div v-if="npcDescriptionPart1" class="export-section">
                        <h3 class="export-title">Export NPC</h3>
                        <p class="export-description">
                            Copy your NPC in different formats. Markdown works with
                            <cdr-link href="https://homebrewery.naturalcrit.com/new"
                                target="_blank">Homebrewery</cdr-link>.
                        </p>
                        <cdr-button @click="copyNPCAsMarkdown" modifier="secondary"
                            style="margin-bottom: 0.5rem; width: 100%;">
                            Copy as Markdown
                        </cdr-button>
                        <cdr-button @click="copyNPCAsPlainText" modifier="secondary"
                            style="margin-bottom: 1rem; width: 100%;">
                            Copy as Plain Text
                        </cdr-button>
                    </div>

                    <!-- Data Manager -->
                    <cdr-button modifier="dark" @click="showDataManagerModal = true"
                        style="margin-bottom: 1rem; width: 100%;">
                        Save/Load Data from a File
                    </cdr-button>

                    <cdr-button @click="deleteAllNPCs" v-if="npcs.length > 0 && !loadingPart1" modifier="secondary"
                        style="width: 100%;">
                        Delete All NPCs
                    </cdr-button>
                </div>
            </div>
        </div>

        <!-- Data Manager Modal -->
        <DataManagerModal :opened="showDataManagerModal" @update:opened="showDataManagerModal = $event"
            :premium="premium" currentApp="npcGeneratorNPCs" />

        <div class="main-content">
            <!-- Form (shown only when no NPC is loaded) -->
            <div v-if="!npcDescriptionPart1 && !loadingPart1">
                <h1>Kenji's NPC Generator</h1>
                <div>
                    <p>
                        Generate engaging NPCs for your RPG campaign. Provide context about your setting for richer
                        descriptions—mention the city, faction, or situation to get more detailed results.
                        <span v-if="!premium">
                            <cdr-link href="https://cros.land/npc-generator-premium-version/">Upgrade to Premium</cdr-link>
                            for unlimited statblock generation and data export.
                        </span>
                    </p>
                </div>
                <form @submit.prevent="handleGenerateNPC">
                    <cdr-input id="typeOfNPC" v-model="typeOfPlace" background="secondary"
                        label="Give me an NPC Description For:" required>
                        <template #helper-text-bottom>Examples: A notable tavern patron, a shugenja of the Phoenix clan, a
                            sentient gazebo named Gary, an
                            edgerunner
                            suffering from bouts
                            of
                            cyberpsychosis, a goblin named Boblin</template>
                    </cdr-input>
                    <cdr-button type="submit" :disabled="loadingPart1">Generate NPC</cdr-button>
                </form>
            </div>

            <!-- NPC Content (shown when NPC is loaded or loading) -->
            <div class="location-description"
                v-if="loadingPart1 || loadingPart2 || npcDescriptionPart1 || npcDescriptionPart2 || errorMessage">
                <div v-if="loadingPart1">
                    <CdrSkeleton>
                        <CdrSkeletonBone type="heading" style="width: 50%; height: 50px" />
                        <p>
                            <CdrSkeletonBone type="line" style="width:95%" />
                            <CdrSkeletonBone type="line" style="width:90%" />
                            <CdrSkeletonBone type="line" style="width:85%" />
                            <CdrSkeletonBone type="line" style="width:95%" />
                            <CdrSkeletonBone type="line" style="width:50%" />
                        </p>
                        <p>
                            <CdrSkeletonBone type="line" style="width:95%" />
                            <CdrSkeletonBone type="line" style="width:90%" />
                            <CdrSkeletonBone type="line" style="width:85%" />
                            <CdrSkeletonBone type="line" style="width:95%" />
                            <CdrSkeletonBone type="line" style="width:75%" />
                        </p>
                        <p>
                            <CdrSkeletonBone type="line" style="width:95%" />
                            <CdrSkeletonBone type="line" style="width:90%" />
                            <CdrSkeletonBone type="line" style="width:85%" />
                            <CdrSkeletonBone type="line" style="width:95%" />
                            <CdrSkeletonBone type="line" style="width:30%" />
                        </p>
                        <p>
                            <CdrSkeletonBone type="line" style="width:95%" />
                            <CdrSkeletonBone type="line" style="width:90%" />
                            <CdrSkeletonBone type="line" style="width:85%" />
                            <CdrSkeletonBone type="line" style="width:95%" />
                            <CdrSkeletonBone type="line" style="width:60%" />
                        </p>
                    </CdrSkeleton>
                </div>
                <div v-if="npcDescriptionPart1 && !loadingPart1">
                    <h2>{{ npcDescriptionPart1.character_name }}</h2>
                    <div class="focus-text">{{ npcDescriptionPart1.read_aloud_description }}</div>

                    <div v-if="npcDescriptionPart1.combined_details" style="margin-top: 1.5rem;">
                        <p v-for="(paragraph, pIndex) in npcDescriptionPart1.combined_details.split('\n\n')"
                            :key="pIndex">
                            {{ paragraph }}
                        </p>
                    </div>

                    <hr style="margin: 2rem 0;">
                </div>
                <div v-if="loadingPart2">
                    <h3>Relationships</h3>
                    <CdrSkeleton>
                        <div>
                            <div class="flex-bone">
                                <CdrSkeletonBone type="line" style="width:10%;" /> :
                                <CdrSkeletonBone type="line" style="width:80%;" />
                            </div>
                            <CdrSkeletonBone type="line" style="width:100%; margin-top: 0" />
                            <CdrSkeletonBone type="line" style="width:90%;" />
                            <CdrSkeletonBone type="line" style="width:85%;" />
                        </div>

                        <div>
                            <div class="flex-bone">
                                <CdrSkeletonBone type="line" style="width:10%;" /> :
                                <CdrSkeletonBone type="line" style="width:80%;" />
                            </div>
                            <CdrSkeletonBone type="line" style="width:100%; margin-top: 0" />
                            <CdrSkeletonBone type="line" style="width:90%;" />
                            <CdrSkeletonBone type="line" style="width:85%;" />
                        </div>

                        <div>
                            <div class="flex-bone">
                                <CdrSkeletonBone type="line" style="width:10%;" /> :
                                <CdrSkeletonBone type="line" style="width:80%;" />
                            </div>
                            <CdrSkeletonBone type="line" style="width:100%; margin-top: 0" />
                            <CdrSkeletonBone type="line" style="width:90%;" />
                            <CdrSkeletonBone type="line" style="width:85%;" />
                        </div>
                    </CdrSkeleton>
                </div>
                <div v-if="npcDescriptionPart2 && !loadingPart2">
                    <h3>Relationships</h3>
                    <div
                        v-if="npcDescriptionPart2.relationships && Object.keys(npcDescriptionPart2.relationships).length > 0">
                        <div v-for="(relationshipDescription, relationshipName) in npcDescriptionPart2.relationships"
                            :key="relationshipName"
                            style="margin-bottom: 1rem; padding: 1rem; background: #f4f2ed; border-radius: 4px;">
                            <p style="margin: 0;">
                                <strong>Name:</strong> {{ relationshipName }}<br>
                                <strong>Relationship:</strong> {{ relationshipDescription }}
                            </p>
                        </div>
                    </div>
                    <div v-else>
                        <p style="font-style: italic; color: #666;">No relationships generated.</p>
                    </div>

                    <!-- Delete NPC Button -->
                    <div class="button-group" style="margin-top: 2rem;">
                        <cdr-button @click="deleteCurrentNPC" modifier="dark">Delete NPC</cdr-button>
                    </div>
                </div>
                <div v-if="npcDescriptionPart2 && !loadingPart2">
                    <h3>Generate D&D 5e Statblock for {{ npcDescriptionPart1.character_name }}</h3>
                    <div>
                        <div class="generate-monster">

                            <div class="cr-select">
                                <cdr-select v-model="selectedChallengeRating" label="Challenge Rating" prompt="CR"
                                    :options="challengeRatingData.fullArray" />
                                <cdr-checkbox label="Spellcaster:" v-model="isSpellcaster">NPC is a
                                    Spellcaster</cdr-checkbox>
                            </div>

                            <cdr-button @click="generateStatblock()">Generate Statblock</cdr-button>
                        </div>

                        <Statblock v-if="(loadingStatblockPart1 || loadingStatblockPart1 || statblock)"
                            :loadingPart1="loadingStatblockPart1" :loadingPart2="loadingStatblockPart2"
                            :monster="statblock" :premium="premium" :copyButtons="true"
                            @update-monster="updateStatblock" />
                        <SaveStatblock v-if="statblock" :monster="statblock"
                            :statblockLink="premium ? 'https://cros.land/ai-powered-dnd-5e-monster-statblock-generator-premium/' : 'https://cros.land/ai-powered-dnd-5e-monster-statblock-generator/'" />
                    </div>
                </div>
                <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
            </div>

            <div class="patreon" v-if="!premium">
                <cdr-link href="https://www.patreon.com/bePatron?u=2356190">Support Me on Patreon!</cdr-link>
            </div>
        </div>

        <!-- Bottom Menu Button for Mobile -->
        <button class="mobile-menu-button" v-show="windowWidth <= 768" @click="isSidebarVisible = !isSidebarVisible"
            :class="{ active: isSidebarVisible }" aria-label="Toggle NPC menu">
            <icon-navigation-menu inherit-color />
            <span class="button-label">Menu</span>
        </button>
    </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue';
import { CdrButton, CdrLink, CdrCheckbox, CdrSelect, CdrSkeleton, CdrSkeletonBone, CdrInput, IconNavigationMenu } from '@rei/cedar';
import Statblock from './Statblock.vue';
import SaveStatblock from './SaveStatblock.vue';
import DataManagerModal from './DataManagerModal.vue';
import { generateGptResponse } from "../util/open-ai.mjs";
import { createStatblockPrompts } from "../util/monster-prompts.mjs";
import { requestNPCDescription } from "../util/request-npc-description.mjs";
import { convertNPCToMarkdown, convertNPCToPlainText } from '../util/convertToMarkdown.mjs';
import challengeRatingData from '../data/challengeRatings.json';
import { canGenerateStatblock } from "../util/can-generate-statblock.mjs";
import '@rei/cedar/dist/cdr-fonts.css';
import '@rei/cedar/dist/reset.css';
import '@rei/cedar/dist/style/cdr-text.css';
import '@rei/cedar/dist/style/cdr-link.css';
import '@rei/cedar/dist/style/cdr-list.css';
import '@rei/cedar/dist/style/cdr-skeleton.css';
import '@rei/cedar/dist/style/cdr-skeleton-bone.css';
import '@rei/cedar/dist/style/cdr-input.css';
import ToolSuiteShowcase from './ToolSuiteShowcase.vue';

// NPC list for sidebar - each entry stores the full NPC data
const npcs = ref([]);
const currentNPCIndex = ref(null);

// Current NPC data (what's currently being displayed/edited)
const npcDescriptionPart1 = ref(null);
const npcDescriptionPart2 = ref(null);
const typeOfPlace = ref('');
const errorMessage = ref('');
const loadingPart1 = ref(false);
const loadingPart2 = ref(false);
const loadingStatblockPart1 = ref(false);
const loadingStatblockPart2 = ref(false);
const statblock = ref(null);
const selectedChallengeRating = ref('1');
const isSpellcaster = ref(false);

const props = defineProps({
    premium: {
        type: Boolean,
        default: false
    }
});

// Sidebar responsive
const isSidebarVisible = ref(false);
const windowWidth = ref(window.innerWidth);
const showDataManagerModal = ref(false);

const updateWindowWidth = () => {
    windowWidth.value = window.innerWidth;
};

const updateVisibility = () => {
    if (window.innerWidth > 768) {
        isSidebarVisible.value = true;
    } else {
        isSidebarVisible.value = false;
    }
};

const sidebarStyle = computed(() => {
    if (windowWidth.value <= 768) {
        return {
            position: 'fixed',
            transform: isSidebarVisible.value ? 'translateX(0)' : 'translateX(-100%)',
            width: '70%',
            maxWidth: '400px'
        };
    } else {
        return {
            width: '400px'
        };
    }
});

onMounted(() => {
    loadNPCsFromLocalStorage();
    updateWindowWidth();
    updateVisibility();
    window.addEventListener('resize', updateWindowWidth);
});

onUnmounted(() => {
    window.removeEventListener('resize', updateWindowWidth);
});

watch([isSidebarVisible, windowWidth], ([sidebarOpen, width]) => {
    if (width <= 768 && sidebarOpen) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
});

// Local Storage functions
function saveNPCsToLocalStorage() {
    localStorage.setItem('npcGeneratorNPCs', JSON.stringify(npcs.value));
}

function loadNPCsFromLocalStorage() {
    const stored = localStorage.getItem('npcGeneratorNPCs');
    if (stored) {
        try {
            const parsed = JSON.parse(stored);
            if (parsed.length > 0) {
                npcs.value = parsed;
                // Don't auto-load first NPC - let user choose from sidebar or create new one
            }
        } catch (error) {
            console.error('Failed to parse NPCs from local storage:', error);
        }
    }
}

// Save current NPC to the list
function saveCurrentNPCToList() {
    const npcData = {
        npcDescriptionPart1: npcDescriptionPart1.value,
        npcDescriptionPart2: npcDescriptionPart2.value,
        typeOfPlace: typeOfPlace.value,
        statblock: statblock.value,
        selectedChallengeRating: selectedChallengeRating.value,
        isSpellcaster: isSpellcaster.value
    };

    // If current index is null or >= length, add as new NPC
    if (currentNPCIndex.value === null || currentNPCIndex.value >= npcs.value.length) {
        npcs.value.push(npcData);
        currentNPCIndex.value = npcs.value.length - 1;
    } else {
        // Update existing NPC
        npcs.value[currentNPCIndex.value] = npcData;
    }

    saveNPCsToLocalStorage();
}

// Load an NPC from the list into the current view
function loadNPCIntoView(index) {
    if (npcs.value[index]) {
        const npc = npcs.value[index];
        npcDescriptionPart1.value = npc.npcDescriptionPart1 || null;
        npcDescriptionPart2.value = npc.npcDescriptionPart2 || null;
        typeOfPlace.value = npc.typeOfPlace || '';
        statblock.value = npc.statblock || null;
        selectedChallengeRating.value = npc.selectedChallengeRating || '1';
        isSpellcaster.value = npc.isSpellcaster || false;
        currentNPCIndex.value = index;
    }
}

// NPC Management functions
function createNewNPC() {
    // Reset current view
    npcDescriptionPart1.value = null;
    npcDescriptionPart2.value = null;
    typeOfPlace.value = '';
    errorMessage.value = '';
    loadingPart1.value = false;
    loadingPart2.value = false;
    statblock.value = null;
    selectedChallengeRating.value = '1';
    isSpellcaster.value = false;
    currentNPCIndex.value = npcs.value.length;
}

function selectNPC(index) {
    // Save current NPC before switching
    if (npcDescriptionPart1.value) {
        saveCurrentNPCToList();
    }
    loadNPCIntoView(index);
}

function deleteCurrentNPC() {
    if (confirm('Are you sure you want to delete this NPC?')) {
        if (currentNPCIndex.value < npcs.value.length) {
            npcs.value.splice(currentNPCIndex.value, 1);
            saveNPCsToLocalStorage();

            // Load another NPC or create a new one
            if (npcs.value.length > 0) {
                // Load the previous NPC, or the first one if we deleted the first
                const newIndex = Math.max(0, currentNPCIndex.value - 1);
                loadNPCIntoView(newIndex);
            } else {
                createNewNPC();
            }
        }
    }
}

function deleteAllNPCs() {
    if (confirm('Are you sure you want to delete all NPCs? This cannot be undone.')) {
        npcs.value = [];
        createNewNPC();
        saveNPCsToLocalStorage();
    }
}

// Copy functions
function copyNPCAsMarkdown() {
    if (!npcDescriptionPart1.value) {
        alert('No NPC to copy.');
        return;
    }

    // Combine NPC data for conversion
    const npcData = {
        character_name: npcDescriptionPart1.value.character_name,
        read_aloud_description: npcDescriptionPart1.value.read_aloud_description,
        combined_details: npcDescriptionPart1.value.combined_details,
        relationships: npcDescriptionPart2.value?.relationships || {},
        statblock: statblock.value || null
    };

    const markdown = convertNPCToMarkdown(npcData);
    navigator.clipboard.writeText(markdown);
    alert('NPC copied as markdown! Paste it into Homebrewery to see it formatted.');
}

function copyNPCAsPlainText() {
    if (!npcDescriptionPart1.value) {
        alert('No NPC to copy.');
        return;
    }

    // Combine NPC data for conversion
    const npcData = {
        character_name: npcDescriptionPart1.value.character_name,
        read_aloud_description: npcDescriptionPart1.value.read_aloud_description,
        combined_details: npcDescriptionPart1.value.combined_details,
        relationships: npcDescriptionPart2.value?.relationships || {},
        statblock: statblock.value || null
    };

    const plainText = convertNPCToPlainText(npcData);
    navigator.clipboard.writeText(plainText);
    alert('NPC copied as plain text!');
}

function updateStatblock(monster) {
    statblock.value = monster;
    // Save the updated statblock to the NPC list
    saveCurrentNPCToList();
}

function setLoadingState({ part, isLoading }) {
    if (part === 1) {
        loadingPart1.value = isLoading;
    } else if (part === 2) {
        loadingPart2.value = isLoading;
    }
}

// Helper function to combine NPC detail fields into a single content block
function combineNPCDetails(npc) {
    if (!npc) return '';

    const parts = [];

    if (npc.description_of_position) {
        parts.push(npc.description_of_position);
    }

    if (npc.reason_for_being_there) {
        parts.push(npc.reason_for_being_there);
    }

    if (npc.distinctive_feature_or_mannerism) {
        parts.push(npc.distinctive_feature_or_mannerism);
    }

    if (npc.character_secret) {
        parts.push(npc.character_secret);
    }

    if (npc.roleplaying_tips) {
        parts.push(npc.roleplaying_tips);
    }

    return parts.filter(Boolean).join('\n\n');
}

function displayNPCDescription({ part, npcDescription }) {
    if (part === 1) {
        // Combine detail fields into a single content block (this is the key for inline editing later!)
        npcDescription.combined_details = combineNPCDetails(npcDescription);
        npcDescriptionPart1.value = npcDescription;
        loadingPart1.value = false;
        // Save to list after part 1
        saveCurrentNPCToList();
    } else if (part === 2) {
        npcDescriptionPart2.value = npcDescription;
        loadingPart2.value = false;
        // Save to list after part 2
        saveCurrentNPCToList();
    }
}

function handleError(message) {
    console.error(message);
    loadingPart1.value = false;
    loadingPart2.value = false;
    errorMessage.value = message || null;
}

async function handleGenerateNPC() {
    await requestNPCDescription(
        typeOfPlace.value,
        {}, // extraDescription - not used in basic generator
        false, // sequentialLoading
        (event, payload) => {
            if (event === 'npc-description-generated') {
                displayNPCDescription(payload);
            } else if (event === 'npc-description-error') {
                handleError(payload);
            } else if (event === 'set-loading-state') {
                setLoadingState(payload);
            }
        }
    );
}

async function generateStatblock() {
    statblock.value = null;
    const canGenerate = await canGenerateStatblock(props.premium);

    if (!canGenerate) {
        return;
    }

    loadingStatblockPart1.value = true;
    loadingStatblockPart2.value = true;
    const fullNPCDescription = `Description of Position: ${npcDescriptionPart1.value.description_of_position}. Distinctive Feature: ${npcDescriptionPart1.value.distinctive_feature_or_mannerism}. Character Secret: ${npcDescriptionPart1.value.character_secret}. Read Aloud Description: ${npcDescriptionPart1.value.read_aloud_description}`;
    const promptOptions = {
        monsterName: npcDescriptionPart1.value.character_name,
        challengeRating: selectedChallengeRating.value,
        monsterType: 'Random',
        monsterDescription: fullNPCDescription,
        caster: isSpellcaster.value
    };
    const npcPrompts = createStatblockPrompts(promptOptions);

    try {
        const npcStatsPart1 = await generateGptResponse(npcPrompts.part1, validationPart1, 3);
        statblock.value = JSON.parse(npcStatsPart1);
        loadingStatblockPart1.value = false;
        const previousContext = [
            { role: 'user', content: `Please give me the first part of a D&D statblock in the following format` },
            { role: 'system', content: `${npcStatsPart1}` }
        ];
        const npcStatsPart2 = await generateGptResponse(npcPrompts.part2, validationPart2, 3, previousContext);
        const finalStatblock = {
            ...JSON.parse(npcStatsPart1),
            ...JSON.parse(npcStatsPart2),
        };
        statblock.value = finalStatblock;
        // Save the statblock to the NPC list
        saveCurrentNPCToList();
    } catch (e) {
        errorMessage.value = 'There was an issue generating the full description. Please reload your browser and resubmit your creature.';
    }
    loadingStatblockPart2.value = false;
}

function validationPart1(jsonString) {
    try {
        const jsonObj = JSON.parse(jsonString);
        const keys = [
            'armor_class',
            'hit_points',
            'speed',
            'senses',
            'languages',
            'challenge_rating',
            'proficiency_bonus',
            'abilities'
        ];
        return keys.every((key) => key in jsonObj);
    } catch (error) {
        return false;
    }
}

function validationPart2(jsonString) {
    try {
        const jsonObj = JSON.parse(jsonString);
        const keys = ['actions'];
        return keys.every((key) => key in jsonObj);
    } catch (error) {
        return false;
    }
}
</script>

<style scoped lang="scss">
@import '@rei/cdr-tokens/dist/scss/cdr-tokens.scss';
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');

.app-container {
    display: flex;

    $sidebar-width: 350px;
    $background-color: #f4f4f4;
    $active-color: #ffffff;
    $hover-background-color: #f0f0f0;
    $default-background-color: #e0e0e0;
    $active-border-color: #007BFF;

    .overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 1000;
    }

    .sidebar {
        transition: transform 0.3s ease;
        background-color: $background-color;
        width: $sidebar-width;
        height: 100vh;
        display: flex;
        flex-direction: column;
        z-index: 1001;
        overflow: hidden;

        .sidebar-content {
            flex: 1;
            overflow-y: auto;
            padding: 1rem;
            display: flex;
            flex-direction: column;
        }

        .npc-list {
            list-style: none;
            padding: 0;
            margin: 0 0 2rem 0;

            li {
                margin-bottom: 4px;

                &.active-tab {
                    .npc-button {
                        background-color: $active-color;
                        border-left: 4px solid $active-border-color;
                    }
                }

                .npc-button {
                    width: 100%;
                    padding: 12px 20px;
                    font-size: 1.25rem;
                    text-align: left;
                    background-color: $default-background-color;
                    border: none;
                    border-left: 4px solid transparent;
                    border-radius: 4px;
                    cursor: pointer;
                    transition: background-color 0.2s;
                    font-family: 'Roboto', sans-serif;

                    &:hover {
                        background-color: $hover-background-color;
                    }

                    &:focus {
                        outline: none;
                        border-left-color: $active-border-color;
                    }
                }
            }
        }

        .sidebar-buttons {
            display: flex;
            flex-direction: column;
            gap: 1rem;

        }
    }

    .main-content {
        flex-grow: 1;
        @include cdr-text-body-400();
        color: $cdr-color-text-primary;
        max-width: 940px;
        margin: 20px auto;
        padding: 2px 30px 30px 30px;
        background-color: #ffffff;
        border-radius: 8px;
        box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    }

    .mobile-menu-button {
        display: none;
        position: fixed;
        bottom: 24px;
        right: 24px;
        width: 64px;
        height: 64px;
        background-color: #e0e0e0;
        color: #333;
        border: none;
        border-radius: 50%;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
        cursor: pointer;
        z-index: 998;
        transition: all 0.3s ease;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 4px;

        @media (max-width: 768px) {
            display: flex;
        }

        svg {
            width: 24px;
            height: 24px;
        }

        .button-label {
            font-size: 10px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        &:hover {
            transform: scale(1.05);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
            background-color: #d0d0d0;
        }

        &:active {
            transform: scale(0.95);
        }

        &.active {
            background-color: #333;
            color: #fff;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        }
    }
}

hr {
    border: 1px solid $cdr-color-border-secondary;
    width: 80%;
    margin-top: 2rem;
    margin-bottom: 2rem;
}

.intro {
    @include cdr-text-body-400();
    margin: 1rem 0;
}

.focus-text {
    background-color: $cdr-color-background-secondary;
    color: $cdr-color-text-secondary;
    padding: 1rem 2rem;
    font-style: italic;
}

.suggestions {
    margin-left: 2rem;
    padding: 2rem;
}

div[class^="cdr-skeleton-bone"] {
    block-size: 2rem;
    margin: 1.1rem 0;
}

.flex-bone {
    display: flex;
    gap: 10px;
}

.generate-monster {
    display: flex;
    align-items: center;
    gap: 2rem;

    button {
        margin-top: 4px;
    }
}

.button-group {
    display: flex;
    gap: 1rem;
    margin-top: 2rem;
}

.credits {
    @include cdr-text-body-400();
    margin: 5px auto;
    text-align: center;
}

form {
    background-color: $cdr-color-background-secondary;
    border-radius: 8px;
    padding: 20px;
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.generate-button {
    align-self: flex-start;
}

.location-description {
    @include cdr-text-body-500();
    background-color: #ffffff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    margin-top: 20px;
}

.error-message {
    border: 1px solid $cdr-color-border-error;
    padding: $cdr-space-inset-one-x-stretch;
    color: $cdr-color-text-message-error;
    background-color: $cdr-color-background-message-error-01;
    text-align: center;
    margin-top: 16px;
}

.patreon {
    margin: 30px auto 0 auto;
    text-align: center;
}
</style>