<?php
/**
 * Genesis Custom RPG Companion Template.
 *
 * Template Name: RPG Companion Visual Backpack
 *
 * Free, no-AI drag-and-drop visual inventory for D&D 5e. Forces full-width
 * layout, removes Genesis chrome, enqueues Vue assets, renders the Vue root
 * mount, and appends a server-rendered SEO section + branded footer below the
 * app (matching the cros.land tool-suite pattern).
 *
 * @package Genesis Custom RPG Companion Visual Backpack
 * @author  Kenji Crosland
 * @license GPL-2.0-or-later
 * @link    https://cros.land/
 */

// ----------------------------------------------------------------------------
// Remove Genesis chrome
// ----------------------------------------------------------------------------

remove_action( 'genesis_header', 'genesis_header_markup_open', 5 );
remove_action( 'genesis_header', 'genesis_do_header' );
remove_action( 'genesis_header', 'genesis_header_markup_close', 15 );
remove_action( 'genesis_entry_header', 'genesis_entry_header_markup_open', 5 );
remove_action( 'genesis_entry_header', 'genesis_entry_header_markup_close', 15 );
remove_action( 'genesis_entry_header', 'genesis_do_post_title' );
remove_theme_support( 'genesis-menus' );
remove_action( 'genesis_before_loop', 'genesis_do_breadcrumbs' );
remove_theme_support( 'genesis-footer-widgets' );
remove_action( 'genesis_footer', 'genesis_do_footer' );

add_filter( 'genesis_site_layout', '__genesis_return_full_width_content' );

// ----------------------------------------------------------------------------
// SEO: title + meta description
// ----------------------------------------------------------------------------

add_filter( 'pre_get_document_title', 'rpg_backpack_title', 99 );
function rpg_backpack_title( $title ) {
    if ( is_page_template( 'rpg-companion-backpack.php' ) ) {
        return 'D&D 5e Visual Backpack — Drag-and-Drop Inventory & Encumbrance Tracker | cros.land';
    }
    return $title;
}

add_action( 'wp_head', 'rpg_backpack_meta_description', 1 );
function rpg_backpack_meta_description() {
    if ( ! is_page_template( 'rpg-companion-backpack.php' ) ) return;
    echo '<meta name="description" content="Free D&amp;D 5e visual backpack: drag SRD gear into a video-game-style inventory grid, track carrying capacity and encumbrance live, add custom items, and print a clean gear list." />' . "\n";
}

// ----------------------------------------------------------------------------
// Enqueue Vue app assets
// ----------------------------------------------------------------------------

