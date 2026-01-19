<template>
  <ToolSuiteShowcase :premium="premium" display-mode="banner" />
  <div class="app-container">
    <cdr-button modifier="secondary" class="sidebar-toggle" @click="isSidebarVisible = !isSidebarVisible"
      v-show="windowWidth <= 768">
      <template #icon-left>
        <icon-navigation-menu inherit-color />
      </template>
      {{ isSidebarVisible ? 'Hide Sidebar' : 'Show Sidebar' }}
    </cdr-button>
    <!-- Overlay to close sidebar on click -->
    <div class="overlay" v-show="isSidebarVisible && windowWidth <= 768" @click="isSidebarVisible = false"></div>

    <div class="sidebar" :style="sidebarStyle">
      <ul class="settings-tabs">
        <!-- Flatten settings tree and display each with appropriate indentation -->
        <li v-for="setting in flattenSettings(settingsTree)" :key="setting.originalIndex"
          :class="{ 'active-tab': currentSettingIndex === setting.originalIndex }"
          :style="{ marginLeft: `${setting.depth * 20}px` }">
          <button class="setting-button" @click="selectSetting(setting.originalIndex)">
            {{ setting.place_name || 'Unnamed Setting' }}
          </button>
        </li>
        <li>
          <button v-if="!currentlyLoadingOverview && allSettingsHaveAnOverview" class="setting-button"
            @click="createNewSetting">+ New Setting</button>
        </li>
      </ul>
      <div class="copy-buttons">

        <cdr-button @click="copySettingsAsPlainText" modifier="secondary">Copy As Plain Text</cdr-button>
        <cdr-button @click="copySettingsAsHtml" modifier="secondary">Copy As HTML</cdr-button>
        <cdr-button @click="copySettingsAsMarkdown" modifier="secondary">Copy As Homebrewery Markdown</cdr-button>
        <cdr-button modifier="dark" @click="showDataManagerModal = true">
          Save/Load Data from a File
        </cdr-button>
        <p>Use the above buttons to copy or download all setting info into your desired format. For homebrewery go
          <cdr-link href="https://homebrewery.naturalcrit.com/new">here</cdr-link> and paste the markdown
          there. You will need to add your own pagebreaks.
        </p>
        <cdr-button @click="deleteAllSettings" v-if="!currentlyLoading">Delete All Settings</cdr-button>
      </div>

      <DataManagerModal :opened="showDataManagerModal" @update:opened="showDataManagerModal = $event" :premium="premium"
        currentApp="gameSettings" />
    </div>
    <div class="main-content">
      <div class='generator-form' v-show="!settingOverviewExists && !currentSetting.loadingsettingOverview">
        <h1>Kenji's Worldbuilding Dashboard: Build a Kingdom, a Town, an Empire, or a Space Station!</h1>
        <p>Welcome to my RPG Setting Generator and Worldbuilding Tool! Use this tool to build worlds and detailed
          settings
          complete
          with NPCs, factions,
          quest hooks,
          and even settings nested within settings! Enter as much info as you like here in the form fields or just click
          "Generate!" For something completely random.</p>
        <form @submit.prevent="generateSetting">
          <div class="generator-fields">
            <cdr-input class="generator-field-input" id="adjective" v-model="currentSetting.adjective"
              background="secondary" label="Adjective">
              <template #helper-text-bottom>
                Examples: "Flourishing", "Decrepit", "Decadent"
              </template>
            </cdr-input>
            <cdr-input class="generator-field-input" id="setting_type" v-model="currentSetting.setting_type"
              background="secondary" label="Type of Place">
              <template #helper-text-bottom>
                Examples: "Kingdom", "Town", "City", "Republic"
              </template>
            </cdr-input>
            <p style="text-align: center;">Of</p>
            <cdr-input class="generator-field-input" id="place_name" v-model="currentSetting.place_name"
              background="secondary" label="Place name">
              <template #helper-text-bottom>
                Examples: "Kingdomaria", "Townland", "Citytopia", "Republic of the People"
              </template>
            </cdr-input>
          </div>
          <div class="lore-field-input">
            <cdr-input :rows="5" tag="textarea" v-model="currentSetting.place_lore" background="secondary"
              label="Setting Lore" placeholder="Enter any additional details about the setting"
              class="item-lore-details">
              <template #helper-text-bottom>
                Write any details about your setting that you want to include. Need help coming up with lore for your
                setting?
                Use the <cdr-link href="https://cros.land/ai-powered-lore-and-timeline-generator/">Lore
                  Generator</cdr-link>
                and paste in the generated summary!
              </template>
            </cdr-input>
          </div>

          <cdr-button @click="generateSetting" class='generate-button' :full-width="true"
            modifier="dark">Generate</cdr-button>
        </form>
      </div>
      <Tabs class="content-tabs" v-if="settingOverviewExists" height="auto" style="width: 100%"
        :activeIndex="activeTabIndex">
        <TabPanel label="Overview">
          <!-- View Mode -->
          <div v-if="!isEditing">
            <h2>{{ formatTitle(currentSetting.adjective, currentSetting.setting_type, currentSetting.place_name,
              currentSetting.setting_overview.title) }}</h2>
            <div v-if="currentSetting.setting_overview.combined_content" class="overview-content">
              <p v-for="(paragraph, index) in currentSetting.setting_overview.combined_content.split('\n\n')"
                :key="index">
                {{ paragraph }}
              </p>
            </div>
            <div v-else class="overview-content">
              <p>{{ currentSetting.setting_overview.overview }} {{
                currentSetting.setting_overview.relation_to_larger_setting }}
              </p>
              <p>{{ currentSetting.setting_overview.history }}</p>
              <p>{{ currentSetting.setting_overview.current_ruler_sentence }}
                {{ currentSetting.setting_overview.recent_event_current_ruler }}
                {{ currentSetting.setting_overview.recent_event_consequences }}</p>
              <p>{{ currentSetting.setting_overview.social_history }} {{
                currentSetting.setting_overview.recent_event_social
                }}
              </p>
              <p>{{ currentSetting.setting_overview.economic_history }} {{
                currentSetting.setting_overview.impactful_economic_event }}</p>
              <p>{{ currentSetting.setting_overview.military_history }}
                {{ currentSetting.setting_overview.recent_event_military }}
              </p>
              <p>{{ currentSetting.setting_overview.main_problem }}
                {{ currentSetting.setting_overview.potential_solutions }}</p>
              <p>{{ currentSetting.setting_overview.conclusion }}</p>
            </div>

            <div class="button-group">
              <cdr-button @click="startEditing" modifier="secondary">Edit Overview</cdr-button>
            </div>
          </div>

          <!-- Edit Mode -->
          <div v-else class="edit-form">
            <h2>Edit Setting Overview</h2>

            <cdr-input v-model="editForm.title" label="Title" background="secondary" class="edit-field">
              <template #helper-text-bottom>
                The title of your setting
              </template>
            </cdr-input>

            <cdr-input v-model="editForm.content" label="Overview Content" background="secondary" :rows="15"
              tag="textarea" class="edit-field">
              <template #helper-text-bottom>
                The main content of your setting overview. Use double line breaks for paragraphs.
              </template>
            </cdr-input>

            <div class="button-group">
              <cdr-button @click="saveEdit">Save Changes</cdr-button>
              <cdr-button @click="cancelEdit" modifier="secondary">Cancel</cdr-button>
            </div>
          </div>
        </TabPanel>
        <TabPanel label="Locations">
          <h2>Important Locations</h2>

          <div
            v-if="currentSetting.importantLocations && currentSetting.importantLocations.length > 0 && !currentSetting.loadingSubLocations">
            <cdr-accordion-group>
              <cdr-accordion v-for="(setting, index) in currentSetting.importantLocations" :key="setting.name"
                :id="setting.name" level="2" :opened="setting.open" @accordion-toggle="setting.open = !setting.open">
                <template #label>
                  {{ setting.name }}
                </template>
                <div v-if="!setting.main_index && !setting.loading">
                  <cdr-tooltip id="tooltip-example" position="left" class="delete-button">
                    <template #trigger>
                      <cdr-button size="small" :icon-only="true" :with-background="true"
                        @click.stop="deleteSublocation(index)">
                        <template #icon>
                          <icon-x-sm />
                        </template>
                      </cdr-button>
                    </template>
                    <div>
                      Delete Sub-Location
                    </div>
                  </cdr-tooltip>

                  <!-- View Mode -->
                  <div v-if="editingLocationIndex !== index">
                    <h2>{{ setting.name }}</h2>
                    <p>{{ setting.description }}</p>
                    <p v-if="setting.setting_scale">{{ setting.setting_scale }}</p>

                    <div class="button-group">
                      <cdr-button @click="startEditingLocation(index)" modifier="secondary">Edit Location</cdr-button>
                      <cdr-button
                        @click="generateSetting({ sublocationIndex: index, subLocationName: setting.name, subLocationDescription: setting.description, adjective: setting.adjective, setting_type: setting.setting_type, title: setting.title })">
                        Generate Full Description
                      </cdr-button>
                    </div>
                  </div>

                  <!-- Edit Mode -->
                  <div v-else class="edit-form">
                    <h2>Edit Location</h2>

                    <cdr-input v-model="locationEditForm.name" label="Location Name" background="secondary"
                      class="edit-field" />

                    <cdr-input v-model="locationEditForm.description" label="Location Description"
                      background="secondary" :rows="5" tag="textarea" class="edit-field" />

                    <cdr-input v-model="locationEditForm.setting_scale" label="Setting Scale (optional)"
                      background="secondary" class="edit-field">
                      <template #helper-text-bottom>
                        Additional context about the scale or scope of this location
                      </template>
                    </cdr-input>

                    <div class="button-group">
                      <cdr-button @click="saveEditLocation">Save Changes</cdr-button>
                      <cdr-button @click="cancelEditLocation" modifier="secondary">Cancel</cdr-button>
                    </div>
                  </div>
                </div>
                <div v-if="setting.has_detailed_description && !setting.loading">
                  <cdr-tooltip id="tooltip-example" position="left" class="delete-button">
                    <template #trigger>
                      <cdr-button size="small" :icon-only="true" :with-background="true"
                        @click.stop="deleteSetting(setting.main_index)">
                        <template #icon>
                          <icon-x-sm />
                        </template>
                      </cdr-button>
                    </template>
                    <div>
                      Delete Sub-Location
                    </div>
                  </cdr-tooltip>
                  <h2>{{ setting.name }}</h2>
                  <p>{{ settings[setting.main_index].setting_overview.overview }} {{
                    settings[setting.main_index].setting_overview.relation_to_larger_setting }}</p>
                  <p>{{ settings[setting.main_index].setting_overview.history }}</p>
                  <p>{{ settings[setting.main_index].setting_overview.current_ruler_sentence }} {{
                    settings[setting.main_index].setting_overview.recent_event_current_ruler
                  }} {{ settings[setting.main_index].setting_overview.recent_event_consequences }}</p>
                  <p>{{ settings[setting.main_index].setting_overview.social_history }} {{
                    settings[setting.main_index].setting_overview.recent_event_social }}</p>
                  <p>{{ settings[setting.main_index].setting_overview.economic_history }} {{
                    settings[setting.main_index].setting_overview.impactful_economic_event
                  }}</p>
                  <p>{{ settings[setting.main_index].setting_overview.military_history }} {{
                    settings[setting.main_index].setting_overview.recent_event_military }}
                  </p>
                  <p>{{ settings[setting.main_index].setting_overview.main_problem }} {{
                    settings[setting.main_index].setting_overview.potential_solutions }}</p>
                  <p>
                    {{ settings[setting.main_index].setting_overview.conclusion }}
                  </p>

                  <div class="info-message"
                    style="margin-top: 2rem; padding: 1rem; background-color: #f4f2ed; border-radius: 4px;">
                    <p style="margin: 0;"><strong>Note:</strong> To edit this location's details, select "{{
                      setting.name
                      }}" from the sidebar to open its full setting page.</p>
                  </div>
                </div>
                <div v-if="!setting.has_detailed_description && setting.loading">
                  <CdrSkeleton>
                    <OverviewSkeleton />
                  </CdrSkeleton>
                </div>
              </cdr-accordion>
            </cdr-accordion-group>
            <div style="padding: 2rem">
              <h3>Create New Important Location</h3>
              <cdr-input id="location-name" v-model="newSubLocation.name" label="Location Name"></cdr-input>
              <cdr-input :rows="4" id="location-description" v-model="newSubLocation.description"
                label="Location Description"></cdr-input>
              <cdr-button style="margin-top: 2rem;" @click="addNewSubLocation" modifier="secondary">Add
                Location</cdr-button>
            </div>
            <hr style="margin-top: 2rem">
            <cdr-button style="margin-top: 3rem" @click="generateSubLocations" modifier="dark">Re-Generate Important
              Locations for {{
                currentSetting.place_name
              }}
            </cdr-button>
          </div>

          <div v-if="!(currentSetting.importantLocations.length > 0) && !currentSetting.loadingSubLocations">
            <p>Important locations are key sites within the setting that can serve as focal points for adventures or
              intrigue. They can be anything from a grand castle to a hidden underground lair. Generate a full location
              description to flesh out the setting.</p>
            <cdr-button modifier="dark" @click="generateSubLocations">Generate Important Locations for {{
              currentSetting.place_name }}
            </cdr-button>
          </div>
          <div v-if="currentSetting.loadingSubLocations">
            <BlockSkeleton />
          </div>
        </TabPanel>
        <TabPanel label="Factions">
          <h2>Factions</h2>
          <div v-if="currentSetting.factions && currentSetting.factions.length > 0">
            <cdr-accordion-group class="factions-accordion">
              <cdr-accordion v-for="(faction, index) in currentSetting.factions" :key="faction.name" level="2"
                :id="'faction-' + index" :opened="faction.open" @accordion-toggle="faction.open = !faction.open">
                <template #label>
                  {{ faction.name }}
                </template>

                <cdr-tooltip id="tooltip-example" position="left" class="delete-button">
                  <template #trigger>
                    <cdr-button size="small" :icon-only="true" :with-background="true"
                      @click.stop="deleteFaction(index)">
                      <template #icon>
                        <icon-x-sm />
                      </template>
                    </cdr-button>
                  </template>
                  <div>
                    Delete Faction
                  </div>
                </cdr-tooltip>

                <!-- View Mode -->
                <div v-if="editingFactionIndex !== index">
                  <h3 class="faction-header">{{ faction.name }}</h3>

                  <div class="influence-level">
                    <strong>Influence Level:</strong> {{ factionPowerLevels[faction.influence_level - 1] }}
                    <cdr-popover id="popover-example" position="right">
                      <template #trigger>
                        <cdr-button :icon-only="true" :with-background="true">
                          <template #icon>
                            <icon-information-stroke />
                          </template>
                        </cdr-button>
                      </template>
                      <div>
                        {{ factionPowerDescriptions[faction.influence_level - 1] }}
                      </div>
                    </cdr-popover>
                  </div>

                  <div class="focus-text">
                    <p><strong>Faction Leader, {{ faction.faction_leader }}:</strong> {{
                      faction.faction_leader_description
                      }}
                    </p>
                    <p><strong>Key Strengths: </strong> {{ faction.key_resources_and_assets }}</p>
                    <p><strong>Motto: </strong>"{{ faction.motto }}"</p>
                  </div>

                  <div style="margin-top: 2rem" v-if="faction.loading">
                    <CdrSkeleton>
                      <OverviewSkeleton />
                    </CdrSkeleton>
                  </div>

                  <div class="faction-description" v-if="faction.combined_content || faction.history">
                    <div v-if="faction.combined_content">
                      <p v-for="(paragraph, pIndex) in faction.combined_content.split('\n\n')" :key="pIndex">
                        {{ paragraph }}
                      </p>
                    </div>
                    <div v-else>
                      <p>{{ faction.history }}</p>
                      <p>{{ faction.recent_event }} {{ faction.current_situation }}</p>
                      <p>{{ faction.rites_and_ceremonies }} {{ faction.recent_ceremony }}</p>
                      <p>{{ faction.challenge_to_power }} {{ faction.challenge_event }}</p>
                    </div>
                  </div>

                  <div class="button-group">
                    <cdr-button @click="startEditingFaction(index)" modifier="secondary">Edit Faction</cdr-button>
                    <cdr-button v-if="!faction.history && !faction.combined_content"
                      @click="generateDetailedFaction(index)">
                      Generate Full Description
                    </cdr-button>
                  </div>
                </div>

                <!-- Edit Mode -->
                <div v-else class="edit-form">
                  <h2>Edit Faction</h2>

                  <cdr-input v-model="factionEditForm.name" label="Faction Name" background="secondary"
                    class="edit-field" />

                  <cdr-select v-model.number="factionEditForm.influence_level" label="Influence Level"
                    :options="influenceLevelOptions" class="edit-field">
                    <template #helper-text-bottom>
                      {{ factionPowerLevels[factionEditForm.influence_level - 1] }}: {{
                        factionPowerDescriptions[factionEditForm.influence_level - 1] }}
                    </template>
                  </cdr-select>

                  <cdr-input v-model="factionEditForm.faction_leader" label="Faction Leader" background="secondary"
                    class="edit-field" />

                  <cdr-input v-model="factionEditForm.faction_leader_description" label="Faction Leader Description"
                    background="secondary" :rows="3" tag="textarea" class="edit-field" />

                  <cdr-input v-model="factionEditForm.key_resources_and_assets" label="Key Strengths/Resources"
                    background="secondary" :rows="3" tag="textarea" class="edit-field" />

                  <cdr-input v-model="factionEditForm.motto" label="Faction Motto" background="secondary"
                    class="edit-field" />

                  <cdr-input v-model="factionEditForm.detailed_content" label="Detailed Description"
                    background="secondary" :rows="12" tag="textarea" class="edit-field">
                    <template #helper-text-bottom>
                      The full history and details of the faction. Use double line breaks for paragraphs.
                    </template>
                  </cdr-input>

                  <div class="button-group">
                    <cdr-button @click="saveEditFaction">Save Changes</cdr-button>
                    <cdr-button @click="cancelEditFaction" modifier="secondary">Cancel</cdr-button>
                  </div>
                </div>
              </cdr-accordion>
              <cdr-accordion v-if="currentSetting.loadingNewFaction" :level="2" id="new-faction-accordion"
                :opened="true">
                <template #label>
                  {{ newFaction.name }}
                </template>
                <CdrSkeleton>
                  <FactionSkeleton />
                </CdrSkeleton>
              </cdr-accordion>
              <div style="padding: 2rem">
                <h3>Create New Faction</h3>
                <cdr-input id="faction-name" v-model="newFaction.name" label="Faction Name"></cdr-input>
                <cdr-input :rows="4" id="faction-description" v-model="newFaction.description"
                  label="Faction Description"></cdr-input>
                <cdr-button style="margin-top: 2rem;" @click="addNewFaction" modifier="secondary">Add
                  Faction</cdr-button>
              </div>
              <hr style="margin-top: 2rem">
            </cdr-accordion-group>
          </div>
          <div v-if="!(currentSetting.factions.length > 0) && !currentSetting.loadingFactions">
            <p>Factions are any group of people gathered together to pursue a certain goal or to
              maintain
              or increase their power. They can range in influence from the dominant power in the setting (like a royal
              family)
              to a
              group of downtrodden commoners who have informally
              banded
              together to voice their grievances. They can also be smaller entities like merchant guilds, religious
              cults, or
              criminal
              organizations.
            </p>
          </div>
          <cdr-button v-if="currentSetting.factions.length <= 0 && !currentSetting.loadingFactions"
            @click="generateFactions" modifier="dark">Generate Factions for {{ currentSetting.place_name
            }}</cdr-button>
          <cdr-button style="margin-top: 2rem"
            v-if="currentSetting.factions.length > 0 && !currentSetting.loadingFactions" @click="generateFactions"
            modifier="dark">Re-Generate Factions for {{ currentSetting.place_name
            }}</cdr-button>
          <div v-if="currentSetting.loadingFactions">
            <BlockSkeleton />
          </div>
        </TabPanel>
        <TabPanel label="NPCs" name="NPCs">
          <h2>Notable NPCs</h2>
          <p>The default NPC list below is extracted from the main setting overview and the faction descriptions.
            However,
            you are free to add an NPC of your own with a short description.</p>
          <cdr-input class="npc-input" id="npc-name" v-model="npcShortDescription" background="secondary"
            label="NPC Short Description">
            <template #helper-text-bottom>
              Examples: "A smuggler secretly working for the Queen", "The emperor's eccentric advisor", "The village
              drunk"
            </template>
          </cdr-input>
          <cdr-button @click="generateDetailedNPCDescription(null)" style="margin: 2rem 0;" modifier="dark"
            :full-width="true">Create
            NPC</cdr-button>
          <cdr-accordion-group>
            <cdr-accordion v-for="(npc, index) in currentSetting.npcs" level="2" :id="'npc-' + index"
              :key="'npc-' + index" :opened="npc.open" @accordion-toggle="npc.open = !npc.open">
              <template #label>
                {{ npc.name }}
              </template>
              <div v-if="!npc.loading">
                <cdr-tooltip id="tooltip-example" position="left" class="delete-button">
                  <template #trigger>
                    <cdr-button size="small" :icon-only="true" :with-background="true" @click.stop="deleteNPC(index)">
                      <template #icon>
                        <icon-x-sm />
                      </template>
                    </cdr-button>
                  </template>
                  <div>
                    Delete NPC
                  </div>
                </cdr-tooltip>

                <!-- View Mode - No Detailed Description -->
                <div v-if="!npc.read_aloud_description && editingNPCIndex !== index">
                  <h2>{{ npc.name }}</h2>
                  <p>{{ npc.description }}</p>
                  <cdr-button @click="generateDetailedNPCDescription(index)">Generate Detailed
                    Description</cdr-button>
                </div>

                <!-- View Mode - Has Detailed Description -->
                <div v-else-if="npc.read_aloud_description && editingNPCIndex !== index">
                  <h2>{{ npc.name }}</h2>
                  <div class="focus-text">{{ npc.read_aloud_description }}</div>

                  <div v-if="npc.combined_details" style="margin-top: 1.5rem;">
                    <p v-for="(paragraph, pIndex) in npc.combined_details.split('\n\n')" :key="pIndex">
                      {{ paragraph }}
                    </p>
                  </div>
                  <div v-else style="margin-top: 1.5rem;">
                    <p>{{ npc.description_of_position }}</p>
                    <p>{{ npc.current_location }}</p>
                    <p>{{ npc.distinctive_features_or_mannerisms }}</p>
                    <p>{{ npc.character_secret }}</p>
                    <p>{{ npc.roleplaying_tips }}</p>
                  </div>

                  <hr style="margin: 2rem 0;">

                  <h3>Relationships</h3>
                  <div v-if="npc.relationships && Object.keys(npc.relationships).length > 0">
                    <div v-for="(relationship, npcName) in npc.relationships" :key="npcName"
                      style="margin-bottom: 1rem; padding: 1rem; background: #f4f2ed; border-radius: 4px;">
                      <p style="margin: 0;">
                        <strong>Name:</strong> {{ npcName }}<br>
                        <strong>Relationship:</strong> {{ relationship }}
                      </p>
                    </div>
                  </div>
                  <div v-else-if="!loadingNewRelationship">
                    <p style="font-style: italic; color: #666;">No relationships yet. Generate one below!</p>
                  </div>

                  <div v-if="loadingNewRelationship"
                    style="margin-bottom: 1rem; padding: 1rem; background: #f4f2ed; border-radius: 4px;">
                    <CdrSkeleton>
                      <cdr-skeleton-bone type="line" style="margin-bottom: 0.5rem;" />
                      <cdr-skeleton-bone type="line" />
                      <cdr-skeleton-bone type="line" style="width: 80%;" />
                    </CdrSkeleton>
                  </div>

                  <div class="button-group" style="margin-top: 2rem;">
                    <cdr-button @click="startEditingNPC(index)" modifier="secondary">Edit NPC</cdr-button>
                  </div>

                  <h4 style="margin-top: 2rem;">Generate New Relationship</h4>
                  <cdr-input v-model="newRelationship.name" label="Name" background="secondary"
                    style="margin-bottom: 1rem;">
                    <template #helper-text-bottom>
                      The name of the related NPC
                    </template>
                  </cdr-input>
                  <cdr-input v-model="newRelationship.description" label="Short Description" background="secondary"
                    :rows="2" tag="textarea" style="margin-bottom: 1rem;">
                    <template #helper-text-bottom>
                      Brief description of their relationship (e.g., "the wizard's familiar", "his estranged sister")
                    </template>
                  </cdr-input>
                  <cdr-button @click="generateNewRelationship(index)" :full-width="true">Generate
                    Relationship</cdr-button>
                </div>

                <!-- Edit Mode -->
                <div v-else class="edit-form">
                  <h2>Edit NPC</h2>

                  <cdr-input v-model="npcEditForm.name" label="NPC Name" background="secondary" class="edit-field" />

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
                      <cdr-input v-model="relationship.description" label="Short Description" background="secondary"
                        :rows="2" tag="textarea" style="margin-bottom: 1rem;" />
                      <cdr-button size="small" @click="deleteRelationship(index)">Remove Relationship</cdr-button>
                    </div>
                  </div>
                  <div v-else>
                    <p style="font-style: italic; color: #666; margin-bottom: 1rem;">No relationships to edit. Generate
                      them
                      in view mode first.</p>
                  </div>

                  <div class="button-group">
                    <cdr-button @click="saveEditNPC">Save Changes</cdr-button>
                    <cdr-button @click="cancelEditNPC" modifier="secondary">Cancel</cdr-button>
                  </div>
                </div>
              </div>

              <div v-if="npc.loading">
                <NPCSkeleton />
              </div>
            </cdr-accordion>
          </cdr-accordion-group>
        </TabPanel>
        <TabPanel label="Quest Hooks">
          <h2>Quest Hooks</h2>
          <p style="margin-bottom: 2rem; color: #666; font-style: italic;">
            Quest hooks can be generated from any NPC, but fully generated NPCs (with complete descriptions and relationships) will produce richer, more detailed quests than basic NPCs.
          </p>
          <div v-if="currentSetting.questHooks?.length > 0">
            <cdr-accordion-group>
              <cdr-accordion v-for="(hook, index) in currentSetting.questHooks" :key="index" :id="'hook-' + index"
                level="2" :opened="hook.open" @accordion-toggle="hook.open = !hook.open">
                <template #label>
                  {{ hook.quest_title }}
                </template>
                <div>
                  <cdr-tooltip id="tooltip-example" position="left" class="delete-button">
                    <template #trigger>
                      <cdr-button size="small" :icon-only="true" :with-background="true"
                        @click.stop="deleteQuestHook(index)">
                        <template #icon>
                          <icon-x-sm />
                        </template>
                      </cdr-button>
                    </template>
                    <div>
                      Delete Quest Hook
                    </div>
                  </cdr-tooltip>

                  <!-- View Mode -->
                  <div v-if="editingQuestHookIndex !== index">
                    <h2>{{ hook.quest_title }}</h2>
                    <p><strong>Quest Giver:</strong> {{ hook.quest_giver_name }}</p>

                    <div v-if="hook.combined_giver_and_quest">
                      <p v-for="(paragraph, pIndex) in hook.combined_giver_and_quest.split('\n\n')" :key="pIndex">
                        {{ paragraph }}
                      </p>
                    </div>
                    <div v-else>
                      <p>{{ hook.quest_giver_background }}</p>
                      <p>{{ hook.quest_giver_encounter }}</p>
                      <p>{{ hook.quest_details }}</p>
                    </div>

                    <h3>Objectives</h3>
                    <cdr-list v-for="(objective, objIndex) in hook.objectives" modifier="unordered" :key="objIndex">
                      <li>{{ objective }}</li>
                    </cdr-list>

                    <h3>Challenges</h3>
                    <cdr-list v-for="(challenge, chalIndex) in hook.challenges" modifier="unordered" :key="chalIndex">
                      <li>{{ challenge }}</li>
                    </cdr-list>

                    <h3>Rewards</h3>
                    <cdr-list v-for="(reward, rewIndex) in hook.rewards" modifier="unordered" :key="rewIndex">
                      <li>{{ reward }}</li>
                    </cdr-list>

                    <h3>Twist</h3>
                    <p>{{ hook.twist }}</p>

                    <div class="button-group" style="margin-top: 2rem;">
                      <cdr-button @click="startEditingQuestHook(index)" modifier="secondary">Edit Quest Hook</cdr-button>
                    </div>
                  </div>

                  <!-- Edit Mode -->
                  <div v-else class="edit-form">
                    <h2>Edit Quest Hook</h2>

                    <cdr-input v-model="questHookEditForm.quest_title" label="Quest Title" background="secondary"
                      class="edit-field" />

                    <cdr-input v-model="questHookEditForm.quest_giver_name" label="Quest Giver Name" background="secondary"
                      class="edit-field" />

                    <cdr-input v-model="questHookEditForm.combined_giver_and_quest" label="Quest Giver & Quest Details"
                      background="secondary" :rows="10" tag="textarea" class="edit-field">
                      <template #helper-text-bottom>
                        Giver background, encounter description, and quest details. Use double line breaks for paragraphs.
                      </template>
                    </cdr-input>

                    <h3>Objectives</h3>
                    <div v-for="(objective, objIndex) in questHookEditForm.objectives" :key="objIndex"
                      style="margin-bottom: 1rem; padding: 1rem; background: #f4f2ed; border-radius: 4px;">
                      <cdr-input v-model="questHookEditForm.objectives[objIndex]" label="Objective" background="secondary" />
                      <cdr-button size="small" @click="removeQuestObjective(objIndex)" style="margin-top: 0.5rem;">Remove</cdr-button>
                    </div>
                    <cdr-button @click="addQuestObjective" modifier="secondary" size="small">Add Objective</cdr-button>

                    <h3 style="margin-top: 2rem;">Challenges</h3>
                    <div v-for="(challenge, chalIndex) in questHookEditForm.challenges" :key="chalIndex"
                      style="margin-bottom: 1rem; padding: 1rem; background: #f4f2ed; border-radius: 4px;">
                      <cdr-input v-model="questHookEditForm.challenges[chalIndex]" label="Challenge" background="secondary" />
                      <cdr-button size="small" @click="removeQuestChallenge(chalIndex)" style="margin-top: 0.5rem;">Remove</cdr-button>
                    </div>
                    <cdr-button @click="addQuestChallenge" modifier="secondary" size="small">Add Challenge</cdr-button>

                    <h3 style="margin-top: 2rem;">Rewards</h3>
                    <div v-for="(reward, rewIndex) in questHookEditForm.rewards" :key="rewIndex"
                      style="margin-bottom: 1rem; padding: 1rem; background: #f4f2ed; border-radius: 4px;">
                      <cdr-input v-model="questHookEditForm.rewards[rewIndex]" label="Reward" background="secondary" />
                      <cdr-button size="small" @click="removeQuestReward(rewIndex)" style="margin-top: 0.5rem;">Remove</cdr-button>
                    </div>
                    <cdr-button @click="addQuestReward" modifier="secondary" size="small">Add Reward</cdr-button>

                    <cdr-input v-model="questHookEditForm.twist" label="Twist" background="secondary" :rows="3"
                      tag="textarea" class="edit-field" style="margin-top: 2rem;">
                      <template #helper-text-bottom>
                        An unexpected element that adds complexity to the quest
                      </template>
                    </cdr-input>

                    <div class="button-group">
                      <cdr-button @click="saveEditQuestHook">Save Changes</cdr-button>
                      <cdr-button @click="cancelEditQuestHook" modifier="secondary">Cancel</cdr-button>
                    </div>
                  </div>
                </div>
              </cdr-accordion>
              <cdr-accordion class="accordion" level="2" id="loading-location" v-if="loadingQuestHooks">
                <template #label>
                  <CdrSkeleton>
                    <CdrSkeletonBone type="line" style="width:150px" />
                  </CdrSkeleton>
                </template>
              </cdr-accordion>
            </cdr-accordion-group>
          </div>
          <div v-if="!(currentSetting.questHooks?.length > 0) && !loadingQuestHooks">
            <p>Generate quest hooks using NPCs from your setting as quest givers.</p>
          </div>
          <div v-if="!(currentSetting.questHooks?.length > 0) && loadingQuestHooks">
            <cdr-accordion-group>
              <cdr-accordion class="accordion" level="2" id="loading-location">
                <template #label>
                  <CdrSkeleton>
                    <CdrSkeletonBone type="line" style="width:150px" />
                  </CdrSkeleton>
                </template>
              </cdr-accordion>
            </cdr-accordion-group>
          </div>

          <hr style="margin: 2rem 0;">

          <h3>Generate New Quest Hook</h3>
          <p v-if="!currentSetting.npcs || currentSetting.npcs.length === 0" style="font-style: italic; color: #666;">
            You need to have NPCs generated before you can create quest hooks. Visit the NPCs tab to generate some NPCs first.
          </p>
          <div v-else>
            <cdr-select v-model="selectedQuestGiverIndex" label="Quest Giver" :options="questGiverOptions"
              placeholder="Select an NPC" background="secondary" style="margin-bottom: 1rem;">
              <template #helper-text-bottom>
                Fully generated NPCs will produce more detailed quests
              </template>
            </cdr-select>

            <cdr-select label="Quest Type" v-model="questType" :options="questTypes"
              placeholder="Select a Quest Type" background="secondary" style="margin-bottom: 1rem;" />

            <cdr-button @click="generateQuestHookFromTab" :full-width="true"
              :disabled="selectedQuestGiverIndex === null">
              Generate Quest Hook
            </cdr-button>
          </div>
        </TabPanel>
      </Tabs>
      <cdr-button class="delete-button" v-if="settingOverviewExists && !currentlyLoading"
        @click="deleteSetting(currentSettingIndex)">Delete
        Setting</cdr-button>
      <div class="content-tabs" v-if="!settingOverviewExists && currentSetting.loadingsettingOverview">
        <CdrSkeleton>
          <Tabs>
            <TabPanel label="Overview">
              <div class="tab-skeleton">
                <h2>{{ formatTitle(currentSetting.adjective, currentSetting.setting_type, currentSetting.place_name,
                  currentSetting.setting_overview?.title) }}</h2>
                <OverviewSkeleton />
              </div>

            </TabPanel>
            <TabPanel label="Locations" :disabled="true">
            </TabPanel>
            <TabPanel label="Factions" :disabled="true">
            </TabPanel>
            <TabPanel label="NPCs" :disabled="true">
            </TabPanel>
            <TabPanel label="Quest Hooks" :disabled="true">
            </TabPanel>
          </Tabs>
        </CdrSkeleton>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch, nextTick, onMounted, onUnmounted } from 'vue'
