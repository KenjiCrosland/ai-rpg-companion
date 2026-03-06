<?php
/**
 * Genesis Sample.
 *
 * This file adds functions to the Genesis Sample Theme.
 *
 * @package Genesis Sample
 * @author  StudioPress
 * @license GPL-2.0-or-later
 * @link    https://www.studiopress.com/
 */

ini_set('max_execution_time', 300); // Set the maximum execution time to 5 minutes (300 seconds)

// -----------------------------------------------------------------------------
// ✅ SECURITY/LICENSING OPTIMIZATIONS (ADDED)
// -----------------------------------------------------------------------------

/**
 * Send a Content-Security-Policy that blocks third-party fonts by default,
 * but allows Google Fonts delivery for Inter (fonts.gstatic.com) and self-hosted fonts.
 *
 * If you self-host Inter, you can simplify to:
 *   header("Content-Security-Policy: font-src 'self' data:;");
 */
add_action('send_headers', function () {
    // Note: only a font-src directive is set to avoid breaking other resources.
    header("Content-Security-Policy: font-src 'self' https://fonts.gstatic.com data:;");
});

/**
 * Dequeue the theme's font stylesheet if present.
 * This prevents styles that might import proprietary fonts via @import.
 */
add_action('wp_enqueue_scripts', function () {
    $handle = genesis_get_theme_handle() . '-fonts';
    // Remove the Genesis theme font stylesheet (if any).
    wp_dequeue_style($handle);
    wp_deregister_style($handle);
}, 100);

/**
 * Strip any <link rel="stylesheet"> tags that point to REI font assets.
 * Belt-and-suspenders in case a plugin/theme adds them directly.
 */
add_filter('style_loader_tag', function ($html, $handle, $href) {
    if (
        strpos($href, 'rei.com/satchel/media/font-optimized/Graphik') !== false ||
        strpos($href, 'rei.com/satchel/media/font-optimized/Stuart') !== false
    ) {
        return ''; // drop the tag entirely
    }
    return $html;
}, 10, 3);

/**
 * Remove preconnect/preload hints to REI font hosts to avoid wasted handshakes.
 */
add_filter('wp_resource_hints', function ($urls, $relation) {
    if ($relation === 'preconnect' || $relation === 'preload') {
        $urls = array_values(array_filter($urls, function ($u) {
            return strpos($u, 'rei.com') === false;
        }));
    }
    return $urls;
}, 10, 2);

// -----------------------------------------------------------------------------
// (END) SECURITY/LICENSING OPTIMIZATIONS
// -----------------------------------------------------------------------------

// Starts the engine.
require_once get_template_directory() . '/lib/init.php';

// Sets up the Theme.
require_once get_stylesheet_directory() . '/lib/theme-defaults.php';

add_action( 'after_setup_theme', 'genesis_sample_localization_setup' );
/**
 * Sets localization (do not remove).
 *
 * @since 1.0.0
 */
function genesis_sample_localization_setup() {

	load_child_theme_textdomain( genesis_get_theme_handle(), get_stylesheet_directory() . '/languages' );

}

// Adds helper functions.
require_once get_stylesheet_directory() . '/lib/helper-functions.php';

// Adds image upload and color select to Customizer.
require_once get_stylesheet_directory() . '/lib/customize.php';

// Includes Customizer CSS.
require_once get_stylesheet_directory() . '/lib/output.php';

// Adds WooCommerce support.
require_once get_stylesheet_directory() . '/lib/woocommerce/woocommerce-setup.php';

// Adds the required WooCommerce styles and Customizer CSS.
require_once get_stylesheet_directory() . '/lib/woocommerce/woocommerce-output.php';

// Adds the Genesis Connect WooCommerce notice.
require_once get_stylesheet_directory() . '/lib/woocommerce/woocommerce-notice.php';

add_action( 'after_setup_theme', 'genesis_child_gutenberg_support' );
/**
 * Adds Gutenberg opt-in features and styling.
 *
 * @since 2.7.0
 */
function genesis_child_gutenberg_support() { // phpcs:ignore WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedFunctionFound -- using same in all child themes to allow action to be unhooked.
	require_once get_stylesheet_directory() . '/lib/gutenberg/init.php';
}

// Registers the responsive menus.
if ( function_exists( 'genesis_register_responsive_menus' ) ) {
	genesis_register_responsive_menus( genesis_get_config( 'responsive-menus' ) );
}

add_action( 'wp_enqueue_scripts', 'genesis_sample_enqueue_scripts_styles' );
/**
 * Enqueues scripts and styles.
 *
 * @since 1.0.0
 */
