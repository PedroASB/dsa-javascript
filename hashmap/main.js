import HashMap from './hashmap.js';
import HashSet from './hashset.js';

const hashMap = new HashMap();
const hashSet = new HashSet();

hashMap.set('apple', 'red');
hashMap.set('banana', 'yellow');
hashMap.set('carrot', 'orange');
hashMap.set('dog', 'brown');
hashMap.set('elephant', 'gray');
hashMap.set('frog', 'green');
hashMap.set('grape', 'purple');
hashMap.set('hat', 'black');
hashMap.set('ice cream', 'white');
hashMap.set('jacket', 'blue');
hashMap.set('kite', 'pink');
hashMap.set('lion', 'golden');
hashMap.set('moon', 'silver');

hashSet.set('apple');
hashSet.set('banana');
hashSet.set('hat');
hashSet.set('ice cream');
hashSet.set('jacket');
hashSet.set('kite');
hashSet.set('lion');

console.log('\n====== HASH MAP ======');
console.log(hashMap.toString());
console.log('LENGTH:', hashMap.length(), '\n');

console.log('\n====== HASH SET ======');
console.log(hashSet.toString());
console.log('LENGTH:', hashSet.length(), '\n');

