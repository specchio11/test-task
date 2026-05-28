## 题面 / Problem Statement

**English:**

> You are given a black-box function `f(x)` that maps non-negative integers to non-negative integers. `f` is **strictly monotonically increasing** (i.e., for any $a < b$, $f(a) < f(b)$).
>
> You can only call `f(x)` — you cannot inspect its implementation.
>
> **Task:** Implement its inverse function `g(y)` — given a value `y`, return the integer `x` such that `f(x) = y`. You may assume that for every input `y`, a valid `x` always exists.

**中文:**

> 给定一个黑盒函数 `f(x)`，它将非负整数映射到非负整数。`f` **严格单调递增**（即对于任意 $a < b$，有 $f(a) < f(b)$）。
>
> 你只能调用 `f(x)`，不能查看其内部实现。
>
> **任务：** 实现它的反函数 `g(y)` —— 给定一个值 `y`，返回整数 `x` 使得 `f(x) = y`。你可以假设对于每一个输入的 `y`，合法的 `x` 一定存在。

### 版本一：面试口语版（推荐直接使用）/ Version 1: Conversational (Recommended for Interview)

**English:**

> "Alright, here's the problem. Imagine you have a function `f` — you can call it with any non-negative integer, and it gives you back a non-negative integer. You can't look inside it, it's a black box. The one thing you *do* know is that it's strictly increasing — so if you feed it a bigger number, you always get a bigger result. No ties, no going backwards.
>
> Now, what I need you to do is write the *reverse* of that function. I'll give you some output value `y`, and you need to figure out: what input `x` did it come from? In other words, find `x` such that `f(x) = y`.
>
> You can assume there's always a valid answer — I won't give you a `y` that doesn't match any `x`. Sound good? Go ahead."

**中文:**

> "好，我来说一下题目。假设你有一个函数 `f`，你可以给它传入任何非负整数，它会返回一个非负整数。你看不到它的内部实现，它是一个黑盒。但你知道一件事：它是严格递增的——也就是说你给的数越大，它返回的结果就一定越大。不会有相等，也不会有倒退。
>
> 现在我需要你做的是：写一个'反向'的函数。我给你一个输出值 `y`，你要找出它是从哪个输入 `x` 来的。换句话说，找到 `x` 使得 `f(x) = y`。
>
> 你可以假设答案一定存在——我不会给你一个不对应任何 `x` 的 `y`。清楚了吗？那就开始吧。"

### 版本二：最简化解释版（候选人不理解术语时使用）/ Version 2: Plain-Language Explanation (Use When Candidate Struggles with Terminology)

**English:**

> "Let me break it down more simply. Forget the math jargon for a moment.
>
> Think of `f` as a machine. You put in a number, it spits out a number. You can't open the machine to see how it works. All you know is one rule: **if you put in a bigger number, you always get a bigger number out.** It never stays the same, and it never goes down.
>
> For example, let's say:
> - You put in `3`, the machine gives you `10`.
> - You put in `5`, it gives you `17`.
> - You put in `8`, it gives you `25`.
>
> See? Bigger input, bigger output. Every time.
>
> Now here's your task: **I'm going to give you an output, and you have to figure out what input produced it.** Like if I say 'the machine output `17`', you should tell me the input was `5`. That's it.
>
> You're writing a function that takes the output and finds the input. And don't worry — I promise there's always exactly one right answer."

**中文:**

> "我换个更简单的方式说。先不管那些数学术语。
>
> 你把 `f` 想象成一台机器。你往里面塞一个数字，它会吐出一个数字。你看不到机器里面怎么运作的。你唯一知道的一条规则是：**如果你塞进去的数字更大，它吐出来的数字也一定更大。** 不会相同，也不会变小。
>
> 举个例子：
> - 你塞进去 `3`，机器吐出 `10`。
> - 你塞进去 `5`，它吐出 `17`。
> - 你塞进去 `8`，它吐出 `25`。
>
> 看到了吧？输入越大，输出就越大。每次都是这样。
>
> 现在你的任务是：**我告诉你一个输出结果，你要倒推出是哪个输入产生了它。** 比如我说'机器输出了 `17`'，你要告诉我输入是 `5`。就这么简单。
>
> 你要写一个函数，接收这个输出值，找到对应的输入值。放心——答案一定存在，而且只有一个。"

---

## 候选人卡壳情况及提示策略 / Sticking Points & Hints

### 卡壳 0：不理解题目中的数学概念 / Stuck 0: Doesn't understand the math concepts in the problem

**表现 / Symptom：** 候选人对"单调递增"或"反函数"的概念感到困惑，无法理解题意。/ Candidate is confused by "monotonically increasing" or "inverse function" and can't understand the problem.

