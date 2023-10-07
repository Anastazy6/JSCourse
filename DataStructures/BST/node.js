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

  set data (value) {
    this._data = value;
  }

  set left (nextNode) {
    this.#ensureValidNode(nextNode);
    this._left = nextNode;
  }

  set right (nextNode) {
    this.#ensureValidNode(nextNode);
    this._right = nextNode;
  }

  #ensureValidNode (nextNode) {
    if ( !(nextNode instanceof Node || nextNode === null) ) {
      throw new TypeError(
        "The next node must be an instance of the Node class or null"
      );
    }
  }
}

export default Node;