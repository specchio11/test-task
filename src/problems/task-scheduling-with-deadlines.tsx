import type { CandidateConfig } from '../data/types';
import {
  Badge,
  Card,
  CodeTabs,
  Collapsible,
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
 * ⚠️ INTERVIEWER GUIDE — Task Scheduling with Deadlines
 * ------------------------------------------------------------
 * Direct React translation of the original
 *   public/coding-problems/task-scheduling-with-deadlines/interview-guide.html
 * (no longer shipped). Structure: intro → problem (3 versions) →
 * stuck hints (0–3) → followups (1–3) → checkpoints → solution
 * (with 4-language code tabs) → rubric → flow chart.
 * ============================================================ */

export function TaskSchedulingPage({
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
      quickPanel={<TaskSchedulingQuickPanel />}
    >
      <h1>🎯 Onsite 编程测试 (2) ：任务调度 / Task Scheduling with Deadlines</h1>

      <Card id="intro-script" variant="intro">
        <h4>🎤 引导进入第二轮编程测试 / Introduce Second Coding Exercise</h4>
        <ScriptBlock
          withLabel={false}
          en={
            <>
              "Great work on the first one. Let's do one more short coding exercise — different topic this time. I'll describe the problem, and we can work through it together."
            </>
          }
          zh={
            <>
              "刚才那道做得不错。我们再做一道短的编程题——这次换个方向。我会描述一下题目，我们一起讨论。"
            </>
          }
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

      <Card id="after-problem" variant="after">
        <h4 style={{ color: '#059669' }}>💬 读完题后的衔接语 / After reading the problem</h4>
        <p className="tbd">
          📌 待填写 / TBD —— ① 询问候选人选哪个语言；② 贴入对应 starter template 后说明 input parser / test cases / 只需要改 <code>scheduleTasks</code> 函数体等。等 starter templates 准备好之后补。
        </p>
      </Card>

      <Separator />
      <Section id="sticking-points">🚨 候选人卡壳情况及提示策略 / Sticking Points &amp; Hints</Section>

      <Stuck0 />
      <Stuck1 />
      <Stuck2 />
      <Stuck3 />

      <Separator />
      <Section id="followups">💬 拓展追问 / Follow-up Questions</Section>
      <p style={{ color: 'var(--text-muted)' }}>候选人完成主题后，根据剩余时间和表现选择性使用。</p>

      <Followup1 />
      <Followup2 />
      <Followup3 />

      <Card style={{ marginTop: 16 }}>
        <h4>追问使用建议汇总 / Follow-up Usage Summary</h4>
        <table>
          <tbody>
            <tr><th>追问</th><th>耗时</th><th>适用场景</th><th>难度</th></tr>
            <tr><td>1. 证明正确性</td><td>2-3 min</td><td>候选人代码完成，看算法分析深度</td><td>⭐</td></tr>
            <tr><td>2. 加权 reward (DP)</td><td>3-4 min</td><td>测试是否能识别贪心边界 + DP 转换</td><td>⭐⭐</td></tr>
            <tr><td>3. 抢占 / 大规模优化</td><td>3-5 min</td><td>剩余时间充足，candidate 在 SDE2+ 表现</td><td>⭐⭐⭐</td></tr>
          </tbody>
        </table>
      </Card>

      <Separator />
      <Section id="checkpoints">🔍 关键考察节点 / Key Checkpoints</Section>
      <p style={{ color: 'var(--text-muted)' }}>面试官评估候选人时的 5 个核心检查点，按时间顺序排列。</p>
      <Checkpoints />

      <Separator />
      <Section id="solution">💡 标准答案 / Model Solution</Section>
      <Solution />

      <Separator />
      <Section id="rubric">📊 评判标准 / Evaluation Rubric</Section>
      <Card>
        <p className="tbd">
          📌 待填写 / TBD —— 四档评分：
          <br />
          • <Badge variant="fail">❌ Not Hire</Badge> —— 提示后仍无法识别为贪心；只能写暴力且无法优化
          <br />
          • <Badge variant="weak">⚠️ Lean No</Badge> —— 知道贪心方向但 swap 条件写错 / 有 off-by-one bug
          <br />
          • <Badge variant="pass">✅ Hire as SDE2</Badge> —— 无提示推导出 sort by deadline + max-heap swap；代码逻辑正确
          <br />
          • <Badge variant="strong">🌟 Strong Hire / Senior</Badge> —— 主动论证 exchange argument；分析复杂度；考虑边界
        </p>
      </Card>

      <Separator />
      <Section id="flowchart">🗺️ 面试官速查流程图 / Quick Decision Flow</Section>
      <Card>
        <p className="tbd">📌 待填写 / TBD —— 一图速查"候选人独立 / 需提示 / 写不出"对应的判定。</p>
      </Card>
    </GuideShell>
  );
}

/* ===================== Quick panel ===================== */

function TaskSchedulingQuickPanel() {
  return (
    <>
      <QuickLink target="intro-script">🎤 引入词</QuickLink>
      <QuickLink target="problem">📋 题面</QuickLink>

      <QuickGroup title="🚨 卡壳提示">
        <QuickLink target="stuck0" sub color="red">0 — 不理解术语</QuickLink>
        <QuickLink target="stuck1" sub color="red">1 — 完全没思路</QuickLink>
        <QuickLink target="stuck2" sub color="red">2 — 不会处理"塞不下"</QuickLink>
        <QuickLink target="stuck3" sub color="red">3 — swap 条件写错</QuickLink>
      </QuickGroup>

      <QuickGroup title="💬 拓展追问">
        <QuickLink target="followup1" sub color="purple">1 — 证明正确性 ⭐</QuickLink>
        <QuickLink target="followup2" sub color="purple">2 — 加权 reward ⭐⭐</QuickLink>
        <QuickLink target="followup3" sub color="purple">3 — 抢占/大规模 ⭐⭐⭐</QuickLink>
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
        You are given a list of tasks. Each task takes a fixed amount of <strong>continuous, uninterruptible</strong> time to finish and has a <strong>deadline</strong> by which it must be completed. You schedule the tasks on a <strong>single machine</strong>, one at a time.
        <br /><br />
        Schedule a subset of the tasks so that <strong>as many tasks as possible</strong> finish on or before their own deadline.
        <ul style={{ marginTop: 8 }}>
          <li>You start at time <code>t = 0</code>.</li>
          <li>Only ONE task runs at a time (single machine).</li>
          <li>Once a task starts, it must run to completion — no preemption, no interleaving.</li>
          <li>You may pick any subset of tasks and run them in any order.</li>
          <li>A task counts as completed only if its <strong>finish time ≤ its deadline</strong>.</li>
          <li>You may skip tasks.</li>
        </ul>
        <br />
        <strong>Input:</strong> <code>tasks</code> — a list of <code>[duration, deadline]</code> pairs.
        <br />
        <strong>Output:</strong> the maximum number of tasks that can be completed on or before their deadlines.
        <br /><br />
        <strong>Example:</strong> <code>tasks = [[100, 200], [200, 1300], [1000, 1250], [2000, 3200]]</code> → answer is <code>3</code>.
      </blockquote>
      <h4>中文:</h4>
      <blockquote>
        给你一组任务。每个任务需要一段<strong>连续不可中断</strong>的时间来完成，并且有一个必须完成的截止时刻（deadline）。你在<strong>一台机器</strong>上一次一个地调度这些任务。
        <br /><br />
        请安排一个子集，使得<strong>尽可能多</strong>的任务都能在它自己的 deadline 之前（含）完成。
        <ul style={{ marginTop: 8 }}>
          <li>时间从 <code>t = 0</code> 开始。</li>
          <li>同一时刻<strong>只能执行一个</strong>任务（单机调度）。</li>
          <li>任务一旦开始，必须连续做完——不可抢占、不可交错。</li>
          <li>你可以选择任意子集，并以任意顺序执行。</li>
          <li>任务"完成"的标准：它的<strong>结束时间 ≤ 它的 deadline</strong>。</li>
          <li>你可以跳过任何任务。</li>
        </ul>
        <br />
        <strong>输入：</strong> <code>tasks</code> —— 一个 <code>[duration, deadline]</code> 二元组列表。
        <br />
        <strong>输出：</strong> 能在各自 deadline 之前完成的任务的<strong>最大数量</strong>。
        <br /><br />
        <strong>示例：</strong> <code>tasks = [[100, 200], [200, 1300], [1000, 1250], [2000, 3200]]</code> → 答案为 <code>3</code>。
      </blockquote>
    </>
  );
}

function ProblemConversational() {
  return (
    <>
      <p style={{ color: 'var(--green)', fontWeight: 600, marginBottom: 8 }}>🗣️ 推荐面试时直接用这个版本念给候选人</p>
      <h4>English:</h4>
      <blockquote>
        "Alright, here's the problem. You've got a queue of tasks — each one takes a certain amount of time to finish, and each one has its own deadline. You can only run one task at a time on one machine, and once you start a task, you have to see it through to the end — <strong>no pausing, no switching back and forth</strong>. But you're free to pick which tasks to do, skip the ones that don't fit, and run them in whatever order you want.
        <br /><br />
        The goal is to <strong>get as many of them as possible finished before their deadlines</strong>. So I give you a list of <code>(duration, deadline)</code> pairs, and you tell me the largest number of those that can be scheduled successfully. Make sense? Let's go."
      </blockquote>
      <h4>中文:</h4>
      <blockquote>
        "好，题目是这样。你有一队任务，每个任务有自己的耗时和 deadline。你只有一台机器，一次只能跑一个任务，而且任务一旦开始就要做完——<strong>中间不能暂停，也不能切到别的任务</strong>。但是你可以<strong>自由选择</strong>做哪些任务、跳过哪些任务，也可以<strong>任意安排</strong>它们的顺序。
        <br /><br />
        目标是——<strong>让尽可能多的任务在各自 deadline 之前完成</strong>。给你一个 <code>(duration, deadline)</code> 的列表，告诉我最多能成功调度多少个。清楚了吗？开始吧。"
      </blockquote>
    </>
  );
}

function ProblemPlain() {
  return (
    <>
      <p style={{ color: 'var(--yellow)', fontWeight: 600, marginBottom: 8 }}>🧸 当候选人对"调度"、"deadline"等概念不熟悉时使用</p>
      <h4>English:</h4>
      <blockquote>
        "Let me strip the jargon. Picture this: you're at your desk, and you've got a stack of homework assignments. Each one tells you two things:
        <br />
        • How long it takes to do (say, 100 minutes)
        <br />
        • When it's due (say, by minute 200 from now)
        <br /><br />
        You can only do one assignment at a time. Once you start one, you finish it before moving on. The clock keeps ticking — if you finish an assignment <strong>after</strong> its due time, it doesn't count.
        <br /><br />
        You don't have to do all of them. Pick whichever ones you want, in whatever order. Your job is to <strong>figure out the most assignments you can finish on time</strong>. That's it.
        <br /><br />
        For example, if I hand you a list saying <code>[100min, due 200], [200min, due 1300], [1000min, due 1250], [2000min, due 3200]</code>, you tell me: I can finish <strong>3</strong> of these on time."
      </blockquote>
      <h4>中文:</h4>
      <blockquote>
        "我换个最简单的方式说。想象你坐在书桌前，桌上一堆作业。每份作业都标了两件事：
        <br />
        • 写完它要多久（比如 100 分钟）
        <br />
        • 几点之前必须交（比如第 200 分钟前要交）
        <br /><br />
        你一次只能写一份。一旦开始，就要写完才能写下一份。时间一直在走——如果你某份作业在 deadline <strong>之后</strong>才写完，那它就<strong>不算完成</strong>。
        <br /><br />
        你不需要把所有作业都做完。挑哪些、按什么顺序做都随你。你的任务是：<strong>算出最多能按时完成多少份作业</strong>。就这么简单。
        <br /><br />
        举个例子：我给你 <code>[100分钟, 200截止], [200分钟, 1300截止], [1000分钟, 1250截止], [2000分钟, 3200截止]</code> 这 4 份作业，你应该告诉我——最多能按时完成 <strong>3</strong> 份。"
      </blockquote>
    </>
  );
}

/* ===================== Stuck hints ===================== */

function Stuck0() {
  return (
    <div id="stuck0">
      <Collapsible summary={<>🤔 卡壳 0：不理解题目术语 / Stuck 0: Doesn't understand the terminology</>}>
        <p><strong>表现 / Symptom：</strong>候选人对 "deadline"、"preemption"、"single machine" 等调度术语不熟悉，反复确认题意。</p>

        <h4>解释 "deadline" / Explaining "deadline"：</h4>
        <blockquote>
          "<code>deadline</code> is the latest moment a task is allowed to finish. If the task's finish time exceeds its deadline by even one unit, it does <strong>not</strong> count toward the answer."
          <br /><br />
          "<code>deadline</code> 就是任务允许完成的最晚时刻。哪怕只超出 1 个单位，这个任务也<strong>不算</strong>成功完成，不计入答案。"
        </blockquote>

        <h4>解释 "no preemption" / Explaining "no preemption"：</h4>
        <blockquote>
          "Once you start a task, you must run it to completion before doing anything else. You can <strong>not</strong> pause halfway, switch to another task, and come back later."
          <br /><br />
          "一旦你开始执行一个任务，必须做完它才能做下一件事。<strong>不可以</strong>做一半暂停、切到别的任务、之后再回来继续。"
        </blockquote>

        <h4>解释 "single machine" / Explaining "single machine"：</h4>
        <blockquote>
          "At any instant, exactly one task is being executed (or none). No parallelism. Think of it as a single CPU running tasks one after another."
          <br /><br />
          "任意时刻只有一个任务在执行（或者闲着）。没有并行。就像一颗 CPU 一个接一个跑任务。"
        </blockquote>

        <h4>用样例帮助理解 / Walking through the sample：</h4>
        <blockquote>
          "Look at the example <code>[[100,200],[200,1300],[1000,1250],[2000,3200]]</code>. One valid schedule: do task 1 (0→100), then task 3 (100→1100), then task 2 (1100→1300). Three tasks all finish on time. Task 4 has duration 2000 — by the time we'd start it (1300), it would finish at 3300, exceeding its deadline 3200, so we skip it. Answer = 3."
          <br /><br />
          "看样例 <code>[[100,200],[200,1300],[1000,1250],[2000,3200]]</code>。一种合法调度：先做 task 1（0→100），再做 task 3（100→1100），最后做 task 2（1100→1300），三个任务都准时完成。task 4 时长 2000——开始时已经是 1300，做完是 3300，超过它的 deadline 3200，所以跳过。答案 = 3。"
        </blockquote>

        <InterviewerNote>
          <strong>⚠️ 面试官注意：</strong>澄清术语<strong>不算提示</strong>，不应影响对候选人算法能力的评分。术语对非英语母语候选人是公平的解释场景。但如果候选人理解题意后仍长时间没有思路，按卡壳 1 处理。
          <br />
          Clarifying terminology is <strong>not a hint</strong> and should not affect the algorithm-skill evaluation. If the candidate still has no idea after understanding the problem, treat as Stuck 1.
        </InterviewerNote>
      </Collapsible>
    </div>
  );
}

function Stuck1() {
  return (
    <div id="stuck1">
      <Collapsible summary={<>😶 卡壳 1：完全没思路 / 想暴力枚举所有子集 / Stuck 1: No idea, or jumps to brute-force subset enumeration</>}>
        <p><strong>表现 / Symptom：</strong>沉默；或者说 "I'll try every subset and check feasibility"——n = 10⁴ 时 2ⁿ 完全不可行。</p>
        <table>
          <tbody>
            <tr><th>提示等级</th><th>English</th><th>中文</th></tr>
            <tr>
              <td><HintChip level="light" /> Hint 1</td>
              <td>"Brute force tries every subset — that's 2<sup>n</sup>, infeasible for n = 10⁴. Can you commit to a decision (take / skip) per task without enumerating subsets?"</td>
              <td>"暴力枚举要试 2<sup>n</sup> 个子集，n = 10⁴ 时完全不可行。能不能对每个任务<strong>就地</strong>决定 take 还是 skip，不需要回头？"</td>
            </tr>
            <tr>
              <td><HintChip level="light" /> Hint 2</td>
              <td>"If you have to consider tasks in <em>some</em> order, which order feels most natural? Why?"</td>
              <td>"如果你必须以<em>某种</em>顺序处理这些任务，哪种顺序最自然？为什么？"</td>
            </tr>
            <tr>
              <td><HintChip level="medium" /> Hint 3</td>
              <td>"Try sorting by deadline ascending. Walk through the first sample by hand — at each step, what's the simplest rule you can apply?"</td>
              <td>"试试按 deadline 升序排序。把第一个样例手算一遍——每一步可以套用什么最简单的规则？"</td>
            </tr>
            <tr>
              <td><HintChip level="heavy" /> Hint 4</td>
              <td>"Greedy: sort by deadline; for each task, ask (1) does it fit in the remaining time? If yes, take it. (2) If not, can you swap it for a longer task you've already chosen?"</td>
              <td>"贪心：按 deadline 排序；对每个任务问两个问题：(1) 它能塞进剩余时间吗？能就拿。(2) 不能的话，能不能用它替换掉你之前选的某个更长的任务？"</td>
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
      <Collapsible summary={<>🧱 卡壳 2：按 deadline 排序了，但不知道如何处理"塞不下" / Stuck 2: Sorted by deadline but can't handle "doesn't fit"</>}>
        <p>
          <strong>表现 / Symptom：</strong>写出了 "sort by deadline + 顺次累加 t；能塞下就 take，否则直接 skip" 的版本。在样例 <code>[[5,5],[4,6],[2,6]]</code>（答案 2）上得到 1，或在样例 <code>[[100,200],[200,1300],[1000,1250],[2000,3200]]</code> 上得到 2 而非 3。
        </p>
        <table>
          <tbody>
            <tr><th>提示等级</th><th>English</th><th>中文</th></tr>
            <tr>
              <td><HintChip level="light" /> Hint 1</td>
              <td>"Hand-trace your code on <code>[[5,5],[4,6],[2,6]]</code>. What does it return? What's the correct answer? Where does it go wrong?"</td>
              <td>"用 <code>[[5,5],[4,6],[2,6]]</code> 手动跑一遍你的代码。返回什么？正确答案是什么？哪一步开始偏离？"</td>
            </tr>
            <tr>
              <td><HintChip level="medium" /> Hint 2</td>
              <td>"When the current task can't fit, are you really stuck with the choices you made earlier? Could 'un-choosing' a previously chosen task make room for this one?"</td>
              <td>"当前任务塞不下时，你真的被之前的选择锁死了吗？把之前选过的某个任务<strong>"撤销"</strong>，能不能给当前这个腾出空间？"</td>
            </tr>
            <tr>
              <td><HintChip level="medium" /> Hint 3</td>
              <td>"Among the tasks you've already chosen, which one is the <em>best</em> candidate to un-choose? Why that one?"</td>
              <td>"在已经选的任务里，撤销<em>哪一个</em>最划算？为什么是那一个？"</td>
            </tr>
            <tr>
              <td><HintChip level="heavy" /> Hint 4</td>
              <td>"Use a max-heap to track chosen durations. When a task doesn't fit, peek the heap: if the largest chosen duration {'>'} current task's duration, <strong>swap</strong> them. Count stays the same, but t drops, freeing budget for future tasks."</td>
              <td>"用一个最大堆维护已选任务的 duration。当前任务塞不下时，看堆顶：如果<strong>已选的最长任务 {'>'} 当前任务的 duration</strong>，就用当前任务<strong>替换</strong>它。计数不变，但总耗时 t 降低，给后续任务腾出预算。"</td>
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
      <Collapsible summary={<>🔁 卡壳 3：知道 swap，但条件 / t 更新写错 / Stuck 3: Knows the swap idea but writes the condition or t-update wrong</>}>
        <p>
          <strong>表现 / Symptom：</strong>常见错法：① swap 条件方向反（<code>top &lt; d</code>）；② 用 <code>≥</code> 替代 <code>&gt;</code>（等情况虽不算错但浪费一次 heap 操作）；③ swap 时 t 没更新或加成 <code>t += d</code>；④ 始终 swap 不判断条件，导致 t 越来越大。
        </p>
        <table>
          <tbody>
            <tr><th>提示等级</th><th>English</th><th>中文</th></tr>
            <tr>
              <td><HintChip level="light" /> Hint 1</td>
              <td>"Trace <code>[[5,5],[4,6],[2,6]]</code> step by step with your current code. At which step does it diverge from the expected output of 2?"</td>
              <td>"用 <code>[[5,5],[4,6],[2,6]]</code> 把你的代码逐步走一遍。在哪一步偏离了期望答案 2？"</td>
            </tr>
            <tr>
              <td><HintChip level="medium" /> Hint 2</td>
              <td>"After a swap, the heap size doesn't change (pop one, push one). What <strong>should</strong> happen to total time t? Should it go up or down? Why?"</td>
              <td>"swap 之后堆的大小不变（弹出一个、压入一个）。总耗时 t <strong>应该</strong>怎么变？变大还是变小？为什么？"</td>
            </tr>
            <tr>
              <td><HintChip level="medium" /> Hint 3</td>
              <td>"Should you swap when heap-top equals the current duration? When heap-top is smaller? Walk through each case: what's the net effect on t and on future feasibility?"</td>
              <td>"堆顶 = 当前 duration 时该 swap 吗？堆顶 &lt; 当前 duration 呢？把每种情况分别推演一下，对 t 和后续可行性分别有什么影响？"</td>
            </tr>
            <tr>
              <td><HintChip level="heavy" /> Hint 4</td>
              <td>"Correct invariants: <strong>swap only if <code>heap.top() {'>'} d</code></strong> (strict). On swap: <code>t = t - heap.top() + d</code>; pop top, push d. The heap size stays the same; t strictly decreases."</td>
              <td>"正确不变式：<strong>当且仅当 <code>heap.top() {'>'} d</code></strong>（严格大于）才 swap。swap 时：<code>t = t - heap.top() + d</code>；pop 后 push d。堆大小不变，t 严格变小。"</td>
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
            追问 1：证明贪心的正确性 / Prove the Greedy is Optimal{' '}
            <Tag variant="time">2-3 min</Tag>
            <Tag variant="diff-1">⭐ Easy</Tag>
          </>
        }
      >
        <h4>提问 / Question：</h4>
        <blockquote>
          "Can you convince me your algorithm always returns the maximum count? Specifically: (1) Why does the <strong>swap step</strong> never give a worse answer? (2) Why is it safe to process tasks in <strong>deadline-ascending</strong> order?"
          <br /><br />
          "你能让我相信你的算法一定返回最大值吗？具体说两点：(1) 为什么 <strong>swap</strong> 不会让答案变差？(2) 为什么<strong>按 deadline 升序</strong>处理是安全的？"
        </blockquote>

        <h4>标准答案 / Expected Answer：</h4>

        <p><strong>(1) Swap 不会让答案变差 / Swap doesn't worsen the result</strong></p>
        <p><strong>中文：</strong></p>
        <ul>
          <li>swap 前：堆里有 k 个已选任务，总耗时 t。当前任务 (d, dl) 塞不下，但堆顶 <code>top &gt; d</code>。</li>
          <li>swap 后：堆里仍是 k 个任务，总耗时 t' = t − top + d <strong>&lt; t</strong>。计数不变，但剩余预算严格变多。</li>
          <li>由于截止时间是<strong>升序</strong>处理的，所有后续任务的 deadline ≥ 当前任务的 deadline；t 越小，对后续任务的可行性越友好。</li>
          <li>结论：swap 之后局部最优性保持，全局可达任务数 ≥ swap 前。</li>
        </ul>
        <p><strong>English:</strong></p>
        <ul>
          <li>Before swap: heap has k tasks, total time t. Current task (d, dl) doesn't fit but <code>heap.top() &gt; d</code>.</li>
          <li>After swap: heap still has k tasks, total time t' = t − top + d <strong>&lt; t</strong>. Count unchanged, but remaining budget strictly increased.</li>
          <li>Since deadlines are processed in ascending order, every future task's deadline ≥ current; a smaller t is strictly better for future feasibility.</li>
          <li>Conclusion: swap preserves the count and weakly improves reachable count for the remainder. Total reachable count ≥ pre-swap count.</li>
        </ul>

        <p style={{ marginTop: 12 }}>
          <strong>(2) 按 deadline 升序是安全的（exchange argument）/ Deadline-ascending order is safe</strong>
        </p>
        <p>
          <strong>中文：</strong>假设存在一个最优解 S*，但它处理任务的顺序不是按 deadline 升序。则存在两个相邻任务 A、B，A 排在 B 前但 dl<sub>A</sub> &gt; dl<sub>B</sub>。交换 A 和 B 的顺序后：
        </p>
        <ul>
          <li>B 提前完成：finish<sub>B</sub> 变小，仍然 ≤ dl<sub>B</sub> ✓</li>
          <li>A 推后完成：新 finish<sub>A</sub> = (原 finish<sub>B</sub>) ≤ dl<sub>B</sub> &lt; dl<sub>A</sub> ✓</li>
          <li>其他任务的 finish 时间未变。</li>
        </ul>
        <p>所以交换不会破坏最优性 → 总能把最优解整理成 deadline 升序，因此<strong>按 deadline 升序贪心至少不比任何顺序差</strong>。</p>
        <p>
          <strong>English:</strong> Assume an optimal schedule S* whose order is not deadline-ascending → exists adjacent A, B with A before B but dl<sub>A</sub> &gt; dl<sub>B</sub>. Swap A and B: B finishes earlier (still ≤ dl<sub>B</sub>) and A finishes at the original finish<sub>B</sub> ≤ dl<sub>B</sub> &lt; dl<sub>A</sub>. Both still meet deadlines; other tasks unaffected. Therefore any optimal solution can be reordered to deadline-ascending without loss → processing in that order is safe.
        </p>

        <h4>评价标准 / Evaluation：</h4>
        <table>
          <tbody>
            <tr><th>候选人反应 / Response</th><th>评价 / Assessment</th></tr>
            <tr><td>同时给出 swap 和 sort 两部分论证 / Articulates both swap invariant and sort exchange argument</td><td>🌟 Senior 级算法分析能力 / Senior-level algorithmic reasoning</td></tr>
            <tr><td>能解释 swap 不会变差（计数不变 + t 减小），但 sort 的部分讲不清 / Explains swap invariant but struggles with sort argument</td><td>✅ SDE2 可接受 / Acceptable for SDE2</td></tr>
            <tr><td>只说"贪心通常对"或类似含糊表述 / Vague "greedy usually works" answer</td><td>⚠️ 缺乏算法证明意识 / Lacks rigor in algorithm justification</td></tr>
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
            追问 2：每个任务带 reward，目标最大化 reward / Weighted Variant: Maximize Total Reward{' '}
            <Tag variant="time">3-4 min</Tag>
            <Tag variant="diff-2">⭐⭐ Medium</Tag>
          </>
        }
      >
        <h4>提问 / Question：</h4>
        <blockquote>
          "Now each task is a triple <code>[duration, deadline, reward]</code> — some tasks are more valuable than others. Instead of maximizing the <em>count</em> of scheduled tasks, we want to maximize the <em>total reward</em>. Does your greedy + max-heap approach still work? Why or why not? What would you do instead?"
          <br /><br />
          "现在每个任务是三元组 <code>[duration, deadline, reward]</code>——任务的价值不同。目标从"最大化任务<em>数</em>"变成"最大化<em>总 reward</em>"。你的贪心 + 最大堆方案还成立吗？为什么？如果不成立，你会怎么做？"
        </blockquote>

        <h4>标准答案 / Expected Answer：</h4>

        <p><strong>(a) 原贪心失效 / Greedy breaks</strong></p>
        <p>
          反例：<code>[[10, 100, 1], [10, 100, 1], ..., [10, 100, 1]]</code>（10 个低 reward 短任务，总 reward 10）vs <code>[[100, 100, 100]]</code>（1 个高 reward 长任务）。两者放一起：原贪心按 deadline 排序后会优先选 10 个短任务（count 优先 + duration-based swap），得到 reward 10；但选 1 个长任务能得 reward 100。
          <br />
          <strong>核心问题：</strong>原算法的 swap 准则是"用短的换长的"——这等价于"reward 全相同时最大化 count"，无法应对 reward 异质的情况。
        </p>
        <p>
          <strong>English:</strong> Counter-example: ten cheap short tasks (reward 1 each, total 10) vs one expensive long task (reward 100). The original greedy prefers count, picking the 10 short ones → reward 10, missing the optimum 100. The "shorter swaps longer" rule only optimizes count, not weight.
        </p>

        <p><strong>(b) 改用 DP / Switch to DP — weighted job scheduling 的离散变种</strong></p>
        <p><strong>中文：</strong>这其实是经典的 <strong>0/1 背包</strong>的变形——把每个 deadline 视为容量约束。</p>
        <ul>
          <li>设 <code>dp[t]</code> = 在 [0, t] 时间窗内可获得的最大 reward。</li>
          <li>按 deadline 升序处理任务 (d, dl, r)：<code>dp[t] = max(dp[t], dp[t-d] + r)</code> 对 t 从 dl 递减到 d 更新（标准 0/1 背包顺序）。</li>
          <li>答案 = <code>max(dp[0..MAX_DL])</code>。</li>
          <li><strong>复杂度：</strong>O(n × max_deadline)。约束允许（dl ≤ 10⁴, n ≤ 10⁴ → 10⁸ 次操作）就可以；否则需要离散化 deadline。</li>
        </ul>
        <p>
          <strong>English:</strong> Reduce to <strong>0/1 knapsack</strong>: each deadline is a capacity constraint. Let <code>dp[t]</code> = max reward achievable within [0, t]. Process tasks in deadline-ascending order; for each (d, dl, r), iterate t from dl down to d and update <code>dp[t] = max(dp[t], dp[t-d] + r)</code>. Answer = max(dp). Complexity O(n · max_deadline); discretize deadlines if range is large.
        </p>

        <p><strong>(c) Bonus: 何时退化回贪心？/ When does greedy still apply?</strong></p>
        <p>
          当所有任务的 <strong>reward 相同</strong>（或 reward / duration 单调）时，DP 可以退化为原贪心，因为 swap 的"短换长"准则等价于"用 reward-per-time 高的换低的"。
          <br />
          When all rewards are equal (or reward / duration is monotone in some sense), greedy reduces to the original max-heap algorithm — but in the general weighted case, DP is necessary.
        </p>

        <h4>评价标准 / Evaluation：</h4>
        <table>
          <tbody>
            <tr><th>候选人反应 / Response</th><th>评价 / Assessment</th></tr>
            <tr><td>立刻识别贪心失效 + 给出 0/1 knapsack DP 的状态定义 / Recognizes greedy breaks + writes the knapsack DP</td><td>🌟 算法功底扎实 / Strong algorithm foundation</td></tr>
            <tr><td>识别贪心失效但不能立刻写出 DP 状态 / Recognizes greedy breaks but struggles with DP formulation</td><td>✅ SDE2 水平 / SDE2 level</td></tr>
            <tr><td>试图修改 swap 准则（如换成 reward/duration 比值）但说不清正确性 / Tries to tweak swap rule (e.g., reward/duration ratio) without justification</td><td>⚠️ 算法分析能力不足，但有尝试 / Limited rigor, but engaged</td></tr>
            <tr><td>无法解释为什么贪心失效 / Can't articulate why greedy fails</td><td>❌ 算法直觉缺失 / Missing core algorithmic intuition</td></tr>
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
            追问 3：允许抢占 / 大规模数据 / Preemption Allowed OR Large-Scale Optimization{' '}
            <Tag variant="time">3-5 min</Tag>
            <Tag variant="diff-3">⭐⭐⭐ Hard</Tag>
          </>
        }
      >
        <p style={{ color: 'var(--text-muted)' }}>
          <em>两个变体二选一——根据剩余时间和候选人状态挑一个： / Choose one of the two variants based on remaining time and candidate's energy:</em>
        </p>

        <h4>变体 A — 允许 preemption / Variant A — Preemption allowed</h4>
        <blockquote>
          "What if we relax the rule and allow preemption — you can pause a running task at any integer time and resume it later? With this relaxation, can you do better? What does the optimal scheduling rule look like?"
          <br /><br />
          "如果放松规则，允许抢占——你可以在任意整数时刻暂停一个正在执行的任务，之后再继续做它。在这个放松后，能完成更多任务吗？最优调度规则长什么样？"
        </blockquote>

        <p><strong>标准答案 / Expected Answer：</strong></p>
        <ul>
          <li><strong>EDF (Earliest Deadline First) 一定最优。</strong>每个时刻"现在最该做的"任务 = 所有未完成任务里 deadline 最近的那个。</li>
          <li>
            <strong>能完成更多吗？</strong>是的——总能 ≥ 不可抢占的最优。例如 <code>[[3,3],[3,4]]</code>：不可抢占只能完成 1 个；允许抢占可以两个都按时完成（在时刻 2 暂停 task 1，做完 task 2 → 不，重新算……）。
            <br />
            实际上 <code>[[3,3],[3,4]]</code>：duration 总和 6 &gt; deadline 4，连 EDF 也救不了——两个都按时是不可能的。
            <br />
            更好的反例：<code>[[2,2],[3,5]]</code>：不可抢占按 deadline 排序后 t=2 选 task1，再做 task2 至 t=5 ≤ 5 ✓ → 2 个。这里 preemption 没增益。
            <br />
            <em>关键洞察：</em>如果<strong>每个任务的 duration ≤ 它自己的 deadline</strong>，且 EDF 能让累计耗时 ≤ 最大 deadline，则 preemption 不增益；preemption 真正的威力体现在 task duration 跨越多个 deadline 区段时。
          </li>
          <li><strong>实现：</strong>用一个最小堆按 deadline 排序当前所有"已到达 / 可执行"的任务（这里所有任务一开始就可执行，所以等价于按 deadline 升序排）。每个时间单位选堆顶任务执行 1 单位，做完弹出，超 deadline 也弹出 → 时间复杂度 O((Σd) log n)。</li>
          <li><strong>结论：</strong>EDF 在 preemptive 模型下是<strong>最优</strong>的（这是经典调度理论的结论：Liu &amp; Layland 1973）；在我们这道原题（non-preemptive + 同时可执行）下，sort+max-heap 才是最优。</li>
        </ul>

        <p style={{ marginTop: 16 }}>
          <strong>(English brief)</strong> Preemption + EDF (Earliest Deadline First) is optimal for the relaxed model (Liu &amp; Layland 1973). Maintain a min-heap keyed by deadline; at each time unit, execute the heap-top task for one unit; pop when done or when its deadline passes. Preemption strictly improves when a single task's duration spans across other tasks' deadlines; if every task fits comfortably, the gain is zero.
        </p>

        <hr style={{ border: 'none', borderTop: '1px dashed var(--border)', margin: '24px 0' }} />

        <h4>变体 B — 大规模工程优化 / Variant B — Scaling to n = 10⁶</h4>
        <blockquote>
          "Now n = 10⁶ and durations / deadlines fit in int32. Your O(n log n) is technically fine, but in practice — what knobs would you turn to make this fast and memory-efficient? Walk me through the bottlenecks."
          <br /><br />
          "现在 n = 10⁶，duration 和 deadline 都在 int32 内。你的 O(n log n) 理论上没问题，但实际上——你会调哪些钮让它跑得又快又省内存？讲讲瓶颈在哪。"
        </blockquote>

        <p><strong>标准答案 / Expected Answer：</strong></p>
        <ul>
          <li><strong>排序：</strong>n = 10⁶ 的 sort 在 ~30-50ms 量级。如果 deadline 范围小（如 ≤ 10⁶），可改用 <strong>counting sort</strong> / radix sort，O(n + range)，对 cache 也友好。</li>
          <li><strong>堆操作：</strong>STL <code>priority_queue</code>（基于 <code>std::vector</code>）已经 cache-friendly；如果在 GC 语言里（Python / Java），考虑用原生 array 自己实现堆，避免对象分配。</li>
          <li><strong>内存：</strong>堆的容量上限 = n（每个任务最多入堆一次），10⁶ 个 int 是 4 MB，没问题。但如果 task 是大 struct，考虑只存索引到堆里。</li>
          <li><strong>整型溢出：</strong>n × max_d = 10⁶ × 10⁴ = 10¹⁰，超出 int32（~2 × 10⁹）！<strong>累加 t 必须用 int64</strong>。这是面试中常被遗漏的点。</li>
          <li><strong>常数优化：</strong>(a) 排序时只按 deadline 排，duration / 原 index 用并行数组；(b) 避免 lambda 比较器（C++ 中可改用 transparent comparator 或裸函数指针）；(c) 一次性 reserve 堆容量避免 grow 抖动。</li>
          <li><strong>I/O：</strong>10⁶ 输入下 <code>cin</code> 慢——加 <code>sync_with_stdio(false); cin.tie(nullptr);</code>，或用 <code>scanf</code> / 自写 fast reader。</li>
          <li><strong>流式 / 在线版本？</strong>本题需要 sort，无法纯流式处理；但如果 deadline 单调到达（如时间戳流），可以维护一个"当前已选"堆滚动更新。</li>
        </ul>

        <h4>评价标准 / Evaluation：</h4>
        <table>
          <tbody>
            <tr><th>候选人反应 / Response</th><th>评价 / Assessment</th></tr>
            <tr><td>(A) 想到 EDF + 解释为何 preemption 有时能严格更优 / Mentions EDF and explains when preemption strictly helps</td><td>🌟 调度理论 / 算法视野好 / Strong scheduling-theory insight</td></tr>
            <tr><td>(B) 主动提到 int64 溢出 / counting sort / I/O 优化中的两条以上 / Spontaneously raises int64 overflow + counting sort or I/O optimization</td><td>🌟 生产级工程意识 / Production-grade engineering mindset</td></tr>
            <tr><td>(B) 只想到"用更好的语言 / 多线程" / Only suggests "use a faster language" or "multi-thread"</td><td>⚠️ 缺乏对算法常数优化的认知 / Lacks understanding of algorithmic constants</td></tr>
            <tr><td>对两个变体都没思路 / No idea on either variant</td><td>这是 stretch 题，不扣分 / These are stretch — no penalty</td></tr>
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
        <h4>节点 1：识别 "贪心 + 优先队列" 模式 / Recognizing the "greedy + heap" pattern</h4>
        <p><strong>期望反应 / Expected：</strong>看到"调度 + deadline + 最大化任务数"组合，应在 1-3 分钟内联想到：按 deadline 排序的贪心 + 用 heap 维护当前选择。这是 LeetCode 经典套路（如 LC 502, LC 630, LC 1834）的强信号。</p>
        <table>
          <tbody>
            <tr><th>候选人反应</th><th>评价</th></tr>
            <tr><td>直接想到 greedy + heap，并指出与经典调度题目的相似性 / Recognizes the pattern immediately and references similar classic problems</td><td>🌟 算法题感强 / Strong pattern recognition</td></tr>
            <tr><td>想到 DP（如 dp[t] = ...），可解但不是最优 O(n log n) / Goes to DP — correct but suboptimal</td><td>✅ SDE2 可接受；可在 follow-up 中追问能否改进 / Acceptable for SDE2; press for optimization in follow-up</td></tr>
            <tr><td>第一反应是暴力枚举所有子集 / First idea: brute-force enumerate all subsets</td><td>⚠️ 算法直觉欠缺；用 Stuck 1 提示 / Weak intuition; apply Stuck 1 hints</td></tr>
          </tbody>
        </table>
      </Card>

      <Card>
        <h4>节点 2：按 deadline 升序排序的洞察 / Insight: sort by deadline ascending</h4>
        <p><strong>期望反应 / Expected：</strong>能解释"为什么按 deadline 升序"——核心是 exchange argument：先做 deadline 紧的不会比反过来差（详见 Follow-up 1）。</p>
        <table>
          <tbody>
            <tr><th>候选人反应</th><th>评价</th></tr>
            <tr><td>排序 + 能解释 exchange argument 直觉 / Sorts and articulates exchange-argument intuition</td><td>🌟 Senior 思维 / Senior-level reasoning</td></tr>
            <tr><td>排序但只说"deadline 紧的先做合理" / Sorts but only says "tight deadline first feels right"</td><td>✅ SDE2 可接受 / Acceptable for SDE2</td></tr>
            <tr><td>按 duration 排序 / Sorts by duration</td><td>❌ 会丢失最严约束信息 → 触发 Stuck 1 Hint 3 / Misses key constraint info; apply Stuck 1 Hint 3</td></tr>
            <tr><td>不排序，按原始顺序处理 / No sort, processes input order</td><td>❌ 根本不成立 / Fundamentally wrong</td></tr>
          </tbody>
        </table>
      </Card>

      <Card>
        <h4>节点 3：swap 替换的洞察 / Insight: swap to free budget without losing count</h4>
        <p><strong>期望反应 / Expected：</strong>识别核心不变式——"用当前任务替换堆里最长的已选任务 → 计数不变但 t 严格减小 → 给后续任务腾空间"。这是<strong>本题最关键的算法洞察</strong>，区分中级和初级。</p>
        <table>
          <tbody>
            <tr><th>候选人反应</th><th>评价</th></tr>
            <tr><td>自行推导出 swap 思路并说出"计数不变 + t 减小" / Derives swap idea and explains "count unchanged, t decreases"</td><td>🌟 算法洞察力强 / Strong algorithmic insight</td></tr>
            <tr><td>需要 Stuck 2 Hint 2-3 才意识到可以"撤销"之前的选择 / Needs Stuck 2 Hint 2-3 to realize earlier choices can be undone</td><td>✅ SDE2 水平 / SDE2 level — many candidates need this push</td></tr>
            <tr><td>需要 Hint 4 直接给出 max-heap 才理解 / Needs Hint 4's explicit max-heap to understand</td><td>⚠️ SDE1 水平，缺乏独立洞察 / SDE1 level, lacks independent insight</td></tr>
            <tr><td>给了 Heavy hint 仍写不出 swap 条件 / Even with Heavy hint can't write the swap correctly</td><td>❌ 跳到 Stuck 3 排查 / Drop to Stuck 3 for diagnosis</td></tr>
          </tbody>
        </table>
      </Card>

      <Card>
        <h4>节点 4：复杂度分析 O(n log n) / Complexity analysis</h4>
        <p><strong>期望反应 / Expected：</strong>主动给出时间复杂度 O(n log n) = O(n log n) [sort] + O(n log n) [n 次 heap 操作]，空间 O(n)。</p>
        <table>
          <tbody>
            <tr><th>候选人反应</th><th>评价</th></tr>
            <tr><td>主动分析时间 + 空间复杂度并解释每一项来源 / Volunteers time + space analysis and breaks down each contribution</td><td>🌟 工程素养完整 / Complete engineering rigor</td></tr>
            <tr><td>问到才给出，且正确 / Provides correct analysis only when asked</td><td>✅ SDE2 可接受 / Acceptable for SDE2</td></tr>
            <tr><td>说 O(n²) 或类似错误估计 / Says O(n²) or another incorrect estimate</td><td>⚠️ 对自己代码的复杂度认识不清 / Unclear understanding of own code's complexity</td></tr>
            <tr><td>不能分析 / Cannot analyze</td><td>❌ Senior 候选人这是 red flag / Red flag for senior candidates</td></tr>
          </tbody>
        </table>
      </Card>

      <Card>
        <h4>节点 5：边界条件与正确性测试 / Edge cases &amp; correctness check</h4>
        <p><strong>期望反应 / Expected：</strong>写完代码后主动跑样例 + 提出至少 1-2 个边界场景：</p>
        <ul>
          <li><strong>空输入</strong> <code>tasks = []</code> → 0</li>
          <li><strong>单任务 d &gt; dl</strong> 例如 <code>[[10, 5]]</code> → 0（永远不会加入堆）</li>
          <li><strong>所有任务都能放</strong> 例如 <code>[[1,10],[1,10],[1,10]]</code> → 3</li>
          <li><strong>同 deadline 多任务</strong> 排序稳定性不影响结果（用户给的代码做了 stable sort）</li>
          <li><strong>整型溢出风险</strong>：n × max_d 可达 10⁸ 量级，在 int32 范围内但接近边界；n = 10⁶ 时必须 int64（见 Follow-up 3）</li>
        </ul>
        <table>
          <tbody>
            <tr><th>候选人反应</th><th>评价</th></tr>
            <tr><td>主动手动跑样例 + 列举 2+ 个边界 / Hand-traces sample(s) + enumerates 2+ edge cases</td><td>🌟 测试意识强 / Strong testing mindset</td></tr>
            <tr><td>跑一个样例验证 / Runs at least one sample mentally</td><td>✅ SDE2 可接受 / Acceptable for SDE2</td></tr>
            <tr><td>不验证就提交 / Submits without any verification</td><td>⚠️ 提示运行样例：能否找到边界 case？/ Prompt to test; can they think of edge cases?</td></tr>
            <tr><td>提示后仍想不出边界 / Cannot name edge cases even after prompting</td><td>⚠️ 测试能力薄弱 / Weak testing skills</td></tr>
          </tbody>
        </table>
      </Card>

      <Card
        style={{
          marginTop: 16,
          background: 'linear-gradient(135deg, rgba(59,130,246,0.08), rgba(139,92,246,0.08))',
          borderLeft: '4px solid var(--accent)',
        }}
      >
        <h4>📊 综合判断速查 / Quick Decision Reference</h4>
        <table>
          <tbody>
            <tr><th>表现</th><th>定位</th></tr>
            <tr><td>5 个节点全部 🌟 或 ✅，无需 Heavy hint，主动给复杂度和边界</td><td><strong>Strong Hire (Senior+)</strong></td></tr>
            <tr><td>节点 1-3 ✅，节点 4-5 ⚠️ 但提示后能跟上</td><td><strong>Hire (SDE2)</strong></td></tr>
            <tr><td>节点 1-2 ✅，节点 3 需要 Heavy hint，节点 4-5 较弱</td><td><strong>Lean Hire (SDE1-SDE2 边界)</strong></td></tr>
            <tr><td>节点 3 即使 Heavy hint 也写不对，或节点 4-5 完全没意识</td><td><strong>No Hire</strong></td></tr>
          </tbody>
        </table>
      </Card>
    </>
  );
}

