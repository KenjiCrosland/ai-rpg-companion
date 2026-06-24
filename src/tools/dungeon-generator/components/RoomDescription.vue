<template>
  <div>
    <ParTabToggle
      v-if="contentArray.length > 1"
      v-model="activeView"
      :options="viewToggleOptions"
    />
    <h3 class="room-title parchment">{{ roomName }}</h3>
    <div v-if="activeView === 'form'" class="room-form parchment">
      <p class="room-form__intro">
        All fields below are optional. Click <em>Generate description</em> to create a room from the dungeon's existing context, or fill in any field to steer the generation.
      </p>
      <ParCardInput v-model="roomFormName" label="Room Name" />
      <ParCardTextarea v-model="roomFormShortDescription" label="Short Description" :rows="3" />
      <ParCardSelect
        v-model="selectedNPCName"
        label="Include NPC in Room"
        :options="npcOptions"
        hint="Select an NPC to be present in this room."
      />
      <div class="room-form__group">
        <span class="room-form__group-label">Room Types</span>
        <ParCheckbox v-model="setbackRoom">
          Setback Room {{ initialRoomType === 'setback' ? '(Recommended)' : '' }}
        </ParCheckbox>
        <ParCheckbox v-model="bossRoom">
          Boss Room {{ initialRoomType === 'boss' ? '(Recommended)' : '' }}
        </ParCheckbox>
      </div>
      <div class="generation-button">
        <ParButton size="xsmall" @click="generateDescription">
          Generate description
        </ParButton>
      </div>
    </div>
    <div v-if="activeView === 'loading'">
      <RoomSkeleton />
    </div>
    <div v-if="activeView === 'description'">
      <!-- View Mode -->
      <!-- `parchment` class opts this subtree out of App.vue's global
           font-family !important override (which forces --font-sans on
           every non-parchment descendant). Without it, the serif body
           font declared below silently loses to the global rule. -->
      <div v-if="!isEditingRoom" class="room-description-body parchment">
        <div v-for="(item, index) in contentArray" :key="index">
          <template v-if="item.format === 'read_aloud'">
            <!-- Read-aloud: lapis-backed box, sans-serif bold cream text.
                 Sourcebook treatment — distinct visual register from the
                 body so the DM can see at a glance what's read aloud
                 vs. what's reference. -->
            <div class="read-aloud-box">
              <p v-html="renderMarkdown(item.content)"></p>
            </div>
          </template>
          <!-- format: 'header' intentionally not rendered. The room
               title (h3 above) is the room's heading; a per-room
               descriptive_header was sourcebook-redundant.  The
               contentArray still carries the header item so existing
               localStorage data and the edit-form serialization stay
               intact; the underlying prompt slot will be removed in
               the room-prompt audit. -->
          <template v-else-if="item.format === 'header'">
            <!-- not rendered -->
          </template>
          <template v-else-if="item.format === 'paragraph'">
            <p class="room-paragraph" v-html="renderMarkdown(item.content)"></p>
          </template>
        </div>
        <div class="generation-button">
          <ParButton size="xsmall" @click="generateDescription">
            Re-Generate Description
          </ParButton>
          <ParButton size="xsmall" variant="secondary" @click="startEditingRoom">
            Edit Room
          </ParButton>
        </div>
      </div>

      <!-- Edit Mode -->
      <div v-else class="edit-form parchment">
        <h3 class="edit-form__title">Edit room description</h3>

        <ParCardInput
          v-model="roomEditForm.name"
          label="Room Name"
          hint="The name of the room (without the room number)"
          class="edit-field"
        />

        <ParCardTextarea
          v-model="roomEditForm.content"
          label="Room Content (Markup Format)"
          :rows="20"
          class="edit-field"
        />
        <div class="markup-help">
          <strong>Markup Format Guide:</strong><br>
          • Use <code>[READ_ALOUD]...[/READ_ALOUD]</code> for read-aloud text boxes<br>
          • Use <code>## Header Text</code> for section headers<br>
          • Leave blank lines between paragraphs<br>
          • Multiple [READ_ALOUD] blocks are supported (e.g., for entrance/completion descriptions)
        </div>

        <div class="button-group">
          <ParButton size="xsmall" @click="saveEditRoom">Save changes</ParButton>
          <ParButton size="xsmall" variant="secondary" @click="cancelEditRoom">Cancel</ParButton>
        </div>
      </div>
    </div>
    <div
      v-if="!dungeonStore.isMapSidebarCollapsed && room && room.doorways && room.doorways.length"
      class="connecting-rooms parchment"
    >
      <h3 class="connecting-rooms__title">Connecting Rooms</h3>
      <ul class="connecting-room-list">
        <li class="connecting-room" v-for="doorway in room.doorways" :key="doorway.connectedRoomId">
          <ParCardButton
            variant="link"
            size="small"
            @click="selectConnectedRoom(doorway.connectedRoomId)"
          >
            {{ doorway.connectedRoomId }}. {{ getRoomName(doorway.connectedRoomId) }}
          </ParCardButton>
        </li>
      </ul>
    </div>
    <BossStatblockPrompt
      :opened="showBossStatblockModal"
      :apex-name="bossStatblockApexName"
      @generate="onBossStatblockGenerate"
      @skip="onBossStatblockSkip"
      @cancel="onBossStatblockCancel"
    />
  </div>
