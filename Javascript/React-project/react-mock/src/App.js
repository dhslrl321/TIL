import React, { useState, useEffect } from 'react';
import axios from "axios";

const App = () => {
  const [dataString, setDataString] = useState("");

  const connectServer = async () => {
    await axios.get("http://localhost:8080/test").then(response => (
      setDataString({
        dataString: response
      })
    ))
  }

  useEffect(() => {
    connectServer();
  })

  return (
    <div>{dataString}</div>
  );
}




export default App;

