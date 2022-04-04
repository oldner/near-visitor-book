// contract/assembly/index.ts
import { Comment } from "./model";

// export the create method. This acts like an endpoint
// that we'll be able to call from our web app.
export function create(name: string, email: string, comment: string): Comment {
  // use the Todo class to persist the todo data
  return Comment.insert(name, email, comment);
}

export function get(offset: u32, limit: u32 = 10): Comment[] {
  return Comment.find(offset, limit);
}

export function getById(id: u32): Comment {
  return Comment.findById(id);
}

export function update(
  id: u32,
  name: string,
  email: string,
  comment: string
): Comment {
  return Comment.findByIdAndUpdate(id, name, email, comment);
}

export function del(id: u32): void {
  Comment.findByIdAndDelete(id);
}
