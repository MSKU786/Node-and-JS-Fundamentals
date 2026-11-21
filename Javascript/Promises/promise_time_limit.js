/**
 * Time-limit an async function
 * -------------------------------------------------------------
 * Problem (LeetCode 2637): given an async function `fn` and a timeout `t`,
 * return a wrapped version that:
 *   - resolves with fn's result if fn finishes within t ms, otherwise
 *   - rejects with "Time Limit Exceeded".
 *
 * Technique: race fn's promise against a setTimeout that rejects. Whichever
 * settles first wins; always clear the timer so it cannot fire late.
 *
 * Run: node Javascript/Promises/promise_time_limit.js
 */

const timeLimit = function (fn, t) {
  return async function (...args) {
    return new Promise((resolve, reject) => {
      const timeoutId = setTimeout(() => {
        reject('Time Limit Exceeded');
      }, t);

      fn(...args)
        .then(resolve)
        .catch(reject)
        .finally(() => clearTimeout(timeoutId));
    });
  };
};

// ---- Demo ----------------------------------------------------
// A task that takes `ms` and then resolves with a message.
const slowTask = (ms) =>
  new Promise((resolve) => setTimeout(() => resolve(`done in ${ms}ms`), ms));

const limited = timeLimit(slowTask, 200);

// Finishes in time (100ms < 200ms limit) -> resolves.
limited(100)
  .then((res) => console.log('resolved:', res)) // resolved: done in 100ms
  .catch((err) => console.log('rejected:', err));

// Too slow (400ms > 200ms limit) -> rejects.
limited(400)
  .then((res) => console.log('resolved:', res))
  .catch((err) => console.log('rejected:', err)); // rejected: Time Limit Exceeded
