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

  insert (value, recursive=true) {
    if (this.root === null) {
      this.root = new Node(value);
      return;
    }

    return recursive
      ? this.#insertRecursively(this.root, value)
      : this.#insertIteratively(value);
  }


  #insertRecursively (root, value) {
    if (root.data === value) return this;

    let branch = value < root.data ? 'left' : 'right';
    
    if (root[branch]) {
      return this.#insertRecursively(root[branch], value);
    } else {
      root[branch] = new Node(value);
      return this;
    }
  }


  #insertIteratively (value) {
    let current = this.root;

    while (true) {
      if (value === current.data) break;
      
      let branch = value < current.data ? 'left' : 'right';
      
      if (current[branch]) {
        current = current[branch];
      } else {
        current[branch] = new Node(value);
        break;
      }
    }
    return this;
  }


  delete (value, root=this.root, parent=null) {
    if (root===null) return root;

    if (value === root.data) {
      
    } else {
      let branch = value < root.data ? 'left' : 'right';
      let parent = {
        root, branch
      }
      return this.delete(value, root[branch], parent);
    }
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