import { CdrInput, CdrButton, CdrText, CdrSelect, CdrTabs, CdrTabPanel, CdrCheckbox, CdrLink, CdrList, CdrSkeleton, CdrSkeletonBone, IconXSm, CdrTooltip, CdrAccordionGroup, CdrAccordion, CdrPopover, IconInformationStroke, IconNavigationMenu } from "@rei/cedar";
import { settingOverviewPrompt, sublocationOverviewPrompt, subLocationsPrompt, factionListPrompt, detailedFactionPrompt, singleFactionPrompt, createNPCPrompt, createRelationshipAndTipsPrompt, createNPCRelationshipPrompt, createQuestHookPrompt, generateSingleRelationshipPrompt } from "../util/kingdom-prompts.mjs";
import FactionSkeleton from "./skeletons/FactionSkeleton.vue";
import BlockSkeleton from "./skeletons/BlockSkeleton.vue";
import NPCSkeleton from "./skeletons/NPCSkeleton.vue";
import OverviewSkeleton from "./skeletons/OverviewSkeleton.vue";
import DataManagerModal from './DataManagerModal.vue';
import Tabs from './tabs/Tabs.vue';
import TabPanel from './tabs/TabPanel.vue';
import { formatSettingAsPlainText } from "../util/formatSettingAsPlainText.mjs";
import { formatSettingAsMarkdown } from "../util/formatSettingAsMarkdown.mjs";
import { formatSettingAsHtml } from "../util/formatSettingAsHTML.mjs";
import { generateGptResponse } from "../util/open-ai.mjs";
import placeAdjectives from '../data/place-adjectives.json';
import place_names from '../data/place-names.json';
import '@rei/cedar/dist/style/cdr-link.css';
import '@rei/cedar/dist/style/cdr-list.css';
import '@rei/cedar/dist/style/cdr-popover.css';
import ToolSuiteShowcase from './ToolSuiteShowcase.vue';

