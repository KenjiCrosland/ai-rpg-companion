<?php
/**
 * Genesis Custom RPG Companion Template.
 *
 * A template to force full-width layout, remove breadcrumbs, and remove the page title.
 *
 * Template Name: RPG Companion Statblock Generator
 *
 * @package Genesis Custom RPG Companion Statblock Generator
 * @author  Your Name
 * @license GPL-2.0-or-later
 * @link    https://your-link.com/
 */

// Removes the entry header markup and page title.
remove_action( 'genesis_header', 'genesis_header_markup_open', 5 );
remove_action( 'genesis_header', 'genesis_do_header' );
remove_action( 'genesis_header', 'genesis_header_markup_close', 15 );
remove_action( 'genesis_entry_header', 'genesis_entry_header_markup_open', 5 );
remove_action( 'genesis_entry_header', 'genesis_entry_header_markup_close', 15 );
remove_action( 'genesis_entry_header', 'genesis_do_post_title' );
//* Remove navigation
remove_theme_support( 'genesis-menus' );

//* Remove breadcrumbs
remove_action( 'genesis_before_loop', 'genesis_do_breadcrumbs' );

//* Remove site footer widgets
remove_theme_support( 'genesis-footer-widgets' );

//* Remove the default footer content but KEEP the .site-footer wrapper —
//* the custom rpg_statblock_footer renders inside it and the shared chrome
//* styles target .site-footer for the parchment background and centering.
remove_action( 'genesis_footer', 'genesis_do_footer' );

// Forces full width content layout.
add_filter( 'genesis_site_layout', '__genesis_return_full_width_content' );

// Removes the breadcrumbs.
remove_action( 'genesis_before_loop', 'genesis_do_breadcrumbs');

// Enqueue Vue app assets.
function vue_app_enqueue_assets() {
    rpg_companion_enqueue_entry( 'statblock' );

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
            /* Kill Genesis wrapper bottom spacing that causes footer gap
               (the site footer is visible again now that the WP template owns
               the footer instead of the in-app one). */
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
            .page.type-page.status-publish.entry{
                margin-bottom: 0 !important;
            }
            .read-aloud p {
                margin-bottom: 1rem;
            }
            .statblock th, .statblock td {
                padding: 0;
                text-align: center;
                border: none;
            }
            .statblock ul.abilities {
             margin-left: 0;
          }

            /* Statblock2024 ability grid — replicated from the component
               (scoped styles) at #app specificity, and pinned in PX: the
               card\'s outer width is px-fixed (850) while the theme\'s root
               font-size scales rem, so rem-sized grid columns overflow the
               half column in prod and the theme\'s word-wrap: break-word
               fractures CON/CHA. px columns + px grid font are immune to
               the theme root entirely. Values = component rems × 10. */
            #app .sb24-abilities {
                display: flex;
                flex-wrap: wrap;
                gap: 4px 8px;
                font-size: 14px;
            }
            #app .sb24-ability-cell {
                display: grid;
                grid-template-columns: 32px 23px 29px 29px;
                column-gap: 3px;
                align-items: center;
                text-align: center;
            }
            #app .sb24-ability-head {
                font-size: 9.5px;
            }
            #app .sb24-ability-abbr {
                white-space: nowrap;
                word-break: normal;
                overflow-wrap: normal;
                text-align: left;
                padding-left: 4px;
            }
            /* Edit mode widens the score column for its input (matches the
               component\'s .sb24-body--editing override). */
            #app .sb24-body--editing .sb24-ability-cell {
                grid-template-columns: 32px 52px 29px 29px;
            }
            select {
                padding: 1rem;
            }
            .monster-form select {
                padding-top: .9rem;
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
            .entry-content h4 {
                margin-top: 0;
            }
            /* Override default button styles */
            button, input[type="button"], input[type="reset"], input[type="submit"], .button {
                color: inherit;
            }
            button:focus, button:hover, input[type="button"]:focus, input[type="button"]:hover, input[type="reset"]:focus, input[type="reset"]:hover, input[type="submit"]:focus, input[type="submit"]:hover, .site-container div.wpforms-container-full .wpforms-form input[type="submit"]:focus, .site-container div.wpforms-container-full .wpforms-form input[type="submit"]:hover, .site-container div.wpforms-container-full .wpforms-form button[type="submit"]:focus, .site-container div.wpforms-container-full .wpforms-form button[type="submit"]:hover, .button:focus, .button:hover {
                color: inherit;
            }

            /* Patreon Button Overrides */
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
        ' );

    wp_add_inline_style( 'rpg-companion-overrides', rpg_companion_chrome_styles() );
}
add_action( 'wp_enqueue_scripts', 'vue_app_enqueue_assets' );

