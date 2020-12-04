import React, { useState } from "react";
import { connect } from "react-redux";
import { actionCreators } from "../store";
import Todo from "../components/Todo";
const Home = ({ todo, addTodo }) => {
  const [text, setText] = useState("");

  const onChange = (e) => {
    setText(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    addTodo(text);
    setText("");
  };

  return (
    <>
      <h1>TO DO</h1>
      <form onSubmit={onSubmit}>
        <input type="text" value={text} onChange={onChange} />
        <button>Add</button>
      </form>
      <ul>
        {todo.map((todos, index) => (
          <Todo key={index} {...todos}></Todo>
        ))}
      </ul>
    </>
  );
};
const mapStateToProps = (state, ownProps) => {
  // state를 store에서 가져옴
  // 그리고 내 컴포넌트 props로 주는거임
  console.log(state, ownProps);
  return { todo: state };
  Q;
};

const mapDispatchToProps = (dispatch) => {
  return {
    addTodo: (text) => dispatch(actionCreators.addTodo(text)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
