import type { CandidateConfig } from './types';

/**
 * Sort rule for the Home page card list:
 *   1. Not-completed candidates come BEFORE completed ones.
 *   2. Within each group:
 *      a. Candidates WITH a scheduledAt sort first, by absolute distance
 *         from "now" (closest first).
 *      b. Candidates WITHOUT a scheduledAt go to the bottom of the group.
 */
export function sortCandidatesForHome(
  list: readonly CandidateConfig[],
  now: number = Date.now(),
): CandidateConfig[] {
  return [...list].sort((a, b) => {
    // 1. Completed always after not-completed.
    const ac = a.completed ? 1 : 0;
    const bc = b.completed ? 1 : 0;
    if (ac !== bc) return ac - bc;

    // 2. Within group: scheduled before unscheduled.
    const aTime = parseTime(a.scheduledAt);
    const bTime = parseTime(b.scheduledAt);
    const aHas = aTime !== null;
    const bHas = bTime !== null;
    if (aHas !== bHas) return aHas ? -1 : 1;
    if (!aHas || !bHas) return 0;

    // 3. Closest to now first.
    return Math.abs(aTime - now) - Math.abs(bTime - now);
  });
}

function parseTime(iso: string | undefined): number | null {
  if (!iso) return null;
  const t = new Date(iso).getTime();
  return Number.isFinite(t) ? t : null;
}

/**
 * Format an ISO timestamp for the card's "interview time" slot.
 * Returns null when the input is empty/invalid (caller should render a TBD).
 */
export function formatScheduledAt(iso: string | undefined): string | null {
  const t = parseTime(iso);
  if (t === null) return null;
  const d = new Date(t);
  // Locale-aware short form, e.g. "2026-05-20 10:00".
  const pad = (n: number) => String(n).padStart(2, '0');
  return (
    `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ` +
    `${pad(d.getHours())}:${pad(d.getMinutes())}`
  );
}
