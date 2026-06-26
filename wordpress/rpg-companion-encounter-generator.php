<?php
/**
 * Genesis Custom RPG Companion Template.
 *
 * Template Name: RPG Companion Encounter Generator
 *
 * Forces full-width layout, removes Genesis chrome, enqueues Vue assets,
 * and renders the Vue root mount.
 *
 * @package Genesis Custom RPG Companion Encounter Generator
 * @license GPL-2.0-or-later
 */

// ----------------------------------------------------------------------------
// ✅ Remove Genesis chrome (match Item Generator behavior)
// ----------------------------------------------------------------------------

// Remove header entirely
remove_action( 'genesis_header', 'genesis_header_markup_open', 5 );
remove_action( 'genesis_header', 'genesis_do_header' );
remove_action( 'genesis_header', 'genesis_header_markup_close', 15 );

// Remove entry header/title
remove_action( 'genesis_entry_header', 'genesis_entry_header_markup_open', 5 );
remove_action( 'genesis_entry_header', 'genesis_entry_header_markup_close', 15 );
remove_action( 'genesis_entry_header', 'genesis_do_post_title' );

// Remove navigation menus
remove_theme_support( 'genesis-menus' );

// Remove breadcrumbs
remove_action( 'genesis_before_loop', 'genesis_do_breadcrumbs' );

// Remove footer widgets
remove_theme_support( 'genesis-footer-widgets' );

//* Remove default Genesis footer content but KEEP the markup wrapper
remove_action( 'genesis_footer', 'genesis_do_footer' );

// Force full-width content layout
add_filter( 'genesis_site_layout', '__genesis_return_full_width_content' );

// Enqueue Vue app assets.
function rpg_companion_encounter_enqueue_assets() {
    rpg_companion_enqueue_entry( 'encounter' );

    wp_register_style( 'rpg-companion-overrides', false );
    wp_enqueue_style( 'rpg-companion-overrides' );
    wp_add_inline_style( 'rpg-companion-overrides', '
			/* --- Layout normalization --- */
			main.content {
				max-width: 940px;
				width: auto;
			}

			.site-container .site-inner {
				max-width: none;
				padding: 0;
			}

			/* Kill Genesis wrapper bottom spacing that causes footer gap */
			.site-inner,
			.content-sidebar-wrap,
			.content,
			.entry,
			.entry-content {
				margin-bottom: 0 !important;
				padding-bottom: 0 !important;
			}
			.site-container {
				margin-bottom: 0;
				padding-bottom: 0;
			}
			.site-footer {
				margin-top: 0 !important;
			}

			#genesis-content,
			#app {
				max-width: 100%;
				width: 100%;
			}
			.entry-content {
				min-height: 60vh;
			}

			/* --- Typography spacing --- */
			h1, h2 {
				padding-top: 2rem;
			}

			h2 {
				margin-bottom: 1rem;
			}

			h3 {
				margin-top: 1rem;
				margin-bottom: 1rem;
			}

			p {
				margin: 1rem 0;
			}

			select {
				padding: 1rem;
			}

			/* --- Read aloud block spacing --- */
			.read-aloud p {
				margin-bottom: 1rem;
			}

			.read-aloud {
				margin-bottom: 2rem;
			}

			/* --- Genesis list resets (prevents double bullets / weird indents) --- */
			.entry-content ul {
				padding-left: 0;
			}

			.entry-content ul > li,
			.entry-content ul ul > li {
				list-style-type: none;
			}

			/* --- Statblock special case --- */
			.statblock ul.abilities {
				margin-left: 0;
				padding-left: 0;
			}

			/* --- Avoid Genesis button hover overriding Cedar colors --- */
			button:focus,
			button:hover,
			input[type="button"]:focus,
			input[type="button"]:hover,
			input[type="reset"]:focus,
			input[type="reset"]:hover,
			input[type="submit"]:focus,
			input[type="submit"]:hover,
			.site-container div.wpforms-container-full .wpforms-form input[type="submit"]:focus,
			.site-container div.wpforms-container-full .wpforms-form input[type="submit"]:hover,
			.site-container div.wpforms-container-full .wpforms-form button[type="submit"]:focus,
			.site-container div.wpforms-container-full .wpforms-form button[type="submit"]:hover,
			.button:focus,
			.button:hover {
				color: inherit;
			}

			/* --- Patreon Button Overrides --- */
			.patreon-universal-button a {
				text-decoration: none;
			}
			.patreon-universal-button .patreon-responsive-button {
				display: inline-flex;
				align-items: center;
				justify-content: center;
				gap: 0.5rem;
				padding: 0.75rem 1.5rem;
				background: #F96854;
				color: #fff;
				font-weight: 700;
				font-size: 0.9375rem;
				font-variant: small-caps;
				text-decoration: none;
				border-radius: 6px;
				transition: all 0.2s ease;
				box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
				border: none;
			}
			.patreon-universal-button .patreon-responsive-button:hover {
				background: #e63946;
				transform: translateY(-1px);
				box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
			}
			.patreon-universal-button .patreon-responsive-button:active {
				transform: translateY(0);
			}
			.patreon-universal-button .patreon_logo {
				width: 20px;
				height: 20px;
			}
			' );

    wp_add_inline_style( 'rpg-companion-overrides', rpg_companion_chrome_styles() );
}
add_action( 'wp_enqueue_scripts', 'rpg_companion_encounter_enqueue_assets' );

