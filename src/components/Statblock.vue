<template>
    <div ref="containerRef" :style="widthStyle" :class="`container ${columns}`">
        <!-- Spec contract (archetype-chassis-spec solo_warning), mirrored
             from Statblock2024: support monsters flag their solo weakness. -->
        <p v-if="monster && monster.archetype === 'support' && !loadingPart1" class="solo-note">
            Support monsters underperform their CR when fought alone — pair with other creatures.
        </p>
        <div v-if="!loadingPart1" class="statblock">
            <div class="creature-heading" :class="{ 'editing': isEditing }">
                <h1 v-if="!isEditing">{{ monster.name }}</h1>
                <input v-else v-model="editedMonster.name" class="input-name" />

                <h2 v-if="!isEditing">{{ monster.type_and_alignment }}</h2>
                <input v-else v-model="editedMonster.type_and_alignment" class="input-type" />
            </div>


            <svg height="5" width="100%" class="tapered-rule">
                <polyline points="0,0 400,2.5 0,5"></polyline>
            </svg>

            <!-- Property Block -->
            <div class="property-block">
                <div :class="propertyLineClass" v-if="!isEditing">
                    <h4>Armor Class</h4>
                    <p>{{ monster.armor_class }}</p>
                </div>
                <div :class="propertyLineClass" v-else>
                    <h4>Armor Class</h4>
                    <input v-model="editedMonster.armor_class" />
                </div>
                <div :class="propertyLineClass" v-if="!isEditing">
                    <h4>Hit Points: </h4>
                    <p>{{ monster.hit_points }}</p>
                </div>
                <div :class="propertyLineClass" v-else>
                    <h4>Hit Points: </h4>
                    <input v-model="editedMonster.hit_points" />
                </div>
                <div :class="propertyLineClass" v-if="!isEditing">
                    <h4>Speed: </h4>
                    <p>{{ monster.speed }}</p>
                </div>
                <div :class="propertyLineClass" v-else>
                    <h4>Speed: </h4>
                    <input v-model="editedMonster.speed" />
                </div>

                <!-- Stat Block -->
                <table class="scores">
                    <tbody>
                        <tr>
                            <th v-for="(stat, key) in editedAttributes" :key="key">
                                <h4>{{ stat.stat }}</h4>
                            </th>
                        </tr>
                        <tr>
                            <td v-for="(stat, key) in editedAttributes" :key="key" :class="{ 'editing': isEditing }">
                                <p v-if="!isEditing">{{ statDisplay(stat.base) }}</p>
                                <div v-else>
                                    <input type="number" v-model.number="stat.base" />
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div v-if="monster.skills && monster.skills.length > 0 && monster.skills !== 'None'"
                    :class="propertyLineClass">
                    <h4>Skills: </h4>
                    <p v-if="!isEditing">{{ monster.skills }}</p>
                    <input v-else v-model="editedMonster.skills" />
                </div>
                <div v-if="monster.saving_throws && monster.saving_throws.length > 0 && monster.saving_throws !== 'None'"
                    :class="propertyLineClass">
                    <h4>Saving Throws: </h4>
                    <p v-if="!isEditing">{{ monster.saving_throws }}</p>
                    <input v-else v-model="editedMonster.saving_throws" />
                </div>
                <div v-if="monster.damage_resistances && monster.damage_resistances.length > 0 && monster.damage_resistances !== 'None'"
                    :class="propertyLineClass">
                    <h4>Damage Resistances: </h4>
                    <p v-if="!isEditing">{{ monster.damage_resistances }}</p>
                    <input v-else v-model="editedMonster.damage_resistances" />
                </div>
                <div v-if="monster.damage_immunities && monster.damage_immunities.length > 0 && monster.damage_immunities !== 'None'"
                    :class="propertyLineClass">
                    <h4>Damage Immunities: </h4>
                    <p v-if="!isEditing">{{ monster.damage_immunities }}</p>
                    <input v-else v-model="editedMonster.damage_immunities" />
                </div>
                <div v-if="monster.condition_immunities && monster.condition_immunities.length > 0 && monster.condition_immunities !== 'None'"
                    :class="propertyLineClass">
                    <h4>Condition Immunities: </h4>
                    <p v-if="!isEditing">{{ monster.condition_immunities }}</p>
                    <input v-else v-model="editedMonster.condition_immunities" />
                </div>
                <div :class="propertyLineClass">
                    <h4>Senses: </h4>
                    <p v-if="!isEditing">{{ monster.senses }}</p>
                    <input v-else v-model="editedMonster.senses" />
                </div>
                <div :class="propertyLineClass">
                    <h4>Languages: </h4>
                    <p v-if="!isEditing">{{ monster.languages }}</p>
                    <input v-else v-model="editedMonster.languages" />
                </div>
                <div :class="propertyLineClass">
                    <h4>Challenge</h4>
                    <p v-if="!isEditing">{{ monster.challenge_rating }}</p>
                    <select style="flex-grow: 1;" v-if="isEditing" v-model="editedMonster.challenge_rating">
                        <option v-for="cr in formattedArray" :key="cr" :value="cr">{{ cr }}</option>
                    </select>
                </div>
                <div :class="propertyLineClass">
                    <h4>Proficiency Bonus:</h4>
                    <p v-if="!isEditing">{{ monster.proficiency_bonus }}</p>
                    <input v-else v-model="editedMonster.proficiency_bonus" />
                </div>
            </div>

            <svg height="5" width="100%" class="tapered-rule">
                <polyline points="0,0 400,2.5 0,5"></polyline>
            </svg>

            <ul class="abilities">
                <div v-if="!isEditing">
                    <li v-for="(ability, index) in editedAbilities" :key="index">
                        <strong>{{ ability.name }}. </strong>
                        <span>{{ ability.description }}</span>
                    </li>
                </div>
                <div v-if="isEditing && !loadingAbilities" class="ability-forms">
                    <ParButton class="regenerate-button" size="small" :full-width="true" variant="secondary"
                        @click="generateAbilities()">{{
                            monster.abilities.length > 0 ? 'Re-roll all abilities' :
                                'Generate abilities' }}</ParButton>
                    <li v-for="(ability, index) in editedAbilities" :key="index">
                        <div class="entry-bar">
                            <input v-model="ability.name" class="entry-name" />
                            <button class="entry-btn" :disabled="loadingAbilityIndices.has(index)"
                                @click="regenerateAbility(index)">
                                {{ loadingAbilityIndices.has(index) ? '…' : 'Re-roll' }}
                            </button>
                            <button class="entry-btn entry-btn--danger" @click="removeAbility(index)">✕</button>
                        </div>
                        <textarea v-model="ability.description"></textarea>
                    </li>
                    <button class="add-button" @click="addAbility">+ Add Ability</button>
                </div>
                <div v-if="loadingAbilities">
                    <StatblockAbilitiesSkeleton />
                </div>
            </ul>

        </div>

        <div v-if="loadingPart1" class="statblock">
            <StatblockSkeletonPtOne />
        </div>

        <div v-if="!loadingPart2" class="statblock">
            <h3>Actions</h3>
            <ul class="abilities">
                <div v-if="!isEditing">
                    <li v-for="(action, index) in editedActions" :key="'action-' + index">
                        <strong>{{ action.name }}: </strong>
                        <span>{{ action.description }}</span>
                    </li>
                </div>
                <div v-if="isEditing && !loadingActions" class="ability-forms">
                    <ParButton class="regenerate-button" size="small" :full-width="true" variant="secondary"
                        v-if="isEditing" @click="generateActions()">{{ editedActions.length
                            > 0 ?
                            'Re-roll all actions' : 'Generate actions' }}</ParButton>
                    <li v-for="(action, index) in editedActions" :key="'action-' + index">
                        <div class="entry-bar">
                            <input v-model="action.name" class="entry-name" />
                            <button class="entry-btn" :disabled="loadingActionIndices.has(index)"
                                @click="regenerateAction(index)">
                                {{ loadingActionIndices.has(index) ? '…' : 'Re-roll' }}
                            </button>
                            <button class="entry-btn entry-btn--danger" @click="removeAction(index)">✕</button>
                        </div>
                        <textarea v-model="action.description"></textarea>
                    </li>
                </div>
                <div v-if="loadingActions">
                    <StatblockAbilitiesSkeleton />
                </div>
            </ul>
            <button class="add-button" v-if="isEditing && !loadingActions" @click="addAction">+ Add Action</button>
            <div>
                <h3 v-if="editedLegendaryActions.length > 0 || isEditing">Legendary Actions</h3>
                <!-- Official 2014 convention: 3 uses per round regardless of
                     how many options are listed; named, not "The monster". -->
                <p class="statblock-p" v-if="editedLegendaryActions.length > 0">{{ legendaryOwnerName }} can take 3
                    legendary actions, choosing from the options below. Only one legendary action
                    option can be used at a time and only at the end of another creature's turn.
                    {{ legendaryOwnerName }} regains spent legendary actions at the start of its turn.</p>
                <p class="statblock-p" v-if="isEditing && editedLegendaryActions.length === 0">Add some legendary
                    actions to the monster.
                    You can either add them one at at time manually or click "Generate legendary actions" to
                    generate actions for you. Please note that that adding legendary actions will make this creature
                    stronger than the CR provided.</p>
                <ParButton class="regenerate-button" v-if="isEditing && !loadingLegendaryActions" size="small"
                    :full-width="true" modifier="secondary"
                    @click="generateLegendaryActions()">{{
                        editedLegendaryActions.length > 0 ? 'Re-roll all legendary actions' :
                            'Generate legendary actions' }}</ParButton>
                <ul class="abilities" v-if="editedLegendaryActions.length > 0 || isEditing">
                    <template v-if="!isEditing">
                        <li v-for="(action, index) in editedLegendaryActions" :key="'legendary-' + index">
                            <strong>{{ action.name }}: </strong>
                            <span>{{ action.description }}</span>
                        </li>
                    </template>
                    <template v-if="isEditing && !loadingLegendaryActions">
                        <div class="ability-forms">
                            <li v-for="(action, index) in editedLegendaryActions" :key="'legendary-' + index">
                                <div class="entry-bar">
                                    <input v-model="action.name" class="entry-name" />
                                    <button class="entry-btn" :disabled="loadingLegendaryActionIndices.has(index)"
                                        @click="regenerateLegendaryAction(index)">
                                        {{ loadingLegendaryActionIndices.has(index) ? '…' : 'Re-roll' }}
                                    </button>
                                    <button class="entry-btn entry-btn--danger"
                                        @click="removeLegendaryAction(index)">✕</button>
                                </div>
                                <textarea v-model="action.description"></textarea>
                            </li>
                            <button class="add-button" @click="addLegendaryAction">+ Add Legendary Action</button>
                        </div>
                        <ParButton style="margin-top: .5rem" size="small" :full-width="true" variant="secondary"
                            v-if="editedLegendaryActions.length > 0" @click="clearLegendaryActions">Remove
                            All Legendary Actions</ParButton>

                    </template>
                    <div v-if="loadingLegendaryActions">
                        <StatblockAbilitiesSkeleton />
                    </div>
                </ul>
            </div>
        </div>

        <div v-if="loadingPart2" class="statblock">
            <StatblockSkeletonPtTwo />
        </div>

        <!-- Footer Bar — same chrome as Statblock2024.vue: Edit lives here,
             and edit mode swaps the bar for Save changes / Cancel. -->
        <div v-if="isEditing" class="card-footer-bar">
            <div class="card-footer-bar__actions">
                <CardFooterAction data-testid="save-edit" @click="saveChanges">
                    <template #icon>💾</template>
                    Save changes
                </CardFooterAction>
                <CardFooterAction @click="cancelChanges">
                    <template #icon>↩️</template>
                    Cancel
                </CardFooterAction>
            </div>
        </div>
        <div v-else-if="monster && !loadingPart2 && !readonly" class="card-footer-bar">
            <div class="card-footer-bar__actions">
                <CardFooterAction data-testid="edit-statblock" @click="enterEditMode">
                    <template #icon>✏️</template>
                    Edit
                </CardFooterAction>
                <CardFooterAction @click="$emit('move-to-folder')">
                    <template #icon>📁</template>
                    Move to folder
                </CardFooterAction>

                <CardFooterAction @click="$emit('use-in-encounter')">
                    <template #icon>⚔️</template>
                    Use in Encounter
                </CardFooterAction>

                <CardFooterAction @click="$emit('create-npc')">
                    <template #icon>👤</template>
                    {{ createNpcButtonText }}
                </CardFooterAction>

                <CardFooterAction @click="$emit('toggle-regenerate')">
                    <template #icon>🔄</template>
                    Regenerate
                </CardFooterAction>

                <CardFooterAction @click="$emit('toggle-export')">
                    <template #icon>📤</template>
                    Export
                </CardFooterAction>
            </div>

            <CardFooterAction @click="$emit('delete')" variant="danger" data-testid="delete-statblock">
                <template #icon>🗑️</template>
                Delete
            </CardFooterAction>
        </div>
    </div>
