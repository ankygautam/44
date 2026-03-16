const FALLBACK_URL = 'https://four4-0oyk.onrender.com';

export type AnimalTrend = {
  id: number;
  name: string;
  platform: string;
  likes: number;
  shares: number;
  createdAt?: string;
};

export async function fetchTrends(): Promise<AnimalTrend[]> {
  try {
    const response = await fetch(`${FALLBACK_URL}/api/animals/trending`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    if (!response.ok) {
      throw new Error('API responded with ' + response.status);
    }
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Trend API error:', error);
    return [];
  }
}
