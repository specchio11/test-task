import type { CSSProperties, ReactNode } from 'react';

/** Verdict badge — fail / weak / pass / strong (matches rubric color set). */
export function Badge({
  variant,
  children,
}: {
  variant: 'fail' | 'weak' | 'pass' | 'strong';
  children: ReactNode;
}) {
  return <span className={`badge badge-${variant}`}>{children}</span>;
}

/**
 * Tag chip — small label shown next to titles / summaries.
 * Variants mirror the legacy `tag-time / tag-lang / tag-cpp / tag-cs / tag-py / tag-ts / tag-diff-N`
 * class set so the look matches the original HTML guides verbatim.
 */
export type TagVariant =
  | 'time'
  | 'lang'
  | 'cpp'
  | 'cs'
  | 'py'
  | 'ts'
  | 'diff-1'
  | 'diff-2'
  | 'diff-3'
  | 'diff-4'
  | 'plain';

export function Tag({
  variant = 'plain',
  children,
}: {
  variant?: TagVariant;
  children: ReactNode;
}) {
  const cls = variant === 'plain' ? 'tag' : `tag tag-${variant}`;
  return <span className={cls}>{children}</span>;
}

/** Hint-level chip used inside hint-strategy tables (light / medium / heavy). */
export function HintChip({
  level,
}: {
  level: 'light' | 'medium' | 'heavy';
}) {
  const label = level === 'light' ? 'Light' : level === 'medium' ? 'Medium' : 'Heavy';
  return <span className={`hint-chip hint-${level}`}>{label}</span>;
}

/** Monospaced code block. Pass plain text via `children`. */
export function CodeBlock({
  children,
  style,
}: {
  children: ReactNode;
  style?: CSSProperties;
}) {
  return (
    <pre style={style}>
      <code>{children}</code>
    </pre>
  );
}

/** ASCII flow-chart pre-formatted block. */
export function FlowChart({ children }: { children: ReactNode }) {
  return <pre className="flow-chart">{children}</pre>;
}

/** Horizontal rule used between major sections. */
export function Separator({ dashed = false }: { dashed?: boolean } = {}) {
  return <hr className={dashed ? 'separator-dashed' : 'separator'} />;
}

/** Inline `<code>` for short tokens inside running prose. */
export function C({ children }: { children: ReactNode }) {
  return <code>{children}</code>;
}
