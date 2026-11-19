/**
 * Promise.all — run work in parallel, wait for everything
 * -------------------------------------------------------------
 * Promise.all(iterable) resolves once EVERY promise has resolved, giving
 * an array of results in the SAME order as the input (regardless of which
 * finished first). If any one promise rejects, Promise.all rejects
 * immediately with that reason.
 *
 * The simulated fetches below start together (in parallel), so the total
 * wait is roughly the single slowest delay, not the sum of all delays.
 *
 * Run: node Javascript/Promises/fetch_data_parallel.js
 */

const fetchSimulator = (url, delay) => {
  return new Promise((resolve) =>
    setTimeout(() => resolve(`Data from ${url}`), delay)
  );
};

const delays = [800, 1200, 500];

// ---- Demo ----------------------------------------------------
console.time('total');
Promise.all(
  delays.map((delay, i) => fetchSimulator(`url-${i}`, delay))
).then((results) => {
  console.log(results);
  // [ 'Data from url-0', 'Data from url-1', 'Data from url-2' ]
  console.timeEnd('total'); // ~1200ms (the slowest), not 2500ms
});