/* ===================== Solution ===================== */

function Solution() {
  return (
    <>
      <Card>
        <h4>核心思路 / Core Idea</h4>
        <p><strong>中文：</strong>这是经典的<strong>带 deadline 的单机调度</strong>问题（LeetCode 630 Course Schedule III 的同型）。直觉是：在所有可能完成的任务里，<strong>优先保留 duration 小的</strong>——因为它们占用的时间窗短，给后续任务留出更多空间。具体做法是 <strong>"按 deadline 升序贪心 + 最大堆做替换"</strong>。</p>
        <p><strong>English:</strong> Classic <strong>single-machine scheduling with deadlines</strong> (same shape as LeetCode 630 Course Schedule III). The intuition: among schedulable tasks, <strong>keep the short-duration ones</strong> — they consume less of the time budget, leaving more room for future tasks. Concretely: <strong>"sort by deadline ascending, then greedily fill with a max-heap-based swap"</strong>.</p>
      </Card>

      <Card>
        <h4>关键观察 / Key Observations</h4>
        <ol>
          <li>
            <strong>排序方向：</strong>按 <strong>deadline 升序</strong>处理，保证每次决策时"未来的 deadline 不会更早"——决策只关心当前能否塞进、要不要替换，无需回头改之前的选择。
            <br />
            <span className="en-text">Process tasks in <strong>ascending deadline order</strong> — guarantees later tasks have ≥ current deadline, so each decision is local: take, swap, or skip.</span>
          </li>
          <li>
            <strong>什么时候直接拿：</strong>记 <code>t</code> = 当前已选任务的总时长。若 <code>t + d ≤ dl</code>，本任务可以无代价地直接加进来。
            <br />
            <span className="en-text">If <code>t + d ≤ dl</code> for the current task (d, dl), take it for free.</span>
          </li>
          <li>
            <strong>什么时候做替换：</strong>若 <code>t + d {'>'} dl</code>（塞不下），看堆顶（已选任务里 duration 最大的）<code>top</code>：若 <code>top {'>'} d</code>，则用 d 顶替 top——堆里任务数不变，但 <code>t</code> 减少了 <code>top − d</code>，给后续任务留出更多时间。
            <br />
            <span className="en-text">If <code>t + d {'>'} dl</code> but the heap's max duration <code>top &gt; d</code>, swap: pop top, push d, set <code>t = t − top + d</code>. The heap size stays the same, but t drops by <code>top − d</code>, freeing budget for later tasks.</span>
          </li>
          <li>
            <strong>正确性（exchange argument 直觉）：</strong>swap 不会让结果变差——任务数没变，剩余预算只增不减；而 sort-by-deadline 保证我们永远在最严格约束下做决策。
            <br />
            <span className="en-text">Correctness (exchange-argument sketch): swap never worsens the solution — count unchanged, budget non-decreasing; sorting by deadline ensures we always decide under the tightest active constraint.</span>
          </li>
        </ol>
      </Card>

      <Card>
        <h4>算法流程 / Algorithm Step-by-Step</h4>
        <ol>
          <li><strong>第一步：</strong>按 <code>deadline</code> 升序排序 <code>tasks</code>。</li>
          <li><strong>第二步：</strong>维护一个最大堆 <code>heap</code>（存放已选任务的 duration）和当前总耗时 <code>t = 0</code>。</li>
          <li>
            <strong>第三步：</strong>遍历每个任务 <code>(d, dl)</code>：
            <ul>
              <li>若 <code>t + d ≤ dl</code>：直接加入，<code>heap.push(d)</code>，<code>t += d</code>。</li>
              <li>否则若 <code>heap</code> 非空且 <code>heap.top() &gt; d</code>：执行 swap，<code>t = t − heap.top() + d</code>，<code>heap.pop()</code> 后 <code>heap.push(d)</code>。</li>
              <li>否则：跳过当前任务（既塞不下，也找不到比它更"贵"的可替换者）。</li>
            </ul>
          </li>
          <li><strong>第四步：</strong>返回 <code>heap.size()</code> —— 即成功调度的任务总数。</li>
        </ol>
      </Card>

      <Card>
        <h4>示例演练 / Walkthrough</h4>
        <p>用样例输入 <code>[[100,200],[200,1300],[1000,1250],[2000,3200]]</code>（答案 = 3）：</p>
        <p>排序后（按 deadline 升序）：<code>[(100,200), (1000,1250), (200,1300), (2000,3200)]</code></p>
        <table>
          <tbody>
            <tr>
              <th>步</th><th>(d, dl)</th><th>t 前</th><th>t+d ≤ dl?</th><th>top &gt; d?</th><th>操作</th><th>heap (max)</th><th>t 后</th>
            </tr>
            <tr><td>1</td><td>(100, 200)</td><td>0</td><td>100 ≤ 200 ✓</td><td>—</td><td>take</td><td>[100]</td><td>100</td></tr>
            <tr><td>2</td><td>(1000, 1250)</td><td>100</td><td>1100 ≤ 1250 ✓</td><td>—</td><td>take</td><td>[1000, 100]</td><td>1100</td></tr>
            <tr><td>3</td><td>(200, 1300)</td><td>1100</td><td>1300 ≤ 1300 ✓</td><td>—</td><td>take</td><td>[1000, 200, 100]</td><td>1300</td></tr>
            <tr><td>4</td><td>(2000, 3200)</td><td>1300</td><td>3300 &gt; 3200 ✗</td><td>1000 &lt; 2000 ✗</td><td>skip</td><td>[1000, 200, 100]</td><td>1300</td></tr>
          </tbody>
        </table>
        <p style={{ marginTop: 12 }}>返回 <code>|heap| = 3</code>。✓</p>

        <p style={{ marginTop: 16 }}><strong>需要触发 swap 的小例子：</strong><code>[[5,5],[4,6],[2,6]]</code>（答案 = 2）：</p>
        <table>
          <tbody>
            <tr>
              <th>步</th><th>(d, dl)</th><th>t 前</th><th>t+d ≤ dl?</th><th>top &gt; d?</th><th>操作</th><th>heap (max)</th><th>t 后</th>
            </tr>
            <tr><td>1</td><td>(5, 5)</td><td>0</td><td>5 ≤ 5 ✓</td><td>—</td><td>take</td><td>[5]</td><td>5</td></tr>
            <tr><td>2</td><td>(4, 6)</td><td>5</td><td>9 &gt; 6 ✗</td><td>5 &gt; 4 ✓</td><td><strong>swap</strong></td><td>[4]</td><td>4</td></tr>
            <tr><td>3</td><td>(2, 6)</td><td>4</td><td>6 ≤ 6 ✓</td><td>—</td><td>take</td><td>[4, 2]</td><td>6</td></tr>
          </tbody>
        </table>
        <p style={{ marginTop: 12 }}>返回 <code>|heap| = 2</code>。✓ —— 注意第 2 步用 4 顶替了 5，使 t 从 5 降到 4，才腾出了第 3 步的空间。</p>
      </Card>

      <Card>
        <h4>
          代码 / Reference Code{' '}
          <span style={{ fontSize: 14, color: 'var(--text-muted)', fontWeight: 500 }}>
            (4 个语言 · tab 切换 · 默认 C++)
          </span>
        </h4>
        <p style={{ margin: '8px 0 0', color: 'var(--text-muted)' }}>
          四个版本都采用<strong>同一份算法</strong>（sort + max-heap + swap），差别仅在语言层面的 max-heap 实现：
          <br />
          <span className="en-text">All four use the <strong>same algorithm</strong> (sort + max-heap + swap); only the max-heap idiom differs by language:</span>
        </p>
        <ul style={{ marginTop: 8, color: 'var(--text-muted)' }}>
          <li><strong>C++：</strong><code>priority_queue&lt;int&gt;</code> 默认就是最大堆。</li>
          <li><strong>C#：</strong><code>PriorityQueue&lt;TElement, TPriority&gt;</code> 是<strong>最小堆</strong>，通过把 priority 取负来当最大堆用。</li>
          <li><strong>Python：</strong><code>heapq</code> 只有最小堆，所以存入 <code>-d</code> 模拟最大堆。</li>
          <li><strong>TypeScript：</strong>标准库没有堆，手写一个最大堆（push / popMax）。</li>
        </ul>
      </Card>

      <CodeTabs
        defaultTabId="cpp"
        tabs={[
          {
            id: 'cpp',
            label: <>📖 C++</>,
            content: (
              <>
                <h4>C++ 参考答案 <Tag variant="cpp">C++17</Tag></h4>
                <pre><code>{`int scheduleTasks(vector<vector<int>>& tasks) {
    // 1) Sort by deadline ascending.
    // 2) Max-heap of chosen durations + running clock t.
    //    - If t + d <= dl: take it (push d, t += d).
    //    - Else if heap.top() > d: swap (pop top, push d,
    //      t = t - top + d). Heap size unchanged but t drops.
    sort(tasks.begin(), tasks.end(),
         [](const auto& a, const auto& b){ return a[1] < b[1]; });

    priority_queue<int> heap;    // max-heap by default
    long long t = 0;
    for (auto& task : tasks) {
        int d = task[0], dl = task[1];
        if (t + d <= dl) {
            heap.push(d);
            t += d;
        } else if (!heap.empty() && heap.top() > d) {
            t = t - heap.top() + d;
            heap.pop();
            heap.push(d);
        }
    }
    return (int)heap.size();
}`}</code></pre>
                <p style={{ color: 'var(--text-muted)', margin: '8px 0 0', fontSize: 14 }}>
                  需 <code>#include &lt;queue&gt;</code> 与 <code>#include &lt;algorithm&gt;</code>（starter 里 <code>&lt;bits/stdc++.h&gt;</code> 已涵盖）。
                </p>
              </>
            ),
          },
          {
            id: 'cs',
            label: <>🔷 C#</>,
            content: (
              <>
                <h4>C# 参考答案 <Tag variant="cs">C# / .NET 6+</Tag></h4>
                <pre><code>{`static int ScheduleTasks(int[][] tasks) {
    // C#'s PriorityQueue is a min-heap; negate the priority
    // to use it as a max-heap of durations.
    Array.Sort(tasks, (a, b) => a[1].CompareTo(b[1]));

    var heap = new PriorityQueue<int, int>();   // element=d, priority=-d
    long t = 0;
    foreach (var task in tasks) {
        int d = task[0], dl = task[1];
        if (t + d <= dl) {
            heap.Enqueue(d, -d);
            t += d;
        } else if (heap.Count > 0 && heap.Peek() > d) {
            int top = heap.Dequeue();
            t = t - top + d;
            heap.Enqueue(d, -d);
        }
    }
    return heap.Count;
}`}</code></pre>
                <p style={{ color: 'var(--text-muted)', margin: '8px 0 0', fontSize: 14 }}>
                  <code>PriorityQueue&lt;TElement, TPriority&gt;</code> 是 .NET 6+ 提供的，HackerRank 的 C# 环境通常已升级到 8.0/9.0，可直接用。
                </p>
              </>
            ),
          },
          {
            id: 'py',
            label: <>🐍 Python</>,
            content: (
              <>
                <h4>Python 参考答案 <Tag variant="py">Python 3</Tag></h4>
                <pre><code>{`import heapq

def schedule_tasks(tasks):
    # heapq is a min-heap, so push -d to simulate a max-heap of d.
    tasks.sort(key=lambda x: x[1])
    heap = []          # stores -d (negated durations)
    t = 0
    for d, dl in tasks:
        if t + d <= dl:
            heapq.heappush(heap, -d)
            t += d
        elif heap and -heap[0] > d:
            t = t - (-heap[0]) + d
            heapq.heapreplace(heap, -d)   # pop+push in one O(log n) op
    return len(heap)`}</code></pre>
                <p style={{ color: 'var(--text-muted)', margin: '8px 0 0', fontSize: 14 }}>
                  <code>heapq.heapreplace</code> 是 <code>heappop + heappush</code> 的合并版，少做一次 sift。
                </p>
              </>
            ),
          },
          {
            id: 'ts',
            label: <>📘 TypeScript</>,
            content: (
              <>
                <h4>TypeScript 参考答案 <Tag variant="ts">TypeScript</Tag></h4>
                <pre><code>{`function scheduleTasks(tasks: number[][]): number {
    // No built-in heap in JS/TS — hand-roll a binary max-heap.
    tasks.sort((a, b) => a[1] - b[1]);

    const heap: number[] = [];
    const push = (v: number) => {
        heap.push(v);
        let i = heap.length - 1;
        while (i > 0) {
            const p = (i - 1) >> 1;
            if (heap[p] >= heap[i]) break;
            [heap[p], heap[i]] = [heap[i], heap[p]];
            i = p;
        }
    };
    const popMax = (): number => {
        const top = heap[0];
        const last = heap.pop()!;
        if (heap.length > 0) {
            heap[0] = last;
            let i = 0; const n = heap.length;
            while (true) {
                const l = 2*i + 1, r = 2*i + 2;
                let best = i;
                if (l < n && heap[l] > heap[best]) best = l;
                if (r < n && heap[r] > heap[best]) best = r;
                if (best === i) break;
                [heap[i], heap[best]] = [heap[best], heap[i]];
                i = best;
            }
        }
        return top;
    };

    let t = 0;
    for (const [d, dl] of tasks) {
        if (t + d <= dl) { push(d); t += d; }
        else if (heap.length > 0 && heap[0] > d) {
            t = t - heap[0] + d;
            popMax(); push(d);
        }
    }
    return heap.length;
}`}</code></pre>
                <p style={{ color: 'var(--text-muted)', margin: '8px 0 0', fontSize: 14 }}>
                  如果候选人不熟悉手写堆，<strong>sort + 拒绝 / swap by linear scan</strong> 在 n ≤ 10<sup>4</sup> 下也能 AC，O(n²) 但常数小——可作为退而求其次的方案。
                </p>
              </>
            ),
          },
        ]}
      />

      <Collapsible
        id="sample-io"
        variant="card"
        summary={
          <>
            📥 Sample input + expected output <Tag>test data</Tag>
          </>
        }
        defaultOpen={false}
      >
        <p>把下面 7 行粘进 HackerRank 的 <strong>Custom Input</strong> 框（或保存为 <code>input.txt</code> 后 <code>cat input.txt | …</code>）：</p>
        <pre><code>{`[[100,200],[200,1300],[1000,1250],[2000,3200]]
[[1,2]]
[[3,2],[4,3]]
[[5,5],[4,6],[2,6]]
[]
[[1,5],[2,5],[3,5]]
[[10,10],[1,11],[2,12],[3,13]]`}</code></pre>
        <p style={{ marginTop: 16 }}>正确实现 <code>scheduleTasks</code> 后会看到（✓/✗ 由 starter 的 auto-judge 框架打印，不需候选人实现）：</p>
        <pre><code>{`scheduleTasks([[100,200],[200,1300],[1000,1250],[2000,3200]]) = 3  ✓
scheduleTasks([[1,2]]) = 1  ✓
scheduleTasks([[3,2],[4,3]]) = 0  ✓
scheduleTasks([[5,5],[4,6],[2,6]]) = 2  ✓
scheduleTasks([]) = 0  ✓
scheduleTasks([[1,5],[2,5],[3,5]]) = 2  ✓
scheduleTasks([[10,10],[1,11],[2,12],[3,13]]) = 3  ✓
--------------------------------
Result: 7 / 7 correct`}</code></pre>
        <p style={{ color: 'var(--text-muted)', marginTop: 12, fontSize: 14 }}>
          未修改的占位 <code>scheduleTasks</code>（即 <code>return tasks.length</code>）会输出 <code>Result: 2 / 7 correct</code>（混合 ✓/✗）——以此提醒候选人"占位是错的，需要替换"。
          <br />
          <span className="en-text">The placeholder (returns <code>tasks.length</code>) prints <code>Result: 2 / 7 correct</code> (mix of ✓/✗), signaling the candidate that the placeholder is wrong and needs replacing.</span>
        </p>
      </Collapsible>

      <Card>
        <h4>复杂度 / Complexity</h4>
        <ul>
          <li><strong>时间：</strong>O(n log n) —— 排序 O(n log n) + 每个任务最多一次 push/pop（O(log n)）。</li>
          <li><strong>空间：</strong>O(n) —— 最大堆最多容纳 n 个 duration。</li>
        </ul>
      </Card>
    </>
  );
}

/* ===================== Registry entry ===================== */

export const taskSchedulingEntry: ProblemEntry = {
  id: 'task-scheduling-with-deadlines',
  label: 'Task Scheduling with Deadlines',
  component: TaskSchedulingPage,
};