function genesis_sample_enqueue_scripts_styles() {

	$appearance = genesis_get_config( 'appearance' );

	// NOTE: This originally enqueued the theme's fonts stylesheet. We now dequeue it above.
	wp_enqueue_style(
		genesis_get_theme_handle() . '-fonts',
		$appearance['fonts-url'],
		array(),
		genesis_get_theme_version()
	);

	wp_enqueue_style( 'dashicons' );

	if ( genesis_is_amp() ) {
		wp_enqueue_style(
			genesis_get_theme_handle() . '-amp',
			get_stylesheet_directory_uri() . '/lib/amp/amp.css',
			array( genesis_get_theme_handle() ),
			genesis_get_theme_version()
		);
	}

}

add_action( 'after_setup_theme', 'genesis_sample_theme_support', 9 );
/**
 * Add desired theme supports.
 *
 * See config file at `config/theme-supports.php`.
 *
 * @since 3.0.0
 */
function genesis_sample_theme_support() {

	$theme_supports = genesis_get_config( 'theme-supports' );

	foreach ( $theme_supports as $feature => $args ) {
		add_theme_support( $feature, $args );
	}

}

add_filter( 'genesis_seo_title', 'genesis_sample_header_title', 10, 3 );
/**
 * Removes the link from the hidden site title if a custom logo is in use.
 *
 * Without this filter, the site title is hidden with CSS when a custom logo
 * is in use, but the link it contains is still accessible by keyboard.
 *
 * @since 1.2.0
 *
 * @param string $title  The full title.
 * @param string $inside The content inside the title element.
 * @param string $wrap   The wrapping element name, such as h1.
 * @return string The site title with anchor removed if a custom logo is active.
 */
function genesis_sample_header_title( $title, $inside, $wrap ) {

	if ( has_custom_logo() ) {
		$inside = get_bloginfo( 'name' );
	}

	return sprintf( '<%1$s class="site-title">%2$s</%1$s>', $wrap, $inside );

}

// Adds image sizes.
add_image_size( 'sidebar-featured', 75, 75, true );

// Removes header right widget area.
unregister_sidebar( 'header-right' );

// Removes secondary sidebar.
unregister_sidebar( 'sidebar-alt' );

// Removes site layouts.
genesis_unregister_layout( 'content-sidebar-sidebar' );
genesis_unregister_layout( 'sidebar-content-sidebar' );
genesis_unregister_layout( 'sidebar-sidebar-content' );

add_filter( 'genesis_customizer_theme_settings_config', 'genesis_sample_remove_customizer_settings' );
/**
 * Removes output of header and front page breadcrumb settings in the Customizer.
 *
 * @since 2.6.0
 *
 * @param array $config Original Customizer items.
 * @return array Filtered Customizer items.
 */
function genesis_sample_remove_customizer_settings( $config ) {

	unset( $config['genesis']['sections']['genesis_header'] );
	unset( $config['genesis']['sections']['genesis_breadcrumbs']['controls']['breadcrumb_front_page'] );
	return $config;

}

// Displays custom logo.
add_action( 'genesis_site_title', 'the_custom_logo', 0 );

// Repositions primary navigation menu.
remove_action( 'genesis_after_header', 'genesis_do_nav' );
add_action( 'genesis_header', 'genesis_do_nav', 12 );

// Repositions the secondary navigation menu.
remove_action( 'genesis_after_header', 'genesis_do_subnav' );
add_action( 'genesis_footer', 'genesis_do_subnav', 10 );

add_filter( 'wp_nav_menu_args', 'genesis_sample_secondary_menu_args' );
/**
 * Reduces secondary navigation menu to one level depth.
 *
 * @since 2.2.3
 *
 * @param array $args Original menu options.
 * @return array Menu options with depth set to 1.
 */
function genesis_sample_secondary_menu_args( $args ) {

	if ( 'secondary' !== $args['theme_location'] ) {
		return $args;
	}

	$args['depth'] = 1;
	return $args;

}

add_filter( 'genesis_author_box_gravatar_size', 'genesis_sample_author_box_gravatar' );
/**
 * Modifies size of the Gravatar in the author box.
 *
 * @since 2.2.3
 *
 * @param int $size Original icon size.
 * @return int Modified icon size.
 */
function genesis_sample_author_box_gravatar( $size ) {

	return 90;

}

add_filter( 'genesis_comment_list_args', 'genesis_sample_comments_gravatar' );
/**
 * Modifies size of the Gravatar in the entry comments.
 *
 * @since 2.2.3
 *
 * @param array $args Gravatar settings.
 * @return array Gravatar settings with modified size.
 */
function genesis_sample_comments_gravatar( $args ) {

	$args['avatar_size'] = 60;
	return $args;

}

// Register custom REST route
add_action('rest_api_init', function () {
    register_rest_route('open-ai-proxy/api/v1', '/proxy', [
        'methods' => 'POST',
        'callback' => 'whisper_api_proxy',
        'permission_callback' => '__return_true',
    ]);
});