**解释"单调递增" / Explaining "monotonically increasing"：**
> "It simply means: the bigger the input, the bigger the output. If you put in a larger `x`, you always get a larger `f(x)`. It never goes down. For example, `f(x) = 2x + 1` — as x grows, f(x) always grows."
>
> "简单来说就是：输入越大，输出也越大。如果你给一个更大的 `x`，`f(x)` 的结果一定更大，永远不会变小。比如 `f(x) = 2x + 1`，x 越大，f(x) 就越大。"

**解释"反函数" / Explaining "inverse function"：**
> "Think of it as 'reversing' the function. If `f(5) = 13`, then the inverse function `g(13)` should return `5`. You're given the output and need to find the original input."
>
> "可以理解为'反过来'。如果 `f(5) = 13`，那反函数 `g(13)` 就应该返回 `5`。也就是给你一个输出值，让你找到原来的输入。"

> **面试官注意 / Interviewer Note：** 这个解释**不算提示**，不应影响对候选人算法能力的评分。题目中的数学术语可能对非英语母语的候选人造成理解障碍，澄清概念是公平的。但如果候选人在理解概念后仍然长时间没有思路，则按卡壳 1 处理。
>
> **Interviewer Note:** This clarification **does not count as a hint** and should not affect the candidate's algorithm evaluation. Math terminology may be a language barrier for non-native English speakers; clarifying concepts is fair. However, if the candidate still has no idea after understanding the concepts, proceed to Stuck 1.

---

### 卡壳 1：完全没思路，不知道用什么算法 / Stuck 1: No idea what algorithm to use

**表现 / Symptom：** 沉默，或者直接写暴力遍历。/ Silent, or jumps straight to brute-force linear scan.

| 提示等级 / Hint Level | 提示内容 / Hint Content |
|---|---|
| **Hint 1（轻度 / Light）** | "What property of `f` makes this problem easier than searching in an unsorted collection?" |
| **Hint 2（中度 / Medium）** | "If I told you x is somewhere between 0 and 1000, how would you find it efficiently?" |
| **Hint 3（重度 / Heavy）** | "Think about binary search. The function is monotonically increasing — what does that remind you of?" |

### 卡壳 2：知道二分，但不知道上界从哪来 / Stuck 2: Knows binary search, but can't determine the upper bound

**表现 / Symptom：** 写出了二分的框架，但 `high = ???` 空着或者随便填了个大常数。/ Writes the binary search skeleton, but leaves `high = ???` blank or hardcodes a large constant.

| 提示等级 / Hint Level | 提示内容 / Hint Content |
|---|---|
| **Hint 1（轻度 / Light）** | "Given that f maps non-negative integers to non-negative integers and is strictly increasing, what can you say about the relationship between `f(x)` and `x`?" |
| **Hint 2（中度 / Medium）** | "If f(0) >= 0 and f(1) must be strictly greater than f(0), and all values are integers... what's the minimum possible value of f(1)? f(2)? f(n)?" |
| **Hint 3（重度 / Heavy）** | "Can you prove that f(x) >= x? If so, what does that tell you about the upper bound for x given y?" |

### 卡壳 3：用了倍增方案，被追问能否更直接 / Stuck 3: Used doubling, asked if there's a more direct way

**表现 / Symptom：** 写出了完整的倍增 + 二分，但面试官追问有没有更简单的方式。/ Wrote a complete doubling + binary search solution, but interviewer asks if there's a simpler approach.

| 提示等级 / Hint Level | 提示内容 / Hint Content |
|---|---|
| **Hint 1** | "Your exponential search works great. But since we know f maps integers to integers and is strictly increasing, is there a mathematical argument that x can never be larger than y?" |

### 卡壳 4：用了 high = y，被追问有没有更高效的方式 / Stuck 4: Used high = y, asked if there's a more efficient way

**表现 / Symptom：** 写出了正确的 [0, y] 二分，但面试官追问性能。/ Wrote a correct [0, y] binary search, but interviewer probes on performance.

| 提示等级 / Hint Level | 提示内容 / Hint Content |
|---|---|
| **Hint 1** | "Your solution is O(log y). But imagine f(x) = 2^x and y = 1,000,000. The actual x is only 20. Can you find x in O(log 20) instead of O(log 1,000,000)?" |
| **Hint 2** | "What if you don't start with high = y, but instead grow high from 1 by doubling until f(high) >= y?" |

---

## 拓展追问 / Follow-up Questions

