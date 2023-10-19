import Node from "./node";
import Tree from "./tree";
import { analyzeNode } from "./node.test";


/**
   *              5
   *           /     \
   *          3       7 
   *        /  \    /   \
   *       2   4   6     8
   */
function makeTestTree () {
  return new Tree([2, 3, 4, 5, 6, 7, 8]);
}


/**
 *            6
 *          /    \
 *       3         9
 *     /  \       /  \
 *   1     4    7     11
 *    \     \    \    /  \
 *    2     5     8  10  12
 * 
 * 
 */
function makeAsymmetricalTestTree () {
  let arr = Array.from({length: 12}, (val, index) => index + 1);
  return new Tree(arr);
}

function makeUnbalancedTree () {
  let tree = makeAsymmetricalTestTree();
  tree.insert(15).insert(16).insert(17).insert(18);

  return tree;
}


describe("It creates a Binary Search Tree", () => {
  test("It creates an empty tree", () => {
    let tree = new Tree([]);
    expect(tree.root).toBe(null);
  });


  test("It creates a single-node tree", () => {
    let tree = new Tree([1]);
    let expectedRoot = {
      data : 1,
      left : null,
      right: null
    }
    expect(analyzeNode(tree.root, expectedRoot)).toBe(true);
  });


  describe("It creates a simple tree from an array", () => {
    let expectedLeft = {
      data : 1,
      left : null,
      right: null
    }
    let expectedRight = {
      data : 3,
      left : null,
      right: null
    }

    function runTests (tree) {
      expect(tree.root.data).toBe(2);
      expect(analyzeNode(tree.root.left,  expectedLeft )).toBe(true);
      expect(analyzeNode(tree.root.right, expectedRight)).toBe(true);
    }


    test("Works with a sorted, free of duplicates array", () => {
      let tree = new Tree([1, 2, 3]);
      runTests(tree);
    });


    test("Works with an unsorted array, sorting it at creation", () => {
      let tree = new Tree([2, 1, 3]);
      runTests(tree);
    });


    test("Works with a sorted array, but containing duplicates", () => {
      let tree = new Tree([1, 1, 2, 2, 2, 3, 3, 3]);
      runTests(tree);
    });


    test("Works with an unsorted array that contains duplicates", () => {
      let tree = new Tree([3, 1, 2, 3, 1, 2, 3, 3, 2, 3, 2, 1, 2, 3]);

      runTests(tree);
    });
  });

  test("It creates assimetrical trees (number of nodes different than 2^x -1)", () => {
    let tree = new Tree([1, 2, 3, 4]);
    let expectations = [
      tree.root.data             === 2,
      tree.root.left.data        === 1,
      tree.root.right.data       === 3,
      tree.root.right.right.data === 4
    ];
    expectations.forEach(exp => expect(exp).toBe(true));
  });
});



describe("It inserts a value (as a Node)", () => {
  test("It inserts a value into an empty tree, creating its root node", () => {
    let tree = new Tree([]);
    tree.insert(1);
    let expectedRoot = {
      data: 1,
      left: null,
      right: null
    };

    expect(analyzeNode(tree.root, expectedRoot)).toBe(true);
  });


  // This should alse test whether it picks the correct branch
  describe("It inserts a value to a root-only tree", () => {
    test("It inserts a value to the left branch if value < root.data", () => {
      let tree = new Tree([3]);
      let expectedLeft = {
        data: 2,
        left: null,
        right: null
      }

      tree.insert(2);
      expect(analyzeNode(tree.root.left, expectedLeft)).toBe(true);
      expect(tree.root.right).toBe(null);
    });


    test("It inserts a value to the right branch if value > root.data", () => {
      let tree = new Tree([3]);
      let expectedRight = {
        data: 4,
        left: null,
        right: null
      };

      tree.insert(4);
      expect(analyzeNode(tree.root.right, expectedRight)).toBe(true);
      expect(tree.root.left).toBe(null);
    });


    test("It does not insert a value that is already present in the tree", () => {
      let tree = new Tree([3]);
      let expectedRoot = {
        data: 3,
        left: null,
        right: null
      };
      expect(analyzeNode(tree.root, expectedRoot)).toBe(true);

      tree.insert(3);
      expect(analyzeNode(tree.root, expectedRoot)).toBe(true); // Nothing should change
    });
  });


  describe("It inserts a value into a leaf node of a bigger tree", () => {
    test("It creates a tree of height 3 (for testing purposes)", () => {
      let tree = makeTestTree();
      let expectations = [
        tree.root.data            === 5,
        tree.root.left.left.data  === 2,
        tree.root.right.data      === 7,
        tree.root.right.left.data === 6,
        tree.root.left.right.left === null
      ];
      expectations.forEach(exp => expect(exp).toBe(true));
    });


    test("It inserts a value to the far left", () => {
      let tree = makeTestTree();
      tree.insert(1);
      let farLeft = tree.root.left.left.left;

      let expectedFarLeft = {
        data: 1,
        left: null,
        right: null
      };

      expect(analyzeNode(farLeft, expectedFarLeft)).toBe(true);
    });
  });
});



