import Node from "./node";
import Tree from "./tree";
import { analyzeNode } from "./node.test";

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
      Tree.prettyPrint(tree.root);
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
      let tree = new Tree(3);
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
      let tree = new Tree(3);
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
      let tree = new Tree(3);
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

    test("It creates a tree of height 3 (for testing purposes)", () => {
      let tree = makeTestTree();
      expect(tree.root.data).toBe(5);
      expect(tree.root.left.left).toBe(2);
      expect(tree.root.right).toBe(7);
      expect(tree.root.right.left).toBe(6);
      expect(tree.root.left.right.left).toBe(null);
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