function rpg_companion_backpack_enqueue_assets() {
    rpg_companion_enqueue_entry( 'backpack' );

    wp_register_style( 'rpg-companion-overrides', false );
    wp_enqueue_style( 'rpg-companion-overrides' );
    wp_add_inline_style( 'rpg-companion-overrides', '
        main.content {
            max-width: 1100px;
            width: auto;
        }
        .site-container .site-inner {
            max-width: none;
            padding: 0;
        }
        .site-inner,
        .content-sidebar-wrap,
        .content,
        .entry,
        .entry-content {
            margin-bottom: 0 !important;
            padding-bottom: 0 !important;
        }
        .site-container {
            margin-bottom: 0;
            padding-bottom: 0;
        }
        .site-footer {
            margin-top: 0 !important;
        }
        #genesis-content,
        #app {
            max-width: 100%;
            width: 100%;
        }
        .entry-content {
            min-height: 60vh;
        }
        button, input[type="button"], input[type="reset"], input[type="submit"], .button {
            color: inherit;
        }
        button:focus, button:hover,
        input[type="button"]:focus, input[type="button"]:hover,
        input[type="reset"]:focus, input[type="reset"]:hover,
        input[type="submit"]:focus, input[type="submit"]:hover,
        .button:focus, .button:hover {
            color: inherit;
        }
        ' );

    wp_add_inline_style( 'rpg-companion-overrides', rpg_companion_chrome_styles() );

    // ------------------------------------------------------------------------
    // Form-control hardening for WordPress/Genesis.
    //
    // Genesis styles bare <button> and <input> (min-width, padding, min-height,
    // background, borders, colors) strongly enough to clobber the app's scoped
    // component CSS: steppers balloon or lose their −/+ glyphs, number values
    // vanish, and round icon buttons stretch into ovals. We re-assert each
    // control's parchment look scoped to #app — an id selector out-specifies
    // theme element/class rules on its own, so no !important is needed (if a
    // theme rule turns out to use !important on some property, add it to that one
    // property only — last resort, not by default).
    //
    // Values mirror the components (1rem = 10px in the parchment scale). Keep in
    // sync if a control is restyled:
    //   .stepper*          CoinPurse.vue
    //   .qty*              ItemDetail.vue
    //   .str__*            StrengthControl.vue
    //   .mobile-bar__str*  VisualBackpack.vue
    //   .ls__step / .ls__shares-n   LootSplit.vue (the loot-split modal)
    // ------------------------------------------------------------------------
    wp_add_inline_style( 'rpg-companion-overrides', '
        /* Shared reset — neutralize the theme geometry so each stepper button
           keeps its own width/height and centers its glyph instead of padding
           it out of view. */
        #app .stepper__btn,
        #app .qty__btn,
        #app .str__step,
        #app .mobile-bar__str-btn,
        #app .row-use__btn {
            min-width: 0;
            margin: 0;
            padding: 0;
            box-shadow: none;
            line-height: 1;
            letter-spacing: normal;
            text-transform: none;
            text-shadow: none;
            -webkit-appearance: none;
            appearance: none;
        }
        #app .stepper__input,
        #app .str__input {
            min-height: 0;
            height: auto;
            margin: 0;
            box-shadow: none;
            line-height: normal;
            -moz-appearance: textfield;
            -webkit-appearance: none;
            appearance: none;
        }
        #app .stepper__input::-webkit-outer-spin-button,
        #app .stepper__input::-webkit-inner-spin-button,
        #app .str__input::-webkit-outer-spin-button,
        #app .str__input::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
        }

        /* Coin purse (.stepper) */
        #app .stepper {
            display: flex;
            align-items: stretch;
            width: 100%;
            overflow: hidden;
            border: 0.5px solid #c9b99a;
            border-radius: 4px;
            background: #fbf7f0;
        }
        #app .stepper__btn {
            flex: none;
            width: 2.8rem;
            min-height: 4rem;
            border: none;
            border-radius: 0;
            background: transparent;
            color: #555;
            font-size: 1.9rem;
            font-weight: 600;
            cursor: pointer;
        }
        #app .stepper__btn:hover,
        #app .stepper__btn:active { background: rgba(0, 0, 0, 0.05); color: #555; }
        #app .stepper__btn:disabled { color: #ccc; background: transparent; cursor: not-allowed; }
        #app .stepper__input {
            flex: 1 1 auto;
            width: 100%;
            min-width: 0;
            padding: 0 0.3rem;
            border: none;
            border-left: 0.5px solid #e8e2d4;
            border-right: 0.5px solid #e8e2d4;
            border-radius: 0;
            background: transparent;
            text-align: center;
            font-size: 1.6rem;
            font-weight: 700;
            color: #222;
        }

        /* Item-detail quantity stepper (.qty) */
        #app .qty {
            display: inline-flex;
            align-items: stretch;
            overflow: hidden;
            border: 0.5px solid #c9b99a;
            border-radius: 4px;
            background: #fff;
        }
        #app .qty__btn {
            width: 2.8rem;
            min-height: 3.2rem;
            border: none;
            border-radius: 0;
            background: transparent;
            color: #555;
            font-size: 1.7rem;
            cursor: pointer;
        }
        #app .qty__btn:hover { background: rgba(0, 0, 0, 0.05); color: #555; }
        #app .qty__btn:disabled { color: #ccc; background: transparent; cursor: not-allowed; }
        #app .qty__value {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            min-width: 3.4rem;
            border-left: 0.5px solid #e8e2d4;
            border-right: 0.5px solid #e8e2d4;
            font-size: 1.6rem;
            font-weight: 700;
            color: #222;
        }

        /* Strength control (.str__*) — the sidebar STR stepper */
        #app .str__control {
            display: inline-flex;
            align-items: stretch;
            overflow: hidden;
            border: 0.5px solid #c9b99a;
            border-radius: 4px;
            background: rgba(243, 235, 218, 0.5);
        }
        #app .str__step {
            width: 3rem;
            border: none;
            border-radius: 0;
            background: transparent;
            color: #2a4d70;
            font-size: 1.9rem;
            cursor: pointer;
        }
        #app .str__step:hover { background: rgba(42, 77, 112, 0.1); color: #2a4d70; }
        #app .str__step:disabled { color: #ccc; background: transparent; cursor: not-allowed; }
        #app .str__input {
            width: 4.2rem;
            padding: 0;
            border: none;
            border-left: 0.5px solid #c9b99a;
            border-right: 0.5px solid #c9b99a;
            border-radius: 0;
            background: transparent;
            text-align: center;
            font-size: 1.6rem;
            font-weight: 600;
            color: #222;
        }

        /* Character-sidebar Strength stepper (.str-compact). Its −/+ buttons have
           NO class — they are targeted by descendant (.str-compact button) — so
           the shared reset above misses them; reset them here. Without this the
           theme min-width/padding balloons the buttons and clips the −/+ out of
           the fixed 3-column grid. */
        #app .str-compact {
            display: inline-grid;
            grid-template-columns: 2.2rem 3.2rem 2.2rem;
            align-items: stretch;
            overflow: hidden;
            border: 0.5px solid #c9b99a;
            border-radius: 3px;
            background: #fbf7f0;
        }
        #app .str-compact button {
            height: 2.6rem;
            min-width: 0;
            margin: 0;
            padding: 0;
            border: none;
            border-radius: 0;
            background: transparent;
            box-shadow: none;
            color: #2a4d70;
            font-size: 1.5rem;
            line-height: 1;
            letter-spacing: normal;
            text-transform: none;
            text-shadow: none;
            -webkit-appearance: none;
            appearance: none;
            cursor: pointer;
        }
        #app .str-compact button:hover:not(:disabled) { background: rgba(42, 77, 112, 0.1); color: #2a4d70; }
        #app .str-compact button:disabled { color: #ccc; background: transparent; cursor: not-allowed; }
        #app .str-compact__value {
            display: flex;
            align-items: center;
            justify-content: center;
            border-left: 0.5px solid #c9b99a;
            border-right: 0.5px solid #c9b99a;
            font-size: 1.3rem;
            font-weight: 700;
            color: #222;
        }

        /* Mobile character-row STR stepper */
        #app .mobile-bar__str {
            display: flex;
            align-items: center;
            overflow: hidden;
            border: 0.5px solid #c9b99a;
            border-radius: 3px;
            background: #fefbf4;
        }
        #app .mobile-bar__str-btn {
            width: 2.6rem;
            height: 3rem;
            border: none;
            border-radius: 0;
            background: transparent;
            color: #365a85;
            font-size: 1.7rem;
            font-weight: 600;
            cursor: pointer;
        }
        #app .mobile-bar__str-btn:active { background: #f3ebda; }
        #app .mobile-bar__str-val {
            min-width: 2rem;
            text-align: center;
            font-size: 1.45rem;
            font-weight: 700;
            color: #222;
        }

        /* NOTE: the loot-split controls (.ls__*) render in the "Split this loot"
           modal, which ParModal teleports OUTSIDE #app — so they are hardened
           separately, scoped to .par-modal (see rpg_loot_split_control_styles). */

        /* Pack list-row quantity stepper (.row-use) — a fixed 3-column grid; the
           theme padding on the buttons overflows the clipped cells and hides the
           −/+ glyphs, so zero it (via the shared reset above) and re-pin the grid. */
        #app .row-use {
            display: inline-grid;
            grid-template-columns: 2.2rem 2.8rem 2.2rem;
            align-items: stretch;
            overflow: hidden;
            border: 0.5px solid #c9b99a;
            border-radius: 3px;
            background: #fbf7f0;
        }
        #app .row-use__btn {
            height: 2.6rem;
            border: none;
            border-radius: 0;
            background: transparent;
            color: #2a4d70;
            font-size: 1.6rem;
            cursor: pointer;
        }
        #app .row-use__btn:hover { background: rgba(42, 77, 112, 0.1); color: #2a4d70; }
        #app .row-use__count {
            display: flex;
            align-items: center;
            justify-content: center;
            border-left: 0.5px solid #c9b99a;
            border-right: 0.5px solid #c9b99a;
            font-size: 1.3rem;
            font-weight: 700;
            color: #222;
        }

        /* Round icon buttons (message dismiss ×, sidebar delete ×, list-row
           remove ×). The theme min-width stretches the intended square
           (border-radius:50%) into an oval — re-pin square geometry and zero the
           min-width/padding. Position, opacity-reveal, and transitions stay with
           the component. */
        #app .backpack__save-dismiss,
        #app .char-row__delete,
        #app .row-item__remove,
        #app .tile__remove,
        #app .row__remove,
        #app .slot__unequip {
            min-width: 0;
            padding: 0;
            border: none;
            box-shadow: none;
            background: transparent;
            border-radius: 50%;
            line-height: 1;
            -webkit-appearance: none;
            appearance: none;
        }
        #app .row-item__remove {
            width: 2rem;
            height: 2rem;
            font-size: 1.7rem;
            color: #6b6b6b;
        }
        #app .row-item__remove:hover { background: rgba(160, 51, 51, 0.14); color: #a03333; }
        #app .tile__remove { width: 1.7rem; height: 1.7rem; font-size: 1.5rem; }
        #app .row__remove { width: 1.8rem; height: 1.8rem; font-size: 1.5rem; color: #6b6b6b; }
        #app .row__remove:hover { background: rgba(160, 51, 51, 0.14); color: #a03333; }
        #app .slot__unequip { width: 2.4rem; height: 2.4rem; font-size: 1.5rem; color: #6b6b6b; }
        #app .slot__unequip:hover { background: rgba(160, 51, 51, 0.14); color: #a03333; }
        #app .backpack__save-dismiss {
            width: 2.2rem;
            height: 2.2rem;
            font-size: 1.8rem;
            color: #6b6b6b;
        }
        #app .backpack__save-dismiss:hover { background: rgba(0, 0, 0, 0.06); color: #222; }
        #app .char-row__delete {
            width: 2.4rem;
            height: 2.4rem;
            font-size: 1.8rem;
            color: #6b6b6b;
        }
        #app .char-row__delete:hover,
        #app .char-row__delete:focus-visible { background: rgba(160, 51, 51, 0.12); color: #a03333; }
        ' );

    // Loot-split controls live in the "Split this loot" modal, which ParModal
    // teleports to <body> (outside #app) — so scope their hardening to .par-modal.
    wp_add_inline_style( 'rpg-companion-overrides', rpg_loot_split_control_styles( '.par-modal' ) );

    // The shared chrome styles add a 60px mobile margin below the footer (see
    // rpg_companion_chrome_styles); this app has no bottom bar to clear, so drop
    // it. Added after the chrome styles so it wins by source order.
    wp_add_inline_style( 'rpg-companion-overrides', '
        @media (max-width: 768px) {
            .site-footer { margin-bottom: 0; }
        }
        ' );

    // Rules drawer + WordPress admin bar. The admin bar (32px; 46px on narrow
    // screens) pushes the in-flow app header down via html margin-top, but the
    // position:fixed rules drawer stays pinned at top:0 and slides in BEHIND the
    // bar — its header/close × misaligned with the app header. Only logged-in
    // admins see the bar (body.admin-bar), so this is a production-only nudge:
    // offset the drawer to start below the bar, level with the app header.
    wp_add_inline_style( 'rpg-companion-overrides', '
        body.admin-bar #app .rules-drawer {
            top: 32px;
            height: calc(100vh - 32px);
            height: calc(100dvh - 32px);
        }
        @media screen and (max-width: 782px) {
            body.admin-bar #app .rules-drawer {
                top: 46px;
                height: calc(100vh - 46px);
                height: calc(100dvh - 46px);
            }
        }
        ' );
}
add_action( 'wp_enqueue_scripts', 'rpg_companion_backpack_enqueue_assets' );

