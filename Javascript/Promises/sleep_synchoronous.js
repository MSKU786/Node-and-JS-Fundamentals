/**
 * sleep() with async/await
 * -------------------------------------------------------------
 * There is no built-in `sleep` in JavaScript. The idiomatic way to pause
 * inside an async function is to `await` a promise that resolves via
 * setTimeout. This does NOT block the thread — the event loop is free to
 * do other work while we wait.
 *
 * Run: node Javascript/Promises/sleep_synchoronous.js
 */

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// ---- Demo ----------------------------------------------------
async function main() {
  console.log('1');
  await sleep(1000); // pause ~1s without blocking the event loop
  console.log('2 (after ~1s)');
}

main();
