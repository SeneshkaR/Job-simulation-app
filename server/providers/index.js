import * as adzuna from './adzuna.js';
import * as jooble from './jooble.js';
import * as usajobs from './usajobs.js';

const providers = {
  adzuna,
  jooble,
  usajobs,
};

/**
 * Returns an array of provider names that are currently configured
 * (i.e. their required environment variables are present).
 */
export function listProviders() {
  const configured = [];

  if (process.env.ADZUNA_APP_ID && process.env.ADZUNA_API_KEY) {
    configured.push('adzuna');
  }
  if (process.env.JOOBLE_API_KEY) {
    configured.push('jooble');
  }
  if (process.env.USAJOBS_API_KEY && process.env.USAJOBS_USER_EMAIL) {
    configured.push('usajobs');
  }

  return configured;
}

/**
 * Dispatches a job search to the requested provider.
 * Falls back to the first configured provider if the requested one is unavailable.
 *
 * @param {string} providerName - 'adzuna' | 'jooble' | 'usajobs'
 * @param {object} params - Search parameters (q, country, page, results_per_page, location)
 * @returns {Promise<object>} - { provider, country, jobs }
 */
export async function searchJobs(providerName, params) {
  const provider = providers[providerName];

  if (!provider) {
    const error = new Error(`Unknown provider: ${providerName}`);
    error.status = 400;
    throw error;
  }

  try {
    return await provider.search(params);
  } catch (err) {
    // If the requested provider is not configured (503), try fallbacks
    if (err.status === 503) {
      const configured = listProviders().filter((name) => name !== providerName);
      for (const fallbackName of configured) {
        try {
          const result = await providers[fallbackName].search(params);
          result.fallback = fallbackName;
          return result;
        } catch (fallbackErr) {
          // Continue to next fallback
        }
      }
    }
    throw err;
  }
}
