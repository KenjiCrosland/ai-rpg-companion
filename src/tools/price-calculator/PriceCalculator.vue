<template>
  <div class="price-calc">
    <div class="price-calc-container">
      <div class="hero-section">
        <h1 class="hero-title">Magic Item Price Calculator</h1>
        <p class="hero-subtitle">
          Calculate fair prices for D&amp;D 5e magic items based on rarity, item
          type, game disruption potential, market conditions, and haggle results.
        </p>
      </div>

      <div class="calculator-form">

    <!-- Rarity -->
    <div class="price-calc__section">
      <label class="price-calc__label">Rarity</label>
      <div class="price-calc__btn-group">
        <button
          v-for="r in rarities"
          :key="r.key"
          :class="['price-calc__btn', { active: rarity === r.key }]"
          @click="rarity = r.key"
        >
          {{ r.label }}
        </button>
      </div>
    </div>

    <!-- Item Category -->
    <div class="price-calc__section">
      <label class="price-calc__label">Item category</label>
      <p class="price-calc__sublabel">
        Based on how the item primarily functions, not its physical form
      </p>
      <div class="price-calc__btn-group">
        <button
          v-for="t in itemTypes"
          :key="t.key"
          :class="['price-calc__btn', { active: itemType === t.key }]"
          @click="itemType = t.key"
        >
          {{ t.label }}
        </button>
      </div>
      <p class="price-calc__hint">{{ currentTypeHint }}</p>
    </div>

    <!-- Disruption Potential -->
    <div class="price-calc__section">
      <label class="price-calc__label">Disruption potential</label>
      <p class="price-calc__sublabel">
        How much does this item disrupt the challenges you can put in front of
        the party?
      </p>
      <div class="price-calc__slider-row">
        <span class="price-calc__slider-label">Cosmetic</span>
        <input
          type="range"
          min="0"
          max="8"
          step="1"
          v-model.number="disruption"
          class="price-calc__slider"
        />
        <span class="price-calc__slider-label right">Priceless</span>
      </div>
      <div class="price-calc__disruption-card">
        <p class="price-calc__disruption-title">
          {{ currentDisruption.name }}
        </p>
        <p class="price-calc__disruption-desc">
          {{ currentDisruption.desc }}
        </p>
        <p
          v-if="currentDisruption.mult !== -1"
          class="price-calc__disruption-mult"
        >
          Multiplier: {{ currentDisruption.mult }}x
        </p>
      </div>
    </div>

    <hr class="price-calc__divider" />

    <!-- Market -->
    <div class="price-calc__section">
      <label class="price-calc__label">Market</label>
      <div class="price-calc__btn-group">
        <button
          v-for="m in markets"
          :key="m.key"
          :class="['price-calc__btn', { active: market === m.key }]"
          @click="selectMarket(m.key)"
        >
          {{ m.label }}
        </button>
      </div>
      <p v-if="market === 'auction'" class="price-calc__hint">
        Competitive bidding drives price up unpredictably. Current result:
        <strong>{{ auctionMult.toFixed(1) }}x</strong> base price.
        <button class="price-calc__reroll" @click="rerollAuction">
          Re-roll auction
        </button>
      </p>
      <p v-else-if="currentMarketHint" class="price-calc__hint">
        {{ currentMarketHint }}
      </p>
    </div>

    <!-- Modifiers -->
    <div class="price-calc__section">
      <label class="price-calc__label">Modifiers</label>
      <div
        v-for="mod in modifiers"
        :key="mod.key"
        class="price-calc__checkbox-row"
      >
        <input
          type="checkbox"
          :id="'mod-' + mod.key"
          v-model="mod.checked"
        />
        <label :for="'mod-' + mod.key">{{ mod.label }}</label>
      </div>
    </div>

    <!-- Haggle -->
    <div class="price-calc__section">
      <label class="price-calc__label">Haggle result</label>
      <div class="price-calc__btn-group">
        <button
          v-for="h in haggles"
          :key="h.key"
          :class="['price-calc__btn', { active: haggle === h.key }]"
          @click="haggle = h.key"
        >
          {{ h.label }}
        </button>
      </div>
    </div>

    <!-- Price Output -->
    <div class="price-calc__output">
      <template v-if="isPriceless">
        <div class="price-calc__priceless">
          <p class="price-calc__priceless-title">Priceless</p>
          <p class="price-calc__priceless-desc">
            This item cannot be bought or sold for gold. It exists outside the
            economy. Its acquisition should be a quest, a bargain with a power
            beyond mortal understanding, or a twist of fate.
          </p>
        </div>
      </template>
      <template v-else>
        <p class="price-calc__price">{{ formattedPrice }} gp</p>
        <p class="price-calc__range">
          <template v-if="market === 'auction'">
            Auction result — re-roll to simulate different bidding outcomes
          </template>
          <template v-else>
            Fair range: {{ formattedLow }} – {{ formattedHigh }} gp
          </template>
        </p>
        <div class="price-calc__breakdown">
          <div
            v-for="(line, i) in breakdown"
            :key="i"
            class="price-calc__breakdown-line"
          >
            <span>{{ line.label }}</span>
            <span
              :class="[
                'price-calc__breakdown-value',
                line.cls === 'pos' ? 'increase' : '',
                line.cls === 'neg' ? 'decrease' : '',
              ]"
            >
              {{ line.value }}
            </span>
          </div>
        </div>
        <p v-if="currentMarketNote" class="price-calc__market-note">
          {{ currentMarketNote }}
        </p>
      </template>
    </div>

      </div>

      <!-- CTA -->
      <div class="price-calc__cta">
        <p>
          Need to create the item?
          <a href="/dnd-5e-magic-item-generator/">
            Try the Magic Item Generator →
          </a>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { CdrButton } from '@rei/cedar';