describe("It deletes a node from a BST", () => {
  test("Returns null if the tree is empty", () => {
    let tree = new Tree([]);
    expect(tree.delete(1)).toBeNull();
  });


  test("It does nothing if there's no node with given value, returns null", () => {
    let tree = makeTestTree();
    expect(tree.delete(20)).toBeNull();
    expect(tree).toEqual(makeTestTree());
  });


  describe("It deletes a leaf node from a tree, returning the deleted node" , () => {
    test("Edge case: 1-node tree: the root is the deleted leaf", () => {
      let tree = new Tree([1]);
      let deleted = tree.delete(1);

      expect(deleted.data).toBe(1);
      expect(tree.root   ).toBeNull();
    });
    

    test("Standard case: leaf is not the root", () => {
      let tree = makeTestTree();
      let deleted = tree.delete(6);
      
      // check the node
      expect(deleted instanceof Node).toBe(true);
      expect(deleted.data).toBe(6);

      // check the tree

      expect(tree.root.right.data      ).toBe(7);
      expect(tree.root.right.right.data).toBe(8);
      expect(tree.root.right.left      ).toBeNull();
    });
  })


  describe("It deletes a single parent node from a tree, keeping proper BST structure", () => {
    test("Edge case: the single parent node is the root in 2-node BST", () => {
      let tree = new Tree([1,2]);
      
      expect(tree.root.data      ).toBe(1);
      expect(tree.root.isSingle()).toBe(true);
      expect(tree.root.right.data).toBe(2);

      let deleted = tree.delete(1);

      expect(deleted.data      ).toBe(1);
      expect(tree.root.data    ).toBe(2);
      expect(tree.root.isLeaf()).toBe(true);
    });


    test("Standard case", () => {
      let tree = makeAsymmetricalTestTree();
      let deleted = tree.delete(7);

      // check the node
      expect(deleted instanceof Node).toBe(true);
      expect(deleted.data           ).toBe(7);

      // check the tree
      expect(tree.root.right.data          ).toBe(9);
      expect(tree.root.right.left.data     ).toBe(8);
      expect(tree.root.right.left.isLeaf() ).toBe(true);
      expect(tree.root.right.right.data    ).toBe(11);
      expect(tree.root.right.right.isDual()).toBe(true);

    });
  });


  describe("It deletes a dual parent node from a tree, keeping proper BST structure", () => {

/**
 *            6
 *          /    \
 *       3         9
 *     /  \       /  \
 *   1     4    7     11
 *    \     \    \    /  \
 *    2     5     8  10  12
 * 
 * 
 */

    test("Works when the inorder successor node is a leaf", () => {
      let tree = makeAsymmetricalTestTree();
      let deleted = tree.delete(9);

      expect(tree.root.right.left .data      ).toBe(7);
      expect(tree.root.right.right.data      ).toBe(11);
      expect(tree.root.right.right.left      ).toBeNull();
      expect(tree.root.right.right.right.data).toBe(12);

      expect(deleted.data).toBe(9);
    });

    test("Works when the inorder successor node is a single parent", () => {
      let tree = makeAsymmetricalTestTree();
      let deleted = tree.delete(6) // root

      expect(tree.root.data                ).toBe(7);
      expect(tree.root.right.data          ).toBe(9);
      expect(tree.root.right.left.data     ).toBe(8)
      expect(tree.root.right.left .isLeaf()).toBe(true);
      expect(tree.root.right.right.isDual()).toBe(true);
    }); 
  });
});



