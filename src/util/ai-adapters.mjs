/**
 * AI Provider Adapters
 *
 * SECURITY: Adapters must NEVER set Authorization headers with API keys.
 * Keys are injected server-side by Vite proxy (dev) or WordPress proxy (production).
 *
 * Normalizes request/response format differences between AI providers
 */

/**
 * OpenAI API Adapter (baseline format)
 */
export class OpenAIAdapter {
  /**
   * Format request for OpenAI API
   * @param {Array} messages - Chat messages
   * @param {string} model - Model name
   * @param {string|null} apiKey - DEPRECATED - API keys are injected server-side
   */
  static formatRequest(messages, model, apiKey) {
    const body = {
      model,
      messages,
    };

    // SECURITY: Do NOT set Authorization header
    // API key is injected server-side by proxy
    const headers = {
      'Content-Type': 'application/json',
    };

    return { body, headers };
  }

  /**
   * Extract response content from OpenAI API response
   */
  static extractResponse(responseData) {
    if (!responseData.choices || !responseData.choices[0] || !responseData.choices[0].message) {
      throw new Error('Invalid OpenAI API response structure');
    }

    return responseData.choices[0].message.content;
  }

  /**
   * Check if response has an error
   */
  static hasError(responseData) {
    return !!responseData.error;
  }

  /**
   * Get error message from response
   */
  static getErrorMessage(responseData) {
    if (responseData.error) {
      return responseData.error.message || JSON.stringify(responseData.error);
    }
    return 'Unknown OpenAI API error';
  }
}

/**
 * DeepSeek API Adapter
 * DeepSeek uses OpenAI-compatible API, so we just use OpenAIAdapter
 */
export class DeepSeekAdapter extends OpenAIAdapter {
  // Inherits all methods from OpenAIAdapter
}

/**
 * Get the appropriate adapter for a provider type
 */
export function getAdapter(providerType) {
  switch (providerType) {
    case 'openai':
      return OpenAIAdapter;
    case 'openai-compatible':
      return DeepSeekAdapter;
    default:
      throw new Error(`Unknown provider type: ${providerType}`);
  }
}
