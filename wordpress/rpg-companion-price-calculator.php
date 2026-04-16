<?php
/**
 * Genesis Custom RPG Companion Template.
 *
 * A template to force full-width layout, remove breadcrumbs, and remove the page title.
 *
 * Template Name: RPG Companion Magic Item Price Calculator
 *
 * @package Genesis Custom RPG Companion Magic Item Price Calculator
 * @author  Kenji Crosland
 * @license GPL-2.0-or-later
 * @link    https://cros.land/
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

//* Remove default Genesis footer content but KEEP the markup wrapper
remove_action( 'genesis_footer', 'genesis_do_footer' );

// Forces full width content layout.
add_filter( 'genesis_site_layout', '__genesis_return_full_width_content' );

// Enqueue Vue app assets.
function vue_app_enqueue_assets() {
    rpg_companion_enqueue_entry( 'price-calculator' );

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

        /* Kill Genesis wrapper bottom spacing that causes footer gap */
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
        select {
            padding: 1rem;
        }
        p {
          margin: 1rem 0;
        }
        #genesis-content,
        #app {
            max-width: 100%;
            width: 100%;
        }
        .entry-content {
            min-height: 60vh;
        }

        /* Override default button styles */
        button, input[type="button"], input[type="reset"], input[type="submit"], .button {
            color: inherit;
        }
        button:focus, button:hover, input[type="button"]:focus, input[type="button"]:hover, input[type="reset"]:focus, input[type="reset"]:hover, input[type="submit"]:focus, input[type="submit"]:hover, .site-container div.wpforms-container-full .wpforms-form input[type="submit"]:focus, .site-container div.wpforms-container-full .wpforms-form input[type="submit"]:hover, .site-container div.wpforms-container-full .wpforms-form button[type="submit"]:focus, .site-container div.wpforms-container-full .wpforms-form button[type="submit"]:hover, .button:focus, .button:hover {
            color: inherit;
        }

        /* ---- SEO content section ---- */
        .rpg-seo-section {
            display: flex;
            border-top: 1px solid #e5e2db;
            margin-top: 4rem;
            background: #faf9f6;
        }

        .rpg-seo-spacer {
            width: 400px;
            flex-shrink: 0;
            background: #faf9f6;
        }

        .rpg-seo-inner {
            flex: 1;
            max-width: 800px;
            margin: 0 auto;
            padding: 3rem 0 6rem;
        }

        @media (max-width: 1300px) {
            .rpg-seo-spacer {
                width: 320px;
            }
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

        .rpg-seo-inner p strong {
            color: #3d3929;
            font-weight: 500;
        }

        .rpg-seo-inner a {
            color: #5a8a5e;
            text-decoration: none;
        }

        .rpg-seo-inner a:hover {
            text-decoration: underline;
        }

        /* ---- Reference tables ---- */
        .rpg-ref-table {
            width: 100%;
            border-collapse: collapse;
            margin: 1rem 0 2rem;
            font-family: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
            font-size: 13px;
        }

        .rpg-ref-table thead th {
            text-align: left;
            font-weight: 500;
            font-size: 12px;
            color: #9a9589;
            text-transform: uppercase;
            letter-spacing: 0.04em;
            padding: 0.5rem 0.75rem;
            border-bottom: 1px solid #e5e2db;
        }

        .rpg-ref-table tbody td {
            padding: 0.5rem 0.75rem;
            color: #3d3929;
            border-bottom: 1px solid #f0eee8;
            line-height: 1.5;
            vertical-align: top;
        }

        .rpg-ref-table tbody tr:last-child td {
            border-bottom: 1px solid #e5e2db;
        }

        .rpg-ref-table tbody td:first-child {
            font-weight: 500;
            white-space: nowrap;
        }

        .rpg-ref-table tbody td:nth-child(2) {
            white-space: nowrap;
        }

        .rpg-ref-table th:nth-child(2),
        .rpg-ref-table td:nth-child(2) {
            width: 70px;
        }

        /* ---- FAQ accordion ---- */
        .rpg-faq details {
            border-top: 1px solid #eeece6;
        }

        .rpg-faq details:last-child {
            border-bottom: 1px solid #eeece6;
        }

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

        .rpg-faq summary::-webkit-details-marker {
            display: none;
        }

        .rpg-faq summary::after {
            content: "+";
            color: #999;
            font-size: 18px;
            font-weight: 300;
            flex-shrink: 0;
            margin-left: 1rem;
        }

        .rpg-faq details[open] summary::after {
            content: "−";
        }

        .rpg-faq details p {
            font-size: 13px;
            padding: 0 0 0.6rem;
            margin: 0;
        }

        /* ---- Footer (lightweight) ---- */
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

        .rpg-footer-ogl a {
            color: #7a7668;
            text-decoration: none;
        }

        .rpg-footer-ogl a:hover {
            text-decoration: underline;
        }

        /* ---- Responsive ---- */
        @media (max-width: 768px) {
            .rpg-seo-spacer {
                display: none;
            }
            .rpg-seo-inner {
                padding: 1.5rem 1rem 4rem;
            }
            .rpg-ref-table {
                font-size: 12px;
            }
            .rpg-ref-table thead th,
            .rpg-ref-table tbody td {
                padding: 0.4rem 0.5rem;
            }
            .rpg-ref-table tbody td:first-child {
                white-space: normal;
            }
            .site-footer {
                margin-bottom: 60px;
            }
        }
    ' );
}
add_action( 'wp_enqueue_scripts', 'vue_app_enqueue_assets' );

