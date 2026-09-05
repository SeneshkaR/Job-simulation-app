import fetch from 'node-fetch';

const BASE = 'https://api.adzuna.com/v1/api/jobs';

export async function search(params) {
  if (!process.env.ADZUNA_APP_ID || !process.env.ADZUNA_API_KEY) {
    const error = new Error('Adzuna is not configured');
    error.status = 503;
    throw error;
  }

  const country = String(params.country || 'gb').toLowerCase();
  const page = Number(params.page || 1);
  const results = Number(params.results_per_page || 10);

  const url = new URL(`${BASE}/${country}/search/${page}`);
  url.searchParams.set('app_id', process.env.ADZUNA_APP_ID);
  url.searchParams.set('app_key', process.env.ADZUNA_API_KEY);
  url.searchParams.set('results_per_page', String(results));
  url.searchParams.set('what', String(params.q || ''));
  if (params.location) url.searchParams.set('where', String(params.location));

  const response = await fetch(url, { method: 'GET' });
  if (!response.ok) {
    const error = new Error('Adzuna provider error');
    error.status = 502;
    throw error;
  }

  const data = await response.json();
  return {
    provider: 'adzuna',
    country,
    jobs: Array.isArray(data.results) ? data.results.map(normalize) : []
  };
}

function normalize(job) {
  return {
    id: job.id ? `adzuna:${job.id}` : null,
    title: job.title || '',
    company: job.company && job.company.display_name ? job.company.display_name : '',
    location: job.location && job.location.display_name ? job.location.display_name : '',
    description: job.description || '',
    url: job.redirect_url || '',
    provider: 'adzuna',
    fetched_at: new Date().toISOString()
  };
}
