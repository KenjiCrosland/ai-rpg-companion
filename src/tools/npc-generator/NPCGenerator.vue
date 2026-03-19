<template>
    <GeneratorLayout :premium="premium">
        <template #sidebar>
            <div class="sidebar-content">
                <div class="sidebar-scroll">
                    <cdr-accordion-group>
                        <cdr-accordion level="3" v-for="(folder, folderName) in npcs" :key="folderName"
                            :id="folderName" :opened="openedFolders[folderName]"
                            @accordion-toggle="openedFolders[folderName] = !openedFolders[folderName]">
                            <template #label>
                                {{ folderName }}
                            </template>
                            <ul class="npc-list">
                                <li v-for="(npc, index) in folder" :key="index"
                                    :id="`npc-${folderName}-${index}`"
                                    :class="{ 'active-tab': currentNPCIndex === index && activeFolder === folderName }">
                                    <button class="npc-button" @click="selectNPC(folderName, index)">
                                        {{ npc.npcDescriptionPart1?.character_name || 'Unnamed NPC' }}
                                    </button>
                                </li>
                                <li>
                                    <button v-if="!loadingPart1" class="npc-button" @click="createNewNPC(folderName)"
                                        :class="{ 'active-tab': currentNPCIndex === null && activeFolder === folderName }">
                                        + New NPC
                                    </button>
                                </li>
                            </ul>
                        </cdr-accordion>
                    </cdr-accordion-group>
                </div>

                <div class="sidebar-buttons">
                    <cdr-button @click="deleteAllNPCs" v-if="Object.keys(npcs).length > 0 && !loadingPart1"
                        modifier="secondary" style="width: 100%;">
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
            <div id="npc-content-area" class="location-description"
                v-if="loadingPart1 || loadingPart2 || npcDescriptionPart1 || npcDescriptionPart2 || errorMessage">

                <div v-if="loadingPart1" class="npc-card">
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
                <!-- NPC Card (View/Edit Mode) -->
                <NPCCard
                    v-if="npcDescriptionPart1 && !loadingPart1 && npcDescriptionPart2"
                    :npc="normalizeGeneratorNPC(currentNPC)"
                    :origin="currentNPC?.typeOfPlace"
                    :source-type="currentNPC?.sourceType"
                    :npc-id="currentNPC?.npc_id || currentNPC?.id"
                    :is-editing="isEditingNPC"
                    :show-relationship-generator="true"
                    :is-generating-relationship="loadingNewRelationship"
                    :has-statblock="!!(npcDescriptionPart1.statblock_name)"
                    :statblock-url="statblockGeneratorUrl"
                    :editable="true"
                    :show-delete="true"
                    :show-npc-generator-link="false"
                    :show-origin-note="!!(currentNPC?.typeOfPlace && currentNPC.typeOfPlace !== 'Uncategorized')"
                    @start-edit="startEditingNPC"
                    @save-edit="handleSaveEdit($event)"
                    @cancel-edit="cancelEditNPC"
                    @delete="deleteCurrentNPC"
                    @generate-relationship="handleGenerateRelationship($event)"
                />

                <!-- Relationships Loading Skeleton -->
                <div v-if="npcDescriptionPart1 && !loadingPart1 && loadingPart2">
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

                <!-- Actions and Management (after NPC Card) -->
                <div v-if="npcDescriptionPart2 && !loadingPart2 && !isEditingNPC">

                    <!-- Actions Row -->
                    <div class="actions-row" style="margin-top: 2rem;">
                        <!-- Management Actions (Left) -->
                        <div class="management-actions">
                            <cdr-button @click="showFolderMover = !showFolderMover" modifier="secondary" size="small">
                                Move to Folder
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

                    <!-- Folder Mover Interface -->
                    <div v-if="showFolderMover" class="folder-mover" style="margin-top: 1.5rem; padding: 1.5rem; background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px;">
                        <h4 style="margin-top: 0; margin-bottom: 1rem;">Move NPC to Folder</h4>

                        <cdr-select v-model="folderMoveTarget" label="Destination folder" prompt="Select a folder" background="secondary" style="margin-bottom: 1rem;">
                            <option v-for="folder in folderOptions" :key="folder" :value="folder">{{ folder }}</option>
                            <option value="__new__">+ Create new folder</option>
                        </cdr-select>

                        <cdr-input v-if="folderMoveTarget === '__new__'" v-model="newFolderName" label="New folder name" background="secondary" style="margin-bottom: 1rem;" />

                        <div class="button-group" style="margin-top: 1rem;">
                            <cdr-button @click="handleFolderMove" :disabled="!folderMoveTarget || (folderMoveTarget === '__new__' && !newFolderName.trim())">
                                Move NPC
                            </cdr-button>
                            <cdr-button @click="showFolderMover = false; folderMoveTarget = ''; newFolderName = '';" modifier="secondary">
                                Cancel
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

                        <!-- Statblock Not Found Warning -->
                        <div v-if="npcDescriptionPart1?.statblock_name && !statblock && !loadingStatblockPart1 && !loadingStatblockPart2" class="statblock-not-found-message">
                            <p><strong>Statblock not found</strong></p>
                            <p>The statblock "{{ npcDescriptionPart1.statblock_name }}" was not found. It may have been deleted or renamed in the Statblock Generator.</p>
                            <div class="button-group">
                                <cdr-button @click="generateStatblock()" size="small">Regenerate Statblock</cdr-button>
                                <cdr-button @click="clearStatblockReference()" modifier="secondary" size="small">Clear Reference</cdr-button>
                            </div>
                        </div>

                        <Statblock v-if="(loadingStatblockPart1 || loadingStatblockPart1 || statblock)"
                            :loadingPart1="loadingStatblockPart1" :loadingPart2="loadingStatblockPart2"
                            :monster="statblock" :premium="premium" :copyButtons="true" :readonly="true"
                            @update-monster="updateStatblock" />

                        <!-- Statblock Limit Message -->
                        <div v-if="statblockLimitReached" class="statblock-limit-message">
                            <p><strong>Statblock generation limit reached</strong></p>
                            <p>You've reached your daily statblock generation limit (5 per 24 hours). Unlock unlimited access below.</p>
                        </div>

                        <!-- Statblock Saved Message -->
                        <div v-if="statblock && npcDescriptionPart1?.statblock_name" class="statblock-saved-message">
                            <p>
                                Edit this statblock in the
                                <a :href="statblockGeneratorUrl" target="_blank">Statblock Generator</a>
                            </p>
                        </div>
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
import { CdrButton, CdrLink, CdrCheckbox, CdrSelect, CdrSkeleton, CdrSkeletonBone, CdrInput, CdrAccordion, CdrAccordionGroup } from '@rei/cedar';
import { useToast } from '@/composables/useToast';
import GeneratorLayout from '@/components/GeneratorLayout.vue';
import NPCCard from '@/components/NPCCard.vue';
import Statblock from '@/components/Statblock.vue';
import DataManagerModal from '@/components/DataManagerModal.vue';
import { generateGptResponse } from "@/util/open-ai.mjs";
import { createStatblockPrompts } from "@/prompts/monster-prompts.mjs";
import { requestNPCDescription } from "./utils/request-npc-description.mjs";
import { convertNPCToMarkdown, convertNPCToPlainText } from '@/util/convertToMarkdown.mjs';
import challengeRatingData from '@/data/challengeRatings.json';
import { canGenerateStatblock } from "@/util/can-generate-statblock.mjs";
import { saveStatblockToStorage, getStatblockFromStorage } from '@/util/statblock-storage.mjs';
import { normalizeGeneratorNPC, migrateNPCIds, migrateSourceTypes } from '@/util/npc-storage.mjs';
import { generateSingleRelationshipPrompt } from './npc-prompts.mjs';
import '@rei/cedar/dist/cdr-fonts.css';
import '@rei/cedar/dist/reset.css';
import '@rei/cedar/dist/style/cdr-text.css';
import '@rei/cedar/dist/style/cdr-link.css';
import '@rei/cedar/dist/style/cdr-list.css';
import '@rei/cedar/dist/style/cdr-skeleton.css';
import '@rei/cedar/dist/style/cdr-skeleton-bone.css';
import '@rei/cedar/dist/style/cdr-input.css';
import '@rei/cedar/dist/style/cdr-accordion.css';
import '@rei/cedar/dist/style/cdr-accordion-group.css';

