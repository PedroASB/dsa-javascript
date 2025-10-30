class Node {
  constructor(value = null, nextNode = null) {
    this.value = value;
    this.nextNode = nextNode;
  }
}

class LinkedList {
  #size = 0;
  #head = null;
  #tail = null;

  getSize() {
    return this.#size;
  }

  getHead() {
    return this.#head;
  }

  getTail() {
    return this.#tail;
  }

  at(index) {
    if (index < 0 || index >= this.#size) {
      return null;
    }
    let currentNode = this.#head;
    while (index--) {
      currentNode = currentNode.nextNode;
    }
    return currentNode;
  }

  append(value) {
    if (this.#size === 0) {
      this.#head = this.#tail = new Node(value);
    } else {
      this.#tail.nextNode = new Node(value);
      this.#tail = this.#tail.nextNode;
    }
    this.#size++;
  }

  prepend(value) {
    if (this.#size === 0) {
      this.#head = this.#tail = new Node(value);
    } else {
      const newNode = new Node(value);
      newNode.nextNode = this.#head;
      this.#head = newNode;
    }
    this.#size++;
  }

  contains(value) {
    let currentNode = this.#head;
    while (currentNode !== null) {
      if (currentNode.value === value) return true;
      currentNode = currentNode.nextNode;
    }
    return false;
  }

  find(value) {
    let currentNode = this.#head;
    for (let index = 0; currentNode !== null; index++) {
      if (currentNode.value === value) return index;
      currentNode = currentNode.nextNode;
    }
    return null;
  }

  insertAt(value, index) {
    // if the list is empty, the index doesn't matter
    if (this.#size === 0) {
      this.#head = this.#tail = new Node(value);
      this.#size++;
      return;
    }
    if (index < 0 || index > this.#size) {
      return;
    }
    if (index === 0) {
      this.prepend(value);
      return;
    }
    if (index === this.#size) {
      this.append(value);
      return;
    }

    const newNode = new Node(value);
    const previousNode = this.at(index - 1);
    newNode.nextNode = previousNode.nextNode;
    previousNode.nextNode = newNode;
    this.#size++;
  }

  removeFirst() {
    if (this.#size === 0) return;
    if (this.#size === 1) {
      this.#head = this.#tail = null;
    } else {
      this.#head = this.#head.nextNode;
    }
    this.#size--;
  }

  removeLast() {
    if (this.#size === 0) return;
    if (this.#size === 1) {
      this.#head = this.#tail = null;
    } else {
      const penultimateNode = this.at(this.#size - 2);
      penultimateNode.nextNode = null;
      this.#tail = penultimateNode;
    }
    this.#size--;
  }

  removeAt(index) {
    if (this.#size === 0 || index < 0 || index >= this.#size) return;
    if (index === 0) {
      this.removeFirst();
      return;
    }
    if (index === this.#size - 1) {
      this.removeLast();
      return;
    }
    const previousNode = this.at(index - 1);
    const currentNode = previousNode.nextNode;
    previousNode.nextNode = currentNode.nextNode;
    if (previousNode.nextNode === null) this.#tail = previousNode;
    this.#size--;
  }

  clear() {
    this.#head = this.#tail = null;
    this.#size = 0;
  }

  toString() {
    let currentNode = this.#head;
    let string = '';
    while (currentNode !== null) {
      string += `( ${currentNode.value} ) -> `;
      currentNode = currentNode.nextNode;
    }
    string += 'null';
    return string;
  }
}

export default LinkedList;
