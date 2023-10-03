import Node from "./node";
import LinkedList from "./linked_list";


/**
 * Checks if an object is a valid node and its properties are equal to the
 *   value and next params
 * @param {Node} node 
 * @param {*} value 
 * @param {Node|null} next 
 * @returns 
 */
function analyzeNode(node, value, next) {
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
    
    expect(analyzeNode(root, "Root node", null)).toBe(true);
  });
});


describe("It appends a value, converting it to a Node", () => {
  let testList = new LinkedList();
  

  test("It appends a value to an empty linked list", () => {
    testList.append("Root node");
    expect(analyzeNode(testList.head(), "Root node", null)).toBe(true);
  });


  test("It appends a value to a linked list with only root node", () => {
    testList.append("Second node");
    let secondNode = testList.head().getNext();
    expect(analyzeNode(secondNode, "Second node", null)).toBe(true);
    expect(analyzeNode(testList.head(), "Root node", secondNode));
  });


  test("It appends a value to the end of a linked list with multiple nodes", () => {
    testList.append("Third");
    testList.append("Fourth");
    let secondNode = testList  .head().getNext();
    let thirdNode  = secondNode.getNext();
    let fourthNode = thirdNode .getNext();

    expect(analyzeNode(secondNode, "Second node", thirdNode ));
    expect(analyzeNode(thirdNode,  "Third node",  fourthNode));
    expect(analyzeNode(fourthNode, "Fourth node", fourthNode));
  });
});


describe("It prepends a value as a Node to the start of the Linked List", () => {
  let list = new LinkedList();
  
  test("It prepends the value to an empty List", () => {
    list.prepend("Root");
    expect(analyzeNode(list.head(), "Root", null)).toBe(true);
  });

  test("It prepends the value to a List with one Node", () => {
    let originalRoot = list.head()
    list.prepend("Before root");
    expect(analyzeNode(list.head(), "Before root", originalRoot)).toBe(true);
  });

  test("It prepends the value to a Longer list", () => {
    let beforeRoot   = list.head();
    
    list.prepend("Second");
    list.prepend("First");

    let second = list.head().getNext();

    expect(analyzeNode(list.head(), "First",  second    )).toBe(true);
    expect(analyzeNode(second,      "Second", beforeRoot)).toBe(true);
  });
});


describe("It counts the number of nodes in the list", () => {
  test("It returns 0 if the list is empty", () => {
    expect(new LinkedList().size()).toBe(0);
  });

  test("It returns 1 if the list only contains one node", () => {
    expect(new LinkedList('root').size()).toBe(1);
  });

  test("It works with longer lists", () => {
    expect(
      new LinkedList('second')
          .append('third')
          .prepend('first')
          .size()
    ).toBe(3);
  });
});


describe("It finds the last element of the list", () => {
  test("Works with an empty list (returns null)", () => {
    expect(new LinkedList().tail()).toBe(null);
  });

  test("Works with a root-only list (tail equals head/root)", () => {
    let list = new LinkedList('root');
    
    expect(list.tail()).toEqual(list.head());
  });

  test("Works with a longer list, returning its last node", () => {
    let list = new LinkedList('first').append('second').append('third');

    expect(analyzeNode(list.tail(), 'third', null)).toBe(true);
  });
});