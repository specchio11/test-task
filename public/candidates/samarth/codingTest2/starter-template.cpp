// ============================================================
//  Task Scheduling with Deadlines — Coding Exercise (C++17)
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
//  Expected output once scheduleTasks is correctly implemented
//  (the runner self-checks each call against a hardcoded
//  expected[] array — you do NOT need to print anything):
//
//      scheduleTasks([[100,200],[200,1300],[1000,1250],[2000,3200]]) = 3  ✓
//      scheduleTasks([[1,2]]) = 1  ✓
//      scheduleTasks([[3,2],[4,3]]) = 0  ✓
//      scheduleTasks([[5,5],[4,6],[2,6]]) = 2  ✓
//      scheduleTasks([]) = 0  ✓
//      scheduleTasks([[1,5],[2,5],[3,5]]) = 2  ✓
//      scheduleTasks([[10,10],[1,11],[2,12],[3,13]]) = 3  ✓
//      --------------------------------
//      Result: 7 / 7 correct
// ============================================================
#include <bits/stdc++.h>
using namespace std;


// ============================================================
// 👇 ONLY EDIT THIS FUNCTION
// ============================================================
//
//  Given `tasks` (each task is a 2-element vector
//  [duration, deadline]), return the maximum number of tasks
//  that can be finished on or before their deadlines on a
//  single machine starting at t = 0.
//
//  You MAY mutate (e.g., std::sort) `tasks` if that helps.
//
int scheduleTasks(vector<vector<int>>& tasks) {
    // TODO: replace this function.
    return (int)tasks.size();
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
