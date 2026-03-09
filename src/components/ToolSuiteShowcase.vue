<template>
  <div class="tool-suite-wrapper">
    <!-- Collapsible Banner Version -->
    <div class="tool-suite-banner" :class="{ 'expanded': isExpanded }">
      <div class="banner-header" @click="toggleExpanded">
        <div class="banner-title">
          <span class="material-symbols-outlined suite-icon">explore</span>
          <span class="suite-label">Kenji's RPG Tool Suite</span>
          <span v-if="!isMobile" class="tool-count">{{ currentTools.length }} Tools Available</span>
        </div>

        <div class="banner-actions">
          <span v-if="!isMobile" class="current-tool">{{ currentToolName }}</span>
          <button class="expand-button" @click.stop="toggleExpanded" aria-label="Toggle tools">
            <span class="material-symbols-outlined">
              {{ isExpanded ? 'expand_less' : 'expand_more' }}
            </span>
            <span>{{ isExpanded ? 'Hide' : (isMobile ? 'Explore Tools' : 'Explore Tools') }}</span>
          </button>
        </div>
      </div>

      <transition name="slide">
        <div v-if="isExpanded" class="banner-content">
          <!-- Tools Grid — all tools in one grid -->
          <div class="tools-grid">
            <a v-for="tool in currentTools" :key="tool.url" :href="tool.url" class="tool-card"
              :class="{ current: isCurrentTool(tool.url) }">
              <div class="tool-icon" :style="{ backgroundColor: tool.iconColor + '15' }">
                <span class="material-symbols-outlined" :style="{ color: tool.iconColor }">{{ tool.icon }}</span>
              </div>
              <div class="tool-info">
                <h4>{{ tool.name }}</h4>
                <p>{{ tool.description }}</p>
                <span v-if="tool.patronOnly" class="patron-badge">
                  <span class="material-symbols-outlined">star</span> Patron
                </span>
              </div>
              <div v-if="isCurrentTool(tool.url)" class="current-indicator">
                Current Tool
              </div>
            </a>
          </div>

          <!-- Patreon CTA (only when NOT a supporter) -->
          <div v-if="!isSupporter" class="patreon-cta">
            <div class="cta-content">
              <span class="material-symbols-outlined cta-icon">favorite</span>
              <div>
                <strong>Support Development</strong>
                <p>Unlock patron-exclusive tools and features for $5/month</p>
              </div>
              <div class="patreon-universal-button">
                <a href="https://patreon.com/ai_rpg_tookit" target="_blank" rel="noopener">
                  <div class="patreon-responsive-button">
                    <img class="patreon_logo"
                      src="https://cros.land/wp-content/plugins/patreon-connect/assets/img/patreon-logomark-on-coral.svg"
                      alt="Join on Patreon">
                    Join on Patreon
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>

    <!-- Floating Widget Version (Alternative) -->
    <div v-if="showFloatingWidget" class="floating-widget" :class="{ open: widgetOpen }">
      <button class="widget-trigger" @click="widgetOpen = !widgetOpen">
        <span class="material-symbols-outlined widget-icon">apps</span>
        <span class="widget-label">Tool Suite</span>
        <span class="widget-badge">{{ currentTools.length }}</span>
      </button>

      <transition name="fade-scale">
        <div v-if="widgetOpen" class="widget-menu">
          <div class="widget-header">
            <h3>RPG Tool Suite</h3>
            <button @click="widgetOpen = false" class="close-btn" aria-label="Close">
              <span class="material-symbols-outlined">close</span>
            </button>
          </div>
          <div class="widget-tools">
            <a v-for="tool in currentTools.slice(0, 5)" :key="tool.url" :href="tool.url" class="widget-tool">
              <span class="material-symbols-outlined tool-mini-icon">{{ tool.icon }}</span>
              <span>{{ tool.shortName || tool.name }}</span>
            </a>
          </div>
          <div class="widget-footer">
            <button @click="isExpanded = true; widgetOpen = false" class="view-all">
              View All Tools →
            </button>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';

const props = defineProps({
  displayMode: { type: String, default: 'banner' }, // 'banner' or 'widget'
  premium: { type: Boolean, default: false },       // supporter flag
  currentToolUrl: { type: String, default: '' }
});

