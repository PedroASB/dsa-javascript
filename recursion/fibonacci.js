#!/usr/bin/env node

/**
 * Returns the nth number from the Fibonacci sequence (starting from 0)
 * (Iterative function)
 */
function fibs(number) {
  let current = 0;
  let next = 1;

  while (number--) {
    // [current, next] = [next, current + next];
    next = current + (current = next);
  }

  return current;
}

/**
 * Returns the nth number from the Fibonacci sequence (starting from 0)
 * (Recursive function)
 */
function fibsRec(number) {
  // this prevents stack overflow from negative inputs
  if (number < 2) return number;
  return fibsRec(number - 1) + fibsRec(number - 2);
}

/**
 * Takes a number and returns an array containing that many numbers from the Fibonacci sequence
 * (Iterative function)
 */
function fibsArray(number) {
  if (number < 1) return [];
  if (number === 1) return [0];

  const array = [0, 1];

  while (number-- > 2) {
    array.push(array[array.length - 1] + array[array.length - 2]);
  }

  return array;
}

/**
 * Takes a number and returns an array containing that many numbers from the Fibonacci sequence
 * (Recursive function)
 */
function fibsArrayRec(number) {
  if (number < 1) return [];
  if (number === 1) return [0];
  if (number === 2) return [0, 1];

  const array = fibsArrayRec(number - 1);

  return [...array, array[number - 2] + array[number - 3]];
}

// Examples
console.log('Fibonacci (Iterative):', fibs(8));
console.log('Fibonacci (Recursive):', fibsRec(8));
console.log('Fibonacci Array (Iterative):', fibsArray(8));
console.log('Fibonacci Array (Recursive):', fibsArrayRec(8));
