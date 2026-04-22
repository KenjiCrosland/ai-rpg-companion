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

        /* ---- Callout box ---- */
        .rpg-callout {
            background: #f4f1e8;
            border-left: 3px solid #5a8a5e;
            padding: 1rem 1.25rem;
            margin: 1.5rem 0 2rem;
            border-radius: 2px;
        }

        .rpg-callout p {
            margin: 0 0 0.5rem;
        }

        .rpg-callout p:last-child {
            margin-bottom: 0;
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
      <div class="rpg-seo-inner">

        <h2>How magic item pricing works</h2>

        <p>
          Most pricing systems rely on rarity, but rarity and power don't line up
          cleanly in 5e. A Decanter of Endless Water is Uncommon and reshapes
          campaigns. A Vicious Weapon is Rare and barely moves the needle. This
          calculator prices items by what they actually do in your game, using a
          nine-level disruption scale.
        </p>

        <p><strong>Final Price = Base Price × Category × Modifiers × Market × Haggle</strong></p>

        <p>
          The disruption level sets the base price directly. Rarity labels appear
          in the disruption table as starting-point guidance, but the pricing
          formula itself is disruption-only.
        </p>

        <h2>How this differs from price lists</h2>

        <p>
          Community price lists like Sane Magic Item Prices and Sane Magic
          Market offer comprehensive lookups for official items based on
          community consensus. They're great for canonical items with
          established values.
        </p>

        <p>
          This calculator is a framework, not a lookup. It prices any item
          based on its actual impact on your game. Use it for homebrew items,
          third-party content, unusual circumstances like exotic markets and
          haggling, or when you want to understand why an item costs what it
          costs. Use a price list for quick lookups of official items.
        </p>

        <h2>Item categories</h2>

        <p>
          Rather than pricing every item type differently, items fall into four
          categories based on function. A Ring of Protection and a Cloak of
          Protection do the same thing: one being a ring doesn't make it
          cost more.
        </p>

        <table class="rpg-ref-table">
          <thead>
            <tr><th>Category</th><th>Mult.</th><th>Includes</th></tr>
          </thead>
          <tbody>
            <tr><td>Weapon</td><td>1.0x</td><td>Swords, bows, daggers. The primary value is dealing damage</td></tr>
            <tr><td>Armor / Shield</td><td>1.5x</td><td>Armor and shields. The primary value is preventing damage</td></tr>
            <tr><td>Permanent item</td><td>1.0x</td><td>Rings, cloaks, boots, wands, rods, staves, wondrous items</td></tr>
            <tr><td>Consumable</td><td>0.1x</td><td>Potions, scrolls, ammunition. Single use, roughly 1/10th of permanent</td></tr>
          </tbody>
        </table>

        <h2>The disruption scale</h2>

        <p>
          This is the key factor most pricing systems miss. Rarity tells you
          how rare an item is. Disruption tells you how much it actually
          costs. An uncommon item that breaks your campaign is worth more
          than a rare item that doesn't.
        </p>

        <table class="rpg-ref-table">
          <thead>
            <tr><th>Level</th><th>Name</th><th>Base price</th><th>Examples and typical rarity</th></tr>
          </thead>
          <tbody>
            <tr>
              <td>0</td><td>Baseline</td><td>100 gp</td>
              <td>Most Common items. Glowing blades, dust-repelling cloaks, self-stirring cups, mood rings.</td>
            </tr>
            <tr>
              <td>1</td><td>Minor convenience</td><td>300 gp</td>
              <td>Helpful Common or low-power Uncommon. Silvered weapons, rain-shedding armor, small storage items, language aids.</td>
            </tr>
            <tr>
              <td>2</td><td>Meaningful advantage</td><td>1,000 gp</td>
              <td>Most Uncommon items. +1 weapons, +1 armor, darkvision items, useful resistances, bonus proficiencies.</td>
            </tr>
            <tr>
              <td>3</td><td>Significant power</td><td>3,000 gp</td>
              <td>Most Rare items. +2 weapons, Flame Tongue, Mithral armor, lie detection, locked door bypass, Bag of Holding.</td>
            </tr>
            <tr>
              <td>4</td><td>Encounter reshaping</td><td>10,000 gp</td>
              <td>Most Very Rare items. Sunblade, Frost Brand, Glamoured Studded Leather, at-will invisibility, reliable flight.</td>
            </tr>
            <tr>
              <td>5</td><td>Pillar breaking</td><td>30,000 gp</td>
              <td>Most Legendary items. Holy Avenger, Vorpal Sword, +3 armor, items that trivialize combat, travel, or social.</td>
            </tr>
            <tr>
              <td>6</td><td>Economy breaking</td><td>80,000 gp</td>
              <td>Outliers that warp value. Decanter of Endless Water (desert game), Alchemy Jug, items replicating costly services for free.</td>
            </tr>
            <tr>
              <td>7</td><td>Campaign altering</td><td>200,000 gp</td>
              <td>Cosmic-scale power. Cubic Gate, Sphere of Annihilation, items that dissolve distance, identity, or scarcity.</td>
            </tr>
            <tr>
              <td>8</td><td>Priceless</td><td>&ndash;</td>
              <td>Not for sale. Plot devices, divine gifts, cosmic anomalies, artifacts tied to the fate of worlds.</td>
            </tr>
          </tbody>
        </table>

        <h2>Disruption depends on your campaign</h2>

        <p>
          The same item lands on different levels in different campaigns. A
          Decanter of Endless Water in a high-magic city campaign counts as a
          minor convenience. In a desert survival campaign, it eliminates the
          central resource management challenge and jumps to an economy
          breaker.
        </p>

        <p>
          Winged Boots in an urban intrigue campaign offer a tactical edge
          during chase scenes. In a hex-crawl wilderness campaign with
          mountain passes and dangerous terrain, they trivialize most
          overland travel.
        </p>

        <p>
          Sending Stones in a dungeon crawl rarely matter much. In a
          city-wide investigation, they change the shape of every mystery.
        </p>

        <p>
          Prices here assume a standard-wealth campaign at mid-tier play. In
          low-magic settings, actual market prices skew higher because supply
          is limited. In high-tier play (levels 11+), the treasure budget grows
          exponentially and these prices may feel low for the party's wealth
          level. The framework still works at any tier; the absolute numbers
          may need adjustment to match your campaign's economic expectations.
        </p>

        <div class="rpg-callout">
          <p><strong>When setting the disruption level, ask two questions:</strong></p>
          <p>1. What does this item let the party skip?</p>
          <p>2. Does my campaign rely on that thing being hard?</p>
          <p>
            If the answer to both is yes, the item is more disruptive in your
            game than its rarity suggests. Price accordingly.
          </p>
        </div>

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
            <tr><td>Auction house</td><td>1.2&ndash;3.0x</td><td>Competitive bidding; range scales with item disruption.</td></tr>
            <tr><td>Black market</td><td>0.8x</td><td>No questions asked. Discount reflects risk and dubious provenance.</td></tr>
            <tr><td>Fey market</td><td>1.1x</td><td>Gold is worth less than stories, favors, or years of life. Non-monetary costs may apply.</td></tr>
            <tr><td>Planar bazaar</td><td>1.4x</td><td>Sigil, City of Brass, or similar crossroads. Everything available at a premium.</td></tr>
            <tr><td>Infernal emporium</td><td>0.9x</td><td>Devils price precisely. Discounted gold, but contracts may include hidden clauses.</td></tr>
          </tbody>
        </table>

        <h2>Modifiers</h2>

        <p>
          These adjust for specific item properties. Modifiers stack
          multiplicatively: a cursed item that also requires attunement
          gets both discounts applied.
        </p>

        <table class="rpg-ref-table">
          <thead>
            <tr><th>Modifier</th><th>Effect</th></tr>
          </thead>
          <tbody>
            <tr><td>Requires attunement</td><td>-10%. Costs an attunement slot</td></tr>
            <tr><td>Limited charges</td><td>-15%. Uses per day or total charges</td></tr>
            <tr><td>Cursed or has a drawback</td><td>-30%. The buyer knows about the curse</td></tr>
            <tr><td>Multiple features</td><td>+50%. Two or more distinct abilities</td></tr>
            <tr><td>Niche / situational</td><td>-20%. Only useful in specific circumstances</td></tr>
            <tr><td>Sentient</td><td>+25%. Has personality, may have its own agenda</td></tr>
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
            <tr><td>Failed</td><td>+15%. The merchant is offended</td></tr>
            <tr><td>No haggle</td><td>Listed price</td></tr>
            <tr><td>DC 10</td><td>-5%. Modest discount</td></tr>
            <tr><td>DC 15</td><td>-12%. Fair bargain</td></tr>
            <tr><td>DC 20</td><td>-20%. Impressive negotiation</td></tr>
            <tr><td>Natural 20</td><td>-30%. The merchant respects the audacity</td></tr>
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
            <summary itemprop="name">Why isn't rarity part of the pricing formula?</summary>
            <div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
              <p itemprop="text">
                Rarity in 5e doesn't reliably indicate power. An Uncommon Decanter
                of Endless Water can reshape a campaign while a Rare Vicious Weapon
                barely affects play. This calculator prices items by their actual
                impact on your game, not by the rarity label. The disruption scale
                table includes rarity guidance to help you find a good starting point,
                but only disruption affects the price.
              </p>
            </div>
          </details>

          <details itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
            <summary itemprop="name">How does the disruption scale work?</summary>
            <div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
              <p itemprop="text">
                The disruption scale ranges from 0 (baseline) to 8 (priceless).
                Lower levels (0 to 2) cover flavor items and minor conveniences.
                Mid levels (3 to 5) bypass specific challenges, reshape
                encounters, or trivialize entire pillars of play. High levels
                (6 to 8) break economies, alter campaigns, or render items
                unpurchasable. The scale is the DM's judgment call. The same
                item might be a 2 in a high-magic campaign and a 5 in a gritty
                one.
              </p>
            </div>
          </details>

          <details itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
            <summary itemprop="name">Does disruption depend on my campaign?</summary>
            <div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
              <p itemprop="text">
                Yes. An item that barely matters in one campaign can dominate
                another. A Decanter of Endless Water is a minor convenience in
                a city campaign and an economy breaker in a desert survival
                game. Winged Boots offer a small tactical edge in an urban
                game and trivialize travel in a wilderness hex crawl. When
                setting the disruption level, ask what the item lets the party
                skip and whether your campaign relies on that thing being
                hard.
              </p>
            </div>
          </details>

          <details itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
            <summary itemprop="name">Why aren't there fixed prices in D&amp;D 5e?</summary>
            <div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
              <p itemprop="text">
                Wizards of the Coast intentionally left magic item pricing
                flexible in 5e to preserve DM control. The Dungeon Master's
                Guide suggests broad ranges but leaves final pricing to the
                table. This calculator provides a systematic framework while
                preserving that flexibility through the disruption scale and
                market modifiers.
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
                costs. A fey merchant might accept a cherished memory instead
                of gold, while a devil's discount always comes with a contract.
              </p>
            </div>
          </details>

          <details itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
            <summary itemprop="name">How do I price homebrew items?</summary>
            <div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
              <p itemprop="text">
                Choose the category that matches the item's primary function, then
                set the disruption slider based on how much the item changes your
                game. A homebrew ring that grants darkvision is a Meaningful advantage
                (Level 2). A homebrew cloak that grants permanent invisibility is
                Encounter reshaping (Level 4) or higher. Use modifiers to account
                for attunement, charges, or drawbacks.
              </p>
            </div>
          </details>

          <details itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
            <summary itemprop="name">Can I use this to set shop prices?</summary>
            <div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
              <p itemprop="text">
                Yes. Calculate base prices for items in your shop inventory,
                then apply market multipliers based on the settlement type.
                The fair range (75 to 125% of base) gives you flexibility to
                vary prices between merchants. Use haggle results during play
                to determine final purchase prices at the table.
              </p>
            </div>
          </details>

          <details itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
            <summary itemprop="name">Why is armor priced higher than weapons?</summary>
            <div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
              <p itemprop="text">
                Magical armor and shields are consistently more valuable than
                weapons of comparable power because defensive bonuses apply to
                every attack against you, every round. A +1 weapon at Meaningful
                advantage level costs 1,000 gp. A +1 shield at the same disruption
                level costs 1,500 gp. The 1.5x multiplier reflects the defensive
                premium.
              </p>
            </div>
          </details>

          <details itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
            <summary itemprop="name">What makes this different from other pricing guides?</summary>
            <div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
              <p itemprop="text">
                Most pricing guides assign fixed values to specific items or rely
                on rarity tiers. This calculator gives you a framework for pricing
                any item, including homebrew, based on factors you can evaluate at
                the table. The disruption scale directly prices items by their
                actual game impact, which is where most pricing systems break down.
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
      <div class="rpg-footer-ogl">
        This content uses the D&amp;D 5e SRD under the
        <a href="https://cros.land/ogl" target="_blank">Open Gaming License</a>
      </div>
    </div>
    <?php
}

// Runs the Genesis loop.
genesis();