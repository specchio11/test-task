import { Link } from 'react-router-dom';
import { candidates } from '../data/candidates';

export function Home() {
  return (
    <div className="home">
      <header className="home-header">
        <div className="brand-tag">Interview Toolkit</div>
        <h1>Phone Screen Interview Guide</h1>
        <p>
          Pick a candidate to open their full interview agenda — scripts, technical Q&amp;A,
          coding test, and printable notes — all in one place.
        </p>
      </header>

      <div className="home-grid">
        {candidates.length === 0 && (
          <div className="home-empty">
            No candidates configured yet. Add one in <code>src/candidates/</code>.
          </div>
        )}
        {candidates.map((c) => (
          <Link
            key={c.id}
            to={`/candidate/${c.id}`}
            className="cdd-card"
            style={{ ['--cdd-accent' as string]: c.accent }}
          >
            <span className="cta">→</span>
            <div className="avatar">{c.initials}</div>
            <h3>{c.name}</h3>
            <p className="role">{c.role}</p>
            <div className="meta">
              <span>⏱ {c.totalMin} min</span>
              <span>📋 {c.sections.length} sections</span>
            </div>
          </Link>
        ))}
      </div>

      <footer className="home-footer">
        Interview Toolkit · {new Date().getFullYear()}
      </footer>
    </div>
  );
}
