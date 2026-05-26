import type { CandidateConfig } from './types';
import { jorge } from '../candidates/jorge';
import { xinfeng } from '../candidates/xinfeng';
import { samarth } from '../candidates/samarth';
import { shirley } from '../candidates/shirley';

/**
 * Registry of all candidates. Add new candidates here.
 *
 * Order in this array is the registration order; the actual home-page
 * ordering is computed by `sortCandidatesForHome` (closest interview first,
 * completed pushed to the bottom).
 */
export const candidates: CandidateConfig[] = [
  jorge,
  xinfeng,
  samarth,
  shirley,
];

const byId = new Map(candidates.map((c) => [c.id, c]));

export function getCandidate(id: string | undefined): CandidateConfig | undefined {
  if (!id) return undefined;
  return byId.get(id);
}
