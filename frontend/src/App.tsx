import TrendingAnimals from './TrendingAnimals';

function App() {
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
          <button className="primary" onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}>
            View trending board
          </button>
          <button className="ghost" onClick={() => window.location.reload()}>
            Quick refresh
          </button>
        </div>
      </header>

      <TrendingAnimals />
    </div>
  );
}

export default App;
