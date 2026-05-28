// ============================================================
//  Matrix Multiplication — Candidate Starter Template (C++11)
// ============================================================
//  How to use:
//    1. Paste this whole file into the HackerRank editor (C++11).
//    2. Hit "Run Code" with the sample input below — you should
//       see "[[58, 64], [139, 154]]" printed. That confirms the
//       I/O scaffold works and shows the expected output format.
//    3. Replace the placeholder body of `multiply()` with your
//       real implementation. Do NOT change anything below the
//       marker.
//
//  Sample input (paste into the Input box):
//
//      [[1, 2, 3], [4, 5, 6]]
//      [[7, 8], [9, 10], [11, 12]]
//
//  Expected output once `multiply` is correctly implemented:
//
//      [[58, 64], [139, 154]]
// ============================================================

#include <iostream>
#include <vector>
#include <string>
#include <stdexcept>
#include <iomanip>
#include <iterator>
#include <cctype>

using namespace std;
using Matrix = vector<vector<double>>;

// ============================================================
// 👇 ONLY EDIT THIS FUNCTION
// ============================================================
//
//  Given A (m × k) and B (k × n), return C = A × B (m × n)
//  C[i][j] = sum over p of A[i][p] * B[p][j]
//
//  Edge case: if any matrix is empty, return an empty matrix.
//
Matrix multiply(const Matrix& A, const Matrix& B) {
    // TODO: replace this placeholder with your implementation.
    // The hard-coded return value is just so the I/O scaffold
    // below runs end-to-end and you can see the expected output
    // format: [[58, 64], [139, 154]]
    return {{58, 64}, {139, 154}};
}
// ============================================================
// 👆 ONLY EDIT ABOVE  ·  Do NOT modify the I/O scaffold below
// ============================================================































// ---------- parse [[1,2],[3,4]] style literal ----------
Matrix parse_matrix(const string& s) {
    Matrix M;
    vector<double> row;
    string num;
    int depth = 0;
    auto flush = [&]() {
        if (!num.empty()) { row.push_back(stod(num)); num.clear(); }
    };
    for (char c : s) {
        if (c == '[') {
            depth++;
            if (depth == 2) row.clear();
        } else if (c == ']') {
            flush();
            if (depth == 2) { M.push_back(row); row.clear(); }
            depth--;
        } else if (c == ',' || isspace((unsigned char)c)) {
            flush();
        } else {
            num.push_back(c);
        }
    }
    return M;
}

string take_next_matrix(const string& s, size_t& pos) {
    size_t start = s.find('[', pos);
    if (start == string::npos) throw runtime_error("No matrix found");
    int depth = 0;
    for (size_t i = start; i < s.size(); ++i) {
        if (s[i] == '[') depth++;
        else if (s[i] == ']' && --depth == 0) {
            pos = i + 1;
            return s.substr(start, i - start + 1);
        }
    }
    throw runtime_error("Unterminated matrix literal");
}

int main() {
    string input((istreambuf_iterator<char>(cin)), istreambuf_iterator<char>());
    size_t pos = 0;
    Matrix A = parse_matrix(take_next_matrix(input, pos));
    Matrix B = parse_matrix(take_next_matrix(input, pos));

    Matrix C = multiply(A, B);

    cout << setprecision(10) << "[";
    for (size_t i = 0; i < C.size(); ++i) {
        if (i > 0) cout << ", ";
        cout << "[";
        for (size_t j = 0; j < C[i].size(); ++j) {
            if (j > 0) cout << ", ";
            cout << C[i][j];
        }
        cout << "]";
    }
    cout << "]\n";
    return 0;
}
