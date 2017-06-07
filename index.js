"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Returns an array that look just like a regular JavaScript array, but is computed lazily.
 *
 * @param array Initial value
 * @param fn Function that takes a numerical index, and returns a value
 */
function lazy(array) {
    return function (fn) {
        var processed = {};
        for (var n = 0; n < array.length; n++) {
            processed[n] = true;
        }
        return new Proxy(array, {
            deleteProperty: function (_, n) {
                return delete processed[n];
            },
            get: function (array, key) {
                var _key = +key;
                if (typeof key === 'string' && !Number.isNaN(_key)) {
                    if (!(key in processed)) {
                        array[_key] = fn(_key);
                        processed[key] = true;
                    }
                    return array[_key];
                }
                return array[key];
            },
            has: function (_, key) {
                return key in processed;
            },
            set: function () {
                return false;
            }
        });
    };
}
exports.lazy = lazy;
//# sourceMappingURL=index.js.map