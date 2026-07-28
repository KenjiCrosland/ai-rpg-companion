<template>
    <GeneratorLayout :premium="premium" :flexible-sidebar="true" :show-footer="false">
        <template #sidebar>
            <div class="sidebar-content parchment">
                <div class="sidebar-scroll">
                    <ParAccordionGroup>
                        <ParAccordion
                            v-for="(folder, folderName) in npcs"
                            :key="folderName"
                            :id="`npc-folder-${folderName}`"
                            :label="folderName"
                            :count="folder.length"
                            :level="3"
                            :content-spacing="false"
                            :opened="!!openedFolders[folderName]"
                            @accordion-toggle="openedFolders[folderName] = !openedFolders[folderName]"
                        >
                            <ul class="npc-list">
                                <li v-for="(npc, index) in folder" :key="index"
                                    class="npc-row"
                                    :class="{ 'npc-row--active': currentNPCIndex === index && activeFolder === folderName }">
                                    <button class="npc-row__button" @click="selectNPC(folderName, index)">
                                        {{ npc.npcDescriptionPart1?.character_name || 'Unnamed NPC' }}
                                    </button>
                                </li>
                                <li class="npc-row">
                                    <button v-if="!loadingPart1"
                                        class="npc-row__button npc-row__new"
                                        :class="{ 'npc-row__new--active': currentNPCIndex === null && activeFolder === folderName }"
                                        @click="createNewNPC(folderName)">
                                        + New NPC
                                    </button>
                                </li>
                            </ul>
                        </ParAccordion>
                    </ParAccordionGroup>
                </div>

                <SidebarFooter
                    new-label="+ New NPC"
                    data-description="Save your library to a file or restore from a backup. Your data stays on your device."
                    backup-label="Backup / Restore library"
                    delete-all-label="Delete all NPCs"
                    confirm-title="Delete all NPCs?"
                    confirm-body="This will permanently delete every saved NPC in your library. This action cannot be undone."
                    confirm-suggestion="Consider backing up your library first if you might want to restore these later."
                    confirm-cta="Delete all NPCs"
                    @new="createNewNPC(activeFolder)"
                    @open-data-manager="showDataManagerModal = true"
                    @delete-all="deleteAllNPCs"
                />
            </div>
        </template>

        <!-- Data Manager Modal -->
        <DataManagerModal :opened="showDataManagerModal" @update:opened="showDataManagerModal = $event"
            :premium="premium" currentApp="npcGeneratorNPCs" />

        <div class="main-content">
            <!-- LANDING STATE: Three-zone layout -->
            <div class="landing-wrapper" v-if="!npcDescriptionPart1 && !loadingPart1">

                <!-- ZONE 1: Hero header (lapis editorial register) -->
                <div class="hero-header parchment">
                    <div class="brand-line">
                        <span class="brand-name">Kenji's NPC Generator</span>
                        <!-- Version pill is fresh-visit framing — suppressed
                             during seeded flows where the user is mid-task. -->
                        <VersionBadge v-if="!isSeededFlow" :premium="premium" />
                    </div>
                    <template v-if="isSeededFlow">
                        <h1 class="page-heading__title">Create NPC: {{ seedStubName }}</h1>
                        <p class="page-heading__tagline">
                            From your {{ seedSourceType }}
                            <a href="#" class="seed-source-link" @click.prevent="navigateBackToSeedSource">{{
                                seedSourceName }}</a>
                        </p>
                    </template>
                    <template v-else>
                        <h1 class="page-heading__title">Bring your world to life with detailed NPCs</h1>
                        <p class="page-heading__tagline">Generate memorable characters with backstories, relationships,
                            and combat statblocks — ready for any session.</p>
                    </template>
                </div>

                <!-- ZONE 2: Form card — lifted cream surface, lapis "magic UI" -->
                <div class="form-card parchment paper-grain">
                    <SeededFromBanner
                        :source-type="seedSourceType"
                        :source-name="seedSourceName"
                    />
                    <form @submit.prevent="handleGenerateNPC">
                        <ParField label="Give me an NPC description for" :optional="true"
                            :hint="!isSeededFlow ? 'Examples: a notable tavern patron, a drunken ronin, a sentient gazebo named Gary, a cyberpunk hacker losing themselves to the implants, a goblin named Boblin' : ''">
                            <ParInput id="typeOfNPC" v-model="typeOfPlace"
                                placeholder="A scheming guildmaster, or leave blank for a surprise" />
                        </ParField>

                        <StatblockFuzzySearch v-model="selectedStatblock" label="Associated Statblock"
                            placeholder="Search for a statblock..." :optional="true" :highlight-on-mount="isDeepLink" />

                        <!-- TEST-REGISTER-OVERRIDE — dev only -->
                        <fieldset v-if="isDev" class="test-register-override">
                            <legend>TEST: Register Override (dev only)</legend>
                            <label>
                                Register:
                                <select v-model="testRegisterOverride">
                                    <option value="">Auto (use inference / random)</option>
                                    <option v-for="opt in registerOverrideOptions" :key="opt.value" :value="opt.value">
                                        {{ opt.label }}
                                    </option>
                                </select>
                            </label>
                            <p v-if="lastUsedRegister" class="test-register-override__last">
                                Last generation used: <code>{{ lastUsedRegister }}</code>
                            </p>
                        </fieldset>
                        <!-- END TEST-REGISTER-OVERRIDE -->

                        <ParButton type="submit" :disabled="loadingPart1" :full-width="true"
                            class="generate-button" data-testid="generate-npc">Generate NPC</ParButton>
                    </form>
                </div>

                <!-- ZONE 3: Footer meta -->
                <!-- Orientation paragraphs ("NPC generation is unlimited…",
                     "All features unlimited…") describe the tool to first-
                     time visitors. In a seeded flow the user is mid-task and
                     doesn't need that framing. The persistent affordances
                     (Patreon CTA for free users, Save/Load for premium) stay
                     available regardless. -->
                <!-- Free users only — premium's backup/restore lives in the
                     sidebar footer's Data options. -->
                <div class="footer-meta" v-if="!premium">
                    <PatreonCallout :patreon-url="patreonLoginUrl" location="npc-footer">
                        <template #body>
                            <p class="patreon-callout__body">Your work is saved to this browser only. Premium syncs
                                across devices and unlocks unlimited combat statblock generation for your NPCs.</p>
                        </template>
                        <template #features>
                            <li>Cross-device save and load — your NPCs sync between browsers and devices.</li>
                            <li>Unlimited combat statblock generation — no daily cap.</li>
                            <li>
                                <a :href="patreonTiersUrl" target="_blank" rel="noopener">See all premium tiers and
                                    benefits on Patreon</a><span aria-hidden="true"> →</span>
                            </li>
                        </template>
                    </PatreonCallout>
                </div>
            </div>

            <!-- NPC Content (shown when NPC is loaded or loading) -->
            <div id="npc-content-area" class="location-description paper-grain" data-testid="npc-output"
                v-if="loadingPart1 || loadingPart2 || npcDescriptionPart1 || npcDescriptionPart2 || errorMessage">

                <!-- NPC Card (always shown when loading or data exists) -->
                <NPCCard v-if="loadingPart1 || npcDescriptionPart1" :npc="normalizeGeneratorNPC(currentNPC)"
                    :origin="computedOrigin" :source-type="computedSourceType" :source-name="computedSourceName"
                    :source-id="computedSourceId" :npc-id="currentNPC?.npc_id" :is-editing="isEditingNPC"
                    :show-relationship-generator="true" :is-generating-relationship="loadingNewRelationship"
                    :has-statblock="!!(npcDescriptionPart1?.statblock_name)" :editable="true" :show-delete="true"
                    :show-npc-generator-link="false" :show-move-to-folder="!!(npcDescriptionPart2 && !loadingPart2)"
                    :show-export="!!(npcDescriptionPart2 && !loadingPart2)" :export-open="showExport"
                    :show-origin-note="!!(currentNPC?.typeOfPlace && currentNPC.typeOfPlace !== 'Uncategorized')"
                    :loading-description="loadingPart1" :loading-relationships="loadingPart2 || loadingPart1"
                    @start-edit="startEditingNPC" @save-edit="handleSaveEdit($event)" @cancel-edit="cancelEditNPC"
                    @delete="deleteCurrentNPC" @generate-relationship="handleGenerateRelationship($event)"
                    @move-to-folder="showFolderMover = !showFolderMover" @toggle-export="showExport = !showExport" />

                <!-- Below-card panels (folder mover, export, homebrewery link) -->
                <div v-if="npcDescriptionPart2 && !loadingPart2 && !isEditingNPC">

                    <!-- Folder Mover Interface -->
                    <div v-if="showFolderMover" class="npc-folder-mover parchment">
                        <h4 class="npc-folder-mover__heading">Move NPC to folder</h4>

                        <div class="npc-folder-mover__row">
                            <ParField label="Destination folder" class="npc-folder-mover__field">
                                <ParSelect v-model="folderMoveTarget" :options="folderMoveSelectOptions"
                                    placeholder="Select a folder" />
                            </ParField>
                            <ParField v-if="folderMoveTarget === '__new__'" label="New folder name"
                                class="npc-folder-mover__field">
                                <ParInput v-model="newFolderName" placeholder="e.g., Villains" />
                            </ParField>
                        </div>

                        <div class="npc-folder-mover__actions">
                            <ParButton variant="primary" @click="handleFolderMove"
                                :disabled="!folderMoveTarget || (folderMoveTarget === '__new__' && !newFolderName.trim())">
                                Move NPC
                            </ParButton>
                            <ParButton variant="secondary-filled"
                                @click="showFolderMover = false; folderMoveTarget = ''; newFolderName = '';">
                                Cancel
                            </ParButton>
                        </div>
                    </div>

                    <!-- Export Panel — toggled from the NPC Card footer's Export button.
                         Mirrors the Item Generator's export-section pattern. -->
                    <ItemExportsSection v-if="showExport" heading="Export NPC">
                        <template #description>
                            Copy your NPC details. Markdown works with
                            <cdr-link href="https://homebrewery.naturalcrit.com" target="_blank">Homebrewery</cdr-link>
                            for handouts.
                        </template>
                        <template #buttons>
                            <ParButton @click="copyNPCAsPlainText" variant="secondary">
                                Copy as plain text
                            </ParButton>
                            <ParButton @click="copyNPCAsMarkdown">
                                Copy as Homebrewery Markdown
                            </ParButton>
                        </template>
                    </ItemExportsSection>

                    <!-- Homebrewery Link Message -->
                    <div v-if="showHomebreweryLink" class="homebrewery-link-message">
                        <p>
                            Markdown copied! Paste it into
                            <a href="https://homebrewery.naturalcrit.com/new" target="_blank">Homebrewery</a>
                            to format your NPC.
                        </p>
                    </div>
                </div>
                <div v-if="npcDescriptionPart2 && !loadingPart2" class="npc-statblock parchment">
                    <h3 v-if="npcDescriptionPart1.statblock_name" class="npc-statblock__heading">Associated statblock</h3>
                    <div>
                        <!-- Generate or Attach Statblock (only show if no statblock attached) -->
                        <div v-if="!npcDescriptionPart1.statblock_name" class="npc-statblock__form parchment">
                            <div class="npc-statblock__header">
                                <h3 class="npc-statblock__heading npc-statblock__heading--inset">
                                    Generate a D&D 5e statblock for {{ npcDescriptionPart1.character_name }}
                                </h3>
                                <ParSwitch v-model="rulesIs2024" data-testid="rules-switch"
                                    off-label="2014 rules" on-label="2024 rules" aria-label="Use 2024 rules" />
                            </div>
                            <div class="npc-statblock__fields">
                                <ParField label="Challenge rating" class="npc-statblock__cr">
                                    <ParSelect v-model="selectedChallengeRating"
                                        :options="challengeRatingData.fullArray" placeholder="CR" />
                                </ParField>
                                <ParCheckbox v-model="isSpellcaster" class="npc-statblock__caster">
                                    NPC is a spellcaster
                                </ParCheckbox>
                            </div>

                            <div class="npc-statblock__actions">
                                <ParButton variant="primary" @click="generateStatblock()">Generate statblock</ParButton>
                                <ParButton variant="secondary-filled" @click="showAttachStatblockModal = true">
                                    Attach statblock
                                </ParButton>
                            </div>
                        </div>

                        <!-- Attach Statblock Modal (inline) -->
                        <div v-if="showAttachStatblockModal" class="attach-statblock-modal parchment">
                            <StatblockFuzzySearch v-model="attachStatblockSelection"
                                label="Select a Statblock to Attach" placeholder="Search for a statblock..."
                                :optional="false" />
                            <div class="npc-statblock__actions">
                                <ParButton variant="primary" @click="confirmAttachStatblock"
                                    :disabled="!attachStatblockSelection">
                                    Attach
                                </ParButton>
                                <ParButton variant="secondary-filled" @click="cancelAttachStatblock">Cancel
                                </ParButton>
                            </div>
                        </div>

                        <!-- Statblock Not Found Warning -->
                        <div v-if="npcDescriptionPart1?.statblock_name && !statblock && !loadingStatblockPart1 && !loadingStatblockPart2"
                            class="statblock-not-found-message">
                            <p><strong>Statblock not found</strong></p>
                            <p>The statblock "{{ npcDescriptionPart1.statblock_name }}" was not found. It may have been
                                deleted
                                or renamed in the Statblock Generator.</p>
                            <div class="button-group">
                                <ParButton @click="generateStatblock()" size="small">Regenerate Statblock
                                </ParButton>
                                <ParButton @click="clearStatblockReference()" variant="secondary" size="small">
                                    Clear
                                    Reference</ParButton>
                            </div>
                        </div>

                        <Statblock2024
                            v-if="statblock?.format === '2024' || (rulesIs2024 && !statblock && (loadingStatblockPart1 || loadingStatblockPart2))"
                            :monster="statblock" :premium="premium" :readonly="true"
                            :loading="loadingStatblockPart1 || loadingStatblockPart2" />
                        <Statblock v-else-if="(loadingStatblockPart1 || loadingStatblockPart2 || statblock)"
                            :loadingPart1="loadingStatblockPart1" :loadingPart2="loadingStatblockPart2"
                            :monster="statblock" :premium="premium" :copyButtons="true" :readonly="true"
                            @update-monster="updateStatblock" />

                        <!-- Statblock Limit Message -->
                        <div v-if="statblockLimitReached" class="statblock-limit-message">
                            <p><strong>Statblock generation limit reached</strong></p>
                            <p>You've reached your daily statblock generation limit (5 per 24 hours). Unlock unlimited
                                access
                                below.</p>
                        </div>

                        <!-- Statblock Saved Message -->
                        <!-- Show link for custom statblocks (or legacy NPCs without source field) -->
                        <div v-if="statblock && npcDescriptionPart1?.statblock_name && npcDescriptionPart1?.statblock_source !== 'srd'"
                            class="statblock-saved-message">
                            <p>
                                Edit this statblock in the
                                <a href="#" @click.prevent="openInStatblockGenerator">Statblock Generator</a>
                            </p>
                        </div>
                    </div>
                </div>
                <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
            </div>

            <!-- Footer below NPC content (separate card) -->
            <!-- Free users only — premium's backup/restore lives in the
                 sidebar footer's Data options. -->
            <div class="footer-meta" v-if="npcDescriptionPart1 && !loadingPart1 && !premium">
                <PatreonCallout :patreon-url="patreonLoginUrl" location="npc-footer">
                    <template #body>
                        <p class="patreon-callout__body">Your work is saved to this browser only. Premium syncs across
                            devices and unlocks unlimited combat statblock generation for your NPCs.</p>
                    </template>
                    <template #features>
                        <li>Cross-device save and load — your NPCs sync between browsers and devices.</li>
                        <li>Unlimited combat statblock generation — no daily cap.</li>
                        <li>
                            <a :href="patreonTiersUrl" target="_blank" rel="noopener">See all premium tiers and benefits
                                on Patreon</a><span aria-hidden="true"> →</span>
                        </li>
                    </template>
                </PatreonCallout>
            </div>
        </div>

        <ParConfirm
            :opened="pendingNPCDelete !== null"
            title="Delete this NPC?"
            confirm-label="Delete NPC"
            cancel-label="Cancel"
            :destructive="true"
            @confirm="performNPCDelete"
            @cancel="pendingNPCDelete = null"
        >
            <span style="white-space: pre-line;">{{ pendingNPCDelete?.message }}</span>
        </ParConfirm>
    </GeneratorLayout>
