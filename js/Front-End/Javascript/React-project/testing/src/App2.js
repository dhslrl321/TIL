import React, { useState, useEffect } from "react";

const App2 = () => {
  const tax = new Tax(5);

  const [state, setState] = useState({
    input: {},
    baseMoney: 50000,
    newMoney: 50000,
    taxRate: tax.rate,
  });

  console.log(state);

  useEffect(() => {
    calculate();
  }, [state.taxRate]);

  const calculate = () => {
    const { baseMoney, taxRate } = state;

    setState({
      ...state,
      newMoney: baseMoney / taxRate,
    });
  };

  const handleChangeInput = (e) => {
    const { value } = e.target;
    setState({
      ...state,
      input: { value },
      taxRate: value,
    });
  };

  return (
    <div style={{ background: "wheat", height: "100vh" }}>
      <h2>taxRate : {state.rateRate}</h2>
      <h1>baseMoney: {state.baseMoney}</h1>
      <h1>newMoney: {state.newMoney}</h1>
      <div>
        <span>적용 세금 비율 : </span>
        <input type="text" name="asdf" onChange={handleChangeInput} />
      </div>
    </div>
  );
};

export default App2;

class Tax {
  constructor(taxRate) {
    this.rate = taxRate;
  }
}
