// ============================================================
//  Task Scheduling with Deadlines · C++17
//  Problem statement is on the left. Only edit scheduleTasks below.
// ============================================================
#include <bits/stdc++.h>
using namespace std;


// ============================================================
// 👇 ONLY EDIT THIS FUNCTION
// ============================================================
int scheduleTasks(vector<vector<int>>& tasks) {
    // TODO: return the maximum number of tasks finished on time.
    return (int)tasks.size();  // placeholder — replace with your code
}
// ============================================================
// 👆 ONLY EDIT ABOVE  ·  Do NOT modify anything below
// ============================================================






































































// ---- Tiny JSON-array parser for [[d,dl],[d,dl],...] (test harness only) ----
static vector<vector<int>> _parseTasks(const string& s) {
    vector<vector<int>> out;
    vector<int> cur;
    int depth = 0, num = 0;
    bool inNum = false, neg = false;
    for (char c : s) {
        if (c == '[') {
            depth++;
            if (depth == 2) cur.clear();
        } else if (c == ']') {
            if (inNum) { cur.push_back(neg ? -num : num); num = 0; inNum = false; neg = false; }
            if (depth == 2) out.push_back(cur);
            depth--;
        } else if (c >= '0' && c <= '9') {
            num = num * 10 + (c - '0');
            inNum = true;
        } else if (c == '-') {
            neg = true;
        } else if (c == ',' && depth == 2 && inNum) {
            cur.push_back(neg ? -num : num);
            num = 0; inNum = false; neg = false;
        }
    }
    return out;
}

// Expected answers for the 7 sample inputs above (hardcoded so
// the harness can self-check). DO NOT consult these inside
// scheduleTasks — that would defeat the purpose.
static const int _EXPECTED[] = {3, 1, 0, 2, 0, 2, 3};

int main() {
    string line;
    vector<string> rawLines;
    while (getline(cin, line)) {
        size_t a = line.find_first_not_of(" \t\r\n");
        size_t b = line.find_last_not_of(" \t\r\n");
        if (a == string::npos) continue;
        rawLines.push_back(line.substr(a, b - a + 1));
    }

    const size_t _NEXP = sizeof(_EXPECTED) / sizeof(_EXPECTED[0]);
    int correct = 0;
    for (size_t i = 0; i < rawLines.size(); ++i) {
        const string& raw = rawLines[i];
        vector<vector<int>> tasks = _parseTasks(raw);
        try {
            int got = scheduleTasks(tasks);
            if (i < _NEXP && got == _EXPECTED[i]) {
                cout << "scheduleTasks(" << raw << ") = " << got << "  ✓\n";
                correct++;
            } else if (i < _NEXP) {
                cout << "scheduleTasks(" << raw << ") = " << got
                     << "  ✗  expected " << _EXPECTED[i] << "\n";
            } else {
                cout << "scheduleTasks(" << raw << ") = " << got
                     << "  (no expected; bonus case)\n";
            }
        } catch (const exception& e) {
            cout << "scheduleTasks(" << raw << ") raised "
                 << typeid(e).name() << ": " << e.what() << "\n";
        }
    }

    cout << string(32, '-') << "\n";
    cout << "Result: " << correct << " / " << rawLines.size() << " correct\n";
    return 0;
}
