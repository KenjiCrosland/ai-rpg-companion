<template>
  <div class="landing">
    <!-- HERO -->
    <section class="hero" :style="heroStyle">
      <div class="hero-overlay"></div>

      <div class="hero-content">
        <div class="hero-top-spacer"></div>


        <h1 class="hero-title">Kenji’s Game Master Tools</h1>

        <p class="hero-subtitle">
          Generate magic items, monster statblocks, NPCs, dungeons, and campaign-building content in minutes —
          designed for real prep workflows.
        </p>

        <div class="hero-callouts">
          <span class="callout">
            <span class="material-symbols-outlined">file_export</span>
            Export-friendly
          </span>
          <span class="callout">
            <span class="material-symbols-outlined">description</span>
            Homebrewery-ready
          </span>
          <span class="callout">
            <span class="material-symbols-outlined">casino</span>
            Built by a GM
          </span>
        </div>

        <div class="hero-ctas">
          <a class="btn primary" :href="primaryCta.url">
            <span class="material-symbols-outlined">bolt</span>
            {{ primaryCta.label }}
          </a>
        </div>
      </div>
    </section>

    <!-- FEATURED -->
    <section class="section">
      <div class="section-header">
        <h2>Start here</h2>
        <p>
          The highest impact tools to try first.
        </p>
      </div>

      <div class="featured-grid">
        <article v-for="tool in featuredTools" :key="tool.id" class="featured-card">
          <div class="featured-image" :style="toolImageStyle(tool)">
            <div v-if="tool.ribbon" class="ribbon">
              <span class="material-symbols-outlined">{{ tool.ribbon.icon }}</span>
              {{ tool.ribbon.label }}
            </div>
          </div>

          <div class="featured-body">
            <div class="featured-title-row">
              <div class="featured-icon">
                <span class="material-symbols-outlined">{{ tool.icon }}</span>
              </div>
              <div class="featured-title">
                <h3>{{ tool.name }}</h3>
                <p class="featured-desc">{{ tool.longDescription || tool.description }}</p>
              </div>
            </div>
            <div class="featured-actions">
              <a v-if="tool.freeUrl" class="btn small primary" :href="tool.freeUrl">
                Free
                <span class="material-symbols-outlined">arrow_forward</span>
              </a>

              <a v-if="tool.premiumUrl" class="btn small gold" :href="tool.premiumUrl">
                Premium
                <span class="material-symbols-outlined">star</span>
              </a>
            </div>

          </div>
        </article>
      </div>
    </section>

    <!-- MORE TOOLS -->
    <section ref="toolsRef" class="section">
      <div class="section-header">
        <h2>More Tools</h2>
        <p>
          Everything else in the suite — quick access to the free version, or jump straight to premium features.
        </p>
      </div>

      <div class="tile-grid">
        <article v-for="tool in nonFeaturedTools" :key="tool.id" class="tile">
          <div class="tile-top">
            <div class="tile-icon">
              <span class="material-symbols-outlined">{{ tool.icon }}</span>
            </div>

            <div class="tile-title-wrap">
              <h4>{{ tool.shortName || tool.name }}</h4>
              <p class="tile-desc">{{ tool.description }}</p>
            </div>
          </div>

          <!-- Buttons at bottom (NOT hoverable, tile not clickable) -->
          <div class="tile-actions">
            <a v-if="tool.freeUrl" class="btn tiny primary" :href="tool.freeUrl">
              Free
              <span class="material-symbols-outlined">arrow_forward</span>
            </a>

            <a v-if="tool.premiumUrl" class="btn tiny gold" :href="tool.premiumUrl">
              Premium
              <span class="material-symbols-outlined">star</span>
            </a>
          </div>
        </article>
      </div>
    </section>

    <!-- ABOUT -->
    <section class="section about">
      <div class="about-card">
        <img class="about-photo" src="https://cros.land/wp-content/uploads/2022/10/kenji-crosland-profile-768x512.jpeg"
          alt="Kenji Crosland" loading="lazy" />

        <div class="about-content">
          <h2>Hi — I’m Kenji</h2>

          <p>
            I created these AI-powered Game Master tools because I'm a GM myself.
            I know what it feels like to get burnt out generating content by hand every week.
            The moment I saw what AI could do, I immediately recognized the potential to augment a Game Master's
            workflow.
          </p>

          <p>
            One thing I noticed early on is that using ChatGPT directly often produces generic and very boring results.
            I learned, however, that meticulous instruction on how to structure content can yield far better outputs.
            So my goal with these tools is to guide AI toward content that feels playable and compelling —
            monsters, NPCs, and settings that players actually care about and remember.
          </p>

          <p>
            I’m a front-end developer by day, and outside of code I’m an enthusiastic practitioner of
            <a href="https://en.wikipedia.org/wiki/Gongfu_tea_ceremony" target="_blank" rel="noopener">Gongfu tea</a> —
            I serve tea regularly for friends and the community.
            I live with my fiancé and two cats —
            <a href="https://cros.land/wp-content/uploads/2026/01/rumi-goblin-enhanced.jpg" target="_blank"
              rel="noopener">Rumi</a>
            and
            <a href="https://cros.land/wp-content/uploads/2026/01/daphne-sleeping-happy-scaled.jpg" target="_blank"
              rel="noopener">Daphne</a>.
          </p>

          <div class="about-links">
            <a class="btn small ghost-dark" href="https://cros.land/" target="_blank" rel="noopener">
              <span class="material-symbols-outlined">home</span>
              Blog & Resources
            </a>

            <a class="btn small gold" href="https://patreon.com/ai_rpg_tookit" target="_blank" rel="noopener">
              <span class="material-symbols-outlined">favorite</span>
              Support on Patreon
            </a>
          </div>
        </div>


      </div>
    </section>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";