</template>

<script setup>
import { ParButton } from "@/parchment";
import { logger } from "@/util/logger.mjs";
import { ref, computed, defineProps, onMounted, onBeforeUnmount, watch } from 'vue';
import CardFooterAction from './CardFooterAction.vue';
import CRtoXP from '../data/cr-to-xp.json';
import { generateGptResponse, isDegradedMode } from "@/util/ai-client.mjs";
// All edit re-rolls (single-entry and whole-section) run through the engine:
// budget-constrained skeletons + lint, replacing the template-based
// statblock-edit-prompts path entirely.
import { rerollEntry, rerollSection } from "@/tools/statblock-generator/format-2024/generate.mjs";
import StatblockSkeletonPtOne from './StatblockSkeletonPtOne.vue';
import StatblockSkeletonPtTwo from './StatblockSkeletonPtTwo.vue';
import StatblockAbilitiesSkeleton from './skeletons/StatblockAbilitiesSkeleton.vue';

const props = defineProps({
    monster: {
        type: Object,
        default: () => ({})
    },
    columns: {
        type: String,
        default: 'two_columns'
    },
    loadingPart1: {
        type: Boolean,
        default: false,
    },
    loadingPart2: {
        type: Boolean,
        default: false,
    },
    errorMessage: {
        type: String,
        default: '',
    },
    width: {
        type: Number,
        default: 0,
    },
    premium: {
        type: Boolean,
        default: false,
    },
    readonly: {
        type: Boolean,
        default: false,
    },
    linkedNpcsCount: {
        type: Number,
        default: 0,
    },
});

