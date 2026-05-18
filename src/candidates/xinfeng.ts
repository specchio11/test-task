import type { CandidateConfig } from '../data/types';

/**
 * Xinfeng Chen — 60-min formal interview scaffolded on 2026-05-18.
 *
 * Candidate background (per resume): senior Microsoft Azure AI engineer,
 * owned Azure TTS service end-to-end (engine, pipelines, deploy, SLA, COGS).
 * Recently expanded to Azure OpenAI RealtimeAPI / SORA / Whisper. Heavy
 * systems / cloud-native / C# + C++ + GPU CUDA background. Light on
 * frontend and pure-algo work — agenda biases toward systems / design /
 * deep-dive accordingly.
 *
 * Content fields are placeholders (`TBD` / 待填写). Replace them as the
 * material is prepared. The static section pages under
 * `public/candidates/xinfeng/` are also stubs — overwrite their HTML
 * when the real guides are ready.
 */
export const xinfeng: CandidateConfig = {
  id: 'xinfeng',
  name: 'Xinfeng Chen',
  shortName: 'Xinfeng',
  initials: 'XC',
  role: 'TBD',
  totalMin: 60,
  brand: '📋 Onsite Interview Guide',
  accent: '#7c3aed',
  scheduledAt: '2026-05-19T08:30:00',

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
      titleEn: 'Resume-based Technical Deep-dive',
      navLabel: '② 技术深挖',
      time: '~20 min',
      keyPoints: '（待填写 · Azure TTS / SLA / COGS / K8s 栈深挖）',
      accent: 's2',
      href: 'technicalQuestions/interview-guide.html',
      introEn: '(TBD)',
      introZh: '（待填写）',
    },
    {
      id: 's3',
      num: '③',
      emoji: '🏗️',
      titleZh: '系统设计',
      titleEn: 'System Design',
      navLabel: '③ 系统设计',
      time: '~15 min',
      keyPoints: '（待填写 · 推荐：设计一个 TTS / Realtime 推理服务）',
      accent: 's3',
      href: 'systemDesign/interview-guide.html',
      introEn: '(TBD)',
      introZh: '（待填写）',
    },
    {
      id: 's4',
      num: '④',
      emoji: '💻',
      titleZh: '编程测试',
      titleEn: 'Coding Test',
      navLabel: '④ Coding',
      time: '~15 min',
      keyPoints: '（待填写 · 建议工程类题：LRU / 限流器 / scheduler）',
      accent: 's4',
      href: 'codingTest/interview-guide.html',
      introEn: '(TBD)',
      introZh: '（待填写）',
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
    },
  ],
};
