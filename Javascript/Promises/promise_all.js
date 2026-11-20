/**
 * Promise.all with real parallel HTTP requests
 * -------------------------------------------------------------
 * Fire several network requests at once and wait for all of them. Two
 * stages, each a Promise.all:
 *   1. Wait for all `fetch` calls (Response objects).
 *   2. Wait for all `response.json()` calls (parsed bodies).
 *
 * Doing them in parallel is far faster than awaiting each request in a
 * loop one after another.
 *
 * Requires network access and the node-fetch dependency:
 *   cd Javascript/Promises && npm install
 * Run: node Javascript/Promises/promise_all.js
 */

import fetch from 'node-fetch';

const apiCall = (id) =>
  fetch(`https://jsonplaceholder.typicode.com/todos/${id}`);

// ---- Demo ----------------------------------------------------
const requests = [];
for (let id = 1; id <= 10; id++) {
  requests.push(apiCall(id));
}

Promise.all(requests)
  .then((responses) => Promise.all(responses.map((res) => res.json())))
  .then((todos) => {
    todos.forEach((todo) => console.log(`#${todo.id}: ${todo.title}`));
  })
  .catch((error) => {
    console.error('Request failed:', error.message);
  });