/**
 * HERO IMAGE
 */
const HERO_IMAGE =
  "https://cros.land/wp-content/uploads/2026/01/dice-background-scaled.jpg?auto=format&fit=crop&w=2000&q=80";

/**
 * Tools model:
 * - freeUrl optional (premium-only tools exist)
 * - premiumUrl optional
 * - image optional (featured)
 */
const tools = [
  {
    id: "monsters",
    name: "Monster Statblock Generator",
    shortName: "Monsters",
    icon: "pest_control",
    description: "Create balanced D&D 5e monster statblocks.",
    longDescription:
      "Build encounter-ready monsters fast — with stats that hit the table cleanly and don’t require a balancing spreadsheet.",
    freeUrl: "https://cros.land/ai-powered-dnd-5e-monster-statblock-generator/",
    premiumUrl:
      "https://cros.land/ai-powered-dnd-5e-monster-statblock-generator-premium/",
    image: "https://cros.land/wp-content/uploads/2024/07/statblock-generator-robots.jpg?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "dungeons",
    name: "Dungeon Generator 2.0",
    shortName: "Dungeons",
    icon: "map",
    description: "Generate complete dungeons with rooms, obstacles, twists, and bosses.",
    longDescription:
      "This one is built for playable structure — rooms, encounter beats, twists, and bosses that you can run without rewriting everything.",
    freeUrl: "https://cros.land/kenjis-dungeon-generator-2-0/",
    premiumUrl: "https://cros.land/dungeon-generator-2-0-premium-version/",
    image: "https://cros.land/wp-content/uploads/2026/01/dungeon-generator.png?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "items",
    name: "Magic Item Generator",
    shortName: "Items",
    icon: "auto_fix_high",
    description: "Create unique magic items with lore and balanced mechanics.",
    longDescription:
      "Generate items that feel like they belong in a real campaign — with flavorful lore, balanced mechanics, and built-in hooks for adventure.",
    freeUrl: "https://cros.land/dnd-5e-magic-item-generator/",
    premiumUrl: "https://cros.land/dnd-5e-magic-item-generator-premium-version/",
    image: "https://cros.land/wp-content/uploads/2026/01/little-guys-making-magic-sword.png?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "npcs",
    name: "NPC Generator",
    shortName: "NPCs",
    icon: "person",
    description: "Generate memorable NPCs with personalities and hooks.",
    freeUrl: "https://cros.land/rpg-ai-npc-generator/",
    premiumUrl: "https://cros.land/npc-generator-premium-version/",
  },
  {
    id: "settings",
    name: "Setting Generator",
    shortName: "Settings",
    icon: "public",
    description: "World-building dashboard for towns, factions, NPCs, and sublocations.",
    freeUrl: "https://cros.land/rpg-setting-generator-and-world-building-tool/",
    premiumUrl:
      "https://cros.land/rpg-setting-generator-and-world-building-tool-premium-version/",
    image: "https://cros.land/wp-content/uploads/2024/05/dragonreach-1-1536x878.jpg?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "encounters",
    name: "Encounter Generator",
    shortName: "Encounters",
    icon: "sports_kabaddi",
    description: "Build balanced combat encounters for any party composition.",
    freeUrl: "https://cros.land/dnd-5e-encounter-generator/",
    premiumUrl: "https://cros.land/dnd-5e-encounter-generator-premium/",
  },
  {
    id: "locations",
    name: "Location Description Generator",
    shortName: "Locations",
    icon: "fort",
    description: "Generate detailed location descriptions for immediate use.",
    freeUrl: "https://cros.land/ai-rpg-location-generator/",
  },

  // Premium-only (as requested)
  {
    id: "lore",
    name: "Lore & Timeline Generator",
    shortName: "Lore (Premium only)",
    icon: "history",
    description: "Create detailed histories and timelines for your world.",
    premiumUrl: "https://cros.land/ai-powered-lore-and-timeline-generator/",
  },
  {
    id: "books",
    name: "Bookshelf Generator",
    shortName: "Books (Premium only)",
    icon: "menu_book",
    description: "Generate libraries full of books with titles and contents.",
    premiumUrl: "https://cros.land/ai-powered-bookshelf-generator/",
  },
];

