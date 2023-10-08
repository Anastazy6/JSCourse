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
    expectedRoot = {
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


    test("Works with a sorted array", () => {
      let tree = new Tree([1, 2, 3]);
      runTests(tree);
    });


    test("Works with an unsorted array, sorting it at creation", () => {
      let tree = new Tree([2, 1, 3], false);
      runTests(tree);
    });
  });
});