const toast = useToast();

// NPC list for sidebar - organized by folders
const npcs = ref({});
const currentNPCIndex = ref(null);
const activeFolder = ref('Uncategorized');
const openedFolders = ref({ 'Uncategorized': true });

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
const loadingNewRelationship = ref(false);

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

const statblockGeneratorUrl = computed(() => {
    const base = 'https://cros.land/ai-powered-dnd-5e-monster-statblock-generator/';

    const params = new URLSearchParams();
    if (npcDescriptionPart1.value?.statblock_name) {
        params.set('monster', npcDescriptionPart1.value.statblock_name);
    }
    if (npcDescriptionPart1.value?.statblock_folder) {
        params.set('folder', npcDescriptionPart1.value.statblock_folder);
    }

    const qs = params.toString();
    return qs ? `${base}?${qs}` : base;
});

// Folder options for moving NPCs (exclude current folder)
const folderOptions = computed(() => {
    return Object.keys(npcs.value).filter(folderName => folderName !== activeFolder.value);
});

// Current NPC being viewed
const currentNPC = computed(() => {
    const folderName = activeFolder.value || 'Uncategorized';
    const index = currentNPCIndex.value;
    if (index === null || !npcs.value[folderName]) return null;
    return npcs.value[folderName][index];
});

// Sidebar responsive
const showDataManagerModal = ref(false);
const showHomebreweryLink = ref(false);

