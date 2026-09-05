import { Router } from 'express';
import fetch from 'node-fetch';
import { requireAuth } from '../middleware/auth.js';
import { aiChatLimiter } from '../middleware/rateLimit.js';
import { validate, aiChatRules } from '../middleware/validation.js';
import { listProviders, searchJobs } from '../providers/index.js';

const router = Router();

const SENIOR_SYSTEM_PROMPT = `You are a senior professional mentor with 15+ years of experience in your field. 
You are helping an intern learn about your career. 
- Give specific, actionable advice based on real industry experience
- Share insights about current market trends and salary expectations
- Explain complex concepts in simple terms
- Ask thoughtful questions to guide their learning
- Reference actual job market data when relevant
- Be encouraging but honest about career challenges
- Focus on practical skills and real-world applications`;

// AI provider configuration
const AI_PROVIDERS = {
  mulerun: {
    name: 'MuleRun',
    baseUrl: process.env.MULERUN_API_BASE || 'https://api.mulerun.ai/v1',
    apiKey: process.env.MULERUN_API_KEY,
  },
  openai: {
    name: 'OpenAI',
    baseUrl: 'https://api.openai.com/v1',
    apiKey: process.env.OPENAI_API_KEY,
  },
};

function getAIProvider() {
  // Try MuleRun first, fallback to OpenAI
  if (AI_PROVIDERS.mulerun.apiKey) {
    return { ...AI_PROVIDERS.mulerun, id: 'mulerun' };
  }
  if (AI_PROVIDERS.openai.apiKey) {
    return { ...AI_PROVIDERS.openai, id: 'openai' };
  }
  return null;
}

async function callAI(provider, model, messages, temperature) {
  const url = `${provider.baseUrl}/chat/completions`;
  
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${provider.apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ model, messages, temperature }),
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => 'Unknown error');
    const error = new Error(`AI provider error (${provider.name}): ${response.status}`);
    error.status = response.status;
    error.details = errorText;
    throw error;
  }

  return response.json();
}

router.post(
  '/chat',
  requireAuth,
  aiChatLimiter,
  validate(aiChatRules),
  async (req, res, next) => {
    try {
      let messages = Array.isArray(req.body && req.body.messages) ? req.body.messages : [];
      const model = String((req.body && req.body.model) || 'gpt-4o-mini');
      const temperature = Number((req.body && req.body.temperature) ?? 0.6);
      const colleagueRole = req.body && req.body.colleagueRole ? String(req.body.colleagueRole) : null;
      const careerContext = req.body && req.body.careerContext ? String(req.body.careerContext) : null;

      const provider = getAIProvider();
      if (!provider) {
        // FIX (Bug #3): Clear error message telling the developer exactly what to do
        return res.status(500).json({
          error: 'AI is not configured — set MULERUN_API_KEY or OPENAI_API_KEY in server/.env',
          hint: 'Create a server/.env file with MULERUN_API_KEY=your-key or OPENAI_API_KEY=sk-...'
        });
      }

      if (messages.length === 0 || !messages.every(m => m && typeof m.role === 'string' && typeof m.content === 'string')) {
        return res.status(400).json({ error: 'Invalid messages' });
      }

      // Add senior mentor context
      const systemMessage = {
        role: 'system',
        content: SENIOR_SYSTEM_PROMPT + 
          (colleagueRole ? `\n\nYou are specifically playing the role of: ${colleagueRole}` : '') +
          (careerContext ? `\n\nCurrent career context:\n${careerContext}` : '')
      };

      const enhancedMessages = [systemMessage, ...messages];

      // Try primary provider, fallback to secondary
      let data;
      let usedProvider = provider;
      
      try {
        data = await callAI(provider, model, enhancedMessages, temperature);
      } catch (error) {
        // If MuleRun fails, try OpenAI as fallback
        if (provider.id === 'mulerun' && AI_PROVIDERS.openai.apiKey) {
          console.warn('MuleRun failed, falling back to OpenAI:', error.message);
          usedProvider = { ...AI_PROVIDERS.openai, id: 'openai' };
          data = await callAI(usedProvider, model, enhancedMessages, temperature);
        } else {
          throw error;
        }
      }

      res.json({
        model: data.model || model,
        message: data.choices && data.choices[0] && data.choices[0].message ? data.choices[0].message : null,
        usage: data.usage || null,
        provider: usedProvider.name,
      });
    } catch (error) {
      if (error && error.status) {
        return res.status(error.status).json({ error: error.message, details: error.details || null });
      }
      next(error);
    }
  }
);

router.get(
  '/career-insights',
  requireAuth,
  async (req, res, next) => {
    try {
      const career = req.query.career ? String(req.query.career).trim() : '';
      if (!career) {
        return res.status(400).json({ error: 'Missing career parameter' });
      }

      // FIX (Bug #6): Check if any job provider is configured before calling searchJobs.
      // If not, return a graceful empty response instead of crashing.
      const configuredProviders = listProviders();
      if (configuredProviders.length === 0) {
        console.warn('[ai] No job providers configured — returning empty career insights');
        return res.json({
          career,
          jobCount: 0,
          topSkills: [],
          topLocations: [],
          salaryIndicators: [],
          recentJobs: [],
          fetched_at: new Date().toISOString(),
          _warning: 'No job provider API keys configured (ADZUNA_APP_ID, JOOBLE_API_KEY, or USAJOBS_API_KEY)'
        });
      }

      // Fetch recent job postings for this career
      const jobResults = await searchJobs(configuredProviders[0], {
        q: career,
        country: 'gb',
        page: 1,
        results_per_page: 20
      });

      const jobs = jobResults.jobs || [];

      // Analyze job trends
      const skills = new Set();
      const locations = new Set();
      const salaryHints = [];

      jobs.forEach(job => {
        if (job.description) {
          // Extract common skills (simple keyword matching)
          const skillKeywords = ['python', 'javascript', 'react', 'node', 'sql', 'aws', 'docker', 'kubernetes', 
                                 'machine learning', 'data analysis', 'project management', 'communication'];
          skillKeywords.forEach(skill => {
            if (job.description.toLowerCase().includes(skill.toLowerCase())) {
              skills.add(skill);
            }
          });
        }
        if (job.location) locations.add(job.location);
        if (job.description && job.description.match(/\$\d+|\d+k|salary/i)) {
          salaryHints.push(job.description.match(/\$\d+|\d+k|salary/i)[0]);
        }
      });

      const insights = {
        career,
        jobCount: jobs.length,
        topSkills: Array.from(skills).slice(0, 10),
        topLocations: Array.from(locations).slice(0, 5),
        salaryIndicators: salaryHints.slice(0, 5),
        recentJobs: jobs.slice(0, 5).map(j => ({
          title: j.title,
          company: j.company,
          location: j.location
        })),
        fetched_at: new Date().toISOString()
      };

      res.json(insights);
    } catch (error) {
      // FIX: Return empty insights on error instead of crashing
      console.error('[ai] Career insights error:', error.message);
      res.json({
        career: req.query.career || '',
        jobCount: 0,
        topSkills: [],
        topLocations: [],
        salaryIndicators: [],
        recentJobs: [],
        fetched_at: new Date().toISOString(),
        _error: error.message
      });
    }
  }
);

export default router;