// The callback function for the custom REST route
function whisper_api_proxy( WP_REST_Request $request ) {
    $url = 'https://api.openai.com/v1/chat/completions';

    $request_data = $request->get_json_params();

    $headers = array(
        'Content-Type' => 'application/json',
        'Authorization' => 'Bearer ' . OPENAI_API_KEY,
    );

    $response = wp_remote_post_with_retry($url, [
        'headers' => $headers,
        'body' => json_encode($request_data),
        'timeout' => 180, // Timeout in seconds
    ]);

    if (is_wp_error($response)) {
        return new WP_Error('openai_error', 'Error connecting to the OpenAI API', ['status' => 500]);
    }

    $response_code = wp_remote_retrieve_response_code($response);
    $response_body = wp_remote_retrieve_body($response);

    return new WP_REST_Response(json_decode($response_body, true), $response_code);
}

// Retry mechanism with exponential backoff
function wp_remote_post_with_retry($url, $args, $max_retries = 3, $retry_interval = 1000) {
    $retry_count = 0;

    while ($retry_count < $max_retries) {
        $response = wp_remote_post($url, $args);

        if (!is_wp_error($response)) {
            return $response;
        }

        $retry_count++;
        usleep($retry_interval * 1000); // Sleep for the specified interval in milliseconds
        $retry_interval *= 2; // Exponential backoff
    }

    return $response; // Return the last failed response after all retries
}

// -----------------------------------------------------------------------------
// RPG Companion — Vite manifest asset loader
// -----------------------------------------------------------------------------

/**
 * Enqueue JS + CSS for a single Vite entry (and all its shared chunks)
 * by reading dist/.vite/manifest.json.
 *
 * Deploy the entire dist/ folder to:
 *   {theme}/rpg-companion/dist/
 *
 * @param string $entry_key  Key matching a name in vite.config.js rollupOptions.input
 *                           (e.g. 'statblock', 'npc', 'dungeon-premium').
 */
