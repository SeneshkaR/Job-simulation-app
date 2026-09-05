import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';
import { listProviders, searchJobs } from '../providers/index.js';
import { jobSearchLimiter } from '../middleware/rateLimit.js';
import { validate, jobSearchRules } from '../middleware/validation.js';

const router = Router();

const DEFAULT_PROVIDER = 'adzuna';

function sanitizeQuery(req) {
  return {
    q: String(req.query.q || '').trim(),
    country: String(req.query.country || 'gb').toLowerCase(),
    page: Number(req.query.page || 1),
    results_per_page: Number(req.query.results_per_page || 10),
    location: req.query.location ? String(req.query.location) : ''
  };
}

router.get('/providers', requireAuth, (req, res) => {
  res.json({ providers: listProviders(), default: DEFAULT_PROVIDER });
});

router.get(
  '/search',
  requireAuth,
  jobSearchLimiter,
  validate(jobSearchRules),
  async (req, res, next) => {
    try {
      const params = sanitizeQuery(req);
      if (!params.q) {
        return res.status(400).json({ error: 'Missing query' });
      }

      const requestedProvider = String(req.query.provider || DEFAULT_PROVIDER).toLowerCase();
      const result = await searchJobs(requestedProvider, params);

      res.json({
        provider: result.provider,
        country: result.country,
        count: result.jobs.length,
        jobs: result.jobs,
        fallback: result.fallback || null
      });
    } catch (error) {
      if (error && error.status) {
        return res.status(error.status).json({
          error: error.message,
          details: error.details || null
        });
      }
      next(error);
    }
  }
);

export default router;
