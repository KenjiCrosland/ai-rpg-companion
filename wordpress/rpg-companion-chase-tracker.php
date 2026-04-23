<?php
/**
 * Genesis Custom RPG Companion Template.
 *
 * Template Name: RPG Companion Chase Tracker
 *
 * A free spatial chase tracker for D&D 5e. Forces full-width layout,
 * removes Genesis chrome, enqueues Vue assets, and renders the Vue
 * root mount. Includes SEO/FAQ content below the app.
 *
 * @package Genesis Custom RPG Companion Chase Tracker
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
// Enqueue Vue app assets
// ----------------------------------------------------------------------------

function rpg_companion_chase_tracker_enqueue_assets() {
    rpg_companion_enqueue_entry( 'chase-tracker' );

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
        button:focus, button:hover, input[type="button"]:focus, input[type="button"]:hover, input[type="reset"]:focus, input[type="reset"]:hover, input[type="submit"]:focus, input[type="submit"]:hover, .button:focus, .button:hover {
            color: inherit;
        }

        /* ---- SEO content section ---- */
        .rpg-seo-section {
            border-top: 1px solid #e5e2db;
            margin-top: 4rem;
            background: #faf9f6;
        }
        .rpg-seo-inner {
            max-width: 800px;
            margin: 0 auto;
            padding: 3rem 2rem 6rem;
        }
        .rpg-seo-inner h2 {
            font-family: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
            font-size: 18px;
            font-weight: 500;
            color: #3d3929;
            margin: 0 0 0.5rem;
            padding: 0;
        }
        .rpg-seo-inner h3 {
            font-family: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
            font-size: 16px;
            font-weight: 500;
            color: #3d3929;
            margin: 1rem 0 0.5rem;
            padding: 0;
        }
        .rpg-seo-inner p {
            font-family: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
            font-size: 14px;
            color: #7a7668;
            line-height: 1.6;
            margin: 0 0 0.5rem;
        }
        .rpg-seo-inner p strong { color: #3d3929; font-weight: 500; }
        .rpg-seo-inner a { color: #5a8a5e; text-decoration: none; }
        .rpg-seo-inner a:hover { text-decoration: underline; }

        .rpg-callout {
            background: #f4f1e8;
            border-left: 3px solid #5a8a5e;
            padding: 1rem 1.25rem;
            margin: 1.5rem 0 2rem;
            border-radius: 2px;
        }
        .rpg-callout p { margin: 0 0 0.5rem; }
        .rpg-callout p:last-child { margin-bottom: 0; }

        .rpg-faq details { border-top: 1px solid #eeece6; }
        .rpg-faq details:last-child { border-bottom: 1px solid #eeece6; }
        .rpg-faq summary {
            font-family: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
            font-size: 14px;
            font-weight: 500;
            color: #3d3929;
            cursor: pointer;
            padding: 0.6rem 0;
            list-style: none;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .rpg-faq summary::-webkit-details-marker { display: none; }
        .rpg-faq summary::after {
            content: "+";
            color: #999;
            font-size: 18px;
            font-weight: 300;
            flex-shrink: 0;
            margin-left: 1rem;
        }
        .rpg-faq details[open] summary::after { content: "−"; }
        .rpg-faq details p { font-size: 13px; padding: 0 0 0.6rem; margin: 0; }

        .site-footer {
            text-align: center;
            padding: 1.5rem 1rem;
            margin: 0;
            border-top: 1px solid #e5e2db;
            background: #faf9f6;
        }
        .rpg-footer-ogl {
            font-family: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
            font-size: 13px;
            color: #9a9589;
        }
        .rpg-footer-ogl a { color: #7a7668; text-decoration: none; }
        .rpg-footer-ogl a:hover { text-decoration: underline; }

        @media (max-width: 768px) {
            .rpg-seo-inner { padding: 1.5rem 1rem 4rem; }
            .site-footer { margin-bottom: 60px; }
        }
    ' );
}
add_action( 'wp_enqueue_scripts', 'rpg_companion_chase_tracker_enqueue_assets' );

// ----------------------------------------------------------------------------
// Render Vue root element
// ----------------------------------------------------------------------------

function rpg_companion_chase_tracker_render_root() {
    echo '<div id="app" data-page="chase-tracker"></div>';
}
add_action( 'genesis_entry_content', 'rpg_companion_chase_tracker_render_root' );

// ----------------------------------------------------------------------------
// SEO content — after main content area
// ----------------------------------------------------------------------------

add_action( 'genesis_after_content', 'rpg_chase_tracker_seo_content' );

function rpg_chase_tracker_seo_content() {
    ?>
    <section class="rpg-seo-section">
      <div class="rpg-seo-inner">

        <h2>A free spatial chase tracker for D&amp;D 5e</h2>

        <p>
          This is a free tool — no account, no signup, no AI. Pick a map,
          place your tokens, and run a chase scene where everyone at the
          table can see where everyone is. It runs entirely in your browser
          and saves your active chase to local storage so a refresh never
          loses your place.
        </p>

        <p>
          <strong>What it is.</strong> A visual map of connected zones with
          character tokens in them. Click a token to select it. Click an
          adjacent zone to move it. Edit zones inline. When you want the
          scene to twist, hit <em>What Changes?</em> for a prompt drawn
          from a curated table.
        </p>

        <h2>Why zones instead of skill challenges</h2>

        <p>
          Most chase rules track abstract progress — pips, clocks, success
          counts. That works fine with pen and paper. The hard part of a
          chase isn't mechanics; it's keeping track of where everyone is
          when the party fragments. Two PCs cut through an alley. One
          climbs to the rooftops. The quarry ducks into a kitchen. The
          pursuers converge on the bridge. Holding all of that in theater
          of the mind is where chases fall apart.
        </p>

        <p>
          A zone map makes that state visible. Players see the terrain.
          They see who is where. They make better decisions because the
          situation is legible. The GM runs a faster chase because nobody
          is asking "wait, where am I again?"
        </p>

        <h2>How to run a chase with this tool</h2>

        <p>
          Pick one of three starting maps — Urban Alleyways, Wilderness
          Trails, or Building Interior — then adjust it to taste. Rename
          zones, rewrite descriptions, drop in new tokens for PCs and
          pursuers, add zones if the chase sprawls beyond the template.
        </p>

        <p>
          Each round, let players describe what they want to do and where.
          Tokens move between adjacent zones. When a player tries
          something risky — jumping rooftops, forcing through a crowd,
          squeezing through an obstacle — resolve it with whatever system
          you're already using. The map just tracks the state.
        </p>

        <div class="rpg-callout">
          <p><strong>When to trigger "What Changes?"</strong></p>
          <p>
            Once the chase settles into a rhythm, a shift prompt throws
            something new in — reinforcements arrive, a path closes, a
            witness appears. Hit the button every two or three rounds, or
            whenever the scene needs momentum. Read the prompt, interpret
            it for your map, and narrate.
          </p>
        </div>

        <h2>Zone states</h2>

        <p>
          Each zone has a state: <strong>open</strong>, <strong>crowded</strong>,
          <strong>obstacle</strong>, or <strong>closed</strong>. These are
          advisory flags for the GM, not mechanical modifiers. A crowded
          zone might impose disadvantage on stealth. An obstacle zone might
          require an athletics check to cross. A closed zone blocks
          movement entirely unless forced. Use the states to cue your own
          rulings — the tool doesn't enforce them.
        </p>

        <h2>Part of a suite</h2>

        <p>
          This tool is part of a suite of
          <a href="/kenjis-dungeon-master-tools/">game master tools</a>.
          Need a pursuer statblock? Try the
          <a href="/ai-powered-dnd-5e-monster-statblock-generator/">statblock generator</a>.
          Need the quarry as a full NPC? Use the
          <a href="/rpg-ai-npc-generator/">NPC generator</a>.
          Need the city the chase is running through? Try the
          <a href="/ai-rpg-location-generator/">location generator</a>.
          Running combat at the end of the chase? The
          <a href="/dnd-5e-encounter-generator/">encounter generator</a>
          will build it.
        </p>

        <h3>Frequently asked questions</h3>

        <div class="rpg-faq" itemscope itemtype="https://schema.org/FAQPage">

          <details itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
            <summary itemprop="name">Is this tool really free?</summary>
            <div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
              <p itemprop="text">
                Yes. No signup, no paywall, no ads. It runs in your browser
                and saves to local storage. It exists because the other
                tools on this site cost money to run, and giving away a
                useful tool with no strings attached is the right way to
                introduce people to the rest.
              </p>
            </div>
          </details>

          <details itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
            <summary itemprop="name">Does it use AI?</summary>
            <div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
              <p itemprop="text">
                No. Every piece of content — the starting maps, the shift
                prompts, the zone descriptions — is hand-written and lives
                in the app as static data. Nothing is generated at runtime.
                That means it works offline, it's fast, and it's safe to
                share in spaces that prefer not to use AI tools.
              </p>
            </div>
          </details>

          <details itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
            <summary itemprop="name">Do the zone states enforce rules?</summary>
            <div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
              <p itemprop="text">
                No. Open, crowded, obstacle, and closed are advisory flags
                — visual cues for the GM. The tool doesn't block movement
                or apply mechanical effects based on state. Use them as
                prompts for your own rulings.
              </p>
            </div>
          </details>

          <details itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
            <summary itemprop="name">What happens if I refresh the page?</summary>
            <div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
              <p itemprop="text">
                Your active chase is saved to browser local storage and
                restored on reload. "New Chase" clears it and returns you
                to the template picker. Clearing your browser data will
                reset the tool.
              </p>
            </div>
          </details>

          <details itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
            <summary itemprop="name">Can I make my own map from scratch?</summary>
            <div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
              <p itemprop="text">
                Yes. Pick any template as a starting point, then edit zone
                names, rewrite descriptions, add new zones, remove the
                ones you don't need, and connect zones however you like.
                The templates are a starting shape, not a constraint.
              </p>
            </div>
          </details>

          <details itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
            <summary itemprop="name">Does it work on mobile?</summary>
            <div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
              <p itemprop="text">
                The interface is designed for a laptop or tablet at the
                table. It will render on a phone, but the zone grid gets
                cramped. The GM running the tool on a larger screen is the
                intended use.
              </p>
            </div>
          </details>

        </div>

      </div>
    </section>
    <?php
}

// ----------------------------------------------------------------------------
// Footer
// ----------------------------------------------------------------------------

add_action( 'genesis_footer', 'rpg_chase_tracker_footer' );

function rpg_chase_tracker_footer() {
    ?>
    <div class="rpg-footer-inner">
      <p class="rpg-footer-ogl">
        A free tool by <a href="https://cros.land">cros.land</a> ·
        <a href="/kenjis-dungeon-master-tools/">All Tools</a> ·
        <a href="https://www.patreon.com/c/ai_rpg_tookit" target="_blank">Patreon</a>
      </p>
      <div class="rpg-footer-ogl">
        This content uses the D&amp;D 5e SRD under the
        <a href="https://cros.land/ogl" target="_blank">Open Gaming License</a>
      </div>
    </div>
    <?php
}

genesis();