// Inline editing
const isEditingNPC = ref(false);

// Folder management
const showFolderMover = ref(false);
const folderMoveTarget = ref('');
const newFolderName = ref('');

onMounted(async () => {
    loadNPCsFromLocalStorage();

    // Check for URL parameters to load specific NPC
    const urlParams = new URLSearchParams(window.location.search);
    const folder = urlParams.get('folder');
    const npcName = urlParams.get('npc_name');

    if (folder && npcName) {
        // Find the NPC in the specified folder
        const folderNPCs = npcs.value[folder];
        if (folderNPCs) {
            const npcIndex = folderNPCs.findIndex(npc =>
                npc.npcDescriptionPart1?.character_name === npcName
            );
            if (npcIndex !== -1) {
                // Open the folder accordion
                openedFolders.value[folder] = true;

                // Select the NPC
                selectNPC(folder, npcIndex);

                // Clean up URL params
                window.history.replaceState({}, '', window.location.pathname);
            }
        }
    }

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

            // Reload current NPC's statblock if it has a reference
            if (npcDescriptionPart1.value?.statblock_name && statblock.value) {
                const updatedStatblock = getStatblockFromStorage(
                    npcDescriptionPart1.value.statblock_name,
                    npcDescriptionPart1.value.statblock_folder
                );
                if (updatedStatblock) {
                    statblock.value = updatedStatblock;
                }
            }
        } catch (err) {
            // Ignore parse errors
        }
    }

    // When NPCs are updated in another tab (e.g., from statblock renames), reload them
    if (e.key === 'npcGeneratorNPCs' && e.newValue) {
        loadNPCsFromLocalStorage();
        if (currentNPCIndex.value !== null) {
            loadNPCIntoView(currentNPCIndex.value);
        }
    }
}

// Local Storage functions
function saveNPCsToLocalStorage() {
    localStorage.setItem('npcGeneratorNPCs', JSON.stringify(npcs.value));
}