以下是在候选人完成主题后可以使用的追问问题，按难度递增排列。面试官可根据剩余时间和候选人表现选择性使用。
Below are follow-up questions to use after the candidate completes the main problem, ordered by increasing difficulty. Interviewers can selectively use them based on remaining time and candidate performance.

---

### 追问 1：答案不保证存在 / Follow-up 1: Answer Not Guaranteed to Exist

**提问 / Question：**
> "What if I remove the guarantee that a valid `x` always exists? How would you modify your solution to return `-1` or `null` when no `x` satisfies `f(x) = y`?"

**推荐提问时点 / When to ask：**
候选人很快写完了主题，剩余时间较多时用来快速填补。/ Candidate finishes the main problem quickly; use to fill remaining time. (~1-2 min)

**标准答案 / Expected Answer：**
当前的二分代码其实已经天然处理了这个情况——`while` 循环正常结束时 `low > high`，说明没找到。只需把 `throw new Error(...)` 改为 `return -1` 或 `return null` 即可。
The current binary search code already handles this naturally — when the `while` loop terminates with `low > high`, it means no match was found. Simply change `throw new Error(...)` to `return -1` or `return null`.

```javascript
// 只需修改最后一行 / Only change the last line:
// throw new Error("No valid x found");
return -1;  // or return null;
```

**考察点 / What it tests：**
候选人是否真正理解自己写的代码的终止条件，而不是机械地套模板。
Whether the candidate truly understands their own code's termination condition, rather than mechanically applying a template.

**评价标准 / How to evaluate：**

| 候选人反应 / Candidate Response | 评价 / Assessment |
|---|---|
| 立刻回答"改 throw 为 return -1 就行" / Immediately says "just change throw to return -1" | ✅ 理解透彻 / Thorough understanding |
| 想了一会儿，重新审视循环终止条件后答对 / Thinks for a moment, reviews loop termination, then answers correctly | ✅ 可以接受 / Acceptable |
| 试图加一堆额外的 if 判断来处理 / Tries to add many extra if-checks | ⚠️ 不够理解自己代码的逻辑 / Doesn't fully understand their own code logic |

---

### 追问 2：多次调用 g(y) 的场景优化 / Follow-up 2: Optimizing for Multiple g(y) Calls

**提问 / Question：**
> "If `g` is going to be called millions of times with different `y` values, but `f` never changes, how would you optimize?"

**推荐提问时点 / When to ask：**
候选人在主题中展现了工程思维（比如主动提到 f 调用开销），想进一步探索其系统设计能力时。/ Candidate showed engineering mindset during the main problem (e.g., mentioned f call cost); use to further explore system design thinking. (~2-3 min)

**标准答案 / Expected Answer：**
有几种优化策略，由浅到深：
Several optimization strategies, from simple to advanced:

1. **缓存已知结果 / Cache known results：** 用一个 `Map<y, x>` 缓存每次 g(y) 的返回值，命中则 O(1) 返回。/ Use a `Map<y, x>` to cache each g(y) result; cache hit returns in O(1).

2. **缓存 f 的中间调用 / Cache intermediate f calls：** 二分过程中调用的每个 `f(mid)` 都存入缓存。后续调用 g 时，可以先在缓存中查找已知的 `(x, f(x))` 对来缩小搜索区间。/ Store every `f(mid)` called during binary search. Subsequent g calls can use cached `(x, f(x))` pairs to narrow the search range.

3. **预构建查找表 / Pre-build lookup table：** 如果知道 x 的大致范围，预先调用 f 构建一个有序数组，后续每次 g(y) 直接在数组上二分，不再调用 f。/ If x's approximate range is known, pre-call f to build a sorted array; subsequent g(y) calls binary search the array without calling f.

**考察点 / What it tests：**
系统设计意识——能否从"解决一个问题"跳跃到"设计一个高效的服务"。
System design awareness — can the candidate leap from "solving one problem" to "designing an efficient service."

**评价标准 / How to evaluate：**

| 候选人反应 / Candidate Response | 评价 / Assessment |
|---|---|
| 提到结果缓存 (Map) / Mentions result caching (Map) | ✅ SDE2 水平 / SDE2 level |
| 提到缓存中间 f 调用来缩小后续搜索范围 / Mentions caching intermediate f calls to narrow future searches | 🌟 Senior 思维 / Senior-level thinking |
| 提到预构建查找表 / Mentions pre-building a lookup table | 🌟 系统设计能力强 / Strong system design |
| 完全没有思路 / No idea at all | ⚠️ 缺乏工程优化意识 / Lacks engineering optimization awareness |

---

### 追问 3：非严格递增（有重复值），找最小 x / Follow-up 3: Non-Strictly Increasing (with Duplicates), Find Smallest x

