import type { CandidateConfig } from '../data/types';

/**
 * Shirley Huang — scaffolded on 2026-05-26. Junior-mid SDE (~2.5 yrs full-time
 * + ~16 months internships), currently at Zaber Technologies (Vancouver, BC).
 * Frontend-leaning fullstack: React/TypeScript + Python + AWS background.
 *
 * Defaulted to the same 60-min onsite-style layout as Samarth (5 sections,
 * 2 coding tests). Adjust format / sections / scheduling once the interview
 * shape is finalized.
 *
 * Content fields are placeholders (`TBD` / 待填写). Replace them as the
 * interview material is prepared. The static section pages under
 * `public/candidates/_completed/3-shirley/` are also stubs — overwrite
 * their HTML when the real guides are ready.
 */
export const shirley: CandidateConfig = {
  id: 'shirley',
  order: 3,
  name: 'Shirley Huang',
  shortName: 'Shirley',
  initials: 'SH',
  role: 'TBD',
  totalMin: 60,
  brand: '📋 Onsite Interview Guide',
  accent: '#0d9488',
  scheduledAt: '2026-05-28T10:00:00',
  completed: true,

  openingEn: '(TBD — opening script)',
  openingZh: '（待填写 · 开场白）',

  closingEn: '(TBD — closing script)',
  closingZh: '（待填写 · 结束语）',

  sections: [
    {
      id: 's1',
      num: '①',
      emoji: '🙋',
      titleZh: '自我介绍',
      titleEn: 'Self Introduction',
      navLabel: '① 自我介绍',
      time: '~5 min',
      keyPoints: '（待填写）',
      accent: 's1',
      href: 'selfIntro/interview-guide.html',
      introEn: '(TBD)',
      introZh: '（待填写）',
    },
    {
      id: 's2',
      num: '②',
      emoji: '💬',
      titleZh: '简历技术问答',
      titleEn: 'Resume-based Technical Q&A',
      navLabel: '② 技术问答',
      time: '~20 min',
      keyPoints: '基于简历挑 2–3 个 bullet 深挖，每个 bullet = 1 主问题 + 若干递进追问',
      accent: 's2',
      href: 'technicalQuestions/interview-guide.html',
      introEn: '(TBD)',
      introZh: '（待填写）',
    },
    {
      id: 's3',
      num: '③',
      emoji: '💻',
      titleZh: '编程测试',
      titleEn: 'Coding Test',
      navLabel: '③ Coding',
      time: '~15 min',
      keyPoints: '（待填写 · 根据 Shirley 背景选题）',
      accent: 's3',
      problem: 'inverse-function',
      href: 'interview-guide.html',
      introEn: '(TBD)',
      introZh: '（待填写）',
      introHeading: '🎤 引导进入编程测试 / Introduce Coding Exercise',
    },
    {
      id: 's5',
      num: '④',
      emoji: '❓',
      titleZh: '候选人提问',
      titleEn: 'Candidate Q&A',
      navLabel: '④ 候选人提问',
      time: '~5 min',
      keyPoints: '（待填写）',
      accent: 's5',
      href: 'candidateQuestions/interview-guide.html',
      introEn: '(TBD)',
      introZh: '（待填写）',
      introHeading: '🎤 引导候选人提问 / Invite Candidate Questions',
    },
  ],
};