</template>

<script setup>
import { ParButton, ParAccordion, ParAccordionGroup, ParField, ParInput, ParSelect, ParCheckbox, ParConfirm, ParSwitch } from "@/parchment";
import { ref, computed, onMounted, onUnmounted, nextTick, watch } from 'vue';
import { CdrLink, CdrSkeleton, CdrSkeletonBone } from '@rei/cedar';
import { useToast } from '@/composables/useToast';
import GeneratorLayout from '@/components/GeneratorLayout.vue';
import VersionBadge from '@/components/VersionBadge.vue';
import NPCCard from '@/components/NPCCard.vue';
import PatreonCallout from '@/components/PatreonCallout.vue';
import Statblock from '@/components/Statblock.vue';
import Statblock2024 from '@/components/Statblock2024.vue';
import DataManagerModal from '@/components/DataManagerModal.vue';
import StatblockFuzzySearch from '@/components/StatblockFuzzySearch.vue';
import SeededFromBanner from '@/components/SeededFromBanner.vue';
import SidebarFooter from '@/components/SidebarFooter.vue';
import { logger } from '@/util/logger.mjs';
import { sweepOrphanReferences } from '@/util/sweep-orphan-references.mjs';
import ItemExportsSection from '@/tools/item-generator/components/ItemExportsSection.vue';
import { generateGptResponse } from "@/util/ai-client.mjs";
import { generateEmbeddedStatblock, setPreferredEdition, editionPreferenceRef } from "@/util/embedded-statblock.mjs";
import { requestNPCDescription } from "./utils/request-npc-description.mjs";
import { convertNPCToMarkdown, convertNPCToPlainText } from '@/util/convertToMarkdown.mjs';
import { patreonTiersUrl } from '@/util/patreon-urls.mjs';
import challengeRatingData from '@/data/challengeRatings.json';
import { canGenerateStatblock } from "@/util/can-generate-statblock.mjs";
import { saveStatblockToStorage, getStatblockFromStorage } from '@/util/statblock-storage.mjs';
import { normalizeGeneratorNPC, migrateNPCIds, migrateDungeonNPCsToSharedStorage, migrateSettingNPCsToSharedStorage, findNPCLocations, deleteNPCFromAllLocations, renameNPCReferences } from '@/util/npc-storage.mjs';
import { migrateSourceTypeFromTypeOfPlace } from '@/util/migrate-source-type-from-type-of-place.mjs';
import { getNavigationParams, navigateToTool } from '@/util/navigation.mjs';
import { generateSingleRelationshipPrompt } from './npc-prompts.mjs';
import { selectRegister } from '@/shared/select-register.mjs';
import { detectRegisterFromInput } from '@/shared/detect-register-from-input.mjs';
import { registerList, humanoidRegisterList } from '@/shared/register-list.mjs';
import { inferRegisterAndName, FANTASY_UNSPECIFIED } from './utils/infer-register-and-name.mjs';

