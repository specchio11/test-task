/**
 * Type definitions for candidate agenda configuration.
 *
 * Adding a new candidate is a 3-step, data-only operation:
 *   1. Drop the candidate's static section HTMLs into
 *      `public/candidates/<id>/...` (mirroring Jorge's layout).
 *   2. Create `src/candidates/<id>.ts` exporting a `CandidateConfig`.
 *   3. Register it in `src/data/candidates.ts`.
 * No component changes required.
 */

/** Accent theme for a section card. Matches CSS classes .s1-.s5 in agenda.css. */
export type SectionAccent = 's1' | 's2' | 's3' | 's4' | 's5';

export interface AgendaSection {
  /** Stable id used for anchor jumps (e.g. "s1"). */
  id: string;
  /** Display number, e.g. "①". */
  num: string;
  /** Emoji shown next to the title. */
  emoji: string;
  /** Chinese title — used in headings. */
  titleZh: string;
  /** English title — used in headings. */
  titleEn: string;
  /** Short navbar label (e.g. "① 自我介绍"). */
  navLabel: string;
  /** Time tag, e.g. "~5 min". */
  time: string;
  /** Key points string shown in the overview table. */
  keyPoints: string;
  /** Accent theme; controls card colors. */
  accent: SectionAccent;
  /**
   * Path to the candidate's static section guide, relative to the candidate's
   * folder under `public/candidates/<id>/`.
   * e.g. "selfIntro/interview-guide.html"
   */
  href: string;
  /** English script the interviewer reads to introduce the section. */
  introEn: string;
  /** Chinese script the interviewer reads to introduce the section. */
  introZh: string;
  /**
   * Optional heading shown above the interviewer intro script
   * (e.g. "🎤 引导进入系统设计 / Introduce System Design").
   * If omitted, a sensible default is used based on the section id
   * (s1=自我介绍, s2=技术问答, s3=编程测试, s4=候选人提问).
   */
  introHeading?: string;
}

export interface CandidateConfig {
  /** URL slug + folder name (must match `public/candidates/<id>/`). */
  id: string;
  /** Full display name, e.g. "Jorge Beltrán Pastor". */
  name: string;
  /** Short name used in scripts, e.g. "Jorge". */
  shortName: string;
  /** Two-letter initials shown on the home page card avatar. */
  initials: string;
  /** Role label, e.g. "SDE2 UI". */
  role: string;
  /** Total interview minutes. */
  totalMin: number;
  /** Brand text in the navbar, e.g. "📋 Phone Screen Guide". */
  brand: string;
  /** Accent color (hex) used by the home page card. */
  accent: string;
  /**
   * Scheduled interview time as an ISO 8601 string,
   * e.g. "2026-05-20T10:00:00-07:00". Leave undefined if not yet scheduled
   * (the card will show "未排期 / TBD" and sort to the end of the upcoming list).
   */
  scheduledAt?: string;
  /**
   * Mark the interview as completed. Completed candidates are always
   * sorted to the bottom of the home page list and visually dimmed.
   */
  completed?: boolean;
  /** Opening script (EN). */
  openingEn: string;
  /** Opening script (ZH). */
  openingZh: string;
  /** Closing script (EN). */
  closingEn: string;
  /** Closing script (ZH). */
  closingZh: string;
  /** Ordered list of sections. */
  sections: AgendaSection[];
}