const widthStyle = computed(() => props.width === 0 ? 'width: auto' : `max-width: ${props.width}px; width: 100%`);
const createNpcButtonText = computed(() => props.linkedNpcsCount > 0 ? 'Create another NPC' : 'Create NPC');
const emit = defineEmits(['update-monster', 'move-to-folder', 'use-in-encounter', 'create-npc', 'delete', 'can-switch-columns', 'toggle-export', 'toggle-regenerate']);

const containerRef = ref(null);
const containerWidth = ref(850);

const isEditing = ref(false);
const editedMonster = ref({});
const editedActions = ref([]);
const editedAbilities = ref([]);
const editedLegendaryActions = ref([]);
const propertyLineClass = computed(() => isEditing.value ? 'property-line editing' : 'property-line');
const loadingAbilities = ref(false);
const loadingActions = ref(false);
const loadingLegendaryActions = ref(false);
const loadingAbilityIndices = ref(new Set());
const loadingActionIndices = ref(new Set());
const loadingLegendaryActionIndices = ref(new Set());

//create a formatted array of CRs but make sure that they're sorted in ascending order. It should have 0, the fractions, and the whole numbers
function parseCR(cr) {
    if (cr.includes('/')) {
        const parts = cr.split('/');
        return parseInt(parts[0], 10) / parseInt(parts[1], 10);
    }
    return parseInt(cr, 10);
}

