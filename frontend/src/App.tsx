import { useEffect, useState } from 'react';
import TrendingAnimals from './TrendingAnimals';
import About from './About';

function App() {
  const getRoute = () => (window.location.hash.replace('#', '') || '/');
  const [route, setRoute] = useState<string>(getRoute());

  useEffect(() => {
    const onHashChange = () => setRoute(getRoute());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const go = (path: string) => {
    window.location.hash = path;
  };

  return (
    <div className="page">
      <header className="hero">
        <div className="hero-top">
          <p className="brand">Viral Animal Tracker</p>
          <div className="hero-nav">
            <button className={route === '/' ? 'nav-btn active' : 'nav-btn'} onClick={() => go('/')}>
              Live board
            </button>
            <button className={route === '/about' ? 'nav-btn active' : 'nav-btn'} onClick={() => go('/about')}>
              About
            </button>
          </div>
        </div>

        <div className="halo" aria-hidden />
        <p className="eyebrow">Viral Animal Tracker</p>
        <h1>Real-Time Animal Virality Dashboard</h1>
        <p className="lede">
          Track trending animals across social platforms using automated data signals pulled from <code>/api/animals/trending</code>.
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

      {route === '/about' ? (
        <section className="panel about-page" id="about-panel">
          <About />
        </section>
      ) : (
        <section className="content-grid">
          <div className="panel tall" id="board">
            <TrendingAnimals />
          </div>
          <div className="panel about-panel" id="about-panel">
            <About />
          </div>
        </section>
      )}
    </div>
  );
}

export default App;
