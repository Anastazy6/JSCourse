import Node from "./node";
import LinkedList from "./linked_list";



function isValidNode(node, value, next) {
  if (
    node instanceof Node      &&
    node.getValue() === value &&
    node.getNext () === next
  ) return true;
  return false;
}

describe("It creates a Linked list", () => {
  test("It creates an empty linked list", () => {
    expect(new LinkedList().head()).toBe(null);
  });

  test( "It creates a linked list with a single node, " +
        "with Node passed to the constructor", () => {
    let root = new Node("Root node");
    expect(new LinkedList(root).head()).toBe(root);
  });

  test( "It creates a linked list with a single node, with a value " +
        "passed to the constructor (auto-converts it to a node)", () => {
    let root = new LinkedList("Root node").head();
    
    expect(isValidNode(root, "Root node", null)).toBe(true);
  });
});


describe("It appends a value, converting it to a Node", () => {
  let testList = new LinkedList();
  

  test("It appends a value to an empty linked list", () => {
    testList.append("Root node");
    expect(isValidNode(testList.head(), "Root node", null)).toBe(true);
  });


  test("It appends a value to a linked list with only root node", () => {
    testList.append("Second node");
    let secondNode = testList.head().getNext();
    expect(isValidNode(secondNode, "Second node", null)).toBe(true);
    expect(isValidNode(testList.head(), "Root node", secondNode));
  });


  test("It appends a value to the end of a linked list with multiple nodes", () => {
    testList.append("Third");
    testList.append("Fourth");
    let secondNode = testList  .head().getNext();
    let thirdNode  = secondNode.getNext();
    let fourthNode = thirdNode .getNext();

    expect(isValidNode(secondNode, "Second node", thirdNode ));
    expect(isValidNode(thirdNode,  "Third node",  fourthNode));
    expect(isValidNode(fourthNode, "Fourth node", fourthNode));
  });
});
