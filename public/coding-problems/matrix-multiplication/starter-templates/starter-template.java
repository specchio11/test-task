// ============================================================
//  Matrix Multiplication · Java
//  Problem statement is on the left.
//  Only edit the `multiply` function below.
// ============================================================

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

public class Solution {
    // ============================================================
    // 👇 ONLY EDIT THIS FUNCTION
    // ============================================================
    //
    //  Given A (m × k) and B (k × n), return C = A × B (m × n).
    //  C[i][j] = sum over p of A[i][p] * B[p][j].
    //
    //  Edge case: if any input matrix is empty, return new double[0][].
    //
    static double[][] multiply(double[][] A, double[][] B) {
        // TODO: replace this placeholder with your implementation.
        // The hard-coded return value just lets the I/O scaffold run
        // end-to-end so you can see test-case #1 pass on first run.
        return new double[][] {
            { 58, 64 },
            { 139, 154 }
        };
    }
    // ============================================================
    // 👆 ONLY EDIT ABOVE  ·  Do NOT modify anything below
    // ============================================================



















    // Expected output for the sample input (hardcoded so the harness
    // can self-check). DO NOT consult this inside `multiply` — that
    // would defeat the purpose.
    //
    // Sample input (paste into the HackerRank Input box):
    //
    //     [[1, 2, 3], [4, 5, 6]]
    //     [[7, 8], [9, 10], [11, 12]]
    //
    private static final double[][] EXPECTED = new double[][] {
        { 58, 64 },
        { 139, 154 }
    };

    private static final double EPS = 1e-6;

    // ---------- parse [[1,2],[3,4]] style literal ----------
    private static double[][] parseMatrix(String s) {
        List<double[]> rows = new ArrayList<>();
        List<Double> row = new ArrayList<>();
        StringBuilder num = new StringBuilder();
        int depth = 0;
        boolean rowOpen = false;

        for (int i = 0; i < s.length(); i++) {
            char c = s.charAt(i);
            if (c == '[') {
                depth++;
                if (depth == 2) {
                    row.clear();
                    rowOpen = true;
                }
            } else if (c == ']') {
                flushNum(num, row);
                if (depth == 2 && rowOpen) {
                    double[] arr = new double[row.size()];
                    for (int k = 0; k < row.size(); k++) arr[k] = row.get(k);
                    rows.add(arr);
                    row = new ArrayList<>();
                    rowOpen = false;
                }
                if (depth > 0) depth--;
            } else if (c == ',' || Character.isWhitespace(c)) {
                flushNum(num, row);
            } else {
                num.append(c);
            }
        }
        return rows.toArray(new double[0][]);
    }

    private static void flushNum(StringBuilder num, List<Double> row) {
        if (num.length() > 0) {
            try {
                row.add(Double.parseDouble(num.toString()));
            } catch (NumberFormatException ignored) {
                // skip
            }
            num.setLength(0);
        }
    }

    // Pull top-level [...] blocks from text, in order.
    private static List<String> extractTopLevel(String s) {
        List<String> out = new ArrayList<>();
        int depth = 0;
        int start = 0;
        for (int i = 0; i < s.length(); i++) {
            char c = s.charAt(i);
            if (c == '[') {
                if (depth == 0) start = i;
                depth++;
            } else if (c == ']') {
                if (depth == 0) continue;
                depth--;
                if (depth == 0) out.add(s.substring(start, i + 1));
            }
        }
        return out;
    }

    private static boolean close(double[][] a, double[][] b) {
        if (a == null || b == null) return false;
        if (a.length != b.length) return false;
        for (int i = 0; i < a.length; i++) {
            if (a[i] == null || b[i] == null) return false;
            if (a[i].length != b[i].length) return false;
            for (int j = 0; j < a[i].length; j++) {
                if (Math.abs(a[i][j] - b[i][j]) > EPS) return false;
            }
        }
        return true;
    }

    private static String fmtNum(double x) {
        if (!Double.isInfinite(x) && !Double.isNaN(x)
                && Math.abs(x - Math.rint(x)) < 1e-12) {
            return Long.toString((long) x);
        }
        return Double.toString(x);
    }

    private static String fmt(double[][] M) {
        if (M == null) return "null";
        StringBuilder sb = new StringBuilder();
        sb.append('[');
        for (int i = 0; i < M.length; i++) {
            if (i > 0) sb.append(", ");
            sb.append('[');
            if (M[i] != null) {
                for (int j = 0; j < M[i].length; j++) {
                    if (j > 0) sb.append(", ");
                    sb.append(fmtNum(M[i][j]));
                }
            }
            sb.append(']');
        }
        sb.append(']');
        return sb.toString();
    }

    private static String repeat(char c, int n) {
        StringBuilder sb = new StringBuilder(n);
        for (int i = 0; i < n; i++) sb.append(c);
        return sb.toString();
    }

    public static void main(String[] args) throws Exception {
        System.setOut(new java.io.PrintStream(System.out, true, "UTF-8"));
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in, "UTF-8"));
        StringBuilder buf = new StringBuilder();
        String line;
        while ((line = br.readLine()) != null) {
            buf.append(line).append('\n');
        }
        String input = buf.toString();

        List<String> mats = extractTopLevel(input);
        if (mats.size() < 2) {
            System.out.println("failed to parse input: expected two matrices A and B, got " + mats.size());
            System.out.println(repeat('-', 32));
            System.out.println("Result: 0 / 1 correct");
            return;
        }

        double[][] A, B;
        try {
            A = parseMatrix(mats.get(0));
            B = parseMatrix(mats.get(1));
        } catch (Exception e) {
            System.out.println("failed to parse input: " + e.getMessage());
            System.out.println(repeat('-', 32));
            System.out.println("Result: 0 / 1 correct");
            return;
        }

        String label = "multiply(" + fmt(A) + ", " + fmt(B) + ")";
        double[][] C;
        try {
            C = multiply(A, B);
        } catch (Exception e) {
            System.out.println(label + " raised " + e.getClass().getSimpleName() + ": " + e.getMessage());
            System.out.println(repeat('-', 32));
            System.out.println("Result: 0 / 1 correct");
            return;
        }

        int correct = 0;
        if (close(C, EXPECTED)) {
            System.out.println(label + " = " + fmt(C) + "  \u2713"); // ✓
            correct = 1;
        } else {
            System.out.println(label + " = " + fmt(C) + "  \u2717  expected " + fmt(EXPECTED)); // ✗
        }

        System.out.println(repeat('-', 32));
        System.out.println("Result: " + correct + " / 1 correct");
    }
}
