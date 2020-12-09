import { combineReducers } from "redux";
import counter from "./counter";
import todo from "./todo";

const rootReducer = combineReducers({
  counter,
  todo
})

export default rootReducer;