function migrateNPCStorage() {
    const stored = localStorage.getItem('npcGeneratorNPCs');
    if (!stored) return;

    try {
        const parsed = JSON.parse(stored);

        // Check if it's the old flat array format
        if (Array.isArray(parsed)) {
            // Old flat format — migrate to folders
            const migrated = {
                'Uncategorized': parsed
            };
            localStorage.setItem('npcGeneratorNPCs', JSON.stringify(migrated));
            npcs.value = migrated;
        } else {
            // Already in folder format
            npcs.value = parsed;
        }
    } catch (error) {
        console.error('Failed to migrate NPCs from local storage:', error);
        // Initialize with empty folder structure if migration fails
        npcs.value = { 'Uncategorized': [] };
    }
}

function loadNPCsFromLocalStorage() {
    const stored = localStorage.getItem('npcGeneratorNPCs');
    if (stored) {
        try {
            const parsed = JSON.parse(stored);

            // Check if it's the old flat array format
            if (Array.isArray(parsed)) {
                // Migrate on load
                migrateNPCStorage();
            } else {
                // Already in folder format
                npcs.value = parsed;
            }

            // Migrate nested statblocks to shared storage
            migrateNestedStatblocks();

            // Migrate statblock references from top level to npcDescriptionPart1
            migrateStatblockReferences();

            // Migrate NPCs without IDs
            const migratedCount = migrateNPCIds();
            if (migratedCount > 0) {
                console.log(`Migrated ${migratedCount} NPCs to include unique IDs`);
            }

            // Migrate NPCs without sourceType
            const sourceTypeMigratedCount = migrateSourceTypes();
            if (sourceTypeMigratedCount > 0) {
                console.log(`Migrated ${sourceTypeMigratedCount} NPCs to include sourceType`);
            }

            // Reload NPCs after migration (if either migration ran)
            if (migratedCount > 0 || sourceTypeMigratedCount > 0) {
                const updatedStored = localStorage.getItem('npcGeneratorNPCs');
                if (updatedStored) {
                    npcs.value = JSON.parse(updatedStored);
                }
            }
        } catch (error) {
            console.error('Failed to parse NPCs from local storage:', error);
            npcs.value = { 'Uncategorized': [] };
        }
    } else {
        npcs.value = { 'Uncategorized': [] };
    }
}

function migrateNestedStatblocks() {
    let migrationNeeded = false;

    // Iterate through all folders
    for (const [folderName, npcList] of Object.entries(npcs.value)) {
        if (!Array.isArray(npcList)) continue;

        // Iterate through NPCs in this folder
        for (const npc of npcList) {
            // Check if NPC has a nested statblock but no statblock_name reference
            if (npc.statblock && npc.statblock.name && !npc.npcDescriptionPart1?.statblock_name) {
                // All NPC statblocks go to "NPC Statblocks" folder
                const statblockFolderName = 'NPC Statblocks';

                // Save to shared storage
                saveStatblockToStorage(npc.statblock, statblockFolderName);

                // Set the reference on the NPC
                if (!npc.npcDescriptionPart1) {
                    npc.npcDescriptionPart1 = {};
                }
                npc.npcDescriptionPart1.statblock_name = npc.statblock.name;
                npc.npcDescriptionPart1.statblock_folder = statblockFolderName;

                migrationNeeded = true;
            }
        }
    }

    // Save if any migrations occurred
    if (migrationNeeded) {
        saveNPCsToLocalStorage();
    }
}

