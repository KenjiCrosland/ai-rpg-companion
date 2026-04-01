/**
 * AI Provider Adapters
 *
 * Normalizes request/response format differences between AI providers
 */

/**
 * OpenAI API Adapter (baseline format)
 */
export class OpenAIAdapter {
  /**
   * Format request for OpenAI API
   */
  static formatRequest(messages, model, apiKey) {
    const body = {
      model,
      messages,
    };

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
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
