class Node {
  constructor(key = null, value = null, nextNode = null) {
    this.key = key;
    this.value = value;
    this.nextNode = nextNode;
  }
}

class HashMap {
  /* This HashMap only handles keys of type string */
  #buckets;
  #length;
  #capacity;
  #loadFactor;

  constructor(capacity = 16, loadFactor = 0.75) {
    this.#capacity = capacity;
    this.#loadFactor = loadFactor;
    this.#buckets = new Array(capacity);
    this.#length = 0;
  }

  hash(key) {
    let hashCode = 0;
    const primeNumber = 23;

    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.#capacity;
    }

    return hashCode;
  }

  #rehash() {
    const entries = this.entries();

    this.#capacity *= 2;
    this.clear();

    for (const [key, value] of entries) {
      this.set(key, value);
    }
  }

  set(key, value) {
    const index = this.hash(key);

    if (index < 0 || index >= this.#buckets.length) {
      throw Error('Attempt to access index out of bounds');
    }

    let currentNode = this.#buckets[index];

    while (currentNode) {
      // if the node already exists, update it
      if (currentNode.key === key) {
        currentNode.value = value;
        return;
      }
      currentNode = currentNode.nextNode;
    }

    // prepending the node at buckets[index] list
    const newNode = new Node(key, value, this.#buckets[index] || null);
    this.#buckets[index] = newNode;
    this.#length++;

    if (this.#length > this.#capacity * this.#loadFactor) {
      this.#rehash();
    }
  }

  get(key) {
    const index = this.hash(key);

    if (index < 0 || index >= this.#buckets.length) {
      throw Error('Attempt to access index out of bounds');
    }

    let currentNode = this.#buckets[index];

    while (currentNode) {
      if (currentNode.key === key) {
        return currentNode.value;
      }
      currentNode = currentNode.nextNode;
    }

    return null;
  }

  has(key) {
    const index = this.hash(key);

    if (index < 0 || index >= this.#buckets.length) {
      throw Error('Attempt to access index out of bounds');
    }

    let currentNode = this.#buckets[index];

    while (currentNode) {
      if (currentNode.key === key) {
        return true;
      }
      currentNode = currentNode.nextNode;
    }

    return false;
  }

  remove(key) {
    const index = this.hash(key);

    if (index < 0 || index >= this.#buckets.length) {
      throw Error('Attempt to access index out of bounds');
    }

    let previousNode = null;
    let currentNode = this.#buckets[index];

    while (currentNode) {
      if (currentNode.key === key) {
        if (previousNode) {
          previousNode.nextNode = currentNode.nextNode;
        } else if (currentNode.nextNode) {
          if (currentNode.nextNode) this.#buckets[index] = currentNode.nextNode;
        } else {
          delete this.#buckets[index];
        }
        this.#length--;
        return true;
      }
      previousNode = currentNode;
      currentNode = currentNode.nextNode;
    }

    return false;
  }

  length() {
    return this.#length;
  }

  clear() {
    this.#buckets = new Array(this.#capacity);
    this.#length = 0;
  }

  keys() {
    const keys = [];

    for (const index in this.#buckets) {
      let currentNode = this.#buckets[index];
      while (currentNode) {
        keys.push(currentNode.key);
        currentNode = currentNode.nextNode;
      }
    }

    return keys;
  }

  values() {
    const values = [];

    for (const index in this.#buckets) {
      let currentNode = this.#buckets[index];
      while (currentNode) {
        values.push(currentNode.value);
        currentNode = currentNode.nextNode;
      }
    }

    return values;
  }

  entries() {
    const entries = [];

    for (const index in this.#buckets) {
      let currentNode = this.#buckets[index];
      while (currentNode) {
        entries.push([currentNode.key, currentNode.value]);
        currentNode = currentNode.nextNode;
      }
    }

    return entries;
  }

  toString() {
    let string = '';

    for (const index in this.#buckets) {
      string += `${index}: `;
      let currentNode = this.#buckets[index];

      while (currentNode) {
        string += `( '${currentNode.key}', ${currentNode.value} ) -> `;
        currentNode = currentNode.nextNode;
      }

      string += 'null\n';
    }

    return string;
  }
}

export default HashMap;