describe("It finds a Node with a given value in the Tree", () => {
  test("Edge case: it returns null if the Tree is empty", () => {
    let tree = new Tree([]);
    
    expect(tree.find(5)).toBeNull();
  });


  test("It returns null if there's no such Node in the Tree", () => {
    let tree = makeTestTree();

    expect(tree.find(12)).toBeNull();
  });


  test("It returns the Node when it's found", () => {
    let tree  = makeTestTree();
    let found = tree.find(7);

    expect(found.data).toBe(7);
    expect(found instanceof Node).toBe(true);
    
    expect(found.left .data).toBe(6);
    expect(found.right.data).toBe(8);
  });
});



describe("It performs a level-order traversal", () => {
  describe("It returns an array of level-order node values if no callback is provided", () => {
    test("It returns an empty array if the tree is empty", () => {
      let tree = new Tree([]);
      let levelOrderedData = tree.levelOrder();

      expect(Array.isArray(levelOrderedData)).toBe(true);
      expect(levelOrderedData.length).toBe(0);
    });


    test("It returns an level ordered array", () => {
      let tree    = makeTestTree();
      let ashTree = makeAsymmetricalTestTree();

      expect(tree   .levelOrder()).toEqual([5, 3, 7, 2, 4, 6, 8]);
      expect(ashTree.levelOrder()).toEqual([6, 3, 9, 1, 4, 7, 11, 2, 5, 8, 10, 12]);
    });
  });


  describe("It calls the provided callback funcion on each element of the level-ordered array", () => {
    const testCallback = value => value + 1;
    
    test("It does nothing and returns nothing if the tree is empty", () => {
      let tree = new Tree([]);

      expect(tree.levelOrder(testCallback)).toBeFalsy;
    });


    test("It performs an operation defined in the callback on each element of the array", () => {
      let tree    = makeTestTree();
      let ashTree = makeAsymmetricalTestTree();

      expect(tree   .levelOrder(testCallback)).toEqual([6, 4, 8, 3, 5, 7, 9]);
      expect(ashTree.levelOrder(testCallback)).toEqual([7, 4, 10, 2, 5, 8, 12, 3, 6, 9, 11, 13]);
    });
  });
});



describe("It performs a preorder traversal", () => {
  describe("It returns an array of preorder node values if no callback is provided", () => {
    test("It returns an empty array if the tree is empty", () => {
      let tree = new Tree([]);
      let preorderedData = tree.preorder();

      expect(Array.isArray(preorderedData)).toBe(true);
      expect(preorderedData.length).toBe(0);
    });


    test("It returns a preordered array", () => {
      let tree    = makeTestTree();
      let ashTree = makeAsymmetricalTestTree();

      expect(tree   .preorder()).toEqual([5, 3, 2, 4, 7, 6, 8]);
      expect(ashTree.preorder()).toEqual([6, 3, 1, 2, 4, 5, 9, 7, 8, 11, 10, 12]);
    });
  });


  describe("It calls the provided callback funcion on each element of the preordered array", () => {
    const testCallback = value => value + 1;
    
    test("It does nothing and returns nothing if the tree is empty", () => {
      let tree = new Tree([]);

      expect(tree.preorder(testCallback)).toBeFalsy;
    });


    test("It performs an operation defined in the callback on each element of the array", () => {
      let tree    = makeTestTree();
      let ashTree = makeAsymmetricalTestTree();

      expect(tree   .preorder(testCallback)).toEqual([6, 4, 3, 5, 8, 7, 9]);
      expect(ashTree.preorder(testCallback)).toEqual([7, 4, 2, 3, 5, 6, 10, 8, 9, 12, 11, 13]);
    });
  });
});



