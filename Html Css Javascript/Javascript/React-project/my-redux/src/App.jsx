import "./App.css";
import React from "react";
import CounterContainer from "./container/CounterContainer";
import TodosCountainer from "./container/TodosCountainer";

function App() {
  return (
    <div>
      <h1>이름을 등록해보세요!</h1>
      <CounterContainer />
      <TodosCountainer />
    </div>
  );
}

export default App;
