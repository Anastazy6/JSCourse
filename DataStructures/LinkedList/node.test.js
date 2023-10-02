import Node from "./node";


describe("It creates a node", () => {
  test("It creates a single node with some value and no next node", () => {
    let simpleNode = new Node("value", null);
    expect(simpleNode.getValue()).toEqual("value");
    expect(simpleNode.getNext() ).toBe(null);
  });

  test("It can link nodes at creation", () => {
    let second = new Node("second", null);
    let first  = new Node("first", second);

    let likelySecond = first.getNext();
    expect(first.getValue()).toEqual('first');
    expect(likelySecond).toEqual(second);
  });

  test("It can link nodes after creation and traverse through them one by one", () => {
    let first  = new Node("first",  null);
    let second = new Node("second", null);
    let third  = new Node("third",  null);

    first.setNext(second);
    second.setNext(third);

    expect(first.getValue()).toBe("first");
    expect(first.getNext().getValue()).toBe("second");
    expect(first.getNext().getNext().getValue()).toBe("third");
  });


  test("It requires the linked-at-creation next object to be a Node (or null)", () => {
    expect(
      () => new Node('some value', "Not a node")
    ).toThrow(
      "Next node property must be another Node or null"
    );
  });


  test("It requires the linked-after-creation next object to bo a Node (or null)", () => {
    let first = new Node("first", null);
    let second = "Totally not a Node";

    expect(() => first.setNext(second)).toThrow(
      "Next node property must be another Node or null"
    );
  });
});