// -------------------------
// Render Vue root element
// -------------------------

function vue_app_render_root_element() {
    echo '<div id="app" data-page="encounter-generator"></div>';
}

add_action( 'genesis_entry_content', 'vue_app_render_root_element' );

// -----------------------------------------------------------------------------
// SEO content — after main content area
// -----------------------------------------------------------------------------

add_action( 'genesis_after_content', 'rpg_encounter_seo_content' );

function rpg_encounter_seo_content() {
    ?>
    <section class="rpg-seo-section">
      <div class="rpg-seo-spacer"></div>
      <div class="rpg-seo-inner">

        <h2>D&D 5e encounter generator</h2>

        <p>
          Build complete combat encounters for Dungeons &amp; Dragons 5th edition
          with difficulty scaling, tactical DM notes, and scene descriptions. Pick
          monsters from the SRD bestiary (327 creatures with full statblocks) or
          add your own custom creatures, set your party size and levels, and get a
          ready-to-run encounter with read-aloud text, turn-by-turn guidance, and
          non-combat resolution options. Difficulty auto-calculates using official
          5e XP thresholds.
        </p>

        <p>
          This tool is part of a suite of
          <a href="/kenjis-dungeon-master-tools/">game master tools</a>
          including a
          <a href="/ai-powered-dnd-5e-monster-statblock-generator/">statblock generator</a>,
          <a href="/rpg-ai-npc-generator/">NPC generator</a>,
          <a href="/dnd-5e-magic-item-generator/">magic item generator</a>,
          <a href="/kenjis-dungeon-generator-2-0/">dungeon generator</a>, and
          <a href="/rpg-setting-generator-and-world-building-tool/">worldbuilding dashboard</a>.
        </p>

        <h3>Frequently asked questions</h3>

        <div class="rpg-faq" itemscope itemtype="https://schema.org/FAQPage">

          <details itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
            <summary itemprop="name">Is this encounter generator free?</summary>
            <div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
              <p itemprop="text">
                Yes. Encounter generation is unlimited. Statblock generation for
                custom creatures is limited to 5 per day on the free tier.
                <a href="https://www.patreon.com/c/ai_rpg_tookit">Premium</a>
                ($5/month) removes all limits and adds save/load and export.
              </p>
            </div>
          </details>

          <details itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
            <summary itemprop="name">Does it calculate encounter difficulty?</summary>
            <div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
              <p itemprop="text">
                Yes. Difficulty is calculated automatically using official D&amp;D 5e
                XP thresholds and encounter multipliers. It supports multiple party
                groups at different levels and updates live as you add or remove
                monsters.
              </p>
            </div>
          </details>

          <details itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
            <summary itemprop="name">Does it include statblocks?</summary>
            <div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
              <p itemprop="text">
                Yes. SRD monsters come with full statblocks built in, and any custom
                creatures you've built in the
                <a href="/ai-powered-dnd-5e-monster-statblock-generator/">statblock generator</a>
                are available to add directly into your encounters.
              </p>
            </div>
          </details>

          <details itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
            <summary itemprop="name">How is this different from Kobold Fight Club or Donjon?</summary>
            <div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
              <p itemprop="text">
                Those tools are encounter calculators &mdash; they help pick monsters
                that fit a CR budget. This generates the full encounter: a scene
                description you can read aloud, tactical DM notes with turn-by-turn
                guidance, aftermath suggestions, and non-combat resolution options.
              </p>
            </div>
          </details>

          <details itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
            <summary itemprop="name">Can I export encounters?</summary>
            <div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
              <p itemprop="text">
                Yes. Encounters export to Homebrewery markdown format for creating
                polished PDFs. You can also organize encounters into folders and
                save them to your browser for future sessions.
              </p>
            </div>
          </details>

        </div>
      </div>
    </section>
    <?php
}


// -----------------------------------------------------------------------------
// Footer — inside Genesis's own footer wrapper (no gap)
// -----------------------------------------------------------------------------

add_action( 'genesis_footer', 'rpg_encounter_footer' );

function rpg_encounter_footer() {
    ?>
    <div class="rpg-footer-inner">
      <div class="rpg-footer-title">Kenji's Game Master Tools</div>
      <div class="rpg-footer-links">
        <a href="https://cros.land/kenjis-game-master-tool-updates/" target="_blank">What's new</a>
        <span>•</span>
        <a href="https://cros.land" target="_blank">Blog</a>
        <span>•</span>
        <a href="https://discord.gg/DJVTbkH4VG" target="_blank">Discord</a>
        <span>•</span>
        <a href="https://www.patreon.com/c/ai_rpg_tookit" target="_blank">Patreon</a>
      </div>
      <div class="rpg-footer-ogl">
        This content uses the D&amp;D 5e SRD under the
        <a href="https://cros.land/ogl" target="_blank">Open Gaming License</a>
      </div>
    </div>
    <?php
}

// ----------------------------------------------------------------------------
// ✅ Run Genesis
// ----------------------------------------------------------------------------

genesis();
