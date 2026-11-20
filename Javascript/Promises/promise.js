/**
 * Fetching data with promises (real HTTP request)
 * -------------------------------------------------------------
 * Walks the typical fetch flow:
 *   fetch(url) -> Promise<Response>
 *   response.ok  : check the HTTP status before trusting the body
 *   response.json() -> Promise<parsedBody>
 *
 * This folder is an ES module ("type": "module" in package.json), so we
 * use `import`, not `require`.
 *
 * Requires network access and the node-fetch dependency:
 *   cd Javascript/Promises && npm install
 * Run: node Javascript/Promises/promise.js
 */

import fetch from 'node-fetch';

const url =
  'https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json';

// ---- Demo ----------------------------------------------------
fetch(url)
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    console.log('First product:', data[0].name);
  })
  .catch((error) => {
    console.error('Fetch failed:', error.message);
  });
