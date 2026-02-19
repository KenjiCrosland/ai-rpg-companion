<?php
/**
 * Genesis Custom RPG Companion Template.
 *
 * A template to force full-width layout, remove breadcrumbs, and remove the page title.
 *
 * Template Name: RPG Companion Statblock Generator
 *
 * @package Genesis Custom RPG Companion Statblock Generator
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

//* Remove site footer elements
remove_action( 'genesis_footer', 'genesis_footer_markup_open', 5 );
remove_action( 'genesis_footer', 'genesis_do_footer' );
remove_action( 'genesis_footer', 'genesis_footer_markup_close', 15 );

// Forces full width content layout.
add_filter( 'genesis_site_layout', '__genesis_return_full_width_content' );

// Removes the breadcrumbs.
remove_action( 'genesis_before_loop', 'genesis_do_breadcrumbs');

// Enqueue Vue app assets.
function vue_app_enqueue_assets() {
    rpg_companion_enqueue_entry( 'statblock' );

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
            .site-footer {
                display: none;
            }
            .page.type-page.status-publish.entry{
                margin-bottom: 0 !important;
            }
            .read-aloud p {
                margin-bottom: 1rem;
            }
            .statblock th, .statblock td {
                padding: 0;
                text-align: center;
                border: none;
            }
            .statblock ul.abilities {
             margin-left: 0;
          }
            select {
                padding: 1rem;
            }
            .monster-form select {
                padding-top: .9rem;
            }
            #genesis-content,
            #app {
                max-width: 100%;
                width: 100%;
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
            .entry-content h4 {
                margin-top: 0;
            }
            button:focus, button:hover, input[type="button"]:focus, input[type="button"]:hover, input[type="reset"]:focus, input[type="reset"]:hover, input[type="submit"]:focus, input[type="submit"]:hover, .site-container div.wpforms-container-full .wpforms-form input[type="submit"]:focus, .site-container div.wpforms-container-full .wpforms-form input[type="submit"]:hover, .site-container div.wpforms-container-full .wpforms-form button[type="submit"]:focus, .site-container div.wpforms-container-full .wpforms-form button[type="submit"]:hover, .button:focus, .button:hover {
                color: inherit;
            }
        ' );
}
add_action( 'wp_enqueue_scripts', 'vue_app_enqueue_assets' );

//Add Vue app root element.
function vue_app_render_root_element() {
    echo '<div id="app" data-page="statblock-generator"></div>';
}

// add_action( 'genesis_entry_content', 'vue_app_render_root_element' );

// Runs the Genesis loop.
genesis();