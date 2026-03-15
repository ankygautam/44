import { useRef } from 'react';
import TrendingAnimals from './TrendingAnimals';
import About from './About';

  return (
    <div className="page">
      <header className="hero">
        <div className="hero-top">
          <p className="brand">Viral Animal Tracker</p>
          <div className="hero-nav">
            <button className="nav-btn" onClick={() => document.getElementById('board')?.scrollIntoView({ behavior: 'smooth' })}>
              Live board
            </button>
          </div>
        </div>

        <div className="halo" aria-hidden />
        <p className="eyebrow">Viral Animal Tracker</p>
        <h1>See which animals are blowing up across platforms.</h1>
        <p className="lede">
          Live pull from <code>/api/animals/trending</code>. Refresh to keep tabs on what the internet is talking about.
        </p>
        <div className="hero-actions">
          <button className="primary" onClick={() => document.getElementById('board')?.scrollIntoView({ behavior: 'smooth' })}>
            View trending board
          </button>
          <button className="ghost" onClick={() => window.location.reload()}>
            Quick refresh
          </button>
        </div>
      </header>

      <section className="content-grid">
        <div className="panel tall" id="board">
          <TrendingAnimals />
        </div>
        <div className="panel about-panel" id="about-panel">
          <About />
        </div>
      </section>
    </div>
  );
}

export default App;