**提问 / Question：**
> "What if `f` is non-decreasing instead of strictly increasing? That means `f(a) <= f(b)` for `a < b`, and multiple `x` values could map to the same `y`. How would you return the **smallest** such `x`?"

**推荐提问时点 / When to ask：**
候选人二分写得很熟练，想测试其对二分查找变体（找左边界 / lower bound）的掌握度。/ Candidate writes binary search fluently; use to test mastery of binary search variants (lower bound). (~3-5 min)

**标准答案 / Expected Answer：**
这是经典的"找左边界的二分"（lower bound binary search）。关键修改：当 `f(mid) === y` 时，**不立刻返回**，而是继续向左搜索（`high = mid - 1`），最后返回 `low`。
This is the classic "lower bound binary search." Key change: when `f(mid) === y`, **don't return immediately**; instead keep searching left (`high = mid - 1`), and return `low` at the end.

```javascript
function g(f, y) {
    let low = 0;
    let high = y;
    let result = -1;

    while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        const val = f(mid);

        if (val === y) {
            result = mid;     // 记录候选答案 / Record candidate answer
            high = mid - 1;   // 继续向左找更小的 x / Keep searching left for smaller x
        } else if (val < y) {
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }

    return result;
}
```

**考察点 / What it tests：**
对二分查找变体的掌握。"找左边界"是二分查找最重要的变种之一，在实际工程（数据库索引查找、范围查询等）中极其常见。
Mastery of binary search variants. "Finding the left boundary" is one of the most important binary search variations, extremely common in real engineering (DB index lookups, range queries, etc.).

**评价标准 / How to evaluate：**

