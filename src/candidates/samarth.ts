import type { CandidateConfig } from '../data/types';

/**
 * Samarth Sharma — 60-min formal (onsite-style) interview scaffolded
 * on 2026-05-18. This is NOT a phone screen — it's the full technical loop.
 * 5 sections: self-intro / resume Q&A / coding 1 / coding 2 / candidate Q.
 *
 * Content fields are placeholders (`TBD` / 待填写). Replace them as the
 * interview material is prepared. The static section pages under
 * `public/candidates/_completed/2-samarth/` are also stubs — overwrite
 * their HTML when the real guides are ready.
 */
export const samarth: CandidateConfig = {
  id: 'samarth',
  order: 2,
  name: 'Samarth Sharma',
  shortName: 'Samarth',
  initials: 'SS',
  role: 'TBD',
  totalMin: 60,
  brand: '📝 Onsite Interview Guide',
  accent: '#ea580c',
  scheduledAt: '2026-05-20T10:00:00',
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
      keyPoints: '（待填写 · 根据 Samarth 背景选题）',
      accent: 's3',
      problem: 'inverse-function',
      href: 'interview-guide.html',
      introEn: '(TBD)',
      introZh: '（待填写）',
      introHeading: '🎤 引导进入编程测试 / Introduce Coding Exercise',
    },
    {
      id: 's4',
      num: '④',
      emoji: '💻',
      titleZh: '编程测试 2',
      titleEn: 'Coding Test 2',
      navLabel: '④ Coding 2',
      time: '~15 min',
      keyPoints: '（待填写 · 第二轮编程题）',
      accent: 's4',
      problem: 'task-scheduling-with-deadlines',
      href: 'interview-guide.html',
      introEn: '(TBD)',
      introZh: '（待填写）',
      introHeading: '🎤 引导进入第二轮编程测试 / Introduce Second Coding Exercise',
    },
    {
      id: 's5',
      num: '⑤',
      emoji: '❓',
      titleZh: '候选人提问',
      titleEn: 'Candidate Q&A',
      navLabel: '⑤ 候选人提问',
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
