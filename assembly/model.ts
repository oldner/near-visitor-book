// contract/assembly/model.ts
import { PersistentUnorderedMap, math } from "near-sdk-as";

export const comments = new PersistentUnorderedMap<u32, Comment>("comments");

@nearBindgen
export class Comment {
  id: u32;
  name: string;
  email: string;
  comment: string;

  constructor(name: string, email: string, comment: string) {
    this.id = math.hash32<string>(name);
    this.name = name;
    this.email = email;
    this.comment = comment;
  }

  static insert(name: string, email: string, comment: string): Comment {
    // create a new Comment
    const todo = new Comment(name, email, comment);

    // add the comment to the PersistentUnorderedMap
    // where the key is the comment's id and the value
    // is the comment itself. Think of this like an
    // INSERT statement in SQL.
    comments.set(todo.id, todo);

    return todo;
  }

  static find(offset: u32, limit: u32): Comment[] {
    return comments.values(offset, offset + limit);
  }

  static findById(id: u32): Comment {
    return comments.getSome(id);
  }

  static findByIdAndUpdate(
    id: u32,
    name: string,
    email: string,
    comment: string
  ): Comment {
    // find a comment by its id
    const currentComment = this.findById(id);

    // update the comment in-memory
    currentComment.name = name;
    currentComment.email = email;
    currentComment.comment = comment;

    // persist the updated comment
    comments.set(id, currentComment);

    return currentComment;
  }

  static findByIdAndDelete(id: u32): void {
    comments.delete(id);
  }
}
