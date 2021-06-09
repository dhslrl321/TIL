import { ADD, DELETE } from "./actions"

const initialState = {
  todos: []
}


export const reducer = (state = initialState, action) => {
  if (action.type === ADD) {
    return {
      // 만약 다른 state 가 존재한다면 전개 연산 ...state 를 해야함
      // 하지만 현재 state 에는 todos 하나 뿐이라 todos 만 반환하면 됨
      todos: [
        ...state.todos,
        action.todo
      ]
    }
  } else if (action.type === DELETE) {
    return {
      todos: [
        ...state.todos.filter(todo => todo.id !== action.id)
      ]
    }
  }

  else {
    return state;
  }
};