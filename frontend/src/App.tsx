import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import TrendCard from './components/TrendCard';
import TrendChart from './components/TrendChart';
import PlatformBadge from './components/PlatformBadge';
import About from './About';
import { API_BASE } from './config';

const colorMap: Record<string, string> = {
  Reddit: '#ff4500',
  X: '#60a5fa',
  TikTok: '#22d3ee',
  YouTube: '#facc15',
  News: '#a855f7'
};

function App() {
  const getRoute = () => (window.location.hash.replace('#', '') || '/');
  const [route, setRoute] = useState<string>(getRoute());
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [animalTrends, setAnimalTrends] = useState<
    { id: number; name: string; platform: string; likes: number; shares: number; createdAt?: string }[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError('');
        const res = await fetch(`${API_BASE}/api/animals/trending`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setAnimalTrends(data);
      } catch (e) {
        setError('Unable to load trending animals. Check that the API is reachable.');
        setAnimalTrends([]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const filteredTrends =
    route === '/viral-animals'
      ? animalTrends.filter((t) => (t.platform || '').toLowerCase().includes('animal'))
      : animalTrends;

  const platformCounts = filteredTrends.reduce<Record<string, number>>((acc, cur) => {
    acc[cur.platform] = (acc[cur.platform] || 0) + (cur.likes ?? 0);
    return acc;
  }, {});

  const platforms = Object.entries(platformCounts).map(([label, count]) => ({
    label,
    count,
    color: colorMap[label] || '#8b5cf6'
  }));

  useEffect(() => {
    const onHashChange = () => setRoute(getRoute());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const go = (path: string) => {
    window.location.hash = path;
  };

  useEffect(() => {
    document.body.classList.remove('theme-dark', 'theme-light');
    document.body.classList.add(theme === 'dark' ? 'theme-dark' : 'theme-light');
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'));

  if (route === '/about') {
    return (
      <div className="min-h-screen bg-[#0b0f1a] text-white">
        <div className="max-w-6xl mx-auto p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center font-bold">TP</div>
              <div>
                <p className="text-sm text-white/60">TrendPulse</p>
                <p className="text-xs text-white/40">Intelligence</p>
              </div>
            </div>
            <button className="glass px-3 py-2 rounded-xl text-sm font-semibold" onClick={() => go('/')}>Back to dashboard</button>
          </div>
          <section className="glass rounded-3xl p-6 border border-white/10">
            <About />
          </section>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b0f1a] text-white">
      <div className="max-w-7xl mx-auto p-4 md:p-6 flex gap-4">
        <Sidebar activePath={route} onNavigate={go} />
        <div className="flex-1 flex flex-col gap-4">
          <Navbar theme={theme} onToggleTheme={toggleTheme} />

          <motion.section
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass rounded-3xl p-6 relative overflow-hidden border border-white/10"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-blue-500/10" />
            <div className="relative flex flex-col gap-3">
              <p className="text-xs uppercase tracking-[0.3em] text-white/60">Viral Trend Intelligence</p>
              <h1 className="text-3xl md:text-4xl font-bold text-white">Real-Time Viral Trend Intelligence</h1>
              <p className="text-white/70 max-w-2xl">
                Track what is exploding across the internet before it becomes mainstream. Automated signals from animals, news,
                memes, and conflicts in a single pane of glass.
              </p>
              <div className="flex flex-wrap gap-3 mt-2">
                <button className="bg-gradient-to-r from-cyan-500 to-purple-600 px-4 py-2 rounded-xl font-semibold text-white shadow-glow">
                  Live Pulse
                </button>
                <button className="glass px-4 py-2 rounded-xl font-semibold text-white border border-white/10" onClick={() => go('/about')}>
                  About platform
                </button>
              </div>
            </div>
          </motion.section>

          <section className="grid lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2 space-y-4">
              <TrendChart />
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {platforms.map((p) => (
                  <PlatformBadge key={p.label} {...p} />
                ))}
              </div>
            </div>
            <div className="glass rounded-2xl p-4 border border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-white/50">Live Signals</p>
                  <h3 className="text-lg font-semibold">Alerts</h3>
                </div>
                <Sparkles className="h-5 w-5 text-cyan-300" />
              </div>
              <div className="space-y-2 text-sm text-white/80">
                <div className="glass p-3 rounded-xl border border-white/10">Reddit spike: “Viral Penguin Story” +230% in 1h</div>
                <div className="glass p-3 rounded-xl border border-white/10">TikTok mentions up 55%: “Skyline dance”</div>
                <div className="glass p-3 rounded-xl border border-white/10">News velocity: Conflict coverage +18% overnight</div>
              </div>
            </div>
          </section>

          <section className="card-grid">
            {loading && <div className="text-white/70 text-sm">Loading trending animals...</div>}
            {error && <div className="text-red-400 text-sm">{error}</div>}
            {!loading &&
              !error &&
              filteredTrends.map((trend, idx) => (
                <motion.div
                  key={trend.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.04 }}
                >
                  <TrendCard
                    title={trend.name}
                    category={trend.platform || 'Viral Animals'}
                    score={(trend.likes ?? 0) + (trend.shares ?? 0)}
                    mentions={trend.likes ?? 0}
                    growth={Math.max(0, Math.round((trend.shares ?? 0)))}
                    emoji="🐾"
                  />
                </motion.div>
              ))}
          </section>
        </div>
      </div>
    </div>
  );
}

export default App;
