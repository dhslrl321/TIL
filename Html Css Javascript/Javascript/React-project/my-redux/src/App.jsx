import "./App.css";
import { connect } from "react-redux";
import { actionCreator } from "./store";
import React, { useState } from "react";

function App({ state, onButtonClick }) {
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const onClick = () => {};

  const { name, email } = inputs;
  return (
    <div>
      <h1>이름을 등록해보세요!</h1>
      <input type="text" name="name" value={name} onChange={onChange} />
      <input type="text" name="email" value={email} onChange={onChange} />
      <button onClick={onButtonClick}>등록하기</button>
      <ul>
        <li>sdaf</li>
      </ul>
    </div>
  );
}
function mapStateToProps(state) {
  console.log(state);
  return { state };
}
function mapDispatchToProps(dispatch) {
  return {
    onButtonClick: (name, email) =>
      dispatch(actionCreator.addUser(name, email)),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