// ----------------------------------------------------------------------------
// Render Vue root element
// ----------------------------------------------------------------------------

function rpg_companion_backpack_render_root() {
    echo '<div id="app" data-page="backpack"></div>';
}
add_action( 'genesis_entry_content', 'rpg_companion_backpack_render_root' );

// ----------------------------------------------------------------------------
// Footer — tool cross-links + SRD attribution
// ----------------------------------------------------------------------------

add_action( 'genesis_footer', 'rpg_backpack_footer' );

function rpg_backpack_footer() {
    ?>
    <div class="rpg-footer-inner">
      <div class="rpg-footer-title">Kenji's D&amp;D Tools</div>
      <div class="rpg-footer-links">
        <a href="/dnd-5e-encounter-generator/">Encounter Generator</a>
        <span>•</span>
        <a href="/ai-powered-dnd-5e-monster-statblock-generator/">Statblock Generator</a>
        <span>•</span>
        <a href="/rpg-ai-npc-generator/">NPC Generator</a>
        <span>•</span>
        <a href="/kenjis-dungeon-generator-2-0/">Dungeon Generator</a>
        <span>•</span>
        <a href="/dnd-5e-loot-splitter/">Loot Splitter</a>
      </div>
      <div class="rpg-footer-attribution">
        Equipment data uses the
        <a href="https://dnd.wizards.com/resources/systems-reference-document" target="_blank" rel="noopener">System Reference Document 5.1</a>
        by Wizards of the Coast, licensed under
        <a href="https://creativecommons.org/licenses/by/4.0/legalcode" target="_blank" rel="noopener">CC BY 4.0</a>.
      </div>
    </div>
    <?php
}

genesis();