const props = defineProps({
  premium: {
    type: Boolean,
    default: false
  }
});


const isSidebarVisible = ref(false); // Start hidden on mobile
const showDataManagerModal = ref(false);

// Update based on viewport size immediately and on resize
const updateVisibility = () => {
  if (window.innerWidth > 768) {
    isSidebarVisible.value = true;  // Always show on desktop
  } else {
    isSidebarVisible.value = false;  // Manage with toggle button on mobile
  }
};

const windowWidth = ref(window.innerWidth);

const updateWindowWidth = () => {
  windowWidth.value = window.innerWidth;
};

onMounted(() => {
  updateWindowWidth(); // Set initial width
  updateVisibility();  // Set initial visibility
  window.addEventListener('resize', updateWindowWidth);
});

onUnmounted(() => {
  window.removeEventListener('resize', updateWindowWidth);
});

const sidebarStyle = computed(() => {
  if (windowWidth.value <= 768) {
    return {
      position: 'fixed',
      transform: isSidebarVisible.value ? 'translateX(0)' : 'translateX(-100%)',
      width: '70%', // Adjust width for mobile
      maxWidth: '400px'
    };
  } else {
    return {
      width: '400px',
      position: 'static',
      transform: 'none'
    };
  }
});

const newSubLocation = reactive({
  name: '',
  description: ''
});

