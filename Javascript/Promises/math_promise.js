/**
 * Promise chaining
 * -------------------------------------------------------------
 * Each `.then()` returns a new promise, so you can chain steps. Whatever a
 * `.then` callback returns becomes the input to the next `.then` — even if
 * that callback returns a promise (it gets unwrapped automatically).
 *
 * Pipeline below:  5  --double-->  10  --addTen-->  20  --x3-->  60
 *
 * Run: node Javascript/Promises/math_promise.js
 */

const double = (val) => Promise.resolve(val * 2);
const addTen = (val) => Promise.resolve(val + 10);
const multiplyByThree = (val) => Promise.resolve(val * 3);

// ---- Demo ----------------------------------------------------
const value = 5;

double(value)
  .then(addTen) // 10 -> 20
  .then(multiplyByThree) // 20 -> 60
  .then((result) => console.log('Result:', result)); // Result: 60
