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
    let current = this.root;

    while (current && current.getNext()) {
      current = current.getNext();
    }

    return current;
  }


  at (index) {
    if ( !Number.isInteger(index) ) {
      throw new TypeError("Index must be an integer");
    }


    // Since this implementation of the linked list uses nodes which only link
    //   to the next node, traversing the list backwards requires a more complex
    //   algorithm, which would be a waste of resources to use for traversing
    //   forwards
    return index > 0
      ? this.#atPositive(index)
      : this.#atNegative(index)
  }


  #atPositive (targetIndex) {
    let id = 0;
    let current = this.root;

    while (id < targetIndex) {
      if (current === null) return null;

      current = current.getNext();
      id++;
    }
    return current;
  }

  #atNegative (targetIndex) {


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