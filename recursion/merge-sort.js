#!/usr/bin/env node

function merge(firstHalf, secondHalf) {
  let p1 = 0; // position at firstHalf
  let p2 = 0; // position at secondHalf
  const result = [];

  while (p1 < firstHalf.length && p2 < secondHalf.length) {
    if (firstHalf[p1] < secondHalf[p2]) {
      result.push(firstHalf[p1]);
      p1++;
    } else {
      result.push(secondHalf[p2]);
      p2++;
    }
  }

  for (let i = p1; i < firstHalf.length; i++) result.push(firstHalf[i]);
  for (let i = p2; i < secondHalf.length; i++) result.push(secondHalf[i]);

  return result;
}

function mergeSort(array) {
  if (array.length < 2) return array;

  const firstHalf = mergeSort(array.slice(0, array.length / 2));
  const secondHalf = mergeSort(array.slice(array.length / 2));

  return merge(firstHalf, secondHalf);
}

// Examples
let array;

array = [];
console.log('Array:', array, '\nSorted Array:', mergeSort(array));

array = [73];
console.log('\nArray:', array, '\nSorted Array:', mergeSort(array));

array = [1, 2, 3, 4, 5];
console.log('\nArray:', array, '\nSorted Array:', mergeSort(array));

array = [3, 2, 1, 13, 8, 5, 0, 1];
console.log('\nArray:', array, '\nSorted Array:', mergeSort(array));

array = [105, 79, 100, 110];
console.log('\nArray:', array, '\nSorted Array:', mergeSort(array));
