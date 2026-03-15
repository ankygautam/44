import TrendingAnimals from './TrendingAnimals';
import About from './About';

function App() {
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
