import React, { createContext, useState, useContext } from 'react';

const StateContext = createContext();

const StateContextProvider = ({ children }) => {

  const [inputs, setInputs] = useState({
    email: "",
    password: ""
  })

  return (
    <StateContext.Provider value={inputs}>
      {children}
    </StateContext.Provider>
  );
}

export const useInputsData = () => {
  const inputs = useContext(StateContext);
  return inputs;
}

export default StateContextProvider;