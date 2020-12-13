import React from "react";
import Counter from "../components/Counter";
import { useSelector, useDispatch } from "react-redux";
import { increase, decrease, ina, dea } from "../modules/counter";

function CounterContainer() {
  const number = useSelector((state) => state.counter);
  const dispatch = useDispatch();

  const onIncrease = () => {
    dispatch(ina());
  };
  const onDecrease = () => {
    dispatch(dea());
  };

  return (
    <Counter number={number} onIncrease={onIncrease} onDecrease={onDecrease} />
  );
}

export default CounterContainer;
