// ============================================================
//  Inverse of a Monotonic Function — Coding Exercise (TypeScript)
// ============================================================
//  Task
//    Implement g(y) so that for every input y, it returns the
//    non-negative integer x such that f(x) = y.
//
//  Rules
//    - You can ONLY CALL f(x). Treat f as a true black box.
//    - f is strictly monotonically increasing on non-negative
//      integers (i.e., for any a < b, f(a) < f(b)).
//    - You may assume that for every input y a valid x exists.
//    - You only need to fill in the body of g(y) below.
//
//  Sample input (already loaded in the Input box):
//
//      3
//      5
//      7
//      9
//      11
//      21
//      1003
//
//  Expected output once g is correctly implemented (the runner
//  self-checks each call via f(g(y)) == y):
//
//      g(3) = 0  ✓
//      g(5) = 1  ✓
//      g(7) = 2  ✓
//      g(9) = 3  ✓
//      g(11) = 4  ✓
//      g(21) = 9  ✓
//      g(1003) = 500  ✓
//      --------------------------------
//      Result: 7 / 7 correct
// ============================================================

import * as fs from "fs";


// ============================================================
// 👇 ONLY EDIT THIS FUNCTION
// ============================================================
//
//  Given y, return the non-negative integer x such that f(x) = y.
//
function g(y: number): number {
    // TODO: implement. Return the integer x such that f(x) == y.
    //
    // You can call f(x) as a black box for any integer x, e.g.:
    //     const probe  = f(0);     // what is f at 0?
    //     const probe2 = f(1000);  // what is f at 1000?
    // Use such probes to search for the x that satisfies f(x) == y.
    //
    // The placeholder call below is intentionally wrong on most
    // inputs (you'll see a mix of ✓ and ✗) — replace it with your
    // real algorithm to get 7 / 7 correct.
    return _mockInverse(y);
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
