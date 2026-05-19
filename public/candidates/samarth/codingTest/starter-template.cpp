// ============================================================
//  Inverse of a Monotonic Function — Coding Exercise (C++11)
// ============================================================
//  Task
//    Implement g(y) so that for every input y, it returns the
//    non-negative integer x such that f(x) = y.
//
//  Rules
//    - You can ONLY CALL f(x). Treat f as a true black box.
//    - f is strictly monotonically increasing on non-negative
//      integers (i.e., for any a < b, f(a) < f(b)).
//    - You may assume that for every input y a valid x exists.
//    - You only need to fill in the body of g(y) below.
//
//  Sample input (already loaded in the Input box):
//
//      3
//      5
//      7
//      9
//      11
//      21
//      1003
//
//  Expected output once g is correctly implemented (the runner
//  self-checks each call via f(g(y)) == y):
//
//      g(3) = 0  ✓
//      g(5) = 1  ✓
//      g(7) = 2  ✓
//      g(9) = 3  ✓
//      g(11) = 4  ✓
//      g(21) = 9  ✓
//      g(1003) = 500  ✓
//      --------------------------------
//      Result: 7 / 7 correct
// ============================================================

#include <iostream>
#include <vector>
#include <string>

using namespace std;
using ll = long long;

// Forward declarations. Implementations are at the bottom.
ll f(ll x);
ll _mock_inverse(ll y);


// ============================================================
// 👇 ONLY EDIT THIS FUNCTION
// ============================================================
//
//  Given y, return the non-negative integer x such that f(x) = y.
//
ll g(ll y) {
    // TODO: implement. Return the integer x such that f(x) == y.
    //
    // You can call f(x) as a black box for any integer x, e.g.:
    //     ll probe  = f(0);       // what is f at 0?
    //     ll probe2 = f(1000);    // what is f at 1000?
    // Use such probes to search for the x that satisfies f(x) == y.
    //
    // The placeholder call below is intentionally wrong on most
    // inputs (you'll see a mix of ✓ and ✗) — replace it with your
    // real algorithm to get 7 / 7 correct.
    return _mock_inverse(y);
}
// ============================================================
// 👆 ONLY EDIT ABOVE  ·  Do NOT modify anything below
// ============================================================








































































ll f(ll x) {
    return 2 * x + 3;
}


ll _mock_inverse(ll y) {
    // Intentionally-wrong mock so the placeholder g() prints a mix
    // of ✓ and ✗ on the sample input. Not part of the real task.
    return y / 3;
}


int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    vector<ll> inputs;
    ll y;
    while (cin >> y) inputs.push_back(y);

    int correct = 0;
    for (ll yi : inputs) {
        ll xi = g(yi);
        if (f(xi) == yi) {
            cout << "g(" << yi << ") = " << xi << "  ✓\n";
            correct++;
        } else {
            cout << "g(" << yi << ") = " << xi << "  ✗\n";
        }
    }

    cout << string(32, '-') << '\n';
    cout << "Result: " << correct << " / " << inputs.size() << " correct\n";
    return 0;
}
