import { combineReducers } from "redux";
import counter from "./counter";
const rootReducer = combineReducers({ counter, posts })

export default rootReducer;