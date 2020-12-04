import { createStore } from "redux";

const ADD_USER = "ADD_USER";

const addUser = (name, email) => {
  store.dispatch({ type: ADD_USER, user: { name, email } });
}


const reducer = (state = [], action) => {
  switch (action.type) {
    case (ADD_USER): {
      const { name = "hello", email = "no" } = action.user;
      return [{ name, email, id: Date.now() }, ...state]
    }
    default:
      return state;
  }
}

export const actionCreator = {
  addUser: (name, email) => addUser(name, email)
}

const store = createStore(reducer);

export default store;