const renderFallback = 'https://four4-0oyk.onrender.com';

export const API_BASE =
  import.meta.env.VITE_API_URL ??
  (typeof window !== 'undefined' &&
  (window.location.hostname.includes('github.io') ||
    window.location.hostname.includes('3xample.ca'))
    ? renderFallback
    : '');
