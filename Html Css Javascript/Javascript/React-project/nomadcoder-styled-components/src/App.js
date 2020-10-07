import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import Header from './components/Header';
import { Routes } from './components/Routes';
import GlobalStyles from "./components/GlobalStyles";

export const App = () => {
  return (
    <>
      <GlobalStyles />
      <Router>
        <Header />
        <Routes />
      </Router>
    </>
  );
}

export default App;