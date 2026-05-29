import type { CandidateConfig } from '../data/types';

/**
 * Prosper Amie — 60-min onsite-style interview scaffolded on 2026-05-28.
 * 5-section layout (selfIntro / resume Q&A / coding test 1 [Inverse Function]
 * / coding test 2 [Matrix Multiplication] / candidate Q). The
 * candidateQuestions section reuses the same canonical set shared across
 * recent candidates (Samarth, Shirley).
 *
 * Coding tests are ported from Shirley CT1 (Inverse Function) and Xinfeng CT
 * (Matrix Multiplication) — both align well with Prosper's large-scale C++ /
 * AWS cloud-systems background.
 */
export const prosper: CandidateConfig = {
  id: 'prosper',
  order: 4,
  name: 'Prosper Amie',
  shortName: 'Prosper',
  initials: 'PA',
  role: 'TBD',
  totalMin: 60,
  brand: '📋 Onsite Interview Guide',
  accent: '#7c3aed',
  scheduledAt: '2026-05-29T08:30:00',
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
      titleZh: '编程测试 1',
      titleEn: 'Coding Test 1',
      navLabel: '③ Coding',
      time: '~15 min',
      keyPoints: '反函数 / Inverse Function — 二分查找 + 边界条件 + 数值精度（C++ / Python / TS / C# 任一）',
      accent: 's3',
      problem: 'inverse-function',
      href: 'interview-guide.html',
      introEn: '(TBD)',
      introZh: '（待填写）',
      introHeading: '🎤 引导进入第一轮编程测试 / Introduce First Coding Exercise',
    },
    {
      id: 's4',
      num: '④',
      emoji: '💻',
      titleZh: '编程测试 2',
      titleEn: 'Coding Test 2',
      navLabel: '④ Coding 2',
      time: '~20 min',
      keyPoints: '矩阵乘法 / Matrix Multiplication — 性能优化（layout / cache / tiling / SIMD / CUDA）',
      accent: 's4',
      problem: 'matrix-multiplication',
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
      keyPoints: '沿用与 Shirley / Samarth 相同的一套候选人提问材料',
      accent: 's5',
      href: 'candidateQuestions/interview-guide.html',
      introEn: '(TBD)',
      introZh: '（待填写）',
      introHeading: '🎤 引导候选人提问 / Invite Candidate Questions',
    },
  ],
};
