<?php
/**
 * Genesis Custom RPG Companion Template.
 *
 * Template Name: RPG Companion Loot Splitter
 *
 * Free, no-AI loot splitter for D&D 5e: paste a hoard and divide coins + magic
 * items fairly between players. Forces full-width layout, removes Genesis chrome,
 * enqueues Vue assets, renders the Vue root mount, and appends a server-rendered
 * SEO section + branded footer below the app (matching the cros.land tool-suite
 * pattern).
 *
 * @package Genesis Custom RPG Companion Loot Splitter
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

add_filter( 'pre_get_document_title', 'rpg_loot_splitter_title', 99 );
function rpg_loot_splitter_title( $title ) {
    if ( is_page_template( 'rpg-companion-loot-splitter.php' ) ) {
        return 'D&D 5e Loot Splitter — Divide Coins & Magic Items Between Players | cros.land';
    }
    return $title;
}

add_action( 'wp_head', 'rpg_loot_splitter_meta_description', 1 );
function rpg_loot_splitter_meta_description() {
    if ( ! is_page_template( 'rpg-companion-loot-splitter.php' ) ) return;
    echo '<meta name="description" content="Free D&amp;D 5e loot splitter: paste a hoard and divide coins and magic items fairly between any number of players. Splits coins evenly by value, deals items at random or balances by worth, and lets you hand off each share as text." />' . "\n";
}

// ----------------------------------------------------------------------------
// Enqueue Vue app assets
// ----------------------------------------------------------------------------

function rpg_companion_loot_splitter_enqueue_assets() {
    rpg_companion_enqueue_entry( 'loot-splitter' );

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

    // Loot-split control hardening (shares stepper, Re-deal, Copy buttons).
    // Genesis styles bare <button> strongly enough to balloon them; re-assert the
    // parchment box. Here the splitter renders inside #app (no modal / teleport),
    // so scope to #app. Shared with the backpack modal via one helper.
    wp_add_inline_style( 'rpg-companion-overrides', rpg_loot_split_control_styles( '#app' ) );

    // The shared chrome styles add a 60px mobile margin below the footer (see
    // rpg_companion_chrome_styles); this app has no bottom bar to clear, so drop
    // it. Added after the chrome styles so it wins by source order.
    wp_add_inline_style( 'rpg-companion-overrides', '
        @media (max-width: 768px) {
            .site-footer { margin-bottom: 0; }
        }
        ' );
}
add_action( 'wp_enqueue_scripts', 'rpg_companion_loot_splitter_enqueue_assets' );

// ----------------------------------------------------------------------------
// Render Vue root element
// ----------------------------------------------------------------------------

function rpg_companion_loot_splitter_render_root() {
    echo '<div id="app" data-page="loot-splitter"></div>';
}
add_action( 'genesis_entry_content', 'rpg_companion_loot_splitter_render_root' );

// ----------------------------------------------------------------------------
// Footer — tool cross-links + SRD attribution
// ----------------------------------------------------------------------------

add_action( 'genesis_footer', 'rpg_loot_splitter_footer' );

function rpg_loot_splitter_footer() {
    ?>
    <div class="rpg-footer-inner">
      <div class="rpg-footer-title">Kenji's D&amp;D Tools</div>
      <div class="rpg-footer-links">
        <a href="/dnd-5e-encounter-generator/">Encounter Generator</a>
        <span>•</span>
        <a href="/ai-powered-dnd-5e-monster-statblock-generator/">Statblock Generator</a>
        <span>•</span>
        <a href="/rpg-ai-npc-generator/">NPC Generator</a>
        <span>•</span>
        <a href="/kenjis-dungeon-generator-2-0/">Dungeon Generator</a>
        <span>•</span>
        <a href="/dnd-5e-inventory-manager/">Inventory Manager</a>
      </div>
      <div class="rpg-footer-attribution">
        Item and equipment data uses the
        <a href="https://dnd.wizards.com/resources/systems-reference-document" target="_blank" rel="noopener">System Reference Document 5.1</a>
        by Wizards of the Coast, licensed under
        <a href="https://creativecommons.org/licenses/by/4.0/legalcode" target="_blank" rel="noopener">CC BY 4.0</a>.
      </div>
    </div>
    <?php
}

genesis();
