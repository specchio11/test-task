import { Link } from 'react-router-dom';
import { candidates } from '../data/candidates';
import { sortCandidatesForHome, formatScheduledAt } from '../data/sort';
import {
  resolveCompleted,
  setCompletedOverride,
  useCandidateOverrides,
} from '../data/overrides';

export function Home() {
  const overrides = useCandidateOverrides();
  // Apply per-browser overrides BEFORE sorting so completed cards drop to
  // the bottom immediately when the user toggles them.
  const merged = candidates.map((c) => ({
    ...c,
    completed: resolveCompleted(c.id, c.completed, overrides),
  }));
  const sorted = sortCandidatesForHome(merged);

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
            <article
              key={c.id}
              className={`cdd-card${c.completed ? ' is-completed' : ''}`}
              style={{ ['--cdd-accent' as string]: c.accent }}
            >
              {c.completed && <span className="badge done">✓ 已完成</span>}
              <Link to={`/candidate/${c.id}`} className="cdd-card-body">
                <span className="cta" aria-hidden="true">→</span>
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
              <button
                type="button"
                className={`toggle-done${c.completed ? ' is-on' : ''}`}
                onClick={() => setCompletedOverride(c.id, !c.completed)}
                aria-pressed={c.completed}
                title={c.completed ? '取消标记为已完成' : '标记为面试已完成'}
              >
                {c.completed ? '↺ 标记为未完成' : '✓ 标记已完成'}
              </button>
            </article>
          );
        })}
      </div>

      <footer className="home-footer">
        Interview Toolkit · {new Date().getFullYear()}
      </footer>
    </div>
  );
}