</template>

<script setup>
import {
  ParButton,
  ParCardButton,
  ParCheckbox,
  ParCardInput,
  ParCardSelect,
  ParTabToggle,
  ParCardTextarea,
} from "@/parchment";
import { ref, watch, onMounted, computed } from 'vue';

const viewToggleOptions = [
  { value: 'description', label: 'Show description' },
  { value: 'form', label: 'Show form' },
];
import RoomSkeleton from './skeletons/RoomSkeleton.vue';
import BossStatblockPrompt from './BossStatblockPrompt.vue';
import { useDungeonStore } from '../stores/dungeon-store.mjs';
import { useRoomDescription } from '../composables/useRoomDescription.js';

const dungeonStore = useDungeonStore();
const { generateRoomDescription } = useRoomDescription();

const showBossStatblockModal = ref(false);
const bossStatblockApexName = ref('');
let bossStatblockResolver = null;

// `dungeon-prefs:skipBossStatblockPrompt` is a per-dungeon "don't ask again"
// flag. Stored as a Set of dungeon ids in localStorage so the preference
// is durable but scoped — generating a new dungeon resurfaces the prompt.
const SKIP_PROMPT_STORAGE_KEY = 'dungeon-prefs:skipBossStatblockPrompt';

function shouldSkipBossStatblockPrompt(dungeonId) {
  if (!dungeonId) return false;
  try {
    const raw = localStorage.getItem(SKIP_PROMPT_STORAGE_KEY);
    if (!raw) return false;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.includes(dungeonId);
  } catch {
    return false;
  }
}