// -------------------------
// Render Vue root element
// -------------------------

function vue_app_render_root_element() {
    echo '<div id="app" data-page="price-calculator"></div>';
}

add_action( 'genesis_entry_content', 'vue_app_render_root_element' );

// -----------------------------------------------------------------------------
// SEO content — after main content area
// -----------------------------------------------------------------------------

add_action( 'genesis_after_content', 'rpg_price_calc_seo_content' );

function rpg_price_calc_seo_content() {
    ?>
    <section class="rpg-seo-section">
      <div class="rpg-seo-spacer"></div>
      <div class="rpg-seo-inner">

        <h2>How magic item pricing works in D&amp;D 5e</h2>

        <p>
          The Dungeon Master's Guide provides rarity-based price ranges for
          magic items, but those ranges are enormous — a rare item could cost
          anywhere from 501 to 5,000 gp. That's not a price, it's a shrug.
          This calculator narrows it down using a simple formula:
        </p>

        <p><strong>Final Price = Base Price × Item Category × Disruption × Modifiers × Market × Haggle</strong></p>

        <p>
          Each factor is something the DM can evaluate at a glance. The result
          is a specific number with a fair range, plus a full breakdown showing
          why the item costs what it does.
        </p>

        <h2>Base prices by rarity</h2>

        <p>
          These represent the floor price for a standard, non-disruptive item
          at each rarity tier. A +1 weapon with no special properties lands
          here. Everything else builds on top.
        </p>

        <table class="rpg-ref-table">
          <thead>
            <tr><th>Rarity</th><th>Base price</th></tr>
          </thead>
          <tbody>
            <tr><td>Common</td><td>50 gp</td></tr>
            <tr><td>Uncommon</td><td>1,000 gp</td></tr>
            <tr><td>Rare</td><td>4,000 gp</td></tr>
            <tr><td>Very Rare</td><td>16,000 gp</td></tr>
            <tr><td>Legendary</td><td>25,000 gp</td></tr>
          </tbody>
        </table>

        <h2>Item categories</h2>

        <p>
          Rather than pricing every item type differently, items fall into four
          categories based on function. A Ring of Protection and a Cloak of
          Protection do the same thing — one being a ring doesn't make it
          cost more.
        </p>

        <table class="rpg-ref-table">
          <thead>
            <tr><th>Category</th><th>Mult.</th><th>Includes</th></tr>
          </thead>
          <tbody>
            <tr><td>Weapon</td><td>1.0x</td><td>Swords, bows, daggers — primary value is dealing damage</td></tr>
            <tr><td>Armor / Shield</td><td>1.5x</td><td>Armor and shields — primary value is preventing damage</td></tr>
            <tr><td>Permanent item</td><td>1.0x</td><td>Rings, cloaks, boots, wands, rods, staves, wondrous items</td></tr>
            <tr><td>Consumable</td><td>0.1x</td><td>Potions, scrolls, ammunition — single use, roughly 1/10th of permanent</td></tr>
          </tbody>
        </table>

        <h2>The disruption scale</h2>

        <p>
          This is the key factor most pricing systems miss. Rarity tells you
          how rare an item is. Disruption tells you how much it actually
          costs — because an uncommon item that breaks your campaign is worth
          more than a rare item that doesn't.
        </p>

        <table class="rpg-ref-table">
          <thead>
            <tr><th>Level</th><th>Name</th><th>Mult.</th><th>What it means</th></tr>
          </thead>
          <tbody>
            <tr>
              <td>0</td><td>Cosmetic</td><td>1.0x</td>
              <td>Flavor only. A glowing blade, a cloak that billows dramatically. No mechanical benefit beyond what the rarity provides.</td>
            </tr>
            <tr>
              <td>1</td><td>Minor convenience</td><td>1.5x</td>
              <td>Saves minor time or effort. A cantrip-equivalent ability, a small storage solution, a language aid.</td>
            </tr>
            <tr>
              <td>2</td><td>Meaningful advantage</td><td>2.5x</td>
              <td>Provides a reliable edge without invalidating challenges. A damage bonus, enhanced senses, a social advantage, a useful resistance.</td>
            </tr>
            <tr>
              <td>3</td><td>Challenge bypass</td><td>5x</td>
              <td>Skips or trivializes a specific category of problem — locked doors, language barriers, environmental hazards, deception.</td>
            </tr>
            <tr>
              <td>4</td><td>Encounter reshaping</td><td>10x</td>
              <td>Forces the DM to account for it when designing challenges. Reliable flight, at-will invisibility, undetectable lying, perfect tracking.</td>
            </tr>
            <tr>
              <td>5</td><td>Pillar breaking</td><td>25x</td>
              <td>Trivializes an entire dimension of play — combat survival, overland travel, social manipulation, information gathering.</td>
            </tr>
            <tr>
              <td>6</td><td>Economy breaking</td><td>60x</td>
              <td>Generates unlimited resources, replicates costly services for free, or renders entire professions obsolete.</td>
            </tr>
            <tr>
              <td>7</td><td>Campaign altering</td><td>150x</td>
              <td>Fundamentally changes the premise of the campaign. Distance, barriers, secrets, and scarcity stop functioning as narrative constraints.</td>
            </tr>
            <tr>
              <td>8</td><td>Priceless</td><td>—</td>
              <td>Cannot be bought or sold for any amount of gold. This item is a plot device, a divine gift, or a cosmic anomaly.</td>
            </tr>
          </tbody>
        </table>

        <h2>Market types</h2>

        <p>
          Where the item is being sold matters. A frontier town doesn't have
          the demand to charge full price. An auction house creates competition
          that drives prices above market. And planar markets operate on
          entirely different assumptions about value.
        </p>

        <table class="rpg-ref-table">
          <thead>
            <tr><th>Market</th><th>Mult.</th><th>Description</th></tr>
          </thead>
          <tbody>
            <tr><td>Frontier</td><td>0.7x</td><td>Limited selection, desperate sellers. Low prices but poor availability.</td></tr>
            <tr><td>Standard</td><td>1.0x</td><td>Typical market town or city with regular trade.</td></tr>
            <tr><td>Major city</td><td>1.3x</td><td>High demand, guild-regulated trade, premium pricing.</td></tr>
            <tr><td>Auction house</td><td>1.5–3.0x</td><td>Competitive bidding drives price up unpredictably. Results vary each time.</td></tr>
            <tr><td>Black market</td><td>0.8x</td><td>No questions asked. Discount reflects risk and dubious provenance.</td></tr>
            <tr><td>Fey market</td><td>1.1x</td><td>Gold is worth less than stories, favors, or years of life. Non-monetary costs may apply.</td></tr>
            <tr><td>Planar bazaar</td><td>1.4x</td><td>Sigil, City of Brass, or similar crossroads. Everything available at a premium.</td></tr>
            <tr><td>Infernal emporium</td><td>0.9x</td><td>Devils price precisely. Discounted gold, but contracts may include hidden clauses.</td></tr>
          </tbody>
        </table>

        <h2>Modifiers</h2>

        <p>
          These adjust for specific item properties. Modifiers stack
          multiplicatively — a cursed item that also requires attunement
          gets both discounts applied.
        </p>

        <table class="rpg-ref-table">
          <thead>
            <tr><th>Modifier</th><th>Effect</th></tr>
          </thead>
          <tbody>
            <tr><td>Requires attunement</td><td>-10% — costs an attunement slot</td></tr>
            <tr><td>Limited charges</td><td>-15% — uses per day or total charges</td></tr>
            <tr><td>Cursed or has a drawback</td><td>-30% — the buyer knows about the curse</td></tr>
            <tr><td>Multiple features</td><td>+50% — two or more distinct abilities</td></tr>
            <tr><td>Niche / situational</td><td>-20% — only useful in specific circumstances</td></tr>
            <tr><td>Sentient</td><td>+25% — has personality, may have its own agenda</td></tr>
          </tbody>
        </table>

        <h2>Haggle results</h2>

        <p>
          When a player attempts to negotiate a better price, the outcome
          of their Persuasion check adjusts the final cost. A failed attempt
          insults the merchant and raises the price.
        </p>

        <table class="rpg-ref-table">
          <thead>
            <tr><th>Result</th><th>Effect</th></tr>
          </thead>
          <tbody>
            <tr><td>Failed</td><td>+15% — the merchant is offended</td></tr>
            <tr><td>No haggle</td><td>Listed price</td></tr>
            <tr><td>DC 10</td><td>-5% — modest discount</td></tr>
            <tr><td>DC 15</td><td>-12% — fair bargain</td></tr>
            <tr><td>DC 20</td><td>-20% — impressive negotiation</td></tr>
            <tr><td>Natural 20</td><td>-30% — the merchant respects the audacity</td></tr>
          </tbody>
        </table>

        <p>
          This tool is part of a suite of
          <a href="/kenjis-dungeon-master-tools/">game master tools</a>
          including a
          <a href="/dnd-5e-magic-item-generator/">magic item generator</a>,
          <a href="/ai-powered-dnd-5e-monster-statblock-generator/">statblock generator</a>,
          <a href="/dnd-5e-encounter-generator/">encounter generator</a>,
          <a href="/rpg-ai-npc-generator/">NPC generator</a>,
          <a href="/kenjis-dungeon-generator-2-0/">dungeon generator</a>, and
          <a href="/rpg-setting-generator-and-world-building-tool/">worldbuilding dashboard</a>.
        </p>

        <h3>Frequently asked questions</h3>

        <div class="rpg-faq" itemscope itemtype="https://schema.org/FAQPage">

          <details itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
            <summary itemprop="name">How does the disruption scale work?</summary>
            <div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
              <p itemprop="text">
                The disruption scale ranges from 0 (cosmetic) to 8 (priceless).
                Lower levels (0–2) cover minor conveniences and tactical edges.
                Mid levels (3–5) bypass specific challenges, reshape encounters,
                or trivialize entire pillars of play. High levels (6–8) break
                economies, alter campaigns, or render items unpurchasable. The
                scale is the DM's judgment call — the same item might be a 2
                in a high-magic campaign and a 5 in a gritty one.
              </p>
            </div>
          </details>

          <details itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
            <summary itemprop="name">Why aren't there fixed prices in D&amp;D 5e?</summary>
            <div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
              <p itemprop="text">
                Wizards of the Coast intentionally left magic item pricing
                flexible in 5e to preserve DM control. The Dungeon Master's
                Guide suggests rarity-based ranges but leaves final pricing
                to the table. This calculator provides a systematic framework
                while preserving that flexibility through the disruption scale
                and market modifiers.
              </p>
            </div>
          </details>

          <details itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
            <summary itemprop="name">What do the different markets represent?</summary>
            <div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
              <p itemprop="text">
                Markets reflect where the transaction takes place. A frontier
                town has low demand and desperate sellers, while a major city
                has guild regulation and premium pricing. Planar markets like
                fey courts and infernal emporiums introduce non-monetary
                costs — a fey merchant might accept a cherished memory instead
                of gold, while a devil's discount always comes with a contract.
              </p>
            </div>
          </details>

          <details itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
            <summary itemprop="name">How do I price homebrew items?</summary>
            <div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
              <p itemprop="text">
                Assign a rarity based on power level, choose the category that
                matches the item's primary function, then set the disruption
                slider based on how much it affects your game. A homebrew ring
                that grants darkvision is a meaningful advantage (level 2). A
                homebrew cloak that grants permanent invisibility is encounter
                reshaping (level 4) or higher. Use modifiers to account for
                attunement, charges, or drawbacks.
              </p>
            </div>
          </details>

          <details itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
            <summary itemprop="name">Can I use this to set shop prices?</summary>
            <div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
              <p itemprop="text">
                Yes. Calculate base prices for items in your shop inventory,
                then apply market multipliers based on the settlement type.
                The fair range (75–125% of base) gives you flexibility to
                vary prices between merchants. Use haggle results during play
                to determine final purchase prices at the table.
              </p>
            </div>
          </details>

          <details itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
            <summary itemprop="name">Why is armor priced higher than weapons?</summary>
            <div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
              <p itemprop="text">
                Magical armor and shields are consistently priced at roughly
                1.5x their weapon equivalents across all rarity tiers. A +1
                weapon costs around 1,000 gp while +1 armor costs around
                1,500 gp. This reflects the defensive premium — AC bonuses
                apply to every attack against you, every round, making
                defensive magic more broadly impactful than offensive magic
                in most encounters.
              </p>
            </div>
          </details>

          <details itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
            <summary itemprop="name">What makes this different from other pricing guides?</summary>
            <div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
              <p itemprop="text">
                Most pricing guides assign fixed values to specific items.
                This calculator gives you a framework for pricing any item —
                including homebrew — based on factors you can evaluate at the
                table. The disruption scale is the key difference: it accounts
                for the gap between an item's rarity and its actual game
                impact, which is where most pricing systems break down.
              </p>
            </div>
          </details>

        </div>
      </div>
    </section>
    <?php
}

// -----------------------------------------------------------------------------
// Footer — lightweight single line
// -----------------------------------------------------------------------------

add_action( 'genesis_footer', 'rpg_price_calc_footer' );

function rpg_price_calc_footer() {
    ?>
    <div class="rpg-footer-inner">
      <p class="rpg-footer-ogl">
        A free tool by <a href="https://cros.land">cros.land</a> ·
        <a href="/dnd-5e-magic-item-generator/">Item Generator</a> ·
        <a href="/kenjis-dungeon-master-tools/">All Tools</a> ·
        <a href="https://www.patreon.com/c/ai_rpg_tookit" target="_blank">Patreon</a>
      </p>
    </div>
    <?php
}

// Runs the Genesis loop.
genesis();