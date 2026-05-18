import type { CandidateConfig } from '../data/types';

/**
 * Jorge Beltrán Pastor — SDE2 UI · 30 min phone screen.
 * Content (scripts, overview, sections) is a faithful port of the original
 * test-task/index.html, with no wording or styling changes.
 */
export const jorge: CandidateConfig = {
  id: 'jorge',
  name: 'Jorge Beltrán Pastor',
  shortName: 'Jorge',
  initials: 'JB',
  role: 'SDE2 UI',
  totalMin: 30,
  brand: '📋 Phone Screen Guide',
  accent: '#0284c7',
  completed: true,

  openingEn:
    "So today we have about 30 minutes. I'll start by having you do a quick intro, then I'll ask some questions about your background. After that we'll do a short coding problem together, and then at the end you can ask me anything. Let's get started!",
  openingZh:
    '今天一共大概 30 分钟，分四个部分：先请你做个简短的自我介绍，接着我根据简历问几个技术问题，然后一起做道编程题，最后留时间给你提问。我们开始吧。',

  closingEn:
    'Thank you so much for your time today, Jorge. Hope you have a great rest of your day!',
  closingZh: '非常感谢你今天的时间，Jorge。祝你今天一切顺利！',

  sections: [
    {
      id: 's1',
      num: '①',
      emoji: '🙋',
      titleZh: '自我介绍',
      titleEn: 'Self Introduction',
      navLabel: '① 自我介绍',
      time: '~5 min',
      keyPoints: '面试官开场 → 候选人介绍背景',
      accent: 's1',
      href: 'selfIntro/interview-guide.html',
      introEn:
        "Alright, let's get started. Could you give me a brief introduction about yourself — maybe 1 to 2 minutes?",
      introZh: '好的，那我们开始吧。能请你做一个简短的自我介绍吗？大概 1 到 2 分钟就好。',
    },
    {
      id: 's2',
      num: '②',
      emoji: '💬',
      titleZh: '技术问答',
      titleEn: 'Resume-based Technical Q&A',
      navLabel: '② 技术问答',
      time: '~10 min',
      keyPoints: '基于简历深挖技术细节',
      accent: 's2',
      href: 'technicalQuestions/interview-guide.html',
      introEn:
        "Great, thanks for sharing that. Now I'd like to ask you a few questions based on your resume — just to learn more about some of the projects and technologies you've worked with.",
      introZh:
        '很好，谢谢你的分享。接下来我想根据你的简历问几个问题——主要是想多了解一下你做过的一些项目和用过的技术。',
    },
    {
      id: 's3',
      num: '③',
      emoji: '💻',
      titleZh: '编程测试',
      titleEn: 'Coding Test',
      navLabel: '③ Coding',
      time: '~10 min',
      keyPoints: '单调递增函数反函数 · 二分查找',
      accent: 's3',
      href: 'codingTest/interview-guide.html',
      introEn:
        "Alright, let's move on to a short coding exercise. I'll describe a problem, and we can work through it together.",
      introZh: '好的，接下来我们做一道编程题。我会描述一个问题，我们可以一起讨论。',
    },
    {
      id: 's4',
      num: '④',
      emoji: '❓',
      titleZh: '候选人提问',
      titleEn: 'Candidate Q&A',
      navLabel: '④ 候选人提问',
      time: '~5 min',
      keyPoints: '候选人提问 → 结束面试',
      accent: 's4',
      href: 'candidateQuestions/interview-guide.html',
      introEn: "Great, that wraps up my questions. Do you have any questions for us?",
      introZh: '好的，我的问题已经问完了。你有什么问题想问我们吗？',
    },
  ],
};
