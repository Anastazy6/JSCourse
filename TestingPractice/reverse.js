function reverse(string) {
  let result = [];

  for (let i = string.length - 1; i >= 0; i--) {
    result.push(string[i]);
  }

  return result.join('');
}

module.exports = reverse;