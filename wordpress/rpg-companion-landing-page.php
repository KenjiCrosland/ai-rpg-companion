<?php
/**
 * Genesis Custom RPG Companion Template.
 *
 * A template to force full-width layout, remove breadcrumbs/navigation/footer,
 * and mount the RPG Tool Suite landing page Vue app.
 *
 * Template Name: RPG Tool Suite Landing Page
 *
 * @package Genesis Custom RPG Tool Suite Landing Page
 * @author  Your Name
 * @license GPL-2.0-or-later
 * @link    https://your-link.com/
 */

// Removes the site header entirely.
remove_action( 'genesis_header', 'genesis_header_markup_open', 5 );
remove_action( 'genesis_header', 'genesis_do_header' );
remove_action( 'genesis_header', 'genesis_header_markup_close', 15 );

// Removes the entry header markup and page title.
remove_action( 'genesis_entry_header', 'genesis_entry_header_markup_open', 5 );
remove_action( 'genesis_entry_header', 'genesis_entry_header_markup_close', 15 );
remove_action( 'genesis_entry_header', 'genesis_do_post_title' );

// Remove navigation menus.
remove_theme_support( 'genesis-menus' );

// Remove breadcrumbs.
remove_action( 'genesis_before_loop', 'genesis_do_breadcrumbs' );

// Remove footer widgets.
remove_theme_support( 'genesis-footer-widgets' );

// Removes the site footer entirely.
remove_action( 'genesis_footer', 'genesis_footer_markup_open', 5 );
remove_action( 'genesis_footer', 'genesis_do_footer' );
remove_action( 'genesis_footer', 'genesis_footer_markup_close', 15 );

// Force full width layout.
add_filter( 'genesis_site_layout', '__genesis_return_full_width_content' );

// Enqueue Vue app assets.
function vue_app_enqueue_assets() {
    rpg_companion_enqueue_entry( 'landing' );

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
        #genesis-content,
        #app {
            max-width: 100%;
            width: 100%;
        }

        /* prevent theme list styling from fighting your app */
        .entry-content ul > li,
        .entry-content ul ul > li {
            list-style-type: none;
        }
        .entry-content ul {
            padding-left: 0;
        }

        /* keep button hover/focus from forcing weird colors */
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
        ' );
}
add_action( 'wp_enqueue_scripts', 'vue_app_enqueue_assets' );

// Vue app mount point.
function vue_app_render_root_element() {
    echo '<div id="app" data-page="tool-suite-landing"></div>';
}

// If you want Genesis to print a normal content area *and then* mount inside it,
// hook genesis_entry_content. But you're already using full-page takeover style.
// add_action( "genesis_entry_content", "vue_app_render_root_element" );

// Run Genesis.
genesis();