// TEST-REGISTER-OVERRIDE — dev-only register selector (parallels the
// item generator's version). process.env.NODE_ENV avoids the
// import.meta parse error under Jest; Vite statically replaces it at
// build time.
const isDev = process.env.NODE_ENV !== 'production';
const testRegisterOverride = ref('');
const lastUsedRegister = ref('');
const registerOverrideOptions = registerList
    .map(p => ({
        value: p,
        label: p.length > 60 ? p.slice(0, 57) + '…' : p,
    }))
    .sort((a, b) => a.label.localeCompare(b.label));
// END TEST-REGISTER-OVERRIDE
import { buildStatblockContext } from './utils/statblock-context.mjs';
import { addReference, getReferencesForEntity, removeReferencesForEntity } from '@/util/reference-storage.mjs';
import { trackEvent } from '@/util/analytics.mjs';
import {
    loadSeededInput,
    buildPrefillForSeed,
    writeBackPromotedNPC,
    addReferenceForSeed,
    findStubsReferencingNPC,
    resetStubsForDeletedNPC,
    getToolForSourceType,
    sourceExists,
} from '@/util/seeded-input.mjs';
import '@rei/cedar/dist/cdr-fonts.css';
import '@rei/cedar/dist/reset.css';
import '@rei/cedar/dist/style/cdr-text.css';
import '@rei/cedar/dist/style/cdr-link.css';
import '@rei/cedar/dist/style/cdr-list.css';
import '@rei/cedar/dist/style/cdr-skeleton.css';
import '@rei/cedar/dist/style/cdr-skeleton-bone.css';
import '@rei/cedar/dist/style/cdr-input.css';

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
// Shared app-wide edition preference (same key the statblock generator
// persists) — the switch here writes it for every tool.
const editionPref = editionPreferenceRef();
const rulesIs2024 = computed({
  get: () => editionPref.value === '2024',
  set: (v) => setPreferredEdition(v ? '2024' : '2014'),
});
const statblockLimitReached = ref(false);
const loadingNewRelationship = ref(false);
const selectedStatblock = ref(null);
const isDeepLink = ref(false);
const showAttachStatblockModal = ref(false);
const attachStatblockSelection = ref(null);

// When the user arrived from a source tool's "Create NPC" stub action,
// this holds the SeededInput so the post-generation hook can write the
// canonical reference (mentioned_in_item / appears_in_dungeon /
// appears_in_setting / …) and back-link the stub on the source entity.
const pendingSeed = ref(null);

// Seeded landing-page heading. When a SeededInput exists pre-generation,
// the hero title swaps from the generic value-prop to the specific stub
// being created, with a link back to the source entity. The landing
// wrapper itself is hidden once `npcDescriptionPart1` is set, so the
// heading naturally yields to the generated NPC display.
const isSeededFlow = computed(() => !!pendingSeed.value?.source && !!pendingSeed.value?.entities?.[0]?.name);
const seedStubName = computed(() => pendingSeed.value?.entities?.[0]?.name || '');
const seedSourceName = computed(() => pendingSeed.value?.source?.name || '');
const seedSourceType = computed(() => pendingSeed.value?.source?.type || '');

function navigateBackToSeedSource() {
    const source = pendingSeed.value?.source;
    if (!source) return;
    if (source.type === 'item') {
        navigateToTool('item-generator', { item: source.id });
    }
    // Setting/dungeon back-navigation can be added when those flows ship.
}

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

// Same-tab navigation to the Statblock Generator with the linked statblock
// pre-selected. Goes through `navigateToTool` rather than a hardcoded
// cros.land URL so the dev path works (dev uses sessionStorage; prod uses
// query strings — both handled by the navigation substrate).
function openInStatblockGenerator() {
    const params = {};
    const name = npcDescriptionPart1.value?.statblock_name;
    const folder = npcDescriptionPart1.value?.statblock_folder;
    if (name) params.monster = name;
    if (folder) params.folder = folder;
    navigateToTool('statblock-generator', params);
}

// Folder options for moving NPCs (exclude current folder)
const folderOptions = computed(() => {
    return Object.keys(npcs.value).filter(folderName => folderName !== activeFolder.value);
});

// {value,label} options for the parchment ParSelect in the folder mover,
// with the trailing "create new folder" sentinel.
const folderMoveSelectOptions = computed(() => [
    ...folderOptions.value.map(name => ({ label: name, value: name })),
    { label: '＋ Create new folder', value: '__new__' },
]);

// Current NPC being viewed
const currentNPC = computed(() => {
    const folderName = activeFolder.value || 'Uncategorized';
    const index = currentNPCIndex.value;
    if (index === null || !npcs.value[folderName]) return null;
    return npcs.value[folderName][index];
});

// Computed origin: dungeon/setting name OR (for source-tool-sourced NPCs)
// the role_brief description that contains the source entity name. The
// NPC card linkifies the source name inside this string when sourceType
// and sourceName are both set.
const computedOrigin = computed(() => {
    const npc = currentNPC.value;
    if (!npc) return null;

    // First, check if NPC was created by dungeon/setting/item generator (has sourceType field)
    if (npc.sourceType) {
        if (npc.typeOfPlace && npc.typeOfPlace !== 'Uncategorized') {
            return npc.typeOfPlace;
        }
    }

    // Fallback: check reference store for explicit relationships
    if (npc.npc_id) {
        const refs = getReferencesForEntity('npc', npc.npc_id);

        const dungeonRef = refs.find(ref => ref.relationship === 'appears_in_dungeon');
        if (dungeonRef) return dungeonRef.target_name;

        const settingRef = refs.find(ref => ref.relationship === 'appears_in_setting');
        if (settingRef) return settingRef.target_name;

        const itemRef = refs.find(ref => ref.relationship === 'mentioned_in_item');
        if (itemRef) {
            // No role_brief stored on this NPC; fall back to item name as
            // origin so the subtitle renders "From <item>" with a link.
            return itemRef.target_name;
        }
    }

    return null;
});

// Computed source type: drives the link target for the subtitle.
const computedSourceType = computed(() => {
    const npc = currentNPC.value;
    if (!npc) return null;

    if (npc.sourceType === 'dungeon' || npc.sourceType === 'setting' || npc.sourceType === 'item') {
        return npc.sourceType;
    }

    if (npc.npc_id) {
        const refs = getReferencesForEntity('npc', npc.npc_id);
        if (refs.some(ref => ref.relationship === 'appears_in_dungeon')) return 'dungeon';
        if (refs.some(ref => ref.relationship === 'appears_in_setting')) return 'setting';
        if (refs.some(ref => ref.relationship === 'mentioned_in_item')) return 'item';
    }

    return null;
});

// Computed source name for source-tool-sourced NPCs: the literal source
// entity name to linkify inside the subtitle. Reads `sourceName` from
// the persisted NPC; for older records that haven't been touched since
// the migration, falls back to the reference store. Returns null for
// NPCs with no source tagging so the generic "From {origin}" subtitle
// applies.
const computedSourceName = computed(() => {
    const npc = currentNPC.value;
    if (!npc) return null;

    if (npc.sourceType && npc.sourceName) return npc.sourceName;

    if (npc.npc_id) {
        const refs = getReferencesForEntity('npc', npc.npc_id);
        const itemRef = refs.find(ref => ref.relationship === 'mentioned_in_item');
        if (itemRef) return itemRef.target_name;
    }

    return null;
});

