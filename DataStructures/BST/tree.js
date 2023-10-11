import Node from "./node";

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
    if (hasDuplicates) array = Array.from(new Set(array));
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