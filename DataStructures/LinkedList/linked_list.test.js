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

function makeLongList() {
  return new LinkedList('0').append('1').append('2').append('3').append('4');
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


describe("It finds a node given its index", () => {
  let longList = makeLongList();

  test("It requires the index to be an integer", () => {
    expect( () => longList.at('two')).toThrow(
      "Index must be an integer"
    );
  })
  
  test("Works with an empty list (returns null)", () => {
    expect(new LinkedList().at(0)).toBe(null);
  });

  test("Works with a root-only list, making sure that indexing starts at 0", () => {
    let list = new LinkedList('root');

    expect(list.at(0)).toEqual(list.head());
    expect(list.at(1)).toBe(null);
  });

  test("Finds a node somewhere within the list", () => {
    expect(analyzeNode(longList.at(2), '2', longList.at(3))).toBe(true);
  });

  test("Finds the list's tail using both it's index and the list's size -1", () => {
    expect(longList.at(4)).toEqual(longList.tail());
    expect(longList.at(longList.size() - 1)).toEqual(longList.tail());
  });

  test("Returns null if the given index reaches past the list's length", () => {
    expect(longList.at(2137)).toBe(null);
  });

  test("Can count from backwards using negative index, iterative method", () => {
    expect(longList.at(-1))                .toEqual(longList.tail());
    expect(longList.at(-4))                .toEqual(longList.head().getNext());
    expect(longList.at(-(longList.size()))).toEqual(longList.head());
    expect(longList.at(-2137))             .toBe(null);
  });

  test("Can count from backwards using negative index, recursive method", () => {
    expect(longList.at(-1, true))                .toEqual(longList.tail());
    expect(longList.at(-4, true))                .toEqual(longList.head().getNext());
    expect(longList.at(-(longList.size()), true)).toEqual(longList.head());
    expect(longList.at(-2137, true))             .toBe(null);
  });
});


describe("It pops the last node (tail)", () => {
  test("Returns null if the list is empty", () => {
    expect(new LinkedList().pop()).toBe(null);
  });

  test("Retuns root (which is the tail) in a single-node list", () => {
    expect(analyzeNode(new LinkedList('test').pop(), 'test', null)).toBe(true);
  });

  test("Turns a single-node list into an empty list", () => {
    let list = new LinkedList('root');
    expect(list.size()).toBe(1);
    
    list.pop();
    expect(list.size()).toBe(0);
  });

  test("Returns the last node in the list", () => {
    let longList = makeLongList();
    let tail     = longList.tail();

    expect(longList.pop()).toEqual(tail);
  });

  test("Removes the last node from the list", () => {
    let longList = makeLongList();
    let nextTail = longList.at(-2);

    longList.pop();
    
    expect(analyzeNode(longList.tail(), nextTail.getValue(), null)).toBe(true);
  });
});


describe("It checks if the list contains a value", () => {
  test("Returns false if the list is empty", () => {
    expect(new LinkedList().contains('value')).toBe(false);
  });

  test("Returns false if the list does not contain given value", () => {
    expect(makeLongList().contains('value')).toBe(false);
  });

  test("Returns true if the list contains given value", () => {
    expect(makeLongList().contains('2')).toBe(true);
  });

  test("Edge case: returns true if the expected value is null or false and is in the list", () => {
    expect(makeLongList().append (false).contains(false)).toBe(true);
    expect(makeLongList().prepend(null ).contains(null )).toBe(true);
  });
});


describe("It finds the location of a value in the list", () => {
  let list = makeLongList();

  test("Returns null for an empty list", () => {
    expect(new LinkedList().find('value')).toBe(null);
  });

  test("Returns null for a value which is not present in the list", () => {
    expect(list.find("not in the list")).toBe(null);
  });

  test("If there's a node in the list which contains the value, it returns its index", () => {
    for (let i = 0; i <= 4; i++) {
      expect(list.find(`${i}`)).toBe(i);
    }
  });
});


describe("It displays the list as a single string", () => {
  test("It displays an empty list as 'null", () => {
    expect(new LinkedList().toString()).toEqual("null");
  });

  test( "It stringifies a single-node list, wrapping its value in parentheses "+
        "and it points to 'null' at the very end", () => {
    expect(new LinkedList('test').toString()).toEqual("( test ) -> null")
  });

  test("It chains the entire list into a single string", () => {
    let list = makeLongList();
    expect(list.toString()).toEqual("( 0 ) -> ( 1 ) -> ( 2 ) -> ( 3 ) -> ( 4 ) -> null");
  });
});