// Sorting the CR values
const formattedArray = Object.entries(CRtoXP)
    .sort((a, b) => parseCR(a[0]) - parseCR(b[0]))
    .map(([cr, xp]) => {
        const formattedXp = xp.toLocaleString();
        return `${cr} (${formattedXp} XP)`;
    });

// Helper function to calculate modifier
const calculateModifier = (stat) => Math.floor((stat - 10) / 2);

// Helper function to display stat with modifier
const statDisplay = (base) => {
    const modifier = calculateModifier(base);
    return `${base} (${modifier >= 0 ? '+' : ''}${modifier})`;
};

// Editable attributes based on parsedAttributes
const editedAttributes = ref([]);

// Watch for changes to the monster prop and update editedAttributes accordingly
watch(() => props.monster, (newMonster) => {
    if (newMonster && newMonster.attributes) {
        editedMonster.value = { ...newMonster };
        editedActions.value = newMonster.actions ? [...newMonster.actions] : [];
        editedAbilities.value = newMonster.abilities ? [...newMonster.abilities] : [];
        editedLegendaryActions.value = newMonster.legendary_actions ? [...newMonster.legendary_actions] : [];
        editedAttributes.value = (newMonster.attributes || '').split(',').map(attr => {
            const [stat, base] = attr.trim().split(' ');
            // Safety check: ensure base exists and can be matched
            if (!base) return { stat: stat || '', base: 10 };
            const match = base.match(/\d+/);
            const baseValue = match ? parseInt(match[0], 10) : 10;
            return {
                stat,
                base: baseValue
            };
        });
    } else {
        editedMonster.value = {};
        editedActions.value = [];
        editedAbilities.value = [];
        editedLegendaryActions.value = [];
        editedAttributes.value = [];
    }
}, { immediate: true });

