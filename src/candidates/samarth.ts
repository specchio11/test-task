import type { CandidateConfig } from '../data/types';

/**
 * Samarth Sharma — phone screen scaffolded on 2026-05-18.
 *
 * Content fields are placeholders (`TBD` / 待填写). Replace them as the
 * interview material is prepared. The static section pages under
 * `public/candidates/samarth/` are also stubs — overwrite their HTML when
 * the real guides are ready.
 */
export const samarth: CandidateConfig = {
  id: 'samarth',
  name: 'Samarth Sharma',
  shortName: 'Samarth',
  initials: 'SS',
  role: 'TBD',
  totalMin: 30,
  brand: '📋 Phone Screen Guide',
  accent: '#ea580c',
  scheduledAt: '2026-05-20T10:00:00',

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
      titleZh: '技术问答',
      titleEn: 'Resume-based Technical Q&A',
      navLabel: '② 技术问答',
      time: '~10 min',
      keyPoints: '（待填写）',
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
      time: '~10 min',
      keyPoints: '（待填写）',
      accent: 's3',
      href: 'codingTest/interview-guide.html',
      introEn: '(TBD)',
      introZh: '（待填写）',
    },
    {
      id: 's4',
      num: '④',
      emoji: '❓',
      titleZh: '候选人提问',
      titleEn: 'Candidate Q&A',
      navLabel: '④ 候选人提问',
      time: '~5 min',
      keyPoints: '（待填写）',
      accent: 's4',
      href: 'candidateQuestions/interview-guide.html',
      introEn: '(TBD)',
      introZh: '（待填写）',
    },
  ],
};
