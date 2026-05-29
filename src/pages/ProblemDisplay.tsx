import { useParams } from 'react-router-dom';
import { NotFound } from './NotFound';
import { getProblem } from '../problems/registry';

/**
 * Route handler for `#/problem/:problemId/display/:variant`.
 *
 * Renders the standalone candidate-facing prompt card — used during screen
 * share so the candidate sees only the problem statement, nothing else.
 */
export function ProblemDisplay() {
  const { problemId, variant } = useParams<{ problemId: string; variant: string }>();
  const entry = getProblem(problemId);
  const display =
    variant === 'formal' || variant === 'conversational'
      ? entry?.display?.[variant]
      : undefined;
  if (!entry || !display) return <NotFound />;
  return (
    <div className="display-root">
      <div className="display-card">
        <span className="display-badge">{display.badge}</span>
        <h1>{display.title}</h1>
        <div className="display-content">{display.body}</div>
      </div>
    </div>
  );
}
