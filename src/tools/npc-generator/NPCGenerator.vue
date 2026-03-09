<template>
    <GeneratorLayout :premium="premium">
        <template #sidebar>
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
                    <cdr-button @click="deleteAllNPCs" v-if="npcs.length > 0 && !loadingPart1" modifier="secondary"
                        style="width: 100%;">
                        Delete All NPCs
                    </cdr-button>
                </div>
            </div>
        </template>

        <!-- Data Manager Modal -->
        <DataManagerModal :opened="showDataManagerModal" @update:opened="showDataManagerModal = $event"
            :premium="premium" currentApp="npcGeneratorNPCs" />

        <div class="main-content">
            <!-- LANDING STATE: Three-zone layout -->
            <div class="landing-wrapper" v-if="!npcDescriptionPart1 && !loadingPart1">

                <!-- ZONE 1: Hero header -->
                <div class="hero-header">
                    <div class="brand-line">
                        <span class="brand-name">Kenji's NPC Generator</span>
                        <span v-if="!premium" class="version-pill">Free</span>
                        <span v-else class="version-pill premium">Premium</span>
                    </div>
                    <h1>Bring Your World to Life with Detailed NPCs</h1>
                    <p class="value-prop">Generate memorable characters with backstories, relationships, and combat
                        statblocks —
                        ready for any session.</p>
                </div>

                <!-- ZONE 2: Form card -->
                <div class="form-card">
                    <form @submit.prevent="handleGenerateNPC">
                        <cdr-input id="typeOfNPC" v-model="typeOfPlace" background="secondary"
                            label="Give me an NPC Description For:" required>
                            <template #helper-text-bottom>Examples: A notable tavern patron, a shugenja of the Phoenix
                                clan,
                                a sentient gazebo named Gary, an edgerunner suffering from bouts of cyberpsychosis, a
                                goblin named Boblin</template>
                        </cdr-input>
                        <cdr-button type="submit" :disabled="loadingPart1" class="generate-button">Generate
                            NPC</cdr-button>
                    </form>
                </div>

                <!-- ZONE 3: Footer meta -->
                <div class="footer-meta">
                    <!-- Free users: Show message + unlock button -->
                    <div v-if="!premium">
                        <p>
                            NPC generation is unlimited. Combat statblocks are limited to 5 per 24 hours. NPC data is
                            saved on this browser. To save/load NPC data for use in another computer or browser requires
                            a premium Patreon subscription.
                        </p>
                        <div class="patreon-universal-button">
                            <a :href="patreonLoginUrl">
                                <div class="patreon-responsive-button-wrapper">
                                    <div class="patreon-responsive-button">
                                        <img class="patreon_logo"
                                            src="https://cros.land/wp-content/plugins/patreon-connect/assets/img/patreon-logomark-on-coral.svg"
                                            alt="Unlock with Patreon"> Unlock with Patreon
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>

                    <!-- Premium users: Show save/load button -->
                    <div v-else>
                        <p>
                            All features unlimited. NPC data is saved on this browser. Export to a file to use on
                            another
                            device.
                        </p>
                        <cdr-button modifier="dark" @click="showDataManagerModal = true">
                            Save/Load Data from a File
                        </cdr-button>
                    </div>
                </div>
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
                <!-- View Mode -->
                <div v-if="npcDescriptionPart1 && !loadingPart1 && !isEditingNPC">
                    <div class="npc-header">
                        <h2>{{ npcDescriptionPart1.character_name }}</h2>
                        <cdr-button @click="startEditingNPC" modifier="secondary" size="small">Edit NPC</cdr-button>
                    </div>
                    <div class="focus-text">{{ npcDescriptionPart1.read_aloud_description }}</div>

                    <div v-if="npcDescriptionPart1.combined_details" style="margin-top: 1.5rem;">
                        <p v-for="(paragraph, pIndex) in npcDescriptionPart1.combined_details.split('\n\n')"
                            :key="pIndex">
                            {{ paragraph }}
                        </p>
                    </div>

                    <hr style="margin: 2rem 0;">
                </div>

                <!-- Edit Mode -->
                <div v-if="npcDescriptionPart1 && !loadingPart1 && isEditingNPC" class="edit-form">
                    <h2>Edit NPC</h2>

                    <cdr-input v-model="npcEditForm.character_name" label="NPC Name" background="secondary"
                        class="edit-field" />

                    <cdr-input v-model="npcEditForm.read_aloud_description" label="Read-Aloud Description"
                        background="secondary" :rows="4" tag="textarea" class="edit-field">
                        <template #helper-text-bottom>
                            The initial description when the NPC is first encountered
                        </template>
                    </cdr-input>

                    <cdr-input v-model="npcEditForm.combined_details" label="NPC Details" background="secondary"
                        :rows="10" tag="textarea" class="edit-field">
                        <template #helper-text-bottom>
                            Position, location, mannerisms, secrets, and roleplaying tips. Use double line breaks for
                            paragraphs.
                        </template>
                    </cdr-input>

                    <h3>Relationships</h3>
                    <div v-if="npcEditForm.relationshipsArray.length > 0">
                        <div v-for="(relationship, index) in npcEditForm.relationshipsArray" :key="index"
                            style="margin-bottom: 1.5rem; padding: 1.5rem; background: #f4f2ed; border-radius: 4px;">
                            <cdr-input v-model="relationship.name" label="Name" background="secondary"
                                style="margin-bottom: 1rem;" />
                            <cdr-input v-model="relationship.description" label="Relationship Description"
                                background="secondary" :rows="2" tag="textarea" style="margin-bottom: 1rem;" />
                            <cdr-button size="small" @click="deleteRelationship(index)" modifier="secondary">Remove
                                Relationship</cdr-button>
                        </div>
                    </div>
                    <div v-else>
                        <p style="font-style: italic; color: #666; margin-bottom: 1rem;">No relationships to edit.
                            Generate them in view mode first.</p>
                    </div>

                    <div class="button-group">
                        <cdr-button @click="saveEditNPC">Save Changes</cdr-button>
                        <cdr-button @click="cancelEditNPC" modifier="secondary">Cancel</cdr-button>
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
                <div v-if="npcDescriptionPart2 && !loadingPart2 && !isEditingNPC">
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

                    <!-- Actions Row -->
                    <div class="actions-row" style="margin-top: 2rem;">
                        <!-- Management Actions (Left) -->
                        <div class="management-actions">
                            <cdr-button @click="deleteCurrentNPC" modifier="dark">
                                Delete
                            </cdr-button>
                        </div>

                        <!-- Export Actions (Right) -->
                        <div class="export-actions">
                            <cdr-button @click="copyNPCAsPlainText" modifier="secondary">
                                Copy as Plain Text
                            </cdr-button>
                            <cdr-button @click="copyNPCAsMarkdown">
                                Copy as Homebrewery Markdown
                            </cdr-button>
                        </div>
                    </div>

                    <!-- Homebrewery Link Message -->
                    <div v-if="showHomebreweryLink" class="homebrewery-link-message">
                        <p>
                            Markdown copied! Paste it into
                            <a href="https://homebrewery.naturalcrit.com/new" target="_blank">Homebrewery</a>
                            to format your NPC.
                        </p>
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

                        <!-- Statblock Limit Message -->
                        <div v-if="statblockLimitReached" class="statblock-limit-message">
                            <p><strong>Statblock generation limit reached</strong></p>
                            <p>You've reached your daily statblock generation limit (5 per 24 hours). Unlock unlimited access below.</p>
                        </div>

                        <SaveStatblock v-if="statblock" :monster="statblock"
                            :statblockLink="premium ? 'https://cros.land/ai-powered-dnd-5e-monster-statblock-generator-premium/' : 'https://cros.land/ai-powered-dnd-5e-monster-statblock-generator/'" />
                    </div>
                </div>
                <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
            </div>

            <!-- Footer below NPC content (separate card) -->
            <div class="footer-meta" v-if="npcDescriptionPart1 && !loadingPart1">
                <!-- Free users: Show message + unlock button -->
                <div v-if="!premium">
                    <p>
                        NPC generation is unlimited. Combat statblocks are limited to 5 per 24 hours. NPC data is
                        saved on this browser. To save/load NPC data for use in another computer or browser requires
                        a premium Patreon subscription.
                    </p>
                    <div class="patreon-universal-button">
                        <a :href="patreonLoginUrl">
                            <div class="patreon-responsive-button-wrapper">
                                <div class="patreon-responsive-button">
                                    <img class="patreon_logo"
                                        src="https://cros.land/wp-content/plugins/patreon-connect/assets/img/patreon-logomark-on-coral.svg"
                                        alt="Unlock with Patreon"> Unlock with Patreon
                                </div>
                            </div>
                        </a>
                    </div>
                </div>

                <!-- Premium users: Show save/load button -->
                <div v-else>
                    <p>
                        All features unlimited. NPC data is saved on this browser. Export to a file to use on another
                        device.
                    </p>
                    <cdr-button modifier="dark" @click="showDataManagerModal = true">
                        Save/Load Data from a File
                    </cdr-button>
                </div>
            </div>
        </div>
    </GeneratorLayout>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { CdrButton, CdrLink, CdrCheckbox, CdrSelect, CdrSkeleton, CdrSkeletonBone, CdrInput } from '@rei/cedar';
