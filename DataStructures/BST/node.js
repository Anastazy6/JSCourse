class Node {
  constructor (data=undefined, left=null, right=null) {
    this._data  = data;
    this._left  = left;
    this._right = right;
  }

  get data () {
    return this._data;
  }

  get left () {
    return this._left;
  }

  get right () {
    return this._right;
  }

  /**
   * Forces the Nodes' data property to be immutable
   */
  set data (_literallyWhateverBecauseDataIsGoingToBeImmutable) {
    throw new SyntaxError(
      "Changing the Node's data is imposibble in order to protect the sorted " +
      "nature of the Binary Search Tree"
    );
  }

  set left (nextNode) {
    this.#ensureValidNode(nextNode);
    this._left = nextNode;
  }

  set right (nextNode) {
    this.#ensureValidNode(nextNode);
    this._right = nextNode;
  }

  static isValidNode (node) {
    if ( !(node instanceof Node || node === null) ) {
      return false;
    }
    return true;
  }

  #ensureValidNode (node) {
    if ( !(Node.isValidNode(node))) {
      throw new TypeError(
        "The next node must be an instance of the Node class or null"
      );
    }
  }

  isLeaf () {
    if (this.left || this.right) return false;
    return true;
  }

  isDual () {
    if (this.left && this.right) return true;
    return false;
  }

  isSingle () {
    if (this.isLeaf() || this.isDual()) return false;
    return true;
  }

  get type () {
    return this.isLeaf()
      ? 'leaf'
      : this.isDual()
        ? 'dual'
        : 'single';
  }

  get onlyChild () {
    if ( !(this.isSingle()) ) return null;

    return this.left ? this.left : this.right;
  }

  get inorderSuccessor () {
    let successor = this.right;
    
    while (successor.left) {
      successor = successor.left;
    }

    return successor;
  }
}

export default Node;