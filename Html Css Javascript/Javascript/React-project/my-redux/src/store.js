import { createStore } from "redux";

const ADD_TODO = "ADD_TODO";
const DELETE_TODO = "DELETE_TODO";

const reducer = (state = [], action) => {
  switch (action.type) {
    case (ADD_TODO): {

    }
    case (DELETE_TODO): {

    }
    default:
      return state;
  }
}