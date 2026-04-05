/**
 * Development AI Controls
 *
 * Exposes AI provider controls to window object for easy testing in browser console
 * Only active in development mode
 */

import {
  getAIProvider,
  setProviderOverride,
  clearProviderOverride,
  getAvailableProviders,
  getProviderConfig,
  PROVIDERS,
} from './ai-config.mjs';
import { readRateLimitData, writeRateLimitData, clearRateLimitData } from './secure-storage.mjs';

/**
 * Initialize dev controls (only in development)
 */
export function initDevControls() {
  if (!import.meta.env.DEV) {
    return; // Only expose in development
  }

  window.aiControls = {
    /**
     * Set AI provider override
     * @param {string} provider - Provider key (e.g., 'claude-3.5-haiku', 'deepseek-v3', 'gpt-4o-mini')
     */
    setProvider(provider) {
      try {
        setProviderOverride(provider);
        console.log(`✅ AI provider switched to: ${provider}`);
        console.log('🔄 Refresh the page to use the new provider');
      } catch (error) {
        console.error('❌ Error setting provider:', error.message);
        console.log('Available providers:', this.listProviders());
      }
    },

    /**
     * Get current AI provider
     */
    getProvider() {
      const currentProvider = getAIProvider();
      const config = getProviderConfig();
      console.log(`🤖 Current provider: ${config.name} (${currentProvider})`);
      return currentProvider;
    },

    /**
     * Clear provider override (revert to default)
     */
    clearOverride() {
      clearProviderOverride();
      console.log('🔄 Refresh the page to use the default provider');
    },

    /**
     * List all available providers
     */
    listProviders() {
      const providers = getAvailableProviders();
      console.log('📋 Available providers:');
      providers.forEach(p => {
        console.log(`  - ${p.key}: ${p.name} (${p.model})`);
      });
      return providers;
    },

    /**
     * Quick shortcuts for common providers
     */
    useDeepSeek() {
      this.setProvider(PROVIDERS.DEEPSEEK);
    },

    useOpenAI() {
      this.setProvider(PROVIDERS.OPENAI);
    },

    /**
     * Show help
     */
    help() {
      console.log(`
🤖 AI Provider Controls
========================

Commands:
  aiControls.getProvider()        - Show current provider
  aiControls.setProvider(key)     - Switch provider
  aiControls.clearOverride()      - Reset to default
  aiControls.listProviders()      - Show all available providers

Quick shortcuts:
  aiControls.useDeepSeek()        - Switch to DeepSeek V3
  aiControls.useOpenAI()          - Switch to GPT-4o-mini (legacy)

Example:
  aiControls.useDeepSeek()        // Switch to DeepSeek
  // Generate some content to test
  aiControls.useOpenAI()          // Switch to OpenAI
  // Generate same content to compare
      `);
    },
  };

  // Paywall Testing Controls
  window.paywallControls = {
    /**
     * Test as a free user (5 generation limit, no reset)
     */
    testAsFree() {
      localStorage.setItem('dev-premium-mode', 'false');
      console.log('🆓 Testing as FREE user');
      console.log('   - Will hit 5 generation limit');
      console.log('   - Count will NOT reset after generation');
      console.log('   - Refresh page to apply');
    },

    /**
     * Test as a premium user (unlimited, count resets)
     */
    testAsPremium() {
      localStorage.setItem('dev-premium-mode', 'true');
      console.log('💎 Testing as PREMIUM user');
      console.log('   - Unlimited generations');
      console.log('   - Count resets to 0 after each generation');
      console.log('   - Refresh page to apply');
    },

    /**
     * Show current paywall test mode
     */
    status() {
      const isPremium = localStorage.getItem('dev-premium-mode') !== 'false';
      const rateLimitData = readRateLimitData();
      const count = rateLimitData?.count || 0;

      console.log('📊 Paywall Test Status');
      console.log('========================');
      console.log(`Mode: ${isPremium ? '💎 PREMIUM' : '🆓 FREE'}`);
      console.log(`Current count: ${count}/5`);

      if (isPremium) {
        console.log('\n💡 Premium users:');
        console.log('   - Count resets to 0 after each successful generation');
        console.log('   - No limits');
      } else {
        console.log('\n💡 Free users:');
        console.log('   - Count increments: 1, 2, 3, 4, 5');
        console.log('   - Blocked at 6th attempt');
        console.log('   - Resets after 24 hours');
      }

      console.log('\n🔒 Security:');
      console.log('   - Rate limit data is obfuscated in localStorage');
      console.log('   - Integrity hash prevents easy manipulation');
      console.log('   - Tampering triggers automatic reset');

      return { isPremium, count };
    },

    /**
     * Reset generation count to 0
     */
    resetCount() {
      writeRateLimitData(0, null);
      console.log('✅ Generation count reset to 0');
    },

    /**
     * Set count to limit (for testing blocked state)
     */
    setToLimit() {
      writeRateLimitData(5, Date.now());
      console.log('⚠️  Generation count set to 5/5 (at limit)');
      console.log('   - Next generation will be blocked (if in free mode)');
    },

    /**
     * Show help
     */
    help() {
      console.log(`
💎 Paywall Testing Controls (Dev Only)
========================================

Test Modes:
  paywallControls.testAsFree()     - Test as free user (5 limit)
  paywallControls.testAsPremium()  - Test as premium user (unlimited)
  paywallControls.status()         - Show current mode & count

Utilities:
  paywallControls.resetCount()     - Reset generation count to 0
  paywallControls.setToLimit()     - Set count to 5 (test blocked state)

Example Workflow:
  1. paywallControls.testAsFree()  // Switch to free mode
  2. Refresh page
  3. Generate 5 statblocks
  4. 6th generation should be blocked
  5. paywallControls.testAsPremium()  // Switch back to premium
  6. Refresh page
  7. Generate unlimited statblocks
      `);
    },
  };

  // Show help message on load
  console.log('🤖 AI Provider Controls loaded. Type aiControls.help() for commands.');
  console.log(`   Current provider: ${getProviderConfig().name}`);
  console.log('💎 Paywall Controls loaded. Type paywallControls.help() for commands.');

  // Show current paywall mode
  const isPremium = localStorage.getItem('dev-premium-mode') !== 'false';
  console.log(`   Current mode: ${isPremium ? '💎 PREMIUM' : '🆓 FREE'}`);
}
