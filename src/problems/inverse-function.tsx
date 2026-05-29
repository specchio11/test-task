import type { CandidateConfig } from '../data/types';
import {
  Badge,
  Card,
  CodeBlock,
  Collapsible,
  FlowChart,
  GuideShell,
  HintChip,
  InterviewerNote,
  QuickGroup,
  QuickLink,
  ScriptBlock,
  Section,
  Separator,
  Tag,
  useKeyboardShortcuts,
  VersionTabs,
} from '../components/guide';
import { buildProblemNavItems } from './navItems';
import type { ProblemEntry } from './types';

/* ============================================================
 * ⚠️ INTERVIEWER GUIDE — 反函数 / Inverse of a Monotonic Function
 * ------------------------------------------------------------
 * Direct React translation of the original
 *   public/coding-problems/inverse-function/interview-guide.html
 * (no longer shipped). Structure: intro → problem (3 versions) →
 * stuck hints (0–4) → followups (1–4) → checkpoints → solution →
 * rubric → decision flow.
 * ============================================================ */

export function InverseFunctionPage({
  candidate,
  activeSectionId,
}: {
  candidate?: CandidateConfig;
  activeSectionId?: string | null;
}) {
  useKeyboardShortcuts({
    '0': 'stuck0',
    '1': 'stuck1',
    '2': 'stuck2',
    '3': 'stuck3',
    '4': 'stuck4',
    q: 'problem',
    a: 'solution',
    r: 'rubric',
    f: 'flowchart',
  });

  const { navItems, backHref } = buildProblemNavItems(candidate, activeSectionId);

  return (
    <GuideShell
      backHref={backHref}
      navItems={navItems}
      quickPanel={<InverseFunctionQuickPanel />}
    >
      <h1>🎯 前端 SDE2 电话面试算法题：实现反函数</h1>

      <Card id="intro-script" variant="intro">
        <h4>🎤 引导进入编程测试 / Introduce Coding Exercise</h4>
        <ScriptBlock
          withLabel={false}
          en={
            <>
              "Alright, let's move on to a short coding exercise. I'll describe
              a problem, and we can work through it together."
            </>
          }
          zh={<>"好的，接下来我们做一道编程题。我会描述一个问题，我们可以一起讨论。"</>}
        />
      </Card>

      <Section id="problem">📋 题面 / Problem Statement</Section>

      <VersionTabs
        tabs={[
          { id: 'formal', label: <>📄 正式版</>, content: <ProblemFormal /> },
          {
            id: 'conversational',
            label: <>🗣️ 口语版（推荐）</>,
            content: <ProblemConversational />,
          },
          { id: 'plain', label: <>🧸 最简化版</>, content: <ProblemPlain /> },
        ]}
        defaultTabId="formal"
      />

      <AfterProblemCard />

      <Separator />
      <Section id="sticking-points">
        🚨 候选人卡壳情况及提示策略 / Sticking Points &amp; Hints
      </Section>

      <Stuck0 />
      <Stuck1 />
      <Stuck2 />
      <Stuck3 />
      <Stuck4 />

      <Separator />
      <Section id="followups">💬 拓展追问 / Follow-up Questions</Section>
      <p style={{ color: 'var(--text-muted)' }}>
        候选人完成主题后，根据剩余时间和表现选择性使用。
      </p>

      <Followup1 />
      <Followup2 />
      <Followup3 />
      <Followup4 />

      <Card style={{ marginTop: 16 }}>
        <h4>追问使用建议汇总 / Follow-up Usage Summary</h4>
        <table>
          <tbody>
            <tr>
              <th>追问</th>
              <th>耗时</th>
              <th>适用场景</th>
              <th>难度</th>
            </tr>
            <tr>
              <td>1. 答案不存在</td>
              <td>1-2 min</td>
              <td>候选人快速完成，填补时间</td>
              <td>⭐</td>
            </tr>
            <tr>
              <td>2. 多次调用优化</td>
              <td>2-3 min</td>
              <td>展现了工程思维</td>
              <td>⭐⭐</td>
            </tr>
            <tr>
              <td>3. 非递减找左边界</td>
              <td>3-5 min</td>
              <td>二分熟练，测试变体</td>
              <td>⭐⭐⭐</td>
            </tr>
            <tr>
              <td>4. 并行异步调用</td>
              <td>3-5 min</td>
              <td>前端候选人，测异步</td>
              <td>⭐⭐⭐⭐</td>
            </tr>
          </tbody>
        </table>
      </Card>

      <Separator />
      <Section id="checkpoints">🔍 关键考察节点 / Key Checkpoints</Section>
      <Checkpoints />

      <Separator />
      <Section id="solution">💡 标准答案 / Model Solution</Section>
      <Solution />

      <Separator />
      <Section id="rubric">📊 评判标准 / Evaluation Rubric</Section>
      <Rubric />

      <Separator />
      <Section id="flowchart">🗺️ 面试官速查流程图 / Quick Decision Flow</Section>
      <FlowChart>
        {`候选人独立写出二分了吗？ / Did candidate write binary search independently?
├── 否 / No → 给提示后写出来了吗？
│        ├── 否 / No → ❌ Not Hire
│        └── 是 / Yes → 上界怎么处理的？
│                 ├── 硬编码常数 → ⚠️ Lean No
│                 └── 倍增或 high=y → ⚠️ Weak SDE2
├── 是 / Yes → 上界怎么处理的？
│        ├── 硬编码常数 → ⚠️ Weak SDE2
│        ├── 倍增 (一种方案) → ✅ SDE2
│        ├── 推导出 high=y (一种方案) → ✅ SDE2
│        └── 两种都知道且能对比 → 🌟 Strong / Senior
└── 代码是否有 bug？
         ├── 无 bug + 主动考虑边界 → 加分 ✅
         └── 有 bug 但能在追问下修复 → 不扣分`}
      </FlowChart>
    </GuideShell>
  );
}

/* ===================== Quick panel ===================== */

function InverseFunctionQuickPanel() {
  return (
    <>
      <QuickLink target="intro-script">🎤 引入词</QuickLink>
      <QuickLink target="problem">📋 题面</QuickLink>

      <QuickGroup title="🚨 卡壳提示">
        <QuickLink target="stuck0" sub color="red">0 — 不理解数学概念</QuickLink>
        <QuickLink target="stuck1" sub color="red">1 — 完全没思路</QuickLink>
        <QuickLink target="stuck2" sub color="red">2 — 不知道上界</QuickLink>
        <QuickLink target="stuck3" sub color="red">3 — 倍增→更直接？</QuickLink>
        <QuickLink target="stuck4" sub color="red">4 — high=y→更高效？</QuickLink>
      </QuickGroup>

      <QuickGroup title="💬 拓展追问">
        <QuickLink target="followup1" sub color="purple">1 — 答案不存在 ⭐</QuickLink>
        <QuickLink target="followup2" sub color="purple">2 — 多次调用优化 ⭐⭐</QuickLink>
        <QuickLink target="followup3" sub color="purple">3 — 非递减左边界 ⭐⭐⭐</QuickLink>
        <QuickLink target="followup4" sub color="purple">4 — 并行异步 ⭐⭐⭐⭐</QuickLink>
      </QuickGroup>

      <QuickLink target="checkpoints">🔍 考察节点</QuickLink>
      <QuickLink target="solution">💡 标准答案</QuickLink>
      <QuickLink target="rubric">📊 评判标准</QuickLink>
      <QuickLink target="flowchart">🗺️ 流程图</QuickLink>
    </>
  );
}

