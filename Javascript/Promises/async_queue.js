/**
 * Async Task Queue with a Concurrency Limit
 * -------------------------------------------------------------
 * A common interview problem: run many async tasks but never allow more
 * than N of them in flight at once (e.g. to avoid hammering an API).
 *
 * How it works:
 *   - enqueue(task) stores a task (a function returning a promise) and
 *     tries to start work.
 *   - runNext() starts tasks only while runningTasks < concurrencyLimit.
 *   - When a task settles, it frees a slot and pulls the next task in.
 *
 * Run: node Javascript/Promises/async_queue.js
 */

class AsyncQueue {
  constructor(concurrencyLimit) {
    this.tasks = [];
    this.runningTasks = 0;
    this.concurrencyLimit = concurrencyLimit;
  }

  // Add a task (a `() => Promise`) and try to run it.
  enqueue(task) {
    this.tasks.push(task);
    this.runNext();
  }

  // Start tasks while there is both a free slot and work waiting.
  runNext() {
    while (this.runningTasks < this.concurrencyLimit && this.tasks.length) {
      const task = this.tasks.shift();
      this.runningTasks++;

      // `finally` frees the slot whether the task resolves or rejects.
      Promise.resolve(task()).finally(() => {
        this.runningTasks--;
        this.runNext();
      });
    }
  }
}

// ---- Demo ----------------------------------------------------
// Limit of 2: at most two tasks run at the same time.
const queue = new AsyncQueue(2);

const createTask = (id, duration) => {
  return () =>
    new Promise((resolve) => {
      console.log(`  start  task ${id} (${duration}ms)`);
      setTimeout(() => {
        console.log(`  finish task ${id}`);
        resolve(id);
      }, duration);
    });
};

for (let i = 1; i <= 5; i++) {
  queue.enqueue(createTask(i, i * 200));
}
// Expected: tasks 1 & 2 start together; each time one finishes the next
// (3, then 4, then 5) starts, never more than 2 running at once.
