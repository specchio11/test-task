# ============================================================
#  Task Scheduling with Deadlines · Python 3
#  Problem statement is on the left. Only edit schedule_tasks below.
# ============================================================

import json
import sys


# ============================================================
# 👇 ONLY EDIT THIS FUNCTION
# ============================================================
def schedule_tasks(tasks):
    # TODO: return the maximum number of tasks finished on time.
    return len(tasks)  # placeholder — replace with your code
# ============================================================
# 👆 ONLY EDIT ABOVE  ·  Do NOT modify anything below
# ============================================================
































































# Expected answers for the 7 sample inputs above (hardcoded so
# the harness can self-check). DO NOT consult these inside
# schedule_tasks — that would defeat the purpose.
_EXPECTED = [3, 1, 0, 2, 0, 2, 3]


def _main():
    raw_lines = [ln.strip() for ln in sys.stdin if ln.strip()]
    correct = 0
    for i, raw in enumerate(raw_lines):
        try:
            tasks = json.loads(raw)
        except Exception as e:
            print(f"failed to parse {raw!r}: {e}")
            continue
        try:
            got = schedule_tasks(tasks)
            if i < len(_EXPECTED) and got == _EXPECTED[i]:
                print(f"schedule_tasks({raw}) = {got}  ✓")
                correct += 1
            elif i < len(_EXPECTED):
                print(f"schedule_tasks({raw}) = {got}  ✗  expected {_EXPECTED[i]}")
            else:
                print(f"schedule_tasks({raw}) = {got}  (no expected; bonus case)")
        except Exception as e:
            print(f"schedule_tasks({raw}) raised {type(e).__name__}: {e}")

    print("-" * 32)
    print(f"Result: {correct} / {len(raw_lines)} correct")


_main()
