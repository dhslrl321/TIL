import React, { useState, useEffect } from 'react';
import GlobalStyle from "../config/GlobalStyle";
import { BrowserRouter as Router } from "react-router-dom";
import Header from './Header';
import { TestApi } from "../api";


function App() {

  return (
    < Router >
      <GlobalStyle />
      <Header />
    </Router >
  );
}

export default App;
