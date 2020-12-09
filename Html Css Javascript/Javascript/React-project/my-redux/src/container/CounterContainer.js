import React from 'react'
import { useSelector, useDispatch } from "react-redux";
import Counter from "../components/Counter";
import { decrease, increase, setDiff } from '../modules/counter';

const CounterContainer = () => {

  const { number, diff } = useSelector(state => ({
    number: state.counter.number,
    diff: state.counter.diff
  }))

  const dispatch = useDispatch();

  const onIncrease = () => dispatch(increase());
  const onDecrease = () => dispatch(decrease());
  const onSetDiff = () => dispatch(setDiff());

  return (
    <Counter
      number={number}
      diff={diff}
      onIncrease={onIncrease}
      onDecrease={onDecrease}
      onSetDiff={onSetDiff} />
  )
}

export default CounterContainer