import '@rei/cedar/dist/style/cdr-button.css';

export default {
  name: 'MagicItemPriceCalculator',
  components: {
    CdrButton,
  },

  data() {
    return {
      rarity: 'common',
      itemType: 'weapon',
      disruption: 0,
      market: 'standard',
      haggle: 'none',
      auctionMult: this.rollAuction(),

      rarities: [
        { key: 'common', label: 'Common' },
        { key: 'uncommon', label: 'Uncommon' },
        { key: 'rare', label: 'Rare' },
        { key: 'very_rare', label: 'Very rare' },
        { key: 'legendary', label: 'Legendary' },
      ],

      basePrices: {
        common: 50,
        uncommon: 1000,
        rare: 4000,
        very_rare: 16000,
        legendary: 25000,
      },

      itemTypes: [
        { key: 'weapon', label: 'Weapon', mult: 1.0 },
        { key: 'armor', label: 'Armor / Shield', mult: 1.5 },
        { key: 'permanent', label: 'Permanent item', mult: 1.0 },
        { key: 'consumable', label: 'Consumable', mult: 0.1 },
      ],

      typeHints: {
        weapon:
          'Swords, bows, daggers — primary value is dealing damage.',
        armor:
          'Armor, shields — primary value is preventing damage. Consistently priced ~1.5x weapons.',
        permanent:
          'Rings, cloaks, boots, wands, rods, staves, wondrous items — any reusable non-weapon, non-armor item.',
        consumable:
          'Potions, scrolls, ammunition, single-use items. Roughly 1/10th of an equivalent permanent item.',
      },

      disruptionLevels: [
        {
          name: 'Cosmetic',
          mult: 1.0,
          desc: 'Flavor only. A glowing blade, a cloak that billows dramatically, a ring that changes color. No mechanical benefit beyond what the rarity already provides.',
        },
        {
          name: 'Minor convenience',
          mult: 1.5,
          desc: "Saves minor time or effort. A cantrip-equivalent ability, a small storage solution, a language aid. Nice to have, never necessary.",
        },
        {
          name: 'Meaningful advantage',
          mult: 2.5,
          desc: "Provides a reliable edge without invalidating challenges. A damage bonus, enhanced senses, a social advantage, a useful resistance. Helpful across situations but the DM doesn't need to redesign anything around it.",
        },
        {
          name: 'Challenge bypass',
          mult: 5,
          desc: 'Skips or trivializes a specific category of problem — locked doors, language barriers, environmental hazards, deception. The DM may need to stop relying on certain obstacle types.',
        },
        {
          name: 'Encounter reshaping',
          mult: 10,
          desc: "Forces the DM to account for it when designing challenges. Reliable flight, at-will invisibility, undetectable lying, perfect tracking. Changes the baseline of what the party can handle in combat, exploration, or social situations.",
        },
        {
          name: 'Pillar breaking',
          mult: 25,
          desc: "Trivializes an entire dimension of play — combat survival, overland travel, social manipulation, information gathering. The campaign must accommodate the item's existence or become trivial in that area.",
        },
        {
          name: 'Economy breaking',
          mult: 60,
          desc: "Generates unlimited resources, replicates costly services for free, or renders entire professions obsolete. Disrupts the world's economic and social assumptions, not just the party's capabilities.",
        },
        {
          name: 'Campaign altering',
          mult: 150,
          desc: "Fundamentally changes the premise of the campaign. Distance, barriers, secrets, and scarcity stop functioning as narrative constraints. Most items here should be quest rewards, not purchases.",
        },
        {
          name: 'Priceless',
          mult: -1,
          desc: 'Cannot be bought or sold for any amount of gold. This item is a plot device, a divine gift, or a cosmic anomaly. If the party has it, the DM intended them to have it.',
        },
      ],

      markets: [
        { key: 'frontier', label: 'Frontier', mult: 0.7 },
        { key: 'standard', label: 'Standard', mult: 1.0 },
        { key: 'city', label: 'Major city', mult: 1.3 },
        { key: 'auction', label: 'Auction house', mult: null },
        { key: 'black', label: 'Black market', mult: 0.8 },
        { key: 'fey', label: 'Fey market', mult: 1.1 },
        { key: 'planar', label: 'Planar bazaar', mult: 1.4 },
        { key: 'infernal', label: 'Infernal emporium', mult: 0.9 },
      ],

      marketHints: {
        frontier:
          'Limited selection, desperate sellers. Low prices but poor availability.',
        standard: '',
        city: 'High demand, guild-regulated trade, premium pricing.',
        auction: '',
        black: 'No questions asked. Discount reflects risk and dubious provenance.',
        fey: 'Gold is worth less than stories, favors, or years of life.',
        planar:
          'Sigil, City of Brass, or similar crossroads. Everything available at a premium.',
        infernal:
          'Devils price precisely. Discounted gold, but contracts may include hidden clauses.',
      },

      marketNotes: {
        fey: 'A fey merchant might accept: a cherished memory, a secret never spoken, seven years of servitude, or the sound of your laughter.',
        infernal:
          'An infernal merchant may offer a further 20% discount in exchange for a minor contractual obligation.',
        planar:
          'Planar merchants often accept soul coins (50 gp each), astral diamonds, or trade in kind.',
        frontier: '',
        standard: '',
        city: '',
        black: '',
        auction: '',
      },

      modifiers: [
        { key: 'attune', label: 'Requires attunement (-10%)', mult: 0.9, checked: false },
        { key: 'charges', label: 'Limited charges / uses per day (-15%)', mult: 0.85, checked: false },
        { key: 'cursed', label: 'Cursed or has a drawback (-30%)', mult: 0.7, checked: false },
        { key: 'multifeature', label: 'Multiple features or abilities (+50%)', mult: 1.5, checked: false },
        { key: 'niche', label: 'Niche / situational use (-20%)', mult: 0.8, checked: false },
        { key: 'sentient', label: 'Sentient or has personality (+25%)', mult: 1.25, checked: false },
      ],

      haggles: [
        { key: 'fail', label: 'Failed', mult: 1.15 },
        { key: 'none', label: 'No haggle', mult: 1.0 },
        { key: 'dc10', label: 'DC 10', mult: 0.95 },
        { key: 'dc15', label: 'DC 15', mult: 0.88 },
        { key: 'dc20', label: 'DC 20', mult: 0.8 },
        { key: 'nat20', label: 'Nat 20', mult: 0.7 },
      ],
    };
  },

  computed: {
    currentTypeHint() {
      return this.typeHints[this.itemType];
    },

    currentDisruption() {
      return this.disruptionLevels[this.disruption];
    },

    currentMarketHint() {
      return this.marketHints[this.market];
    },

    currentMarketNote() {
      return this.marketNotes[this.market];
    },

    isPriceless() {
      return this.currentDisruption.mult === -1;
    },

    currentTypeMult() {
      const type = this.itemTypes.find((t) => t.key === this.itemType);
      return type ? type.mult : 1.0;
    },

    currentMarketMult() {
      if (this.market === 'auction') return this.auctionMult;
      const m = this.markets.find((m) => m.key === this.market);
      return m ? m.mult : 1.0;
    },

    currentHaggleMult() {
      const h = this.haggles.find((h) => h.key === this.haggle);
      return h ? h.mult : 1.0;
    },

    modifierMult() {
      return this.modifiers
        .filter((m) => m.checked)
        .reduce((acc, m) => acc * m.mult, 1.0);
    },

    calculatedPrice() {
      if (this.isPriceless) return 0;
      const base = this.basePrices[this.rarity];
      const total =
        base *
        this.currentTypeMult *
        this.currentDisruption.mult *
        this.modifierMult *
        this.currentMarketMult *
        this.currentHaggleMult;
      return Math.max(1, Math.round(total));
    },

    formattedPrice() {
      return this.calculatedPrice.toLocaleString();
    },

    formattedLow() {
      return Math.round(this.calculatedPrice * 0.75).toLocaleString();
    },

    formattedHigh() {
      return Math.round(this.calculatedPrice * 1.25).toLocaleString();
    },

    breakdown() {
      if (this.isPriceless) return [];

      const lines = [];
      const base = this.basePrices[this.rarity];
      const rarityLabel = this.rarity.replace('_', ' ');

      lines.push({
        label: `Base (${rarityLabel})`,
        value: `${base.toLocaleString()} gp`,
        cls: '',
      });

      // Item type
      const tm = this.currentTypeMult;
      if (tm !== 1.0) {
        if (this.itemType === 'consumable') {
          lines.push({ label: 'Consumable (1/10th)', value: '-90%', cls: 'neg' });
        } else {
          const typeLabel =
            this.itemType === 'armor' ? 'Armor / shield' : 'Permanent item';
          const pct = Math.round((tm - 1) * 100);
          lines.push({
            label: typeLabel,
            value: `+${pct}%`,
            cls: 'pos',
          });
        }
      }

      // Disruption
      const dd = this.currentDisruption;
      if (dd.mult !== 1.0 && dd.mult !== -1) {
        const pct = Math.round((dd.mult - 1) * 100);
        lines.push({
          label: `${dd.name} (${this.disruption}/7)`,
          value: `+${pct}%`,
          cls: 'pos',
        });
      }

      // Modifiers
      this.modifiers
        .filter((m) => m.checked)
        .forEach((m) => {
          const pct = Math.round((m.mult - 1) * 100);
          lines.push({
            label: m.label.replace(/ \([+-].*\)/, ''),
            value: `${pct > 0 ? '+' : ''}${pct}%`,
            cls: pct > 0 ? 'pos' : 'neg',
          });
        });

      // Market
      const mkt = this.currentMarketMult;
      if (this.market === 'auction') {
        const pct = Math.round((mkt - 1) * 100);
        lines.push({
          label: `Auction (${mkt.toFixed(1)}x)`,
          value: `+${pct}%`,
          cls: 'pos',
        });
      } else if (mkt !== 1.0) {
        const marketObj = this.markets.find((m) => m.key === this.market);
        const pct = Math.round((mkt - 1) * 100);
        lines.push({
          label: marketObj.label,
          value: `${pct > 0 ? '+' : ''}${pct}%`,
          cls: pct > 0 ? 'pos' : 'neg',
        });
      }

      // Haggle
      const hm = this.currentHaggleMult;
      if (hm !== 1.0) {
        const haggleObj = this.haggles.find((h) => h.key === this.haggle);
        const pct = Math.round((hm - 1) * 100);
        lines.push({
          label: haggleObj.label === 'Failed' ? 'Bad haggle' : haggleObj.label,
          value: `${pct > 0 ? '+' : ''}${pct}%`,
          cls: pct > 0 ? 'pos' : 'neg',
        });
      }

      return lines;
    },
  },

  methods: {
    rollAuction() {
      return Math.round((1.5 + Math.random() * 1.5) * 10) / 10;
    },

    selectMarket(key) {
      this.market = key;
      if (key === 'auction') {
        this.auctionMult = this.rollAuction();
      }
    },

    rerollAuction() {
      this.auctionMult = this.rollAuction();
    },
  },
};
</script>

