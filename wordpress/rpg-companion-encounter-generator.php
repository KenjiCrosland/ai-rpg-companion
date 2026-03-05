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

// Enqueue Vue app assets.
function rpg_companion_encounter_enqueue_assets() {
    rpg_companion_enqueue_entry( 'encounter' );

    wp_register_style( 'rpg-companion-overrides', false );
    wp_enqueue_style( 'rpg-companion-overrides' );
    wp_add_inline_style( 'rpg-companion-overrides', '
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

			/* --- Patreon Button Overrides --- */
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
			.patreon-universal-button .patreon_logo {
				width: 20px;
				height: 20px;
			}
			' );
}
add_action( 'wp_enqueue_scripts', 'rpg_companion_encounter_enqueue_assets' );

// ----------------------------------------------------------------------------
// ✅ Run Genesis
// ----------------------------------------------------------------------------

genesis();