function migrateStatblockReferences() {
    let migrationNeeded = false;

    // Iterate through all folders
    for (const [folderName, npcList] of Object.entries(npcs.value)) {
        if (!Array.isArray(npcList)) continue;

        // Iterate through NPCs in this folder
        for (const npc of npcList) {
            // Check if NPC has statblock references at top level instead of in npcDescriptionPart1
            if ((npc.statblock_name || npc.statblock_folder) && npc.npcDescriptionPart1) {
                // Move references into npcDescriptionPart1 if not already there
                if (!npc.npcDescriptionPart1.statblock_name && npc.statblock_name) {
                    npc.npcDescriptionPart1.statblock_name = npc.statblock_name;
                    delete npc.statblock_name;
                    migrationNeeded = true;
                }
                if (!npc.npcDescriptionPart1.statblock_folder && npc.statblock_folder) {
                    npc.npcDescriptionPart1.statblock_folder = npc.statblock_folder;
                    delete npc.statblock_folder;
                    migrationNeeded = true;
                }
            }
        }
    }

    // Save if any migrations occurred
    if (migrationNeeded) {
        saveNPCsToLocalStorage();
    }
}

// Save current NPC to the list
function saveCurrentNPCToList() {
    const folderName = activeFolder.value || 'Uncategorized';

    // Ensure folder exists
    if (!npcs.value[folderName]) {
        npcs.value[folderName] = [];
    }

    // Preserve existing npc_id if updating an existing NPC
    let existingNpcId = null;
    if (currentNPCIndex.value !== null && currentNPCIndex.value < npcs.value[folderName].length) {
        existingNpcId = npcs.value[folderName][currentNPCIndex.value]?.npc_id;
    }

    const npcData = {
        npcDescriptionPart1: npcDescriptionPart1.value,
        npcDescriptionPart2: npcDescriptionPart2.value,
        typeOfPlace: typeOfPlace.value,
        // statblock_name is stored on npcDescriptionPart1, not as a separate field
        // statblock is kept in memory for the current session but not saved to localStorage
        selectedChallengeRating: selectedChallengeRating.value,
        isSpellcaster: isSpellcaster.value
    };

    // CRITICAL: Preserve npc_id to maintain reference integrity with dungeon/setting generators
    if (existingNpcId) {
        npcData.npc_id = existingNpcId;
    }

    // Add or update NPC in current folder
    if (currentNPCIndex.value === null || currentNPCIndex.value >= npcs.value[folderName].length) {
        npcs.value[folderName].push(npcData);
        currentNPCIndex.value = npcs.value[folderName].length - 1;
    } else {
        npcs.value[folderName][currentNPCIndex.value] = npcData;
    }

    saveNPCsToLocalStorage();
}

// Load an NPC from the list into the current view
function loadNPCIntoView(folderName, index) {
    const folder = npcs.value[folderName];
    if (folder && folder[index]) {
        const npc = folder[index];
        npcDescriptionPart1.value = npc.npcDescriptionPart1 || null;
        npcDescriptionPart2.value = npc.npcDescriptionPart2 || null;
        typeOfPlace.value = npc.typeOfPlace || '';

        // Resolve statblock reference from shared storage
        if (npc.npcDescriptionPart1?.statblock_name) {
            statblock.value = getStatblockFromStorage(
                npc.npcDescriptionPart1.statblock_name,
                npc.npcDescriptionPart1.statblock_folder
            );
        } else if (npc.statblock) {
            // Support legacy NPCs that have statblock embedded
            statblock.value = npc.statblock;
        } else {
            statblock.value = null;
        }

        selectedChallengeRating.value = npc.selectedChallengeRating || '1';
        isSpellcaster.value = npc.isSpellcaster || false;
        activeFolder.value = folderName;
        currentNPCIndex.value = index;
    }
}

// NPC Management functions
function createNewNPC(folderName = 'Uncategorized') {
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
    activeFolder.value = folderName;
    currentNPCIndex.value = null;
}

function selectNPC(folderName, index) {
    if (isEditingNPC.value) {
        isEditingNPC.value = false;
    }

    if (npcDescriptionPart1.value) {
        saveCurrentNPCToList();
    }
    showHomebreweryLink.value = false;
    loadNPCIntoView(folderName, index);
}

