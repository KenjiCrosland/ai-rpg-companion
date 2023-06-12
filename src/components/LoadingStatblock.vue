<template>
    <cdr-toggle-group v-model="columns" style="max-width: 25rem">
        <cdr-toggle-button toggleValue="one_column">1 Column</cdr-toggle-button>
        <cdr-toggle-button toggleValue="two_columns">2 Columns</cdr-toggle-button>
    </cdr-toggle-group>

    <div v-if="loading" :class="`container ${columns}`">

        <div class="statblock">
            <CdrSkeleton>
            <div class="creature-heading">
                <CdrSkeletonBone type="line" class="statblock-bone" style="width:65%; height: 22px;" />
                <CdrSkeletonBone type="line" class="statblock-bone" style="width:45%; height: 1.2em;" />
            </div>
            <svg height="5" width="100%" class="tapered-rule">
                <polyline points="0,0 400,2.5 0,5"></polyline>
            </svg>
            <div class="property-block">
                <div class="property-line-skeleton">
                    <CdrSkeletonBone type="line" class="skeleton-line-item statblock-bone" style="width: 6rem" />
                    <CdrSkeletonBone type="line" class="skeleton-line-item statblock-bone" style="width: 2rem" />
                </div>
                <div class="property-line-skeleton">
                    <CdrSkeletonBone type="line" class="skeleton-line-item statblock-bone" style="width: 5rem" />
                    <CdrSkeletonBone type="line" class="skeleton-line-item statblock-bone" style="width: 7rem" />
                </div>
                <div class="property-line-skeleton">
                    <CdrSkeletonBone type="line" class="skeleton-line-item statblock-bone" style="width: 4rem" />
                    <CdrSkeletonBone type="line" class="skeleton-line-item statblock-bone" style="width: 3rem" />
                </div>
                <div>
                    <CdrSkeletonBone type="line" class="skeleton-line-item statblock-bone" style="width: 75%; height: 3.5rem; margin: 1rem auto;" />
                </div>
                <div class="property-line-skeleton">
                    <CdrSkeletonBone type="line" class="skeleton-line-item statblock-bone" style="width: 7rem" />
                    <CdrSkeletonBone type="line" class="skeleton-line-item statblock-bone" style="width: 4rem" />
                </div>
                <div class="property-line-skeleton">
                    <CdrSkeletonBone type="line" class="skeleton-line-item statblock-bone" style="width: 8rem" />
                    <CdrSkeletonBone type="line" class="skeleton-line-item statblock-bone" style="width: 20rem" />
                </div>
                <div class="property-line-skeleton">
                    <CdrSkeletonBone type="line" class="skeleton-line-item statblock-bone" style="width: 4rem" />
                    <CdrSkeletonBone type="line" class="skeleton-line-item statblock-bone" style="width: 26rem" />
                </div>
                <div class="property-line-skeleton">
                    <CdrSkeletonBone type="line" class="skeleton-line-item statblock-bone" style="width: 5rem" />
                    <CdrSkeletonBone type="line" class="skeleton-line-item statblock-bone" style="width: 24rem" />
                </div>
                <div class="property-line-skeleton">
                    <CdrSkeletonBone type="line" class="skeleton-line-item statblock-bone" style="width: 3rem" />
                    <CdrSkeletonBone type="line" class="skeleton-line-item statblock-bone" style="width: 4rem" />
                </div>
                <div class="property-line-skeleton">
                    <CdrSkeletonBone type="line" class="skeleton-line-item statblock-bone" style="width: 4rem" />
                    <CdrSkeletonBone type="line" class="skeleton-line-item statblock-bone" style="width: 5rem" />
                </div>
            </div>

            <svg height="5" width="100%" class="tapered-rule">
                    <polyline points="0,0 400,2.5 0,5"></polyline>
            </svg>
            <div class="property-line-skeleton" style="margin-top: 1rem;">
                    <CdrSkeletonBone type="line" class="skeleton-line-item statblock-bone" style="width: 20%" />
                    <CdrSkeletonBone type="line" class="skeleton-line-item statblock-bone" style="width: 75%" />
            </div>
            <CdrSkeletonBone type="line" class="skeleton-line-item statblock-bone" style="width: 94%; margin-top: 3px;" />
            <CdrSkeletonBone type="line" class="skeleton-line-item statblock-bone" style="width: 95%" />
            <CdrSkeletonBone type="line" class="skeleton-line-item statblock-bone" style="width: 45%" />
            <div class="property-line-skeleton" style="margin-top: 1rem;">
                    <CdrSkeletonBone type="line" class="skeleton-line-item statblock-bone" style="width: 20%" />
                    <CdrSkeletonBone type="line" class="skeleton-line-item statblock-bone" style="width: 75%" />
            </div>
            <CdrSkeletonBone type="line" class="skeleton-line-item statblock-bone" style="width: 94%; margin-top: 3px;" />
            <CdrSkeletonBone type="line" class="skeleton-line-item statblock-bone" style="width: 95%" />
            <CdrSkeletonBone type="line" class="skeleton-line-item statblock-bone" style="width: 45%" />
        </CdrSkeleton>
        </div>
        <div class="statblock">
             <CdrSkeleton>
            <h3>Actions</h3>
            <div class="property-line-skeleton" style="margin-top: 1rem;">
                    <CdrSkeletonBone type="line" class="skeleton-line-item statblock-bone" style="width: 20%" />
                    <CdrSkeletonBone type="line" class="skeleton-line-item statblock-bone" style="width: 75%" />
            </div>
            <CdrSkeletonBone type="line" class="skeleton-line-item statblock-bone" style="width: 44%; margin-top: 3px;" />
            <div class="property-line-skeleton" style="margin-top: 1rem;">
                    <CdrSkeletonBone type="line" class="skeleton-line-item statblock-bone" style="width: 20%" />
                    <CdrSkeletonBone type="line" class="skeleton-line-item statblock-bone" style="width: 75%" />
            </div>
            <CdrSkeletonBone type="line" class="skeleton-line-item statblock-bone" style="width: 44%; margin-top: 3px;" />
            <div class="property-line-skeleton" style="margin-top: 1rem;">
                    <CdrSkeletonBone type="line" class="skeleton-line-item statblock-bone" style="width: 20%" />
                    <CdrSkeletonBone type="line" class="skeleton-line-item statblock-bone" style="width: 75%" />
            </div>
            <CdrSkeletonBone type="line" class="skeleton-line-item statblock-bone" style="width: 94%; margin-top: 3px;" />
            <CdrSkeletonBone type="line" class="skeleton-line-item statblock-bone" style="width: 95%" />
            <CdrSkeletonBone type="line" class="skeleton-line-item statblock-bone" style="width: 45%" />
            <div class="property-line-skeleton" style="margin-top: 1rem;">
                    <CdrSkeletonBone type="line" class="skeleton-line-item statblock-bone" style="width: 20%" />
                    <CdrSkeletonBone type="line" class="skeleton-line-item statblock-bone" style="width: 75%" />
            </div>
            <CdrSkeletonBone type="line" class="skeleton-line-item statblock-bone" style="width: 94%; margin-top: 3px;" />
            <CdrSkeletonBone type="line" class="skeleton-line-item statblock-bone" style="width: 95%" />
            <CdrSkeletonBone type="line" class="skeleton-line-item statblock-bone" style="width: 45%" />
        </CdrSkeleton> 
        </div>

    </div>
</template>
  
<script setup>
import { ref, computed, defineProps } from 'vue';
import { CdrToggleButton, CdrToggleGroup, CdrSkeleton, CdrSkeletonBone } from "@rei/cedar";
import { statblockToMarkdown } from '../util/convertToMarkdown.mjs';
import "@rei/cedar/dist/style/cdr-toggle-group.css";
import "@rei/cedar/dist/style/cdr-toggle-button.css";
import "@rei/cedar/dist/style/cdr-skeleton.css";
import "@rei/cedar/dist/style/cdr-skeleton-bone.css";
// Props
const props = defineProps({
    loading: {
        type: Boolean,
        default: false,
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
.statblock-bone {
    background-image: linear-gradient(90deg, #efdfc2 0%, #FDF4E3 15%, #efdfc2 30%);
}
.property-line-skeleton {
  display: flex;
  justify-content: flex-start;
  gap: .5rem;
}
.skeleton-line-item{
    height: 1em;
    flex-grow: 0;
}
//linear-gradient(90deg, #e2d9ca 0%, #FDF4E3 15%, #e2d9ca 30%)
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