const removeAbility = (index) => {
    editedAbilities.value.splice(index, 1);
};

const removeAction = (index) => {
    editedActions.value.splice(index, 1);
};

const removeLegendaryAction = (index) => {
    editedLegendaryActions.value.splice(index, 1);
};

const addAbility = () => {
    editedAbilities.value.push({ name: '', description: '' });
};

const addAction = () => {
    editedActions.value.push({ name: '', description: '' });
};

const addLegendaryAction = () => {
    editedLegendaryActions.value.push({ name: '', description: '' });
};

const clearLegendaryActions = () => {
    editedLegendaryActions.value = []; // Clear all legendary actions
};

const enterEditMode = () => {
    isEditing.value = true;
};

const saveChanges = () => {
    // Filter out abilities, actions, and legendary actions with blank names or descriptions
    const filteredAbilities = editedAbilities.value.filter(ability => ability.name.trim() !== '' && ability.description.trim() !== '');
    const filteredActions = editedActions.value.filter(action => action.name.trim() !== '' && action.description.trim() !== '');
    const filteredLegendaryActions = editedLegendaryActions.value.filter(action => action.name.trim() !== '' && action.description.trim() !== '');

    // Convert attributes back to the string format before emitting
    editedMonster.value.attributes = editedAttributes.value.map(stat => {
        const modifier = calculateModifier(stat.base);
        return `${stat.stat} ${stat.base} (${modifier >= 0 ? '+' : ''}${modifier})`;
    }).join(', ');

    // Update the monster object with filtered lists
    editedMonster.value.abilities = filteredAbilities;
    editedMonster.value.actions = filteredActions;
    editedMonster.value.legendary_actions = filteredLegendaryActions;

    // Emit the updated monster object
    isEditing.value = false;
    emit('update-monster', editedMonster.value);
};

