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
      return this;
    }

    let currentNode = this.root;

    while (currentNode.getNext() !== null) {
      currentNode = currentNode.getNext();
    }

    currentNode.setNext(finalNode);  
    return this;
  }


  prepend (value) {
    let newRoot = new Node(value, this.root);
    this.root = newRoot;

    return this;
  }


  size () {
    if (this.root === null) return 0;

    let nodes = 0;
    let current = this.root;

    while (current) {
      nodes++;
      current = current.getNext();
    }

    return nodes;
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