import React, { useContext, createContext, useState } from "react";

const GlobalContext = createContext();

const GlobalContextProvider = ({ children }) => {
  const [singleData, setSingleData] = useState("단일 state 데이터");
  const [objectData, setObjectData] = useState({
    data1: "첫 번째 객체 state 데이터",
    data2: "두 번째 객체 state 데이터",
  });
  return (
    <GlobalContext.Provider
      value={{
        data: { singleData, objectData },
        fns: { setSingleData, setObjectData },
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useSingleData = () => {
  const {
    data: { singleData },
  } = useContext(GlobalContext);
  return singleData;
};

export const useObjectData = () => {
  const {
    data: { objectData },
  } = useContext(GlobalContext);
  return objectData;
};

export const useSingleFns = () => {
  const {
    fns: { setSingleData },
  } = useContext(GlobalContext);
  return setSingleData;
};

export const useObjectFns = () => {
  const {
    fns: { setObjectData },
  } = useContext(GlobalContext);
  return setObjectData;
};

export default GlobalContextProvider;