/* ===================== Problem statement variants ===================== */

function ProblemFormal() {
  return (
    <>
      <h4>English:</h4>
      <blockquote>
        You are given a black-box function <code>f(x)</code> that maps non-negative integers to non-negative integers. <code>f</code> is <strong>strictly monotonically increasing</strong> (i.e., for any a &lt; b, f(a) &lt; f(b)).
        <br /><br />
        You can only call <code>f(x)</code> — you cannot inspect its implementation.
        <br /><br />
        <strong>Task:</strong> Implement its inverse function <code>g(y)</code> — given a value <code>y</code>, return the integer <code>x</code> such that <code>f(x) = y</code>. You may assume that for every input <code>y</code>, a valid <code>x</code> always exists.
      </blockquote>
      <h4>中文:</h4>
      <blockquote>
        给定一个黑盒函数 <code>f(x)</code>，它将非负整数映射到非负整数。<code>f</code> <strong>严格单调递增</strong>（即对于任意 a &lt; b，有 f(a) &lt; f(b)）。
        <br /><br />
        你只能调用 <code>f(x)</code>，不能查看其内部实现。
        <br /><br />
        <strong>任务：</strong>实现它的反函数 <code>g(y)</code> —— 给定一个值 <code>y</code>，返回整数 <code>x</code> 使得 <code>f(x) = y</code>。你可以假设对于每一个输入的 <code>y</code>，合法的 <code>x</code> 一定存在。
      </blockquote>
    </>
  );
}

function ProblemConversational() {
  return (
    <>
      <p style={{ color: 'var(--green)', fontWeight: 600, marginBottom: 8 }}>
        🗣️ 推荐面试时直接用这个版本念给候选人
      </p>
      <h4>English:</h4>
      <blockquote>
        "Alright, here's the problem. Imagine you have a function <code>f</code> — you can call it with any non-negative integer, and it gives you back a non-negative integer. You can't look inside it, it's a black box. The one thing you do know is that it's strictly increasing — so if you feed it a bigger number, you always get a bigger result. No ties, no going backwards.
        <br /><br />
        Now, what I need you to do is write the reverse of that function. I'll give you some output value <code>y</code>, and you need to figure out: what input <code>x</code> did it come from? In other words, find <code>x</code> such that <code>f(x) = y</code>.
        <br /><br />
        You can assume there's always a valid answer — I won't give you a <code>y</code> that doesn't match any <code>x</code>. Sound good? Go ahead."
      </blockquote>
      <h4>中文:</h4>
      <blockquote>
        "好，我来说一下题目。假设你有一个函数 <code>f</code>，你可以给它传入任何非负整数，它会返回一个非负整数。你看不到它的内部实现，它是一个黑盒。但你知道一件事：它是严格递增的——也就是说你给的数越大，它返回的结果就一定越大。不会有相等，也不会有倒退。
        <br /><br />
        现在我需要你做的是：写一个'反向'的函数。我给你一个输出值 <code>y</code>，你要找出它是从哪个输入 <code>x</code> 来的。换句话说，找到 <code>x</code> 使得 <code>f(x) = y</code>。
        <br /><br />
        你可以假设答案一定存在——我不会给你一个不对应任何 <code>x</code> 的 <code>y</code>。清楚了吗？那就开始吧。"
      </blockquote>
    </>
  );
}

function ProblemPlain() {
  return (
    <>
      <p style={{ color: 'var(--yellow)', fontWeight: 600, marginBottom: 8 }}>
        🧸 当候选人不理解 "单调递增"、"反函数" 等术语时使用
      </p>
      <h4>English:</h4>
      <blockquote>
        "Let me break it down more simply. Forget the math jargon for a moment.
        <br /><br />
        Think of <code>f</code> as a machine. You put in a number, it spits out a number. You can't open the machine to see how it works. All you know is one rule: <strong>if you put in a bigger number, you always get a bigger number out.</strong> It never stays the same, and it never goes down.
        <br /><br />
        For example, let's say:
        <br />
        • You put in <code>3</code>, the machine gives you <code>10</code>.
        <br />
        • You put in <code>5</code>, it gives you <code>17</code>.
        <br />
        • You put in <code>8</code>, it gives you <code>25</code>.
        <br /><br />
        See? Bigger input, bigger output. Every time.
        <br /><br />
        Now here's your task: <strong>I'm going to give you an output, and you have to figure out what input produced it.</strong> Like if I say 'the machine output <code>17</code>', you should tell me the input was <code>5</code>. That's it.
        <br /><br />
        You're writing a function that takes the output and finds the input. And don't worry — I promise there's always exactly one right answer."
      </blockquote>
      <h4>中文:</h4>
      <blockquote>
        "我换个更简单的方式说。先不管那些数学术语。
        <br /><br />
        你把 <code>f</code> 想象成一台机器。你往里面塞一个数字，它会吐出一个数字。你看不到机器里面怎么运作的。你唯一知道的一条规则是：<strong>如果你塞进去的数字更大，它吐出来的数字也一定更大。</strong> 不会相同，也不会变小。
        <br /><br />
        举个例子：
        <br />
        • 你塞进去 <code>3</code>，机器吐出 <code>10</code>。
        <br />
        • 你塞进去 <code>5</code>，它吐出 <code>17</code>。
        <br />
        • 你塞进去 <code>8</code>，它吐出 <code>25</code>。
        <br /><br />
        看到了吧？输入越大，输出就越大。每次都是这样。
        <br /><br />
        现在你的任务是：<strong>我告诉你一个输出结果，你要倒推出是哪个输入产生了它。</strong> 比如我说'机器输出了 <code>17</code>'，你要告诉我输入是 <code>5</code>。就这么简单。
        <br /><br />
        你要写一个函数，接收这个输出值，找到对应的输入值。放心——答案一定存在，而且只有一个。"
      </blockquote>
    </>
  );
}

function AfterProblemCard() {
  return (
    <Card id="after-problem" variant="after">
      <h4 style={{ color: '#059669' }}>💬 读完题后的衔接语 / After reading the problem</h4>

      <p style={{ margin: '8px 0 4px', fontWeight: 600, color: '#059669' }}>
        ① 先问用什么语言 / Ask the language first
      </p>
      <ScriptBlock
        withLabel={false}
        en={
          <>
            "We'll be coding this in an online editor (HackerRank). Before I drop in the starter, what language do you want to use? I have <strong>C++</strong>, <strong>Python</strong>, and <strong>TypeScript</strong> ready to go — pick whichever you're most comfortable with."
          </>
        }
        zh={
          <>
            "我们用一个 online coding editor（HackerRank）来写。在我把模板贴进去之前，先问你一下：用什么语言比较顺手？<strong>C++ / Python / TypeScript</strong> 我都准备好了。"
          </>
        }
      />

      <p style={{ margin: '16px 0 4px', fontWeight: 600, color: '#059669' }}>
        ② 贴入对应模板后说明 / After pasting the matching starter
      </p>
      <ScriptBlock
        withLabel={false}
        en={
          <>
            "Okay, I just pasted the [language] starter in. It already includes the <strong>input parser and test cases</strong> — the only thing you need to touch is the body of <code>g(y)</code> at the top. Right now <code>g</code> calls a mock placeholder, so if you hit <strong>Run</strong> straight away you'll see the output format: each test case prints as <code>g(y) = x  ✓</code> or <code>✗</code>, followed by a <code>Result: N / M correct</code> line at the bottom. Your job is to replace the placeholder so it prints <strong>7 / 7</strong>. Everything below the <code>👆 ONLY EDIT ABOVE</code> line is fixed scaffolding — no need to scroll down or modify any of it."
          </>
        }
        zh={
          <>
            "好，我把【对应语言】的模板贴进去了。<strong>input parser 和 test cases 都已经写好</strong>了——你唯一需要动的就是最上面 <code>g(y)</code> 函数的实现。当前 <code>g</code> 里用的是一个 mock 占位，你现在直接点 <strong>Run</strong> 就能看到输出格式：每个用例会打印成 <code>g(y) = x  ✓</code> 或 <code>✗</code>，最下面有一行 <code>Result: N / M correct</code>。你的任务就是把占位换掉，让它变成 <strong>7 / 7</strong>。<code>👆 ONLY EDIT ABOVE</code> 那条线下面都是固定的脚手架，不需要 scroll down 去看，也不需要改。"
          </>
        }
      />
    </Card>
  );
}