const newFaction = reactive({
  name: '',
  description: ''
});

const addNewSubLocation = () => {
  if (!newSubLocation.name) return;
  currentSetting.value.importantLocations.push({
    name: newSubLocation.name,
    description: newSubLocation.description,
    setting_scale: '',
    main_index: null,
    has_detailed_description: false,
    loading: false
  });
  newSubLocation.name = '';
  newSubLocation.description = '';
};

const deleteSublocation = (index) => {
  currentSetting.value.importantLocations.splice(index, 1);
  saveSettingsToLocalStorage();
};

const deleteFaction = (index) => {
  currentSetting.value.factions.splice(index, 1);
  saveSettingsToLocalStorage();
};

const deleteNPC = (index) => {
  currentSetting.value.npcs.splice(index, 1);
  saveSettingsToLocalStorage();
};

const deleteQuestHook = (index) => {
  currentSetting.value.questHooks.splice(index, 1);
  saveSettingsToLocalStorage();
};

function copySettingsAsPlainText() {
  const text = formatSettingAsPlainText(settingsTree.value);
  navigator.clipboard.writeText(text);
  alert("Settings copied to clipboard as plain text!");
}

function copySettingsAsMarkdown() {
  const text = formatSettingAsMarkdown(settingsTree.value);
  navigator.clipboard.writeText(text);
  alert("Settings copied to clipboard as Homebrewery Markdown!");
}

function copySettingsAsHtml() {
  const text = formatSettingAsHtml(settingsTree.value);
  navigator.clipboard.writeText(text);
  alert("Settings copied to clipboard as HTML!");
}

function deleteAllSettings() {
  if (confirm("Are you sure you want to delete all settings?")) {
    settings.value = [reactive({ ...defaultSetting })];
    currentSettingIndex.value = 0;
    saveSettingsToLocalStorage();
  }
}

function isNumber(value) {
  return typeof value === 'number';
}
const questType = ref(randomQuestString);
const selectedQuestGiverIndex = ref(null);
const currentlyLoading = ref(false);
const loadingQuestHooks = ref(false);
const currentSettingIndex = ref(0);
const activeTabIndex = ref(0);
const npcShortDescription = ref('');
const isNewSetting = ref(false);  // Flag to track if the current setting is new
const isEditing = ref(false);
const editForm = ref({
  title: '',
  content: ''
});
const editingLocationIndex = ref(null);
const locationEditForm = ref({
  name: '',
  description: '',
  setting_scale: ''
});
const editingFactionIndex = ref(null);
const factionEditForm = ref({
  name: '',
  influence_level: 1,
  faction_leader: '',
  faction_leader_description: '',
  key_resources_and_assets: '',
  motto: '',
  detailed_content: ''
});
const editingNPCIndex = ref(null);
const npcEditForm = ref({
  name: '',
  read_aloud_description: '',
  combined_details: '',
  relationshipsArray: []
});
const newRelationship = reactive({
  npcIndex: null,
  name: '',
  description: ''
});
const loadingNewRelationship = ref(false);
const editingQuestHookIndex = ref(null);
const questHookEditForm = ref({
  quest_title: '',
  quest_giver_name: '',
  combined_giver_and_quest: '',
  objectives: [],
  challenges: [],
  rewards: [],
  twist: ''
});
const defaultSetting = reactive({
  adjective: '',
  setting_type: '',
  place_name: '',
  place_lore: '',
  setting_overview: null,
  factions: [],
  importantLocations: [],
  npcs: [],
  questHooks: [],
  parentIndex: null,
  loadingFactions: false,
  loadingSubLocations: false,
});
const settings = ref([reactive({ ...defaultSetting })]);
const currentSetting = computed(() => settings.value[currentSettingIndex.value] || reactive({ ...defaultSetting }));
onMounted(loadSettingsFromLocalStorage);
const settingsTree = computed(() => {
  let tree = [];
  let settingsMap = new Map();

  // Initialize map entries for all settings with their indices as keys
  settings.value.forEach((setting, index) => {
    settingsMap.set(index, { ...setting, children: [], originalIndex: index });
  });

  // Populate children arrays based on the parentIndex
  settings.value.forEach((setting, index) => {
    if (typeof setting.parentIndex === 'number' && settingsMap.has(setting.parentIndex)) {
      settingsMap.get(setting.parentIndex).children.push(settingsMap.get(index));
    } else if (setting.parentIndex === null) {
      tree.push(settingsMap.get(index));
    }
  });

  return tree;
});

function flattenSettings(tree, depth = 0) {
  let flat = [];
  tree.forEach(setting => {
    flat.push({ ...setting, depth });
    if (setting.children.length) {
      flat = flat.concat(flattenSettings(setting.children, depth + 1));
    }
  });
  return flat;
}

const selectSetting = (index) => {
  // Exit edit mode when selecting a different setting
  if (isEditing.value) {
    const confirmed = confirm('You have unsaved changes. Are you sure you want to switch settings without saving?');
    if (!confirmed) {
      return; // Don't switch settings
    }
    isEditing.value = false;
  }

  // Exit location edit mode
  if (editingLocationIndex.value !== null) {
    const confirmed = confirm('You have unsaved changes. Are you sure you want to switch settings without saving?');
    if (!confirmed) {
      return;
    }
    editingLocationIndex.value = null;
  }

  // Exit faction edit mode
  if (editingFactionIndex.value !== null) {
    const confirmed = confirm('You have unsaved changes. Are you sure you want to switch settings without saving?');
    if (!confirmed) {
      return;
    }
    editingFactionIndex.value = null;
  }

  // Exit NPC edit mode
  if (editingNPCIndex.value !== null) {
    const confirmed = confirm('You have unsaved changes. Are you sure you want to switch settings without saving?');
    if (!confirmed) {
      return;
    }
    editingNPCIndex.value = null;
  }

  // Exit quest hook edit mode
  if (editingQuestHookIndex.value !== null) {
    const confirmed = confirm('You have unsaved changes. Are you sure you want to switch settings without saving?');
    if (!confirmed) {
      return;
    }
    editingQuestHookIndex.value = null;
  }

  currentSettingIndex.value = index;
  isNewSetting.value = false;  // Not new since it's selected from existing ones
};

const updateOriginalIndices = () => {
  settings.value.forEach((setting, index) => {
    setting.originalIndex = index;  // Update originalIndex to the new index
  });
};

const deleteSetting = (indexToDelete) => {
  //confirm deletion
  if (!confirm("Are you sure you want to delete this setting?")) return;
  if (indexToDelete < 0 || indexToDelete >= settings.value.length) return;  // Safety check

  // Capture the parentIndex of the setting to be deleted for reassigning children
  const parentOfDeleted = settings.value[indexToDelete].parentIndex;

  // Update children of the deleted setting to the parent of the deleted setting
  settings.value.forEach((setting, index) => {
    if (setting.parentIndex === indexToDelete) {
      setting.parentIndex = parentOfDeleted;
    }
    // Additionally check and update main_index in importantLocations if needed
    setting.importantLocations.forEach(location => {
      if (location.main_index === indexToDelete) {
        //location.main_index = parentOfDeleted !== null ? parentOfDeleted : null;  // Reassign or remove depending on parent availability
        location.main_index = null;  // Always remove main_index
        location.has_detailed_description = false;  // Reset detailed description flag
      } else if (location.main_index > indexToDelete) {
        location.main_index--;  // Adjust indices that are higher than the deleted index
      }
    });
  });

  // Remove the setting
  settings.value.splice(indexToDelete, 1);

  // Update parentIndex for all remaining settings
  settings.value.forEach(setting => {
    if (typeof setting.parentIndex === 'number' && setting.parentIndex > indexToDelete) {
      setting.parentIndex--;  // Adjust parentIndex down by one to account for the shift
    }
  });

  saveSettingsToLocalStorage();
  selectSetting(0);  // Select the first setting after deletion
};





const currentlyLoadingOverview = computed(() => {
  // Check if any setting has loadingsettingOverview set to true
  return settings.value.some(setting => setting.loadingsettingOverview);
});