function markSkipBossStatblockPrompt(dungeonId) {
  if (!dungeonId) return;
  try {
    const raw = localStorage.getItem(SKIP_PROMPT_STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    const list = Array.isArray(parsed) ? parsed : [];
    if (!list.includes(dungeonId)) list.push(dungeonId);
    localStorage.setItem(SKIP_PROMPT_STORAGE_KEY, JSON.stringify(list));
  } catch {
    // localStorage write failed — non-fatal, user just sees the modal again
  }
}

const contentArray = ref([]);
const roomName = ref('');
const roomFormName = ref('');
const roomFormShortDescription = ref('');
const selectedNPCName = ref(null);
const npcOptions = computed(() => {
  const dungeon = dungeonStore.currentDungeon;
  if (!dungeon?.npcs) return [{ value: 'None', label: 'None' }];
  // Annotate dropdown options for NPCs already committed (via room
  // generation) to a DIFFERENT room. Reads from room-side state
  // (`room.includedNpcIds`, set when a description is generated),
  // so reassignments before generation stay free. Plural because
  // the LLM can place multiple NPCs in one room.
  const currentRoomId = dungeonStore.selectedRoomId;
  const committedRoomByNpcId = {};
  for (const room of (dungeon.rooms || [])) {
    const ids = room.includedNpcIds
      || (room.includedNpcId ? [room.includedNpcId] : []);
    for (const id of ids) {
      committedRoomByNpcId[id] = room.id;
    }
  }
  return [
    { value: 'None', label: 'None' },
    ...dungeon.npcs.map((npc) => {
      const committedRoomId = committedRoomByNpcId[npc.npc_id];
      const isElsewhere = committedRoomId && committedRoomId !== currentRoomId;
      return {
        value: npc.name,
        label: isElsewhere ? `${npc.name} (in area ${committedRoomId})` : npc.name,
      };
    }),
  ];
});
const room = ref(null);
const activeView = ref('description');

const initialRoomType = room.value?.roomType || null;

// Edit mode state
const isEditingRoom = ref(false);
const roomEditForm = ref({
  name: '',
  content: ''
});

const setbackRoom = computed({
  get() {
    return room.value?.roomType === 'setback';
  },
  set(value) {
    if (room.value) {
      room.value.roomType = value ? 'setback' : null;
    }
  },
});

const bossRoom = computed({
  get() {
    return room.value?.roomType === 'boss';
  },
  set(value) {
    if (room.value) {
      room.value.roomType = value ? 'boss' : null;
    }
  },
});

/**
 * Render the small subset of Markdown the room prompts emit
 * (**bold** and *italic*). HTML-escape first so any stray < / > / &
 * from the AI output renders as text, not markup; then promote
 * **...** to <strong> and *...* to <em>. Bold runs first so its
 * paired asterisks are consumed before the italic pass sees them.
 *
 * The output goes through v-html in the template — safe because the
 * input goes through this escape step before any tag is reintroduced.
 *
 * Kept inline (not a util) because it's currently the only markdown
 * surface in the dungeon generator. Extract when a second consumer
 * appears.
 */
function renderMarkdown(text) {
  if (!text) return '';
  const escaped = String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
  return escaped
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*\n]+)\*/g, '<em>$1</em>');
}

// **Define getRoomName Method**
function getRoomName(roomId) {
  if (!dungeonStore.currentDungeon || !dungeonStore.currentDungeon.rooms) {
    return `Room ${roomId}`;
  }
  const connectedRoom = dungeonStore.currentDungeon.rooms.find(r => r.id === roomId);
  return connectedRoom ? connectedRoom.name || `Room ${roomId}` : `Room ${roomId}`;
}

// **Define selectConnectedRoom Method**
function selectConnectedRoom(roomId) {
  dungeonStore.selectedRoomId = roomId;
}

// Mid-generation guard. While true, both watchers below skip their
// loadRoomData calls. Without this, generateDungeonNPC's reactive
// mutations (npcs splice, then saveDungeons) re-evaluate the
// `currentDungeon` computed mid-flow and the watcher fires
// loadRoomData with the room's still-old contentArray (length 1),
// flipping activeView from 'loading' to 'form'. The subsequent room
// generation succeeds and writes the new contentArray, but the
// local `contentArray` ref is now pointing at the wrong state and
// the new content never paints. Flipped on at the top of
// generateDescription and off in the finally block.
const isGenerating = ref(false);

// Watch for changes in selectedRoomId or currentDungeon
watch(
  () => dungeonStore.selectedRoomId,
  (newVal) => {
    if (isGenerating.value) return;
    if (dungeonStore.currentDungeon && newVal !== null) {
      loadRoomData(newVal);
    } else {
      return;
    }
  },
  { immediate: true }
);

watch(
  () => dungeonStore.currentDungeon,
  (newVal) => {
    if (isGenerating.value) return;
    if (newVal && dungeonStore.selectedRoomId !== null) {
      loadRoomData(dungeonStore.selectedRoomId);
    } else {
      return;
    }
  },
  { immediate: true }
);

function loadRoomData(roomId) {
  if (!dungeonStore.currentDungeon || !dungeonStore.currentDungeon.rooms) {
    return;
  }

  room.value = dungeonStore.currentDungeon.rooms.find((room) => room.id === roomId);
  if (room.value) {
    contentArray.value = room.value.contentArray || [
      { format: 'paragraph', content: 'No description available.' },
    ];
    roomName.value = `${roomId}. ${room.value.name || `Room ${roomId}`}`;
    roomFormName.value = room.value.name || '';
    roomFormShortDescription.value = room.value.oneSentenceSummary || '';
    if (contentArray.value.length > 1) {
      activeView.value = 'description';
    } else {
      activeView.value = 'form';
    }
  } else {
    contentArray.value = [{ format: 'paragraph', content: 'No description available.' }];
    roomName.value = `Room ${roomId}`;
  }
}