const isExpanded = ref(false);
const widgetOpen = ref(false);
const showFloatingWidget = ref(false);
const isMobile = ref(false);

const isSupporter = computed(() => !!props.premium);

const mq = typeof window !== 'undefined' ? window.matchMedia('(max-width: 768px)') : null;
const setMobile = () => (isMobile.value = mq ? mq.matches : false);

const tools = [
  { name: 'Monster Statblock Generator', shortName: 'Monsters', description: 'Create balanced D&D 5e monster statblocks', url: 'https://cros.land/ai-powered-dnd-5e-monster-statblock-generator/', icon: 'pest_control', iconColor: '#c62828' },
  { name: 'Dungeon Generator', shortName: 'Dungeons', description: 'Generate complete dungeons with rooms, encounters, and boss battles', url: 'https://cros.land/kenjis-dungeon-generator-2-0/', icon: 'map', iconColor: '#4e342e' },
  { name: 'Magic Item Generator', shortName: 'Items', description: 'Create unique magic items with lore and balanced mechanics', url: 'https://cros.land/dnd-5e-magic-item-generator/', icon: 'auto_fix_high', iconColor: '#6a1b9a' },
  { name: 'Encounter Generator', shortName: 'Encounters', description: 'Build balanced combat encounters for any party composition', url: 'https://cros.land/dnd-5e-encounter-generator/', icon: 'sports_kabaddi', iconColor: '#e65100' },
  { name: 'Setting Generator', shortName: 'Settings', description: 'World-building tool for creating rich campaign settings', url: 'https://cros.land/rpg-setting-generator-and-world-building-tool/', icon: 'public', iconColor: '#1565c0' },
  { name: 'Location Description Generator', shortName: 'Locations', description: 'Generate detailed location descriptions for immediate use', url: 'https://cros.land/ai-rpg-location-generator/', icon: 'fort', iconColor: '#558b2f' },
  { name: 'NPC Generator', shortName: 'NPCs', description: 'Create memorable NPCs with personalities and backstories', url: 'https://cros.land/rpg-ai-npc-generator/', icon: 'person', iconColor: '#00838f' },
  // Patron-exclusive apps
  { name: 'Bookshelf Generator', shortName: 'Books', description: 'Generate libraries full of books with titles and contents', url: 'https://cros.land/ai-powered-bookshelf-generator/', icon: 'menu_book', iconColor: '#5d4037', patronOnly: true },
  { name: 'Lore & Timeline Generator', shortName: 'Lore', description: 'Create detailed histories and timelines for your world', url: 'https://cros.land/ai-powered-lore-and-timeline-generator/', icon: 'history', iconColor: '#6a1b9a', patronOnly: true },
  { name: 'Town Generator', shortName: 'Town', description: 'Create detailed towns and kingdoms with location descriptions', url: 'https://cros.land/ai-powered-game-master-dashboard/', icon: 'dashboard', iconColor: '#1565c0', patronOnly: true },
];

const currentTools = computed(() => tools);

const currentToolName = computed(() => {
  const currentUrl = window.location.href.toLowerCase();
  const sortedTools = [...tools].sort((a, b) => b.url.length - a.url.length);
  const tool = sortedTools.find(t => {
    const parts = t.url.split('/');
    const slug = parts[parts.length - 1] || parts[parts.length - 2];
    return slug && currentUrl.includes(slug);
  });
  return tool ? tool.name : 'Tool Suite';
});

const isCurrentTool = (url) => {
  const currentUrl = window.location.href.toLowerCase();
  const parts = url.split('/');
  const slug = parts[parts.length - 1] || parts[parts.length - 2];
  if (!slug) return false;
  const inUrl = currentUrl.includes(slug);
  if (inUrl && !slug.includes('premium')) {
    if (currentUrl.includes(slug + '-premium')) return false;
  }
  return inUrl;
};

const toggleExpanded = () => {
  isExpanded.value = !isExpanded.value;
  if (isExpanded.value) widgetOpen.value = false;
};

onMounted(() => {
  if (props.displayMode === 'widget') showFloatingWidget.value = true;
  setMobile();
  mq && mq.addEventListener('change', setMobile);
});

onBeforeUnmount(() => {
  mq && mq.removeEventListener('change', setMobile);
});
</script>

<style scoped lang="scss">
@import '@rei/cdr-tokens/dist/scss/cdr-tokens.scss';