| 候选人反应 / Candidate Response | 评价 / Assessment |
|---|---|
| 立刻写出 lower bound 变体，逻辑清晰 / Immediately writes lower bound variant with clear logic | 🌟 二分功底扎实 / Solid binary search mastery |
| 知道思路（不立刻返回，继续向左），但代码细节有小 bug / Knows the approach (don't return immediately, keep going left) but has minor bugs | ✅ SDE2 可接受 / Acceptable for SDE2 |
| 完全不知道如何修改 / No idea how to modify | ⚠️ 二分查找只会最基础的形式 / Only knows basic binary search form |

---

### 追问 4：并行/异步调用 f（前端特色） / Follow-up 4: Parallel/Async Calls to f (Frontend-Specific)

**提问 / Question：**
> "What if `f(x)` is an async function (e.g., a network API call that returns a Promise)? And you can make multiple concurrent calls. How would you speed up the search?"

**推荐提问时点 / When to ask：**
针对前端候选人，测试其异步编程实战能力。候选人已展现出扎实的算法基础，想进一步考察前端特有的工程能力时使用。/ For frontend candidates, testing async programming skills. Use when the candidate has shown solid algorithm fundamentals and you want to further assess frontend-specific engineering ability. (~3-5 min)

**标准答案 / Expected Answer：**
标准二分是串行的——每轮只调用一次 f，等结果回来才能决定下一步。如果 f 是异步的（如网络请求），可以**一次并发多个调用来加速收敛**：
Standard binary search is sequential — one f call per round, waiting for the result before deciding the next step. If f is async (e.g., network call), we can **parallelize multiple calls to speed up convergence**:

1. **N 等分并发 / N-way parallel split：** 将 [low, high] 等分为 N 段，同时调用 N-1 个分割点的 f 值（用 `Promise.all`），根据返回结果定位到 1/N 的子区间。每轮排除 (N-1)/N 的区间，而不是 1/2。
Divide [low, high] into N segments, concurrently call f at N-1 split points (using `Promise.all`), and locate the 1/N sub-interval based on results. Each round eliminates (N-1)/N of the range instead of 1/2.

2. **复杂度变化 / Complexity change：** 每轮 N-1 次并发调用，区间缩小为 1/N，总轮数从 log₂(y) 降为 logₙ(y)。总调用次数为 (N-1) × logₙ(y)，但**总轮数（延迟）** 大幅降低。
Each round has N-1 concurrent calls, range shrinks to 1/N, total rounds drop from log₂(y) to logₙ(y). Total call count is (N-1) × logₙ(y), but **total rounds (latency)** is significantly reduced.

```javascript
async function g(f, y, concurrency = 4) {
    let low = 0;
    let high = y;

    while (low < high) {
        // 生成 concurrency-1 个等分点 / Generate concurrency-1 split points
        const points = [];
        for (let i = 1; i < concurrency; i++) {
            points.push(low + Math.floor((high - low) * i / concurrency));
        }

        // 并发调用 / Concurrent calls
        const results = await Promise.all(points.map(p => f(p)));

        // 根据结果定位子区间 / Locate sub-interval based on results
        let found = false;
        for (let i = 0; i < results.length; i++) {
            if (results[i] === y) return points[i];
            if (results[i] > y) {
                high = points[i] - 1;
                low = i > 0 ? points[i - 1] + 1 : low;
                found = true;
                break;
            }
        }
        if (!found) {
            low = points[points.length - 1] + 1;
        }
    }

    return low;
}
```

**考察点 / What it tests：**
- 异步编程能力（Promise.all 的使用）/ Async programming skills (Promise.all usage)
- 并发与效率的权衡思维（总调用次数增加 vs 总延迟降低）/ Concurrency vs efficiency trade-off thinking (more total calls vs less total latency)
- 从串行算法到并行算法的思维转换 / Mental shift from sequential to parallel algorithms

**评价标准 / How to evaluate：**

| 候选人反应 / Candidate Response | 评价 / Assessment |
|---|---|
| 提出 N 等分 + Promise.all 的方案，并能解释延迟与调用次数的 trade-off / Proposes N-way split + Promise.all, explains latency vs call count trade-off | 🌟 前端工程能力极强 / Excellent frontend engineering ability |
| 提出"同时调 f(1/3) 和 f(2/3)"（三分搜索），但没有泛化到 N 分 / Proposes "call f(1/3) and f(2/3) simultaneously" (ternary search) but doesn't generalize to N | ✅ 有并行思维，SDE2 达标 / Has parallel thinking, SDE2 level |
| 知道要用 async/await 和 Promise.all 但不确定如何应用到二分 / Knows async/await and Promise.all but unsure how to apply to binary search | ⚠️ 异步基础有，但算法应用能力弱 / Has async basics but weak on algorithmic application |
| 完全没有并发优化的思路 / No idea about concurrent optimization | ⚠️ 对于前端候选人来说，异步思维不足 / For a frontend candidate, insufficient async thinking |

---

### 追问使用建议汇总 / Follow-up Usage Summary

| 追问 / Follow-up | 耗时 / Time | 适用场景 / When to use | 难度 / Difficulty |
|---|---|---|---|
| **1. 答案不存在 / Answer not guaranteed** | 1-2 min | 候选人快速完成主题，快速填补时间 / Candidate finishes quickly, fill remaining time | ⭐ 简单 / Easy |
| **2. 多次调用优化 / Multiple calls optimization** | 2-3 min | 候选人展现了工程思维 / Candidate showed engineering mindset | ⭐⭐ 中等 / Medium |
| **3. 非递减找左边界 / Non-decreasing lower bound** | 3-5 min | 候选人二分熟练，测试变体掌握 / Candidate fluent in BS, test variant mastery | ⭐⭐⭐ 较难 / Hard |
| **4. 并行异步调用 / Parallel async calls** | 3-5 min | 前端候选人，测试异步实战能力 / Frontend candidate, test async skills | ⭐⭐⭐⭐ 高阶 / Advanced |

---

## 关键考察节点 / Key Checkpoints

以下是这道题中几个**从易到难**的关键思维节点，每一个节点都是对候选人能力的一次检验：
Below are the key thinking checkpoints of this problem, ordered from easy to hard. Each checkpoint serves as a test of the candidate's ability:

### 节点 1：识别出二分查找（基础门槛） / Checkpoint 1: Recognizing Binary Search (Baseline)

| 考察内容 / What to assess | 候选人应该意识到 / Candidate should realize |
|---|---|
| 为什么能用二分？/ Why can we use binary search? | f 严格单调递增 → 搜索空间是有序的 → 可以用二分 / f is strictly increasing → search space is sorted → binary search applies |
| 如果写了线性扫描？/ What if they write a linear scan? | 说明不具备基本的算法直觉 / Indicates lack of basic algorithmic intuition |

### 节点 2：确定搜索上界——x ≤ y（核心区分度） / Checkpoint 2: Determining Upper Bound — x ≤ y (Key Differentiator)

| 考察内容 / What to assess | 候选人应该意识到 / Candidate should realize |
|---|---|
| 为什么 high = y 是安全的？/ Why is high = y safe? | 因为 f 是整数到整数的严格递增映射，可以归纳证明 f(x) ≥ x，所以 x ≤ y / Since f is a strictly increasing integer-to-integer mapping, by induction f(x) ≥ x, thus x ≤ y |
| 如果候选人直接用一个很大的常数（如 `high = 1e9`）？/ What if they hardcode a large constant (e.g. `high = 1e9`)? | 可以工作但不够优雅；说明没有深入分析问题的数学性质 / Works but inelegant; shows lack of deeper mathematical analysis |
| 如果候选人用倍增（`high *= 2`）？/ What if they use doubling (`high *= 2`)? | 这是一种**更通用**的方案，说明有扎实的算法基础，但可以追问他是否还有更直接的方式 / A **more general** approach showing solid algorithm skills; follow up by asking if there's a more direct way |

### 节点 3：倍增方案的优势认知（高阶思维） / Checkpoint 3: Understanding Doubling's Advantage (Advanced Thinking)

| 考察内容 / What to assess | 候选人应该意识到 / Candidate should realize |
|---|---|
| high = y 的方案在什么时候"浪费"？/ When is the high = y approach "wasteful"? | 当 f 增长极快时（如 f(x) = 2^x），y 远大于 x，搜索范围不紧凑 / When f grows very fast (e.g. f(x) = 2^x), y is much larger than x, making the search range loose |
| 倍增方案的优势 / Advantage of doubling | 搜索范围 [x*/2, x*]，复杂度 O(log x*) 而非 O(log y) / Search range [x*/2, x*], complexity O(log x*) instead of O(log y) |
| 两种方案的 trade-off | high = y：更简单，利用了数学性质；倍增：更通用，当 f 增长快时更高效 / high = y: simpler, leverages math property; Doubling: more general, more efficient when f grows fast |

### 节点 4：边界条件处理（工程严谨性） / Checkpoint 4: Edge Case Handling (Engineering Rigor)

| 边界场景 / Edge case | 正确处理方式 / Correct handling |
|---|---|
| **y = 0** | 此时 high = 0，low = 0，循环只执行一次检查 f(0)。标准二分逻辑自然处理，**不需要特殊处理** / high = 0, low = 0, loop runs once checking f(0). Standard binary search handles it naturally, **no special case needed** |
| **y = f(0) 且 f(0) > 0 / y = f(0) and f(0) > 0** | 此时 x = 0，high = y > 0，二分会自然找到 mid = 0 的位置。也能正确处理 / x = 0, high = y > 0, binary search naturally finds mid = 0. Also handled correctly |
| **x 很大 / x is very large** | JavaScript 中 Number.MAX_SAFE_INTEGER 为 2^53 - 1；在 Java/C++ 中 (low + high) 可能溢出，需要写成 low + Math.floor((high - low) / 2) / In JS, Number.MAX_SAFE_INTEGER is 2^53 - 1; in Java/C++, (low + high) may overflow — use low + Math.floor((high - low) / 2) instead |

### 节点 5：f 调用次数优化（生产环境意识） / Checkpoint 5: Minimizing f Calls (Production Awareness)

| 考察内容 / What to assess | 优秀的候选人会提到 / Strong candidates will mention |
|---|---|
| f 的调用可能很昂贵 / f calls could be expensive | 网络请求、数据库查询、复杂计算 / Network requests, DB queries, heavy computation |
| 避免重复计算 / Avoid redundant calls | 把 f(mid) 存到变量中再做比较，而不是调用两次 / Store f(mid) in a variable instead of calling it twice |
| 缓存/记忆化 / Caching / memoization | 如果 g 会被多次调用，可以缓存 f 的历史结果 / If g is called multiple times, cache previous f results |

---

## 标准答案 / Model Solution

### 核心思路 / Core Idea

**中文：** f 严格单调递增 → 搜索空间有序 → **二分查找**。关键在于确定二分的上界。

**English:** f is strictly monotonically increasing → the search space is sorted → **binary search**. The key is determining the upper bound.

### 关键数学推导 / Key Mathematical Insight

因为 f: Z≥0 → Z≥0 严格单调递增：

- f(0) ≥ 0
- f(1) > f(0) ≥ 0 ⟹ f(1) ≥ 1 （整数，严格大于0）
- f(2) > f(1) ≥ 1 ⟹ f(2) ≥ 2
- ...

**归纳结论：f(x) ≥ x 对所有 x ≥ 0 成立。**

因此若 f(x) = y，则 y ≥ x，即 **x ≤ y**。搜索范围确定为 [0, y]。

### 算法流程描述 / Algorithm Step-by-Step

**第一步：确定搜索范围。**
根据数学推导 f(x) ≥ x，可知 x ≤ y。因此搜索范围为 [0, y]。

**第二步：在 [0, y] 上执行标准二分查找。**
1. 设 lo = 0, hi = y。
2. 每轮循环计算中点 mid = floor((lo + hi) / 2)，调用 f(mid) 获得结果 result。
3. 比较 result 与 y：
   - 如果 result === y：找到答案，返回 mid。
   - 如果 result < y：说明 mid 太小，答案在右半边，令 lo = mid + 1。
   - 如果 result > y：说明 mid 太大，答案在左半边，令 hi = mid - 1。
4. 重复步骤 2-3，直到 lo > hi（此时区间为空）或找到答案。

**示例演练 / Walkthrough：** 假设 f(x) = 2x + 3，y = 13（答案 x = 5）。

| 轮次 | lo | hi | mid | f(mid) | 与 y=13 比较 | 操作 |
|------|----|----|-----|--------|-------------|------|
| 1 | 0 | 13 | 6 | 15 | 15 > 13 | hi = 5 |
| 2 | 0 | 5 | 2 | 7 | 7 < 13 | lo = 3 |
| 3 | 3 | 5 | 4 | 11 | 11 < 13 | lo = 5 |
| 4 | 5 | 5 | 5 | 13 | 13 === 13 | ✅ 返回 5 |

共调用 f 四次，即找到答案。

### 代码 / Code

#### 写法一：迭代 (Iterative / While Loop)

```javascript
/**
 * @param {function} f - Strictly monotonically increasing black-box function
 *                       (non-negative integers → non-negative integers)
 * @param {number} y   - Target value. Guaranteed that a valid x exists.
 * @returns {number}   - The integer x such that f(x) === y.
 */
function g(f, y) {
    let low = 0;
    let high = y;   // Because f(x) >= x, so x <= y

    while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        const result = f(mid);

        if (result === y) {
            return mid;
        } else if (result < y) {
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }

    throw new Error("No valid x found");
}
```

#### 写法二：递归 (Recursive)

```javascript
/**
 * @param {function} f - Strictly monotonically increasing black-box function
 *                       (non-negative integers → non-negative integers)
 * @param {number} y   - Target value. Guaranteed that a valid x exists.
 * @param {number} low - Lower bound of search range (default: 0).
 * @param {number} high - Upper bound of search range (default: y).
 * @returns {number}   - The integer x such that f(x) === y.
 */
function g(f, y, low = 0, high = y) {
    if (low > high) throw new Error("No valid x found");

    const mid = Math.floor((low + high) / 2);
    const result = f(mid);

    if (result === y) return mid;
    if (result < y) return g(f, y, mid + 1, high);
    return g(f, y, low, mid - 1);
}
```

#### 两种写法对比 / Comparison

| | 迭代 (While) | 递归 (Recursion) |
|---|---|---|
| **空间复杂度 / Space** | O(1) | O(log y)（调用栈 / call stack） |
| **可读性 / Readability** | 更直观，工程中更常见 / More straightforward, common in production | 更贴近数学定义，函数式风格 / Closer to math definition, functional style |
| **栈溢出风险 / Stack overflow risk** | 无 / None | 当 y 极大时可能爆栈（JS 默认栈深度约 1 万层）/ May overflow when y is very large (~10k stack depth in JS) |
| **尾递归优化 / TCO** | 不适用 / N/A | 理论上可以，但 JS 引擎几乎都不支持（仅 Safari）/ Theoretically possible, but almost no JS engine supports it (Safari only) |

> **面试官注意 / Interviewer Note：** 候选人写哪种都可以，不影响评分。如果写了递归版，可以追问："这个递归的空间复杂度是多少？有没有栈溢出的风险？" 如果候选人能**主动说出**迭代版更适合生产环境（因为无栈溢出风险），这是加分项。
>
> **Interviewer Note:** Either approach is acceptable. If the candidate writes the recursive version, a good follow-up is: "What's the space complexity of this recursion? Is there a stack overflow risk?" Bonus points if the candidate proactively mentions that the iterative version is more suitable for production (no stack overflow risk).

### 复杂度 / Complexity

- **时间复杂度 / Time：** O(log y)，其中 y 是目标值 / where y is the target value
- **空间复杂度 / Space：** O(1)（迭代 / iterative）或 O(log y)（递归 / recursive）

---

## 评判标准 / Evaluation Rubric

### ❌ Not Hire（不通过 / Do not advance）

| 表现 / Behavior | 原因 / Reason |
|---|---|
| 给了 Hint 3（重度提示）后仍写不出二分 / Cannot write binary search even after heavy hints | 最基础的算法能力不达标 / Fundamental algorithm skills are insufficient |
| 只写出线性扫描且在提示后仍不知道如何优化 / Only writes linear scan and can't optimize after hints | 缺少基本的算法思维 / Lacks basic algorithmic thinking |
| 代码有死循环（如 `while(low < high)` 却没有正确移动指针）/ Code has infinite loop (e.g. incorrect pointer movement) | 二分查找的基本功有缺陷 / Binary search fundamentals are flawed |
| 完全没有考虑上界的问题，写了 `high = Infinity` 然后死循环 / Sets `high = Infinity` without thought, causing infinite loop | 逻辑思维欠缺 / Lacks logical reasoning |

### ⚠️ Lean No / 弱 SDE2（勉强边缘 / Borderline）

| 表现 / Behavior | 说明 / Explanation |
|---|---|
| 给了 1 个提示后写出了二分，但用 `high = 1e9` 等硬编码上界 / Writes binary search after 1 hint, but hardcodes `high = 1e9` | 知道二分但没有深入分析问题约束 / Knows binary search but lacks deeper analysis of constraints |
| 代码基本正确但有 off-by-one 的 bug / Code mostly correct but has off-by-one bug | 写码不够严谨 / Coding lacks rigor |
| 没有主动思考任何边界情况 / Doesn't proactively consider any edge cases | 缺乏工程意识 / Lacks engineering awareness |

### ✅ Hire as SDE2（通过 SDE2 / Pass for SDE2）

| 表现 / Behavior | 说明 / Explanation |
|---|---|
| **无提示**写出二分 / Writes binary search **without hints** | 算法基本功过关 / Solid algorithm fundamentals |
| 上界用了倍增**或**推导出 high = y（二者任一）/ Uses doubling **or** derives high = y (either one) | 有独立解决无穷域问题的能力 / Can independently handle unbounded search space |
| 代码逻辑正确，无 bug / Code logic correct, no bugs | 编码能力达标 / Coding ability meets the bar |
| 在追问下能理解另一种方案的优劣 / Understands the other approach's trade-offs when prompted | 能在引导下拓展思维 / Can expand thinking with guidance |

### 🌟 Strong Hire / Senior（强通过 / 可考虑 Senior / Strong pass, consider for Senior）

| 表现 / Behavior | 说明 / Explanation |
|---|---|
| 写代码前**主动提问**确认约束（"整数还是浮点？答案保证存在吗？f 调用开销大吗？"）/ **Proactively asks** clarifying questions before coding ("Integer or float? Is answer guaranteed? Is f expensive?") | 展现了 Senior 级别的需求澄清意识 / Demonstrates Senior-level requirement clarification |
| **无提示**推导出 f(x) ≥ x，直接用 high = y / **Unprompted** derives f(x) ≥ x and uses high = y | 数学推理能力强，能从约束中提取有用性质 / Strong mathematical reasoning, extracts useful properties from constraints |
| **同时**知道倍增方案，并能**主动**对比两种方案的适用场景 / Knows **both** approaches and **proactively** compares their trade-offs | 全面的算法视野 / Comprehensive algorithmic vision |
| 主动提到 (low + high) 溢出风险、f 调用缓存等工程细节 / Proactively mentions (low + high) overflow risk, f call caching, etc. | 有生产环境意识 / Production-environment awareness |
| 代码一次写对，结构清晰，命名规范 / Code correct on first attempt, clean structure, good naming | 高质量编码能力 / High-quality coding ability |
| 能主动分析并清晰表述时间复杂度 / Proactively analyzes and clearly states time complexity | 理论基础扎实 / Solid theoretical foundation |

---

## 面试官速查流程图 / Quick Decision Flow

```
候选人独立写出二分了吗？ / Did candidate write binary search independently?
├── 否 / No → 给提示后写出来了吗？ / Wrote it after hints?
│        ├── 否 / No → ❌ Not Hire
│        └── 是 / Yes → 上界怎么处理的？ / How did they handle upper bound?
│                 ├── 硬编码常数 / Hardcoded constant → ⚠️ Lean No
│                 └── 倍增或 high=y / Doubling or high=y → ⚠️ Weak SDE2
├── 是 / Yes → 上界怎么处理的？ / How did they handle upper bound?
│        ├── 硬编码常数 / Hardcoded constant → ⚠️ Weak SDE2
│        ├── 倍增 (一种方案) / Doubling (one approach) → ✅ SDE2
│        ├── 推导出 high=y (一种方案) / Derived high=y (one approach) → ✅ SDE2
│        └── 两种都知道且能对比 / Knows both and compares → 🌟 Strong / Senior
└── 代码是否有 bug？ / Any bugs in code?
         ├── 无 bug + 主动考虑边界 / No bugs + proactive edge cases → 加分 / Bonus
         └── 有 bug 但能在追问下修复 / Has bugs but fixes when prompted → 不扣分 / No penalty
```
