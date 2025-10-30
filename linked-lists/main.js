import LinkedList from './linked-list.js';

const list = new LinkedList();

list.append('dog');
list.append('cat');
list.append('parrot');
list.append('hamster');
list.append('snake');
list.append('turtle');

console.log(list.toString());
console.log('SIZE:', list.getSize());
console.log('HEAD:', list.getHead().value);
console.log('TAIL:', list.getTail().value);
console.log();

list.prepend('C');
list.prepend('B');
list.prepend('A');
list.append('Y');
list.append('Z');
list.insertAt('X', 5);
list.removeFirst();
list.removeLast();
list.removeAt(3);
console.log(list.contains('X'));
console.log(list.find('snake'));

console.log();
console.log(list.toString());
console.log('SIZE:', list.getSize());
console.log('HEAD:', list.getHead().value);
console.log('TAIL:', list.getTail().value);
