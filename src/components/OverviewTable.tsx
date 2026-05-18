import type { AgendaSection } from '../data/types';

const NUM_COLOR: Record<AgendaSection['accent'], string> = {
  s1: '#0284c7',
  s2: '#7c3aed',
  s3: '#059669',
  s4: '#ea580c',
};

interface Props {
  sections: AgendaSection[];
}

/** "面试流程总览" table at the top of an agenda. */
export function OverviewTable({ sections }: Props) {
  return (
    <table className="overview-table">
      <thead>
        <tr>
          <th>#</th>
          <th>环节 / Section</th>
          <th>时间 / Time</th>
          <th>要点 / Key Points</th>
        </tr>
      </thead>
      <tbody>
        {sections.map((s) => (
          <tr key={s.id}>
            <td style={{ color: NUM_COLOR[s.accent] }}>{s.num}</td>
            <td>
              {s.titleZh} / {s.titleEn}
            </td>
            <td>{s.time}</td>
            <td>{s.keyPoints}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
