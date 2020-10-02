import React from "react";

const App = () => {

  const name = "react";
  const fn = () => true

  const message = `hello ${fn}`;

  return (
    <div>
      {message}
    </div>
  );
}

export default App;
