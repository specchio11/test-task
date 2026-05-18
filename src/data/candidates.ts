import type { CandidateConfig } from './types';
import { jorge } from '../candidates/jorge';

/**
 * Registry of all candidates. Add new candidates here.
 *
 * Order in this array == order shown on the home page.
 */
export const candidates: CandidateConfig[] = [
  jorge,
  // Example: import { alice } from '../candidates/alice'; then add `alice` here.
];

const byId = new Map(candidates.map((c) => [c.id, c]));

export function getCandidate(id: string | undefined): CandidateConfig | undefined {
  if (!id) return undefined;
  return byId.get(id);
}
