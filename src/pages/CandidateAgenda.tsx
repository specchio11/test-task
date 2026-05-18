import { useParams, Link } from 'react-router-dom';
import { getCandidate } from '../data/candidates';
import { AgendaNavbar } from '../components/AgendaNavbar';
import { QuickPanel } from '../components/QuickPanel';
import { OverviewTable } from '../components/OverviewTable';
import { ScriptBlock, BilingualBlocks } from '../components/ScriptBlock';
import { SectionLink } from '../components/SectionLink';
import { ScrollTop } from '../components/ScrollTop';
import '../styles/agenda.css';

/**
 * Default intro-script heading per section id. Used when a section does NOT
 * provide its own `introHeading`. Only valid for the classic 4-section
 * phone-screen layout (s1-s4). Candidates with 5+ sections (e.g. Xinfeng
 * with a separate System Design block) should set `introHeading` explicitly
 * on each affected section.
 */
const DEFAULT_SECTION_INTRO_HEADING: Record<string, string> = {
  s1: '🎤 引导候选人自我介绍 / Ask for Self-Introduction',
  s2: '🎤 引导进入技术问答 / Introduce Technical Q&A',
  s3: '🎤 引导进入编程测试 / Introduce Coding Exercise',
  s4: '🎤 引导候选人提问 / Invite Candidate Questions',
};

export function CandidateAgenda() {
  const { id } = useParams<{ id: string }>();
  const candidate = getCandidate(id);

  if (!candidate) {
    return (
      <div className="notfound">
        <h1>Candidate "{id}" not found</h1>
        <Link to="/">← Back to home</Link>
      </div>
    );
  }

  return (
    <div className="agenda-root">
      <AgendaNavbar candidate={candidate} />

      <div className="page-layout">
        <QuickPanel sections={candidate.sections} />

        <div className="container">
          <h1>{candidate.brand} — Interview Guide</h1>
          <p className="subtitle">
            {candidate.role} · Total {candidate.totalMin} min ·{' '}
            {candidate.sections.length} Sections · Candidate: {candidate.name}
          </p>

          {/* Overview table */}
          <h2 id="overview">🗺️ 面试流程总览 / Interview Flow Overview</h2>
          <OverviewTable sections={candidate.sections} />

          <hr className="separator" />

          {/* Opening */}
          <h2 id="opening-script">🎙️ 开场台词 / Opening Script</h2>
          <BilingualBlocks english={candidate.openingEn} chinese={candidate.openingZh} />

          <hr className="separator" />

          {/* Sections */}
          {candidate.sections.map((s) => (
            <div key={s.id}>
              <h2 id={s.id}>
                {s.num} {s.emoji} {s.titleZh} / {s.titleEn}{' '}
                <span className="tag tag-time">{s.time}</span>
              </h2>

              <ScriptBlock
                heading={
                  s.introHeading ??
                  DEFAULT_SECTION_INTRO_HEADING[s.id] ??
                  '🎤 引导 / Introduce'
                }
                english={s.introEn}
                chinese={s.introZh}
              />

              <SectionLink candidate={candidate} section={s} />

              <hr className="separator" />
            </div>
          ))}

          {/* Closing */}
          <h2 id="closing">👋 结束台词 / Closing Script</h2>
          <BilingualBlocks english={candidate.closingEn} chinese={candidate.closingZh} />
        </div>
      </div>

      <div className="footer">
        {candidate.role} · {candidate.totalMin} min · Interview Toolkit · Candidate: {candidate.name}
      </div>

      <ScrollTop />
    </div>
  );
}
