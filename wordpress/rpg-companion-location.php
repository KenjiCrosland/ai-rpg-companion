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
remove_action( 'genesis_footer', 'genesis_footer_markup_open', 5 );
remove_action( 'genesis_footer', 'genesis_do_footer' );
remove_action( 'genesis_footer', 'genesis_footer_markup_close', 15 );

// Force full-width layout
add_filter( 'genesis_site_layout', '__genesis_return_full_width_content' );

// -------------------------
// Enqueue Vue app assets
// -------------------------

function kenji_location_generator_enqueue_assets() {
    $vue_app_path = get_stylesheet_directory() . '/rpg-companion-location/dist/assets';
    $vue_app_url  = get_stylesheet_directory_uri() . '/rpg-companion-location/dist/assets';

    if ( ! is_dir( $vue_app_path ) ) {
        return;
    }

    $files = scandir( $vue_app_path );
    $enqueued_style_handle = '';

    foreach ( $files as $file ) {
        $file_path = $vue_app_path . '/' . $file;
        $file_url  = $vue_app_url . '/' . $file;

        if ( ! is_file( $file_path ) ) {
            continue;
        }

        $ext = pathinfo( $file, PATHINFO_EXTENSION );

        // You can bump this manually when you deploy
        $version = '1.0.0';

        if ( $ext === 'css' ) {
            $handle = 'location-index-' . md5( $file );
            wp_enqueue_style( $handle, $file_url, [], $version );
            $enqueued_style_handle = $handle;
        } elseif ( $ext === 'js' ) {
            wp_enqueue_script( 'location-index-' . md5( $file ), $file_url, [], $version, true );
        }
    }

    // Inline CSS overrides (copied from item generator for consistency)
    if ( $enqueued_style_handle ) {
        $custom_css = '
        main.content {
            max-width: 940px;
            width: auto;
        }
        .site-container .site-inner {
            max-width: none;
            padding: 0;
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
        ';

        wp_add_inline_style( $enqueued_style_handle, $custom_css );
    }
}
add_action( 'wp_enqueue_scripts', 'kenji_location_generator_enqueue_assets' );

// -------------------------
// Render Vue root element
// -------------------------

function kenji_location_generator_render_root_element() {
    echo '<div id="app" data-page="location-generator"></div>';
}

add_action( 'genesis_entry_content', 'kenji_location_generator_render_root_element' );

// Run Genesis loop
genesis();