describe("It performs an inorder traversal", () => {
  describe("It returns an array of inorder node values if no callback is provided", () => {
    test("It returns an empty array if the tree is empty", () => {
      let tree = new Tree([]);
      let inorderedData = tree.inorder();

      expect(Array.isArray(inorderedData)).toBe(true);
      expect(inorderedData.length).toBe(0);
    });


    test("It returns an inordered array", () => {
      let tree    = makeTestTree();
      let ashTree = makeAsymmetricalTestTree();

      expect(tree   .inorder()).toEqual([2, 3, 4, 5, 6, 7, 8]);
      expect(ashTree.inorder()).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
    });
  });


  describe("It calls the provided callback funcion on each element of the inordered array", () => {
    const testCallback = value => value + 1;
    
    test("It does nothing and returns nothing if the tree is empty", () => {
      let tree = new Tree([]);

      expect(tree.inorder(testCallback)).toBeFalsy;
    });


    test("It performs an operation defined in the callback on each element of the array", () => {
      let tree    = makeTestTree();
      let ashTree = makeAsymmetricalTestTree();

      expect(tree   .inorder(testCallback)).toEqual([3, 4, 5, 6, 7, 8, 9]);
      expect(ashTree.inorder(testCallback)).toEqual([2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]);
    });
  });
});



describe("It performs a postorder traversal", () => {
  describe("It returns an array of postorder node values if no callback is provided", () => {
    test("It returns an empty array if the tree is empty", () => {
      let tree = new Tree([]);
      let postorderedData = tree.postorder();

      expect(Array.isArray(postorderedData)).toBe(true);
      expect(postorderedData.length).toBe(0);
    });


    test("It returns a postordered array", () => {
      let tree    = makeTestTree();
      let ashTree = makeAsymmetricalTestTree();

      expect(tree   .postorder()).toEqual([2, 4, 3, 6, 8, 7, 5]);
      expect(ashTree.postorder()).toEqual([2, 1, 5, 4, 3, 8, 7, 10, 12, 11, 9, 6]);
    });
  });


  describe("It calls the provided callback funcion on each element of the postordered array", () => {
    const testCallback = value => value + 1;
    
    test("It does nothing and returns nothing if the tree is empty", () => {
      let tree = new Tree([]);

      expect(tree.postorder(testCallback)).toBeFalsy;
    });


    test("It performs an operation defined in the callback on each element of the array", () => {
      let tree    = makeTestTree();
      let ashTree = makeAsymmetricalTestTree();

      expect(tree   .postorder(testCallback)).toEqual([3, 5, 4, 7, 9, 8, 6]);
      expect(ashTree.postorder(testCallback)).toEqual([3, 2, 6, 5, 4, 9, 8, 11, 13, 12, 10, 7]);
    });
  });
});



describe("It calculates a Node's height", () => {
  test("It only accepts a Node or null as an argument", () => {
    let tree = makeTestTree();
    let nullNode = tree.find(123); // null
    let node = tree.find(3);

    expect(() => tree.height(nullNode)).not.toThrow();
    expect(() => tree.height(node    )).not.toThrow();

    [5, 'string', true, false, [new Node(50)]].forEach(notANode => {
      expect(() => tree.height(notANode)).toThrow("The argument has to be a Node or null");
    });
  });


  test("It returns null if the given Node is null", () => {
    expect(makeTestTree().height(null)).toBe(null);
  });


  test("Indexing starts at 0, so that a leaf's height is 0", () => {
    let tree = makeTestTree();
    let leaf = tree.find(8);

    expect(tree.height(leaf)).toBe(0);
  });


  test("It returns the height of a Node, where all its subtrees are fully symmetrical", () => {
    let tree = makeTestTree();

    expect(tree.height(tree.root   )).toBe(2);
    expect(tree.height(tree.find(7))).toBe(1);
    expect(tree.height(tree.find(8))).toBe(0);
  });


  test("If the left and right subtree of a node are of different heights, it picks the higher one", () => {
    let tree = makeTestTree();
    tree.insert(9).insert(10); // 6 <-  (7)  -> 8 -> 9 -> 10

    expect(tree.height(tree.find(7))).toBe(3) // 1 in the left subtree, 3 in the right, picks higher
  });
});



