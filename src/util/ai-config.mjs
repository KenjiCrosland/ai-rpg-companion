/**
 * AI Provider Configuration
 *
 * SECURITY: This file must NEVER contain or reference API keys.
 * Keys are injected server-side by Vite proxy (dev) or WordPress proxy (production).
 *
 * Manages configuration for multiple AI providers (DeepSeek, OpenAI)
 * Supports localStorage override for development testing
 */

const PROVIDERS = {
  DEEPSEEK: 'deepseek-v3',
  OPENAI: 'gpt-4o-mini', // Deprecated fallback
};

const PROVIDER_CONFIGS = {
  [PROVIDERS.DEEPSEEK]: {
    name: 'DeepSeek V3',
    endpoint: 'https://api.deepseek.com/v1/chat/completions',
    devEndpoint: '/api/ai/deepseek', // Proxied in dev - API key injected server-side
    model: 'deepseek-chat',
    type: 'openai-compatible', // Uses OpenAI API format
  },
  [PROVIDERS.OPENAI]: {
    name: 'GPT-4o-mini (Legacy)',
    endpoint: 'https://api.openai.com/v1/chat/completions',
    devEndpoint: '/api/ai/openai', // Proxied in dev - API key injected server-side
    model: 'gpt-4o-mini',
    type: 'openai',
  },
};

const STORAGE_KEY = 'ai-provider-override';

/**
 * Get the current AI provider identifier
 * Priority: localStorage override > environment variable > default
 */
export function getAIProvider() {
  // Check localStorage override (dev testing)
  if (typeof window !== 'undefined') {
    const override = localStorage.getItem(STORAGE_KEY);
    if (override && PROVIDER_CONFIGS[override]) {
      return override;
    }
  }

  // Check environment variable. `__VITE_AI_DEFAULT_PROVIDER__` is
  // injected by Vite's `define` at build time (see vite.config.js).
  // The typeof guard handles Jest's environment, where the constant is
  // undeclared — typeof on an undeclared identifier returns 'undefined'
  // without throwing, so this safely falls through to the default in
  // tests. (Previously read via `import.meta.env`, which can't be
  // parsed by babel-jest's CommonJS transform.)
  const envProvider = typeof __VITE_AI_DEFAULT_PROVIDER__ !== 'undefined'
    ? __VITE_AI_DEFAULT_PROVIDER__
    : '';
  if (envProvider && PROVIDER_CONFIGS[envProvider]) {
    return envProvider;
  }

  // Default to DeepSeek
  return PROVIDERS.DEEPSEEK;
}

/**
 * Get configuration for the current provider
 */
export function getProviderConfig() {
  const provider = getAIProvider();
  return PROVIDER_CONFIGS[provider];
}

/**
 * Set provider override in localStorage (dev testing only)
 */
export function setProviderOverride(provider) {
  if (!PROVIDER_CONFIGS[provider]) {
    throw new Error(`Invalid provider: ${provider}. Valid options: ${Object.keys(PROVIDER_CONFIGS).join(', ')}`);
  }

  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, provider);
    console.log(`✅ AI provider override set to: ${PROVIDER_CONFIGS[provider].name}`);
  }
}

/**
 * Clear provider override
 */
export function clearProviderOverride() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(STORAGE_KEY);
    console.log('✅ AI provider override cleared');
  }
}

/**
 * Get all available providers
 */
export function getAvailableProviders() {
  return Object.entries(PROVIDER_CONFIGS).map(([key, config]) => ({
    key,
    name: config.name,
    model: config.model,
  }));
}

/**
 * Normalize model name to work with current provider
 * Maps OpenAI model names to equivalent models in other providers
 *
 * @param {string} requestedModel - The model name requested (e.g., 'gpt-4.1-mini')
 * @returns {string} - The appropriate model for the current provider
 */
export function normalizeModel(requestedModel) {
  // If no model specified, use provider default
  if (!requestedModel) {
    return getProviderConfig().model;
  }

  // If already using the current provider's model format, return as-is
  const config = getProviderConfig();
  if (requestedModel === config.model) {
    return requestedModel;
  }

  // Map OpenAI model tiers to equivalent models in other providers
  // "Mini" tier models: fast, cheap, good for simple tasks
  const miniModels = ['gpt-4o-mini', 'gpt-4.1-mini'];

  if (miniModels.includes(requestedModel)) {
    // Return the provider's default model (all our defaults are "mini" tier)
    return config.model;
  }

  // For other models, just use the provider default
  // (can extend this mapping if we add more model tiers later)
  return config.model;
}

export { PROVIDERS };
