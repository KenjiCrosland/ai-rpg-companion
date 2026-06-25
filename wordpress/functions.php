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

// AI Provider configurations
function get_ai_provider_config($provider) {
    $configs = array(
        'deepseek-v3' => array(
            'url' => 'https://api.deepseek.com/v1/chat/completions',
            'api_key' => defined('DEEPSEEK_API_KEY') ? DEEPSEEK_API_KEY : '',
            'type' => 'openai-compatible',
        ),
        'claude-3.5-haiku' => array(
            'url' => 'https://api.anthropic.com/v1/messages',
            'api_key' => defined('CLAUDE_API_KEY') ? CLAUDE_API_KEY : '',
            'type' => 'claude',
        ),
        'gpt-4o-mini' => array(
            'url' => 'https://api.openai.com/v1/chat/completions',
            'api_key' => defined('OPENAI_API_KEY') ? OPENAI_API_KEY : '',
            'type' => 'openai',
        ),
    );

    return isset($configs[$provider]) ? $configs[$provider] : $configs['deepseek-v3'];
}

// The callback function for the custom REST route
function whisper_api_proxy( WP_REST_Request $request ) {
    // Get provider from custom header (default to DeepSeek)
    $provider = $request->get_header('X-AI-Provider');
    if (!$provider) {
        $provider = 'deepseek-v3';
    }

    $config = get_ai_provider_config($provider);

    if (empty($config['api_key'])) {
        return new WP_Error('api_key_missing', 'API key not configured for provider: ' . $provider, ['status' => 500]);
    }

    $request_data = $request->get_json_params();

    // Set headers based on provider type
    if ($config['type'] === 'claude') {
        $headers = array(
            'Content-Type' => 'application/json',
            'x-api-key' => $config['api_key'],
            'anthropic-version' => '2023-06-01',
        );
    } else {
        // OpenAI and OpenAI-compatible providers (DeepSeek)
        $headers = array(
            'Content-Type' => 'application/json',
            'Authorization' => 'Bearer ' . $config['api_key'],
        );
    }

    $response = wp_remote_post_with_retry($config['url'], [
        'headers' => $headers,
        'body' => json_encode($request_data),
        'timeout' => 180, // Timeout in seconds
    ]);

    if (is_wp_error($response)) {
        return new WP_Error('api_error', 'Error connecting to ' . $provider . ' API: ' . $response->get_error_message(), ['status' => 500]);
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

    // Google Fonts (Source Serif 4 + Inter + Material Icons + Material Symbols Outlined)
    // Source Serif 4 is the parchment design system's serif — every card title,
    // body paragraph, and heading in the app resolves to it (--par-font-serif).
    // In dev it loads via a <link> in App.vue, but App.vue doesn't run in prod
    // (tool pages mount through base.js), so without this enqueue the entire
    // parchment system silently falls back to Georgia on the live site.
    wp_enqueue_style( 'rpg-font-source-serif', 'https://fonts.googleapis.com/css2?family=Source+Serif+4:ital,wght@0,400;0,500;0,600;1,400;1,500;1,600&display=swap', [], null );
    wp_enqueue_style( 'rpg-font-inter', 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap', [], null );
    wp_enqueue_style( 'rpg-material-icons', 'https://fonts.googleapis.com/icon?family=Material+Icons', [], null );
    wp_enqueue_style( 'rpg-material-symbols', 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap', [], null );

    // Parchment style guards — re-assert parchment values the per-template
    // structural resets would clobber on app content. Higher specificity, so
    // load order vs the template's inline overrides doesn't matter.
    wp_register_style( 'rpg-app-guards', false );
    wp_enqueue_style( 'rpg-app-guards' );
    wp_add_inline_style( 'rpg-app-guards', rpg_companion_app_style_guards() );
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

/**
 * Shared parchment chrome — the SEO content section, FAQ accordion, and page
 * footer that wrap every RPG Companion tool page. These three blocks were
 * copy-pasted, byte-identical, into ~8 templates; they now live here once.
 *
 * Hard-coded parchment values (WordPress has no access to
 * src/parchment/tokens.css). Keep in sync with parchment.md:
 *   burgundy editorial ink  #7a1f1f      lapis action/link  #2A4D70 / #1F3A5C
 *   cream surface           #FBF7F0      warm-tan zone      #f3ebda
 *   tan borders             #e8e2d4 (light) / #c9b99a (strong) / #b8a685 (deep)
 *   body ink #444  ·  muted #6b6b6b  ·  serif: Source Serif 4 → Georgia fallback
 *
 * NOTE: these styles live OUTSIDE #app, so 1rem = the theme root (~16px), NOT
 * the app's 10px. Font sizes are px on purpose; spacing stays in rem.
 *
 * Per-tool structural overrides (Genesis resets, #app width, tool-specific
 * rules like the dungeon card-content max-width) stay in each template's own
 * inline block — only the shared chrome is centralized here.
 *
 * @return string CSS (no <style> wrapper — pass to wp_add_inline_style()).
 */
function rpg_companion_chrome_styles() {
    $serif = "'Source Serif 4', Georgia, 'Times New Roman', serif";

    return "
        /* ---- SEO content section ---- */
        .rpg-seo-section {
            display: flex;
            border-top: 1px solid #e8e2d4;
            margin-top: 4rem;
            background: #FBF7F0;
        }

        /* Sidebar spacer — mirrors the app's sidebar so the SEO copy lines up
           with the tool content above it. */
        .rpg-seo-spacer {
            width: 400px;
            flex-shrink: 0;
            background: #FBF7F0;
        }

        .rpg-seo-inner {
            flex: 1;
            max-width: 800px;
            margin: 0 auto;
            padding: 3rem 0 6rem;
        }

        @media (max-width: 1300px) {
            .rpg-seo-spacer { width: 320px; }
        }

        .rpg-seo-inner h2 {
            font-family: {$serif};
            font-size: 22px;
            font-weight: 600;
            color: #7a1f1f;
            margin: 0 0 0.75rem;
            padding: 0;
        }

        .rpg-seo-inner h3 {
            font-family: {$serif};
            font-size: 18px;
            font-weight: 600;
            color: #7a1f1f;
            margin: 2rem 0 0.5rem;
            padding: 0;
        }

        .rpg-seo-inner p {
            font-family: {$serif};
            font-size: 15px;
            color: #444;
            line-height: 1.7;
            margin: 0 0 0.75rem;
        }

        .rpg-seo-inner a {
            color: #2A4D70;
            text-decoration: none;
        }

        .rpg-seo-inner a:hover {
            text-decoration: underline;
        }

        /* ---- FAQ accordion ---- */
        .rpg-faq details {
            border-top: 1px solid #e8e2d4;
        }

        .rpg-faq details:last-child {
            border-bottom: 1px solid #e8e2d4;
        }

        .rpg-faq summary {
            font-family: {$serif};
            font-size: 16px;
            font-weight: 600;
            color: #7a1f1f;
            cursor: pointer;
            padding: 0.85rem 0;
            list-style: none;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .rpg-faq summary::-webkit-details-marker {
            display: none;
        }

        .rpg-faq summary::after {
            content: \"+\";
            color: #b8a685;
            font-size: 18px;
            font-weight: 400;
            flex-shrink: 0;
            margin-left: 1rem;
        }

        .rpg-faq details[open] summary::after {
            content: \"−\";
        }

        .rpg-faq details p {
            font-family: {$serif};
            font-size: 15px;
            color: #444;
            line-height: 1.65;
            padding: 0 0 0.85rem;
            margin: 0;
        }

        /* ---- Footer — warm-tan parchment colophon ---- */
        .site-footer {
            text-align: center;
            padding: 2.5rem 1rem;
            margin: 0;
            border-top: 1px solid #c9b99a;
            background: #f3ebda;
        }

        .rpg-footer-inner {
            max-width: 660px;
            margin: 0 auto;
        }

        .rpg-footer-title {
            font-family: {$serif};
            font-size: 17px;
            font-weight: 600;
            color: #7a1f1f;
            margin-bottom: 0.75rem;
        }

        .rpg-footer-links {
            margin-bottom: 1rem;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.6rem;
            font-family: {$serif};
            font-size: 15px;
        }

        .rpg-footer-links a {
            color: #2A4D70;
            text-decoration: none;
        }

        .rpg-footer-links a:hover {
            color: #1F3A5C;
            text-decoration: underline;
        }

        .rpg-footer-links span {
            color: #b8a685;
        }

        /* .rpg-footer-ogl (most tools) and .rpg-footer-attribution
           (chase tracker — icon credits + OGL) share one treatment. */
        .rpg-footer-ogl,
        .rpg-footer-attribution {
            font-family: {$serif};
            font-size: 13px;
            color: #6b6b6b;
            line-height: 1.55;
        }

        .rpg-footer-ogl a,
        .rpg-footer-attribution a {
            color: #2A4D70;
            text-decoration: none;
        }

        .rpg-footer-ogl a:hover,
        .rpg-footer-attribution a:hover {
            color: #1F3A5C;
            text-decoration: underline;
        }

        /* ---- Responsive: sidebar collapses at 768px ---- */
        @media (max-width: 768px) {
            .rpg-seo-spacer { display: none; }
            .rpg-seo-inner { padding: 1.5rem 1rem 4rem; }
            .site-footer { margin-bottom: 60px; }
        }
    ";
}

/**
 * Parchment style guards — re-assert parchment-design values that the
 * per-template structural overrides (Genesis-theme resets) would otherwise
 * clobber on app content. These DUPLICATE the parchment intent with just
 * enough extra specificity to win; they never replace or weaken the
 * structural resets (those are load-bearing against the Genesis theme,
 * which targets `li` directly — hence the templates' `ul > li` form).
 *
 * The heading guard `.entry-content h1, .entry-content h2` = (0,1,1):
 * beats the bare `h1, h2 { padding-top: 2rem }` leak (0,0,1) but LOSES to
 * any component heading class (0,2,0), so it can never override a component
 * that intentionally sets padding on a heading. Every parchment heading
 * (page-heading__title, form-heading, the card names, …) is margin-spaced
 * and sets no top padding, so in prod the bare rule was pushing all of them
 * down 2rem relative to the design; this restores parity with dev.
 *
 * Note: the `ul > li { list-style: none }` reset needs NO guard. Every app
 * list either sets `list-style: none` itself (agreeing with the reset) or
 * sets its bullets on the `<li>` directly (DashboardPlus `.relationship`,
 * which already wins). The one list that sets `disc` on the `<ul>`
 * (DataManagerModal `.summary-list`) lives inside a ParModal `<Teleport
 * to="body">`, so it renders outside `.entry-content` and the reset never
 * reaches it. No `ul` incongruity exists.
 *
 * Enqueued from rpg_companion_enqueue_entry() so it covers EVERY tool page
 * (chrome or not). Higher specificity wins regardless of load order.
 *
 * @return string CSS (no <style> wrapper — pass to wp_add_inline_style()).
 */
function rpg_companion_app_style_guards() {
    return "
        /* Parchment 'desk' — App.vue sets this on <body> in dev, but App.vue
           doesn't run in prod (tool pages mount via base.js), so the theme's
           white shows behind the cream cards. The cream editorial surfaces are
           designed to lift off this cool desk via warm-on-cool contrast. This
           inline style only loads on tool pages, so the rest of the site is
           untouched; the SEO section (cream) and footer (tan) sit outside
           .entry-content and keep their own backgrounds. */
        body,
        .site-inner,
        .content,
        .entry,
        .entry-content {
            background-color: #EAEEF2;
        }

        /* Parchment content headings are ALWAYS serif (sans is reserved for
           compact chrome, never headings). Many heading classes set color +
           size but rely on inheriting the serif — which the Genesis theme's
           `h1-h6 { font-family: <sans> }` overrides directly on the element,
           so those headings (item/setting/dungeon card names, etc.) render
           sans while body text stays serif. Force the serif on every app
           heading. `#app` specificity beats the theme decisively, and since
           no app heading is ever sans this can't harm a component. */
        #app h1, #app h2, #app h3, #app h4, #app h5, #app h6 {
            font-family: 'Source Serif 4', Georgia, 'Times New Roman', serif;
        }

        /* Parchment headings are margin-spaced and set no top padding;
           neutralize the structural `h1, h2 { padding-top: 2rem }` leak. */
        .entry-content h1,
        .entry-content h2 {
            padding-top: 0;
        }

        /* The page's (otherwise empty) post content renders as a leading
           empty Gutenberg paragraph; the block theme's block-gap then adds
           ~30px above the tool. An empty paragraph is never meaningful
           content, so collapse it. */
        .entry-content p.wp-block-paragraph:empty {
            display: none;
        }
    ";
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
    $premium = function_exists( 'kenji_is_premium' ) && kenji_is_premium() ? 'true' : 'false';
    return '<div id="app" data-page="item-generator" data-premium="' . $premium . '"></div>';
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
    $premium = function_exists( 'kenji_is_premium' ) && kenji_is_premium() ? 'true' : 'false';
    return '<div id="app" data-page="statblock-generator" data-premium="' . $premium . '"></div>';
}
add_shortcode( 'vue_app_statblock_generator', 'vue_app_statblock_generator_shortcode' );

function vue_app_statblock_generator_premium_shortcode() {
	return '<div id="app" data-page="statblock-generator-premium" data-premium="true"></div>';
}
add_shortcode( 'vue_app_statblock_generator_premium', 'vue_app_statblock_generator_premium_shortcode' );

function vue_app_npc_generator_shortcode() {
    $premium = function_exists( 'kenji_is_premium' ) && kenji_is_premium() ? 'true' : 'false';
    return '<div id="app" data-page="npc-generator" data-premium="' . $premium . '"></div>';
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