//function similar to the above but returns false if there is no settingOverview for any setting
const allSettingsHaveAnOverview = computed(() => {
  return settings.value.every(setting => setting.setting_overview?.overview);
});

watch(currentSettingIndex, (newValue, oldValue) => {
  if (newValue !== oldValue) {
    nextTick(() => {
      activeTabIndex.value = 0;  // Reset active tab index when switching settings
    });
  }
});

const createNewSetting = (isSublocation, adjective = '', setting_type = '', place_name = '', title = '', parentIndex = null) => {
  // Exit edit mode when creating a new setting
  isEditing.value = false;
  editingLocationIndex.value = null;
  editingFactionIndex.value = null;
  editingNPCIndex.value = null;
  editingQuestHookIndex.value = null;

  const newSetting = reactive({
    adjective: adjective,
    setting_type: setting_type,
    place_name: place_name,
    title: title,
    place_lore: '',
    setting_overview: null,
    factions: [],
    importantLocations: [],
    npcs: [],
    questHooks: [],
    parentIndex: isSublocation ? parentIndex : null,
    loadingFactions: false,
    loadingSubLocations: false,
    loadingNewFaction: false,
  });

  // Push the new setting to the settings array
  settings.value.push(newSetting);

  // Update currentSettingIndex to the index of the newly created setting
  currentSettingIndex.value = settings.value.length - 1;
  isNewSetting.value = true;  // Mark as new

  // Optionally save settings to local storage or another persistent state
  //saveSettingsToLocalStorage();
};



function saveSettingsToLocalStorage() {
  // Map over settings to adjust NPCs and remove non-serializable values
  const settingsToSave = settings.value.map(setting => ({
    ...setting,
    setting_overview: setting.setting_overview,
    factions: setting.factions.map(faction => ({
      ...faction,
      open: false // Set all faction.open properties to false before saving
    })),
    loadingFactions: false,  // Set loadingFactions to false before saving
    loadingSubLocations: false,  // Set loadingSubLocations to false before saving
    loadingsettingOverview: false,  // Set loadingsettingOverview to false before saving
    importantLocations: setting.importantLocations.map(location => ({
      ...location,
      open: false // Set all location.open properties to false before saving
    })),
    npcs: setting.npcs.map(npc => ({
      ...npc,
      open: false // Set all npc.open properties to false before saving
    }))
  }));

  // Serialize the modified settings to a JSON string
  const serializedSettings = JSON.stringify(settingsToSave);

  // Save the serialized string to local storage
  localStorage.setItem('gameSettings', serializedSettings);
}

function loadSettingsFromLocalStorage() {
  const serializedSettings = localStorage.getItem('gameSettings');
  if (serializedSettings) {
    try {
      const parsedSettings = JSON.parse(serializedSettings);
      settings.value = parsedSettings.map(setting => reactive(setting));
    } catch (error) {
      console.error("Failed to parse settings from local storage:", error);
    }
  }
}



const settingOverviewExists = computed(() => {
  const overview = currentSetting.value.setting_overview?.overview;
  return !!overview && overview.length > 0;
});

function formatTitle(string1, string2, string3, title) {
  if (title) return title;
  if (!string1 || !string2 || !string3) return '';
  // Helper function to capitalize the first letter of each word in a string
  function capitalize(text) {
    return text.split(' ') // Split the string into words
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize each word
      .join(' '); // Rejoin the words into a single string
  }

  // Apply the capitalize function to each string and format them
  return `The ${capitalize(string1)} ${capitalize(string2)} of ${capitalize(string3)}`;
}


// Validation and utility functions
const kingdomValidation = jsonString => {
  try {
    const jsonObj = JSON.parse(jsonString);
    const keys = ['overview', 'relation_to_larger_setting', 'history', 'current_ruler_sentence', 'recent_event_current_ruler',
      'recent_event_consequences', 'social_history', 'recent_event_social', 'economic_history',
      'impactful_economic_event', 'military_history', 'recent_event_military', 'main_problem', 'potential_solutions', 'conclusion', 'npc_list'];
    const npcKeys = ['name', 'description'];
    for (let npc of jsonObj.npc_list) {
      if (!npcKeys.every(key => key in npc)) return false;
    }
    return keys.every(key => key in jsonObj);
  } catch (error) {
    return false;
  }
}

const sublocationValidation = jsonString => {
  try {
    const jsonObj = JSON.parse(jsonString);
    return jsonObj.every(location => ['name', 'description', 'title', 'setting_type', 'adjective'].every(key => key in location));
  } catch (error) {
    return false;
  }
}

const factionListValidation = jsonString => {
  try {
    const jsonObj = JSON.parse(jsonString);
    return jsonObj.every(faction => ['name', 'influence_level', 'faction_leader', 'faction_leader_description', 'key_resources_and_assets', 'motto'].every(key => key in faction));
  } catch (error) {
    return false;
  }
}
const factionDetailValidation = jsonString => {
  try {
    const jsonObj = JSON.parse(jsonString);
    const keys = ['history', 'recent_event', 'current_situation', 'rites_and_ceremonies', 'recent_ceremony', 'challenge_to_power', 'challenge_event'];
    return keys.every(key => key in jsonObj);
  } catch (error) {
    return false;
  }
}

const factionValidation = jsonString => {
  try {

    const jsonObj = JSON.parse(jsonString);
    const keys = [
      'name', 'history', 'recent_event', 'current_situation', 'motto', 'influence_level',
      'faction_leader', 'faction_leader_description', 'key_resources_and_assets', 'rites_and_ceremonies',
      'recent_ceremony', 'challenge_to_power', 'challenge_event'
    ];
    return jsonObj.every(faction => keys.every(key => key in faction));
  } catch (error) {
    return false;
  }
}

const singleFactionValidation = jsonString => {
  try {
    const jsonObj = JSON.parse(jsonString);
    const keys = [
      'name', 'history', 'recent_event', 'current_situation', 'motto', 'influence_level',
      'faction_leader', 'faction_leader_description', 'key_resources_and_assets', 'rites_and_ceremonies',
      'recent_ceremony', 'challenge_to_power', 'challenge_event'
    ];
    return keys.every(key => key in jsonObj);
  } catch (error) {
    return false;
  }
}


function questHookValidation(jsonString) {
  try {
    const jsonObj = JSON.parse(jsonString);
    const keys = ['quest_title', 'quest_giver_name', 'quest_giver_background', 'quest_giver_encounter', 'quest_details', 'objectives', 'challenges', 'rewards', 'twist'];
    return keys.every(key => key in jsonObj);
  } catch (error) {
    return false;
  }
}

const npcValidationPart1 = jsonString => {
  try {
    const jsonObj = JSON.parse(jsonString);
    const keys = ['description_of_position', 'current_location', 'distinctive_features_or_mannerisms',
      'character_secret', 'read_aloud_description'];
    return keys.every(key => key in jsonObj);

  } catch (error) {
    return false;
  }
}

const npcValidationPart2 = jsonString => {
  try {
    const jsonObj = JSON.parse(jsonString);
    const keys = ['relationships', 'roleplaying_tips'];
    return keys.every(key => key in jsonObj);

  } catch (error) {
    return false;
  }
}

const singleRelationshipValidation = jsonString => {
  try {
    const jsonObj = JSON.parse(jsonString);
    const keys = ['name', 'relationship'];
    return keys.every(key => key in jsonObj);
  } catch (error) {
    return false;
  }
}

// Faction power levels (constant)
const factionPowerLevels = [
  'Nonexistent', 'Marginal', 'Emerging', 'Moderate', 'Noteworthy', 'Influential',
  'Powerful', 'Dominant', 'Controlling', 'Totalitarian'
];

const factionPowerDescriptions = [
  "No influence or recognition in any sphere. Entirely disregarded in political, social, and economic contexts.",
  "Very limited influence, struggling for recognition. Minor local impact but largely ineffective on a broader scale.",
  "Beginning to make their presence felt with minimal overall influence. Early stages of establishing a base.",
  "Noticeable but limited regional influence. May sway local policies but lack broader power.",
  "Recognized within a larger context, starting to effect significant change. Gaining momentum.",
  "Significant sway in local politics and society. Can influence major decisions and hold considerable clout.",
  "Strong influence and considerable resources. Shapes outcomes in multiple spheres and key player in environments.",
  "Strong influence in one branch of government or aspect of governance. Major player but power is not absolute.",
  "High level of power, controls multiple branches or has significant sway across governance. Broad control over policies.",
  "Absolute control over society, without opposition. Marked by unilateral decision-making and lack of democratic processes."
];

// Create dropdown options for influence levels
const influenceLevelOptions = computed(() => {
  return factionPowerLevels.map((level, index) => ({
    text: `${index + 1} - ${level}`,
    value: index + 1
  }));
});

// Create dropdown options for quest giver NPCs
const questGiverOptions = computed(() => {
  if (!currentSetting.value?.npcs) return [];

  return currentSetting.value.npcs.map((npc, index) => {
    const isFullyGenerated = !!npc.read_aloud_description;
    const label = isFullyGenerated
      ? `${npc.name} (Fully Generated)`
      : `${npc.name} (Basic)`;

    return {
      text: label,
      value: index
    };
  });
});

const randomQuestString = 'Random: Generate a quest with a random objective and theme.';

const questTypes = [
  randomQuestString,
  'Escort: Safeguard a person, creature, or caravan from one location to another.',
  'Rescue: Save a captive or stranded individual from danger.',
  'Investigation: Solve a mystery or uncover hidden truths.',
  'Hunting: Track down and eliminate a dangerous creature or villain.',
  'Diplomacy: Mediate a dispute between warring factions or negotiate a treaty.',
  'Exploration: Chart unknown territories or discover hidden places.',
  'Protection: Defend a village or landmark from an imminent threat.',
  'Delivery: Transport a crucial item or message to a specific location.',
  'Recovery: Retrieve stolen or lost items that are not artifacts.',
  'Construction: Help build or repair a structure, like a bridge or fortification.',
  'Training: Teach or train a group or individual in a specific skill or knowledge.',
  'Distraction: Create a diversion to aid another operation or quest.',
  'Sabotage: Undermine an enemy’s plans or operations.',
  'Recruitment: Gather individuals to join a cause, guild, or army.',
  'Research: Gather information or resources for a scholarly purpose.',
  'Harvesting: Collect rare ingredients or resources from the environment.',
  'Trade: Facilitate or protect a trade agreement or caravan.',
  'Revenge: Avenge a wrong done to a character or group.',
  'Ceremony: Perform or oversee a significant ritual or event.',
  'Bounty: Capture or kill a wanted criminal or creature.',
  'Alliance: Forge an alliance with a powerful entity or group.',
  'Exorcism: Rid a location or individual of a haunting or curse.',
  'Contest: Win a competition or tournament.',
  'Heist: Steal a valuable item or information from a well-guarded location.',
  'Infiltration: Gain access to a secure location or organization.',
  'Pilgrimage: Travel to a sacred site or complete a spiritual journey.',
  'Curse: Lift a curse or break a magical enchantment.',
  'Mystery: Solve a series of strange occurrences or unexplained phenomena.',
  'Prophecy: Fulfill or prevent a prophecy from coming to pass.',
  'Assassination: Eliminate a target without being detected.',
  'Betrayal: Uncover or prevent a betrayal within a group or organization.',
];

const requestQueue = ref([]);
const isProcessing = ref(false);

