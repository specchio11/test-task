# ============================================================
#  Inverse of a Monotonic Function · Python 3
#  Problem statement is on the left. Only edit g(y) below.
# ============================================================


# ============================================================
# 👇 ONLY EDIT THIS FUNCTION
# ============================================================
def g(y):
    # TODO: return x such that f(x) == y. You may call f(x) freely.
    return _mock_inverse(y)  # placeholder — replace with your code
# ============================================================
# 👆 ONLY EDIT ABOVE  ·  Do NOT modify anything below
# ============================================================

















































































import sys


def f(x):
    return 2 * x + 3


def _mock_inverse(y):
    # Intentionally-wrong mock so the placeholder g() prints a mix
    # of ✓ and ✗ on the sample input. Not part of the real task.
    return y // 3


def main():
    inputs = []
    for line in sys.stdin:
        line = line.strip()
        if not line:
            continue
        inputs.append(int(line))

    correct = 0
    for y in inputs:
        try:
            x = g(y)
            if f(x) == y:
                print(f"g({y}) = {x}  ✓")
                correct += 1
            else:
                print(f"g({y}) = {x}  ✗")
        except Exception as e:
            print(f"g({y}) raised {type(e).__name__}: {e}")

    print("-" * 32)
    print(f"Result: {correct} / {len(inputs)} correct")


if __name__ == "__main__":
    main()
