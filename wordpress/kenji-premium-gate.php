<?php
/**
 * Plugin Name: Kenji Premium Gate
 * Description: Checks Patreon pledge status and passes premium flag to Vue apps.
 * Version: 1.0.1
 * Author: Kenji Crosland
 */

if ( ! defined( 'ABSPATH' ) ) exit;

// Guard against double-loading (Genesis can load files twice)
if ( defined( 'KENJI_PREMIUM_GATE_LOADED' ) ) return;
define( 'KENJI_PREMIUM_GATE_LOADED', true );

// Minimum pledge in cents to qualify as premium. $5 = 500.
if ( ! defined( 'KENJI_PREMIUM_MIN_CENTS' ) ) {
    define( 'KENJI_PREMIUM_MIN_CENTS', 500 );
}

function kenji_is_premium( $user_id = null ) {
    try {
        if ( ! $user_id ) {
            $user_id = get_current_user_id();
        }

        if ( ! $user_id ) {
            return false;
        }

        if ( user_can( $user_id, 'manage_options' ) ) {
            return true;
        }

        $patron_info = get_user_meta( $user_id, 'patreon_latest_patron_info', true );

        if ( empty( $patron_info ) ) {
            return false;
        }

        if ( is_string( $patron_info ) ) {
            $patron_info = @unserialize( $patron_info );
            if ( $patron_info === false ) {
                return false;
            }
        }

        if ( ! is_array( $patron_info ) || empty( $patron_info['included'] ) ) {
            return false;
        }

        foreach ( $patron_info['included'] as $item ) {
            if ( ! is_array( $item ) ) continue;
            if ( ( $item['type'] ?? '' ) !== 'pledge' ) continue;

            $attrs  = $item['attributes'] ?? [];
            $status = $attrs['patron_status'] ?? '';
            $cents  = intval( $attrs['currently_entitled_amount_cents'] ?? 0 );

            if ( $status === 'active_patron' && $cents >= KENJI_PREMIUM_MIN_CENTS ) {
                return true;
            }
        }

        return false;
    } catch ( \Throwable $e ) {
        return false;
    }
}

function kenji_tool_shortcode( $atts ) {
    $atts = shortcode_atts( [ 'page' => '' ], $atts );

    if ( empty( $atts['page'] ) ) {
        return '';
    }

    $premium = kenji_is_premium() ? 'true' : 'false';

    return sprintf(
        '<div id="app" data-page="%s" data-premium="%s"></div>',
        esc_attr( $atts['page'] ),
        $premium
    );
}
add_shortcode( 'kenji_tool', 'kenji_tool_shortcode' );

add_action( 'rest_api_init', function () {
    register_rest_route( 'kenji/v1', '/auth-status', [
        'methods'  => 'GET',
        'callback' => function () {
            $user_id = get_current_user_id();
            return new WP_REST_Response( [
                'logged_in' => $user_id > 0,
                'premium'   => kenji_is_premium( $user_id ),
            ], 200 );
        },
        'permission_callback' => '__return_true',
    ] );
} );