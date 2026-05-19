// ============================================================
//  Inverse of a Monotonic Function · TypeScript
//  Problem statement is on the left. Only edit g(y) below.
// ============================================================

import * as fs from "fs";


// ============================================================
// 👇 ONLY EDIT THIS FUNCTION
// ============================================================
function g(y: number): number {
    // TODO: return x such that f(x) == y. You may call f(x) freely.
    return _mockInverse(y);  // placeholder — replace with your code
}
// ============================================================
// 👆 ONLY EDIT ABOVE  ·  Do NOT modify anything below
// ============================================================






































































function f(x: number): number {
    return 2 * x + 3;
}


function _mockInverse(y: number): number {
    // Intentionally-wrong mock so the placeholder g() prints a mix
    // of ✓ and ✗ on the sample input. Not part of the real task.
    return Math.floor(y / 3);
}


const _input = fs.readFileSync(0, "utf8");
const _inputs: number[] = [];
for (const _raw of _input.split(/\r?\n/)) {
    const _line = _raw.trim();
    if (_line.length === 0) continue;
    _inputs.push(parseInt(_line, 10));
}

let _correct = 0;
for (const y of _inputs) {
    try {
        const x = g(y);
        if (f(x) === y) {
            console.log(`g(${y}) = ${x}  ✓`);
            _correct++;
        } else {
            console.log(`g(${y}) = ${x}  ✗`);
        }
    } catch (e) {
        if (e instanceof Error) {
            console.log(`g(${y}) raised ${e.name}: ${e.message}`);
        } else {
            console.log(`g(${y}) raised: ${String(e)}`);
        }
    }
}

console.log("-".repeat(32));
console.log(`Result: ${_correct} / ${_inputs.length} correct`);
