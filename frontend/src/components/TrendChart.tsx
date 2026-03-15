import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { motion } from 'framer-motion';

const data = [
  { time: '1h', score: 62 },
  { time: '3h', score: 78 },
  { time: '6h', score: 120 },
  { time: '12h', score: 180 },
  { time: '24h', score: 220 }
];

export default function TrendChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-2xl p-4 border border-white/10"
    >
      <div className="flex items-center justify-between mb-3">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-white/50">Trend momentum</p>
          <h3 className="text-lg font-semibold text-white">Growth over time</h3>
        </div>
        <span className="badge">+38% velocity</span>
      </div>
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="trend" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#a855f7" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <XAxis dataKey="time" tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ background: '#111827', border: '1px solid #1f2937', borderRadius: 12, color: '#e5e7eb' }} />
            <Area type="monotone" dataKey="score" stroke="#22d3ee" fill="url(#trend)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
