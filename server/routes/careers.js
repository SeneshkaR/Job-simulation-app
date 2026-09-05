import { Router } from 'express';
import fetch from 'node-fetch';
import { requireAuth } from '../middleware/auth.js';
import { listProviders, searchJobs } from '../providers/index.js';

const router = Router();

const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours
const careerCache = new Map();

router.get('/refresh', requireAuth, async (req, res) => {
  try {
    const career = req.query.career ? String(req.query.career).trim() : '';
    if (!career) {
      return res.status(400).json({ error: 'Missing career parameter' });
    }

    // Check if any job provider is configured before calling searchJobs
    const configuredProviders = listProviders();
    if (configuredProviders.length === 0) {
      return res.json({
        career,
        jobCount: 0,
        topSkills: [],
        topLocations: [],
        recentJobs: [],
        fetched_at: new Date().toISOString(),
        _warning: 'No job provider API keys configured'
      });
    }

    const jobResults = await searchJobs(configuredProviders[0], {
      q: career,
      country: 'gb',
      page: 1,
      results_per_page: 30
    });

    const jobs = jobResults.jobs || [];
    const skills = new Set();
    const locations = new Set();

    jobs.forEach(job => {
      if (job.description) {
        const skillKeywords = [
          'python', 'javascript', 'react', 'node', 'sql', 'aws', 'docker', 'kubernetes',
          'machine learning', 'data analysis', 'project management', 'communication',
          'leadership', 'agile', 'scrum', 'cloud', 'devops', 'cybersecurity'
        ];
        skillKeywords.forEach(skill => {
          if (job.description.toLowerCase().includes(skill.toLowerCase())) {
            skills.add(skill);
          }
        });
      }
      if (job.location) locations.add(job.location);
    });

    const insights = {
      career,
      jobCount: jobs.length,
      topSkills: Array.from(skills).slice(0, 15),
      topLocations: Array.from(locations).slice(0, 10),
      recentJobs: jobs.slice(0, 10).map(j => ({
        title: j.title,
        company: j.company,
        location: j.location
      })),
      fetched_at: new Date().toISOString()
    };

    careerCache.set(career, {
      data: insights,
      timestamp: Date.now()
    });

    res.json(insights);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/latest', (req, res) => {
  const career = req.query.career ? String(req.query.career).trim() : '';
  if (!career) {
    return res.status(400).json({ error: 'Missing career parameter' });
  }

  const cached = careerCache.get(career);
  if (!cached || Date.now() - cached.timestamp > CACHE_DURATION) {
    return res.status(404).json({ error: 'Career data not available or expired' });
  }

  res.json(cached.data);
});

router.get('/all', (req, res) => {
  const allCareers = Array.from(careerCache.keys());
  res.json({ careers: allCareers, count: allCareers.length });
});

export default router;