// Source id for NPCCard's render-time existence check. Used to suppress
// the "back to source" link and append a "(deleted)" marker when the
// source entity has been removed.
const computedSourceId = computed(() => {
    const npc = currentNPC.value;
    if (!npc) return null;
    if (npc.sourceType && npc.sourceId) return npc.sourceId;
    // Fall back to sourceName (which is the id form for items today —
    // items use name as identity).
    if (npc.sourceType && npc.sourceName) return npc.sourceName;
    return null;
});

// Sidebar responsive
const showDataManagerModal = ref(false);
const showHomebreweryLink = ref(false);
// Toggles the inline export panel below the NPC card. Driven by the
// "Export" button in the NPC Card footer (parallels the Item Card).
const showExport = ref(false);

// Inline editing
const isEditingNPC = ref(false);

// Watch for statblock deselection - clean up empty folders
watch(selectedStatblock, (newStatblock, oldStatblock) => {
    const currentFolder = activeFolder.value;

    // Clean up empty folder if deselecting statblock
    if (!newStatblock) {
        if (currentFolder &&
            currentFolder !== 'Uncategorized' &&
            npcs.value[currentFolder]?.length === 0) {
            delete npcs.value[currentFolder];
            delete openedFolders.value[currentFolder];
            activeFolder.value = 'Uncategorized';
        }
    }

    // Note: We no longer auto-switch folders when selecting a statblock.
    // NPCs always stay in the user's current working folder, regardless of
    // which folder the selected statblock comes from.
});

// Folder management
const showFolderMover = ref(false);
const folderMoveTarget = ref('');
const newFolderName = ref('');

