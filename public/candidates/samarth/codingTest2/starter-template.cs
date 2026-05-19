// ============================================================
//  Task Scheduling with Deadlines — Coding Exercise (C#)
// ============================================================
//  Sample input (one JSON array per line; already loaded in
//  the Input box of HackerRank's Custom Input):
//
//      [[100,200],[200,1300],[1000,1250],[2000,3200]]
//      [[1,2]]
//      [[3,2],[4,3]]
//      [[5,5],[4,6],[2,6]]
//      []
//      [[1,5],[2,5],[3,5]]
//      [[10,10],[1,11],[2,12],[3,13]]
//
//  Expected output once ScheduleTasks is correctly implemented
//  (the runner self-checks each call against a hardcoded
//  expected[] array — you do NOT need to print anything):
//
//      ScheduleTasks([[100,200],[200,1300],[1000,1250],[2000,3200]]) = 3  ✓
//      ScheduleTasks([[1,2]]) = 1  ✓
//      ScheduleTasks([[3,2],[4,3]]) = 0  ✓
//      ScheduleTasks([[5,5],[4,6],[2,6]]) = 2  ✓
//      ScheduleTasks([]) = 0  ✓
//      ScheduleTasks([[1,5],[2,5],[3,5]]) = 2  ✓
//      ScheduleTasks([[10,10],[1,11],[2,12],[3,13]]) = 3  ✓
//      --------------------------------
//      Result: 7 / 7 correct
// ============================================================

using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Text.Json;

class Solution {

    // ============================================================
    // 👇 ONLY EDIT THIS FUNCTION
    // ============================================================
    //
    //  Given `tasks` (each row is [duration, deadline]), return
    //  the maximum number of tasks that can be finished on or
    //  before their deadlines on a single machine starting at t = 0.
    //
    //  You MAY mutate (e.g., Array.Sort) `tasks` if that helps.
    //
    static int ScheduleTasks(int[][] tasks) {
        // TODO: replace this function.
        return tasks.Length;
    }
    // ============================================================
    // 👆 ONLY EDIT ABOVE  ·  Do NOT modify anything below
    // ============================================================
































































    // Expected answers for the 7 sample inputs above (hardcoded so
    // the harness can self-check). DO NOT consult these inside
    // ScheduleTasks — that would defeat the purpose.
    static readonly int[] _EXPECTED = { 3, 1, 0, 2, 0, 2, 3 };

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
            int[][] tasks;
            try {
                tasks = JsonSerializer.Deserialize<int[][]>(raw)!;
            } catch (Exception ex) {
                Console.WriteLine($"failed to parse '{raw}': {ex.Message}");
                continue;
            }
            try {
                int got = ScheduleTasks(tasks);
                if (i < _EXPECTED.Length && got == _EXPECTED[i]) {
                    Console.WriteLine($"ScheduleTasks({raw}) = {got}  ✓");
                    correct++;
                } else if (i < _EXPECTED.Length) {
                    Console.WriteLine($"ScheduleTasks({raw}) = {got}  ✗  expected {_EXPECTED[i]}");
                } else {
                    Console.WriteLine($"ScheduleTasks({raw}) = {got}  (no expected; bonus case)");
                }
            } catch (Exception ex) {
                Console.WriteLine($"ScheduleTasks({raw}) raised {ex.GetType().Name}: {ex.Message}");
            }
        }

        Console.WriteLine(new string('-', 32));
        Console.WriteLine($"Result: {correct} / {rawLines.Count} correct");
    }
}
