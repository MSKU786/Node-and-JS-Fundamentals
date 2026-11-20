/**
 * Building a Promise that resolves or rejects (50/50)
 * -------------------------------------------------------------
 * Shows the Promise constructor: you get `resolve` and `reject` and call
 * exactly one of them (usually after some async work). Consumers then
 * handle the two outcomes with `.then()` and `.catch()`.
 *
 * This one flips a coin after a short delay: roughly half the runs resolve
 * and half reject — run it a few times to see both paths.
 *
 * Run: node Javascript/Promises/fifty_fifty_promise.js
 */

const fiftyFifty = new Promise((resolve, reject) => {
  const random = Math.random();
  setTimeout(() => {
    if (random > 0.5) {
      resolve(`Success (rolled ${random.toFixed(2)})`);
    } else {
      reject(new Error(`Failure (rolled ${random.toFixed(2)})`));
    }
  }, 500);
});

// ---- Demo ----------------------------------------------------
fiftyFifty
  .then((result) => console.log('Resolved:', result))
  .catch((error) => console.error('Rejected:', error.message));
