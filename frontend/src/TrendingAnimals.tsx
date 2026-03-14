import { useEffect, useState } from 'react';

export type Animal = {
  id: number;
  name: string;
  platform: string;
  likes: number;
  shares: number;
  createdAt?: string;
  thumbnailUrl?: string;
};

const containerStyle: React.CSSProperties = {
  marginTop: '1.5rem',
  display: 'grid',
  gap: '0.75rem'
};

const cardStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: '56px 1fr',
  alignItems: 'center',
  gap: '0.75rem',
  padding: '0.9rem 1rem',
  borderRadius: '12px',
  border: '1px solid #e2e8f0',
  boxShadow: '0 4px 12px rgba(0,0,0,0.04)',
  background: '#fff'
};

const badgeStyle: React.CSSProperties = {
  background: '#f8fafc',
  border: '1px solid #e2e8f0',
  borderRadius: '10px',
  padding: '0.15rem 0.55rem',
  fontSize: '12px',
  color: '#0f172a',
  width: 'fit-content'
};

const thumbStyle: React.CSSProperties = {
  width: 56,
  height: 56,
  borderRadius: '12px',
  background: '#eef2ff',
  display: 'grid',
  placeItems: 'center',
  fontWeight: 700,
  color: '#4338ca',
  objectFit: 'cover',
  overflow: 'hidden'
};

const metaStyle: React.CSSProperties = {
  display: 'flex',
  gap: '0.75rem',
  color: '#475569',
  fontSize: '14px'
};

export default function TrendingAnimals() {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch('/api/animals/trending');
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data: Animal[] = await res.json();
        setAnimals(data);
      } catch (err) {
        setError('Unable to load trending animals. Is the backend running on :8080?');
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return (
    <section>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <p style={{ margin: 0, textTransform: 'uppercase', letterSpacing: '0.08em', fontSize: 12, color: '#6366f1' }}>
            Trending
          </p>
          <h2 style={{ margin: '0.15rem 0 0.4rem', fontSize: 24 }}>Top viral animals</h2>
        </div>
        {loading && <span style={{ color: '#475569', fontSize: 14 }}>Loading…</span>}
      </div>

      {error && (
        <div style={{ marginTop: '0.75rem', color: '#b91c1c', fontSize: 14 }}>
          {error}
        </div>
      )}

      <div style={containerStyle}>
        {animals.map((animal) => (
          <article key={animal.id} style={cardStyle}>
            {animal.thumbnailUrl ? (
              <img src={animal.thumbnailUrl} alt={animal.name} style={thumbStyle} />
            ) : (
              <div style={thumbStyle}>{animal.name?.charAt(0).toUpperCase() || '?'}</div>
            )}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <h3 style={{ margin: 0, fontSize: 18 }}>{animal.name}</h3>
                  <div style={badgeStyle}>{animal.platform || 'Unknown'}</div>
                </div>
                <div style={{ textAlign: 'right', color: '#0f172a' }}>
                  <div style={{ fontWeight: 700 }}>{(animal.likes || 0) + (animal.shares || 0)} total</div>
                  <div style={metaStyle}>
                    <span>❤ {animal.likes ?? 0}</span>
                    <span>↻ {animal.shares ?? 0}</span>
                  </div>
                </div>
              </div>
            </div>
          </article>
        ))}

        {!loading && !error && animals.length === 0 && (
          <div style={{ padding: '1rem', border: '1px dashed #cbd5e1', borderRadius: 12, color: '#475569' }}>
            No trending animals yet. Add some data to the backend.
          </div>
        )}
      </div>
    </section>
  );
}