describe("It caclulates a Node's depth", () => {
  test("It only accepts a Node or null as an argument", () => {
    let tree = makeTestTree();
    let nullNode = tree.find(123); // null
    let node = tree.find(3);

    expect(() => tree.depth(nullNode)).not.toThrow();
    expect(() => tree.depth(node    )).not.toThrow();

    [5, 'string', true, false, [new Node(50)]].forEach(notANode => {
      expect(() => tree.depth(notANode)).toThrow("The argument has to be a Node or null");
    });
  });


  test("Returns null if the Node is null", () => {
    expect(makeAsymmetricalTestTree().height(null)).toBeNull();
  });


  test("Returns null if the Node is not in the Tree", () => {
    let tree = makeTestTree();
    let node = new Node(123, null, null);

    expect(tree.depth(node)).toBeNull();
    expect(new Tree([]).depth(node)).toBeNull();
  });


  test("Returns 0 for the Tree's root (ensures counting starts at 0)", () => {
    let tree = makeAsymmetricalTestTree();
    expect(tree.depth(tree.root)).toBe(0);
  });


  test("Returns the number of steps needed to go from the Tree's root to the Node", () => {
    let tree = makeAsymmetricalTestTree();

    expect(tree.depth(tree.find(3))).toBe(1);
    expect(tree.depth(tree.find(7))).toBe(2);
    expect(tree.depth(tree.find(12))).toBe(3);
  });
});



describe("It checks if the tree is balanced", () => {
  test("Empty tree is balanced", () => {
    expect(new Tree([]).isBalanced()).toBe(true);
  });


  test("Single-node tree is balanced", () => {
    expect(new Tree([2]).isBalanced()).toBe(true);
  });


  test("Returns true if a tree is balanced", () => {
    expect(makeTestTree().isBalanced()).toBe(true);
  });


  test("Returns false if a tree is unbalanced", () => {
    expect(makeUnbalancedTree().isBalanced()).toBe(false);
  });
});



describe("It rebalances an unbalanced tree", () => {
  test("It returns a new Tree", () => {
    let tree = makeUnbalancedTree();

    let balancedTree = tree.rebalance();
    expect(balancedTree instanceof Tree).toBe(true);
  });


  test("The new tree has exactly the same elements as the old one, in the same inorder order", () => {
    let unbalancedTree  = makeUnbalancedTree();
    let unbalancedItems = unbalancedTree.inorder();

    let balancedTree  = unbalancedTree.rebalance();
    let balancedItems = balancedTree.inorder();
    
    expect(balancedItems).toEqual(unbalancedItems);
  });


  test("It balances an unbalanced tree", () => {
    let unbalancedTree = makeUnbalancedTree();
    expect(unbalancedTree.isBalanced()).toBe(false);

    let balancedTree = unbalancedTree.rebalance();
    expect(balancedTree.isBalanced()).toBe(true);
  });


  test("It keeps a balanced tree balanced", () => {
    let tree = makeTestTree();
    expect(tree.isBalanced()).toBe(true);

    let newTree = tree.rebalance();
    expect(newTree.isBalanced()).toBe(true);
  });


  test("It actually mutates the existing tree, instead of returning a new one", () => {
    let tree = makeUnbalancedTree();
    expect(tree.isBalanced()).toBe(false);
    tree.rebalance();
    expect(tree.isBalanced()).toBe(true);
  });
});