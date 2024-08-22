<template>
    <div :class="`container ${columns}`" @mouseover="showEditButton = true" @mouseleave="showEditButton = false">
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
                    <tr>
                        <th v-for="(stat, key) in editedAttributes" :key="key">
                            <h4>{{ stat.stat }}</h4>
                        </th>
                    </tr>
                    <tr>
                        <td v-for="(stat, key) in editedAttributes" :key="key">
                            <p v-if="!isEditing">{{ statDisplay(stat.base) }}</p>
                            <div v-else>
                                <input type="number" v-model.number="stat.base" />
                            </div>
                        </td>
                    </tr>
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
                    <h4>CR:</h4>
                    <p v-if="!isEditing">{{ monster.challenge_rating }}</p>
                    <input v-else v-model="editedMonster.challenge_rating" />
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
                    <li v-for="(ability, index) in monster.abilities" :key="index">
                        <strong>{{ ability.name }}. </strong>
                        <span>{{ ability.description }}</span>
                    </li>
                </div>
                <div v-else class="ability-forms">
                    <li v-for="(ability, index) in monster.abilities" :key="index">
                        <input v-model="ability.name" />
                        <textarea v-model="ability.description"></textarea>
                        <button class="remove-button" @click="removeAbility(index)">Remove</button>
                    </li>
                    <cdr-button size="small" :full-width="true" modifier="dark" @click="addAbility">Add
                        Ability</cdr-button>
                </div>
            </ul>

            <div class="edit-save-buttons">
                <button v-if="showEditButton && !isEditing" @click="enterEditMode">Edit</button>
                <button v-if="isEditing" @click="saveChanges">Save</button>
                <button v-if="isEditing" @click="cancelChanges">Cancel</button>
            </div>
        </div>

        <div v-if="loadingPart1" class="statblock">
            <StatblockSkeletonPtOne />
        </div>

        <div v-if="!loadingPart2" class="statblock">
            <h3>Actions</h3>
            <ul class="abilities">
                <div v-if="!isEditing">
                    <li v-for="(action, index) in monster.actions" :key="'action-' + index">
                        <strong>{{ action.name }}: </strong>
                        <span>{{ action.description }}</span>
                    </li>
                </div>
                <div v-else class="ability-forms">
                    <li v-for="(action, index) in editedActions" :key="'action-' + index">
                        <input v-model="action.name" />
                        <textarea v-model="action.description"></textarea>
                        <button class="remove-button" @click="removeAction(index)">Remove</button>
                    </li>
                </div>
            </ul>
            <cdr-button size="small" :full-width="true" modifier="dark" v-if="isEditing" @click="addAction">Add
                Action</cdr-button>

            <div>
                <h3 v-if="editedLegendaryActions.length > 0 || isEditing">Legendary Actions</h3>
                <p v-if="editedLegendaryActions.length > 0">The monster can take {{ editedLegendaryActions.length }}
                    legendary {{ editedLegendaryActions.length === 1 ? 'action' : 'actions' }}{{
                        editedLegendaryActions.length > 1 ? ', choosing from the options below' : '' }}. Only one legendary
                    action
                    option can be used at a time and only at the end of another creature's turn. The monster regains
                    spent legendary actions at the start of its turn.</p>
                <ul class="abilities" v-if="editedLegendaryActions.length > 0 || isEditing">
                    <template v-if="!isEditing">
                        <li v-for="(action, index) in editedLegendaryActions" :key="'legendary-' + index">
                            <strong>{{ action.name }}: </strong>
                            <span>{{ action.description }}</span>
                        </li>
                    </template>
                    <template v-else>
                        <div class="ability-forms">
                            <li v-for="(action, index) in editedLegendaryActions" :key="'legendary-' + index">
                                <input v-model="action.name" />
                                <textarea v-model="action.description"></textarea>
                                <button class="remove-button" @click="removeLegendaryAction(index)">Remove</button>
                            </li>
                        </div>


                        <cdr-button size="small" :full-width="true" modifier="dark" @click="addLegendaryAction">Add
                            Legendary Action</cdr-button>
                        <cdr-button size="small" :full-width="true" modifier="dark"
                            v-if="editedLegendaryActions.length > 0" @click="clearLegendaryActions">Remove
                            All</cdr-button>
                    </template>
                </ul>
            </div>


        </div>

        <div v-if="loadingPart2" class="statblock">
            <StatblockSkeletonPtTwo />
        </div>
    </div>
