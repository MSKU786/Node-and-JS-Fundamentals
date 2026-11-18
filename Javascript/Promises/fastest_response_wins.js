/**
 * Promise.race — fastest settled promise wins
 * -------------------------------------------------------------
 * Promise.race(iterable) settles as soon as the FIRST promise settles
 * (resolves OR rejects), with that promise's value/reason. The others
 * keep running but their results are ignored.
 *
 * Here three "requests" finish after different delays, so the one with the
 * smallest delay wins the race.
 *
 * Run: node Javascript/Promises/fastest_response_wins.js
 */

const fetchSimulator = (url, delay) => {
  return new Promise((resolve) =>
    setTimeout(() => resolve(`Data from ${url} (after ${delay}ms)`), delay)
  );
};

const delays = [800, 120, 100]; // the 100ms request should win

// ---- Demo ----------------------------------------------------
Promise.race(
  delays.map((delay, i) => fetchSimulator(`https://example.com/${i}`, delay))
).then((winner) => {
  console.log('Winner:', winner);
  // Winner: Data from https://example.com/2 (after 100ms)
});