const cancelChanges = () => {
    isEditing.value = false;
    editedMonster.value = { ...props.monster };
    editedActions.value = [...props.monster.actions];
    editedLegendaryActions.value = props.monster.legendary_actions ? [...props.monster.legendary_actions] : [];
};
async function generateLegendaryActions() {
    if (!props.premium) {
        alert('AI re-rolls in edit mode are available to premium supporters.');
        return;
    }
    try {
        loadingLegendaryActions.value = true;
        editedLegendaryActions.value = await rerollSection(
            rerollContext(),
            { kind: 'legendary', degraded: isDegradedMode() },
            (p, v) => generateGptResponse(p, v, 3),
        );
    } catch (e) {
        logger.error('Error regenerating legendary actions:', e);
        alert('Failed to regenerate legendary actions. Please try again.');
    } finally {
        loadingLegendaryActions.value = false;
    }
}
async function generateActions() {
    if (!props.premium) {
        alert('AI re-rolls in edit mode are available to premium supporters.');
        return;
    }
    try {
        loadingActions.value = true;
        editedActions.value = await rerollSection(
            rerollContext(),
            { kind: 'actions', degraded: isDegradedMode() },
            (p, v) => generateGptResponse(p, v, 3),
        );
    } catch (e) {
        logger.error('Error regenerating actions:', e);
        alert('Failed to regenerate actions. Please try again.');
    } finally {
        loadingActions.value = false;
    }
}
async function generateAbilities() {
    if (!props.premium) {
        alert('AI re-rolls in edit mode are available to premium supporters.');
        return;
    }
    try {
        loadingAbilities.value = true;
        editedAbilities.value = await rerollSection(
            rerollContext(),
            { kind: 'abilities', degraded: isDegradedMode() },
            (p, v) => generateGptResponse(p, v, 3),
        );
    } catch (e) {
        logger.error('Error regenerating abilities:', e);
        alert('Failed to regenerate abilities. Please try again.');
    } finally {
        loadingAbilities.value = false;
    }
}

const legendaryOwnerName = computed(() => {
    // Strip any leading article so a saved "The Hanging Shroud" doesn't
    // render as "The the hanging shroud".
    const name = props.monster?.name?.trim().replace(/^the\s+/i, '');
    return name ? `The ${name.toLowerCase()}` : 'The monster';
});

// Current edit-state monster for re-roll context: the engine needs the
// LIVE entry lists (for name references), not the pre-edit snapshot.
function rerollContext() {
    return {
        ...editedMonster.value,
        abilities: editedAbilities.value,
        actions: editedActions.value,
        legendary_actions: editedLegendaryActions.value,
    };
}

async function regenerateAbility(index) {
    if (!props.premium) {
        alert('AI re-rolls in edit mode are available to premium supporters.');
        return;
    }
    const currentAbility = editedAbilities.value[index];
    try {
        loadingAbilityIndices.value.add(index);
        const newAbility = await rerollEntry(
            rerollContext(),
            { kind: 'ability', current: currentAbility, degraded: isDegradedMode() },
            (p, v) => generateGptResponse(p, v, 3),
        );
        editedAbilities.value[index] = newAbility;
    } catch (e) {
        logger.error('Error regenerating ability:', e);
        alert('Failed to regenerate ability. Please try again.');
    } finally {
        loadingAbilityIndices.value.delete(index);
    }
}

async function regenerateAction(index) {
    if (!props.premium) {
        alert('AI re-rolls in edit mode are available to premium supporters.');
        return;
    }
    const currentAction = editedActions.value[index];
    try {
        loadingActionIndices.value.add(index);
        const newAction = await rerollEntry(
            rerollContext(),
            { kind: 'action', current: currentAction, degraded: isDegradedMode() },
            (p, v) => generateGptResponse(p, v, 3),
        );
        editedActions.value[index] = newAction;
    } catch (e) {
        logger.error('Error regenerating action:', e);
        alert('Failed to regenerate action. Please try again.');
    } finally {
        loadingActionIndices.value.delete(index);
    }
}

