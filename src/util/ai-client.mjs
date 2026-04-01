import { getProviderConfig, getAPIKey, getAIProvider, normalizeModel, PROVIDERS } from './ai-config.mjs';
import { getAdapter } from './ai-adapters.mjs';

/**
 * Circuit Breaker State
 * Tracks provider failures and temporarily switches to fallback provider
 * when primary provider is experiencing issues
 */
const circuitBreaker = {
  consecutiveFailures: 0,
  isOpen: false,
  openedAt: null,
  FAILURE_THRESHOLD: 2, // Open circuit after 2 consecutive failures
  COOLDOWN_MS: 5 * 60 * 1000, // 5 minutes
};

/**
 * Check if circuit breaker should allow trying primary provider again
 */
function checkCircuitBreaker() {
  if (!circuitBreaker.isOpen) {
    return false; // Circuit is closed, use primary provider
  }

  // Check if cooldown period has elapsed
  const elapsed = Date.now() - circuitBreaker.openedAt;
  if (elapsed >= circuitBreaker.COOLDOWN_MS) {
    // Reset circuit breaker
    circuitBreaker.isOpen = false;
    circuitBreaker.consecutiveFailures = 0;
    circuitBreaker.openedAt = null;
    console.log('🔄 Circuit breaker reset - trying primary provider again');
    return false;
  }

  return true; // Circuit is still open, use fallback
}

/**
 * Record a provider failure and potentially open circuit breaker
 */
function recordFailure(providerName) {
  circuitBreaker.consecutiveFailures++;

  if (circuitBreaker.consecutiveFailures >= circuitBreaker.FAILURE_THRESHOLD && !circuitBreaker.isOpen) {
    circuitBreaker.isOpen = true;
    circuitBreaker.openedAt = Date.now();
    console.warn(`⚠️ Circuit breaker opened for ${providerName} - switching to fallback provider for ${circuitBreaker.COOLDOWN_MS / 60000} minutes`);
  }
}

/**
 * Record a provider success and reset failure counter
 */
function recordSuccess() {
  if (circuitBreaker.consecutiveFailures > 0) {
    circuitBreaker.consecutiveFailures = 0;
  }
}

/**
 * Get fallback provider configuration
 */
function getFallbackProvider(currentProvider) {
  // If DeepSeek is failing, fall back to OpenAI
  if (currentProvider === PROVIDERS.DEEPSEEK) {
    return PROVIDERS.OPENAI;
  }
  // If OpenAI is failing, there's no fallback
  return null;
}

/**
 * Generate AI response with automatic provider selection and retry logic
 *
 * Supports multiple AI providers (DeepSeek, OpenAI) with automatic
 * fallback and JSON validation. Includes circuit breaker pattern to
 * temporarily switch to fallback provider when primary fails repeatedly.
 *
 * @param {string} prompt - The prompt to send to the AI
 * @param {function} validateJSONKeys - Optional validator for JSON response
 * @param {number} maxAttempts - Maximum retry attempts (default: 3)
 * @param {array} previousContext - Previous conversation context
 * @param {string} model - Override model (uses provider default if not specified)
 * @param {string} providerOverride - Force specific provider (e.g., PROVIDERS.OPENAI)
 * @returns {Promise<string>} - AI response (JSON string if validated, raw text otherwise)
 */
