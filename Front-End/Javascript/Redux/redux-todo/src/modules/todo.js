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
        ],
      };
    };
    case DELETE: {
      return {
        todos: [...state.todos.filter(todo => todo.id !== action.id)]
      }
    }
    default:
      return state;
  }
};

let id = 1;

export const add_todo = (todo) => {
  return {
    type: ADD,
    todo: {
      id: id++,
      title: todo.title,
      isComplete: todo.isComplete,
    }
  };
};

export const delete_todo = (id) => {
  return { type: DELETE, id };
};