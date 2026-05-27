// ============================================================
//  Activity Burst Detector · TypeScript
//  Problem statement is on the left.
//  Only edit the ActivityBurstDetector class below.
// ============================================================

import * as fs from "fs";


// ============================================================
// 👇 ONLY EDIT THIS CLASS
// ============================================================
class ActivityBurstDetector {
    private windowMs: number;
    private threshold: number;
    private events: number[] = [];   // placeholder — replace with whatever you need

    constructor(windowMs: number, threshold: number) {
        this.windowMs = windowMs;
        this.threshold = threshold;
    }

    hit(t: number): boolean {
        // TODO: record event at time t. Return whether — counting this event —
        // the number of events whose timestamps are in [t - windowMs, t]
        // is >= threshold.
        this.events.push(t);                          // placeholder
        return this.events.length >= this.threshold;  // placeholder — replace
    }
}
// ============================================================
// 👆 ONLY EDIT ABOVE  ·  Do NOT modify anything below
// ============================================================










































































// Expected hit() result sequences for the 7 sample inputs below
// (hardcoded so the harness can self-check). DO NOT consult these
// inside ActivityBurstDetector — that would defeat the purpose.
//
// Input format: each non-empty line is JSON [windowMs, threshold, [t1, t2, ...]].
const _EXPECTED: boolean[][] = [
    [false, false, true, false, false, true],
    [true, true, true],
    [false, false, false, false],
    [false, true, true],
    [false, false, false, true, true],
    [false, true, false, true],
    [false, false, true],
];

function _bools(xs: boolean[]): string {
    return "[" + xs.map(b => b ? "true" : "false").join(", ") + "]";
}

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
    let windowMs: number, threshold: number, hits: number[];
    try {
        const parsed = JSON.parse(raw) as [number, number, number[]];
        windowMs = parsed[0]; threshold = parsed[1]; hits = parsed[2];
    } catch (e) {
        console.log(`failed to parse '${raw}': ${(e as Error).message}`);
        continue;
    }
    const label = `ActivityBurstDetector(${windowMs}, ${threshold}) on [${hits.join(", ")}]`;
    let got: boolean[];
    try {
        const d = new ActivityBurstDetector(windowMs, threshold);
        got = hits.map(t => Boolean(d.hit(t)));
    } catch (e) {
        if (e instanceof Error) {
            console.log(`${label} raised ${e.name}: ${e.message}`);
        } else {
            console.log(`${label} raised: ${String(e)}`);
        }
        continue;
    }

    if (i >= _EXPECTED.length) {
        console.log(`${label} = ${_bools(got)}  (no expected; bonus case)`);
    } else if (JSON.stringify(got) === JSON.stringify(_EXPECTED[i])) {
        console.log(`${label} = ${_bools(got)}  ✓`);
        _correct++;
    } else {
        console.log(`${label} = ${_bools(got)}  ✗  expected ${_bools(_EXPECTED[i])}`);
    }
}

console.log("-".repeat(32));
console.log(`Result: ${_correct} / ${_rawLines.length} correct`);
