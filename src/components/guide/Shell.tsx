import { useState, type CSSProperties, type ReactNode } from 'react';
import { jumpTo, useScrollTopVisible } from './hooks';

/* ===================== GuideNavbar (sticky top) ===================== */

export interface NavItem {
  /** Display label (e.g. "① 自我介绍"). */
  label: ReactNode;
  /** Background color for the pill. */
  color: string;
  /** Hash route the pill links to (`#/candidate/<id>` etc.). Omit for the active item. */
  href?: string;
  /** Marks the current page — rendered as a non-link with full opacity. */
  active?: boolean;
}

/**
 * Sticky top navbar shared by every coding-problem guide.
 *
 * `backHref` typically points back to the candidate's agenda; the rest of the
 * pills are the candidate's section list with the current page highlighted.
 */
export function GuideNavbar({
  backHref,
  items,
}: {
  backHref?: string;
  items: NavItem[];
}) {
  return (
    <nav className="guide-navbar">
      {backHref && (
        <a href={backHref} className="nav-btn nav-back">
          ← Overview
        </a>
      )}
      {items.map((item, i) => {
        const style: CSSProperties = {
          background: item.color,
          color: '#fff',
          borderColor: item.color,
          fontWeight: item.active ? 700 : undefined,
          opacity: item.active ? 1 : 0.7,
        };
        if (item.active || !item.href) {
          return (
            <span key={i} className="nav-btn" style={style}>
              {item.label}
            </span>
          );
        }
        return (
          <a key={i} className="nav-btn" style={style} href={item.href}>
            {item.label}
          </a>
        );
      })}
    </nav>
  );
}

/* ===================== Quick panel ===================== */

export interface QuickLinkProps {
  target: string;
  children: ReactNode;
  variant?: 'default' | 'banner';
  color?: 'red' | 'purple' | 'orange' | 'blue' | 'muted';
  sub?: boolean;
  style?: CSSProperties;
}

/** A single entry inside the quick-jump panel. */
export function QuickLink({
  target,
  children,
  variant = 'default',
  color,
  sub = false,
  style,
}: QuickLinkProps) {
  const cls: string[] = [];
  cls.push(sub ? 'qp-sub' : 'qp-link');
  if (variant === 'banner') cls.push('qp-link-banner');
  if (color) cls.push(color);
  return (
    <a
      className={cls.join(' ')}
      href={`#${target}`}
      style={style}
      onClick={(e) => {
        e.preventDefault();
        jumpTo(target);
      }}
    >
      {children}
    </a>
  );
}

export function QuickGroup({
  title,
  titleColor,
  children,
}: {
  title: ReactNode;
  titleColor?: 'accent' | 'muted' | 'default';
  children: ReactNode;
}) {
  const cls = ['qp-group-title'];
  if (titleColor === 'accent') cls.push('accent');
  if (titleColor === 'muted') cls.push('muted');
  return (
    <div className="qp-group">
      <div className={cls.join(' ')}>{title}</div>
      {children}
    </div>
  );
}

export function QuickPanel({
  title = 'Quick Jump',
  collapsed,
  onCollapse,
  children,
}: {
  title?: ReactNode;
  collapsed: boolean;
  onCollapse: () => void;
  children: ReactNode;
}) {
  return (
    <div className={`quick-panel${collapsed ? ' collapsed' : ''}`}>
      <h4>
        {title}
        <button type="button" onClick={onCollapse} aria-label="collapse quick jump">
          ×
        </button>
      </h4>
      {children}
    </div>
  );
}

/* ===================== ScrollToTopButton ===================== */

export function ScrollToTopButton() {
  const visible = useScrollTopVisible(400);
  return (
    <button
      type="button"
      className={`scroll-top${visible ? ' show' : ''}`}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="scroll to top"
    >
      ↑
    </button>
  );
}

/* ===================== GuideShell (full page wrapper) ===================== */

/**
 * Top-level wrapper used by every problem-guide page:
 *   <GuideNavbar />
 *   <Layout>
 *     <QuickPanel />
 *     <main>{children}</main>
 *   </Layout>
 *   <ScrollToTopButton />
 *
 * Adds the `guide-root` class so the scoped CSS variables / typography from
 * `src/styles/guide.css` apply.
 */
export function GuideShell({
  backHref,
  navItems,
  quickPanel,
  children,
}: {
  backHref?: string;
  navItems: NavItem[];
  quickPanel: ReactNode;
  children: ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div className="guide-root">
      <GuideNavbar backHref={backHref} items={navItems} />
      <div className={`guide-layout${collapsed ? ' panel-collapsed' : ''}`}>
        <QuickPanel collapsed={collapsed} onCollapse={() => setCollapsed(true)}>
          {quickPanel}
        </QuickPanel>
        <button
          type="button"
          className="panel-toggle"
          onClick={() => setCollapsed(false)}
          aria-label="open quick jump"
        >
          ☰
        </button>
        <main className="guide-container">{children}</main>
      </div>
      <ScrollToTopButton />
    </div>
  );
}
