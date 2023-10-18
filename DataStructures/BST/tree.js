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

    // Node to delete found
    if (value === root.data) {
      switch (root.type) {
        case 'leaf':
          return this.#deleteLeaf(root, parent);
        case 'single':
          return this.#deleteSingle(root, parent);
        case 'dual':
          return this.#deleteDual(root, parent);
        default:
          throw new TypeError(`Invalid node type: ${root.type}`);
      }
      
    // Recursively look for the node
    } else {
      let branch = value < root.data ? 'left' : 'right';
      let parent = {
        root, branch
      }
      return this.delete(value, root[branch], parent);
    }
  }


  #deleteLeaf (node, parent) {
    // Normal case: deleting a leaf in a multi-node Tree
    if (parent) {
      parent.root[parent.branch] = null
    // Deleting the Tree's root when it's the only element
    } else {
      this.root = null;
    }
    return node;
  }


  #deleteSingle (node, parent) {
    // Normal case: the node is not the Tree's root
    if (parent) {
      parent.root[parent.branch] = node.onlyChild;
    // Deleting the Tree's root when it has only 1 child
    } else {
      this.root = this.delete(node.onlyChild.data);
    }
    return node;
  }


  #deleteDual (node, parent) {
    let savedNode = new Node(node.data, node.left, node.right);

    let inorderSuccessorValue = node.inorderSuccessor.data;
    this.delete(inorderSuccessorValue);
    
    if (parent) {
      parent.root[parent.branch].data = inorderSuccessorValue;
    } else {
      this.root.data = inorderSuccessorValue;
    }
    
    return savedNode;
  }


  find (value, root = this.root) {
    if (root === null) return null;

    if (value  <  root.data) return this.find(value, root.left);
    if (value  >  root.data) return this.find(value, root.right);

    return root;
  }


  levelOrder (callback=null) {
    const values = [];
    const queue  = [];
    if (this.root) queue.push(this.root);

    while (queue.length > 0) {
      if (queue[0].left ) queue.push(queue[0].left );
      if (queue[0].right) queue.push(queue[0].right);

      values.push(queue.shift().data);
    }

    return callback
      ? values.map(node => callback(node))
      : values;
  }


  preorder (callback=null) {
    return Tree.#anyorder(callback, 'preorder', this.root);
  }

  inorder (callback=null) {
    return Tree.#anyorder(callback, 'inorder', this.root);
  }


  postorder (callback=null) {
    return Tree.#anyorder(callback, 'postorder', this.root);
  }


  static #anyorder (callback, order, root) {
    const values = [];
    Tree.#traverseDepthFirst(order, values, root);

    return callback
      ? values.map(node => callback(node))
      : values
  }


  static #traverseDepthFirst (order, values, root) {
    const orders = ['preorder', 'inorder', 'postorder'];
    
    if (!(orders.includes(order))) {
      throw new RangeError(
        `Order must be one of: "${orders.join('", "')}", got ${order}`
      );
    }
    
    if (root === null ) return;

    if (order === 'preorder' ) values.push(root.data);
    Tree.#traverseDepthFirst(order, values, root.left);
    if (order === 'inorder'  ) values.push(root.data);
    Tree.#traverseDepthFirst(order, values, root.right);
    if (order === 'postorder') values.push(root.data);
  }


  height (node, currentHeight=null) {
    if ( !(Node.isValidNode(node)) ) {
      throw new TypeError("The argument has to be a Node or null");
    }

    // base case
    if (node === null) return currentHeight;

    if (currentHeight === null) {
      currentHeight = 0;
    } else {
      currentHeight++;
    }

    let leftHeight  = this.height(node.left,  currentHeight);
    let rightHeight = this.height(node.right, currentHeight);

    return Math.max(leftHeight, rightHeight);
  }


  depth (node, root=this.root, currentDepth=0) {
    if ( !(Node.isValidNode(node)) ) {
      throw new TypeError("The argument has to be a Node or null");
    }

    // edge case: node is null
    if (node===null) return null;

    // base case
    if (root === null) return null;

    if (node.data === root.data) return currentDepth;
    if (node.data  <  root.data) return this.depth(node, root.left,  currentDepth + 1);
    if (node.data  >  root.data) return this.depth(node, root.right, currentDepth + 1);
  }

  
  isBalanced () {

  }


  rebalance () {

  }



}

export default Tree;