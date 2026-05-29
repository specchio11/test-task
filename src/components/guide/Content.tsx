import { useState, type CSSProperties, type ReactNode } from 'react';

/* ===================== Card ===================== */

export function Card({
  variant,
  style,
  className,
  id,
  children,
}: {
  variant?: 'default' | 'intro' | 'after';
  style?: CSSProperties;
  className?: string;
  id?: string;
  children: ReactNode;
}) {
  const cls = ['card'];
  if (variant === 'intro') cls.push('card-intro');
  if (variant === 'after') cls.push('card-after');
  if (className) cls.push(className);
  return (
    <div id={id} className={cls.join(' ')} style={style}>
      {children}
    </div>
  );
}

/* ===================== Collapsible ===================== */

/**
 * Drop-in replacement for the original `<details>/<summary>` boxes.
 *
 * `id` is set on the outer wrapper so anchor jumps land on the box itself;
 * `defaultOpen` defaults to true because all original guides ship with
 * `<details open>` so interviewers can scan everything at once.
 */
export function Collapsible({
  id,
  summary,
  defaultOpen = true,
  variant = 'default',
  children,
}: {
  id?: string;
  summary: ReactNode;
  defaultOpen?: boolean;
  variant?: 'default' | 'card';
  children: ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const cls = ['collapsible'];
  if (variant === 'card') cls.push('card');
  if (open) cls.push('open');
  return (
    <div id={id} className={cls.join(' ')}>
      <div
        className="collapsible-summary"
        role="button"
        tabIndex={0}
        onClick={() => setOpen((v) => !v)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setOpen((v) => !v);
          }
        }}
      >
        {summary}
      </div>
      {open && <div className="collapsible-body">{children}</div>}
    </div>
  );
}

/* ===================== Blockquote variants ===================== */

export function Blockquote({
  variant = 'default',
  style,
  children,
}: {
  variant?: 'default' | 'interviewer-note' | 'script-en' | 'script-zh';
  style?: CSSProperties;
  children: ReactNode;
}) {
  const cls = ['', '']; // empty placeholder; we always emit className=""+variant
  const className = variant === 'default' ? undefined : variant;
  void cls;
  return (
    <blockquote className={className} style={style}>
      {children}
    </blockquote>
  );
}

/* ===================== ScriptBlock (EN/ZH paired script) ===================== */

/**
 * A pair of EN/ZH blockquotes used for the interviewer's read-aloud scripts.
 * Variant `green-orange` uses the script-en (green) + script-zh (orange) palette
 * to match the original intro cards; `purple` keeps the default purple style.
 */
export function ScriptBlock({
  en,
  zh,
  variant = 'green-orange',
  withLabel = true,
}: {
  en: ReactNode;
  zh: ReactNode;
  variant?: 'green-orange' | 'purple';
  withLabel?: boolean;
}) {
  if (variant === 'green-orange') {
    return (
      <>
        <blockquote className="script-en">
          {withLabel && <strong>EN: </strong>}
          {en}
        </blockquote>
        <blockquote className="script-zh">
          {withLabel && <strong>中: </strong>}
          {zh}
        </blockquote>
      </>
    );
  }
  return (
    <>
      <blockquote>
        {withLabel && <strong>EN: </strong>}
        {en}
      </blockquote>
      <blockquote>
        {withLabel && <strong>中: </strong>}
        {zh}
      </blockquote>
    </>
  );
}

/* ===================== InterviewerNote (yellow callout) ===================== */

export function InterviewerNote({ children }: { children: ReactNode }) {
  return <blockquote className="interviewer-note">{children}</blockquote>;
}

/* ===================== Section (h2 + anchor) ===================== */

export function Section({
  id,
  variant = 'default',
  style,
  children,
}: {
  id: string;
  variant?: 'default' | 'accent' | 'topic';
  style?: CSSProperties;
  children: ReactNode;
}) {
  const cls = [];
  if (variant === 'accent') cls.push('h2-accent');
  if (variant === 'topic') cls.push('h2-topic');
  return (
    <h2 id={id} className={cls.join(' ') || undefined} style={style}>
      {children}
    </h2>
  );
}