/* ---------- Buttons (larger) ---------- */
.expand-button,
.cta-button {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.6rem 1rem;
  border-radius: 6px;
  border: 1px solid;
  font-size: 1.125rem;
  /* larger */
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
  text-decoration: none;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .material-symbols-outlined {
    font-size: 22px;
    line-height: 1;
  }

  span:not(.material-symbols-outlined) {
    line-height: 1;
  }
}

.expand-button {
  background: #fff;
  color: #333;
  border-color: #ccc;

  &:hover,
  &:focus {
    background: #f5f5f5;
    border-color: #999;
  }
}

.cta-button.primary {
  background: $cdr-color-text-brand;
  color: #fff;
  border-color: $cdr-color-text-brand;

  &:hover {
    background: darken($cdr-color-text-brand, 10%);
    border-color: darken($cdr-color-text-brand, 10%);
  }
}

.tool-suite-wrapper {
  position: relative;
  z-index: 100;
}

/* ---------- Banner (larger) ---------- */
.tool-suite-banner {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-bottom: 2px solid #dee2e6;
  margin-bottom: 2rem;
  transition: all 0.3s ease;

  &.expanded {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  .banner-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.1rem 2rem;
    cursor: pointer;
    user-select: none;

    &:hover {
      background: rgba(255, 255, 255, 0.3);
    }

    .banner-title {
      display: flex;
      align-items: center;
      gap: 0.8rem;
      min-width: 0;

      .suite-icon {
        color: $cdr-color-text-brand;
      }

      .suite-label {
        font-weight: 800;
        font-size: 1.375rem;
        /* larger */
        color: $cdr-color-text-primary;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 60vw;
      }

      .tool-count {
        background: none;
        color: #666;
        padding: 0.35rem 0.9rem;
        border: 1px solid #ccc;
        border-radius: 20px;
        font-size: 0.875rem;
        font-weight: 600;
        white-space: nowrap;
      }
    }

    .banner-actions {
      display: flex;
      align-items: center;
      gap: 1rem;

      .current-tool {
        color: $cdr-color-text-secondary;
        font-size: 1.0625rem;
        /* slightly larger */
        font-style: italic;
        opacity: 0;
        transition: opacity 0.3s ease;

        .expanded & {
          opacity: 1;
        }
      }
    }
  }

  .banner-content {
    padding: 2rem;
    background: #fff;
    border-top: 1px solid #e9ecef;
    position: relative;
  }
}

/* ---------- Tools Grid (larger text) ---------- */
.tools-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;

  .tool-card {
    display: flex;
    align-items: flex-start;
    padding: 1.25rem;
    background: #fff;
    border: 1px solid #e5e5e5;
    border-radius: 8px;
    text-decoration: none;
    color: inherit;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);

    &:hover {
      border-color: $cdr-color-text-brand;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }

    &.current {
      background: linear-gradient(135deg, #e3f2fd, #bbdefb);
      border-color: #2196f3;
    }

    .tool-icon {
      width: 48px;
      height: 48px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 10px;
      margin-right: 1rem;
      flex-shrink: 0;

      .material-symbols-outlined {
        font-size: 28px;
      }
    }

    .tool-info {
      flex: 1;

      h4 {
        margin: 0 0 0.35rem 0;
        font-size: 1.25rem;
        font-weight: 800;
        color: $cdr-color-text-primary;
      }

      p {
        margin: 0;
        color: $cdr-color-text-secondary;
        line-height: 1.6;
      }

      .patron-badge {
        display: inline-flex;
        align-items: center;
        gap: 0.25rem;
        margin-top: 0.55rem;
        padding: 0.3rem 0.65rem;
        background: #F96854;
        color: #fff;
        border-radius: 4px;
        font-size: 0.85rem;
        font-weight: 600;

        .material-symbols-outlined {
          font-size: 14px;
        }
      }
    }

    .current-indicator {
      position: absolute;
      top: 0;
      right: 0;
      background: #2196f3;
      color: #fff;
      padding: 0.35rem 0.9rem;
      font-size: 0.95rem;
      border-bottom-left-radius: 8px;
      font-weight: 800;
    }
  }
}

/* ---------- Info & CTAs (larger) ---------- */
.patreon-cta {
  margin-top: 2rem;
}

