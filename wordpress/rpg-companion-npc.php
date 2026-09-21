<?php
/**
 * Genesis Custom RPG Companion Template.
 *
 * A template to force full-width layout, remove breadcrumbs, and remove the page title.
 *
 * Template Name: RPG Companion NPC Generator
 *
 * @package Genesis Custom RPG Companion NPC Generator
 * @author  Your Name
 * @license GPL-2.0-or-later
 * @link    https://your-link.com/
 */

remove_action( 'genesis_header', 'genesis_header_markup_open', 5 );
remove_action( 'genesis_header', 'genesis_do_header' );
remove_action( 'genesis_header', 'genesis_header_markup_close', 15 );
remove_action( 'genesis_entry_header', 'genesis_entry_header_markup_open', 5 );
remove_action( 'genesis_entry_header', 'genesis_entry_header_markup_close', 15 );
remove_action( 'genesis_entry_header', 'genesis_do_post_title' );
//* Remove navigation
remove_theme_support( 'genesis-menus' );

//* Remove breadcrumbs
remove_action( 'genesis_before_loop', 'genesis_do_breadcrumbs' );

//* Remove site footer widgets
remove_theme_support( 'genesis-footer-widgets' );

//* Remove default Genesis footer content but KEEP the markup wrapper
remove_action( 'genesis_footer', 'genesis_do_footer' );

// Forces full width content layout.
add_filter( 'genesis_site_layout', '__genesis_return_full_width_content' );

// Enqueue Vue app assets.
function vue_app_enqueue_assets() {
    rpg_companion_enqueue_entry( 'npc' );

    wp_register_style( 'rpg-companion-overrides', false );
    wp_enqueue_style( 'rpg-companion-overrides' );
    wp_add_inline_style( 'rpg-companion-overrides', '
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
        select {
            padding: 1rem;
        }
        p {
          margin: 1rem 0;
        }
        .read-aloud p {
            margin-bottom: 1rem;
        }
        .read-aloud {
            margin-bottom: 2rem;
        }
        #genesis-content,
        #app {
            max-width: 100%;
            width: 100%;
        }
        .entry-content {
            min-height: 60vh;
        }
        .entry-content ul > li {
            list-style-type: none;
        }
        .entry-content ul ul > li {
            list-style-type: none;
        }
        .entry-content ul {
            padding-left: 0;
        }
        .quest-content li {
            margin-left: 3rem;
        }
        /* Override default button styles */
        button, input[type="button"], input[type="reset"], input[type="submit"], .button {
            color: inherit;
        }
        button:focus, button:hover, input[type="button"]:focus, input[type="button"]:hover, input[type="reset"]:focus, input[type="reset"]:hover, input[type="submit"]:focus, input[type="submit"]:hover, .site-container div.wpforms-container-full .wpforms-form input[type="submit"]:focus, .site-container div.wpforms-container-full .wpforms-form input[type="submit"]:hover, .site-container div.wpforms-container-full .wpforms-form button[type="submit"]:focus, .site-container div.wpforms-container-full .wpforms-form button[type="submit"]:hover, .button:focus, .button:hover {
            color: inherit;
        }
        .statblock th, .statblock td {
            padding: 0;
            text-align: center;
            border: none;
        }
        .statblock ul.abilities {
            margin-left: 0;
        }

        /* Patreon Button Overrides */
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
add_action( 'wp_enqueue_scripts', 'vue_app_enqueue_assets' );


// -----------------------------------------------------------------------------
// SEO content — after main content area
// -----------------------------------------------------------------------------

add_action( 'genesis_after_content', 'rpg_npc_seo_content' );

function rpg_npc_seo_content() {
    ?>
    <section class="rpg-seo-section">
      <div class="rpg-seo-spacer"></div>
      <div class="rpg-seo-inner">

        <h2>NPC generator for tabletop RPGs</h2>

        <p>
          Create complete NPCs with backstories, personality traits, motivations,
          and roleplaying hooks — ready to drop into your next session. Choose a
          setting (fantasy, sci-fi, post-apocalyptic, or your own) and get a
          fully realized character in seconds. Every NPC is editable inline, so
          you can tweak anything the generator produces. Copy any NPC instantly
          as plain text or in Homebrewery markdown format for polished PDFs.
        </p>

        <p>
          This tool is part of a suite of
          <a href="/kenjis-dungeon-master-tools/">game master tools</a>
          including a
          <a href="/ai-powered-dnd-5e-monster-statblock-generator/">statblock generator</a>,
          <a href="/dnd-5e-encounter-generator/">encounter generator</a>,
          <a href="/dnd-5e-magic-item-generator/">magic item generator</a>,
          <a href="/kenjis-dungeon-generator-2-0/">dungeon generator</a>, and
          <a href="/rpg-setting-generator-and-world-building-tool/">worldbuilding dashboard</a>.
        </p>

        <h3>Frequently asked questions</h3>

        <div class="rpg-faq" itemscope itemtype="https://schema.org/FAQPage">

          <details itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
            <summary itemprop="name">Is this NPC generator free?</summary>
            <div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
              <p itemprop="text">
                Yes. NPC generation is unlimited. Associated D&amp;D 5e combat
                statblocks are limited to 5 per day on the free tier.
                <a href="https://www.patreon.com/c/ai_rpg_tookit">Premium</a>
                ($5/month) removes all limits and adds save/load and export.
              </p>
            </div>
          </details>

          <details itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
            <summary itemprop="name">Does it only work for D&amp;D?</summary>
            <div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
              <p itemprop="text">
                No. The NPC generator works with any tabletop RPG — D&amp;D 5e,
                Pathfinder, Savage Worlds, sci-fi systems, or anything homebrew.
                Output focuses on narrative and personality, not system-specific
                stats, so it fits whatever you're running.
              </p>
            </div>
          </details>

          <details itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
            <summary itemprop="name">Can I edit and export the NPCs?</summary>
            <div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
              <p itemprop="text">
                Yes. Every field is editable inline — change names, rewrite
                backstories, adjust motivations. You can copy any NPC as plain
                text or in Homebrewery markdown format for creating polished PDFs.
              </p>
            </div>
          </details>

          <details itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
            <summary itemprop="name">Can it generate statblocks for NPCs?</summary>
            <div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
              <p itemprop="text">
                Yes. For D&amp;D 5e campaigns, the NPC generator can produce full
                fifth edition combat statblocks. These can be exported to
                Homebrewery or opened in the
                <a href="/ai-powered-dnd-5e-monster-statblock-generator/">statblock generator</a>
                for further customization.
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

add_action( 'genesis_footer', 'rpg_npc_footer' );

function rpg_npc_footer() {
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
        Includes material from the D&amp;D System Reference Documents (SRD 5.1
        and SRD 5.2.1) by Wizards of the Coast LLC, and monster design analysis
        by <a href="https://blogofholding.com/?p=8130" target="_blank">Blog of Holding</a>,
        used under the
        <a href="https://cros.land/ogl" target="_blank">Creative Commons Attribution 4.0 License</a>
      </div>
    </div>
    <?php
}

// Runs the Genesis loop.
genesis();