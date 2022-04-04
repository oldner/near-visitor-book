// contract/assembly/__tests__/index.spec.ts

import { create, get, getById, update, del } from "../index";
import { Comment, comments } from "../model";

describe("contract methods", () => {
  it("creates a comment", () => {
    // call the create method
    const todo = create("Haktan", "haktan@uniteroom.com", "Near is great!");

    // lookup in the PersistentUnorderedMap for our todo
    // expect the persisted todo to equal the todo returned
    // by the create method above.
    expect(comments.getSome(todo.id)).toStrictEqual(todo);
  });

  it("gets a list of todos", () => {
    const todos = new Array<number>(100)
      .fill(0)
      .map<Comment>((_, i) =>
        Comment.insert("some name" + i.toString(), "email", "comment")
      );

    expect(get(20)).toStrictEqual(todos.slice(20, 30));
    expect(get(0, 10)).toStrictEqual(todos.slice(0, 10));
    expect(get(10, 10)).toStrictEqual(todos.slice(10, 20));
    expect(get(50, 50)).toStrictEqual(todos.slice(50, 100));
  });

  it("gets a todo by id", () => {
    // create three todos
    const a = Comment.insert(
      "Haktan",
      "haktan@uniteroom.com",
      "Near is awesome!"
    );
    const b = Comment.insert("Andrew", "some@example.com", "Near is great!");
    const c = Comment.insert("Kevin", "kevin@kevin.com", "Near is speed!");

    // get each todo by its it
    expect(getById(a.id)).toStrictEqual(a);
    expect(getById(b.id)).toStrictEqual(b);
    expect(getById(c.id)).toStrictEqual(c);
  });

  it("updates a todo", () => {
    const comment = Comment.insert(
      "Haktan",
      "haktan@uniteroom.com",
      "Near is awesome!"
    );

    update(comment.id, "Andrew", "some@example.com", "Near is great!");

    const todoAfterUpdate = Comment.findById(comment.id);

    expect(todoAfterUpdate.id).toStrictEqual(comment.id);
    expect(todoAfterUpdate.name).toStrictEqual("Andrew");
    expect(todoAfterUpdate.email).toStrictEqual("some@example.com");
    expect(todoAfterUpdate.comment).toStrictEqual("Near is great!");
  });

  itThrows("deletes a todo", () => {
    const comment = Comment.insert(
      "Haktan",
      "haktan@uniteroom.com",
      "Near is awesome!"
    );

    del(comment.id);

    Comment.findById(comment.id);
  });
});
