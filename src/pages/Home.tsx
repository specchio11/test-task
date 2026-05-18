import { Link } from 'react-router-dom';
import { candidates } from '../data/candidates';
import { sortCandidatesForHome, formatScheduledAt } from '../data/sort';

export function Home() {
  const sorted = sortCandidatesForHome(candidates);

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
        {sorted.length === 0 && (
          <div className="home-empty">
            No candidates configured yet. Add one in <code>src/candidates/</code>.
          </div>
        )}
        {sorted.map((c) => {
          const when = formatScheduledAt(c.scheduledAt);
          return (
            <Link
              key={c.id}
              to={`/candidate/${c.id}`}
              className={`cdd-card${c.completed ? ' is-completed' : ''}`}
              style={{ ['--cdd-accent' as string]: c.accent }}
            >
              {c.completed && <span className="badge done">✓ 已完成</span>}
              <span className="cta">→</span>
              <div className="avatar">{c.initials}</div>
              <h3>{c.name}</h3>
              <p className="role">{c.role}</p>

              <div className="schedule" title="Interview time">
                <span className="schedule-label">面试时间</span>
                <span className={`schedule-time${when ? '' : ' tbd'}`}>
                  {when ?? '未排期 / TBD'}
                </span>
              </div>

              <div className="meta">
                <span>⏱ {c.totalMin} min</span>
                <span>📋 {c.sections.length} sections</span>
              </div>
            </Link>
          );
        })}
      </div>

      <footer className="home-footer">
        Interview Toolkit · {new Date().getFullYear()}
      </footer>
    </div>
  );
}