function deleteCurrentNPC() {
    const folderName = activeFolder.value || 'Uncategorized';
    const npcName = npcs.value[folderName]?.[currentNPCIndex.value]?.npcDescriptionPart1?.character_name || 'this NPC';

    if (confirm(`Are you sure you want to delete ${npcName}?`)) {
        if (npcs.value[folderName] && currentNPCIndex.value < npcs.value[folderName].length) {
            npcs.value[folderName].splice(currentNPCIndex.value, 1);

            // Clean up empty folders (except Uncategorized)
            if (npcs.value[folderName].length === 0 && folderName !== 'Uncategorized') {
                delete npcs.value[folderName];
                activeFolder.value = 'Uncategorized';
                openedFolders.value['Uncategorized'] = true;
            }

            saveNPCsToLocalStorage();
            toast.success('NPC deleted.');

            // Load next NPC or create new one
            if (npcs.value[activeFolder.value] && npcs.value[activeFolder.value].length > 0) {
                const newIndex = Math.max(0, Math.min(currentNPCIndex.value, npcs.value[activeFolder.value].length - 1));
                loadNPCIntoView(activeFolder.value, newIndex);
            } else {
                createNewNPC();
            }
        }
    }
}

function deleteAllNPCs() {
    if (confirm('Are you sure you want to delete all NPCs? This cannot be undone.')) {
        npcs.value = { 'Uncategorized': [] };
        createNewNPC();
        saveNPCsToLocalStorage();
        toast.success('All NPCs deleted.');
    }
}

// Folder management
function handleFolderMove() {
    if (!folderMoveTarget.value) {
        toast.warning('Please select a folder.');
        return;
    }

    let targetFolder = folderMoveTarget.value;

    // If creating a new folder, validate name
    if (targetFolder === '__new__') {
        if (!newFolderName.value.trim()) {
            toast.warning('Please enter a folder name.');
            return;
        }
        targetFolder = newFolderName.value.trim();
    }

    const sourceFolderName = activeFolder.value;
    const npcIndex = currentNPCIndex.value;

    if (!npcs.value[sourceFolderName] || npcIndex === null || npcIndex >= npcs.value[sourceFolderName].length) {
        toast.warning('No NPC to move.');
        return;
    }

    // Get the NPC data
    const npcData = npcs.value[sourceFolderName][npcIndex];

    // Create target folder if it doesn't exist
    if (!npcs.value[targetFolder]) {
        npcs.value[targetFolder] = [];
    }

    // Add NPC to target folder
    npcs.value[targetFolder].push(npcData);
    const newIndex = npcs.value[targetFolder].length - 1;

    // Remove NPC from source folder
    npcs.value[sourceFolderName].splice(npcIndex, 1);

    // Clean up empty folders (except Uncategorized)
    if (npcs.value[sourceFolderName].length === 0 && sourceFolderName !== 'Uncategorized') {
        delete npcs.value[sourceFolderName];
    }

    // Update active folder and index
    activeFolder.value = targetFolder;
    currentNPCIndex.value = newIndex;

    // Ensure target folder is opened
    openedFolders.value[targetFolder] = true;

    // Save to localStorage
    saveNPCsToLocalStorage();

    // Reset folder mover UI
    showFolderMover.value = false;
    folderMoveTarget.value = '';
    newFolderName.value = '';

    toast.success(`NPC moved to ${targetFolder}.`);
}

// Inline editing functions
function startEditingNPC() {
    isEditingNPC.value = true;
}

function cancelEditNPC() {
    isEditingNPC.value = false;
}

