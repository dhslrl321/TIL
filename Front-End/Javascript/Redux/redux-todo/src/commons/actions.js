export const ADD = "ADD_TODO";
export const DELETE = "DELETE_TODO";

let id = 1;

export const add_todo = (todo) => {
  return {
    type: ADD,
    todo: {
      id: id++,
      title: todo.title,
      isComplete: todo.isComplete
    }
  }
}

export const delete_todo = (id) => {
  return {
    type: DELETE,
    id
  }
}