// Resolve which apex monster (large_creature tier) is assigned to a
// given room, returning the monster object or null. Used by the
// boss-room statblock check to decide whether to surface the modal.
function findApexInRoom(roomId) {
  const dungeon = dungeonStore.currentDungeon;
  const monsterIds
    = dungeon?.monsterAssignments?.rooms_to_monster_ids?.[roomId] || [];
  if (monsterIds.length === 0) return null;
  if (!Array.isArray(dungeon?.monsters)) return null;
  for (const id of monsterIds) {
    const monster = dungeon.monsters.find(m => m.id === id);
    if (monster?.type === 'large_creature') return monster;
  }
  return null;
}

// Generate the apex's statblock via the dungeon store. Awaits
// completion; returns true on success, false on any failure (the
// caller proceeds to room generation either way; statblock just
// won't be available for context if generation failed).
async function generateApexStatblock(apex) {
  if (!apex) return false;
  try {
    await dungeonStore.generateMonsterStatblock(apex.id, dungeonStore.premium);
    return Boolean(apex.statblock?.name);
  } catch (err) {
    console.error('[boss-statblock] generation failed:', err);
    return false;
  }
}

// Show the boss-statblock prompt modal and return a Promise that
// resolves to 'generate' | 'skip' | 'cancel'. Stored callbacks are
// invoked by the modal event handlers below.
function promptForBossStatblock(apex) {
  bossStatblockApexName.value = apex?.name || 'the apex monster';
  showBossStatblockModal.value = true;
  return new Promise((resolve) => {
    bossStatblockResolver = resolve;
  });
}

function onBossStatblockGenerate({ dontAskAgain }) {
  showBossStatblockModal.value = false;
  if (dontAskAgain) markSkipBossStatblockPrompt(dungeonStore.currentDungeon?.id);
  if (bossStatblockResolver) {
    bossStatblockResolver('generate');
    bossStatblockResolver = null;
  }
}

function onBossStatblockSkip({ dontAskAgain }) {
  showBossStatblockModal.value = false;
  if (dontAskAgain) markSkipBossStatblockPrompt(dungeonStore.currentDungeon?.id);
  if (bossStatblockResolver) {
    bossStatblockResolver('skip');
    bossStatblockResolver = null;
  }
}

function onBossStatblockCancel() {
  showBossStatblockModal.value = false;
  if (bossStatblockResolver) {
    bossStatblockResolver('cancel');
    bossStatblockResolver = null;
  }
}

async function generateDescription() {
  if (!dungeonStore.currentDungeon) {
    console.error('No current dungeon selected.');
    return;
  }

  isGenerating.value = true;
  try {
    await runGenerateDescription();
  } finally {
    isGenerating.value = false;
  }
}

