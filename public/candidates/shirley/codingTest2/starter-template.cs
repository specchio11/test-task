// ============================================================
//  Activity Burst Detector · C#
//  Problem statement is on the left.
//  Only edit the ActivityBurstDetector class below.
// ============================================================

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;


// ============================================================
// 👇 ONLY EDIT THIS CLASS
// ============================================================
public class ActivityBurstDetector {
    private readonly int windowMs;
    private readonly int threshold;
    private readonly List<int> events = new List<int>();   // placeholder — replace with whatever you need

    public ActivityBurstDetector(int windowMs, int threshold) {
        this.windowMs = windowMs;
        this.threshold = threshold;
    }

    public bool Hit(int t) {
        // TODO: record event at time t. Return whether — counting this event —
        // the number of events whose timestamps are in [t - windowMs, t]
        // is >= threshold.
        events.Add(t);                          // placeholder
        return events.Count >= threshold;       // placeholder — replace
    }
}
// ============================================================
// 👆 ONLY EDIT ABOVE  ·  Do NOT modify anything below
// ============================================================










































































class _Solution {

    // Expected Hit() result sequences for the 7 sample inputs below
    // (hardcoded so the harness can self-check). DO NOT consult these
    // inside ActivityBurstDetector — that would defeat the purpose.
    //
    // Input format: each non-empty line is JSON [windowMs, threshold, [t1, t2, ...]].
    static readonly bool[][] _EXPECTED = new bool[][] {
        new[] { false, false, true,  false, false, true },
        new[] { true,  true,  true },
        new[] { false, false, false, false },
        new[] { false, true,  true },
        new[] { false, false, false, true,  true },
        new[] { false, true,  false, true },
        new[] { false, false, true },
    };

    static string _Bools(IEnumerable<bool> xs) =>
        "[" + string.Join(", ", xs.Select(b => b ? "true" : "false")) + "]";

    static string _Ints(IEnumerable<int> xs) =>
        "[" + string.Join(", ", xs) + "]";

    static bool _SeqEq(bool[] a, bool[] b) {
        if (a.Length != b.Length) return false;
        for (int i = 0; i < a.Length; i++) if (a[i] != b[i]) return false;
        return true;
    }

    static void Main() {
        Console.OutputEncoding = Encoding.UTF8;

        var rawLines = new List<string>();
        string? line;
        while ((line = Console.In.ReadLine()) != null) {
            var trimmed = line.Trim();
            if (trimmed.Length == 0) continue;
            rawLines.Add(trimmed);
        }

        int correct = 0;
        for (int i = 0; i < rawLines.Count; i++) {
            string raw = rawLines[i];
            int windowMs, threshold;
            int[] hits;
            try {
                using var doc = JsonDocument.Parse(raw);
                var root = doc.RootElement;
                windowMs = root[0].GetInt32();
                threshold = root[1].GetInt32();
                var list = new List<int>();
                foreach (var elem in root[2].EnumerateArray()) list.Add(elem.GetInt32());
                hits = list.ToArray();
            } catch (Exception ex) {
                Console.WriteLine($"failed to parse '{raw}': {ex.Message}");
                continue;
            }

            string label = $"ActivityBurstDetector({windowMs}, {threshold}) on {_Ints(hits)}";
            bool[] got;
            try {
                var d = new ActivityBurstDetector(windowMs, threshold);
                got = hits.Select(t => d.Hit(t)).ToArray();
            } catch (Exception ex) {
                Console.WriteLine($"{label} raised {ex.GetType().Name}: {ex.Message}");
                continue;
            }

            if (i >= _EXPECTED.Length) {
                Console.WriteLine($"{label} = {_Bools(got)}  (no expected; bonus case)");
            } else if (_SeqEq(got, _EXPECTED[i])) {
                Console.WriteLine($"{label} = {_Bools(got)}  ✓");
                correct++;
            } else {
                Console.WriteLine($"{label} = {_Bools(got)}  ✗  expected {_Bools(_EXPECTED[i])}");
            }
        }

        Console.WriteLine(new string('-', 32));
        Console.WriteLine($"Result: {correct} / {rawLines.Count} correct");
    }
}
