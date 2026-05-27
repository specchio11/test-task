// ============================================================
//  Activity Burst Detector · C++17
//  Problem statement is on the left.
//  Only edit the ActivityBurstDetector class below.
// ============================================================
#include <bits/stdc++.h>
using namespace std;


// ============================================================
// 👇 ONLY EDIT THIS CLASS
// ============================================================
class ActivityBurstDetector {
public:
    ActivityBurstDetector(int windowMs, int threshold)
        : windowMs_(windowMs), threshold_(threshold) {}

    bool hit(int t) {
        // TODO: record event at time t. Return whether — counting this event —
        // the number of events whose timestamps are in [t - windowMs, t]
        // is >= threshold.
        events_.push_back(t);                                          // placeholder
        return static_cast<int>(events_.size()) >= threshold_;         // placeholder — replace
    }

private:
    int windowMs_;
    int threshold_;
    vector<int> events_;   // placeholder — replace with whatever you need
};
// ============================================================
// 👆 ONLY EDIT ABOVE  ·  Do NOT modify anything below
// ============================================================










































































// ---- Tiny parser for [windowMs, threshold, [t1, t2, ...]] (test harness only) ----
struct _TestCase {
    int windowMs = 0;
    int threshold = 0;
    vector<int> hits;
};

static _TestCase _parseTestCase(const string& s) {
    _TestCase tc;
    int depth = 0, num = 0;
    int field = 0;   // 0 = windowMs, 1 = threshold, 2 = hits
    bool inNum = false, neg = false;
    auto flush = [&]() {
        if (!inNum) return;
        int v = neg ? -num : num;
        if (field == 0) tc.windowMs = v;
        else if (field == 1) tc.threshold = v;
        else if (field == 2) tc.hits.push_back(v);
        num = 0; inNum = false; neg = false;
    };
    for (char c : s) {
        if (c == '[') {
            depth++;
        } else if (c == ']') {
            flush();
            depth--;
        } else if (c >= '0' && c <= '9') {
            num = num * 10 + (c - '0');
            inNum = true;
        } else if (c == '-') {
            neg = true;
        } else if (c == ',') {
            flush();
            if (depth == 1) field++;   // top-level comma advances to next field
        }
    }
    return tc;
}

// Expected hit() result sequences for the 7 sample inputs below
// (hardcoded so the harness can self-check). DO NOT consult these
// inside ActivityBurstDetector — that would defeat the purpose.
static const vector<vector<bool>> _EXPECTED = {
    {false, false, true, false, false, true},
    {true, true, true},
    {false, false, false, false},
    {false, true, true},
    {false, false, false, true, true},
    {false, true, false, true},
    {false, false, true},
};

static string _boolsStr(const vector<bool>& v) {
    string s = "[";
    for (size_t i = 0; i < v.size(); ++i) {
        if (i) s += ", ";
        s += v[i] ? "true" : "false";
    }
    s += "]";
    return s;
}

static string _intsStr(const vector<int>& v) {
    string s = "[";
    for (size_t i = 0; i < v.size(); ++i) {
        if (i) s += ", ";
        s += to_string(v[i]);
    }
    s += "]";
    return s;
}

int main() {
    string line;
    vector<string> rawLines;
    while (getline(cin, line)) {
        size_t a = line.find_first_not_of(" \t\r\n");
        size_t b = line.find_last_not_of(" \t\r\n");
        if (a == string::npos) continue;
        rawLines.push_back(line.substr(a, b - a + 1));
    }

    int correct = 0;
    for (size_t i = 0; i < rawLines.size(); ++i) {
        const string& raw = rawLines[i];
        _TestCase tc = _parseTestCase(raw);
        string label = "ActivityBurstDetector(" + to_string(tc.windowMs) + ", "
                       + to_string(tc.threshold) + ") on " + _intsStr(tc.hits);
        vector<bool> got;
        try {
            ActivityBurstDetector d(tc.windowMs, tc.threshold);
            for (int t : tc.hits) got.push_back(d.hit(t));
        } catch (const exception& e) {
            cout << label << " raised " << typeid(e).name() << ": " << e.what() << "\n";
            continue;
        }

        if (i >= _EXPECTED.size()) {
            cout << label << " = " << _boolsStr(got) << "  (no expected; bonus case)\n";
        } else if (got == _EXPECTED[i]) {
            cout << label << " = " << _boolsStr(got) << "  ✓\n";
            correct++;
        } else {
            cout << label << " = " << _boolsStr(got)
                 << "  ✗  expected " << _boolsStr(_EXPECTED[i]) << "\n";
        }
    }

    cout << string(32, '-') << "\n";
    cout << "Result: " << correct << " / " << rawLines.size() << " correct\n";
    return 0;
}
