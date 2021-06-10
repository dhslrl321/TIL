// initial state
const initialState = {
  todos: []
}

// actions
const ADD = "todo-list/ADD_TODO";
const DELETE = "todo-list/DELETE_TODO";

// reducers
export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD: {
      return {
        todos: [
          ...state.todos,
          action.todo
        ]
      };
    };
    case DELETE: {
      return [
        ...state.todos.filter(todo => todo.id !== action.id)
      ]
    }
    default:
      return state;
  }
};

export const add_todo = (todo) => {
  return { type: ADD, todo };
};

export const delete_todo = (id) => {
  return { type: DELETE, id };
};