//Add Vue app root element.
function vue_app_render_root_element() {
    echo '<div id="app" data-page="statblock-generator"></div>';
}

// add_action( 'genesis_entry_content', 'vue_app_render_root_element' );


// -----------------------------------------------------------------------------
// SEO content — after main content area
// -----------------------------------------------------------------------------

add_action( 'genesis_after_content', 'rpg_statblock_seo_content' );

function rpg_statblock_seo_content() {
    ?>
    <section class="rpg-seo-section">
      <div class="rpg-seo-spacer"></div>
      <div class="rpg-seo-inner">

        <h2>D&amp;D 5e monster statblock generator (2014 &amp; 2024 rules)</h2>

        <p>
          Create complete D&amp;D 5th edition monsters in the classic 2014
          layout or the new 2024 style. A math engine sets the numbers: Armor
          Class, hit points, attack bonuses, save DCs, and damage all derive
          from the Challenge Rating you pick, on curves calibrated against
          every monster in the 5e SRD. The AI writes the creature's abilities
          and flavor around numbers it cannot change, so a CR 12 skirmisher
          from this tool hits like an official CR 12 skirmisher.
        </p>

        <p>
          This tool is part of a suite of
          <a href="/kenjis-dungeon-master-tools/">game master tools</a>
          including an
          <a href="/dnd-5e-encounter-generator/">encounter generator</a>,
          <a href="/rpg-ai-npc-generator/">NPC generator</a>,
          <a href="/kenjis-dungeon-generator-2-0/">dungeon generator</a>,
          <a href="/dnd-5e-magic-item-generator/">magic item generator</a>, and
          <a href="/rpg-setting-generator-and-world-building-tool/">worldbuilding dashboard</a>.
          Monsters you make here can be dropped into encounters, attached to
          NPCs, or placed in dungeon rooms.
        </p>

        <h3>How the numbers are calculated</h3>

        <p>
          Challenge Rating sets the baselines. AC, hit points, attack bonus,
          and save DC each follow a curve fitted to the official monsters, and
          total damage per round comes from the Dungeon Master's Guide's
          damage bands. A multiattack splits that budget across its attacks,
          an area effect gets about half of it, and a once-per-fight nova can
          spend most of it at once. Legendary monsters deal about 60% of their
          budget on their own turn and the rest through legendary actions,
          matching how official legendaries are costed. Save DCs always derive
          from 8&nbsp;+&nbsp;proficiency&nbsp;+&nbsp;ability modifier, and
          every block passes an automated review of roughly ninety checks
          calibrated so that no official SRD monster would trip them.
        </p>

        <h3>What the combat roles do to the math</h3>

        <p>
          The combat role shifts those baselines the way official monster
          design does. A defender and a lurker of the same CR are very
          different fights that award the same XP:
        </p>

        <ul class="rpg-seo-list">
          <li><strong>Balanced:</strong> the raw mathematical baseline for the CR.</li>
          <li><strong>Brute:</strong> trades a point of AC for about 25% more hit points and harder single hits.</li>
          <li><strong>Defender:</strong> +2 AC and extra hit points, paid for with about 15% less damage. Usually carries a protection reaction.</li>
          <li><strong>Skirmisher:</strong> baseline numbers plus a movement trick like bonus-action disengage, flyby, or burrow.</li>
          <li><strong>Artillery:</strong> thin defenses in exchange for long-range attacks and an escape tool.</li>
          <li><strong>Controller:</strong> +1 to save DCs and about 30% less damage. Restraints, slows, and blinds do the work.</li>
          <li><strong>Lurker:</strong> fragile and weak in a stand-up fight, with an opening strike that spends the missing damage all at once.</li>
          <li><strong>Support:</strong> buffs, heals, and enables allies. Deliberately underperforms its CR when fought alone.</li>
          <li><strong>Swarm:</strong> a mass of Tiny creatures with weapon resistances, extra hit points, and damage that halves below half hit points, per the official swarm rules.</li>
        </ul>

        <p>
          Leave the role on <strong>Auto</strong> and the tool reads your
          concept and picks: a &ldquo;tomb guardian&rdquo; resolves to a
          defender, a &ldquo;dune ambusher&rdquo; to a lurker.
        </p>

        <h3>2014 vs. 2024 statblocks</h3>

        <p>
          The 2024 rules mostly changed how monsters are written. A 2024 block
          prints Initiative on the statblock, shows each ability's modifier
          and save in one table, merges damage and condition immunities into a
          single line, capitalizes conditions and damage types, and uses new
          phrasing for attacks and saves: &ldquo;<em>Melee Attack Roll:</em>
          +7&rdquo; without &ldquo;to hit,&rdquo; and saving throws written as
          &ldquo;<em>Constitution Saving Throw:</em> DC 15&rdquo; with Failure
          and Success lines. Bonus Actions get their own section, and new
          vocabulary appears: Emanation areas and Bloodied for half hit
          points.
        </p>

        <p>
          Both editions run on the same math engine here, so the numbers are
          identical either way. Any saved monster can be converted to the
          other edition once. After that, both printings are stored on the
          monster and tabs flip between them instantly. Conversion translates
          wording only, with one exception that matches the official 2024
          reprints: blanket resistance to nonmagical bludgeoning, piercing,
          and slashing is dropped, and the tool tells you when it does this.
        </p>

        <h3>Frequently asked questions</h3>

        <div class="rpg-faq" itemscope itemtype="https://schema.org/FAQPage">

          <details itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
            <summary itemprop="name">Is this monster statblock generator free?</summary>
            <div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
              <p itemprop="text">
                Yes. The free tier includes 5 AI generations per 24 hours, and
                statblocks and edition conversions share that count.
                <a href="https://www.patreon.com/c/ai_rpg_tookit">Premium</a>
                ($5/month) removes the limit across every tool on the site.
              </p>
            </div>
          </details>

          <details itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
            <summary itemprop="name">Are the Challenge Ratings accurate?</summary>
            <div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
              <p itemprop="text">
                Yes. The AI never chooses the numbers. AC, hit points, attack
                bonuses, save DCs, and damage are computed from the CR and
                combat role on curves calibrated against the official SRD
                monsters, and an automated review checks every block against
                the conventions those monsters follow.
              </p>
            </div>
          </details>

          <details itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
            <summary itemprop="name">Can I edit a generated statblock?</summary>
            <div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
              <p itemprop="text">
                Yes. Every field edits inline on the card, including the name,
                ability scores, detail lines, and each trait or action. Editing
                a number shows the engine's expected band for that CR, and
                individual abilities can be re-rolled with AI without
                regenerating the whole monster.
              </p>
            </div>
          </details>

          <details itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
            <summary itemprop="name">Can I convert a monster between 2014 and 2024 rules?</summary>
            <div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
              <p itemprop="text">
                Yes. A one-time AI conversion rewrites the wording into the
                other edition's style while the numbers stay identical. Both
                printings are then saved on the monster, with tabs to flip
                between them instantly. A conversion counts as one generation
                on the free tier.
              </p>
            </div>
          </details>

          <details itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
            <summary itemprop="name">What can I export statblocks to?</summary>
            <div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
              <p itemprop="text">
                Homebrewery markdown, including the 2024 monster frame, for
                styled PDFs. Foundry VTT via the 5e Statblock Importer module.
                Improved Initiative JSON, where 2024 blocks include native
                Bonus Actions and the Initiative modifier. Roll20 through the
                Conjure Creature Chrome extension.
              </p>
            </div>
          </details>

          <details itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
            <summary itemprop="name">Where are my monsters saved?</summary>
            <div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
              <p itemprop="text">
                In your browser's local storage, organized into folders. Use
                the sidebar's Data options to export a backup file or move your
                collection to another device. Private browsing windows can't
                save, so the tool asks for a standard window.
              </p>
            </div>
          </details>

          <details itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
            <summary itemprop="name">Do the other tools use these monsters?</summary>
            <div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
              <p itemprop="text">
                Yes. Saved monsters can be dropped into the
                <a href="/dnd-5e-encounter-generator/">encounter generator</a>
                with XP budgeting, attached to NPCs, and generated inside the
                dungeon and NPC tools, all of which use this same engine and
                honor your 2014/2024 preference.
              </p>
            </div>
          </details>

        </div>
      </div>
    </section>
    <?php
}


// -----------------------------------------------------------------------------
// Footer — inside Genesis's own footer wrapper (no gap)
// -----------------------------------------------------------------------------

add_action( 'genesis_footer', 'rpg_statblock_footer' );

function rpg_statblock_footer() {
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
        and SRD 5.2.1) by Wizards of the Coast LLC, and monster design analysis
        by <a href="https://blogofholding.com/?p=8130" target="_blank">Blog of Holding</a>,
        used under the
        <a href="https://cros.land/ogl" target="_blank">Creative Commons Attribution 4.0 License</a>
      </div>
    </div>
    <?php
}

// Runs the Genesis loop.
genesis();