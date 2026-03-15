import { useEffect, useState } from 'react';
import { API_BASE } from './config';

export type Animal = {
  id: number;
  name: string;
  platform: string;
  likes: number;
  shares: number;
  createdAt?: string;
  thumbnailUrl?: string;
};

const formatNumber = (value: number | undefined) =>
  (value ?? 0).toLocaleString(undefined, { maximumFractionDigits: 0 });

export default function TrendingAnimals() {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  const load = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/api/animals/trending`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data: Animal[] = await res.json();
      setAnimals(data);
      setError('');
    } catch (err) {
      setError('Unable to load trending animals. Check that the API is reachable.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <section className="panel">
      <div className="panel-header">
        <div>
          <span className="badge">Live board</span>
          <h2 style={{ margin: '6px 0 0' }}>Top viral animals</h2>
        </div>
        <div className="meta">
          {loading ? <span>Loading…</span> : <span>{animals.length} entries</span>}
          <button className="ghost" onClick={load} disabled={loading}>
            {loading ? 'Refreshing…' : 'Refresh'}
          </button>
        </div>
      </div>

      {error && <div className="error">{error}</div>}

      <div className="grid">
        {animals.map((animal) => {
          const total = (animal.likes ?? 0) + (animal.shares ?? 0);
          return (
            <article className="tile" key={animal.id}>
              <div className="thumb">
                {animal.thumbnailUrl ? <img src={animal.thumbnailUrl} alt={animal.name} /> : animal.name?.[0] || '?'}
              </div>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'flex-start' }}>
                  <div>
                    <p className="eyebrow" style={{ marginBottom: 4 }}>
                      {animal.platform || 'Unknown platform'}
                    </p>
                    <h3>{animal.name}</h3>
                  </div>
                  <div className="score">
                    <div className="total">{formatNumber(total)}</div>
                    <div className="meta">
                      <span>❤ {formatNumber(animal.likes)}</span>
                      <span>↻ {formatNumber(animal.shares)}</span>
                    </div>
                  </div>
                </div>
                {animal.createdAt && (
                  <p className="meta" style={{ marginTop: 6 }}>
                    Seen {new Date(animal.createdAt).toLocaleString()}
                  </p>
                )}
              </div>
            </article>
          );
        })}
      </div>

      {!loading && !error && animals.length === 0 && (
        <div className="empty-state">No trending animals yet. Add some data to the backend.</div>
      )}
    </section>
  );
}
