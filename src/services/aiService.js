// AI service — calls the protected backend instead of OpenAI directly.

// FIX (Bug #4): Make BACKEND_URL configurable via env var instead of hardcoded localhost.
// For Expo on a physical phone, use your machine's LAN IP (e.g. http://192.168.1.5:3000).
// For web or simulator, use http://localhost:3000.
const BACKEND_URL = process.env.EXPO_PUBLIC_BACKEND_URL || 'http://localhost:3000';

// FIX (Bug #1 + #2): Properly handle auth header when Firebase is not configured.
// Now imports `app` correctly from firebase.js (which now exports it).
async function getAuthHeader() {
  try {
    const { getAuth } = await import('firebase/auth');
    const { app, isConfigured } = await import('./firebase.js');

    // If Firebase isn't configured at all, skip auth — server dev bypass will handle it
    if (!isConfigured || !app) {
      return {};
    }

    const auth = getAuth(app);
    const user = auth.currentUser;
    if (!user) {
      console.warn('[aiService] No Firebase user logged in — request sent without auth token');
      return {};
    }
    const token = await user.getIdToken();
    return { Authorization: `Bearer ${token}` };
  } catch (error) {
    console.warn('[aiService] Failed to get auth header:', error.message);
    return {};
  }
}

export async function sendChat(messages, options = {}) {
  const headers = await getAuthHeader();
  const response = await fetch(`${BACKEND_URL}/api/ai/chat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...headers
    },
    body: JSON.stringify({
      messages,
      model: options.model || 'gpt-4o-mini',
      temperature: options.temperature ?? 0.6,
      colleagueRole: options.colleagueRole || null,
      careerContext: options.careerContext || null
    })
  });

  if (!response.ok) {
    // FIX: Parse error body for better error messages
    let errorMessage = 'AI request failed';
    try {
      const errorBody = await response.json();
      if (errorBody.error) {
        errorMessage = errorBody.error;
      }
    } catch (_) {}

    // Provide actionable messages for common failures
    if (response.status === 401) {
      errorMessage = 'Please log in to chat with your colleague.';
    } else if (response.status === 403) {
      errorMessage = 'Access denied. Check your account permissions.';
    } else if (response.status === 429) {
      errorMessage = 'Rate limit reached. Please wait a moment and try again.';
    } else if (response.status === 500 || response.status === 502) {
      // Could be AI provider misconfigured or server error
      if (errorMessage.includes('not configured')) {
        errorMessage = 'AI is not set up yet. Ask the developer to add API keys on the server.';
      } else if (errorMessage.includes('auth not configured')) {
        errorMessage = 'Server needs setup. Ask the developer to configure Firebase or dev bypass.';
      }
    }

    const error = new Error(errorMessage);
    error.status = response.status;
    throw error;
  }
  return response.json();
}

export async function getCareerInsights(career) {
  const headers = await getAuthHeader();
  const params = new URLSearchParams({ career });
  const response = await fetch(`${BACKEND_URL}/api/ai/career-insights?${params}`, {
    method: 'GET',
    headers
  });
  if (!response.ok) {
    // FIX: Don't throw — return null so UI degrades gracefully
    console.warn(`[aiService] Career insights request failed (${response.status})`);
    return null;
  }
  return response.json();
}

export async function searchJobs(query, options = {}) {
  const headers = await getAuthHeader();
  const params = new URLSearchParams({
    q: query || '',
    country: options.country || 'gb',
    page: String(options.page || 1),
    results_per_page: String(options.results || 10),
    provider: options.provider || 'adzuna'
  });
  if (options.location) {
    params.append('location', String(options.location));
  }
  const response = await fetch(`${BACKEND_URL}/api/jobs/search?${params}`, {
    method: 'GET',
    headers
  });
  if (!response.ok) {
    throw new Error('Job search failed');
  }
  return response.json();
}

export async function getJobProviders() {
  const headers = await getAuthHeader();
  const response = await fetch(`${BACKEND_URL}/api/jobs/providers`, {
    method: 'GET',
    headers
  });
  if (!response.ok) {
    throw new Error('Failed to load providers');
  }
  return response.json();
}

// FIX (Bug #7): Removed unused _openaiKey parameter.
// The OpenAI key stored in app Settings was NEVER sent to the server.
// All AI calls go through the backend, which uses its own MULERUN_API_KEY or OPENAI_API_KEY.
export async function chatWithColleague(colleague, history, text, context = {}) {
  const messages = history.map(msg => ({
    role: msg.role || 'user',
    content: msg.content || ''
  }));
  messages.push({ role: 'user', content: text });

  const options = {
    model: context.model || 'gpt-4o-mini',
    temperature: context.temperature ?? 0.6,
    colleagueRole: colleague.title || colleague.name || null,
    careerContext: context.careerTitle || context.currentTask || null
  };

  const data = await sendChat(messages, options);
  return data && data.message ? data.message : null;
}

export async function scorePerformance(messages, context = {}) {
  const options = {
    model: context.model || 'gpt-4o-mini',
    temperature: context.temperature ?? 0.4,
    colleagueRole: null,
    careerContext: context.trialType || null
  };

  const data = await sendChat(messages, options);
  return data && data.message ? data.message : null;
}
