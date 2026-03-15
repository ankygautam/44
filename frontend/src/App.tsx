import { useState } from 'react';
import TrendingAnimals from './TrendingAnimals';
import About from './About';

function App() {
  const [view, setView] = useState<'live' | 'about'>('live');

  return (
    <div className="page">
      <header className="hero">
        <div className="halo" aria-hidden />
        <p className="eyebrow">Viral Animal Tracker</p>
        <h1>See which animals are blowing up across platforms.</h1>
        <p className="lede">
          Live pull from <code>/api/animals/trending</code>. Refresh to keep tabs on what the internet is talking about.
        </p>
        <div className="hero-actions">
          <button className="primary" onClick={() => setView('live')}>
            View trending board
          </button>
          <button className="ghost" onClick={() => setView('about')}>
            About
          </button>
          <button className="ghost" onClick={() => window.location.reload()}>
            Quick refresh
          </button>
        </div>
      </header>

      <div className="tabs">
        <button className={view === 'live' ? 'tab active' : 'tab'} onClick={() => setView('live')}>
          Live board
        </button>
        <button className={view === 'about' ? 'tab active' : 'tab'} onClick={() => setView('about')}>
          About
        </button>
      </div>

      {view === 'live' ? <TrendingAnimals /> : <About />}
    </div>
  );
}

export default App;
