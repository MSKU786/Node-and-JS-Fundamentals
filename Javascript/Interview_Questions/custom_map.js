/**
 * Implement Array.prototype.map from scratch
 * -------------------------------------------------------------
 * `map` builds a NEW array by calling a callback on every element and
 * collecting the return values. The original array is not modified.
 *
 * Adding `myMap` to Array.prototype lets us call it like a built-in:
 * `arr.myMap(fn)`. Inside, `this` is the array the method was called on.
 *
 * (The real map also passes index and the whole array to the callback, so
 *  we forward those too: fn(element, index, array).)
 *
 * Run: node Javascript/Interview_Questions/custom_map.js
 */

Array.prototype.myMap = function (callback) {
  const result = [];
  for (let i = 0; i < this.length; i++) {
    result.push(callback(this[i], i, this));
  }
  return result;
};

// ---- Demo ----------------------------------------------------
const arr = [1, 3, 4, 56, 24, 22];

const builtIn = arr.map((n) => n + 2);
const custom = arr.myMap((n) => n + 2);

console.log('original:', arr); // unchanged
console.log('built-in map:', builtIn); // [ 3, 5, 6, 58, 26, 24 ]
console.log('myMap:', custom); // [ 3, 5, 6, 58, 26, 24 ]

// Callback also receives the index:
console.log([10, 20, 30].myMap((n, i) => `${i}:${n}`)); // [ '0:10', '1:20', '2:30' ]