function rpg_companion_enqueue_entry( $entry_key ) {
    static $manifest = null;
    static $enqueued = [];

    if ( $manifest === null ) {
        $path = get_stylesheet_directory() . '/rpg-companion/dist/manifest.json';
        if ( ! file_exists( $path ) ) {
            return;
        }
        $manifest = json_decode( file_get_contents( $path ), true );
    }

    $entry_file = "src/entries/{$entry_key}.js";
    if ( ! isset( $manifest[ $entry_file ] ) ) {
        return;
    }

    $dist_url = get_stylesheet_directory_uri() . '/rpg-companion/dist';
    rpg_companion_enqueue_chunk( $manifest, $manifest[ $entry_file ], $dist_url, $enqueued );

    // Google Fonts (Inter + Material Icons + Material Symbols Outlined)
    wp_enqueue_style( 'rpg-font-inter', 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap', [], null );
    wp_enqueue_style( 'rpg-material-icons', 'https://fonts.googleapis.com/icon?family=Material+Icons', [], null );
    wp_enqueue_style( 'rpg-material-symbols', 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap', [], null );
}

/**
 * Recursively enqueue a Vite chunk and all its imports/CSS.
 *
 * @param array  $manifest  Full parsed manifest.json.
 * @param array  $chunk     The specific chunk entry from the manifest.
 * @param string $dist_url  Absolute URL to the dist folder.
 * @param array  &$enqueued Files already enqueued (dedup guard).
 */
function rpg_companion_enqueue_chunk( $manifest, $chunk, $dist_url, &$enqueued ) {
    $file = $chunk['file'];

    if ( in_array( $file, $enqueued, true ) ) {
        return;
    }
    $enqueued[] = $file;

    wp_enqueue_script( 'rpg-' . md5( $file ), $dist_url . '/' . $file, [], null, true );

    foreach ( $chunk['css'] ?? [] as $css_file ) {
        wp_enqueue_style( 'rpg-' . md5( $css_file ), $dist_url . '/' . $css_file, [], null );
    }

    foreach ( $chunk['imports'] ?? [] as $import_key ) {
        if ( isset( $manifest[ $import_key ] ) ) {
            rpg_companion_enqueue_chunk( $manifest, $manifest[ $import_key ], $dist_url, $enqueued );
        }
    }
}

// Make all RPG companion scripts load as ES modules.
add_filter( 'script_loader_tag', function ( $tag, $handle, $src ) {
    if ( strpos( $handle, 'rpg-' ) === 0 ) {
        return '<script type="module" src="' . esc_url( $src ) . '"></script>' . "\n";
    }
    return $tag;
}, 10, 3 );

// -----------------------------------------------------------------------------
// (END) RPG Companion asset loader
// -----------------------------------------------------------------------------

function vue_app_setting_generator_shortcode() {
    $premium = function_exists( 'kenji_is_premium' ) && kenji_is_premium() ? 'true' : 'false';
    return '<div id="app" data-page="setting-generator" data-premium="' . $premium . '"></div>';
}
add_shortcode( 'vue_app_setting_generator', 'vue_app_setting_generator_shortcode' );

function vue_app_setting_generator_premium_shortcode() {
	return '<div id="app" data-page="setting-generator-premium" data-premium="true"></div>';
}
add_shortcode( 'vue_app_setting_generator_premium', 'vue_app_setting_generator_premium_shortcode' );

function vue_app_encounter_generator_shortcode() {
    $premium = function_exists( 'kenji_is_premium' ) && kenji_is_premium() ? 'true' : 'false';
    return '<div id="app" data-page="encounter-generator" data-premium="' . $premium . '"></div>';
}
add_shortcode( 'vue_app_encounter-generator', 'vue_app_encounter_generator_shortcode' );

function vue_app_encounter_generator_premium_shortcode() {
	return '<div id="app" data-page="encounter-generator-premium" data-premium="true"></div>';
}
add_shortcode( 'vue_app_encounter-generator_premium', 'vue_app_encounter_generator_premium_shortcode' );

function vue_app_item_generator_shortcode() {
	return '<div id="app" data-page="item-generator"></div>';
}
add_shortcode( 'vue_app_item_generator', 'vue_app_item_generator_shortcode' );

function vue_app_item_generator_premium_shortcode() {
	return '<div id="app" data-page="item-generator-premium" data-premium="true"></div>';
}
add_shortcode( 'vue_app_item_generator_premium', 'vue_app_item_generator_premium_shortcode' );

function vue_app_dungeon_generator_shortcode() {
    $premium = function_exists( 'kenji_is_premium' ) && kenji_is_premium() ? 'true' : 'false';
    return '<div id="app" data-page="dungeon-generator" data-premium="' . $premium . '"></div>';
}
add_shortcode( 'vue_app_dungeon_generator', 'vue_app_dungeon_generator_shortcode' );

function vue_app_dungeon_generator_premium_shortcode() {
	return '<div id="app" data-page="dungeon-generator-premium" data-premium="true"></div>';
}
add_shortcode( 'vue_app_dungeon_generator_premium', 'vue_app_dungeon_generator_premium_shortcode' );

function vue_app_lore_generator_shortcode() {
    return '<div id="app" data-page="lore-generator"></div>';
}
add_shortcode( 'vue_app_lore_generator', 'vue_app_lore_generator_shortcode' );

function vue_app_book_generator_shortcode() {
    return '<div id="app" data-page="book-generator"></div>';
}
add_shortcode( 'vue_app_book_generator', 'vue_app_book_generator_shortcode' );

function vue_app_gm_dashboard_shortcode() {
    return '<div id="app" data-page="gm-dashboard"></div>';
}
add_shortcode( 'vue_app_gm_dashboard', 'vue_app_gm_dashboard_shortcode' );

function vue_app_gm_dashboard_plus_shortcode() {
    return '<div id="app" data-page="gm-dashboard-plus"></div>';
}
add_shortcode( 'vue_app_gm_dashboard_plus', 'vue_app_gm_dashboard_plus_shortcode' );

function vue_app_statblock_generator_shortcode() {
    return '<div id="app" data-page="statblock-generator"></div>';
}
add_shortcode( 'vue_app_statblock_generator', 'vue_app_statblock_generator_shortcode' );

function vue_app_statblock_generator_premium_shortcode() {
	return '<div id="app" data-page="statblock-generator-premium" data-premium="true"></div>';
}
add_shortcode( 'vue_app_statblock_generator_premium', 'vue_app_statblock_generator_premium_shortcode' );

function vue_app_npc_generator_shortcode() {
    return '<div id="app" data-page="npc-generator"></div>';
}
add_shortcode( 'vue_app_npc_generator', 'vue_app_npc_generator_shortcode' );

function vue_app_npc_generator_premium_shortcode() {
	return '<div id="app" data-page="npc-generator-premium" data-premium="true"></div>';
}
add_shortcode( 'vue_app_npc_generator_premium', 'vue_app_npc_generator_premium_shortcode' );

function vue_app_test_content_shortcode() {
	return '<div id="app" data-page="statblock-generator"></div>';
}
add_shortcode( 'vue_app_test_content', 'vue_app_test_content_shortcode' );

function vue_app_landing_page_shortcode() {
    return '<div id="app" data-page="category-landing"></div>';
}
add_shortcode( 'vue_app_landing_page', 'vue_app_landing_page_shortcode' );