import { useToast } from '@/composables/useToast';
import GeneratorLayout from '@/components/GeneratorLayout.vue';
import Statblock from '@/components/Statblock.vue';
import SaveStatblock from '@/components/SaveStatblock.vue';
import DataManagerModal from '@/components/DataManagerModal.vue';
import { generateGptResponse } from "@/util/open-ai.mjs";
import { createStatblockPrompts } from "@/prompts/monster-prompts.mjs";
import { requestNPCDescription } from "./utils/request-npc-description.mjs";
import { convertNPCToMarkdown, convertNPCToPlainText } from '@/util/convertToMarkdown.mjs';
import challengeRatingData from '@/data/challengeRatings.json';
import { canGenerateStatblock } from "@/util/can-generate-statblock.mjs";
import '@rei/cedar/dist/cdr-fonts.css';
import '@rei/cedar/dist/reset.css';
import '@rei/cedar/dist/style/cdr-text.css';
import '@rei/cedar/dist/style/cdr-link.css';
import '@rei/cedar/dist/style/cdr-list.css';
import '@rei/cedar/dist/style/cdr-skeleton.css';
import '@rei/cedar/dist/style/cdr-skeleton-bone.css';
import '@rei/cedar/dist/style/cdr-input.css';

const toast = useToast();

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
const statblockLimitReached = ref(false);