async function runGenerateDescription() {
  const roomTypeOptions = {
    setback: setbackRoom.value,
    boss: bossRoom.value,
  };

  // Boss-room statblock gate. If this is a boss room and an apex is
  // assigned but lacks a statblock, surface the prompt (unless the user
  // has opted out for this dungeon). The room description is much
  // stronger when it can reference the actual abilities.
  const currentRoom = dungeonStore.currentDungeon.rooms?.find(
    r => r.id === dungeonStore.selectedRoomId,
  );
  if (currentRoom?.roomType === 'boss') {
    const apex = findApexInRoom(dungeonStore.selectedRoomId);
    const apexNeedsStatblock = apex && !apex.statblock?.name;
    const skipPrompt = shouldSkipBossStatblockPrompt(
      dungeonStore.currentDungeon.id,
    );
    if (apexNeedsStatblock && !skipPrompt) {
      const choice = await promptForBossStatblock(apex);
      if (choice === 'cancel') return;
      if (choice === 'generate') {
        activeView.value = 'loading';
        await generateApexStatblock(apex);
        // fall through to room generation regardless of statblock
        // success — the room helper degrades gracefully if absent
      }
    }
  }

  if (selectedNPCName.value === 'None') {
    selectedNPCName.value = null;
  }

  // NPC reassignment gate. If the user picked an NPC that's already
  // baked into another room's description, confirm they want to move
  // it. Reads from the committed-room state (`room.includedNpcIds`),
  // not the planning `npcAssignments`. Plural because the LLM can
  // place multiple NPCs in one room.
  let movedFromRoomId = null;
  let movedNpcId = null;
  if (selectedNPCName.value) {
    const dungeon = dungeonStore.currentDungeon;
    const pickedNpc = dungeon.npcs.find(n => n.name === selectedNPCName.value);
    if (pickedNpc) {
      const currentRoomId = dungeonStore.selectedRoomId;
      const committedElsewhere = (dungeon.rooms || []).find((r) => {
        if (r.id === currentRoomId) return false;
        const ids = r.includedNpcIds
          || (r.includedNpcId ? [r.includedNpcId] : []);
        return ids.includes(pickedNpc.npc_id);
      });
      if (committedElsewhere) {
        const move = window.confirm(
          `${pickedNpc.name} is currently in area ${committedElsewhere.id}. `
          + `Move ${pickedNpc.name} to this room?`,
        );
        if (!move) return; // form stays open, generation aborts
        movedFromRoomId = committedElsewhere.id;
        movedNpcId = pickedNpc.npc_id;
      }
    }
  }

  activeView.value = 'loading';

  // NPC handling. When the user picks an NPC, pass that NPC's
  // current data (stub or fully-described) through to room
  // generation. No auto-generation — if the user wants a richer
  // NPC, they go to the NPCs tab and generate the description
  // there explicitly. Pre-assigned NPCs flow through via
  // formatRoomNPCsForPrompt at their stub level.
  let npcData = null;
  if (selectedNPCName.value) {
    const npcIndex = dungeonStore.currentDungeon.npcs.findIndex(
      (npc) => npc.name === selectedNPCName.value
    );
    if (npcIndex !== -1) {
      npcData = dungeonStore.currentDungeon.npcs[npcIndex];
    }
  }

  // Call generateRoomDescription with npcData
  await generateRoomDescription(
    dungeonStore.currentDungeon,
    dungeonStore.selectedRoomId,
    roomFormName.value,
    roomFormShortDescription.value,
    npcData,
    roomTypeOptions
  );

  // Persist NPC commitment on the room. The dropdown reads this
  // (`room.includedNpcIds`) to annotate "(in area N)" for NPCs baked
  // into another room's narrative.
  //   - Manual pick: commit just the picked NPC for this room.
  //   - No manual pick: commit any LLM-assigned NPCs for this room
  //     (from `npcAssignments.rooms_to_npc_ids`) — those were the
  //     ones that flowed into formatRoomNPCsForPrompt.
  // On a confirmed move, remove the moved NPC from the previous
  // room's includedNpcIds so it doesn't claim them in two places.
  const dungeon = dungeonStore.currentDungeon;
  const generatedRoom = dungeon.rooms.find(
    r => r.id === dungeonStore.selectedRoomId,
  );
  if (generatedRoom) {
    let committedIds = [];
    if (selectedNPCName.value) {
      const pickedNpc = dungeon.npcs.find(n => n.name === selectedNPCName.value);
      if (pickedNpc) committedIds = [pickedNpc.npc_id];
    } else {
      const assigned = dungeon.npcAssignments?.rooms_to_npc_ids?.[generatedRoom.id]
        || [];
      committedIds = [...assigned];
    }
    if (committedIds.length > 0) {
      generatedRoom.includedNpcIds = committedIds;
    } else {
      delete generatedRoom.includedNpcIds;
    }
    delete generatedRoom.includedNpcId;
  }
  if (movedFromRoomId && movedNpcId) {
    const oldRoom = dungeon.rooms.find(r => r.id === movedFromRoomId);
    if (oldRoom) {
      const remaining = (oldRoom.includedNpcIds || []).filter(
        id => id !== movedNpcId,
      );
      if (remaining.length > 0) {
        oldRoom.includedNpcIds = remaining;
      } else {
        delete oldRoom.includedNpcIds;
      }
      delete oldRoom.includedNpcId;
    }
  }

  activeView.value = 'description';
  dungeonStore.saveDungeons();
  loadRoomData(dungeonStore.selectedRoomId);
}

