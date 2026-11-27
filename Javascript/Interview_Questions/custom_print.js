/**
 * get(obj, path, defaultValue) — safe nested property access
 * -------------------------------------------------------------
 * A mini version of lodash's `_.get`. Reads a deeply nested value using a
 * string path, returning `defaultValue` if any step along the way is
 * missing — so you never hit "Cannot read properties of undefined".
 *
 * Paths are relative to `obj` and may mix dot and bracket notation:
 *   'a.b.c'          dot notation
 *   "a['b'].c"       bracket notation with quotes
 *   'a[0].b'         numeric index
 *
 * Note: an earlier version tried to strip a leading variable name (e.g.
 * "obj.") with a regex, but that can't be told apart from a real first key
 * like "subjects.", so it silently dropped valid keys. Paths here are
 * simply relative to the object, which removes the ambiguity.
 *
 * Run: node Javascript/Interview_Questions/custom_print.js
 */

function get(root, path, defaultValue) {
  if (typeof path !== 'string') return defaultValue;

  const keys = path
    // ["a"] or ['a'] or [0]  ->  .a / .0
    .replace(/\[(?:'([^']*)'|"([^"]*)"|([^'"\]]+))\]/g, '.$1$2$3')
    .replace(/^\./, '') // drop a leading dot
    .split('.')
    .filter(Boolean);

  let result = root;
  for (const key of keys) {
    if (result == null) return defaultValue; // missing step -> default
    result = result[key];
  }
  return result === undefined ? defaultValue : result;
}

// ---- Demo ----------------------------------------------------
const obj = {
  name: 'Manish',
  phoneNumber: '+914422342',
  address: { flat: '2323', zipcode: 222342, houseNumber: '12/22' },
  subjects: {
    branch: 'CSE',
    core: { computer_network: 23, data_structure_algo: 40 },
  },
};

console.log(get(obj, 'subjects.core.data_structure_algo', null)); // 40
console.log(get(obj, "address['flat']", null)); // '2323'
console.log(get(obj, 'subjects.branch', null)); // 'CSE'
console.log(get(obj, 'does.not.exist', 'default')); // 'default'
