import Node from "./node";
import Tree from "./tree";


function makeSimpleTree () {
  let leftNode  = new Node('left');
  let rightNode = new Node('right');
  return new Node('root', leftNode, rightNode);
}

/**
 * Checks if all properties of the given node are exactly as expected
 * @param {Node} node which will be analyzed
 * @param {*} expected: expectations about the Node's data, left and right properties
 * @returns true, if everything is as expected, else false
 */
export function analyzeNode (node, expected) {
  if (node instanceof Node) {
    return (
      node.data  === expected.data &&
      node.left  === expected.left &&
      node.right === expected.right
    )
  }
  return false;
}


describe("It creates a Node for Binary Search Tree", () => {
  test("It creates a leaf by default", () => {
    let node = new Node('leaf?');
    let expected = {
      data : 'leaf?',
      left : null,
      right: null
    };

    expect(analyzeNode(node, expected)).toBe(true);
  });


  test("It creates a Node pointing to other nodes at creation", () => {
    let leftNode  = new Node('left');
    let rightNode = new Node('right');
    let rootNode  = new Node('root', leftNode, rightNode);
  
    let expected = {
      data : 'root',
      left : leftNode,
      right: rightNode
    };

    expect(analyzeNode(rootNode, expected)).toBe(true);
  });


  test("It changes a Node's branch from Node to null", () => {
    let root = makeSimpleTree();

    // Make sure the initial values are as expected
    expect(root.left .data).toEqual("left");
    expect(root.right.data).toEqual("right");

    root.left = null;
    
    expect(root.left ).toBe(null);            // Make sure left node is changed;
    expect(root.right.data).toEqual('right'); // Make sure right note stays the same;
  });


  test("It changes a Node's branch from null to Node", () => {
    let root = new Node('root');
    let left = new Node('left');

    expect(analyzeNode(root, {data: 'root', left: null, right: null})).toBe(true);

    root.left = left;
    
    let expected = {
      data : 'left',
      left : null,
      right: null
    }
    expect(analyzeNode(root.left, expected)).toBe(true);
    expect(root.right).toBe(null); // Make sure right node stays unchanged;
  });


  test("It changes a Node's branch from Node to another Node", () => {
    let root = new Node('root', new Node('left'), new Node('right'));

    expect(root.data).toBe('root');
    expect(analyzeNode(root.left, {data: 'left', left: null, right: null})).toBe(true);
    let newLeft = new Node('new left');
    root.left = newLeft;

    expect(analyzeNode(
      root.left , {data: 'new left', left: null, right: null}
    )).toBe(true);
    
    expect(analyzeNode(
      root.right, {data: 'right',    left: null, right: null}
    )).toBe(true); // No changes to the root's right branch
  });


  test("It throws an error when changing a Node's branch to anything " +
            "that isn't a Node or null", () => {
    let root = makeSimpleTree();
    expect(() => root.left = 'not a valid node').toThrow(
      "The next node must be an instance of the Node class or null"
    );
  });
});

describe("It checks the Node's type as a leaf, single parent or double parent", () => {
  const testNodes = {
    'leaf'  : new Node(1, null, null),
    'lefty' : new Node(1, new Node(2), null),
    'righty': new Node(1, null, new Node(2)),
    'dual'  : new Node(1, new Node(2), new Node(3))
  }

  const singles = ['lefty', 'righty'];

  test("It checks if a Node is leaf", () => {
    Object.entries(testNodes).forEach(([name, node]) => {
      expect(node.isLeaf()).toBe(name === 'leaf');
    });
  });

  test("It checks if a Node has only one child", () => {
    Object.entries(testNodes).forEach(([name, node]) => {
      expect(node.isSingle()).toBe(singles.includes(name));
    });
  });

  test("It checks if a Node has 2 children", () => {
    Object.entries(testNodes).forEach(([name, node]) => {
      expect(node.isDual()).toBe(name === 'dual');
    });
  });

  test("It gets the Node's type, returning it as a string", () => {
    Object.entries(testNodes).forEach(([name, node]) => {
      let type = singles.includes(name) ? 'single' : name;
      expect(node.type).toEqual(type);
    });
  });
});


describe("It gets a Node's only child", () => {
  test("Returns null if the node has 0 or 2 children", () => {
    let root = new Node(3, new Node(2), new Node(4));
    
    expect(root.onlyChild     ).toBeNull(); // returns null for dual parent
    expect(root.left.onlyChild).toBeNull(); //   as well as for a leaf node
  });


  describe("Returns the only child of a Node with 1 child", () => {
    test("Works with left branch", () => {
      let root = new Node(3, new Node(2), null);
      let expectedChild = {
        data : 2,
        left : null,
        right: null
      }

      expect(analyzeNode(root.onlyChild, expectedChild)).toBe(true);
    });

    
    test("Works with right branch", () => {
      let root = new Node(3, null, new Node(4));
      let expectedChild = {
        data : 4,
        left : null,
        right: null
      }

      expect(analyzeNode(root.onlyChild, expectedChild)).toBe(true);
    });
  });
});


describe("It gets a Node's inorder successor", () => {
  test("Edge case: there's no inorder successor, returns null instead of breaking", () => {
    let root = new Node(1, null, null);

    expect(root.inorderSuccessor).toBeNull();
  });


  test("Edge case: the inorder successor is the node's right child (and thus a leaf as well", () => {
    let root = new Node (1, new Node(0), new Node(2));

    expect(root.inorderSuccessor.data    ).toBe(2);
    expect(root.inorderSuccessor.isLeaf()).toBe(true);
  });


  test("Works when the inorder successor is a leaf node", () => {
    let root = new Node(2, new Node(1), new Node(4, new Node(3), new Node(5)));
    /*            
     *               2
     *           1       4
     *                 3   5
     */
    expect(root.inorderSuccessor.data    ).toBe(3);
    expect(root.inorderSuccessor.isLeaf()).toBe(true);
  });


  test("Works when the inorder successor has one child (has to be the right one by design)", () => {
    let tree = new Tree(Array.from({length: 12}, (val, index) => index + 1));
    
    expect(tree.root.data                       ).toBe(6);
    expect(tree.root.inorderSuccessor.data      ).toBe(7);
    expect(tree.root.inorderSuccessor.isSingle()).toBe(true);
  });
});