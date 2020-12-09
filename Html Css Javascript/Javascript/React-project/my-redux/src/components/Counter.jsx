import React from "react";

const Counter = ({ number, onIncrease, onDecrease }) => {
  const handleOnIncrease = () => {
    onIncrease();
  };
  const handleOnDecrease = () => {
    onDecrease();
  };
  return (
    <div>
      <div>{number}</div>
      <button onClick={handleOnIncrease}>+</button>
      <button onClick={handleOnDecrease}>-</button>
    </div>
  );
};

export default Counter;
