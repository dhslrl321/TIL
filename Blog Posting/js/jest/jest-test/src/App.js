import React, { useState } from "react";

import Page from "./Page";

function App() {
  const [state, useState] = useState({
    newId: 100,
    taskTitle: "",
    tasks: [],
  });


  return (
    <div>
      hello world
    </div>
  );
}

export default App;