<style scoped lang="scss">
@import '@rei/cdr-tokens/dist/scss/cdr-tokens.scss';

.price-calc {
  background-color: #fafafa;
  min-height: 100vh;
  padding: 3rem 2rem;
}

.price-calc-container {
  max-width: 800px;
  margin: 0 auto;
}

/* Hero Section */
.hero-section {
  margin-bottom: 3rem;
  text-align: center;
}

.hero-title {
  font-size: 3rem;
  font-weight: 600;
  margin: 0 0 1rem 0;
  color: #20201d;
  letter-spacing: -0.02em;
}

.hero-subtitle {
  font-size: 1.6rem;
  color: #687076;
  margin: 0 auto;
  line-height: 1.6;
  max-width: 650px;
}

/* Calculator Form */
.calculator-form {
  background-color: #ffffff;
  border: 1px solid #e2e2e2;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  padding: 3rem;
}

/* Sections */
.price-calc__section {
  margin-bottom: 2.5rem;
}

.price-calc__label {
  font-size: 1.4rem;
  font-weight: 500;
  color: #20201d;
  display: block;
  margin-bottom: 0.8rem;
  letter-spacing: -0.016rem;
}

.price-calc__sublabel {
  font-size: 1.3rem;
  color: #687076;
  margin: -0.4rem 0 1rem;
  line-height: 1.6;
}