async function processQueue() {
  if (isProcessing.value || requestQueue.value.length === 0) return;
  isProcessing.value = true;

  const { type, data } = requestQueue.value.shift();  // Dequeue the first request

  switch (type) {
    case 'generateSetting':
      await handleGenerateSetting(data);
      break;
    case 'generateSubLocations':
      await handleGenerateSubLocations(data);
      break;
    case 'generateFactions':
      await handleGenerateFactions(data);
      break;
    case 'generateDetailedFaction':
      await handleGenerateDetailedFaction(data);
      break;
    case 'addNewFaction':
      await handleAddNewFaction(data);
      break;
    case 'generateDetailedNPCDescription':
      await handleGenerateDetailedNPCDescription(data);
      break;
    case 'generateQuestHook':
      await handleGenerateQuestHook(data);
      break;
    case 'generateNewRelationship':
      await handleGenerateNewRelationship(data);
      break;
    default:
      console.error("Unknown request type:", type);
  }

  isProcessing.value = false;
  processQueue();  // Continue processing next in queue
}

function enqueueRequest(type, data) {
  requestQueue.value.push({ type, data });
  if (!isProcessing.value) processQueue();
}

function getOverviewText(overviewObject) {
  if (!overviewObject) {
    return '';
  }
  return Object.entries(overviewObject).map(([key, value]) => {
    if (Array.isArray(value)) {
      return ''; // Skip array values or handle them appropriately
    }
    return `${value}`;
  }).join('\n');
}

function generateSetting({ sublocationIndex, subLocationName, subLocationDescription, adjective, setting_type }) {
  const operationIndex = currentSettingIndex.value;
  const setting = settings.value[operationIndex];

  // Directly update properties in a reactive way

  setting.setting_type = setting.setting_type || randomType(setting);
  setting.adjective = setting.adjective || randomAdjective(setting) || '';
  setting.place_name = setting.place_name || randomName(setting) || '';
  setting.place_lore = setting.place_lore || '';

  let nameToPass = subLocationName || setting.place_name || '';
  let parentLocationOverview = setting.place_lore || getOverviewText(setting.setting_overview) || '';

  let prompt;
  if (isNumber(sublocationIndex)) {
    prompt = sublocationOverviewPrompt(nameToPass, parentLocationOverview, subLocationDescription);
  } else {
    prompt = settingOverviewPrompt(setting.adjective, setting.setting_type, setting.place_name, setting.place_lore);
  }
  enqueueRequest('generateSetting', { operationIndex, prompt, sublocationIndex: sublocationIndex, subLocationName, adjective, setting_type });
}


function generateSubLocations() {
  const operationIndex = currentSettingIndex.value;
  let currentSubLocationsText = '';
  if (settings.value[operationIndex].importantLocations.length > 0) {
    if (confirm("Are you sure you want to regenerate sublocations? This will erase sublocations which don't have a full description.")) {
      settings.value[operationIndex].importantLocations = settings.value[operationIndex].importantLocations.filter(location => location.has_detailed_description);
      currentSubLocationsText = "These sublocations already exist so don't include them in the generated results: " + settings.value[operationIndex].importantLocations.map(location => location.name).join(', ');
    } else {
      return;
    }
  }
  const overviewText = getOverviewText(settings.value[operationIndex].setting_overview);
  const prompt = subLocationsPrompt(overviewText, currentSubLocationsText);

  enqueueRequest('generateSubLocations', { operationIndex, prompt });
}

function generateFactions() {
  const operationIndex = currentSettingIndex.value;
  if (settings.value[operationIndex].factions.length > 0) {
    if (confirm("Are you sure you want to regenerate factions? This will erase all existing factions and will remove all npcs associated with a faction.")) {
      settings.value[operationIndex].factions = [];
      //remove all npcs that are part of a faction
      settings.value[operationIndex].npcs = settings.value[operationIndex].npcs.filter(npc => !npc.faction);
    } else {
      return;
    }
  }
  const overviewText = getOverviewText(settings.value[operationIndex].setting_overview);
  const prompt = factionListPrompt(overviewText);

  enqueueRequest('generateFactions', { operationIndex, prompt });
}

function getFactionText(factionsArray) {
  return factionsArray.map(faction => `Faction Name: ${faction.name} \n Influence Level: ${faction.influence_level} \n Faction Leader: ${faction.faction_leader} ${faction.faction_leader_description} \n Faction Assets: ${faction.key_resources_and_assets} \n Faction Motto: \n ${faction.motto}`).join('\n---\n\n');
}

function generateDetailedFaction(index) {
  const operationIndex = currentSettingIndex.value;
  const faction = settings.value[operationIndex].factions[index];
  const factionText = getFactionText(settings.value[operationIndex].factions);
  const settingOverviewText = getOverviewText(settings.value[operationIndex].setting_overview);
  const prompt = detailedFactionPrompt(faction.name, factionText, settingOverviewText);

  enqueueRequest('generateDetailedFaction', { operationIndex, factionIndex: index, prompt });
}

const addNewFaction = () => {
  if (!newFaction.name) return;
  const operationIndex = currentSettingIndex.value;

  const overviewText = getOverviewText(settings.value[operationIndex].setting_overview);
  let factionText;
  if (settings.value[operationIndex].factions.length > 0) {
    factionText = getFactionText(settings.value[operationIndex].factions);
  } else {
    factionText = null;
  }
  const prompt = singleFactionPrompt(newFaction.name, newFaction.description, factionText, overviewText);

  enqueueRequest('addNewFaction', { operationIndex, prompt });
}

function generateQuestHook(npc) {
  const operationIndex = currentSettingIndex.value;
  const overviewText = getOverviewText(settings.value[operationIndex].setting_overview);
  const npcText = getFullNPCDescription(npc);
  let hookQuestType = questType.value;
  if (hookQuestType === randomQuestString) {
    hookQuestType = questTypes[Math.floor(Math.random() * questTypes.length)];
  }
  const prompt = createQuestHookPrompt(overviewText, npcText, hookQuestType);

  enqueueRequest('generateQuestHook', { operationIndex, prompt });
}

async function handleGenerateQuestHook({ operationIndex, prompt }) {
  try {
    nextTick(() => {
      activeTabIndex.value = 4;
    });
    currentlyLoading.value = true
    loadingQuestHooks.value = true;
    const response = await generateGptResponse(prompt, questHookValidation);
    currentlyLoading.value = false;
    loadingQuestHooks.value = false;
    if (settings.value[operationIndex]) {
      const questHook = JSON.parse(response);
      // Auto-combine quest giver and quest detail fields for inline editing
      questHook.combined_giver_and_quest = combineQuestGiverAndDetails(questHook);
      settings.value[operationIndex].questHooks.push(questHook);
      saveSettingsToLocalStorage();
    }
  } catch (error) {
    currentlyLoading.value = false;
    loadingQuestHooks.value = false;
    console.error("Error generating quest hooks:", error);
  }

}

async function handleGenerateNewRelationship({ operationIndex, npcIndex, npcDescription, settingOverviewText, relationshipName, relationshipDescription }) {
  try {
    currentlyLoading.value = true;
    loadingNewRelationship.value = true;
    const prompt = generateSingleRelationshipPrompt(npcDescription, settingOverviewText, relationshipName, relationshipDescription);
    const response = await generateGptResponse(prompt, singleRelationshipValidation);
    currentlyLoading.value = false;
    loadingNewRelationship.value = false;

    if (settings.value[operationIndex]) {
      const relationshipData = JSON.parse(response);
      const npc = settings.value[operationIndex].npcs[npcIndex];

      if (!npc.relationships) {
        npc.relationships = {};
      }

      npc.relationships[relationshipData.name] = relationshipData.relationship;

      // Clear the form
      newRelationship.name = '';
      newRelationship.description = '';

      saveSettingsToLocalStorage();
    }
  } catch (error) {
    currentlyLoading.value = false;
    loadingNewRelationship.value = false;
    console.error("Error generating new relationship:", error);
  }
}

function findObjectByName(objects, name) {
  // Iterate through the array of objects
  for (const obj of objects) {
    // Check if the current object's name property matches the provided name
    if (obj.name === name) {
      return obj;  // Return the matching object
    }
  }
  return undefined;  // Return undefined if no matching object is found
}

function getNPCText(npc) {
  return `Here is a description of ${npc.name}: ${npc.description_of_position} ${npc.current_location} ${npc.distinctive_features_or_mannerisms} ${npc.character_secret}`;
}

function getFullNPCDescription(npc) {
  // Check if this is a fully generated NPC
  const isFullyGenerated = !!npc.read_aloud_description;

  if (!isFullyGenerated) {
    // For basic NPCs, use simpler description
    return `${npc.name}: ${npc.description || 'A character in the setting'}`;
  }

  // For fully generated NPCs, include all details
  let description = `${npc.read_aloud_description || ''} ${npc.description_of_position || ''} ${npc.current_location || ''} ${npc.distinctive_features_or_mannerisms || ''} ${npc.character_secret || ''}`.trim();

  // Add relationships if they exist
  if (npc.relationships && Object.keys(npc.relationships).length > 0) {
    const relationshipText = Object.entries(npc.relationships).map(([name, description]) => `${name}: ${description}`).join(' ');
    description += `\n  Relationships:\n ${relationshipText}`;
  }

  return description;
}

function generateDetailedNPCDescription(index, relationshipObject) {
  const operationIndex = currentSettingIndex.value;
  if (index === null) {
    settings.value[operationIndex].npcs.push({ name: 'New NPC', description: npcShortDescription.value });
    index = settings.value[operationIndex].npcs.length - 1;
    handleAccordion(index);
  }
  const npc = settings.value[operationIndex].npcs[index];
  const npcText = getNPCText(npc);
  const settingOverviewText = getOverviewText(settings.value[operationIndex].setting_overview);
  let faction = findObjectByName(settings.value[operationIndex].factions, npc.faction);
  const factionOverviewText = getOverviewText(faction);

  if (!npc.detailedDescription) {
    let prompt;
    if (relationshipObject) {
      prompt = createNPCRelationshipPrompt(npc.name, npcText, relationshipObject, settingOverviewText, factionOverviewText);
    } else {
      prompt = createNPCPrompt(npc.name, settingOverviewText, factionOverviewText, npcShortDescription.value);
    }
    enqueueRequest('generateDetailedNPCDescription', { operationIndex, npcIndex: index, prompt, relationshipObject });
  }
}

// Generation functions
async function handleGenerateSetting({ operationIndex, prompt, sublocationIndex, subLocationName, adjective, setting_type, title }) {

  try {
    let parentIndex;
    if (isNumber(sublocationIndex)) {
      parentIndex = operationIndex;
      createNewSetting(true, adjective, setting_type, subLocationName, title, parentIndex);
      operationIndex = settings.value.length - 1;
    }
    if (settings.value[operationIndex]) {
      settings.value[operationIndex].loadingsettingOverview = true;
      currentlyLoading.value = true;
    }
    if (isNumber(parentIndex)) {
      settings.value[parentIndex].importantLocations[sublocationIndex].loading = true;
    }
    const response = await generateGptResponse(prompt, kingdomValidation);
    const overview = JSON.parse(response);

    if (settings.value[operationIndex]) {
      if (!settings.value.place_name) {
        settings.value[operationIndex].place_name = overview.name;
      }
      settings.value[operationIndex].setting_overview = overview;
      // Combine overview fields into a single content block for easier editing
      settings.value[operationIndex].setting_overview.combined_content = combineOverviewFields(overview);
      settings.value[operationIndex].npcs = overview.npc_list || [];
      settings.value[operationIndex].loadingsettingOverview = false;
      currentlyLoading.value = false;
      if (isNumber(parentIndex)) {
        settings.value[parentIndex].importantLocations[sublocationIndex].has_detailed_description = true;
        settings.value[parentIndex].importantLocations[sublocationIndex].main_index = operationIndex;
        settings.value[parentIndex].importantLocations[sublocationIndex].loading = false;
        currentlyLoading.value = false;
      }
      saveSettingsToLocalStorage();  // Save to local storage after update
    }
  } catch (error) {
    console.error("Error generating kingdom description:", error);
    if (settings.value[operationIndex]) {
      settings.value[operationIndex].loadingsettingOverview = false;
      currentlyLoading.value = false;
    }
  }
}

