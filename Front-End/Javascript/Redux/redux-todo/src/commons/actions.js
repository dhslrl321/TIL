export const ADD = "ADD_TODO";
export const DELETE = "DELETE_TODO";

export const addTodo = (todo) => {
  return {
    type: ADD,
    todo
  }
}