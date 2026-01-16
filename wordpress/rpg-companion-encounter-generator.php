<?php
/**
 * Genesis Custom RPG Companion Template.
 *
 * Template Name: RPG Companion Encounter Generator
 *
 * Forces full-width layout, removes Genesis chrome, enqueues Vue assets,
 * and renders the Vue root mount.
 *
 * @package Genesis Custom RPG Companion Encounter Generator
 * @license GPL-2.0-or-later
 */

// ----------------------------------------------------------------------------
// ✅ Remove Genesis chrome (match Item Generator behavior)
// ----------------------------------------------------------------------------

// Remove header entirely
remove_action( 'genesis_header', 'genesis_header_markup_open', 5 );
remove_action( 'genesis_header', 'genesis_do_header' );
remove_action( 'genesis_header', 'genesis_header_markup_close', 15 );

// Remove entry header/title
remove_action( 'genesis_entry_header', 'genesis_entry_header_markup_open', 5 );
remove_action( 'genesis_entry_header', 'genesis_entry_header_markup_close', 15 );
remove_action( 'genesis_entry_header', 'genesis_do_post_title' );

// Remove navigation menus
remove_theme_support( 'genesis-menus' );

// Remove breadcrumbs
remove_action( 'genesis_before_loop', 'genesis_do_breadcrumbs' );

// Remove footer widgets
remove_theme_support( 'genesis-footer-widgets' );

// Remove footer entirely
remove_action( 'genesis_footer', 'genesis_footer_markup_open', 5 );
remove_action( 'genesis_footer', 'genesis_do_footer' );
remove_action( 'genesis_footer', 'genesis_footer_markup_close', 15 );

// Force full-width content layout
add_filter( 'genesis_site_layout', '__genesis_return_full_width_content' );

// ----------------------------------------------------------------------------
// ✅ Enqueue Vue assets (Vite build output)
// ----------------------------------------------------------------------------

if ( ! function_exists( 'rpg_companion_encounter_enqueue_assets' ) ) {
	function rpg_companion_encounter_enqueue_assets() {
		$vue_app_path = get_stylesheet_directory() . '/rpg-companion-encounter-generator/dist/assets';
		$vue_app_url  = get_stylesheet_directory_uri() . '/rpg-companion-encounter-generator/dist/assets';

		if ( ! is_dir( $vue_app_path ) ) {
			return;
		}

		$files = scandir( $vue_app_path );
		$enqueued_style_handle = '';

		foreach ( $files as $file ) {
			if ( $file === '.' || $file === '..' ) {
				continue;
			}

			$file_path = $vue_app_path . '/' . $file;
			$file_url  = $vue_app_url . '/' . $file;

			if ( ! is_file( $file_path ) ) {
				continue;
			}

			$ext = pathinfo( $file, PATHINFO_EXTENSION );

			// Cache-bust using file modified time
			$version = filemtime( $file_path );

			if ( $ext === 'css' ) {
				$handle = 'encounter-' . md5( $file );
				wp_enqueue_style( $handle, $file_url, [], $version );
				$enqueued_style_handle = $handle;
			}

			if ( $ext === 'js' ) {
				wp_enqueue_script( 'encounter-' . md5( $file ), $file_url, [], $version, true );
			}
		}

		// Inline overrides (match Item Generator standard)
		if ( $enqueued_style_handle ) {
			$custom_css = '
			/* --- Layout normalization --- */
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

			/* --- Typography spacing --- */
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

			p {
				margin: 1rem 0;
			}

			select {
				padding: 1rem;
			}

			/* --- Read aloud block spacing --- */
			.read-aloud p {
				margin-bottom: 1rem;
			}

			.read-aloud {
				margin-bottom: 2rem;
			}

			/* --- Genesis list resets (prevents double bullets / weird indents) --- */
			.entry-content ul {
				padding-left: 0;
			}

			.entry-content ul > li,
			.entry-content ul ul > li {
				list-style-type: none;
			}

			/* --- Statblock special case --- */
			.statblock ul.abilities {
				margin-left: 0;
				padding-left: 0;
			}

			/* --- Avoid Genesis button hover overriding Cedar colors --- */
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
			';

			wp_add_inline_style( $enqueued_style_handle, $custom_css );
		}
	}
}

add_action( 'wp_enqueue_scripts', 'rpg_companion_encounter_enqueue_assets' );

// ----------------------------------------------------------------------------
// ✅ Render Vue root mount element
// ----------------------------------------------------------------------------

if ( ! function_exists( 'rpg_companion_encounter_render_root_element' ) ) {
	function rpg_companion_encounter_render_root_element() {
		echo '<div id="app" data-page="encounter-generator"></div>';
	}
}

add_action( 'genesis_entry_content', 'rpg_companion_encounter_render_root_element' );

// ----------------------------------------------------------------------------
// ✅ Run Genesis
// ----------------------------------------------------------------------------

genesis();
