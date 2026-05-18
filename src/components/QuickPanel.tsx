import { useState } from 'react';
import type { AgendaSection } from '../data/types';

const QP_COLOR: Record<AgendaSection['accent'], string> = {
  s1: '#0284c7',
  s2: '#7c3aed',
  s3: '#059669',
  s4: '#ea580c',
  s5: '#db2777',
};

interface Props {
  sections: AgendaSection[];
}

/** Floating right-side quick-jump panel — collapsible. */
export function QuickPanel({ sections }: Props) {
  const [collapsed, setCollapsed] = useState(false);

  function jump(id: string) {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  return (
    <>
      <div id="quickPanel" className={`quick-panel${collapsed ? ' collapsed' : ''}`}>
        <h4>
          ⚡ Quick Jump
          <button onClick={() => setCollapsed(true)} title="Close">
            ✕
          </button>
        </h4>
        <a
          className="qp-link"
          href="#overview"
          onClick={(e) => {
            e.preventDefault();
            jump('overview');
          }}
        >
          🗺️ 流程总览
        </a>
        <a
          className="qp-link"
          href="#opening-script"
          onClick={(e) => {
            e.preventDefault();
            jump('opening-script');
          }}
        >
          🎙️ 开场台词
        </a>
        {sections.map((s) => (
          <a
            key={s.id}
            className="qp-link"
            href={`#${s.id}`}
            onClick={(e) => {
              e.preventDefault();
              jump(s.id);
            }}
            style={{ color: QP_COLOR[s.accent] }}
          >
            {s.num} {s.titleZh}
          </a>
        ))}
        <a
          className="qp-link"
          href="#closing"
          onClick={(e) => {
            e.preventDefault();
            jump('closing');
          }}
        >
          👋 结束台词
        </a>
      </div>
      {collapsed && (
        <button className="panel-toggle" onClick={() => setCollapsed(false)}>
          ☰
        </button>
      )}
    </>
  );
}
