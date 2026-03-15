import { Search, Filter, Clock3, Sun } from 'lucide-react';

export default function Navbar() {
  return (
    <div className="glass rounded-2xl px-4 py-3 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
      <div className="flex items-center gap-2 w-full md:w-1/2">
        <Search className="h-4 w-4 text-white/50" />
        <input
          placeholder="Search trending topics..."
          className="w-full bg-transparent outline-none text-sm text-white placeholder:text-white/40"
        />
      </div>
      <div className="flex items-center gap-2 text-sm text-white/80 flex-wrap justify-end">
        <button className="glass px-3 py-2 rounded-xl border border-white/10 flex items-center gap-2"> <Filter className="h-4 w-4" /> Platform </button>
        <button className="glass px-3 py-2 rounded-xl border border-white/10 flex items-center gap-2"> <Clock3 className="h-4 w-4" /> 6h </button>
        <button className="glass px-3 py-2 rounded-xl border border-white/10 flex items-center gap-2"> <Sun className="h-4 w-4" /> Theme </button>
      </div>
    </div>
  );
}