.price-calc__hint {
  font-size: 1.3rem;
  color: #687076;
  margin-top: 0.8rem;
  line-height: 1.6;
  font-style: italic;
}

/* Button groups */
.price-calc__btn-group {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.price-calc__btn {
  padding: 0.8rem 1.6rem;
  border: 0;
  box-shadow: inset 0 0 0 0.1rem #928b80;
  border-radius: 0.4rem;
  font-size: 1.4rem;
  font-weight: 500;
  cursor: pointer;
  background: rgba(244, 242, 237, 0.15);
  color: #20201d;
  transition: all 0.15s;
  font-family: inherit;
  letter-spacing: -0.016rem;

  &:hover {
    box-shadow: inset 0 0 0 0.1rem #5f584d;
  }

  &.active {
    background: #007a5a;
    color: #ffffff;
    box-shadow: inset 0 0 0 0.1rem #007a5a;
  }
}

/* Slider */
.price-calc__slider-row {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-top: 1rem;
}

.price-calc__slider {
  flex: 1;
  height: 6px;
  cursor: pointer;
  -webkit-appearance: none;
  appearance: none;
  background: linear-gradient(to right, #e5e5e5 0%, #928b80 100%);
  border-radius: 3px;
  outline: none;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    background: #007a5a;
    border-radius: 50%;
    cursor: pointer;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }

  &::-moz-range-thumb {
    width: 20px;
    height: 20px;
    background: #007a5a;
    border-radius: 50%;
    cursor: pointer;
    border: none;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
}

.price-calc__slider-label {
  font-size: 1.3rem;
  color: #687076;
  min-width: 80px;
  font-weight: 500;

  &.right {
    text-align: right;
  }
}

/* Disruption card */
.price-calc__disruption-card {
  margin-top: 1.5rem;
  padding: 1.5rem 2rem;
  background: #f9f9f9;
  border-radius: 8px;
  border: 1px solid #e5e5e5;
}

.price-calc__disruption-title {
  font-size: 1.6rem;
  font-weight: 600;
  color: #20201d;
  margin: 0 0 0.5rem;
}

.price-calc__disruption-desc {
  font-size: 1.4rem;
  color: #333;
  margin: 0;
  line-height: 1.7;
}

.price-calc__disruption-mult {
  font-size: 1.3rem;
  color: #687076;
  margin: 0.75rem 0 0;
  font-weight: 500;
}

/* Divider */
.price-calc__divider {
  border: none;
  border-top: 1px solid #e5e5e5;
  margin: 3rem 0;
}

/* Checkboxes */
.price-calc__checkbox-row {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.2rem;
}

.price-calc__checkbox-row input[type='checkbox'] {
  width: 18px;
  height: 18px;
  cursor: pointer;
  accent-color: #007a5a;
}

.price-calc__checkbox-row label {
  font-size: 1.4rem;
  color: #333;
  cursor: pointer;
  user-select: none;
}

/* Reroll button */
.price-calc__reroll {
  padding: 0.5rem 1.2rem;
  border: 0;
  box-shadow: inset 0 0 0 0.1rem #928b80;
  border-radius: 0.4rem;
  font-size: 1.3rem;
  font-weight: 500;
  cursor: pointer;
  background: rgba(244, 242, 237, 0.15);
  color: #20201d;
  margin-left: 1rem;
  font-family: inherit;
  transition: all 0.15s;

  &:hover {
    box-shadow: inset 0 0 0 0.1rem #5f584d;
  }
}

/* Price output */
.price-calc__output {
  padding: 2.5rem 3rem;
  background: #f9f9f9;
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  margin-top: 3rem;
}

.price-calc__price {
  font-size: 3.5rem;
  font-weight: 700;
  margin: 0 0 0.5rem;
  color: #007a5a;
  letter-spacing: -0.02em;
}

.price-calc__range {
  font-size: 1.5rem;
  color: #687076;
  margin: 0 0 2rem;
}

.price-calc__breakdown {
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid #e5e5e5;
  font-size: 1.4rem;
  color: #333;
  line-height: 2;
}

.price-calc__breakdown-line {
  display: flex;
  justify-content: space-between;
  padding: 0.3rem 0;
}

.price-calc__breakdown-value {
  font-weight: 600;
  color: #20201d;
}

.price-calc__breakdown-value.increase {
  color: #d32f2f;
}

.price-calc__breakdown-value.decrease {
  color: #2e7d32;
}

.price-calc__market-note {
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid #e5e5e5;
  font-size: 1.4rem;
  color: #687076;
  line-height: 1.7;
  font-style: italic;
}

/* Priceless state */
.price-calc__priceless {
  text-align: center;
  padding: 3rem 2rem;
}

.price-calc__priceless-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin: 0 0 1rem;
  color: #6b4e71;
  letter-spacing: -0.02em;
}

.price-calc__priceless-desc {
  font-size: 1.5rem;
  color: #333;
  margin: 0;
  line-height: 1.7;
}

/* CTA */
.price-calc__cta {
  margin-top: 3rem;
  padding: 2rem;
  text-align: center;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
}

.price-calc__cta p {
  font-size: 1.5rem;
  color: #687076;
  margin: 0;
  line-height: 1.6;
}

.price-calc__cta a {
  color: #007a5a;
  font-weight: 600;
  text-decoration: none;
  transition: color 0.15s;

  &:hover {
    color: #005a42;
    text-decoration: underline;
  }
}

/* Responsive */
@media (max-width: 768px) {
  .price-calc {
    padding: 2rem 1rem;
  }

  .hero-title {
    font-size: 2.2rem;
  }

  .hero-subtitle {
    font-size: 1.4rem;
  }

  .calculator-form {
    padding: 2rem 1.5rem;
  }

  .price-calc__btn-group {
    gap: 0.75rem;
  }

  .price-calc__btn {
    padding: 0.7rem 1.2rem;
    font-size: 1.3rem;
  }

  .price-calc__output {
    padding: 2rem 1.5rem;
  }

  .price-calc__price {
    font-size: 2.8rem;
  }
}
</style>
