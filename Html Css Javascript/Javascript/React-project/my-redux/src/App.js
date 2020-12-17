import "./App.css";
import React from "react";
import CounterContainer from "./container/CounterContainer";
import PostListContainer from "./container/PostListContainer";

function App() {
  return (
    <div>
      <h1>Redux Middleware</h1>
      <PostListContainer />
    </div>
  );
}

export default App;
