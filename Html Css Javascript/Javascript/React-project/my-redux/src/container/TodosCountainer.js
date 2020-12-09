import React from 'react'
import { useSelector, useDispatch } from "react-redux";
import Todos from "../components/Todos";
import { addTodo, toggleTodo } from "../modules/todo";
const TodosCountainer = () => {

  const todos = useSelector(state => state.todo);
  const dispatch = useDispatch();

  const onCreate = text => dispatch(addTodo(text));
  const onToggle = id => dispatch(toggleTodo(id), [dispatch]);

  return (
    <Todos todos={todos} onCreate={onCreate} onToggle={onToggle} />
  )
}

export default TodosCountainer
