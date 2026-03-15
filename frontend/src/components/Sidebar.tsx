import { Sparkles, Flame, Globe2, LayoutDashboard, MonitorDot, ShieldQuestion, Telescope, Watch } from 'lucide-react';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { icon: Sparkles, label: 'Viral Animals', path: '/viral-animals' },
  { icon: Globe2, label: 'World News', path: '/world-news' },
  { icon: MonitorDot, label: 'Internet Memes', path: '/memes' },
  { icon: ShieldQuestion, label: 'Conflicts', path: '/conflicts' },
  { icon: Telescope, label: 'Trending Now', path: '/trending' },
  { icon: Watch, label: 'Watchlist', path: '/watchlist' }
];

type Props = {
  activePath: string;
  onNavigate: (path: string) => void;
};

export default function Sidebar({ activePath, onNavigate }: Props) {

  return (
    <aside className="hidden lg:flex flex-col w-64 glass rounded-3xl p-4 gap-6">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center text-white font-bold">
          TP
        </div>
        <div>
          <p className="text-sm text-white/60">TrendPulse</p>
          <p className="text-xs text-white/40">Intelligence</p>
        </div>
      </div>

      <nav className="space-y-2">
        {navItems.map((item) => (
          <button
            key={item.label}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-semibold text-white/80 hover:bg-white/5 border border-transparent hover:border-white/10 transition ${
              item.path === activePath ? 'bg-white/5 border-white/10 text-white' : ''
            }`}
            onClick={() => onNavigate(item.path)}
          >
            <item.icon className="h-4 w-4 text-cyan-400" />
            {item.label}
          </button>
        ))}
      </nav>

      <div className="mt-auto p-3 rounded-2xl bg-gradient-to-br from-purple-600/30 via-cyan-500/20 to-blue-500/30 border border-white/10">
        <div className="flex items-center gap-2 text-white font-semibold">
          <Flame className="h-4 w-4 text-orange-300" />
          Live Heatmap
        </div>
        <p className="text-xs text-white/60 mt-1">Monitor spikes across platforms in real time.</p>
      </div>
    </aside>
  );
}
