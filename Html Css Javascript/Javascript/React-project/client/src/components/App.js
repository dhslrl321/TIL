import React from 'react';
import Header from "./Header";
import UserProvider from "../context/context";



function App() {
  return (
    <UserProvider>
      <Header />
    </UserProvider>
  );
}

export default App;
