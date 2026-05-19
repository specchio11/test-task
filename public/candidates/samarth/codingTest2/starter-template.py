# ============================================================
#  Task Scheduling with Deadlines — Coding Exercise (Python 3)
# ============================================================
#  Sample input (one JSON array per line; already loaded in
#  the Input box of HackerRank's Custom Input):
#
#      [[100,200],[200,1300],[1000,1250],[2000,3200]]
#      [[1,2]]
#      [[3,2],[4,3]]
#      [[5,5],[4,6],[2,6]]
#      []
#      [[1,5],[2,5],[3,5]]
#      [[10,10],[1,11],[2,12],[3,13]]
#
#  Expected output once schedule_tasks is correctly implemented
#  (the runner self-checks each call against a hardcoded
#  expected[] array — you do NOT need to print anything):
#
#      schedule_tasks([[100,200],[200,1300],[1000,1250],[2000,3200]]) = 3  ✓
#      schedule_tasks([[1,2]]) = 1  ✓
#      schedule_tasks([[3,2],[4,3]]) = 0  ✓
#      schedule_tasks([[5,5],[4,6],[2,6]]) = 2  ✓
#      schedule_tasks([]) = 0  ✓
#      schedule_tasks([[1,5],[2,5],[3,5]]) = 2  ✓
#      schedule_tasks([[10,10],[1,11],[2,12],[3,13]]) = 3  ✓
#      --------------------------------
#      Result: 7 / 7 correct
# ============================================================

import json
import sys


# ============================================================
# 👇 ONLY EDIT THIS FUNCTION
# ============================================================
#
#  Given `tasks` (each task is a 2-element list [duration, deadline]),
#  return the maximum number of tasks that can be finished on or
#  before their deadlines on a single machine starting at t = 0.
#
#  You MAY mutate (e.g., tasks.sort) `tasks` if that helps.
#
def schedule_tasks(tasks):
    # TODO: replace this function.
    return len(tasks)
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
