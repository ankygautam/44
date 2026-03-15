import { motion } from 'framer-motion';
import { Flame, TrendingUp } from 'lucide-react';

export type TrendCardProps = {
  title: string;
  category: string;
  score: number;
  mentions: number;
  growth: number;
  emoji?: string;
};

export default function TrendCard({ title, category, score, mentions, growth, emoji }: TrendCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02, boxShadow: '0 20px 60px rgba(96,165,250,0.25)' }}
      className="glass rounded-2xl p-4 border border-white/10 flex flex-col gap-3"
    >
      <div className="flex items-center gap-3">
        <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-cyan-500/40 to-purple-500/40 flex items-center justify-center text-2xl">
          {emoji || '🔥'}
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-white/60">{category}</p>
          <h3 className="text-lg font-semibold text-white">{title}</h3>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 text-sm text-white/70">
        <div className="flex items-center gap-2">
          <Flame className="h-4 w-4 text-orange-400" />
          <div>
            <p className="text-xs text-white/50">Trend score</p>
            <p className="font-semibold text-white">{score.toLocaleString()}</p>
          </div>
        </div>
        <div>
          <p className="text-xs text-white/50">Mentions</p>
          <p className="font-semibold text-white">{mentions.toLocaleString()}</p>
        </div>
        <div className="flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-emerald-400" />
          <div>
            <p className="text-xs text-white/50">Growth</p>
            <p className="font-semibold text-emerald-400">+{growth}%</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
