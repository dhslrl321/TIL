import React, { useState, useRef } from 'react';

const InputSample = () => {

  const [inputs, setInputs] = useState({
    nickname: "",
    name: ""
  });

  const nameInput = useRef();

  const { name, nickname } = inputs;

  const onChange = (e) => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value
    })
  }

  const onReset = () => {
    setInputs({
      [name]: ""
    })

    nameInput.current.value = "";
  }

  return (
    <div>
      <h3>Function 컴포넌트</h3>

      <input name="name" onChange={onChange} placeholder="name" ref={nameInput} />
      <input name="nickname" onChange={onChange} placeholder="nickname" ref={nameInput} />
      <button onClick={onReset}>Reset</button>
      <div>
        <span>Info: </span>
        {name} ({nickname})
      </div>
    </div>
  );
}

export default InputSample;