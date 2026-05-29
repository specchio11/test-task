import type { ComponentType, ReactNode } from 'react';
import type { CandidateConfig } from '../data/types';

/**
 * Props passed by `ProblemGuide` to every problem-page component.
 *
 * `candidate` is the resolved CandidateConfig of the candidate whose agenda
 * referenced this problem (looked up from the `?from=<id>` search param);
 * `activeSectionId` is the id of the agenda section that linked here
 * (`?section=<id>`). Both are optional — a problem page can be opened
 * directly via `#/problem/<id>` without any candidate context.
 */
export interface ProblemPageProps {
  candidate?: CandidateConfig;
  activeSectionId?: string | null;
}

/**
 * Candidate-facing "problem display" variant — the standalone screen-share
 * page (`#/problem/<id>/display/<variant>`) that shows ONLY the problem
 * prompt in a single centred card.
 */
export interface ProblemDisplayVariant {
  /** Small uppercase pill above the title (e.g. "Coding Exercise"). */
  badge: string;
  /** Headline of the prompt card. */
  title: string;
  /** Free-form prompt body — typically a few `<p>` paragraphs. */
  body: ReactNode;
}

export interface ProblemEntry {
  /** URL slug; matches the folder name under `public/coding-problems/`. */
  id: string;
  /** Short label used in logs / fallback titles. */
  label: string;
  /** React component that renders the full interviewer guide page. */
  component: ComponentType<ProblemPageProps>;
  /** Optional candidate-facing problem-display variants. */
  display?: {
    formal?: ProblemDisplayVariant;
    conversational?: ProblemDisplayVariant;
  };
}