const props = defineProps({
    premium: {
        type: Boolean,
        default: false
    }
});

const patreonLoginUrl = computed(() => {
    const returnUrl = encodeURIComponent(window.location.href);
    return `https://cros.land/patreon-flow/?patreon-login=yes&patreon-final-redirect=${returnUrl}`;
});

// Sidebar responsive
const showDataManagerModal = ref(false);
const showHomebreweryLink = ref(false);

// Inline editing
const isEditingNPC = ref(false);
const npcEditForm = ref({
    character_name: '',
    read_aloud_description: '',
    combined_details: '',
    relationshipsArray: []
});

onMounted(() => {
    loadNPCsFromLocalStorage();
    // Listen for localStorage changes from other tabs
    window.addEventListener('storage', handleStorageChange);
});

onUnmounted(() => {
    window.removeEventListener('storage', handleStorageChange);
});

// Handle storage changes from other tabs
function handleStorageChange(e) {
    // When another tab changes the statblock counter, sync our state
    if (e.key === 'monsters') {
        try {
            const monsters = JSON.parse(e.newValue);
            const generationCount = parseInt(monsters?.generationCount) || 0;

            // If count was reset (less than 5), clear the limit flag
            if (generationCount < 5 && statblockLimitReached.value) {
                statblockLimitReached.value = false;
            }
        } catch (err) {
            // Ignore parse errors
        }
    }
}

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

    if (currentNPCIndex.value === null || currentNPCIndex.value >= npcs.value.length) {
        npcs.value.push(npcData);
        currentNPCIndex.value = npcs.value.length - 1;
    } else {
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
    if (isEditingNPC.value) {
        isEditingNPC.value = false;
    }

    npcDescriptionPart1.value = null;
    npcDescriptionPart2.value = null;
    typeOfPlace.value = '';
    errorMessage.value = '';
    loadingPart1.value = false;
    loadingPart2.value = false;
    statblock.value = null;
    selectedChallengeRating.value = '1';
    isSpellcaster.value = false;
    showHomebreweryLink.value = false;
    currentNPCIndex.value = npcs.value.length;
}

