// ============================================================
//  Matrix Multiplication · TypeScript
//  Problem statement is on the left.
//  Only edit the `multiply` function below.
// ============================================================

import * as fs from "fs";

type Matrix = number[][];


// ============================================================
// 👇 ONLY EDIT THIS FUNCTION
// ============================================================
//
//  Given A (m × k) and B (k × n), return C = A × B (m × n).
//  C[i][j] = sum over p of A[i][p] * B[p][j].
//
//  Edge case: if any input matrix is empty, return [].
//
function multiply(A: Matrix, B: Matrix): Matrix {
    // TODO: replace this placeholder with your implementation.
    // The hard-coded return value just lets the I/O scaffold run
    // end-to-end so you can see test-case #1 pass on first run.
    return [[58, 64], [139, 154]];
}
// ============================================================
// 👆 ONLY EDIT ABOVE  ·  Do NOT modify anything below
// ============================================================



















// Expected output for the sample input below (hardcoded so the
// harness can self-check). DO NOT consult this inside `multiply`
// — that would defeat the purpose.
//
// Sample input (paste into the HackerRank Input box):
//
//     [[1, 2, 3], [4, 5, 6]]
//     [[7, 8], [9, 10], [11, 12]]
//
const _EXPECTED: Matrix = [[58, 64], [139, 154]];

const _EPS = 1e-6;


function _extractMatrices(text: string): string[] {
    const out: string[] = [];
    let depth = 0;
    let start = -1;
    for (let i = 0; i < text.length; i++) {
        const c = text[i];
        if (c === "[") {
            if (depth === 0) start = i;
            depth++;
        } else if (c === "]") {
            if (depth === 0) continue;
            depth--;
            if (depth === 0) out.push(text.slice(start, i + 1));
        }
    }
    return out;
}


function _isMatrix(M: unknown): M is Matrix {
    if (!Array.isArray(M)) return false;
    for (const row of M) {
        if (!Array.isArray(row)) return false;
        for (const x of row) {
            if (typeof x !== "number" || !Number.isFinite(x)) return false;
        }
    }
    return true;
}


function _close(a: unknown, b: Matrix): boolean {
    if (!Array.isArray(a) || a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
        const ra = a[i];
        const rb = b[i];
        if (!Array.isArray(ra) || ra.length !== rb.length) return false;
        for (let j = 0; j < ra.length; j++) {
            const x = ra[j];
            const y = rb[j];
            if (typeof x !== "number" || !Number.isFinite(x)) return false;
            if (Math.abs(x - y) > _EPS) return false;
        }
    }
    return true;
}


function _fmtNum(x: number): string {
    if (Number.isInteger(x)) return String(x);
    return String(x);
}


function _fmt(M: unknown): string {
    if (!Array.isArray(M)) return String(M);
    const parts: string[] = [];
    for (const row of M) {
        if (!Array.isArray(row)) return String(M);
        parts.push("[" + row.map((x) => (typeof x === "number" ? _fmtNum(x) : String(x))).join(", ") + "]");
    }
    return "[" + parts.join(", ") + "]";
}


function _main(): void {
    const text = fs.readFileSync(0, "utf8");
    const mats = _extractMatrices(text);
    if (mats.length < 2) {
        console.log(`failed to parse input: expected two matrices A and B, got ${mats.length}`);
        console.log("-".repeat(32));
        console.log("Result: 0 / 1 correct");
        return;
    }
    let A: unknown;
    let B: unknown;
    try {
        A = JSON.parse(mats[0]);
        B = JSON.parse(mats[1]);
    } catch (e) {
        console.log(`failed to parse input: ${(e as Error).message}`);
        console.log("-".repeat(32));
        console.log("Result: 0 / 1 correct");
        return;
    }
    if (!_isMatrix(A) || !_isMatrix(B)) {
        console.log("failed to parse input: A or B is not a numeric matrix");
        console.log("-".repeat(32));
        console.log("Result: 0 / 1 correct");
        return;
    }

    const label = `multiply(${_fmt(A)}, ${_fmt(B)})`;
    let C: unknown;
    try {
        C = multiply(A, B);
    } catch (e) {
        if (e instanceof Error) {
            console.log(`${label} raised ${e.name}: ${e.message}`);
        } else {
            console.log(`${label} raised: ${String(e)}`);
        }
        console.log("-".repeat(32));
        console.log("Result: 0 / 1 correct");
        return;
    }

    let correct = 0;
    if (_close(C, _EXPECTED)) {
        console.log(`${label} = ${_fmt(C)}  ✓`);
        correct = 1;
    } else {
        console.log(`${label} = ${_fmt(C)}  ✗  expected ${_fmt(_EXPECTED)}`);
    }

    console.log("-".repeat(32));
    console.log(`Result: ${correct} / 1 correct`);
}


_main();
