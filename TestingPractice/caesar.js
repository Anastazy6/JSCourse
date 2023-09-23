const defaultKey = 'abcdefghijklmnopqrstuvwxyz'; // English alphabeth;

function caesar (plainText, offset, key=defaultKey) {
  let table = createTable(offset, key);

  let cipherText = [];

  plainText.split('').map(char => cipherText.push(encodeChar(char, table)));
  
  return cipherText.join('');
}

function createTable (offset, key) {
  let table = {};

  for (let i = 0; i < key.length; i++) {
    // Force lower case for case insensitivity of the key
    let plainChar   = key[i].toLowerCase();
    let cipherIndex = (i + offset) % key.length;
    let cipherChar  = key[cipherIndex].toLowerCase();

    if (plainChar in table) throw("Duplicate characters in key");

    table[plainChar] = cipherChar;
  }

 // console.log(table);
  return table;
}

function encodeChar (char, table) {
  return char in table
    ? table[char]
    : char.toLowerCase() in table
      ? table[char.toLowerCase()].toUpperCase()
      : char;
}

module.exports = { caesar, createTable };