import { useState } from "react";

const useInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);

  const onChange = e => {
    console.log(e.target.value);
  };

  return { value, onChange };
}

export default useInput;