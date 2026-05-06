<?php
/**
 * Genesis Custom RPG Companion Template.
 *
 * Template Name: RPG Companion Chase Tracker
 *
 * Free spatial chase tracker for D&D 5e. Forces full-width layout, removes
 * Genesis chrome, enqueues Vue assets, renders the Vue root mount, and
 * appends a server-rendered SEO section + branded footer below the app
 * (matching the cros.land tool-suite pattern).
 *
 * @package Genesis Custom RPG Companion Chase Tracker
 * @author  Kenji Crosland
 * @license GPL-2.0-or-later
 * @link    https://cros.land/
 */

// ----------------------------------------------------------------------------
// Remove Genesis chrome
// ----------------------------------------------------------------------------

remove_action( 'genesis_header', 'genesis_header_markup_open', 5 );
remove_action( 'genesis_header', 'genesis_do_header' );
remove_action( 'genesis_header', 'genesis_header_markup_close', 15 );
remove_action( 'genesis_entry_header', 'genesis_entry_header_markup_open', 5 );
remove_action( 'genesis_entry_header', 'genesis_entry_header_markup_close', 15 );
remove_action( 'genesis_entry_header', 'genesis_do_post_title' );
remove_theme_support( 'genesis-menus' );
remove_action( 'genesis_before_loop', 'genesis_do_breadcrumbs' );
remove_theme_support( 'genesis-footer-widgets' );
remove_action( 'genesis_footer', 'genesis_do_footer' );

add_filter( 'genesis_site_layout', '__genesis_return_full_width_content' );

// ----------------------------------------------------------------------------
// SEO: title + meta description
// ----------------------------------------------------------------------------

add_filter( 'pre_get_document_title', 'rpg_chase_tracker_title', 99 );
function rpg_chase_tracker_title( $title ) {
    if ( is_page_template( 'rpg-companion-chase-tracker.php' ) ) {
        return 'D&D 5e Chase Tracker — Spatial Maps for Pursuit Scenes | cros.land';
    }
    return $title;
}

add_action( 'wp_head', 'rpg_chase_tracker_meta_description', 1 );
function rpg_chase_tracker_meta_description() {
    if ( ! is_page_template( 'rpg-companion-chase-tracker.php' ) ) return;
    echo '<meta name="description" content="Free D&amp;D 5e chase tracker with spatial zone maps, auto Dash counting, and hand-written zones across urban, wilderness, dungeon, and planar settings." />' . "\n";
}

// ----------------------------------------------------------------------------
// Enqueue Vue app assets
// ----------------------------------------------------------------------------