/* ===================== Stuck hints ===================== */

function Stuck0() {
  return (
    <div id="stuck0">
      <Collapsible summary={<>🤔 卡壳 0：不理解题目中的数学概念 / Stuck 0: Doesn't understand the math concepts</>}>
        <p><strong>表现 / Symptom：</strong>候选人对"单调递增"或"反函数"的概念感到困惑，无法理解题意。</p>

        <h4>解释"单调递增" / Explaining "monotonically increasing"：</h4>
        <blockquote>
          "It simply means: the bigger the input, the bigger the output. If you put in a larger <code>x</code>, you always get a larger <code>f(x)</code>. It never goes down. For example, <code>f(x) = 2x + 1</code> — as x grows, f(x) always grows."
          <br /><br />
          "简单来说就是：输入越大，输出也越大。如果你给一个更大的 <code>x</code>，<code>f(x)</code> 的结果一定更大，永远不会变小。比如 <code>f(x) = 2x + 1</code>，x 越大，f(x) 就越大。"
        </blockquote>

        <h4>解释"反函数" / Explaining "inverse function"：</h4>
        <blockquote>
          "Think of it as 'reversing' the function. If <code>f(5) = 13</code>, then the inverse function <code>g(13)</code> should return <code>5</code>. You're given the output and need to find the original input."
          <br /><br />
          "可以理解为'反过来'。如果 <code>f(5) = 13</code>，那反函数 <code>g(13)</code> 就应该返回 <code>5</code>。也就是给你一个输出值，让你找到原来的输入。"
        </blockquote>

        <InterviewerNote>
          <strong>⚠️ 面试官注意：</strong>这个解释<strong>不算提示</strong>，不应影响对候选人算法能力的评分。数学术语可能对非英语母语的候选人造成理解障碍，澄清概念是公平的。但如果候选人在理解概念后仍然长时间没有思路，则按卡壳 1 处理。
        </InterviewerNote>
      </Collapsible>
    </div>
  );
}

function Stuck1() {
  return (
    <div id="stuck1">
      <Collapsible summary={<>😶 卡壳 1：完全没思路 / Stuck 1: No idea what algorithm to use</>}>
        <p>
          <strong>表现 / Symptom：</strong>沉默，或者直接写暴力遍历。/ Silent, or jumps straight to brute-force linear scan.
        </p>
        <table>
          <tbody>
            <tr><th>提示等级</th><th>English</th><th>中文</th></tr>
            <tr>
              <td><HintChip level="light" /> Hint 1</td>
              <td>"What property of <code>f</code> makes this problem easier than searching in an unsorted collection?"</td>
              <td>"<code>f</code> 的什么性质让这个问题比在无序集合里搜索更简单？"</td>
            </tr>
            <tr>
              <td><HintChip level="medium" /> Hint 2</td>
              <td>"This is less of a math problem and more of a classic algorithm problem — actually a very common pattern on LeetCode. You may have seen something like this before."</td>
              <td>"与其说这是一个数学问题，不如说这就是一道很经典的算法题——在 LeetCode 上也非常常见，也许你之前见过类似的。"</td>
            </tr>
            <tr>
              <td><HintChip level="medium" /> Hint 3</td>
              <td>"If I told you x is somewhere between 0 and 1000, how would you find it efficiently?"</td>
              <td>"如果我告诉你 x 在 0 到 1000 之间，你会怎么高效地找到它？"</td>
            </tr>
            <tr>
              <td><HintChip level="heavy" /> Hint 4</td>
              <td>"Think about binary search. The function is monotonically increasing — what does that remind you of?"</td>
              <td>"想想二分查找。这个函数是单调递增的——这让你联想到什么？"</td>
            </tr>
          </tbody>
        </table>
      </Collapsible>
    </div>
  );
}

function Stuck2() {
  return (
    <div id="stuck2">
      <Collapsible summary={<>📐 卡壳 2：知道二分，但不知道上界 / Stuck 2: Knows BS, can't determine upper bound</>}>
        <p>
          <strong>表现 / Symptom：</strong>写出了二分的框架，但 <code>high = ???</code> 空着或者随便填了个大常数。/ Writes the binary search skeleton, but leaves <code>high = ???</code> blank or hardcodes a large constant.
        </p>
        <table>
          <tbody>
            <tr><th>提示等级</th><th>English</th><th>中文</th></tr>
            <tr>
              <td><HintChip level="light" /> Hint 1</td>
              <td>"Given that f maps non-negative integers to non-negative integers and is strictly increasing, what can you say about the relationship between <code>f(x)</code> and <code>x</code>?"</td>
              <td>"已知 f 将非负整数映射到非负整数，而且是严格递增的——你能说出 <code>f(x)</code> 和 <code>x</code> 之间有什么关系吗？"</td>
            </tr>
            <tr>
              <td><HintChip level="medium" /> Hint 2</td>
              <td>"If f(0) {'>'}= 0 and f(1) must be strictly greater than f(0), and all values are integers... what's the minimum possible value of f(1)? f(2)? f(n)?"</td>
              <td>"如果 f(0) {'>'}= 0，而且 f(1) 必须严格大于 f(0)，所有值都是整数……f(1) 最小可能是多少？f(2) 呢？f(n) 呢？"</td>
            </tr>
            <tr>
              <td><HintChip level="heavy" /> Hint 3</td>
              <td>"Can you prove that f(x) {'>'}= x? If so, what does that tell you about the upper bound for x given y?"</td>
              <td>"你能证明 f(x) {'>'}= x 吗？如果能，这对于已知 y 时 x 的上界意味着什么？"</td>
            </tr>
          </tbody>
        </table>
      </Collapsible>
    </div>
  );
}

function Stuck3() {
  return (
    <div id="stuck3">
      <Collapsible summary={<>🔄 卡壳 3：用了倍增，被追问能否更直接 / Stuck 3: Used doubling, asked for simpler</>}>
        <p>
          <strong>表现 / Symptom：</strong>写出了完整的倍增 + 二分，但面试官追问有没有更简单的方式。/ Wrote a complete doubling + binary search, but interviewer asks if there's a simpler approach.
        </p>
        <table>
          <tbody>
            <tr><th>提示等级</th><th>English</th><th>中文</th></tr>
            <tr>
              <td><HintChip level="light" /> Hint 1</td>
              <td>"Your exponential search works great. But since we know f maps integers to integers and is strictly increasing, is there a mathematical argument that x can never be larger than y?"</td>
              <td>"你的倍增搜索方案很棒。但既然我们知道 f 是整数到整数的严格递增映射，有没有一个数学论证能说明 x 永远不会大于 y？"</td>
            </tr>
          </tbody>
        </table>
      </Collapsible>
    </div>
  );
}

function Stuck4() {
  return (
    <div id="stuck4">
      <Collapsible summary={<>⚡ 卡壳 4：用了 high=y，被追问更高效 / Stuck 4: Used high=y, asked for more efficient</>}>
        <p>
          <strong>表现 / Symptom：</strong>写出了正确的 [0, y] 二分，但面试官追问性能。/ Wrote a correct [0, y] binary search, but interviewer probes on performance.
        </p>
        <table>
          <tbody>
            <tr><th>提示等级</th><th>English</th><th>中文</th></tr>
            <tr>
              <td><HintChip level="light" /> Hint 1</td>
              <td>"Your solution is O(log y). But imagine f(x) = 2^x and y = 1,000,000. The actual x is only 20. Can you find x in O(log 20) instead of O(log 1,000,000)?"</td>
              <td>"你的方案是 O(log y)。但想象一下 f(x) = 2^x，y = 1,000,000。实际的 x 只有 20。你能用 O(log 20) 而不是 O(log 1,000,000) 来找到 x 吗？"</td>
            </tr>
            <tr>
              <td><HintChip level="medium" /> Hint 2</td>
              <td>"What if you don't start with high = y, but instead grow high from 1 by doubling until f(high) {'>'}= y?"</td>
              <td>"如果你不从 high = y 开始，而是从 high = 1 开始，每次翻倍直到 f(high) {'>'}= y，会怎么样？"</td>
            </tr>
          </tbody>
        </table>
      </Collapsible>
    </div>
  );
}

/* ===================== Follow-ups ===================== */

function Followup1() {
  return (
    <div id="followup1">
      <Collapsible
        summary={
          <>
            追问 1：答案不保证存在 / Answer Not Guaranteed{' '}
            <Tag variant="time">1-2 min</Tag>
            <Tag variant="diff-1">⭐ Easy</Tag>
          </>
        }
      >
        <h4>提问 / Question：</h4>
        <blockquote>
          "What if I remove the guarantee that a valid <code>x</code> always exists? How would you modify your solution to return <code>-1</code> or <code>null</code> when no <code>x</code> satisfies <code>f(x) = y</code>?"
          <br /><br />
          "如果我去掉'答案一定存在'这个保证呢？当没有任何 <code>x</code> 满足 <code>f(x) = y</code> 时，你怎么修改你的方案让它返回 <code>-1</code> 或 <code>null</code>？"
        </blockquote>

        <h4>标准答案 / Expected Answer：</h4>

        <p><strong>English：</strong></p>
        <p>The current binary search code actually handles this case naturally. Let's trace through the logic:</p>
        <ol>
          <li>The <code>while (low &lt;= high)</code> loop keeps narrowing the search range by moving <code>low</code> up or <code>high</code> down.</li>
          <li>If a valid <code>x</code> exists, we'll hit <code>f(mid) === y</code> and return <code>mid</code> before the loop ends.</li>
          <li>If no valid <code>x</code> exists, we'll never hit the <code>=== y</code> case. Eventually <code>low</code> will exceed <code>high</code>, the loop terminates, and we reach the line after the loop.</li>
        </ol>
        <p>So the only change needed is replacing the <code>throw</code> with a <code>return -1</code>.</p>

        <p><strong>中文：</strong></p>
        <p>当前的二分代码其实已经天然处理了这个情况。让我们梳理一下逻辑：</p>
        <ol>
          <li><code>while (low &lt;= high)</code> 循环不断缩小搜索范围——每轮要么 <code>low</code> 右移，要么 <code>high</code> 左移。</li>
          <li>如果合法的 <code>x</code> 存在，我们会在循环结束前命中 <code>f(mid) === y</code> 并返回 <code>mid</code>。</li>
          <li>如果合法的 <code>x</code> 不存在，我们永远不会命中 <code>=== y</code> 的情况。最终 <code>low</code> 会超过 <code>high</code>，循环终止，执行到循环后面的语句。</li>
        </ol>
        <p>所以唯一需要改的就是把 <code>throw</code> 换成 <code>return -1</code>：</p>

        <CodeBlock>{`// throw new Error("No valid x found");
return -1;  // or return null;`}</CodeBlock>

        <p>
          <strong>关键理解 / Key Insight：</strong>这道追问的核心不在于写新代码，而在于候选人是否<strong>真正理解自己写的二分代码的终止行为</strong>——循环结束时 <code>low &gt; high</code> 意味着搜索区间为空，自然就是"没找到"。
          <br />
          The core of this follow-up is not about writing new code, but whether the candidate <strong>truly understands the termination behavior of their own binary search</strong> — when the loop ends with <code>low &gt; high</code>, the search range is empty, which naturally means "not found."
        </p>

        <h4>评价标准 / Evaluation：</h4>
        <table>
          <tbody>
            <tr><th>候选人反应 / Response</th><th>评价 / Assessment</th></tr>
            <tr><td>立刻回答"改 throw 为 return -1 就行" / Immediately says "just change throw to return -1"</td><td>✅ 理解透彻 / Thorough understanding</td></tr>
            <tr><td>想了一会儿，重新审视循环终止条件后答对 / Thinks a moment, reviews loop termination, then answers correctly</td><td>✅ 可以接受 / Acceptable</td></tr>
            <tr><td>试图加一堆额外的 if 判断来处理 / Tries to add many extra if-checks</td><td>⚠️ 不够理解自己代码的逻辑 / Doesn't fully understand own code logic</td></tr>
          </tbody>
        </table>
      </Collapsible>
    </div>
  );
}

function Followup2() {
  return (
    <div id="followup2">
      <Collapsible
        summary={
          <>
            追问 2：多次调用 g(y) 优化 / Optimizing for Multiple Calls{' '}
            <Tag variant="time">2-3 min</Tag>
            <Tag variant="diff-2">⭐⭐ Medium</Tag>
          </>
        }
      >
        <h4>提问 / Question：</h4>
        <blockquote>
          "If <code>g</code> is going to be called millions of times with different <code>y</code> values, but <code>f</code> never changes, how would you optimize?"
          <br /><br />
          "如果 <code>g</code> 会被调用数百万次，每次传入不同的 <code>y</code>，但 <code>f</code> 始终不变，你会怎么优化？"
        </blockquote>

        <h4>标准答案 / Expected Answer：</h4>
        <p>有三层优化策略，由浅到深 / Three optimization layers, from simple to advanced:</p>

        <p><strong>策略 1：缓存 g(y) 的返回值 / Strategy 1: Cache g(y) results</strong></p>
        <blockquote>
          Use a <code>Map&lt;y, x&gt;</code> to cache each <code>g(y)</code> result. On subsequent calls with the same <code>y</code>, return the cached value directly in O(1). This is the most basic optimization — a simple memoization pattern that any engineer should think of.
          <br /><br />
          用一个 <code>Map&lt;y, x&gt;</code> 缓存每次 <code>g(y)</code> 的返回值。下次再用相同的 <code>y</code> 调用时，直接 O(1) 返回缓存值。这是最基本的优化——简单的记忆化模式，任何工程师都应该想到。
        </blockquote>

        <p><strong>策略 2：缓存 f 的中间调用结果 / Strategy 2: Cache intermediate f(mid) calls</strong></p>
        <blockquote>
          During each binary search, we call <code>f(mid)</code> at several points. Store all <code>(mid, f(mid))</code> pairs in a sorted cache. On subsequent <code>g(y)</code> calls, scan the cache to find the tightest known bounds: the largest cached <code>f(x₁) &lt; y</code> gives a better <code>low</code>, and the smallest cached <code>f(x₂) &gt; y</code> gives a better <code>high</code>. This dramatically narrows the search range over time.
          <br /><br />
          每次二分过程中会调用多次 <code>f(mid)</code>。把所有 <code>(mid, f(mid))</code> 对存入一个有序缓存。下次调用 <code>g(y)</code> 时，先在缓存中查找最紧的已知边界：最大的 <code>f(x₁) &lt; y</code> 可以作为更好的 <code>low</code>，最小的 <code>f(x₂) &gt; y</code> 可以作为更好的 <code>high</code>。随着调用次数增多，搜索范围会越来越窄。
        </blockquote>

        <p><strong>策略 3：预构建查找表 / Strategy 3: Pre-build a lookup table</strong></p>
        <blockquote>
          If we know the approximate range of <code>x</code> (say 0 to N), pre-compute <code>f(0), f(1), ..., f(N)</code> into a sorted array. Then every future <code>g(y)</code> call is just a binary search on this array — no <code>f</code> calls at all. Upfront cost is O(N) calls to <code>f</code>, but all subsequent lookups are O(log N) with zero <code>f</code> overhead.
          <br /><br />
          如果我们知道 <code>x</code> 的大致范围（比如 0 到 N），可以预先计算 <code>f(0), f(1), ..., f(N)</code> 并存到一个有序数组里。之后每次 <code>g(y)</code> 调用都只是在这个数组上做二分——完全不需要再调用 <code>f</code>。前期成本是 O(N) 次 <code>f</code> 调用，但之后所有查询都是 O(log N) 且零 <code>f</code> 调用开销。
        </blockquote>

        <h4>评价标准 / Evaluation：</h4>
        <table>
          <tbody>
            <tr><th>候选人反应 / Response</th><th>评价 / Assessment</th></tr>
            <tr><td>提到结果缓存 (Map) / Mentions result caching (Map)</td><td>✅ SDE2 水平 / SDE2 level</td></tr>
            <tr><td>提到缓存中间 f 调用来缩小搜索范围 / Mentions caching intermediate f calls to narrow future searches</td><td>🌟 Senior 思维 / Senior-level thinking</td></tr>
            <tr><td>提到预构建查找表 / Mentions pre-building a lookup table</td><td>🌟 系统设计能力强 / Strong system design</td></tr>
            <tr><td>完全没有思路 / No idea at all</td><td>⚠️ 缺乏工程优化意识 / Lacks engineering optimization awareness</td></tr>
          </tbody>
        </table>
      </Collapsible>
    </div>
  );
}

function Followup3() {
  return (
    <div id="followup3">
      <Collapsible
        summary={
          <>
            追问 3：非严格递增，找最小 x / Non-Decreasing, Find Smallest x{' '}
            <Tag variant="time">3-5 min</Tag>
            <Tag variant="diff-3">⭐⭐⭐ Hard</Tag>
          </>
        }
      >
        <h4>提问 / Question：</h4>
        <blockquote>
          "What if <code>f</code> is non-decreasing instead of strictly increasing? That means <code>f(a) &lt;= f(b)</code> for <code>a &lt; b</code>, and multiple <code>x</code> values could map to the same <code>y</code>. How would you return the <strong>smallest</strong> such <code>x</code>?"
          <br /><br />
          "如果 <code>f</code> 是非递减的而不是严格递增的呢？也就是说 <code>f(a) &lt;= f(b)</code>（可以相等），多个 <code>x</code> 可能映射到同一个 <code>y</code>。你怎么返回<strong>最小的</strong>那个 <code>x</code>？"
        </blockquote>

        <h4>标准答案 / Expected Answer：</h4>

        <p><strong>English：</strong></p>
        <p>This is the classic <strong>"lower bound binary search"</strong> — one of the most important binary search variants, extremely common in real engineering (database index lookups, range queries, etc.).</p>
        <p>The key insight: in the original problem, when <code>f(mid) === y</code>, we immediately return <code>mid</code>. But now, there might be an even smaller <code>x</code> to the left that also satisfies <code>f(x) === y</code>. So we need to:</p>
        <ol>
          <li><strong>Record</strong> <code>mid</code> as a candidate answer (it's valid, but maybe not the smallest).</li>
          <li><strong>Keep searching left</strong> by setting <code>high = mid - 1</code>, to see if there's a smaller valid <code>x</code>.</li>
          <li>When the loop ends, the last recorded candidate is the smallest valid <code>x</code>.</li>
        </ol>

        <p><strong>中文：</strong></p>
        <p>这是经典的<strong>"找左边界的二分"（lower bound binary search）</strong>——二分查找最重要的变种之一，在实际工程（数据库索引查找、范围查询等）中极其常见。</p>
        <p>关键思路：原题中，当 <code>f(mid) === y</code> 时我们立刻返回 <code>mid</code>。但这里，左边可能还有更小的 <code>x</code> 也满足 <code>f(x) === y</code>。所以我们需要：</p>
        <ol>
          <li><strong>记录</strong> <code>mid</code> 作为候选答案（它是合法的，但可能不是最小的）。</li>
          <li><strong>继续向左搜索</strong>，令 <code>high = mid - 1</code>，看看有没有更小的合法 <code>x</code>。</li>
          <li>循环结束时，最后一次记录的候选就是最小的合法 <code>x</code>。</li>
        </ol>

        <CodeBlock>{`function g(f, y) {
    let low = 0, high = y, result = -1;

    while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        const val = f(mid);

        if (val === y) {
            result = mid;     // 记录候选答案 / Record candidate
            high = mid - 1;   // 继续向左找更小的 x / Keep searching left
        } else if (val < y) {
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }
    return result;
}`}</CodeBlock>

        <p>
          <strong>对比原版代码的唯一区别 / Only difference from original：</strong>命中 <code>=== y</code> 时不 <code>return</code>，而是记录 <code>result</code> 并继续搜索。这一个小改动，体现了候选人对二分查找的深层理解。
          <br />
          When hitting <code>=== y</code>, instead of returning immediately, we record <code>result</code> and keep searching left. This single small change reveals the candidate's deep understanding of binary search.
        </p>

        <h4>评价标准 / Evaluation：</h4>
        <table>
          <tbody>
            <tr><th>候选人反应 / Response</th><th>评价 / Assessment</th></tr>
            <tr><td>立刻写出 lower bound 变体，逻辑清晰 / Immediately writes lower bound variant with clear logic</td><td>🌟 二分功底扎实 / Solid binary search mastery</td></tr>
            <tr><td>知道思路（不立刻返回，继续向左），但代码有小 bug / Knows the approach but has minor bugs</td><td>✅ SDE2 可接受 / Acceptable for SDE2</td></tr>
            <tr><td>完全不知道如何修改 / No idea how to modify</td><td>⚠️ 只会最基础的二分 / Only knows basic binary search form</td></tr>
          </tbody>
        </table>
      </Collapsible>
    </div>
  );
}

function Followup4() {
  return (
    <div id="followup4">
      <Collapsible
        summary={
          <>
            追问 4：并行/异步调用 f（前端特色）/ Parallel Async Calls{' '}
            <Tag variant="time">3-5 min</Tag>
            <Tag variant="diff-4">⭐⭐⭐⭐ Advanced</Tag>
          </>
        }
      >
        <h4>提问 / Question：</h4>
        <blockquote>
          "What if <code>f(x)</code> is an async function (e.g., a network API call that returns a Promise)? And you can make multiple concurrent calls. How would you speed up the search?"
          <br /><br />
          "如果 <code>f(x)</code> 是一个异步函数（比如一个网络 API 调用，返回 Promise），而且你可以同时发起多个并发调用。你会怎么加速搜索？"
        </blockquote>

        <h4>标准答案 / Expected Answer：</h4>

        <p><strong>English：</strong></p>
        <p>Standard binary search is sequential: one <code>f</code> call per round, wait for the result, then decide the next step. If <code>f</code> is async (e.g., a network request), the bottleneck is <strong>round-trip latency</strong>, not computation. We can exploit concurrency to reduce the number of sequential rounds:</p>
        <ol>
          <li><strong>N-way parallel split:</strong> Instead of testing 1 midpoint per round, divide <code>[low, high]</code> into N equal segments and test N-1 split points simultaneously using <code>Promise.all</code>.</li>
          <li><strong>Narrow to 1/N:</strong> Based on the returned values, determine which 1/N sub-interval contains the answer (just like binary search narrows to 1/2, this narrows to 1/N).</li>
          <li><strong>Complexity trade-off:</strong> Total rounds drop from log₂(y) to logₙ(y). Total <code>f</code> calls increase to (N-1) × logₙ(y), but <strong>total wall-clock latency</strong> is dramatically reduced since calls within each round happen in parallel.</li>
        </ol>

        <p><strong>中文：</strong></p>
        <p>标准二分是串行的：每轮只调用一次 <code>f</code>，等结果回来才能决定下一步。如果 <code>f</code> 是异步的（如网络请求），瓶颈在于<strong>往返延迟</strong>而不是计算量。我们可以利用并发来减少串行轮数：</p>
        <ol>
          <li><strong>N 等分并发：</strong>不再每轮只测试 1 个中点，而是将 <code>[low, high]</code> 等分为 N 段，用 <code>Promise.all</code> 同时测试 N-1 个分割点。</li>
          <li><strong>缩小到 1/N：</strong>根据返回结果，确定答案在哪个 1/N 的子区间（就像二分缩小到 1/2，这里缩小到 1/N）。</li>
          <li><strong>复杂度权衡：</strong>总轮数从 log₂(y) 降为 logₙ(y)。总 <code>f</code> 调用次数增加到 (N-1) × logₙ(y)，但<strong>总挂钟延迟</strong>大幅降低，因为每轮内的调用是并行的。</li>
        </ol>

        <p><strong>代码示例 / Code Example：</strong></p>
        <CodeBlock>{`async function g(f, y, concurrency = 4) {
    let low = 0, high = y;

    while (low < high) {
        const points = [];
        for (let i = 1; i < concurrency; i++) {
            points.push(low + Math.floor(
                (high - low) * i / concurrency));
        }

        const results = await Promise.all(
            points.map(p => f(p)));

        let found = false;
        for (let i = 0; i < results.length; i++) {
            if (results[i] === y) return points[i];
            if (results[i] > y) {
                high = points[i] - 1;
                low = i > 0 ? points[i-1] + 1 : low;
                found = true;
                break;
            }
        }
        if (!found) {
            low = points[points.length - 1] + 1;
        }
    }
    return low;
}`}</CodeBlock>

        <p><strong>关键考察点 / Key Assessment Points：</strong></p>
        <ul>
          <li>异步编程能力（<code>Promise.all</code> 的使用）/ Async programming skills (<code>Promise.all</code> usage)</li>
          <li>并发与效率的权衡思维（总调用次数 ↑ vs 总延迟 ↓）/ Concurrency vs efficiency trade-off (more total calls vs less total latency)</li>
          <li>从串行算法到并行算法的思维转换 / Mental shift from sequential to parallel algorithms</li>
        </ul>

        <h4>评价标准 / Evaluation：</h4>
        <table>
          <tbody>
            <tr><th>候选人反应 / Response</th><th>评价 / Assessment</th></tr>
            <tr><td>提出 N 等分 + Promise.all，能解释延迟与调用次数的 trade-off / Proposes N-way split + Promise.all, explains latency vs call count trade-off</td><td>🌟 前端工程能力极强 / Excellent frontend engineering</td></tr>
            <tr><td>提出"同时调 f(1/3) 和 f(2/3)"（三分搜索），但没有泛化到 N / Proposes ternary search but doesn't generalize to N</td><td>✅ 有并行思维，SDE2 达标 / Has parallel thinking, SDE2 level</td></tr>
            <tr><td>知道要用 async/await 和 Promise.all 但不确定如何应用到二分 / Knows async/await but unsure how to apply to binary search</td><td>⚠️ 异步基础有，但算法应用弱 / Has async basics but weak on application</td></tr>
            <tr><td>完全没有并发优化的思路 / No idea about concurrent optimization</td><td>⚠️ 对于前端候选人，异步思维不足 / For frontend candidate, insufficient async thinking</td></tr>
          </tbody>
        </table>
      </Collapsible>
    </div>
  );
}

/* ===================== Checkpoints ===================== */

function Checkpoints() {
  return (
    <>
      <Card>
        <h4>节点 1：识别出二分查找（基础门槛）/ Recognizing Binary Search</h4>
        <table>
          <tbody>
            <tr><th>考察内容</th><th>候选人应该意识到</th></tr>
            <tr><td>为什么能用二分？</td><td>f 严格单调递增 → 搜索空间有序 → 可以用二分</td></tr>
            <tr><td>如果写了线性扫描？</td><td>说明不具备基本的算法直觉</td></tr>
          </tbody>
        </table>
      </Card>

      <Card>
        <h4>节点 2：确定搜索上界 x ≤ y（核心区分度）/ Determining Upper Bound</h4>
        <table>
          <tbody>
            <tr><th>考察内容</th><th>候选人应该意识到</th></tr>
            <tr><td>为什么 high = y 是安全的？</td><td>f 是严格递增整数映射 → 归纳证明 f(x) ≥ x → x ≤ y</td></tr>
            <tr><td>如果用了 <code>high = 1e9</code>？</td><td>可以工作但不够优雅，没有深入分析数学性质</td></tr>
            <tr><td>如果用倍增 <code>high *= 2</code>？</td><td>更通用的方案，有扎实算法基础</td></tr>
          </tbody>
        </table>
      </Card>

      <Card>
        <h4>节点 3：倍增方案的优势认知（高阶思维）/ Doubling's Advantage</h4>
        <table>
          <tbody>
            <tr><th>考察内容</th><th>候选人应该意识到</th></tr>
            <tr><td>high = y 何时"浪费"？</td><td>f 增长极快时（如 f(x) = 2^x），y 远大于 x</td></tr>
            <tr><td>倍增的优势</td><td>搜索范围 [x*/2, x*]，O(log x*) 而非 O(log y)</td></tr>
            <tr><td>Trade-off</td><td>high=y 更简单；倍增更通用、f 增长快时更高效</td></tr>
          </tbody>
        </table>
      </Card>

      <Card>
        <h4>节点 4：边界条件处理（工程严谨性）/ Edge Cases</h4>
        <table>
          <tbody>
            <tr><th>边界场景</th><th>正确处理方式</th></tr>
            <tr><td><strong>y = 0</strong></td><td>标准二分自然处理，不需要特殊处理</td></tr>
            <tr><td><strong>y = f(0) 且 f(0) {'>'} 0</strong></td><td>二分会自然找到 mid = 0</td></tr>
            <tr><td><strong>x 很大</strong></td><td>JS 中无问题；Java/C++ 中 (low+high) 可能溢出，需用 low + (high-low)/2</td></tr>
          </tbody>
        </table>
      </Card>

      <Card>
        <h4>节点 5：f 调用次数优化（生产环境意识）/ Minimizing f Calls</h4>
        <table>
          <tbody>
            <tr><th>考察内容</th><th>优秀的候选人会提到</th></tr>
            <tr><td>f 可能很昂贵</td><td>网络请求、数据库查询、复杂计算</td></tr>
            <tr><td>避免重复计算</td><td>把 f(mid) 存到变量再比较，不要调用两次</td></tr>
            <tr><td>缓存/记忆化</td><td>多次调用 g 时，缓存 f 的历史结果</td></tr>
          </tbody>
        </table>
      </Card>
    </>
  );
}

/* ===================== Model Solution ===================== */

function Solution() {
  return (
    <>
      <Card>
        <h4>核心思路 / Core Idea</h4>
        <p><strong>中文：</strong>f 严格单调递增 → 搜索空间有序 → <strong>二分查找</strong>。关键在于确定二分的上界。</p>
        <p><strong>English:</strong> f is strictly monotonically increasing → sorted search space → <strong>binary search</strong>. The key is determining the upper bound.</p>
      </Card>

      <Card>
        <h4>关键数学推导 / Key Mathematical Insight</h4>
        <p>因为 f: Z≥0 → Z≥0 严格单调递增：</p>
        <ul>
          <li>f(0) ≥ 0</li>
          <li>f(1) {'>'} f(0) ≥ 0 ⟹ f(1) ≥ 1</li>
          <li>f(2) {'>'} f(1) ≥ 1 ⟹ f(2) ≥ 2</li>
          <li>...</li>
        </ul>
        <p><strong>归纳结论：f(x) ≥ x 对所有 x ≥ 0 成立。</strong></p>
        <p>因此若 f(x) = y，则 y ≥ x，即 <strong>x ≤ y</strong>。搜索范围确定为 [0, y]。</p>
      </Card>

      <Card>
        <h4>算法流程 / Algorithm Step-by-Step</h4>
        <p><strong>第一步：</strong>根据 f(x) ≥ x，确定搜索范围 [0, y]。</p>
        <p><strong>第二步：</strong>标准二分查找：</p>
        <ol>
          <li>设 lo = 0, hi = y</li>
          <li>每轮计算 mid = floor((lo + hi) / 2)，调用 f(mid)</li>
          <li>如果 f(mid) === y → 返回 mid；f(mid) &lt; y → lo = mid+1；f(mid) {'>'} y → hi = mid-1</li>
          <li>重复直到找到答案</li>
        </ol>

        <h4>示例演练 / Walkthrough：</h4>
        <p>假设 f(x) = 2x + 3，y = 13（答案 x = 5）</p>
        <table>
          <tbody>
            <tr><th>轮次</th><th>lo</th><th>hi</th><th>mid</th><th>f(mid)</th><th>比较</th><th>操作</th></tr>
            <tr><td>1</td><td>0</td><td>13</td><td>6</td><td>15</td><td>15 {'>'} 13</td><td>hi = 5</td></tr>
            <tr><td>2</td><td>0</td><td>5</td><td>2</td><td>7</td><td>7 &lt; 13</td><td>lo = 3</td></tr>
            <tr><td>3</td><td>3</td><td>5</td><td>4</td><td>11</td><td>11 &lt; 13</td><td>lo = 5</td></tr>
            <tr><td>4</td><td>5</td><td>5</td><td>5</td><td>13</td><td>13 === 13</td><td>✅ 返回 5</td></tr>
          </tbody>
        </table>
      </Card>

      <Card>
        <h4>
          代码 / Reference Code{' '}
          <span style={{ fontSize: 14, color: 'var(--text-muted)', fontWeight: 500 }}>
            (C++ / Python / TypeScript · 默认折叠 · click to expand)
          </span>
        </h4>
        <p style={{ margin: '8px 0 0', color: 'var(--text-muted)' }}>
          三个语言的参考答案都采用<strong>迭代</strong>二分（production 首选：O(1) 额外空间、无栈溢出风险）。如果候选人写递归版（同样正确），可追问："空间复杂度是多少？y 极大时会不会爆栈？" 主动提起迭代更适合生产是加分项。
          <br />
          <span className="en-text">
            All three reference answers use the <strong>iterative</strong> form (production default: O(1) extra space, no stack-overflow risk). If the candidate writes a recursive version (equally correct), follow up with: "What's the space complexity? Could it stack-overflow for very large y?" Volunteering "iterative is safer for production" is a plus.
          </span>
        </p>
      </Card>

      <Collapsible
        id="ref-cpp"
        summary={
          <>
            📖 C++ 参考答案 / C++ Reference Answer <Tag variant="lang">C++17</Tag>
          </>
        }
        defaultOpen={false}
      >
        <CodeBlock>{`ll g(ll y) {
    // f(x) >= x for monotonic f on non-negative integers,
    // so x is guaranteed to lie in [0, y]. Binary-search it.
    ll lo = 0, hi = y;
    while (lo <= hi) {
        ll mid = lo + (hi - lo) / 2;   // avoid (lo+hi) overflow
        ll v = f(mid);
        if (v == y) return mid;
        else if (v < y) lo = mid + 1;
        else            hi = mid - 1;
    }
    throw std::runtime_error("no x satisfies f(x) == y");
}`}</CodeBlock>
        <p style={{ color: 'var(--text-muted)', margin: '8px 0 0', fontSize: 14 }}>
          需加 <code>#include &lt;stdexcept&gt;</code>；starter 模板里已定义 <code>using ll = long long;</code>。
        </p>
      </Collapsible>

      <Collapsible
        id="ref-py"
        summary={
          <>
            🐍 Python 参考答案 / Python Reference Answer <Tag variant="py">Python 3</Tag>
          </>
        }
        defaultOpen={false}
      >
        <CodeBlock>{`def g(y):
    # f(x) >= x for monotonic f on non-negative integers,
    # so x is guaranteed to lie in [0, y]. Binary-search it.
    lo, hi = 0, y
    while lo <= hi:
        mid = (lo + hi) // 2
        v = f(mid)
        if v == y:
            return mid
        elif v < y:
            lo = mid + 1
        else:
            hi = mid - 1
    raise ValueError(f"no x satisfies f(x) == {y}")`}</CodeBlock>
      </Collapsible>

      <Collapsible
        id="ref-ts"
        summary={
          <>
            📘 TypeScript 参考答案 / TypeScript Reference Answer{' '}
            <Tag variant="ts">TypeScript</Tag>
          </>
        }
        defaultOpen={false}
      >
        <CodeBlock>{`function g(y: number): number {
    // f(x) >= x for monotonic f on non-negative integers,
    // so x is guaranteed to lie in [0, y]. Binary-search it.
    let lo = 0, hi = y;
    while (lo <= hi) {
        const mid = Math.floor((lo + hi) / 2);
        const v = f(mid);
        if (v === y) return mid;
        else if (v < y) lo = mid + 1;
        else            hi = mid - 1;
    }
    throw new Error(\`no x satisfies f(x) == \${y}\`);
}`}</CodeBlock>
      </Collapsible>

      <Collapsible
        id="sample-io"
        summary={
          <>
            📥 Sample input + expected output <Tag>test data</Tag>
          </>
        }
        defaultOpen={false}
      >
        <p>
          把下面 7 行粘进 HackerRank 的 <strong>Custom Input</strong> 框（或保存为 <code>input.txt</code> 后 <code>cat input.txt | …</code>）：
        </p>
        <CodeBlock>{`3
5
7
9
11
21
1003`}</CodeBlock>
        <p style={{ marginTop: 16 }}>
          正确实现 <code>g</code> 后候选人会看到（✓/✗ 由 starter 的 auto-judge 框架打印，不需候选人实现）：
        </p>
        <CodeBlock>{`g(3) = 0  ✓
g(5) = 1  ✓
g(7) = 2  ✓
g(9) = 3  ✓
g(11) = 4  ✓
g(21) = 9  ✓
g(1003) = 500  ✓
--------------------------------
Result: 7 / 7 correct`}</CodeBlock>
        <p style={{ color: 'var(--text-muted)', marginTop: 12, fontSize: 14 }}>
          未修改的占位 <code>g</code> 会输出 <code>Result: 3 / 7 correct</code>（混合 ✓/✗）——以此提醒候选人"占位是错的，需要替换"。
          <br />
          <span className="en-text">
            The placeholder <code>g</code> (untouched starter) prints <code>Result: 3 / 7 correct</code> (a mix of ✓/✗), signaling to the candidate that the placeholder is wrong and needs replacing.
          </span>
        </p>
      </Collapsible>

      <Card>
        <h4>复杂度 / Complexity</h4>
        <ul>
          <li><strong>时间：</strong>O(log y)</li>
          <li><strong>空间：</strong>O(1)（迭代）或 O(log y)（递归）</li>
        </ul>
      </Card>
    </>
  );
}

/* ===================== Rubric ===================== */

function Rubric() {
  return (
    <>
      <Card>
        <h4><Badge variant="fail">❌ Not Hire</Badge> 不通过</h4>
        <table>
          <tbody>
            <tr><th>表现</th><th>原因</th></tr>
            <tr><td>给了 Hint 3 后仍写不出二分</td><td>最基础的算法能力不达标</td></tr>
            <tr><td>只写线性扫描且提示后仍不知优化</td><td>缺少基本算法思维</td></tr>
            <tr><td>代码有死循环</td><td>二分查找基本功有缺陷</td></tr>
            <tr><td>写了 <code>high = Infinity</code> 然后死循环</td><td>逻辑思维欠缺</td></tr>
          </tbody>
        </table>
      </Card>

      <Card>
        <h4><Badge variant="weak">⚠️ Lean No</Badge> 弱 SDE2 / 勉强边缘</h4>
        <table>
          <tbody>
            <tr><th>表现</th><th>说明</th></tr>
            <tr><td>1 个提示后写出二分，但用 <code>high = 1e9</code></td><td>知道二分但没深入分析约束</td></tr>
            <tr><td>代码基本正确但有 off-by-one bug</td><td>写码不够严谨</td></tr>
            <tr><td>没有主动思考任何边界情况</td><td>缺乏工程意识</td></tr>
          </tbody>
        </table>
      </Card>

      <Card>
        <h4><Badge variant="pass">✅ Hire as SDE2</Badge> 通过</h4>
        <table>
          <tbody>
            <tr><th>表现</th><th>说明</th></tr>
            <tr><td><strong>无提示</strong>写出二分</td><td>算法基本功过关</td></tr>
            <tr><td>上界用了倍增<strong>或</strong>推导出 high = y</td><td>能独立解决无穷域问题</td></tr>
            <tr><td>代码逻辑正确，无 bug</td><td>编码能力达标</td></tr>
            <tr><td>追问下能理解另一种方案的优劣</td><td>能在引导下拓展思维</td></tr>
          </tbody>
        </table>
      </Card>

      <Card>
        <h4><Badge variant="strong">🌟 Strong Hire / Senior</Badge> 强通过</h4>
        <table>
          <tbody>
            <tr><th>表现</th><th>说明</th></tr>
            <tr><td>写代码前<strong>主动提问</strong>确认约束</td><td>Senior 级别的需求澄清意识</td></tr>
            <tr><td><strong>无提示</strong>推导出 f(x) ≥ x，直接用 high = y</td><td>数学推理能力强</td></tr>
            <tr><td><strong>同时</strong>知道倍增方案，能主动对比</td><td>全面的算法视野</td></tr>
            <tr><td>主动提到溢出风险、f 调用缓存等</td><td>生产环境意识</td></tr>
            <tr><td>代码一次写对，结构清晰</td><td>高质量编码能力</td></tr>
            <tr><td>能主动分析并表述时间复杂度</td><td>理论基础扎实</td></tr>
          </tbody>
        </table>
      </Card>
    </>
  );
}

/* ===================== Registry entry (with display variants) ===================== */

export const inverseFunctionEntry: ProblemEntry = {
  id: 'inverse-function',
  label: 'Inverse of a Monotonic Function',
  component: InverseFunctionPage,
  display: {
    formal: {
      badge: 'Coding Exercise',
      title: 'Implement the Inverse of a Monotonic Function',
      body: (
        <>
          <p>
            You are given a black-box function <code>f(x)</code> that maps non-negative integers to non-negative integers. <code>f</code> is <strong>strictly monotonically increasing</strong> (i.e., for any a &lt; b, f(a) &lt; f(b)).
          </p>
          <p>
            You can only call <code>f(x)</code> — you cannot inspect its implementation.
          </p>
          <p>
            <strong>Task:</strong> Implement its inverse function <code>g(y)</code> — given a value <code>y</code>, return the integer <code>x</code> such that <code>f(x) = y</code>. You may assume that for every input <code>y</code>, a valid <code>x</code> always exists.
          </p>
        </>
      ),
    },
    conversational: {
      badge: 'Coding Exercise',
      title: 'Implement the Inverse of a Monotonic Function',
      body: (
        <>
          <p>
            Imagine you have a function <code>f</code> — you can call it with any non-negative integer, and it gives you back a non-negative integer. You can't look inside it, it's a black box. The one thing you do know is that it's strictly increasing — so if you feed it a bigger number, you always get a bigger result. No ties, no going backwards.
          </p>
          <p>
            Now, what I need you to do is write the reverse of that function. I'll give you some output value <code>y</code>, and you need to figure out: what input <code>x</code> did it come from? In other words, find <code>x</code> such that <code>f(x) = y</code>.
          </p>
          <p>
            You can assume there's always a valid answer — you won't be given a <code>y</code> that doesn't match any <code>x</code>.
          </p>
        </>
      ),
    },
  },
};
