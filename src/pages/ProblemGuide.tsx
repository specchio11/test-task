import { useParams, useSearchParams } from 'react-router-dom';
import { NotFound } from './NotFound';
import { getProblem } from '../problems/registry';
import { getCandidate } from '../data/candidates';

/**
 * Route handler for `#/problem/:problemId`.
 *
 * Looks the problem up in the registry and renders its `component`,
 * forwarding any `?from=<candidateId>&section=<sectionId>` search params so
 * the problem page can build a per-candidate navbar that links back to the
 * candidate's agenda.
 */
export function ProblemGuide() {
  const { problemId } = useParams<{ problemId: string }>();
  const [searchParams] = useSearchParams();
  const entry = getProblem(problemId);
  if (!entry) return <NotFound />;
  const candidate = getCandidate(searchParams.get('from') ?? undefined);
  const activeSectionId = searchParams.get('section');
  const Component = entry.component;
  return <Component candidate={candidate} activeSectionId={activeSectionId} />;
}
