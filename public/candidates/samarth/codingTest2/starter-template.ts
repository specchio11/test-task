// ============================================================
//  Task Scheduling with Deadlines · TypeScript
//  Problem statement is on the left. Only edit scheduleTasks below.
// ============================================================

import * as fs from "fs";


// ============================================================
// 👇 ONLY EDIT THIS FUNCTION
// ============================================================
function scheduleTasks(tasks: number[][]): number {
    // TODO: return the maximum number of tasks finished on time.
    return tasks.length;  // placeholder — replace with your code
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
