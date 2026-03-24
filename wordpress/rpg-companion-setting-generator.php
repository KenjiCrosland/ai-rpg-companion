<?php
/**
 * Genesis Custom RPG Companion Template.
 *
 * A template to force full-width layout, remove breadcrumbs, and remove the page title.
 *
 * Template Name: RPG Companion Setting Generator
 *
 * @package Genesis Custom RPG Companion Setting Generator
 * @author  Your Name
 * @license GPL-2.0-or-later
 * @link    https://your-link.com/
 */

// Removes the entry header markup and page title.
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
    rpg_companion_enqueue_entry( 'setting' );

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

        .entry-content ul {
            margin-bottom: 0;
        }
        button:focus, button:hover {
            background-color: #fff;
        }
        .statblock ul.abilities {
            margin: 0;
        }
        h1, h2 {
            padding-top: 2rem;
        }
        h3 {
            margin-top: 1rem;
            margin-bottom: 1rem;
        }
        h3.room-name {
            margin-top: 0;
            margin-bottom: 0;
        }
        select {
            padding: 1rem;
        }
        .read-aloud p {
            margin-bottom: 1rem;
        }
        .read-aloud {
            margin-bottom: 2rem;
        }
        .statblock th, .statblock td {
            padding: 0;
            text-align: center;
            border: none;
        }
        .monster-form select {
            padding-top: .9rem;
        }
        #detailed-rooms {
            margin-bottom: 0;
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
        button:focus, button:hover, input[type="button"]:focus, input[type="button"]:hover, input[type="reset"]:focus, input[type="reset"]:hover, input[type="submit"]:focus, input[type="submit"]:hover, .site-container div.wpforms-container-full .wpforms-form input[type="submit"]:focus, .site-container div.wpforms-container-full .wpforms-form input[type="submit"]:hover, .site-container div.wpforms-container-full .wpforms-form button[type="submit"]:focus, .site-container div.wpforms-container-full .wpforms-form button[type="submit"]:hover, .button:focus, .button:hover {
            color: inherit;
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

        .rpg-seo-inner h3 {
            font-family: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
            font-size: 16px;
            font-weight: 500;
            color: #3d3929;
            margin: 1rem 0 0.5rem;
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

        /* ---- FAQ accordion ---- */
        .rpg-faq details {
            border-top: 1px solid #eeece6;
        }

        .rpg-faq details:last-child {
            border-bottom: 1px solid #eeece6;
        }

        .rpg-faq summary {
            font-family: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
            font-size: 14px;
            font-weight: 500;
            color: #3d3929;
            cursor: pointer;
            padding: 0.6rem 0;
            list-style: none;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .rpg-faq summary::-webkit-details-marker {
            display: none;
        }

        .rpg-faq summary::after {
            content: "+";
            color: #999;
            font-size: 18px;
            font-weight: 300;
            flex-shrink: 0;
            margin-left: 1rem;
        }

        .rpg-faq details[open] summary::after {
            content: "−";
        }

        .rpg-faq details p {
            font-size: 13px;
            padding: 0 0 0.6rem;
            margin: 0;
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
add_action( 'wp_enqueue_scripts', 'vue_app_enqueue_assets' );

// -------------------------
// Render Vue root element
// -------------------------

function vue_app_render_root_element() {
    echo '<div id="app" data-page="setting-generator"></div>';
}

add_action( 'genesis_entry_content', 'vue_app_render_root_element' );

// -----------------------------------------------------------------------------
// SEO content — after main content area
// -----------------------------------------------------------------------------

add_action( 'genesis_after_content', 'rpg_setting_seo_content' );

function rpg_setting_seo_content() {
    ?>
    <section class="rpg-seo-section">
      <div class="rpg-seo-spacer"></div>
      <div class="rpg-seo-inner">

        <h2>RPG town &amp; kingdom generator</h2>

        <p>
          Build towns, cities, kingdoms, and entire campaign settings with
          generated factions, NPCs, quest hooks, and location descriptions. Start
          at any scale &mdash; a single tavern or an entire realm &mdash; and drill
          down into sub-locations, each with their own factions and characters.
          Works with D&amp;D 5e, Pathfinder, sci-fi settings, or anything homebrew.
          Export everything as plain text, Homebrewery markdown, or structured HTML.
        </p>

        <p>
          Unlike map generators, this tool builds the narrative content DMs
          actually need at the table: who runs this place, what factions are
          competing for power, which NPCs the party will meet, and what quests
          are waiting. Part of a suite of
          <a href="/kenjis-dungeon-master-tools/">game master tools</a>
          including a
          <a href="/ai-powered-dnd-5e-monster-statblock-generator/">statblock generator</a>,
          <a href="/dnd-5e-encounter-generator/">encounter generator</a>,
          <a href="/dnd-5e-magic-item-generator/">magic item generator</a>,
          <a href="/rpg-ai-npc-generator/">NPC generator</a>, and
          <a href="/kenjis-dungeon-generator-2-0/">dungeon generator</a>.
        </p>

        <h3>Frequently asked questions</h3>

        <div class="rpg-faq" itemscope itemtype="https://schema.org/FAQPage">

          <details itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
            <summary itemprop="name">Is this worldbuilding generator free?</summary>
            <div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
              <p itemprop="text">
                Yes. All generation features are free with no daily limits.
                <a href="https://www.patreon.com/c/ai_rpg_tookit">Premium</a>
                ($5/month) adds save/load to file for cross-device access.
              </p>
            </div>
          </details>

          <details itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
            <summary itemprop="name">What can it generate?</summary>
            <div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
              <p itemprop="text">
                Kingdoms, cities, towns, villages, dungeons, buildings, wilderness
                regions, islands, ships, and planes. Each setting includes an
                overview with history and atmosphere, plus generated sub-locations,
                factions, NPCs, and quest hooks.
              </p>
            </div>
          </details>

          <details itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
            <summary itemprop="name">Can I nest locations inside each other?</summary>
            <div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
              <p itemprop="text">
                Yes. Settings can be nested as deeply as you need &mdash; a kingdom
                containing a city, containing a market district, containing an
                adventurer's guild hall. Each level gets its own factions, NPCs,
                and quest hooks.
              </p>
            </div>
          </details>

          <details itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
            <summary itemprop="name">Does it only work for D&amp;D?</summary>
            <div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
              <p itemprop="text">
                No. The generator supports a wide range of setting types and works
                with any tabletop RPG. You can build a fantasy kingdom, a space
                station, a post-apocalyptic settlement, or anything else your
                campaign needs.
              </p>
            </div>
          </details>

          <details itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
            <summary itemprop="name">Does it generate maps?</summary>
            <div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
              <p itemprop="text">
                No. This tool focuses on narrative content &mdash; the descriptions,
                factions, NPCs, and quest hooks that bring a location to life at the
                table. For maps, tools like Donjon or Azgaar's Fantasy Map Generator
                pair well with the content this tool produces.
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

add_action( 'genesis_footer', 'rpg_setting_footer' );

function rpg_setting_footer() {
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

// Runs the Genesis loop.
genesis();