// Convert contentArray to markup format
function contentArrayToMarkup(contentArr) {
  if (!contentArr || contentArr.length === 0) {
    return '';
  }

  const parts = [];

  contentArr.forEach(item => {
    if (item.format === 'read_aloud') {
      parts.push(`[READ_ALOUD]\n${item.content}\n[/READ_ALOUD]`);
    } else if (item.format === 'header') {
      parts.push(`## ${item.content}`);
    } else if (item.format === 'paragraph') {
      parts.push(item.content);
    }
  });

  return parts.join('\n\n');
}

// Convert markup format to contentArray
function markupToContentArray(markup) {
  if (!markup || !markup.trim()) {
    return [];
  }

  const contentArray = [];
  const lines = markup.split('\n');
  let inReadAloud = false;
  let readAloudContent = [];
  let currentParagraph = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    // Check for read-aloud block start
    if (trimmed === '[READ_ALOUD]') {
      // Save any accumulated paragraph first
      if (currentParagraph.length > 0) {
        contentArray.push({
          format: 'paragraph',
          content: currentParagraph.join(' ').trim()
        });
        currentParagraph = [];
      }
      inReadAloud = true;
      readAloudContent = [];
      continue;
    }

    // Check for read-aloud block end
    if (trimmed === '[/READ_ALOUD]') {
      if (inReadAloud && readAloudContent.length > 0) {
        contentArray.push({
          format: 'read_aloud',
          content: readAloudContent.join(' ').trim()
        });
      }
      inReadAloud = false;
      readAloudContent = [];
      continue;
    }

    // If we're in a read-aloud block
    if (inReadAloud) {
      if (trimmed) {
        readAloudContent.push(trimmed);
      }
      continue;
    }

    // Check for headers (##)
    if (trimmed.startsWith('## ')) {
      // Save any accumulated paragraph first
      if (currentParagraph.length > 0) {
        contentArray.push({
          format: 'paragraph',
          content: currentParagraph.join(' ').trim()
        });
        currentParagraph = [];
      }
      // Add header
      contentArray.push({
        format: 'header',
        content: trimmed.substring(3).trim()
      });
      continue;
    }

    // Handle regular content
    if (trimmed === '') {
      // Empty line indicates paragraph break
      if (currentParagraph.length > 0) {
        contentArray.push({
          format: 'paragraph',
          content: currentParagraph.join(' ').trim()
        });
        currentParagraph = [];
      }
    } else {
      // Add to current paragraph
      currentParagraph.push(trimmed);
    }
  }

  // Add any remaining paragraph
  if (currentParagraph.length > 0) {
    contentArray.push({
      format: 'paragraph',
      content: currentParagraph.join(' ').trim()
    });
  }

  return contentArray;
}

// Start editing room
function startEditingRoom() {
  if (!room.value) return;

  roomEditForm.value = {
    name: room.value.name || '',
    content: contentArrayToMarkup(contentArray.value)
  };

  isEditingRoom.value = true;
}

// Cancel editing room
function cancelEditRoom() {
  isEditingRoom.value = false;
}

// Save edited room
function saveEditRoom() {
  if (!room.value) return;

  // Update room name
  room.value.name = roomEditForm.value.name;

  // Update contentArray from markup
  room.value.contentArray = markupToContentArray(roomEditForm.value.content);

  // Update the local contentArray ref
  contentArray.value = room.value.contentArray;

  // Update room name display
  roomName.value = `${room.value.id}. ${room.value.name || `Room ${room.value.id}`}`;

  // Save to localStorage
  dungeonStore.saveDungeons();

  isEditingRoom.value = false;
}

onMounted(() => {
  if (!dungeonStore.currentDungeon || !dungeonStore.currentDungeon.rooms || dungeonStore.currentDungeon.rooms.length === 0) {
    return;
  }

  if (dungeonStore.selectedRoomId === null) {
    dungeonStore.selectedRoomId = dungeonStore.currentDungeon.rooms[0].id;
  }
  loadRoomData(dungeonStore.selectedRoomId);
});
</script>

<style scoped>
/* Room body: serif body text, generous line-height for sourcebook
   readability. Wrapper class so the typography only applies inside
   the rendered description (not the form/edit views). */
