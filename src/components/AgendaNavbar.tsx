import { Link } from 'react-router-dom';
import type { AgendaSection, CandidateConfig } from '../data/types';
import { candidateAsset } from '../data/asset';

const SECTION_BG: Record<AgendaSection['accent'], string> = {
  s1: '#0284c7',
  s2: '#0d9488',
  s3: '#059669',
  s4: '#ea580c',
  s5: '#db2777',
};

interface Props {
  candidate: CandidateConfig;
}

/** Sticky top navbar with brand + per-section deep links + back-to-home pill. */
export function AgendaNavbar({ candidate }: Props) {
  return (
    <nav className="navbar">
      <span className="brand">{candidate.brand}</span>
      {candidate.sections.map((s) => {
        const color = SECTION_BG[s.accent];
        return (
          <a
            key={s.id}
            className="nav-btn section"
            href={candidateAsset(candidate.id, s.href)}
            style={{
              background: color,
              color: '#fff',
              borderColor: color,
              textDecoration: 'none',
            }}
          >
            {s.navLabel}
          </a>
        );
      })}
      <Link
        to="/"
        className="nav-btn switch-cdd"
        title="Switch candidate"
        style={{ borderColor: '#64748b', color: '#cbd5e1', textDecoration: 'none' }}
      >
        ← Switch
      </Link>
    </nav>
  );
}
