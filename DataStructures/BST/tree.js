import Node from "./node";

function removeDuplicates (array) {
  if ( !(Array.isArray(array))) {
    throw new TypeError(`You must pass an array to this function, got ${typeof array}`);
  }

  return [...new Set(array)];
}


class Tree {
  /**
   * By default, the array on which the tree will be based upon is considered
   *   unsorted and containing duplicates. If you are sure your array is either
   *   sorted or has no duplicates, you can pass this information as arguments
   *   for the constructor, so that less operations are needed to create a BST.
   *   Use at your own risk: if the array is unsorted or has duplicates, doing so
   *   will distort the tree.
   * @param {*} array 
   * @param {*} unsorted 
   * @param {*} hasDuplicates 
   */
  constructor (array, unsorted=true, hasDuplicates=true) {
    if (hasDuplicates) array = removeDuplicates(array);
    if (unsorted     ) array = array.sort((a, b) => a - b);
    
    this.root = this.buildTree(array, 0, array.length - 1);
  }

  /**
   *  The Odin Project's pretty print
   *  FIX NEEDED!
   */
  prettyPrint (node=this.root, prefix="", isLeft=true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  }


  buildTree (array, start, end) { 
    if (start > end) {
      return null;
    }

    let mid = parseInt((start + end) / 2);
    
    let root   = new Node(array[mid]);
    root.left  = this.buildTree(array, start,   mid - 1);
    root.right = this.buildTree(array, mid + 1, end)

    return root;
  }

  insert (value) {
    let current = this.root;
    if (!current) {
      this.root = new Node(value);
      return;
    }

    let next;
    do {
      if (value === current.data) return;
      if (value  <  current.data) next = current.left;
      if (value  >  current.data) next = current.right;
      
      if (next) {
        current = next;
      } else {
        let node = new Node(value);
        value < current.data ? current.left = node : current.right = node;
      }
    } while (next);


  }


  delete (value) {

  }


  find (value) {

    // returns NODE
  }


  levelOrder () {

  }


  preorder () {


  }

  inorder () {


  }


  postorder () {

  }


  height () {

  }


  depth () {

  }

  
  isBalanced () {

  }


  rebalance () {

  }



}

export default Tree;