<?php
/**
 * Genesis Custom RPG Companion Template.
 *
 * Template Name: RPG Companion Loot Splitter
 *
 * Free, no-AI loot splitter for D&D 5e: paste a hoard and divide coins + magic
 * items fairly between players. Forces full-width layout, removes Genesis chrome,
 * enqueues Vue assets, renders the Vue root mount, and appends a server-rendered
 * SEO section + branded footer below the app (matching the cros.land tool-suite
 * pattern).
 *
 * @package Genesis Custom RPG Companion Loot Splitter
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

add_filter( 'pre_get_document_title', 'rpg_loot_splitter_title', 99 );
function rpg_loot_splitter_title( $title ) {
    if ( is_page_template( 'rpg-companion-loot-splitter.php' ) ) {
        return 'D&D 5e Loot Splitter — Divide Coins & Magic Items Between Players | cros.land';
    }
    return $title;
}

add_action( 'wp_head', 'rpg_loot_splitter_meta_description', 1 );
function rpg_loot_splitter_meta_description() {
    if ( ! is_page_template( 'rpg-companion-loot-splitter.php' ) ) return;
    echo '<meta name="description" content="Free D&amp;D 5e loot splitter: paste a hoard and divide coins and magic items fairly between any number of players. Splits coins evenly by value, deals items at random or balances by worth, and lets you hand off each share as text." />' . "\n";
}

// ----------------------------------------------------------------------------
// Enqueue Vue app assets
// ----------------------------------------------------------------------------

function rpg_companion_loot_splitter_enqueue_assets() {
    rpg_companion_enqueue_entry( 'loot-splitter' );

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
}
add_action( 'wp_enqueue_scripts', 'rpg_companion_loot_splitter_enqueue_assets' );

// ----------------------------------------------------------------------------
// Render Vue root element
// ----------------------------------------------------------------------------

function rpg_companion_loot_splitter_render_root() {
    echo '<div id="app" data-page="loot-splitter"></div>';
}
add_action( 'genesis_entry_content', 'rpg_companion_loot_splitter_render_root' );

// ----------------------------------------------------------------------------
// SEO content — after main content area
// ----------------------------------------------------------------------------

add_action( 'genesis_after_content', 'rpg_loot_splitter_seo_content' );

function rpg_loot_splitter_seo_content() {
    ?>
    <section class="rpg-seo-section">
      <div class="rpg-seo-inner">

        <h2>D&amp;D 5e loot splitter</h2>

        <p>
          Divvying up a hoard shouldn't stall the game. Paste a loot list —
          coins and items, one per line, straight from a loot generator or your
          own notes — pick how many players are sharing, and the tool deals out
          even shares in seconds. Coins are split evenly by value across every
          denomination; magic items are dealt at random, or balanced by worth so
          no one share runs away with all the good stuff. Nothing is saved and
          there's no sign-in: it's a quick table utility, not an account.
        </p>

        <p>
          Not happy with a deal? Move any item to another share, re-deal the
          whole thing, or nudge the coins around — every share shows a running
          total so the split stays transparent. When you're done, copy each
          share as clean text to drop in your party chat or hand to a player.
        </p>

        <p>
          Part of a suite of
          <a href="/2023/04/ai-powered-game-master-tools/">game master tools</a>
          including an
          <a href="/dnd-5e-encounter-generator/">encounter generator</a>,
          <a href="/rpg-ai-npc-generator/">NPC generator</a>,
          <a href="/ai-powered-dnd-5e-monster-statblock-generator/">statblock generator</a>,
          <a href="/ai-rpg-location-generator/">location generator</a>,
          <a href="/dnd-5e-magic-item-generator/">magic item generator</a>,
          <a href="/kenjis-dungeon-generator-2-0/">dungeon generator</a>, and
          <a href="/rpg-setting-generator-and-world-building-tool/">worldbuilding dashboard</a>.
        </p>

        <h3>How the split works</h3>

        <p>
          Coins are converted to a common value, divided by the number of
          shares, and minted back into gp/sp/cp so each player gets an equal cut;
          any remainder that won't divide evenly is shown as leftover for the
          party to sort out. Items are handed out one share at a time. Turn on
          "balance shares by value" and the tool deals the high-value items first
          to keep totals even, then tunes the coins to match — using standard DMG
          rarity prices as estimates (consumables like potions and scrolls are
          valued a tier lower, and custom or non-SRD items count as neutral).
        </p>

        <details>
          <summary>What can I paste?</summary>
          <p>
            Plain lines work: "374 silver", "74 gold", "3 black jasper worth 50
            gp each", "Potion of Healing", "Flame Tongue". Most loot-generator
            dumps paste in as-is. Anything the parser can't read is listed so you
            can fix the line and try again.
          </p>
        </details>

        <details>
          <summary>Is anything saved?</summary>
          <p>
            No. The splitter runs entirely in your browser and keeps no data —
            close the tab and it's gone. If you want to track gear and carrying
            capacity per character over time, the loot splitter is also built
            into the free visual inventory manager.
          </p>
        </details>

      </div>
    </section>
    <?php
}

// ----------------------------------------------------------------------------
// Footer — attribution + cross-links
// ----------------------------------------------------------------------------

add_action( 'genesis_footer', 'rpg_loot_splitter_footer' );

function rpg_loot_splitter_footer() {
    ?>
    <div class="rpg-footer-inner">
      <div class="rpg-footer-title">Kenji's Game Master Tools</div>
      <div class="rpg-footer-links">
        <a href="https://cros.land/kenjis-game-master-tool-updates/" target="_blank">What's new</a>
        <span>•</span>
        <a href="https://cros.land" target="_blank">Blog</a>
        <span>•</span>
        <a href="https://discord.gg/DJVTbkH4VG" target="_blank">Discord</a>
        <span>•</span>
        <a href="https://www.patreon.com/c/ai_rpg_tookit" target="_blank">Patreon</a>
      </div>
      <div class="rpg-footer-attribution">
        Item and equipment data uses the
        <a href="https://dnd.wizards.com/resources/systems-reference-document" target="_blank" rel="noopener">System Reference Document 5.1</a>
        by Wizards of the Coast, licensed under
        <a href="https://creativecommons.org/licenses/by/4.0/legalcode" target="_blank" rel="noopener">CC BY 4.0</a>.
      </div>
    </div>
    <?php
}

genesis();
