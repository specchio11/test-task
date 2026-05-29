// ============================================================
//  Inverse of a Monotonic Function · C#
//  Problem statement is on the left. Only edit G(y) below.
// ============================================================

using System;
using System.Collections.Generic;
using System.Globalization;


class Solution
{
    // ============================================================
    // 👇 ONLY EDIT THIS FUNCTION
    // ============================================================
    static long G(long y)
    {
        // TODO: return x such that F(x) == y. You may call F(x) freely.
        return MockInverse(y);  // placeholder — replace with your code
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
