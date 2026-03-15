import { API_BASE } from './config';

export type AnimalTrend = {
  id: number;
  name: string;
  platform: string;
  likes: number;
  shares: number;
  createdAt?: string;
};

export async function fetchAnimalTrends(): Promise<AnimalTrend[]> {
  const res = await fetch(`${API_BASE}/api/animals/trending`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}
