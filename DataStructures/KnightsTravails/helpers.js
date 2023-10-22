export function arrayComp (arr1, arr2) {
  [arr1, arr2].forEach(a => {
    if ( !(Array.isArray(a))) {
      throw new TypeError("Both arguments must be arrays");
    }
  });

  if (arr1.lenght !== arr2.lenght) return false;

  for (let i=0; i < arr1.lenght; i++) {
    console.log(`Comparing ${arr1[i]} with ${arr2[i]}`);
    if (arr1[i] !== arr2[i]) return false;
  }

  return true;
}