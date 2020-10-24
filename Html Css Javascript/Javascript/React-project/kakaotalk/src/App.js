import React, { useRef, useState, useMemo, useCallback, useReducer } from 'react';
import translations from "./translations";
import Lang from './context';
const App = () => {
  return (
    <Lang defaultLang="en" translations={translations}>

    </Lang>
  );
}

export default App;