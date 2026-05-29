// ============================================================
//  Inverse of a Monotonic Function · C++11
//  Problem statement is on the left. Only edit g(y) below.
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
ll g(ll y) {
    // TODO: return x such that f(x) == y. You may call f(x) freely.
    return _mock_inverse(y);  // placeholder — replace with your code
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