function handleSaveEdit(editedData) {
    npcDescriptionPart1.value.character_name = editedData.name;
    npcDescriptionPart1.value.read_aloud_description = editedData.read_aloud_description;
    npcDescriptionPart1.value.combined_details = editedData.combined_details;

    if (!npcDescriptionPart2.value) {
        npcDescriptionPart2.value = {};
    }
    npcDescriptionPart2.value.relationships = editedData.relationships;

    saveCurrentNPCToList();

    isEditingNPC.value = false;
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

        // Auto-save statblock to shared storage (all NPC statblocks go to "NPC Statblocks" folder)
        const folderName = 'NPC Statblocks';

        saveStatblockToStorage(finalStatblock, folderName);

        // Store reference to statblock on NPC instead of full object
        if (npcDescriptionPart1.value) {
            npcDescriptionPart1.value.statblock_name = finalStatblock.name;
            npcDescriptionPart1.value.statblock_folder = folderName;
        }

        toast.success(`${finalStatblock.name} saved to your statblocks`);

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

function singleRelationshipValidation(jsonString) {
    try {
        const jsonObj = JSON.parse(jsonString);
        const keys = ['name', 'relationship'];
        return keys.every((key) => key in jsonObj);
    } catch (error) {
        return false;
    }
}

async function handleGenerateRelationship(relationshipData) {
    if (!relationshipData.name || !relationshipData.description) {
        toast.warning('Please provide both a name and description for the relationship');
        return;
    }

    if (!npcDescriptionPart1.value) {
        toast.warning('No NPC to generate relationship for');
        return;
    }

    // Build NPC description for context
    const npcDescription = `
NAME: ${npcDescriptionPart1.value.character_name}

APPEARANCE: ${npcDescriptionPart1.value.read_aloud_description || 'Not specified'}

ROLE: ${npcDescriptionPart1.value.description_of_position || 'Unknown'}

REASON FOR BEING THERE: ${npcDescriptionPart1.value.reason_for_being_there || 'Unknown'}

DISTINCTIVE TRAITS: ${npcDescriptionPart1.value.distinctive_feature_or_mannerism || 'None noted'}

SECRET: ${npcDescriptionPart1.value.character_secret || 'None'}

ROLEPLAYING TIPS: ${npcDescriptionPart1.value.roleplaying_tips || 'None'}
`.trim();

    try {
        loadingNewRelationship.value = true;

        const prompt = generateSingleRelationshipPrompt(
            npcDescription,
            relationshipData.name,
            relationshipData.description
        );

        const response = await generateGptResponse(prompt, singleRelationshipValidation);
        const generatedRelationship = JSON.parse(response);

        // Add relationship to NPC
        if (!npcDescriptionPart2.value) {
            npcDescriptionPart2.value = { relationships: {} };
        }
        if (!npcDescriptionPart2.value.relationships) {
            npcDescriptionPart2.value.relationships = {};
        }

        npcDescriptionPart2.value.relationships[generatedRelationship.name] = generatedRelationship.relationship;

        // Save to localStorage
        saveCurrentNPCToList();

        toast.success(`Relationship with ${generatedRelationship.name} added!`);
    } catch (error) {
        console.error('Error generating relationship:', error);
        toast.error('Failed to generate relationship. Please try again.');
    } finally {
        loadingNewRelationship.value = false;
    }
}

function clearStatblockReference() {
    if (npcDescriptionPart1.value) {
        delete npcDescriptionPart1.value.statblock_name;
        delete npcDescriptionPart1.value.statblock_folder;
        statblock.value = null;
        saveCurrentNPCToList();
        toast.success('Statblock reference cleared');
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

.statblock-saved-message {
    margin-top: 1.5rem;
    padding: 1rem 1.5rem;
    background: #f0fdf4;
    border: 1px solid #22c55e;
    border-radius: 6px;

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

.statblock-not-found-message {
    margin-top: 1.5rem;
    padding: 1.5rem;
    background: #fef2f2;
    border: 1px solid #ef4444;
    border-radius: 6px;

    p {
        margin: 0 0 0.5rem 0;
        color: #7f1d1d;
        font-size: 1.6rem;

        &:last-of-type {
            margin-bottom: 1rem;
        }

        strong {
            color: #991b1b;
        }
    }

    .button-group {
        display: flex;
        gap: 1rem;
        margin-top: 1rem;
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