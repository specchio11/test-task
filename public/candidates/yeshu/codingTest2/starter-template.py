# ============================================================
#  Matrix Multiplication — Candidate Starter Template (Python 3)
# ============================================================
#  How to use:
#    1. Paste this whole file into the HackerRank editor (Python 3).
#    2. Hit "Run Code" with the sample input below — you should
#       see "[[58, 64], [139, 154]]" printed. That confirms the
#       I/O scaffold works and shows the expected output format.
#    3. Replace the placeholder body of `multiply()` with your
#       real implementation. Do NOT change anything below the
#       marker.
#
#  Sample input (paste into the Input box):
#
#      [[1, 2, 3], [4, 5, 6]]
#      [[7, 8], [9, 10], [11, 12]]
#
#  Expected output once `multiply` is correctly implemented:
#
#      [[58, 64], [139, 154]]
# ============================================================

import sys
import ast


# ============================================================
# 👇 ONLY EDIT THIS FUNCTION
# ============================================================
#
#  Given A (m × k) and B (k × n), return C = A × B (m × n)
#  C[i][j] = sum over p of A[i][p] * B[p][j]
#
#  Edge case: if any matrix is empty, return an empty matrix.
#
def multiply(A, B):
    # TODO: replace this placeholder with your implementation.
    # The hard-coded return value is just so the I/O scaffold
    # below runs end-to-end and you can see the expected output
    # format: [[58, 64], [139, 154]]
    return [[58, 64], [139, 154]]
# ============================================================
# 👆 ONLY EDIT ABOVE  ·  Do NOT modify the I/O scaffold below
# ============================================================
































def extract_matrices(text):
    """Pull out two `[[...]]` blocks from stdin text."""
    out, depth, start = [], 0, -1
    for i, c in enumerate(text):
        if c == '[':
            if depth == 0:
                start = i
            depth += 1
        elif c == ']':
            depth -= 1
            if depth == 0:
                out.append(text[start:i + 1])
                if len(out) == 2:
                    break
    return out


def main():
    text = sys.stdin.read()
    parts = extract_matrices(text)
    A = ast.literal_eval(parts[0])
    B = ast.literal_eval(parts[1])

    C = multiply(A, B)

    def fmt_row(row):
        return "[" + ", ".join(f"{x:g}" for x in row) + "]"
    print("[" + ", ".join(fmt_row(row) for row in C) + "]")


if __name__ == "__main__":
    main()
