<?php
/**
 * Genesis Custom RPG Companion Template.
 *
 * Template Name: RPG Companion Statblock Converter
 *
 * @package Genesis Custom RPG Companion Statblock Converter
 * @license GPL-2.0-or-later
 */

// Removes the entry header markup and page title.
remove_action( 'genesis_header', 'genesis_header_markup_open', 5 );
remove_action( 'genesis_header', 'genesis_do_header' );
remove_action( 'genesis_header', 'genesis_header_markup_close', 15 );
remove_action( 'genesis_entry_header', 'genesis_entry_header_markup_open', 5 );
remove_action( 'genesis_entry_header', 'genesis_entry_header_markup_close', 15 );
remove_action( 'genesis_entry_header', 'genesis_do_post_title' );
remove_theme_support( 'genesis-menus' );
remove_action( 'genesis_before_loop', 'genesis_do_breadcrumbs' );
remove_theme_support( 'genesis-footer-widgets' );

//* Remove the default footer content but KEEP the .site-footer wrapper.
remove_action( 'genesis_footer', 'genesis_do_footer' );

// Forces full width content layout.
add_filter( 'genesis_site_layout', '__genesis_return_full_width_content' );

// Enqueue Vue app assets.
function vue_app_enqueue_assets() {
    rpg_companion_enqueue_entry( 'statblock-converter' );

    wp_register_style( 'rpg-companion-overrides', false );
    wp_enqueue_style( 'rpg-companion-overrides' );
    wp_add_inline_style( 'rpg-companion-overrides', '
            main.content {
                max-width: 940px;
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
        ' );

    wp_add_inline_style( 'rpg-companion-overrides', rpg_companion_chrome_styles() );
}
add_action( 'wp_enqueue_scripts', 'vue_app_enqueue_assets' );

// Render Vue root element.
function vue_app_render_root_element() {
    echo '<div id="app" data-page="statblock-converter"></div>';
}
add_action( 'genesis_entry_content', 'vue_app_render_root_element' );

// -----------------------------------------------------------------------------
// SEO content — after main content area
// -----------------------------------------------------------------------------

add_action( 'genesis_after_content', 'rpg_converter_seo_content' );

function rpg_converter_seo_content() {
    ?>
    <section class="rpg-seo-section">
      <div class="rpg-seo-spacer"></div>
      <div class="rpg-seo-inner">

        <h2>Convert D&amp;D statblocks between 2014 and 2024 rules</h2>

        <p>
          Paste any 5th edition monster statblock and the tool detects whether
          it uses the classic 2014 layout or the new 2024 style, then shows it
          as a formatted card. One click converts the wording to the other
          edition. The numbers never change: AC, hit points, attack bonuses,
          save DCs, and damage stay exactly as written, and only the phrasing
          is translated. Converted monsters save to your library with both
          printings attached, and you can open them in the
          <a href="/ai-powered-dnd-5e-monster-statblock-generator/">statblock generator</a>
          to edit, re-roll abilities, or export.
        </p>

        <h3>What the conversion changes</h3>

        <p>
          Going to 2024: attacks become &ldquo;<em>Melee Attack Roll:</em>
          +7&rdquo; without &ldquo;to hit,&rdquo; saving throws use the
          Failure and Success structure, conditions and damage types
          capitalize, damage and condition immunities merge into one line, and
          Bonus Actions get their own section. Going to 2014: the same changes
          in reverse, including classic phrasing like &ldquo;must succeed on a
          DC 15 Constitution saving throw.&rdquo; One balance exception
          matches the official 2024 reprints: blanket resistance to nonmagical
          bludgeoning, piercing, and slashing is dropped when converting to
          2024, and the tool tells you when it does this.
        </p>

        <h3>Frequently asked questions</h3>

        <div class="rpg-faq" itemscope itemtype="https://schema.org/FAQPage">

          <details itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
            <summary itemprop="name">Is the converter free?</summary>
            <div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
              <p itemprop="text">
                Pasting and previewing is free. Each conversion counts as one of
                the 5 daily AI generations on the free tier, shared with the
                statblock generator.
                <a href="https://www.patreon.com/c/ai_rpg_tookit">Premium</a>
                ($5/month) removes the limit.
              </p>
            </div>
          </details>

          <details itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
            <summary itemprop="name">What formats can I paste?</summary>
            <div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
              <p itemprop="text">
                Plain text copied from PDFs, websites, or other tools. The
                parser reads the standard statblock layout directly. If a paste
                is messy or incomplete, the convert step runs an extra AI pass
                to read it first, included in the same generation. If a format
                keeps failing, <a href="https://cros.land/contact-me/">contact
                me</a> and I will add support for it.
              </p>
            </div>
          </details>

          <details itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
            <summary itemprop="name">Does converting change the balance?</summary>
            <div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
              <p itemprop="text">
                No. Conversion translates wording only. Every number, die
                expression, DC, and mechanical effect stays the same, with the
                single disclosed exception of the nonmagical weapon-resistance
                package when converting to 2024.
              </p>
            </div>
          </details>

          <details itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
            <summary itemprop="name">Where does the converted statblock go?</summary>
            <div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
              <p itemprop="text">
                It saves to your browser library in a Converted folder, with the
                original printing attached. Open it in the statblock generator
                to flip between editions with tabs, edit it inline, use it in
                encounters, or export it to Homebrewery, Foundry VTT, Improved
                Initiative, or Roll20.
              </p>
            </div>
          </details>

        </div>
      </div>
    </section>
    <?php
}

// -----------------------------------------------------------------------------
// Footer — inside Genesis's own footer wrapper
// -----------------------------------------------------------------------------

add_action( 'genesis_footer', 'rpg_converter_footer' );

function rpg_converter_footer() {
    ?>
    <div class="rpg-footer-inner">
      <div class="rpg-footer-title">Kenji's Game Master Tools</div>
      <div class="rpg-footer-links">
        <a href="https://cros.land/kenjis-game-master-tool-updates/" target="_blank">What's new</a>
        <span>&bull;</span>
        <a href="https://cros.land" target="_blank">Blog</a>
        <span>&bull;</span>
        <a href="https://discord.gg/DJVTbkH4VG" target="_blank">Discord</a>
        <span>&bull;</span>
        <a href="https://www.patreon.com/c/ai_rpg_tookit" target="_blank">Patreon</a>
      </div>
      <div class="rpg-footer-ogl">
        Includes material from the D&amp;D System Reference Documents (SRD 5.1
        and SRD 5.2.1) by Wizards of the Coast LLC, used under the
        <a href="https://cros.land/ogl" target="_blank">Creative Commons Attribution 4.0 License</a>
      </div>
    </div>
    <?php
}

// Runs the Genesis loop.
genesis();
