<template>
    <div :class="`container ${columns}`" @mouseover="showEditButton = true" @mouseleave="showEditButton = false">
        <div v-if="!loadingPart1" class="statblock">
            <div class="creature-heading">
                <h1 v-if="!isEditing">{{ monster.name }}</h1>
                <input v-else v-model="editedMonster.name" />

                <h2 v-if="!isEditing">{{ monster.type_and_alignment }}</h2>
                <input v-else v-model="editedMonster.type_and_alignment" />
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
                <table class="scores">
                    <tr>
                        <th v-for="attribute in parsedAttributes" :key="attribute.stat">
                            <h4>{{ attribute.stat }}</h4>
                        </th>
                    </tr>
                    <tr>
                        <td v-for="attribute in parsedAttributes" :key="attribute.stat">
                            <p v-if="!isEditing">{{ attribute.value }}</p>
                            <input v-else v-model="attribute.value" />
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
                    </li>
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
                <li v-for="(action, index) in monster.actions" :key="index">
                    <strong>{{ action.name }}: </strong>{{ action.description }}
                </li>
            </ul>
            <div v-if="monster.legendary_actions && monster.legendary_actions.length > 0">
                <h3>Legendary Actions</h3>
                <p>The monster can take 3 legendary actions, choosing from the options below. Only one legendary action
                    option can be used at a time and only at the end of another creature's turn. The monster regains
                    spent
                    legendary actions at the start of its turn.</p>
                <ul class="abilities">
                    <li v-for="(action, index) in monster.legendary_actions" :key="index">
                        <strong>{{ action.name }}: </strong>{{ action.description }}
                    </li>
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
const editedMonster = ref({ ...props.monster });
const propertyLineClass = computed(() => isEditing.value ? 'property-line editing' : 'property-line');

// Watch for changes to the monster prop and update editedMonster accordingly
watch(() => props.monster, (newMonster) => {
    editedMonster.value = { ...newMonster };
}, { deep: true });

const enterEditMode = () => {
    isEditing.value = true;
};

const saveChanges = () => {
    isEditing.value = false;
    emit('update-monster', editedMonster.value);  // Emit the updated monster object
};

const cancelChanges = () => {
    isEditing.value = false;
    editedMonster.value = { ...props.monster };  // Reset changes
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

const parsedAttributes = computed(() => {
    return props.monster.attributes.split(',').map(attr => {
        const [stat, ...valueParts] = attr.trim().split(' ');
        const value = valueParts.join(' ');
        return { stat, value };
    });
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