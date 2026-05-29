// ============================================================
//  Task Scheduling with Deadlines · Java
//  Problem statement is on the left. Only edit scheduleTasks below.
// ============================================================

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

public class Solution {
    // ============================================================
    // 👇 ONLY EDIT THIS FUNCTION
    // ============================================================
    static int scheduleTasks(int[][] tasks) {
        // TODO: return the maximum number of tasks finished on time.
        return tasks.length;  // placeholder — replace with your code
    }
    // ============================================================
    // 👆 ONLY EDIT ABOVE  ·  Do NOT modify anything below
    // ============================================================




































    // Expected answers for the 7 sample inputs above (hardcoded so
    // the harness can self-check). DO NOT consult these inside
    // scheduleTasks — that would defeat the purpose.
    private static final int[] EXPECTED = { 3, 1, 0, 2, 0, 2, 3 };

    // Parse [[a,b],[c,d],...] from a single line.
    private static int[][] parseTasks(String s) {
        List<int[]> rows = new ArrayList<>();
        List<Integer> row = new ArrayList<>();
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
                    int[] arr = new int[row.size()];
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
        return rows.toArray(new int[0][]);
    }

    private static void flushNum(StringBuilder num, List<Integer> row) {
        if (num.length() > 0) {
            try {
                row.add(Integer.parseInt(num.toString()));
            } catch (NumberFormatException ignored) {
                // skip
            }
            num.setLength(0);
        }
    }

    public static void main(String[] args) throws Exception {
        System.setOut(new java.io.PrintStream(System.out, true, "UTF-8"));
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in, "UTF-8"));

        List<String> rawLines = new ArrayList<>();
        String line;
        while ((line = br.readLine()) != null) {
            String t = line.trim();
            if (!t.isEmpty()) rawLines.add(t);
        }

        int correct = 0;
        for (int i = 0; i < rawLines.size(); i++) {
            String raw = rawLines.get(i);
            int[][] tasks = parseTasks(raw);
            try {
                int got = scheduleTasks(tasks);
                if (i < EXPECTED.length && got == EXPECTED[i]) {
                    System.out.println("scheduleTasks(" + raw + ") = " + got + "  ✓");
                    correct++;
                } else if (i < EXPECTED.length) {
                    System.out.println("scheduleTasks(" + raw + ") = " + got
                            + "  ✗  expected " + EXPECTED[i]);
                } else {
                    System.out.println("scheduleTasks(" + raw + ") = " + got
                            + "  (no expected; bonus case)");
                }
            } catch (Throwable t) {
                System.out.println("scheduleTasks(" + raw + ") raised "
                        + t.getClass().getSimpleName() + ": " + t.getMessage());
            }
        }

        System.out.println(repeat('-', 32));
        System.out.println("Result: " + correct + " / " + rawLines.size() + " correct");
    }

    private static String repeat(char c, int n) {
        StringBuilder sb = new StringBuilder(n);
        for (int i = 0; i < n; i++) sb.append(c);
        return sb.toString();
    }
}