async function regenerateLegendaryAction(index) {
    if (!props.premium) {
        alert('AI re-rolls in edit mode are available to premium supporters.');
        return;
    }
    const currentAction = editedLegendaryActions.value[index];
    try {
        loadingLegendaryActionIndices.value.add(index);
        const newAction = await rerollEntry(
            rerollContext(),
            { kind: 'legendary', current: currentAction, degraded: isDegradedMode() },
            (p, v) => generateGptResponse(p, v, 3),
        );
        editedLegendaryActions.value[index] = newAction;
    } catch (e) {
        logger.error('Error regenerating legendary action:', e);
        alert('Failed to regenerate legendary action. Please try again.');
    } finally {
        loadingLegendaryActionIndices.value.delete(index);
    }
}

// Set up ResizeObserver to measure container width
onMounted(() => {
    if (containerRef.value) {
        const observer = new ResizeObserver(entries => {
            containerWidth.value = entries[0].contentRect.width;
            // Emit whether column switching is available
            emit('can-switch-columns', containerWidth.value >= 700);
        });
        observer.observe(containerRef.value);

        onBeforeUnmount(() => {
            observer.disconnect();
        });
    }
});

// Switch to one column when container is too narrow (< 700px)
const columns = computed(() => {
    return containerWidth.value < 700 ? 'one_column' : props.columns;
});
</script>


