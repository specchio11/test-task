import type { AgendaSection, CandidateConfig } from './types';

/**
 * Resolve a path inside a candidate's on-disk folder to a URL that works
 * under any Vite `base` (dev = "/", prod = "/test-task/").
 *
 * Folder layout:
 *   - active   : `public/candidates/<order>-<id>/`
 *   - completed: `public/candidates/_completed/<order>-<id>/`
 *
 * The `completed` flag here comes from the static config; in-browser
 * "mark as done" overrides (see `overrides.ts`) intentionally do NOT
 * relocate assets, since the files only move during a redeploy.
 */
export function candidateAsset(candidate: CandidateConfig, relativePath: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/+$/, '');
  const clean = relativePath.replace(/^\/+/, '');
  const folder = `${candidate.order}-${candidate.id}`;
  const sub = candidate.completed ? '_completed/' : '';
  return `${base}/candidates/${sub}${folder}/${clean}`;
}

/**
 * Resolve a section's `href` to a URL. If the section references a shared
 * coding problem (`section.problem`), we route to the React problem-guide
 * page (`#/problem/<id>?from=<candidate>&section=<sectionId>`) so the page
 * can render the candidate's navbar context. Otherwise we fall back to
 * `candidateAsset` (a static HTML file under the candidate's folder).
 */
export function sectionAsset(candidate: CandidateConfig, section: AgendaSection): string {
  if (section.problem) {
    return `#/problem/${section.problem}?from=${candidate.id}&section=${section.id}`;
  }
  return candidateAsset(candidate, section.href);
}
