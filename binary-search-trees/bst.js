import { mergeSort } from './sort.js';

class Node {
  constructor(value = null, left = null, right = null) {
    this.value = value;
    this.left = left;
    this.right = right;
  }
}

class BinarySearchTree {
  constructor(array = []) {
    this.root = this.buildTree(array);
  }

  getBalancedTreeFromArray(array, start, end) {
    const mid = Math.floor((start + end) / 2);
    if (start > end) {
      return null;
    }
    const root = new Node(array[mid]);
    root.left = this.getBalancedTreeFromArray(array, start, mid - 1);
    root.right = this.getBalancedTreeFromArray(array, mid + 1, end);
    return root;
  }

  buildTree(array) {
    let sortedArray = mergeSort(array);

    // removing duplicates
    sortedArray = Array.from(new Set(sortedArray));

    return this.getBalancedTreeFromArray(sortedArray, 0, sortedArray.length - 1);
  }

  prettyPrint(node = this.root, prefix = '', isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.value}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
  }

  find(value) {
    let currentNode = this.root;
    while (currentNode !== null) {
      if (currentNode.value === value) return currentNode;
      else if (currentNode.value < value) currentNode = currentNode.right;
      else currentNode = currentNode.left;
    }
    return null;
  }

  // recursive find
  findRec(value, currentNode = this.root) {
    if (currentNode === null) return null;

    if (currentNode.value === value) {
      return currentNode;
    } else if (currentNode.value < value) {
      return this.findRec(value, currentNode.right);
    } else {
      return this.findRec(value, currentNode.left);
    }
  }

  insert(value) {
    if (this.root === null) {
      this.root = new Node(value);
      return;
    }

    let previousNode = this.root;

    while (previousNode !== null) {
      if (value > previousNode.value) {
        if (previousNode.right === null) {
          previousNode.right = new Node(value);
          return;
        }
        previousNode = previousNode.right;
      } else if (value < previousNode.value) {
        if (previousNode.left === null) {
          previousNode.left = new Node(value);
          return;
        }
        previousNode = previousNode.left;
      } else {
        return; // the value is already present in the tree
      }
    }
  }

  // recursive insertion
  insertRec(value, currentNode = this.root) {
    if (this.root === null) {
      this.root = new Node(value);
      return;
    }

    if (currentNode === null) {
      return new Node(value);
    }

    if (value > currentNode.value) {
      currentNode.right = this.insertRec(value, currentNode.right);
    } else if (value < currentNode.value) {
      currentNode.left = this.insertRec(value, currentNode.left);
    }

    return currentNode;
  }

  delete(value, currentNode = this.root) {
    if (currentNode === null) return null;

    if (currentNode.value < value) {
      currentNode.right = this.delete(value, currentNode.right);
    } else if (currentNode.value > value) {
      currentNode.left = this.delete(value, currentNode.left);
    } else {
      if (currentNode.left === null) {
        return currentNode.right;
      } else if (currentNode.right === null) {
        return currentNode.left;
      }

      // get the node with min value of the right subtree
      let tempNode = currentNode.right;
      while (tempNode.left !== null) tempNode = tempNode.left;

      currentNode.value = tempNode.value;
      currentNode.right = this.delete(currentNode.value, currentNode.right);
    }

    return currentNode;
  }

  levelOrderForEach(callback) {
    if (!callback) throw Error('Invalid or missing callback function.');
    if (this.root === null) return;

    const queue = [];
    let currentNode = this.root;
    queue.push(currentNode);

    while (queue.length > 0) {
      currentNode = queue.shift();
      callback(currentNode);
      if (currentNode.left !== null) queue.push(currentNode.left);
      if (currentNode.right !== null) queue.push(currentNode.right);
    }
  }

  preOrderForEach(callback, node = this.root) {
    if (!callback) throw Error('Invalid or missing callback function.');
    if (node !== null) {
      callback(node);
      this.preOrderForEach(callback, node.left);
      this.preOrderForEach(callback, node.right);
    }
  }

  inOrderForEach(callback, node = this.root) {
    if (!callback) throw Error('Invalid or missing callback function.');
    if (node !== null) {
      this.inOrderForEach(callback, node.left);
      callback(node);
      this.inOrderForEach(callback, node.right);
    }
  }

  postOrderForEach(callback, node = this.root) {
    if (!callback) throw Error('Invalid or missing callback function.');
    if (node !== null) {
      this.postOrderForEach(callback, node.left);
      this.postOrderForEach(callback, node.right);
      callback(node);
    }
  }

  #calculateHeight(node) {
    if (node === null) return -1;
    const leftSubtreeHeight = this.#calculateHeight(node.left);
    const rightSubtreeHeight = this.#calculateHeight(node.right);
    return 1 + Math.max(leftSubtreeHeight, rightSubtreeHeight);
  }

  height(value) {
    const node = this.find(value);
    if (node === null) return null;
    return this.#calculateHeight(node);
  }

  depth(value) {
    if (this.root === null) return null;

    const nodeParents = new Map();
    nodeParents.set(this.root.value, null);

    this.levelOrderForEach((node) => {
      if (node.left) nodeParents.set(node.left.value, node.value);
      if (node.right) nodeParents.set(node.right.value, node.value);
    });

    if (!nodeParents.has(value)) return null;

    let currentParent = nodeParents.get(value);
    let edges = 0;

    while (currentParent != null) {
      edges++;
      currentParent = nodeParents.get(currentParent);
    }

    return edges;
  }

  isBalanced(node = this.root) {
    if (node === null) return true;

    const leftSubtreeHeight = this.#calculateHeight(node.left);
    const rightSubtreeHeight = this.#calculateHeight(node.right);

    if (Math.abs(leftSubtreeHeight - rightSubtreeHeight) > 1) return false;

    return this.isBalanced(node.left) && this.isBalanced(node.right);
  }

  rebalance() {
    const treeValues = [];
    this.preOrderForEach((node) => {
      treeValues.push(node.value);
    });
    this.root = this.buildTree(treeValues);
  }
}

export { BinarySearchTree };
