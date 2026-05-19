import type { CandidateConfig } from '../data/types';

/**
 * Xinfeng Chen — 60-min formal (onsite-style) interview scaffolded
 * on 2026-05-18. This is NOT a phone screen — it's the full technical loop.
 *
 * Candidate background (per resume): senior Microsoft Azure AI engineer
 * (2018–2025, Suzhou / Beijing / Vancouver). Owned Azure TTS service
 * end-to-end (engine, pipelines, deploy, SLA, COGS). Scaled the TTS voice
 * library from tens to 500+ voices on K8s + KEDA + ZeroScaler stack.
 * Recently expanded to Azure OpenAI RealtimeAPI / SORA / Whisper as DRI.
 * Heavy systems / cloud-native / C# + C++ + GPU CUDA background. Light on
 * frontend and pure-algo work — agenda biases toward systems / design /
 * resume deep-dive accordingly.
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
  role: 'Senior SDE · Azure AI / TTS',
  totalMin: 45,
  brand: '📋 Onsite Interview Guide',
  accent: '#4338ca',
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
      id: 's4',
      num: '③',
      emoji: '💻',
      titleZh: '编程测试',
      titleEn: 'Coding Test',
      navLabel: '③ Coding',
      time: '~15 min',
      keyPoints: '（待填写 · 建议工程类题：LRU / 限流器 / scheduler）',
      accent: 's4',
      href: 'codingTest/interview-guide.html',
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