function rpg_companion_chase_tracker_enqueue_assets() {
    rpg_companion_enqueue_entry( 'chase-tracker' );

    wp_register_style( 'rpg-companion-overrides', false );
    wp_enqueue_style( 'rpg-companion-overrides' );
    wp_add_inline_style( 'rpg-companion-overrides', '
        main.content {
            max-width: 1100px;
            width: auto;
        }
        .site-container .site-inner {
            max-width: none;
            padding: 0;
        }
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
        button, input[type="button"], input[type="reset"], input[type="submit"], .button {
            color: inherit;
        }
        button:focus, button:hover,
        input[type="button"]:focus, input[type="button"]:hover,
        input[type="reset"]:focus, input[type="reset"]:hover,
        input[type="submit"]:focus, input[type="submit"]:hover,
        .button:focus, .button:hover {
            color: inherit;
        }

        /* ---- SEO content section ----
           The chase tracker page is full-width (no sidebar), so the
           sidebar-mirroring spacer used by other tools is unnecessary
           here. .rpg-seo-inner centers itself directly. */
        .rpg-seo-section {
            border-top: 1px solid #e5e2db;
            background: #faf9f6;
        }
        .rpg-seo-inner {
            max-width: 800px;
            margin: 0 auto;
            padding: 3rem 2rem 6rem;
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
            margin: 1.5rem 0 0.5rem;
            padding: 0;
        }
        .rpg-seo-inner p {
            font-family: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
            font-size: 14px;
            color: #7a7668;
            line-height: 1.6;
            margin: 0 0 0.75rem;
        }
        .rpg-seo-inner p strong { color: #3d3929; font-weight: 500; }
        .rpg-seo-inner a { color: #5a8a5e; text-decoration: none; }
        .rpg-seo-inner a:hover { text-decoration: underline; }

        /* ---- Details/summary accordions ---- */
        .rpg-seo-inner details {
            border-top: 1px solid #eeece6;
            margin-top: 0;
        }
        .rpg-seo-inner details:last-of-type {
            border-bottom: 1px solid #eeece6;
        }
        .rpg-seo-inner summary {
            font-family: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
            font-size: 14px;
            font-weight: 500;
            color: #3d3929;
            cursor: pointer;
            padding: 0.7rem 0;
            list-style: none;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .rpg-seo-inner summary::-webkit-details-marker { display: none; }
        .rpg-seo-inner summary::after {
            content: "+";
            color: #999;
            font-size: 18px;
            font-weight: 300;
            flex-shrink: 0;
            margin-left: 1rem;
        }
        .rpg-seo-inner details[open] summary::after { content: "−"; }
        .rpg-seo-inner details p {
            font-size: 13px;
            padding: 0 0 0.7rem;
            margin: 0;
        }

        /* ---- Genesis footer (mid-dark) ---- */
        .site-footer {
            text-align: center;
            padding: 2rem 1rem;
            margin: 0;
            border-top: none;
            background: #4a473f;
        }
        .rpg-footer-inner {
            max-width: 720px;
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
        .rpg-footer-links a { color: #8db88f; text-decoration: none; }
        .rpg-footer-links a:hover { color: #aed4b0; text-decoration: underline; }
        .rpg-footer-links span { color: #777; }
        .rpg-footer-attribution {
            font-family: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
            font-size: 13px;
            color: #a09d95;
            line-height: 1.55;
        }
        .rpg-footer-attribution a { color: #8db88f; text-decoration: none; }
        .rpg-footer-attribution a:hover { color: #aed4b0; text-decoration: underline; }

        @media (max-width: 768px) {
            .rpg-seo-inner { padding: 1.5rem 1rem 4rem; }
            .site-footer { margin-bottom: 60px; }
        }
    ' );
}
add_action( 'wp_enqueue_scripts', 'rpg_companion_chase_tracker_enqueue_assets' );

// ----------------------------------------------------------------------------
// Render Vue root element
// ----------------------------------------------------------------------------

function rpg_companion_chase_tracker_render_root() {
    echo '<div id="app" data-page="chase-tracker"></div>';
}
add_action( 'genesis_entry_content', 'rpg_companion_chase_tracker_render_root' );

// ----------------------------------------------------------------------------
// SEO content — after main content area
// ----------------------------------------------------------------------------

add_action( 'genesis_after_content', 'rpg_chase_tracker_seo_content' );

function rpg_chase_tracker_seo_content() {
    ?>
    <section class="rpg-seo-section">
      <div class="rpg-seo-inner">

        <h2>D&amp;D 5e chase tracker</h2>

        <p>
          Run D&amp;D 5e chases on a spatial zone map. Drag a token to an
          adjacent zone; the tool counts the Dash for you. Tag zones with
          conditions like Crowded or On Fire when the scene changes. Pick
          a template to start, rename the default cast to your party, then
          click any edge of the grid to make room when the chase keeps
          moving. Everything saves to your browser, so a refresh keeps the
          chase intact.
        </p>

        <p>
          Seven environments come with hand-written templates: Urban
          Alleyways, Wilderness Trails, Building Interior, Undercity
          (sewers and caves), Underdark, Feywild, and Shadowfell. The
          library holds 277 zones across those settings, sorted by
          category. Transitional zones (sewer grates down from a city
          street, cave mouths between wilderness and Underdark) carry
          chases from one setting into another. A blank template is there
          if you want to start from nothing.
        </p>

        <p>
          Part of a suite of
          <a href="/2023/04/ai-powered-game-master-tools/">game master tools</a>
          including an
          <a href="/dnd-5e-encounter-generator/">encounter generator</a>,
          <a href="/rpg-ai-npc-generator/">NPC generator</a>,
          <a href="/ai-powered-dnd-5e-monster-statblock-generator/">statblock generator</a>,
          <a href="/ai-rpg-location-generator/">location generator</a>,
          <a href="/dnd-5e-magic-item-generator/">magic item generator</a>,
          <a href="/kenjis-dungeon-generator-2-0/">dungeon generator</a>, and
          <a href="/rpg-setting-generator-and-world-building-tool/">worldbuilding dashboard</a>.
        </p>

        <h3>How chase scenes work in D&amp;D 5e</h3>

        <p>
          The DMG handles pursuit as a series of complications and
          Constitution saves. A creature can Dash 3 + their Con modifier
          rounds before risking exhaustion. Each Dash after that requires
          a DC 10 Con save. The tool counts each Dash when you move a
          token between zones, so the running total stays accurate during
          play.
        </p>

        <details>
          <summary>Common chase scene types</summary>
          <p>
            Urban Alleyways covers festival crowds, rooftops, and a busy
            main street. Wilderness Trails runs through pine slopes and a
            cold stream. Building Interior puts the party in a manor with
            house guards on the stair. Undercity drops everyone into
            ankle-deep sewer water. Feywild, Shadowfell, and Underdark
            cover their planar settings with their own scenarios and zone
            sets. Hundreds of additional zones in the library let you swap
            pieces in and out, and transitional zones connect chases that
            cross between settings.
          </p>
        </details>

        <details>
          <summary>Running a chase at the table</summary>
          <p>
            Pick a template and rename the default tokens to match your
            party. Move a token to an adjacent zone for each Dash; the
            tool counts the Dash. Tag zones with conditions when the scene
            changes: a market goes Crowded, a corridor closes off. If the
            chase pushes past the template, click any edge of the grid to
            expand the map and add a zone from the library.
          </p>
        </details>

        <details>
          <summary>Why use a chase tracker instead of theater of the mind</summary>
          <p>
            D&amp;D chases get confusing fast. Players split up. Pursuers
            gain ground in one zone and lose it in another. Conditions
            stack across the map, and the GM has to hold all of it in
            their head while narrating and ruling on player turns. A
            spatial map carries the bookkeeping for you. Everyone at the
            table sees the state of the chase at a glance.
          </p>
        </details>

        <details>
          <summary>Planar chase scenes: Underdark, Feywild, Shadowfell</summary>
          <p>
            Three planar settings come with their own templates and
            library content. The Underdark map runs through fungal
            thickets and a drow outpost, with a narrow chasm in between.
            The Feywild map sits in twilight woods around a mushroom ring
            and a hollow oak that does not always open the same way. The
            Shadowfell map crosses an ashen road past a broken bridge over
            fog. The library expands each with about 18 zones plus a few
            transitional ones for crossing into the Material plane.
          </p>
        </details>

      </div>
    </section>
    <?php
}

// ----------------------------------------------------------------------------
// Footer — attribution + cross-links
// ----------------------------------------------------------------------------

add_action( 'genesis_footer', 'rpg_chase_tracker_footer' );

function rpg_chase_tracker_footer() {
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
      <div class="rpg-footer-attribution">
        Token and UI icons by Delapouite, DarkZaitzev, Lorc, and Willdabeast,
        from <a href="https://game-icons.net" target="_blank" rel="noopener">game-icons.net</a>
        under <a href="https://creativecommons.org/licenses/by/3.0/" target="_blank" rel="noopener">CC BY 3.0</a>.
        SRD content used under the
        <a href="https://cros.land/ogl" target="_blank" rel="noopener">Open Gaming License</a>.
      </div>
    </div>
    <?php
}

genesis();