const featuredIds = new Set(["monsters", "dungeons", "settings"]);
const featuredTools = computed(() => tools.filter((t) => featuredIds.has(t.id)));
const nonFeaturedTools = computed(() => tools.filter((t) => !featuredIds.has(t.id)));

const primaryCta = computed(() => ({
  label: "Start with the Magic Item Generator",
  url: tools.find((t) => t.id === "items")?.freeUrl || tools[0].premiumUrl || "#",
}));

const toolsRef = ref(null);

function scrollToTools() {
  toolsRef.value?.scrollIntoView({ behavior: "smooth", block: "start" });
}

const heroStyle = computed(() => ({
  backgroundImage: `url(${HERO_IMAGE})`,
}));

function toolImageStyle(tool) {
  if (!tool.image) return {};
  return { backgroundImage: `url(${tool.image})` };
}
</script>

<style scoped>
/* ---- Page Frame ---- */
.landing {
  max-width: 1200px;
  margin: 0 auto;
  padding: 18px 18px 64px;
  color: #0f172a;
}

/* ---- HERO ---- */
.hero {
  position: relative;
  border-radius: 18px;
  overflow: hidden;
  min-height: 320px;
  background-size: cover;
  background-position: center;
  margin-bottom: 26px;
}

/* gradient overlay */
.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg,
      rgba(8, 37, 57, 0.92) 0%,
      rgba(8, 37, 57, 0.82) 45%,
      rgba(8, 37, 57, 0.12) 100%);
}

.hero-content {
  position: relative;
  z-index: 2;
  padding: 46px 34px;
  max-width: 680px;
  color: white;
}

.hero-top-spacer {
  height: 14px;
}

.hero-title {
  margin: 14px 0 8px;
  font-size: clamp(28px, 3vw, 40px);
  line-height: 1.08;
}

.hero-subtitle {
  margin: 0 0 18px;
  opacity: 0.9;
  line-height: 1.45;
  max-width: 62ch;
}

.hero-ctas {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-top: 24px;
}

.hero-badges {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.callout {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 6px 25px 0 0;
  font-weight: 800;
  font-size: 13px;
}

/* ---- Buttons ---- */
.btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  border-radius: 12px;
  padding: 12px 14px;
  font-weight: 900;
  border: 1px solid rgba(255, 255, 255, 0.14);
  background: rgba(255, 255, 255, 0.08);
  color: inherit;
  text-decoration: none;
  cursor: pointer;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}

.btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.18);
}

.btn.primary {
  background: #135d4a;
  border-color: rgba(255, 255, 255, 0.18);
  color: white;
}

.btn.ghost {
  background: rgba(255, 255, 255, 0.1);
}

.btn.small {
  padding: 10px 12px;
  border-radius: 10px;
  font-size: 14px;
}

.btn.tiny {
  padding: 6px 9px;
  /* ✅ smaller */
  border-radius: 9px;
  font-size: 12px;
  /* ✅ smaller */
  font-weight: 900;
  gap: 6px;
}

.btn.tiny .material-symbols-outlined {
  font-size: 16px;
  /* ✅ smaller icon */
  line-height: 1;
}


