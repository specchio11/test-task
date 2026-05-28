// ============================================================
//  Matrix Multiplication — Candidate Starter Template (C#)
// ============================================================
//  How to use:
//    1. Paste this whole file into the HackerRank editor (C#).
//    2. Hit "Run Code" with the sample input below — you should
//       see "[[58, 64], [139, 154]]" printed. That confirms the
//       I/O scaffold works and shows the expected output format.
//    3. Replace the placeholder body of `Multiply()` with your
//       real implementation. Do NOT change anything below the
//       marker.
//
//  Sample input (paste into the Input box):
//
//      [[1, 2, 3], [4, 5, 6]]
//      [[7, 8], [9, 10], [11, 12]]
//
//  Expected output once `Multiply` is correctly implemented:
//
//      [[58, 64], [139, 154]]
// ============================================================

using System;
using System.Collections.Generic;
using System.Globalization;
using System.Text;

class Solution
{
    // ============================================================
    // 👇 ONLY EDIT THIS FUNCTION
    // ============================================================
    //
    //  Given A (m × k) and B (k × n), return C = A × B (m × n)
    //  C[i][j] = sum over p of A[i][p] * B[p][j]
    //
    //  Edge case: if any matrix is empty, return an empty jagged array.
    //
    static double[][] Multiply(double[][] A, double[][] B)
    {
        // TODO: replace this placeholder with your implementation.
        // The hard-coded return value is just so the I/O scaffold
        // below runs end-to-end and you can see the expected output
        // format: [[58, 64], [139, 154]]
        return new double[][]
        {
            new double[] { 58, 64 },
            new double[] { 139, 154 }
        };
    }
    // ============================================================
    // 👆 ONLY EDIT ABOVE  ·  Do NOT modify the I/O scaffold below
    // ============================================================

























    // ---------- parse [[1,2],[3,4]] style literal ----------
    static double[][] ParseMatrix(string s)
    {
        var rows = new List<double[]>();
        var row = new List<double>();
        var num = new StringBuilder();
        int depth = 0;

        void Flush()
        {
            if (num.Length > 0)
            {
                row.Add(double.Parse(num.ToString(), CultureInfo.InvariantCulture));
                num.Clear();
            }
        }

        foreach (char c in s)
        {
            if (c == '[')
            {
                depth++;
                if (depth == 2) row.Clear();
            }
            else if (c == ']')
            {
                Flush();
                if (depth == 2)
                {
                    rows.Add(row.ToArray());
                    row = new List<double>();
                }
                depth--;
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

    static string TakeNextMatrix(string s, ref int pos)
    {
        int start = s.IndexOf('[', pos);
        if (start < 0) throw new Exception("No matrix found");
        int depth = 0;
        for (int i = start; i < s.Length; i++)
        {
            if (s[i] == '[') depth++;
            else if (s[i] == ']')
            {
                depth--;
                if (depth == 0)
                {
                    pos = i + 1;
                    return s.Substring(start, i - start + 1);
                }
            }
        }
        throw new Exception("Unterminated matrix literal");
    }

    static void Main()
    {
        string input = Console.In.ReadToEnd();
        int pos = 0;
        double[][] A = ParseMatrix(TakeNextMatrix(input, ref pos));
        double[][] B = ParseMatrix(TakeNextMatrix(input, ref pos));

        double[][] C = Multiply(A, B);

        var sb = new StringBuilder();
        sb.Append('[');
        for (int i = 0; i < C.Length; i++)
        {
            if (i > 0) sb.Append(", ");
            sb.Append('[');
            for (int j = 0; j < C[i].Length; j++)
            {
                if (j > 0) sb.Append(", ");
                sb.Append(C[i][j].ToString("G", CultureInfo.InvariantCulture));
            }
            sb.Append(']');
        }
        sb.Append(']');
        Console.WriteLine(sb.ToString());
    }
}
