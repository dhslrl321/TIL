import React, { useState } from 'react'
import "./app.css";
import Navbar from "./Navbar";
import Main from './Main';
import Sidebar from './Sidebar';
function App() {

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Navbar toggle={toggle} />
      <Sidebar isOpen={isOpen} toggle={toggle} />
      <Main />
    </>
  );

}

export default App;
