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

            /* Statblock2024 ability grid — replicated from the component
               (scoped styles) at #app specificity, and pinned in PX: the
               card\'s outer width is px-fixed (850) while the theme\'s root
               font-size scales rem, so rem-sized grid columns overflow the
               half column in prod and the theme\'s word-wrap: break-word
               fractures CON/CHA. px columns + px grid font are immune to
               the theme root entirely. Values = component rems × 10. */
            #app .sb24-abilities {
                display: flex;
                flex-wrap: wrap;
                gap: 4px 8px;
                font-size: 14px;
            }
            #app .sb24-ability-cell {
                display: grid;
                grid-template-columns: 32px 23px 29px 29px;
                column-gap: 3px;
                align-items: center;
                text-align: center;
            }
            #app .sb24-ability-head {
                font-size: 9.5px;
            }
            #app .sb24-ability-abbr {
                white-space: nowrap;
                word-break: normal;
                overflow-wrap: normal;
                text-align: left;
                padding-left: 4px;
            }
            /* Edit mode widens the score column for its input (matches the
               component\'s .sb24-body--editing override). */
            #app .sb24-body--editing .sb24-ability-cell {
                grid-template-columns: 32px 52px 29px 29px;
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
            /* Override default button styles */
            button, input[type="button"], input[type="reset"], input[type="submit"], .button {
                color: inherit;
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