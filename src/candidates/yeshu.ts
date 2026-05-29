import type { CandidateConfig } from '../data/types';

/**
 * Yeshu Wu — 60-min onsite-style interview scaffolded on 2026-05-28.
 * 5-section layout (selfIntro / resume Q&A / coding 1 / coding 2 /
 * candidate Q). Coding 1 = inverse-function / black-box monotonic f
 * (shared with jorge/samarth/shirley/prosper). Coding 2 = matrix
 * multiplication (shared with xinfeng/prosper). The candidateQuestions
 * section reuses the same canonical set as recent candidates.
 *
 * Content fields below are placeholders (`TBD` / 待填写). Replace them
 * as the interview material is prepared. The static section pages under
 * `public/candidates/_completed/5-yeshu/` for selfIntro /
 * technicalQuestions are still stubs — overwrite their HTML when the
 * real guides are ready.
 */
export const yeshu: CandidateConfig = {
  id: 'yeshu',
  order: 5,
  name: 'Yeshu Wu',
  shortName: 'Yeshu',
  initials: 'YW',
  role: 'TBD',
  totalMin: 60,
  brand: '📋 Onsite Interview Guide',
  accent: '#be123c',
  scheduledAt: '2026-05-29T09:30:00',
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
      keyPoints: '反函数 / 黑盒单调 f 的反向求解 —— 二分搜索（无上界 → 指数倍增找右边界 → 经典二分定位）',
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
      keyPoints: '矩阵乘法 —— 三重循环 + 输入校验（空矩阵 / 非方阵 / 维度匹配）+ follow-up（cache 顺序 / 稀疏 / 并行 / 数值稳定性）',
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
