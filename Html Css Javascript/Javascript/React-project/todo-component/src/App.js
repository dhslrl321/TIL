import React from 'react';

const initialState = {
  todo: []
}

function reducer(state, action) {
  switch (action.type) {
    case ADD: {
      return { todo: [...todo, action.payload] }
    }
    default: {
      return
    }
  }
}

function App() {

  return (
    <>
      <h1>Welcome</h1>
      <input type="text" placeholder="write to dos" />
    </>
  );
}

export default App;