async function handleGenerateSubLocations({ operationIndex, prompt }) {
  try {
    if (!settings.value[operationIndex]) return;
    settings.value[operationIndex].loadingSubLocations = true;
    currentlyLoading.value = true;
    const response = await generateGptResponse(prompt, sublocationValidation);
    settings.value[operationIndex].importantLocations = settings.value[operationIndex].importantLocations.concat(JSON.parse(response));
    saveSettingsToLocalStorage();  // Save to local storage after update
    settings.value[operationIndex].loadingSubLocations = false;
    currentlyLoading.value = false;
  } catch (error) {
    currentlyLoading.value = false;
    settings.value[operationIndex].loadingSubLocations = false;
    console.error("Error generating sublocations:", error);
  }
}

async function handleGenerateFactions({ operationIndex, prompt }) {
  try {
    currentlyLoading.value = true;
    settings.value[operationIndex].loadingFactions = true;

    const response = await generateGptResponse(prompt, factionListValidation);
    currentlyLoading.value = false;
    settings.value[operationIndex].loadingFactions = false;
    if (settings.value[operationIndex]) {
      const factions = JSON.parse(response);
      factions.sort((a, b) => a.influence_level - b.influence_level).reverse();
      settings.value[operationIndex].factions = factions;
      factions.forEach(faction => {
        if (!settings.value[operationIndex].npcs.map(npc => npc.name).includes(faction.faction_leader)) {
          settings.value[operationIndex].npcs.push({
            name: faction.faction_leader,
            description: faction.faction_leader_description,
            faction: faction.name
          });
        }
      });
      currentlyLoading.value = false;
      settings.value[operationIndex].loadingFactions = false;
      saveSettingsToLocalStorage();  // Save to local storage after update
    }
  } catch (error) {
    currentlyLoading.value = false;
    settings.value[operationIndex].loadingFactions = false;
    console.error("Error generating factions:", error);
  }
}

async function handleGenerateDetailedFaction({ operationIndex, factionIndex, prompt }) {
  try {
    if (settings.value[operationIndex]) {
      settings.value[operationIndex].factions[factionIndex].loading = true;
      currentlyLoading.value = true;
    }
    const response = await generateGptResponse(prompt, factionDetailValidation);

    const faction = JSON.parse(response);
    if (settings.value[operationIndex]) {
      //merge the new faction with the existing one
      Object.assign(settings.value[operationIndex].factions[factionIndex], faction);
      // Combine detailed fields into a single content block for easier editing
      settings.value[operationIndex].factions[factionIndex].combined_content = combineFactionDetails(faction);
      settings.value[operationIndex].factions[factionIndex].loading = false;
      currentlyLoading.value = false;
      saveSettingsToLocalStorage();  // Save to local storage after update
    }
  } catch (error) {
    if (settings.value[operationIndex]) {
      settings.value[operationIndex].factions[factionIndex].loading = false;
      currentlyLoading.value = false;
    }
    console.error("Error generating detailed faction description:", error);
  }
}

async function handleAddNewFaction({ operationIndex, prompt }) {
  try {
    currentlyLoading.value = true;
    settings.value[operationIndex].loadingNewFaction = true;
    const response = await generateGptResponse(prompt, singleFactionValidation);
    const newGeneratedFaction = JSON.parse(response);
    // Combine detailed fields into a single content block for easier editing
    newGeneratedFaction.combined_content = combineFactionDetails(newGeneratedFaction);
    settings.value[operationIndex].factions.push(newGeneratedFaction);
    //Last faction accordion is opened
    settings.value[operationIndex].factions[settings.value[operationIndex].factions.length - 1].open = true;
    currentlyLoading.value = false;
    //add the faction leader as an npc
    if (!settings.value[operationIndex].npcs.map(npc => npc.name).includes(newGeneratedFaction.faction_leader)) {
      settings.value[operationIndex].npcs.push({
        name: newGeneratedFaction.faction_leader,
        description: newGeneratedFaction.faction_leader_description,
        faction: newGeneratedFaction.name
      });
    }
    settings.value[operationIndex].loadingNewFaction = false;
    newFaction.name = '';
    newFaction.description = '';
    saveSettingsToLocalStorage();  // Save to local storage after update
  } catch (error) {
    currentlyLoading.value = false;
    settings.value[operationIndex].loadingNewFaction = false;
    console.error("Error adding new faction:", error);
  }
}

async function handleGenerateDetailedNPCDescription({ operationIndex, npcIndex, prompt, relationshipObject }) {
  let npc;  // Define npc here to ensure it's accessible throughout the function

  try {
    if (relationshipObject) {
      settings.value[operationIndex].npcs.push({ name: relationshipObject.name, loading: true });  // Also set loading here
      let npcIndex = settings.value[operationIndex].npcs.length - 1;  // Update npcIndex to the new NPC
      npc = settings.value[operationIndex].npcs[npcIndex]; // Correctly reference the newly added npc
      handleAccordion(npcIndex);
    } else {
      npc = settings.value[operationIndex].npcs[npcIndex];
      npc.loading = true;  // Set loading status
      currentlyLoading.value = true;
    }

    const npcPart1 = await generateGptResponse(prompt, npcValidationPart1);
    npc.name = JSON.parse(npcPart1).name;  // Update the name from the response
    const relationshipsAndTips = await generateGptResponse(createRelationshipAndTipsPrompt(npc.name, npcPart1), npcValidationPart2);
    npcShortDescription.value = '';
    if (npc) {
      Object.assign(npc, JSON.parse(npcPart1));
      Object.assign(npc, JSON.parse(relationshipsAndTips));
      // Combine detail fields into a single content block for easier editing
      npc.combined_details = combineNPCDetails(npc);
      npc.loading = false;
      currentlyLoading.value = false;
      saveSettingsToLocalStorage(); // Save to local storage after update
    }
  } catch (error) {
    npcShortDescription.value = '';
    if (npc) {
      npc.loading = false; // Ensure we catch and handle the case where npc might be partially defined
      currentlyLoading.value = false;
    }
    console.error("Error generating detailed NPC description:", error);
  }
}

function handleAccordion(npcIndex) {
  nextTick(() => {
    const accordion = document.getElementById(`npc-${npcIndex}`);
    if (accordion) {
      accordion.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
      settings.value[currentSettingIndex.value].npcs[npcIndex].open = true; // Open the accordion
    }
  });
}

// Helper function to combine overview fields into a single content block
const combineOverviewFields = (overview) => {
  if (!overview) return '';

  const parts = [];

  // Combine related fields into paragraphs
  if (overview.overview || overview.relation_to_larger_setting) {
    parts.push([overview.overview, overview.relation_to_larger_setting].filter(Boolean).join(' '));
  }

  if (overview.history) {
    parts.push(overview.history);
  }

  if (overview.current_ruler_sentence || overview.recent_event_current_ruler || overview.recent_event_consequences) {
    parts.push([
      overview.current_ruler_sentence,
      overview.recent_event_current_ruler,
      overview.recent_event_consequences
    ].filter(Boolean).join(' '));
  }

  if (overview.social_history || overview.recent_event_social) {
    parts.push([overview.social_history, overview.recent_event_social].filter(Boolean).join(' '));
  }

  if (overview.economic_history || overview.impactful_economic_event) {
    parts.push([overview.economic_history, overview.impactful_economic_event].filter(Boolean).join(' '));
  }

  if (overview.military_history || overview.recent_event_military) {
    parts.push([overview.military_history, overview.recent_event_military].filter(Boolean).join(' '));
  }

  if (overview.main_problem || overview.potential_solutions) {
    parts.push([overview.main_problem, overview.potential_solutions].filter(Boolean).join(' '));
  }

  if (overview.conclusion) {
    parts.push(overview.conclusion);
  }

  return parts.filter(Boolean).join('\n\n');
};

// Inline editing functions for Overview
const startEditing = () => {
  const overview = currentSetting.value.setting_overview;

  editForm.value = {
    title: overview?.title || formatTitle(
      currentSetting.value.adjective,
      currentSetting.value.setting_type,
      currentSetting.value.place_name,
      overview?.title
    ),
    content: overview?.combined_content || combineOverviewFields(overview)
  };

  isEditing.value = true;
};

const cancelEdit = () => {
  isEditing.value = false;
};

const saveEdit = () => {
  // Update the setting overview with the edited content
  if (settings.value[currentSettingIndex.value].setting_overview) {
    settings.value[currentSettingIndex.value].setting_overview.title = editForm.value.title;
    settings.value[currentSettingIndex.value].setting_overview.combined_content = editForm.value.content;
  }

  // Save to localStorage
  saveSettingsToLocalStorage();

  isEditing.value = false;
};

// Inline editing functions for Locations
const startEditingLocation = (index) => {
  const location = currentSetting.value.importantLocations[index];

  locationEditForm.value = {
    name: location.name || '',
    description: location.description || '',
    setting_scale: location.setting_scale || ''
  };

  editingLocationIndex.value = index;
};

const cancelEditLocation = () => {
  editingLocationIndex.value = null;
};

const saveEditLocation = () => {
  if (editingLocationIndex.value !== null) {
    const location = currentSetting.value.importantLocations[editingLocationIndex.value];

    location.name = locationEditForm.value.name;
    location.description = locationEditForm.value.description;
    location.setting_scale = locationEditForm.value.setting_scale;

    // Save to localStorage
    saveSettingsToLocalStorage();

    editingLocationIndex.value = null;
  }
};

// Helper function to combine faction detail fields into a single content block
const combineFactionDetails = (faction) => {
  if (!faction) return '';

  const parts = [];

  if (faction.history) {
    parts.push(faction.history);
  }

  if (faction.recent_event || faction.current_situation) {
    parts.push([faction.recent_event, faction.current_situation].filter(Boolean).join(' '));
  }

  if (faction.rites_and_ceremonies || faction.recent_ceremony) {
    parts.push([faction.rites_and_ceremonies, faction.recent_ceremony].filter(Boolean).join(' '));
  }

  if (faction.challenge_to_power || faction.challenge_event) {
    parts.push([faction.challenge_to_power, faction.challenge_event].filter(Boolean).join(' '));
  }

  return parts.filter(Boolean).join('\n\n');
};

// Inline editing functions for Factions
const startEditingFaction = (index) => {
  const faction = currentSetting.value.factions[index];

  factionEditForm.value = {
    name: faction.name || '',
    influence_level: faction.influence_level || 1,
    faction_leader: faction.faction_leader || '',
    faction_leader_description: faction.faction_leader_description || '',
    key_resources_and_assets: faction.key_resources_and_assets || '',
    motto: faction.motto || '',
    detailed_content: faction.combined_content || combineFactionDetails(faction)
  };

  editingFactionIndex.value = index;
};

const cancelEditFaction = () => {
  editingFactionIndex.value = null;
};

const saveEditFaction = () => {
  if (editingFactionIndex.value !== null) {
    const faction = currentSetting.value.factions[editingFactionIndex.value];

    faction.name = factionEditForm.value.name;
    faction.influence_level = factionEditForm.value.influence_level;
    faction.faction_leader = factionEditForm.value.faction_leader;
    faction.faction_leader_description = factionEditForm.value.faction_leader_description;
    faction.key_resources_and_assets = factionEditForm.value.key_resources_and_assets;
    faction.motto = factionEditForm.value.motto;
    faction.combined_content = factionEditForm.value.detailed_content;

    // Save to localStorage
    saveSettingsToLocalStorage();

    editingFactionIndex.value = null;
  }
};

