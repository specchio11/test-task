# ============================================================
#  Matrix Multiplication · Python 3
#  Problem statement is on the left.
#  Only edit the `multiply` function below.
# ============================================================

import ast
import sys


# ============================================================
# 👇 ONLY EDIT THIS FUNCTION
# ============================================================
#
#  Given A (m × k) and B (k × n), return C = A × B (m × n).
#  C[i][j] = sum over p of A[i][p] * B[p][j].
#
#  Edge case: if any input matrix is empty, return [].
#
def multiply(A, B):
    # TODO: replace this placeholder with your implementation.
    # The hard-coded return value just lets the I/O scaffold run
    # end-to-end so you can see test-case #1 pass on first run.
    return [[58, 64], [139, 154]]
# ============================================================
# 👆 ONLY EDIT ABOVE  ·  Do NOT modify anything below
# ============================================================



















# Expected output for the sample input below (hardcoded so the
# harness can self-check). DO NOT consult this inside `multiply`
# — that would defeat the purpose.
#
# Sample input (paste into the HackerRank Input box):
#
#     [[1, 2, 3], [4, 5, 6]]
#     [[7, 8], [9, 10], [11, 12]]
#
_EXPECTED = [[58, 64], [139, 154]]

_EPS = 1e-6


def _extract_matrices(text):
    """Return every top-level [...] block in `text`, in order."""
    out, depth, start = [], 0, -1
    for i, c in enumerate(text):
        if c == '[':
            if depth == 0:
                start = i
            depth += 1
        elif c == ']':
            if depth == 0:
                continue
            depth -= 1
            if depth == 0:
                out.append(text[start:i + 1])
    return out


def _is_matrix(M):
    if not isinstance(M, list):
        return False
    for row in M:
        if not isinstance(row, list):
            return False
        for x in row:
            if not isinstance(x, (int, float)) or isinstance(x, bool):
                return False
    return True


def _close(a, b):
    if not isinstance(a, list) or not isinstance(b, list):
        return False
    if len(a) != len(b):
        return False
    for ra, rb in zip(a, b):
        if not isinstance(ra, list) or not isinstance(rb, list):
            return False
        if len(ra) != len(rb):
            return False
        for x, y in zip(ra, rb):
            try:
                if abs(float(x) - float(y)) > _EPS:
                    return False
            except (TypeError, ValueError):
                return False
    return True


def _fmt(M):
    if not isinstance(M, list):
        return repr(M)
    def fmt_num(x):
        if isinstance(x, float) and not x.is_integer():
            return f"{x:g}"
        try:
            iv = int(x)
            if float(iv) == float(x):
                return str(iv)
        except (TypeError, ValueError):
            pass
        return f"{x:g}"
    parts = []
    for row in M:
        if not isinstance(row, list):
            return repr(M)
        parts.append("[" + ", ".join(fmt_num(x) for x in row) + "]")
    return "[" + ", ".join(parts) + "]"


def _main():
    text = sys.stdin.read()
    mats = _extract_matrices(text)
    if len(mats) < 2:
        print(f"failed to parse input: expected two matrices A and B, got {len(mats)}")
        print("-" * 32)
        print("Result: 0 / 1 correct")
        return
    try:
        A = ast.literal_eval(mats[0])
        B = ast.literal_eval(mats[1])
    except Exception as e:
        print(f"failed to parse input: {e}")
        print("-" * 32)
        print("Result: 0 / 1 correct")
        return
    if not _is_matrix(A) or not _is_matrix(B):
        print("failed to parse input: A or B is not a numeric matrix")
        print("-" * 32)
        print("Result: 0 / 1 correct")
        return

    label = f"multiply({_fmt(A)}, {_fmt(B)})"
    try:
        C = multiply(A, B)
    except Exception as e:
        print(f"{label} raised {type(e).__name__}: {e}")
        print("-" * 32)
        print("Result: 0 / 1 correct")
        return

    if _close(C, _EXPECTED):
        print(f"{label} = {_fmt(C)}  ✓")
        correct = 1
    else:
        print(f"{label} = {_fmt(C)}  ✗  expected {_fmt(_EXPECTED)}")
        correct = 0

    print("-" * 32)
    print(f"Result: {correct} / 1 correct")


_main()