</template>

<script setup>
import { ref, computed, defineProps, onMounted, onBeforeUnmount, watch } from 'vue';
import { CdrButton } from '@rei/cedar';
import StatblockSkeletonPtOne from './StatblockSkeletonPtOne.vue';
import StatblockSkeletonPtTwo from './StatblockSkeletonPtTwo.vue';

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
    }
});

const emit = defineEmits(['update-monster']);

const showEditButton = ref(false);
const isEditing = ref(false);
const editedMonster = ref({});
const editedActions = ref([]);
const editedLegendaryActions = ref([]);
const propertyLineClass = computed(() => isEditing.value ? 'property-line editing' : 'property-line');

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
    if (newMonster) {
        editedMonster.value = { ...newMonster };
        editedActions.value = newMonster.actions ? [...newMonster.actions] : [];
        editedLegendaryActions.value = newMonster.legendary_actions ? [...newMonster.legendary_actions] : [];
        editedAttributes.value = (newMonster.attributes || '').split(',').map(attr => {
            const [stat, base] = attr.trim().split(' ');
            const baseValue = parseInt(base.match(/\d+/)[0], 10);
            return {
                stat,
                base: baseValue
            };
        });
    } else {
        editedMonster.value = {};
        editedActions.value = [];
        editedLegendaryActions.value = [];
        editedAttributes.value = [];
    }
}, { immediate: true });

const removeAbility = (index) => {
    editedMonster.value.abilities.splice(index, 1);
};

const removeAction = (index) => {
    editedActions.value.splice(index, 1);
};

const removeLegendaryAction = (index) => {
    editedLegendaryActions.value.splice(index, 1);
};

const addAbility = () => {
    editedMonster.value.abilities.push({ name: '', description: '' });
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
    // Convert attributes back to the string format before emitting
    editedMonster.value.attributes = editedAttributes.value.map(stat => {
        const modifier = calculateModifier(stat.base);
        return `${stat.stat} ${stat.base} (${modifier >= 0 ? '+' : ''}${modifier})`;
    }).join(', ');

    editedMonster.value.actions = editedActions.value;
    editedMonster.value.legendary_actions = editedLegendaryActions.value;

    isEditing.value = false;
    emit('update-monster', editedMonster.value);
};

const cancelChanges = () => {
    isEditing.value = false;
    editedMonster.value = { ...props.monster };
    editedActions.value = [...props.monster.actions];
    editedLegendaryActions.value = [...props.monster.legendary_actions];
};

const windowWidth = ref(window.innerWidth);
const onResize = () => {
    windowWidth.value = window.innerWidth;
};

onMounted(() => {
    window.addEventListener('resize', onResize);
});

onBeforeUnmount(() => {
    window.removeEventListener('resize', onResize);
});

const columns = computed(() => {
    return windowWidth.value <= 855 ? 'one_column' : props.columns;
});
</script>


<style scoped lang="scss">
input,
textarea {
    border: 1px solid #cbab77;
    background-color: #fefdf9;
    padding: .5rem;
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
        width: 850px;
        gap: 2rem;
    }
}

.edit-save-buttons {
    display: none;
    position: absolute;
    top: 10px;
    right: 10px;
}


.container:hover .edit-save-buttons {
    display: inline-block;
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

.remove-button {
    background-color: #fefdf9;
    color: #8d7349;
    font-weight: bold;
    border: 1px solid #cbab77;
    padding: .5rem;
    cursor: pointer;
    width: 10rem;
    border-radius: 3px;

    &:hover {
        background-color: #cbab77;
        color: #fefdf9;
        transition: .3s, color .3s;
    }
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
}

.abilities {
    font-size: 14px;
    list-style-type: none;
    margin-left: -3.8rem;

    li {
        margin: 1rem 0;
    }

    strong {
        font-style: italic;
    }

    .ability-forms li {
        display: flex;
        flex-direction: column;
        gap: .75rem;
        margin-bottom: 2rem;
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
</style>