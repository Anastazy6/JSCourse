import Node from "./node";


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
  if ( !(
    Node.isValidNode(node)       ||
    node.data  === expected.data ||
    node.left  === expected.left ||
    node.right === expected.right
  )) return false;
  return true;
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


  test("It throws an error at attempts to change the node's data", () => {
    let node = new Node(1);
    expect(() => node.data = 2).toThrow(
      "Changing the Node's data is imposibble in order to protect the sorted " +
      "nature of the Binary Search Tree"
    );
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
    let newLeft = new Node('new Left');
    root.left = newLeft

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