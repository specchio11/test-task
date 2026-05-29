import { useState, type ReactNode } from 'react';

/* ===================== VersionTabs (problem statement variants) ===================== */

export interface VersionTab {
  id: string;
  label: ReactNode;
  content: ReactNode;
}

/**
 * Tab switcher used by the "problem statement" sections — typically
 * 正式版 / 口语版 / 最简化版. Tabs live in the same `.card` container
 * (one card per tab) to mirror the original look.
 */
export function VersionTabs({
  tabs,
  defaultTabId,
}: {
  tabs: VersionTab[];
  defaultTabId?: string;
}) {
  const [active, setActive] = useState(defaultTabId ?? tabs[0]?.id);
  return (
    <>
      <div className="version-tabs">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            className={`vtab${t.id === active ? ' active' : ''}`}
            onClick={() => setActive(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>
      {tabs.map((t) =>
        t.id === active ? (
          <div key={t.id} className="card">
            {t.content}
          </div>
        ) : null,
      )}
    </>
  );
}

/* ===================== CodeTabs (multi-language reference) ===================== */

export interface CodeTab {
  id: string;
  label: ReactNode;
  /** The whole tab body (typically `<h4>…</h4><pre><code>…</code></pre>`). */
  content: ReactNode;
}

/** Language switcher used for "reference solution" sections (C++ / C# / Py / TS). */
export function CodeTabs({
  tabs,
  defaultTabId,
}: {
  tabs: CodeTab[];
  defaultTabId?: string;
}) {
  const [active, setActive] = useState(defaultTabId ?? tabs[0]?.id);
  return (
    <>
      <div className="code-tabs">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            className={`ctab${t.id === active ? ' active' : ''}`}
            onClick={() => setActive(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>
      {tabs.map((t) =>
        t.id === active ? (
          <div key={t.id} className="card">
            {t.content}
          </div>
        ) : null,
      )}
    </>
  );
}
