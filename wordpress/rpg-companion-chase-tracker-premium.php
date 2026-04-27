<?php
/**
 * Genesis Custom RPG Companion Template.
 *
 * Template Name: RPG Companion Chase Tracker Premium
 *
 * Premium variant of the Chase Tracker. Identical to the free template
 * except the root div carries data-premium="true", which the Vue app
 * reads to unlock any premium-only content (additional map templates
 * in future iterations).
 *
 * @package Genesis Custom RPG Companion Chase Tracker Premium
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
remove_action( 'genesis_footer', 'genesis_footer_markup_open', 5 );
remove_action( 'genesis_footer', 'genesis_do_footer' );
remove_action( 'genesis_footer', 'genesis_footer_markup_close', 15 );

add_filter( 'genesis_site_layout', '__genesis_return_full_width_content' );

// ----------------------------------------------------------------------------
// Enqueue Vue app assets
// ----------------------------------------------------------------------------

function rpg_companion_chase_tracker_premium_enqueue_assets() {
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
    ' );
}
add_action( 'wp_enqueue_scripts', 'rpg_companion_chase_tracker_premium_enqueue_assets' );

// ----------------------------------------------------------------------------
// Render Vue root element with data-premium
// ----------------------------------------------------------------------------

function rpg_companion_chase_tracker_premium_render_root() {
    echo '<div id="app" data-premium="true"></div>';
}
add_action( 'genesis_entry_content', 'rpg_companion_chase_tracker_premium_render_root' );

genesis();
