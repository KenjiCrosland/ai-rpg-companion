// SECURITY: This file must NEVER contain or reference API keys.
// Keys are injected server-side by Vite proxy (dev) or WordPress proxy (production).
// If you see any key references here, it is a security vulnerability.

import { getProviderConfig, getAIProvider, normalizeModel, PROVIDERS } from './ai-config.mjs';
import { getAdapter } from './ai-adapters.mjs';
import { logger } from './logger.mjs';

// Vite statically replaces `process.env.NODE_ENV` at build time, so
// this resolves to a literal boolean in production bundles. Previously
// we used `import.meta.env.DEV` here, but babel-jest transpiles `.mjs`
// files to CommonJS for Jest's runtime and CommonJS doesn't support
// `import.meta` — every spec that transitively imported this file blew
// up with "Cannot use 'import.meta' outside a module." This form parses
// and runs in all three environments (Vite dev, Vite prod, Jest).
const __DEV__ = process.env.NODE_ENV !== 'production';

/**
 * Circuit Breaker State
 * Tracks provider failures and flips degraded mode when the primary keeps failing
 * when primary provider is experiencing issues
 */
const circuitBreaker = {
  consecutiveFailures: 0,
  isOpen: false,
  openedAt: null,
  FAILURE_THRESHOLD: 2, // Open circuit after 2 consecutive failures
  // An hour, not minutes (owner call, 2026-07-24): during a sustained
  // provider incident, every re-probe costs a ~40s dead 502 wait — pay
  // that at most once an hour, not every five minutes.
  COOLDOWN_MS: 60 * 60 * 1000,
};

// The open state persists across reloads: without this, every fresh page
// re-pays the two-failure discovery cost (two ~40s stalls) before the
// breaker re-opens.
const BREAKER_STORAGE_KEY = 'ai-breaker-open-until';

function hydrateBreakerFromStorage() {
  if (circuitBreaker.isOpen || typeof window === 'undefined') return;
  const until = Number(localStorage.getItem(BREAKER_STORAGE_KEY));
  if (!until) return;
  if (Date.now() < until) {
    circuitBreaker.isOpen = true;
    circuitBreaker.openedAt = until - circuitBreaker.COOLDOWN_MS;
  } else {
    localStorage.removeItem(BREAKER_STORAGE_KEY);
  }
}

function persistBreakerOpen() {
  if (typeof window !== 'undefined') {
    localStorage.setItem(BREAKER_STORAGE_KEY, String(Date.now() + circuitBreaker.COOLDOWN_MS));
  }
}

function clearPersistedBreaker() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(BREAKER_STORAGE_KEY);
  }
}

// Hang guard, not a latency target: genuinely long generations are normal
// (big prompts, loaded providers), so this only cuts calls that are almost
// certainly dead — and stays under Chrome's own ~300s fetch cutoff so a
// hung call surfaces as OUR timeout instead of a generic network error
// minutes later.
const REQUEST_TIMEOUT_MS = 240_000;

/**
 * Check if circuit breaker should allow trying primary provider again
 */
function checkCircuitBreaker() {
  hydrateBreakerFromStorage();
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
    clearPersistedBreaker();
    logger.log('🔄 Circuit breaker reset - trying primary provider again');
    return false;
  }

  return true; // Circuit is still open — degraded mode
}

/**
 * Record a provider failure and potentially open circuit breaker
 */
