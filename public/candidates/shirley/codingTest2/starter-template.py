# ============================================================
#  Activity Burst Detector · Python 3
#  Problem statement is on the left.
#  Only edit the ActivityBurstDetector class below.
# ============================================================

import json
import sys


# ============================================================
# 👇 ONLY EDIT THIS CLASS
# ============================================================
class ActivityBurstDetector:
    def __init__(self, window_ms, threshold):
        self.window_ms = window_ms
        self.threshold = threshold
        self._events = []  # placeholder — replace with whatever you need

    def hit(self, t):
        # TODO: record event at time t. Return whether — counting this event —
        # the number of events whose timestamps are in [t - window_ms, t]
        # is >= threshold.
        self._events.append(t)                        # placeholder
        return len(self._events) >= self.threshold    # placeholder — replace
# ============================================================
# 👆 ONLY EDIT ABOVE  ·  Do NOT modify anything below
# ============================================================










































































# Expected hit() result sequences for the 7 sample inputs below
# (hardcoded so the harness can self-check). DO NOT consult these
# inside ActivityBurstDetector — that would defeat the purpose.
#
# Input format: each non-empty line is JSON [windowMs, threshold, [t1, t2, ...]].
_EXPECTED = [
    [False, False, True, False, False, True],
    [True, True, True],
    [False, False, False, False],
    [False, True, True],
    [False, False, False, True, True],
    [False, True, False, True],
    [False, False, True],
]


def _bools(xs):
    return "[" + ", ".join("true" if b else "false" for b in xs) + "]"


def _main():
    raw_lines = [ln.strip() for ln in sys.stdin if ln.strip()]
    correct = 0
    for i, raw in enumerate(raw_lines):
        try:
            window_ms, threshold, hits = json.loads(raw)
        except Exception as e:
            print(f"failed to parse {raw!r}: {e}")
            continue
        label = f"ActivityBurstDetector({window_ms}, {threshold}) on {hits}"
        try:
            d = ActivityBurstDetector(window_ms, threshold)
            got = [bool(d.hit(t)) for t in hits]
        except Exception as e:
            print(f"{label} raised {type(e).__name__}: {e}")
            continue

        if i >= len(_EXPECTED):
            print(f"{label} = {_bools(got)}  (no expected; bonus case)")
        elif got == _EXPECTED[i]:
            print(f"{label} = {_bools(got)}  ✓")
            correct += 1
        else:
            print(f"{label} = {_bools(got)}  ✗  expected {_bools(_EXPECTED[i])}")

    print("-" * 32)
    print(f"Result: {correct} / {len(raw_lines)} correct")


_main()
