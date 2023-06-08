<template>
    <cdr-toggle-group v-model="columns" style="max-width: 25rem">
        <cdr-toggle-button toggleValue="one_column">1 Column</cdr-toggle-button>
        <cdr-toggle-button toggleValue="two_columns">2 Columns</cdr-toggle-button>
    </cdr-toggle-group>

    <div :class="`container ${columns}`">
        <div class="statblock">
            <div class="creature-heading">
                <h1>{{ monster.name }}</h1>
                <h2>{{ monster.type_and_alignment }}</h2>
            </div>
            <svg height="5" width="100%" class="tapered-rule">
                <polyline points="0,0 400,2.5 0,5"></polyline>
            </svg>
            <div class="property-block">
                <div class="property-line">
                    <h4>Armor Class</h4>
                    <p>{{ monster.armor_class }}</p>
                </div>
                <div class="property-line">
                    <h4>Hit Points: </h4>
                    <p>{{ monster.hit_points }}</p>
                </div>
                <div class="property-line">
                    <h4>Speed: </h4>
                    <p>{{ monster.speed }}</p>
                </div>
                <table class="scores">
                    <tr>
                        <th v-for="attribute in parsedAttributes" :key="attribute.stat">
                            <h4>{{ attribute.stat }}</h4>
                        </th>
                    </tr>
                    <tr>
                        <td v-for="attribute in parsedAttributes" :key="attribute.stat">
                            <p>{{ attribute.value }}</p>
                        </td>
                    </tr>
                </table>
                <div v-if="monster.skills && monster.skills.length > 0 && monster.skills !== 'None'" class="property-line">
                    <h4>Skills: </h4>
                    <p> {{ monster.skills }}</p>
                </div>
                <div v-if="monster.saving_throws && monster.saving_throws.length > 0 && monster.saving_throws !== 'None'"
                    class="property-line">
                    <h4>Saving Throws: </h4>
                    <p> {{ monster.saving_throws }}</p>
                </div>
                <div v-if="monster.damage_resistances && monster.damage_resistances.length > 0 && monster.damage_resistances !== 'None'"
                    class="property-line">
                    <h4>Damage Resistances: </h4>
                    <p>{{ monster.damage_resistances }}</p>
                </div>
                <div v-if="monster.damage_immunities && monster.damage_immunities.length > 0 && monster.damage_immunities !== 'None'"
                    class="property-line">
                    <h4>Damage Immunities: </h4>
                    <p>{{ monster.damage_immunities }}</p>
                </div>
                <div v-if="monster.condition_immunities && monster.condition_immunities.length > 0 && monster.condition_immunities !== 'None'"
                    class="property-line">
                    <h4>Condition Immunities: </h4>
                    <p>{{ monster.condition_immunities }}</p>
                </div>
                <div class="property-line">
                    <h4>Senses: </h4>
                    <p>{{ monster.senses }}</p>
                </div>
                <div class="property-line">
                    <h4>Languages: </h4>
                    <p>{{ monster.languages }}</p>
                </div>
                <div class="property-line">
                    <h4>CR:</h4>
                    <p>{{ monster.challenge_rating }}</p>
                </div>
                <div class="property-line">
                    <h4>Proficiency Bonus:</h4>
                    <p>{{ monster.proficiency_bonus }}</p>
                </div>
            </div>
            <svg height="5" width="100%" class="tapered-rule">
                <polyline points="0,0 400,2.5 0,5"></polyline>
            </svg>
            <ul class="abilities">
                <li v-for="(ability, index) in monster.abilities" :key="index">
                    <strong>{{ ability.name }}. </strong>{{ ability.description }}
                </li>
            </ul>
        </div>
        <div class="statblock">
            <h3>Actions</h3>
            <ul class="abilities">
                <li v-for="(action, index) in monster.actions" :key="index">
                    <strong>{{ action.name }}: </strong>{{ action.description }}
                </li>
            </ul>
            <div v-if="monster.legendary_actions && monster.legendary_actions.length > 0">
                <h3>Legendary Actions</h3>
                <p>The monster can take 3 legendary actions, choosing from the options below. Only one legendary action
                    option can be used at a time and only at the end of another creature's turn. The monster regains spent
                    legendary actions at the start of its turn.</p>
                <ul class="abilities">
                    <li v-for="(action, index) in monster.legendary_actions" :key="index">
                        <strong>{{ action.name }}: </strong>{{ action.description }}
                    </li>
                </ul>
            </div>
        </div>
    </div>
    <div v-if="monster" class="instructions">
        <h3>Use Homebrewery to Make a Beautiful PDF of Your Statblock!</h3>
        <cdr-list tag="ol" modifier="ordered">
            <li>Click the "Copy as Markdown" button below to copy the generated content in markdown format.</li>
            <li>Visit <a href="https://homebrewery.naturalcrit.com/new" target="_blank"
                    rel="noopener noreferrer">Homebrewery</a>.</li>
            <li>Paste the copied markdown into the document on the left hand side. Feel free to edit or reorder the
                content as
                you like.</li>
            <li>Enjoy the beautifully formatted content!</li>
        </cdr-list>
        <div class="markdown-button">
            <cdr-button @click="copyAsMarkdown">Copy as Markdown</cdr-button>
        </div>
    </div>
</template>
  
<script setup>
import { ref, computed, defineProps } from 'vue';
import { CdrToggleButton, CdrToggleGroup, CdrButton, CdrList } from "@rei/cedar";
import { statblockToMarkdown } from '../util/convertToMarkdown.mjs';
import "@rei/cedar/dist/style/cdr-toggle-group.css";
import "@rei/cedar/dist/style/cdr-toggle-button.css";
import "@rei/cedar/dist/style/cdr-list.css";
import "@rei/cedar/dist/style/cdr-button.css";
// Props
const props = defineProps({
    creatureData: {
        type: Object,
        default: {}
    }
});

// Reactive state
const columns = ref('two_columns');
const monster = ref(props.creatureData);

// Computed properties
const parsedAttributes = computed(() => {
    return monster.value.attributes.split(',').map(attr => {
        const [stat, ...valueParts] = attr.trim().split(' ');
        const value = valueParts.join(' ');
        return { stat, value };
    });
});

const copyAsMarkdown = () => {

    const markdownContent = statblockToMarkdown(monster.value, columns.value);

console.log(columns.value);
    if (markdownContent) {
        const textarea = document.createElement('textarea');
        textarea.textContent = markdownContent;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);

        // Optionally, display a message that the content has been copied.
        alert('Content copied as markdown!');
    } else {
        // If there is no content to copy, display a message to the user.
        alert('No content available to copy as markdown.');
    }
}

</script>


  
<style lang="scss" scoped>
.container {
    display: grid;

    justify-content: center;
    background: #FDF1DC;
    background-image: url('../assets/parchment.jpg');
    background-blend-mode: overlay;
    background-attachment: fixed;

    margin: 2rem auto;
    padding: 16px 24px;
    box-shadow: 1px 4px 14px #888;

    &.one_column {
        grid-template-columns: 1fr;
        width: 425px;
    }

    &.two_columns {
        grid-template-columns: 1fr 1fr;
        width: 850px;
        gap: 2rem;
    }
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
}

.scores {
    width: 90%;
    text-align: center;
    margin: 1rem auto;
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
}

.instructions {
  max-width: 700px;
  padding: 3rem;
  margin: 0 auto;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
}

.markdown-button {
  display: flex;
  button {
    margin: 2rem auto 1rem;
  }
}
</style>