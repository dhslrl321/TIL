import { combineReducers, createStore } from "redux";

import { reducer as todoReducer } from "./todo";

const rootReducer = combineReducers({
  todoReducer,
});

export const store = createStore(rootReducer);