.patreon-cta .cta-content {
  display: flex;
  align-items: center;
  gap: 1.6rem;
  background: #fafafa;
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  padding: 1rem 1.6rem;

  .cta-icon {
    font-size: 24px;
    color: #999;
  }

  div {

    strong {
      font-size: 1rem;
      display: block;
      margin-bottom: 0.3rem;
    }

    p {
      font-size: 0.875rem;
      margin: 0;
      color: $cdr-color-text-secondary;
    }
  }

  .patreon-universal-button {
    margin-left: auto;

    a {
      text-decoration: none;
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
}

/* ---------- Floating Widget (larger) ---------- */
.floating-widget {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 1000;

  .widget-trigger {
    display: flex;
    align-items: center;
    gap: 0.7rem;
    padding: 0.95rem 1.5rem;
    background: $cdr-color-text-brand;
    color: #fff;
    border: none;
    border-radius: 50px;
    cursor: pointer;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    transition: all 0.3s ease;
    font-size: 1.125rem;

    &:hover {
      transform: scale(1.05);
      box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
    }

    .widget-icon {
      font-size: 24px;
    }

    .widget-badge {
      background: #fff;
      color: $cdr-color-text-brand;
      padding: 0.3rem 0.6rem;
      border-radius: 10px;
      font-size: 0.95rem;
      font-weight: 800;
    }
  }

  .widget-menu {
    position: absolute;
    bottom: calc(100% + 1rem);
    right: 0;
    width: 320px;
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
    overflow: hidden;

    .widget-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem;
      background: linear-gradient(135deg, #f8f9fa, #e9ecef);
      border-bottom: 1px solid #dee2e6;

      h3 {
        margin: 0;
        font-size: 1.25rem;
      }

      .close-btn {
        background: none;
        border: none;
        cursor: pointer;
        padding: 0.25rem;
        color: $cdr-color-text-secondary;

        &:hover {
          color: $cdr-color-text-primary;
        }
      }
    }

    .widget-tools {
      padding: 0.6rem;

      .widget-tool {
        display: flex;
        align-items: center;
        gap: 0.9rem;
        padding: 0.9rem;
        text-decoration: none;
        color: $cdr-color-text-primary;
        border-radius: 8px;
        transition: background 0.2s;
        font-size: 1.0625rem;

        &:hover {
          background: #f8f9fa;
        }

        .tool-mini-icon {
          font-size: 22px;
          color: $cdr-color-text-brand;
        }
      }
    }

    .widget-footer {
      padding: 1rem;
      border-top: 1px solid #dee2e6;

      .view-all {
        width: 100%;
        padding: 0.7rem;
        background: none;
        border: 1px solid $cdr-color-text-brand;
        color: $cdr-color-text-brand;
        border-radius: 6px;
        cursor: pointer;
        font-weight: 700;
        transition: all 0.2s;
        font-size: 1.0625rem;

        &:hover {
          background: $cdr-color-text-brand;
          color: #fff;
        }
      }
    }
  }
}

/* ---------- Transitions ---------- */
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
  overflow: hidden;
}

.slide-enter-from {
  max-height: 0;
  opacity: 0;
}

.slide-leave-to {
  max-height: 0;
  opacity: 0;
}

.fade-scale-enter-active,
.fade-scale-leave-active {
  transition: all 0.2s ease;
}

.fade-scale-enter-from,
.fade-scale-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

/* ---------- Responsive ---------- */
@media (max-width: 768px) {
  .tool-suite-banner {
    z-index: 150;

    .banner-header {
      flex-direction: row;
      align-items: center;
      gap: 0.6rem;
      padding: 0.8rem 1rem;

      .banner-title {
        flex: 1 1 auto;
        gap: 0.6rem;

        .suite-label {
          font-size: 1.25rem;
          max-width: 52vw;
        }
      }

      .banner-actions {
        flex: 0 0 auto;
        gap: 0.6rem;

        .current-tool {
          display: none;
        }

        .expand-button {
          padding: 0.5rem 0.8rem;
        }
      }
    }

    .banner-content {
      padding: 1rem;
    }
  }

  .tools-grid {
    grid-template-columns: 1fr;
  }

  .floating-widget {
    bottom: 1rem;
    right: 1rem;

    .widget-menu {
      width: calc(100vw - 2rem);
      right: -1rem;
    }
  }
}
</style>
