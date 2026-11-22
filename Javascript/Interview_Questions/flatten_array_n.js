/**
 * Flatten a nested array up to depth n (without Array.prototype.flat)
 * -------------------------------------------------------------
 * Given a multi-dimensional array and a depth `n`, flatten sub-arrays only
 * while the current nesting depth is LESS than n. Elements in the top array
 * are at depth 0.
 *
 *   n = 0 -> array unchanged (nothing is below depth 0).
 *   n = 1 -> one level of sub-arrays merged in; deeper ones stay nested.
 *   n = 2 -> two levels merged; and so on.
 *
 * Example:
 *   flat([1, [2, [3, [4]]]], 2) -> [1, 2, 3, [4]]
 *
 * Three implementations below: recursive, iterative (stack), and a
 * fully-flatten helper via reduce.
 *
 * Run: node Javascript/Interview_Questions/flatten_array_n.js
 */

// ---- 1. Recursive --------------------------------------------
function flat(arr, n) {
  if (n === 0) return arr.slice(); // nothing to flatten at this depth
  const result = [];
  for (const item of arr) {
    if (Array.isArray(item)) {
      result.push(...flat(item, n - 1)); // flatten one level deeper
    } else {
      result.push(item);
    }
  }
  return result;
}

// ---- 2. Iterative (explicit stack, tracks remaining depth) ---
function flatIterative(arr, n) {
  const result = [];
  // Seed the stack with [value, remainingDepth] pairs, reversed so we pop
  // in original order.
  const stack = arr
    .slice()
    .reverse()
    .map((item) => [item, n]);

  while (stack.length) {
    const [item, depth] = stack.pop();
    if (Array.isArray(item) && depth > 0) {
      for (let i = item.length - 1; i >= 0; i--) {
        stack.push([item[i], depth - 1]);
      }
    } else {
      result.push(item);
    }
  }
  return result;
}

// ---- 3. Fully flatten (any depth) via reduce -----------------
function flatAll(arr) {
  return arr.reduce((acc, item) => {
    return acc.concat(Array.isArray(item) ? flatAll(item) : item);
  }, []);
}

// ---- Demo ----------------------------------------------------
const input = [1, 2, 3, [4, 5, 6], [7, 8, [9, 10, 11], 12], [13, 14, 15]];

console.log(flat(input, 0));
// [ 1, 2, 3, [4,5,6], [7,8,[9,10,11],12], [13,14,15] ]
console.log(flat(input, 1));
// [ 1, 2, 3, 4, 5, 6, 7, 8, [9,10,11], 12, 13, 14, 15 ]
console.log(flat(input, 2));
// [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15 ]

// Iterative gives the same results as the recursive version:
console.log(flatIterative(input, 1));
console.log(flatAll([1, [2, [3, [4, [5]]]]])); // [ 1, 2, 3, 4, 5 ]
