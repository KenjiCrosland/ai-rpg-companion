<?php
/**
 * Genesis Custom RPG Companion Template.
 *
 * Template Name: RPG Companion Visual Backpack
 *
 * Free, no-AI drag-and-drop visual inventory for D&D 5e. Forces full-width
 * layout, removes Genesis chrome, enqueues Vue assets, renders the Vue root
 * mount, and appends a server-rendered SEO section + branded footer below the
 * app (matching the cros.land tool-suite pattern).
 *
 * @package Genesis Custom RPG Companion Visual Backpack
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

add_filter( 'pre_get_document_title', 'rpg_backpack_title', 99 );
function rpg_backpack_title( $title ) {
    if ( is_page_template( 'rpg-companion-backpack.php' ) ) {
        return 'D&D 5e Visual Backpack — Drag-and-Drop Inventory & Encumbrance Tracker | cros.land';
    }
    return $title;
}

add_action( 'wp_head', 'rpg_backpack_meta_description', 1 );
function rpg_backpack_meta_description() {
    if ( ! is_page_template( 'rpg-companion-backpack.php' ) ) return;
    echo '<meta name="description" content="Free D&amp;D 5e visual backpack: drag SRD gear into a video-game-style inventory grid, track carrying capacity and encumbrance live, add custom items, and print a clean gear list." />' . "\n";
}

// ----------------------------------------------------------------------------
// Enqueue Vue app assets
// ----------------------------------------------------------------------------

function rpg_companion_backpack_enqueue_assets() {
    rpg_companion_enqueue_entry( 'backpack' );

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
        ' );

    wp_add_inline_style( 'rpg-companion-overrides', rpg_companion_chrome_styles() );
}
add_action( 'wp_enqueue_scripts', 'rpg_companion_backpack_enqueue_assets' );

// ----------------------------------------------------------------------------
// Render Vue root element
// ----------------------------------------------------------------------------

function rpg_companion_backpack_render_root() {
    echo '<div id="app" data-page="backpack"></div>';
}
add_action( 'genesis_entry_content', 'rpg_companion_backpack_render_root' );

// ----------------------------------------------------------------------------
// SEO content — after main content area
// ----------------------------------------------------------------------------

add_action( 'genesis_after_content', 'rpg_backpack_seo_content' );

function rpg_backpack_seo_content() {
    ?>
    <section class="rpg-seo-section">
      <div class="rpg-seo-inner">

        <h2>D&amp;D 5e visual backpack</h2>

        <p>
          Pack your character's gear like a video-game inventory. Drag items
          from the SRD catalog into a grid of color-coded tiles, and the tool
          tracks total weight against your carrying capacity in real time. The
          grid is just a layout — it never runs out of room, so nothing gets
          wedged. Weight is the only real limit, exactly like the rules intend.
          Everything saves to your browser, and you can back the whole pack up
          to a JSON file or print a clean gear list for the table.
        </p>

        <p>
          Tiles are colored by weight, so you can see at a glance whether you're
          hauling feathers or anvils. Raise or lower your Strength score and the
          capacity bar adjusts; cross a threshold and it spells out the 5e
          encumbrance consequences. Anything the SRD list is missing, add as a
          custom item with its own name, weight, category, and size.
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

        <h3>How carrying capacity works in D&amp;D 5e</h3>

        <p>
          Your carrying capacity is your Strength score times 15, in pounds.
          That's the hard cap. The optional variant encumbrance rules add two
          softer thresholds: carry more than 5 times your Strength and you're
          <em>encumbered</em> (speed −10 ft); carry more than 10 times your
          Strength and you're <em>heavily encumbered</em> (speed −20 ft, plus
          disadvantage on ability checks, attack rolls, and saving throws that
          use Strength, Dexterity, or Constitution). This tool tracks all three
          lines for you as you pack.
        </p>

        <details>
          <summary>Why a visual inventory instead of a list</summary>
          <p>
            A list of gear is easy to forget about. Laid out as tiles, your pack
            becomes something you actually look at — heavy items jump out in
            warm colors, and the capacity bar turning red is hard to ignore.
            It's the difference between a spreadsheet and a video-game inventory
            screen.
          </p>
        </details>

        <details>
          <summary>Custom items and homebrew gear</summary>
          <p>
            The SRD equipment list covers the basics, but every table has gear
            it doesn't include. Add custom items with a name, weight, category,
            and tile size; they join the catalog and persist between sessions,
            so your party's signature loot is always a drag away.
          </p>
        </details>

        <details>
          <summary>Saving, backing up, and printing</summary>
          <p>
            Your pack saves to your browser automatically. Use Back up to
            download a JSON file you can keep or move to another device, and
            Restore to load it back. Print list produces a clean, text-only
            inventory grouped by category with a running weight total — handy
            for a paper character sheet.
          </p>
        </details>

      </div>
    </section>
    <?php
}

// ----------------------------------------------------------------------------
// Footer — attribution + cross-links
// ----------------------------------------------------------------------------

add_action( 'genesis_footer', 'rpg_backpack_footer' );

function rpg_backpack_footer() {
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
        Equipment data uses the
        <a href="https://dnd.wizards.com/resources/systems-reference-document" target="_blank" rel="noopener">System Reference Document 5.1</a>
        by Wizards of the Coast, licensed under
        <a href="https://creativecommons.org/licenses/by/4.0/legalcode" target="_blank" rel="noopener">CC BY 4.0</a>.
      </div>
    </div>
    <?php
}

genesis();
