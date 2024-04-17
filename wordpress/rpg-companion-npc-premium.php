<?php
/**
 * Genesis Custom RPG Companion Template.
 *
 * A template to force full-width layout, remove breadcrumbs, and remove the page title.
 *
 * Template Name: RPG Companion NPC Generator Premium
 *
 * @package Genesis Custom RPG Companion NPC Generator Premium
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
    $vue_app_path = get_stylesheet_directory() . '/rpg-companion-npc-premium/dist/assets';
    $vue_app_url = get_stylesheet_directory_uri() . '/rpg-companion-npc-premium/dist/assets';

    $files = scandir($vue_app_path);
    $enqueued_style_handle = '';

    foreach ($files as $file) {
        $file_path = $vue_app_path . '/' . $file; // Add the missing slash
        $file_url = $vue_app_url . '/' . $file; // Add the missing slash

        if (is_file($file_path)) {
            $ext = pathinfo($file, PATHINFO_EXTENSION);

            if ($ext === 'css') {
                $handle = 'index-' . md5($file);
                wp_enqueue_style($handle, $file_url, [], null);
                $enqueued_style_handle = $handle;
            } elseif ($ext === 'js') {
                wp_enqueue_script('index-' . md5($file), $file_url, [], null, true);
            }
        }
    }

    if ($enqueued_style_handle) {
        $custom_css = '
        main.content {
          max-width: 940px;
          width: auto;
      }
        .read-aloud {
            padding: 1rem 2.5rem;
            width: 90%;
            margin: 2rem auto;
        }
        select {
            padding: 1rem;
        }
        .read-aloud p {
            margin-bottom: 1rem;
          }
        ';
        wp_add_inline_style($enqueued_style_handle, $custom_css);
    }
}
add_action( 'wp_enqueue_scripts', 'vue_app_enqueue_assets' );

// Add Vue app root element.
function vue_app_render_root_element() {
    echo '<div id="app" data-page="npc-generator-premium"></div>';
}

//add_action( 'genesis_entry_content', 'vue_app_render_root_element' );

// Runs the Genesis loop.
genesis();
