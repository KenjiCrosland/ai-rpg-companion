<?php
/**
 * Genesis Custom RPG Companion Template.
 *
 * A template to force full-width layout, remove breadcrumbs, and remove the page title.
 *
 * Template Name: RPG Companion Location Generator
 *
 * @package Genesis Custom RPG Companion Location Generator
 * @author  Your Name
 * @license GPL-2.0-or-later
 * @link    https://your-link.com/
 */

// Removes the entry header markup and page title.
remove_action( 'genesis_entry_header', 'genesis_entry_header_markup_open', 5 );
remove_action( 'genesis_entry_header', 'genesis_entry_header_markup_close', 15 );
remove_action( 'genesis_entry_header', 'genesis_do_post_title' );

// Forces full width content layout.
add_filter( 'genesis_site_layout', '__genesis_return_full_width_content' );

// Removes the breadcrumbs.
remove_action( 'genesis_before_loop', 'genesis_do_breadcrumbs' );

// Enqueue Vue app assets.
function vue_app_enqueue_assets() {
    $vue_app_path = get_stylesheet_directory() . '/rpg-companion/dist/assets';
    $vue_app_url = get_stylesheet_directory_uri() . '/rpg-companion/dist/assets';

    $files = scandir($vue_app_path);

    foreach ($files as $file) {
        $file_path = $vue_app_path . '/' . $file; // Add the missing slash
        $file_url = $vue_app_url . '/' . $file; // Add the missing slash

        if (is_file($file_path)) {
            $ext = pathinfo($file, PATHINFO_EXTENSION);

            if ($ext === 'css') {
                wp_enqueue_style('index-' . md5($file), $file_url, [], null);
            } elseif ($ext === 'js') {
                wp_enqueue_script('index-' . md5($file), $file_url, [], null, true);
            }
        }
    }
}
add_action( 'wp_enqueue_scripts', 'vue_app_enqueue_assets' );

// Add Vue app root element.
function vue_app_render_root_element() {
    echo '<div id="app" data-page="location-generator"></div>';
}

add_action( 'genesis_entry_content', 'vue_app_render_root_element' );

// Runs the Genesis loop.
genesis();
