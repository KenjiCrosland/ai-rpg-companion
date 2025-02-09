<?php
/**
 * Genesis Custom RPG Companion Template.
 *
 * A template to force full-width layout, remove breadcrumbs, and remove the page title.
 *
 * Template Name: RPG Companion New Dungeon Generator Premium
 *
 * @package Genesis Custom RPG Companion New Dungeon Generator Premium
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
remove_action( 'genesis_before_loop', 'genesis_do_breadcrumbs');

// Enqueue Vue app assets.
function vue_app_enqueue_assets() {
    $vue_app_path = get_stylesheet_directory() . '/rpg-companion-new-dungeon-generator-premium/dist/assets';
    $vue_app_url = get_stylesheet_directory_uri() . '/rpg-companion-new-dungeon-generator-premium/dist/assets';

    $files = scandir($vue_app_path);
    $enqueued_style_handle = '';

    foreach ($files as $file) {
        $file_path = $vue_app_path . '/' . $file; // Add the missing slash
        $file_url = $vue_app_url . '/' . $file; // Add the missing slash

        if (is_file($file_path)) {
            $ext = pathinfo($file, PATHINFO_EXTENSION);

            $version = '1.0.0';

            if ($ext === 'css') {
                $handle = 'index-' . md5($file);
                wp_enqueue_style($handle, $file_url, [], $version);
                $enqueued_style_handle = $handle;
            } elseif ($ext === 'js') {
                wp_enqueue_script('index-' . md5($file), $file_url, [], $version, true);
            }
        }
    }
    
    if ($enqueued_style_handle) {
        $custom_css = '
        main.content {
            max-width: 940px;
            width: auto;
        }
        .site-container .site-inner {
            max-width: none;
            padding: 0;
        }
        .entry-content ul {
            margin-bottom: 0;
        }
        button:focus, button:hover {
            background-color: #fff;
        }
        .statblock ul.abilities {
            margin: 0;
        }
        h1, h2 {
            padding-top: 2rem;
        }
        h3 {
            margin-top: 1rem;
            margin-bottom: 1rem;
        }
        h3.room-name {
            margin-top: 0;
            margin-bottom: 0;
        }
        select {
            padding: 1rem;
        }
        .read-aloud p {
            margin-bottom: 1rem;
        }
        .read-aloud {
            margin-bottom: 2rem;
        }
        .statblock th, .statblock td {
            padding: 0;
            text-align: center;
            border: none;
        }
        .monster-form select {
            padding-top: .9rem;
        }
        #detailed-rooms {
            margin-bottom: 0;
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
        button:focus, button:hover, input[type="button"]:focus, input[type="button"]:hover, input[type="reset"]:focus, input[type="reset"]:hover, input[type="submit"]:focus, input[type="submit"]:hover, .site-container div.wpforms-container-full .wpforms-form input[type="submit"]:focus, .site-container div.wpforms-container-full .wpforms-form input[type="submit"]:hover, .site-container div.wpforms-container-full .wpforms-form button[type="submit"]:focus, .site-container div.wpforms-container-full .wpforms-form button[type="submit"]:hover, .button:focus, .button:hover {
            color: inherit;
        }
        ';
        wp_add_inline_style($enqueued_style_handle, $custom_css);
    }
}
add_action( 'wp_enqueue_scripts', 'vue_app_enqueue_assets' );

//Add Vue app root element.
function vue_app_render_root_element() {
    echo '<div id="app" data-page="new-dungeon-generator-premium"></div>';
}

//add_action( 'genesis_entry_content', 'vue_app_render_root_element' );

// Runs the Genesis loop.
genesis();