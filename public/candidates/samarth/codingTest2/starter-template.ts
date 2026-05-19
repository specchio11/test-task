// ============================================================
//  Task Scheduling with Deadlines — Coding Exercise (TypeScript)
// ============================================================
//  Sample input (one JSON array per line; already loaded in
//  the Input box of HackerRank's Custom Input):
//
//      [[100,200],[200,1300],[1000,1250],[2000,3200]]
//      [[1,2]]
//      [[3,2],[4,3]]
//      [[5,5],[4,6],[2,6]]
//      []
//      [[1,5],[2,5],[3,5]]
//      [[10,10],[1,11],[2,12],[3,13]]
//
//  Expected output once scheduleTasks is correctly implemented
//  (the runner self-checks each call against a hardcoded
//  expected[] array — you do NOT need to print anything):
//
//      scheduleTasks([[100,200],[200,1300],[1000,1250],[2000,3200]]) = 3  ✓
//      scheduleTasks([[1,2]]) = 1  ✓
//      scheduleTasks([[3,2],[4,3]]) = 0  ✓
//      scheduleTasks([[5,5],[4,6],[2,6]]) = 2  ✓
//      scheduleTasks([]) = 0  ✓
//      scheduleTasks([[1,5],[2,5],[3,5]]) = 2  ✓
//      scheduleTasks([[10,10],[1,11],[2,12],[3,13]]) = 3  ✓
//      --------------------------------
//      Result: 7 / 7 correct
// ============================================================

import * as fs from "fs";


// ============================================================
// 👇 ONLY EDIT THIS FUNCTION
// ============================================================
//
//  Given `tasks` (each task is a 2-element array
//  [duration, deadline]), return the maximum number of tasks
//  that can be finished on or before their deadlines on a
//  single machine starting at t = 0.
//
//  You MAY mutate (e.g., tasks.sort) `tasks` if that helps.
//
function scheduleTasks(tasks: number[][]): number {
    // TODO: replace this function.
    return tasks.length;
}
// ============================================================
// 👆 ONLY EDIT ABOVE  ·  Do NOT modify anything below
// ============================================================
































































// Expected answers for the 7 sample inputs above (hardcoded so
// the harness can self-check). DO NOT consult these inside
// scheduleTasks — that would defeat the purpose.
const _EXPECTED: number[] = [3, 1, 0, 2, 0, 2, 3];

const _input = fs.readFileSync(0, "utf8");
const _rawLines: string[] = [];
for (const _raw of _input.split(/\r?\n/)) {
    const _t = _raw.trim();
    if (_t.length === 0) continue;
    _rawLines.push(_t);
}

let _correct = 0;
for (let i = 0; i < _rawLines.length; i++) {
    const raw = _rawLines[i];
    let tasks: number[][];
    try {
        tasks = JSON.parse(raw);
    } catch (e) {
        console.log(`failed to parse '${raw}': ${(e as Error).message}`);
        continue;
    }
    try {
        const got = scheduleTasks(tasks);
        if (i < _EXPECTED.length && got === _EXPECTED[i]) {
            console.log(`scheduleTasks(${raw}) = ${got}  ✓`);
            _correct++;
        } else if (i < _EXPECTED.length) {
            console.log(`scheduleTasks(${raw}) = ${got}  ✗  expected ${_EXPECTED[i]}`);
        } else {
            console.log(`scheduleTasks(${raw}) = ${got}  (no expected; bonus case)`);
        }
    } catch (e) {
        if (e instanceof Error) {
            console.log(`scheduleTasks(${raw}) raised ${e.name}: ${e.message}`);
        } else {
            console.log(`scheduleTasks(${raw}) raised: ${String(e)}`);
        }
    }
}

console.log("-".repeat(32));
console.log(`Result: ${_correct} / ${_rawLines.length} correct`);
