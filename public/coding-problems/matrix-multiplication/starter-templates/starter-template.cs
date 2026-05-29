// ============================================================
//  Matrix Multiplication · C#
//  Problem statement is on the left.
//  Only edit the `Multiply` function below.
// ============================================================

using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Text;

class Solution
{
    // ============================================================
    // 👇 ONLY EDIT THIS FUNCTION
    // ============================================================
    //
    //  Given A (m × k) and B (k × n), return C = A × B (m × n).
    //  C[i][j] = sum over p of A[i][p] * B[p][j].
    //
    //  Edge case: if any input matrix is empty, return new double[0][].
    //
    static double[][] Multiply(double[][] A, double[][] B)
    {
        // TODO: replace this placeholder with your implementation.
        // The hard-coded return value just lets the I/O scaffold run
        // end-to-end so you can see test-case #1 pass on first run.
        return new double[][]
        {
            new double[] { 58, 64 },
            new double[] { 139, 154 }
        };
    }
    // ============================================================
    // 👆 ONLY EDIT ABOVE  ·  Do NOT modify anything below
    // ============================================================



















    // Expected output for the sample input (hardcoded so the harness
    // can self-check). DO NOT consult this inside `Multiply` — that
    // would defeat the purpose.
    //
    // Sample input (paste into the HackerRank Input box):
    //
    //     [[1, 2, 3], [4, 5, 6]]
    //     [[7, 8], [9, 10], [11, 12]]
    //
    static readonly double[][] _Expected = new double[][]
    {
        new double[] {58, 64},
        new double[] {139, 154},
    };

    const double _Eps = 1e-6;

    // ---------- parse [[1,2],[3,4]] style literal ----------
    static double[][] ParseMatrix(string s)
    {
        var rows = new List<double[]>();
        var row = new List<double>();
        var num = new StringBuilder();
        int depth = 0;
        bool rowOpen = false;

        void Flush()
        {
            if (num.Length > 0)
            {
                if (double.TryParse(num.ToString(), NumberStyles.Float,
                        CultureInfo.InvariantCulture, out double v))
                    row.Add(v);
                num.Clear();
            }
        }

        foreach (char c in s)
        {
            if (c == '[')
            {
                depth++;
                if (depth == 2) { row.Clear(); rowOpen = true; }
            }
            else if (c == ']')
            {
                Flush();
                if (depth == 2 && rowOpen)
                {
                    rows.Add(row.ToArray());
                    row = new List<double>();
                    rowOpen = false;
                }
                if (depth > 0) depth--;
            }
            else if (c == ',' || char.IsWhiteSpace(c))
            {
                Flush();
            }
            else
            {
                num.Append(c);
            }
        }
        return rows.ToArray();
    }

    // Pull top-level [...] blocks from text, in order.
    static List<string> ExtractTopLevel(string s)
    {
        var result = new List<string>();
        int depth = 0;
        int start = 0;
        for (int i = 0; i < s.Length; i++)
        {
            if (s[i] == '[')
            {
                if (depth == 0) start = i;
                depth++;
            }
            else if (s[i] == ']')
            {
                if (depth == 0) continue;
                depth--;
                if (depth == 0) result.Add(s.Substring(start, i - start + 1));
            }
        }
        return result;
    }

    static bool Close(double[][] a, double[][] b)
    {
        if (a == null || b == null) return false;
        if (a.Length != b.Length) return false;
        for (int i = 0; i < a.Length; i++)
        {
            if (a[i] == null || b[i] == null) return false;
            if (a[i].Length != b[i].Length) return false;
            for (int j = 0; j < a[i].Length; j++)
                if (Math.Abs(a[i][j] - b[i][j]) > _Eps) return false;
        }
        return true;
    }

    static string FmtNum(double x)
    {
        if (Math.Abs(x - Math.Truncate(x)) < 1e-12 && !double.IsInfinity(x))
            return ((long)x).ToString(CultureInfo.InvariantCulture);
        return x.ToString("G", CultureInfo.InvariantCulture);
    }

    static string Fmt(double[][] M)
    {
        if (M == null) return "null";
        var sb = new StringBuilder();
        sb.Append('[');
        for (int i = 0; i < M.Length; i++)
        {
            if (i > 0) sb.Append(", ");
            sb.Append('[');
            if (M[i] != null)
            {
                for (int j = 0; j < M[i].Length; j++)
                {
                    if (j > 0) sb.Append(", ");
                    sb.Append(FmtNum(M[i][j]));
                }
            }
            sb.Append(']');
        }
        sb.Append(']');
        return sb.ToString();
    }

    static void Main()
    {
        Console.OutputEncoding = Encoding.UTF8;
        string input = Console.In.ReadToEnd();

        var mats = ExtractTopLevel(input);
        if (mats.Count < 2)
        {
            Console.WriteLine($"failed to parse input: expected two matrices A and B, got {mats.Count}");
            Console.WriteLine(new string('-', 32));
            Console.WriteLine("Result: 0 / 1 correct");
            return;
        }
        double[][] A, B;
        try { A = ParseMatrix(mats[0]); B = ParseMatrix(mats[1]); }
        catch (Exception e)
        {
            Console.WriteLine($"failed to parse input: {e.Message}");
            Console.WriteLine(new string('-', 32));
            Console.WriteLine("Result: 0 / 1 correct");
            return;
        }

        string label = $"Multiply({Fmt(A)}, {Fmt(B)})";
        double[][] C;
        try { C = Multiply(A, B); }
        catch (Exception e)
        {
            Console.WriteLine($"{label} raised {e.GetType().Name}: {e.Message}");
            Console.WriteLine(new string('-', 32));
            Console.WriteLine("Result: 0 / 1 correct");
            return;
        }

        int correct = 0;
        if (Close(C, _Expected))
        {
            Console.WriteLine($"{label} = {Fmt(C)}  \u2713"); // ✓
            correct = 1;
        }
        else
            Console.WriteLine($"{label} = {Fmt(C)}  \u2717  expected {Fmt(_Expected)}"); // ✗

        Console.WriteLine(new string('-', 32));
        Console.WriteLine($"Result: {correct} / 1 correct");
    }
}