function recordFailure(providerName) {
  circuitBreaker.consecutiveFailures++;

  if (circuitBreaker.consecutiveFailures >= circuitBreaker.FAILURE_THRESHOLD && !circuitBreaker.isOpen) {
    circuitBreaker.isOpen = true;
    circuitBreaker.openedAt = Date.now();
    persistBreakerOpen();
    logger.warn(`⚠️ Circuit breaker opened for ${providerName} — generations run in degraded mode for ${circuitBreaker.COOLDOWN_MS / 60000} minutes`);
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
 * True when generations should relax their final validation gates — either
 * the user switched to the weaker OpenAI model outright, or the primary
 * provider is failing repeatedly (open breaker). There is NO automatic
 * provider failover: routing to a fallback whose key may not exist turned
 * one bad patch of failures into a total outage (live: an open breaker
 * sent every call to a keyless OpenAI endpoint, 401 after 401, and three
 * consecutive generations shipped as never-fail placeholder blocks while
 * the primary was healthy again). Calls fail honestly on the primary;
 * degraded mode is a validation posture, not a routing decision.
 */
export function isDegradedMode() {
  return getAIProvider() === PROVIDERS.OPENAI || checkCircuitBreaker();
}

/**
 * Generate AI response with automatic provider selection and retry logic
 *
 * Supports multiple AI providers (DeepSeek, OpenAI) with JSON validation.
 * A circuit breaker tracks repeated primary-provider failures and flips
 * isDegradedMode() so content pipelines relax their validation gates —
 * it never reroutes calls (see isDegradedMode).
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
  // Calls always run on the selected provider — no automatic failover (see
  // isDegradedMode). An explicit providerOverride (dev aiControls) still
  // goes exactly where it's told.
  const primaryProvider = providerOverride || getAIProvider();
  let providerConfig;

  if (providerOverride === PROVIDERS.OPENAI) {
    providerConfig = {
      name: 'GPT-4o-mini',
      endpoint: 'https://api.openai.com/v1/chat/completions',
      devEndpoint: '/api/ai/openai',
      model: 'gpt-4o-mini',
      type: 'openai',
    };
  } else if (providerOverride === PROVIDERS.DEEPSEEK) {
    providerConfig = {
      name: 'DeepSeek V4 Flash',
      endpoint: 'https://api.deepseek.com/v1/chat/completions',
      devEndpoint: '/api/ai/deepseek',
      model: 'deepseek-flash',
      type: 'openai',
    };
  } else {
    providerConfig = getProviderConfig();
  }

  // Breaker bookkeeping tracks the PRIMARY provider only: explicit override
  // calls must neither record failures against it nor reset its failure
  // count on success.
  const skipBreaker = !!providerOverride;

  const adapter = getAdapter(providerConfig.type);
  // Use provider's default model (model normalization only relevant when user has overridden provider)
  const modelToUse = providerConfig.model;

  // Log provider in dev mode
  if (__DEV__) {
    logger.log(`🤖 Using AI provider: ${providerConfig.name} (${modelToUse})`);
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
      // The fix-the-JSON prompt is right ONLY when no JSON could be extracted.
      // When the JSON parsed and the VALIDATOR rejected it, re-sending the
      // reply with "fix the formatting" hands back the same rejected draft
      // every attempt (three identical trait drafts on every failed repair,
      // 2026-09-21). A semantic rejection resamples the ORIGINAL prompt.
      retryPrompt = previousJSONString
        ? `This JSON may not be formatted correctly. If not formatted correctly can you fix it for me? Please only return a valid JSON string and no comments please.
                ${previousJSONString}`
        : undefined;

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
      // SECURITY: Do NOT pass API key - it's injected server-side by proxy
      const { body, headers } = adapter.formatRequest(messages, modelToUse, null);

      const requestOptions = {
        method: 'POST',
        headers,
        body: JSON.stringify(body),
      };

      // Hang guard: abort after REQUEST_TIMEOUT_MS.
      const abort = new AbortController();
      const timeoutId = setTimeout(() => abort.abort(), REQUEST_TIMEOUT_MS);
      requestOptions.signal = abort.signal;

      let response;
      if (__DEV__) {
        // Development: Use Vite proxy - API key injected server-side
        const endpoint = providerConfig.devEndpoint;
        response = await fetch(endpoint, requestOptions).finally(() => clearTimeout(timeoutId));
      } else {
        // Production: WordPress proxy - API key injected server-side
        // Add provider hint header for WordPress proxy routing
        const wpRequestOptions = {
          ...requestOptions,
          headers: {
            ...requestOptions.headers,
            'X-AI-Provider': primaryProvider,
          },
        };
        wpRequestOptions.signal = abort.signal;
        response = await fetch(
          '/wp-json/open-ai-proxy/api/v1/proxy',
          wpRequestOptions,
        ).finally(() => clearTimeout(timeoutId));
      }

      if (!response.ok) {
        const errorText = await response.text();
        providerError = new Error(`HTTP ${response.status}: ${errorText}`);
        providerError.status = response.status;
        // Record failure for circuit breaker (primary provider only)
        if (!skipBreaker) {
          recordFailure(providerConfig.name);
        }
        throw providerError;
      }

      responseData = await response.json();

      // Check for API errors using adapter
      if (adapter.hasError(responseData)) {
        providerError = new Error(`${providerConfig.name} API error: ${adapter.getErrorMessage(responseData)}`);
        // Record failure for circuit breaker (primary provider only)
        if (!skipBreaker) {
          recordFailure(providerConfig.name);
        }
        throw providerError;
      }

      // Extract response content using adapter
      const responseContent = adapter.extractResponse(responseData);

      // Success! Record it for circuit breaker
      if (!skipBreaker) {
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
          // parsed but REJECTED by the validator: resample the original prompt
          previousJSONString = '';
        }
      } else {
        validJson = true;
      }
    } catch (error) {
      if (error?.name === 'AbortError') {
        error.timedOut = true;
        error.message = `${providerConfig.name} request timed out after ${REQUEST_TIMEOUT_MS / 1000}s`;
      }
      logger.error('Error generating response:', error);
      // If it's a provider error, we already recorded it and set providerError
      // If it's some other error (network, timeout, etc), record it
      if (!providerError) {
        providerError = error;
        if (!skipBreaker) {
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
