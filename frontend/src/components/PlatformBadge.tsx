import { motion } from 'framer-motion';

type Props = {
  label: string;
  count: number;
  color: string;
};

export default function PlatformBadge({ label, count, color }: Props) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="glass rounded-xl px-3 py-2 flex items-center justify-between border border-white/10"
      style={{ boxShadow: `0 10px 30px ${color}33` }}
    >
      <div className="flex items-center gap-2">
        <span className="h-2 w-2 rounded-full" style={{ backgroundColor: color }} />
        <p className="text-sm font-semibold" style={{ color }}>{label}</p>
      </div>
      <p className="text-sm text-white font-semibold">{count.toLocaleString()}</p>
    </motion.div>
  );
}
