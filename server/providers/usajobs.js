import fetch from 'node-fetch';

const BASE = 'https://data.usajobs.gov/api/search';

export async function search(params) {
  if (!process.env.USAJOBS_API_KEY || !process.env.USAJOBS_USER_EMAIL) {
    const error = new Error('USAJOBS is not configured');
    error.status = 503;
    throw error;
  }

  const page = Number(params.page || 1);
  const pageSize = Number(params.results_per_page || 10);

  const url = new URL(BASE);
  url.searchParams.set('Keyword', String(params.q || ''));
  url.searchParams.set('Page', String(page));
  url.searchParams.set('ResultsPerPage', String(pageSize));
  if (params.location) url.searchParams.set('LocationName', String(params.location));

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Host': 'data.usajobs.gov',
      'User-Agent': process.env.USAJOBS_USER_EMAIL,
      'Authorization-Key': process.env.USAJOBS_API_KEY
    }
  });

  if (!response.ok) {
    const error = new Error('USAJOBS provider error');
    error.status = 502;
    throw error;
  }

  const data = await response.json();
  const items =
    data &&
    data.SearchResult &&
    Array.isArray(data.SearchResult.SearchResultItems)
      ? data.SearchResult.SearchResultItems
      : [];

  return {
    provider: 'usajobs',
    country: 'us',
    jobs: items.map(normalize)
  };
}

function normalize(item) {
  const match = item && item.MatchedObjectDescriptor ? item.MatchedObjectDescriptor : {};
  const organization =
    match.OrganizationName ||
    (match.Organization && match.Organization.Name) ||
    '';
  const location =
    match.PositionLocationDisplay ||
    (match.PositionLocation && match.PositionLocation.Name) ||
    '';
  const description =
    match.UserArea && match.UserArea.Details && match.UserArea.Details.JobSummary
      ? match.UserArea.Details.JobSummary
      : '';
  const url =
    match.PositionURI ||
    (match.Apply && match.Apply.Uri) ||
    '';

  return {
    id: item && item.PositionID ? `usajobs:${item.PositionID}` : null,
    title: match.PositionTitle || '',
    company: organization,
    location,
    description,
    url,
    provider: 'usajobs',
    fetched_at: new Date().toISOString()
  };
}