.btn.gold {
  background: linear-gradient(135deg, #ffe08a, #ffd166);
  border-color: rgba(0, 0, 0, 0.08);
  color: #4a3b00;
}

/* a dark ghost button for the about section */
.btn.ghost-dark {
  background: #eef2f7;
  border-color: rgba(15, 23, 42, 0.08);
  color: #0f172a;
}

/* ---- Sections ---- */
.section {
  margin-top: 22px;
}

.section-header h2 {
  margin: 0 0 4px;
  font-size: 22px;
}

.section-header p {
  margin: 0;
  opacity: 0.7;
  max-width: 78ch;
}

/* ---- Featured ---- */
.featured-grid {
  margin-top: 14px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
}

.featured-card {
  border-radius: 16px;
  overflow: hidden;
  background: white;
  border: 1px solid #e8edf2;
  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.06);
  display: grid;
  grid-template-rows: 200px 1fr;
}

.featured-image {
  position: relative;
  background: linear-gradient(135deg, #e9eef5, #f8fafc);
  background-size: cover;
  background-position: center;
}

.ribbon {
  position: absolute;
  left: 12px;
  top: 12px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 10px;
  border-radius: 999px;
  font-weight: 900;
  font-size: 12px;
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(15, 23, 42, 0.08);
}

.featured-body {
  padding: 14px 14px 16px;
  background-color: #f6f4f0;
  font-size: 12.5px;
}

.featured-title-row {
  display: grid;
  grid-template-columns: 44px 1fr;
  gap: 10px;
  align-items: start;
}

.featured-icon {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: #f1f5f9;
  display: grid;
  place-items: center;
}

.featured-title h3 {
  margin: 2px 0 6px;
  font-size: 16px;
}

.featured-desc {
  margin: 0;
  opacity: 0.72;
  line-height: 1.35;
}

.featured-actions {
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: flex-start;
  /* ✅ left align */
  margin-top: 10px;
  margin-left: 54px;
  /* ✅ aligns with the text column (44px icon + 10px gap) */
}


.soon {
  font-size: 13px;
  opacity: 0.55;
  font-weight: 900;
}

.soon.premium-only {
  background: rgba(255, 209, 102, 0.25);
  color: #4a3b00;
  padding: 6px 10px;
  border-radius: 999px;
}

/* ---- Tiles (not hoverable, not clickable) ---- */
.tile-grid {
  margin-top: 14px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

.tile {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 14px;
  border-radius: 16px;
  border: 1px solid #e8edf2;
  background: #fff;
  font-size: 12.5px;
  box-shadow: 0 4px 14px rgba(15, 23, 42, 0.04);
}

.tile-top {
  display: grid;
  grid-template-columns: 42px 1fr;
  gap: 10px;
  align-items: start;
}

.tile-icon {
  width: 42px;
  height: 42px;
  border-radius: 12px;
  background: #f1f5f9;
  display: grid;
  place-items: center;
}

.tile-title-wrap h4 {
  margin: 0;
  font-size: 15px;
}

.tile-desc {
  margin: 6px 0 0;
  opacity: 0.72;
  line-height: 1.3;

  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.tile-actions {
  display: flex;
  gap: 8px;
  align-items: center;
  flex-wrap: wrap;
  margin-top: auto;
  justify-content: flex-start;
  /* ✅ left align */
  margin-left: 52px;
  /* ✅ aligns with tile text column (42px icon + 10px gap) */
}


.tile-note {
  font-size: 12px;
  font-weight: 900;
  padding: 7px 10px;
  border-radius: 999px;
  background: rgba(255, 209, 102, 0.25);
  color: #4a3b00;
}

/* ---- About ---- */
.about {
  margin-top: 34px;
}

.about-card {
  display: grid;
  grid-template-columns: 340px 1fr;
  gap: 18px;
  align-items: stretch;

  border-radius: 18px;
  overflow: hidden;
  border: 1px solid #e8edf2;
  background: #fff;
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.06);
}

.about-photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.about-content {
  padding: 18px 18px 20px;
}

.about-content h2 {
  margin: 0 0 10px;
  font-size: 22px;
}

.about-content p {
  margin: 0 0 10px;
  opacity: 0.85;
  line-height: 1.55;
  max-width: 82ch;
}

.about-links {
  margin-top: 12px;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

/* ---- Responsive ---- */
@media (max-width: 980px) {

  .featured-grid,
  .tile-grid {
    grid-template-columns: 1fr;
  }

  .hero-content {
    padding: 34px 22px;
  }

  .about-card {
    grid-template-columns: 1fr;
  }

  .about-photo {
    max-height: 280px;
  }
}
</style>
