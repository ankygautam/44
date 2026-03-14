import TrendingAnimals from './TrendingAnimals';

function App() {
  return (
    <main
      style={{
        fontFamily: 'system-ui, sans-serif',
        padding: '2rem',
        maxWidth: 900,
        margin: '0 auto',
        background: 'linear-gradient(180deg, #f8fafc 0%, #ffffff 60%)',
        minHeight: '100vh'
      }}
    >
      <header style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ margin: 0, fontSize: 32 }}>Viral Animal Tracker</h1>
        <p style={{ margin: '0.3rem 0 0', color: '#475569' }}>
          Fresh pull from your Spring Boot API at <code>/api/animals/trending</code>.
        </p>
      </header>

      <TrendingAnimals />
    </main>
  );
}

export default App;
