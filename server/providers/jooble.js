import fetch from 'node-fetch';

const BASE = 'https://jooble.org/api';

export async function search(params) {
  if (!process.env.JOOBLE_API_KEY) {
    const error = new Error('Jooble is not configured');
    error.status = 503;
    throw error;
  }

  const page = Number(params.page || 1);
  const count = Number(params.results_per_page || 10);

  const payload = {
    key: process.env.JOOBLE_API_KEY,
    search: String(params.q || ''),
    page,
    count
  };
  if (params.location) payload.location = String(params.location);
  if (params.country) payload.ck = String(params.country).toLowerCase();

  const response = await fetch(BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const error = new Error('Jooble provider error');
    error.status = 502;
    throw error;
  }

  const data = await response.json();
  const jobs = Array.isArray(data.jobs) ? data.jobs.map(normalize) : [];

  return {
    provider: 'jooble',
    country: payload.ck || null,
    jobs
  };
}

function normalize(job) {
  return {
    id: job.id ? `jooble:${job.id}` : null,
    title: job.title || '',
    company: job.company || '',
    location: job.location || '',
    description: job.snippet || job.description || '',
    url: job.link || '',
    provider: 'jooble',
    fetched_at: new Date().toISOString()
  };
}
