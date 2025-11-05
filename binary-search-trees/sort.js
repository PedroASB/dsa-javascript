function merge(firstHalf, secondHalf) {
  let p1 = 0;
  let p2 = 0;
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

export { mergeSort };