onMounted(async () => {
    loadNPCsFromLocalStorage();

    // Get navigation parameters (works in both dev and production)
    const params = getNavigationParams();

    // Handle statblock deep link from statblock generator
    if (params.statblock && params.folder) {
        // Use nextTick to ensure StatblockFuzzySearch component has mounted
        await nextTick();

        const statblock = getStatblockFromStorage(params.statblock, params.folder);

        if (statblock) {
            selectedStatblock.value = {
                name: statblock.name,
                folder: params.folder,
                statblock: statblock
            };
            // Enable highlight animation for deep link
            isDeepLink.value = true;
        }
    }

    // Handle NPC deep link via folder + name (legacy path; new callers
    // pass `params.npc` with the stable id and skip this branch). Walk
    // every folder by name — the `params.folder` is now treated as a
    // hint about where the NPC USED to live, not where it MUST be.
    // Folder organization is the user's; cross-tool navigation must
    // survive folder moves.
    if (params.folder && params.npc_name) {
        let found = false;
        // Try the hint folder first so the original behavior is preserved
        // when nothing has been reorganized.
        const folderOrder = [
            params.folder,
            ...Object.keys(npcs.value).filter(f => f !== params.folder),
        ];
        for (const folderName of folderOrder) {
            const folderNPCs = npcs.value[folderName];
            if (!Array.isArray(folderNPCs)) continue;
            const npcIndex = folderNPCs.findIndex(npc =>
                npc.npcDescriptionPart1?.character_name === params.npc_name
            );
            if (npcIndex !== -1) {
                openedFolders.value[folderName] = true;
                selectNPC(folderName, npcIndex);
                found = true;
                break;
            }
        }
        // No-op if no folder contains the NPC; the user lands on the
        // landing page rather than a confusing wrong-NPC selection.
        void found;
    }

    // Source tool → NPC Generator: "Create NPC" from a stub. Prefill
    // typeOfPlace from the source's data and remember the seed so the
    // post-generation hook can write back the source-side stub link and
    // collapse the long subtitle once part 1 returns.
    if (params.fromType && params.fromId) {
        const seed = loadSeededInput({
            fromType: params.fromType,
            fromId: params.fromId,
            entityName: params.entityName,
        });
        if (seed) {
            typeOfPlace.value = buildPrefillForSeed(seed);
            pendingSeed.value = seed;
        }
    }

    // Item Generator → NPC Generator: "View in NPC Generator" for a stub
    // already promoted (npc_id known). Locate and select that NPC.
    if (params.npc) {
        for (const folderName of Object.keys(npcs.value)) {
            const folder = npcs.value[folderName];
            if (!Array.isArray(folder)) continue;
            const npcIndex = folder.findIndex(n => n?.npc_id === params.npc);
            if (npcIndex !== -1) {
                openedFolders.value[folderName] = true;
                selectNPC(folderName, npcIndex);
                isDeepLink.value = true;
                break;
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
        logger.error('Failed to migrate NPCs from local storage:', error);
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

            // Migrate dungeon NPCs to shared storage (for old data compatibility)
            const dungeonMigratedCount = migrateDungeonNPCsToSharedStorage();
            if (dungeonMigratedCount > 0) {
                logger.log(`Migrated ${dungeonMigratedCount} dungeon NPCs to shared NPC storage`);
            }

            // Migrate setting NPCs to shared storage (for old data compatibility)
            const settingMigratedCount = migrateSettingNPCsToSharedStorage();
            if (settingMigratedCount > 0) {
                logger.log(`Migrated ${settingMigratedCount} setting NPCs to shared NPC storage`);
            }

            // Migrate NPCs without IDs
            const migratedCount = migrateNPCIds();
            if (migratedCount > 0) {
                logger.log(`Migrated ${migratedCount} NPCs to include unique IDs`);
            }

            // Migrate sourceType based on typeOfPlace (for NPCs created by dungeon/setting generators)
            const sourceTypeMigratedCount = migrateSourceTypeFromTypeOfPlace();
            if (sourceTypeMigratedCount > 0) {
                logger.log(`Migrated ${sourceTypeMigratedCount} NPCs to include sourceType based on typeOfPlace`);
            }

            // Migrate NPC statblock references (create references for NPCs with statblocks)
            const referencesMigratedCount = migrateNPCStatblockReferences();
            if (referencesMigratedCount > 0) {
                logger.log(`Created ${referencesMigratedCount} references for existing NPC statblocks`);
            }

            // Cleanup: shorten typeOfPlace for NPCs saved with the long
            // item-prefilled context blob (early Item Generator integration bug).
            const itemTypeOfPlaceCleaned = cleanupItemPrefilledTypeOfPlace();

            // Reload NPCs after migration (if any migration ran)
            if (migratedCount > 0 || dungeonMigratedCount > 0 || settingMigratedCount > 0 || sourceTypeMigratedCount > 0 || referencesMigratedCount > 0 || itemTypeOfPlaceCleaned > 0) {
                const updatedStored = localStorage.getItem('npcGeneratorNPCs');
                if (updatedStored) {
                    npcs.value = JSON.parse(updatedStored);
                }
            }
        } catch (error) {
            logger.error('Failed to parse NPCs from local storage:', error);
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

// One-time cleanup: NPCs created via the Item Generator → NPC Generator flow
// before the typeOfPlace shortening fix have a multi-paragraph subtitle (the
// prefilled prompt context). Detect the marker phrase and replace typeOfPlace
// with just the item name, matching the dungeon/setting convention.
function cleanupItemPrefilledTypeOfPlace() {
    let cleaned = 0;
    const marker = /Mentioned in connection with the magic item "([^"]+)"/;

    for (const folderName in npcs.value) {
        const folder = npcs.value[folderName];
        if (!Array.isArray(folder)) continue;
        for (const npc of folder) {
            const t = npc?.typeOfPlace;
            if (typeof t !== 'string' || t.length < 80) continue;
            const match = t.match(marker);
            if (match) {
                npc.typeOfPlace = match[1];
                cleaned++;
            }
        }
    }

    if (cleaned > 0) {
        saveNPCsToLocalStorage();
        logger.log(`Cleaned up ${cleaned} NPC subtitle${cleaned === 1 ? '' : 's'} from item-prefilled context.`);
    }

    return cleaned;
}

function migrateNPCStatblockReferences() {
    let referencesCreated = 0;

    // Iterate through all folders
    for (const [folderName, npcList] of Object.entries(npcs.value)) {
        if (!Array.isArray(npcList)) continue;

        // Iterate through NPCs in this folder
        for (const npc of npcList) {
            // Check if NPC has a statblock reference but no reference in reference-storage
            if (npc.npc_id && npc.npcDescriptionPart1?.statblock_name && npc.npcDescriptionPart1?.statblock_folder) {
                const statblockName = npc.npcDescriptionPart1.statblock_name;
                const statblockFolder = npc.npcDescriptionPart1.statblock_folder;
                const statblockId = `${statblockName}__${statblockFolder}`;

                // Skip if the statblock the NPC points at no longer exists.
                // Without this guard we'd write a ref that sweep-orphan-references
                // would immediately delete — self-correcting but wasteful and
                // noisy. Mirrors the existence check in extract-existing-references.mjs.
                if (!getStatblockFromStorage(statblockName, statblockFolder)) continue;

                // Check if reference already exists
                const existingRefs = getReferencesForEntity('npc', npc.npc_id);
                const hasStatblockRef = existingRefs.some(ref =>
                    ref.relationship === 'has_statblock' &&
                    ref.target_type === 'statblock' &&
                    ref.target_id === statblockId
                );

                if (!hasStatblockRef) {
                    // Create the reference
                    addReference({
                        source_type: 'npc',
                        source_id: npc.npc_id,
                        source_name: npc.npcDescriptionPart1.character_name || 'Unknown NPC',
                        target_type: 'statblock',
                        target_id: statblockId,
                        target_name: npc.npcDescriptionPart1.statblock_name,
                        relationship: 'has_statblock',
                        context: ''
                    });
                    referencesCreated++;
                }
            }
        }
    }

    return referencesCreated;
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

    // When this NPC was created via a source-tool → NPC Generator flow,
    // tag it with the source so the subtitle UI can render a back-link.
    if (pendingSeed.value?.source) {
        npcData.sourceType = pendingSeed.value.source.type;
        npcData.sourceId = pendingSeed.value.source.id;
        npcData.sourceName = pendingSeed.value.source.name;
    } else {
        // Preserve source tagging across re-saves of an existing
        // source-tool-sourced NPC. Three cases:
        //   1. sourceType + sourceId present, source resolves →
        //      preserve everything.
        //   2. sourceType + sourceId present, source DELETED →
        //      drop everything (auto-cleanup of the stale pointer
        //      so the (deleted) marker doesn't keep firing).
        //   3. sourceType only, no sourceId — legacy setting/dungeon
        //      NPCs created before stable ids existed (settingNPCToCanonical
        //      and migrateSourceTypeFromTypeOfPlace both set sourceType
        //      without sourceId). Preserve sourceType so the ref-store
        //      fallback in computedSourceType / computedOrigin still
        //      drives the back-link. There's no id to validate, so we
        //      can't auto-clean these here — that's what the orphan-
        //      sweep migration is for.
        const existing = (currentNPCIndex.value !== null && Array.isArray(npcs.value[folderName]))
            ? npcs.value[folderName][currentNPCIndex.value]
            : null;
        if (existing?.sourceType) {
            const id = existing.sourceId || existing.sourceName;
            if (id) {
                if (sourceExists(existing.sourceType, id)) {
                    // Case 1: live source.
                    npcData.sourceType = existing.sourceType;
                    npcData.sourceId = id;
                    npcData.sourceName = existing.sourceName || existing.sourceId;
                }
                // Case 2: source deleted — drop everything for auto-cleanup.
            } else {
                // Case 3: legacy sourceType-only record. Preserve it.
                npcData.sourceType = existing.sourceType;
            }
        }
    }

    // CRITICAL: Preserve npc_id to maintain reference integrity with dungeon/setting generators
    if (existingNpcId) {
        npcData.npc_id = existingNpcId;
    } else {
        // Generate ID for new NPCs
        npcData.npc_id = `npc_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }

    // Add or update NPC in current folder
    if (currentNPCIndex.value === null || currentNPCIndex.value >= npcs.value[folderName].length) {
        npcs.value[folderName].push(npcData);
        currentNPCIndex.value = npcs.value[folderName].length - 1;

        // Write reference if NPC has associated statblock and has an ID
        if (npcData.npc_id && npcData.npcDescriptionPart1?.statblock_name && npcData.npcDescriptionPart1?.statblock_folder) {
            addReference({
                source_type: 'npc',
                source_id: npcData.npc_id,
                source_name: npcData.npcDescriptionPart1.character_name || 'Unknown NPC',
                target_type: 'statblock',
                target_id: `${npcData.npcDescriptionPart1.statblock_name}__${npcData.npcDescriptionPart1.statblock_folder}`,
                target_name: npcData.npcDescriptionPart1.statblock_name,
                relationship: 'has_statblock',
                context: ''
            });
        }
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
            const loadedStatblock = getStatblockFromStorage(
                npc.npcDescriptionPart1.statblock_name,
                npc.npcDescriptionPart1.statblock_folder,
                {
                    npcId: npc.npc_id,
                    folderName: folderName
                }
            );

            // If statblock not found in storage, check for embedded statblock (SRD monsters)
            if (loadedStatblock) {
                statblock.value = loadedStatblock;
            } else if (npc.npcDescriptionPart1.statblock) {
                statblock.value = npc.npcDescriptionPart1.statblock;
            } else {
                statblock.value = null;
            }
        } else if (npc.statblock) {
            // Support legacy NPCs that have statblock embedded at root level
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
    selectedStatblock.value = null; // Clear associated statblock selection
    selectedChallengeRating.value = '1';
    isSpellcaster.value = false;
    showHomebreweryLink.value = false;
    activeFolder.value = folderName;
    currentNPCIndex.value = null;
    pendingSeed.value = null;
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

// Delete confirmation (ParConfirm modal — replaces native confirm()).
// deleteCurrentNPC builds the context + message and opens the modal;
// performNPCDelete (on @confirm) runs the original delete work. The modal
// blocks interaction while open, so the live `currentNPCIndex` reads in the
// perform step behave as the original blocking confirm() did.
const pendingNPCDelete = ref(null);

function deleteCurrentNPC() {
    const folderName = activeFolder.value || 'Uncategorized';
    const npcToDelete = npcs.value[folderName]?.[currentNPCIndex.value];
    const npcName = npcToDelete?.npcDescriptionPart1?.character_name || 'this NPC';
    const npcId = npcToDelete?.npc_id;

    if (!npcId) {
        // Fallback for NPCs without IDs (shouldn't happen after migration, but just in case)
        pendingNPCDelete.value = {
            npcId: null,
            npcName,
            folderName,
            isFallback: true,
            message: `Are you sure you want to delete ${npcName}?`,
        };
        return;
    }

    // Find all locations where this NPC exists
    const locations = findNPCLocations(npcId);
    const sourceStubMatches = findStubsReferencingNPC(npcId);

    // Build confirmation message
    let confirmMessage = `Are you sure you want to delete "${npcName}"?\n\n`;
    confirmMessage += 'This NPC will be deleted from:\n';

    if (locations.npcGenerator.length > 0) {
        if (locations.npcGenerator.length === 1) {
            confirmMessage += `- NPC Generator (${locations.npcGenerator[0]})\n`;
        } else {
            confirmMessage += `- NPC Generator (${locations.npcGenerator.length} folders)\n`;
        }
    }

    if (sourceStubMatches.length > 0) {
        const uniqueSources = [...new Set(sourceStubMatches.map(m => `${m.sourceType}:${m.sourceName}`))];
        if (uniqueSources.length === 1) {
            const m = sourceStubMatches[0];
            confirmMessage += `\nThe related-NPC stub on ${m.sourceType} "${m.sourceName}" will be reset so you can create a new NPC for it.\n`;
        } else {
            confirmMessage += `\nRelated-NPC stubs on ${uniqueSources.length} source entities will be reset so you can create new NPCs for them.\n`;
        }
    }

    pendingNPCDelete.value = { npcId, npcName, folderName, isFallback: false, message: confirmMessage };
}

function performNPCDelete() {
    const pending = pendingNPCDelete.value;
    pendingNPCDelete.value = null;
    if (!pending) return;
    const { npcId, npcName, folderName, isFallback } = pending;

    if (isFallback) {
        if (npcs.value[folderName] && currentNPCIndex.value < npcs.value[folderName].length) {
            npcs.value[folderName].splice(currentNPCIndex.value, 1);
            saveNPCsToLocalStorage();
            toast.success('NPC deleted.');

            if (npcs.value[activeFolder.value] && npcs.value[activeFolder.value].length > 0) {
                const newIndex = Math.max(0, Math.min(currentNPCIndex.value, npcs.value[activeFolder.value].length - 1));
                loadNPCIntoView(activeFolder.value, newIndex);
            } else {
                createNewNPC();
            }
        }
        return;
    }

    // Reset any source-tool stubs pointing to this NPC back to the
    // unpromoted state. Do this BEFORE removing references so the
    // source-of-truth links survive long enough to be inspected if
    // needed.
    const stubsReset = resetStubsForDeletedNPC(npcId);

    // Remove references for this NPC
    removeReferencesForEntity('npc', npcId);

    // Delete from all locations
    const results = deleteNPCFromAllLocations(npcId);

    // Reload NPCs from localStorage to sync the UI
    loadNPCsFromLocalStorage();

    // Show success message
    const deletedFrom = [];
    if (results.npcGenerator > 0) deletedFrom.push('NPC Generator');
    if (stubsReset > 0) deletedFrom.push(`${stubsReset} source stub${stubsReset === 1 ? '' : 's'} reset`);

    if (deletedFrom.length > 0) {
        toast.success(`"${npcName}" deleted from ${deletedFrom.join(', ')}.`);
    } else {
        toast.success('NPC deleted.');
    }

    // Load next NPC or create new one
    if (npcs.value[activeFolder.value] && npcs.value[activeFolder.value].length > 0) {
        const newIndex = Math.max(0, Math.min(currentNPCIndex.value, npcs.value[activeFolder.value].length - 1));
        loadNPCIntoView(activeFolder.value, newIndex);
    } else {
        createNewNPC();
    }
}

function deleteAllNPCs() {
    npcs.value = { 'Uncategorized': [] };
    createNewNPC();
    saveNPCsToLocalStorage();
    // Drop cross-tool edges pointing at the now-deleted NPCs. Runs after
    // the store is saved so the sweep sees them as gone.
    sweepOrphanReferences();
    showDataManagerModal.value = false;
    toast.success('All NPCs deleted.');
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
    const previousName = npcDescriptionPart1.value.character_name;
    npcDescriptionPart1.value.character_name = editedData.name;
    npcDescriptionPart1.value.read_aloud_description = editedData.read_aloud_description;
    npcDescriptionPart1.value.combined_details = editedData.combined_details;

    if (!npcDescriptionPart2.value) {
        npcDescriptionPart2.value = {};
    }
    npcDescriptionPart2.value.relationships = editedData.relationships;

    saveCurrentNPCToList();

    // Propagate the rename to display-name caches in other stores so
    // item stubs, setting/dungeon NPC stubs, and the reference graph
    // show the new name. Linkage isn't broken either way (npc_id is
    // stable), but the displayed names go stale without this.
    if (
        currentNPC.value?.npc_id &&
        editedData.name &&
        editedData.name !== previousName
    ) {
        renameNPCReferences(currentNPC.value.npc_id, editedData.name);
    }

    // Show toast indicating where the NPC was updated
    const npcName = editedData.name || 'NPC';
    const origin = computedOrigin.value;
    const sourceType = computedSourceType.value;

    if (origin && sourceType) {
        // NPC is synced to a source tool — look up the display name from
        // the central source-type → tool map so we don't branch here.
        const tool = getToolForSourceType(sourceType);
        if (tool) {
            toast.success(`${npcName} updated in NPC Generator and ${tool.name} (${origin})`);
        } else {
            toast.success(`${npcName} updated`);
        }
    } else {
        // NPC is only in NPC Generator
        toast.success(`${npcName} updated`);
    }

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

        // If a statblock was selected during generation, attach it to the NPC
        if (selectedStatblock.value) {
            npcDescription.statblock_name = selectedStatblock.value.name;
            npcDescription.statblock_source = selectedStatblock.value.source; // 'srd' or 'custom'

            // For SRD monsters, embed the full statblock since they're not in localStorage
            if (selectedStatblock.value.source === 'srd') {
                npcDescription.statblock_folder = 'SRD'; // Marker for embedded SRD statblock
                npcDescription.statblock = selectedStatblock.value.statblock;
                statblock.value = selectedStatblock.value.statblock;
            } else {
                // For custom statblocks, store folder reference for localStorage lookup
                npcDescription.statblock_folder = selectedStatblock.value.folder;
                statblock.value = getStatblockFromStorage(
                    npcDescription.statblock_name,
                    npcDescription.statblock_folder
                );
            }
        }

        npcDescriptionPart1.value = npcDescription;
        loadingPart1.value = false;

        // Source tool → NPC Generator: the prefilled typeOfPlace is a long
        // context block we used to seed the AI prompt. Now that part 1 has
        // returned (the AI has the full context), collapse typeOfPlace down
        // to the role_brief (e.g. "Creator of Krik-tak's Root") so the saved
        // NPC's subtitle describes the relationship with the source name
        // appearing verbatim (the UI linkifies that occurrence). Falls back
        // to the source name if no role_brief was captured.
        if (pendingSeed.value) {
            const stub = pendingSeed.value.entities?.[0];
            const roleBrief = (stub?.role_or_description || '').trim();
            typeOfPlace.value = roleBrief || pendingSeed.value.source?.name || '';
        }

        saveCurrentNPCToList();
        // Fire the cross-tool writeback as soon as Part 1 saves. The NPC
        // has an npc_id by this point (saveCurrentNPCToList assigns one
        // for new records), and that id is what the source-tool stub
        // links to. Earlier this fired only after Part 2; if Part 2
        // failed or the user navigated away first, the writeback never
        // ran — leaving the stub.npc_id null and no tool-reference.
        // Part 2 carries supplementary relationships, not the NPC's
        // cross-tool identity, so the link is correct to fire here.
        // Analytics: a normal (non-seeded) NPC generation. Seeded ones fire
        // their own generate (with the provenance flag) inside finalizePendingSeed.
        if (!pendingSeed.value) trackEvent('generate', { tool: 'npc-generator' });
        finalizePendingSeed();
    } else if (part === 2) {
        npcDescriptionPart2.value = npcDescription;
        loadingPart2.value = false;
        saveCurrentNPCToList();
        // finalizePendingSeed already ran on Part 1 and nulled
        // pendingSeed; calling it here would be a no-op via the
        // early-return guard.
    }
}

// If the user arrived here from a source tool's "Create NPC" stub action,
// write the source-tool reference and back-link the stub on the source
// entity so the source tool's UI updates next time it loads. Runs after
// Part 1 saves the NPC (which is when npc_id is assigned). Part 2's
// relationships are supplementary; the cross-tool link is identity-
// based, not content-based, so it should fire as soon as the NPC is
// real even if Part 2 fails or hasn't completed yet.
function finalizePendingSeed() {
    const seed = pendingSeed.value;
    if (!seed) return;

    const folderName = activeFolder.value || 'Uncategorized';
    const folder = npcs.value[folderName];
    if (!Array.isArray(folder) || currentNPCIndex.value === null) return;
    const npc = folder[currentNPCIndex.value];
    if (!npc?.npc_id) return;

    const npcName = npc.npcDescriptionPart1?.character_name
        || seed.entities?.[0]?.name
        || 'Unknown NPC';

    addReferenceForSeed(seed, { type: 'npc', id: npc.npc_id, name: npcName });
    writeBackPromotedNPC(seed, { npc_id: npc.npc_id, name: npcName, folderName });
    // Analytics: a seeded generation completed — closes the cross_tool_start
    // funnel. Only the provenance flag (not the NPC tool's full usability).
    trackEvent('generate', { tool: 'npc-generator', seeded: true, seed_source: seed.source.type });

    pendingSeed.value = null;
}

function handleError(message) {
    logger.error(message);
    loadingPart1.value = false;
    loadingPart2.value = false;
    errorMessage.value = message || null;
}

async function handleGenerateNPC() {
    // Build extra description with statblock context if available
    const extraDescription = {};

    if (selectedStatblock.value && selectedStatblock.value.statblock) {
        const statblockContext = buildStatblockContext(selectedStatblock.value);
        extraDescription.statblockContext = statblockContext;
        // Pass the statblock for isCreatureProfile detection
        extraDescription.statblock = selectedStatblock.value.statblock;
    }

    // Three-path register resolution:
    //   1. Seeded (NPC promoted from item) → use seed.register, no inference.
    //   2. Empty user input → random fantasy register via selectRegister
    //      across the FULL pool. Bulk-variety case where genre-shifts
    //      onto Aberrant / Abyssal / Infernal / Primordial are welcome.
    //   3. Non-empty user input → single combined inferRegisterAndName call.
    //      The inference returns one of three signals:
    //        - a register descriptor → use it directly. If the user
    //          explicitly invoked a thematic register (Aberrant /
    //          Abyssal / Infernal / Primordial), that genre commitment
    //          is what they asked for.
    //        - FANTASY_UNSPECIFIED → input is generic fantasy ("a tavern
    //          patron", "a wandering merchant"). Route through random
    //          selection across HUMANOID-ONLY registers
    //          (`humanoidRegisterList`). Letting random selection land
    //          on a thematic register here causes genre-displacement —
    //          DeepSeek reads Aberrant as cosmic-horror commitment, not
    //          as linguistic flavor, and produces cosmic-horror keepers
    //          instead of normal tavern patrons.
    //        - null → non-fantasy genre (cyberpunk / noir / modern);
    //          no whitelist, freehand generation.
    // Whitelist routing rules applied to the result:
    //   - Source NPC: register iff register set AND no userName
    //   - Relationships: register iff register set (independent of userName)
    const userInput = (typeOfPlace.value || '').trim();
    const seededRegister = pendingSeed.value?.source?.register || null;
    // Seeded promotions always carry a stub name on entities[0]. Treat
    // it as a user-provided name so the source-NPC whitelist gets
    // suppressed below (otherwise the curated pool overrides the
    // stub name — e.g., a "Skragdun" stub on a goblin-coded item turns
    // into a pool pick because the Goblin whitelist directive "MUST
    // pick from this curated list" wins over the prefill's "Name:"
    // line). Relationships still inherit the item's register so the
    // generated cast stays culturally coherent with the source item.
    const seededUserName = pendingSeed.value?.entities?.[0]?.name?.trim() || null;
    // TEST-REGISTER-OVERRIDE — when set, forces the resolved register
    // to the dev-selected value. userName still routes through the
    // appropriate source (seed > inference) so a forced register
    // doesn't erase user-provided / stub names.
    const devOverride = isDev && testRegisterOverride.value ? testRegisterOverride.value : null;
    let resolvedRegister = null;
    let userName = null;
    if (devOverride) {
        resolvedRegister = devOverride;
        if (seededUserName) {
            userName = seededUserName;
        } else if (userInput) {
            const inferred = await inferRegisterAndName(userInput);
            userName = inferred.userName;
        }
    } else if (seededRegister) {
        resolvedRegister = seededRegister;
        userName = seededUserName;
    } else if (!userInput) {
        resolvedRegister = selectRegister(null, '', registerList, detectRegisterFromInput);
    } else {
        const inferred = await inferRegisterAndName(userInput);
        if (inferred.register === FANTASY_UNSPECIFIED) {
            resolvedRegister = selectRegister(null, '', humanoidRegisterList, detectRegisterFromInput);
        } else {
            resolvedRegister = inferred.register;
        }
        userName = inferred.userName;
    }
    lastUsedRegister.value = resolvedRegister || '';
    const sourceRegister = userName ? null : resolvedRegister;
    const relationshipsRegister = resolvedRegister;

    await requestNPCDescription(
        typeOfPlace.value,
        extraDescription,
        false,
        (event, payload) => {
            if (event === 'npc-description-generated') {
                displayNPCDescription(payload);
            } else if (event === 'npc-description-error') {
                handleError(payload);
            } else if (event === 'set-loading-state') {
                setLoadingState(payload);
            }
        },
        { sourceRegister, relationshipsRegister, fantasyRace: null },
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

    try {
        // Engine-routed (phase 1 of the embedded edition migration): same
        // two calls as the old part1/part2 flow, with chassis-exact numbers,
        // the lint stack, and the shared edition preference. NPCs default to
        // Humanoid; the resolve call may override by substance.
        const finalStatblock = await generateEmbeddedStatblock({
            name: npcDescriptionPart1.value.character_name,
            cr: selectedChallengeRating.value,
            description: fullNPCDescription,
            caster: isSpellcaster.value,
            type: 'Humanoid',
            onResolve: () => { loadingStatblockPart1.value = false; },
        });
        statblock.value = finalStatblock;

        // Auto-save statblock to shared storage (all NPC statblocks go to "NPC Statblocks" folder)
        const folderName = 'NPC Statblocks';

        saveStatblockToStorage(finalStatblock, folderName);

        // Store reference to statblock on NPC instead of full object
        if (npcDescriptionPart1.value) {
            npcDescriptionPart1.value.statblock_name = finalStatblock.name;
            npcDescriptionPart1.value.statblock_folder = folderName;
        }

        // Create reference linking this NPC to the statblock
        const npcId = currentNPC.value?.npc_id;
        if (npcId) {
            addReference({
                source_type: 'npc',
                source_id: npcId,
                source_name: npcDescriptionPart1.value.character_name || 'Unknown NPC',
                target_type: 'statblock',
                target_id: `${finalStatblock.name}__${folderName}`,
                target_name: finalStatblock.name,
                relationship: 'has_statblock',
                context: ''
            });
        }

        toast.success(`${finalStatblock.name} saved to your statblocks`);

        saveCurrentNPCToList();
    } catch (e) {
        errorMessage.value = 'There was an issue generating the full description. Please reload your browser and resubmit your creature.';
    }
    loadingStatblockPart2.value = false;
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
        logger.error('Error generating relationship:', error);
        toast.error('Failed to generate relationship. Please try again.');
    } finally {
        loadingNewRelationship.value = false;
    }
}

function confirmAttachStatblock() {
    if (!attachStatblockSelection.value) return;

    // Attach the statblock to the NPC
    npcDescriptionPart1.value.statblock_name = attachStatblockSelection.value.name;
    npcDescriptionPart1.value.statblock_folder = attachStatblockSelection.value.folder;

    // Load the statblock for display
    const loadedStatblock = getStatblockFromStorage(
        attachStatblockSelection.value.name,
        attachStatblockSelection.value.folder,
        {
            npcId: currentNPC.value?.npc_id,
            folderName: activeFolder.value
        }
    );

    if (loadedStatblock) {
        statblock.value = loadedStatblock;
    }

    // Save the NPC with the new reference
    saveCurrentNPCToList();

    // Close the modal
    showAttachStatblockModal.value = false;
    attachStatblockSelection.value = null;

    toast.success('Statblock attached successfully');
}

function cancelAttachStatblock() {
    showAttachStatblockModal.value = false;
    attachStatblockSelection.value = null;
}

function clearStatblockReference() {
    if (npcDescriptionPart1.value) {
        // Get the NPC ID before clearing the reference
        const npcId = currentNPCIndex.value !== null && npcs.value[activeFolder.value]
            ? npcs.value[activeFolder.value][currentNPCIndex.value]?.npc_id
            : null;

        const statblockId = `${npcDescriptionPart1.value.statblock_name}__${npcDescriptionPart1.value.statblock_folder}`;

        // Remove reference from reference store
        if (npcId && statblockId) {
            import('@/util/reference-storage.mjs').then(({ getReferencesForEntity, removeReference }) => {
                // Find and remove the specific reference
                const refs = getReferencesForEntity('npc', npcId);
                const hasStatblockRef = refs.find(ref =>
                    ref.target_type === 'statblock' && ref.target_id === statblockId
                );
                if (hasStatblockRef) {
                    removeReference(hasStatblockRef.id);
                }
            });
        }

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
$background-color: transparent;
$active-color: var(--par-color-callout-bg-deep, #ede2cb);
$hover-background-color: var(--par-color-callout-bg, #f3ebda);
$default-background-color: transparent;
$active-border-color: var(--color-action-rest, #365A85);

.sidebar-content {
    flex: 1;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    font-family: var(--par-font-serif, 'Source Serif 4', Georgia, 'Times New Roman', serif);

    .sidebar-scroll {
        flex: 1;
        overflow-y: auto;
    }
}

/* ---- NPC rows inside a ParAccordion folder ---- */
.npc-list {
    list-style: none;
    padding: 0;
    margin: 0;
}

.npc-row__button {
    width: 100%;
    padding: 1.3rem 1.6rem;
    text-align: left;
    background: transparent;
    border: none;
    border-bottom: 1px solid var(--par-color-divider, #e2dccd);
    cursor: pointer;
    font-family: inherit;
    font-size: 1.6rem;
    color: var(--par-color-text, #222);
    line-height: 1.3;
    transition: background-color 0.15s ease;
}

.npc-row__button:hover {
    background-color: rgba(243, 235, 218, 0.4);
}

.npc-row__button:focus-visible {
    outline: 2px solid var(--color-action-secondary-rest, #5A7A9A);
    outline-offset: -2px;
}

.npc-row--active .npc-row__button {
    background-color: var(--par-color-callout-bg, #f3ebda);
    color: var(--color-action-hover, #2A4D70);
    font-weight: 600;
}

/* Per-folder "create new" affordance — lapis, quieter than an NPC row. */
.npc-row__new {
    font-size: 1.35rem;
    color: var(--color-action-rest, #365A85);
}

.npc-row__new:hover {
    color: var(--color-action-hover, #2A4D70);
}

.npc-row__new--active {
    background-color: var(--par-color-callout-bg, #f3ebda);
    color: var(--color-action-hover, #2A4D70);
    font-weight: 600;
}

/* ========================================
   LANDING PAGE: Three-zone layout
   ======================================== */

.landing-wrapper {
    max-width: 800px;
    margin: 0 auto;
}

/* ZONE 1: Hero header — lapis editorial register (matches Statblock/Item) */
.hero-header {
    text-align: center;
    padding: 2rem 1rem 2.5rem;

    .brand-line {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.75rem;
        margin-bottom: 1.25rem;
    }

    .brand-name {
        font-family: var(--par-font-serif, 'Source Serif 4', Georgia, 'Times New Roman', serif);
        font-size: 1.3rem;
        font-weight: 500;
        color: var(--color-action-secondary-rest, #5A7A9A);
        letter-spacing: 0.04em;
    }

    .page-heading__title {
        font-family: var(--par-font-serif, 'Source Serif 4', Georgia, 'Times New Roman', serif);
        font-size: 3.6rem;
        font-weight: 600;
        color: var(--color-action-hover, #2A4D70);
        margin: 0 0 0.75rem;
        line-height: 1.15;
        letter-spacing: -0.015em;
    }

    .page-heading__tagline {
        font-family: var(--par-font-serif, 'Source Serif 4', Georgia, 'Times New Roman', serif);
        font-size: 1.6rem;
        color: var(--par-color-text-secondary, #555);
        font-style: italic;
        margin: 0;
        line-height: 1.6;
    }

    /* Seeded-flow back-link to the source entity (item, etc.). Burgundy
       parchment accent — deliberate cross-language signal that this NPC
       page is being driven from item-side context.

       Quiet by default: no underline, weight inherited from .value-prop
       (400) so the link reads as part of the tagline rather than competing
       with the heading. Underline emerges on hover/focus to confirm the
       affordance when the user reaches for it. */
    .seed-source-link {
        color: var(--par-color-title, #7a1f1f);
        font-weight: inherit;
        text-decoration: none;
        cursor: pointer;

        &:hover {
            color: var(--par-color-title-deep, #58180d);
            text-decoration: underline;
        }

        &:focus-visible {
            outline: 2px solid var(--par-color-title, #7a1f1f);
            outline-offset: 2px;
        }
    }
}

/* ZONE 2: Form card — lifted cream surface, lapis "magic UI" register */
.form-card {
    background: var(--par-color-surface-card, #FEFBF4);
    border: 0.5px solid var(--par-color-border-strong, #c9b99a);
    border-radius: var(--par-radius-lg, 12px);
    padding: 2.25rem 2.25rem 2rem;

    form {
        display: flex;
        flex-direction: column;
        gap: 1.25rem;
        background-color: transparent;
        border-radius: 0;
        padding: 0;
        margin-bottom: 0;
    }

    .generate-button {
        align-self: stretch;
        margin-top: 0.5rem;
    }
}

/* ZONE 3: Footer meta */
.footer-meta {
    /* Visual chrome (text-align, background, border, radius) removed during
       PatreonCallout migration — the callout owns its own surface treatment.
       Layout properties (margin, max-width) preserved. */
    margin-top: 1.5rem;
    padding: 0;
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
    background-color: var(--par-color-surface, #FBF7F0);
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

/* The NPC content area no longer carries its own white card — the NPCCard
   (and the rendered statblock) bring their own parchment surfaces, so this is
   just a transparent layout wrapper. */
/* Editorial container for the generated NPC (M2): frames the output on a
   cream stage instead of leaving the NPC card bare on the cool desk. Matched
   to the other tools' containers (.item-view / .setting-tabs /
   .content-container): #FEFBF4, 8px radius, 2.5rem padding, 2rem bottom
   margin, soft shadow, no border (so it doesn't double-border the card). */
.location-description {
    @include cdr-text-body-500();
    margin-top: 20px;
    margin-bottom: 2rem;
    width: 100%;
    box-sizing: border-box;
    background-color: var(--par-color-surface-card, #FEFBF4);
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
    padding: 2.5rem;
}

/* Drop the trailing card margin so the cream stage's bottom padding isn't
   doubled when the NPC card is the last child. */
.location-description > :last-child {
    margin-bottom: 0;
}

/* The NPCCard carries generous horizontal padding (3rem) sized for
   standalone/WordPress use. Inside the stage that stacks with the stage's
   2.5rem, pushing content too far in and out of rhythm with the other tools.
   Trim the card's section padding to 2rem here (scoped to the NPC generator —
   the card's read-only use in dungeon/setting/encounter is untouched) so the
   content inset reads consistently. */
.location-description :deep(.npc-card-header),
.location-description :deep(.npc-card-content),
.location-description :deep(.npc-card-stub-body),
.location-description :deep(.npc-edit) {
    padding-left: 2rem;
    padding-right: 2rem;
}

@media (max-width: 2080px) {
    #npc-content-area {
        margin-top: 3rem;
    }
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

/* ---- Folder mover (parchment cream card) ---- */
.npc-folder-mover {
    margin-top: 1.5rem;
    padding: 1.75rem 2rem;
    background: var(--par-color-surface-card, #FEFBF4);
    border: 0.5px solid var(--par-color-border-strong, #c9b99a);
    border-radius: var(--par-radius-lg, 12px);
}

.npc-folder-mover__heading {
    margin: 0 0 1.25rem;
    font-family: var(--par-font-serif, 'Source Serif 4', Georgia, 'Times New Roman', serif);
    font-size: 1.7rem;
    font-weight: 600;
    color: var(--color-action-hover, #2A4D70);
}

.npc-folder-mover__row {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
}

.npc-folder-mover .npc-folder-mover__field {
    flex: 1 1 220px;
    min-width: 0;
    margin-bottom: 1rem;
}

.npc-folder-mover__actions {
    display: flex;
    gap: 0.7rem;
    flex-wrap: wrap;
}

/* ---- Generate-statblock section ---- */
.npc-statblock {
    margin-top: 2rem;
}

.npc-statblock__heading {
    margin: 0 0 1rem;
    font-family: var(--par-font-serif, 'Source Serif 4', Georgia, 'Times New Roman', serif);
    font-size: 2rem;
    font-weight: 600;
    color: var(--color-action-hover, #2A4D70);
    line-height: 1.2;
}

.npc-statblock__form {
    padding: 1.75rem 2rem;
    background: var(--par-color-surface-card, #FEFBF4);
    border: 0.5px solid var(--par-color-border-strong, #c9b99a);
    border-radius: var(--par-radius-lg, 12px);
}

/* Heading living inside the form card — no top margin, sits above the fields. */
.npc-statblock__heading--inset {
    margin: 0 0 1.5rem;
}

.npc-statblock__fields {
    display: flex;
    align-items: flex-end;
    gap: 2rem;
    flex-wrap: wrap;
}

/* Heading and rules toggle share one header row — no stacked margins. */
.npc-statblock__header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 0.5rem 1.5rem;
    flex-wrap: wrap;
    /* Carries the inset heading's original 1.5rem rhythm to the fields. */
    margin-bottom: 1.5rem;
}

.npc-statblock__header .npc-statblock__heading {
    margin-bottom: 0;
}

.npc-statblock .npc-statblock__cr {
    margin-bottom: 0;
    flex: 0 1 200px;
}

.npc-statblock__caster {
    margin-bottom: 0.4rem;
}

.npc-statblock__actions {
    display: flex;
    gap: 0.7rem;
    flex-wrap: wrap;
    margin-top: 1.5rem;
}

.attach-statblock-modal {
    margin-top: 1rem;
    padding: 1.75rem 2rem;
    background: var(--par-color-surface-card, #FEFBF4);
    border: 0.5px solid var(--par-color-border-strong, #c9b99a);
    border-radius: var(--par-radius-lg, 12px);
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
    background: var(--par-color-surface, #FBF7F0);
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
    background: var(--par-color-callout-bg, #f3ebda);
    border: 0.5px solid var(--par-color-border-strong, #c9b99a);
    border-radius: var(--par-radius-md, 4px);

    p {
        margin: 0;
        color: var(--par-color-text, #222);
        font-size: 1.6rem;
    }

    a {
        color: var(--color-action-hover, #2A4D70);
        font-weight: 600;
        text-decoration: underline;

        &:hover {
            color: var(--color-action-active, #1F3A5C);
        }
    }
}

/* Warning state — parchment callout with a burgundy left-rule (burgundy is
   the parchment "attention" accent), not the alarming red. */
.statblock-not-found-message {
    margin-top: 1.5rem;
    padding: 1.25rem 1.5rem;
    background: var(--par-color-callout-bg, #f3ebda);
    border: 0.5px solid var(--par-color-border-strong, #c9b99a);
    border-left: 3px solid var(--par-color-title, #7a1f1f);
    border-radius: 0 var(--par-radius-md, 4px) var(--par-radius-md, 4px) 0;

    p {
        margin: 0 0 0.5rem 0;
        color: var(--par-color-text, #222);
        font-size: 1.6rem;
        line-height: 1.6;

        &:last-of-type {
            margin-bottom: 1rem;
        }

        strong {
            color: var(--par-color-title, #7a1f1f);
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

/* (Removed stale "NPC Card Skeleton Styles": a legacy duplicate of the
   NPCCard's own `.npc-card*` rules with hardcoded pre-token hexes. Because a
   child component's root element inherits the parent's scope attribute, the
   bare `.npc-card` rule here was overriding NPCCard.vue's tokenized styling on
   the real card — making edits there appear to do nothing. NPCGenerator
   renders the <NPCCard> component, not its own `.npc-card` markup, so these
   were pure leakage and are gone. NPCCard owns its styling.) */

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

/* TEST-REGISTER-OVERRIDE — dev only */
.test-register-override {
    border: 2px dashed #d97706;
    background: #fff7ed;
    padding: 0.75rem 1rem;
    margin: 1rem 0;
    border-radius: 4px;

    legend {
        font-size: 0.75rem;
        font-weight: 700;
        text-transform: uppercase;
        color: #9a3412;
        padding: 0 0.5rem;
    }

    label {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
        font-size: 0.875rem;
    }

    select,
    select option {
        padding: 0.375rem 0.5rem;
        font-size: 1.3125rem;
        width: 100%;
    }

    &__last {
        margin: 0.5rem 0 0;
        font-size: 0.8125rem;
        color: #57534e;

        code {
            background: #fef3c7;
            padding: 0.125rem 0.25rem;
            border-radius: 2px;
            font-size: 0.8125rem;
        }
    }
}
/* END TEST-REGISTER-OVERRIDE */
</style>