import { combineReducers, createStore } from "redux";

import { reducer as todoReducer } from "./todo";
import { reducer as userReducer } from "./user";

const rootReducer = combineReducers({
  todoReducer,
  userReducer,
});

export const store = createStore(rootReducer);

