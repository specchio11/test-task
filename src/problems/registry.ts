import type { ProblemEntry } from './types';
import { inverseFunctionEntry } from './inverse-function';
import { matrixMultiplicationEntry } from './matrix-multiplication';
import { taskSchedulingEntry } from './task-scheduling-with-deadlines';

/**
 * Registry of every shared coding problem.
 *
 * Adding a new problem is a 3-step, data-only operation:
 *   1. Drop starter templates / metadata into
 *      `public/coding-problems/<id>/starter-templates/`.
 *   2. Create `src/problems/<id>.tsx` exporting a `ProblemEntry`.
 *   3. Register it in this file.
 */
export const problems: ProblemEntry[] = [
  inverseFunctionEntry,
  matrixMultiplicationEntry,
  taskSchedulingEntry,
];

const byId = new Map(problems.map((p) => [p.id, p]));

export function getProblem(id: string | undefined): ProblemEntry | undefined {
  if (!id) return undefined;
  return byId.get(id);
}
