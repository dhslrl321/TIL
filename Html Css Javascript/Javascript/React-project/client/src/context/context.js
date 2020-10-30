import React, { createContext, useState, useContext } from 'react';
const UserContext = createContext();

const UserContextProvider = ({ children }) => {

  const [loginInputs, setLoginInputs] = useState({
    username: "",
    password: ""
  })

  const [user, setUser] = useState({
    username: "",
    email: "",
    authenticated: false
  })

  return (
    <UserContext.Provider value={{ data: { loginInputs, user }, fns: { setLoginInputs, setUser } }} >
      {children}
    </UserContext.Provider>
  );
}

export const useLoginInputsData = () => {
  const { data: { loginInputs } } = useContext(UserContext);
  return loginInputs;
}

export const useSetLoginInputs = () => {
  const { fns: { setLoginInputs } } = useContext(UserContext);
  return setLoginInputs;
}

export const useUserData = () => {
  const { data: { user } } = useContext(UserContext);
  return user;
}

export const useSetUser = () => {
  const { fns: { setUser } } = useContext(UserContext);
  return setUser;
}

export default UserContextProvider;