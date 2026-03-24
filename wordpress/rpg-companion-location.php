<?php
/**
 * Genesis Custom RPG Companion Template.
 *
 * Template Name: RPG Companion Location Generator
 *
 * @package Genesis Custom RPG Companion Location Generator
 * @license GPL-2.0-or-later
 */

// -------------------------
// Remove Genesis chrome
// -------------------------

// Remove header
remove_action( 'genesis_header', 'genesis_header_markup_open', 5 );
remove_action( 'genesis_header', 'genesis_do_header' );
remove_action( 'genesis_header', 'genesis_header_markup_close', 15 );

// Remove entry header + title
remove_action( 'genesis_entry_header', 'genesis_entry_header_markup_open', 5 );
remove_action( 'genesis_entry_header', 'genesis_entry_header_markup_close', 15 );
remove_action( 'genesis_entry_header', 'genesis_do_post_title' );

// Remove navigation + breadcrumbs
remove_theme_support( 'genesis-menus' );
remove_action( 'genesis_before_loop', 'genesis_do_breadcrumbs' );

// Remove footer widgets + footer
remove_theme_support( 'genesis-footer-widgets' );
//* Remove default Genesis footer content but KEEP the markup wrapper
remove_action( 'genesis_footer', 'genesis_do_footer' );

// Force full-width layout
add_filter( 'genesis_site_layout', '__genesis_return_full_width_content' );

// Don't render the page editor body — prevents stray empty <p> tags above the app.
remove_action( 'genesis_entry_content', 'genesis_do_post_content' );

// Enqueue Vue app assets.
function kenji_location_generator_enqueue_assets() {
    rpg_companion_enqueue_entry( 'location' );

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
        button:focus, button:hover, input[type="button"]:focus, input[type="button"]:hover, input[type="reset"]:focus, input[type="reset"]:hover, input[type="submit"]:focus, input[type="submit"]:hover, .site-container div.wpforms-container-full .wpforms-form input[type="submit"]:focus, .site-container div.wpforms-container-full .wpforms-form input[type="submit"]:hover, .site-container div.wpforms-container-full .wpforms-form button[type="submit"]:focus, .site-container div.wpforms-container-full .wpforms-form button[type="submit"]:hover, .button:focus, .button:hover {
            color: inherit;
        }

        /* ---- SEO content section ---- */
        .rpg-seo-section {
            display: flex;
            border-top: 1px solid #e5e2db;
            margin-top: 4rem;
            background: #faf9f6;
        }

        /* Sidebar spacer - mirrors the actual sidebar */
        .rpg-seo-spacer {
            width: 400px;
            flex-shrink: 0;
            background: #faf9f6;
        }

        .rpg-seo-inner {
            flex: 1;
            max-width: 800px;
            margin: 0 auto;
            padding: 3rem 0 6rem;
        }

        /* Spacer shrinks at tablet width */
        @media (max-width: 1300px) {
            .rpg-seo-spacer {
                width: 320px;
            }
        }

        .rpg-seo-inner h2 {
            font-family: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
            font-size: 18px;
            font-weight: 500;
            color: #3d3929;
            margin: 0 0 0.5rem;
            padding: 0;
        }

        .rpg-seo-inner p {
            font-family: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
            font-size: 14px;
            color: #7a7668;
            line-height: 1.6;
            margin: 0 0 0.5rem;
        }

        .rpg-seo-inner a {
            color: #5a8a5e;
            text-decoration: none;
        }

        .rpg-seo-inner a:hover {
            text-decoration: underline;
        }

        /* ---- Genesis footer styling (mid-dark) ---- */
        .site-footer {
            text-align: center;
            padding: 2rem 1rem;
            margin: 0;
            border-top: none;
            background: #4a473f;
        }

        .rpg-footer-inner {
            max-width: 660px;
            margin: 0 auto;
        }

        .rpg-footer-title {
            font-family: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
            font-size: 16px;
            font-weight: 600;
            color: #ddd9d1;
            margin-bottom: 0.75rem;
        }

        .rpg-footer-links {
            margin-bottom: 1rem;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
            font-size: 15px;
        }

        .rpg-footer-links a {
            color: #8db88f;
            text-decoration: none;
        }

        .rpg-footer-links a:hover {
            color: #aed4b0;
            text-decoration: underline;
        }

        .rpg-footer-links span {
            color: #777;
        }

        .rpg-footer-ogl {
            font-family: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
            font-size: 14px;
            color: #a09d95;
        }

        .rpg-footer-ogl a {
            color: #8db88f;
            text-decoration: none;
        }

        .rpg-footer-ogl a:hover {
            color: #aed4b0;
            text-decoration: underline;
        }

        /* ---- Responsive: sidebar collapses at 768px ---- */
        @media (max-width: 768px) {
            .rpg-seo-spacer {
                display: none;
            }
            .rpg-seo-inner {
                padding: 1.5rem 1rem 4rem;
            }
            .site-footer {
                margin-bottom: 60px;
            }
        }
        ' );
}
add_action( 'wp_enqueue_scripts', 'kenji_location_generator_enqueue_assets' );

// -------------------------
// Render Vue root element
// -------------------------

function kenji_location_generator_render_root_element() {
    echo '<div id="app" data-page="location-generator"></div>';
}

add_action( 'genesis_entry_content', 'kenji_location_generator_render_root_element' );

// -----------------------------------------------------------------------------
// SEO content — after main content area
// -----------------------------------------------------------------------------

add_action( 'genesis_after_content', 'rpg_location_seo_content' );

function rpg_location_seo_content() {
    ?>
    <section class="rpg-seo-section">
      <div class="rpg-seo-inner">

        <h2>RPG location description generator</h2>

        <p>
          Generate vivid, atmospheric location descriptions for any tabletop RPG.
          Enter a location type — a tavern, a wizard's tower, a ripperdoc clinic,
          a spelljammer ship — and get a four-sentence description with NPCs and
          sublocations you can use at the table immediately. Works with D&amp;D,
          Pathfinder, Cyberpunk, Legend of the Five Rings, or any setting you run.
        </p>

        <p>
          Part of a suite of
          <a href="/kenjis-dungeon-master-tools/">game master tools</a>
          including a
          <a href="/ai-powered-dnd-5e-monster-statblock-generator/">statblock generator</a>,
          <a href="/dnd-5e-encounter-generator/">encounter generator</a>,
          <a href="/dnd-5e-magic-item-generator/">magic item generator</a>,
          <a href="/rpg-ai-npc-generator/">NPC generator</a>,
          <a href="/kenjis-dungeon-generator-2-0/">dungeon generator</a>, and
          <a href="/rpg-setting-generator-and-world-building-tool/">worldbuilding dashboard</a>.
        </p>

      </div>
    </section>
    <?php
}


// -----------------------------------------------------------------------------
// Footer — inside Genesis's own footer wrapper (no gap)
// -----------------------------------------------------------------------------

add_action( 'genesis_footer', 'rpg_location_footer' );

function rpg_location_footer() {
    ?>
    <div class="rpg-footer-inner">
      <div class="rpg-footer-title">Kenji's Game Master Tools</div>
      <div class="rpg-footer-links">
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

// Run Genesis loop
genesis();
