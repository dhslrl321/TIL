import React, { useRef, useState, useMemo, useCallback, useReducer } from 'react';


const initialState = {
  toDos: {

  }
}

const ADD = "add";

const reducer = (state, action) => {
  switch (action.type) {
    case ADD:
      return { toDos: [...state.toDos] };
    default:
      return;
  }
}

const App = () => {

  const [state, dispatch] = useReducer(reducer, initialState)
  const [newTodo, setNewTodo] = useState("");
  const onSubmit = e => {
    e.preventDefault();
    dispatch({ type: ADD, payload: newTodo })
  }

  const onChange = e => {
    const {
      target: {
        value
      }
    } = e;
    setNewTodo(value);
  }

  return (
    <>
      <h1>Todo </h1>
      <form>
        <input type="text" placeholder="wirte" />
      </form>
    </>
  );
}

export default App;