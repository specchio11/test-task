import { useEffect, useState } from 'react';

/** Whether the page is scrolled past the "show scroll-to-top button" threshold. */
export function useScrollTopVisible(threshold = 400): boolean {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > threshold);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);
  return visible;
}

/**
 * Bind single-key shortcuts to jump-to-anchor actions.
 * Keys are ignored when an input/textarea/contenteditable element is focused
 * or any modifier key (ctrl/meta/alt) is held — mirrors the original
 * keyboard map used by the legacy HTML guides.
 */
export function useKeyboardShortcuts(map: Record<string, string>) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target) {
        const tag = target.tagName;
        if (tag === 'INPUT' || tag === 'TEXTAREA' || target.isContentEditable) {
          return;
        }
      }
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      const id = map[e.key];
      if (!id) return;
      const el = document.getElementById(id);
      if (!el) return;
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [map]);
}

/**
 * Smoothly scroll to an in-page anchor by id.
 * Centralised so every QuickPanel / hand-rolled link uses the same behaviour.
 */
export function jumpTo(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
