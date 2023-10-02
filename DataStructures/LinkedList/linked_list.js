import Node from "./node";


class LinkedList {
  constructor (rootNode=null) {
    if ( !Node.isValidAsNextNode(rootNode)) {
      rootNode = new Node(rootNode, null);
    }
    this.root = rootNode;
  }

  append (value) {
    let finalNode = new Node(value, null);

    if (this.root === null) {
      this.root = finalNode;
      return;
    }

    let currentNode = this.root;
    while (currentNode.getNext() !== null) {
      currentNode = currentNode.getNext();
    }
    currentNode.setNext(finalNode);  
  }

  prepend (value) {
  
  }

  size () {

  }

  head () {
    return this.root;
  }

  tail () {

  }

  at (index) {

  }

  pop () {

  }

  contains (value) {

  }

  find (value) {

  }

  toString () {

  }

  // Extra stuff (TODO if I'm feeling ambitious)

  insertAt (value, index) {

  }

  deleteAt (index) {

  }
}

export default LinkedList;