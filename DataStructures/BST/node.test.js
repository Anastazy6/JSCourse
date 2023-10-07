import Node from "./node";

describe.only("It creates a Node for Binary Search Tree", () => {
  test("It creates a leaf by default", () => {
    let node = new Node('leaf?');
    
    expect(node instanceof Node).toBe(true);
    expect(node.data) .toEqual("leaf?");
    expect(node.left) .toBe(null);
    expect(node.right).toBe(null);  
  });
});