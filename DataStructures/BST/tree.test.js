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

  test("It deletes a leaf node from a tree, returning the deleted node" , () => {
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
});