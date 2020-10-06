import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { Header } from './components/Header';
import { Routes } from './components/Routes';

export const App = () => {
  return (
    <Router>
      <Header />
      <br></br>
      <Routes />
    </Router>
  );
}

export default App;