function selectNPC(index) {
    if (isEditingNPC.value) {
        isEditingNPC.value = false;
    }

    if (npcDescriptionPart1.value) {
        saveCurrentNPCToList();
    }
    showHomebreweryLink.value = false;
    loadNPCIntoView(index);
}

function deleteCurrentNPC() {
    if (confirm('Are you sure you want to delete this NPC?')) {
        if (currentNPCIndex.value < npcs.value.length) {
            npcs.value.splice(currentNPCIndex.value, 1);
            saveNPCsToLocalStorage();
            toast.success('NPC deleted.');

            if (npcs.value.length > 0) {
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
        toast.success('All NPCs deleted.');
    }
}

// Inline editing functions
function startEditingNPC() {
    const relationshipsArray = npcDescriptionPart2.value?.relationships
        ? Object.entries(npcDescriptionPart2.value.relationships).map(([name, description]) => ({
            name,
            description
        }))
        : [];

    npcEditForm.value = {
        character_name: npcDescriptionPart1.value.character_name || '',
        read_aloud_description: npcDescriptionPart1.value.read_aloud_description || '',
        combined_details: npcDescriptionPart1.value.combined_details || combineNPCDetails(npcDescriptionPart1.value),
        relationshipsArray: relationshipsArray
    };

    isEditingNPC.value = true;
}

function cancelEditNPC() {
    isEditingNPC.value = false;
}

function saveEditNPC() {
    npcDescriptionPart1.value.character_name = npcEditForm.value.character_name;
    npcDescriptionPart1.value.read_aloud_description = npcEditForm.value.read_aloud_description;
    npcDescriptionPart1.value.combined_details = npcEditForm.value.combined_details;

    const relationshipsObject = {};
    npcEditForm.value.relationshipsArray.forEach(rel => {
        if (rel.name && rel.description) {
            relationshipsObject[rel.name] = rel.description;
        }
    });

    if (!npcDescriptionPart2.value) {
        npcDescriptionPart2.value = {};
    }
    npcDescriptionPart2.value.relationships = relationshipsObject;

    saveCurrentNPCToList();

    isEditingNPC.value = false;
}

function deleteRelationship(relationshipIndex) {
    npcEditForm.value.relationshipsArray.splice(relationshipIndex, 1);
}

// Copy functions
async function copyNPCAsMarkdown() {
    if (!npcDescriptionPart1.value) {
        toast.warning('No NPC to copy.');
        return;
    }

    const npcData = {
        character_name: npcDescriptionPart1.value.character_name,
        read_aloud_description: npcDescriptionPart1.value.read_aloud_description,
        combined_details: npcDescriptionPart1.value.combined_details,
        relationships: npcDescriptionPart2.value?.relationships || {},
        statblock: statblock.value || null
    };

    const markdown = convertNPCToMarkdown(npcData);

    try {
        await navigator.clipboard.writeText(markdown);
        showHomebreweryLink.value = true;
        toast.success('NPC copied to clipboard in Homebrewery format!');
    } catch {
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.textContent = markdown;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        showHomebreweryLink.value = true;
        toast.success('NPC copied to clipboard in Homebrewery format!');
    }
}

async function copyNPCAsPlainText() {
    if (!npcDescriptionPart1.value) {
        toast.warning('No NPC to copy.');
        return;
    }

    const npcData = {
        character_name: npcDescriptionPart1.value.character_name,
        read_aloud_description: npcDescriptionPart1.value.read_aloud_description,
        combined_details: npcDescriptionPart1.value.combined_details,
        relationships: npcDescriptionPart2.value?.relationships || {},
        statblock: statblock.value || null
    };

    const plainText = convertNPCToPlainText(npcData);

    try {
        await navigator.clipboard.writeText(plainText);
        toast.success('NPC copied as plain text!');
    } catch {
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.textContent = plainText;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        toast.success('NPC copied as plain text!');
    }
}

function updateStatblock(monster) {
    statblock.value = monster;
    saveCurrentNPCToList();
}

function setLoadingState({ part, isLoading }) {
    if (part === 1) {
        loadingPart1.value = isLoading;
    } else if (part === 2) {
        loadingPart2.value = isLoading;
    }
}

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
        npcDescription.combined_details = combineNPCDetails(npcDescription);
        npcDescriptionPart1.value = npcDescription;
        loadingPart1.value = false;
        saveCurrentNPCToList();
    } else if (part === 2) {
        npcDescriptionPart2.value = npcDescription;
        loadingPart2.value = false;
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
        {},
        false,
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
    statblockLimitReached.value = false;
    const canGenerate = await canGenerateStatblock(props.premium);

    if (!canGenerate) {
        statblockLimitReached.value = true;
        return;
    }

    // Only clear existing statblock if we're actually generating a new one
    statblock.value = null;
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

$sidebar-width: 350px;
$background-color: #f4f4f4;
$active-color: #ffffff;
$hover-background-color: #f0f0f0;
$default-background-color: #e0e0e0;
$active-border-color: #007BFF;

.sidebar-content {
    flex: 1;
    overflow-y: auto;
    padding: 1rem;
    display: flex;
    flex-direction: column;

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
                color: inherit;
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

/* ========================================
   LANDING PAGE: Three-zone layout
   ======================================== */

.landing-wrapper {
    max-width: 800px;
    margin: 0 auto;
}

/* ZONE 1: Hero header */
.hero-header {
    text-align: center;
    padding: 2rem 1rem 2.5rem;

    .brand-line {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.75rem;
        margin-bottom: 1rem;
    }

    .brand-name {
        font-size: 1.4rem;
        font-weight: 500;
        color: $cdr-color-text-secondary;
        letter-spacing: 0.02em;
    }

    .version-pill {
        display: inline-block;
        font-size: 1.1rem;
        font-weight: 600;
        padding: 0.2rem 0.8rem;
        border-radius: 100px;
        background-color: #ededed;
        color: $cdr-color-text-secondary;

        &.premium {
            background-color: #fdf3e0;
            color: #9c6a0a;
        }
    }

    h1 {
        font-size: 3.2rem;
        line-height: 1.15;
        margin: 0 0 0.75rem;
        color: $cdr-color-text-primary;
    }

    .value-prop {
        font-size: 1.6rem;
        font-weight: 400;
        color: $cdr-color-text-secondary;
        margin: 0;
    }
}

/* ZONE 2: Form card */
.form-card {
    background-color: #ffffff;
    border: 1px solid #e2e2e2;
    border-radius: 12px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
    padding: 2.5rem 3rem;

    form {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
        background-color: transparent;
        border-radius: 0;
        padding: 0;
        margin-bottom: 0;
    }

    .generate-button {
        align-self: flex-start;
    }
}

/* ZONE 3: Footer meta */
.footer-meta {
    text-align: center;
    margin-top: 1.5rem;
    padding: 1rem 1.5rem;
    background: #f9fafb;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    max-width: 940px;
    width: 100%;
    margin-left: auto;
    margin-right: auto;
    box-sizing: border-box;

    p {
        font-size: 1.4rem;
        color: #6b7280;
        margin: 0 0 1rem 0;
        line-height: 1.6;
    }

    .limit-info {
        font-size: 1.2rem;
        color: #6b7280;
        margin: 0;
        line-height: 1.6;
    }
}

/* ========================================
   PREMIUM INDICATOR
   ======================================== */

.premium-banner {
    font-size: 1.2rem;
    color: $cdr-color-text-secondary;
    background-color: #fdf8ef;
    border: 1px solid #f0e4cc;
    border-radius: 6px;
    padding: 0.75rem 1rem;
    margin-bottom: 1.5rem;
    text-align: center;
    line-height: 1.5;
}

/* ========================================
   NPC CONTENT (post-generation)
   ======================================== */

.main-content {
    @include cdr-text-body-400();
    color: $cdr-color-text-primary;
    max-width: 940px;
    width: 100%;
    margin: 20px auto;
    padding: 2px 30px 30px 30px;
}

.location-description {
    @include cdr-text-body-500();
    background-color: #ffffff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    margin-top: 20px;
    width: 100%;
    box-sizing: border-box;
}

hr {
    border: 1px solid $cdr-color-border-secondary;
    width: 80%;
    margin-top: 2rem;
    margin-bottom: 2rem;
}

.focus-text {
    background-color: $cdr-color-background-secondary;
    color: $cdr-color-text-secondary;
    padding: 1rem 2rem;
    font-style: italic;
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

.npc-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;

    h2 {
        margin: 0;
    }
}

.actions-row {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 1rem;
    flex-wrap: wrap;
}

.management-actions {
    display: flex;
    gap: 0.5rem;
}

.export-actions {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
}

.homebrewery-link-message {
    padding: 0.75rem 1rem;
    background: #f0fdf4;
    border: 1px solid #22c55e;
    border-radius: 6px;
    margin-top: 1rem;

    p {
        margin: 0;
        color: #14532d;
        font-size: 1.6rem;
    }

    a {
        color: #16a34a;
        font-weight: 600;
        text-decoration: underline;

        &:hover {
            color: #22c55e;
        }
    }
}

.edit-form {
    .edit-field {
        margin-bottom: 1.5rem;
    }

    h3 {
        margin-top: 2rem;
        margin-bottom: 1rem;
    }
}

.error-message {
    border: 1px solid $cdr-color-border-error;
    padding: $cdr-space-inset-one-x-stretch;
    color: $cdr-color-text-message-error;
    background-color: $cdr-color-background-message-error-01;
    text-align: center;
    margin-top: 16px;
}

.statblock-limit-message {
    text-align: center;
    margin-top: 1.5rem;
    padding: 1.5rem;
    background: #fdf8ef;
    border: 1px solid #f0e4cc;
    border-radius: 6px;

    p {
        font-size: 1.6rem;
        margin: 0 0 0.5rem 0;
        line-height: 1.5;

        &:last-of-type {
            margin-bottom: 0;
        }
    }
}

/* Patreon Button Overrides */
.patreon-universal-button {
    margin-top: 1rem;

    a {
        text-decoration: none;
    }

    .patreon-responsive-button-wrapper {
        border-radius: 6px;
        overflow: hidden;
    }

    .patreon-responsive-button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        padding: 0.75rem 1.5rem;
        background: #F96854;
        color: #fff;
        font-weight: 700;
        font-size: 1.2rem;
        font-variant: small-caps;
        text-decoration: none;
        border-radius: 6px;
        transition: all 0.2s ease;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        border: none;

        &:hover {
            background: #e63946;
            transform: translateY(-1px);
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
        }

        &:active {
            transform: translateY(0);
        }
    }

    .patreon_logo {
        width: 20px;
        height: 20px;
    }
}

/* Responsive */
@media (max-width: 768px) {
    .hero-header {
        padding: 1.5rem 0.5rem 2rem;

        h1 {
            font-size: 2.4rem;
        }
    }

    .form-card {
        padding: 1.5rem;
        border-radius: 8px;
    }
}
</style>