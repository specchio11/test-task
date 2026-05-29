import type { CandidateConfig, SectionAccent } from '../data/types';
import type { NavItem } from '../components/guide';
import { sectionAsset } from '../data/asset';

const SECTION_BG: Record<SectionAccent, string> = {
  s1: '#0284c7',
  s2: '#0d9488',
  s3: '#059669',
  s4: '#ea580c',
  s5: '#db2777',
};

/**
 * Build the sticky top-nav items shown on a problem-guide page.
 *
 * When the page is opened from a candidate's agenda (via `?from=<id>`),
 * we surface that candidate's full section list so the interviewer can
 * jump back to any other section. The matching section is rendered as
 * a non-link `<span>` (so it looks "current") and other sections become
 * links back to their respective targets.
 *
 * When opened standalone (no candidate context), we return an empty list
 * so the shell renders just the `← Overview` back button to `#/`.
 */
export function buildProblemNavItems(
  candidate: CandidateConfig | undefined,
  activeSectionId: string | null | undefined,
): { navItems: NavItem[]; backHref: string } {
  if (!candidate) {
    return { navItems: [], backHref: '#/' };
  }
  const navItems: NavItem[] = candidate.sections.map((s) => ({
    label: s.navLabel,
    color: SECTION_BG[s.accent] ?? '#64748b',
    href: sectionAsset(candidate, s),
    active: s.id === activeSectionId,
  }));
  return { navItems, backHref: `#/candidate/${candidate.id}` };
}
