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

/**
 * Initialize dev controls (only in development)
 */
export function initDevControls() {
  if (process.env.NODE_ENV === 'production') {
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

  // Show help message on load
  console.log('🤖 AI Provider Controls loaded. Type aiControls.help() for commands.');
  console.log(`   Current provider: ${getProviderConfig().name}`);
}
