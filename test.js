"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ava_1 = require("ava");
var _1 = require("./");
ava_1.test('it gives an array', function (t) {
    var fibs = _1.lazy([0, 1])(function (_) { return fibs[_ - 1] + fibs[_ - 2]; });
    t.is(fibs.length, 2);
});
ava_1.test('it lazy-computes values', function (t) {
    var fibs = _1.lazy([0, 1])(function (_) { return fibs[_ - 1] + fibs[_ - 2]; });
    t.is(fibs[10], 55);
});
ava_1.test('it lazy-computes values', function (t) {
    var fibs = _1.lazy([0, 1])(function (_) { return fibs[_ - 1] + fibs[_ - 2]; });
    t.is(fibs[10], 55);
    t.is(fibs.length, 11);
});
ava_1.test('it efficiently caches previous computations', function (t) {
    var calls = 0;
    var fibs = _1.lazy([0, 1])(function (_) {
        calls++;
        return fibs[_ - 1] + fibs[_ - 2];
    });
    fibs[10];
    t.is(calls, 9);
    fibs[10];
    t.is(calls, 9);
    fibs[11];
    t.is(calls, 10);
});
//# sourceMappingURL=test.js.map