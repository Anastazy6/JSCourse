class Node {
  constructor (value=undefined, next=null) {
    Node.#assertValidNextNode(next);
    this.value = value;
    this.next  = next;
  }


  static isValidNode (nextNode) {
    if (nextNode instanceof Node || nextNode === null) {
      return true;
    }
    return false;
  }


  static #assertValidNextNode (nextNode) {
    if ( !Node.isValidNode(nextNode)) {
      throw new TypeError("Next node property must be another Node or null");
    }
  }


  setValue(newValue) {
    this.value = newValue;
  } 


  setNext(nextNode) {
    Node.#assertValidNextNode(nextNode);
    this.next = nextNode;
  }

  getValue = () => this.value;
  getNext  = () => this.next;
}

export default Node;