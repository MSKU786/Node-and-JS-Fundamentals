/**
 * Compact Object — remove falsy values (deeply)
 * -------------------------------------------------------------
 * Given an object or array (valid JSON), return a copy with every key whose
 * value is falsy removed. Applies recursively to nested objects/arrays.
 * Arrays are treated as objects whose keys are indices, so falsy elements
 * are dropped and the array is re-packed.
 *
 * A value is falsy when Boolean(value) === false:
 *   false, 0, '', null, undefined, NaN.
 *
 * Example:
 *   compactObject([null, 0, 5, [0], [false, 16]]) -> [5, [], [16]]
 *
 * Run: node Javascript/Interview_Questions/compact_object.js
 */

function compactObject(obj) {
  // Primitives (and null/undefined): return as-is. A falsy primitive gets
  // filtered out by its PARENT, not here.
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  // Arrays: compact each element, then drop the falsy ones.
  if (Array.isArray(obj)) {
    return obj.map(compactObject).filter(Boolean);
  }

  // Plain objects: compact each value, keep only truthy results.
  const result = {};
  for (const [key, value] of Object.entries(obj)) {
    const compacted = compactObject(value);
    if (compacted) {
      result[key] = compacted;
    }
  }
  return result;
}

// ---- Demo ----------------------------------------------------
console.log(compactObject([null, 0, false, 1])); // [ 1 ]
console.log(compactObject({ a: null, b: [false, 1] })); // { b: [ 1 ] }
console.log(compactObject([null, 0, 5, [0], [false, 16]])); // [ 5, [], [ 16 ] ]
