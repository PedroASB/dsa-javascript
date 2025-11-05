/**
 * Solution to Knights Travails problem
 * The problem description is at knights-travails/description.txt
 */

// check if the position is valid on a 8x8 chess board
const isValidPosition = ([x, y]) => x >= 0 && x < 8 && y >= 0 && y < 8;

// check if two given positions are the same
const samePositions = ([x1, y1], [x2, y2]) => x1 === x2 && y1 === y2;

const X_AXIS = 0;
const Y_AXIS = 1;

// all possible steps for a knight
const step = [
  /* x-axis */ [-2, -1, 1, 2, 2, 1, -1, -2],
  /* y-axis */ [1, 2, 2, 1, -1, -2, -2, -1],
];

// create a string key from an array
const makeKey = (array) => JSON.stringify(array);

// auxiliar function for knightMoves
function printOutput(currentPosition, parents) {
  const reversePath = [];
  let movesCounter = -1;

  while (currentPosition !== null) {
    reversePath.push(currentPosition);
    currentPosition = parents.get(makeKey(currentPosition));
    movesCounter++;
  }

  console.log(`You made it in ${movesCounter} move(s). Here's your path:`);

  let pathString = `[${reversePath[reversePath.length - 1]}]`;
  for (let i = reversePath.length - 2; i >= 0; i--) {
    pathString += ` -> [${reversePath[i]}]`;
  }

  console.log(pathString);
}

// show the shortest possible way for a knight to get from one square to another
function knightMoves(startPosition, endPosition) {
  const queue = [];
  const visitedPositions = new Set();
  const parents = new Map();
  let currentPosition = startPosition;

  queue.push(currentPosition);
  visitedPositions.add(makeKey(currentPosition));
  parents.set(makeKey(currentPosition), null);

  while (queue.length > 0) {
    currentPosition = queue.shift();

    if (samePositions(currentPosition, endPosition)) {
      printOutput(currentPosition, parents);
      return;
    }

    for (let i = 0; i < 8; i++) {
      const x = currentPosition[X_AXIS] + step[X_AXIS][i];
      const y = currentPosition[Y_AXIS] + step[Y_AXIS][i];

      if (isValidPosition([x, y]) && !visitedPositions.has(makeKey([x, y]))) {
        queue.push([x, y]);
        visitedPositions.add(makeKey([x, y]));
        parents.set(makeKey([x, y]), currentPosition);
      }
    }
  }
}

// Examples
console.log('From [0, 0] to [1, 2]:');
knightMoves([0, 0], [1, 2]);

console.log('\nFrom [0, 0] to [3, 3]:');
knightMoves([0, 0], [3, 3]);

console.log('\nFrom [3, 3] to [0, 0]:');
knightMoves([3, 3], [0, 0]);

console.log('\nFrom [0, 0] to [7, 7]:');
knightMoves([0, 0], [7, 7]);
