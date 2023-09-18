function mergeSort (array) {
  if (array.length < 2) return array;

  let middle = parseInt(array.length / 2);
  let left   = array.slice(0, middle);
  let right  = array.slice(middle);

  console.log(left, right);

  return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {
  let leftPointer  = 0;
  let rightPointer = 0;

  const merged = [];

  // The two groups of function expressions are to reduce the complexity
  //   of the while loop used for merging by providing 2 layers of abstraction
  // Group: check if there's still work to do
  const leftIsInProgress       = () => leftPointer < left.length;
  const rightIsInProgress      = () => rightPointer < right.length;
  const unmergedElementsRemain = () => leftIsInProgress() || rightIsInProgress();

  // Group: check whether the left item or the right item go into the merged array
  const leftIsLessThanRight    = () => left[leftPointer] < right[rightPointer];
  const onlyLeftRemains        = () => !!left[leftPointer] && !right[rightPointer];
  const leftGoesIntoTheArray   = () => leftIsLessThanRight() || onlyLeftRemains();

  while (unmergedElementsRemain()) {
    if (leftGoesIntoTheArray()) {
      merged.push(left[leftPointer]);
      leftPointer++;
    } else {
      merged.push(right[rightPointer]);
      rightPointer++;
    }
  }

  return merged;
}

module.exports = mergeSort;