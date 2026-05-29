// ============================================================
//  Inverse of a Monotonic Function · Java
//  Problem statement is on the left. Only edit g(long y) below.
// ============================================================

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

public class Solution {
    // ============================================================
    // 👇 ONLY EDIT THIS FUNCTION
    // ============================================================
    static long g(long y) {
        // TODO: return x such that f(x) == y. You may call f(x) freely.
        return mockInverse(y);  // placeholder — replace with your code
    }
    // ============================================================
    // 👆 ONLY EDIT ABOVE  ·  Do NOT modify anything below
    // ============================================================




































    static long f(long x) {
        return 2 * x + 3;
    }

    private static long mockInverse(long y) {
        // Intentionally-wrong mock so the placeholder g() prints a mix
        // of ✓ and ✗ on the sample input. Not part of the real task.
        return y / 3;
    }

    public static void main(String[] args) throws Exception {
        System.setOut(new java.io.PrintStream(System.out, true, "UTF-8"));
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in, "UTF-8"));

        List<Long> inputs = new ArrayList<>();
        String line;
        while ((line = br.readLine()) != null) {
            String t = line.trim();
            if (t.isEmpty()) continue;
            try {
                inputs.add(Long.parseLong(t));
            } catch (NumberFormatException ignored) {
                // skip non-numeric lines silently
            }
        }

        int correct = 0;
        for (long y : inputs) {
            try {
                long x = g(y);
                if (f(x) == y) {
                    System.out.println("g(" + y + ") = " + x + "  ✓");
                    correct++;
                } else {
                    System.out.println("g(" + y + ") = " + x + "  ✗");
                }
            } catch (Throwable t) {
                System.out.println("g(" + y + ") raised "
                        + t.getClass().getSimpleName() + ": " + t.getMessage());
            }
        }

        System.out.println(repeat('-', 32));
        System.out.println("Result: " + correct + " / " + inputs.size() + " correct");
    }

    private static String repeat(char c, int n) {
        StringBuilder sb = new StringBuilder(n);
        for (int i = 0; i < n; i++) sb.append(c);
        return sb.toString();
    }
}
