import type { AgendaSection, CandidateConfig } from '../data/types';
import { sectionAsset } from '../data/asset';

interface Props {
  candidate: CandidateConfig;
  section: AgendaSection;
}

/** Large colored card that links into the candidate's static section guide. */
export function SectionLink({ candidate, section }: Props) {
  return (
    <a
      className={`section-link ${section.accent}`}
      href={sectionAsset(candidate, section)}
    >
      <span className="time-badge">{section.time}</span>
      <h3>
        {section.emoji} 进入 Section {section.id.slice(1)} 详细指南 →
      </h3>
    </a>
  );
}
