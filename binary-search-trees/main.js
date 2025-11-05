import { BinarySearchTree } from './bst.js';

function appendNodeToString(node, string) {
  string += `${node.value} `;
  return string;
}

function printAllOrders(binarySearchTree) {
  let string = '';
  binarySearchTree.preOrderForEach((node) => {
    string = appendNodeToString(node, string);
  });
  console.log('\nPre-order:', string);

  string = '';
  binarySearchTree.inOrderForEach((node) => {
    string = appendNodeToString(node, string);
  });
  console.log('In-order:', string);

  string = '';
  binarySearchTree.postOrderForEach((node) => {
    string = appendNodeToString(node, string);
  });
  console.log('Post-order:', string);
}

let array = [];
for (let i = 0; i < 10; i++) {
  array.push(Math.floor(Math.random() * 100));
}

const bst = new BinarySearchTree(array);

console.log('Original tree:\n');
bst.prettyPrint();
console.log('\nBalanced tree?', bst.isBalanced());
printAllOrders(bst);
console.log('\n==========================================');

array = [];
for (let i = 0; i < 10; i++) {
  array.push(Math.floor(Math.random() * 100) + 100);
}

let string = '\nAdding the following values: ';
array.forEach((value) => {
  string += `${value} `;
  bst.insert(value);
});
console.log(string);

console.log('\nNew tree:\n');
bst.prettyPrint();
console.log('\nBalanced tree?', bst.isBalanced());
console.log('\n==========================================');

console.log('\nRebalancing tree...');
bst.rebalance();

console.log('\nNew tree (after balancing):\n');
bst.prettyPrint();
console.log('\nBalanced tree?', bst.isBalanced());
printAllOrders(bst);