// Helper function to combine NPC detail fields into a single content block
const combineNPCDetails = (npc) => {
  if (!npc) return '';

  const parts = [];

  if (npc.description_of_position) {
    parts.push(npc.description_of_position);
  }

  if (npc.current_location) {
    parts.push(npc.current_location);
  }

  if (npc.distinctive_features_or_mannerisms) {
    parts.push(npc.distinctive_features_or_mannerisms);
  }

  if (npc.character_secret) {
    parts.push(npc.character_secret);
  }

  if (npc.roleplaying_tips) {
    parts.push(npc.roleplaying_tips);
  }

  return parts.filter(Boolean).join('\n\n');
};

// Inline editing functions for NPCs
const startEditingNPC = (index) => {
  const npc = currentSetting.value.npcs[index];

  // Convert relationships object to array for easier editing
  const relationshipsArray = npc.relationships
    ? Object.entries(npc.relationships).map(([name, description]) => ({
      name,
      description
    }))
    : [];

  npcEditForm.value = {
    name: npc.name || '',
    read_aloud_description: npc.read_aloud_description || '',
    combined_details: npc.combined_details || combineNPCDetails(npc),
    relationshipsArray: relationshipsArray
  };

  editingNPCIndex.value = index;
};

const cancelEditNPC = () => {
  editingNPCIndex.value = null;
};

const saveEditNPC = () => {
  if (editingNPCIndex.value !== null) {
    const npc = currentSetting.value.npcs[editingNPCIndex.value];

    npc.name = npcEditForm.value.name;
    npc.read_aloud_description = npcEditForm.value.read_aloud_description;
    npc.combined_details = npcEditForm.value.combined_details;

    // Convert relationships array back to object
    const relationshipsObject = {};
    npcEditForm.value.relationshipsArray.forEach(rel => {
      if (rel.name && rel.description) {
        relationshipsObject[rel.name] = rel.description;
      }
    });
    npc.relationships = relationshipsObject;

    // Save to localStorage
    saveSettingsToLocalStorage();

    editingNPCIndex.value = null;
  }
};

// Relationship management functions
const deleteRelationship = (relationshipIndex) => {
  if (editingNPCIndex.value !== null) {
    npcEditForm.value.relationshipsArray.splice(relationshipIndex, 1);
  }
};

// Helper function to combine quest giver and quest detail fields
const combineQuestGiverAndDetails = (hook) => {
  if (!hook) return '';

  const parts = [];

  if (hook.quest_giver_background) {
    parts.push(hook.quest_giver_background);
  }

  if (hook.quest_giver_encounter) {
    parts.push(hook.quest_giver_encounter);
  }

  if (hook.quest_details) {
    parts.push(hook.quest_details);
  }

  return parts.filter(Boolean).join('\n\n');
};

// Inline editing functions for Quest Hooks
const startEditingQuestHook = (index) => {
  const hook = currentSetting.value.questHooks[index];

  questHookEditForm.value = {
    quest_title: hook.quest_title || '',
    quest_giver_name: hook.quest_giver_name || '',
    combined_giver_and_quest: hook.combined_giver_and_quest || combineQuestGiverAndDetails(hook),
    objectives: [...(hook.objectives || [])],
    challenges: [...(hook.challenges || [])],
    rewards: [...(hook.rewards || [])],
    twist: hook.twist || ''
  };

  editingQuestHookIndex.value = index;
};

const cancelEditQuestHook = () => {
  editingQuestHookIndex.value = null;
};

const saveEditQuestHook = () => {
  if (editingQuestHookIndex.value !== null) {
    const hook = currentSetting.value.questHooks[editingQuestHookIndex.value];

    hook.quest_title = questHookEditForm.value.quest_title;
    hook.quest_giver_name = questHookEditForm.value.quest_giver_name;
    hook.combined_giver_and_quest = questHookEditForm.value.combined_giver_and_quest;
    hook.objectives = [...questHookEditForm.value.objectives];
    hook.challenges = [...questHookEditForm.value.challenges];
    hook.rewards = [...questHookEditForm.value.rewards];
    hook.twist = questHookEditForm.value.twist;

    // Save to localStorage
    saveSettingsToLocalStorage();

    editingQuestHookIndex.value = null;
  }
};

// Array manipulation functions for quest hooks
const addQuestObjective = () => {
  questHookEditForm.value.objectives.push('');
};

const removeQuestObjective = (index) => {
  questHookEditForm.value.objectives.splice(index, 1);
};

const addQuestChallenge = () => {
  questHookEditForm.value.challenges.push('');
};

const removeQuestChallenge = (index) => {
  questHookEditForm.value.challenges.splice(index, 1);
};

const addQuestReward = () => {
  questHookEditForm.value.rewards.push('');
};

const removeQuestReward = (index) => {
  questHookEditForm.value.rewards.splice(index, 1);
};

// Generate quest hook from the Quest Hooks tab
const generateQuestHookFromTab = () => {
  if (selectedQuestGiverIndex.value === null) {
    alert('Please select a quest giver');
    return;
  }

  const npc = currentSetting.value.npcs[selectedQuestGiverIndex.value];
  generateQuestHook(npc);
};

const generateNewRelationship = (npcIndex) => {
  if (!newRelationship.name || !newRelationship.description) {
    alert('Please provide both a name and short description for the relationship');
    return;
  }

  const operationIndex = currentSettingIndex.value;
  const npc = settings.value[operationIndex].npcs[npcIndex];

  const npcDescription = getFullNPCDescription(npc);
  const settingOverviewText = getOverviewText(settings.value[operationIndex].setting_overview);
  const relationshipName = newRelationship.name;
  const relationshipDescription = newRelationship.description;

  enqueueRequest('generateNewRelationship', {
    operationIndex,
    npcIndex,
    npcDescription,
    settingOverviewText,
    relationshipName,
    relationshipDescription
  });
};

// Random type, adjective, and name functions
function randomType(setting) {
  if (setting.place_lore !== '') return '';
  const placeTypes = Object.keys(placeAdjectives);
  return placeTypes[Math.floor(Math.random() * placeTypes.length)];
}

function randomAdjective(setting) {
  if (setting.place_lore !== '') return '';
  if (!placeAdjectives[setting.setting_type.toLowerCase()]) return '';
  return placeAdjectives[setting.setting_type.toLowerCase()][Math.floor(Math.random() * placeAdjectives[setting.setting_type.toLowerCase()].length)];
}

function randomName(setting) {
  if (setting.place_lore !== '') return '';
  if (!place_names[setting.setting_type.toLowerCase()]) return '';
  return place_names[setting.setting_type.toLowerCase()][Math.floor(Math.random() * place_names[setting.setting_type.toLowerCase()].length)];
}
</script>


<style scoped lang="scss">
@import '@rei/cdr-tokens/dist/scss/cdr-tokens.scss';
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');

.app-container {
  display: flex;

  $sidebar-width: 400px;
  $background-color: #f4f4f4;
  $active-color: #ffffff;
  $hover-background-color: #f0f0f0;
  $default-background-color: #e0e0e0;
  $active-border-color: #007BFF;
  $indentation-step: 20px;
  $transition-speed: 0.3s;

  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5); // Semi-transparent
    z-index: 2; // Lower than sidebar but higher than content
  }

  .sidebar {
    transition: transform 0.3s ease;
    background-color: $background-color;
    padding: 1rem;
    --sidebar-width: 400px; // Define sidebar width as a variable for easy changes
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    z-index: 3;

    &.fixed {
      position: fixed;
      top: 0;
      left: 0;
    }

    .settings-tabs {
      list-style: none;
      padding: 0;
      margin: 0;

      li {
        margin-bottom: 4px;

        &.active-tab {
          .setting-button {
            background-color: $active-color;
            border-left-color: $active-border-color;
          }
        }

        .setting-button {
          width: 100%;
          padding: 12px 20px;
          font-size: 1.5rem;
          text-align: left;
          background-color: $default-background-color;
          border: none;
          color: inherit; // Ensures button text color matches your design
          cursor: pointer;
          border-left: 5px solid transparent;
          transition: background-color $transition-speed, border-left-color $transition-speed;

          &:hover {
            background-color: $hover-background-color;
          }

          &:focus {
            outline: none; // Optionally, add a custom focus style
            border-left-color: $active-border-color; // Example focus style for accessibility
          }

          &.active {
            background-color: $active-color;
            border-color: $active-border-color;
          }
        }
      }
    }

    .copy-buttons {
      display: flex;
      flex-direction: column;
      margin: 1rem;
      gap: 1rem;
      margin-bottom: 11rem;
    }
  }

  .sidebar-toggle {
    display: none; // Initially hidden
    position: fixed;
    top: 10px;
    left: 10px;
    z-index: 1001;

    @media (max-width: 768px) {
      display: block; // Only shown on mobile
    }
  }



  .main-content {
    flex-grow: 1;
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 3rem auto;
    max-width: 800px;


    .generate-button {
      margin-top: 2rem;
    }

    .generator-form,
    .content-tabs {
      box-shadow: 0 4px 6px #0000001a;
      padding: 3rem;
      border-radius: 8px;
    }
  }

  p {
    line-height: 3rem;
    margin: 0 0 25px;
  }
}

.delete-button {
  position: absolute;
  top: 65px;
  right: 15px;
  z-index: 1;
}

.influence-level {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 1.5rem 0;
}

.delete-button {
  margin-top: 2rem;
}

.generator-fields {
  display: flex;
  gap: 2rem;
  align-items: center;
}

@media (max-width: 768px) {
  .generator-fields {
    display: block;
  }

}

.lore-field-input {
  margin-top: 1.5rem;
}

.focus-text {
  background-color: $cdr-color-background-secondary;
  color: $cdr-color-text-secondary;
  padding: 1rem 2rem;
  font-style: italic;
}

.faction-header {
  display: block;
  font-size: 1.17em;
  margin-block-start: 1.5em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  font-weight: bold;
  unicode-bidi: isolate;
}

.faction-description {
  margin: 1rem .5rem;
}

.tab-skeleton {
  width: 800px;
  margin-top: 2rem;
}

@media (max-width: 768px) {
  .tab-skeleton {
    width: 100%;
  }
}

.skeleton-hr {
  height: 1px;
  color: rgba(66, 59, 47, 0.75);
  width: 800px;
  background-color: rgba(66, 59, 47, 0.75);
}

.skeleton-ul {
  display: flex;
  gap: 3rem;
  list-style: none;
  padding: 0;
  margin: 0 1rem;
}

.skeleton-tab-inactive {
  color: rgba(66, 59, 47, 0.75);
  font-weight: 300;
}

.skeleton-tab {
  color: rgba(12, 11, 8, 0.75);
  list-style: none;
  font-weight: 500;
}

.skeleton-line {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

.bone-list-item {
  margin: 4rem 0;
}

.relationship-buttons {
  background-color: #f4f2ed;
  border-radius: 8px;
  padding: 1rem 1rem 4rem 1rem;
  margin: 1rem auto;
  text-align: center;

  ul {
    justify-content: center;
    margin: 0;
  }
}

// Inline editing styles
.edit-form {
  .edit-field {
    margin-bottom: 1.5rem;
  }
}

.button-group {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
}

.overview-content {
  margin-bottom: 2rem;
}

@media (max-width: 768px) {
  .button-group {
    flex-direction: column;

    button {
      width: 100%;
    }
  }
}
</style>
