import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./modules";
import logger from "redux-logger";
import { composeWithDevTools } from 'redux-devtools-extension';
import ReduxThunk from "redux-thunk";
import { BrowserRouter } from "react-router-dom";
const store = createStore(rootReducer, composeWithDevTools(
  applyMiddleware(ReduxThunk, logger),
));

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);
