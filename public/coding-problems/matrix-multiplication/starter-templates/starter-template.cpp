// ============================================================
//  Matrix Multiplication · C++11
//  Problem statement is on the left.
//  Only edit the `multiply` function below.
// ============================================================

#include <iostream>
#include <vector>
#include <string>
#include <sstream>
#include <iomanip>
#include <iterator>
#include <cmath>
#include <cctype>
#include <cstdlib>

using namespace std;
using Matrix = vector<vector<double>>;

// ============================================================
// 👇 ONLY EDIT THIS FUNCTION
// ============================================================
//
//  Given A (m × k) and B (k × n), return C = A × B (m × n).
//  C[i][j] = sum over p of A[i][p] * B[p][j].
//
//  Edge case: if any input matrix is empty, return {}.
//
Matrix multiply(const Matrix& A, const Matrix& B) {
    // TODO: replace this placeholder with your implementation.
    // The hard-coded return value just lets the I/O scaffold run
    // end-to-end so you can see test-case #1 pass on first run.
    return {{58, 64}, {139, 154}};
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
static Matrix _expected() {
    return {{58, 64}, {139, 154}};
}

static const double _EPS = 1e-6;

// ---------- parse [[1,2],[3,4]] style literal ----------
static Matrix _parse_matrix(const string& s) {
    Matrix M;
    vector<double> row;
    string num;
    int depth = 0;
    bool row_open = false;
    auto flush_num = [&]() {
        if (!num.empty()) {
            try { row.push_back(stod(num)); } catch (...) { /* skip */ }
            num.clear();
        }
    };
    for (char c : s) {
        if (c == '[') {
            depth++;
            if (depth == 2) { row.clear(); row_open = true; }
        } else if (c == ']') {
            flush_num();
            if (depth == 2 && row_open) {
                M.push_back(row);
                row.clear();
                row_open = false;
            }
            if (depth > 0) depth--;
        } else if (c == ',' || isspace((unsigned char)c)) {
            flush_num();
        } else {
            num.push_back(c);
        }
    }
    return M;
}

// Pull top-level [...] blocks from text, in order.
static vector<string> _extract_top_level(const string& s) {
    vector<string> out;
    int depth = 0;
    size_t start = 0;
    for (size_t i = 0; i < s.size(); ++i) {
        if (s[i] == '[') {
            if (depth == 0) start = i;
            depth++;
        } else if (s[i] == ']') {
            if (depth == 0) continue;
            depth--;
            if (depth == 0) out.push_back(s.substr(start, i - start + 1));
        }
    }
    return out;
}

static bool _close(const Matrix& a, const Matrix& b) {
    if (a.size() != b.size()) return false;
    for (size_t i = 0; i < a.size(); ++i) {
        if (a[i].size() != b[i].size()) return false;
        for (size_t j = 0; j < a[i].size(); ++j) {
            if (fabs(a[i][j] - b[i][j]) > _EPS) return false;
        }
    }
    return true;
}

static string _fmt_num(double x) {
    if (fabs(x - (long long)x) < 1e-12) {
        ostringstream o;
        o << (long long)x;
        return o.str();
    }
    ostringstream o;
    o << setprecision(10) << x;
    return o.str();
}

static string _fmt(const Matrix& M) {
    ostringstream o;
    o << "[";
    for (size_t i = 0; i < M.size(); ++i) {
        if (i > 0) o << ", ";
        o << "[";
        for (size_t j = 0; j < M[i].size(); ++j) {
            if (j > 0) o << ", ";
            o << _fmt_num(M[i][j]);
        }
        o << "]";
    }
    o << "]";
    return o.str();
}

int main() {
    string input((istreambuf_iterator<char>(cin)), istreambuf_iterator<char>());
    Matrix expected = _expected();

    vector<string> mats = _extract_top_level(input);
    if (mats.size() < 2) {
        cout << "failed to parse input: expected two matrices A and B, got "
             << mats.size() << "\n";
        cout << string(32, '-') << "\n";
        cout << "Result: 0 / 1 correct\n";
        return 0;
    }
    Matrix A = _parse_matrix(mats[0]);
    Matrix B = _parse_matrix(mats[1]);

    Matrix C;
    try {
        C = multiply(A, B);
    } catch (const std::exception& e) {
        cout << "multiply(" << _fmt(A) << ", " << _fmt(B)
             << ") raised " << e.what() << "\n";
        cout << string(32, '-') << "\n";
        cout << "Result: 0 / 1 correct\n";
        return 0;
    }

    string label = "multiply(" + _fmt(A) + ", " + _fmt(B) + ")";
    int correct = 0;
    if (_close(C, expected)) {
        cout << label << " = " << _fmt(C) << "  \xE2\x9C\x93\n"; // ✓
        correct = 1;
    } else {
        cout << label << " = " << _fmt(C)
             << "  \xE2\x9C\x97  expected " << _fmt(expected) << "\n"; // ✗
    }

    cout << string(32, '-') << "\n";
    cout << "Result: " << correct << " / 1 correct\n";
    return 0;
}