<style scoped lang="scss">
input,
textarea,
select {
    border: 1px solid #cbab77;
    background-color: var(--par-color-surface-card, #FEFBF4);
    padding: .75rem;
    font-size: 14px;

    &:focus {
        outline: none;
        box-shadow: inset 0 0 0 0.1rem #facc81;
    }
}

.regenerate-button {
    margin: 1rem 0;
}

textarea {
    height: 75px;
}

.container {
    display: grid;
    justify-content: center;
    background: #FDF1DC;
    background-image: url('https://cros.land/wp-content/uploads/2023/06/parchment-fee031d8.jpg');
    background-blend-mode: overlay;
    background-attachment: fixed;
    margin: 2rem auto;
    padding: 16px 24px;
    box-shadow: 1px 4px 14px #888;
    position: relative;

    &.one_column {
        grid-template-columns: 1fr;
        width: 425px;
        max-width: calc(100vw - 2rem);
    }

    &.two_columns {
        grid-template-columns: 1fr 1fr;
        gap: 2rem;
    }
}


.solo-note {
    grid-column: 1 / -1;
    margin: 0;
    font-size: 13px;
    font-style: italic;
    color: #7A200D;
}

.statblock {
    font-family: 'Noto Sans', 'Myriad Pro', Calibri, Helvetica, Arial, sans-serif;
    text-align: left;
    font-size: 14px;
    line-height: 1.2em;
    display: block;
    box-sizing: border-box;

    h3 {
        border-bottom: 2px solid #922610;
        color: #922610;
        font-size: 24px;
        font-variant: small-caps;
        font-weight: 400;
        letter-spacing: .1rem;
        margin: 20px 0 0;
        padding: 0 0 10px;
        text-indent: .5rem;
    }

    .statblock-p {
        margin: 1rem 0;
    }
}

.creature-heading {
    margin: 1rem 0;

    h1 {
        font-family: 'Libre Baskerville', 'Lora', 'Calisto MT', 'Bookman Old Style', Bookman, 'Goudy Old Style', Garamond, 'Hoefler Text', 'Bitstream Charter', Georgia, serif;
        color: #922610;
        font-size: 24px;
        line-height: 1.4em;
        margin: 10px 0 0;
        letter-spacing: 1px;
        font-variant: small-caps;
        font-weight: bold;
    }

    h2 {
        font-family: 'Noto Sans', 'Myriad Pro', Calibri, Helvetica, Arial, sans-serif;
        font-weight: normal;
        font-style: italic;
        font-size: 14px;
        line-height: 1.2em;
        margin: 0;
    }

    .editing {
        display: flex;
        flex-direction: column;
    }
}

.input-name {
    font-size: 1.5em;
    margin-bottom: 8px;
    padding: 10px;
    flex-grow: 1;
    width: 100%;
}

.input-type {
    width: 100%;
}

.add-button,
.entry-btn {
    background-color: var(--par-color-surface-card, #FEFBF4);
    color: #8d7349;
    font-weight: bold;
    border: 1px solid #cbab77;
    padding: .5rem;
    cursor: pointer;
    border-radius: 3px;

    &:hover {
        background-color: #cbab77;
        color: var(--par-color-surface-card, #FEFBF4);
        transition: .3s, color .3s;
    }

    &:focus {
        outline: 2px solid #facc81;
    }
}

.add-button {
    margin-bottom: 1rem;
    width: 100%;
}

/* Per-entry edit bar — same pattern as the 2024 card: name input flanked by
   Re-roll and ✕ on one row, the description textarea below. */
.entry-bar {
    display: flex;
    gap: .5rem;
    margin-bottom: .4rem;

    .entry-name {
        flex: 1;
        font-weight: bold;
        min-width: 0;
    }
}

/* ✕ delete is a fixed square (matching the 2024 card's edit surface) so the
   hit target is predictable and visually consistent across both cards. */
.entry-btn--danger {
    color: #a03333;
    width: 3.2rem;
    padding: .5rem 0;
    text-align: center;
    flex-shrink: 0;
}

.entry-btn:disabled {
    opacity: .6;
    cursor: default;
}

.tapered-rule {
    display: block;
    width: 100%;
    height: .4rem;
    border: none;
    color: #922610;
    fill: #922610;
}

.property-block {
    padding: 1rem .2rem;

    h4,
    p {
        display: inline;
        font-size: 14px;
        line-height: 1.2em;
    }

    h4 {
        color: #7A200D;
    }

    p {
        color: #922610;
    }
}

.property-line {
    h4 {
        margin: 0;
        white-space: nowrap;
    }

    p {
        margin: 0 .5rem;
    }

    &.editing {
        display: flex;
        align-items: center;
        gap: 1rem;
        margin-bottom: .5rem;

        input {
            flex-grow: 1;
        }
    }
}

.scores {
    width: 90%;
    text-align: center;
    margin: 1rem auto;

    input {
        width: 50px;
        text-align: center;
    }

    td.editing {
        padding: 1px;
    }
}

.abilities {
    font-size: 14px;
    list-style-type: none;
    /* Cancel the UA's default ul indent with padding, NOT a negative margin —
       margin-left: -3.8rem widened the box past its grid column, laying an
       invisible pointer-trap over the neighboring column's ✕ buttons. */
    padding-left: 0;

    li {
        margin: 1rem 0;
        list-style-type: none;
    }

    li > span {
        /* Official 2014 spellcasting descriptions carry newline-separated
           tiers ("At will: ...\n\n3/day each: ..."); collapsing the
           newlines runs the whole spell list into one line. */
        white-space: pre-line;
    }

    strong {
        font-style: italic;
    }

    .ability-forms li {
        display: flex;
        flex-direction: column;
        gap: .75rem;
        margin-bottom: 2rem;
        list-style-type: none;
    }
}

@media screen and (max-width: 855px) {
    .container {
        background-image: none;

        &.one_column {
            width: inherit;
        }
    }
}

/* Footer bar for card actions. Wraps at any width: the action group and the
   trailing Delete stay on one line when there's room and flow onto further
   lines when there isn't (narrow viewports, more actions) instead of
   overflowing the card edge. */
.card-footer-bar {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    gap: 0.5rem;
    padding: 1rem 1.5rem;
    border-top: 1px solid #e0d6c2;
    background: rgba(0, 0, 0, 0.02);
    margin: 0 -24px -16px -24px; /* Extend to edges of container (container has 24px horizontal, 16px bottom padding) */
}

/* In two-column layout, footer spans both columns */
.container.two_columns .card-footer-bar {
    grid-column: span 2;
}

.card-footer-bar__actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.25rem;
}
</style>