/**
 * LRU (Least Recently Used) Cache
 * -------------------------------------------------------------
 * get(key)        -> value, or -1 if absent. Marks the key most-recent.
 * put(key, value) -> insert/update. When over capacity, evict the
 *                    LEAST recently used entry.
 *
 * Both operations are O(1) using:
 *   - a Map for key -> node lookup, and
 *   - a doubly linked list ordered by recency, with dummy head/tail.
 *     Most recently used sits next to `head`; least recently used sits
 *     next to `tail`, so eviction is always `tail.prev`.
 *
 * Run: node Javascript/Interview_Questions/LRU_Cache.js
 */

class Node {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.next = null;
    this.prev = null;
  }
}

class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map();

    // Dummy head and tail so insert/remove never deal with null edges.
    this.head = new Node(-1, -1);
    this.tail = new Node(-1, -1);
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }

  // Unlink a node from the list.
  remove(node) {
    node.prev.next = node.next;
    node.next.prev = node.prev;
  }

  // Insert a node right after head (marks it most recently used).
  add(node) {
    const first = this.head.next;
    this.head.next = node;
    node.prev = this.head;
    node.next = first;
    first.prev = node;
  }

  get(key) {
    if (!this.cache.has(key)) return -1;

    // Touch: move the node to the front (most recently used).
    const node = this.cache.get(key);
    this.remove(node);
    this.add(node);
    return node.value;
  }

  put(key, value) {
    // If it already exists, drop the old node first.
    if (this.cache.has(key)) {
      this.remove(this.cache.get(key));
      this.cache.delete(key);
    }

    // If full, evict the least recently used node (the one before tail).
    // BUG FIX: previously used `this.cache.size()` (size is a property, not
    // a method) and the condition `size < capacity`, which never evicted.
    if (this.cache.size >= this.capacity) {
      const lru = this.tail.prev;
      this.remove(lru);
      this.cache.delete(lru.key);
    }

    const node = new Node(key, value);
    this.add(node);
    this.cache.set(key, node);
  }
}

// ---- Demo ----------------------------------------------------
const cache = new LRUCache(2);

cache.put(1, 1);
cache.put(2, 2);
console.log(cache.get(1)); // 1  (1 is now most-recently used)
cache.put(3, 3); // capacity full -> evicts key 2 (least recent)
console.log(cache.get(2)); // -1 (evicted)
cache.put(4, 4); // evicts key 1
console.log(cache.get(1)); // -1 (evicted)
console.log(cache.get(3)); // 3
console.log(cache.get(4)); // 4