export async function generateGptResponse(
  prompt,
  validateJSONKeys = null,
  maxAttempts = 3,
  previousContext,
  model = null,
  providerOverride = null,
) {
  // Check circuit breaker and potentially use fallback provider
  const primaryProvider = providerOverride || getAIProvider();
  const isCircuitOpen = !providerOverride && checkCircuitBreaker();
  let usingFallback = false;
  let providerConfig;
  let apiKey;

  if (providerOverride) {
    // Use specified provider directly (skip circuit breaker)
    if (providerOverride === PROVIDERS.OPENAI) {
      providerConfig = {
        name: 'GPT-4o-mini',
        endpoint: 'https://api.openai.com/v1/chat/completions',
        devEndpoint: '/api/openai/v1/chat/completions',
        model: 'gpt-4o-mini',
        apiKeyEnvVar: 'VITE_OPENAI_API_KEY',
        type: 'openai',
      };
      apiKey = import.meta.env.VITE_OPENAI_API_KEY;
    } else if (providerOverride === PROVIDERS.DEEPSEEK) {
      providerConfig = {
        name: 'DeepSeek V3',
        endpoint: 'https://api.deepseek.com/v1/chat/completions',
        devEndpoint: '/api/deepseek/v1/chat/completions',
        model: 'deepseek-chat',
        apiKeyEnvVar: 'VITE_DEEPSEEK_API_KEY',
        type: 'openai',
      };
      apiKey = import.meta.env.VITE_DEEPSEEK_API_KEY;
    }
  } else if (isCircuitOpen) {
    const fallbackProvider = getFallbackProvider(primaryProvider);
    if (fallbackProvider && fallbackProvider === PROVIDERS.OPENAI) {
      // Use hardcoded OpenAI fallback config
      providerConfig = {
        name: 'GPT-4o-mini (Fallback)',
        endpoint: 'https://api.openai.com/v1/chat/completions',
        devEndpoint: '/api/openai/v1/chat/completions',
        model: 'gpt-4o-mini',
        apiKeyEnvVar: 'VITE_OPENAI_API_KEY',
        type: 'openai',
      };
      apiKey = import.meta.env.VITE_OPENAI_API_KEY;
      usingFallback = true;
      console.warn(`⚠️ Using fallback provider: ${providerConfig.name}`);
    } else {
      // No fallback available, use primary
      providerConfig = getProviderConfig();
      apiKey = getAPIKey();
    }
  } else {
    // Use primary provider
    providerConfig = getProviderConfig();
    apiKey = getAPIKey();
  }

  const adapter = getAdapter(providerConfig.type);
  // Use provider's default model (model normalization only relevant when user has overridden provider)
  const modelToUse = providerConfig.model;

  // Log provider in dev mode
  if (import.meta.env.DEV) {
    console.log(`🤖 Using AI provider: ${providerConfig.name} (${modelToUse})`);
    if (usingFallback) {
      console.log(`   ⚠️ Using fallback due to circuit breaker`);
    }
  }

  if (!apiKey) {
    throw new Error(`API key not found for provider: ${providerConfig.name}. Set ${providerConfig.apiKeyEnvVar} in .env.local`);
  }

  let attempts = 0;
  let validJson = false;
  let previousJSONString = '';
  let retryPrompt;
  let responseData;
  let validJsonString;
  let providerError = null;

  while (attempts < maxAttempts && !validJson && !providerError) {
    try {
      if (previousJSONString) {
        retryPrompt = `This JSON may not be formatted correctly. If not formatted correctly can you fix it for me? Please only return a valid JSON string and no comments please.
                ${previousJSONString}`;
      }

      // Build messages array
      const messages = [
        { role: 'system', content: 'You are an assistant Game Master.' },
        { role: 'user', content: retryPrompt ? retryPrompt : prompt },
      ];

      // Add previous context if provided
      if (previousContext) {
        messages.splice(1, 0, ...previousContext);
      }

      // Format request using adapter
      const { body, headers } = adapter.formatRequest(messages, modelToUse, apiKey);

      const requestOptions = {
        method: 'POST',
        headers,
        body: JSON.stringify(body),
      };

      let response;
      if (import.meta.env.DEV) {
        // Development: Use Vite proxy to avoid CORS
        const endpoint = providerConfig.devEndpoint || providerConfig.endpoint;
        response = await fetch(endpoint, requestOptions);
      } else {
        // Production: WordPress proxy
        // Add provider hint header for WordPress proxy routing
        const wpRequestOptions = {
          ...requestOptions,
          headers: {
            ...requestOptions.headers,
            'X-AI-Provider': usingFallback ? PROVIDERS.OPENAI : primaryProvider,
          },
        };
        response = await fetch(
          '/wp-json/open-ai-proxy/api/v1/proxy',
          wpRequestOptions,
        );
      }

      if (!response.ok) {
        const errorText = await response.text();
        providerError = new Error(`HTTP ${response.status}: ${errorText}`);
        // Record failure for circuit breaker (only for primary provider, not fallback)
        if (!usingFallback) {
          recordFailure(providerConfig.name);
        }
        throw providerError;
      }

      responseData = await response.json();

      // Check for API errors using adapter
      if (adapter.hasError(responseData)) {
        providerError = new Error(`${providerConfig.name} API error: ${adapter.getErrorMessage(responseData)}`);
        // Record failure for circuit breaker (only for primary provider, not fallback)
        if (!usingFallback) {
          recordFailure(providerConfig.name);
        }
        throw providerError;
      }

      // Extract response content using adapter
      const responseContent = adapter.extractResponse(responseData);

      // Success! Record it for circuit breaker
      if (!usingFallback) {
        recordSuccess();
      }

      if (!validateJSONKeys) {
        return responseContent;
      }

      // Validate JSON response
      validJsonString = extractJSONFromString(responseContent);

      if (!validJsonString) {
        // JSON validation failure - NOT a provider error, just retry
        previousJSONString = responseContent;
        attempts++;
        continue;
      }

      if (validateJSONKeys) {
        validJson = validateJSONKeys(validJsonString);
        if (!validJson) {
          // JSON validation failure - NOT a provider error, just retry
          previousJSONString = responseContent;
        }
      } else {
        validJson = true;
      }
    } catch (error) {
      console.error('Error generating response:', error);
      // If it's a provider error, we already recorded it and set providerError
      // If it's some other error (network, etc), record it
      if (!providerError) {
        providerError = error;
        if (!usingFallback) {
          recordFailure(providerConfig.name);
        }
      }
    }
    attempts++;
  }

  if (providerError) {
    throw providerError;
  }

  if (!validJson) {
    throw new Error(
      'Failed to generate a valid response. Please try again later.',
    );
  }

  return validJsonString;
}

function isValidJson(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

function extractJSONFromString(input) {
  const regex =
    /(?:\{(?:[^{}]|(?:\{(?:[^{}]|(?:\{[^{}]*\}))*\}))*\})|(?:\[(?:[^\[\]]|\[(?:[^\[\]]|\[(?:[^\[\]]|\[[^\[\]]*\])*\])*\])*\])/g;
  const matches = input.match(regex);

  function fixInvalidJSON(jsonString) {
    try {
      JSON.parse(jsonString);
    } catch (e) {
      if (e instanceof SyntaxError) {
        // Try fixing the JSON by removing the extra comma before the closing brace
        jsonString = jsonString.replace(/,\s*}/g, '}');
        jsonString = jsonString.replace(/,\s*]/g, ']');

        // Try parsing the fixed JSON string
        try {
          return JSON.parse(jsonString);
        } catch (e) {
          // If it's still not valid, return false
          return false;
        }
      } else {
        return false;
      }
    }

    return JSON.parse(jsonString);
  }

  if (matches && matches.length > 0) {
    for (const match of matches) {
      const fixedJSON = fixInvalidJSON(match);
      if (fixedJSON) {
        return JSON.stringify(fixedJSON);
      }
    }
  }

  return false;
}
