import Node from "./node";


class LinkedList {
  constructor (rootNode=null) {
    if ( !Node.isValidNode(rootNode)) {
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


  at (index, recursive=false) {
    if ( !Number.isInteger(index) ) {
      throw new TypeError("Index must be an integer");
    }


    // Since this implementation of the linked list uses nodes which only link
    //   to the next node, traversing the list backwards requires a more complex
    //   algorithm, which would be a waste of resources to use for traversing
    //   forwards
    return index >= 0
      ? this.#atPositive(index)
      : this.#atNegative(index, recursive)
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

  #atNegative (index, recursive) {
    return recursive
      ? this.#atNegativeRecursively(index)
      : this.#atNegativeIteratively(index)
  }


  /**
   * Has to traverse the entire list to calculate its size (O(n) operations)
   *   and then in the worst case has to traverse the entire list again, so
   *   it's time complexity is at worst 2n (n is the list's size), which is O(n)
   *   At least it uses constant memory.
   * A faster iterative algorithm would be possible if the list had its size
   *   stored in a property variable or the nodes had pointers both to the next
   *   and the previous one
   * All it does it's actually converting the negative index to positive index
   *   with the help of the list's size property and then following the algorithm
   *   for the positive index traversal. Simple.
   * @param {*} negativeIndex 
   * @returns 
   */
  #atNegativeIteratively (negativeIndex) {
    let length = this.size();
    let positiveIndex = length + negativeIndex;

    // May occur if the absolute of the negative index is larger than the list's size
    //   i.e. it tries to find a node starting from the list's tail but it goes
    //   past the list's head
    if (positiveIndex < 0) return null;

    return this.at(positiveIndex);
  }


  /**
   * Pretty meh as it still has to go to the entire linked list (using more stack
   * memory for the recursive invocations) and then has to go back its entire call
   * stack checking a crapton of stuff (the closer to the head the targeted node is,
   * the more stuff to check). But I wanted to do this recursively anyway...
   */
  #atNegativeRecursively (negativeIndex, node=this.root) {
    if (node === null ) return -1;

    // Can be negative index of the currently visited node or the expected node
    //   if it's found. Don't ask, but it works according to the tests...
    let result = this.#atNegativeRecursively(negativeIndex, node.getNext());
    
    if (Node.isValidNode(result)) return result; // Target already found
    if (result === negativeIndex) return node;   // Target just found
    if (node === this.root)       return null;   // Target not found and root reached
    return result -1;                            // Go back one step
  }


  pop () {
    let prev    = null;
    let current = this.root;
    
    while (current && current.getNext()) {
      prev    = current;
      current = current.getNext();
    }

    if (prev) {
      prev.setNext(null);
    } else {
      this.root = null;
    }

    return current;
  }


  contains (value) {
    let current = this.root;

    while (current) {
      if (current.getValue() === value) return true;
      current = current.getNext();
    }

    return false;
  }


  find (value) {
    let index = 0;
    let current = this.root;

    while (current) {
      if (current.getValue() === value) return index;
      current = current.getNext();
      index++;
    }

    return null;
  }


  toString () {
    let result  = "";
    let current = this.root;

    while (current) {
      result += `( ${current.getValue()} ) -> `;
      current = current.getNext();
    }
    return result + 'null';
  }


  // Extra stuff (TODO if I'm feeling ambitious)

  insertAt (value, index) {

  }


  deleteAt (index) {

  }
}

export default LinkedList;