.room-description-body {
  font-family: var(--par-font-serif, 'Source Serif 4', Georgia, 'Times New Roman', serif);
  color: var(--par-color-text, #222);
}

.room-paragraph {
  font-family: var(--par-font-serif, 'Source Serif 4', Georgia, 'Times New Roman', serif);
  color: var(--par-color-text, #222);
  /* 1.6rem (25.6px) — substantial sourcebook-reading size. The
     calculated chars-per-line approach (which suggested ~20px)
     undercounted the actual rendered column width, and the smaller
     value felt visually weak against the 2.5rem title. */
  font-size: 1.6rem;
  line-height: 1.65;
  margin: 0 0 1.2rem;
}

/* Print-typography convention: when paragraphs flow in sequence, the
   first sits flush left and subsequent paragraphs get a first-line
   indent (no blank line needed — the indent signals the break). The
   adjacent-sibling combinator scopes this to runs of paragraphs, so a
   paragraph that follows a non-paragraph (read-aloud box, header, or
   the section start) stays flush left. */
.room-paragraph + .room-paragraph {
  text-indent: 1.5em;
  margin-top: 0;
}

.room-paragraph :deep(strong) {
  /* Weight bump only — same color as body. Color emphasis on inline
     strong would compete with the room-title and read-aloud surface
     for attention; weight alone is the right level of emphasis. */
  font-weight: 700;
}

/* Room title (e.g. "1. Entrance") — serif burgundy in true smallcaps
   for the sourcebook entry-header treatment. `small-caps` (NOT
   `all-small-caps`) preserves the source casing: the initial capital
   "E" stays at full cap-height while the trailing "ntrance" renders
   as small uppercase, giving the classic engraved title shape.
   Letter-spacing tracks out for the printed-adventure feel. The
   `parchment` class on the element exempts it from App.vue's global
   --font-sans !important override so the serif actually applies. */
.room-title {
  font-family: var(--par-font-serif, 'Source Serif 4', Georgia, 'Times New Roman', serif);
  color: var(--par-color-title, #7a1f1f);
  font-variant-caps: small-caps;
  font-weight: 600;
  font-size: 2.5rem;
  letter-spacing: 0.04em;
  line-height: 1.2;
  margin: 0.5rem 0 1.5rem;
}

/* Read-aloud box: pale lapis surface with WotC-style frame — vertical
   rules on left/right only (no horizontal lines) and small filled
   corner dots where horizontal rules would meet vertical ones. Sans
   body text in regular weight; the visual frame itself does the
   "boxed text" signaling, so bolding the base text would be
   redundant. Markdown <strong> stays bold for keyword emphasis. */
.read-aloud-box {
  background-color: var(--par-color-readaloud-bg, #D8E3EF);
  color: var(--par-color-readaloud-text, #1a1a1a);
  /* Side rules at 2px — at 1px they read as hairlines against the
     pale bg and the dot endcaps overpower them. 2px gives a confident
     printed-frame presence matching the WotC sourcebook reference. */
  border-left: 2px solid var(--par-color-readaloud-rule, #7A8FAA);
  border-right: 2px solid var(--par-color-readaloud-rule, #7A8FAA);
  padding: 1.75rem 2rem;
  margin: 1.25rem 0 1.5rem;
  position: relative;
}

/* Four corner dots. Two pseudo-elements (top edge + bottom edge),
   each painting two dots via stacked radial-gradients. The pseudo
   spans the box width plus 3px on each side so the dot centers land
   exactly on the corner intersection (where border-left meets the
   imaginary border-top). */
.read-aloud-box::before,
.read-aloud-box::after {
  content: '';
  position: absolute;
  left: -3px;
  right: -3px;
  height: 6px;
  pointer-events: none;
  background-image:
    radial-gradient(circle at 3px 3px, var(--par-color-readaloud-text, #1a1a1a) 2.5px, transparent 3px),
    radial-gradient(circle at calc(100% - 3px) 3px, var(--par-color-readaloud-text, #1a1a1a) 2.5px, transparent 3px);
  background-repeat: no-repeat;
}

.read-aloud-box::before {
  top: -3px;
}

.read-aloud-box::after {
  bottom: -3px;
}

.read-aloud-box p {
  font-family: var(--par-font-sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif);
  /* Slightly smaller than body (1.6rem) per WotC convention. The
     visual frame already marks this as boxed text; the size
     differential reinforces "supplementary chunk" without being so
     small it reads as fine print. */
  font-size: 1.5rem;
  font-weight: 400;
  line-height: 1.55;
  margin: 0;
  color: var(--par-color-readaloud-text, #1a1a1a);
}

.read-aloud-box :deep(strong) {
  /* Bolded keywords pop without color noise — same color as body,
     standard bold weight. Burgundy strong here would clash with the
     pale lapis surface. */
  font-weight: 700;
  color: var(--par-color-readaloud-text, #1a1a1a);
}

.generation-button {
  margin-top: 1.5rem;
  display: flex;
  gap: 0.75rem;
  justify-content: center;
}

/* Connecting Rooms: parchment-styled section. Burgundy small-caps
   title matching the room-title treatment, then a simple list of
   ParCardButton link variants. The `parchment` class on the wrapper
   opts the section out of App.vue's global font-sans override. */
.connecting-rooms {
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--par-color-divider, #e2dccd);
}

.connecting-rooms__title {
  font-family: var(--par-font-serif, 'Source Serif 4', Georgia, 'Times New Roman', serif);
  color: var(--par-color-title, #7a1f1f);
  font-variant-caps: small-caps;
  font-weight: 600;
  font-size: 1.6rem;
  letter-spacing: 0.04em;
  margin: 0 0 0.5rem;
}

.connecting-room-list {
  margin: 0;
  padding-left: 0;
  list-style: none;
}

.connecting-room {
  list-style: none;
}

/* Show-Form view: tinted parchment surface for the cold-start input
   form, signaling "this is an editable area." Matches the markup-help
   block visual register so the form chrome reads as parchment-native. */
.room-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  background: var(--par-color-callout-bg, #f3ebda);
  border: 1px solid var(--par-color-border, #e8e2d4);
  border-radius: var(--par-radius-md, 4px);
  padding: 1.5rem;
}

/* Form intro: "all fields are optional" affordance. Sans serif at
   muted color so it reads as helper text, not body content. The
   <em>Generate description</em> references the button label exactly
   so users can match the prose to the affordance below. */
.room-form__intro {
  font-family: var(--par-font-sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif);
  font-size: 1.25rem;
  line-height: 1.5;
  color: var(--par-color-text-secondary, #555);
  margin: 0 0 0.5rem;
}

.room-form__intro em {
  font-style: italic;
  color: var(--par-color-title, #7a1f1f);
  font-weight: 600;
}

.room-form__group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.room-form__group-label {
  font-family: var(--par-font-sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif);
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--par-color-title, #7a1f1f);
  letter-spacing: 0.02em;
  margin-bottom: 0.25rem;
}

.edit-form {
  width: 100%;
  margin-top: 1rem;
}

.edit-form__title {
  font-family: var(--par-font-serif, 'Source Serif 4', Georgia, 'Times New Roman', serif);
  color: var(--par-color-title, #7a1f1f);
  font-variant-caps: small-caps;
  font-weight: 600;
  font-size: 1.8rem;
  letter-spacing: 0.04em;
  margin: 0 0 1.25rem;
}

.edit-field {
  margin-bottom: 1.5rem;
}

.button-group {
  display: flex;
  gap: 0.75rem;
  justify-content: center;
  margin-top: 1.5rem;
}

/* Markup help: parchment-toned hint block sitting below the textarea.
   Tinted callout surface + serif body so it feels like supplementary
   instruction baked into the form rather than chrome help text. */
.markup-help {
  font-family: var(--par-font-serif, 'Source Serif 4', Georgia, 'Times New Roman', serif);
  font-size: 1.25rem;
  line-height: 1.6;
  color: var(--par-color-text-secondary, #555);
  background: var(--par-color-callout-bg, #f3ebda);
  border: 1px solid var(--par-color-border, #e8e2d4);
  border-radius: var(--par-radius-md, 4px);
  padding: 1rem 1.25rem;
  margin: -0.75rem 0 1.5rem;
}

.markup-help code {
  background-color: var(--par-color-callout-bg-deep, #ede2cb);
  padding: 0.15em 0.4em;
  border-radius: var(--par-radius-sm, 3px);
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 0.95em;
  color: var(--par-color-text, #222);
}
</style>
