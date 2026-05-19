// ============================================================
//  Inverse of a Monotonic Function — Coding Exercise (C#)
// ============================================================
//  Task
//    Implement G(y) so that for every input y, it returns the
//    non-negative integer x such that F(x) = y.
//
//  Rules
//    - You can ONLY CALL F(x). Treat F as a true black box.
//    - F is strictly monotonically increasing on non-negative
//      integers (i.e., for any a < b, F(a) < F(b)).
//    - You may assume that for every input y a valid x exists.
//    - You only need to fill in the body of G(y) below.
//
//  Sample input (already loaded in the Input box):
//
//      3
//      5
//      7
//      9
//      11
//      21
//      1003
//
//  Expected output once G is correctly implemented (the runner
//  self-checks each call via F(G(y)) == y):
//
//      g(3) = 0  ✓
//      g(5) = 1  ✓
//      g(7) = 2  ✓
//      g(9) = 3  ✓
//      g(11) = 4  ✓
//      g(21) = 9  ✓
//      g(1003) = 500  ✓
//      --------------------------------
//      Result: 7 / 7 correct
// ============================================================

using System;
using System.Collections.Generic;
using System.Globalization;


class Solution
{
    // ============================================================
    // 👇 ONLY EDIT THIS FUNCTION
    // ============================================================
    //
    //  Given y, return the non-negative integer x such that F(x) = y.
    //
    static long G(long y)
    {
        // TODO: implement. Return the integer x such that F(x) == y.
        //
        // You can call F(x) as a black box for any integer x, e.g.:
        //     long probe  = F(0);     // what is F at 0?
        //     long probe2 = F(1000);  // what is F at 1000?
        // Use such probes to search for the x that satisfies F(x) == y.
        //
        // The placeholder call below is intentionally wrong on most
        // inputs (you'll see a mix of ✓ and ✗) — replace it with your
        // real algorithm to get 7 / 7 correct.
        return MockInverse(y);
    }
    // ============================================================
    // 👆 ONLY EDIT ABOVE  ·  Do NOT modify anything below
    // ============================================================





































































    static long F(long x)
    {
        return 2 * x + 3;
    }


    static long MockInverse(long y)
    {
        // Intentionally-wrong mock so the placeholder G() prints a mix
        // of ✓ and ✗ on the sample input. Not part of the real task.
        return y / 3;
    }


    static void Main()
    {
        Console.OutputEncoding = System.Text.Encoding.UTF8;

        var inputs = new List<long>();
        string line;
        while ((line = Console.In.ReadLine()) != null)
        {
            line = line.Trim();
            if (line.Length == 0) continue;
            inputs.Add(long.Parse(line, CultureInfo.InvariantCulture));
        }

        int correct = 0;
        foreach (long y in inputs)
        {
            try
            {
                long x = G(y);
                if (F(x) == y)
                {
                    Console.WriteLine($"g({y}) = {x}  ✓");
                    correct++;
                }
                else
                {
                    Console.WriteLine($"g({y}) = {x}  ✗");
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"g({y}) raised {ex.GetType().Name}: {ex.Message}");
            }
        }

        Console.WriteLine(new string('-', 32));
        Console.WriteLine($"Result: {correct} / {inputs.Count} correct");
    }
}
